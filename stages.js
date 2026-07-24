/* ── 實戰練習關卡 Stage 1 / 2 / 3 ── */

// ── Stage 2: tú / yo 人稱互換 ──
const TU_YO_PAIRS = [
  {yo:"Yo soy Nita.",          tu:"Tú eres Nita.",          zh:"我是妮妲。 你是妮妲。"},
  {yo:"Yo estoy mojado.",       tu:"Tú estás mojado.",        zh:"我濕透了。 你濕透了。"},
  {yo:"Yo puedo salir.",        tu:"Tú puedes salir.",        zh:"我可以出去。 你可以出去。"},
  {yo:"Yo debo ponerme las botas.", tu:"Tú debes ponerte las botas.", zh:"我該穿上雨鞋。 你該穿上雨鞋。"},
  {yo:"Me encanta saltar.",     tu:"¿Te encanta saltar?",     zh:"我超愛跳。 你超愛跳嗎？"},
  {yo:"He encontrado el charco.", tu:"Has encontrado el charco.", zh:"我找到水坑了。 你找到水坑了。"},
  {yo:"No me preocupo.",       tu:"No te preocupes.",         zh:"我不擔心。 你不要擔心。"}
];

// ── Stage 3: S/V/O 三格造句 ──
const S3_SUBJECTS = [
  {es:"Yo", zh:"我"},
  {es:"Tú", zh:"你"},
];

// lock_s: 只能配哪個主詞（null = 自由變位）
// no_subj_prefix: 輸出時不加主詞（Me encanta / he encontrado 已含主格）
// obj_type: 這個動詞的補語要接哪種 S3_OBJECTS（'noun'=身分名詞／'inf'=不定詞動作）
const S3_VERBS = [
  {id:"soy",    verb_yo:"soy",           verb_tu:null,     zh:"是",     lock_s:"Yo",  no_subj_prefix:false, obj_type:"noun"},
  {id:"estoy",  verb_yo:"estoy",         verb_tu:null,     zh:"正在",   lock_s:"Yo",  no_subj_prefix:false, obj_type:"noun"},
  {id:"encanta",verb_yo:"Me encanta",    verb_tu:null,     zh:"超愛",   lock_s:"Yo",  no_subj_prefix:true,  obj_type:"inf"},
  {id:"heen",   verb_yo:"he encontrado", verb_tu:null,     zh:"找到了", lock_s:"Yo",  no_subj_prefix:true,  obj_type:"noun"},
  {id:"eres",   verb_yo:null,            verb_tu:"eres",   zh:"是",     lock_s:"Tú",  no_subj_prefix:false, obj_type:"noun"},
  {id:"poder",  verb_yo:"puedo",         verb_tu:"puedes", zh:"可以",   lock_s:null,  no_subj_prefix:false, obj_type:"inf"},
  {id:"deber",  verb_yo:"debo",          verb_tu:"debes",  zh:"該",     lock_s:null,  no_subj_prefix:false, obj_type:"inf"},
];

// has_gender: true → 依 ♂/♀ 切換字尾；type: 'noun'=身分名詞／'inf'=不定詞動作
const S3_OBJECTS = [
  {es_m:"estudiante",                es_f:"estudiante",               zh:"學生",      has_gender:false, type:"noun"},
  {es_m:"amigo",                     es_f:"amiga",                    zh:"朋友",      has_gender:true,  type:"noun"},
  {es_m:"detective",                 es_f:"detective",                zh:"偵探",      has_gender:false, type:"noun"},
  {es_m:"médico",                    es_f:"médica",                   zh:"醫生",      has_gender:true,  type:"noun"},
  {es_m:"chapotear en charcos de barro",es_f:"chapotear en charcos de barro",zh:"玩泥巴水坑",has_gender:false, type:"inf"},
  {es_m:"salir a jugar",             es_f:"salir a jugar",            zh:"出去玩",    has_gender:false, type:"inf"},
  {es_m:"ver la televisión",         es_f:"ver la televisión",        zh:"看電視",    has_gender:false, type:"inf"},
  {es_m:"lavarme las manos",         es_f:"lavarme las manos",        zh:"洗手",      has_gender:false, type:"inf"},
];

let _s3Gender='male', _s3SelectedSubjEs=null, _s3SelectedVerbId=null, _s3SelectedObjIdx=null;

