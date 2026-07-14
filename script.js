/* ── Peppa-Spanish S1 — Main Script ── */

const feedbackTemplates = {
  correct: [
    { text: "¡Éxito! — 已存入文法酷庫 💡", emoji: "✏️" },
    { text: "¡Genial! — 這題完全難不倒你！", emoji: "🌟" },
    { text: "¡Excelente! — 文法大師非你莫屬！", emoji: "👑" },
    { text: "¡Qué buena onda! — 語感整個來了唷！", emoji: "🔥" }
  ],
  incorrect: [
    { text: "¡A estudiar! — 看答案再試試！", emoji: "📖" },
    { text: "¡Ojo! — 這裡有個小陷阱，看答案再試試！", emoji: "👀" },
    { text: "¡Ánimo! — 差一點點，再調整一下！", emoji: "💪" },
    { text: "¡No te rindas! — 換個思路再挑戰一次！", emoji: "⚡" }
  ],
  reveal: [
    { text: "¡Ya está! — 又學會一句了唷 🎊", emoji: "👆" },
    { text: "¡Así se dice! — 語塊種子又長高了一點！🌱", emoji: "🙌" },
    { text: "¡Por fin! — 澆點文法養分，答案盛開囉！🌸", emoji: "💡" },
    { text: "¡Listo! — 收成新語塊，存入你的文法花園！🧺", emoji: "🏡" }
  ]
};
function getRandomFeedback(type){
  const list=feedbackTemplates[type];
  if(!list) return {text:'',emoji:''};
  return list[Math.floor(Math.random()*list.length)];
}

// ── 星星成就機制 ──
const unlockedStars = new Set();

function unlockStar(globalIdx){
  unlockedStars.add(globalIdx);
  updateStarDisplay();
}

function updateStarDisplay(){
  const el = document.getElementById('star-rating');
  if(!el) return;
  const epTotal = EPS[ep] ? EPS[ep].sentences.length : 10;
  let stars = '';
  for(let i = 0; i < epTotal; i++){
    const gIdx = ep * 10 + i;
    stars += unlockedStars.has(gIdx) ? '★' : '☆';
  }
  el.textContent = stars;
  // 顏色動態：全亮變金色
  el.style.color = unlockedStars.size >= epTotal ? '#D97706' : '#F59E0B';
}

// ── YOUGLISH PRONUNCIATION（僅手動複製，不做自動跳轉）──
function openYG(word, lang){
  const url = `https://youglish.com/pronounce/${encodeURIComponent(word)}/${lang}`;
  window.open(url, '_blank', 'noopener');
}

// ── WORDREFERENCE 直接跳轉（給單字：同源詞庫、詞綴單字卡）──
function openYGPanel(word){
  openWordReference(String(word).replace(/[¡¿.,!?;:（）]/g,'').trim());
}

function openWordReference(word){
  if(!word) return;
  window.open('https://www.wordreference.com/es/translation.asp?spen='+encodeURIComponent(word),'_blank','noopener');
  showPronBackup(word);
}

// ── 陌生詞彙收藏點擊：依內容判斷單字或語塊 ──
function pronounceVocab(text){
  const clean=String(text).replace(/[¡¿.,!?;:（）]/g,'').trim();
  if(!clean) return;
  if(clean.includes(' ')) speakWord(clean, null); // 語塊/句子 → TTS
  else openWordReference(clean); // 單字 → WordReference
}

// ── SPEECH SYNTHESIS (TTS) ──
let ttsReady = false;
let ttsVoice = null;

function initTTS(){
  if(!window.speechSynthesis){ return; }
  function pickVoice(){
    const voices = speechSynthesis.getVoices();
    ttsVoice = voices.find(v=>v.lang==='es-MX')
      || voices.find(v=>v.lang==='es-419')
      || voices.find(v=>v.lang==='es-US')
      || voices.find(v=>v.lang==='es-ES')
      || voices.find(v=>v.lang.startsWith('es'))
      || null;
    if(voices.length > 0){
      ttsReady = true;
      const dot = document.getElementById('ttsDot');
      if(dot) dot.classList.add('ready');
    }
  }
  // Chrome loads voices async
  if(speechSynthesis.getVoices().length > 0) pickVoice();
  speechSynthesis.addEventListener('voiceschanged', pickVoice);
}

function speakWord(text, el){
  if(!window.speechSynthesis){ toast('⚠️ 此瀏覽器不支援語音'); return; }
  const clean = text.replace(/[¡!¿?,.:;\s]/g,'').trim();
  if(!clean) return;
  // Must cancel first on Android or it queues silently
  try{ speechSynthesis.cancel(); }catch(e){}
  const utt = new SpeechSynthesisUtterance(clean);
  utt.lang = 'es-MX';
  utt.rate = 0.7;
  utt.pitch = 1.05;
  utt.volume = 1;
  if(ttsVoice) utt.voice = ttsVoice;
  const dot = document.getElementById('ttsDot');
  if(el) el.classList.add('playing');
  if(dot){ dot.classList.remove('ready'); dot.classList.add('speaking'); }
  utt.onend = () => {
    if(el) el.classList.remove('playing');
    if(dot){ dot.classList.remove('speaking'); dot.classList.add('ready'); }
  };
  utt.onerror = (e) => {
    if(el) el.classList.remove('playing');
    if(dot){ dot.classList.remove('speaking'); dot.classList.add('ready'); }
  };
  // Wrap in setTimeout(0) — helps some Android WebView trigger correctly
  setTimeout(() => {
    try{ speechSynthesis.speak(utt); }catch(e){ toast('⚠️ 語音播放失敗'); }
  }, 0);
}

function speakFull(text){
  speakWord(text.replace(/[¡¿]/g,''), null);
}

// ── 真人錄音音檔優先播放，找不到時 fallback 回瀏覽器 TTS ──
function speakSentenceSmart(epIdx, sentIdx, text){
  const files = (typeof AUDIO_MANIFEST!=='undefined' && AUDIO_MANIFEST[epIdx] && AUDIO_MANIFEST[epIdx][sentIdx]) || [];
  if(!files.length){ speakFull(text); return; }
  let i = 0;
  const player = new Audio();
  player.onended = () => { i++; setTimeout(playNext, 30); };
  player.onerror = () => { speakFull(text); };
  function playNext(){
    if(i >= files.length) return;
    player.src = files[i];
    player.play().catch(()=>speakFull(text));
  }
  playNext();
}

// ── 彈藥庫卡片標題（core_ammo）跟課文原句逐字相同，借用課文真人音檔 ──
function speakAmmoCore(ammoId, text){
  const m = (ammoId||'').match(/^e(\d+)_(\d+)$/);
  if(m){ speakSentenceSmart(parseInt(m[1],10)-1, parseInt(m[2],10)-1, text); }
  else { speakFull(text); }
}

// ── 彈藥庫「🔥全速運轉」日常例句，真人音檔優先，找不到時 fallback 回瀏覽器 TTS ──
function speakAmmoDaily(ammoId, dailyIdx, text){
  const file = (typeof AMMO_DAILY_AUDIO_MAP!=='undefined' && AMMO_DAILY_AUDIO_MAP[ammoId] && AMMO_DAILY_AUDIO_MAP[ammoId][dailyIdx]) || null;
  if(!file){ speakFull(text); return; }
  const player = new Audio(file);
  player.onerror = () => speakFull(text);
  player.play().catch(()=>speakFull(text));
}

// ── 真人錄音音檔優先播放（單檔版，mom.js/corazon.js 用），找不到時 fallback 回瀏覽器 TTS ──
function speakMapSmart(map, catKey, idx, text){
  const file = (typeof window[map]!=='undefined' && window[map][catKey] && window[map][catKey][idx]) || null;
  if(!file){ speakFull(text); return; }
  const player = new Audio(file);
  player.onerror = () => speakFull(text);
  player.play().catch(()=>speakFull(text));
}

function testTTS(){
  if(!window.speechSynthesis){ toast('⚠️ 此瀏覽器不支援語音朗讀'); return; }
  // Force init voices on first user tap
  if(!ttsReady){ initTTS(); }
  speakWord('Hola amigos', document.querySelector('.tts-badge'));
  toast('🔊 點語塊聽西語！點句子聽整句！');
}

/* EPS data → episodes.js */
// ── STATE ──
let ep=0,idx=0,revealed=false,score=0,makeScore=0,answered=[],makeAnswered=[];
let answeredByEp={};
let _epSwitching=false;
function currentGlobalIdx(){ return ep*10+idx; }
let vocab=[]; // cross-episode passbook
let makeOpen=false,builtTokens=[];
let isPlaying=false; // kept for compat

function epData(){return EPS[ep]}
function cur(){return epData().sentences[idx]}
function total(){return epData().sentences.length}

// ── INIT NAV ──
function buildNav(){
  const nav=document.getElementById('seasonNav');
  const existing=nav.querySelectorAll('.ep-chip');
  if(existing.length===EPS.length){
    existing.forEach((c,i)=>c.classList.toggle('active',i===ep));
    return;
  }
  nav.innerHTML='';
  EPS.forEach((e,i)=>{
    const chip=document.createElement('div');
    chip.className='ep-chip'+(i===ep?' active':'');
    chip.textContent=NUM_WORDS[i+1] ? NUM_WORDS[i+1].charAt(0).toUpperCase()+NUM_WORDS[i+1].slice(1) : `${i+1}`;
    chip.onclick=()=>selectEp(i);
    nav.appendChild(chip);
  });
}

function selectEp(n){
  _epSwitching=true;
  ep=n;idx=0;score=0;makeScore=0;answered=(answeredByEp[n]||[]).slice();makeAnswered=[];makeOpen=false;builtTokens=[];unlockedStars.clear();updateStarDisplay();
  document.getElementById('completeScreen').classList.remove('show');
  document.querySelector('.card-container').style.display='block';
  document.querySelector('.nav-row').style.display='flex';
  window.scrollTo({top:0,behavior:'instant'});
  buildNav();render();
  _epSwitching=false;
}

// ── STARS ──
function renderStars(){
  const n=total();
  const row=document.getElementById('starRow');
  const existing=row.querySelectorAll('.s-star');
  if(existing.length===n+1){
    for(let i=0;i<n;i++) existing[i].classList.toggle('lit',answered.includes(i));
    existing[n].classList.toggle('lit',answered.length===n);
  } else {
    row.innerHTML='';
    for(let i=0;i<n;i++){
      const s=document.createElement('span');
      s.className='s-star'+(answered.includes(i)?' lit':'');
      s.textContent='🌼';
      row.appendChild(s);
    }
    const epS=document.createElement('span');
    epS.className='s-star ep-star'+(answered.length===n?' lit':'');
    epS.textContent='🌻';
    row.appendChild(epS);
  }
  document.getElementById('starLabel').textContent='';
}

/* AMMO data → ammo.js */

// ── AMMO STATE ──
let ammoUnlocked = []; // array of ammo_ids unlocked so far
let ammoStars = {};    // {ammo_id: 0|1|2}

// ── Stage3 累積詞池：完成句子時從 chunks 抓 role=s/v/o 塞進來 ──
let svoPool = { s:[], v:[], o:[] };

function accumulateSVOPool(globalIdx){
  const epI = Math.floor(globalIdx/10), idxI = globalIdx%10;
  const sentence = EPS[epI] && EPS[epI].sentences[idxI];
  if(!sentence || !sentence.chunks) return;
  sentence.chunks.forEach(c=>{
    if(c.role==='s'||c.role==='v'||c.role==='o'){
      if(!svoPool[c.role].includes(c.w)) svoPool[c.role].push(c.w);
    }
  });
}

// ── 分組導覽 (E1 only) ──
const AMMO_GROUPS = [
  { label:'uno',    range:['e1_01','e1_02','e1_03'] },
  { label:'dos',    range:['e1_04','e1_05'] },
  { label:'tres',   range:['e1_06','e1_07','e1_08'] },
  { label:'cuatro', range:['e1_09','e1_10'] }
];
let currentGroupIndex = 0;

// Map sentence global index → ammo_id(s) to unlock
// (SENTENCE_AMMO_MAP 保留作備充；實際使用 SENTENCE_AMMO_MAP2)
const SENTENCE_AMMO_MAP2 = {
  0:['e1_01'], 1:['e1_02'], 2:['e1_03'], 3:['e1_04'], 4:['e1_05'],
  5:['e1_06'], 6:['e1_07'], 7:['e1_08'], 8:['e1_09'], 9:['e1_10'],
  10:['e2_01'], 11:['e2_02'], 12:['e2_03'], 13:['e2_04'], 14:['e2_05'],
  15:['e2_06'], 16:['e2_07'], 17:['e2_08'], 18:['e2_09'], 19:['e2_10'],
  20:['e3_01'], 21:['e3_02'], 22:['e3_03'], 23:['e3_04'], 24:['e3_05'],
  25:['e3_06'], 26:['e3_07'], 27:['e3_08'], 28:['e3_09'], 29:['e3_10'],
  30:['e4_01'], 31:['e4_02'], 32:['e4_03'], 33:['e4_04'], 34:['e4_05'],
  35:['e4_06'], 36:['e4_07'], 37:['e4_08'], 38:['e4_09'], 39:['e4_10'],
  40:['e5_01'], 41:['e5_02'], 42:['e5_03'], 43:['e5_04'], 44:['e5_05'],
  45:['e5_06'], 46:['e5_07'], 47:['e5_08'], 48:['e5_09'], 49:['e5_10'],
  50:['e6_01'], 51:['e6_02'], 52:['e6_03'], 53:['e6_04'], 54:['e6_05'],
  55:['e6_06'], 56:['e6_07'], 57:['e6_08'], 58:['e6_09'], 59:['e6_10'],
};

function unlockAmmo(globalIdx){
  const ids = SENTENCE_AMMO_MAP2[globalIdx] || [];
  ids.forEach(id=>{
    if(!ammoUnlocked.includes(id)) ammoUnlocked.push(id);
  });
  renderAmmo();
  if(typeof checkStorageQuota === 'function') checkStorageQuota();
}

function cycleAmmoStar(ammoId, gardenKey){ handleGardenProgress(gardenKey, document.querySelector('#ammo-'+ammoId+' .ammo-star')); }

function escAttr(s){ return String(s).replace(/'/g,"\\'"); }

function getPersonClass(w){
  const t = w.replace(/[¡¿（）]/g,'').trim().toLowerCase();
  if(t==='yo') return 'person-yo';
  if(t==='tú'||t==='tu') return 'person-tu';
  return '';
}

function renderAmmoFireChunks(fire, ammoId, rowType){
  if(!fire.chunks || !fire.chunks.length) return '';
  const _fdb=getGardenDB();
  return `<div class="ammo-fire-chunks">${fire.chunks.map(c=>{
    const personCls=c.role==='s'?getPersonClass(c.w):'';
    const clean=c.w.replace(/[¡¿.,!?;:（）]/g,'').trim();
    const key='ammo_'+(ammoId||'x')+'_'+(rowType||'r')+'_'+clean;
    const _fst=GARDEN_STAGES[(_fdb[key]||{stage:0}).stage||0];
    const starHtml=`<span class="ammo-chunk-star" onclick="event.stopPropagation();handleGardenProgress('${escAttr(key)}',this)" title="語塊進度">${_fst}</span>`;
    const disp=c.role==='v'?renderVWords(c.w):c.w;
    return `<span class="ammo-fire-chunk role-${c.role||'plain'}${personCls?' '+personCls:''}" onclick="event.stopPropagation();ammoChunkTap('${escAttr(c.w)}',${!!c.hideYg},'${escAttr(c.note||'')}')">${disp}</span>${starHtml}`;
  }).join('')}</div>`;
}

function renderAmmoFireRow(fire, type, ammoId, dailyIdx){
  const tag = type==='peppa' ? '🎯 原句直擊（劇情原句）' : '🔥 全速運轉（日常對話）';
  const tsLabel = type==='peppa' && fire.ts!=null
    ? `<span class="ammo-fire-ts" onclick="seekYT(${fire.ts})">▶ ${Math.floor(fire.ts/60)}:${String(fire.ts%60).padStart(2,'0')}</span>`
    : '';
  let rowClick = '';
  if(type==='peppa'){
    if(fire.ts!=null){ rowClick = `seekYT(${fire.ts})`; }
    else {
      // fire_peppa.es 跟課文原句完全相同，直接借用課文的真人音檔
      const m = (ammoId||'').match(/^e(\d+)_(\d+)$/);
      rowClick = m ? `speakSentenceSmart(${parseInt(m[1],10)-1},${parseInt(m[2],10)-1},'${escAttr(fire.es)}')` : `speakFull('${escAttr(fire.es)}')`;
    }
  } else {
    rowClick = `speakAmmoDaily('${escAttr(ammoId)}',${dailyIdx},'${escAttr(fire.es)}')`;
  }
  return `<div class="ammo-fire-row ${type}" onclick="${rowClick}">
    <div class="ammo-fire-tag ${type}">${tag}${tsLabel}</div>
    <div class="ammo-fire-es">${fire.es}</div>
    <div class="ammo-fire-zh">${fire.zh}</div>
    ${renderAmmoFireChunks(fire, ammoId, type)}
  </div>`;
}

function renderAmmoPatternEs(a){
  let p = a.pattern;
  // 先替換 [Ser: ...] 標記（藍色）
  p = p.replace(/\[Ser:\s*([^\]]+)\]/g, '<span class="ammo-slot-ser">Ser: $1</span>');
  // 再替換 [Estar: ...] 標記（橘色）
  p = p.replace(/\[Estar:\s*([^\]]+)\]/g, '<span class="ammo-slot-estar">Estar: $1</span>');
  // 最後替換一般 slot（橘色框）
  if(a.slots){
    a.slots.forEach(s=>{
      p = p.replace(`[${s}]`, `<span class="ammo-slot">[${s}]</span>`);
    });
  }
  return p;
}

