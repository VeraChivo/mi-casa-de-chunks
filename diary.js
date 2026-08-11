/* ── 📔 媽媽碎語日記 ── */

const DIARY_KIDS = [
  { id: 'Luna', label: 'Luna' },
  { id: 'Kai',  label: 'Kai' },
  { id: 'Yigu', label: 'Yigú' },
  { id: 'Ylin', label: 'Ylin' }
];

const DIARY_MOODS = [
  { cat: '🪵 Maderas 木質沉靜', items: [
    { id: 'Sereno',      es: 'Sereno/a',      zh: '安詳',       icon: '😌' },
    { id: 'Tranquilo',   es: 'Tranquilo/a',   zh: '平靜',       icon: '🍃' },
    { id: 'Descansado',  es: 'Descansado/a',  zh: '充沛',       icon: '🧘' }
  ]},
  { cat: '🔥 Ahumado 煙燻焦灼', items: [
    { id: 'Agotado',     es: 'Agotado/a',     zh: '精疲力竭',   icon: '😴' },
    { id: 'Abrumado',    es: 'Abrumado/a',    zh: '思緒超載',   icon: '⏳' },
    { id: 'Paciente',    es: 'Paciente',      zh: '極度耐性熬過去了', icon: '😮‍💨' }
  ]},
  { cat: '🍯 Dulzura 蜜香微甜', items: [
    { id: 'Contento',    es: 'Contento/a',    zh: '開朗',       icon: '😊' },
    { id: 'Satisfecho',  es: 'Satisfecho/a',  zh: '滿足',       icon: '✨' },
    { id: 'Agradecido',  es: 'Agradecido/a',  zh: '感恩',       icon: '❤️' }
  ]},
  { cat: '⚡ Especias 香料辛辣', items: [
    { id: 'Estimulado',  es: 'Estimulado/a',  zh: '感官放大',   icon: '⚡' },
    { id: 'Impaciente',  es: 'Impaciente',    zh: '辛辣焦躁',   icon: '🌶️' },
    { id: 'Distraido',   es: 'Distraído/a',   zh: '風味分散',   icon: '🧩' }
  ]},
  { cat: '🍇 Jerez 雪莉果乾', items: [
    { id: 'Inspirado',   es: 'Inspirado/a',   zh: '靈感湧現',   icon: '📖' },
    { id: 'Mimado',      es: 'Mimado/a',      zh: '自我嬌寵',   icon: '☕' },
    { id: 'Aliviado',    es: 'Aliviado/a',    zh: '釋懷',       icon: '🌿' }
  ]},
  { cat: '⏳ Persistencia 餘韻綿長', items: [
    { id: 'Maduro',      es: 'Maduro/a',      zh: '圓融熟成',   icon: '🥃' },
    { id: 'Esperanzado', es: 'Esperanzado/a', zh: '期待微光',   icon: '✨' }
  ]}
];

const DIARY_WEATHER = [
  { id: 'soleado',  es: 'soleado',  zh: '晴天', icon: '☀️' },
  { id: 'nublado',  es: 'nublado',  zh: '多雲', icon: '☁️' },
  { id: 'llovizna', es: 'llovizna', zh: '細雨', icon: '🌦️' },
  { id: 'lluvia',   es: 'lluvia',   zh: '下雨', icon: '🌧️' },
  { id: 'viento',   es: 'viento',   zh: '起風', icon: '🌬️' }
];

const _ES_WEEKDAYS = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
const _ES_MONTHS   = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