// ── Stage 1 State ──
let _s1Pool = [];
let _s1Idx = 0;
let _s1Order = [];
let _s1Done = [];

function _stageChunkClass(role){
  if(role==='v') return 'role-v';
  if(role==='s') return 'role-s';
  if(role==='o') return 'role-o';
  if(role==='c') return 'role-c';
  return 'role-plain';
}

function _buildS1Pool(){
  _s1Pool = [];
  AMMO_DATA.forEach(a => {
    if(a.fire_daily){
      a.fire_daily.forEach(fd => {
        if(fd.chunks && fd.chunks.length > 1) _s1Pool.push(fd);
      });
    }
  });
  // 花園加權：句子含 🍀 語塊權重 3、🍃 權重 2、其餘 1（🌻 不加權）
  let weights = _s1Pool.map(()=>1);
  try{
    if(typeof getGardenDB==='function' && typeof gardenWeightOf==='function'){
      const db = getGardenDB();
      const boosted = Object.keys(db)
        .map(k => ({ k: k.toLowerCase(), w: gardenWeightOf(db[k]) }))
        .filter(o => o.w > 1 && o.k.length > 2);
      if(boosted.length){
        weights = _s1Pool.map(f => {
          const sent = (f.es||'').toLowerCase();
          let w = 1;
          boosted.forEach(o => { if(o.w > w && sent.includes(o.k)) w = o.w; });
          return w;
        });
      }
    }
  }catch(e){}
  const weightedIdx = [];
  weights.forEach((w,i)=>{ for(let n=0;n<w;n++) weightedIdx.push(i); });
  for(let i=weightedIdx.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [weightedIdx[i],weightedIdx[j]]=[weightedIdx[j],weightedIdx[i]];
  }
  const seen = new Set();
  _s1Order = [];
  weightedIdx.forEach(i => { if(!seen.has(i)){ seen.add(i); _s1Order.push(i); } });
  _s1Idx = 0;
  _s1Done = [];
}

function startStage1(){
  if(!_s1Pool.length || _s1Idx >= _s1Pool.length) _buildS1Pool();
  _renderS1();
}

function _renderS1(){
  const resultEl = document.getElementById('stage1Result');
  resultEl.style.display = 'none';

  const fire = _s1Pool[_s1Order[_s1Idx % _s1Order.length]];
  if(!fire){ document.getElementById('stage1Target').textContent = '（所有句子練習完畢！再按一次重新開始）'; return; }

  document.getElementById('stage1Target').textContent = '👆 點語塊，還原原句順序（點錯了點一下已選的字就能收回）';

  // shuffle chunks
  // 過濾掉全形括號中文主詞提示（如「（我）」「（你們）」）
  const visibleChunks = fire.chunks.filter(c => !/^（.*）$/.test(c.w.trim()));
  const shuffled = [...visibleChunks];
  for(let i=shuffled.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];
  }

  const area = document.getElementById('stage1Chunks');
  area.innerHTML = '';
  area.dataset.answer = fire.es;
  area.dataset.order = '[]';

  const built = [];

  shuffled.forEach((c,i)=>{
    const pill = document.createElement('span');
    pill.className = 'stage-chunk-pill '+_stageChunkClass(c.role);
    if(c.role==='v'){ pill.innerHTML = renderVWords(c.w); } else { pill.textContent = c.w; }
    pill.dataset.idx = i;
    pill.dataset.w = c.w;
    pill.onclick = () => _s1Pick(pill, c, built, visibleChunks, fire, area);
    area.appendChild(pill);
  });

  _s1Idx++;
}

function _s1Pick(pill, c, built, visibleChunks, fire, area){
  speakWord(c.w, pill);
  if(pill.classList.contains('used')) return;
  pill.classList.add('used');
  pill.style.opacity = '0.35';
  built.push({w:c.w, pill});

  _s1RenderTarget(built, visibleChunks, fire);

  if(built.length === visibleChunks.length){
    const result = document.getElementById('stage1Result');
    const built_str = built.map(b=>b.w).join(' ');
    const correct_str = visibleChunks.map(x=>x.w).join(' ');
    const ok = built_str === correct_str;
    result.className = 'stage-result '+(ok?'ok':'err');
    result.innerHTML = ok ? '✅ 正確！'+fire.zh : '🐛 ¡Ay! — 發現一隻漏網的毛毛蟲，快把這個語塊重新打磨一下！<br>原句：'+correct_str+' ／ '+fire.zh;
    result.style.display = 'block';
    if(ok) speakSentence(fire.es);
  }
}

