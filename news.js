// ── B2 日報・時事語塊採集站 ──
// 格式：source/sourceUrl/headline/task{type,answer,zh,hint}/cefr/topic
// 2026-07-18 全面換血：舊版是佔位假資料（sourceUrl只給首頁），已改用逐篇查證過的真實DW文章
// 查證方法：WebSearch逐字搜尋標題 + 第三方轉載站（teletica.com/t13.cl/eju.tv等常轉載DW原文）交叉核對
const NEWS_ITEMS = [
  {
    id:'nw01',
    source:'DW Español',
    sourceUrl:'https://www.dw.com/es/caf%C3%A9-cada-vez-m%C3%A1s-caro-qui%C3%A9nes-ganan-y-qui%C3%A9nes-pierden/a-72543510',
    headline:'¿Qué hay detrás de la [?] alza del precio del café?',
    task:{ type:'blank', answer:'explosiva', zh:'爆發性的', hint:'adjetivo f. — algo que sube de golpe, muy rápido y fuerte' },
    cefr:'B2', topic:'economía 💰'
  },
  {
    id:'nw02',
    source:'DW Español',
    sourceUrl:'https://www.dw.com/es/se-intensifica-la-disputa-por-el-abandono-de-los-combustibles-f%C3%B3siles/a-77618596',
    headline:'Se [?] la disputa por el abandono de los combustibles fósiles.',
    task:{ type:'blank', answer:'intensifica', zh:'白熱化／加劇', hint:'verbo reflexivo, 第三人稱單數 — intensificarse = volverse más fuerte' },
    cefr:'B2', topic:'medio ambiente 🌍'
  },
  {
    id:'nw03',
    source:'DW Español',
    sourceUrl:'https://www.dw.com/es/resuelven-en-colombia-el-primer-caso-jur%C3%ADdico-con-la-ayuda-de-robot-chatgpt/a-64597510',
    headline:'Resuelven en Colombia el primer caso [?] con la ayuda de robot ChatGPT.',
    task:{ type:'blank', answer:'jurídico', zh:'法律的／司法的', hint:'adjetivo m. — relacionado con las leyes y los tribunales' },
    cefr:'B2', topic:'tecnología 🤖'
  },
  {
    id:'nw04',
    source:'DW Español',
    sourceUrl:'https://www.dw.com/es/estudio-propone-restringir-el-acceso-al-m%C3%B3vil-antes-de-los-13-a%C3%B1os/a-73350517',
    headline:'Estudio propone [?] el acceso al móvil antes de los 13 años.',
    task:{ type:'blank', answer:'restringir', zh:'限制', hint:'verbo infinitivo — poner límites al uso o acceso de algo' },
    cefr:'B2', topic:'salud mental 🧠'
  },
  {
    id:'nw05',
    source:'DW Español',
    sourceUrl:'https://www.dw.com/es/terapia-en-las-redes-sociales-es-%C3%BAtil/a-66706453',
    headline:'Terapia en las redes sociales: ¿es [?]?',
    task:{ type:'blank', answer:'útil', zh:'有用的', hint:'adjetivo — que sirve para algo, que tiene utilidad' },
    cefr:'B2', topic:'salud mental 🧠'
  },
  {
    id:'nw06',
    source:'DW Español',
    sourceUrl:'https://www.dw.com/es/qu%C3%A9-dice-la-ciencia-sobre-el-impacto-de-las-pantallas-en-la-salud-mental-y-las-relaciones/a-76306784',
    headline:'Qué dice la ciencia sobre el [?] de las pantallas en la salud mental y las relaciones.',
    task:{ type:'blank', answer:'impacto', zh:'衝擊／影響', hint:'sustantivo m. — efecto fuerte que algo produce sobre otra cosa' },
    cefr:'B2', topic:'salud mental 🧠'
  },
  {
    id:'nw07',
    source:'DW Español',
    sourceUrl:'https://www.dw.com/es/transformar-la-econom%C3%ADa-c%C3%B3mo-el-cambio-clim%C3%A1tico-amenaza-la-industria-vin%C3%ADcola-de-chile/video-76747626',
    headline:'Transformar la economía: cómo el cambio climático [?] la industria vinícola de Chile.',
    task:{ type:'blank', answer:'amenaza', zh:'威脅', hint:'verbo, 第三人稱單數 — poner en peligro algo' },
    cefr:'B2', topic:'economía 💰'
  },
  {
    id:'nw08',
    source:'DW Español',
    sourceUrl:'https://www.dw.com/es/nobel-al-an%C3%A1lisis-de-los-efectos-del-cambio-clim%C3%A1tico-y-la-tecnolog%C3%ADa-en-la-econom%C3%ADa/a-45796492',
    headline:'Nobel al análisis de los [?] del cambio climático y la tecnología en la economía.',
    task:{ type:'blank', answer:'efectos', zh:'影響／效應', hint:'sustantivo m. pl. — consecuencias que algo produce' },
    cefr:'B2', topic:'economía 💰'
  },
  {
    id:'nw09',
    source:'DW Español',
    sourceUrl:'https://www.dw.com/es/australia-eleva-su-meta-clim%C3%A1tica-para-2035/a-74037020',
    headline:'Australia [?] su meta climática para 2035.',
    task:{ type:'blank', answer:'eleva', zh:'提高', hint:'verbo, 第三人稱單數 — subir o aumentar un objetivo' },
    cefr:'B2', topic:'medio ambiente 🌍'
  },
  {
    id:'nw10',
    source:'DW Español',
    sourceUrl:'https://www.dw.com/es/inteligencia-artificial-davos-debate-sobre-riesgos-y-oportunidades/a-68025090',
    headline:'Inteligencia artificial: Davos debate sobre riesgos y [?].',
    task:{ type:'blank', answer:'oportunidades', zh:'機遇／機會', hint:'sustantivo f. pl. — momentos favorables para conseguir algo' },
    cefr:'B2', topic:'tecnología 🤖'
  },
  {
    id:'nw11',
    source:'DW Español',
    sourceUrl:'https://www.dw.com/es/inteligencia-artificial-cr%C3%ADticos-y-l%C3%ADderes-tecnol%C3%B3gicos-debatieron-en-el-bletchley-park/a-67301708',
    headline:'Inteligencia artificial: críticos y líderes [?] debatieron en el Bletchley Park.',
    task:{ type:'blank', answer:'tecnológicos', zh:'科技的（複數）', hint:'adjetivo m. pl. — relacionado con la tecnología' },
    cefr:'B2', topic:'tecnología 🤖'
  },
  {
    id:'nw12',
    source:'DW Español',
    sourceUrl:'https://www.dw.com/es/el-tdah-de-trastorno-a-ventaja-en-la-supervivencia-de-los-humanos/a-68387884',
    headline:'El TDAH, una pieza [?] en la supervivencia de los humanos.',
    task:{ type:'blank', answer:'clave', zh:'關鍵的', hint:'adjetivo — de importancia fundamental para algo' },
    cefr:'B2', topic:'neurodiversidad 🧩'
  },
  {
    id:'nw13',
    source:'DW Español',
    sourceUrl:'https://www.dw.com/es/global-es-inclusi%C3%B3n-cuando-ser-diferente-es-normal/video-71122594',
    headline:'Inclusión: cuando ser [?] es normal.',
    task:{ type:'blank', answer:'diferente', zh:'不同的', hint:'adjetivo — que no es igual a los demás' },
    cefr:'B2', topic:'neurodiversidad 🧩'
  },
  {
    id:'nw14',
    source:'DW Español',
    sourceUrl:'https://www.dw.com/es/c%C3%B3mo-el-racismo-marca-a-las-sociedades-latinoamericanas/a-68635668',
    headline:'Cómo el racismo [?] a las sociedades latinoamericanas.',
    task:{ type:'blank', answer:'marca', zh:'烙印／標記', hint:'verbo, 第三人稱單數 — dejar una huella o señal profunda' },
    cefr:'B2', topic:'diversidad étnica 🌎'
  },
  {
    id:'nw15',
    source:'DW Español',
    sourceUrl:'https://www.dw.com/es/pueblos-ind%C3%ADgenas-en-m%C3%A9xico-reconocidos-pero-ignorados/a-77148663',
    headline:'Pueblos indígenas en México: reconocidos, pero [?].',
    task:{ type:'blank', answer:'ignorados', zh:'被忽視的', hint:'participio pasado de ignorar — no prestarle atención a algo' },
    cefr:'B2', topic:'diversidad étnica 🌎'
  },
  {
    id:'nw16',
    source:'DW Español',
    sourceUrl:'https://www.dw.com/es/el-habla-no-es-inocente-lenguaje-y-racismo-en-latinoam%C3%A9rica/a-66343016',
    headline:'El habla no es [?]: lenguaje y racismo en Latinoamérica.',
    task:{ type:'blank', answer:'inocente', zh:'無辜的／清白的', hint:'adjetivo — que no tiene culpa o responsabilidad' },
    cefr:'B2', topic:'diversidad étnica 🌎'
  },
  {
    id:'nw17',
    source:'DW Español',
    sourceUrl:'https://www.dw.com/es/qu%C3%A9-pasa-cuando-los-padres-priorizan-el-celular/a-77617959',
    headline:'Qué pasa cuando los padres [?] el celular.',
    task:{ type:'blank', answer:'priorizan', zh:'把⋯放在優先', hint:'verbo, 第三人稱複數 — poner algo en primer lugar de importancia' },
    cefr:'B2', topic:'crianza 🍼'
  },
  {
    id:'nw18',
    source:'DW Español',
    sourceUrl:'https://www.dw.com/es/la-baja-por-paternidad-reduce-el-riesgo-de-depresi%C3%B3n/a-77630867',
    headline:'La baja por paternidad reduce el [?] de depresión.',
    task:{ type:'blank', answer:'riesgo', zh:'風險', hint:'sustantivo m. — posibilidad de que ocurra algo malo' },
    cefr:'B2', topic:'crianza 🍼'
  },
  {
    id:'nw19',
    source:'DW Español',
    sourceUrl:'https://www.dw.com/es/m%C3%A9xico-prefiero-que-mis-hijos-pierdan-un-ciclo-escolar-pero-que-sigan-vivos/a-58981668',
    headline:'México: prefiero que mis hijos [?] un ciclo escolar, pero que sigan vivos.',
    task:{ type:'blank', answer:'pierdan', zh:'失去／錯過（虛擬式）', hint:'preferir que + 虛擬式 — perder → pierdan（第三人稱複數現在虛擬式）' },
    cefr:'B2', topic:'crianza 🍼'
  },
  {
    id:'nw20',
    source:'DW Español',
    sourceUrl:'https://www.dw.com/es/una-buena-relaci%C3%B3n-con-los-padres-mejora-la-salud-futura-de-los-j%C3%B3venes-nuevo-macroestudio-presenta-evidencia-m%C3%A1s-completa/a-65072483',
    headline:'Una buena relación con los padres [?] la salud futura de los jóvenes.',
    task:{ type:'blank', answer:'mejora', zh:'改善', hint:'verbo, 第三人稱單數 — hacer que algo sea mejor' },
    cefr:'B2', topic:'crianza 🍼'
  },
  {
    id:'nw21',
    source:'DW Español',
    sourceUrl:'https://www.dw.com/es/cu%C3%A1nto-aprenden-o-no-los-estudiantes-en-am%C3%A9rica-latina/a-72936804',
    headline:'¿Cuánto [?] (o no) los estudiantes en América Latina?',
    task:{ type:'blank', answer:'aprenden', zh:'學到', hint:'verbo, 第三人稱複數 — adquirir conocimiento' },
    cefr:'B2', topic:'educación 📚'
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
