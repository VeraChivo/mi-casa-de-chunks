// Node 內建測試：驗證路線設定與舊資料的邊界；版面與實際操作另以瀏覽器驗收。
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

function setup({saved, completed = [0], progress = true} = {}){
  const store = new Map([
    ['peppa_es_v4', JSON.stringify({ep:18,idx:2,answeredByEp:{16:[0,1]},ammoUnlocked:['e17_01']})],
    ['peppa_es_vocab_v1', '[{"text":"Tengo sueño"}]'],
    ['peppa_mom_diary_v1', 'keep diary'],
    ['peppa_garden_v1', '{"Tengo sueño":{"stage":2}}']
  ]);
  if(saved !== undefined) store.set('peppa_learning_preferences_v1', saved);
  let daily = {tier:20, energy:'normal', doneIdx:completed};
  const listeners = {}, fields = {guideRoute:'a1',guideMinutes:'20',guideEnergy:'normal'};
  const button = {focus(){},setAttribute(){}};
  const form = {addEventListener(type,fn){listeners[type]=fn;}};
  form.elements = {guideRoute:{set value(v){fields.guideRoute=v;}}};
  const nodes = new Map();
  const node = id => {
    if(!nodes.has(id)) nodes.set(id, {innerHTML:'',textContent:'',hidden:id==='guideSettings',
      focus(){},scrollIntoView(){},setAttribute(){},querySelector(selector){
        if(selector==='form') return form;
        return selector==='details[open]' ? null : button;
      }});
    return nodes.get(id);
  };
  const context = vm.createContext({
    document:{getElementById:id=>id==='guideSettingsForm'?form:node(id)},
    localStorage:{getItem:k=>store.get(k)??null,setItem:(k,v)=>store.set(k,String(v))},
    FormData:class{get(key){return fields[key];}},
    getDailyTaskState:()=>JSON.parse(JSON.stringify(daily)),
    saveDailyTaskState:st=>{daily=JSON.parse(JSON.stringify(st));}, renderDailyTask(){},
    matchMedia:()=>({matches:true}), navigator:{},
    answeredByEp:progress?{16:[0,1]}:{},ep:progress?18:16,idx:progress?2:0,
    switchMainTab(){}, SENTENCE_AMMO_MAP2:{}, SENTENCE_GRAMMAR_MAP:{},
    speakSentenceSmart(){}, openWorkshopPanel(){}, openWorldEntryPanel(){},
    jumpToMake(){}, jumpToDiaryWithSentence(){}, openGrammarCard(){}
  });
  vm.runInContext(read('episodes.js'),context);
  context.cur = () => vm.runInContext('EPS[ep].sentences[idx]',context);
  context.currentGlobalIdx = () => context.ep*10+context.idx;
  context.selectEp = n => {context.ep=n;context.idx=0;context.guide.onSentence();};
  vm.runInContext(read('guide.js')+'\nthis.guide=LearningGuide;',context);
  context.guide.init();
  const click = action => node('learningEntry').onclick({target:{closest:()=>({dataset:{guideAction:action}})}});
  const save = () => listeners.submit({preventDefault(){}});
  return {context, store, fields, node, click, save, daily:()=>daily};
}

test('只換路線保留學習、收藏、花園、日記與今日任務勾選',()=>{
  const f=setup(), before=new Map(f.store);
  f.fields.guideRoute='b1'; f.save();
  for(const [key,value] of before) assert.equal(f.store.get(key),value,key);
  assert.deepEqual(f.daily().doneIdx,[0]);
  assert.deepEqual(JSON.parse(f.store.get('peppa_learning_preferences_v1')),{route:'b1',pending:true});
  assert.equal(f.context.ep,18);
  assert.equal(f.context.idx,2);
});

test('改時間或能量只重排今日任務，不清除學習紀錄',()=>{
  const f=setup(), before=f.store.get('peppa_es_v4');
  f.fields.guideMinutes='30'; f.fields.guideEnergy='low'; f.save();
  assert.deepEqual(f.daily(),{tier:30,energy:'low',doneIdx:[]});
  assert.equal(f.store.get('peppa_es_v4'),before);
});

test('回訪者開始練習時保留原本集數與句子',()=>{
  const f=setup(); f.click('start');
  assert.equal(f.context.ep,18); assert.equal(f.context.idx,2);
  assert.match(f.node('guidedPractice').innerHTML,/建議 5 句/);
});

test('尚未開始的新路線在重新載入後仍前往對應既有劇情',()=>{
  for(const [route,episode] of [['a1',16],['a2',18],['b1',10]]){
    const f=setup({saved:JSON.stringify({route,pending:true})});
    f.fields.guideRoute=route; f.click('start');
    assert.equal(f.context.ep,episode,route); assert.equal(f.context.idx,0);
    assert.equal(JSON.parse(f.store.get('peppa_learning_preferences_v1')).pending,false);
  }
});

test('試一句可隨時回 A1；重看同一句不重複計數，也不限制下一句',()=>{
  const f=setup({saved:JSON.stringify({route:'b1',pending:false})});
  f.fields.guideRoute='b1'; f.click('try');
  assert.equal(f.context.ep,16); assert.equal(f.context.idx,0);
  assert.match(f.node('guidedPractice').innerHTML,/建議 1 句/);
  f.context.guide.onReveal(); f.context.guide.onReveal();
  assert.match(f.node('guidedPractice').innerHTML,/已看過 1 句/);
  f.context.idx=1; f.context.guide.onSentence(); f.context.guide.onReveal();
  assert.match(f.node('guidedPractice').innerHTML,/已看過 2 句/);
});

test('損毀或未知的路線設定會回到可使用的 A1 起點',()=>{
  for(const saved of ['{bad json','null','{"route":"unknown"}']){
    const f=setup({saved,progress:false}); f.click('start');
    assert.equal(f.context.ep,16);
  }
});

test('備份實際輸出包含新設定與原有學習資產',async()=>{
  const f=setup({saved:'{"route":"a2","pending":false}'});
  let blob;
  const link={click(){},remove(){}};
  const context=vm.createContext({
    localStorage:{getItem:k=>f.store.get(k)??null}, Blob,
    URL:{createObjectURL:b=>{blob=b;return 'blob:qa';},revokeObjectURL(){}},
    document:{createElement:()=>link,body:{appendChild(){}}},setTimeout(){},toast(){}
  });
  const script=read('script.js');
  vm.runInContext(script.slice(script.indexOf('const BACKUP_KEYS ='),script.indexOf('function importBackupFile(')),context);
  vm.runInContext('exportBackup()',context);
  const result=JSON.parse(await blob.text());
  for(const [key,value] of f.store) assert.equal(result.data[key],value,key);
});