// 點已選的字 → 收回這個字，還原成可再選的語塊
function _s1RenderTarget(built, visibleChunks, fire){
  const target = document.getElementById('stage1Target');
  target.innerHTML = '';
  if(!built.length){
    target.textContent = '👆 點語塊，還原原句順序（點錯了點一下已選的字就能收回）';
    return;
  }
  built.forEach((b,i)=>{
    if(i>0) target.appendChild(document.createTextNode(' '));
    const chip = document.createElement('span');
    chip.className = 'stage1-built-chip';
    chip.textContent = b.w;
    chip.title = '點一下收回';
    chip.onclick = () => _s1Undo(i, built, visibleChunks, fire);
    target.appendChild(chip);
  });
}

function _s1Undo(i, built, visibleChunks, fire){
  const removed = built.splice(i,1)[0];
  if(removed){
    removed.pill.classList.remove('used');
    removed.pill.style.opacity = '';
  }
  const result = document.getElementById('stage1Result');
  if(result) result.style.display = 'none';
  _s1RenderTarget(built, visibleChunks, fire);
}

// ── Stage 2: 你我互換 真人音檔優先，找不到才TTS ──
function speakStage2(i, who, text){
  const file = (typeof STAGE2_AUDIO_MAP!=='undefined' && STAGE2_AUDIO_MAP[i]) ? STAGE2_AUDIO_MAP[i][who] : null;
  if(!file){ speakSentence(text); return; }
  _stopActiveAudio();
  const player = new Audio(file);
  _activeAudio = player;
  player.onerror = () => speakSentence(text);
  player.play().catch(()=>speakSentence(text));
}

// ── Stage 2: 你我互換 render ──
function renderStage2(){
  const el = document.getElementById('stage2Cards');
  if(!el) return;
  const _gdb = typeof getGardenDB==='function' ? getGardenDB() : {};
  const _gs  = typeof GARDEN_STAGES!=='undefined' ? GARDEN_STAGES : ['𑁍','🌱','🍃','🍀','🌻'];
  el.innerHTML = TU_YO_PAIRS.map((p,i)=>{
    const _key = 's2_p'+i;
    const _stage = (_gdb[_key]||{stage:0}).stage;
    const _icon = _gs[_stage];
    return `
    <div class="stage2-row">
      <span class="stage2-yo-text" onclick="speakStage2(${i},'yo','${escStage(p.yo)}')">${p.yo}</span>
      <span class="stage2-tu-text" onclick="speakStage2(${i},'tu','${escStage(p.tu)}')">${p.tu}</span>
    </div>
    <div class="stage2-zh-row">
      <span class="stage2-zh-text">${p.zh}</span>
      <button class="s2-star-btn${_stage===0?' garden-empty':''}" onclick="if(typeof handleGardenProgress==='function') handleGardenProgress('s2_p${i}',this)" title="收藏這組句型">${_icon}</button>
    </div>`;
  }).join('');
}