function renderBeVerbTag(a){
  if(!a.be_verb_type || a.be_verb_type === 'none') return '';
  const label = a.be_verb_type === 'ser' ? '🔵 Ser' : '🟠 Estar';
  return `<span class="be-verb-tag ${a.be_verb_type}">${label}</span>`;
}

function renderBeVerbNote(a){
  if(!a.be_verb_type || a.be_verb_type === 'none' || !a.be_verb_note) return '';
  return `<div class="be-verb-note ${a.be_verb_type}">💡 ${a.be_verb_note}</div>`;
}


// 西語數字 1-10：基數/序數/emoji 三態並列
const NUM_EMOJI=['','1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟'];
const NUM_WORDS=['','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez'];
const ORD_WORDS=['','primero','segundo','tercero','cuarto','quinto','sexto','séptimo','octavo','noveno','décimo'];

function renderAmmo(){
  document.getElementById('ammoCount').textContent = ammoUnlocked.length;
  const ammoTotalEl = document.getElementById('ammoTotal');
  if(ammoTotalEl) ammoTotalEl.textContent = AMMO_DATA.length;
  const el = document.getElementById('ammoEntries');
  if(!ammoUnlocked.length){
    el.innerHTML='<div class="passbook-empty">採集籃目前空空的 🧺快去巡田拾語，採收語塊吧！</div>';
    return;
  }
  const unlocked = AMMO_DATA.filter(a=>ammoUnlocked.includes(a.ammo_id));

  // 按集分組
  const groups = {};
  unlocked.forEach(a=>{
    const epNum = (a.ammo_id.match(/^e(\d+)_/)||['','1'])[1];
    if(!groups[epNum]) groups[epNum]={title:a.ep, cards:[]};
    groups[epNum].cards.push(a);
  });

  const currentEpNum = String(ep+1); // ep 是 0-indexed

  el.innerHTML = Object.keys(groups).sort((a,b)=>+a-+b).map(epNum=>{
    const g = groups[epNum];
    const isOpen = epNum === currentEpNum;

    const _ammoGardenDB = getGardenDB();
    const cardsHtml = g.cards.map(a=>{
      const star = GARDEN_STAGES[(_ammoGardenDB[a.core_ammo]||{stage:0}).stage||0];
      const dailyRows = a.fire_daily.map((f,fi)=>renderAmmoFireRow(f,'daily',a.ammo_id,fi)).join('');
      const num = parseInt((a.ammo_id.match(/(\d+)$/)||['','0'])[1],10);
      const numDisplay = `<span class="ammo-num-ep">ep${epNum}-${num}</span><span class="ammo-num-sep">·</span><span class="ammo-num-text">${NUM_WORDS[num]}</span><span class="ammo-num-sep">/</span><span class="ammo-num-text">${ORD_WORDS[num]}</span><span class="ammo-num-sep">/</span><span class="ammo-num-emoji">${NUM_EMOJI[num]}</span>`;
      return `<div class="ammo-card ammo-collapsed" id="ammo-${a.ammo_id}">
        <div class="ammo-header" onclick="toggleAmmoCard('${a.ammo_id}')">
          <span class="ammo-num">${numDisplay}</span>
          <span class="ammo-chevron">▾</span>
        </div>
        <div class="ammo-card-body">
          <div class="ammo-chunk-row">
            <span class="ammo-chunk" onclick="speakAmmoCore('${escAttr(a.ammo_id)}','${escAttr(a.core_ammo)}')">${a.core_ammo}</span>
            ${renderBeVerbTag(a)}
          </div>
          ${renderBeVerbNote(a)}
          <div class="ammo-label l-pattern" style="margin-bottom:5px">🔧 精煉配方</div>
          <div class="ammo-pattern-box">
            <div class="ammo-pattern-es">${renderAmmoPatternEs(a)}</div>
            <div class="ammo-pattern-zh">${a.pattern_zh}</div>
            <div class="ammo-pattern-note">${a.pattern_note}</div>
          </div>
          <div class="ammo-label l-fire" style="margin-bottom:5px">🌾 田間應用</div>
          <div class="ammo-fire-section">
            ${renderAmmoFireRow(a.fire_peppa,'peppa',a.ammo_id)}
            ${dailyRows}
          </div>
          <button class="btn-jump-make" onclick="event.stopPropagation();jumpToMake('${a.ammo_id}')">🐝 Bzz... 來去釀新句 ➔</button>
        </div>
        <div class="ammo-star" onclick="event.stopPropagation();cycleAmmoStar('${a.ammo_id}','${escAttr(a.core_ammo)}')">${star}</div>
      </div>`;
    }).join('');

    return `<div class="ammo-group${isOpen?' open':''}" id="ammo-group-${epNum}">
      <div class="ammo-group-header" onclick="toggleAmmoGroup('${epNum}')">
        <span class="ammo-group-title">${g.title}</span>
        <span class="ammo-group-count">${g.cards.length} / 10</span>
        <span class="ammo-group-chevron">▾</span>
      </div>
      <div class="ammo-group-body">${cardsHtml}</div>
    </div>`;
  }).join('');
}

function toggleAmmoCard(ammoId){
  const card=document.getElementById('ammo-'+ammoId);
  if(card) card.classList.toggle('ammo-collapsed');
}

function toggleAmmoGroup(epNum){
  const g=document.getElementById('ammo-group-'+epNum);
  if(g) g.classList.toggle('open');
}

// ── 分組導覽函式 ──
function ammoIdToSentenceIdx(id){ return parseInt(id.split('_')[1],10)-1; }

function jumpToMake(ammoId){
  const epNum = parseInt((ammoId.match(/^e(\d+)_/)||['','1'])[1],10);
  const sNum  = parseInt((ammoId.match(/_(\d+)$/)||['','1'])[1],10);
  if(!(EPS[epNum-1]||{sentences:[]}).sentences[sNum-1]) return;
  ep  = epNum - 1;
  idx = sNum  - 1;
  const ammoBody = document.getElementById('ammoBody');
  if(ammoBody && !ammoBody.classList.contains('open')) toggleAmmo();
  render(); // sync main card
  makeOpen = true;
  document.getElementById('makeBody').classList.add('show');
  document.getElementById('makeIcon').classList.add('open');
  populateMake(cur());
  document.querySelector('.ammo-make-entry')?.scrollIntoView({behavior:'smooth',block:'start'});
}

function initGroupButtons(){
  document.querySelectorAll('.sequence-segment-btn').forEach((btn,i)=>{
    btn.addEventListener('click',()=>{
      if(ep!==0) return;
      currentGroupIndex=i;
      idx=ammoIdToSentenceIdx(AMMO_GROUPS[i].range[0]);
      render();
    });
  });
}

function syncGroupBtn(){
  const wrap=document.getElementById('seqBarWrap');
  if(ep!==0){if(wrap)wrap.style.display='none';return;}
  if(wrap)wrap.style.display='';
  AMMO_GROUPS.forEach((g,i)=>{
    const first=ammoIdToSentenceIdx(g.range[0]);
    const last=ammoIdToSentenceIdx(g.range[g.range.length-1]);
    if(idx>=first&&idx<=last) currentGroupIndex=i;
  });
  document.querySelectorAll('.sequence-segment-btn').forEach((btn,i)=>{
    btn.classList.toggle('is-active',i===currentGroupIndex);
  });
  const entries=AMMO_GROUPS[currentGroupIndex].range
    .map(k=>AMMO_DATA.find(a=>a.ammo_id===k)).filter(Boolean);
  renderGroupFireArea(entries);
  const badge=document.getElementById('seqEpBadge');
  if(badge) badge.textContent=`ep${ep+1}. ${epData().titleZh}`;
}

function renderGroupFireArea(entries){
  const el=document.getElementById('groupFireArea');
  if(!el) return;
  el.innerHTML=entries.map(a=>`
    <div class="group-fire-card">
      <div class="group-fire-core" onclick="speakFull('${escAttr(a.core_ammo)}')">${a.core_ammo} <small style="color:var(--tlight);font-weight:500">${a.core_zh}</small></div>
      ${renderAmmoFireRow(a.fire_peppa,'peppa',a.ammo_id)}
      ${a.fire_daily.map((f,fi)=>renderAmmoFireRow(f,'daily',a.ammo_id,fi)).join('')}
    </div>
  `).join('');
}

