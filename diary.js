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
function diaryToggleMood(id){
  const i = _diarySelMoods.indexOf(id);
  if(i===-1) _diarySelMoods.push(id); else _diarySelMoods.splice(i,1);
  _diaryRenderMoods();
  diaryRegenerateDraft();
}
function diarySelectWeather(id){
  _diarySelWeather = (_diarySelWeather===id) ? null : id;
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
    }
    saveDiaryDB(db);
    diaryAdvanceGardenMoods(moodEsList);
    if(typeof toast === 'function') toast('✏️ 已更新這篇 Vivencias de mamá');
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

/* ── 💬 聊療吾心語：三步驟（①語塊+空白欄 ②自動中文對照 ③媽媽原音擴寫），跟媽媽碎語分開存 ── */

let _talkSelectedIds = [];

function getTalkDB(){
  try { return JSON.parse(localStorage.getItem('peppa_talk_diary_v1') || '[]'); } catch(e){ return []; }
}
function saveTalkDB(arr){
  try { localStorage.setItem('peppa_talk_diary_v1', JSON.stringify(arr)); } catch(e){}
}
function _talkGetUnlockedAmmo(){
  if(typeof AMMO_DATA === 'undefined' || typeof ammoUnlocked === 'undefined') return [];
  return AMMO_DATA.filter(a => ammoUnlocked.includes(a.ammo_id));
}

function _talkRenderPicker(){
  const el = document.getElementById('talkPickerPool');
  if(!el) return;
  const unlocked = _talkGetUnlockedAmmo();
  if(!unlocked.length){
    el.innerHTML = `<div class="diary-empty-msg">還沒有解鎖任何語塊喔，先去 🌾 田間播語塊完成幾句吧</div>`;
    return;
  }
  el.innerHTML = unlocked.map(a => {
    const idx = _talkSelectedIds.indexOf(a.ammo_id);
    const sel = idx !== -1;
    const badge = sel ? `<span class="diary-mood-order">${idx+1}</span>` : '';
    return `<button class="diary-chip diary-mood-chip${sel?' is-selected':''}" onclick="talkSelectAmmo('${a.ammo_id}')">${badge}${_diaryEsc(a.core_ammo)}</button>`;
  }).join('');
}

function talkSelectAmmo(id){
  const i = _talkSelectedIds.indexOf(id);
  if(i === -1){
    _talkSelectedIds.push(id);
    // 選中的句子同步跟到下面的空白欄，方便直接在原句基礎上調整/插入自己的話
    const a = AMMO_DATA.find(x => x.ammo_id === id);
    const noteTa = document.getElementById('talkDraftNote');
    if(a && noteTa && !noteTa.value.includes(a.core_ammo)){
      noteTa.value = noteTa.value ? (noteTa.value + '\n' + a.core_ammo) : a.core_ammo;
    }
  } else {
    _talkSelectedIds.splice(i,1);
  }
  _talkRenderPicker();
  _talkRenderPreview();
}

function talkOnNoteInput(){
  // 空白欄內容即時記著，選好句子的當下會自動預帶進媽媽原音（見 _talkRenderPreview）
}

function _talkRenderPreview(){
  const box = document.getElementById('talkPreviewBox');
  const step3 = document.getElementById('talkStep3');
  if(!box || !step3) return;
  const picked = _talkSelectedIds.map(id => AMMO_DATA.find(x => x.ammo_id === id)).filter(Boolean);
  if(!picked.length){
    box.style.display = 'none';
    step3.style.display = 'none';
    return;
  }
  box.style.display = 'block';
  box.innerHTML = picked.map(a => `
    <div class="card-spanish-body">${_diaryEsc(a.core_ammo)}</div>
    <div class="card-chinese-translation">${_diaryEsc(a.core_zh)}</div>
  `).join('<hr style="border:none;border-top:1px dashed var(--usumizu);margin:8px 0">');
  step3.style.display = 'block';
  const noteTa = document.getElementById('talkDraftNote');
  const voiceTa = document.getElementById('talkMamaVoice');
  if(voiceTa && !voiceTa.value && noteTa && noteTa.value){
    voiceTa.value = noteTa.value;
  }
}