// ── Stage 3: S/V/O 三格造句 render ──
function renderStage3(){
  const el=document.getElementById('stage3Area');
  if(!el) return;
  _s3Gender='male'; _s3SelectedSubjEs=null; _s3SelectedVerbId=null; _s3SelectedObjIdx=null;
  el.innerHTML=`
    <div class="stage3-container">
      <div class="s3-gender-bar">
        <span class="s3-gender-label">⚥ 我是</span>
        <button class="s3-gender-btn is-active" data-g="male" onclick="s3SetGender('male')">♂ 男</button>
        <button class="s3-gender-btn" data-g="female" onclick="s3SetGender('female')">♀ 女</button>
      </div>
      <div class="sentence-output-box">
        <div class="output-label">🎬 你的造句</div>
        <div class="combined-sentence" id="s3CombinedText"><span style="color:var(--tlight);font-size:14px;font-weight:600">選主詞 → 動詞 → 補語…</span></div>
        <button class="speak-btn" id="s3SpeakBtn" onclick="s3SpeakCurrent()" disabled>🔊 聽整句</button>
      </div>
      <details class="s3-picker-section" open>
        <summary class="s3-picker-toggle">🧩 選語塊造句 ▾</summary>
        <div class="s3-col-wrap">
          <div class="s3-col-label s3-label-s">👤 主詞 S</div>
          <div class="s3-chip-pool" id="s3SubjPool">${_renderS3SubjChips()}</div>
        </div>
        <div class="s3-col-wrap">
          <div class="s3-col-label s3-label-v">⚡ 動詞 V</div>
          <div class="s3-chip-pool" id="s3VerbPool">${_renderS3VerbChips()}</div>
        </div>
        <div class="s3-col-wrap">
          <div class="s3-col-label s3-label-o">🎯 補語 O</div>
          <div class="s3-chip-pool" id="s3ObjPool">${_renderS3ObjChips()}</div>
        </div>
      </details>
      <div class="s3-learned-wrap">
        <div class="s3-col-label s3-label-learned">🎒 你學過的語塊庫</div>
        <input type="text" class="s3-learned-search" placeholder="🔍 搜尋學過的語塊…" oninput="filterS3LearnedPool(this.value)">
        <div id="s3LearnedPoolArea">${_renderS3LearnedPool()}</div>
      </div>
    </div>
  `;
  if(typeof bindLongPressCopyAll === 'function') bindLongPressCopyAll('.s3-learned-chip', el);
}

// ── 累積詞池（從完成過的句子自動收集，見 script.js accumulateSVOPool）──
function _s3LearnedChipRow(label, role, words){
  if(!words.length) return '';
  const chips = words.map(w=>`<button class="s3-chip s3-learned-chip s3-learned-${role}" data-search="${escStage(w).toLowerCase()}" onclick="speakGardenChunk('${escStage(w)}')">${w}<span class="s3-practice-btn" onclick="event.stopPropagation();s3BringToPractice('${escStage(w)}')" title="帶去造句練習">🌱</span></button>`).join('');
  return `<div class="s3-col-wrap"><div class="s3-col-label s3-label-${role}">${label}</div><div class="s3-chip-pool">${chips}</div></div>`;
}

// 學過的語塊 → 帶去造句練習：只展開＋捲動＋提示，不碰S3固定選字邏輯（A方案，2026-07-24 VERA定案）
function s3BringToPractice(text){
  const details = document.querySelector('.s3-picker-section');
  if(details) details.open = true;
  if(details) details.scrollIntoView({behavior:'smooth', block:'start'});
  toast(`🌱 用「${text}」練習：試著選語塊組出類似的句子`);
}

function filterS3LearnedPool(query){
  const q = query.trim().toLowerCase();
  document.querySelectorAll('#s3LearnedPoolArea .s3-learned-chip').forEach(chip => {
    chip.style.display = (!q || (chip.dataset.search||'').includes(q)) ? '' : 'none';
  });
}

function _renderS3LearnedPool(){
  if(typeof svoPool==='undefined') return '<div class="s3-learned-empty">完成句子後這裡會累積你學過的語塊</div>';
  const rows = _s3LearnedChipRow('👤 S','s',svoPool.s) + _s3LearnedChipRow('⚡ V','v',svoPool.v) + _s3LearnedChipRow('🎯 O','o',svoPool.o);
  return rows || '<div class="s3-learned-empty">完成句子後這裡會累積你學過的語塊</div>';
}

function _renderS3SubjChips(){
  return S3_SUBJECTS.map(s=>{
    const isSel=_s3SelectedSubjEs===s.es;
    let isLocked=false;
    if(_s3SelectedVerbId){
      const verb=S3_VERBS.find(v=>v.id===_s3SelectedVerbId);
      if(verb && verb.lock_s && verb.lock_s!==s.es) isLocked=true;
    }
    const cls=`s3-chip s3-subj-chip${isSel?' is-selected':''}${isLocked?' is-disabled':''}`;
    return `<button class="${cls}" data-es="${escStage(s.es)}" onclick="s3SelectSubj('${escStage(s.es)}')" ${isLocked?'disabled':''}>${s.es}</button>`;
  }).join('');
}