function seekYT(sec){
  if(window.ytPlayer && typeof ytPlayer.seekTo==='function'){
    ytPlayer.seekTo(sec, true);
    ytPlayer.playVideo();
    // 展開播放器
    const ytBody=document.getElementById('ytBody');
    if(ytBody && !ytBody.classList.contains('open')) toggleYT();
    toast('▶ 跳到 '+Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0'));
  } else {
    toast('請先開啟下方影片播放器');
  }
}

function toggleAmmo(){
  const body=document.getElementById('ammoBody');
  const t=document.getElementById('ammoToggle');
  const open=body.classList.toggle('open');
  t.textContent=open?'▲ 收起':'▼ 展開';
}

// ── 骨架看完 → 跳到這句對應的語塊彈藥卡（S/V/O 分析 → 語塊記憶 的橋接）──
function jumpToAmmo(globalIdx){
  const ids = SENTENCE_AMMO_MAP2[globalIdx] || [];
  if(!ids.length) return;
  switchMainTab('play');
  unlockAmmo(globalIdx);
  const body=document.getElementById('ammoBody');
  const t=document.getElementById('ammoToggle');
  body.classList.add('open');
  t.textContent='▲ 收起';
  setTimeout(()=>{
    const card=document.getElementById('ammo-'+ids[0]);
    if(!card) return;
    card.classList.remove('ammo-collapsed');
    card.scrollIntoView({behavior:'smooth',block:'center'});
    card.classList.add('ammo-flash');
    setTimeout(()=>card.classList.remove('ammo-flash'),1200);
  },50);
}

// ── 英西同源詞庫總覽（COGNATE_LIBRARY → cognates.js） ──
// ── 陰陽字尾語塊卡 ──
function renderGenderPairs(){
  const el = document.getElementById('genderPairsBody');
  if(!el) return;
  el.innerHTML = GENDER_PAIRS.map((p,pi)=>`
    <div class="gp-card">
      <div class="gp-zh">${p.zh}</div>
      <div class="gp-toggles">
        ${p.options.map((o,oi)=>`<span class="gp-toggle ${o.suf==='a'?'gp-toggle-f':'gp-toggle-m'}" id="gp-${pi}-${oi}" onclick="pickGenderPair(${pi},${oi})">${o.word}</span>`).join('')}
      </div>
      <div class="gp-example" id="gp-ex-${pi}" style="display:none"></div>
    </div>`).join('');
  const preview = document.getElementById('genderPairsPreview');
  if(preview && GENDER_PAIRS.length){
    const p0 = GENDER_PAIRS[0];
    preview.textContent = `${p0.zh}：${p0.options.map(o=>o.word).join(' / ')}…`;
  }
}
function pickGenderPair(pi, oi){
  const p = GENDER_PAIRS[pi];
  const o = p.options[oi];
  p.options.forEach((_,i)=>{
    const el = document.getElementById(`gp-${pi}-${i}`);
    if(el) el.classList.toggle('active', i===oi);
  });
  const exEl = document.getElementById(`gp-ex-${pi}`);
  exEl.style.display = 'block';
  exEl.innerHTML = `<span class="gp-ex-es">▶ ${o.ex}</span><span class="gp-ex-zh">${o.exZh}</span>`;
  const file = (typeof GP_AUDIO_MAP!=='undefined' && GP_AUDIO_MAP[pi] && GP_AUDIO_MAP[pi][oi]) || null;
  if(file){
    const player = new Audio(file);
    player.onerror = () => speakSentence(o.ex);
    player.play().catch(()=>speakSentence(o.ex));
  } else {
    speakSentence(o.ex);
  }
}

function toggleGenderPairs(){
  const body=document.getElementById('genderPairsBody');
  const t=document.getElementById('genderPairsToggle');
  const open=body.classList.toggle('open');
  t.textContent=open?'▲ 收起':'▼ 展開';
}

function toggleCogLibrary(){
  const body=document.getElementById('cogLibraryBody');
  const t=document.getElementById('cogLibToggle');
  const open=body.classList.toggle('open');
  t.textContent=open?'▲ 收起':'▼ 展開';
}

// ── 🎧 同源詞英西對照雙語朗讀（42組，每組唸兩語言配對，組間留時間讓妳跟讀）──
// 有獨立的⏸暫停/▶繼續按鈕，妳可以自己控制節奏，不用相信我猜的間隔秒數
let _cogDualPlayer = null;
let _cogPaused = false;
let _cogState = null;
let _cogGen = 0; // 每次重新啟動就+1，讓上一輪殘留的onended/setTimeout失效，避免切換方向時字被重播
function playCognateDual(dir){
  if(_cogDualPlayer){ _cogDualPlayer.onended = null; _cogDualPlayer.onerror = null; _cogDualPlayer.pause(); }
  _cogPaused = false;
  _cogGen++;
  const myGen = _cogGen;
  const pauseBtn = document.getElementById('cogDualPauseBtn');
  if(pauseBtn){ pauseBtn.textContent='⏸ 暫停'; pauseBtn.style.display=''; }
  _cogState = {
    i: 1, step: 0, total: 42,
    firstFolder:  dir==='sp' ? 'audio/vocab/cognates_sp' : 'audio/vocab/cognates_en',
    firstPrefix:  dir==='sp' ? 'sp-sp-eng' : 'eng-sp-eng',
    secondFolder: dir==='sp' ? 'audio/vocab/cognates_en' : 'audio/vocab/cognates_sp',
    secondPrefix: dir==='sp' ? 'eng-sp-eng' : 'sp-sp-eng',
  };
  const player = new Audio();
  _cogDualPlayer = player;
  player.onended = () => _cogAdvance(myGen);
  player.onerror = () => { if(myGen===_cogGen){ toast('⚠️ 音檔播放失敗，已停止'); _cogState=null; } };
  _cogPlayCurrent(myGen);
}
function _cogPlayCurrent(myGen){
  if(myGen!==_cogGen) return;
  const st = _cogState;
  if(!st || st.i > st.total || !_cogDualPlayer) return;
  toast(`🎧 ${st.i}/${st.total}`);
  const folder = st.step===0 ? st.firstFolder : st.secondFolder;
  const prefix = st.step===0 ? st.firstPrefix : st.secondPrefix;
  _cogDualPlayer.src = `${folder}/${prefix}_${String(st.i).padStart(2,'0')}.mp3`;
  _cogDualPlayer.play().catch(()=>{ if(myGen===_cogGen){ toast('⚠️ 音檔播放失敗，已停止'); _cogState=null; } });
}
function _cogAdvance(myGen){
  if(myGen!==_cogGen || !_cogState) return;
  if(_cogState.step===0){ _cogState.step=1; } else { _cogState.step=0; _cogState.i++; }
  if(_cogPaused) return; // 暫停中，等使用者按繼續才會播下一步
  const gap = _cogState.step===0 ? 1800 : 500; // 換組長間隔，組內兩語言間短間隔
  setTimeout(()=>{ if(myGen===_cogGen && !_cogPaused) _cogPlayCurrent(myGen); }, gap);
}
function toggleCognateDualPause(btn){
  if(!_cogState || !_cogDualPlayer) return;
  _cogPaused = !_cogPaused;
  if(_cogPaused){ _cogDualPlayer.pause(); btn.textContent='▶ 繼續'; }
  else { btn.textContent='⏸ 暫停'; _cogPlayCurrent(_cogGen); }
}

function renderCogLibrary(filter){
  const body=document.getElementById('cogLibraryBody');
  if(!body) return;
  const q=(filter||'').toLowerCase().trim();
  let html=`<input type="text" class="cog-search" id="cogSearchInput" placeholder="🔍 搜尋英文／西語／中文…" value="${(filter||'').replace(/"/g,'&quot;')}">`;

  // 詞綴規律區（無搜尋時顯示）
  if(!q){
    html+=`<div class="suffix-section"><div class="suffix-title">🔤 前後綴歡心－英西鞏固一籮筐雙重解鎖</div>`;
    const _sfxDb = getGardenDB();
    SUFFIX_PATTERNS.forEach(p=>{
      html+=`<details class="suffix-group"><summary class="suffix-summary"><span class="suffix-rule">${p.rule}</span><span class="suffix-hint">${p.hint}</span></summary><div class="suffix-body">`;
      html+=p.words.map(w=>{
        const genderHtml = w.gendered
          ? `<div class="suffix-gender-row"><span class="sg-cell gender-ms">el ${w.gendered.ms}</span><span class="sg-cell gender-fs">la ${w.gendered.fs}</span><span class="sg-cell gender-mp">los ${w.gendered.mp}</span><span class="sg-cell gender-fp">las ${w.gendered.fp}</span></div>`
          : '';
        const addBtnHtml = isVocabWorthy(w.es) ? `<span class="vocab-add-btn" onclick="addToVocab('${escAttr(w.es)}','${escAttr(w.zh)}','詞綴規律')">＋</span>` : '';
        const chunksHtml = (w.ex?.chunks||[]).map(ck=>{
          const clean=ck.w.replace(/^[¡¿]+|[.!?,;:]+$/g,'').trim();
          if(!clean) return '<span class="suffix-ex-punct">'+ck.w+'</span>';
          const _sfKey='sfx_'+clean;
          const _sfSt=(_sfxDb[_sfKey]||{stage:0}).stage;
          const _sfIc=GARDEN_STAGES[_sfSt];
          const starHtml = isVocabWorthy(ck.w) ? '<span class="suffix-chunk-star'+(_sfSt===0?' garden-empty':'')+'" onclick="event.stopPropagation();handleGardenProgress(\'sfx_'+escAttr(clean)+'\',this)" title="語塊進度">'+_sfIc+'</span>' : '';
          const dispW=ck.role==='v'?renderVWords(ck.w):ck.w;
          return '<span class="suffix-ex-unit"><span class="suffix-ex-chunk role-'+ck.role+'" data-copy-text="'+escAttr(clean)+'" onclick="speakWord(\''+escAttr(clean)+'\',this)">'+dispW+'</span>'+starHtml+'</span>';
        }).join('');
        return `
        <div class="suffix-word-card">
          <div class="suffix-word-row">
            <span class="cog-en">${w.en}</span>
            <span class="cog-arrow">→</span>
            <span class="cog-es" onclick="openYGPanel('${escAttr(w.es)}')">${w.art?`<span class="cog-art">${w.art}</span> `:''}${w.es}</span>
            <span class="cog-zh">${w.zh}</span>
            ${addBtnHtml}
          </div>
          ${genderHtml}
          ${w.ex?`<div class="suffix-ex">
            <div class="suffix-ex-chunks">${chunksHtml}</div>
            <span class="suffix-ex-zh">${w.ex.zh}</span>
          </div>`:''}
        </div>`;
      }).join('');
      html+=`</div></details>`;
    });
    html+=`</div>`;

    html+=`<div class="falsecog-section"><div class="falsecog-title">🍄 小心這顆有毒：假野莓 False Cognates</div>
      <div class="falsecog-sub">長得跟英文超像，意思卻整個歪掉，吃錯了會鬧笑話</div>`;
    html+=FALSE_COGNATES.map(f=>`
      <div class="falsecog-card">
        <div class="falsecog-row">
          <span class="cog-es" onclick="openYGPanel('${escAttr(f.es)}')">${f.art?`<span class="cog-art">${f.art}</span> `:''}${f.es}</span>
          <span class="falsecog-notlike">🚫 不是「${f.looksLike}」（${f.wrongZh}）</span>
        </div>
        <div class="falsecog-real">✅ 真正意思：${f.realZh}</div>
        <div class="falsecog-trap">${f.trap}</div>
      </div>`).join('');
    html+=`</div>`;
  }

  if(!q){
    html+=`<div class="cog-dual-row">
      <button class="cog-dual-btn" onclick="playCognateDual('sp')">🎧 西 → 英 對照</button>
      <button class="cog-dual-btn" onclick="playCognateDual('en')">🎧 英 → 西 對照</button>
      <button class="cog-dual-btn cog-dual-pause" id="cogDualPauseBtn" style="display:none" onclick="toggleCognateDualPause(this)">⏸ 暫停</button>
    </div>`;
  }

  // 按集數分組
  const epOrder=[];
  const groups={};
  COGNATE_LIBRARY.forEach(c=>{
    if(q && !(c.en.toLowerCase().includes(q)||c.es.toLowerCase().includes(q)||c.zh.includes(q))) return;
    if(!groups[c.ep]){groups[c.ep]=[];epOrder.push(c.ep);}
    groups[c.ep].push(c);
  });
  if(!epOrder.length && q){
    html+=`<div class="passbook-empty">找不到符合的詞彙</div>`;
  } else {
    epOrder.forEach(epLabel=>{
      html+=`<div class="cog-group"><div class="cog-group-title">${epLabel}</div><div class="cog-row-list">`;
      html+=groups[epLabel].map(c=>`
        <div class="cog-row">
          <span class="cog-en">${c.en}</span>
          <span class="cog-arrow">→</span>
          <span class="cog-es" onclick="openYGPanel('${escAttr(c.es)}')">${c.art?`<span class="cog-art">${c.art}</span> `:''}${c.es}</span>
          <span class="cog-zh">${c.zh}</span>
          <span class="vocab-add-btn" onclick="addToVocab('${escAttr(c.es)}','${escAttr(c.zh)}','同源詞庫')">＋</span>
        </div>`).join('');
      html+=`</div></div>`;
    });
  }
  body.innerHTML=html;
  const input=document.getElementById('cogSearchInput');
  if(input){
    input.oninput=()=>renderCogLibrary(input.value);
    if(filter!==undefined){ input.focus(); const len=input.value.length; input.setSelectionRange(len,len); }
  }
  bindLongPressCopyAll('.suffix-ex-chunk', body);
  bindLongPressCopyAll('.cog-es', body);
}

// ── 陌生詞彙收藏（localStorage key: peppa_es_vocab_v1，獨立於 peppa_es_v4） ──
let vocabList=[];
// 熟悉度統一交給語塊花園系統（GARDEN_STAGES／handleGardenProgress），key 為 v.text

function addToVocab(text,zh,source){
  const clean=(text||'').replace(/[¡!¿?,.:;]+$/,'').replace(/^[¡¿]+/,'').trim();
  if(!clean) return;
  if(vocabList.some(v=>v.text===clean)){ toast('已經收藏過了！'); return; }
  vocabList.push({id:Date.now()+Math.random(), text:clean, zh:zh||'', source:source||''});
  saveVocabToLS();
  renderVocab();
  toast('☆ 已收藏到詞彙本！');
}

function removeFromVocab(id){
  vocabList=vocabList.filter(v=>v.id!==id);
  saveVocabToLS();
  renderVocab();
}

let _vocabCopyTimer=null;
function vocabLongPressStart(text){
  clearTimeout(_vocabCopyTimer);
  _vocabCopyTimer=setTimeout(()=>copyTextWithFeedback(text),600);
}
function vocabLongPressCancel(){
  clearTimeout(_vocabCopyTimer);
}

function renderVocab(){
  const countEl=document.getElementById('vocabCount');
  if(countEl) countEl.textContent=vocabList.length;
  const el=document.getElementById('vocabEntries');
  if(!el) return;
  if(!vocabList.length){
    el.innerHTML='<div class="passbook-empty">空空如也，高手在這邊💎</div>';
    return;
  }
  const gdb=getGardenDB();
  const stageOf=v=>(gdb[v.text]||{stage:0}).stage;
  const active=vocabList.filter(v=>stageOf(v)<4);
  const done=vocabList.filter(v=>stageOf(v)>=4);
  const renderCard=(v)=>{
    const stage=stageOf(v);
    const ex=findChunkExamples(v.text)[0];
    return `
    <div class="vocab-card${stage>=4?' vocab-done':''}">
      <div class="vocab-text">
        <div class="vocab-es" onclick="pronounceVocab('${escAttr(v.text)}')" ontouchstart="vocabLongPressStart('${escAttr(v.text)}')" ontouchend="vocabLongPressCancel()" ontouchmove="vocabLongPressCancel()" onmousedown="vocabLongPressStart('${escAttr(v.text)}')" onmouseup="vocabLongPressCancel()" onmouseleave="vocabLongPressCancel()">${v.text}</div>
        ${v.zh ? `<div class="vocab-zh">${v.zh}</div>` : ''}
        ${ex ? `<div class="vocab-example" onclick="speakFull('${escAttr(ex.es)}')"><span class="vocab-example-es">${ex.es}</span><span class="vocab-example-zh">${ex.zh}</span></div>` : ''}
        <div class="vocab-source">${v.source}</div>
      </div>
      <div class="vocab-right">
        <div class="vocab-star${stage===0?' garden-empty':''}" onclick="handleGardenProgress('${escAttr(v.text)}',this)" title="${_G_LABELS[stage]}">${GARDEN_STAGES[stage]}</div>
        <div class="vocab-remove" onclick="removeFromVocab(${v.id})">✕</div>
      </div>
    </div>`;
  };
  let html=active.map(renderCard).join('');
  if(done.length){
    html+=`<div class="vocab-done-header">✓ 已熟悉（${done.length}）</div>`;
    html+=done.map(renderCard).join('');
  }
  el.innerHTML=html;
}

function toggleVocabBox(){
  const body=document.getElementById('vocabBody');
  const t=document.getElementById('vocabToggle');
  const open=body.classList.toggle('open');
  t.textContent=open?'▲ 收起':'▼ 展開';
}

function saveVocabToLS(){
  try{ localStorage.setItem('peppa_es_vocab_v1', JSON.stringify(vocabList)); }catch(e){}
}
function loadVocabFromLS(){
  try{
    const raw=localStorage.getItem('peppa_es_vocab_v1');
    if(!raw) return;
    const d=JSON.parse(raw);
    if(Array.isArray(d)) vocabList=d;
  }catch(e){}
}


// 舊句型存摺已整合進語塊彈藥庫，stub 保留相容性
function togglePatternBook(){}
function addToPatternBook(){}
function renderPatternBook(){}
function cyclePatternStar(){}

function togglePatternBook(){}
// familiarity: 0=off, 1=half, 2=full
const STAR_STATES = ['☆','✨','⭐'];  // kept for compat
const GARDEN_STAGES = ['𑁍', '🌱', '🍃', '🍀', '🌻'];

function addToPassbook(sentence){ /* passbook removed */ }

function cycleStar(idx){/* removed */}

function renderPassbook(){/* removed */}

function togglePassbook(){/* removed */}

// ── MAKE SENTENCE — free type with pattern check ──
// Each sentence has a "pattern" = the structural slots
// We check if user sentence uses the SAME verb/structure slots
function getMakePattern(s){
  // v-role chunks = 動詞語塊；把裡面的字拆成一個個 word 供比對
  const verbWords = new Set(
    s.chunks.filter(c=>c.role==='v')
      .flatMap(c=>c.w.split(/\s+/))
      .map(w=>w.replace(/[¡!¿?,.:;]/g,'').toLowerCase())
  );
  return {
    es: s.es,
    display: s.es.replace(/\S+/g, w => {
      const clean = w.replace(/[¡!¿?,.:;]/g,'').toLowerCase();
      if(verbWords.has(clean)) return `<span class="mp-slot">${w}</span>`;
      return w;
    }),
    // key verbs that must appear
    keyVerbs: [...verbWords],
    wordCount: s.chunks.length,
  };
}

// ── EXPAND STATE ──
let expandSel = {}; // {key: selectedIndex}

function populateMake(s){
  expandSel={};
  const pat=getMakePattern(s);
  document.getElementById('makePatternBox').innerHTML=
    `<div style="font-size:10px;color:var(--tlight);font-weight:700;margin-bottom:4px">原句句型：</div>${pat.display}`;
  const expandMap=document.getElementById('expandMap');
  if(s.expand){ expandMap.style.display='block'; renderExpandMap(s.expand); }
  else { expandMap.style.display='none'; }
  document.getElementById('makeFreeInput').value='';
  document.getElementById('makeFreeInput').className='make-free-input';
  document.getElementById('makeResult').style.display='none';
  updateMakeNav();
}

function updateMakeNav(){
  const el=document.getElementById('makeNavCount');
  if(el) el.textContent=`${idx+1} / ${total()}`;
}

function _makeNavGo(){
  render();
  makeOpen=true;
  document.getElementById('makeBody').classList.add('show');
  document.getElementById('makeIcon').classList.add('open');
  populateMake(cur());
  document.querySelector('.ammo-make-entry')?.scrollIntoView({behavior:'smooth',block:'nearest'});
}

function makeNavNext(){
  if(idx<total()-1){idx++;_makeNavGo();}else showComplete();
}

function makeNavPrev(){
  if(idx>0){idx--;_makeNavGo();}
}

function toggleMake(){
  makeOpen=!makeOpen;
  document.getElementById('makeBody').classList.toggle('show',makeOpen);
  document.getElementById('makeIcon').classList.toggle('open',makeOpen);
  if(makeOpen) populateMake(cur());
}

function renderExpandMap(exp){
  const map=document.getElementById('expandMap');
  let html='';
  // Note about Este/Esta
  if(exp.note){
    html+=`<div style="font-size:11px;color:var(--benikake);font-weight:700;margin-bottom:6px;padding:6px 10px;background:rgba(132,145,195,.08);border-radius:8px;border-left:3px solid var(--benikake)">${exp.note}</div>`;
  }
  exp.groups.forEach(g=>{
    html+=`<div class="expand-group">`;
    html+=`<div class="expand-group-label">${g.label}</div>`;
    html+=`<div class="expand-chips">`;
    g.options.forEach((opt,i)=>{
      const isSel=expandSel[g.key]===i;
      const zhPart=g.key==='name'?'': ` <span class="exp-zh">${opt.zh}</span>`;
      html+=`<div class="exp-chip${isSel?' selected':''}" onclick="selectExpand('${g.key}',${i})">
        ${opt.es}${zhPart}
      </div>`;
    });
    html+=`</div></div>`;
  });
  // Preview sentence
  html+=`<div class="expand-preview" id="expandPreview">${buildExpandPreview(exp)}</div>`;
  map.innerHTML=html;
}

function selectExpand(key,i){
  const s=cur();
  if(!s.expand)return;
  expandSel[key]=i;
  // Auto-select size gender when rel changes
  if(key==='rel'){
    const relOpt=s.expand.groups.find(g=>g.key==='rel').options[i];
    // clear size selection if gender mismatch
    const sizeGroup=s.expand.groups.find(g=>g.key==='size');
    if(sizeGroup){
      const curSizeIdx=expandSel['size'];
      if(curSizeIdx!==undefined){
        const curSize=sizeGroup.options[curSizeIdx];
        if(curSize.gender!=='both'&&curSize.gender!==relOpt.gender){
          delete expandSel['size'];
        }
      }
    }
  }
  renderExpandMap(s.expand);
  // Fill input with built sentence
  const built=buildExpandSentence(s.expand);
  if(built){
    document.getElementById('makeFreeInput').value=built;
    speakFull(built);
  }
}

function buildExpandPreview(exp){
  if(exp.template) return buildExpandPreviewGeneric(exp);
  const relGroup=exp.groups.find(g=>g.key==='rel');
  const sizeGroup=exp.groups.find(g=>g.key==='size');
  const nameGroup=exp.groups.find(g=>g.key==='name');

  const rel  = relGroup  && expandSel['rel']  !==undefined ? relGroup.options[expandSel['rel']]   : null;
  const size = sizeGroup && expandSel['size'] !==undefined ? sizeGroup.options[expandSel['size']] : null;
  const name = nameGroup && expandSel['name'] !==undefined ? nameGroup.options[expandSel['name']] : null;

  // Determine Este/Esta from rel gender
  const dem = rel ? (rel.gender==='f' ? 'Esta' : 'Este') : '<span class="ep-demo">Este/Esta</span>';
  const relStr  = rel  ? `<span class="ep-demo">${rel.es}</span>`   : `<span style="color:var(--nezumi)">[關係詞]</span>`;
  const sizeStr = size ? `<span class="ep-demo">${size.es}</span>`  : `<span style="color:var(--nezumi)">[大小]</span>`;
  const nameStr = name ? `<span class="ep-demo">${name.es}</span>`  : `<span style="color:var(--nezumi)">[名字]</span>`;

  // Gender note
  let gNote='';
  if(rel&&size&&size.gender!=='both'&&size.gender!==rel.gender){
    gNote=`<span class="ep-gender-note">⚠️ ${rel.gender==='f'?'pequeña':'pequeño'} 才對</span>`;
  }

  return `${dem} <span class="ep-fixed">es mi</span> ${relStr} ${sizeStr} ${nameStr}${gNote}`;
}

// ── 通用版 expand（E2/E3 新句子用）：template = 固定字/佔位符 陣列 ──
function buildExpandPreviewGeneric(exp){
  return exp.template.map(tok=>{
    if(tok.t!==undefined) return `<span class="ep-fixed">${tok.t}</span>`;
    const g=exp.groups.find(g=>g.key===tok.g);
    const i=expandSel[tok.g];
    if(i===undefined) return `<span style="color:var(--nezumi)">[${g.label}]</span>`;
    return `<span class="ep-demo">${g.options[i].es}</span>`;
  }).join(' ');
}

function buildExpandSentenceGeneric(exp){
  const firstGroupKey=exp.groups[0].key;
  if(expandSel[firstGroupKey]===undefined) return '';
  const parts=exp.template.map(tok=>{
    if(tok.t!==undefined) return tok.t;
    const g=exp.groups.find(g=>g.key===tok.g);
    const i=expandSel[tok.g];
    return i!==undefined ? g.options[i].es : '';
  }).filter(Boolean);
  return parts.join(' ');
}

function buildExpandSentence(exp){
  if(exp.template){
    const built=buildExpandSentenceGeneric(exp);
    return built ? built+(/[.!?]$/.test(built)?'':'.') : '';
  }
  const relGroup=exp.groups.find(g=>g.key==='rel');
  const sizeGroup=exp.groups.find(g=>g.key==='size');
  const nameGroup=exp.groups.find(g=>g.key==='name');
  if(expandSel['rel']===undefined) return '';
  const rel  = relGroup.options[expandSel['rel']];
  const size = sizeGroup&&expandSel['size']!==undefined ? sizeGroup.options[expandSel['size']] : null;
  const name = nameGroup&&expandSel['name']!==undefined ? nameGroup.options[expandSel['name']] : null;
  const dem = rel.gender==='f'?'Esta':'Este';
  let parts=[dem,'es','mi',rel.es];
  if(size) parts.push(size.es);
  if(name) parts.push(name.es);
  return parts.join(' ')+'.';
}

// 常見 SER/ESTAR 混淆：ser 變位＋只能用 estar 的狀態形容詞，給貼心提示而不是單純判錯
const SER_ESTAR_CONFUSIONS = {
  cansado:'累',cansada:'累', feliz:'開心', contento:'開心',contenta:'開心',
  enfermo:'生病',enferma:'生病', ocupado:'忙',ocupada:'忙',
  enojado:'生氣',enojada:'生氣', aburrido:'無聊',aburrida:'無聊',
  sentado:'坐著',sentada:'坐著', dormido:'睡著',dormida:'睡著'
};
const SER_TO_ESTAR_FORM = {soy:'estoy',eres:'estás',es:'está',somos:'estamos',son:'están'};
function detectSerEstarConfusion(inputWords){
  for(let i=0;i<inputWords.length-1;i++){
    const w=inputWords[i], next=inputWords[i+1].replace(/[.!?]/g,'');
    if(SER_TO_ESTAR_FORM[w] && SER_ESTAR_CONFUSIONS[next]){
      return { rightForm:SER_TO_ESTAR_FORM[w], adj:next, zh:SER_ESTAR_CONFUSIONS[next] };
    }
  }
  return null;
}

function checkMakeFree(){
  const val=document.getElementById('makeFreeInput').value.trim();
  const res=document.getElementById('makeResult');
  if(!val){ toast('先打一個句子！'); return; }

  const s=cur();
  const pat=getMakePattern(s);

  // Normalize input
  const norm=v=>v.toLowerCase().replace(/[¡!¿?,.:;]/g,'').trim();
  const input=norm(val);
  const original=norm(s.es);

  // Case 1: typed same as original
  if(input===original){
    res.className='make-result tip';
    res.textContent='😄 這是原句！試著換掉名字或主詞，造一個屬於你的句子～';
    res.style.display='block';
    document.getElementById('makeFreeInput').className='make-free-input';
    return;
  }

  // Case 2: check key verbs present
  const inputWords=input.split(/\s+/);
  const verbsFound=pat.keyVerbs.filter(v=>inputWords.some(w=>w===v||w.startsWith(v.slice(0,-1))));
  const hasVerbs=verbsFound.length>=Math.ceil(pat.keyVerbs.length/2);

  // Case 3: rough word count check (±3)
  const countOk=Math.abs(inputWords.length-pat.wordCount)<=3;

  if(hasVerbs&&countOk){
    res.className='make-result ok';
    document.getElementById('makeFreeInput').className='make-free-input ok';
    if(!makeAnswered.includes(idx)){makeAnswered.push(idx);makeScore++;}
    const gId=SENTENCE_GRAMMAR_MAP[currentGlobalIdx()];
    const saved=gId?saveToGrammarLib(gId,val):false;
    res.textContent=`¡Eso es! 🌟 用了 ${verbsFound.join(' / ')}${saved?' — 已存進文法酷庫 💡':' — 就是這樣！'}`;
    res.style.display='block';
    speakFull(val);
    toast('🔊 念你的句子給你聽！');
    if(typeof checkStorageQuota === 'function') checkStorageQuota();
  } else {
    res.className='make-result err';
    const confusion = detectSerEstarConfusion(inputWords);
    if(confusion){
      res.textContent = `🤔 你是不是想說「我${confusion.zh}了」？西語通常說 ${confusion.rightForm} ${confusion.adj}，因為這是暫時的狀態，要用 ESTAR 不是 SER。`;
    } else {
    const hint = pat.keyVerbs.length ? `記得用「${pat.keyVerbs.join(' / ')}」這個動詞喔` : '句子太短或結構不太對';
    res.textContent=`¡Ojo! 👀 ${hint}`;
    }
    res.style.display='block';
    document.getElementById('makeFreeInput').className='make-free-input err';
  }
}

function resetMakeFree(){
  document.getElementById('makeFreeInput').value='';
  document.getElementById('makeFreeInput').className='make-free-input';
  document.getElementById('makeResult').style.display='none';
}

// ── RENDER CARD ──
function render(){
  saveToLS(); // 記住目前瀏覽到哪一句，重新整理不要跳回第一集第一句
  const s=cur(),n=total();
  revealed=false;makeOpen=false;builtTokens=[];
  document.getElementById('answerBox').classList.remove('show');
  document.getElementById('nextBtn').style.display='none';
  const uz=document.getElementById('unlockZone');if(uz){uz.style.display='';}
  const tipEl = document.getElementById('grammarTip');
  if(tipEl) tipEl.style.display='none';
  document.getElementById('userInput').value='';
  document.getElementById('userInput').className='trans-input';
  document.getElementById('makeBody').classList.remove('show');
  document.getElementById('makeIcon').classList.remove('open');
  document.getElementById('makeResult').style.display='none';
  if(document.getElementById('makeFreeInput')){
    document.getElementById('makeFreeInput').value='';
    document.getElementById('makeFreeInput').className='make-free-input';
  }

  document.getElementById('navCount').textContent=`${idx+1} / ${n}`;

  const area=document.getElementById('chunksArea');
  const frag=document.createDocumentFragment();
  s.chunks.forEach(c=>{
    const div=document.createElement('div');div.className='chunk';
    const personCls=c.role==='s'?getPersonClass(c.w):'';
    const famState=getFamState(c.w);
    const famCls=famState>0?' '+FAM_CLASSES[famState]:'';
    const pill=document.createElement('div');
    pill.className='chunk-pill role-'+(c.role||'plain')+(personCls?' '+personCls:'')+famCls;
    pill.dataset.famWord=c.w;
    const word=document.createElement('span');
    if(c.role==='v'){ word.innerHTML=renderVWords(c.w); } else { word.textContent=c.w; }
    pill.appendChild(word);
    if(isVocabWorthy(c.w)){
      const addBtn=document.createElement('span');addBtn.className='vocab-add-btn';addBtn.textContent='＋';
      addBtn.onclick=(e)=>{e.stopPropagation();addToVocab(c.w,'',s.es.slice(0,12)+'…語塊');};
      pill.appendChild(addBtn);
    }
    div.appendChild(pill);
    bindLongPressCopy(div, c.w);
    div.onclick=(e)=>{if(div.dataset.lpcFired){div.dataset.lpcFired='';return;}handleChunkTap(c,div,s);};
    frag.appendChild(div);
  });
  area.innerHTML='';
  area.appendChild(frag);

  const fsEl=document.getElementById('fullSent');
  fsEl.textContent=s.es;
  fsEl.onclick=()=>speakSentenceSmart(ep, idx, s.es);

  // ── 英西同源槓桿 details 注入 ──
  let cogBox = document.getElementById('cogBox');
  if(!cogBox){
    cogBox = document.createElement('div');
    cogBox.id = 'cogBox';
    const answerBox = document.getElementById('answerBox');
    answerBox.parentNode.insertBefore(cogBox, answerBox);
  }
  const cogData = SENTENCE_COGNATES['e'+ep+'_s'+idx];
  if(cogData){
    cogBox.innerHTML = buildCogDetails(cogData);
  } else {
    cogBox.innerHTML = '';
  }
  document.getElementById('prevBtn').disabled=(idx===0);
  document.getElementById('nextBtnB').disabled=(idx===n-1);

  switchLang('zh');renderStars();
  syncGroupBtn();
}

function smartMatch(input,s){
  const clean=t=>t.toLowerCase().replace(/[，。！？、：；,.!?:;\s]/g,'');
  const u=clean(input);
  if(u.length<2)return false;
  if(clean(u)===clean(s.zh)||clean(u)===clean(s.en))return true;
  // keyword overlap zh
  const zhChars=s.zh.replace(/[，。！？、的了是在也都很\s]/g,'').split('');
  const matchZh=zhChars.filter(c=>u.includes(c)).length/Math.max(zhChars.length,1);
  // keyword overlap en
  const enWords=s.en.toLowerCase().replace(/[,.!?]/g,'').split(' ').filter(w=>w.length>2);
  const matchEn=enWords.length?enWords.filter(w=>u.includes(w)).length/enWords.length:0;
  return matchZh>=0.55||matchEn>=0.55;
}

function revealAnswer(){
  if(revealed)return;revealed=true;
  const s=cur();
  document.getElementById('aTextZh').textContent=s.zh;
  document.getElementById('aNoteZh').textContent=s.noteZh;
  document.getElementById('aTextEn').textContent=s.en;
  document.getElementById('aNoteEn').textContent=s.noteEn;
  const epD = epData();
  const tagZh = document.getElementById('aEpTagZh');
  const tagEn = document.getElementById('aEpTagEn');
  if(tagZh) tagZh.textContent = `S1 · ${epD.titleZh}`;
  if(tagEn) tagEn.textContent = `S1 · ${epD.title}`;
  document.getElementById('answerBox').classList.add('show');
  const uz=document.getElementById('unlockZone');
  if(uz){uz.style.display='none';}
  const nb=document.getElementById('nextBtn');
  nb.style.display='block';nb.style.flex='1';
  showGrammarTip(ep * 10 + idx);
  if(!answered.includes(idx)){
    answered.push(idx);
    answeredByEp[ep]=answered;
    const val=document.getElementById('userInput').value.trim();
    const ok=val.length>1&&smartMatch(val,s);
    if(ok){score++;document.getElementById('userInput').classList.add('correct');const _fb=getRandomFeedback('correct');toastLong(_fb.emoji+' '+_fb.text);}
    else if(val.length>1){document.getElementById('userInput').classList.add('wrong');const _fb=getRandomFeedback('incorrect');toast(_fb.emoji+' '+_fb.text);}
    else{const _fb=getRandomFeedback('reveal');toast(_fb.emoji+' '+_fb.text);}
    addToPassbook(s);
    const globalIdx = ep * 10 + idx;
    unlockAmmo(globalIdx); unlockStar(globalIdx); accumulateSVOPool(globalIdx);
    saveToLS();
    renderStars();
  }
}

function switchLang(lang){
  document.querySelectorAll('.a-lang').forEach(el=>el.classList.remove('on'));
  document.querySelectorAll('.a-tab').forEach(el=>el.classList.remove('on'));
  document.getElementById(lang==='zh'?'aZh':'aEn').classList.add('on');
  const tabs=document.querySelectorAll('.a-tab');
  (lang==='zh'?tabs[0]:tabs[1]).classList.add('on');
}

function nextCard(){
  if(idx<total()-1){idx++;render();}else showComplete();
}
function prevCard(){if(idx>0){idx--;render();}}

// ── PER-EPISODE COGNATES ──
const EP_COGNATES = [
  // E1 泥巴坑
  [
    {en:'family',   es:'familia',    zh:'家庭'},
    {en:'animal',   es:'animal',     zh:'動物'},
    {en:'detective',es:'detective',  zh:'偵探'},
    {en:'super',    es:'súper',      zh:'超級'},
  ],
  // E2 骷髏先生
  [
    {en:'skeleton', es:'esqueleto', zh:'骷髏'},
    {en:'favorite', es:'favorito',   zh:'最喜歡的'},
    {en:'detective',es:'detective',  zh:'偵探'},
    {en:'hospital', es:'hospital',   zh:'醫院'},
  ],
  // E3 最好的朋友
  [
    {en:'doctor',   es:'doctora',    zh:'醫生'},
    {en:'princess', es:'princesa',   zh:'公主'},
    {en:'nurse',    es:'enfermera',  zh:'護士'},
    {en:'hospital', es:'hospital',   zh:'醫院'},
  ],
];


const CHEERS = [
  '你已經學完了 10 句真實西語對話！比背單字有趣多了吧！🎉',
  '太厲害了！10 句真實西語，你全部學過一遍！⭐',
  '每天 10 句，一年後的你會感謝今天的自己！💪',
  '你的大腦現在正在建立西語神經連線！繼續！🧠',
  '就是這樣！語塊學習法讓你學得快又記得住！🚀',
];

// ── 文法酷庫 用戶造句（localStorage key: peppa_es_grammar_v1） ──
let grammarUserExamples = {};

function loadGrammarLib(){
  try{ grammarUserExamples=JSON.parse(localStorage.getItem('peppa_es_grammar_v1')||'{}'); }
  catch(e){ grammarUserExamples={}; }
}

function saveGrammarLib(){
  try{ localStorage.setItem('peppa_es_grammar_v1',JSON.stringify(grammarUserExamples)); }
  catch(e){}
}

function saveToGrammarLib(gId, sentence){
  if(!gId||!sentence) return false;
  if(!grammarUserExamples[gId]) grammarUserExamples[gId]={user_examples:[]};
  const arr=grammarUserExamples[gId].user_examples;
  if(!arr.includes(sentence)) arr.push(sentence);
  saveGrammarLib();
  return true;
}

// ── 熟悉度系統（localStorage key: peppa_es_familiarity_v1） ──
let chunkFamiliarity = {};
const FAM_STARS   = ['☆','◑','★'];
const FAM_LABELS  = ['未熟','半熟','全熟'];
const FAM_CLASSES = ['fam-0','fam-1','fam-2'];

function loadFamiliarity(){
  try{ chunkFamiliarity = JSON.parse(localStorage.getItem('peppa_es_familiarity_v1')||'{}'); }catch(e){ chunkFamiliarity={}; }
}
function saveFamiliarity(){
  try{ localStorage.setItem('peppa_es_familiarity_v1', JSON.stringify(chunkFamiliarity)); }catch(e){}
}
function getFamState(word){ return chunkFamiliarity[word] || 0; }

// ── 💎 馧釀私語窖：語塊花園狀態（localStorage key: peppa_garden_v1） ──
function getGardenDB() {
  try { return JSON.parse(localStorage.getItem('peppa_garden_v1') || '{}'); } catch(e) { return {}; }
}
function saveGardenDB(db) {
  try { localStorage.setItem('peppa_garden_v1', JSON.stringify(db)); } catch(e) {}
}
// 花園新鮮度：獨立存放的單一時間戳，純視覺提示，不影響上面的熟練度資料
function getLastWatered(){
  try { return Number(localStorage.getItem('peppa_garden_watered_v1')) || 0; } catch(e){ return 0; }
}
function markWatered(){
  try { localStorage.setItem('peppa_garden_watered_v1', String(Date.now())); } catch(e){}
}
const _G_LABELS = ['收藏語塊', '初萌芽', '猛漲期', '幸運草・抓蟲複習', '日頭花開'];

// ── 語塊註解索引：掃 AMMO_DATA 一次，讓花園裡的每個語塊都能顯示一段中文註解 ──
let _chunkAnnotIndex = null;
function _buildChunkAnnotIndex(){
  const idx = {};
  const addSentence = (fire) => {
    if(!fire || !fire.chunks) return;
    fire.chunks.forEach(c => {
      if(!c.w) return;
      if(!idx[c.w]) idx[c.w] = c.note || fire.zh || '';
    });
  };
  (typeof AMMO_DATA !== 'undefined' ? AMMO_DATA : []).forEach(a => {
    addSentence(a.fire_peppa);
    (a.fire_daily || []).forEach(addSentence);
  });
  _chunkAnnotIndex = idx;
}
function getChunkAnnotation(chunk){
  if(!_chunkAnnotIndex) _buildChunkAnnotIndex();
  return _chunkAnnotIndex[chunk] || '';
}
// 花園清單顯示用：把內部追蹤用的 key 轉成看得懂的字，不要直接印出原始 key
function _gardenChunkDisplay(chunk){
  if(chunk.startsWith('sfx_')) return { text: chunk.slice(4), speakable: true };
  if(chunk.startsWith('ge_'))  return { text: chunk.slice(3), speakable: true };
  if(/^s2_p\d+$/.test(chunk))  return { text: '🛢️ 入桶陳韻練習句型', speakable: false };
  if(!/[ .,!?¡¿]/.test(chunk) && chunk.includes('_')) return { text: '🍂 舊版殘留紀錄（可忽略）', speakable: false };
  return { text: chunk, speakable: true };
}
function classifyGardenStatus(countOrEntry, graduated) {
  let stage;
  if (countOrEntry && typeof countOrEntry === 'object') {
    if (typeof countOrEntry.stage === 'number') {
      stage = countOrEntry.stage;
    } else {
      const c = countOrEntry.count || 0, g = countOrEntry.graduated || false;
      stage = g ? 4 : c >= 10 ? 3 : c >= 5 ? 2 : c >= 1 ? 1 : 0;
    }
  } else {
    const c = countOrEntry || 0;
    stage = graduated ? 4 : c >= 10 ? 3 : c >= 5 ? 2 : c >= 1 ? 1 : 0;
  }
  stage = Math.max(0, Math.min(4, stage || 0));
  return { icon: GARDEN_STAGES[stage], label: _G_LABELS[stage], stage };
}

function handleGardenProgress(key, el) {
  const db = getGardenDB();
  const entry = db[key] || { stage: 0, quiz_count: 0 };
  if (entry.stage >= 4) { toast('🌻 已日頭花開，不再移動'); return; }
  const nextStage = entry.stage + 1;
  db[key] = { stage: nextStage, quiz_count: entry.quiz_count || 0 };
  saveGardenDB(db);
  if (el) { el.textContent = GARDEN_STAGES[nextStage]; el.title = _G_LABELS[nextStage]; el.classList.toggle('garden-empty', nextStage === 0); }
  toast(`${GARDEN_STAGES[nextStage]} ${_G_LABELS[nextStage]}`);
  renderGardenView();
}

function migrateOldDataToGarden() {
  const db = getGardenDB();
  let changed = false;
  // Normalize old garden entries {count, graduated} → {stage}
  Object.entries(db).forEach(([k, e]) => {
    if (e && typeof e === 'object' && typeof e.count === 'number' && typeof e.stage === 'undefined') {
      const stage = e.graduated ? 4 : e.count >= 10 ? 3 : e.count >= 5 ? 2 : e.count >= 1 ? 1 : 0;
      db[k] = { stage, quiz_count: e.quiz_count || 0 };
      changed = true;
    }
  });
  // ammo_id → core_ammo（真正的西語句子）對照表，避免內部id洩漏成花園chip文字
  const ammoIdToText = {};
  (typeof AMMO_DATA !== 'undefined' ? AMMO_DATA : []).forEach(a => { ammoIdToText[a.ammo_id] = a.core_ammo; });

  // Migrate ammoStars from peppa_es_v4（用句子文字當 key，不要用 ammo_id）
  try {
    const v4 = JSON.parse(localStorage.getItem('peppa_es_v4') || '{}');
    Object.entries(v4.ammoStars || {}).forEach(([id, val]) => {
      const key = ammoIdToText[id] || id;
      if (!db[key]) { db[key] = { stage: val || 0, quiz_count: 0 }; changed = true; }
    });
  } catch(e) {}

  // 修正舊資料：花園庫裡若殘留用 ammo_id（如 e2_08）當 key 的紀錄，改存成句子文字
  Object.keys(ammoIdToText).forEach(id => {
    if (db[id]) {
      const text = ammoIdToText[id];
      const oldEntry = db[id];
      const curEntry = db[text];
      if (!curEntry || (oldEntry.stage || 0) > (curEntry.stage || 0)) {
        db[text] = oldEntry;
      }
      delete db[id];
      changed = true;
    }
  });
  // Migrate vocabList entries from peppa_es_vocab_v1
  try {
    const vList = JSON.parse(localStorage.getItem('peppa_es_vocab_v1') || '[]');
    vList.forEach(v => {
      const key = (v.text || '').trim();
      if (key && !db[key]) { db[key] = { stage: 2, quiz_count: 0 }; changed = true; }
    });
  } catch(e) {}
  if (changed) saveGardenDB(db);
}

let _gardenLongPressTimer = null;
let _gardenLongPressed = false;
let _gardenLastSaveChunk = null;
let _gardenLastSaveTime = 0;

function gardenStartPress(btn) {
  _gardenLongPressed = false;
  _gardenLongPressTimer = setTimeout(() => {
    _gardenLongPressTimer = null;
    _gardenLongPressed = true;
    gardenGraduate(btn);
  }, 600);
}
function gardenCancelPress() {
  if (_gardenLongPressTimer) { clearTimeout(_gardenLongPressTimer); _gardenLongPressTimer = null; }
}
function gardenHandleTouch(btn, e) {
  e.preventDefault();
  gardenCancelPress();
  if (_gardenLongPressed) { _gardenLongPressed = false; return; }
  gestaltSave(btn);
}
function gardenGraduate(btn) {
  const span = btn.closest('.gestalt-chunk');
  if (!span) return;
  const chunk = span.dataset.chunk;
  const db = getGardenDB();
  if (!db[chunk]) db[chunk] = { count: 0, graduated: false };
  db[chunk].graduated = true;
  saveGardenDB(db);
  btn.textContent = '🌻';
  btn.title = '日頭花開（最後不動）';
  toast('🌻 已日頭花開！這句你穩了');
}

function cycleFamiliarity(word){
  const next = (getFamState(word)+1)%3;
  chunkFamiliarity[word] = next;
  saveFamiliarity();
  const btn = document.querySelector('.fam-star-btn');
  if(btn && btn.dataset.word === word){
    btn.textContent = FAM_STARS[next];
    btn.title = FAM_LABELS[next];
    btn.dataset.state = next;
  }
  document.querySelectorAll('.chunk-pill[data-fam-word], .ammo-fire-chunk[data-fam-word]').forEach(el=>{
    if(el.dataset.famWord === word){
      FAM_CLASSES.forEach(c=>el.classList.remove(c));
      if(next>0) el.classList.add(FAM_CLASSES[next]);
    }
  });
}

// ── V語塊同源自動判斷：淺色=有英文同源(好記) 深色=西語特有(需硬記) ──
function _stripAccent(s){
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
}
function isCognateLike(word){
  const clean=_stripAccent(word).replace(/[¡¿.,!?;:()（）]/g,'').trim();
  if(!clean || clean.length<3) return false;
  const stem=clean.slice(0,4);
  return COGNATE_LIBRARY.some(c=>{
    const es=_stripAccent(c.es);
    return es.startsWith(stem) || clean.startsWith(es.slice(0,4));
  });
}
function renderVWords(text){
  return text.split(/(\s+)/).map(tok=>{
    if(!tok.trim()) return `<span class="v-ws">&nbsp;</span>`;
    const cls=isCognateLike(tok)?'v-word-light':'v-word-dark';
    return `<span class="${cls}">${tok}</span>`;
  }).join('');
}

function isVocabWorthy(word){
  const w = (word||'').toLowerCase().replace(/[¡¿.,!?;:]+/g,'').trim();
  const SKIP = new Set(['yo','tú','tu','él','el','ella','nosotros','nosotras','vosotros','vosotras','ellos','ellas','usted','ustedes','me','te','se','le','les','soy','eres','es','somos','sois','son','estoy','estás','estas','está','esta','estamos','estáis','estais','están','estan','hay','y','o','a','de','en','que','no','si','sí','muy','más','mas','todo','todos','una','un','la','lo','las','los','del','al','qué','quién']);
  return w.length > 1 && !SKIP.has(w);
}

// ── SAVE / LOAD (LocalStorage) ──
function saveToLS(){
  try{
    const data = { ammoUnlocked, ammoStars, answeredByEp, svoPool, ep, idx };
    localStorage.setItem('peppa_es_v4', JSON.stringify(data));
  }catch(e){}
}

function loadFromLS(){
  try{
    // 清除舊版
    ['peppa_es_v1','peppa_es_v2','peppa_es_v3'].forEach(k=>localStorage.removeItem(k));
    const raw = localStorage.getItem('peppa_es_v4');
    if(!raw) return;
    const d = JSON.parse(raw);
    if(d.ammoUnlocked) ammoUnlocked = d.ammoUnlocked;
    if(d.ammoStars)    ammoStars    = d.ammoStars;
    if(d.answeredByEp) answeredByEp = d.answeredByEp;
    if(d.svoPool)      svoPool      = d.svoPool;
    // 重新整理要停在使用者原本瀏覽的那句，不要跳回第一集第一句
    if(Number.isInteger(d.ep) && EPS[d.ep])                     ep  = d.ep;
    if(Number.isInteger(d.idx) && d.idx < (EPS[ep]||{}).sentences?.length) idx = d.idx;
  }catch(e){}
}

// ── COMPLETE SCREEN ──
function showComplete(){
  document.querySelector('.card-container').style.display='none';
  document.querySelector('.nav-row').style.display='none';
  const cs = document.getElementById('completeScreen');
  cs.classList.add('show');

  const n = total();
  let stars = '';
  for(let i=0;i<n;i++) stars+='⭐';
  stars += ' 🌟';
  document.getElementById('completeStars').textContent = stars;
  document.getElementById('completeTitle').textContent = `🌻 完成這場莊園探險了！`;
  document.getElementById('completeSub').textContent   = `${epData().titleZh} · 全 ${n} 句`;
  document.getElementById('finalScore').textContent    = score;
  document.getElementById('finalMake').textContent     = makeScore;
  document.getElementById('finalWords').textContent    = ammoUnlocked.length;

  const cogs = EP_COGNATES[ep] || [];
  document.getElementById('ecList').innerHTML = cogs.map(c=>`
    <div class="ec-item" onclick="speakFull('${escAttr(c.es)}')" title="點擊聽西語發音">
      <span class="ec-en">${c.en}</span>
      <span class="ec-arrow">→</span>
      <span class="ec-es">${c.es} <span class="ec-play">▶</span></span>
      <span class="ec-zh">${c.zh}</span>
    </div>`).join('');

  document.getElementById('completeCheer').textContent =
    CHEERS[Math.floor(Math.random()*CHEERS.length)];

  const nextEpBtn = document.getElementById('nextEpBtn');
  const finaleEgg = document.getElementById('completeFinaleEgg');
  if(ep < EPS.length-1){
    nextEpBtn.classList.remove('locked');
    nextEpBtn.textContent = '下一集 →';
    finaleEgg.style.display = 'none';
  } else {
    nextEpBtn.classList.add('locked');
    nextEpBtn.textContent = '🎉 S1 全集完成！';
    finaleEgg.style.display = '';
  }

  renderAmmo();
  saveToLS();
}

function restartEp(){
  score=0;makeScore=0;idx=0;answered=[];makeAnswered=[];
  delete answeredByEp[ep];saveToLS();
  document.getElementById('completeScreen').classList.remove('show');
  document.querySelector('.card-container').style.display='block';
  document.querySelector('.nav-row').style.display='flex';
  render();
}

function goNextEp(){
  if(ep < EPS.length-1) selectEp(ep+1);
}

// ── TOAST ──
let _toastTimer = null;
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(()=>t.classList.remove('show'), 2200);
}

