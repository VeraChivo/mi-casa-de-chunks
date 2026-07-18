#!/usr/bin/env node
/*
 * 🛠️ 內容健康檢查腳本
 *
 * 這不是網站的一部分，不會被 index.html 載入，純粹是開發時手動執行的檢查工具：
 *   node maintenance.js
 *
 * 檢查範圍：grammar.js（GRAMMAR_DATA）／news.js（NEWS_ITEMS）／
 *          script.js（LYRICS_FILL_DATA）／cognates.js（FALSE_COGNATES）
 *
 * 每次新增/修改一批卡片後，跑一次這個腳本，比每次手動寫 node -e 一次性檢查更省事、
 * 也不會漏掉之前想到但這次忘記查的項目。
 */

const fs = require('fs');
const path = require('path');

function loadArray(file, varNames) {
  // grammar.js／news.js／cognates.js 都是純資料檔（沒有頂層DOM操作），直接整檔eval最單純
  const code = fs.readFileSync(path.join(__dirname, file), 'utf8');
  const exportLine = varNames.map(v => `global.__MAINT_${v} = typeof ${v} !== 'undefined' ? ${v} : undefined;`).join('\n');
  // eslint-disable-next-line no-eval
  eval(code + '\n' + exportLine);
  const out = {};
  varNames.forEach(v => { out[v] = global['__MAINT_' + v]; });
  return out;
}

let failCount = 0;
let warnCount = 0;
function fail(msg) { console.log('❌ ' + msg); failCount++; }
function warn(msg) { console.log('⚠️  ' + msg); warnCount++; }
function ok(msg) { console.log('✅ ' + msg); }
function section(title) { console.log('\n── ' + title + ' ──'); }

function checkDuplicateIds(items, idField, label) {
  const ids = items.map(it => it[idField]);
  const seen = new Set();
  const dupes = new Set();
  ids.forEach(id => { if (seen.has(id)) dupes.add(id); seen.add(id); });
  if (dupes.size) fail(`${label}：發現重複 ${idField}：${[...dupes].join(', ')}`);
  else ok(`${label}：${items.length} 筆，${idField} 無重複`);
}

function checkRequiredFields(items, idField, requiredFields, label) {
  let missing = [];
  items.forEach(it => {
    requiredFields.forEach(f => {
      if (it[f] === undefined || it[f] === null || it[f] === '') {
        missing.push(`${it[idField] || '(無id)'} 缺少 ${f}`);
      }
    });
  });
  if (missing.length) missing.forEach(m => fail(`${label}：${m}`));
  else ok(`${label}：必要欄位（${requiredFields.join('/')}）都齊全`);
}

// ── grammar.js ──
section('grammar.js — GRAMMAR_DATA');
try {
  const { GRAMMAR_DATA, GRAMMAR_LEVEL_TIERS, GRAMMAR_CATS } = loadArray('grammar.js', ['GRAMMAR_DATA', 'GRAMMAR_LEVEL_TIERS', 'GRAMMAR_CATS']);
  checkDuplicateIds(GRAMMAR_DATA, 'id', 'GRAMMAR_DATA');
  checkRequiredFields(GRAMMAR_DATA, 'id', ['cat', 'level', 'title', 'rule', 'examples', 'source'], 'GRAMMAR_DATA');

  const validLevels = new Set(GRAMMAR_LEVEL_TIERS.map(t => t.key));
  const badLevels = GRAMMAR_DATA.filter(g => !validLevels.has(g.level));
  if (badLevels.length) fail(`GRAMMAR_DATA：等級標籤不在 GRAMMAR_LEVEL_TIERS 裡：${badLevels.map(g => g.id + '(' + g.level + ')').join(', ')}`);
  else ok('GRAMMAR_DATA：所有卡片的 level 都是合法等級標籤');

  const validCats = new Set(GRAMMAR_CATS.map(c => c.key));
  const badCats = GRAMMAR_DATA.filter(g => !validCats.has(g.cat));
  if (badCats.length) fail(`GRAMMAR_DATA：cat 不在 GRAMMAR_CATS 裡：${badCats.map(g => g.id + '(' + g.cat + ')').join(', ')}`);
  else ok('GRAMMAR_DATA：所有卡片的 cat 都在 GRAMMAR_CATS 清單裡');

  const emptyExamples = GRAMMAR_DATA.filter(g => !Array.isArray(g.examples) || g.examples.length === 0);
  if (emptyExamples.length) fail(`GRAMMAR_DATA：examples 是空陣列：${emptyExamples.map(g => g.id).join(', ')}`);
  else ok('GRAMMAR_DATA：每張卡至少有 1 個例句');

  const dist = {};
  GRAMMAR_DATA.forEach(g => { dist[g.level] = (dist[g.level] || 0) + 1; });
  console.log('   等級分佈：' + JSON.stringify(dist));
} catch (e) {
  fail('grammar.js 讀取/檢查失敗：' + e.message);
}