function _renderS3VerbChips(){
  return S3_VERBS.filter(v=>{
    if(!_s3SelectedSubjEs) return true;
    return _s3SelectedSubjEs==='Yo' ? v.verb_yo!==null : v.verb_tu!==null;
  }).map(v=>{
    const isSel=_s3SelectedVerbId===v.id;
    const isOtherSel=_s3SelectedVerbId!==null && !isSel;
    let display;
    if(_s3SelectedSubjEs==='Yo') display=v.verb_yo;
    else if(_s3SelectedSubjEs==='Tú') display=v.verb_tu;
    else display=v.lock_s===null ? `${v.verb_yo}/${v.verb_tu}` : (v.verb_yo||v.verb_tu);
    const cls=`s3-chip s3-verb-chip${isSel?' is-selected':''}${isOtherSel?' is-disabled':''}`;
    return `<button class="${cls}" data-vid="${v.id}" onclick="s3SelectVerb('${v.id}')" ${isOtherSel?'disabled':''}>${display}</button>`;
  }).join('');
}

function _renderS3ObjChips(){
  const verb=S3_VERBS.find(v=>v.id===_s3SelectedVerbId);
  const wantType=verb ? verb.obj_type : null;
  return S3_OBJECTS.map((o,i)=>{
    if(wantType && o.type!==wantType) return '';
    const display=_s3Gender==='female' ? o.es_f : o.es_m;
    const isSel=_s3SelectedObjIdx===i;
    const badge=o.has_gender ? `<span class="s3-gender-badge">${_s3Gender==='female'?'♀':'♂'}</span>` : '';
    const cls=`s3-chip s3-obj-chip${isSel?' is-selected':''}`;
    return `<button class="${cls}" onclick="s3SelectObj(${i})">${display}${badge}</button>`;
  }).join('');
}

function s3SetGender(g){
  _s3Gender=g;
  document.querySelectorAll('.s3-gender-btn').forEach(b=>b.classList.toggle('is-active',b.dataset.g===g));
  const pool=document.getElementById('s3ObjPool');
  if(pool) pool.innerHTML=_renderS3ObjChips();
  _s3UpdateOutput3();
}

function s3SelectSubj(es){
  const turningOn = _s3SelectedSubjEs !== es;
  _s3SelectedSubjEs=(_s3SelectedSubjEs===es) ? null : es;
  if(_s3SelectedSubjEs && _s3SelectedVerbId){
    const verb=S3_VERBS.find(v=>v.id===_s3SelectedVerbId);
    if(verb && verb.lock_s && verb.lock_s!==_s3SelectedSubjEs) _s3SelectedVerbId=null;
  }
  const sp=document.getElementById('s3SubjPool');
  if(sp) sp.innerHTML=_renderS3SubjChips();
  const vp=document.getElementById('s3VerbPool');
  if(vp) vp.innerHTML=_renderS3VerbChips();
  _s3UpdateOutput3();
  if(turningOn && _s3SelectedSubjEs){
    const file = _s3SelectedSubjEs==='Yo' ? 'audio/vocab/so/Yo.mp3' : 'audio/vocab/so/Tu.mp3';
    _s3PlayAudioSeq([file], _s3SelectedSubjEs);
  }
}

function s3SelectVerb(vid){
  const turningOn = _s3SelectedVerbId !== vid;
  if(_s3SelectedVerbId===vid){
    _s3SelectedVerbId=null;
  } else {
    _s3SelectedVerbId=vid;
    const verb=S3_VERBS.find(v=>v.id===vid);
    if(verb && verb.lock_s) _s3SelectedSubjEs=verb.lock_s;
    if(verb && _s3SelectedObjIdx!==null && S3_OBJECTS[_s3SelectedObjIdx].type!==verb.obj_type) _s3SelectedObjIdx=null;
  }
  const sp=document.getElementById('s3SubjPool');
  if(sp) sp.innerHTML=_renderS3SubjChips();
  const vp=document.getElementById('s3VerbPool');
  if(vp) vp.innerHTML=_renderS3VerbChips();
  const op=document.getElementById('s3ObjPool');
  if(op) op.innerHTML=_renderS3ObjChips();
  _s3UpdateOutput3();
  if(turningOn && _s3SelectedVerbId){
    const verb=S3_VERBS.find(v=>v.id===_s3SelectedVerbId);
    const audioMap = (typeof S3_VERB_AUDIO!=='undefined' && S3_VERB_AUDIO[verb.id]) || {};
    const subjKey = _s3SelectedSubjEs || (verb.verb_yo!==null ? 'Yo' : 'Tú');
    const file = audioMap[subjKey];
    const fallback = subjKey==='Tú' ? (verb.verb_tu||verb.verb_yo) : (verb.verb_yo||verb.verb_tu);
    if(file) _s3PlayAudioSeq([file], fallback);
    else speakFull(fallback);
  }
}

