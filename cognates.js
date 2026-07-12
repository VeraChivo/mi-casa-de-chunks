/* ── YouGlish keywords + 英西同源槓桿資料 ── */

/* ── 陰陽字尾語塊卡：一個字根+兩顆按鈕切換 ── */
const GENDER_PAIRS = [
  {zh:'小的', options:[
    {suf:'o', word:'pequeño', ex:'Mi hermano pequeño.', exZh:'我的小弟弟。'},
    {suf:'a', word:'pequeña', ex:'Mi hermana pequeña.', exZh:'我的小妹妹。'}
  ]},
  {zh:'醫生', options:[
    {suf:'', word:'doctor', ex:'El doctor es muy bueno.', exZh:'這位醫生很厲害。（男）'},
    {suf:'a', word:'doctora', ex:'Yo seré la doctora.', exZh:'我來當醫生。（女）'}
  ]},
  {zh:'護士', options:[
    {suf:'o', word:'enfermero', ex:'Tú serás el enfermero.', exZh:'你來當護士。（男）'},
    {suf:'a', word:'enfermera', ex:'Tú serás la enfermera.', exZh:'你來當護士。（女）'}
  ]},
  {zh:'走出來的', options:[
    {suf:'o', word:'salido', ex:'Un pirata salido de un cuento.', exZh:'從故事走出來的海盜。'},
    {suf:'a', word:'salida', ex:'Una princesa salida de un cuento.', exZh:'從故事走出來的公主。'}
  ]},
  {zh:'自豪的', options:[
    {suf:'o', word:'orgulloso', ex:'Tito está muy orgulloso de ser hermano mayor.', exZh:'迪多非常自豪能當大哥哥。'},
    {suf:'a', word:'orgullosa', ex:'Nita está muy orgullosa de ser hermana mayor.', exZh:'妮妲非常自豪能當大姊姊。'}
  ]},
  {zh:'累的', options:[
    {suf:'o', word:'cansado', ex:'Papá está cansado.', exZh:'爸爸累了。'},
    {suf:'a', word:'cansada', ex:'Mamá está cansada.', exZh:'媽媽累了。'}
  ]},
  {zh:'朋友', options:[
    {suf:'o', word:'amigo', ex:'Tito es mi amigo.', exZh:'迪多是我朋友。（男）'},
    {suf:'a', word:'amiga', ex:'Vera Oveja es mi amiga.', exZh:'薇拉羊是我朋友。（女）'}
  ]}
];


// ── 精準 YouGlish 語塊關鍵字（避免整句搜不到）──
const SENTENCE_YG_KW = {
  'e0_s0':'Yo soy',            'e0_s1':'Este es mi hermano',
  'e0_s2':'está lloviendo',    'e0_s3':'Podemos salir a jugar',
  'e0_s4':'debes ponerte',     'e0_s5':'Me encanta saltar',
  'e0_s6':'ha encontrado',     'e0_s7':'sí que es grande',
  'e0_s8':'No pasa nada',      'e0_s9':'A todos les encanta',
  'e1_s0':'juguete favorito',  'e1_s1':'se va a la cama',
  'e1_s2':'ha perdido',        'e1_s3':'No te preocupes',
  'e1_s4':'Un detective',      'e1_s5':'siempre se trae',
  'e1_s6':'Ya lo sé',          'e1_s7':'no está en la cama',
  'e1_s8':'están jugando',     'e1_s9':'habéis estado saltando',
  'e2_s0':'está esperando',    'e2_s1':'quiere mucho',
  'e2_s2':'Son las mejores amigas', 'e2_s3':'solo para niñas',
  'e2_s4':'Soy una princesa',  'e2_s5':'no le gusta jugar solo',
  'e2_s6':'seré la doctora',   'e2_s7':'respira hondo',
  'e2_s8':'Creo que tienes',   'e2_s9':'necesitan muchas galletas',
};

