const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');

function setup() {
  const makeNode = () => ({
    attrs: {},
    setAttribute(key, value) { this.attrs[key] = String(value); }
  });
  const summary = { focus() {} };
  const cards = { querySelector: () => summary, scrollIntoView() {} };
  const nodes = {
    episodeTranscript: {},
    episodeTimeCards: cards,
    episodeTimePage: {},
    episodeTimeCount: {}
  };
  const buttons = [makeNode(), makeNode()];
  const context = vm.createContext({
    document: { getElementById: id => nodes[id], querySelectorAll: () => buttons },
    closeGrammarSheet() {},
    switchMainTab(tab) { context.tab = tab; }
  });
  const script = read('script.js');
  const episodeExtras = script.slice(
    script.indexOf('let episodeTimePage ='),
    script.indexOf('function selectEp(n,skipScroll')
  );
  const run = source => vm.runInContext(source, context);
  run(read('episodes.js') + '\n' + read('grammar.js'));
  run(`
    let ep = 20, idx = 0;
    function epData() { return EPS[ep]; }
    function selectEp(n) { ep = n; idx = 0; renderEpisodeExtras(); }
    ${episodeExtras}
  `);
  return { run, nodes, buttons };
}

test('E22 才顯示逐字稿和五張時間對照，首尾不循環', () => {
  const { run, nodes, buttons } = setup();
  run('renderEpisodeExtras()');
  assert.equal(nodes.episodeTranscript.hidden, true);
  assert.equal(nodes.episodeTimeCards.hidden, true);

  run('selectEp(21)');
  assert.equal(nodes.episodeTimeCards.open, false);
  assert.equal(nodes.episodeTimeCards.hidden, false);
  assert.equal((nodes.episodeTranscript.innerHTML.match(/<li>/g) || []).length, 10);
  run('turnEpisodeTimePage(-1)');
  assert.equal(nodes.episodeTimeCount.textContent, '1 / 5');
  assert.equal(buttons[0].attrs['aria-disabled'], 'true');

  for (let page = 2; page <= 4; page++) {
    run('turnEpisodeTimePage(1)');
    assert.equal(nodes.episodeTimeCount.textContent, `${page} / 5`);
    assert.equal((nodes.episodeTimePage.innerHTML.match(/<li>/g) || []).length, 4);
  }
  run('turnEpisodeTimePage(1); turnEpisodeTimePage(1)');
  assert.equal(nodes.episodeTimeCount.textContent, '5 / 5');
  assert.equal(buttons[1].attrs['aria-disabled'], 'true');
  assert.match(nodes.episodeTimePage.innerHTML, /¿Quieres fruta\?/);
});

test('B1 卡回到 E22 展開輪播，同集返回保留句號與輪播頁數', () => {
  const { run, nodes } = setup();
  run('const card = GRAMMAR_DATA.find(g => g.id === EPS[21].grammarId)');
  assert.equal(run('card.level'), 'b1');
  assert.equal(run('card.examples[3] === REGANAR_TIME_GROUPS[2].examples[3]'), true);
  run('jumpToEpisodeTimeCards(card.episode)');
  assert.equal(run('ep'), 21);
  assert.equal(nodes.episodeTimeCards.open, true);
  run('idx = 4; turnEpisodeTimePage(2); jumpToEpisodeTimeCards(card.episode)');
  assert.equal(run('idx'), 4);
  assert.equal(nodes.episodeTimeCount.textContent, '3 / 5');
});

test('分角色錄音稿的台詞和 E22 劇情資料一致', () => {
  const { run } = setup();
  const matches = [...read('audio_scripts/e22_se_me_olvido.txt').matchAll(/^(\d+)\.mp3[^\n]*\n(.+)$/gm)];
  const lines = matches.sort((a, b) => Number(a[1]) - Number(b[1])).map(match => match[2]);
  assert.deepEqual(lines, JSON.parse(run('JSON.stringify(EPS[21].sentences.map(line => line.es))')));
});