function s3SelectObj(idx){
  const turningOn = _s3SelectedObjIdx !== idx;
  _s3SelectedObjIdx=(_s3SelectedObjIdx===idx) ? null : idx;
  const op=document.getElementById('s3ObjPool');
  if(op) op.innerHTML=_renderS3ObjChips();
  _s3UpdateOutput3();
  if(turningOn && _s3SelectedObjIdx!==null){
    const audio = (typeof S3_OBJ_AUDIO!=='undefined' && S3_OBJ_AUDIO[_s3SelectedObjIdx]) || {};
    const file = _s3Gender==='female' ? audio.f : audio.m;
    const obj = S3_OBJECTS[_s3SelectedObjIdx];
    const fallback = _s3Gender==='female' ? obj.es_f : obj.es_m;
    if(file) _s3PlayAudioSeq([file], fallback);
    else speakFull(fallback);
  }
}

function _s3UpdateOutput3(){
  const out=document.getElementById('s3CombinedText');
  const btn=document.getElementById('s3SpeakBtn');
  if(!out) return;
  if(!_s3SelectedVerbId || !_s3SelectedSubjEs){
    out.innerHTML='<span style="color:var(--tlight);font-size:14px;font-weight:600">選主詞 → 動詞 → 補語…</span>';
    if(btn) btn.disabled=true; return;
  }
  const verb=S3_VERBS.find(v=>v.id===_s3SelectedVerbId);
  const subj=S3_SUBJECTS.find(s=>s.es===_s3SelectedSubjEs);
  const verbEs=_s3SelectedSubjEs==='Tú' ? verb.verb_tu : verb.verb_yo;
  let esText=verb.no_subj_prefix ? verbEs : `${subj.es} ${verbEs}`;
  let zhText=verb.no_subj_prefix ? verb.zh : `${subj.zh}${verb.zh}`;
  if(_s3SelectedObjIdx!==null){
    const obj=S3_OBJECTS[_s3SelectedObjIdx];
    const objEs=_s3Gender==='female' ? obj.es_f : obj.es_m;
    esText+=` ${objEs}.`; zhText+=obj.zh;
    out.innerHTML=`<div class="s3-out-es">${esText}</div><div class="s3-out-zh">${zhText}</div>`;
    if(btn) btn.disabled=false;
  } else {
    out.innerHTML=`<div class="s3-out-es">${esText} <span style="color:var(--tlight)">…</span></div><div class="s3-out-zh">${zhText}…</div>`;
    if(btn) btn.disabled=true;
  }
}