// ── 每句英西同源槓桿資料 ──
const SENTENCE_COGNATES = {
  'e0_s0':{
    title:'🧠 Yo soy 字面解密',
    rows:[
      '👉 <b>Yo soy</b> = 一整塊固定外殼，後面直接插入名字或身份，超省力！',
      '💡 省略 Yo 直接說 <i>Soy Nita.</i> 完全合法，西語主詞常省略！',
    ]
  },
  'e0_s1':{
    title:'🔵 Ser vs 🟠 Estar — 第一個 Boss',
    rows:[
      '👉 介紹「身分/本質」永遠用 <b>Ser</b>：<i>Este es mi hermano.</i>',
      '💡 <b>hermano</b>（兄弟）：ger-MAAN-o，英文 germane（同族）同根！',
      '⚠️ 記住：Este（陽性）Esta（陰性），跟著後面名詞性別走<br><span style="display:block;margin-top:6px;padding:6px 10px;background:rgba(108,155,210,.08);border-radius:8px;font-size:12px;line-height:1.7"><b>Este</b> es mi hermano Tito. → 這是我弟弟迪多（hermano 陽性 → Este）<br><b>Esta</b> es mi hermana. → 這是我姊姊（hermana 陰性 → Esta）</span>',
    ]
  },
  'e0_s2':{
    title:'🌧️ está lloviendo — 現在進行式解鎖',
    rows:[
      '👉 <b>estar + -ando/-iendo</b> = 正在做（暫時狀態）',
      '💡 <b>llover</b>（下雨）→ 英文 rain 同源概念！動名詞 <b>lloviendo</b> = raining，estar + lloviendo = 正在下雨',
      '🎯 <b>puede / pueden</b> ← 英文 <b>potent</b>（有力的）同源！',
    ]
  },
  'e0_s3':{
    title:'❓ ¿Podemos…? — 我們可以嗎',
    rows:[
      '👉 <b>¿Podemos + 原形動詞?</b> = 我們可以 ___？（poder 「我們」）',
      '💡 <b>poder</b> ← 英文 <b>power</b>，有能力！',
      '🎯 <b>jugar</b>（玩）← 英文 juggle 同根，字面是「耍把戲」！',
    ]
  },
  'e0_s4':{
    title:'👢 debes ponerte — 你必須穿上',
    rows:[
      '👉 <b>debes + 原形動詞</b> = 你必須做 ___（deber = duty 義務！）',
      '💡 英文 <b>duty / debe</b> 同根！看到 debes 秒想到 duty！',
      '🎯 <b>botas</b>（靴子）← 英文 <b>boots</b>，發音相似，秒記！',
    ]
  },
  'e0_s5':{
    title:'💥 Me encanta — 強力喜歡炸彈',
    rows:[
      '👉 <b>Me encanta</b> 比 me gusta 強 10 倍，翻譯成「我超愛、我迷死了」',
      '💡 <b>encanta</b> ← 英文 <b>enchant</b>（著迷/施魔法）雙胞胎！',
      '🎯 <b>charcos</b>（水坑）← charcoal（木炭）同字源 char，黑色的坑！',
    ]
  },
  'e0_s6':{
    title:'🔍 ha encontrado — 剛剛做完',
    rows:[
      '👉 <b>ha + 動詞-ado/-ido形</b> = 已經 ___（剛剛完成）',
      '💡 <b>encontrado</b> ← 英文 <b>encounter</b>（遭遇/發現）同源！',
      '🎯 字根 <b>contra</b>（相對/遇見）← counter 也是同源！',
    ]
  },
  'e0_s7':{
    title:'✨ sí que es — 強調語氣小炸彈',
    rows:[
      '👉 <b>sí que</b> = 真的是、確實是（加強語氣，超口語）',
      '💡 <b>grande</b> ← 英文 <b>grand</b>（宏大）！同一個字！',
      '🎯 注意：<b>sí</b>（有帽子）= yes；<b>si</b>（沒帽子）= if',
    ]
  },
  'e0_s8':{
    title:'😌 No pasa nada — 西語最強安慰語',
    rows:[
      '👉 字面：「沒有任何事情在發生」= 沒關係、不要緊、算了啦',
      '💡 <b>pasa</b> ← 英文 <b>pass</b>（通過/發生）同源！',
      '🎯 <b>barro</b>（泥巴）← barren（貧瘠/泥土）同字源概念！',
    ]
  },
  'e0_s9':{
    title:'🐷 A todos les encanta — 所有人都愛',
    rows:[
      '👉 <b>A todos les encanta</b> = 所有人都超愛（「他們」，les 取代 me）',
      '💡 句型升級：me encanta → te encanta → le encanta → les encanta',
      '🎯 <b>todos</b> ← 英文 <b>total</b>（全部）同字根！',
    ]
  },
  'e1_s0':{
    title:'🦕 juguete favorito — 最愛玩具',
    rows:[
      '👉 <b>El juguete favorito de Tito</b> = 迪多最喜歡的玩具（所有格用 de）',
      '💡 <b>favorito</b> ← 英文 <b>favorite</b>！字母幾乎一樣！',
      '🎯 形容詞放在名詞後面：juguete <b>favorito</b>，不像英文放前面',
    ]
  },
  'e1_s1':{
    title:'🛏️ se va a la cama — 自己對自己做的動詞床上見',
    rows:[
      '👉 <b>se va a la cama</b> = 去睡覺（直譯：自己去到床上）',
      '💡 <b>acurruca</b>（蜷縮）← curl up！概念完全一樣！',
      '🎯 <b>a su lado</b> = beside him/her，lado ← English lateral（側面）！',
    ]
  },
  'e1_s2':{
    title:'😱 ha perdido — 弄丟了',
    rows:[
      '👉 <b>ha perdido</b> = 已經弄丟了（剛剛做完）',
      '💡 <b>perdido</b> ← 英文 <b>perdition</b>（失落/消失）同源！',
      '🎯 記憶鉤：「per-DEED-o」= 已經做了壞事（丟掉東西）！',
    ]
  },
  'e1_s3':{
    title:'🤗 No te preocupes — 別擔心',
    rows:[
      '👉 <b>No te preocupes</b> = 別擔心（自己對自己做的動詞直接下指令）',
      '💡 <b>preocupar</b> ← 英文 <b>preoccupy</b>（讓你心裡先佔據了）！',
      '🎯 <b>encontraremos</b> ← encounter + future，我們將會找到！',
    ]
  },
  'e1_s4':{
    title:'🔍 Un detective — 你已經會了！',
    rows:[
      '👉 <b>detective</b> 西英完全一樣！這叫「零學習成本同源詞」！',
      '💡 <b>persona</b> ← 英文 <b>person</b>，字面就是「戴面具的人」！',
      '🎯 <b>muy buena encontrando</b> = very good at finding，結構也一樣！',
    ]
  },
  'e1_s5':{
    title:'🛁 siempre — 頻率副詞最省力',
    rows:[
      '👉 <b>siempre</b> = always，放動詞前！',
      '💡 <b>siempre</b>：頻率副詞，固定接在動詞前，整個語塊記下來最快！',
      '🎯 <b>bañera</b>（浴缸）← bath 概念，帶波浪符的 ñ 是西語招牌！',
    ]
  },
  'e1_s6':{
    title:'💡 Ya lo sé — 我知道了！',
    rows:[
      '👉 <b>Ya lo sé</b> = I already know it！ya 表示「已然發生/就是現在」',
      '💡 <b>ya</b> 超萬用：ya voy（我來了）/ ya está（好了/完成了）',
      '🎯 <b>dónde</b>（哪裡）← where，d 對應 wh，西語發音「東ˋ得」！',
    ]
  },
  'e1_s7':{
    title:'📍 estar 位置用法 — no está en',
    rows:[
      '👉 <b>no está</b> = is not there，estar 專門管位置和暫時狀態！',
      '💡 口訣：<b>SER = 本質身分</b>；<b>ESTAR = 位置狀態</b>',
      '🎯 <b>cama</b>（床）← 英文 chamber（房間/床室）同字根！',
    ]
  },
  'e1_s8':{
    title:'🎮 están jugando — 進行式複數',
    rows:[
      '👉 <b>están jugando</b> = they are playing（estar + -ando）',
      '💡 <b>damas</b>（跳棋/西洋棋）← dame（女士們），棋子叫「女士」！',
      '🎯 <b>papá</b> = dad，帽子要加！papa（沒帽子）= 馬鈴薯！',
    ]
  },
  'e1_s9':{
    title:'🚀 habéis estado saltando — 完成進行式',
    rows:[
      '👉 <b>habéis estado + -ando</b> = you have been doing（完成進行式）',
      '💡 英文 have been jumping = habéis estado saltando，結構完全平行！',
      '🎯 這是西語最複雜時態之一，跟著故事情境就學會了！',
    ]
  },
  'e2_s0':{
    title:'⏳ está esperando — 進行式等待',
    rows:[
      '👉 <b>está esperando</b> = is waiting（現在進行式）',
      '💡 <b>esperar</b> ← 英文 <b>hope / expect</b>（期待等待）同概念！',
      '🎯 <b>mejor amiga</b> = best friend（female），mejor ← major/mayor！',
    ]
  },
  'e2_s1':{
    title:'❤️ quiere mucho — 喜愛句型',
    rows:[
      '👉 <b>querer a alguien</b> = to love someone，人名前必加 a！',
      '💡 <b>querer</b> ← 英文 query（尋求）同字根，愛 = 尋求某人！',
      '🎯 <b>mucho</b> ← 英文 much！西英同源！',
    ]
  },
  'e2_s2':{
    title:'🏆 mejores amigas — 最高級',
    rows:[
      '👉 <b>las mejores amigas</b> = the best friends（female plural）',
      '💡 <b>mejor</b> ← 英文 <b>ameliorate</b>（改善），同字根 meli/mejor！',
      '🎯 複數變化：mejor → mejores（加 es），amica → amigas（加 s）',
      '⚠️ 記住：amigo（男性朋友）amiga（女性朋友）→ 跟名詞性別走<br><span style="display:block;margin-top:6px;padding:6px 10px;background:rgba(108,155,210,.08);border-radius:8px;font-size:12px;line-height:1.7"><b>el mejor amigo</b> → 最好的（男）朋友<br><b>la mejor amiga</b> → 最好的（女）朋友</span>',
    ]
  },
  'e2_s3':{
    title:'🚫 solo para — 限定句型',
    rows:[
      '👉 <b>solo para + 名詞</b> = only for ___',
      '💡 <b>niñas mayores</b> = older girls，mayor ← major（較大的）！',
      '🎯 <b>juego</b>（遊戲）← 英文 juggle → game，同字根！',
      '⚠️ 記住：niño（男孩）niña（女孩）→ -o 陽性，-a 陰性<br><span style="display:block;margin-top:6px;padding:6px 10px;background:rgba(108,155,210,.08);border-radius:8px;font-size:12px;line-height:1.7"><b>Este juego es para niños.</b> → 這遊戲給男孩玩（niño → niños）<br><b>Este juego es para niñas.</b> → 這遊戲給女孩玩（niña → niñas）</span>',
    ]
  },
  'e2_s4':{
    title:'👸 princesa — 你已會這個字！',
    rows:[
      '👉 <b>princesa</b> ← 英文 <b>princess</b>！零學習成本！',
      '💡 <b>salida de un cuento</b> = come out of a story，cuento ← recount（講故事）！',
      '🎯 <b>cuento</b> ← 英文 <b>account / recount</b> 同字根！',
    ]
  },
  'e2_s5':{
    title:'🎯 A + 人 + le gusta — 必學句型',
    rows:[
      '👉 <b>A Tito no le gusta jugar solo.</b> = Tito doesn\'t like playing alone.',
      '💡 <b>gustar</b> ← 英文 <b>gusto</b>（品味/享受）！',
      '🎯 口訣：主語不是「我/你」，是「事物」施魔法給「人」！',
    ]
  },
  'e2_s6':{
    title:'🔮 seré / serás — ser 以後要做',
    rows:[
      '👉 <b>seré</b>（我將是）/ <b>serás</b>（你將是）= ser 動詞以後要做',
      '💡 <b>doctora</b> ← 英文 <b>doctor</b>！加 -a 變女性！',
      '🎯 <b>enfermera</b>（護士）← 英文 infirmary（醫務室）同字根！',
      '⚠️ 記住：大部分職業 -o 陽性 → -a 陰性<br><span style="display:block;margin-top:6px;padding:6px 10px;background:rgba(108,155,210,.08);border-radius:8px;font-size:12px;line-height:1.7"><b>Yo seré el doctor.</b> → 我來當醫生（男，doctor 陽性）<br><b>Yo seré la doctora.</b> → 我來當醫生（女，doctora 陰性）</span>',
    ]
  },
  'e2_s7':{
    title:'💨 respira hondo — 直接下指令發音',
    rows:[
      '👉 直接下指令（你做某事）直接用動詞「你」的動詞變化：<b>respira！</b>',
      '💡 <b>respira</b> ← 英文 <b>respire / respiratory</b>（呼吸系統）！',
      '🎯 <b>hondo</b>（深）← 英文 profound（深刻）的 fond 部分！',
    ]
  },
  'e2_s8':{
    title:'💭 Creo que — 我認為',
    rows:[
      '👉 <b>Creo que</b> = I think that...（後接完整子句）',
      '💡 <b>creo</b> ← 英文 <b>creed / credible</b>（相信）同字根！',
      '🎯 <b>corazón</b>（心臟）← 英文 <b>core</b>（核心）同字根！心臟 = 核心！',
    ]
  },
  'e2_s9':{
    title:'🍪 galletas — 餅乾治百病',
    rows:[
      '👉 <b>para curarse</b> = in order to get better（para + 原形）',
      '💡 <b>galletas</b>（餅乾）← waffle / wafer 類似概念，g/w 音轉！',
      '🎯 <b>curarse</b> ← 英文 <b>cure</b>！用餅乾 cure 你自己，妮妲醫生認可！',
    ]
  },
};

