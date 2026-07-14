const MOM_ATM_DATA = {
  sel_phrases: {
    title: "🛡️ 【 情緒會說話 】獨立 SEL 情緒調節卡",
    description: "孩子崩潰、鬧脾氣、或媽媽自己需要冷靜時的魔法護身符。",
    items: [
      { es: "¿Cómo te sientes?",          zh: "妳現在覺得怎麼樣？",     tag: "引導覺察" },
      { es: "Está bien estar enojado.",    zh: "生氣沒關係喔。",         tag: "無條件接納" },
      { es: "Vamos a respirar.",           zh: "來，我們一起深呼吸。",   tag: "魔法冷靜" },
      { es: "Mamá está aquí.",             zh: "媽媽在這裡喔。",         tag: "核心安全感" }
    ]
  },
  mom_daily: {
    title: "🎀 【 馬麻有話講 】萬用對話",
    description: "日常直接派上用場完整高頻句",
    items: [
      { es: "Puedo darte un abrazo.",           zh: "媽媽可以抱妳一個嗎？",        tag: "puedo",  scene: "cozy" },
      { es: "Puedo ayudarte, mi amor.",         zh: "寶貝，媽媽可以幫妳喔。",      tag: "puedo",  scene: "daily" },
      { es: "¿Puedes juntar los juguetes?",     zh: "妳可以把玩具收一收嗎？",      tag: "puedes", scene: "clean_up" },
      { es: "¿Puedes venir aquí un momento?",   zh: "妳可以過來一下嗎？",          tag: "puedes", scene: "daily" },
      { es: "Debes lavarte las manos.",         zh: "妳要去洗手啦！",              tag: "debes",  scene: "meal" },
      { es: "¡Debes tener cuidado!",            zh: "妳要小心一點喔！",            tag: "debes",  scene: "play" },
      { es: "Ya debe ir a la cama.",            zh: "他該去床上躺躺了（要睡了）。", tag: "debe",   scene: "bedtime" }
    ]
  },
  peppa_chunks: {
    title: "👩🏻 【 馬麻小情緒 】& 🐱 【 情緒這樣說 】實戰感知卡",
    description: "日常最常掛嘴邊、整句直接套用的生活短句與睡前呢喃。",
    items: [
      { es: "¡Buenas noches, mi amor!",          zh: "寶貝，晚安囉！",                                                                           tag: "睡前呢喃",   scene: "bedtime" },
      { es: "Es hora de apagar la luz.",         zh: "要把燈燈關掉囉。",                                                                         tag: "睡前指令",   scene: "bedtime" },
      { es: "Cierra los ojos, mi vida.",         zh: "把眼睛閉閉囉，小寶貝。",                                                                   tag: "溫柔指令",   scene: "bedtime" },
      { es: "Cuéntame tu día.",                  zh: "跟媽媽說說妳今天好玩的事。",                                                               tag: "躺著聊天",   scene: "bedtime" },
      { es: "¿Qué fue lo más divertido hoy?",   zh: "妳今天覺得最棒、最開心的是什麼呀？",                                                       tag: "躺著聊天",   scene: "bedtime" },
      { es: "Te quiero hasta la luna.",          zh: "媽媽對妳的愛有從這裡到月球那麼多喔。",                                                     tag: "核心安全感", scene: "bedtime" },
      { es: "Que tengas dulces sueños.",         zh: "祝妳有一個甜甜的好夢。",                                                                   tag: "睡前祝願",   scene: "bedtime" },
      { es: "Mañana será otro gran día.",        zh: "明天又會是很棒的一天喔！",                                                                 tag: "睡前安心",   scene: "bedtime" },
      { es: "Mamá siempre te va a cuidar.",      zh: "媽媽會一直一直守護妳喔。",                                                                 tag: "核心安全感", scene: "bedtime" },
      { es: "Ya es hora de descansar.",          zh: "該好好休息囉，辛苦囉。",                                                                   tag: "溫柔指令",   scene: "bedtime" },
      { es: "¡Es hora de dormir!",               zh: "該睡覺囉！/ 睡覺時間到囉！",                                                               tag: "生活指令",   scene: "bedtime" },
      { es: "¡Qué divertido!",                   zh: "真好玩！/ 太有趣了吧！\n例：¡Qué divertido es jugar juntos! 一起玩真好玩！",              tag: "互動情緒" },
      { es: "¡Me encanta!",                      zh: "我超喜歡這個的！\n例：¡Me encanta este juguete! 我超喜歡這個玩具！",                      tag: "互動情緒" },
      { es: "¡Qué bien!",                        zh: "太棒了！/ 太好了！\n例：¡Qué bien que viniste! 你能來真是太好了！",                       tag: "日常鼓勵" },
      { es: "charcos de lodo",                   zh: "泥坑\n例：Nita salta en los charcos de lodo. 妮妲在泥坑裡跳。",                          tag: "妮妲靈魂" },
      { es: "¡A Nita le encanta saltar en los charcos de lodo!", zh: "妮妲最喜歡在泥坑裡跳來跳去了！",                                         tag: "經典故事" },
      { es: "¡Vamos!",                           zh: "我們走吧！/ 快點喔！\n例：¡Vamos al parque! 我們去公園吧！",                              tag: "生活指令" },
      { es: "¡Date prisa!",                      zh: "快一點！/ 趕快！\n例：¡Date prisa, el tren se va! 快點，火車要開了！",                    tag: "生活指令" },
      { es: "por favor",                         zh: "請⋯（拜託啦）\n例：Un vaso de agua, por favor. 請給我一杯水。",                           tag: "生活指令" },
      { es: "gracias",                           zh: "謝謝\n例：Muchas gracias por la comida. 非常謝謝這頓飯。",                                 tag: "生活指令" },
      { es: "¡Esqueleto!",                      zh: "骷髏！\n例：A Tito le gusta su esqueleto. 迪多喜歡他的骷髏。",                          tag: "迪多專區" },
      { es: "¡Mira, Tito!",                    zh: "迪多你看！\n例：¡Mira, Tito, un globo! 迪多你看，一個氣球！",                           tag: "吸引注意" },
      { es: "¡Logrado!",                         zh: "搞定了！/ 挑戰成功！\n例：¡Logrado! Terminamos la tarea. 搞定了！我們完成任務了。",        tag: "大成功提示" },
      { es: "¡Ve a pegarlo!",                    zh: "去貼上吧！/ 把它貼上去！\n例：¡Ve a pegarlo en tu cuaderno! 去把它貼在筆記本上吧！",      tag: "輸出發射" }
    ]
  }
};