// ── 長按複製（全站共用）──
let _lpcTimer = null;
function copyTextWithFeedback(txt){
  const done = () => toast('✅ ¡Logrado! 搞定 ¡Ve a pegarlo');
  if(navigator.clipboard){ navigator.clipboard.writeText(txt).then(done); }
  else{
    const ta=document.createElement('textarea'); ta.value=txt; document.body.appendChild(ta);
    ta.select(); document.execCommand('copy'); document.body.removeChild(ta); done();
  }
}
function copyWholeEpisode(){
  const data = epData();
  if(!data || !data.sentences) return;
  const fullText = data.sentences.map(s=>s.es).join('\n');
  copyTextWithFeedback(fullText);
}
function bindLongPressCopy(el, text){
  if(!el || el.dataset.lpcBound) return;
  el.dataset.lpcBound = '1';
  const doCopy = () => { el.dataset.lpcFired='1'; copyTextWithFeedback(text != null ? text : el.textContent.trim()); };
  el.addEventListener('touchstart', ()=>{ clearTimeout(_lpcTimer); _lpcTimer=setTimeout(doCopy,600); }, {passive:true});
  el.addEventListener('touchend', ()=>clearTimeout(_lpcTimer));
  el.addEventListener('touchmove', ()=>clearTimeout(_lpcTimer));
  el.addEventListener('mousedown', (e)=>{ if(e.button===0){ clearTimeout(_lpcTimer); _lpcTimer=setTimeout(doCopy,600); } });
  el.addEventListener('mouseup', ()=>clearTimeout(_lpcTimer));
  el.addEventListener('mouseleave', ()=>clearTimeout(_lpcTimer));
}
function bindLongPressCopyAll(selector, root){
  (root||document).querySelectorAll(selector).forEach(el => bindLongPressCopy(el, el.dataset.copyText || el.textContent.trim()));
}