// ── 英西同源詞庫總覽（從 SENTENCE_COGNATES 整理出的扁平清單，供 #cogLibraryBody 瀏覽搜尋）──
const COGNATE_LIBRARY = [
  // E1 · 泥巴坑
  {en:'germane',   es:'hermano',   art:'el',  zh:'兄弟',       ep:'E1 · 泥巴坑'},
  {en:'potent',    es:'poder',     art:'',    zh:'能夠／有力的', ep:'E1 · 泥巴坑'},
  {en:'juggle',    es:'jugar',     art:'',    zh:'玩',         ep:'E1 · 泥巴坑'},
  {en:'boots',     es:'botas',     art:'las', zh:'靴子',       ep:'E1 · 泥巴坑'},
  {en:'duty',      es:'deber',     art:'',    zh:'必須／義務',  ep:'E1 · 泥巴坑'},
  {en:'charcoal',  es:'charco',    art:'el',  zh:'水坑',       ep:'E1 · 泥巴坑'},
  {en:'enchant',   es:'encantar',  art:'',    zh:'使著迷／超愛', ep:'E1 · 泥巴坑'},
  {en:'counter',   es:'contra',    art:'',    zh:'相對／遇見',  ep:'E1 · 泥巴坑'},
  {en:'encounter', es:'encontrar', art:'',    zh:'找到／遭遇',  ep:'E1 · 泥巴坑'},
  {en:'grand',     es:'grande',    art:'',    zh:'宏大／大的',  ep:'E1 · 泥巴坑'},
  {en:'barren',    es:'barro',     art:'el',  zh:'泥巴',       ep:'E1 · 泥巴坑'},
  {en:'pass',      es:'pasar',     art:'',    zh:'通過／發生',  ep:'E1 · 泥巴坑'},
  {en:'total',     es:'todos',     art:'',    zh:'全部／所有人', ep:'E1 · 泥巴坑'},
  // E2 · 恐龍先生不見了
  {en:'favorite',   es:'favorito',  art:'',    zh:'最喜歡的',   ep:'E2 · 恐龍先生不見了'},
  {en:'lateral',    es:'lado',      art:'el',  zh:'側面',       ep:'E2 · 恐龍先生不見了'},
  {en:'perdition',  es:'perdido',   art:'',    zh:'失落／弄丟了', ep:'E2 · 恐龍先生不見了'},
  {en:'preoccupy',  es:'preocupar', art:'',    zh:'擔心',       ep:'E2 · 恐龍先生不見了'},
  {en:'detective',  es:'detective', art:'el',  zh:'偵探',       ep:'E2 · 恐龍先生不見了'},
  {en:'person',     es:'persona',   art:'la',  zh:'人',         ep:'E2 · 恐龍先生不見了'},
  {en:'bath',       es:'bañera',    art:'la',  zh:'浴缸',       ep:'E2 · 恐龍先生不見了'},
  {en:'where',      es:'dónde',     art:'',    zh:'哪裡',       ep:'E2 · 恐龍先生不見了'},
  {en:'chamber',    es:'cama',      art:'la',  zh:'床／房間',    ep:'E2 · 恐龍先生不見了'},
  {en:'dad',        es:'papá',      art:'el',  zh:'爸爸',       ep:'E2 · 恐龍先生不見了'},
  // E3 · 最好的朋友
  {en:'expect',    es:'esperar',   art:'',    zh:'期待／等待',      ep:'E3 · 最好的朋友'},
  {en:'major',     es:'mejor',     art:'',    zh:'較好的／最好的',   ep:'E3 · 最好的朋友'},
  {en:'much',      es:'mucho',     art:'',    zh:'很多',            ep:'E3 · 最好的朋友'},
  {en:'query',     es:'querer',    art:'',    zh:'尋求／喜歡',      ep:'E3 · 最好的朋友'},
  {en:'game',      es:'juego',     art:'el',  zh:'遊戲',            ep:'E3 · 最好的朋友'},
  {en:'princess',  es:'princesa',  art:'la',  zh:'公主',            ep:'E3 · 最好的朋友'},
  {en:'account',   es:'cuento',    art:'el',  zh:'故事',            ep:'E3 · 最好的朋友'},
  {en:'gusto',     es:'gustar',    art:'',    zh:'品味／享受／喜歡', ep:'E3 · 最好的朋友'},
  {en:'doctor',    es:'doctora',   art:'la',  zh:'醫生',            ep:'E3 · 最好的朋友'},
  {en:'infirmary', es:'enfermera', art:'la',  zh:'醫務室／護士',    ep:'E3 · 最好的朋友'},
  {en:'respire',   es:'respirar',  art:'',    zh:'呼吸',            ep:'E3 · 最好的朋友'},
  {en:'profound',  es:'hondo',     art:'',    zh:'深刻／深的',      ep:'E3 · 最好的朋友'},
  {en:'credible',  es:'creer',     art:'',    zh:'相信',            ep:'E3 · 最好的朋友'},
  {en:'core',      es:'corazón',   art:'el',  zh:'核心／心臟',      ep:'E3 · 最好的朋友'},
  {en:'cure',      es:'curar',     art:'',    zh:'治療／康復',      ep:'E3 · 最好的朋友'},
];

