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
// 通用版：抓 const VAR = [...] 或 const VAR = {...}，只靠括號配對抓範圍，不執行檔案其他部分
function extractConstArray(file, varName) {
  const code = fs.readFileSync(path.join(__dirname, file), 'utf8');
  const startMarker = `const ${varName} = `;
  const start = code.indexOf(startMarker);
  if (start === -1) throw new Error(`找不到 const ${varName} = 的定義`);
  const openChar = code[start + startMarker.length];
  const closeChar = openChar === '[' ? ']' : openChar === '{' ? '}' : null;
  if (!closeChar) throw new Error(`${varName} 開頭不是 [ 或 {，無法用括號配對抓取`);
  let depth = 0, i = start + startMarker.length;
  for (; i < code.length; i++) {
    if (code[i] === openChar) depth++;
    else if (code[i] === closeChar) { depth--; if (depth === 0) { i++; break; } }
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

// ── 翻譯品質提醒：不是判斷對錯，只是抓出「值得人工檢查」的可疑模式 ──
// 這幾個 pattern 是從 g53/g54/g57 那次審查實際抓到的問題歸納出來的，之後每次新增卡片都跑一次，
// 提早攔到類似的西語結構直譯痕跡，不用等到累積很多張卡才發現
section('翻譯品質提醒（僅供人工複查，不代表一定錯）');
try {
  const { GRAMMAR_DATA } = loadArray('grammar.js', ['GRAMMAR_DATA']);
  const SUSPECT_PATTERNS = [
    { re: /被.{1,6}著/, label: '疑似「被…著」西語se被動/ser+分詞的逐字直譯' },
    { re: /我有(餓|渴|睏|累|怕)/, label: '疑似「tener+名詞」被直譯成「有+情緒」的破碎中文（應該是「我餓了/我很害怕」這類自然說法）' },
    { re: /不相信/, label: '疑似把no creer/dudar翻得太重——中文「不相信」語氣接近質疑/偵查，通常應該是「不覺得/沒想到」這類較輕的說法' }
  ];
  const hits = [];
  GRAMMAR_DATA.forEach(g => {
    const texts = [];
    (g.examples || []).forEach(ex => texts.push(ex.zh));
    if (g.family && g.family.items) g.family.items.forEach(it => texts.push(it.zh));
    if (g.trap) texts.push(g.trap);
    texts.forEach(t => {
      if (typeof t !== 'string') return;
      SUSPECT_PATTERNS.forEach(p => {
        if (p.re.test(t)) hits.push({ id: g.id, text: t, label: p.label });
      });
    });
  });
  if (hits.length) {
    hits.forEach(h => warn(`${h.id}：${h.label}\n      「${h.text}」`));
  } else {
    ok('沒有偵測到已知的可疑翻譯模式');
  }
} catch (e) {
  fail('翻譯品質提醒檢查失敗：' + e.message);
}

// ── 內容孤兒檢查：有沒有卡片完全沒被任何路線/關聯圖引用，只能靠瀏覽全部清單才找得到 ──
// 「孤兒」定義：不在 SENTENCE_GRAMMAR_MAP（劇情句子對應）、不在 STORY_INDEX（劇情索引入口）、
// 不是 CHUNK_FAMILIES 的 grammarId（家族關聯圖入口）——三個路徑都沒連到，才算孤兒。
// 這不代表卡片沒用（💧文法儲水槽本身就是瀏覽全部清單的地方），只是提醒：這張卡目前只能靠瀏覽找到，
// 沒有從任何「旅程」被連過去。
section('內容孤兒檢查（沒有被任何路線/關聯圖引用，僅供參考）');
try {
  const { GRAMMAR_DATA, SENTENCE_GRAMMAR_MAP } = loadArray('grammar.js', ['GRAMMAR_DATA', 'SENTENCE_GRAMMAR_MAP']);
  const STORY_INDEX = extractConstArray('script.js', 'STORY_INDEX');
  const CHUNK_FAMILIES = extractConstArray('script.js', 'CHUNK_FAMILIES');

  const referenced = new Set();
  Object.values(SENTENCE_GRAMMAR_MAP || {}).forEach(gId => { if (gId) referenced.add(gId); });
  (STORY_INDEX.scenes || []).forEach(s => { if (s.jump && s.jump.type === 'grammar') referenced.add(s.jump.id); });
  (CHUNK_FAMILIES || []).forEach(fam => { if (fam.grammarId) referenced.add(fam.grammarId); });

  const orphans = GRAMMAR_DATA.filter(g => !referenced.has(g.id));
  console.log(`   總計 ${GRAMMAR_DATA.length} 張卡，${referenced.size} 張已被路線/關聯圖引用，${orphans.length} 張目前只能靠瀏覽💧文法儲水槽找到`);
  if (orphans.length) {
    warn(`孤兒卡片（僅供參考，不是錯誤——多數是靠瀏覽💧儲水槽找到的B2/C1/C2文化深度內容，本來就不一定要掛進劇情/家族路線）：${orphans.map(g => g.id).join(', ')}`);
  }
} catch (e) {
  fail('內容孤兒檢查失敗：' + e.message);
}

// ── 🌳 Chunk 家族健康檢查：每個語塊家族分支，在劇情/歌曲/新聞/心語裡有沒有出現過 ──
// 2026-07-19 VERA重要指正：這不是「缺口」，是兩種性質不同的東西，混在一起報會誤導未來的自己：
//   ①「可補」——維護者自己就能直接寫（例：心語/日記，corazon.js/mom.js可以直接加新句子）
//   ②「成長中」——受規則限制、現在寫了也沒用：
//      📺劇情受「每集固定10句」架構限制，不能塞新句子進舊集數，只能等新集數
//      🎵歌曲／📰新聞受「必須VERA親自查證才能收錄」規則限制，不能自己編
// 不是CHUNK_FAMILIES沒做完，是這幾類本來就該用不同速度成長。不為了填滿數字硬補品質。
section('🌳 Chunk 家族健康檢查（分「可補」vs「成長中」，不是單純缺口清單）');
try {
  const CHUNK_FAMILIES = extractConstArray('script.js', 'CHUNK_FAMILIES');
  const LYRICS_FILL_DATA = extractConstArray('script.js', 'LYRICS_FILL_DATA');
  const { EPS } = loadArray('episodes.js', ['EPS']);
  const { NEWS_ITEMS } = loadArray('news.js', ['NEWS_ITEMS']);
  const CORAZON_DATA = extractConstArray('corazon.js', 'CORAZON_DATA');
  const MOM_ATM_DATA = extractConstArray('mom.js', 'MOM_ATM_DATA');

  function hasEpisode(keyword) {
    return (EPS || []).some(ep => (ep.sentences || []).some(s => (s.es || '').toLowerCase().includes(keyword)));
  }
  function hasSong(keyword) {
    return (LYRICS_FILL_DATA || []).some(lf => ((lf.before || '') + ' ' + (lf.blank || '') + ' ' + (lf.after || '')).toLowerCase().includes(keyword));
  }
  function hasNews(keyword) {
    return (NEWS_ITEMS || []).some(n => (n.headline || '').toLowerCase().includes(keyword));
  }
  function hasDiary(keyword) {
    const inCorazon = (CORAZON_DATA || []).some(cat => (cat.items || []).some(it => (it.es || '').toLowerCase().includes(keyword)));
    if (inCorazon) return true;
    return Object.values(MOM_ATM_DATA || {}).some(cat => (cat.items || []).some(it => (it.es || '').toLowerCase().includes(keyword)));
  }

  // 沿用🌻語塊花園既有的萌芽階段詞彙，不另外發明一套百分比等級（單一資料來源原則，連「詞彙」也算）
  function maturitySymbol(pct) {
    if (pct >= 1) return '🌻 日頭花開';
    if (pct >= 0.6) return '🍀 幸運草';
    if (pct >= 0.3) return '🍃 猛漲期';
    if (pct > 0) return '🌱 初萌芽';
    return '𑁍 還沒播種';
  }
  (CHUNK_FAMILIES || []).forEach(fam => {
    const branches = fam.branches || [];
    const n = branches.length;
    let epOk = 0, songOk = 0, newsOk = 0, diaryOk = 0, atLeastOne = 0;
    branches.forEach(b => {
      const kw = (b.match || '').toLowerCase();
      const ep = hasEpisode(kw), song = hasSong(kw), news = hasNews(kw), diary = hasDiary(kw);
      if (ep) epOk++;
      if (song) songOk++;
      if (news) newsOk++;
      if (diary) diaryOk++;
      if (ep || song || news || diary) atLeastOne++; // 🌾grammar本身必定為真（分支就是從grammar卡的family列出來的），不用另外算
    });
    console.log(`\n   ${fam.title}（${n}個分支）健康度`);
    console.log(`   🌾 Grammar ✅（分支本身就是從grammar卡列出來的，恆為真）`);
    console.log(`   📔 心語 ${maturitySymbol(diaryOk / n)}`);
    console.log(`   📺 劇情 ${maturitySymbol(epOk / n)}`);
    console.log(`   🎵 歌曲 ${maturitySymbol(songOk / n)}`);
    console.log(`   📰 新聞 ${maturitySymbol(newsOk / n)}`);
    console.log(`   👉 至少有一個入口的分支：${atLeastOne}/${n}（這才是真正的健康指標，不是每種入口都要有）`);
    if (diaryOk < n) {
      warn(`${fam.title}：📔心語還有 ${n - diaryOk} 個分支沒掛——這類「可補」，維護者可以直接在corazon.js/mom.js加新句子`);
    }
    if (atLeastOne < n) {
      fail(`${fam.title}：有 ${n - atLeastOne} 個分支完全沒有任何入口（連grammar以外都沒有），這才是真缺口，需要處理`);
    }
  });
} catch (e) {
  fail('Chunk 家族健康檢查失敗：' + e.message);
}

// ── 總結 ──
console.log('\n' + '='.repeat(40));
if (failCount === 0 && warnCount === 0) {
  console.log('🎉 全部檢查通過，沒有發現問題！');
} else {
  console.log(`檢查完畢：${failCount} 個錯誤、${warnCount} 個警告`);
  if (failCount > 0) process.exitCode = 1;
}
