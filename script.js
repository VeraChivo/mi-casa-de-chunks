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
    { text: "¡No te rindas! — 換個思路再挑戰一次！", emoji: "⚡" },
    { text: "¡Tranquila! — 別緊張，還不熟，手滑難免～", emoji: "🤗" }
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
  if(clean.includes(' ')){
    // 語塊/句子：先試試看是不是課文原句(真人音檔)，抓不到才TTS
    const chunkFile = (typeof CHUNK_AUDIO_MAP!=='undefined') ? CHUNK_AUDIO_MAP[text] : null;
    if(chunkFile){
      _stopActiveAudio();
      const player = new Audio(chunkFile);
      _activeAudio = player;
      player.onerror = () => speakWord(clean, null);
      player.play().catch(()=>speakWord(clean, null));
      return;
    }
    if(typeof GRAM_AUDIO_MAP!=='undefined' && GRAM_AUDIO_MAP[text]){ speakGramSmart(text); return; }
    speakWord(clean, null);
  }
  else openWordReference(clean); // 單字 → WordReference
}

// ── 全站共用：確保任何時候只有一個真人音檔在播放，快速連點語塊不會疊在一起 ──
let _activeAudio = null;
function _stopActiveAudio(){
  if(_activeAudio){ try{ _activeAudio.pause(); }catch(e){} _activeAudio = null; }
  try{ if(window.speechSynthesis) speechSynthesis.cancel(); }catch(e){}
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
  _stopActiveAudio();
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
  // cancel()後立刻speak()，Chrome常常會把新句子開頭幾個字吃掉，留夠時間讓引擎重置再開口
  setTimeout(() => {
    try{ speechSynthesis.speak(utt); }catch(e){ toast('⚠️ 語音播放失敗'); }
  }, 150);
}

function speakFull(text){
  speakWord(text.replace(/[¡¿]/g,''), null);
}