function talkSave(){
  if(!_talkSelectedIds.length){ if(typeof toast === 'function') toast('先選至少一句已解鎖的語塊吧'); return; }
  const picked = _talkSelectedIds.map(id => AMMO_DATA.find(x => x.ammo_id === id)).filter(Boolean);
  if(!picked.length) return;
  const voice = (document.getElementById('talkMamaVoice') || {}).value || '';
  const db = getTalkDB();
  db.unshift({
    id: 'talk_' + Date.now(),
    ammoIds: _talkSelectedIds.slice(),
    sentences: picked.map(a => ({ es: a.core_ammo, zh: a.core_zh })),
    voice,
    createdAt: Date.now()
  });
  saveTalkDB(db);

  _talkSelectedIds = [];
  const noteTa = document.getElementById('talkDraftNote'); if(noteTa) noteTa.value = '';
  const voiceTa = document.getElementById('talkMamaVoice'); if(voiceTa) voiceTa.value = '';
  _talkRenderPicker();
  _talkRenderPreview();
  renderTalkList();
  if(typeof toast === 'function') toast('💬 已存成一篇聊療吾心語');
  if(typeof checkStorageQuota === 'function') checkStorageQuota();
}

function talkDeleteEntry(id){
  const db = getTalkDB().filter(t => t.id !== id);
  saveTalkDB(db);
  renderTalkList();
  if(typeof toast === 'function') toast('🗑️ 已刪除這則');
}

function renderTalkList(){
  const el = document.getElementById('talkListArea');
  if(!el) return;
  const db = getTalkDB();
  if(!db.length){
    el.innerHTML = `<div class="diary-empty-msg">還沒有任何心語紀錄，選一句語塊開始吧</div>`;
    return;
  }
  el.innerHTML = db.map(t => {
    const sentences = t.sentences || (t.es ? [{ es: t.es, zh: t.zh }] : []); // 相容舊版單句資料
    const sentHtml = sentences.map(s => `
      <div class="card-spanish-body">${_diaryEsc(s.es)}</div>
      <div class="card-chinese-translation">${_diaryEsc(s.zh)}</div>
    `).join('<hr style="border:none;border-top:1px dashed var(--usumizu);margin:6px 0">');
    return `
    <div class="notes-entry">
      <div class="notes-entry-head">
        <span class="notes-entry-ts">${_notesFormatTs(t.createdAt)}</span>
      </div>
      ${sentHtml}
      ${t.voice ? `<div class="notes-entry-text">${_diaryEsc(t.voice).replace(/\n/g,'<br>')}</div>` : ''}
      <div class="diary-entry-actions">
        <button class="diary-entry-del" onclick="talkDeleteEntry('${t.id}')">🗑️ 刪除</button>
      </div>
    </div>`;
  }).join('');
}

function renderTalkCardHtml(){
  return `<div class="diary-card diary-paper card-container">
    <div class="diary-paper-title">💬 聊療吾心語</div>
    <div class="diary-card-sub">① 挑幾句已解鎖的語塊（可複選、依序接續，點下去會同步跟到下面），自己調整、插入想法 → ② 自動對照中文 → ③ 擴寫成媽媽原音</div>

    <div class="diary-chip-row" id="talkPickerPool"></div>

    <textarea id="talkDraftNote" class="diary-draft-textarea" rows="4" placeholder="① 選好的句子會同步跟到這裡，自己調整、插入想法…" oninput="talkOnNoteInput()"></textarea>

    <div class="make-pattern-box" id="talkPreviewBox" style="display:none"></div>

    <div id="talkStep3" style="display:none">
      <div class="diary-secret-row">
        <div class="diary-secret-label">📝 媽媽原音</div>
        <textarea id="talkMamaVoice" rows="5" class="handwritten-style" placeholder="把①的想法再擴寫一下…"></textarea>
      </div>
      <div class="diary-draft-actions">
        <button class="diary-btn-save" onclick="talkSave()">💬 存成一篇心語</button>
      </div>
    </div>

    <div class="diary-list-title">💬 心語紀錄</div>
    <div id="talkListArea" class="diary-list-area"></div>
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
    if(idx !== -1) db[idx] = { ...db[idx], text, tag: _notesSelTag, updatedAt: Date.now() };
    saveNotesDB(db);
    _notesEditingId = null;
    if(typeof toast === 'function') toast('✏️ 已更新這則');
  } else {
    db.unshift({ id: 'n_' + Date.now(), text, tag: _notesSelTag, createdAt: Date.now() });
    saveNotesDB(db);
    if(typeof toast === 'function') toast('🌱 靈感已收進手札');
  }
  ta.value = '';
  _notesSelTag = null;
  _notesRenderTags();
  renderNotesList();
  if(typeof checkStorageQuota === 'function') checkStorageQuota();
}

function notesEditEntry(id){
  const entry = getNotesDB().find(n => n.id === id);
  if(!entry) return;
  _notesEditingId = id;
  _notesSelTag = entry.tag || null;
  const ta = document.getElementById('notesInput');
  if(ta) ta.value = entry.text || '';
  _notesRenderTags();
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
  container.insertAdjacentHTML('afterbegin', renderDiaryCardHtml() + renderTalkCardHtml() + renderNotesCardHtml());
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