function showPronBackup(word){
  const url = 'https://es.wiktionary.org/wiki/'+encodeURIComponent(word);
  const t = document.getElementById('toast');
  t.innerHTML = 'WordReference 沒有？→ <a href="'+url+'" target="_blank" rel="noopener" style="color:var(--mizu);font-weight:900;text-decoration:none">Wiktionary ↗</a>';
  t.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(()=>{ t.classList.remove('show'); }, 4000);
}

// ── 🧳 資料保險箱：全站 localStorage 備份 / 還原 ──
const BACKUP_KEYS = ['peppa_es_v4','peppa_es_vocab_v1','peppa_es_grammar_v1','peppa_es_familiarity_v1','peppa_garden_v1','peppa_garden_watered_v1','dynamic_phrases_db','peppa_mom_diary_v1','peppa_mom_notes_v1','peppa_talk_diary_v1'];

function exportBackup(){
  const data = {};
  BACKUP_KEYS.forEach(k => {
    const v = localStorage.getItem(k);
    if(v !== null) data[k] = v;
  });
  const payload = { app:'mi-casa-de-chunks', backup_version:1, exported_at:new Date().toISOString(), data };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'mi-casa-backup-' + new Date().toISOString().slice(0,10) + '.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(()=>URL.revokeObjectURL(a.href), 1500);
  toast('📤 行囊打包完成！備份檔已下載，找個安全的地方收好');
}

function importBackupFile(input){
  const file = input.files && input.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try{
      const payload = JSON.parse(reader.result);
      const data = payload && payload.data;
      if(!data || typeof data !== 'object') throw new Error('bad format');
      if(!confirm('📥 匯入會用備份檔覆蓋這支手機目前的學習紀錄與日記，確定還原嗎？')){ input.value=''; return; }
      Object.entries(data).forEach(([k,v]) => {
        if(BACKUP_KEYS.includes(k) && typeof v === 'string') localStorage.setItem(k, v);
      });
      toast('📥 行囊歸位完成！重新整理中…');
      setTimeout(()=>location.reload(), 900);
    }catch(e){
      toast('❌ 這不是有效的備份檔，換一個試試');
    }
    input.value = '';
  };
  reader.readAsText(file);
}

// ── ⚠️ localStorage 空間快滿了要提醒備份（瀏覽器上限通常約 5MB）──
const STORAGE_WARN_BYTES = 4 * 1024 * 1024; // 抓 5MB 上限的 80% 當警戒線
const STORAGE_WARN_LS_KEY = 'peppa_storage_warn_last';

function getLocalStorageBytes(){
  let total = 0;
  try{
    for(let i=0;i<localStorage.length;i++){
      const k = localStorage.key(i);
      const v = localStorage.getItem(k) || '';
      total += (k.length + v.length) * 2; // UTF-16，粗估位元組數
    }
  }catch(e){}
  return total;
}

function checkStorageQuota(){
  try{
    const bytes = getLocalStorageBytes();
    if(bytes < STORAGE_WARN_BYTES) return;
    const lastWarn = Number(localStorage.getItem(STORAGE_WARN_LS_KEY) || 0);
    if(Date.now() - lastWarn < 24*60*60*1000) return; // 24 小時內只提醒一次
    localStorage.setItem(STORAGE_WARN_LS_KEY, String(Date.now()));
    const mb = (bytes/1024/1024).toFixed(1);
    toast(`⚠️ 儲存空間快滿了（約 ${mb}MB），記得點「📤 季度休耕喘息去」備份一下`);
  }catch(e){}
}

function clearLS(){
  if(!confirm('🌱 再來一場大冒險？你確定嗎')) return;
  localStorage.removeItem('peppa_es_v4');
  localStorage.removeItem('peppa_es_vocab_v1');
  localStorage.removeItem('peppa_garden_v1');
  localStorage.removeItem('peppa_garden_watered_v1');
  localStorage.removeItem('peppa_es_grammar_v1');
  localStorage.removeItem('peppa_es_familiarity_v1');
  localStorage.removeItem('dynamic_phrases_db');
  ammoUnlocked=[];ammoStars={};vocabList=[];answeredByEp={};answered=[];svoPool={s:[],v:[],o:[]};
  grammarUserExamples={};chunkFamiliarity={};
  renderAmmo();renderVocab();renderGardenView();renderConjLibrary();renderGardenFreshness();
  toast('已清除所有學習紀錄');
}

// ── 文法酷庫 ──

