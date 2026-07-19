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
  ]},
  {zh:'演員', options:[
    {suf:'', word:'actor', ex:'El actor es muy famoso.', exZh:'這位男演員很有名。（男）'},
    {suf:'a', word:'actriz', ex:'La actriz es muy famosa.', exZh:'這位女演員很有名。（女，特殊變化：actor→actriz）'}
  ]},
  {zh:'老師／教授', options:[
    {suf:'', word:'profesor', ex:'El profesor explica bien.', exZh:'這位男老師解釋得很清楚。（男）'},
    {suf:'a', word:'profesora', ex:'La profesora explica bien.', exZh:'這位女老師解釋得很清楚。（女）'}
  ]},
  {zh:'導演', options:[
    {suf:'', word:'director', ex:'El director ganó un premio.', exZh:'這位男導演得獎了。（男）'},
    {suf:'a', word:'directora', ex:'La directora ganó un premio.', exZh:'這位女導演得獎了。（女）'}
  ]},
  {zh:'督察', options:[
    {suf:'', word:'inspector', ex:'El inspector revisa todo.', exZh:'這位男督察檢查一切。（男）'},
    {suf:'a', word:'inspectora', ex:'La inspectora revisa todo.', exZh:'這位女督察檢查一切。（女）'}
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
  'e1_s8':'están jugando',     'e1_s9':'han estado saltando',
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
    title:'🐱 A todos les encanta — 所有人都愛',
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
    title:'🚀 han estado saltando — 完成進行式',
    rows:[
      '👉 <b>han estado + -ando</b> = you have been doing（完成進行式，拉美用 ustedes han，不用 vosotros habéis）',
      '💡 英文 have been jumping = han estado saltando，結構完全平行！',
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
  {en:'germane',   es:'hermano',   art:'el',  zh:'相關的、切題的（germane）／兄弟（hermano）', ep:'E1 · 泥巴坑',
    cognateInfo:{
      relationType:'confirmed', confidence:'high',
      originRoot:'germanus（同父母的、親生的，用於兄弟姊妹）',
      originChain:{
        branches:[
          {language:'English', path:'germanus → germane', meaningShift:'親兄弟 → （比喻）密切相關的、切題的'},
          {language:'Spanish', path:'germanus → hermano', meaningShift:'親兄弟（伊比利羅曼語系直接保留這個字表示兄弟，跟法語/義大利語用frater家族的字不同）'}
        ]
      },
      source:'etymonline.com、Wiktionary，2026-07-19查證'
    }},
  {en:'potent',    es:'poder',     art:'',    zh:'能夠／有力的', ep:'E1 · 泥巴坑',
    cognateInfo:{
      relationType:'confirmed', confidence:'high',
      originRoot:'potis/posse（能夠、有力量）',
      originChain:{branches:[
        {language:'English', path:'potis → potens → potent', meaningShift:'能夠 → 有力的'},
        {language:'Spanish', path:'potis → posse → potere → poder', meaningShift:'能夠 → 能夠（動詞）/權力（名詞）'}
      ]},
      source:'etymonline.com、buenospanish.com，2026-07-19查證'
    }},
  {en:'juggle',    es:'jugar',     art:'',    zh:'玩',         ep:'E1 · 泥巴坑',
    cognateInfo:{
      relationType:'confirmed', confidence:'high',
      originRoot:'iocus/iocari（笑話、玩笑、開玩笑）',
      originChain:{branches:[
        {language:'English', path:'iocari → ioculari → jogler(古法語) → juggle', meaningShift:'開玩笑 → 表演雜耍'},
        {language:'Spanish', path:'iocari → jugar', meaningShift:'開玩笑 → 玩'}
      ]},
      source:'etymonline.com、spanishetymology.com，2026-07-19查證（英文joke也是同一家族）'
    }},
  {en:'boots',     es:'botas',     art:'las', zh:'靴子',       ep:'E1 · 泥巴坑',
    cognateInfo:{
      relationType:'confirmed', confidence:'medium',
      originRoot:'古法語bote/botte（源頭不明，可能來自法蘭克語*butt「切短、鈍」）',
      originChain:{branches:[
        {language:'English', path:'古法語bote → boot(s)', meaningShift:'鞋靴'},
        {language:'Spanish', path:'古法語botte → bota(s)', meaningShift:'鞋靴（13世紀借入）'}
      ]},
      source:'etymonline.com、Wiktionary，2026-07-19查證（英西各自從古法語借入，不是直接互相衍生，但共同源頭確認）'
    }},
  {en:'duty',      es:'deber',     art:'',    zh:'必須／義務',  ep:'E1 · 泥巴坑',
    cognateInfo:{
      relationType:'confirmed', confidence:'high',
      originRoot:'debere（虧欠、應該）',
      originChain:{branches:[
        {language:'English', path:'debere → debitus → 古法語deu → duty', meaningShift:'虧欠 → 應盡的義務'},
        {language:'Spanish', path:'debere → deber', meaningShift:'虧欠 → 必須、義務'}
      ]},
      source:'etymonline.com、buenospanish.com，2026-07-19查證'
    }},
  {en:'charcoal',  es:'charco',    art:'el',  zh:'水坑',       ep:'E1 · 泥巴坑',
    cognateInfo:{
      relationType:'falseFriend', confidence:'high',
      note:'charcoal源自古英語charren(轉變)+cole(煤炭)，純日耳曼語構詞；charco是西班牙前羅馬時期的伊比利語底層詞，兩者詞源完全不相干，只是拼字剛好相似，純屬巧合，連🌐語感橋樑都不適合放',
      source:'etymonline.com，2026-07-19查證'
    }},
  {en:'enchant',   es:'encantar',  art:'',    zh:'使著迷／超愛', ep:'E1 · 泥巴坑'},
  {en:'counter',   es:'contra',    art:'',    zh:'相對／遇見',  ep:'E1 · 泥巴坑'},
  {en:'encounter', es:'encontrar', art:'',    zh:'找到／遭遇',  ep:'E1 · 泥巴坑'},
  {en:'grand',     es:'grande',    art:'',    zh:'宏大／大的',  ep:'E1 · 泥巴坑'},
  {en:'barren',    es:'barro',     art:'el',  zh:'泥巴',       ep:'E1 · 泥巴坑',
    cognateInfo:{
      relationType:'uncertain', confidence:'low',
      note:'兩者詞源都指向可能的凱爾特語根，但查證後是不同的凱爾特詞根（barro←*barr-「泥土」；barren←bar-/baraigne「休耕地/裸露」），現有學術文獻對兩者是否真的同源持懷疑態度',
      source:'etymonline.com、Wiktionary，2026-07-19查證'
    }},
  {en:'pass',      es:'pasar',     art:'',    zh:'通過／發生',  ep:'E1 · 泥巴坑',
    cognateInfo:{
      relationType:'confirmed', confidence:'high',
      originRoot:'passus（腳步）',
      originChain:{branches:[
        {language:'English', path:'passus → 通俗拉丁語passare → 古法語passer → pass', meaningShift:'腳步 → 通過'},
        {language:'Spanish', path:'passus → 通俗拉丁語passare → pasar', meaningShift:'腳步 → 通過、發生'}
      ]},
      source:'etymonline.com、Wiktionary，2026-07-19查證'
    }},
  {en:'total',     es:'todos',     art:'',    zh:'全部／所有人', ep:'E1 · 泥巴坑',
    cognateInfo:{
      relationType:'confirmed', confidence:'high',
      originRoot:'totus（全部、整個）',
      originChain:{branches:[
        {language:'English', path:'totus → 中世紀拉丁語totalis → total', meaningShift:'全部 → 總計的'},
        {language:'Spanish', path:'totus → todo(s)', meaningShift:'全部 → 全部、所有人'}
      ]},
      source:'etymonline.com、spanishetymology.com，2026-07-19查證'
    }},
  // E2 · 骷髏先生不見了
  {en:'favorite',   es:'favorito',  art:'',    zh:'最喜歡的',   ep:'E2 · 骷髏先生不見了'},
  {en:'lateral',    es:'lado',      art:'el',  zh:'側面',       ep:'E2 · 骷髏先生不見了'},
  {en:'perdition',  es:'perdido',   art:'',    zh:'失落／弄丟了', ep:'E2 · 骷髏先生不見了'},
  {en:'preoccupy',  es:'preocupar', art:'',    zh:'擔心',       ep:'E2 · 骷髏先生不見了'},
  {en:'detective',  es:'detective', art:'el',  zh:'偵探',       ep:'E2 · 骷髏先生不見了',
    cognateInfo:{
      relationType:'confirmed', confidence:'high',
      originRoot:'detegere（揭開、發現，de+tegere「蓋」）',
      originChain:{branches:[
        {language:'English', path:'detegere → detectus → detective（17世紀英文自行用拉丁詞根+ive字尾造字）', meaningShift:'揭開 → 偵探'},
        {language:'Spanish', path:'直接借用英文detective這個字（不是各自從拉丁文獨立造字，是西語借了英文已經造好的詞）', meaningShift:'偵探（詞形借用，但終極詞根相同）'}
      ]},
      source:'etymonline.com，2026-07-19查證（西語是借詞不是平行演變，但共同追溯到拉丁detegere仍成立）'
    }},
  {en:'person',     es:'persona',   art:'la',  zh:'人',         ep:'E2 · 骷髏先生不見了'},
  {en:'bath',       es:'bañera',    art:'la',  zh:'浴缸',       ep:'E2 · 骷髏先生不見了',
    cognateInfo:{
      relationType:'falseFriend', confidence:'high',
      note:'bath源自古英語bæþ（日耳曼語族，原意「使溫暖」），bañera源自bañar←拉丁語balneum（源自希臘語balaneion）——日耳曼語跟拉丁/希臘語兩條不同的語源線，只是概念都跟洗澡有關，適合當🌐語感橋樑候選',
      source:'etymonline.com，2026-07-19查證'
    }},
  {en:'where',      es:'dónde',     art:'',    zh:'哪裡',       ep:'E2 · 骷髏先生不見了',
    cognateInfo:{
      relationType:'falseFriend', confidence:'high',
      note:'where源自原始日耳曼語*hwar，dónde源自拉丁語de+unde（從哪裡）——兩個疑問詞各自獨立演變，只是剛好都翻成「哪裡」，是翻譯對應誤放進同源庫，不是真的同源詞，連🌐語感橋樑都不需要（單純翻譯對照）',
      source:'etymonline.com，2026-07-19查證'
    }},
  {en:'chamber',    es:'cama',      art:'la',  zh:'床／房間',    ep:'E2 · 骷髏先生不見了',
    cognateInfo:{
      relationType:'uncertain', confidence:'low',
      note:'chamber確定源自拉丁語camera（源自希臘語kamara，拱頂房間）；但cama的詞源本身在學界有爭議——一說源自希臘語khamai（在地上）演變成晚期拉丁語cama，一說是前羅馬時期伊比利凱爾特語借詞，兩種說法都跟chamber的camera/kamara不是同一個希臘詞根',
      source:'spanishetymology.com、Wiktionary，2026-07-19查證'
    }},
  {en:'dad',        es:'papá',      art:'el',  zh:'爸爸',       ep:'E2 · 骷髏先生不見了',
    cognateInfo:{
      relationType:'falseFriend', confidence:'high',
      note:'語言學上稱為「保姆詞/兒語詞」現象——dad跟papá都是嬰兒牙牙學語階段最早發出的雙唇音+開口母音（m/p/b+a），全世界互不相關的語言都獨立長出類似的稱呼父母的字，不是因為同一個語言祖先傳下來的，是人類發聲器官發展的共同生理現象，適合當文化小知識介紹',
      source:'Psychology Today、The Conversation語言學文章，2026-07-19查證'
    }},
  // E3 · 最好的朋友
  {en:'expect',    es:'esperar',   art:'',    zh:'期待／等待',      ep:'E3 · 最好的朋友',
    cognateInfo:{
      relationType:'falseFriend', confidence:'high',
      note:'expect源自拉丁語exspectare（ex+spectare「看」，字根*spek-「觀察」），esperar源自拉丁語sperare（「希望」，字根*speh₁-）——是兩個不同的拉丁動詞，只是拼字都有「esp-/exp-」開頭造成視覺相似，適合當🌐語感橋樑候選',
      source:'etymonline.com，2026-07-19查證'
    }},
  {en:'major',     es:'mejor',     art:'',    zh:'較好的／最好的',   ep:'E3 · 最好的朋友',
    cognateInfo:{
      relationType:'falseFriend', confidence:'high',
      note:'major源自拉丁語maior（magnus「大」的比較級），mejor源自拉丁語melior（bonus「好」的比較級）——兩個形容詞各自的比較級，字根不同，只是「-jor/-jor」字尾長得像，適合當🌐語感橋樑候選',
      source:'Wiktionary，2026-07-19查證'
    }},
  {en:'much',      es:'mucho',     art:'',    zh:'很多',            ep:'E3 · 最好的朋友',
    cognateInfo:{
      relationType:'falseFriend', confidence:'high',
      note:'much源自原始日耳曼語*mikilaz（大/多），mucho源自拉丁語multus（多）——查證確認兩者的相似純屬巧合，適合當🌐語感橋樑候選',
      source:'Wiktionary，2026-07-19查證'
    }},
  {en:'query',     es:'querer',    art:'',    zh:'查詢、詢問（query）／想要、喜歡、愛（querer）',      ep:'E3 · 最好的朋友',
    cognateInfo:{
      relationType:'confirmed', confidence:'high',
      originRoot:'quaerere（尋求、詢問）',
      originChain:{
        branches:[
          {language:'English', path:'querre → query', meaningShift:'尋求 → 詢問、查詢'},
          {language:'Spanish', path:'querer', meaningShift:'尋求 → 想要、追求 → 愛（12世紀才發展出「愛」的語意）'}
        ]
      },
      source:'etymonline.com、buenospanish.com，2026-07-19查證'
    }},
  {en:'game',      es:'juego',     art:'el',  zh:'遊戲',            ep:'E3 · 最好的朋友',
    cognateInfo:{
      relationType:'falseFriend', confidence:'high',
      note:'game源自古英語gamen（日耳曼語族*gamaną），juego源自拉丁語iocus（笑話、娛樂）——兩者詞源不同，只是概念相近（都表示玩樂/遊戲），適合當🌐語感橋樑候選（兩種語言用不同的詞表達同一個生活概念）',
      source:'etymonline.com、Wiktionary，2026-07-19查證'
    }},
  {en:'princess',  es:'princesa',  art:'la',  zh:'公主',            ep:'E3 · 最好的朋友'},
  {en:'account',   es:'cuento',    art:'el',  zh:'帳戶、帳目、說明、敘述（account）／故事（cuento）', ep:'E3 · 最好的朋友',
    cognateInfo:{
      relationType:'confirmed', confidence:'high',
      originRoot:'computare（計算、清點）',
      originChain:{
        branches:[
          {language:'English', path:'conter → account', meaningShift:'帳目 → 敘述'},
          {language:'Spanish', path:'contar → cuento', meaningShift:'計算 → 講述 → 故事'}
        ]
      },
      source:'etymonline.com、elcastellano.org，2026-07-19查證'
    }},
  {en:'gusto',     es:'gustar',    art:'',    zh:'品味／享受／喜歡', ep:'E3 · 最好的朋友'},
  {en:'doctor',    es:'doctora',   art:'la',  zh:'醫生',            ep:'E3 · 最好的朋友'},
  {en:'infirmary', es:'enfermera', art:'la',  zh:'醫務室／護士',    ep:'E3 · 最好的朋友'},
  {en:'respire',   es:'respirar',  art:'',    zh:'呼吸',            ep:'E3 · 最好的朋友'},
  {en:'profound',  es:'hondo',     art:'',    zh:'深刻的（profound）／深的（hondo）', ep:'E3 · 最好的朋友',
    cognateInfo:{
      relationType:'confirmed', confidence:'high',
      originRoot:'fundus（底部、基底）',
      originChain:{
        branches:[
          {language:'English', path:'pro+fundus → profundus → profound', meaningShift:'底部 → 深的 → （比喻）深刻的'},
          {language:'Spanish', path:'fundus → hondo（f→h音變，西語常見規律，如filius→hijo）', meaningShift:'底部 → 深的'}
        ]
      },
      source:'spanishetymology.com，2026-07-19查證'
    }},
  {en:'credible',  es:'creer',     art:'',    zh:'相信',            ep:'E3 · 最好的朋友'},
  {en:'core',      es:'corazón',   art:'el',  zh:'核心／心臟',      ep:'E3 · 最好的朋友',
    cognateInfo:{
      relationType:'uncertain', confidence:'low',
      note:'corazón確定源自拉丁語cor（心，PIE字根*kerd-）；但英文core的詞源本身不確定——字典多標「obscure and uncertain origin」，可能來自古法語cuer/coeur（源自拉丁cor，若成立則兩者同源），也可能來自古法語cors（源自拉丁corpus「身體」，不同字根），或甚至是英語本土獨立詞——三種可能性並存',
      source:'etymonline.com、Wiktionary，2026-07-19查證'
    }},
  {en:'cure',      es:'curar',     art:'',    zh:'治療／康復',      ep:'E3 · 最好的朋友'},
];

// ── 同源詞「依規律」分類標籤（key=en，純瀏覽用的覆蓋分類，不影響上面依集數的原始資料）──
// VERA 覺得依集數看很難發現規律，加這層純視圖切換，同一份資料換個角度看
const COGNATE_PATTERN_TAGS = {
  // 🔤 字尾公式：跟 SUFFIX_PATTERNS 的公式對得上
  doctor:'suffix', infirmary:'suffix',
  // 🔡 雙子音簡化：英文雙子音到西語變單子音（tt/ss/ff/rr→單一子音）
  boots:'double', pass:'double', princess:'double', barren:'double',
  // 🌊 語音演變：拉丁字根走了不同路線，字形變化較大
  juggle:'sound', charcoal:'sound', enchant:'sound', encounter:'sound',
  chamber:'sound', preoccupy:'sound', respire:'sound', game:'sound',
  // ⭐ 高頻核心字：太常用，各自保留最古老樣貌，不走公式
  germane:'core', dad:'core', where:'core', much:'core', major:'core',
};
const COGNATE_PATTERN_LABELS = {
  suffix:'🔤 字尾公式（背公式秒懂）',
  double:'🔡 雙子音簡化（英文少打一個字母）',
  sound:'🌊 語音演變（字根繞了個彎，形狀變比較多）',
  core:'⭐ 高頻核心字（太常用了，各自獨立背）',
  other:'🌱 老朋友（字根相通，不硬套公式）',
};

// ── 🍄 小心這顆有毒：假野莓（False Cognates）長得像英文卻歪掉的字 ──
const FALSE_COGNATES = [
  {es:'embarazada', art:'', looksLike:'embarrassed', wrongZh:'尷尬', realZh:'懷孕的',
    trap:'想說「我好尷尬」千萬別講 Estoy embarazada，大家會開始恭喜妳懷孕！尷尬要說 Qué vergüenza 或 Estoy avergonzada。',
    wrongEx:{es:'¡Estoy tan embarazada ahora mismo!', zh:'😳 字面：「我現在好懷孕！」（本來只是想講尷尬）'},
    rightEx:{es:'¡Qué vergüenza! Me equivoqué de nombre.', zh:'✅ 真的想講尷尬：「好尷尬！我叫錯名字了。」'}},
  {es:'actualmente', art:'', looksLike:'actually', wrongZh:'實際上', realZh:'目前、現在',
    trap:'真正的「實際上」要說 En realidad，actualmente 只是「現在、目前」的意思。',
    wrongEx:{es:'Actualmente, no sé qué está pasando.', zh:'😅 這句其實是「目前我不知道發生什麼事」，不是「實際上」'},
    rightEx:{es:'En realidad, no sé qué está pasando.', zh:'✅ 真的想講「實際上」，要換這個字'}},
  {es:'soportar', art:'', looksLike:'support', wrongZh:'支持', realZh:'忍受、容忍',
    trap:'想說「我很支持我兒子」別說 Soporto a mi hijo，聽起來像「我每天忍受我兒子」！支持要用 apoyar。',
    wrongEx:{es:'Yo soporto mucho a mi hijo.', zh:'😬 字面：「我每天忍受我兒子。」（聽起來很嫌棄自己小孩）'},
    rightEx:{es:'Yo apoyo mucho a mi hijo.', zh:'✅ 真心支持孩子：「我很支持我兒子。」'}},
  {es:'éxito', art:'el', looksLike:'exit', wrongZh:'出口', realZh:'成功、成就',
    trap:'真正的「出口」是 salida，éxito 是成功、成就的意思。',
    wrongEx:{es:'¿Dónde está el éxito de este edificio?', zh:'🤔 字面問：「這棟大樓的『成功』在哪？」（其實是問出口）'},
    rightEx:{es:'¿Dónde está la salida de este edificio?', zh:'✅ 真的想問出口：「這棟大樓的出口在哪裡？」'}},
  {es:'constipado', art:'', looksLike:'constipated', wrongZh:'便秘', realZh:'感冒、鼻塞',
    trap:'西班牙人說 Estoy constipado 是在說「我感冒了」，不是便秘！便秘要說 estar estreñido/a。這是西語教學裡最經典的假朋友之一，鬧過無數笑話。',
    wrongEx:{es:'Estoy muy constipado, no puedo respirar bien.', zh:'😅 字面聽起來像在講便秘，其實是「我感冒很嚴重，呼吸不太順」'},
    rightEx:{es:'Llevo tres días estreñido, necesito comer más fibra.', zh:'✅ 真的想講便秘：「我便秘三天了，需要多吃點纖維」'}},
  {es:'realizar', art:'', looksLike:'realize', wrongZh:'意識到、發覺', realZh:'完成、執行、實現',
    trap:'英文realize（意識到）的西語是darse cuenta de，realizar是「完成/執行一件事」，兩者意思完全不同方向。',
    wrongEx:{es:'Realicé que había cometido un error.', zh:'❌ 這句話文法上怪怪的，母語者不會這樣講「意識到」'},
    rightEx:{es:'Me di cuenta de que había cometido un error. / Realicé mi sueño de viajar a España.', zh:'✅ 意識到用darse cuenta de；realizar留給「實現夢想/完成計畫」：「我實現了去西班牙旅行的夢想」'}},
  {es:'carpeta', art:'la', looksLike:'carpet', wrongZh:'地毯', realZh:'資料夾',
    trap:'carpeta是放文件的資料夾（紙本或電腦裡的都算），地毯要說alfombra，兩個字長得像但完全不是同一樣東西。',
    wrongEx:{es:'Compré una carpeta nueva para la sala.', zh:'🤔 字面聽起來像「我買了一張新地毯放客廳」，但母語者會理解成買了個資料夾放客廳，很奇怪'},
    rightEx:{es:'Compré una alfombra nueva para la sala.', zh:'✅ 真的想講地毯：「我買了一張新地毯放客廳」'}},
  {es:'asistir', art:'', looksLike:'assist', wrongZh:'協助、幫忙', realZh:'參加、出席',
    trap:'asistir a算是「出席/參加」（asistir a una reunión＝參加會議），協助/幫忙要說ayudar，兩者方向不同——一個是「人在場」，一個是「動手幫忙」。',
    wrongEx:{es:'Voy a asistir a mi hermano con la tarea.', zh:'❌ 母語者聽了會困惑，asistir a不是這樣用來表達「幫忙」的'},
    rightEx:{es:'Voy a ayudar a mi hermano con la tarea. / Voy a asistir a la reunión mañana.', zh:'✅ 協助用ayudar；asistir留給「出席」：「我明天要參加會議」'}}
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
      {en:'distance',    es:'distancia',    art:'la', zh:'距離',   ex:{es:'¿Cuál es la distancia?',        zh:'距離多遠？', chunks:[{w:"¿Cuál",role:"c"},{w:"es",role:"v"},{w:"la distancia?",role:"s"}]}},
      {en:'importance',  es:'importancia',  art:'la', zh:'重要性', ex:{es:'Tiene mucha importancia.',      zh:'這非常重要。', chunks:[{w:"Tiene",role:"v"},{w:"mucha importancia.",role:"o"}]}},
      {en:'difference',  es:'diferencia',   art:'la', zh:'差異',   ex:{es:'¿Cuál es la diferencia?',      zh:'差異在哪裡？', chunks:[{w:"¿Cuál",role:"c"},{w:"es",role:"v"},{w:"la diferencia?",role:"s"}]}},
    ]
  },
  {
    rule: '-ment → el___-mento / -miento',
    hint: '心理狀態/抽象的動作。<br>動作名詞化：mover→movimiento',
    words: [
      {en:'moment',     es:'momento',      art:'el', zh:'時刻',   ex:{es:'Es el momento perfecto.',        zh:'這是完美的時刻。', chunks:[{w:"Es",role:"v"},{w:"el momento perfecto.",role:"c"}]}},
      {en:'movement',   es:'movimiento',   art:'el', zh:'動作',   ex:{es:'Haz el movimiento lento.',      zh:'把動作放慢點。', chunks:[{w:"Haz",role:"v"},{w:"el movimiento",role:"o"},{w:"lento.",role:"c"}]}},
      {en:'sentiment',  es:'sentimiento',  art:'el', zh:'情感',   ex:{es:'Es un sentimiento bonito.',     zh:'這是個美好的情感。', chunks:[{w:"Es",role:"v"},{w:"un sentimiento bonito.",role:"c"}]}},
      {en:'instrument', es:'instrumento',  art:'el', zh:'樂器',   ex:{es:'El instrumento suena muy bien.', zh:'這個樂器音色很好。', chunks:[{w:"El instrumento",role:"s"},{w:"suena",role:"v"},{w:"muy bien.",role:"c"}]}},
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
      {en:'director',  es:'director',  art:'el', zh:'導演',   gendered:{ms:'director',fs:'directora',mp:'directores',fp:'directoras'}, ex:{es:'La directora ganó un premio.',zh:'導演得獎了。', chunks:[{w:"La directora",role:"s"},{w:"ganó",role:"v"},{w:"un premio.",role:"o"}]}},
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
      {en:'victory',   es:'victoria',  art:'la', zh:'勝利',   ex:{es:'¡Es la victoria!',              zh:'是勝利！（贏了🌟）', chunks:[{w:"¡Es",role:"v"},{w:"la victoria!",role:"c"}]}},
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
      {en:'depend',   es:'depender',   art:'', zh:'依賴', ex:{es:'Depende de ti.',                 zh:'靠你囉。', chunks:[{w:"Depende",role:"v"},{w:"de ti.",role:"o"}]}},
      {en:'exist',    es:'existir',    art:'', zh:'存在', ex:{es:'El amor existe.',                zh:'愛是存在的。', chunks:[{w:"El amor",role:"s"},{w:"existe.",role:"v"}]}},
      {en:'permit',   es:'permitir',   art:'', zh:'允許', ex:{es:'No se permite entrar.',          zh:'請勿進入。（不允許進入）', chunks:[{w:"No se permite",role:"v"},{w:"entrar.",role:"o"}]}},
    ]
  },
  {
    rule: '-ous → -oso / -osa（形容詞）',
    hint: '英文「充滿⋯的」形容詞字尾，西語對應到 -oso/-osa',
    words: [
      {en:'famous',    es:'famoso',    art:'', zh:'有名的',  ex:{es:'Nita es muy famosa.',            zh:'妮妲很有名。', chunks:[{w:"Nita",role:"s"},{w:"es muy famosa.",role:"v"}]}},
      {en:'furious',   es:'furioso',   art:'', zh:'憤怒的',  ex:{es:'Papá Tato está furioso.',        zh:'達多爸爸很生氣。', chunks:[{w:"Papá Tato",role:"s"},{w:"está furioso.",role:"v"}]}},
      {en:'delicious', es:'delicioso', art:'', zh:'美味的',  ex:{es:'La comida está deliciosa.',      zh:'這道菜很美味。', chunks:[{w:"La comida",role:"s"},{w:"está deliciosa.",role:"v"}]}},
      {en:'curious',   es:'curioso',   art:'', zh:'好奇的',  ex:{es:'Tito es muy curioso.',           zh:'迪多很好奇。', chunks:[{w:"Tito",role:"s"},{w:"es muy curioso.",role:"v"}]}},
    ]
  },
  {
    rule: '-ly → -mente（副詞）',
    hint: '英文最常見的副詞字尾。變形先把形容詞變陰性(字尾改a)，再接 -mente',
    words: [
      {en:'rapidly',   es:'rápidamente',   art:'', zh:'快速地', ex:{es:'Corre rápidamente.',           zh:'他跑得很快。', chunks:[{w:"Corre",role:"v"},{w:"rápidamente.",role:"c"}]}},
      {en:'exactly',   es:'exactamente',   art:'', zh:'確切地', ex:{es:'Es exactamente lo que quiero.', zh:'這正是我想要的。', chunks:[{w:"Es",role:"v"},{w:"exactamente lo que quiero.",role:"c"}]}},
      {en:'perfectly', es:'perfectamente', art:'', zh:'完美地', ex:{es:'Entiendo perfectamente.',       zh:'我完全理解。（完美地理解）', chunks:[{w:"Entiendo",role:"v"},{w:"perfectamente.",role:"c"}]}},
      {en:'finally',   es:'finalmente',    art:'', zh:'最後',   ex:{es:'Finalmente llegamos.',          zh:'我們終於到了。', chunks:[{w:"Finalmente",role:"c"},{w:"llegamos.",role:"v"}]}},
    ]
  },
  {
    rule: '-ic → -ico / -ica（形容詞／名詞）',
    hint: '西語加上 o/a，重音通常落在倒數第三音節(要加重音符號)',
    words: [
      {en:'fantastic', es:'fantástico', art:'', zh:'棒極了的', ex:{es:'¡Qué fantástico!',              zh:'太棒了！', chunks:[{w:"¡Qué fantástico!",role:"c"}]}},
      {en:'public',    es:'público',    art:'el', zh:'公開的／公共的', ex:{es:'Es un parque público.',  zh:'這是一座公園。', chunks:[{w:"Es",role:"v"},{w:"un parque público.",role:"c"}]}},
      {en:'romantic',  es:'romántico',  art:'', zh:'浪漫的', ex:{es:'Es una película romántica.',      zh:'這是一部浪漫電影。', chunks:[{w:"Es",role:"v"},{w:"una película romántica.",role:"c"}]}},
      {en:'music',     es:'música',     art:'la', zh:'音樂', ex:{es:'Me encanta la música.',           zh:'我超愛音樂。', chunks:[{w:"Me encanta",role:"v"},{w:"la música.",role:"o"}]}},
    ]
  },
  {
    rule: '-ist → -ista（職業／人）',
    hint: '不分男女字尾，前面照性別配 el 或 la',
    words: [
      {en:'artist',  es:'artista',  art:'la', zh:'藝術家', ex:{es:'Ella es una gran artista.',   zh:'她是個很棒的藝術家。', chunks:[{w:"Ella",role:"s"},{w:"es una gran artista.",role:"v"}]}},
      {en:'dentist', es:'dentista', art:'el', zh:'牙醫',   ex:{es:'Voy al dentista mañana.',     zh:'我明天要去看牙醫。', chunks:[{w:"Voy al dentista",role:"v"},{w:"mañana.",role:"c"}]}},
      {en:'tourist', es:'turista',  art:'el', zh:'觀光客', ex:{es:'Hay muchos turistas aquí.',   zh:'這裡有很多觀光客。', chunks:[{w:"Hay muchos turistas",role:"v"},{w:"aquí.",role:"c"}]}},
      {en:'pianist', es:'pianista', art:'el', zh:'鋼琴家', ex:{es:'Él es pianista.',             zh:'他是鋼琴家。', chunks:[{w:"Él",role:"s"},{w:"es pianista.",role:"v"}]}},
    ]
  },
  {
    rule: '-ry → -rio / -ria（名詞）',
    hint: '英文 -ry 字尾，西語換成 -rio(陽性)或 -ria(陰性)',
    words: [
      {en:'salary',      es:'salario',      art:'el', zh:'薪水',     ex:{es:'El salario es bueno.',        zh:'薪水不錯。', chunks:[{w:"El salario",role:"s"},{w:"es bueno.",role:"v"}]}},
      {en:'secretary',   es:'secretaria',   art:'la', zh:'秘書',     ex:{es:'Mi secretaria es amable.',    zh:'我的秘書人很好。', chunks:[{w:"Mi secretaria",role:"s"},{w:"es amable.",role:"v"}]}},
      {en:'dictionary',  es:'diccionario',  art:'el', zh:'字典',     ex:{es:'Necesito un diccionario.',    zh:'我需要一本字典。', chunks:[{w:"Necesito",role:"v"},{w:"un diccionario.",role:"o"}]}},
      {en:'anniversary', es:'aniversario',  art:'el', zh:'週年紀念', ex:{es:'Hoy es nuestro aniversario.', zh:'今天是我們的週年紀念日。', chunks:[{w:"Hoy",role:"c"},{w:"es",role:"v"},{w:"nuestro aniversario.",role:"c"}]}},
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