// ── news.js ──
section('news.js — NEWS_ITEMS');
try {
  const { NEWS_ITEMS } = loadArray('news.js', ['NEWS_ITEMS']);
  checkDuplicateIds(NEWS_ITEMS, 'id', 'NEWS_ITEMS');
  checkRequiredFields(NEWS_ITEMS, 'id', ['source', 'sourceUrl', 'headline', 'task', 'cefr', 'topic'], 'NEWS_ITEMS');

  const missingBlank = NEWS_ITEMS.filter(n => typeof n.headline === 'string' && !n.headline.includes('[?]'));
  if (missingBlank.length) fail(`NEWS_ITEMS：headline 沒有 [?] 挖空標記：${missingBlank.map(n => n.id).join(', ')}`);
  else ok('NEWS_ITEMS：每篇 headline 都有 [?] 挖空標記');

  const badUrl = NEWS_ITEMS.filter(n => typeof n.sourceUrl !== 'string' || !/^https?:\/\//.test(n.sourceUrl));
  if (badUrl.length) fail(`NEWS_ITEMS：sourceUrl 格式不像網址：${badUrl.map(n => n.id).join(', ')}`);
  else ok('NEWS_ITEMS：sourceUrl 格式都正常（僅檢查格式，不驗證連結是否還活著——連結失效要另外手動抽查）');

  console.log('   共 ' + NEWS_ITEMS.length + ' 篇，全部 cefr=' + [...new Set(NEWS_ITEMS.map(n => n.cefr))].join('/'));
} catch (e) {
  fail('news.js 讀取/檢查失敗：' + e.message);
}

// script.js 是完整網站邏輯（含DOM操作），與其把整個瀏覽器環境 stub 出來跑一遍風險很高、
// 也很難維護，這裡改用「直接抓出 const LYRICS_FILL_DATA = [...] 這段原始碼片段單獨執行」的做法，
// 只依賴大括號配對抓範圍，不執行檔案其他部分，跟資料本身的邏輯無關、更穩定
function extractConstArray(file, varName) {
  const code = fs.readFileSync(path.join(__dirname, file), 'utf8');
  const startMarker = `const ${varName} = [`;
  const start = code.indexOf(startMarker);
  if (start === -1) throw new Error(`找不到 const ${varName} = [ 的定義`);
  let depth = 0, i = start + startMarker.length - 1; // 從第一個 [ 開始數
  for (; i < code.length; i++) {
    if (code[i] === '[') depth++;
    else if (code[i] === ']') { depth--; if (depth === 0) { i++; break; } }
  }
  const snippet = code.slice(start, i) + ';\n' + `global.__MAINT_${varName} = ${varName};`;
  // eslint-disable-next-line no-eval
  eval(snippet);
  return global['__MAINT_' + varName];
}

// ── script.js — LYRICS_FILL_DATA ──
section('script.js — LYRICS_FILL_DATA');
try {
  const LYRICS_FILL_DATA = extractConstArray('script.js', 'LYRICS_FILL_DATA');
  checkDuplicateIds(LYRICS_FILL_DATA, 'id', 'LYRICS_FILL_DATA');
  checkRequiredFields(LYRICS_FILL_DATA, 'id', ['artist', 'song', 'level', 'before', 'blank', 'after', 'yt'], 'LYRICS_FILL_DATA');

  const validLfLevels = new Set(['a0', 'a1', 'b1', 'b2']);
  const badLfLevels = LYRICS_FILL_DATA.filter(lf => !validLfLevels.has(lf.level));
  if (badLfLevels.length) fail(`LYRICS_FILL_DATA：level 不在 a0/a1/b1/b2 範圍內（會導致篩選抓不到）：${badLfLevels.map(lf => lf.id + '(' + lf.level + ')').join(', ')}`);
  else ok('LYRICS_FILL_DATA：所有 level 都在 a0/a1/b1/b2 範圍內');

  // 同一首歌最多4句的規則（2026-07-18 定案：避免變相重製整首歌）
  const bySong = {};
  LYRICS_FILL_DATA.forEach(lf => { const k = lf.artist + '|' + lf.song; bySong[k] = (bySong[k] || 0) + 1; });
  const overLimit = Object.entries(bySong).filter(([, n]) => n > 4);
  if (overLimit.length) warn(`LYRICS_FILL_DATA：同一首歌超過4句（VERA定案的版權安全上限）：${overLimit.map(([k, n]) => k + '=' + n + '句').join(', ')}`);
  else ok('LYRICS_FILL_DATA：沒有任何一首歌超過4句的版權安全上限');

  console.log('   共 ' + LYRICS_FILL_DATA.length + ' 句，涵蓋 ' + Object.keys(bySong).length + ' 首歌');
} catch (e) {
  fail('script.js（LYRICS_FILL_DATA）讀取/檢查失敗：' + e.message);
}

// ── cognates.js — FALSE_COGNATES ──
section('cognates.js — FALSE_COGNATES');
try {
  const { FALSE_COGNATES } = loadArray('cognates.js', ['FALSE_COGNATES']);
  checkDuplicateIds(FALSE_COGNATES, 'es', 'FALSE_COGNATES');
  checkRequiredFields(FALSE_COGNATES, 'es', ['looksLike', 'wrongZh', 'realZh', 'trap', 'wrongEx', 'rightEx'], 'FALSE_COGNATES');
} catch (e) {
  fail('cognates.js（FALSE_COGNATES）讀取/檢查失敗：' + e.message);
}

// ── 總結 ──
console.log('\n' + '='.repeat(40));
if (failCount === 0 && warnCount === 0) {
  console.log('🎉 全部檢查通過，沒有發現問題！');
} else {
  console.log(`檢查完畢：${failCount} 個錯誤、${warnCount} 個警告`);
  if (failCount > 0) process.exitCode = 1;
}
