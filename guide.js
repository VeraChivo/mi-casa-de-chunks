/* 頁內新手指引：只保存路線選擇；時間/能量沿用今日耕耘，學習紀錄仍由原系統管理。 */
const LearningGuide = (() => {
  const KEY = 'peppa_learning_preferences_v1';
  const ROUTES = [
    {key:'a1', level:'A1', icon:'🌱', title:'先讓我說出一句',
      desc:'有範例和提示，我比較容易開口。', episode:16, sample:0,
      task:'聽一句、理解意思，再替換一個部分。',
      tip:'先聽一次。把句子裡的名字、人物或事物，換成自己的內容。'},
    {key:'a2', level:'A2', icon:'🌿', title:'陪我把話接下去',
      desc:'我會一些生活句子，想在情境裡多說一點。', episode:18, sample:0,
      task:'讀一段日常，把角色的狀態換成自己的。',
      tip:'先猜意思，再看中文。試著用這個說法描述今天的自己，多補一句也可以。'},
    {key:'b1', level:'B1 深化', icon:'🏡', title:'我想把意思說完整',
      desc:'我想多說經驗、原因與想法。', episode:10, sample:0,
      task:'從故事延伸自己的經驗，需要時查文法。',
      tip:'讀完後，用自己的話說說相似的經驗，再補一個原因。想弄懂用法，可看「這句的文法點」。'}
  ];
  const ENERGY = {low:'省電', normal:'剛好', high:'充足'};
  const PORTIONS = {10:{low:1,normal:3,high:4},20:{low:2,normal:5,high:6},30:{low:3,normal:7,high:10}};
  let choice, session = null, initialized = false;
  const $ = id => document.getElementById(id);
  const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const routeFor = key => ROUTES.find(r => r.key === key) || ROUTES[0];
  function readChoice(){
    let saved;
    try{ saved = JSON.parse(localStorage.getItem(KEY) || 'null'); }catch(e){}
    return {route:routeFor(saved && saved.route).key, pending:!!(saved && saved.pending)};
  }
  function persist(){
    try{ localStorage.setItem(KEY, JSON.stringify(choice)); return true; }catch(e){ return false; }
  }
  function arrangement(){
    const st = getDailyTaskState();
    return {minutes:PORTIONS[st.tier] ? st.tier : 10, energy:ENERGY[st.energy] ? st.energy : 'low'};
  }
  function hasProgress(){ return Object.values(answeredByEp).some(a => Array.isArray(a) && a.length); }
  function source(route){ return EPS[route.episode].sentences[route.sample]; }
  function shouldResume(){ return !choice.pending && (hasProgress() || idx > 0); }
  function scrollTo(id, focus = false){
    const el = $(id);
    if(!el) return;
    el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',block:'start'});
    if(focus) el.focus({preventScroll:true});
  }
  function markSeen(){
    try{
      localStorage.setItem('peppa_welcome_tour_seen_v1','1');
      localStorage.setItem('peppa_brief_day_v1',String(Math.floor(Date.now()/86400000)));
    }catch(e){}
  }
  function renderHome(){
    const root = $('learningEntry');
    if(!root) return;
    const route = routeFor(choice.route), plan = arrangement(), resume = shouldResume();
    const sample = resume ? cur() : source(route);
    const currentEpisode = resume ? ep : route.episode;
    root.innerHTML = `
      <div class="guide-eyebrow" lang="es">UN POCO, CADA DÍA</div>
      <h1 id="learningEntryTitle">今天，從一句<br>用得到的西語開始。</h1>
      <p class="guide-intro">跟著故事聽一句，換成自己的話，<br>再慢慢帶進生活。</p>
      <div class="guide-sample">
        <div class="guide-sample-head"><span>${resume ? '接著上次' : '這次的起點'} · ${escapeHTML(EPS[currentEpisode].titleZh)}</span><button type="button" class="guide-listen" data-guide-action="listen" aria-label="聽聽這一句">${GUIDE_SPEAKER_ICON} 聽一句</button></div>
        <p class="guide-sample-es" lang="es">${escapeHTML(sample.es)}</p>
        <details class="guide-translation"><summary>看中文意思 <span aria-hidden="true">＋</span></summary><p>${escapeHTML(sample.zh)}</p></details>
      </div>
      <button type="button" class="guide-primary" data-guide-action="start">${resume ? '接著上次的故事' : choice.route === 'a1' ? '開始第一句' : '開始這段故事'} <span aria-hidden="true">→</span></button>
      <div class="guide-plan"><span id="guidePlanText">${route.level} · ${plan.minutes} 分鐘 · ${ENERGY[plan.energy]}</span><button type="button" class="guide-text-btn" data-guide-action="settings" aria-controls="guideSettings" aria-expanded="false">調整</button></div>
      ${settingsHTML(route, plan)}
      <details id="guideHow" class="guide-details">
        <summary>看看這裡怎麼學 <span aria-hidden="true">＋</span></summary>
        <div class="guide-details-body">
          <ol class="guide-steps"><li><strong>聽故事</strong><span>點句子或語塊聽聲音，影片想看再播放。</span></li><li><strong>理解語塊</strong><span>先猜意思，中文和說明需要時再看。</span></li><li><strong>換成自己的話</strong><span>從熟悉的說法，換一個名字或心情。</span></li><li><strong>回來複習</strong><span>收藏想留的句子，練習時再照顧熟練度。</span></li></ol>
          <div class="guide-map">
            <button type="button" data-guide-action="map-play"><strong>跟故事學語塊</strong><span>🌾 田間播語塊</span></button>
            <button type="button" data-guide-action="map-know"><strong>從例句查用法</strong><span>☀️ 日光育苗場</span></button>
            <button type="button" data-guide-action="map-mom"><strong>寫下自己的生活</strong><span>🛌 床邊低語呢</span></button>
            <button type="button" data-guide-action="map-private"><strong>回顧與備份</strong><span>🗃️ 穀倉大豐收</span></button>
          </div>
          <p class="guide-note">💎 收藏是書籤；🌻 花園記錄熟練度；🐛 抓蟲幫你複習。進度留在這個瀏覽器，換裝置前記得備份。</p>
        </div>
      </details>
      <details class="guide-details">
        <summary>卡住時，找個幫手 <span aria-hidden="true">＋</span></summary>
        <div class="guide-details-body">
          <p>先用站內聲音練一句。想找更多發音或例句，就到工具間；想多聊幾句，再把學過的話帶進 AI 對話。</p>
          <div class="guide-helper-links"><button type="button" class="guide-secondary" data-guide-action="tools">查發音與例句</button><a href="ai-companion-starter.txt" download class="guide-secondary">小伴侶設定包 ↓</a><button type="button" class="guide-text-btn" data-guide-action="culture">探索拉美文化 →</button></div>
          <p class="guide-note">設定包需自行貼到你使用的 AI 對話。外部平台的語音與記憶功能各有不同。</p>
        </div>
      </details>
      <p id="guideStatus" class="guide-status" role="status" aria-live="polite"></p>`;
    root.querySelector('form').addEventListener('submit', saveSettings);
    root.querySelector('form').addEventListener('change', updatePreview);
    root.onclick=handleClick;
  }
  const GUIDE_SPEAKER_ICON = '<span aria-hidden="true">▷</span>';
  function settingsHTML(route, plan){
    return `<div id="guideSettings" class="guide-settings" hidden>
      <form id="guideSettingsForm">
        <fieldset class="guide-route-list"><legend>選擇練習起點</legend><p class="guide-note">這是練習方式，隨時可以換。所有內容都能自由探索。</p>
          ${ROUTES.map(r => `<label class="guide-route"><input type="radio" name="guideRoute" value="${r.key}" ${r.key===route.key?'checked':''}><span class="guide-route-content"><span class="guide-route-head"><strong>${r.title}</strong><span class="guide-level">${r.level}</span></span><span class="guide-route-desc">${r.desc}</span><span class="guide-route-example" lang="es">${escapeHTML(source(r).es)}</span><span class="guide-route-task">${r.task}</span></span></label>`).join('')}
        </fieldset>
        <button type="button" class="guide-text-btn guide-unsure" data-guide-action="try">還不確定？先試一句 →</button>
        <fieldset><legend>留多少時間？</legend><div class="guide-choice-row">${[10,20,30].map(n=>`<label><input type="radio" name="guideMinutes" value="${n}" ${plan.minutes===n?'checked':''}><span>${n} 分鐘</span></label>`).join('')}</div></fieldset>
        <fieldset><legend>今天的能量</legend><div class="guide-choice-row">${Object.entries(ENERGY).map(([key,label])=>`<label><input type="radio" name="guideEnergy" value="${key}" ${plan.energy===key?'checked':''}><span>${label}</span></label>`).join('')}</div></fieldset>
        <p id="guidePortion" class="guide-note"></p><p id="guideReplanNote" class="guide-note" hidden>更改時間或能量會重新安排今日耕耘任務，學習紀錄仍保留。</p>
        <button class="guide-secondary guide-save" type="submit">儲存設定</button>
      </form>
    </div>`;
  }
  function draft(){
    const data = new FormData($('guideSettingsForm'));
    const minutes = Number(data.get('guideMinutes')), energy = data.get('guideEnergy');
    return {route:routeFor(data.get('guideRoute')).key, minutes:PORTIONS[minutes]?minutes:10, energy:ENERGY[energy]?energy:'low'};
  }
  function updatePreview(){
    const d = draft(), r = routeFor(d.route), old = getDailyTaskState();
    $('guidePortion').textContent = `這次建議 ${PORTIONS[d.minutes][d.energy]} 句。${r.task}不倒數，想停就停。`;
    $('guideReplanNote').hidden = !(Array.isArray(old.doneIdx) && old.doneIdx.length && (old.tier!==d.minutes || old.energy!==d.energy));
  }
  function applyDraft(){
    const d = draft();
    if(choice.route !== d.route){ choice.route = d.route; choice.pending = true; }
    const st = getDailyTaskState();
    if(st.tier !== d.minutes || st.energy !== d.energy){
      st.tier=d.minutes; st.energy=d.energy; st.doneIdx=[];
      saveDailyTaskState(st); renderDailyTask();
    }
    return persist();
  }
  function saveSettings(event){
    event.preventDefault();
    const saved = applyDraft();
    renderHome();
    $('guideStatus').textContent = saved ? '已儲存。下次開始練習時套用，原有學習紀錄都保留。' : '已套用這次的路線；目前瀏覽器無法儲存設定。';
    $('learningEntry').querySelector('[data-guide-action="settings"]').focus({preventScroll:true});
  }
  function openSettings(){
    switchMainTab('play');
    const panel = $('guideSettings');
    if(!panel) return;
    panel.hidden = false;
    $('learningEntry').querySelector('[data-guide-action="settings"]').setAttribute('aria-expanded','true');
    updatePreview();
    scrollTo('guideSettings');
    panel.querySelector('input:checked').focus({preventScroll:true});
  }
  function start(forceFirst = false){
    if(forceFirst){
      $('guideSettingsForm').elements.guideRoute.value='a1';
      choice.pending=true;
    }
    applyDraft();
    const route = routeFor(choice.route), plan = arrangement(), resume = !forceFirst && shouldResume();
    choice.pending=false; persist(); markSeen();
    session={route:route.key, count:new Set(), portion:forceFirst?1:PORTIONS[plan.minutes][plan.energy], energy:plan.energy};
    switchMainTab('play');
    if(!resume) selectEp(route.episode, true);
    else renderSession();
    const picker = $('episodePicker'); if(picker) picker.open=false;
    renderHome(); renderSession();
    scrollTo('guidedPractice',true);
  }
  function renderSession(){
    if(!initialized) return;
    const root = $('guidedPractice');
    if(!session){ root.hidden=true; return; }
    const r = routeFor(session.route), done = session.count.size >= session.portion;
    const gId = SENTENCE_GRAMMAR_MAP[currentGlobalIdx()];
    const canMake = (SENTENCE_AMMO_MAP2[currentGlobalIdx()]||[]).length > 0;
    root.hidden=false; root.tabIndex=-1;
    const helperOpen = !!root.querySelector('details[open]');
    root.innerHTML = `<div class="guide-session-head"><span>${r.level} · ${ENERGY[session.energy]}練習</span><button type="button" class="guide-text-btn" data-guide-action="finish">先到這裡</button></div>
      <h2>${done ? '這一小段，走完了。' : '先聽這一句，再換成自己的話。'}</h2>
      <p>${done ? '想休息就先停在這裡，也可以繼續往下讀。' : session.energy==='low' ? '今天只聽、只看也可以。中文需要時再打開。' : r.tip}</p>
      <p class="guide-session-count" role="status">這次已看過 ${session.count.size} 句 · 建議 ${session.portion} 句</p>
      <div class="guide-session-actions"><button type="button" class="guide-secondary" data-guide-action="current-audio">▷ 聽這一句</button>${canMake&&session.energy!=='low'?'<button type="button" class="guide-secondary" data-guide-action="make">換成自己的話 →</button>':''}${session.route==='b1'&&session.energy!=='low'?'<button type="button" class="guide-secondary" data-guide-action="diary">寫下自己的經驗 →</button>':''}${gId&&session.route==='b1'?`<button type="button" class="guide-text-btn" data-guide-action="grammar">看這句的用法 →</button>`:''}</div>
      <details class="guide-ai" ${helperOpen?'open':''}><summary>想用這句，和 AI 多聊幾句 <span aria-hidden="true">＋</span></summary><p>複製下方文字，貼進你使用的 AI 對話。</p><textarea id="guideAIPrompt" readonly rows="5" aria-label="AI 陪練提示詞">${escapeHTML(aiPrompt())}</textarea><div class="guide-helper-links"><button type="button" class="guide-secondary" data-guide-action="copy">複製陪練提示詞</button><a href="ai-companion-starter.txt" download class="guide-text-btn">小伴侶設定包 ↓</a></div><p id="guideCopyStatus" role="status"></p></details>`;
    root.onclick=handleClick;
  }
  function aiPrompt(){
    const r = routeFor(session ? session.route : choice.route);
    return `請陪我練習拉丁美洲西班牙語，使用台灣繁體中文引導。這次以 ${r.level} 的練習深度開始。我剛讀到的故事原句是「${cur().es}」。請從這句的情境開始，一次只問一個簡單問題，等我回答。卡住時先給提示，回應我的意思後，再示範一句自然的說法。${session&&session.energy==='low'?'我今天低能量，只陪我聊一兩句。':''}`;
  }
  async function copyPrompt(){
    const field = $('guideAIPrompt');
    try{
      if(!navigator.clipboard) throw new Error('unavailable');
      await navigator.clipboard.writeText(field.value);
      $('guideCopyStatus').textContent='已複製，貼到你的 AI 對話就能開始。';
    }catch(e){
      field.focus(); field.select();
      $('guideCopyStatus').textContent='請長按上方文字複製，或使用鍵盤複製。';
    }
  }
  function handleClick(event){
    const button = event.target.closest('[data-guide-action]');
    if(!button) return;
    const action = button.dataset.guideAction;
    if(action==='listen'){
      const r=routeFor(choice.route), resume=shouldResume();
      const s=resume?cur():source(r); speakSentenceSmart(resume?ep:r.episode,resume?idx:r.sample,s.es);
    }
    else if(action==='settings'){
      if(!$('guideSettings').hidden){ $('guideSettings').hidden=true; button.setAttribute('aria-expanded','false'); }
      else openSettings();
    }
    else if(action==='start') start();
    else if(action==='try') start(true);
    else if(action==='tools') openWorkshopPanel();
    else if(action==='culture') openWorldEntryPanel();
    else if(action.startsWith('map-')){ const target=action.slice(4); switchMainTab(target); scrollTo(target==='play'?'episodePicker':'tab'+({know:'Know',mom:'Mom',private:'Private'}[target])); }
    else if(action==='finish'){
      session=null; renderSession(); renderHome(); scrollTo('learningEntry');
      $('learningEntry').querySelector('[data-guide-action="start"]').focus({preventScroll:true});
    }
    else if(action==='current-audio') speakSentenceSmart(ep,idx,cur().es);
    else if(action==='make'){
      const id=(SENTENCE_AMMO_MAP2[currentGlobalIdx()]||[])[0]; if(id) jumpToMake(id);
    }
    else if(action==='diary') jumpToDiaryWithSentence();
    else if(action==='grammar'){
      const id=SENTENCE_GRAMMAR_MAP[currentGlobalIdx()]; if(id) openGrammarCard(id);
    }
    else if(action==='copy') copyPrompt();
  }
  function init(){ choice=readChoice(); initialized=true; renderHome(); }
  function syncHome(){
    if(initialized && $('guideSettings')?.hidden && !$('learningEntry').querySelector('details[open]')) renderHome();
  }
  function onSentence(){ if(initialized){ renderSession(); syncHome(); } }
  function onReveal(){ if(session){ session.count.add(currentGlobalIdx()); renderSession(); syncHome(); } }
  function showHow(){
    switchMainTab('play'); $('guideHow').open=true; scrollTo('guideHow');
    $('guideHow').querySelector('summary').focus({preventScroll:true});
  }
  return {init, openSettings, showHow, onSentence, onReveal, syncHome};
})();