// ── 真人錄音音檔優先播放，找不到時 fallback 回瀏覽器 TTS ──
function speakSentenceSmart(epIdx, sentIdx, text){
  const files = (typeof AUDIO_MANIFEST!=='undefined' && AUDIO_MANIFEST[epIdx] && AUDIO_MANIFEST[epIdx][sentIdx]) || [];
  if(!files.length){ speakFull(text); return; }
  _stopActiveAudio();
  let i = 0;
  const player = new Audio();
  _activeAudio = player;
  player.onended = () => { i++; setTimeout(playNext, 15); };
  player.onerror = () => { speakFull(text); };
  function playNext(){
    if(i >= files.length || player !== _activeAudio) return;
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
  _stopActiveAudio();
  const player = new Audio(file);
  _activeAudio = player;
  player.onerror = () => speakFull(text);
  player.play().catch(()=>speakFull(text));
}

// ── 真人錄音音檔優先播放（單檔版，mom.js/corazon.js 用），找不到時 fallback 回瀏覽器 TTS ──
function speakMapSmart(map, catKey, idx, text){
  const file = (typeof window[map]!=='undefined' && window[map][catKey] && window[map][catKey][idx]) || null;
  if(!file){ speakFull(text); return; }
  _stopActiveAudio();
  const player = new Audio(file);
  _activeAudio = player;
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

// ── 里程碑系統 ──
const CHUNK_MILESTONES = [
  { n:4,   cefr:'A1', badge:'🌱', name:'護土嫩芽', msg:'種子破土了！你已跨出第一步。現在去聽慢歌，你會發現原本糊掉的單字開始發光。',
    song:{ artist:'Julieta Venegas', title:'Limón y Sal', chunk:'Si por mí fuera', t:52, yt:'https://www.youtube.com/watch?v=bEvpImfYQqE&t=52s' } },
  { n:15,  cefr:'A2', badge:'💧', name:'甘露初沁', msg:'甘露滋潤！你掌握了「願望」的配方。開始能看懂 IG 網紅簡單的個人心情分享了。',
    song:{ artist:'Juanes', title:'A Dios Le Pido', chunk:'Que mis ojos se despierten', t:46, yt:'https://www.youtube.com/watch?v=kMIaYXxLnUA&t=46s' } },
  { n:45,  cefr:'B1', badge:'🍯', name:'蜂蜜初採', msg:'花蜜入桶！你已能辨識網民的「主觀情緒」。聽歌時，耳朵能自動拆解出連音結構。',
    song:{ artist:'Juan Luis Guerra', title:'Ojalá Que Llueva Café', chunk:'Ojalá que llueva café', t:30, yt:'https://www.youtube.com/watch?v=TiPRNqJnI_k&t=30s' } },
  { n:90,  cefr:'B2', badge:'🎖️', name:'蜂王蜜釀', msg:'蜂王精釀！解鎖「假設世界」。你現在有能力看懂 Threads 上的諷刺留言與地獄梗。',
    song:{ artist:'Beyoncé', title:'Si Yo Fuera Un Chico', chunk:'Si yo fuera un chico', t:20, yt:'https://www.youtube.com/watch?v=7iMNLqqHPac&t=20s' } },
  { n:180, cefr:'C1', badge:'🏆', name:'莊園金牌', msg:'金牌傳奇！180 顆複利語塊達成。你能跟著 Reggaeton 饒舌，完全融入拉美社交圈。',
    song:{ artist:'Rosalía', title:'Despechá', chunk:'Que Dios me libre', t:38, yt:'https://www.youtube.com/watch?v=Aloe79Wjq34&t=38s' } }
];

// 晉級祝賀語塊：依 CEFR 分兩組隨機抽選，避免每次晉級看到同一句
const CELEBRATION_NEN_YA = [ // A1/A2 護土嫩芽 ~ 甘露初沁
  {es:"¡Hola amigo!", zh:"嗨，朋友！恭喜你跨出第一步。小莊園的口說外掛已偷偷為你開啟：試著對麥克風大聲唸出這句話，只要能精準識別，就代表你的西語口說跨出完美的第一步囉！"},
  {es:"¡Muy bien!", zh:"做得好！你成長的速度，快到真寶寶都來不及吃完一整包小餅乾！這張徽章是屬於你的，快用這句超短語塊，去跟蜂巢裡的小蜜蜂打個招呼吧！"},
  {es:"¡Vamos, vamos!", zh:"衝啊、衝啊！偵測到基礎算力正在瘋狂萌芽。小蜜蜂工頭在後台高舉板手為你歡呼，這句簡單的西語你已經完全掌握了，準備好迎接下一個語塊了嗎？"},
  {es:"¡Eres el mejor!", zh:"你最棒了！偵測到強大的口說算力，你的語塊樹正在瘋狂抽高！文法儲水槽的燃料已經超頻，請保持這個完美的發音，讓複利雪球滾得更大！"},
  {es:"¡Gran cosecha!", zh:"大豐收！你今天的學習複利直接讓莊園長出黃金果實！小蜜蜂已經把這份資產累積里程碑刻在功德榜上了，趕快大聲唸出下一個句子，繼續擴建你的綠色領地！"}
];
const CELEBRATION_CHAO_PIN = [ // B1/B2/C1 蜂蜜初採 ~ 莊園金牌
  {es:"El interés compuesto es más paciente que el viento, pero hace crecer tu bosque.", zh:"複利比風更有耐心，但它能讓你的森林（資產）長大。"},
  {es:"Acumular tus tesoros de chunks es tan hermoso como ver florecer el panal.", zh:"累積你的「語塊寶藏」，跟看著蜂巢開花（繁榮）一樣美麗。"},
  {es:"Una raíz profunda es menos frágil que una hoja suelta. ¡Sigue practicando!", zh:"一條深根，比一片飄落的葉子還不脆弱（更堅固）。繼續練習吧！"},
  {es:"¡Excelente! 👑🐝", zh:"語塊資產又更厚實了一層。聽說蜂巢深處流傳著一個關於【皇家特許令】的古老傳說——哪天你正好滑到網頁最底下的功德榜，不妨順道看看那個故事。"}
];
function pickCelebrationMessage(cefr){
  const pool = (cefr==='A1' || cefr==='A2') ? CELEBRATION_NEN_YA : CELEBRATION_CHAO_PIN;
  return pool[Math.floor(Math.random()*pool.length)];
}
function _msGetSeen(){ try{ return JSON.parse(localStorage.getItem('peppa_milestones_v1')||'[]'); }catch(e){ return []; } }
function _msSave(seen){ try{ localStorage.setItem('peppa_milestones_v1', JSON.stringify(seen)); }catch(e){} }
function _checkNewMilestone(){
  const count = (ammoUnlocked||[]).length;
  const seen = _msGetSeen();
  return CHUNK_MILESTONES.some(m => m.n <= count && !seen.includes(m.n));
}
function popNewMilestone(){
  const count = (ammoUnlocked||[]).length;
  const seen = _msGetSeen();
  const m = CHUNK_MILESTONES.find(m => m.n <= count && !seen.includes(m.n));
  if(m){ seen.push(m.n); _msSave(seen); }
  return m || null;
}
function renderMilestoneBadgeStrip(){
  const el = document.getElementById('milestoneBadgeStrip');
  if(!el) return;
  const count = (ammoUnlocked||[]).length;
  const next = CHUNK_MILESTONES.find(m => m.n > count);
  let html = '<div class="ms-strip">';
  CHUNK_MILESTONES.forEach(m=>{
    const earned = m.n <= count;
    html += `<span class="ms-badge${earned?'':' ms-dim'}" title="${m.name}（${m.cefr}，${m.n}粒）">${m.badge}</span>`;
  });
  if(next) html += `<span class="ms-next-hint">再 ${next.n - count} 粒 → 下一階 ${next.badge}</span>`;
  html += '</div>';
  el.innerHTML = html;
}

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
  60:['e7_01'], 61:['e7_02'], 62:['e7_03'], 63:['e7_04'], 64:['e7_05'],
  65:['e7_06'], 66:['e7_07'], 67:['e7_08'], 68:['e7_09'], 69:['e7_10'],
  70:['e8_01'], 71:['e8_02'], 72:['e8_03'], 73:['e8_04'], 74:['e8_05'],
  75:['e8_06'], 76:['e8_07'], 77:['e8_08'], 78:['e8_09'], 79:['e8_10'],
  80:['e9_01'], 81:['e9_02'], 82:['e9_03'], 83:['e9_04'], 84:['e9_05'],
  85:['e9_06'], 86:['e9_07'], 87:['e9_08'], 88:['e9_09'], 89:['e9_10'],
  90:['e10_01'], 91:['e10_02'], 92:['e10_03'], 93:['e10_04'], 94:['e10_05'],
  95:['e10_06'], 96:['e10_07'], 97:['e10_08'], 98:['e10_09'], 99:['e10_10'],
};

function unlockAmmo(globalIdx){
  const ids = SENTENCE_AMMO_MAP2[globalIdx] || [];
  ids.forEach(id=>{
    if(!ammoUnlocked.includes(id)) ammoUnlocked.push(id);
  });
  renderAmmo();
  renderMilestoneBadgeStrip();
  if(_checkNewMilestone()){
    let tourSeen = false;
    try{ tourSeen = !!localStorage.getItem('peppa_welcome_tour_seen_v1'); }catch(e){}
    if(tourSeen) showMorningBrief();
  }
  if(typeof checkStorageQuota === 'function') checkStorageQuota();
}

function cycleAmmoStar(ammoId, gardenKey){ handleGardenProgress(gardenKey, document.querySelector('#ammo-'+ammoId+' .ammo-star')); }

function escAttr(s){ return String(s).replace(/'/g,"\\'").replace(/"/g,'&quot;'); }

function getPersonClass(w){
  const t = w.replace(/[¡¿（）]/g,'').trim().toLowerCase();
  if(t==='yo') return 'person-yo';
  if(t==='tú'||t==='tu') return 'person-tu';
  return '';
}

// 連接詞螢光筆：role='c'不是每次都真的是連接詞(cognates.js裡也拿role:'c'標過純補語片語)，
// 要用「字本身是不是真的連接詞」來判斷，不能只看role，才不會誤套到不相干的片語上。
// y類(順接)緊湊、pero類(轉折/因果)寬鬆帶呼吸感——數值跟樣式已跟VERA定案。
const CONN_FLOW = new Set(['y','e','o','u','también','además']);
const CONN_PAUSE = new Set(['pero','sino','aunque','sin embargo','porque','ya que','así que','por eso','cuando','después','entonces']);
function connFlowClass(w){
  const clean = String(w||'').replace(/[¡¿!.,;:]/g,'').trim().toLowerCase();
  if(CONN_FLOW.has(clean)) return 'conn-flow';
  if(CONN_PAUSE.has(clean)) return 'conn-pause';
  return '';
}

function renderAmmoFireChunks(fire, ammoId, rowType, playExpr){
  if(!fire.chunks || !fire.chunks.length) return '';
  const _fdb=getGardenDB();
  const playAttr = playExpr ? ` data-playexpr="${playExpr.replace(/"/g,'&quot;')}"` : '';
  return `<div class="ammo-fire-chunks">${fire.chunks.map(c=>{
    const personCls=c.role==='s'?getPersonClass(c.w):'';
    const clean=c.w.replace(/[¡¿.,!?;:（）]/g,'').trim();
    const key='ammo_'+(ammoId||'x')+'_'+(rowType||'r')+'_'+clean;
    const _fst=GARDEN_STAGES[(_fdb[key]||{stage:0}).stage||0];
    const starHtml=`<span class="ammo-chunk-star" onclick="event.stopPropagation();handleGardenProgress('${escAttr(key)}',this)" title="語塊進度">${_fst}</span>`;
    const disp=c.role==='v'?renderVWords(c.w):c.w;
    const connCls=c.role==='c'?connFlowClass(c.w):'';
    return `<span class="ammo-fire-chunk role-${c.role||'plain'}${personCls?' '+personCls:''}${connCls?' '+connCls:''}"${playAttr} onclick="event.stopPropagation();ammoChunkTap(this,'${escAttr(c.w)}',${!!c.hideYg},'${escAttr(c.note||'')}')">${disp}</span>${starHtml}`;
  }).join('')}</div>`;
}

function renderAmmoFireRow(fire, type, ammoId, dailyIdx){
  const tag = type==='peppa' ? '🎯 原句直擊（劇情原句）' : '🔥 全速運轉（日常對話）';
  const tsLabel = type==='peppa' && fire.ts!=null
    ? `<span class="ammo-fire-ts" onclick="seekYT(${fire.ts})">▶ ${Math.floor(fire.ts/60)}:${String(fire.ts%60).padStart(2,'0')}</span>`
    : '';
  let rowClick = '';
  let chunkPlayExpr = null; // 語塊點下去統一播整句真人音檔，跟外面的row click保持一致
  if(type==='peppa'){
    if(fire.ts!=null){ rowClick = `seekYT(${fire.ts})`; }
    else {
      // fire_peppa.es 跟課文原句完全相同，直接借用課文的真人音檔
      const m = (ammoId||'').match(/^e(\d+)_(\d+)$/);
      rowClick = m ? `speakSentenceSmart(${parseInt(m[1],10)-1},${parseInt(m[2],10)-1},'${escAttr(fire.es)}')` : `speakFull('${escAttr(fire.es)}')`;
      chunkPlayExpr = rowClick;
    }
  } else {
    rowClick = `speakAmmoDaily('${escAttr(ammoId)}',${dailyIdx},'${escAttr(fire.es)}')`;
    chunkPlayExpr = rowClick;
  }
  return `<div class="ammo-fire-row ${type}" onclick="${rowClick}">
    <div class="ammo-fire-tag ${type}">${tag}${tsLabel}</div>
    <div class="ammo-fire-es">${fire.es}</div>
    <div class="ammo-fire-zh">${fire.zh}</div>
    ${renderAmmoFireChunks(fire, ammoId, type, chunkPlayExpr)}
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
const NUM_WORDS=['','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve','diez','once','doce','trece','catorce','quince','dieciséis'];
const ORD_WORDS=['','primero','segundo','tercero','cuarto','quinto','sexto','séptimo','octavo','noveno','décimo','undécimo','duodécimo','decimotercero','decimocuarto','decimoquinto','decimosexto'];

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
      const numDisplay = `<span class="ammo-num-ep">EP${epNum}-${num}</span><span class="ammo-num-sep">·</span><span class="ammo-num-text">${NUM_WORDS[num]}</span><span class="ammo-num-sep">/</span><span class="ammo-num-text">${ORD_WORDS[num]}</span><span class="ammo-num-sep">/</span><span class="ammo-num-emoji">${NUM_EMOJI[num]}</span>`;
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
  if(badge) badge.textContent=`EP${ep+1}. ${epData().titleZh}`;
}

function renderGroupFireArea(entries){
  const el=document.getElementById('groupFireArea');
  if(!el) return;
  el.innerHTML=entries.map(a=>`
    <div class="group-fire-card">
      <div class="group-fire-core" onclick="speakAmmoCore('${escAttr(a.ammo_id)}','${escAttr(a.core_ammo)}')">${a.core_ammo} <small style="color:var(--tlight);font-weight:500">${a.core_zh}</small></div>
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
  const _gdb = getGardenDB();
  el.innerHTML = GENDER_PAIRS.map((p,pi)=>`
    <div class="gp-card">
      <div class="gp-zh">${p.zh}</div>
      <div class="gp-toggles">
        ${p.options.map((o,oi)=>{
          const worthy = isVocabWorthy(o.word);
          const addBtnHtml = worthy ? `<span class="vocab-add-btn" onclick="event.stopPropagation();addToVocab('${escAttr(o.word)}','${escAttr(p.zh)}','太極定裝鏡')">＋</span>` : '';
          const _key = 'gp_'+o.word;
          const _st = (_gdb[_key]||{stage:0}).stage;
          const _ic = GARDEN_STAGES[_st];
          const starHtml = worthy ? `<span class="ge-chunk-star${_st===0?' garden-empty':''}" onclick="event.stopPropagation();handleGardenProgress('gp_${escAttr(o.word)}',this)" title="語塊進度">${_ic}</span>` : '';
          return `<span class="gp-toggle-wrap"><span class="gp-toggle ${o.suf==='a'?'gp-toggle-f':'gp-toggle-m'}" id="gp-${pi}-${oi}" onclick="pickGenderPair(${pi},${oi})">${o.word}</span>${starHtml}${addBtnHtml}</span>`;
        }).join('')}
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
    _stopActiveAudio();
    const player = new Audio(file);
    _activeAudio = player;
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
  _stopActiveAudio();
  _cogPaused = false;
  _cogGen++;
  const myGen = _cogGen;
  const pauseBtn = document.getElementById('cogDualPauseBtn');
  if(pauseBtn){ pauseBtn.textContent='⏸ 暫停'; pauseBtn.style.display=''; }
  const seekEl = document.getElementById('cogDualSeek');
  if(seekEl){ seekEl.style.display=''; seekEl.value=1; }
  _cogState = {
    i: 1, step: 0, total: 42,
    firstFolder:  dir==='sp' ? 'audio/vocab/cognates_sp' : 'audio/vocab/cognates_en',
    firstPrefix:  dir==='sp' ? 'sp-sp-eng' : 'eng-sp-eng',
    secondFolder: dir==='sp' ? 'audio/vocab/cognates_en' : 'audio/vocab/cognates_sp',
    secondPrefix: dir==='sp' ? 'eng-sp-eng' : 'sp-sp-eng',
  };
  const player = new Audio();
  _cogDualPlayer = player;
  _activeAudio = player;
  player.onended = () => _cogAdvance(myGen);
  player.onerror = () => { if(myGen===_cogGen){ toast('⚠️ 音檔播放失敗，已停止'); _cogState=null; } };
  _cogPlayCurrent(myGen);
}
function _cogPlayCurrent(myGen){
  if(myGen!==_cogGen || _cogDualPlayer!==_activeAudio) return;
  const st = _cogState;
  if(!st || st.i > st.total || !_cogDualPlayer) return;
  toast(`🎧 ${st.i}/${st.total}`);
  const seekEl = document.getElementById('cogDualSeek');
  if(seekEl && document.activeElement!==seekEl) seekEl.value = st.i;
  const folder = st.step===0 ? st.firstFolder : st.secondFolder;
  const prefix = st.step===0 ? st.firstPrefix : st.secondPrefix;
  _cogDualPlayer.src = `${folder}/${prefix}_${String(st.i).padStart(2,'0')}.mp3`;
  _cogDualPlayer.play().catch(()=>{ if(myGen===_cogGen){ toast('⚠️ 音檔播放失敗，已停止'); _cogState=null; } });
}
// 拖拉進度條直接跳到第i組，不用從頭開始
function seekCognateDual(i){
  if(!_cogState || !_cogDualPlayer) return;
  _cogState.i = parseInt(i,10);
  _cogState.step = 0;
  _cogPaused = false;
  const pauseBtn = document.getElementById('cogDualPauseBtn');
  if(pauseBtn) pauseBtn.textContent = '⏸ 暫停';
  _cogPlayCurrent(_cogGen);
}
function _cogAdvance(myGen){
  if(myGen!==_cogGen || !_cogState || _cogDualPlayer!==_activeAudio) return;
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

let _cogViewMode = 'ep'; // 'ep'=依集數（預設）｜'pattern'=依規律分組
function toggleCogViewMode(){
  _cogViewMode = _cogViewMode==='pattern' ? 'ep' : 'pattern';
  renderCogLibrary();
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
        const exPlayExpr = w.ex ? `speakGramSmart('${escAttr(w.ex.es)}')` : '';
        const chunksHtml = (w.ex?.chunks||[]).map(ck=>{
          const clean=ck.w.replace(/^[¡¿]+|[.!?,;:]+$/g,'').trim();
          if(!clean) return '<span class="suffix-ex-punct">'+ck.w+'</span>';
          const _sfKey='sfx_'+clean;
          const _sfSt=(_sfxDb[_sfKey]||{stage:0}).stage;
          const _sfIc=GARDEN_STAGES[_sfSt];
          const starHtml = isVocabWorthy(ck.w) ? '<span class="suffix-chunk-star'+(_sfSt===0?' garden-empty':'')+'" onclick="event.stopPropagation();handleGardenProgress(\'sfx_'+escAttr(clean)+'\',this)" title="語塊進度">'+_sfIc+'</span>' : '';
          const dispW=ck.role==='v'?renderVWords(ck.w):ck.w;
          const connCls=ck.role==='c'?connFlowClass(ck.w):'';
          return '<span class="suffix-ex-unit"><span class="suffix-ex-chunk role-'+ck.role+(connCls?' '+connCls:'')+'" data-copy-text="'+escAttr(clean)+'" onclick="event.stopPropagation();'+exPlayExpr+'">'+dispW+'</span>'+starHtml+'</span>';
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
          ${w.ex?`<div class="suffix-ex" onclick="${exPlayExpr}" title="點這裡聽整句">
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
          <span class="falsecog-notlike"><span class="falsecog-icon">🚫</span> 不是「${f.looksLike}」（${f.wrongZh}）</span>
        </div>
        <div class="falsecog-real">✅ 真正意思：${f.realZh}</div>
        ${f.wrongEx ? `<div class="falsecog-ex falsecog-ex-wrong" onclick="speakGramSmart('${escAttr(f.wrongEx.es)}')">
          <div class="falsecog-ex-es">▶ ${f.wrongEx.es}</div>
          <div class="falsecog-ex-zh">${f.wrongEx.zh}</div>
        </div>` : ''}
        ${f.rightEx ? `<div class="falsecog-ex falsecog-ex-right" onclick="speakGramSmart('${escAttr(f.rightEx.es)}')">
          <div class="falsecog-ex-es">▶ ${f.rightEx.es}</div>
          <div class="falsecog-ex-zh">${f.rightEx.zh}</div>
        </div>` : ''}
      </div>`).join('');
    html+=`</div>`;
  }

  if(!q){
    html+=`<div class="cog-dual-row">
      <button class="cog-dual-btn" onclick="playCognateDual('sp')">🎧 西 → 英 對照</button>
      <button class="cog-dual-btn" onclick="playCognateDual('en')">🎧 英 → 西 對照</button>
      <button class="cog-dual-btn cog-dual-pause" id="cogDualPauseBtn" style="display:none" onclick="toggleCognateDualPause(this)">⏸ 暫停</button>
    </div>
    <input type="range" class="cog-dual-seek" id="cogDualSeek" min="1" max="42" value="1" step="1" style="display:none" oninput="seekCognateDual(this.value)">
    <div class="cog-dual-row">
      <button class="cog-dual-btn" onclick="toggleCogViewMode()">${_cogViewMode==='pattern'?'📖 改看依集數':'🧩 改看依規律'}</button>
    </div>`;
  }

  const _rowHtml = c => `
        <div class="cog-row">
          <span class="cog-en">${c.en}</span>
          <span class="cog-arrow">→</span>
          <span class="cog-es" onclick="openYGPanel('${escAttr(c.es)}')">${c.art?`<span class="cog-art">${c.art}</span> `:''}${c.es}</span>
          <span class="cog-zh">${c.zh}</span>
          <span class="vocab-add-btn" onclick="addToVocab('${escAttr(c.es)}','${escAttr(c.zh)}','同源詞庫')">＋</span>
        </div>`;

  const filtered = COGNATE_LIBRARY.filter(c => !q || c.en.toLowerCase().includes(q)||c.es.toLowerCase().includes(q)||c.zh.includes(q));
  if(!filtered.length && q){
    html+=`<div class="passbook-empty">找不到符合的詞彙</div>`;
  } else if(!q && _cogViewMode==='pattern'){
    // 依規律分組（同一份資料換個角度看，不影響原始 ep 分類）
    const patOrder=['suffix','double','sound','core','other'];
    const groups={};
    filtered.forEach(c=>{
      const tag = (typeof COGNATE_PATTERN_TAGS!=='undefined' && COGNATE_PATTERN_TAGS[c.en]) || 'other';
      if(!groups[tag]) groups[tag]=[];
      groups[tag].push(c);
    });
    patOrder.forEach(tag=>{
      if(!groups[tag]) return;
      const label = (typeof COGNATE_PATTERN_LABELS!=='undefined' && COGNATE_PATTERN_LABELS[tag]) || tag;
      html+=`<div class="cog-group"><div class="cog-group-title">${label}</div><div class="cog-row-list">`;
      html+=groups[tag].map(_rowHtml).join('');
      html+=`</div></div>`;
    });
  } else {
    // 按集數分組（原本的預設檢視）
    const epOrder=[];
    const groups={};
    filtered.forEach(c=>{
      if(!groups[c.ep]){groups[c.ep]=[];epOrder.push(c.ep);}
      groups[c.ep].push(c);
    });
    epOrder.forEach(epLabel=>{
      html+=`<div class="cog-group"><div class="cog-group-title">${epLabel}</div><div class="cog-row-list">`;
      html+=groups[epLabel].map(_rowHtml).join('');
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
  if(vocabList.some(v=>v.text===clean)){ toast('已經在私語窖存釀過了！'); return; }
  vocabList.push({id:Date.now()+Math.random(), text:clean, zh:zh||'', source:source||''});
  saveVocabToLS();
  renderVocab();
  toast('☆ 已送至私語窖存釀！');
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
        ${ex ? `<div class="vocab-example" onclick="speakGramSmart('${escAttr(ex.es)}')"><span class="vocab-example-es">${ex.es}</span><span class="vocab-example-zh">${ex.zh}</span></div>` : ''}
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
    speakGramSmart(built);
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
    res.innerHTML=`¡Eso es! 🌟 用了 ${verbsFound.join(' / ')}${saved?' — 已存進文法酷庫 💡':' — 就是這樣！'}<span class="make-stt-hint">🎤 進階：用 Google 鍵盤語音輸入再唸一次，看能不能辨識出來</span><button class="make-notes-btn" onclick="switchTab('tabMom');setTimeout(()=>{const n=document.getElementById('mama-secret-notes');if(n)n.focus()},350)">📝 記到手札</button>`;
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

// ── 🎙️ 雙音軌錄放對比：🐝小蜜蜂導師（官方發音）vs 🎙️輪到我仿說（錄自己的聲音跟著比對）──
// iOS/Safari 要求 AudioContext/getUserMedia 必須綁在使用者主動點擊事件裡才會放行，
// 所以 getUserMedia() 一定要寫在 onClick 觸發的 echoStartRecording() 裡面，不能提前呼叫。
let _echoRecorder = null;
let _echoChunks = [];
let _echoBlobUrl = null;
let _echoState = 'idle'; // idle | recording | ready
function echoPlayRef(){ speakSentenceSmart(ep, idx, cur().es); }
function _echoSetBtn(label, recording){
  const btn = document.getElementById('echoRecBtn');
  if(!btn) return;
  btn.textContent = label;
  btn.classList.toggle('echo-recording', !!recording);
}
function _echoSetHint(text, clickable){
  const hint = document.getElementById('echoHint');
  if(!hint) return;
  if(!text){ hint.style.display='none'; hint.onclick=null; return; }
  hint.textContent = text;
  hint.style.display = 'block';
  hint.style.cursor = clickable ? 'pointer' : 'default';
  hint.style.textDecoration = clickable ? 'underline' : 'none';
  hint.onclick = clickable ? echoResetForNewSentence : null;
}
function echoResetForNewSentence(){
  if(_echoRecorder && _echoRecorder.state === 'recording'){
    try{ _echoRecorder.stop(); }catch(e){}
  }
  if(_echoBlobUrl){ try{ URL.revokeObjectURL(_echoBlobUrl); }catch(e){} }
  _echoBlobUrl = null;
  _echoChunks = [];
  _echoState = 'idle';
  _echoSetBtn('🎙️ 輪到我仿說', false);
  _echoSetHint('', false);
}
function echoToggleRecord(){
  if(_echoState === 'idle') echoStartRecording();
  else if(_echoState === 'recording') echoStopRecording();
  else if(_echoState === 'ready') echoPlayRecording();
}
function echoStartRecording(){
  if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || typeof MediaRecorder === 'undefined'){
    toast('這個瀏覽器不支援錄音功能，換個瀏覽器試試看吧');
    return;
  }
  navigator.mediaDevices.getUserMedia({audio:true}).then(stream=>{
    let mr;
    try{ mr = new MediaRecorder(stream); }
    catch(e){ toast('這個瀏覽器不支援錄音功能，換個瀏覽器試試看吧'); stream.getTracks().forEach(t=>t.stop()); return; }
    _echoRecorder = mr;
    _echoChunks = [];
    mr.ondataavailable = (e)=>{ if(e.data && e.data.size>0) _echoChunks.push(e.data); };
    mr.onstop = ()=>{
      stream.getTracks().forEach(t=>t.stop());
      if(_echoBlobUrl){ try{ URL.revokeObjectURL(_echoBlobUrl); }catch(e){} }
      const blob = new Blob(_echoChunks, {type: mr.mimeType || 'audio/webm'});
      _echoBlobUrl = URL.createObjectURL(blob);
      _echoState = 'ready';
      _echoSetBtn('▶️ 播放我的仿說', false);
      _echoSetHint('🔄 想重錄嗎？點這裡', true);
    };
    mr.start();
    _echoState = 'recording';
    _echoSetBtn('⏹️ 停止錄音', true);
    _echoSetHint('🔴 錄音中，講完按一下停止', false);
  }).catch(()=>{
    toast('🎙️ 沒有拿到麥克風權限，去瀏覽器設定開啟後再試一次');
  });
}
function echoStopRecording(){
  if(_echoRecorder && _echoRecorder.state === 'recording') _echoRecorder.stop();
}
function echoPlayRecording(){
  if(!_echoBlobUrl) return;
  new Audio(_echoBlobUrl).play().catch(()=>toast('播放失敗，再試一次看看'));
}

// ── RENDER CARD ──
function render(){
  saveToLS(); // 記住目前瀏覽到哪一句，重新整理不要跳回第一集第一句
  echoResetForNewSentence(); // 換句子時錄音狀態歸零，不跨句子沿用
  const s=cur(),n=total();
  revealed=false;makeOpen=false;builtTokens=[];
  document.getElementById('answerBox').classList.remove('show');
  document.getElementById('nextBtn').style.display='none';
  const uz=document.getElementById('unlockZone');if(uz){uz.style.display='';}
  const tipEl = document.getElementById('grammarTip');
  if(tipEl) tipEl.style.display='none';
  document.getElementById('userInput').value='';
  document.getElementById('userInput').className='trans-input';
  if(document.getElementById('transFeedback')){
    document.getElementById('transFeedback').style.display='none';
    document.getElementById('transFeedback').innerHTML='';
  }
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
    const connCls=c.role==='c'?connFlowClass(c.w):'';
    pill.className='chunk-pill role-'+(c.role||'plain')+(personCls?' '+personCls:'')+famCls+(connCls?' '+connCls:'');
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
    const fb=document.getElementById('transFeedback');
    if(ok){
      score++;document.getElementById('userInput').classList.add('correct');
      const _fb=getRandomFeedback('correct');toastLong(_fb.emoji+' '+_fb.text);
      if(fb){fb.className='make-result ok';fb.textContent=`${_fb.emoji} ${_fb.text}`;fb.style.display='block';}
    }
    else if(val.length>1){
      document.getElementById('userInput').classList.add('wrong');
      const _fb=getRandomFeedback('incorrect');toast(_fb.emoji+' '+_fb.text);
      if(fb){fb.className='make-result err';fb.innerHTML=`${_fb.emoji} ${_fb.text}下面附正確範例，也可以重新輸入一次試試看<br><button class="retry-btn" onclick="event.stopPropagation();retryAnswer()">🔄 重新嘗試</button>`;fb.style.display='block';}
    }
    else{const _fb=getRandomFeedback('reveal');toast(_fb.emoji+' '+_fb.text);}
    addToPassbook(s);
    const globalIdx = ep * 10 + idx;
    unlockAmmo(globalIdx); unlockStar(globalIdx); accumulateSVOPool(globalIdx);
    saveToLS();
    renderStars();
  }
}

function retryAnswer(){
  const i=answered.indexOf(idx);
  if(i!==-1){answered.splice(i,1);answeredByEp[ep]=answered;}
  revealed=false;
  document.getElementById('answerBox').classList.remove('show');
  const uz=document.getElementById('unlockZone'); if(uz) uz.style.display='';
  document.getElementById('nextBtn').style.display='none';
  const ui=document.getElementById('userInput');
  ui.value=''; ui.className='trans-input'; ui.focus();
  const fb=document.getElementById('transFeedback');
  if(fb){fb.style.display='none';fb.innerHTML='';}
  const tip=document.getElementById('grammarTip'); if(tip) tip.style.display='none';
  renderStars();
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
  if(chunk.startsWith('gp_'))  return { text: chunk.slice(3), speakable: true };
  if(/^s2_p\d+$/.test(chunk))  return { text: '🛢️ 入桶陳韻練習句型', speakable: false };
  if(!/[ .,!?¡¿]/.test(chunk) && chunk.includes('_')) return { text: '🍂 舊版殘留紀錄（可忽略）', speakable: false, junk: true };
  return { text: chunk, speakable: true };
}
// 舊版殘留的死資料：不刪 localStorage，但不列進清單/不當抽題題庫
function _isLegacyJunkChunk(chunk){ return !!_gardenChunkDisplay(chunk).junk; }
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

// ── 🎖️ 晉級證書：完成畫面的四色寶石蠟封（取代星星，全部用既有資料盤點，不生新內容）──
const _LEVELUP_PRONOUN_LABELS = { yo:'yo', 'tú':'tú', nosotros:'nosotros/nosotras', '3s':'él/ella/usted', '3p':'ellos/ellas/ustedes' };
function _levelUpClassifySubject(raw){
  const s = String(raw||'').replace(/[¡¿!.,;:()]/g,'').trim();
  if(!s) return null;
  const low = s.toLowerCase();
  if(/\byo\b/.test(low) || /^me\b/.test(low)) return 'yo';
  if(/\bt[uú]\b/.test(low)) return 'tú';
  if(/\bnosotros\b|\bnosotras\b/.test(low)) return 'nosotros';
  if(/\bellos\b|\bellas\b|\bustedes\b/.test(low)) return '3p';
  if(/\btodos\b|\btodas\b/.test(low) || / y /.test(s)) return '3p';
  return '3s'; // 具名主詞(Nita/Tito...)或él/ella/usted，都算單數第三人稱
}
function buildLevelUpData(epIndex){
  const startIdx = epIndex*10;
  const epi = EPS[epIndex];

  // 📐 文法點：本集句子對應的文法卡(SENTENCE_GRAMMAR_MAP，去重)
  const grammarIds = [];
  for(let i=0;i<10;i++){
    const gId = SENTENCE_GRAMMAR_MAP[startIdx+i];
    if(gId && !grammarIds.includes(gId)) grammarIds.push(gId);
  }
  const grammarItems = grammarIds.map(gId=>{
    const g = (typeof GRAMMAR_DATA!=='undefined') ? GRAMMAR_DATA.find(x=>x.id===gId) : null;
    const es = g && g.examples && g.examples[0] ? g.examples[0].es : (g ? g.title : null);
    return g ? {id:gId, es} : null;
  }).filter(Boolean);

  // 🫐 同源詞＋高頻字：EP_COGNATES(既有) + 本集動詞/受詞語塊(既有chunks，不重複)
  const cogs = (typeof EP_COGNATES!=='undefined' && EP_COGNATES[epIndex]) || [];
  const wordSet = [];
  if(epi) epi.sentences.forEach(s=>{
    (s.chunks||[]).forEach(c=>{
      if(c.role==='v'||c.role==='o'){
        const w = c.w.replace(/[¡¿!.,;:()]/g,'').trim();
        if(w && w.length<=14 && !wordSet.includes(w)) wordSet.push(w);
      }
    });
  });

  // 🗣️ 人稱稱謂：本集句子主詞涵蓋哪些人稱(既有chunks role:'s')
  const personCounts = {};
  if(epi) epi.sentences.forEach(s=>{
    (s.chunks||[]).forEach(c=>{
      if(c.role==='s'){
        const cat = _levelUpClassifySubject(c.w);
        if(cat) personCounts[cat] = true;
      }
    });
  });
  const personItems = Object.keys(personCounts).map(k=>_LEVELUP_PRONOUN_LABELS[k]||k);

  // 🌳 語塊樹根：本集解鎖的彈藥卡(SENTENCE_AMMO_MAP2既有)，樹幹=core_ammo開頭動詞短語，
  // 枝椏=fire_daily的中文短意(不放完整西語例句，維持小盆栽的輕巧感)；只挑前2張卡當代表，
  // 不然一集10張卡全部列出來會撐爆版面(跟同一排的其他蠟封完全不成比例)
  const treeItemsAll = [];
  for(let i=0;i<10;i++){
    const ids = (typeof SENTENCE_AMMO_MAP2!=='undefined' ? SENTENCE_AMMO_MAP2[startIdx+i] : null) || [];
    ids.forEach(aid=>{
      const a = (typeof AMMO_DATA!=='undefined') ? AMMO_DATA.find(x=>x.ammo_id===aid) : null;
      if(a && !treeItemsAll.find(t=>t.core===a.core_ammo)){
        const trunk = (a.pattern||a.core_ammo||'').split(/[\[.]/)[0].trim() || a.core_ammo;
        treeItemsAll.push({ core: trunk, branches: (a.fire_daily||[]).map(f=>f.es).filter(Boolean).slice(0,2) });
      }
    });
  }
  const treeItems = treeItemsAll.slice(0,2);

  return { grammarItems, cogs, wordSet: wordSet.slice(0,6), personItems, treeItems };
}
function renderLevelUpCert(data){
  const seal = (cls, icon, label, bodyHtml, empty) => `
    <div class="levelup-seal ${cls}${empty?' is-empty':''}">
      <div class="levelup-seal-head">
        <span class="levelup-seal-icon">${icon}</span>
        <span class="levelup-seal-label">${label}</span>
      </div>
      <div class="levelup-seal-body">${empty ? '本集尚未集到' : bodyHtml}</div>
    </div>`;

  const grammarEmpty = !data.grammarItems.length;
  const grammarHtml = data.grammarItems.map(g=>`<span class="levelup-chip" onclick="event.stopPropagation();closeGrammarSheet();openGrammarCard('${g.id}')">${g.es}</span>`).join('');

  const cogWordEmpty = !(data.cogs.length || data.wordSet.length);
  const cogWordHtml = [
    ...data.cogs.map(c=>`<span class="levelup-chip" onclick="event.stopPropagation();speakGramSmart('${escAttr(c.es)}')">${c.es}</span>`),
    ...data.wordSet.map(w=>`<span class="levelup-chip" onclick="event.stopPropagation();speakWord('${escAttr(w)}')">${w}</span>`)
  ].join('');

  const personEmpty = !data.personItems.length;
  const personHtml = data.personItems.map(p=>`<span class="levelup-chip">${p}</span>`).join('');

  const treeEmpty = !data.treeItems.length;
  const treeHtml = data.treeItems.map(t=>`
    <div class="levelup-tree">
      <div class="levelup-tree-trunk">🌳 ${t.core}</div>
      ${t.branches.map(b=>`<div class="levelup-tree-branch">↳ ${b}</div>`).join('')}
    </div>`).join('');

  return `
    <div class="levelup-cert">
      <div class="levelup-cert-title">🎖️ 晉級證書</div>
      <div class="levelup-grid">
        ${seal('amber','📐','文法根基', grammarHtml, grammarEmpty)}
        ${seal('sapphire','🫐','同源高頻', cogWordHtml, cogWordEmpty)}
        ${seal('amethyst','🗣️','變位高手', personHtml, personEmpty)}
        ${seal('ruby','🌳','語塊樹根', treeHtml, treeEmpty)}
      </div>
    </div>`;
}

// ── COMPLETE SCREEN ──
function showComplete(){
  document.querySelector('.card-container').style.display='none';
  document.querySelector('.nav-row').style.display='none';
  const cs = document.getElementById('completeScreen');
  cs.classList.add('show');

  const n = total();
  document.getElementById('completeStars').innerHTML = renderLevelUpCert(buildLevelUpData(ep));
  document.getElementById('completeTitle').textContent = `🌻 完成這場莊園探險了！`;
  document.getElementById('completeSub').textContent   = `${epData().titleZh} · 全 ${n} 句`;
  document.getElementById('finalScore').textContent    = score;
  document.getElementById('finalMake').textContent     = makeScore;
  document.getElementById('finalWords').textContent    = ammoUnlocked.length;

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
const BACKUP_KEYS = ['peppa_es_v4','peppa_es_vocab_v1','peppa_es_grammar_v1','peppa_es_familiarity_v1','peppa_garden_v1','peppa_garden_watered_v1','dynamic_phrases_db','peppa_mom_diary_v1','peppa_mom_notes_v1','peppa_talk_diary_v1','peppa_milestones_v1'];

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

// ── 文法卡/變位庫例句，真人音檔優先(依例句原文精準比對)，找不到才fallback TTS ──
// GRAM_AUDIO_MAP 的值可能是單一檔案(字串)，也可能是跟課文借用的分段序列(陣列，依序播放)
function speakGramSmart(text){
  const entry = (typeof GRAM_AUDIO_MAP!=='undefined') ? GRAM_AUDIO_MAP[text] : null;
  if(!entry){ speakSentence(text); return; }
  _stopActiveAudio();
  if(Array.isArray(entry)){
    if(!entry.length){ speakSentence(text); return; }
    let i = 0;
    const player = new Audio();
    _activeAudio = player;
    player.onended = () => { i++; setTimeout(playNext, 15); };
    player.onerror = () => speakSentence(text);
    function playNext(){
      if(i >= entry.length || player !== _activeAudio) return;
      player.src = entry[i];
      player.play().catch(()=>speakSentence(text));
    }
    playNext();
    return;
  }
  const player = new Audio(entry);
  _activeAudio = player;
  player.onerror = () => speakSentence(text);
  player.play().catch(()=>speakSentence(text));
}

// ── 語塊花園/抓蟲複習用：key可能是課文語塊、也可能是整句，兩個索引都試 ──
function speakGardenChunk(text){
  const chunkFile = (typeof CHUNK_AUDIO_MAP!=='undefined') ? CHUNK_AUDIO_MAP[text] : null;
  if(chunkFile){
    _stopActiveAudio();
    const player = new Audio(chunkFile);
    _activeAudio = player;
    player.onerror = () => speakFull(text);
    player.play().catch(()=>speakFull(text));
    return;
  }
  if(typeof GRAM_AUDIO_MAP!=='undefined' && GRAM_AUDIO_MAP[text]){ speakGramSmart(text); return; }
  speakFull(text);
}

function buildConjTable(conj, gId, showLabel){
  if(!conj || !conj.rows || !conj.rows.length) return '';
  const renderRow = r =>
    `<div class="conj-row">
      <span class="conj-person">${r.person}</span>
      <span class="conj-form" onclick="speakConjForm('${gId}','${escAttr(r.person)}','${escAttr(r.form)}')">${r.form}</span>
      <span class="conj-ex" onclick="speakGramSmart('${escAttr(r.ex)}')">${r.ex}</span>
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
            <span class="pron-es" onclick="speakGramSmart('${escAttr(r.es)}')">${r.es}</span>
            <span class="pron-zh">${r.zh}</span>
            <span class="pron-en">${r.en}</span>
            ${r.ex?`<span class="pron-row-ex" onclick="speakGramSmart('${escAttr(r.ex.split('.')[0])}')">${r.ex}</span>`:''}
          </div>`).join('')}
      </div>
      ${cat.example?`<div class="pron-example" onclick="speakGramSmart('${escAttr(cat.example.speakEs||cat.example.es)}')">
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
    _stopActiveAudio();
    const player = new Audio(`audio/vocab/conj/conj_${verbCode}_${personCode}.mp3`);
    _activeAudio = player;
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
  const gdb = getGardenDB();
  el.innerHTML = verbs.map(g=>{
    const renderStdRow = (r, tense) => {
      const isPresent = tense === 'present';
      const key = 'ge_'+r.form;
      const st = (gdb[key]||{stage:0}).stage;
      const starHtml = isPresent
        ? `<span class="ge-chunk-star${st===0?' garden-empty':''}" onclick="event.stopPropagation();handleGardenProgress('${escAttr(key)}',this)" title="語塊進度：點一下記錄熟練度">${GARDEN_STAGES[st]}</span>`
        : '';
      return `<div class="conj-row">
        <span class="conj-person">${r.person}</span>
        <span class="conj-form" onclick="speakConjForm('${g.id}','${escAttr(r.person)}','${escAttr(r.form)}')">${r.form}</span>
        <span class="conj-ex" onclick="speakGramSmart('${escAttr(r.ex)}')">${r.ex}</span>
        ${starHtml}
        <span class="conj-zh">${r.zh}</span>
        ${r.note?`<span class="conj-note">💡 ${r.note}</span>`:''}
      </div>`;
    };
    const renderAllRows = (rows, tense) => rows.map(r =>
      renderStdRow(r, tense) + (tense==='present' ? renderDynamicConjugationExamples(r.form.toLowerCase()) : '')
    ).join('');
    const buildTenseBlock = (conjData, tense, isActive) => {
      if(!conjData || !conjData.rows || !conjData.rows.length) return '';
      const m3 = renderAllRows(conjData.rows.slice(0,3), tense);
      const r3 = conjData.rows.slice(3);
      const rHtml = r3.length
        ? `<details class="conj-expand"><summary class="conj-expand-summary">我們／你們／他們 ▾</summary>${renderAllRows(r3, tense)}</details>`
        : '';
      return `<div class="conj-tense-block${isActive?' active':''}" data-tense="${tense}">
        <div class="conj-rows">${m3}${rHtml}</div>
      </div>`;
    };

    const hasSubj    = !!(g.conj_subj    && g.conj_subj.rows);
    const hasImpsubj = !!(g.conj_impsubj && g.conj_impsubj.rows);
    const hasCond    = !!(g.conj_cond    && g.conj_cond.rows);
    const hasTabs    = hasSubj || hasImpsubj || hasCond;

    const tabsHtml = hasTabs ? `<div class="conj-tense-tabs">
      <button class="conj-tense-tab active" data-tense="present" onclick="switchConjTense('conjlib-${g.id}','present')">現在式</button>
      ${hasSubj    ? `<button class="conj-tense-tab" data-tense="subj"    onclick="switchConjTense('conjlib-${g.id}','subj')">現在虛擬式<span class="conj-tense-hint">💧 15粒</span></button>` : ''}
      ${hasImpsubj ? `<button class="conj-tense-tab" data-tense="impsubj" onclick="switchConjTense('conjlib-${g.id}','impsubj')">過去未完成虛擬式<span class="conj-tense-hint">🎖️ 90粒</span></button>` : ''}
      ${hasCond    ? `<button class="conj-tense-tab" data-tense="cond"    onclick="switchConjTense('conjlib-${g.id}','cond')">條件式<span class="conj-tense-hint">🎖️ 90粒</span></button>` : ''}
    </div>` : '';

    const verbRoot = (g.conj.verb||'').split('（')[0].trim().toLowerCase();
    const familyCls = verbRoot.endsWith('ar') ? 'conj-lib-ar' : 'conj-lib-erir';
    const searchText = [
      g.conj.verb,
      ...g.conj.rows.map(r=>`${r.person} ${r.form} ${r.ex} ${r.zh} ${r.note||''}`),
      ...(hasSubj    ? g.conj_subj.rows.map(r=>`${r.form} ${r.ex}`)    : []),
      ...(hasImpsubj ? g.conj_impsubj.rows.map(r=>`${r.form} ${r.ex}`) : []),
      ...(hasCond    ? g.conj_cond.rows.map(r=>`${r.form} ${r.ex}`)    : [])
    ].join(' ').toLowerCase();

    return `<div class="conj-lib-card ${familyCls}" id="conjlib-${g.id}" data-search="${escAttr(searchText)}">
      <div class="conj-lib-header">${g.conj.verb}</div>
      ${tabsHtml}
      <div class="conj-section">
        ${buildTenseBlock(g.conj,        'present', true)}
        ${buildTenseBlock(g.conj_subj,   'subj',    false)}
        ${buildTenseBlock(g.conj_impsubj,'impsubj', false)}
        ${buildTenseBlock(g.conj_cond,   'cond',    false)}
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

function switchConjTense(cardId, tense){
  const card = document.getElementById(cardId);
  if(!card) return;
  card.querySelectorAll('.conj-tense-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tense === tense);
  });
  card.querySelectorAll('.conj-tense-block').forEach(block => {
    block.classList.toggle('active', block.dataset.tense === tense);
  });
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

// playExpr：可傳入該句整句的播放呼叫(字串，例如"speakGramSmart('...')")，
// 有傳就統一點哪個字都播整句真人音檔，不再各字各自TTS(跟▶整句不同調)；不傳維持原本逐字TTS
function _grammarExChunks(es, playExpr){
  const words = es.split(/(\s+)/);
  const _gdb = getGardenDB();
  const clickExpr = playExpr || null;
  const renderTok = tok => {
    if(!tok.trim()) return '';
    const clean = tok.replace(/[¡¿.,!?;:"]/g,'').trim();
    const onclickAttr = clickExpr ? clickExpr : `speakWord('${escAttr(clean)}',this)`;
    if(!isVocabWorthy(clean)) return `<span class="ge-chunk" onclick="event.stopPropagation();${onclickAttr}">${tok}</span>`;
    const _key='ge_'+clean;
    const _st=(_gdb[_key]||{stage:0}).stage;
    const _ic=GARDEN_STAGES[_st];
    const starHtml=`<span class="ge-chunk-star${_st===0?' garden-empty':''}" onclick="event.stopPropagation();handleGardenProgress('ge_${escAttr(clean)}',this)" title="語塊進度">${_ic}</span>`;
    return `<span class="ge-chunk-unit"><span class="ge-chunk" onclick="event.stopPropagation();${onclickAttr}">${tok}</span>${starHtml}</span>`;
  };
  // 引號內的對話如果只是句子裡一小段（≤6個字），包成不斷行區塊避免斷在對話中間；
  // 但如果整句話本身就是一個長引號（例如角色整句自我介紹），不要整句鎖死不斷行，
  // 不然手機螢幕會被撐出去，寧可讓它照正常換行
  const QUOTE_SEG_WORD_LIMIT = 6;
  // 短字（不限定冠詞/介系詞，任何≤7字母的字，含nueve/quiere/Siempre這類）容易斷行時
  // 單獨落在行尾變孤兒——關鍵是要「往後」黏住下一個字（往前黏沒用，因為斷點在
  // 短字的後面），連續遇到好幾個短字就一路往後黏成一組，直到遇到一個長字收尾；
  // 安全上限(累積字元數)避免整段短字連環黏成一長串撐爆手機螢幕
  const GLUE_MAX_LEN = 7;
  const GLUE_RUN_CAP = 20;
  let html = '';
  let quoteOpen = false;
  let segBuf = null;
  let segWordCount = 0;
  let runBuf = null; // {pieces:[], len:0, count:0, startWasOpen} 目前正在往後累積、還沒收尾的黏字小組
  // wordCount要算「真正的字數」，不是「黏成一組後的組數」——不然長引號裡的字被黏字小組
  // 打包壓縮成幾組，會讓QUOTE_SEG_WORD_LIMIT誤判成字數很少的短引號，反而把長引號整句
  // 鎖死不斷行，撐爆手機螢幕（跟QUOTE_SEG_WORD_LIMIT原本要擋的問題一樣）
  const routeOutput = (piece, wasOpen, quoteOpenNow, wordCount) => {
    wordCount = wordCount || 1;
    if(!wasOpen && quoteOpenNow){ segBuf=[piece]; segWordCount=wordCount; }
    else if(wasOpen && !quoteOpenNow){
      segBuf.push(piece); segWordCount+=wordCount;
      html += segWordCount <= QUOTE_SEG_WORD_LIMIT ? `<span class="ge-quote-seg">${segBuf.join('')}</span>` : segBuf.join('');
      segBuf=null; segWordCount=0;
    } else if(segBuf!==null){ segBuf.push(piece); segWordCount+=wordCount; }
    else html += piece;
  };
  const startRun = (rendered, len, startWasOpen) => { runBuf = {pieces:[rendered], len, count:1, startWasOpen}; };
  const pushRun = (rendered, len) => { runBuf.pieces.push(rendered); runBuf.len+=len; runBuf.count++; };
  const flushRun = () => {
    if(runBuf===null) return null;
    const {pieces, count, startWasOpen} = runBuf;
    const piece = pieces.length>1 ? `<span class="ge-glue">${pieces.join('')}</span>` : pieces.join('');
    runBuf = null;
    return {piece, count, startWasOpen};
  };
  words.forEach(tok=>{
    if(!tok.trim()){
      if(runBuf!==null) runBuf.pieces.push(tok);
      else if(segBuf!==null) segBuf.push(tok);
      else html += tok;
      return;
    }
    const rendered = renderTok(tok);
    const hasQuote = tok.includes('"');
    const wasOpen = quoteOpen;
    if(hasQuote){
      const quoteCount = (tok.match(/"/g)||[]).length;
      if(quoteCount % 2 === 1) quoteOpen = !quoteOpen;
    }
    const clean = tok.replace(/[¡¿.,!?;:"]/g,'');
    const isShort = clean.length>0 && clean.length<=GLUE_MAX_LEN;

    if(hasQuote){
      const openingNow = !wasOpen && quoteOpen;
      const closingNow = wasOpen && !quoteOpen;
      if(closingNow){
        // 引號收尾的字，就算它自己不算「短字」，也讓它當黏字小組的最後一員一起收尾——
        // 這樣才能接住「引號最後一個字被斷行斷成孤兒」的情況（例如 adentro."）
        if(runBuf===null) startRun(rendered, clean.length, wasOpen); else pushRun(rendered, clean.length);
        const r = flushRun();
        if(r.startWasOpen !== wasOpen){
          // 這組從「引號開頭」一路撐到「引號收尾」都沒被打斷過(整句引號=同一個黏字小組)，
          // 頭尾狀態相同，routeOutput的邊界判斷看不出中間穿過引號，這裡直接自己判斷要不要包nowrap
          html += r.count <= QUOTE_SEG_WORD_LIMIT ? `<span class="ge-quote-seg">${r.piece}</span>` : r.piece;
        } else {
          routeOutput(r.piece, r.startWasOpen, quoteOpen, r.count);
        }
        return;
      }
      // 引號開頭的字（非收尾）：先把正在跑的小組收尾（維持原狀態，不算轉換，避免segBuf收兩次）
      if(runBuf!==null){ const r = flushRun(); routeOutput(r.piece, r.startWasOpen, r.startWasOpen, r.count); }
      if(openingNow && isShort){
        // 引號開頭字本身是短字（例如"Yo）：讓它當黏字小組的開頭，等後面的字來黏，
        // 不要讓它自己孤零零卡在引號最前面
        startRun(rendered, clean.length, wasOpen);
        return;
      }
      routeOutput(rendered, wasOpen, quoteOpen, 1);
      return;
    }

    if(runBuf!==null){
      pushRun(rendered, clean.length);
      if(isShort && runBuf.len < GLUE_RUN_CAP) return; // 還是短字，繼續往後累積
      const r = flushRun(); routeOutput(r.piece, r.startWasOpen, quoteOpen, r.count); // 遇到長字（或超過安全上限）收尾
      return;
    }

    if(isShort){ startRun(rendered, clean.length, wasOpen); return; }
    routeOutput(rendered, wasOpen, quoteOpen, 1);
  });
  if(runBuf!==null){ const r = flushRun(); routeOutput(r.piece, r.startWasOpen, quoteOpen, r.count); }
  if(segBuf) html += segBuf.join(''); // 防呆：引號沒配對完整就照常輸出，不要把內容吃掉
  return html;
}

// ── 💧 文法儲水槽（沒有綁定特定劇情句子、從外面引進來的零散文法點） ──
// 等級標籤只是導覽輔助，不是內容鎖：篩選只是隱藏/顯示，隨時可以切回「全部」看到所有卡片
const GRAMMAR_TOPIC_IDS = {
  culture: ['g24','g25','g26','g45','g46','g47','g48','g49'],
  daily:   ['g14','g15','g16','g36','g37','g38','g39','g40','g43','g44']
};
const GRAMMAR_TOPIC_CHIPS = [
  {key:'all',     icon:'📋', label:'全部'},
  {key:'grammar', icon:'🔧', label:'文法骨架'},
  {key:'culture', icon:'🌍', label:'文化地圖'},
  {key:'daily',   icon:'💬', label:'日常開口'}
];
function _gsupTopicFor(id){
  if(GRAMMAR_TOPIC_IDS.culture.includes(id)) return 'culture';
  if(GRAMMAR_TOPIC_IDS.daily.includes(id)) return 'daily';
  return 'grammar';
}
let _gsupLevelFilter = 'all';
let _gsupTopicFilter = 'all';
function _gsupLevelInfo(levelKey){
  return GRAMMAR_LEVEL_TIERS.find(t=>t.key===levelKey) || {icon:'', label:''};
}
function renderGrammarSupplement(){
  const el = document.getElementById('grammarSupplementBody');
  const filterEl = document.getElementById('grammarLevelFilter');
  const topicEl = document.getElementById('grammarTopicFilter');
  if(!el) return;
  const items = GRAMMAR_DATA.filter(g=>(g.source||'').includes('文法補充'));
  if(filterEl){
    const chip = (key, icon, label) => `<span class="gsup-level-chip${_gsupLevelFilter===key?' active':''}" onclick="event.stopPropagation();filterGrammarSupplementByLevel('${key}')">${icon} ${label}</span>`;
    filterEl.innerHTML = chip('all','📋','全部') + GRAMMAR_LEVEL_TIERS.map(t=>chip(t.key, t.icon, t.label)).join('');
  }
  if(topicEl){
    topicEl.innerHTML = GRAMMAR_TOPIC_CHIPS.map(t=>`<span class="gsup-level-chip${_gsupTopicFilter===t.key?' active':''}" onclick="event.stopPropagation();filterGrammarSupplementByTopic('${t.key}')">${t.icon} ${t.label}</span>`).join('');
  }
  const shown = items.filter(g=>{
    const levelOk = _gsupLevelFilter==='all' || g.level===_gsupLevelFilter;
    const topicOk = _gsupTopicFilter==='all' || _gsupTopicFor(g.id)===_gsupTopicFilter;
    return levelOk && topicOk;
  });
  el.innerHTML = shown.map(g=>{
    const lv = _gsupLevelInfo(g.level);
    return `
    <div class="gsup-row" onclick="openGrammarCard('${g.id}')">
      <div class="gsup-title-row">
        <span class="gsup-title">${g.title}</span>
        <span class="gsup-level-badge" title="${lv.label}">${lv.icon}</span>
      </div>
      <div class="gsup-rule">${g.rule}</div>
    </div>`;
  }).join('') || `<div class="garden-empty-msg">這個分類目前沒有符合的卡片</div>`;
}
function filterGrammarSupplementByLevel(key){
  _gsupLevelFilter = key;
  renderGrammarSupplement();
}
function filterGrammarSupplementByTopic(key){
  _gsupTopicFilter = key;
  renderGrammarSupplement();
}

function toggleGrammarSupplement(){
  const body=document.getElementById('grammarSupplementBody');
  const t=document.getElementById('grammarSupplementToggle');
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

// ── 🪞 陳述式 ↔ 虛擬式：直接對照（靜態並排，不做切換鈕）──
const INDIC_SUBJ_PAIRS = [
  {verb:"hablar", indic:{es:"Hablas español.", zh:"你說西語。"}, subj:{es:"Espero que hables español.", zh:"希望你會說西語。"}},
  {verb:"tener",  indic:{es:"Tienes miedo.", zh:"你會怕。"}, subj:{es:"No creo que tengas miedo.", zh:"我不覺得你會怕。"}},
  {verb:"querer", indic:{es:"Quieres helado.", zh:"你想要冰淇淋。"}, subj:{es:"Dudo que quieras helado.", zh:"我懷疑你想要冰淇淋。"}},
  {verb:"poder",  indic:{es:"Puedes venir.", zh:"你可以來。"}, subj:{es:"Espero que puedas venir.", zh:"希望你可以來。"}},
  {verb:"ser",    indic:{es:"Eres feliz.", zh:"你很快樂。"}, subj:{es:"Espero que seas feliz.", zh:"希望你快樂。"}},
  {verb:"🛫 旅行道別", indic:{es:"Mañana vuelas a casa.", zh:"明天你要飛回家了。"}, subj:{es:"¡Que tengas buen vuelo!", zh:"祝飛行順利！"}},
  {verb:"💼 面試加油", indic:{es:"Tienes una entrevista hoy.", zh:"你今天有面試。"}, subj:{es:"¡Que te salga bien!", zh:"希望你順利！"}}
];
function renderIndicSubjPairs(){
  const el = document.getElementById('indSubjBody');
  if(!el) return;
  const col = (cls,label,side) => `
    <div class="is-pair-col ${cls}" onclick="event.stopPropagation();speakGramSmart('${escAttr(side.es)}')">
      <div class="is-pair-label">${label}</div>
      <div class="is-pair-es">${_grammarExChunks(side.es, `speakGramSmart('${escAttr(side.es)}')`)}</div>
      <div class="is-pair-zh">${side.zh}</div>
    </div>`;
  el.innerHTML = INDIC_SUBJ_PAIRS.map(p=>`
    <div class="is-pair-row">
      <div class="is-pair-verb">${p.verb}</div>
      <div class="is-pair-cols">
        ${col('is-indic','直述句',p.indic)}
        ${col('is-subj','腦中劇場',p.subj)}
      </div>
    </div>`).join('');
}

// ── 🎵 歌詞填空 · 聽歌學語法 ──
const LYRICS_FILL_DATA = [
  {
    id:'lf01',
    artist:'Juanes',
    song:'A Dios Le Pido',
    level:'b1',
    levelLabel:'B1',
    yt:'https://www.youtube.com/watch?v=yvnt2zMzmOc&t=46s',
    ytLabel:'▶ 46秒處聽',
    before:'A Dios le pido / que mis ojos se',
    blank:'despierten',
    after:'/ con tu cara cada día.',
    hint:'pedir que → 後面接虛擬式',
    grammar:'「A Dios le pido que...」我向上帝祈求⋯⋯。pedir que 後面的動詞必須變成現在虛擬式，因為是「希望發生」而非確定事實。despertar（喚醒）→ se despierten（第三人稱複數虛擬式，複數因為是 mis ojos）。'
  },
  {
    id:'lf02',
    artist:'Juan Luis Guerra',
    song:'Ojalá Que Llueva Café',
    level:'b1',
    levelLabel:'B1',
    yt:'https://www.youtube.com/watch?v=1PSUicmCNl4&t=30s',
    ytLabel:'▶ 30秒處聽',
    before:'Ojalá que',
    blank:'llueva',
    after:'café en el campo.',
    hint:'Ojalá (que) 後面永遠接虛擬式',
    grammar:'「Ojalá (que)...」字源自阿拉伯語，意為「願真主保佑」，是西語最道地的許願句型。後面無論加不加 que，都永遠接虛擬式。llover（下雨）→ llueva（現在虛擬式，不規則 o→ue）。'
  },
  {
    id:'lf03',
    artist:'Beyoncé ft. Alejandro Fernández',
    song:'Si Yo Fuera Un Chico',
    level:'b2',
    levelLabel:'B2',
    yt:'https://www.youtube.com/watch?v=7iMNLqqHPac&t=20s',
    ytLabel:'▶ 20秒處聽',
    before:'Si yo',
    blank:'fuera',
    after:'un chico, creo que entendería...',
    hint:'Si + 過去虛擬式 = 與現在事實相反的假設',
    grammar:'【B2核心句型】「Si yo fuera...」如果我是⋯⋯（但現實我不是）。Si + Imperfecto de Subjuntivo（過去虛擬式）表達與現在事實相反的假設。ser → fuera（過去虛擬式，不規則）。對比：Si soy（有可能，陳述式）vs Si fuera（現在不是，虛擬式）。'
  },
  {
    id:'lf04',
    artist:'Julieta Venegas',
    song:'Limón y Sal',
    level:'b1',
    levelLabel:'B1',
    yt:'https://www.youtube.com/watch?v=7N4V2r8K0vA&t=52s',
    ytLabel:'▶ 52秒處聽',
    before:'Si vienes o si',
    blank:'vas',
    after:'— no importa, yo te quiero igual.',
    hint:'Si + 陳述式現在式 = 真實可能的條件',
    grammar:'「Si vienes o si vas」用的是陳述式直述式，不是虛擬式！Si + 現在陳述式表示「真實可能發生的條件」。跟 Beyoncé 那句對比：Si fuera（虛擬式）= 與現實相反；Si vas（陳述式）= 去或不去都有可能，是開放的真實情境。'
  },
  {
    id:'lf05', artist:'Tradicional', song:'Los Pollitos Dicen', level:'a0', levelLabel:'A0',
    yt:'https://www.youtube.com/results?search_query=Los+Pollitos+Dicen',
    ytLabel:'▶ 搜尋這首',
    before:'Los pollitos dicen pío pío pío / cuando',
    blank:'tienen',
    after:'hambre cuando tienen frío.',
    hint:'tienen = tener 第三人稱複數 (ellos)',
    grammar:'「Tienen hambre / tienen frío」用 TENER 表達生理狀態，不是說「它們是飢餓的」。TENER 家族：tener hambre（餓）/ tener frío（冷）/ tener sed（渴）/ tener sueño（睏）——這些都是搭配 tener 的固定搭配，不用 estar + 形容詞。tener 第三人稱複數 ellos/ellas → tienen。'
  },
  {
    id:'lf06', artist:'Tradicional', song:'Arroz con Leche', level:'a0', levelLabel:'A0',
    yt:'https://www.youtube.com/results?search_query=Arroz+con+Leche+canci%C3%B3n+infantil',
    ytLabel:'▶ 搜尋這首',
    before:'Arroz con leche, me',
    blank:'quiero',
    after:'casar con una señorita de aquí.',
    hint:'quiero = querer 第一人稱單數 (yo)',
    grammar:'「Quiero casar」第一人稱「我想要…」，querer 是不規則動詞（e→ie 詞幹變化）：quiero / quieres / quiere / queremos / quieren。後面接原形動詞（casar），注意：casarse 反身動詞「結婚」，歌詞傳統唱法省略了 me，可視為詩歌韻律省略。'
  },
  {
    id:'lf07', artist:'Tradicional', song:'Estrellita ¿Dónde Estás?', level:'a0', levelLabel:'A0',
    yt:'https://www.youtube.com/results?search_query=Estrellita+d%C3%B3nde+est%C3%A1s+canci%C3%B3n',
    ytLabel:'▶ 搜尋這首',
    before:'Estrellita, ¿dónde',
    blank:'estás',
    after:'? Me pregunto lo que eres.',
    hint:'estás = estar 第二人稱單數 (tú)',
    grammar:'「¿Dónde estás?」你在哪裡？ESTAR 用於位置（在哪裡），不用 SER。這是 ESTAR 最基礎的用法之一——問地點永遠用 estar，而不是 ser。五人稱：estoy / estás / está / estamos / están。這首歌是西語版的《Twinkle Twinkle Little Star》。'
  },
  {
    id:'lf08', artist:'Tradicional', song:'La Araña Pequeñita', level:'a0', levelLabel:'A0',
    yt:'https://www.youtube.com/results?search_query=La+ara%C3%B1a+peque%C3%B1ita',
    ytLabel:'▶ 搜尋這首',
    before:'La araña pequeñita',
    blank:'subió',
    after:'/ subió / subió, subió.',
    hint:'subió = subir 第三人稱單數簡單過去式',
    grammar:'「Subió」爬上去了——簡單過去式（Pretérito Indefinido），表示一個已完成的動作。subir 是規則 -ir 動詞的過去式變化：yo subí / tú subiste / él subió / nosotros subimos / ellos subieron。對比現在式 sube（正在爬）vs 過去式 subió（爬上去了，完成了）。'
  },
  {
    id:'lf09', artist:'Tradicional', song:'De Colores', level:'a1', levelLabel:'A1',
    yt:'https://www.youtube.com/results?search_query=De+Colores+canci%C3%B3n+infantil',
    ytLabel:'▶ 搜尋這首',
    before:'De colores, de colores',
    blank:'se visten',
    after:'los campos en la primavera.',
    hint:'se visten = vestirse 反身動詞第三人稱複數',
    grammar:'「Se visten los campos」田野披上（色彩）——反身動詞 vestirse（穿衣/披上）搭配複數主詞 los campos 用 se visten。反身動詞五人稱：me visto / te vistes / se viste / nos vestimos / se visten。這首歌是拉美農民/工人運動的著名民謠，1960年代由 César Chávez 採用為抗爭歌曲。'
  }
];
let _lfFilter = 'all';
let _lyricsFillOpen = false;
function filterLyricsFill(key){ _lfFilter = key; renderLyricsFill(); }
function toggleLyricsFill(){
  _lyricsFillOpen = !_lyricsFillOpen;
  const body = document.getElementById('lyricsFillBody');
  const tog = document.getElementById('lyricsFillToggle');
  if(!body) return;
  body.classList.toggle('open', _lyricsFillOpen);
  if(tog) tog.textContent = _lyricsFillOpen ? '▲ 收起' : '▼ 展開';
  if(_lyricsFillOpen) renderLyricsFill();
}
function renderLyricsFill(){
  const el = document.getElementById('lyricsFillBody');
  if(!el) return;
  const filterChips = [
    {key:'all', label:'📋 全部'},
    {key:'nursery', label:'🎵 兒歌 A0–A1'},
    {key:'grammar', label:'🎓 文法闖關 B1–B2'}
  ];
  const filtered = _lfFilter === 'nursery'
    ? LYRICS_FILL_DATA.filter(x=>['a0','a1'].includes(x.level))
    : _lfFilter === 'grammar'
    ? LYRICS_FILL_DATA.filter(x=>['b1','b2'].includes(x.level))
    : LYRICS_FILL_DATA;
  el.innerHTML = `
    <div class="lf-filter-row">${filterChips.map(c=>`
      <button class="lf-filter-chip${_lfFilter===c.key?' active':''}" onclick="filterLyricsFill('${c.key}')">${c.label}</button>`).join('')}
    </div>
    ${filtered.map(lf => `
    <div class="lf-card" id="lf-card-${lf.id}">
      <div class="lf-header">
        <div class="lf-artist-song">
          <span class="lf-level lf-level-${lf.level}">${lf.levelLabel}</span>
          <span class="lf-artist">${lf.artist}</span>
          <span class="lf-song">《${lf.song}》</span>
        </div>
        <a class="lf-yt-btn" href="${lf.yt}" target="_blank" rel="noopener">${lf.ytLabel}</a>
      </div>
      <div class="lf-lyric-line">
        <span class="lf-before">${lf.before}</span>
        <span class="lf-blank-wrap"><input class="lf-input" id="lfi-${lf.id}" type="text" placeholder="填動詞" autocomplete="off" autocorrect="off" spellcheck="false" onkeydown="if(event.key==='Enter')checkLyric('${lf.id}')"></span>
        <span class="lf-after">${lf.after}</span>
      </div>
      <div class="lf-hint">💡 ${lf.hint}</div>
      <div class="lf-actions">
        <button class="lf-check-btn" onclick="checkLyric('${lf.id}')">核對答案</button>
        <button class="lf-hear-btn" onclick="speakGramSmart('${escAttr(lf.before+' '+lf.blank+' '+lf.after)}')">🔊 聽整句</button>
      </div>
      <div class="lf-feedback" id="lff-${lf.id}" style="display:none"></div>
      <div class="lf-grammar-note" id="lfg-${lf.id}" style="display:none">${lf.grammar}</div>
    </div>`).join('')}`;
}
function checkLyric(id){
  const lf = LYRICS_FILL_DATA.find(x=>x.id===id);
  if(!lf) return;
  const inp = document.getElementById('lfi-'+id);
  const fb  = document.getElementById('lff-'+id);
  const gn  = document.getElementById('lfg-'+id);
  if(!inp||!fb||!gn) return;
  const val = inp.value.trim().toLowerCase().replace(/[¡!¿?.,;]/g,'');
  const correct = lf.blank.toLowerCase();
  fb.style.display = 'block';
  if(!val){
    fb.className='lf-feedback';
    fb.textContent='先填入動詞再核對';
    return;
  }
  if(val === correct){
    fb.className='lf-feedback lf-correct';
    fb.textContent=`¡Eso es! ✅ 正確：${lf.blank}`;
    inp.className='lf-input ok';
    gn.style.display='block';
    speakGramSmart(lf.before+' '+lf.blank+' '+lf.after);
  } else {
    fb.className='lf-feedback lf-wrong';
    fb.textContent=`¡Ojo! 👀 再試一次——${lf.hint}`;
    inp.className='lf-input err';
  }
}

function openGrammarCard(gId){
  const g = GRAMMAR_DATA.find(x => x.id===gId);
  if(!g) return;
  const catLabel = (GRAMMAR_CATS.find(c=>c.key===g.cat)||{label:''}).label;
  const exHtml = g.examples.map(ex =>
    `<div class="grammar-ex-row" onclick="speakGramSmart('${escAttr(ex.es)}')" title="點這裡聽整句">
      <div class="grammar-ex-chunks">${_grammarExChunks(ex.es, `speakGramSmart('${escAttr(ex.es)}')`)}</div>
      <div class="grammar-ex-zh">${ex.zh}</div>
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
        <span class="mnemonic-ex" onclick="speakGramSmart('${escAttr(it.ex)}')">${it.ex}</span>
      </div>`).join('')}
    </div>` : '';
  const familyHtml = g.family ? `
    <div class="grammar-family">
      <div class="family-title">${g.family.title}</div>
      <div class="family-intro">${g.family.intro}</div>
      <div class="family-items">${g.family.items.map(it=>`
        <div class="family-item" onclick="speakGramSmart('${escAttr(it.es)}')">
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
  _stopActiveAudio();
  if(el) el.classList.add('playing');
  const dot = document.getElementById('ttsDot');
  if(dot){ dot.classList.remove('ready'); dot.classList.add('speaking'); }
  const done = () => { if(el) el.classList.remove('playing'); if(dot){ dot.classList.remove('speaking'); dot.classList.add('ready'); } };
  const player = new Audio(file);
  _activeAudio = player;
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

function ammoChunkTap(el, word, hideYg, note){
  const playExpr = el && el.dataset ? el.dataset.playexpr : null;
  if(playExpr){
    try{ new Function(playExpr)(); }catch(e){ speakWord(word, null); }
  } else {
    speakWord(word, null);
  }
  if(note){
    openGrammarSheet(_famStarHtml(word)+'<div class="grammar-chunk-note">'+note+'</div>');
  }
}

function speakSentence(text){
  if(!window.speechSynthesis){ toast('⚠️ 此瀏覽器不支援語音'); return; }
  _stopActiveAudio();
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
  utt.onerror = (e) => {
    if(dot){ dot.classList.remove('speaking'); dot.classList.add('ready'); }
    // 'canceled'/'interrupted' 是我們自己主動打斷前一句造成的，不是真的播放失敗，不用跳提示
    if(e && (e.error==='canceled' || e.error==='interrupted')) return;
    toast('⚠️ 語音播放失敗，可再點一次');
  };
  setTimeout(() => {
    try{ speechSynthesis.speak(utt); }catch(e){ toast('⚠️ 語音播放失敗'); }
  }, 150);
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
      <span class="conj-form" onclick="speakGramSmart('${escAttr(fullSentence)}')">${verbForm}</span>
      <span class="conj-ex" onclick="speakGramSmart('${escAttr(fullSentence)}')">${fullSentence}</span>
      ${zh ? `<span class="conj-zh">${zh}</span>` : ''}
    </div>`;
  }).join('');
}

function gestaltTapAndSave(sentence, _zh, _doSave) {
  speakFull(sentence);
}

// 渲染帶完形偵測標記的句子 HTML（只偵測，不自動寫入）
// playExpr：可傳入整句的播放呼叫(字串)，有傳就統一點哪個字都播整句真人音檔，不傳維持原本逐字TTS
function renderScriptLine(sentence, playExpr) {
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
      const playAttr = playExpr ? ` data-playexpr="${playExpr.replace(/"/g,'&quot;')}"` : '';
      html += `<span class="gestalt-chunk ${r.type}"${gAttr}${playAttr} data-type="${r.type}" data-verbform="${r.verbForm}" data-assoc="${r.assoc}" data-chunk="${escAttr(chunk)}" onclick="event.stopPropagation();gestaltTap(this)">${chunk}<button class="gc-star${gs.stage === 0 ? ' garden-empty' : ''}" onmousedown="event.stopPropagation();gardenStartPress(this)" onmouseup="gardenCancelPress()" onmouseleave="gardenCancelPress()" ontouchstart="event.stopPropagation();event.preventDefault();gardenStartPress(this)" ontouchend="gardenHandleTouch(this,event)" ontouchmove="gardenCancelPress()" onclick="event.stopPropagation();gestaltSave(this)" title="${escAttr(gs.label)}">${gs.icon}</button></span>`;
      i += r.length;
    } else {
      const w = words[i];
      const wc = w.replace(/[¡!¿?.,;:]/g, '');
      const onclickExpr = playExpr ? playExpr : `speakWord('${escAttr(wc)}',this)`;
      html += `<span class="gc-word" onclick="event.stopPropagation();${onclickExpr}">${w}</span> `;
      i++;
    }
  }
  return html;
}

function gestaltTap(el) {
  const chunk = el.dataset.chunk;
  const playExpr = el.dataset.playexpr;
  if(playExpr){
    try{ new Function(playExpr)(); }catch(e){ speakWord(chunk.replace(/[¡!¿?.,;:]/g, ''), el); }
  } else {
    speakWord(chunk.replace(/[¡!¿?.,;:]/g, ''), el);
  }
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
  const chunks = Object.keys(db).filter(c => !_isLegacyJunkChunk(c));
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
      const clickAttr = disp.speakable ? ` onclick="speakGardenChunk('${escAttr(disp.text)}')" title="點擊聽發音"` : '';
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
  Object.keys(db).filter(c => !_isLegacyJunkChunk(c)).forEach(chunk => {
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
    else if(days < 7){ msg = '🐛 糟糕，蟲跑來搗蛋了！'; moodCls = 'fresh-3'; }
    else { msg = '🍂 花園已沉睡，語塊在琥珀裡等妳喚醒'; moodCls = 'fresh-4'; }
  }

  const gdb = getGardenDB();
  const pool = generateBattleQuestionPool(5);
  const flowersHtml = pool.map(chunk => {
    const st = (gdb[chunk]||{stage:0}).stage;
    const icon = GARDEN_STAGES[st] || GARDEN_STAGES[1];
    const bug = moodCls === 'fresh-3' ? '<span class="gfresh-bug">🐛</span>' :
                moodCls === 'fresh-4' ? '<span class="gfresh-bug">🍂</span>' : '';
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
        <span class="quiz-ex-es" onclick="speakGramSmart('${escAttr(ex.es)}')">${ex.es}</span>
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
    <div class="quiz-chunk-display"${_gardenChunkDisplay(chunk).speakable?` onclick="speakGardenChunk('${escAttr(_gardenChunkDisplay(chunk).text)}')"`:''}>${_gardenChunkDisplay(chunk).text} <span class="quiz-speak-icon">▶</span></div>
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
// 回傳是否有消化到深連結——有的話 init() 不會再跳出農間小報，避免打斷使用者原本的意圖（尤其是靜心寫日記）
function handleReminderDeepLink(){
  const params = new URLSearchParams(location.search);
  const action = params.get('action');
  if(!action) return false;
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
  return true;
}

// ── 🌅 農間小報（回訪者每日一次自動彈出，使用導覽區 modal 基礎架構）──
function getMorningBriefHTML(){
  const day = Math.floor(Date.now()/86400000);
  const count = (ammoUnlocked||[]).length;
  const _td = new Date().toLocaleDateString('es-MX',{weekday:'long',day:'numeric',month:'long'});
  const today = _td.charAt(0).toUpperCase() + _td.slice(1);
  // 里程碑慶祝（若有新達標未顯示，彈出後即標記已見）
  const ms = popNewMilestone();
  const celebMsg = ms ? pickCelebrationMessage(ms.cefr) : null;
  const celebHtml = ms ? `<div class="ms-celeb">
    <div class="ms-celeb-badge">${ms.badge}</div>
    <div class="ms-celeb-title">🎉 解鎖里程碑！</div>
    <div class="ms-celeb-name">${ms.name}（${ms.cefr}）</div>
    <div class="ms-celeb-msg">${ms.msg}</div>
    <div class="ms-celeb-tip">
      <div class="ms-celeb-tip-es" onclick="speakFull('${escAttr(celebMsg.es)}')" style="cursor:pointer">${celebMsg.es}</div>
      <div class="ms-celeb-tip-text">${celebMsg.zh}</div>
      <div class="ms-celeb-tip-cta">🗣️ 快去找真人聊聊天！</div>
    </div>
  </div>` : '';
  let lf = null, gcard = null, sectionLabel = '', isLyric = true;
  if(count < 15){
    const pool = LYRICS_FILL_DATA.filter(x=>['a0','a1'].includes(x.level));
    lf = pool[day % pool.length];
    sectionLabel = '🎵 今日兒歌語塊';
  } else if(count < 45){
    const pool = LYRICS_FILL_DATA.filter(x=>['b1','b2'].includes(x.level));
    lf = pool[day % pool.length];
    sectionLabel = '🎓 今日歌詞填空';
  } else {
    const ids = ['g45','g46','g47','g48','g49'];
    const GRAMMAR_DATA_REF = (typeof GRAMMAR_DATA !== 'undefined') ? GRAMMAR_DATA : [];
    gcard = GRAMMAR_DATA_REF.find(x=>x.id===ids[day%ids.length]);
    sectionLabel = '🌍 今日文化小卡';
    isLyric = false;
  }
  if(isLyric && lf){
    return `${celebHtml}<div class="morning-brief-card">
      <div class="morning-brief-banner"><div class="morning-brief-tag">🌅 農間小報</div><div class="morning-brief-day">${today}</div></div>
      <div class="morning-brief-section">${sectionLabel}</div>
      <div class="morning-brief-song"><span>${lf.artist}</span><span>《${lf.song}》</span><span class="lf-level lf-level-${lf.level}">${lf.levelLabel}</span></div>
      <div class="morning-brief-lyric">${lf.before} <span class="morning-brief-blank">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> ${lf.after}</div>
      <div class="morning-brief-hint">💡 ${lf.hint}</div>
      <div class="morning-brief-links">
        <a class="morning-brief-yt" href="${lf.yt}" target="_blank" rel="noopener">${lf.ytLabel}</a>
        <button class="morning-brief-answer-btn" onclick="jumpToLyricAnswer('${lf.id}')">🔎 去核對答案</button>
      </div>
      <button class="morning-brief-close" onclick="closeMorningBrief()">✕ 去今日探索</button>
    </div>`;
  }
  if(!isLyric && gcard){
    const ex = gcard.examples && gcard.examples[0];
    return `${celebHtml}<div class="morning-brief-card">
      <div class="morning-brief-banner"><div class="morning-brief-tag">🌅 農間小報</div><div class="morning-brief-day">${today}</div></div>
      <div class="morning-brief-section">${sectionLabel}</div>
      <div class="morning-brief-song">${gcard.title}</div>
      <div class="morning-brief-rule">${gcard.rule}</div>
      ${ex?`<div class="morning-brief-lyric" onclick="speakGramSmart('${escAttr(ex.es)}')" style="cursor:pointer">${ex.es}<div style="font-size:11px;color:var(--tmid);margin-top:4px">${ex.zh}</div></div>`:''}
      <button class="morning-brief-close" onclick="closeMorningBrief()">✕ 去今日探索</button>
    </div>`;
  }
  return `${celebHtml}<div class="morning-brief-card"><div class="morning-brief-banner"><div class="morning-brief-tag">🌅 農間小報</div><div class="morning-brief-day">${today}</div></div><button class="morning-brief-close" onclick="closeMorningBrief()">✕ 關閉</button></div>`;
}
function showMorningBrief(){
  const overlay = document.getElementById('welcomeTourOverlay');
  if(!overlay) return;
  const dots = document.getElementById('welcomeTourDots');
  const nav = overlay.querySelector('.welcome-tour-nav');
  if(dots) dots.innerHTML = '';
  if(nav) nav.style.display = 'none';
  const body = document.getElementById('welcomeTourBody');
  if(body) body.innerHTML = getMorningBriefHTML();
  overlay.style.display = 'flex';
}
function closeMorningBrief(){
  const overlay = document.getElementById('welcomeTourOverlay');
  if(!overlay) return;
  const nav = overlay.querySelector('.welcome-tour-nav');
  if(nav) nav.style.display = '';
  overlay.style.display = 'none';
  try{ localStorage.setItem('peppa_brief_day_v1', String(Math.floor(Date.now()/86400000))); }catch(e){}
}

// 農間小報彈窗「去核對答案」：關彈窗、切到日光育苗場、展開歌詞填空、捲到那張卡並閃一下
function jumpToLyricAnswer(lfId){
  closeMorningBrief();
  switchMainTab('know');
  _lyricsFillOpen = true;
  const body = document.getElementById('lyricsFillBody');
  const tog = document.getElementById('lyricsFillToggle');
  if(body) body.classList.add('open');
  if(tog) tog.textContent = '▲ 收起';
  renderLyricsFill();
  setTimeout(() => {
    const card = document.getElementById('lf-card-'+lfId);
    if(!card) return;
    card.scrollIntoView({behavior:'smooth', block:'center'});
    card.classList.add('lf-card-flash');
    setTimeout(() => card.classList.remove('lf-card-flash'), 1600);
  }, 200);
}

// ── 🗺️ 歡迎導覽彈窗（首次進入自動彈出，之後可從「❓ 莊園導覽」重新打開）──
const WELCOME_TOUR_STEPS = [
  {icon:"🌾", title:"田間播語塊", desc:"這裡是妳每日播種語言的田地。點開劇中精選片段，跟著莊園主人拆解句子；一詞一句學西語，完成句子還能解鎖彈藥庫語塊。"},
  {icon:"☀️", title:"日光育苗場", desc:"這座莊園收藏的所有養分：從文法蘊藏、動詞變位指引、SEL 情緒篇章，到假同源詞的避雷指南……時不時都可以光顧一下。"},
  {icon:"🛌", title:"床邊低語呢", desc:"深夜的燈還亮著。情緒語塊、真心話句、日記手札，都在這裡。想說什麼就說什麼。"},
  {icon:"🗃️", title:"穀倉大豐收", desc:"妳收成的所有語塊都堆在這裡：語塊花園熟練度、詞彙本、資料備份保險箱，一次看見自己的進度。"}
];
let _welcomeTourStep = 0;
function showWelcomeTour(force){
  let seen = false;
  try{ seen = !!localStorage.getItem('peppa_welcome_tour_seen_v1'); }catch(e){}
  // Ensure tour nav is restored before any rendering
  const overlay = document.getElementById('welcomeTourOverlay');
  if(overlay){
    const nav = overlay.querySelector('.welcome-tour-nav');
    if(nav) nav.style.display = '';
  }
  if(!seen){
    // First visit: show 4-step tour
    _welcomeTourStep = 0;
    renderWelcomeTourStep();
    if(overlay) overlay.style.display = 'flex';
    return;
  }
  // Returning visitor
  if(!force){
    // Auto page-load: only show once per day
    const todayDay = Math.floor(Date.now()/86400000);
    let lastDay = 0;
    try{ lastDay = parseInt(localStorage.getItem('peppa_brief_day_v1')||'0')||0; }catch(e){}
    if(lastDay === todayDay) return;
  }
  // Show 農間小報 (forced via ❓ button, or first auto-load of the day)
  showMorningBrief();
}
function renderWelcomeTourStep(){
  const s = WELCOME_TOUR_STEPS[_welcomeTourStep];
  document.getElementById('welcomeTourBody').innerHTML = `
    <div class="welcome-tour-icon">${s.icon}</div>
    <div class="welcome-tour-title">${s.title}</div>
    <div class="welcome-tour-desc">${s.desc}</div>`;
  document.getElementById('welcomeTourDots').innerHTML = WELCOME_TOUR_STEPS
    .map((_,i)=>`<span class="welcome-tour-dot${i===_welcomeTourStep?' active':''}"></span>`).join('');
  const prevBtn = document.getElementById('welcomeTourPrevBtn');
  const nextBtn = document.getElementById('welcomeTourNextBtn');
  prevBtn.disabled = _welcomeTourStep === 0;
  nextBtn.textContent = _welcomeTourStep === WELCOME_TOUR_STEPS.length-1 ? '開始探索莊園吧！' : '下一步 ▶';
}
function welcomeTourNext(){
  if(_welcomeTourStep >= WELCOME_TOUR_STEPS.length-1){ closeWelcomeTour(); return; }
  _welcomeTourStep++;
  renderWelcomeTourStep();
}
function welcomeTourPrev(){
  if(_welcomeTourStep <= 0) return;
  _welcomeTourStep--;
  renderWelcomeTourStep();
}
function closeWelcomeTour(){
  document.getElementById('welcomeTourOverlay').style.display = 'none';
  try{ localStorage.setItem('peppa_welcome_tour_seen_v1', '1'); }catch(e){}
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

// ── B2 時事傳送門 ──
function renderNewsSection(){
  const el = document.getElementById('newsSectionWrap');
  if(!el || typeof NEWS_ITEMS==='undefined') return;

  // DW 文化小卡
  let dwHtml = `<div class="news-dw-card"><div class="news-dw-title">${DW_HISTORY.title}</div>`;
  DW_HISTORY.body.forEach(p=>{
    dwHtml += `<div class="news-dw-item"><span class="news-dw-label">${p.label}</span><span class="news-dw-text">${p.text}</span></div>`;
  });
  dwHtml += '</div>';

  // 新聞卡片
  let itemsHtml = '';
  NEWS_ITEMS.forEach(item=>{
    const isBlank = item.task.type==='blank';
    let headlineHtml;
    if(isBlank){
      headlineHtml = item.headline.replace('[?]',
        `<input type="text" class="news-blank-input" id="news-input-${item.id}"
         placeholder="填入詞語" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
         onkeydown="if(event.key==='Enter')checkNewsBug('${item.id}')">`);
    } else {
      headlineHtml = item.headline.replace(item.task.wrong,
        `<span class="news-bug-word" id="news-bug-${item.id}" title="這個字有錯誤">${item.task.wrong}</span>`);
    }

    itemsHtml += `<div class="news-item" id="news-item-${item.id}">
      <div class="news-meta">
        <span class="news-topic">${item.topic}</span>
        <a class="news-source" href="${item.sourceUrl}" target="_blank" rel="noopener">${item.source} ↗</a>
      </div>
      <div class="news-headline">${headlineHtml}</div>`;

    if(isBlank){
      itemsHtml += `<div class="news-controls">
        <button class="news-check-btn" onclick="checkNewsBug('${item.id}')">核對答案</button>
        <button class="news-hint-btn" onclick="toggleNewsHint('${item.id}')">提示</button>
      </div>`;
    } else {
      itemsHtml += `<div class="news-controls">
        <input type="text" class="news-blank-input" id="news-input-${item.id}"
         placeholder="輸入正確拼法" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
         onkeydown="if(event.key==='Enter')checkNewsBug('${item.id}')">
        <button class="news-check-btn" onclick="checkNewsBug('${item.id}')">找錯字</button>
        <button class="news-hint-btn" onclick="toggleNewsHint('${item.id}')">提示</button>
      </div>`;
    }

    itemsHtml += `<div class="news-hint" id="news-hint-${item.id}" style="display:none">
        <span class="news-hint-zh">${item.task.zh}</span> — ${item.task.hint}
      </div>
      <div class="news-feedback" id="news-fb-${item.id}"></div>
    </div>`;
  });

  el.innerHTML = `<div class="news-section-wrap">
    <div class="news-section-header" onclick="toggleNewsSection()">
      <div class="news-section-title-row">
        <span class="news-section-title">📰 B2 時事傳送門</span>
        <span class="news-section-badge">B2</span>
      </div>
      <div class="news-section-sub">挖空填詞・錯字修正，讓語塊長進真實新聞</div>
      <span id="newsSectionToggle">▼ 展開</span>
    </div>
    <div id="newsSectionBody" style="display:none">
      ${dwHtml}
      <div class="news-items">${itemsHtml}</div>
      <div class="news-footer">題目來源：<a href="https://www.dw.com/es/" target="_blank" rel="noopener">DW Español</a> · <a href="https://news.un.org/es/" target="_blank" rel="noopener">Noticias ONU</a> · <a href="https://es.wikinews.org/" target="_blank" rel="noopener">Wikinews ES</a>（標題引用，僅供教育學習）</div>
    </div>
  </div>`;
}

function toggleNewsSection(){
  const body = document.getElementById('newsSectionBody');
  const arrow = document.getElementById('newsSectionToggle');
  if(!body) return;
  const open = body.style.display!=='none';
  body.style.display = open ? 'none' : 'block';
  if(arrow) arrow.textContent = open ? '▼ 展開' : '▲ 收起';
}

function toggleNewsHint(id){
  const el = document.getElementById('news-hint-'+id);
  if(el) el.style.display = el.style.display==='none' ? 'block' : 'none';
}

function checkNewsBug(id){
  if(typeof NEWS_ITEMS==='undefined') return;
  const item = NEWS_ITEMS.find(i=>i.id===id);
  if(!item) return;
  const fbEl = document.getElementById('news-fb-'+id);
  const inputEl = document.getElementById('news-input-'+id);
  const hintEl = document.getElementById('news-hint-'+id);
  if(!fbEl || !inputEl) return;

  const raw = inputEl.value.trim().toLowerCase();
  if(!raw) return;

  if(raw===item.task.answer.toLowerCase()){
    fbEl.innerHTML = `<span class="news-fb-ok">✅ ¡Exacto! <strong>${item.task.answer}</strong>（${item.task.zh}）</span>`;
    inputEl.disabled = true;
    inputEl.style.borderBottom = '2px solid var(--ok)';
    if(item.task.type==='bug'){
      const bugEl = document.getElementById('news-bug-'+id);
      if(bugEl) bugEl.classList.add('news-bug-fixed');
    }
    if(hintEl) hintEl.style.display = 'block';
  } else {
    fbEl.innerHTML = `<span class="news-fb-err">¡Ojo! 👀 — ${item.task.hint}</span>`;
  }
}

// ── 蜂巢謝誌：更新記錄 ──
const CHANGELOG_DATA=[
  {date:"2026.07.17",tag:"莊園主 ✦ 工蜂",items:[
    "🛠️ 【修剪巢穴入口】：莊園主下令優化動線！工蜂已將原本佔位太大的導覽區，改建為「初入園者輪播區塊」，讓新來的採蜜人滑動起來更順暢",
    "🍯 【搬運高級蜜糖】：工蜂自作主張（被園主稱讚）！將 B2 等級的高級內文「🎵 聽歌填空」挪移到上方黃金區，刺激資深採蜜人的語感",
    "💧 【修補儲水槽】：園主發現漏水！工蜂已緊急勞動修復了文法儲水槽的滲水（Bug）問題，目前供水一切正常"
  ]},
  {date:"2026.07.16",tag:"大補丁日",items:[
    "💧 文法儲水槽擴充到 52 張卡：比較級、成語語塊、拉美文化小卡、B2詞彙清單，從 A1 一路補到 B2",
    "🌱🍯 CEFR 等級篩選上線：按護土嫩芽 / 甘露超頻 / 蜂王蜜釀的等級過濾文法卡，找到自己現在該啃的程度",
    "🪞 陳述式↔虛擬式對照表出爐：並排靜態顯示，hablar/tener/querer/poder/ser 五組動詞點就能聽發音",
    "🔆 連接詞螢光筆上線：y 用方角緊靠，pero 有呼吸感留白，句子的邏輯節奏現在看得見",
    "🐱 E1 換骨完成：「泥巴坑跳跳」→「妮妲的角落・雨中暴衝」，音檔全部在 Colab 重錄上傳",
    "❓ 歡迎導覽彈窗上線，第一次來的人會看到莊園四大分區介紹，頭上那個 ❓ 按鈕可以隨時重看"
  ]},
  {date:"2026.07.15",tag:"B2 路線圖日",items:[
    "📐 B2 升級五模組路線圖制定完成，過去虛擬式 / 被動語態 / 讓步子句全列入待辦",
    "🎵 里程碑配對歌曲清單確定：A1 配 Julieta Venegas，A2 配 Juanes，B1 配 Juan Luis Guerra，B2 配 Beyoncé 西語版，C1 配 Rosalía",
    "📊 莊園語塊股複利試算表出爐：每天 20 分鐘，第 7 天能在歌裡抓到 1-2 個剛學過的語塊；第 30 天 IG 旅遊文案不用查翻譯"
  ]},
  {date:"2026.07.14",tag:"六集大爆發",items:[
    "☀️ E7「手忙腳亂的早晨」：tener sueño/hambre/frío/prisa/tiempo/miedo 一網打盡，hay 家族首次登場，薇薇安老師讓迪多從恍神中回來",
    "🚗 E8「迪多和車車」：迪多用推車車 Chito 表達 Yes/No，媽媽深呼吸安靜陪伴，不強迫覆述",
    "🧠 E9「我終於知道自己是誰」：卡妲媽媽讀 TDAH 資料，對號入座，然後慢慢學著接納自己",
    "🌀 E10「我們不是故意對衝的」：媽媽的衝動排程 vs 迪多的超規律需求，最後理解「只是不同，不是誰錯了」",
    "💀 E11「亡靈節・記憶之旅」：y / pero / porque 連接詞螢光筆在每句話裡閃爍，萬壽菊陪大家走那條記憶長路",
    "🧠 SEL 線開站！小小自我蛻變攻略三集一起上：閣樓時期・小情緒自我介紹・本心與閣樓",
    "🧠 SEL Ep4 連接詞進階：九個小情緒各自學會用 sin embargo / por eso / además / en realidad 說出更完整的自己"
  ]},
  {date:"2026.07.13",tag:"儲水槽初版",items:[
    "💧 文法儲水槽誕生：IR 近未來式 / TENER 家族 / 形容詞後置三張卡打頭陣",
    "💎☁️ SER・ESTAR 對照站上線：DOCTOR / PLACE 口訣 + 多語對接 + 調皮特例小蟲，一張卡搞定「是」與「在」",
    "☯️ 太極變身鏡：上層陰陽字尾語塊卡（太極定裝鏡），下層超級變變變動詞變位庫，整合成雙層結構",
    "🍄 假野莓 False Cognates 登場：embarazada / actualmente / soportar / éxito，長得像英文但意思整個歪掉的危險分子"
  ]},
  {date:"2026.07.07-12",tag:"奠基期",items:[
    "🌻 語塊花園新鮮度視覺層 V1：一個全域時間戳記錄上次答對的時間，超過三天蟲就出來了",
    "🔔 每日提醒通知：網站可安裝到主畫面，☀️ 早上 8:30 學習提醒，🌙 晚上 23:00 日記提醒",
    "🐛 通知點下去直接抓蟲：點學習提醒直接跳進語塊花園抓蟲，ADHD 友善零摩擦設計",
    "📤 資料保險箱上線：一鍵備份全站 localStorage（進度 + 花園 + 日記），下載成 JSON 帶著走",
    "💬 心田深耕 Hablar de corazón：五大人生主題真心話句庫，28 句原創西語等你收藏",
    "🏅 彈藥庫解鎖系統、語塊花園熟練度追蹤、造句核對引擎，基礎架構全部就定位"
  ]}
];

function _clEntryHtml(entry){
  return `<div class="cl-entry">
    <div class="cl-meta"><span class="cl-date">${entry.date}</span><span class="cl-tag">${entry.tag}</span></div>
    <ul class="cl-items">${entry.items.map(it=>`<li>${it}</li>`).join('')}</ul>
  </div>`;
}
function renderChangelog(){
  const latestEl=document.getElementById('changelogLatest');
  const bodyEl=document.getElementById('changelogBody');
  if(latestEl) latestEl.innerHTML=_clEntryHtml(CHANGELOG_DATA[0]);
  if(bodyEl) bodyEl.innerHTML=CHANGELOG_DATA.slice(1).map(_clEntryHtml).join('<div class="cl-divider"></div>');
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
  renderMilestoneBadgeStrip();
  renderCogLibrary();
  renderConjLibrary();
  renderPronounLibrary();
  renderGenderPairs();
  renderSerEstarStation();
  renderIndicSubjPairs();
  renderGrammarSupplement();
  renderNewsSection();
  renderChangelog();
  renderVocab();
  renderGardenView();
  renderGardenFreshness();
  initTTS();
  initGroupButtons();
  restoreActiveTab();
  initReminders();
  const _deepLinked = handleReminderDeepLink();
  if(!_deepLinked) showWelcomeTour(false);
})();