function showGrammarTip(globalIdx){
  const el = document.getElementById('grammarTip');
  if(!el) return;
  const gId = SENTENCE_GRAMMAR_MAP[globalIdx];
  if(!gId){ el.style.display='none'; return; }
  const g = GRAMMAR_DATA.find(x => x.id===gId);
  if(!g){ el.style.display='none'; return; }
  el.style.display = 'block';
  el.innerHTML = `<div class="grammar-tip-inner" onclick="openGrammarCard('${gId}')">
    <span class="grammar-tip-icon">💡</span>
    <div class="grammar-tip-text">
      <div class="grammar-tip-label">這句的文法點</div>
      <div class="grammar-tip-title">${g.title}</div>
    </div>
    <span class="grammar-tip-arrow">→</span>
  </div>`;
}

function buildConjTable(conj, gId, showLabel){
  if(!conj || !conj.rows || !conj.rows.length) return '';
  const renderRow = r =>
    `<div class="conj-row">
      <span class="conj-person">${r.person}</span>
      <span class="conj-form" onclick="speakSentence('${escAttr(r.ex)}')">${r.form}</span>
      <span class="conj-ex" onclick="speakSentence('${escAttr(r.ex)}')">${r.ex}</span>
      <span class="conj-zh">${r.zh}</span>
      ${r.note?`<span class="conj-note">💡 ${r.note}</span>`:''}
    </div>`;
  const main3 = conj.rows.slice(0,3).map(renderRow).join('');
  const rest3 = conj.rows.slice(3);
  const restHtml = rest3.length
    ? `<details class="conj-expand"><summary class="conj-expand-summary">我們／他們 ▾</summary>${rest3.map(renderRow).join('')}</details>`
    : '';
  const jumpBtn = gId ? `<div class="conj-jump-btn" onclick="jumpToConjLib('${gId}')">🔄 查完整變位庫 →</div>` : '';
  const labelHtml = showLabel===false ? '' : `<div class="conj-verb-label">${conj.verb}</div>`;
  return `<div class="conj-section">
    ${labelHtml}
    <div class="conj-rows">${main3}${restHtml}</div>
    ${jumpBtn}
  </div>`;
}

// ── 👤 人稱代名詞查詢庫 ──
const PERSON_ICONS = ['🙋','👉','👤','👥','🙌','👨‍👩‍👧‍👦']; // 依序：1單/2單/3單/1複/2複/3複（6列，主詞類專用，因為拉美 ustedes 是獨立的字）
const PERSON_ICONS_5 = ['🙋','👉','👤','👥','👨‍👩‍👧‍👦']; // 拉美版5列（受詞/間接受詞/反身代名詞用，ustedes 跟 ellos/ellas 共用同一格）
function renderPronounLibrary(){
  const el = document.getElementById('pronounLibBody');
  if(!el) return;
  el.innerHTML = PRONOUN_LIBRARY.map(cat=>`
    <div class="pron-cat-card">
      <div class="pron-cat-header">${cat.cat}<span class="pron-cat-en">${cat.catEn}</span></div>
      <div class="pron-cat-hint">${cat.hint}</div>
      <div class="pron-rows">
        ${cat.rows.map((r,i)=>`
          <div class="pron-row${r.ex?' has-ex':''}">
            <span class="pron-icon">${(cat.rows.length===5?PERSON_ICONS_5:PERSON_ICONS)[i]||''}</span>
            <span class="pron-es" onclick="speakWord('${escAttr(r.es)}',this)">${r.es}</span>
            <span class="pron-zh">${r.zh}</span>
            <span class="pron-en">${r.en}</span>
            ${r.ex?`<span class="pron-row-ex" onclick="speakFull('${escAttr(r.ex.split('.')[0])}')">${r.ex}</span>`:''}
          </div>`).join('')}
      </div>
      ${cat.example?`<div class="pron-example" onclick="speakSentence('${escAttr(cat.example.es)}')">
        <div class="pron-ex-es">▶ ${cat.example.es}</div>
        <div class="pron-ex-zh">${cat.example.zh}</div>
      </div>`:''}
      ${cat.note?`<div class="pron-note">${cat.note}</div>`:''}
    </div>`).join('') + (typeof renderPronounComboRules==='function' ? renderPronounComboRules() : '');
  bindLongPressCopyAll('.pron-es', el);
}

function togglePronounLib(){
  const body=document.getElementById('pronounLibBody');
  const t=document.getElementById('pronounLibToggle');
  const open=body.classList.toggle('open');
  t.textContent=open?'▲ 收起':'▼ 展開';
}

// ── 🔄 動詞變位庫（獨立瀏覽區）──
// gId → 音檔用動詞代號（g03跟g02變位相同,共用estar）
const CONJ_AUDIO_VERB = {g01:'ser',g02:'estar',g03:'estar',g05:'haber',g07:'serfut',g10:'poder',g11:'deber',g17:'sentir',g18:'ir',g20:'tener',g23:'andar'};
const CONJ_AUDIO_PERSON = {'yo':'yo','tú':'tu','él/ella/usted':'el','nosotros':'nos','ellos/ellas/ustedes':'ellos'};
function speakConjForm(gId, person, formText){
  const verbCode = CONJ_AUDIO_VERB[gId];
  const personCode = CONJ_AUDIO_PERSON[person];
  if(verbCode && personCode){
    const player = new Audio(`audio/vocab/conj/conj_${verbCode}_${personCode}.mp3`);
    player.onerror = () => speakWord(formText);
    player.play().catch(()=>speakWord(formText));
    return;
  }
  speakWord(formText);
}
function renderConjLibrary(){
  const el = document.getElementById('conjLibBody');
  if(!el) return;
  const verbs = GRAMMAR_DATA.filter(g=>g.conj && g.conj.rows && g.conj.rows.length);
  el.innerHTML = verbs.map(g=>{
    const renderStdRow = r =>
      `<div class="conj-row">
        <span class="conj-person">${r.person}</span>
        <span class="conj-form" onclick="speakConjForm('${g.id}','${escAttr(r.person)}','${escAttr(r.form)}')">${r.form}</span>
        <span class="conj-ex" onclick="speakSentence('${escAttr(r.ex)}')">${r.ex}</span>
        <span class="conj-zh">${r.zh}</span>
        ${r.note?`<span class="conj-note">💡 ${r.note}</span>`:''}
      </div>`;
    const renderAllRows = rows => rows.map(r =>
      renderStdRow(r) + renderDynamicConjugationExamples(r.form.toLowerCase())
    ).join('');
    const main3 = renderAllRows(g.conj.rows.slice(0,3));
    const rest3 = g.conj.rows.slice(3);
    const restHtml = rest3.length
      ? `<details class="conj-expand"><summary class="conj-expand-summary">我們／你們／他們 ▾</summary>${renderAllRows(rest3)}</details>`
      : '';
    const verbRoot = (g.conj.verb||'').split('（')[0].trim().toLowerCase();
    const familyCls = verbRoot.endsWith('ar') ? 'conj-lib-ar' : 'conj-lib-erir';
    const searchText = [g.conj.verb, ...g.conj.rows.map(r=>`${r.person} ${r.form} ${r.ex} ${r.zh} ${r.note||''}`)]
      .join(' ').toLowerCase();
    return `<div class="conj-lib-card ${familyCls}" id="conjlib-${g.id}" data-search="${escAttr(searchText)}">
      <div class="conj-lib-header">${g.conj.verb}</div>
      <div class="conj-section">
        <div class="conj-rows">${main3}${restHtml}</div>
      </div>
    </div>`;
  }).join('');

  const preview = document.getElementById('conjLibPreview');
  if(preview){
    const roots = [...new Set(verbs.map(g=>(g.conj.verb||'').split(/[（+]/)[0].trim()))];
    preview.textContent = roots.join('・') + '…';
  }
  bindLongPressCopyAll('.conj-ex', el);
}

function filterConjLibrary(query){
  const q = query.trim().toLowerCase();
  if(q){
    const body = document.getElementById('conjLibBody');
    const t = document.getElementById('conjLibToggle');
    if(body && !body.classList.contains('open')){ body.classList.add('open'); if(t) t.textContent='▲ 收起'; }
  }
  document.querySelectorAll('#conjLibBody .conj-lib-card').forEach(card => {
    const hit = !q || (card.dataset.search||'').includes(q);
    card.style.display = hit ? '' : 'none';
  });
}

function toggleConjLib(){
  const body=document.getElementById('conjLibBody');
  const t=document.getElementById('conjLibToggle');
  const open=body.classList.toggle('open');
  t.textContent=open?'▲ 收起':'▼ 展開';
}

function jumpToConjLib(gId){
  closeGrammarSheet();
  switchMainTab('know');
  const body=document.getElementById('conjLibBody');
  const t=document.getElementById('conjLibToggle');
  body.classList.add('open');
  t.textContent='▲ 收起';
  setTimeout(()=>{
    const card=document.getElementById('conjlib-'+gId);
    if(!card) return;
    card.scrollIntoView({behavior:'smooth',block:'center'});
    card.classList.add('ammo-flash');
    setTimeout(()=>card.classList.remove('ammo-flash'),1200);
  },80);
}

function _grammarExChunks(es){
  const words = es.split(/(\s+)/);
  const _gdb = getGardenDB();
  return words.map(tok=>{
    if(!tok.trim()) return '';
    const clean = tok.replace(/[¡¿.,!?;:]/g,'').trim();
    if(!isVocabWorthy(clean)) return `<span class="ge-chunk" onclick="event.stopPropagation();speakWord('${escAttr(clean)}',this)">${tok}</span>`;
    const _key='ge_'+clean;
    const _st=(_gdb[_key]||{stage:0}).stage;
    const _ic=GARDEN_STAGES[_st];
    const starHtml=`<span class="ge-chunk-star${_st===0?' garden-empty':''}" onclick="event.stopPropagation();handleGardenProgress('ge_${escAttr(clean)}',this)" title="語塊進度">${_ic}</span>`;
    return `<span class="ge-chunk" onclick="event.stopPropagation();speakWord('${escAttr(clean)}',this)">${tok}</span>${starHtml}`;
  }).join('');
}

// ── 💧 文法儲水槽（沒有綁定特定劇情句子、從外面引進來的零散文法點） ──
function renderGrammarSupplement(){
  const el = document.getElementById('grammarSupplementBody');
  if(!el) return;
  const items = GRAMMAR_DATA.filter(g=>(g.source||'').includes('文法補充'));
  el.innerHTML = items.map(g=>`
    <div class="gsup-row" onclick="openGrammarCard('${g.id}')">
      <div class="gsup-title">${g.title}</div>
      <div class="gsup-rule">${g.rule}</div>
    </div>`).join('');
}

function toggleGrammarSupplement(){
  const body=document.getElementById('grammarSupplementBody');
  const t=document.getElementById('grammarSupplementToggle');
  const open=body.classList.toggle('open');
  t.textContent=open?'▲ 收起':'▼ 展開';
}

// ── 🧠 內心擬人線：小小自我蛻變攻略（只讀＋聽發音，跟溫馨線分開的獨立線）──
function speakSelSentenceSmart(selEp, sentIdx, text){
  const files = (typeof SEL_AUDIO_MANIFEST!=='undefined' && SEL_AUDIO_MANIFEST[selEp] && SEL_AUDIO_MANIFEST[selEp][sentIdx]) || [];
  if(!files.length){ speakFull(text); return; }
  let i = 0;
  const player = new Audio();
  player.onended = () => { i++; setTimeout(playNext, 30); };
  player.onerror = () => { speakFull(text); };
  function playNext(){
    if(i >= files.length) return;
    player.src = files[i];
    player.play().catch(()=>speakFull(text));
  }
  playNext();
}
function renderSelLine(){
  const el = document.getElementById('selBody');
  if(!el || typeof SEL_EPS==='undefined') return;
  el.innerHTML = SEL_EPS.map((epi,i)=>`
    <div class="gsup-row sel-ep-header" onclick="toggleSelEp(${i})" style="cursor:pointer">
      <div class="gsup-title">📖 ${epi.titleZh}</div>
      <div class="gsup-rule" id="selEpToggleLabel${i}">▼ 展開</div>
    </div>
    <div id="selEpBody${i}" style="display:none;padding:8px 12px 4px">
      ${epi.sentences.map((s,j)=>`
        <div class="grammar-ex-row">
          <div class="grammar-ex-chunks">${_grammarExChunks(s.es)}</div>
          <div class="grammar-ex-zh" onclick="speakSelSentenceSmart(${i},${j},'${escAttr(s.es)}')" title="點這裡聽整句">${s.zh} <span class="ex-zh-play">▶ 整句</span></div>
        </div>`).join('')}
    </div>`).join('');
}
function toggleSelEp(i){
  const body = document.getElementById('selEpBody'+i);
  const label = document.getElementById('selEpToggleLabel'+i);
  const open = body.style.display !== 'none';
  body.style.display = open ? 'none' : 'block';
  label.textContent = open ? '▼ 展開' : '▲ 收起';
}
function toggleSelWrap(){
  const body=document.getElementById('selBody');
  const t=document.getElementById('selWrapToggle');
  const open=body.classList.toggle('open');
  t.textContent=open?'▲ 收起':'▼ 展開';
}

// ── 💎☁️ 是・在對照站（SER vs ESTAR 快覽） ──
function renderSerEstarStation(){
  const el = document.getElementById('serEstarBody');
  if(!el) return;
  const renderCol = g => (!g || !g.mnemonic) ? '' : `
    <div class="se-col mnemonic-${g.mnemonic.side}" onclick="openGrammarCard('${g.id}')">
      <div class="se-col-head">${g.mnemonic.icon} ${g.mnemonic.word}</div>
      <div class="se-col-title">${g.title}</div>
      ${g.mnemonic.items.map(it=>`<div class="se-col-row"><span class="se-col-letter">${it.l}</span><span class="se-col-label">${it.label}</span></div>`).join('')}
      <div class="se-col-more">▶ 完整用法／變位</div>
    </div>`;
  el.innerHTML = `<div class="se-station-grid">${renderCol(GRAMMAR_DATA.find(g=>g.id==='g01'))}${renderCol(GRAMMAR_DATA.find(g=>g.id==='g02'))}</div>`;
}

function openGrammarCard(gId){
  const g = GRAMMAR_DATA.find(x => x.id===gId);
  if(!g) return;
  const catLabel = (GRAMMAR_CATS.find(c=>c.key===g.cat)||{label:''}).label;
  const exHtml = g.examples.map(ex =>
    `<div class="grammar-ex-row">
      <div class="grammar-ex-chunks">${_grammarExChunks(ex.es)}</div>
      <div class="grammar-ex-zh" onclick="speakFull('${escAttr(ex.es)}')" title="點這裡聽整句">${ex.zh} <span class="ex-zh-play">▶ 整句</span></div>
    </div>`
  ).join('');
  const ruleClass = g.emph ? 'grammar-rule grammar-rule-emph' : 'grammar-rule';
  const mnemonicHtml = g.mnemonic ? `
    <div class="grammar-mnemonic mnemonic-${g.mnemonic.side}">
      <div class="mnemonic-head">${g.mnemonic.icon} ${g.mnemonic.word} 口訣</div>
      <div class="mnemonic-desc">${g.mnemonic.desc}</div>
      ${g.mnemonic.items.map(it=>`<div class="mnemonic-row">
        <span class="mnemonic-letter">${it.l}</span>
        <span class="mnemonic-label">${it.label}</span>
        <span class="mnemonic-ex" onclick="speakSentence('${escAttr(it.ex)}')">${it.ex}</span>
      </div>`).join('')}
    </div>` : '';
  const familyHtml = g.family ? `
    <div class="grammar-family">
      <div class="family-title">${g.family.title}</div>
      <div class="family-intro">${g.family.intro}</div>
      <div class="family-items">${g.family.items.map(it=>`
        <div class="family-item" onclick="speakFull('${escAttr(it.es)}')">
          <span class="family-es">${it.es}</span>
          <span class="family-zh">${it.zh}</span>
        </div>`).join('')}</div>
    </div>` : '';
  const userExs = (grammarUserExamples[gId]||{}).user_examples||[];
  const userExHtml = userExs.length
    ? `<div class="grammar-user-examples">
        <div class="grammar-user-label">✏️ 你的造句</div>
        ${userExs.map(s=>`<div class="grammar-user-ex-row">${_grammarExChunks(s)}</div>`).join('')}
      </div>`
    : '';
  openGrammarSheet(`
    <div class="grammar-cat-tag">${catLabel}</div>
    <div class="grammar-title">${g.title}</div>
    <div class="${ruleClass}">${g.rule}</div>
    ${mnemonicHtml}
    <div class="grammar-examples">${exHtml}</div>
    ${buildConjTable(g.conj, g.id)}
    ${familyHtml}
    ${g.trap?`<p class="grammar-trap">${g.trap}</p>`:''}
    ${g.crossLang?`<div class="grammar-crosslang">🌐 ${g.crossLang}</div>`:''}
    ${g.quirk?`<div class="grammar-quirk">${g.quirk}</div>`:''}
    ${userExHtml}
    <div class="grammar-source">📍 ${g.source}</div>
  `);
}