const MOM_TAG_GID_MAP = { puedo:'g10', puedes:'g10', puede:'g10', podemos:'g10', debe:'g11', debes:'g11', debo:'g11', debemos:'g11' };
const MOM_AUDIO_KEY_MAP = { sel_phrases:'sel', mom_daily:'daily', peppa_chunks:'chunks' };

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('mom-atm-container');
  if (!container) return;

  let html = `<div class="nocturno-btn-wrap">
    <button class="nocturno-toggle-btn" onclick="toggleNocturnoMode(this)">
      <span class="btn-icon">🌙</span>
      <span class="btn-text">睡前斷電模式</span>
    </button>
  </div>`;

  for (const key in MOM_ATM_DATA) {
    const cat = MOM_ATM_DATA[key];
    const tagClass = (key === 'mom_daily') ? 'type-c' : 'type-d';

    html += `<div class="mom-category card-container">
      <div class="ammo-book-top mom-cat-header" onclick="toggleMomCategory('${key}')" style="cursor:pointer;display:flex;justify-content:space-between;align-items:center;background:linear-gradient(135deg,var(--benikake),var(--misora))">
        <div>
          <div class="pb-book-title">${cat.title}</div>
          <div class="pb-book-sub">${cat.description}</div>
        </div>
        <span id="momCatToggle_${key}" style="color:white;font-size:12px;font-weight:800">▼ 展開</span>
      </div>
      <div id="momCatBody_${key}" class="ammo-body">
      <div class="mom-cards-col">`;

    const audioShort = MOM_AUDIO_KEY_MAP[key];
    cat.items.forEach((item, itemIdx) => {
      const [zhMain, zhEx] = item.zh.split('\n');
      // 有例句的話，改用例句的西文/中文當主要顯示，不再疊加原本孤立的短句/單字
      let displayEs = item.es, displayZh = zhMain;
      if (zhEx) {
        const m = zhEx.match(/^例：([\s\S]+?)\s+([一-鿿][\s\S]*)$/);
        if (m) { displayEs = m[1]; displayZh = m[2]; }
      }

      const lineHtml = (typeof renderScriptLine === 'function')
        ? renderScriptLine(displayEs)
        : displayEs;

      if (typeof detectGestalt === 'function' && typeof triggerAutoWrite === 'function') {
        const words = item.es.split(/\s+/);
        for (let i = 0; i < words.length; ) {
          const r = detectGestalt(words, i);
          if (r.match) {
            if (r.type === 'verb_action' && r.gId) triggerAutoWrite(r.verbForm, r.assoc, r.gId, true, zhMain, item.es);
            i += r.length;
          } else { i++; }
        }
      }

      const scene = item.scene || '';
      const tagGid = MOM_TAG_GID_MAP[item.tag];
      const tagHtml = tagGid
        ? `<span class="gestalt-tag ${tagClass} tag-clickable" onclick="jumpToConjLib('${tagGid}')" title="查完整變位庫">#${item.tag} 🔄</span>`
        : `<span class="gestalt-tag ${tagClass}">#${item.tag}</span>`;

      html += `<div class="mom-atm-card" data-scene="${scene}">
        ${tagHtml}
        <div class="card-spanish-body">${lineHtml}</div>
        <div class="card-chinese-translation" onclick="speakMapSmart('MOM_AUDIO_MAP','${audioShort}',${itemIdx},'${escAttr(displayEs)}')" title="點這裡聽整句">${displayZh} <span class="ex-zh-play">▶ 整句</span></div>
      </div>`;
    });

    html += `</div></div></div>`;
  }
  container.innerHTML = html;

  if (typeof renderConjLibrary === 'function') renderConjLibrary();
});