// ── 詞綴規律資料（-tion→-ción 等三組） ──
const SUFFIX_PATTERNS = [
  {
    rule: '-tion → la__ -ción',
    hint: '名詞字尾，發音接近（education → la educación）<br><b class="sfx-remind">全部都是陰性，前面記得自動加上 la 喔！</b>',
    words: [
      {en:'nation',      es:'nación',       art:'la', zh:'國家',   ex:{es:'La nación entera celebra.',      zh:'整個國家都在慶祝。', chunks:[{w:"La nación entera",role:"s"},{w:"celebra.",role:"v"}]}},
      {en:'action',      es:'acción',       art:'la', zh:'行動',   ex:{es:'¡En acción!',                   zh:'行動！', chunks:[{w:"¡En acción!",role:"c"}]}},
      {en:'emotion',     es:'emoción',      art:'la', zh:'情緒',   ex:{es:'Es una emoción muy fuerte.',     zh:'這是非常強烈的情緒。', chunks:[{w:"Es",role:"v"},{w:"una emoción muy fuerte.",role:"c"}]}},
      {en:'information', es:'información',  art:'la', zh:'資訊',   ex:{es:'Necesito más información.',      zh:'我需要更多資訊。', chunks:[{w:"Necesito",role:"v"},{w:"más información.",role:"o"}]}},
      {en:'education',   es:'educación',    art:'la', zh:'教育',   ex:{es:'La educación es importante.',   zh:'教育很重要。', chunks:[{w:"La educación",role:"s"},{w:"es",role:"v"},{w:"importante.",role:"c"}]}},
      {en:'situation',   es:'situación',    art:'la', zh:'情況',   ex:{es:'Es una situación difícil.',     zh:'這是個困難的情況。', chunks:[{w:"Es",role:"v"},{w:"una situación difícil.",role:"c"}]}},
    ]
  },
  {
    rule: '-ty → la-dad',
    hint: '名詞字尾，發音接近（university → la universidad）<br><b class="sfx-remind">全部都是陰性，前面記得自動加上 la 喔！</b>',
    words: [
      {en:'city',        es:'ciudad',       art:'la', zh:'城市',   ex:{es:'La ciudad es muy grande.',      zh:'這個城市很大。', chunks:[{w:"La ciudad",role:"s"},{w:"es",role:"v"},{w:"muy grande.",role:"c"}]}},
      {en:'reality',     es:'realidad',     art:'la', zh:'現實',   ex:{es:'En la realidad es diferente.',  zh:'現實中不一樣。', chunks:[{w:"En la realidad",role:"c"},{w:"es",role:"v"},{w:"diferente.",role:"c"}]}},
      {en:'quality',     es:'calidad',      art:'la', zh:'品質',   ex:{es:'Es de muy buena calidad.',      zh:'品質非常好。', chunks:[{w:"Es",role:"v"},{w:"de muy buena calidad.",role:"c"}]}},
      {en:'university',  es:'universidad',  art:'la', zh:'大學',   ex:{es:'Voy a la universidad.',         zh:'我去大學。', chunks:[{w:"Voy",role:"v"},{w:"a la universidad.",role:"o"}]}},
      {en:'society',     es:'sociedad',     art:'la', zh:'社會',   ex:{es:'La sociedad cambia rápido.',    zh:'社會變化很快。', chunks:[{w:"La sociedad",role:"s"},{w:"cambia",role:"v"},{w:"rápido.",role:"c"}]}},
      {en:'liberty',     es:'libertad',     art:'la', zh:'自由',   ex:{es:'La libertad es un derecho.',    zh:'自由是一種權利。', chunks:[{w:"La libertad",role:"s"},{w:"es",role:"v"},{w:"un derecho.",role:"c"}]}},
    ]
  },
  {
    rule: '-ce / -cy → -cia / -ncia 形→名',
    hint: '(importance → la importancia)',
    words: [
      {en:'patience',    es:'paciencia',    art:'la', zh:'耐心',   ex:{es:'Hay que tener paciencia.',      zh:'要有耐心。', chunks:[{w:"Hay que tener",role:"v"},{w:"paciencia.",role:"o"}]}},
      {en:'experience',  es:'experiencia',  art:'la', zh:'經驗',   ex:{es:'Tiene mucha experiencia.',      zh:'她很有經驗。', chunks:[{w:"Tiene",role:"v"},{w:"mucha experiencia.",role:"o"}]}},
      {en:'distance',    es:'distancia',    art:'la', zh:'距離',   ex:{es:'¿Cuál es la distancia?',        zh:'距離是多少？', chunks:[{w:"¿Cuál",role:"c"},{w:"es",role:"v"},{w:"la distancia?",role:"s"}]}},
      {en:'importance',  es:'importancia',  art:'la', zh:'重要性', ex:{es:'Tiene mucha importancia.',      zh:'這非常重要。', chunks:[{w:"Tiene",role:"v"},{w:"mucha importancia.",role:"o"}]}},
      {en:'difference',  es:'diferencia',   art:'la', zh:'差異',   ex:{es:'¿Cuál es la diferencia?',      zh:'差異在哪裡？', chunks:[{w:"¿Cuál",role:"c"},{w:"es",role:"v"},{w:"la diferencia?",role:"s"}]}},
    ]
  },
  {
    rule: '-ment → el___-mento / -miento',
    hint: '心理狀態/抽象的動作。<br>動作名詞化：mover→movimiento',
    words: [
      {en:'moment',     es:'momento',      art:'el', zh:'時刻',   ex:{es:'Es el momento perfecto.',        zh:'這是完美的時刻。', chunks:[{w:"Es",role:"v"},{w:"el momento perfecto.",role:"c"}]}},
      {en:'movement',   es:'movimiento',   art:'el', zh:'動作',   ex:{es:'Haz el movimiento lento.',      zh:'動作慢一點做。', chunks:[{w:"Haz",role:"v"},{w:"el movimiento",role:"o"},{w:"lento.",role:"c"}]}},
      {en:'sentiment',  es:'sentimiento',  art:'el', zh:'情感',   ex:{es:'Es un sentimiento bonito.',     zh:'這是個美好的情感。', chunks:[{w:"Es",role:"v"},{w:"un sentimiento bonito.",role:"c"}]}},
      {en:'instrument', es:'instrumento',  art:'el', zh:'樂器',   ex:{es:'Toca el instrumento bien.',     zh:'樂器彈得很好。', chunks:[{w:"Toca",role:"v"},{w:"el instrumento",role:"o"},{w:"bien.",role:"c"}]}},
      {en:'argument',   es:'argumento',    art:'el', zh:'論點',   ex:{es:'Es un buen argumento.',         zh:'這是個好論點。', chunks:[{w:"Es",role:"v"},{w:"un buen argumento.",role:"c"}]}},
    ]
  },
  {
    rule: '-ble → -ble',
    hint: '英文 -ble 形容詞字尾不變',
    words: [
      {en:'possible',    es:'posible',      art:'', zh:'可能的',     ex:{es:'Todo es posible.',              zh:'一切都是可能的。', chunks:[{w:"Todo",role:"s"},{w:"es",role:"v"},{w:"posible.",role:"c"}]}},
      {en:'terrible',    es:'terrible',     art:'', zh:'可怕的',     ex:{es:'¡Es terrible!',                zh:'太可怕了！', chunks:[{w:"¡Es",role:"v"},{w:"terrible!",role:"c"}]}},
      {en:'incredible',  es:'increíble',    art:'', zh:'難以置信的', ex:{es:'Es increíble.',                zh:'難以置信。', chunks:[{w:"Es",role:"v"},{w:"increíble.",role:"c"}]}},
      {en:'responsible', es:'responsable',  art:'', zh:'負責任的',   ex:{es:'Sé responsable.',              zh:'要負責任。', chunks:[{w:"Sé",role:"v"},{w:"responsable.",role:"c"}]}},
      {en:'flexible',    es:'flexible',     art:'', zh:'靈活的',     ex:{es:'Hay que ser flexible.',        zh:'要靈活。', chunks:[{w:"Hay que ser",role:"v"},{w:"flexible.",role:"c"}]}},
    ]
  },
  {
    rule: '-or → -or / -ora（職業）',
    hint: '英文 -or 職業 → 西語 el__ -or（男）/ la__ -ora（女）<br>actor 例外變 actriz',
    words: [
      {en:'doctor',    es:'doctor',    art:'el', zh:'醫生',   gendered:{ms:'doctor',fs:'doctora',mp:'doctores',fp:'doctoras'},   ex:{es:'La doctora es muy buena.',    zh:'這位醫生很厲害。', chunks:[{w:"La doctora",role:"s"},{w:"es",role:"v"},{w:"muy buena.",role:"c"}]}},
      {en:'actor',     es:'actor',     art:'el', zh:'演員',   gendered:{ms:'actor',fs:'actriz',mp:'actores',fp:'actrices'},      ex:{es:'Es un actor famoso.',         zh:'他是知名演員。', chunks:[{w:"Es",role:"v"},{w:"un actor famoso.",role:"c"}]}},
      {en:'professor', es:'profesor',  art:'el', zh:'教授',   gendered:{ms:'profesor',fs:'profesora',mp:'profesores',fp:'profesoras'}, ex:{es:'La profesora explica bien.',zh:'老師解釋得很清楚。', chunks:[{w:"La profesora",role:"s"},{w:"explica",role:"v"},{w:"bien.",role:"c"}]}},
      {en:'director',  es:'director',  art:'el', zh:'導演',   gendered:{ms:'director',fs:'directora',mp:'directores',fp:'directoras'}, ex:{es:'La directora ganó un premio.',zh:'導演贏得了獎項。', chunks:[{w:"La directora",role:"s"},{w:"ganó",role:"v"},{w:"un premio.",role:"o"}]}},
      {en:'inspector', es:'inspector', art:'el', zh:'督察',   gendered:{ms:'inspector',fs:'inspectora',mp:'inspectores',fp:'inspectoras'}, ex:{es:'La inspectora revisa todo.',zh:'督察檢查一切。', chunks:[{w:"La inspectora",role:"s"},{w:"revisa",role:"v"},{w:"todo.",role:"o"}]}},
    ]
  },
  {
    rule: '-y → la__ -ia（名詞）',
    hint: '英文 -y → 西語 la__ -ia,名詞字尾，發音接近',
    words: [
      {en:'history',   es:'historia',  art:'la', zh:'歷史',   ex:{es:'Me gusta la historia.',          zh:'我喜歡歷史。', chunks:[{w:"Me gusta",role:"v"},{w:"la historia.",role:"s"}]}},
      {en:'memory',    es:'memoria',   art:'la', zh:'記憶',   ex:{es:'Tiene buena memoria.',           zh:'她記憶力很好。', chunks:[{w:"Tiene",role:"v"},{w:"buena memoria.",role:"o"}]}},
      {en:'pharmacy',  es:'farmacia',  art:'la', zh:'藥局',   ex:{es:'Voy a la farmacia.',             zh:'我去藥局。', chunks:[{w:"Voy",role:"v"},{w:"a la farmacia.",role:"o"}]}},
      {en:'victory',   es:'victoria',  art:'la', zh:'勝利',   ex:{es:'¡Es la victoria!',              zh:'是勝利！', chunks:[{w:"¡Es",role:"v"},{w:"la victoria!",role:"c"}]}},
      {en:'biology',   es:'biología',  art:'la', zh:'生物學', ex:{es:'Estudio biología.',              zh:'我念生物學。', chunks:[{w:"Estudio",role:"v"},{w:"biología.",role:"o"}]}},
      {en:'economy',   es:'economía',  art:'la', zh:'經濟',   ex:{es:'La economía crece.',             zh:'經濟在成長。', chunks:[{w:"La economía",role:"s"},{w:"crece.",role:"v"}]}},
    ]
  },
  {
    rule: '-ar / -er / -ir（動詞字尾)',
    hint: '英文動詞加上 -ar/-er/-ir 秒變西語動詞！Link→linkear',
    words: [
      {en:'visit',    es:'visitar',    art:'', zh:'拜訪', ex:{es:'Vamos a visitar a la abuela.',    zh:'我們去探望奶奶。', chunks:[{w:"Vamos a visitar",role:"v"},{w:"a la abuela.",role:"o"}]}},
      {en:'practice', es:'practicar',  art:'', zh:'練習', ex:{es:'Hay que practicar cada día.',     zh:'每天都要練習。', chunks:[{w:"Hay que practicar",role:"v"},{w:"cada día.",role:"c"}]}},
      {en:'use',      es:'usar',       art:'', zh:'使用', ex:{es:'¿Puedo usar esto?',              zh:'我可以用這個嗎？', chunks:[{w:"¿Puedo usar",role:"v"},{w:"esto?",role:"o"}]}},
      {en:'depend',   es:'depender',   art:'', zh:'依賴', ex:{es:'Depende de ti.',                 zh:'取決於你。', chunks:[{w:"Depende",role:"v"},{w:"de ti.",role:"o"}]}},
      {en:'exist',    es:'existir',    art:'', zh:'存在', ex:{es:'El amor existe.',                zh:'愛是存在的。', chunks:[{w:"El amor",role:"s"},{w:"existe.",role:"v"}]}},
      {en:'permit',   es:'permitir',   art:'', zh:'允許', ex:{es:'No se permite entrar.',          zh:'不允許進入。', chunks:[{w:"No se permite",role:"v"},{w:"entrar.",role:"o"}]}},
    ]
  },
];

// ── 建立 cognate details HTML ──
function buildCogDetails(data){
  const rowsHtml = data.rows.map(r=>`<div class="cog-detail-row">${r}</div>`).join('');
  return `<details class="cog-details">
    <summary>
      <span>✨ ${data.title}</span>
      <span class="cog-unlock-badge">💡 揭開原釀秘方</span>
    </summary>
    <div class="cog-body">
      ${rowsHtml}
    </div>
  </details>`;
}

// ── YouGlish Panel ──
function openYGPanel(keyword){ window.open('https://youglish.com/pronounce/'+encodeURIComponent(keyword)+'/spanish','_blank','noopener'); }
function closeYG(){}