function closeGrammarModal(){
  closeGrammarSheet();
}

let _grammarSheetPushed = false;

function openGrammarSheet(html){
  document.getElementById('grammarSheetContent').innerHTML = html;
  document.getElementById('grammarSheet').style.display = 'block';
  document.body.style.overflow = 'hidden';
  history.pushState({sheet:'grammar'}, '');
  _grammarSheetPushed = true;
}

function closeGrammarSheet(_fromPop){
  document.getElementById('grammarSheet').style.display = 'none';
  document.body.style.overflow = '';
  if(_grammarSheetPushed && !_fromPop){
    _grammarSheetPushed = false;
    history.back();
  } else {
    _grammarSheetPushed = false;
  }
}

window.addEventListener('popstate', ()=>{
  const sheet = document.getElementById('grammarSheet');
  if(sheet && sheet.style.display === 'block'){
    closeGrammarSheet(true);
  }
});

function _famStarHtml(word){
  const s = getFamState(word);
  return `<button class="fam-star-btn" data-word="${escAttr(word)}" data-state="${s}" onclick="cycleFamiliarity('${escAttr(word)}')" title="${FAM_LABELS[s]}">${FAM_STARS[s]}</button>`;
}

// ── 首頁課文S/V/O語塊，真人音檔優先(依語塊原文精準比對)，找不到才fallback TTS ──
function speakChunkSmart(text, el){
  const file = (typeof CHUNK_AUDIO_MAP!=='undefined') ? CHUNK_AUDIO_MAP[text] : null;
  if(!file){ speakWord(text, el); return; }
  if(el) el.classList.add('playing');
  const dot = document.getElementById('ttsDot');
  if(dot){ dot.classList.remove('ready'); dot.classList.add('speaking'); }
  const done = () => { if(el) el.classList.remove('playing'); if(dot){ dot.classList.remove('speaking'); dot.classList.add('ready'); } };
  const player = new Audio(file);
  player.onended = done;
  player.onerror = () => { done(); speakWord(text, el); };
  player.play().catch(()=>{ done(); speakWord(text, el); });
}

function handleChunkTap(c, el, s){
  speakChunkSmart(c.w, el);
  if(c.note){
    openGrammarSheet(_famStarHtml(c.w)+'<div class="grammar-chunk-note">'+c.note+'</div>');
  }
  if(c.role==='v' && s && typeof detectGestalt==='function' && typeof triggerAutoWrite==='function'){
    const clean = w => (w||'').toLowerCase().replace(/[¡!¿?.,;:]/g,'');
    const words = s.es.split(/\s+/);
    const target = clean(c.w);
    const i = words.findIndex(w=>clean(w)===target);
    if(i!==-1){
      const r = detectGestalt(words, i);
      if(r.match && r.gId && (r.type==='verb_action'||r.type==='sov_single'||r.type==='sov_double')){
        triggerAutoWrite(r.verbForm, r.assoc, r.gId, true, (s.zh||'').split('\n')[0], s.es, 'main');
      }
    }
  }
}

function ammoChunkTap(word, hideYg, note){
  speakWord(word, null);
  if(note){
    openGrammarSheet(_famStarHtml(word)+'<div class="grammar-chunk-note">'+note+'</div>');
  }
}

function speakSentence(text){
  if(!window.speechSynthesis){ toast('⚠️ 此瀏覽器不支援語音'); return; }
  try{ speechSynthesis.cancel(); }catch(e){}
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'es-MX';
  utt.rate = 0.7;
  utt.pitch = 1.05;
  utt.volume = 1;
  if(ttsVoice) utt.voice = ttsVoice;
  const dot = document.getElementById('ttsDot');
  if(dot){ dot.classList.remove('ready'); dot.classList.add('speaking'); }
  utt.onend = () => { if(dot){ dot.classList.remove('speaking'); dot.classList.add('ready'); } };
  utt.onerror = () => {
    if(dot){ dot.classList.remove('speaking'); dot.classList.add('ready'); }
    toast('⚠️ 語音播放失敗，可再點一次');
  };
  setTimeout(() => {
    try{ speechSynthesis.speak(utt); }catch(e){ toast('⚠️ 語音播放失敗'); }
  }, 0);
}

// ── INIT ──
// ── 雙 TAB 切換（語塊遊樂場 / 知識儲藏室）──
function switchMainTab(tab){
  const panels = {
    play:    document.getElementById('tabPlay'),
    know:    document.getElementById('tabKnow'),
    mom:     document.getElementById('tabMom'),
    private: document.getElementById('tabPrivate')
  };
  const btns = {
    play:    document.getElementById('tabBtnPlay'),
    know:    document.getElementById('tabBtnKnow'),
    mom:     document.getElementById('tabBtnMom'),
    private: document.getElementById('tabBtnPrivate')
  };
  Object.keys(panels).forEach(k => {
    panels[k].style.display = k === tab ? '' : 'none';
    btns[k].classList.toggle('active', k === tab);
  });
  try { localStorage.setItem('peppa_active_tab', tab); } catch(e) {}
  // mom tab renders via DOMContentLoaded in mom.js
}

function restoreActiveTab(){
  let tab = 'play';
  try { tab = localStorage.getItem('peppa_active_tab') || 'play'; } catch(e) {}
  if(['play','know','mom','private'].includes(tab)) switchMainTab(tab);
}

// ── 語塊完形解析系統 ──

const PRONOUNS_ES = new Set(['me','te','se','nos','os','lo','la','los','las','le','les']);

function _buildConjFormMap() {
  const map = {};
  (GRAMMAR_DATA || []).forEach(g => {
    if (!g.conj || !g.conj.rows) return;
    g.conj.rows.forEach(row => {
      const f = (row.form || '').toLowerCase();
      // first-match wins; one word only (skip compound forms)
      if (f && !f.includes(' ') && !map[f]) map[f] = { gId: g.id, root: g.conj.verb };
    });
  });
  return map;
}
const CONJ_FORM_MAP = _buildConjFormMap();

// 純偵測，無副作用
function detectGestalt(words, i) {
  const clean = w => (w || '').toLowerCase().replace(/[¡!¿?.,;:]/g, '');
  const w1 = clean(words[i]), w2 = clean(words[i + 1]), w3 = clean(words[i + 2]);
  const ENDINGS = ['o', 'a', 'e', 's'];

  // 情境 A：雙代名詞 + 變位動詞
  if (PRONOUNS_ES.has(w1) && PRONOUNS_ES.has(w2) && CONJ_FORM_MAP[w3])
    return { match: true, length: 3, type: 'sov_double', verbForm: w3, assoc: `${w1} ${w2}`, gId: CONJ_FORM_MAP[w3].gId };

  // 情境 B：單代名詞 + 變位動詞
  if (PRONOUNS_ES.has(w1) && CONJ_FORM_MAP[w2])
    return { match: true, length: 2, type: 'sov_single', verbForm: w2, assoc: w1, gId: CONJ_FORM_MAP[w2].gId };

  // 情境 C：變位動詞 + 後續動作（核心：自動寫入變位庫）
  if (CONJ_FORM_MAP[w1] && w2 && !PRONOUNS_ES.has(w2))
    return { match: true, length: 2, type: 'verb_action', verbForm: w1, assoc: w2, gId: CONJ_FORM_MAP[w1].gId };

  // 情境 D：名詞片語綁死（不吃掉代名詞＋動詞的 sov 組合）
  if (w1 && w2 && !(PRONOUNS_ES.has(w2) && CONJ_FORM_MAP[w3]) && ENDINGS.some(e => w2.endsWith(e))) {
    const has3 = w3 && ENDINGS.some(e => w3.endsWith(e));
    return { match: true, length: has3 ? 3 : 2, type: 'noun_phrase', verbForm: '', assoc: '', gId: null };
  }
  return { match: false };
}

// 雙寫：peppa_es_grammar_v1（gId-based）+ dynamic_phrases_db（verbForm-based）
// zh/originalEs 在 mom.js 靜默掃描時傳入，避免事後比對失敗
function triggerAutoWrite(verbForm, assocWord, gId, silent = false, zh = '', originalEs = '', source = 'mom') {
  if (!gId || !verbForm) return;
  let fireDailyEx = null;
  for (const ammo of (typeof AMMO_DATA !== 'undefined' ? AMMO_DATA : [])) {
    const found = (ammo.fire_daily || []).find(d => d.es.toLowerCase().includes(verbForm));
    if (found) { fireDailyEx = found; break; }
  }
  const phrase = `${verbForm} ${assocWord}`;
  const savedGrammar = saveToGrammarLib(gId, phrase);

  // 寫入 dynamic_phrases_db（verbForm → [{assoc, zh, es, source}]）
  let savedDynamic = false;
  try {
    const db = JSON.parse(localStorage.getItem('dynamic_phrases_db') || '{}');
    if (!db[verbForm]) db[verbForm] = [];
    // 相容舊格式（純字串）和新格式（物件）
    const existingIdx = db[verbForm].findIndex(e => (typeof e === 'string' ? e : e.assoc) === assocWord);
    if (existingIdx === -1) {
      db[verbForm].push({ assoc: assocWord, zh, es: originalEs || phrase, source });
      localStorage.setItem('dynamic_phrases_db', JSON.stringify(db));
      savedDynamic = true;
    } else if (zh && !(db[verbForm][existingIdx].zh)) {
      // 已存在但沒有中文 → 補上（靜默掃描回填）
      const old = db[verbForm][existingIdx];
      db[verbForm][existingIdx] = typeof old === 'string'
        ? { assoc: old, zh, es: originalEs || `${verbForm} ${old}`, source }
        : { ...old, zh, es: originalEs || old.es };
      localStorage.setItem('dynamic_phrases_db', JSON.stringify(db));
      savedDynamic = true;
    }
  } catch(e) {}

  if ((savedGrammar || savedDynamic) && !silent) {
    const msg = fireDailyEx
      ? `✨ 已存入變位庫！例：${fireDailyEx.es}（${fireDailyEx.zh}）`
      : `✨ 已存入變位庫 [${phrase}]`;
    toast(msg);
    renderConjLibrary(); // 非靜默存入時立即更新變位庫 UI
  }
}

// 讀 dynamic_phrases_db，渲染指定 verbForm 的媽媽實戰列（conj-row 格式）
function renderDynamicConjugationExamples(verbForm) {
  if (!verbForm) return '';
  const cleanKey = verbForm.toLowerCase().trim();
  let db = {};
  try { db = JSON.parse(localStorage.getItem('dynamic_phrases_db') || '{}'); } catch(e) {}
  const entries = db[cleanKey] || [];
  if (entries.length === 0) return '';

  return entries.map(entry => {
    // 相容舊格式（純字串）和新格式（物件 {assoc, zh, es, source}）
    const assocWord    = typeof entry === 'string' ? entry : entry.assoc;
    const zh           = typeof entry === 'string' ? '' : (entry.zh || '');
    const fullSentence = typeof entry === 'string' ? `${verbForm} ${assocWord}` : (entry.es || `${verbForm} ${assocWord}`);
    const isMama       = typeof entry === 'string' ? true : (entry.source || 'mom') === 'mom';
    const rowCls   = isMama ? ' conj-row-mama' : '';
    const personEl = isMama ? `<span class="conj-person conj-person-mama" title="來自媽媽區">mamá</span>` : `<span class="conj-person"></span>`;
    return `<div class="conj-row${rowCls}">
      ${personEl}
      <span class="conj-form" onclick="speakFull('${escAttr(fullSentence)}')">${verbForm}</span>
      <span class="conj-ex" onclick="speakFull('${escAttr(fullSentence)}')">${fullSentence}</span>
      ${zh ? `<span class="conj-zh">${zh}</span>` : ''}
    </div>`;
  }).join('');
}

function gestaltTapAndSave(sentence, _zh, _doSave) {
  speakFull(sentence);
}

// 渲染帶完形偵測標記的句子 HTML（只偵測，不自動寫入）
function renderScriptLine(sentence) {
  const gardenDB = getGardenDB();
  const words = sentence.split(/\s+/);
  let html = '';
  for (let i = 0; i < words.length; ) {
    const r = detectGestalt(words, i);
    if (r.match) {
      const chunk = words.slice(i, i + r.length).join(' ');
      const gAttr = r.gId ? ` data-gid="${r.gId}"` : '';
      const ge = gardenDB[chunk] || { stage: 0, quiz_count: 0 };
      const gs = classifyGardenStatus(ge);
      html += `<span class="gestalt-chunk ${r.type}"${gAttr} data-type="${r.type}" data-verbform="${r.verbForm}" data-assoc="${r.assoc}" data-chunk="${escAttr(chunk)}" onclick="gestaltTap(this)">${chunk}<button class="gc-star${gs.stage === 0 ? ' garden-empty' : ''}" onmousedown="event.stopPropagation();gardenStartPress(this)" onmouseup="gardenCancelPress()" onmouseleave="gardenCancelPress()" ontouchstart="event.stopPropagation();event.preventDefault();gardenStartPress(this)" ontouchend="gardenHandleTouch(this,event)" ontouchmove="gardenCancelPress()" onclick="event.stopPropagation();gestaltSave(this)" title="${escAttr(gs.label)}">${gs.icon}</button></span>`;
      i += r.length;
    } else {
      const w = words[i];
      const wc = w.replace(/[¡!¿?.,;:]/g, '');
      html += `<span class="gc-word" onclick="speakWord('${escAttr(wc)}',this)">${w}</span> `;
      i++;
    }
  }
  return html;
}

function gestaltTap(el) {
  const chunk = el.dataset.chunk;
  speakWord(chunk.replace(/[¡!¿?.,;:]/g, ''), el);
  copyTextWithFeedback(chunk);
}

function gestaltSave(btn) {
  gardenCancelPress();
  if (_gardenLongPressed) { _gardenLongPressed = false; return; }

  const span = btn.closest('.gestalt-chunk');
  if (!span) return;
  const { type, gid, verbform, assoc, chunk } = span.dataset;

  // Debounce：touch + click 可能同時觸發，300ms 內同一語塊只算一次
  const now = Date.now();
  if (chunk === _gardenLastSaveChunk && now - _gardenLastSaveTime < 300) return;
  _gardenLastSaveChunk = chunk;
  _gardenLastSaveTime = now;

  handleGardenProgress(chunk, btn);

  if (type === 'verb_action' || type === 'sov_single' || type === 'sov_double') {
    triggerAutoWrite(verbform, assoc, gid);
  }
  // Silent vocab add — no toast
  const clean = (chunk || '').replace(/[¡!¿?,.:;]+$/,'').replace(/^[¡¿]+/,'').trim();
  if (clean && !vocabList.some(v => v.text === clean)) {
    vocabList.push({ id: Date.now()+Math.random(), text: clean, zh: '', source: '語塊' });
    saveVocabToLS();
    renderVocab();
  }
}

// ── 💎 花園大專案 Phase 2：語塊花園總覽 + 實戰出題 ──

function findChunkExamples(chunk) {
  const results = [];
  const needle = chunk.toLowerCase().replace(/[¡!¿?,.:;]/g, '');
  if (typeof EPS !== 'undefined') {
    for (const ep of EPS) {
      for (const s of ep.sentences) {
        if (s.es.toLowerCase().replace(/[¡!¿?,.:;]/g, '').includes(needle)) {
          results.push({ es: s.es, zh: s.zh.split('\n')[0] });
          if (results.length >= 2) return results;
        }
      }
    }
  }
  if (typeof MOM_ATM_DATA !== 'undefined') {
    for (const catKey in MOM_ATM_DATA) {
      for (const item of MOM_ATM_DATA[catKey].items) {
        if (item.es.toLowerCase().replace(/[¡!¿?,.:;]/g, '').includes(needle)) {
          results.push({ es: item.es, zh: item.zh.split('\n')[0] });
          if (results.length >= 2) return results;
        }
      }
    }
  }
  if (typeof AMMO_DATA !== 'undefined') {
    const checkFire = fire => {
      if (!fire || results.length >= 2) return;
      const esMatch = fire.es.toLowerCase().replace(/[¡!¿?,.:;]/g, '').includes(needle);
      const noteMatch = (fire.chunks||[]).some(c => (c.note||'').toLowerCase().includes(needle));
      if (esMatch || noteMatch) results.push({ es: fire.es, zh: fire.zh.split('\n')[0] });
    };
    for (const a of AMMO_DATA) {
      if (results.length >= 2) break;
      checkFire(a.fire_peppa);
      (a.fire_daily||[]).forEach(checkFire);
    }
  }
  return results;
}