function toggleMomCategory(key) {
  const body = document.getElementById('momCatBody_' + key);
  const t = document.getElementById('momCatToggle_' + key);
  if (!body) return;
  const open = body.classList.toggle('open');
  if (t) t.textContent = open ? '▲ 收起' : '▼ 展開';
}

function toggleNocturnoMode(btn) {
  const container = document.getElementById('mom-atm-container');
  if (!container) return;

  const isNocturno = container.classList.toggle('nocturno-mode');
  const cards = container.querySelectorAll('.mom-atm-card');
  const sections = container.querySelectorAll('.mom-category');

  if (isNocturno) {
    cards.forEach(card => {
      card.style.display = card.dataset.scene === 'bedtime' ? '' : 'none';
    });
    sections.forEach(sec => {
      const hasVisible = [...sec.querySelectorAll('.mom-atm-card')].some(c => c.style.display !== 'none');
      sec.style.display = hasVisible ? '' : 'none';
    });
  } else {
    cards.forEach(card => card.style.display = '');
    sections.forEach(sec => sec.style.display = '');
  }

  const btnText = btn.querySelector('.btn-text');
  const btnIcon = btn.querySelector('.btn-icon');
  if (isNocturno) {
    btnText.innerText = '回到日常模式';
    btnIcon.innerText = '☀️';
    if (typeof toast === 'function') toast('🌙 睡前斷電模式：只顯示 bedtime 語塊');
  } else {
    btnText.innerText = '睡前斷電模式';
    btnIcon.innerText = '🌙';
    if (typeof toast === 'function') toast('☀️ 已回到日常模式');
  }
}
