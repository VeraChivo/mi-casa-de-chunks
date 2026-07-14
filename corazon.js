/* ── 💬 心田深耕 · Hablar de corazón ──
   五大人生主題的「真心話」西語句庫（原創內容）
   放在 ☀️ 日光育苗場：比課本更深一層——用西語說出自己真實的感受 */

const CORAZON_DATA = [
  {
    id: "sentimientos",
    title: "💭 Expresar mis sentimientos · 表達自己的感受",
    desc: "說出心裡真正的狀態，不用完美，誠實就好",
    items: [
      { es: "Me siento abrumada hoy.",                     zh: "我今天覺得思緒超載。",           tag: "誠實表達" },
      { es: "Necesito un momento para respirar.",          zh: "我需要一點時間喘口氣。",         tag: "自我照顧" },
      { es: "Hoy no tengo energía, y está bien.",          zh: "今天沒電了，而這沒關係。",       tag: "接納自己" },
      { es: "Me cuesta expresar lo que siento.",           zh: "要說出自己的感受，對我來說很難。", tag: "誠實表達" },
      { es: "Estoy orgullosa de mí misma.",                zh: "我為自己感到驕傲。",             tag: "肯定自己" },
      { es: "Cuando me escuchas, me siento querida.",      zh: "當你聽我說話，我覺得被愛著。",   tag: "說出需求" }
    ]
  },
  {
    id: "limites",
    title: "🤝 Relaciones y límites · 人際關係與界線",
    desc: "溫柔而堅定：界線不是拒人於外，是把自己放進來",
    items: [
      { es: "Necesito espacio, no es por ti.",             zh: "我需要一點空間，不是因為你。",     tag: "劃界線" },
      { es: "Prefiero decirte la verdad con cariño.",      zh: "我想帶著溫柔對你說真話。",       tag: "真誠溝通" },
      { es: "No puedo con esto ahora, ¿hablamos luego?",   zh: "我現在沒辦法處理這個，晚點聊好嗎？", tag: "劃界線" },
      { es: "Gracias por respetar mi ritmo.",              zh: "謝謝你尊重我的步調。",           tag: "表達感謝" },
      { es: "Decir «no» también es cuidarme.",             zh: "說「不」也是一種照顧自己。",     tag: "劃界線" }
    ]
  },
  {
    id: "crianza",
    title: "🍼 Crianza y familia · 育兒心裡話",
    desc: "當媽媽的真心話——美好與疲憊可以同時存在",
    items: [
      { es: "Ser mamá es hermoso y agotador a la vez.",    zh: "當媽媽既美好、又累人。",         tag: "媽媽真心話" },
      { es: "Hoy perdí la paciencia, y mañana lo intento de nuevo.", zh: "今天我失去了耐心，明天再試一次。", tag: "自我原諒" },
      { es: "Cada niño florece a su propio ritmo.",        zh: "每個孩子都用自己的節奏開花。",   tag: "跟隨孩子" },
      { es: "Te veo, te escucho, estoy aquí.",             zh: "我看見你、我聽見你、我在這裡。", tag: "核心安全感" },
      { es: "No necesito ser una mamá perfecta.",          zh: "我不需要當一個完美的媽媽。",     tag: "放過自己" }
    ]
  },
  {
    id: "cuidadora",
    title: "🫶 Voz de la cuidadora · 照顧者心語",
    desc: "照顧長輩、照顧特別的孩子——照顧的人，心聲也值得被聽見（依自己的情況取用）",
    items: [
      { es: "¿Cómo te sientes hoy, papá?",                 zh: "爸，你今天覺得怎麼樣？",         tag: "開啟對話" },
      { es: "Déjame ayudarte con eso.",                    zh: "讓我來幫你弄這個。",             tag: "主動幫忙" },
      { es: "Cuidar también cansa, y pedir ayuda está bien.", zh: "照顧的人也會累，開口求助沒關係。", tag: "照顧者自救" },
      { es: "Estás aprendiendo de nuevo, a tu propio ritmo.", zh: "你正在重新學習，用你自己的步調。", tag: "復健陪伴" },
      { es: "Ser cuidadora también es un trabajo, aunque nadie lo vea.", zh: "照顧也是一種工作，即使沒有人看見。", tag: "照顧者自救" },
      { es: "Cada familia tiene su propio camino.",        zh: "每個家庭都有自己的路。",         tag: "特生家庭" },
      { es: "Gracias por todo lo que me diste.",           zh: "謝謝你給過我的一切。",           tag: "表達感謝" }
    ]
  },
  {
    id: "crecimiento",
    title: "🌱 Mi crecimiento personal · 自我成長",
    desc: "用自己的步調長大——這裡的每一句都是寫給自己的",
    items: [
      { es: "Estoy aprendiendo a mi propio ritmo.",        zh: "我正用自己的步調學習。",         tag: "自我肯定" },
      { es: "Cada día un poquito más.",                    zh: "每天多一點點就好。",             tag: "微小前進" },
      { es: "Mi cerebro funciona diferente, y eso es un regalo.", zh: "我的大腦運作方式不一樣，而這是一份禮物。", tag: "神經多樣性" },
      { es: "Hoy elijo ser amable conmigo misma.",         zh: "今天我選擇溫柔對待自己。",       tag: "自我疼惜" },
      { es: "No he terminado de crecer.",                  zh: "我還沒長完，還在長大。",         tag: "成長心態" }
    ]
  }
];

function toggleCorazon(){
  const body = document.getElementById('corazonBody');
  const tog = document.getElementById('corazonToggle');
  if(!body) return;
  const open = body.classList.toggle('open');
  if(tog) tog.textContent = open ? '▲ 收起' : '▼ 展開';
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('corazonEntries');
  if(!container) return;
  let html = '';
  CORAZON_DATA.forEach(cat => {
    html += `<div class="mom-category card-container">
      <div class="mom-cat-title">${cat.title}</div>
      <div class="mom-cat-desc">${cat.desc}</div>
      <div class="mom-cards-col">`;
    cat.items.forEach((item, itemIdx) => {
      const lineHtml = (typeof renderScriptLine === 'function') ? renderScriptLine(item.es, `speakGramSmart('${escAttr(item.es)}')`) : item.es;
      const playCardExpr = `speakMapSmart('CORAZON_AUDIO_MAP','${cat.id}',${itemIdx},'${escAttr(item.es)}')`;
      html += `<div class="mom-atm-card" onclick="${playCardExpr}" title="點這裡聽整句">
        <span class="gestalt-tag type-d">#${item.tag}</span>
        <div class="card-spanish-body">${lineHtml}</div>
        <div class="card-chinese-translation">${item.zh}</div>
      </div>`;
    });
    html += `</div></div>`;
  });
  container.innerHTML = html;
});