function renderGardenView() {
  const db = getGardenDB();
  const chunks = Object.keys(db);
  const totalEl = document.getElementById('gardenTotalCount');
  if (totalEl) totalEl.textContent = chunks.length;

  const stages = { clovr: [], fern: [], sprout: [], barrel: [] };
  chunks.forEach(chunk => {
    const s = classifyGardenStatus(db[chunk]).stage;
    if (s === 4) stages.barrel.push(chunk);
    else if (s === 3) stages.clovr.push(chunk);
    else if (s === 2) stages.fern.push(chunk);
    else stages.sprout.push(chunk);
  });

  const statsEl = document.getElementById('gardenStatsRow');
  if (statsEl) {
    const badge = (icon, arr, label) => arr.length
      ? `<span class="garden-stat-badge" title="${label}">${icon} <b>${arr.length}</b></span>` : '';
    const quizCount = stages.clovr.length + stages.fern.length + stages.sprout.length;
    statsEl.innerHTML = `<div class="garden-stats-inner">
      ${badge('🌱', stages.sprout, '初萌芽')}${badge('🍃', stages.fern, '猛漲期')}${badge('🍀', stages.clovr, '幸運草')}${badge('🌻', stages.barrel, '日頭花開')}
      ${quizCount > 0
        ? `<button class="garden-quiz-btn" onclick="openGardenQuiz()">🐛 抓蟲複習 (${quizCount})</button>`
        : `<span class="garden-quiz-hint">點 ☆ 收集語塊後可出題複習</span>`}
    </div>`;
  }

  const stagesEl = document.getElementById('gardenStages');
  if (!stagesEl) return;

  const renderGroup = (icon, label, arr, openByDefault, slogan) => {
    if (!arr.length) return '';
    const chips = arr.map(chunk => {
      const e = db[chunk];
      const qc = e.quiz_count || 0;
      const gs = classifyGardenStatus(e);
      const qBadge = gs.stage === 3 && qc > 0 ? `<span class="garden-chip-qc">${qc}/3</span>` : '';
      const annot = getChunkAnnotation(chunk);
      const annotHtml = annot ? `<span class="garden-chip-note">${annot}</span>` : '';
      const disp = _gardenChunkDisplay(chunk);
      const clickAttr = disp.speakable ? ` onclick="speakFull('${escAttr(chunk)}')" title="點擊聽發音"` : '';
      return `<button class="garden-chip"${clickAttr}>
        <span class="garden-chip-es">${disp.text}</span>${annotHtml}${qBadge}
      </button>`;
    }).join('');
    return `<div class="garden-stage-group">
      <div class="garden-stage-header" onclick="this.nextElementSibling.classList.toggle('open');this.querySelector('.garden-stage-chevron').classList.toggle('flipped')">
        <span class="garden-stage-icon">${icon}</span>
        <span class="garden-stage-label">${label}<span class="garden-stage-slogan">${slogan}</span></span>
        <span class="garden-stage-count">${arr.length}</span>
        <span class="garden-stage-chevron${openByDefault ? ' flipped' : ''}">▾</span>
      </div>
      <div class="garden-stage-chips${openByDefault ? ' open' : ''}">${chips}</div>
    </div>`;
  };

  stagesEl.innerHTML = [
    renderGroup('🍀', '幸運草・等待出題', stages.clovr, true, '等你發掘'),
    renderGroup('🍃', '猛漲期', stages.fern, true, '抽枝展葉'),
    renderGroup('🌱', '初萌芽', stages.sprout, false, '耐心呵護'),
    renderGroup('🌻', '日頭花開', stages.barrel, false, '萃取精釀'),
  ].join('') || '<div class="garden-empty-msg">點卡片旁的 ☆ 開始收集語塊 🌱</div>';
}

function toggleGardenView() {
  const body = document.getElementById('gardenViewBody');
  const t = document.getElementById('gardenViewToggle');
  if (!body) return;
  const open = body.classList.toggle('open');
  t.textContent = open ? '▲ 收起' : '▼ 展開';
  if (open) renderGardenView();
}

// ── 實戰出題 ──
let _quizQueue = [];
let _quizIdx = 0;
let _quizFlipped = false;

// 加權值：🍀=3（極難記，狂出題）、🍃=2（卡關，加強）、🌱/收藏=1、🌻=0（已盛放不動，排除）
function gardenWeightOf(entry) {
  const s = classifyGardenStatus(entry).stage;
  if (s === 4) return 0;
  if (s === 3) return 3;
  if (s === 2) return 2;
  return 1;
}

// 加權抽題：權重倍數放入池中 → 洗牌 → 去重取前 pageSize 題
function generateBattleQuestionPool(pageSize = 10) {
  const db = getGardenDB();
  const weighted = [];
  Object.keys(db).forEach(chunk => {
    const w = gardenWeightOf(db[chunk]);
    for (let i = 0; i < w; i++) weighted.push(chunk);
  });
  for (let i = weighted.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [weighted[i], weighted[j]] = [weighted[j], weighted[i]];
  }
  const seen = new Set(), out = [];
  for (const c of weighted) {
    if (!seen.has(c)) { seen.add(c); out.push(c); if (out.length >= pageSize) break; }
  }
  return out;
}

function openGardenQuiz(pageSize) {
  const quizable = generateBattleQuestionPool(pageSize || 10);
  if (!quizable.length) { toast('還沒有語塊可以出題，先點 ☆ 收集吧！'); return; }
  _quizQueue = quizable;
  _quizIdx = 0;
  _quizFlipped = false;
  const quizArea = document.getElementById('gardenQuizArea');
  if (quizArea) {
    quizArea.style.display = 'block';
    renderGardenQuizCard();
    quizArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// 點每日提醒通知直接進來的「今日小份」抓蟲，刻意壓低題數，降低啟動門檻
function openGardenQuizToday(){
  toast('🐛 強迫中獎！今天先抓 3 隻蟲');
  openGardenQuiz(3);
}

// 切到穀倉大豐收分頁、展開語塊花園、開今日小份抓蟲——通知深連結跟花園橫幅按鈕共用
function jumpToGardenQuizToday(){
  switchMainTab('private');
  const body = document.getElementById('gardenViewBody');
  const t = document.getElementById('gardenViewToggle');
  if(body && !body.classList.contains('open')){
    body.classList.add('open');
    if(t) t.textContent = '▲ 收起';
  }
  openGardenQuizToday();
}

// 🌻 花園新鮮度橫幅：純視覺，不影響熟練度資料
function renderGardenFreshness(){
  const el = document.getElementById('gardenFreshBody');
  if(!el) return;
  const last = getLastWatered();
  let msg, moodCls;
  if(!last){
    msg = '🌱 花園還在等妳播下第一顆種子';
    moodCls = 'fresh-full';
  } else {
    const days = Math.floor((Date.now() - last) / 86400000);
    if(days <= 0){ msg = '🌻 今天飽水有朝氣，花兒很有元氣！'; moodCls = 'fresh-full'; }
    else if(days === 1){ msg = '🌿 有點想妳了，來澆個水吧'; moodCls = 'fresh-1'; }
    else if(days === 2){ msg = '🥀 花有點蔫了，快來看看'; moodCls = 'fresh-2'; }
    else { msg = '🐛 糟糕，蟲跑來搗蛋了！'; moodCls = 'fresh-3'; }
  }

  const gdb = getGardenDB();
  const pool = generateBattleQuestionPool(5);
  const flowersHtml = pool.map(chunk => {
    const st = (gdb[chunk]||{stage:0}).stage;
    const icon = GARDEN_STAGES[st] || GARDEN_STAGES[1];
    const bug = moodCls === 'fresh-3' ? '<span class="gfresh-bug">🐛</span>' : '';
    return `<span class="gfresh-flower ${moodCls}">${icon}</span>${bug}`;
  }).join('');

  el.innerHTML = `
    <div class="gfresh-msg">${msg}</div>
    <div class="gfresh-flowers">${flowersHtml || '<span class="gfresh-empty">還沒有語塊可以澆水，先去田間收集吧！</span>'}</div>
    ${pool.length ? '<button class="gfresh-btn" onclick="jumpToGardenQuizToday()">🐛 去抓蟲</button>' : ''}
  `;
}

function renderGardenQuizCard() {
  const quizArea = document.getElementById('gardenQuizArea');
  if (!quizArea) return;
  if (_quizIdx >= _quizQueue.length) {
    quizArea.innerHTML = `<div class="quiz-done-msg">
      <div class="quiz-done-icon">🎉</div>
      <div class="quiz-done-text">這輪全部出完了！繼續收集語塊 🌱</div>
      <button class="quiz-close-btn" onclick="closeGardenQuiz()">收起</button>
    </div>`;
    renderGardenView();
    return;
  }
  const chunk = _quizQueue[_quizIdx];
  const db = getGardenDB();
  const entry = db[chunk] || { stage: 0, quiz_count: 0 };
  const gs = classifyGardenStatus(entry);
  const qc = entry.quiz_count || 0;
  const examples = findChunkExamples(chunk);

  const examplesHtml = examples.length
    ? examples.map(ex => `<div class="quiz-example-row">
        <span class="quiz-ex-es" onclick="speakFull('${escAttr(ex.es)}')">${ex.es}</span>
        <span class="quiz-ex-zh">${ex.zh}</span>
      </div>`).join('')
    : '';

  const needsMoreHtml = gs.stage === 3
    ? `<div class="quiz-qc-note">出題進度：${qc} / 3 次${qc >= 2 ? '（再一次就進橡木桶！）' : ''}</div>`
    : '';

  quizArea.innerHTML = `<div class="garden-quiz-card">
    <div class="quiz-progress-row">
      <span class="quiz-progress-text">🐛 ${_quizIdx + 1} / ${_quizQueue.length}</span>
      <button class="quiz-close-btn-sm" onclick="closeGardenQuiz()" title="關閉出題">✕</button>
    </div>
    <div class="quiz-stage-badge">${gs.icon} ${gs.label}</div>
    ${needsMoreHtml}
    <div class="quiz-chunk-display"${_gardenChunkDisplay(chunk).speakable?` onclick="speakFull('${escAttr(chunk)}')"`:''}>${_gardenChunkDisplay(chunk).text} <span class="quiz-speak-icon">▶</span></div>
    ${_quizFlipped
      ? `<div class="quiz-back">
          ${examplesHtml
            ? `<div class="quiz-examples-block">${examplesHtml}</div>`
            : '<div class="quiz-no-ex">在卡片句子中找不到原句，直接憑感覺出題</div>'}
          <button class="quiz-next-btn" onclick="gardenQuizNext()">下一句 →</button>
        </div>`
      : `<div class="quiz-check-label">你記得這個語塊怎麼用嗎？</div>
         <div class="quiz-action-row">
           <button class="quiz-btn quiz-btn-no" onclick="gardenQuizRate(false)">💪 再練</button>
           <button class="quiz-btn quiz-btn-yes" onclick="gardenQuizRate(true)">✅ 記得！</button>
         </div>`}
  </div>`;
}

function gardenQuizRate(good) {
  if (good) {
    const chunk = _quizQueue[_quizIdx];
    const db = getGardenDB();
    if (!db[chunk]) db[chunk] = { stage: 0, quiz_count: 0 };
    db[chunk].quiz_count = (db[chunk].quiz_count || 0) + 1;
    const gs = classifyGardenStatus(db[chunk]);
    if (gs.stage === 3 && db[chunk].quiz_count >= 3) {
      db[chunk].stage = 4;
      saveGardenDB(db);
      toast('🌻 幸運草 × 3 出題完成！日頭花開');
    } else {
      saveGardenDB(db);
      const qc = db[chunk].quiz_count;
      if (gs.stage === 3) toast(`✅ 記得！出題 ${qc} / 3`);
      else toast('✅ ¡Bien! 繼續加油');
    }
    markWatered();
    renderGardenFreshness();
  }
  _quizFlipped = true;
  const chunk = _quizQueue[_quizIdx];
  speakFull(chunk);
  renderGardenQuizCard();
}

function gardenQuizNext() {
  _quizIdx++;
  _quizFlipped = false;
  renderGardenQuizCard();
}

function closeGardenQuiz() {
  const quizArea = document.getElementById('gardenQuizArea');
  if (quizArea) quizArea.style.display = 'none';
  renderGardenView();
}

// ── 🔔 每日提醒通知（純前端，開著分頁/已加到主畫面時大多能準時跳，不保證100%）──
const REMINDER_LS_KEY = 'peppa_reminder_enabled';
const REMINDER_STUDY_MSGS = [
  '太陽升起來了🌅 今天的田要不要巡一下？',
  '語塊在田裡等你採收🌾',
  '早安！今天先開墾一句，再去忙別的事'
];
const REMINDER_DIARY_MSGS = [
  '一天要收工了，今天的心情裝瓶了嗎🍾',
  '深夜的穀倉還亮著燈，要不要進來寫一筆🌙',
  '睡前留一句給自己，今天過得怎麼樣？'
];
let _reminderTimer = null;

function _reminderDateStr(d){ return d.toISOString().slice(0,10); }

function _reminderPickMsg(list, dateStr){
  const dayNum = Number(dateStr.slice(8,10)) + Number(dateStr.slice(5,7))*31;
  return list[dayNum % list.length];
}

function _reminderShow(title, body, data){
  const opts = { body, icon:'icon.svg', tag:'peppa-reminder', data };
  if(navigator.serviceWorker && navigator.serviceWorker.ready){
    navigator.serviceWorker.ready.then(reg => {
      if(reg && reg.showNotification) reg.showNotification(title, opts);
      else new Notification(title, opts);
    }).catch(()=>{ try{ new Notification(title, opts); }catch(e){} });
  } else {
    try{ new Notification(title, opts); }catch(e){}
  }
}

function checkReminders(){
  if(Notification.permission !== 'granted') return;
  if(localStorage.getItem(REMINDER_LS_KEY) !== '1') return;

  const now = new Date();
  const hDec = now.getHours() + now.getMinutes()/60;
  const todayStr = _reminderDateStr(now);

  // ☀️ 學習提醒 08:30–10:00
  if(hDec >= 8.5 && hDec < 10){
    const lastStudy = localStorage.getItem('peppa_reminder_last_study');
    if(lastStudy !== todayStr){
      _reminderShow('🌾 田間播語塊', _reminderPickMsg(REMINDER_STUDY_MSGS, todayStr), {action:'quiz'});
      localStorage.setItem('peppa_reminder_last_study', todayStr);
    }
  }

  // 🌙 日記提醒 23:00–01:00（跨午夜，00:00-01:00算前一晚的循環）
  if(hDec >= 23 || hDec < 1){
    const cycleDate = new Date(now);
    if(now.getHours() === 0) cycleDate.setDate(cycleDate.getDate()-1);
    const cycleStr = _reminderDateStr(cycleDate);
    const lastDiary = localStorage.getItem('peppa_reminder_last_diary');
    if(lastDiary !== cycleStr){
      _reminderShow('🛌 床邊低語呢', _reminderPickMsg(REMINDER_DIARY_MSGS, cycleStr), {action:'diary'});
      localStorage.setItem('peppa_reminder_last_diary', cycleStr);
    }
  }
}

function updateReminderBtn(){
  const btn = document.getElementById('reminderToggleBtn');
  if(!btn) return;
  const on = Notification && Notification.permission === 'granted' && localStorage.getItem(REMINDER_LS_KEY) === '1';
  btn.textContent = on ? '🔕 巡田鈴已響' : '🔔 設下巡田鈴';
  btn.classList.toggle('is-on', on);
}

async function toggleReminders(){
  if(!('Notification' in window)){
    toast('此瀏覽器不支援通知功能');
    return;
  }
  const on = Notification.permission === 'granted' && localStorage.getItem(REMINDER_LS_KEY) === '1';
  if(on){
    localStorage.setItem(REMINDER_LS_KEY, '0');
    updateReminderBtn();
    toast('已關閉每日提醒');
    return;
  }
  const perm = await Notification.requestPermission();
  if(perm === 'granted'){
    localStorage.setItem(REMINDER_LS_KEY, '1');
    updateReminderBtn();
    toast('🔔 每日提醒已開啟！8:30-10:00 巡田、23:00-01:00 寫日記');
    checkReminders();
  } else {
    toast('沒有通知權限，請到瀏覽器設定手動開啟');
  }
}

// 點通知深連結：?action=quiz 直接跳穀倉大豐收開抓蟲、?action=diary 跳床邊低語呢
function handleReminderDeepLink(){
  const params = new URLSearchParams(location.search);
  const action = params.get('action');
  if(!action) return;
  history.replaceState(null, '', location.pathname);
  if(action === 'quiz'){
    setTimeout(jumpToGardenQuizToday, 150);
  } else if(action === 'diary'){
    switchMainTab('mom');
    setTimeout(() => {
      const el = document.getElementById('mom-atm-container');
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    }, 150);
  }
}

function initReminders(){
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  }
  updateReminderBtn();
  if(_reminderTimer) clearInterval(_reminderTimer);
  _reminderTimer = setInterval(checkReminders, 60000);
  checkReminders();
}

(function init(){
  loadFromLS();
  answered=(answeredByEp[ep]||[]).slice();
  loadVocabFromLS();
  loadFamiliarity();
  loadGrammarLib();
  migrateOldDataToGarden();
  buildNav();
  render();
  renderAmmo();
  renderCogLibrary();
  renderConjLibrary();
  renderPronounLibrary();
  renderGenderPairs();
  renderSerEstarStation();
  renderGrammarSupplement();
  renderSelLine();
  renderVocab();
  renderGardenView();
  renderGardenFreshness();
  initTTS();
  initGroupButtons();
  restoreActiveTab();
  initReminders();
  handleReminderDeepLink();
})();