function _diaryFormatDateEs(isoStr){
  const d = new Date(isoStr + 'T00:00:00');
  return `${_ES_WEEKDAYS[d.getDay()]}, ${d.getDate()} de ${_ES_MONTHS[d.getMonth()]} de ${d.getFullYear()}`;
}
function _diaryTodayISO(){
  const d = new Date();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const day = String(d.getDate()).padStart(2,'0');
  return `${d.getFullYear()}-${m}-${day}`;
}
function _diaryFindMood(id){
  for(const g of DIARY_MOODS){ const hit = g.items.find(m=>m.id===id); if(hit) return hit; }
  return null;
}
function _diaryEsc(s){
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function getDiaryDB(){
  try { return JSON.parse(localStorage.getItem('peppa_mom_diary_v1') || '[]'); } catch(e){ return []; }
}
function saveDiaryDB(arr){
  try { localStorage.setItem('peppa_mom_diary_v1', JSON.stringify(arr)); } catch(e){}
}

let _diaryKidNotes = {};
let _diarySelMoods = [];
let _diarySelWeather = null;
let _diaryDraftDirty = false;
let _diaryEditingId = null;

function diaryOnKidNoteInput(){
  document.querySelectorAll('#diaryKidsPool .diary-kid-note').forEach(inp => {
    _diaryKidNotes[inp.dataset.kid] = inp.value;
  });
  diaryRegenerateDraft();
}
function speakDiaryMood(id){
  const file = (typeof DIARY_MOOD_AUDIO_MAP!=='undefined') ? DIARY_MOOD_AUDIO_MAP[id] : null;
  const m = _diaryFindMood(id);
  if(typeof _stopActiveAudio==='function') _stopActiveAudio();
  if(!file){ if(m && typeof speakWord==='function') speakWord(m.es); return; }
  const player = new Audio(file);
  _activeAudio = player;
  player.onerror = () => { if(m && typeof speakWord==='function') speakWord(m.es); };
  player.play().catch(()=>{ if(m && typeof speakWord==='function') speakWord(m.es); });
}
function speakDiaryWeather(id){
  const file = (typeof DIARY_WEATHER_AUDIO_MAP!=='undefined') ? DIARY_WEATHER_AUDIO_MAP[id] : null;
  if(typeof _stopActiveAudio==='function') _stopActiveAudio();
  if(!file){ if(typeof speakWord==='function') speakWord(id); return; }
  const player = new Audio(file);
  _activeAudio = player;
  player.onerror = () => { if(typeof speakWord==='function') speakWord(id); };
  player.play().catch(()=>{ if(typeof speakWord==='function') speakWord(id); });
}
function diaryToggleMood(id){
  const i = _diarySelMoods.indexOf(id);
  if(i===-1){ _diarySelMoods.push(id); speakDiaryMood(id); } else _diarySelMoods.splice(i,1);
  _diaryRenderMoods();
  diaryRegenerateDraft();
}
function diarySelectWeather(id){
  const newlySelected = _diarySelWeather !== id;
  _diarySelWeather = (_diarySelWeather===id) ? null : id;
  if(newlySelected) speakDiaryWeather(id);
  _diaryRenderWeather();
  diaryRegenerateDraft();
}

function _diaryRenderKids(){
  const el = document.getElementById('diaryKidsPool');
  if(!el) return;
  el.innerHTML = DIARY_KIDS.map(k => `
    <div class="diary-kid-row">
      <span class="diary-kid-name">${k.label}</span>
      <input type="text" class="diary-kid-note handwritten-style" data-kid="${k.id}" value="${_diaryEsc(_diaryKidNotes[k.id]||'')}" placeholder="…" oninput="diaryOnKidNoteInput()">
    </div>`).join('');
}
function _diaryRenderMoods(){
  const el = document.getElementById('diaryMoodsPool');
  if(!el) return;
  el.innerHTML = DIARY_MOODS.map(g => `
    <div class="diary-mood-cat">${g.cat}</div>
    <div class="diary-mood-row">
      ${g.items.map(m => {
        const idx = _diarySelMoods.indexOf(m.id);
        const sel = idx !== -1;
        const badge = sel ? `<span class="diary-mood-order">${idx+1}</span>` : '';
        return `<button class="diary-chip diary-mood-chip${sel?' is-selected':''}" onclick="diaryToggleMood('${m.id}')">${badge}${m.icon} ${m.es}</button>`;
      }).join('')}
    </div>
  `).join('');
}
function _diaryRenderWeather(){
  const el = document.getElementById('diaryWeatherPool');
  if(!el) return;
  el.innerHTML = DIARY_WEATHER.map(w => {
    const sel = _diarySelWeather === w.id;
    return `<button class="diary-chip${sel?' is-selected':''}" onclick="diarySelectWeather('${w.id}')">${w.icon} ${w.es}</button>`;
  }).join('');
}

function diaryOnDateChange(){
  diaryRegenerateDraft();
}

function _diaryCurrentDateEs(){
  const dateInput = document.getElementById('diaryDateInput');
  const iso = (dateInput && dateInput.value) ? dateInput.value : _diaryTodayISO();
  return _diaryFormatDateEs(iso);
}

function diaryBuildDraftText(){
  const dateEs = _diaryCurrentDateEs();
  const moodChain = _diarySelMoods.map(id => (_diaryFindMood(id)||{}).es).filter(Boolean).join(' ➔ ');
  const lines = [`[${dateEs}]`];
  DIARY_KIDS.forEach(k => {
    const note = (_diaryKidNotes[k.id]||'').trim();
    if(note) lines.push(`${k.label}：${note}`);
  });
  if(moodChain) lines.push(`而我今天的心情軌跡是 ${moodChain}。`);
  return lines.join('\n');
}

function diaryRegenerateDraft(){
  const ta = document.getElementById('diaryDraftText');
  if(!ta) return;
  if(_diaryDraftDirty) return;
  ta.value = diaryBuildDraftText();
}
function diaryOnDraftInput(){
  _diaryDraftDirty = true;
}
function diaryResetDraft(){
  _diaryDraftDirty = false;
  diaryRegenerateDraft();
  if(typeof toast === 'function') toast('🔄 草稿已重新產生');
}

function diaryAdvanceGardenMoods(moodEsList){
  if(!moodEsList.length || typeof getGardenDB !== 'function') return;
  const db = getGardenDB();
  moodEsList.forEach(es => {
    const entry = db[es] || { stage: 0, quiz_count: 0 };
    if(entry.stage < 4) db[es] = { stage: entry.stage + 1, quiz_count: entry.quiz_count || 0 };
  });
  saveGardenDB(db);
  if(typeof renderGardenView === 'function') renderGardenView();
}

function _diaryHasKidNotes(){
  return DIARY_KIDS.some(k => (_diaryKidNotes[k.id]||'').trim());
}

function diarySave(){
  diaryOnKidNoteInput();
  const dateInput = document.getElementById('diaryDateInput');
  const iso = (dateInput && dateInput.value) ? dateInput.value : _diaryTodayISO();
  const personalNote = (document.getElementById('mama-secret-notes') || {}).value || '';
  const bodyText = (document.getElementById('diaryDraftText') || {}).value || '';

  if(!_diaryHasKidNotes() && !_diarySelMoods.length && !_diarySelWeather && !personalNote.trim() && !bodyText.trim()){
    if(typeof toast === 'function') toast('先選一點什麼，或寫點什麼再存吧');
    return;
  }

  const moodEsList = _diarySelMoods.map(id => (_diaryFindMood(id)||{}).es).filter(Boolean);
  const db = getDiaryDB();

  if(_diaryEditingId){
    const idx = db.findIndex(e => e.id === _diaryEditingId);
    if(idx !== -1){
      db[idx] = { ...db[idx], dateIso: iso, dateEs: _diaryFormatDateEs(iso),
        kidNotes: { ..._diaryKidNotes }, moods: _diarySelMoods.slice(), weather: _diarySelWeather,
        personalNote, bodyText, updatedAt: Date.now() };
      saveDiaryDB(db);
      diaryAdvanceGardenMoods(moodEsList);
      if(typeof toast === 'function') toast('✏️ 已更新這篇 Vivencias de mamá');
    } else {
      // 原本要修訂的那篇同時被刪掉了（例如在列表裡按了刪除）——
      // 不要悄悄什麼都不做卻報告「已更新」，改成存成新的一篇，內容才不會憑空消失
      const entry = { id: 'd_' + Date.now(), dateIso: iso, dateEs: _diaryFormatDateEs(iso),
        kidNotes: { ..._diaryKidNotes }, moods: _diarySelMoods.slice(), weather: _diarySelWeather,
        personalNote, bodyText, createdAt: Date.now() };
      db.unshift(entry);
      saveDiaryDB(db);
      diaryAdvanceGardenMoods(moodEsList);
      if(typeof toast === 'function') toast('⚠️ 原本那篇已經不在了，已幫你存成新的一篇');
    }
    _diaryEditingId = null;
  } else {
    const entry = {
      id: 'd_' + Date.now(),
      dateIso: iso,
      dateEs: _diaryFormatDateEs(iso),
      kidNotes: { ..._diaryKidNotes },
      moods: _diarySelMoods.slice(),
      weather: _diarySelWeather,
      personalNote: personalNote,
      bodyText: bodyText,
      createdAt: Date.now()
    };
    db.unshift(entry);
    saveDiaryDB(db);
    diaryAdvanceGardenMoods(moodEsList);
    if(typeof toast === 'function'){
      toast(moodEsList.length ? `💙 已存進 Vivencias de mamá，🌻 語塊花園也採了 ${moodEsList.length} 朵花蜜` : '💙 已存進 Vivencias de mamá');
    }
  }

  diaryResetForm();
  renderDiaryList();
  if(typeof checkStorageQuota === 'function') checkStorageQuota();
}

function diaryResetForm(){
  _diaryKidNotes = {};
  _diarySelMoods = [];
  _diarySelWeather = null;
  _diaryDraftDirty = false;
  _diaryEditingId = null;
  const noteInput = document.getElementById('mama-secret-notes');
  if(noteInput) noteInput.value = '';
  const dateInput = document.getElementById('diaryDateInput');
  if(dateInput) dateInput.value = _diaryTodayISO();
  const draftTa = document.getElementById('diaryDraftText');
  if(draftTa) draftTa.value = '';
  _diaryRenderKids();
  _diaryRenderMoods();
  _diaryRenderWeather();
  diaryRegenerateDraft();
  _diaryUpdateEditingBadge();
}

// ── ✏️ 修訂中的持續提示——不能只靠一閃即逝的 toast，容易分心的話一轉頭就忘記
// 自己正在改哪一篇，導致後面存檔時把新內容誤蓋進舊那篇（見 diarySave 的分支說明）──
function _diaryUpdateEditingBadge(){
  const badge = document.getElementById('diaryEditingBadge');
  const txt = document.getElementById('diaryEditingBadgeText');
  if(!badge || !txt) return;
  if(_diaryEditingId){
    const entry = getDiaryDB().find(e => e.id === _diaryEditingId);
    txt.textContent = entry ? `✏️ 正在修訂 ${entry.dateIso} 這篇，改完記得再存一次` : '✏️ 正在修訂舊稿，改完記得再存一次';
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

function diaryDiscardForm(){
  diaryResetForm();
  if(typeof toast === 'function') toast('🍃 Déjalo ir. 已放下');
}

function diaryEditEntry(id){
  const entry = getDiaryDB().find(e => e.id === id);
  if(!entry) return;
  _diaryEditingId = id;
  _diaryKidNotes = { ...(entry.kidNotes || {}) };
  _diarySelMoods = (entry.moods || []).slice();
  _diarySelWeather = entry.weather || null;
  _diaryDraftDirty = true;
  const dateInput = document.getElementById('diaryDateInput');
  if(dateInput) dateInput.value = entry.dateIso;
  const noteInput = document.getElementById('mama-secret-notes');
  if(noteInput) noteInput.value = entry.personalNote || '';
  const draftTa = document.getElementById('diaryDraftText');
  if(draftTa) draftTa.value = entry.bodyText || '';
  _diaryRenderKids();
  _diaryRenderMoods();
  _diaryRenderWeather();
  _diaryUpdateEditingBadge();
  const card = document.querySelector('.diary-paper');
  if(card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if(typeof toast === 'function') toast('✏️ 已載入舊稿，改完記得再存一次');
}

function diaryDeleteEntry(id){
  const db = getDiaryDB().filter(e => e.id !== id);
  saveDiaryDB(db);
  renderDiaryList();
  if(typeof toast === 'function') toast('🗑️ 已刪除這篇');
}

// 🌼 學習完成→日記出口（2026-07-24 VERA定案第一階段：只做按鈕入口+帶入句子+跳轉，
// 不改日記資料結構）：從田間播語塊的完成句子，引導帶去📔Vivencias de mamá的自由手札欄，
// 不是💬聊療吾心語——後者是「挑片語→自動對照→擴寫」三步驟流程，需要先從固定片語庫選字，
// 硬塞任意劇情句進去會跳過①②步驟、UI狀態對不上；Vivencias de mamá的手札欄本來就是
// 自由書寫、沒有前置步驟，適合承接「把這句話帶回生活寫下今天的想法」。
function jumpToDiaryWithSentence(){
  if(typeof cur !== 'function') return;
  const s = cur();
  if(!s) return;
  switchMainTab('mom');
  setTimeout(()=>{
    const ta = document.getElementById('diaryDraftText');
    if(ta){
      // 附加而不是覆蓋——手札欄本來就會自動帶入日期/心情草稿模板(diaryBuildDraftText)，
      // 不會是真的空白，用「是否已包含這句」判斷避免重複點擊插入好幾次
      const quote = `「${s.es}」`;
      if(!ta.value.includes(quote)){
        ta.value = ta.value.replace(/\n+$/,'') + `\n${quote}\n`;
        _diaryDraftDirty = true;
      }
      ta.scrollIntoView({behavior:'smooth', block:'center'});
      ta.focus();
    }
  }, 60);
}

function renderDiaryList(){
  const el = document.getElementById('diaryListArea');
  if(!el) return;
  const db = getDiaryDB();
  if(!db.length){
    el.innerHTML = `<div class="diary-empty-msg">還沒有任何一篇 Vivencias de mamá，寫下第一篇吧</div>`;
    return;
  }
  el.innerHTML = db.map((entry, idx) => {
    const seq = String(db.length - idx).padStart(2,'0');
    const kidsStr = DIARY_KIDS.map(k => {
      const note = ((entry.kidNotes||{})[k.id]||'').trim();
      return note ? `${k.label}：${note}` : '';
    }).filter(Boolean).join('　｜　');
    const moodStr = (entry.moods||[]).map(id => {
      const m = _diaryFindMood(id);
      return m ? `${m.icon} ${m.es}` : '';
    }).filter(Boolean).join(' ➔ ');
    const w = DIARY_WEATHER.find(x => x.id === entry.weather);
    const weatherStr = w ? `${w.icon} ${w.es}` : '';
    return `<details class="diary-entry-card">
      <summary class="diary-entry-summary">
        <span class="diary-entry-date">${_diaryEsc(entry.dateIso)}</span>
        <span class="diary-entry-tag">・Vivencias de mamá #${seq}</span>
      </summary>
      <div class="diary-entry-body">
        ${kidsStr ? `<div class="diary-entry-meta">👶 ${_diaryEsc(kidsStr)}</div>` : ''}
        ${moodStr ? `<div class="diary-entry-meta">🎭 ${_diaryEsc(moodStr)}</div>` : ''}
        ${weatherStr ? `<div class="diary-entry-meta">${_diaryEsc(weatherStr)}</div>` : ''}
        ${entry.personalNote ? `<div class="diary-entry-personal">💬 ${_diaryEsc(entry.personalNote)}</div>` : ''}
        <div class="diary-entry-text">${_diaryEsc(entry.bodyText).replace(/\n/g,'<br>')}</div>
        <div class="diary-entry-actions">
          <button class="diary-entry-edit" onclick="diaryEditEntry('${entry.id}')">✏️ 修訂</button>
          <button class="diary-entry-del" onclick="diaryDeleteEntry('${entry.id}')">🗑️ 刪除</button>
        </div>
      </div>
    </details>`;
  }).join('');
}

function renderDiaryCardHtml(){
  return `<div class="diary-card diary-paper card-container">
    <div class="diary-paper-title">💙 Vivencias de mamá</div>
    <div id="diaryEditingBadge" class="diary-editing-badge" style="display:none">
      <span id="diaryEditingBadgeText"></span>
      <button class="diary-editing-cancel" onclick="diaryDiscardForm()">取消修訂</button>
    </div>

    <div class="diary-tag-row">
      <details class="diary-tag-group">
        <summary class="diary-tag-label">👶 <span id="diaryKidsSummary">小孩</span></summary>
        <div class="diary-chip-row" id="diaryKidsPool"></div>
      </details>
      <details class="diary-tag-group">
        <summary class="diary-tag-label">📅 <span id="diaryDateSummary">Fecha</span></summary>
        <div class="diary-date-row">
          <input type="date" id="diaryDateInput" class="diary-date-input" onchange="diaryOnDateChange()">
        </div>
      </details>
      <details class="diary-tag-group">
        <summary class="diary-tag-label">🎭 <span id="diaryMoodsSummary">心情</span></summary>
        <div class="diary-mood-pool" id="diaryMoodsPool"></div>
      </details>
      <details class="diary-tag-group">
        <summary class="diary-tag-label">🌤️ <span id="diaryWeatherSummary">天氣</span></summary>
        <div class="diary-chip-row" id="diaryWeatherPool"></div>
      </details>
    </div>

    <textarea id="diaryDraftText" class="diary-draft-textarea" rows="8" placeholder="今天想寫點什麼…" oninput="diaryOnDraftInput()"></textarea>

    <div class="diary-secret-row">
      <div class="diary-secret-label">💙 Secretos de mamá</div>
      <textarea id="mama-secret-notes" rows="3" class="handwritten-style" placeholder="✍️ 覺察小筆記：在這裡留下三行的呼吸空間給自己…"></textarea>
    </div>

    <div class="diary-draft-actions">
      <button class="diary-btn-reset" onclick="diaryResetDraft()">🔄 重新產生草稿</button>
    </div>
    <div class="diary-draft-actions">
      <button class="diary-btn-discard" onclick="diaryDiscardForm()">🍃 Déjalo ir.</button>
      <button id="btn-save-diary" class="diary-btn-save" onclick="diarySave()">🏺 ¡Quédate a embotellar!</button>
    </div>

    <div class="diary-list-title">🕰️ 時光寶瓶</div>
    <div id="diaryListArea" class="diary-list-area"></div>
  </div>`;
}

/* ── 💬 聊療吾心語：三步驟（①片語+空白欄 ②自動中文對照 ③媽媽原音擴寫）
   語塊池只取「情緒會說話／馬麻有話講／馬麻小情緒&情緒這樣說／心田深耕」這幾區，
   不含田間播語塊的 ammo，跟媽媽碎語分開存，但同一張卡片呈現 ── */

let _talkSelectedIds = [];
let _talkDraftDirty = false;
let _talkVoiceDirty = false;

function getTalkDB(){
  try { return JSON.parse(localStorage.getItem('peppa_talk_diary_v1') || '[]'); } catch(e){ return []; }
}
function saveTalkDB(arr){
  try { localStorage.setItem('peppa_talk_diary_v1', JSON.stringify(arr)); } catch(e){}
}

function _talkNormalizeItem(item, catLabel, i){
  const [zhMain, zhEx] = item.zh.split('\n');
  let es = item.es, zh = zhMain;
  if (zhEx) {
    const m = zhEx.match(/^例：([\s\S]+?)\s+([一-鿿][\s\S]*)$/);
    if (m) { es = m[1]; zh = m[2]; }
  }
  return { id: catLabel + '__' + i, es, zh };
}

function _talkGetPhrasePool(){
  const groups = [];
  if (typeof MOM_ATM_DATA !== 'undefined') {
    const wanted = [
      ['sel_phrases',   '🛡️ 情緒會說話'],
      ['mom_daily',     '🎀 馬麻有話講'],
      ['peppa_chunks',  '👩🏻 馬麻小情緒 & 🐱 情緒這樣說']
    ];
    wanted.forEach(([key,label]) => {
      const cat = MOM_ATM_DATA[key];
      if (cat) groups.push({ label, items: cat.items.map((it,i) => _talkNormalizeItem(it, label, i)) });
    });
  }
  if (typeof CORAZON_DATA !== 'undefined') {
    CORAZON_DATA.forEach(cat => {
      groups.push({ label: cat.title, items: cat.items.map((it,i) => _talkNormalizeItem(it, cat.title, i)) });
    });
  }
  return groups;
}

function _talkFindPhrase(id){
  const groups = _talkGetPhrasePool();
  for (const g of groups) { const hit = g.items.find(it => it.id === id); if (hit) return hit; }
  return null;
}

function _talkRenderPicker(){
  const el = document.getElementById('talkPickerPool');
  if(!el) return;
  const groups = _talkGetPhrasePool();
  if(!groups.length){
    el.innerHTML = `<div class="diary-empty-msg">💬 這裡暫時還沒有片語可以挑，晚點再回來看看</div>`;
    return;
  }
  el.innerHTML = `<div class="diary-tag-row">` + groups.map(g => {
    const hasSel = g.items.some(it => _talkSelectedIds.includes(it.id));
    const rowClass = g.items.length > 8 ? 'diary-mood-row talk-row-scroll' : 'diary-mood-row';
    return `<details class="diary-tag-group"${hasSel ? ' open' : ''}>
      <summary class="diary-tag-label">${g.label}</summary>
      <div class="${rowClass}">
        ${g.items.map(it => {
          const idx = _talkSelectedIds.indexOf(it.id);
          const sel = idx !== -1;
          const badge = sel ? `<span class="diary-mood-order">${idx+1}</span>` : '';
          return `<button class="diary-chip diary-mood-chip${sel?' is-selected':''}" onclick="talkSelectPhrase('${it.id}')">${badge}${_diaryEsc(it.es)}</button>`;
        }).join('')}
      </div>
    </details>`;
  }).join('') + `</div>`;
}

function talkSelectPhrase(id){
  const i = _talkSelectedIds.indexOf(id);
  if(i === -1) _talkSelectedIds.push(id); else _talkSelectedIds.splice(i,1);
  _talkRenderPicker();
  talkRegenerateDraft();
  _talkRenderPreview();
}

function _talkBuildDraftText(){
  return _talkSelectedIds.map(id => (_talkFindPhrase(id)||{}).es).filter(Boolean).join('\n');
}

function _talkSyncVoiceFromNote(){
  if(_talkVoiceDirty) return;
  const noteTa = document.getElementById('talkDraftNote');
  const voiceTa = document.getElementById('talkMamaVoice');
  if(noteTa && voiceTa) voiceTa.value = noteTa.value;
}

function talkRegenerateDraft(){
  const ta = document.getElementById('talkDraftNote');
  if(!ta || _talkDraftDirty) return;
  ta.value = _talkBuildDraftText();
  _talkSyncVoiceFromNote();
}

function talkOnNoteInput(){
  _talkDraftDirty = true;
  _talkSyncVoiceFromNote();
}

function talkOnVoiceInput(){
  _talkVoiceDirty = true;
}

function talkResetDraft(){
  _talkDraftDirty = false;
  _talkVoiceDirty = false;
  talkRegenerateDraft();
  if(typeof toast === 'function') toast('🔄 已重新帶入選中的句子');
}

function _talkRenderPreview(){
  const box = document.getElementById('talkPreviewBox');
  const step3 = document.getElementById('talkStep3');
  if(!box || !step3) return;
  const picked = _talkSelectedIds.map(id => _talkFindPhrase(id)).filter(Boolean);
  if(!picked.length){
    box.style.display = 'none';
    step3.style.display = 'none';
    return;
  }
  box.style.display = 'block';
  box.innerHTML = picked.map(p => `
    <div class="card-spanish-body">${(typeof renderScriptLine === 'function') ? renderScriptLine(p.es, `speakGramSmart('${(typeof escAttr==='function'?escAttr(p.es):p.es)}')`) : _diaryEsc(p.es)}</div>
    <div class="card-chinese-translation">${_diaryEsc(p.zh)}</div>
  `).join('<hr style="border:none;border-top:1px dashed var(--usumizu);margin:8px 0">');
  step3.style.display = 'block';
}

function talkSave(){
  if(!_talkSelectedIds.length){ if(typeof toast === 'function') toast('先選至少一句片語吧'); return; }
  const picked = _talkSelectedIds.map(id => _talkFindPhrase(id)).filter(Boolean);
  if(!picked.length) return;
  const voice = (document.getElementById('talkMamaVoice') || {}).value || '';
  // isFreeWritten：只有使用者自己動手改過語音欄位才算「真的自己寫的」——
  // _talkSyncVoiceFromNote() 會把 picker 挑的片語自動複製進來，那種不算
  const isFreeWritten = !!_talkVoiceDirty;
  const keyTakeaway = isFreeWritten ? _talkComputeKeyTakeaway(voice) : [];
  const db = getTalkDB();
  db.unshift({
    id: 'talk_' + Date.now(),
    sentences: picked.map(p => ({ es: p.es, zh: p.zh })),
    voice,
    isFreeWritten,
    keyTakeaway,
    createdAt: Date.now()
  });
  saveTalkDB(db);

  _talkSelectedIds = [];
  _talkDraftDirty = false;
  _talkVoiceDirty = false;
  const noteTa = document.getElementById('talkDraftNote'); if(noteTa) noteTa.value = '';
  const voiceTa = document.getElementById('talkMamaVoice'); if(voiceTa) voiceTa.value = '';
  _talkRenderPicker();
  _talkRenderPreview();
  renderTalkList();
  if(typeof toast === 'function') toast('💬 已存成一篇聊療吾心語');
  if(typeof checkStorageQuota === 'function') checkStorageQuota();
}

function talkDeleteEntry(id){
  const db = getTalkDB().filter(t => t.id !== id && t.parentId !== id);
  saveTalkDB(db);
  renderTalkList();
  if(typeof toast === 'function') toast('🗑️ 已刪除這則');
}

/* ── 🌿 幫小苗長大：陪昨天的自己多說一句（不是修改舊日記，是長出新的一片葉子）
   growth entry 直接存進同一份 peppa_talk_diary_v1（單一資料來源），
   用 parentId 指回原句，渲染時巢狀掛在原句卡片底下，不另開清單 ── */

let _talkGrowingId = null;
const TALK_GROW_HINTS = ['porque', 'mucho', 'muy', 'pero', 'además', 'cuando'];

function _talkDaysAgoLabel(ts){
  const days = Math.floor((Date.now() - ts) / 86400000);
  if(days <= 0) return '今天';
  if(days === 1) return '1天前';
  if(days < 7) return days + '天前';
  const weeks = Math.floor(days / 7);
  if(weeks < 5) return weeks + '週前';
  return Math.floor(days / 30) + '個月前';
}

function _talkGrowIntroHtml(){
  const KEY = 'peppa_talk_grow_intro_seen_v1';
  if (localStorage.getItem(KEY)) return '';
  localStorage.setItem(KEY, '1');
  return `<div class="talk-grow-intro">🌿 小苗不是要寫得完美，只要今天比昨天，多長一句就好。</div>`;
}

function talkToggleGrow(id){
  _talkGrowingId = (_talkGrowingId === id) ? null : id;
  renderTalkList();
  if(_talkGrowingId === id){
    setTimeout(() => { const ta = document.getElementById('talkGrowInput_' + id); if(ta) ta.focus(); }, 30);
  }
}

function talkInsertGrowHint(rootId, word){
  const ta = document.getElementById('talkGrowInput_' + rootId);
  if(!ta) return;
  ta.value = ta.value ? (ta.value.replace(/\s+$/, '') + ' ' + word + ' ') : (word + ' ');
  ta.focus();
}

function talkSaveGrowth(rootId){
  const ta = document.getElementById('talkGrowInput_' + rootId);
  const text = ((ta && ta.value) || '').trim();
  if(!text){ if(typeof toast === 'function') toast('先幫它多說一句再存吧'); return; }
  // 長大表單本來就是空白讓使用者打字，沒有picker自動複製這一層，一律算「自己寫的」
  const keyTakeaway = _talkComputeKeyTakeaway(text);
  const db = getTalkDB();
  db.unshift({ id: 'talk_' + Date.now(), parentId: rootId, voice: text, isFreeWritten: true, keyTakeaway, createdAt: Date.now() });
  saveTalkDB(db);
  _talkGrowingId = null;
  renderTalkList();
  if(typeof toast === 'function') toast('🌿 這句話又多長了一片葉子');
  if(typeof checkStorageQuota === 'function') checkStorageQuota();
}

function renderTalkList(){
  renderTalkGrowth();
  const el = document.getElementById('talkListArea');
  if(!el) return;
  const db = getTalkDB();
  const roots = db.filter(t => !t.parentId);
  if(!roots.length){
    el.innerHTML = `<div class="diary-empty-msg">還沒有任何心語紀錄，選一句片語開始吧</div>`;
    return;
  }
  const growthsByRoot = {};
  db.filter(t => t.parentId).forEach(t => {
    (growthsByRoot[t.parentId] = growthsByRoot[t.parentId] || []).push(t);
  });
  Object.values(growthsByRoot).forEach(list => list.sort((a,b) => a.createdAt - b.createdAt));

  el.innerHTML = roots.map(t => {
    const sentences = t.sentences || (t.es ? [{ es: t.es, zh: t.zh }] : []); // 相容舊版單句資料
    const sentHtml = sentences.map(s => `
      <div class="card-spanish-body">${(typeof renderScriptLine === 'function') ? renderScriptLine(s.es, `speakGramSmart('${(typeof escAttr==='function'?escAttr(s.es):s.es)}')`) : _diaryEsc(s.es)}</div>
      <div class="card-chinese-translation">${_diaryEsc(s.zh)}</div>
    `).join('<hr style="border:none;border-top:1px dashed var(--usumizu);margin:6px 0">');

    const chain = growthsByRoot[t.id] || [];
    const chainHtml = chain.length ? `
      <div class="talk-grow-chain">
        <div class="talk-grow-chain-label">🌿 這句話長大的軌跡</div>
        ${chain.map(g => `
          <div class="talk-grow-item">
            <span class="talk-grow-item-day">🌿 ${_talkDaysAgoLabel(g.createdAt)}</span>
            <div class="talk-grow-item-text">${(typeof renderScriptLine === 'function') ? renderScriptLine(g.voice, `speakGramSmart('${(typeof escAttr==='function'?escAttr(g.voice):g.voice)}')`) : _diaryEsc(g.voice)}</div>
            ${_talkKeyTakeawayHtml(g)}
          </div>
        `).join('')}
      </div>` : '';

    const seedText = t.voice || sentences.map(s=>s.es).join(' ');
    const growFormHtml = _talkGrowingId === t.id ? `
      <div class="talk-grow-form">
        ${_talkGrowIntroHtml()}
        <div class="talk-grow-seed-label">🌱 以前種的小苗</div>
        <div class="talk-grow-seed-text">${_diaryEsc(seedText)}</div>
        <div class="talk-grow-hint-label">可以試試加：</div>
        <div class="talk-grow-hints">
          ${TALK_GROW_HINTS.map(h => `<button class="talk-grow-hint-chip" onclick="talkInsertGrowHint('${t.id}','${h}')">${h}</button>`).join('')}
        </div>
        <textarea id="talkGrowInput_${t.id}" class="handwritten-style" rows="3" placeholder="幫昨天的自己多說一句…"></textarea>
        <div class="diary-draft-actions">
          <button class="diary-btn-save" onclick="talkSaveGrowth('${t.id}')">🌿 存下這片新葉子</button>
        </div>
      </div>` : '';

    return `
    <div class="notes-entry">
      <div class="notes-entry-head">
        <span class="notes-entry-ts">${_notesFormatTs(t.createdAt)}</span>
      </div>
      ${sentHtml}
      ${t.voice ? `<div class="notes-entry-text">${_diaryEsc(t.voice).replace(/\n/g,'<br>')}</div>` : ''}
      ${_talkKeyTakeawayHtml(t)}
      ${chainHtml}
      <div class="diary-entry-actions">
        <button class="diary-entry-grow" onclick="talkToggleGrow('${t.id}')">🌿 幫它長大</button>
        <button class="diary-entry-del" onclick="talkDeleteEntry('${t.id}')">🗑️ 刪除</button>
      </div>
      ${growFormHtml}
    </div>`;
  }).join('');
}

function renderDiaryConnectorHtml(){
  return `<div class="diary-card-connector">
    <span class="connector-line"></span>
    <span class="connector-badge">📖 挑幾句練習模仿</span>
    <span class="connector-line"></span>
  </div>`;
}

function renderTalkCardHtml(){
  return `<div class="diary-card diary-paper card-container">
    <div class="diary-paper-title" id="talkCardTop">💬 聊療吾心語</div>
    <div class="diary-card-sub">① 挑片語（可複選、依序接續）→ ② 自動對照中文 → ③ 擴寫成媽媽原音</div>

    <div id="talkPickerPool"></div>

    <textarea id="talkDraftNote" class="diary-draft-textarea" rows="4" placeholder="選好的片語會同步跟到這裡，自己調整、插入想法…" oninput="talkOnNoteInput()"></textarea>
    <div class="diary-draft-actions">
      <button class="diary-btn-reset" onclick="talkResetDraft()">🔄 重新帶入選中的句子</button>
    </div>

    <div class="make-pattern-box" id="talkPreviewBox" style="display:none"></div>

    <div id="talkStep3" style="display:none">
      <div class="diary-secret-row">
        <div class="diary-secret-label">📝 媽媽原音</div>
        <textarea id="talkMamaVoice" rows="5" class="handwritten-style" placeholder="把想法再擴寫一下…" oninput="talkOnVoiceInput()"></textarea>
      </div>
      <div class="diary-draft-actions">
        <button class="diary-btn-save" onclick="talkSave()">💬 存成一篇心語</button>
      </div>
    </div>

    <div class="diary-list-title">🗺️ 我的西語成長軌跡</div>
    <div id="talkGrowthArea"></div>

    <div class="diary-list-title">💬 心語紀錄</div>
    <div id="talkListArea" class="diary-list-area"></div>
  </div>`;
}

/* ── 🗺️ 語言回溯：本機比對「媽媽原音」的字數/語法標記成長，不需要後端 ── */

const TALK_GROWTH_MARKERS = [
  {es:'porque',        zh:'因為'},
  {es:'aunque',        zh:'雖然／儘管'},
  {es:'pero',          zh:'但是'},
  {es:'sino',          zh:'而是'},
  {es:'además',        zh:'此外'},
  {es:'sin embargo',   zh:'然而'},
  {es:'por eso',       zh:'因此'},
  {es:'mientras',      zh:'當…的時候'},
  {es:'cuando',        zh:'當…時'},
  {es:'ojalá',         zh:'希望（後接虛擬式）'},
  {es:'entonces',      zh:'那麼、於是'},
  {es:'según',         zh:'根據'},
  {es:'a pesar de',    zh:'儘管'}
];

function _talkCountWords(text){
  return (text || '').trim().split(/\s+/).filter(w => /[a-záéíóúñü]/i.test(w)).length;
}
function _talkStripAccents(s){
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ñ/g,'n');
}
function _talkMarkersUsed(text){
  const t = _talkStripAccents((text || '').toLowerCase());
  return TALK_GROWTH_MARKERS.filter(m => new RegExp('(^|[^a-z])' + _talkStripAccents(m.es) + '([^a-z]|$)', 'i').test(t)).map(m => m.es);
}

function renderTalkGrowth(){
  const el = document.getElementById('talkGrowthArea');
  if(!el) return;
  const db = getTalkDB().filter(t => (t.voice||'').trim()).slice().reverse(); // 轉成時間正序（舊→新）
  if(db.length < 2){
    el.innerHTML = `<div class="diary-empty-msg">擁有兩篇以上「個人日記」後，這裡就會秀出妳的西語成長軌跡</div>`;
    return;
  }
  const first = db[0], last = db[db.length-1];
  const firstWords = _talkCountWords(first.voice);
  const lastWords = _talkCountWords(last.voice);
  const growthPct = firstWords > 0 ? Math.round((lastWords - firstWords) / firstWords * 100) : 0;

  const everUsedBefore = new Set();
  db.slice(0, -1).forEach(t => _talkMarkersUsed(t.voice).forEach(m => everUsedBefore.add(m)));
  const usedInLast = _talkMarkersUsed(last.voice);
  const newMarkers = usedInLast.filter(m => !everUsedBefore.has(m));

  const everUsedAll = new Set();
  db.forEach(t => _talkMarkersUsed(t.voice).forEach(m => everUsedAll.add(m)));

  const growthLine = growthPct !== 0
    ? `<div class="talk-growth-stat">你最新一篇的句子長度比第一篇${growthPct>0?'增加':'減少'}了 <b>${Math.abs(growthPct)}%</b>（${firstWords}字 → ${lastWords}字）</div>`
    : `<div class="talk-growth-stat">字數跟第一篇差不多（${firstWords}字 → ${lastWords}字），繼續累積會更明顯</div>`;

  const newMarkersHtml = newMarkers.length
    ? `<div class="talk-growth-new"><span class="talk-growth-new-label">✨ 這篇新出現的語法標記：</span>${newMarkers.map(m=>`<span class="talk-growth-chip is-new">✓ ${m}</span>`).join('')}</div>`
    : '';

  const mapHtml = TALK_GROWTH_MARKERS.map(m => {
    const used = everUsedAll.has(m.es);
    return `<span class="talk-growth-chip${used?' is-used':''}">${used?'🟢':'⚪'} ${m.es}</span>`;
  }).join('');

  el.innerHTML = `
    <div class="talk-growth-box">
      ${growthLine}
      ${newMarkersHtml}
      <div class="talk-growth-map">
        <div class="talk-growth-map-label">🗺️ 語法標記地圖（在心語紀錄裡出現過就會亮起）</div>
        ${mapHtml}
      </div>
    </div>`;
}

/* ── ✨ Key Takeaway：「這次」真的自己寫出以前學過的語塊，不是「一路累積」的儀表板
   （renderTalkGrowth 完全不動，這裡是獨立於它的另一個東西）。
   規則鎖死三件事，不要自己加碼：
   ①只在 isFreeWritten（使用者自己打字，不是picker自動複製）時才算②比對只做
   精確符合＋去重音＋詞邊界，不做動詞變位/複數推導③一個語塊只慶祝一次——
   已經出現在過去任何一篇的 keyTakeaway 裡，就不會再被列進來 ── */

function _talkNormForMatch(s){
  return _talkStripAccents((s||'').toLowerCase()).replace(/\s+/g, ' ').trim();
}

// 已學過的語塊池＝花園熟練度 key ∪ 💎私語窖收藏文字（同 _chunkFamCollectedKeys 的聯集邏輯），
// 過 _gardenChunkDisplay 拿掉 ge_/sfx_/gp_ 前綴＋濾掉舊格式junk key，
// 排掉帶符號的殘留 key（如「Sereno/a」這種slash寫法無法當成規則字串比對），
// 再過 isVocabWorthy 濾掉人名跟句法黏著詞——三者皆是既有函式，沒有新建語言分析邏輯。
function _talkLearnedPool(){
  if(typeof getGardenDB !== 'function' || typeof isVocabWorthy !== 'function') return [];
  const seen = new Set();
  const pool = [];
  const addCandidate = raw => {
    if(!raw) return;
    const clean = String(raw).trim();
    if(clean.length < 2) return;
    if(!/^[a-záéíóúñü\s]+$/i.test(clean)) return;
    if(!isVocabWorthy(clean)) return;
    const norm = _talkNormForMatch(clean);
    if(seen.has(norm)) return;
    seen.add(norm);
    pool.push(clean);
  };
  try {
    Object.keys(getGardenDB()).forEach(k => {
      const disp = (typeof _gardenChunkDisplay === 'function') ? _gardenChunkDisplay(k) : { text: k, junk: false };
      if(!disp.junk) addCandidate(disp.text);
    });
  } catch(e){}
  if(typeof vocabList !== 'undefined') (vocabList || []).forEach(v => { if(v && v.text) addCandidate(v.text); });
  return pool;
}

function _talkContainsChunk(haystackRaw, chunkRaw){
  const hay = _talkNormForMatch(haystackRaw);
  const needle = _talkNormForMatch(chunkRaw);
  if(!needle) return false;
  const esc = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp('(^|[^a-z])' + esc + '([^a-z]|$)', 'i').test(hay);
}

// 「以前是否出現過」直接讀取歷史entry自己存的keyTakeaway，不重新比對舊voice原文——
// 這樣不會被「picker自動複製、非自己寫的」舊entry污染判定，因為那些entry從一開始
// isFreeWritten就是false，從沒被算進keyTakeaway過。
function _talkAlreadyUsedTakeaways(){
  const used = new Set();
  getTalkDB().forEach(t => (t.keyTakeaway || []).forEach(w => used.add(_talkNormForMatch(w))));
  return used;
}

function _talkComputeKeyTakeaway(voiceText){
  if(!voiceText || !voiceText.trim()) return [];
  const pool = _talkLearnedPool();
  if(!pool.length) return [];
  const alreadyUsed = _talkAlreadyUsedTakeaways();
  const hits = [];
  pool.forEach(chunk => {
    if(alreadyUsed.has(_talkNormForMatch(chunk))) return;
    if(_talkContainsChunk(voiceText, chunk)) hits.push(chunk);
  });
  return hits;
}

// 只保存事實（以前收過→這次自己寫出來→留下來），不評分不解釋，沒有符合項目就整段不渲染。
function _talkKeyTakeawayHtml(entry){
  const items = (entry && entry.keyTakeaway) || [];
  if(!items.length) return '';
  return `<div class="talk-takeaway">
    <div class="talk-takeaway-label">✨ Key Takeaway</div>
    <div class="talk-takeaway-chips">${items.map(w => `<span class="talk-growth-chip is-new">✓ ${_diaryEsc(w)}</span>`).join('')}</div>
    <div class="talk-takeaway-caption">這次真的用出來了</div>
  </div>`;
}

/* ── 📝 隨心一筆：不拘形式的雜記，跟媽媽碎語分開存 ── */

const NOTES_TAGS = [
  { id: 'idea',    label: '💡 靈感／大方向' },
  { id: 'feature', label: '🆕 新功能' },
  { id: 'learn',   label: '📖 學習筆記' },
  { id: 'dev',     label: '🌱 開發萌芽整改' }
];
let _notesSelTag = null;
let _notesEditingId = null;

function getNotesDB(){
  try { return JSON.parse(localStorage.getItem('peppa_mom_notes_v1') || '[]'); } catch(e){ return []; }
}
function saveNotesDB(arr){
  try { localStorage.setItem('peppa_mom_notes_v1', JSON.stringify(arr)); } catch(e){}
}
function _notesFormatTs(ts){
  const d = new Date(ts);
  const m = String(d.getMonth()+1).padStart(2,'0');
  const day = String(d.getDate()).padStart(2,'0');
  const hh = String(d.getHours()).padStart(2,'0');
  const mm = String(d.getMinutes()).padStart(2,'0');
  return `${d.getFullYear()}-${m}-${day} ${hh}:${mm}`;
}
function _notesFindTag(id){
  return NOTES_TAGS.find(t => t.id === id) || null;
}
function notesSelectTag(id){
  _notesSelTag = (_notesSelTag === id) ? null : id;
  _notesRenderTags();
}
function _notesRenderTags(){
  const el = document.getElementById('notesTagPool');
  if(!el) return;
  el.innerHTML = NOTES_TAGS.map(t => {
    const sel = _notesSelTag === t.id;
    return `<button class="diary-chip${sel?' is-selected':''}" onclick="notesSelectTag('${t.id}')">${t.label}</button>`;
  }).join('');
}
function notesSave(){
  const ta = document.getElementById('notesInput');
  if(!ta) return;
  const text = ta.value.trim();
  if(!text){ if(typeof toast === 'function') toast('先寫點什麼再存吧'); return; }
  const db = getNotesDB();
  if(_notesEditingId){
    const idx = db.findIndex(n => n.id === _notesEditingId);
    if(idx !== -1){
      db[idx] = { ...db[idx], text, tag: _notesSelTag, updatedAt: Date.now() };
      saveNotesDB(db);
      if(typeof toast === 'function') toast('✏️ 已更新這則');
    } else {
      // 原本要修訂的那則同時被刪掉了——不要悄悄什麼都不做卻報告「已更新」，
      // 改成存成新的一則，剛打的內容才不會憑空消失
      db.unshift({ id: 'n_' + Date.now(), text, tag: _notesSelTag, createdAt: Date.now() });
      saveNotesDB(db);
      if(typeof toast === 'function') toast('⚠️ 原本那則已經不在了，已幫你存成新的一則');
    }
    _notesEditingId = null;
  } else {
    db.unshift({ id: 'n_' + Date.now(), text, tag: _notesSelTag, createdAt: Date.now() });
    saveNotesDB(db);
    if(typeof toast === 'function') toast('🌱 靈感已收進手札');
  }
  ta.value = '';
  _notesSelTag = null;
  _notesRenderTags();
  _notesUpdateEditingBadge();
  renderNotesList();
  if(typeof checkStorageQuota === 'function') checkStorageQuota();
}

// ── ✏️ 修訂中的持續提示，同 diary 卡片那一套——避免分心後忘記自己正在改哪一則，
// 結果把新寫的內容誤蓋進舊那則裡 ──
function _notesUpdateEditingBadge(){
  const badge = document.getElementById('notesEditingBadge');
  if(!badge) return;
  badge.style.display = _notesEditingId ? 'flex' : 'none';
}
function notesCancelEdit(){
  _notesEditingId = null;
  _notesSelTag = null;
  const ta = document.getElementById('notesInput');
  if(ta) ta.value = '';
  _notesRenderTags();
  _notesUpdateEditingBadge();
  if(typeof toast === 'function') toast('🍃 已取消修訂');
}

function notesEditEntry(id){
  const entry = getNotesDB().find(n => n.id === id);
  if(!entry) return;
  _notesEditingId = id;
  _notesSelTag = entry.tag || null;
  const ta = document.getElementById('notesInput');
  if(ta) ta.value = entry.text || '';
  _notesRenderTags();
  _notesUpdateEditingBadge();
  const card = document.getElementById('notesInput');
  if(card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if(typeof toast === 'function') toast('✏️ 已載入舊稿，改完記得再存一次');
}

function notesDeleteEntry(id){
  const db = getNotesDB().filter(n => n.id !== id);
  saveNotesDB(db);
  renderNotesList();
  if(typeof toast === 'function') toast('🗑️ 已刪除這則');
}
function renderNotesList(){
  const el = document.getElementById('notesListArea');
  if(!el) return;
  const db = getNotesDB();
  if(!db.length){
    el.innerHTML = `<div class="diary-empty-msg">💡 還沒有足跡喔。來寫下今天的田園日誌吧📖</div>`;
    return;
  }
  el.innerHTML = db.map(n => {
    const tag = _notesFindTag(n.tag);
    return `<div class="notes-entry">
    <div class="notes-entry-head">
      <span class="notes-entry-ts">${_notesFormatTs(n.createdAt)}</span>
      ${tag ? `<span class="notes-entry-tagbadge">${tag.label}</span>` : ''}
    </div>
    <div class="notes-entry-text">${_diaryEsc(n.text).replace(/\n/g,'<br>')}</div>
    <div class="diary-entry-actions">
      <button class="diary-entry-edit" onclick="notesEditEntry('${n.id}')">✏️ 修訂</button>
      <button class="diary-entry-del" onclick="notesDeleteEntry('${n.id}')">🗑️ 刪除</button>
    </div>
  </div>`;
  }).join('');
}
function renderNotesCardHtml(){
  return `<div class="diary-card diary-paper card-container">
    <div class="diary-paper-title">🌱 靈感孵化與開發者手札</div>
    <div class="diary-card-sub">看一句想到十句延伸？開發靈感、學習方向，通通歡迎丟在這裡</div>
    <div id="notesEditingBadge" class="diary-editing-badge" style="display:none">
      <span id="notesEditingBadgeText">✏️ 正在修訂這則舊足跡，改完記得再存一次</span>
      <button class="diary-editing-cancel" onclick="notesCancelEdit()">取消修訂</button>
    </div>
    <div class="diary-chip-row" id="notesTagPool"></div>
    <textarea id="notesInput" class="diary-draft-textarea" rows="4" placeholder="在風和日麗的這裡，留下你的耕耘點滴、心情小記…"></textarea>
    <div class="diary-draft-actions">
      <button id="btn-save-misc" class="diary-btn-save" onclick="notesSave()">🌾 收進穀倉</button>
    </div>
    <div class="diary-list-title">📋 耕耘足跡</div>
    <div id="notesListArea" class="diary-list-area"></div>
  </div>`;
}

function initDiaryCard(){
  const container = document.getElementById('mom-atm-container');
  if(!container) return;
  container.insertAdjacentHTML('afterbegin', renderDiaryCardHtml() + renderDiaryConnectorHtml() + renderTalkCardHtml() + renderNotesCardHtml());
  const dateInput = document.getElementById('diaryDateInput');
  if(dateInput) dateInput.value = _diaryTodayISO();
  _diaryRenderKids();
  _diaryRenderMoods();
  _diaryRenderWeather();
  diaryRegenerateDraft();
  renderDiaryList();
  _talkRenderPicker();
  renderTalkList();
  _notesRenderTags();
  renderNotesList();
}

document.addEventListener('DOMContentLoaded', initDiaryCard);

// ── 離開頁面前，若有尚未存檔的日記/雜記內容就跳出瀏覽器原生警語 ──
function hasUnsavedDiaryContent(){
  const secretNotes = (document.getElementById('mama-secret-notes') || {}).value || '';
  const notesText = (document.getElementById('notesInput') || {}).value || '';
  const talkNote = (document.getElementById('talkDraftNote') || {}).value || '';
  const talkVoice = (document.getElementById('talkMamaVoice') || {}).value || '';
  diaryOnKidNoteInput();
  return !!(secretNotes.trim() || notesText.trim() || talkNote.trim() || talkVoice.trim() || _talkSelectedIds.length || _diaryHasKidNotes() || _diarySelMoods.length || _diarySelWeather || _diaryDraftDirty);
}
window.addEventListener('beforeunload', function(e){
  if(hasUnsavedDiaryContent()){
    e.preventDefault();
    e.returnValue = '';
  }
});