// 真人音檔對照(so.zip)：só有錄一種變位形態的動詞，主詞不符時該筆為 null → fallback TTS
const S3_VERB_AUDIO = {
  soy:    {Yo:'audio/vocab/so/so_v_01.mp3'},
  estoy:  {Yo:'audio/vocab/so/so_v_02.mp3'},
  encanta:{Yo:'audio/vocab/so/so_v_03.mp3'},
  heen:   {Yo:'audio/vocab/so/so_v_04.mp3'},
  eres:   {'Tú':'audio/vocab/so/so_v_05.mp3'},
  poder:  {Yo:'audio/vocab/so/so_v_06.mp3', 'Tú':'audio/vocab/conj/conj_poder_tu.mp3'}, // puedes 借用變位庫既有音檔
  deber:  {'Tú':'audio/vocab/so/so_v_07.mp3', Yo:'audio/vocab/conj/conj_deber_yo.mp3'}, // debo 借用變位庫既有音檔
};
const S3_OBJ_AUDIO = [
  {m:'audio/vocab/so/so_n_01.mp3', f:'audio/vocab/so/so_n_01.mp3'}, // estudiante
  {m:'audio/vocab/so/so_n_02.mp3', f:'audio/vocab/so/so_n_03.mp3'}, // amigo/amiga
  {m:'audio/vocab/so/so_n_04.mp3', f:'audio/vocab/so/so_n_04.mp3'}, // detective
  {m:'audio/vocab/so/so_n_05.mp3', f:'audio/vocab/so/so_n_06.mp3'}, // médico/médica
  {m:'audio/vocab/so/so_n_07.mp3', f:'audio/vocab/so/so_n_07.mp3'}, // chapotear en charcos de barro（音檔待重錄，目前仍是舊字saltar的錄音）
  {m:'audio/vocab/so/so_n_08.mp3', f:'audio/vocab/so/so_n_08.mp3'}, // salir a jugar
  {m:'audio/vocab/so/so_n_09.mp3', f:'audio/vocab/so/so_n_09.mp3'}, // ver la televisión
  {m:'audio/vocab/so/so_n_10.mp3', f:'audio/vocab/so/so_n_10.mp3'}, // lavarme las manos
];
let _s3AudioPlayer = null;
function _s3PlayAudioSeq(files, fallbackText){
  if(_s3AudioPlayer) _s3AudioPlayer.pause();
  _stopActiveAudio();
  let i=0;
  const player=new Audio();
  _s3AudioPlayer=player;
  _activeAudio=player;
  player.onended=()=>{ i++; setTimeout(next,15); };
  player.onerror=()=>{ speakFull(fallbackText); };
  function next(){
    if(i>=files.length || player!==_s3AudioPlayer) return;
    player.src=files[i];
    player.play().catch(()=>speakFull(fallbackText));
  }
  next();
}

function s3SpeakCurrent(){
  if(!_s3SelectedVerbId||!_s3SelectedSubjEs||_s3SelectedObjIdx===null) return;
  const verb=S3_VERBS.find(v=>v.id===_s3SelectedVerbId);
  const verbEs=_s3SelectedSubjEs==='Tú' ? verb.verb_tu : verb.verb_yo;
  const obj=S3_OBJECTS[_s3SelectedObjIdx];
  const objEs=_s3Gender==='female' ? obj.es_f : obj.es_m;
  const full=verb.no_subj_prefix ? `${verbEs} ${objEs}.` : `${_s3SelectedSubjEs} ${verbEs} ${objEs}.`;

  const verbAudio = (S3_VERB_AUDIO[verb.id]||{})[_s3SelectedSubjEs];
  const objAudio = _s3Gender==='female' ? S3_OBJ_AUDIO[_s3SelectedObjIdx].f : S3_OBJ_AUDIO[_s3SelectedObjIdx].m;
  if(verbAudio && objAudio){
    const files=[];
    if(!verb.no_subj_prefix) files.push(_s3SelectedSubjEs==='Yo' ? 'audio/vocab/so/Yo.mp3' : 'audio/vocab/so/Tu.mp3');
    files.push(verbAudio, objAudio);
    _s3PlayAudioSeq(files, full);
    return;
  }
  speakFull(full);
}

function escStage(s){ return String(s).replace(/'/g,"\\'"); }

// ── Toggle ──
function toggleStages(){
  const body = document.getElementById('stagesBody');
  const tog = document.getElementById('stagesToggle');
  if(!body) return;
  const open = body.classList.toggle('open');
  tog.textContent = open ? '▲ 收起' : '▼ 展開';
  if(open){
    renderStage2();
    renderStage3();
  }
}

// 2026-07-20 VERA回報：這裡原本呼叫switchMainTab('private')是錯的——
// .stages-wrap本來就在跟這顆按鈕同一個tab(tabPlay)裡，不是在穀倉大豐收(tabPrivate)，
// 切過去反而讓.stages-wrap被隱藏、scrollIntoView失效，使用者實際看到的是tabPrivate
// 頂端的💎醞釀私語窖，感覺像「跳到花園收藏」。已移除tab切換，只在原地展開+捲動。
function jumpToStages(){
  const body = document.getElementById('stagesBody');
  const tog = document.getElementById('stagesToggle');
  const wrap = document.querySelector('.stages-wrap');
  if(!body) return;
  body.classList.add('open');
  tog.textContent = '▲ 收起';
  renderStage2();
  renderStage3();
  setTimeout(()=>{
    if(wrap){
      wrap.scrollIntoView({behavior:'smooth',block:'start'});
      wrap.classList.add('ammo-flash');
      setTimeout(()=>wrap.classList.remove('ammo-flash'),1200);
    }
  },80);
}
