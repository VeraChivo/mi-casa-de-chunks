// ── B2 日報・時事語塊採集站 ──
// 格式：source/sourceUrl/headline/task{type,answer,wrong,zh,hint}/cefr/topic
// type:'blank' = 挖空填答；type:'bug' = 故意錯字讓使用者修正

const NEWS_ITEMS = [
  {
    id:'nw01',
    source:'DW Español',
    sourceUrl:'https://www.dw.com/es/',
    headline:'El cambio climático genera una gran [?] para los productores de café.',
    task:{ type:'blank', answer:'incertidumbre', zh:'不確定性', hint:'sustantivo f. — lo que no se sabe con certeza' },
    cefr:'B2', topic:'medio ambiente 🌱'
  },
  {
    id:'nw02',
    source:'Noticias ONU',
    sourceUrl:'https://news.un.org/es/',
    headline:'El informe señala que la [?] socioeconómica persiste en la región.',
    task:{ type:'blank', answer:'desigualdad', zh:'不平等', hint:'sustantivo f. — diferencia injusta entre personas' },
    cefr:'B2', topic:'sociedad 🏘️'
  },
  {
    id:'nw03',
    source:'DW Español',
    sourceUrl:'https://www.dw.com/es/',
    headline:'La crisis hídrica aumenta la [?] de las comunidades rurales.',
    task:{ type:'blank', answer:'vulnerabilidad', zh:'脆弱性／易受影響程度', hint:'sustantivo f. — ser vulnerable = estar expuesto al riesgo' },
    cefr:'B2', topic:'medio ambiente 🌱'
  },
  {
    id:'nw04',
    source:'Wikinews ES',
    sourceUrl:'https://es.wikinews.org/',
    headline:'Los expertos advierten sobre el deterióro del ecosistema marino.',
    task:{ type:'bug', wrong:'deterióro', answer:'deterioro', zh:'惡化／退化', hint:'注意重音：deteriÓro 沒有重音符號，是 dete-rio-ro 三個 o，重音在第二個 o' },
    cefr:'B2', topic:'medio ambiente 🌱'
  },
  {
    id:'nw05',
    source:'DW Español',
    sourceUrl:'https://www.dw.com/es/',
    headline:'La migración masiva requiere políticas [?] a largo plazo.',
    task:{ type:'blank', answer:'sostenibles', zh:'可持續的', hint:'adjetivo pl. — sostenible = que puede mantenerse sin agotar recursos' },
    cefr:'B2', topic:'sociedad 🏘️'
  },
  {
    id:'nw06',
    source:'Noticias ONU',
    sourceUrl:'https://news.un.org/es/',
    headline:'El acceso al agua potable sigue siendo un derecho [?] para millones.',
    task:{ type:'blank', answer:'vulnerado', zh:'被侵害的', hint:'participio pasado de vulnerar — vulnerar un derecho = violar un derecho' },
    cefr:'B2', topic:'derechos humanos ⚖️'
  }
];

// ── DW 歷史文化小卡（純文字，不走 grammar.js 體系） ──
const DW_HISTORY = {
  title: '📡 Deutsche Welle（DW）的由來',
  body: [
    { label:'🕰️ 1953年，冷戰誕生', text:'二戰結束後，西德為了在全球重建「民主德國」的形象，對抗東德的共產宣傳，成立了國家級國際廣播電台。Deutsche Welle 字面意思是「德意志電波」。' },
    { label:'🌍 現在用 30 種語言播出', text:'包含 DW Español、DW Arabic、DW Chinese，目標是向非德語世界傳播歐洲觀點，屬於非商業性公共媒體，部分內容授權較寬鬆。' },
    { label:'🇩🇪 德國人為什麼特別愛學西語？', text:'①馬略卡島（Mallorca）是德國人的第二故鄉，每年數百萬人去西班牙度假置產；②西語發音所見即所讀，比法語親切；③德國車廠（福斯、賓士）在墨西哥/阿根廷有大型工廠，商務誘因強。' },
    { label:'📚 為什麼 DW 要做語言教材？', text:'「推廣語言＝最好的軟實力外交」——DW 不只報新聞，還養了頂尖語言教育團隊，提供 A1–B2 的免費新聞教材。他們的 B2 字彙是歐洲跨國記者寫的，正式、精準，跟 DELE 考試字庫高度重疊。' }
  ]
};
