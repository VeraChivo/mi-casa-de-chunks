/* ── Episode sentence data (E1/E2/E3) ── */
// chunks: {w:"詞/詞組", role:"s"|"v"|"o"|undefined} — role 決定氣泡樣式
// s=主詞(虛線框) v=動詞(實色底) o=受詞/補語(實線框，也用於整句包框) 無role=連接詞等純文字
const EPS=[
// ── E1 泥巴坑 ──
{title:"Charcos de Barro",titleZh:"泥巴坑",dur:187,sentences:[
  {es:"Yo soy Gatita Nita.",chunks:[{w:"Yo",role:"s"},{w:"soy",role:"v"},{w:"Gatita Nita.",role:"o"}],zh:"我是小貓妮妲。",en:"I am Gatita Nita.",noteZh:"「soy」= 我是（ser 動詞「我」）",noteEn:"soy = I am (the 'I' form of ser)",
  expand:{
    note:"Yo soy + 名字 = 自我介紹固定句型",
    template:[{t:"Yo soy"},{g:"name"}],
    groups:[{label:"名字",key:"name",options:[
      {es:"Gatita Nita",zh:"小貓妮妲"},
      {es:"Tito",zh:"迪多"},
      {es:"Vera Oveja",zh:"薇拉羊"},
    ]}]
  }},
  {es:"Este es mi hermano pequeño Tito.",chunks:[{w:"Este",role:"s"},{w:"es",role:"v"},{w:"mi hermano pequeño Tito.",role:"o"}],zh:"這是我的小弟弟迪多。",en:"This is my little brother Tito.",noteZh:"「hermano pequeño」= 小弟弟；pequeño = 小的（o）",noteEn:"'hermano' = brother; 'pequeño' = little (masculine)",
  expand:{
    pattern:"____ es mi [關係] [大小] [名字]",
    note:"Este/Esta 跟著關係詞的性別走 — 選了 hermana 就要用 Esta",
    fixed:["es","mi"],
    groups:[
      {label:"關係詞",key:"rel",options:[
        {es:"hermano",zh:"兄弟",gender:"m"},
        {es:"hermana",zh:"姊妹",gender:"f"},
      ]},
      {label:"大小",key:"size",options:[
        {es:"mayor",zh:"大的（哥/姐）",gender:"both"},
        {es:"pequeño",zh:"小的（弟）",gender:"m"},
        {es:"pequeña",zh:"小的（妹）",gender:"f"},
      ]},
      {label:"名字",key:"name",options:[
        {es:"Tito",zh:"迪多",gender:"m"},
        {es:"Luna",zh:"露娜",gender:"f"},
        {es:"Vera",zh:"你自己",gender:"f"},
      ]},
    ]
  }},
  {es:"Hoy está lloviendo así que no pueden jugar fuera.",chunks:[{w:"Hoy"},{w:"está lloviendo",role:"v"},{w:"así que",role:"c"},{w:"no pueden jugar fuera.",role:"v"}],zh:"今天在下雨，所以不能去外面玩。",en:"Today it is raining so they cannot play outside.",noteZh:"「está lloviendo」= 現在進行式，正在下雨",noteEn:"'está lloviendo' = happening right now, it's raining",
  expand:{
    note:"está + Ving = 正在…（天氣現在進行式）",
    template:[{t:"Hoy está"},{g:"weather"},{t:"así que no pueden jugar fuera."}],
    groups:[{label:"天氣",key:"weather",options:[
      {es:"lloviendo",zh:"下雨"},
      {es:"nevando",zh:"下雪"},
      {es:"tronando",zh:"打雷"},
    ]}]
  }},
  {es:"¿Podemos salir a jugar?",chunks:[{w:"¿Podemos",role:"v"},{w:"salir a jugar?",role:"o"}],zh:"我們可以出去玩嗎？",en:"Can we go out to play?",noteZh:"「¿Podemos…?」= 我們可以…嗎？（poder 動詞一人稱複數）",noteEn:"'¿Podemos?' = Can we? (poder = to be able to)",
  expand:{
    note:"¿Podemos + 原形動詞…? = 徵求許可的萬用句型",
    template:[{t:"¿Podemos"},{g:"activity"}],
    groups:[{label:"做什麼",key:"activity",options:[
      {es:"salir a jugar?",zh:"出去玩？"},
      {es:"ver la tele?",zh:"看電視？"},
      {es:"comer algo?",zh:"吃點東西？"},
    ]}]
  }},
  {es:"Nita, debes ponerte las botas de agua.",chunks:[{w:"Nita,"},{w:"debes ponerte",role:"v"},{w:"las botas de agua.",role:"o"}],zh:"妮妲，你該穿上雨鞋。",en:"Nita, you must put on your wellies.",noteZh:"「debes + 原形動詞」= 你必須做…",noteEn:"'debes + infinitive' = you must do...",
  expand:{
    note:"debes + 原形動詞 = 你必須…（對某人說的命令句）",
    template:[{g:"name"},{t:"debes ponerte las botas de agua."}],
    groups:[{label:"跟誰說",key:"name",options:[
      {es:"Nita,",zh:"妮妲"},
      {es:"Tito,",zh:"迪多"},
      {es:"Mi hijo,",zh:"我兒子"},
      {es:"Mi hija,",zh:"我女兒"},
    ]}]
  }},
  {es:"¡Me encanta saltar en los charcos!",chunks:[{w:"¡Me",role:"s"},{w:"encanta",role:"v"},{w:"saltar en los charcos!",role:"o"}],zh:"我超愛在水坑裡跳！",en:"I love jumping in puddles!",noteZh:"「Me encanta」= 我超愛，比 me gusta 更強烈",noteEn:"'Me encanta' = I love it (stronger than 'me gusta')",
  expand:{
    note:"encanta 動詞不變，只換前面的間接受詞（英文的 to him / to her / to them）代名詞（我/你/他）",
    template:[{g:"who"},{t:"encanta saltar en los charcos!"}],
    groups:[{label:"誰超愛",key:"who",options:[
      {es:"¡Me",zh:"我"},
      {es:"¡Te",zh:"你"},
      {es:"¡Le",zh:"他／她"},
    ]}]
  }},
  {es:"Nita ha encontrado un charco pequeño.",chunks:[{w:"Nita",role:"s"},{w:"ha encontrado",role:"v"},{w:"un charco pequeño.",role:"o"}],zh:"妮妲找到了一個小水坑。",en:"Nita has found a small puddle.",noteZh:"「ha encontrado」= 剛剛做完，已經找到了",noteEn:"'ha encontrado' = just found it, all done",
  expand:{
    note:"ha encontrado = 剛剛做完，換主詞練習",
    template:[{g:"name"},{t:"ha encontrado un charco pequeño."}],
    groups:[{label:"誰",key:"name",options:[
      {es:"Nita",zh:"妮妲"},
      {es:"Tito",zh:"迪多"},
      {es:"Vera Oveja",zh:"薇拉羊"},
    ]}]
  }},
  {es:"¡Ese charco sí que es grande!",chunks:[{w:"¡Ese charco",role:"s"},{w:"sí que es",role:"v"},{w:"grande!",role:"o"}],zh:"那個水坑真的好大！",en:"That puddle really is big!",noteZh:"「sí que」= 強調語氣，真的是、確實是",noteEn:"'sí que' adds emphasis: it really is / it truly is",
  expand:{
    note:"sí que + 形容詞 = 強調語氣，換形容詞就能形容別的東西",
    template:[{t:"¡Ese charco sí que es"},{g:"adj"}],
    groups:[{label:"多大",key:"adj",options:[
      {es:"grande!",zh:"大的"},
      {es:"pequeño!",zh:"小的"},
    ]}]
  }},
  {es:"No pasa nada. Sólo es barro.",chunks:[{w:"No pasa nada.",role:"v"},{w:"Sólo"},{w:"es",role:"v"},{w:"barro.",role:"o"}],zh:"沒關係，只是泥巴而已。",en:"It's okay. It's only mud.",noteZh:"「No pasa nada」= 沒關係，西語最常用的安慰語！",noteEn:"'No pasa nada' = It's okay / No worries. Super common!",
  expand:{
    note:"No pasa nada. Sólo es ___. = 安慰句型，換弄髒/弄倒的東西",
    template:[{t:"No pasa nada. Sólo es"},{g:"thing"}],
    groups:[{label:"只是",key:"thing",options:[
      {es:"barro.",zh:"泥巴"},
      {es:"agua.",zh:"水"},
      {es:"pintura.",zh:"顏料"},
    ]}]
  }},
  {es:"A todos les encanta saltar en los charcos de barro.",chunks:[{w:"A todos les",role:"s"},{w:"encanta",role:"v"},{w:"saltar en los charcos de barro.",role:"o"}],zh:"所有人都超愛在泥巴坑裡跳！",en:"Everyone loves jumping in muddy puddles!",noteZh:"「A todos les encanta」= 所有人都超愛，「他們」",noteEn:"'A todos les encanta' = everyone loves it (the 'they' form)",
  expand:{
    note:"A todos les encanta + 原形動詞 = 所有人都超愛…",
    template:[{t:"A todos les encanta"},{g:"activity"}],
    groups:[{label:"做什麼",key:"activity",options:[
      {es:"saltar en los charcos de barro.",zh:"在泥巴坑裡跳"},
      {es:"bailar.",zh:"跳舞"},
      {es:"cantar.",zh:"唱歌"},
    ]}]
  }}
]},

// ── E2 恐龍先生不見了 ──
{title:"El Señor Dinosaurio Se Ha Perdido",titleZh:"恐龍先生不見了",dur:195,sentences:[
  {es:"El juguete favorito de Tito es el señor Dinosaurio.",chunks:[{w:"El juguete favorito de Tito",role:"s"},{w:"es",role:"v"},{w:"el señor Dinosaurio.",role:"o"}],zh:"迪多最喜歡的玩具是恐龍先生。",en:"Tito's favourite toy is Mr Dinosaur.",noteZh:"「favorito」= 最喜歡的，名詞後置形容詞",noteEn:"'favorito' = favourite (comes after the word it describes)",
  expand:{
    note:"de + 人 = …的（所有格）；換主人練習",
    template:[{t:"El juguete favorito de"},{g:"name"},{t:"es el señor Dinosaurio."}],
    groups:[{label:"誰的",key:"name",options:[
      {es:"Tito",zh:"迪多"},
      {es:"Nita",zh:"妮妲"},
      {es:"Vera Oveja",zh:"薇拉羊"},
    ]}]
  }},
  {es:"Cuando Tito se va a la cama el señor Dinosaurio se acurruca a su lado.",chunks:[{w:"Cuando",role:"c"},{w:"Tito",role:"s"},{w:"se va",role:"v"},{w:"a la cama",role:"o"},{w:"el señor Dinosaurio",role:"s"},{w:"se acurruca",role:"v"},{w:"a su lado.",role:"o"}],zh:"當迪多上床睡覺時，恐龍先生就蜷縮在他身旁。",en:"When Tito goes to bed, Mr Dinosaur cuddles up beside him.",noteZh:"「se va a la cama」= 上床睡覺；「a su lado」= 在他旁邊",noteEn:"'se va a la cama' = goes to bed; 'a su lado' = beside him",
  expand:{
    note:"套用 irse a la cama（上床睡覺）這個固定語塊，換主詞就能舉一反三",
    template:[{t:"Cuando"},{g:"person"},{t:"se va a la cama."}],
    groups:[
      {label:"誰",key:"person",options:[
        {es:"Tito",zh:"迪多"},
        {es:"Nita",zh:"妮妲"},
        {es:"mamá",zh:"媽媽"},
        {es:"papá",zh:"爸爸"},
      ]}
    ]
  }},
  {es:"Tito ha perdido al señor Dinosaurio.",chunks:[{w:"Tito",role:"s"},{w:"ha perdido",role:"v"},{w:"al señor Dinosaurio.",role:"o"}],zh:"迪多把恐龍先生弄丟了。",en:"Tito has lost Mr Dinosaur.",noteZh:"「ha perdido」= 剛剛做完，已經弄丟了",noteEn:"'ha perdido' = just lost it, all done",
  expand:{
    note:"ha perdido = 弄丟了，換主詞練習",
    template:[{g:"name"},{t:"ha perdido al señor Dinosaurio."}],
    groups:[{label:"誰",key:"name",options:[
      {es:"Tito",zh:"迪多"},
      {es:"Nita",zh:"妮妲"},
      {es:"Papá",zh:"爸爸"},
    ]}]
  }},
  {es:"No te preocupes Tito, entre todos lo encontraremos.",chunks:[{w:"No te preocupes",role:"v"},{w:"Tito,"},{w:"entre todos",role:"s"},{w:"lo encontraremos.",role:"v"}],zh:"不要擔心迪多，我們大家一起會找到牠的。",en:"Don't worry Tito, together we will find it.",noteZh:"「No te preocupes」= 不要擔心，自己對自己做的動詞命令句",noteEn:"'No te preocupes' = Don't worry (a command you give yourself)",
  expand:{
    note:"No te preocupes = 安慰語固定句型，換被安慰的人",
    template:[{t:"No te preocupes"},{g:"name"},{t:"entre todos lo encontraremos."}],
    groups:[{label:"跟誰說",key:"name",options:[
      {es:"Tito,",zh:"迪多"},
      {es:"Nita,",zh:"妮妲"},
      {es:"Mamá,",zh:"媽媽"},
    ]}]
  }},
  {es:"Un detective es una persona muy buena encontrando cosas.",chunks:[{w:"Un detective",role:"s"},{w:"es",role:"v"},{w:"una persona muy buena encontrando cosas.",role:"o"}],zh:"偵探是一個非常擅長找東西的人。",en:"A detective is a person who is very good at finding things.",noteZh:"「muy buena encontrando」= 非常擅長於做某事",noteEn:"'muy buena encontrando' = very good at finding (the '-ing' part)",
  expand:{
    note:"muy buena/o + Ving = 非常擅長於做…；換擅長找的東西",
    template:[{t:"Un detective es una persona muy buena encontrando"},{g:"thing"}],
    groups:[{label:"找什麼",key:"thing",options:[
      {es:"cosas.",zh:"東西"},
      {es:"animales.",zh:"動物"},
      {es:"tesoros.",zh:"寶藏"},
    ]}]
  }},
  {es:"Tito siempre se trae al señor Dinosaurio a la bañera.",chunks:[{w:"Tito",role:"s"},{w:"siempre se trae",role:"v"},{w:"al señor Dinosaurio a la bañera.",role:"o"}],zh:"迪多總是帶著恐龍先生去洗澡。",en:"Tito always brings Mr Dinosaur to the bath.",noteZh:"「siempre」= 總是，頻率副詞放在動詞前",noteEn:"'siempre' = always (frequency adverb, placed before verb)",
  expand:{
    note:"se trae + 東西 = 隨身帶著；換掉帶去的東西練習",
    template:[{t:"Tito siempre se trae"},{g:"thing"},{t:"a la bañera."}],
    groups:[
      {label:"帶什麼",key:"thing",options:[
        {es:"al señor Dinosaurio",zh:"恐龍先生"},
        {es:"a su pelota",zh:"他的球"},
        {es:"a su osito",zh:"他的小熊"},
        {es:"a su libro favorito",zh:"他最喜歡的書"},
      ]}
    ]
  }},
  {es:"¡Ya lo sé dónde está el señor Dinosaurio!",chunks:[{w:"¡Ya lo sé",role:"v"},{w:"dónde",role:"c"},{w:"está",role:"v"},{w:"el señor Dinosaurio!",role:"s"}],zh:"我知道恐龍先生在哪裡了！",en:"I know where Mr Dinosaur is!",noteZh:"「Ya lo sé」= 我知道了，ya 表示已然發生",noteEn:"'Ya lo sé' = I already know! 'ya' indicates something just realized",
  expand:{
    note:"¡Ya lo sé dónde está ___! = 我知道…在哪！換要找的東西",
    template:[{t:"¡Ya lo sé dónde está"},{g:"thing"}],
    groups:[{label:"什麼東西",key:"thing",options:[
      {es:"el señor Dinosaurio!",zh:"恐龍先生"},
      {es:"su pelota!",zh:"他的球"},
      {es:"su osito!",zh:"他的小熊"},
    ]}]
  }},
  {es:"El señor Dinosaurio no está en la cama de Tito.",chunks:[{w:"El señor Dinosaurio",role:"s"},{w:"no está",role:"v"},{w:"en la cama de Tito.",role:"o"}],zh:"恐龍先生不在迪多的床上。",en:"Mr Dinosaur is not in Tito's bed.",noteZh:"「no está」= 不在（用 estar 表示位置）",noteEn:"'no está' = is not there (uses 'estar' for location)",
  expand:{
    note:"en la cama de + 人 = 在…的床上",
    template:[{t:"El señor Dinosaurio no está en la cama de"},{g:"name"}],
    groups:[{label:"誰的床",key:"name",options:[
      {es:"Tito",zh:"迪多"},
      {es:"Nita",zh:"妮妲"},
      {es:"Papá",zh:"爸爸"},
    ]}]
  }},
  {es:"Nita y papá Pig están jugando a las damas.",chunks:[{w:"Nita y papá Pig",role:"s"},{w:"están jugando",role:"v"},{w:"a las damas.",role:"o"}],zh:"妮妲和貓爸爸正在玩跳棋。",en:"Nita and Daddy Cat are playing draughts.",noteZh:"「están jugando」= 現在進行式，正在玩",noteEn:"'están jugando' = happening right now, they're playing",
  expand:{
    note:"están jugando = 兩人以上都用複數動詞，換另一位玩伴",
    template:[{t:"Nita y"},{g:"name"},{t:"están jugando a las damas."}],
    groups:[{label:"跟誰玩",key:"name",options:[
      {es:"papá Pig",zh:"貓爸爸"},
      {es:"mamá Pig",zh:"貓媽媽"},
      {es:"Tito",zh:"迪多"},
    ]}]
  }},
  {es:"¡Ya lo sé, habéis estado saltando en los charcos de barro!",chunks:[{w:"¡Ya lo sé,",role:"v"},{w:"habéis estado saltando",role:"v"},{w:"en los charcos de barro!",role:"o"}],zh:"我知道了，你們一直在泥巴坑裡跳！",en:"I know, you've been jumping in muddy puddles!",noteZh:"「habéis estado + 動名詞」= 現在完成進行式，一直在做…",noteEn:"'habéis estado + -ing' = you've been doing it for a while",
  expand:{
    note:"habéis estado + Ving = 你們一直在做…（現在完成進行式）",
    template:[{t:"¡Ya lo sé, habéis estado"},{g:"activity"}],
    groups:[{label:"一直在做什麼",key:"activity",options:[
      {es:"saltando en los charcos de barro!",zh:"在泥巴坑裡跳"},
      {es:"jugando con la pelota!",zh:"玩球"},
      {es:"cantando en la ducha!",zh:"在浴室唱歌"},
    ]}]
  }},
]},

// ── E3 最好的朋友 ──
{title:"La Mejor Amiga",titleZh:"最好的朋友",dur:192,sentences:[
  {es:"Nita está esperando a su mejor amiga, Vera Oveja.",chunks:[{w:"Nita",role:"s"},{w:"está esperando",role:"v"},{w:"a su mejor amiga, Vera Oveja.",role:"o"}],zh:"妮妲正在等她最好的朋友薇拉羊。",en:"Nita is waiting for her best friend, Vera Oveja.",noteZh:"「está esperando」= 現在進行式，正在等",noteEn:"'está esperando' = happening right now, waiting",
  expand:{
    note:"está esperando = 正在等，換主詞練習",
    template:[{g:"name"},{t:"está esperando a su mejor amiga, Vera Oveja."}],
    groups:[{label:"誰在等",key:"name",options:[
      {es:"Nita",zh:"妮妲"},
      {es:"Tito",zh:"迪多"},
      {es:"Mamá",zh:"媽媽"},
    ]}]
  }},
  {es:"Nita quiere mucho a Vera y Vera quiere mucho a Nita.",chunks:[{w:"Nita",role:"s"},{w:"quiere mucho",role:"v"},{w:"a Vera",role:"o"},{w:"y",role:"c"},{w:"Vera",role:"s"},{w:"quiere mucho",role:"v"},{w:"a Nita.",role:"o"}],zh:"妮妲非常喜歡薇拉，薇拉也非常喜歡妮妲。",en:"Nita loves Vera very much and Vera loves Nita very much.",noteZh:"「querer + mucho」= 非常喜歡、愛，人名前加 a",noteEn:"'querer a alguien' = to love someone. 'a' is required before person",
  expand:{
    note:"互相喜歡句型：兩邊的［好朋友］要選同一個人",
    template:[{t:"Nita quiere mucho a"},{g:"friend"},{t:"y"},{g:"friend"},{t:"quiere mucho a Nita."}],
    groups:[{label:"好朋友",key:"friend",options:[
      {es:"Vera",zh:"薇拉"},
      {es:"Tito",zh:"迪多"},
      {es:"Coco",zh:"可可兔"},
    ]}]
  }},
  {es:"Son las mejores amigas.",chunks:[{w:"Son",role:"v"},{w:"las mejores amigas.",role:"o"}],zh:"她們是最好的朋友。",en:"They are best friends.",noteZh:"「mejores amigas」= 最好的朋友；mejor 的複數形",noteEn:"'mejores' = best (plural of 'mejor'); 'amigas' = female friends",
  expand:{
    note:"amigas(女) / amigos(男) 陰陽性複數要一起變",
    template:[{g:"pair"}],
    groups:[{label:"哪一組",key:"pair",options:[
      {es:"Son las mejores amigas.",zh:"她們是最好的朋友（女）"},
      {es:"Son los mejores amigos.",zh:"他們是最好的朋友（男）"},
    ]}]
  }},
  {es:"¡No Tito! Este juego es solo para niñas mayores.",chunks:[{w:"¡No Tito!"},{w:"Este juego",role:"s"},{w:"es",role:"v"},{w:"solo para niñas mayores.",role:"o"}],zh:"不行迪多！這個遊戲只給大一點的女孩玩。",en:"No Tito! This game is just for older girls.",noteZh:"「solo para」= 只給、只限；「niñas mayores」= 大一點的女孩",noteEn:"'solo para' = only for; 'niñas mayores' = older girls",
  expand:{
    note:"¡No + 人! = 制止某人的固定開場",
    template:[{g:"name"},{t:"Este juego es solo para niñas mayores."}],
    groups:[{label:"制止誰",key:"name",options:[
      {es:"¡No Tito!",zh:"不行迪多！"},
      {es:"¡No Papá!",zh:"不行爸爸！"},
    ]}]
  }},
  {es:"¡Soy una princesa salida de un cuento!",chunks:[{w:"¡Soy",role:"v"},{w:"una princesa salida de un cuento!",role:"o"}],zh:"我是從故事書裡走出來的公主！",en:"I am a princess from a fairy tale!",noteZh:"「salida de un cuento」= 從故事書裡走出來的",noteEn:"'salida de un cuento' = come out of a story / fairy tale princess",
  expand:{
    note:"salido/salida 要跟角色的陰陽性一致，整句一起換比較不會出錯",
    template:[{g:"role"}],
    groups:[{label:"角色",key:"role",options:[
      {es:"¡Soy una princesa salida de un cuento!",zh:"我是故事書裡的公主！"},
      {es:"¡Soy un pirata salido de un cuento!",zh:"我是故事書裡的海盜！"},
      {es:"¡Soy un dragón salido de un cuento!",zh:"我是故事書裡的龍！"},
    ]}]
  }},
  {es:"A Tito no le gusta jugar solo.",chunks:[{w:"A Tito",role:"s"},{w:"no le gusta",role:"v"},{w:"jugar solo.",role:"o"}],zh:"迪多不喜歡一個人玩。",en:"Tito doesn't like to play alone.",noteZh:"「A + 人 + le gusta」= 某人喜歡，西語必學句型！",noteEn:"'A + person + le gusta' = someone likes. Key Spanish structure!",
  expand:{
    note:"A + 人 + le gusta 是固定句型；換主詞就能套用在任何人身上",
    template:[{t:"A"},{g:"person"},{t:"no le gusta jugar solo."}],
    groups:[
      {label:"誰",key:"person",options:[
        {es:"Tito",zh:"迪多"},
        {es:"Nita",zh:"妮妲"},
        {es:"mi hijo",zh:"我兒子"},
        {es:"mi hija",zh:"我女兒"},
      ]}
    ]
  }},
  {es:"Yo seré la doctora y tú serás la enfermera.",chunks:[{w:"Yo",role:"s"},{w:"seré",role:"v"},{w:"la doctora",role:"o"},{w:"y",role:"c"},{w:"tú",role:"s"},{w:"serás",role:"v"},{w:"la enfermera.",role:"o"}],zh:"我來當醫生，你來當護士。",en:"I will be the doctor and you will be the nurse.",noteZh:"「seré / serás」= ser 動詞的以後要做，我/你將是",noteEn:"'seré / serás' = I'll be / you'll be (the 'will' form of ser)",
  expand:{
    note:"職業陰陽性成對：la doctora/el doctor、la enfermera/el enfermero…換角色順便練性別變化",
    template:[{t:"Yo seré"},{g:"prof1"},{t:"y tú serás"},{g:"prof2"}],
    groups:[
      {label:"我來當",key:"prof1",options:[
        {es:"la doctora",zh:"醫生（女）"},
        {es:"el doctor",zh:"醫生（男）"},
        {es:"la maestra",zh:"老師（女）"},
        {es:"el maestro",zh:"老師（男）"},
        {es:"la cocinera",zh:"廚師（女）"},
        {es:"el cocinero",zh:"廚師（男）"},
      ]},
      {label:"你來當",key:"prof2",options:[
        {es:"la enfermera",zh:"護士（女）"},
        {es:"el enfermero",zh:"護士（男）"},
        {es:"la doctora",zh:"醫生（女）"},
        {es:"el doctor",zh:"醫生（男）"},
        {es:"la maestra",zh:"老師（女）"},
        {es:"el maestro",zh:"老師（男）"},
      ]}
    ]
  }},
  {es:"Ahora Tito, respira hondo. Después tose.",chunks:[{w:"Ahora Tito,"},{w:"respira hondo.",role:"v"},{w:"Después",role:"c"},{w:"tose.",role:"v"}],zh:"現在迪多，深呼吸。然後咳嗽。",en:"Now Tito, breathe deeply. Then cough.",noteZh:"「respira hondo」= 深呼吸，直接下指令動詞直接用",noteEn:"'respira hondo' = breathe deeply (a direct instruction)",
  expand:{
    note:"Ahora + 人, respira hondo. = 直接下指令對某人說",
    template:[{g:"name"},{t:"respira hondo. Después tose."}],
    groups:[{label:"跟誰說",key:"name",options:[
      {es:"Ahora Tito,",zh:"現在迪多，"},
      {es:"Ahora Nita,",zh:"現在妮妲，"},
      {es:"Ahora mi hijo,",zh:"現在我兒子，"},
      {es:"Ahora mi hija,",zh:"現在我女兒，"},
    ]}]
  }},
  {es:"Creo que tienes el corazón un poco flojo.",chunks:[{w:"Creo que",role:"v"},{w:"tienes",role:"v"},{w:"el corazón un poco flojo.",role:"o"}],zh:"我認為你的心臟有點虛弱。",en:"I think your heart is a little weak.",noteZh:"「Creo que」= 我認為，後接完整子句",noteEn:"'Creo que' = I think that... (followed by a full clause)",
  expand:{
    note:"形容詞要跟身體部位的陰陽性一致，整組換才不會出錯",
    template:[{t:"Creo que tienes"},{g:"symptom"}],
    groups:[{label:"哪裡不舒服",key:"symptom",options:[
      {es:"el corazón un poco flojo.",zh:"心臟有點虛弱"},
      {es:"la barriga un poco floja.",zh:"肚子有點不舒服"},
      {es:"la cabeza un poco caliente.",zh:"頭有點熱"},
    ]}]
  }},
  {es:"Todos necesitan muchas galletas para curarse.",chunks:[{w:"Todos",role:"s"},{w:"necesitan",role:"v"},{w:"muchas galletas para curarse.",role:"o"}],zh:"所有人都需要很多餅乾才能康復。",en:"Everyone needs lots of cookies to get better.",noteZh:"「para + 原形動詞」= 為了做某事；「curarse」= 康復",noteEn:"'para + infinitive' = in order to do; 'curarse' = to recover",
  expand:{
    note:"Todos necesitan ___ para curarse. = 康復需要的東西",
    template:[{t:"Todos necesitan"},{g:"thing"},{t:"para curarse."}],
    groups:[{label:"需要什麼",key:"thing",options:[
      {es:"muchas galletas",zh:"很多餅乾"},
      {es:"mucha agua",zh:"很多水"},
      {es:"mucho descanso",zh:"很多休息"},
    ]}]
  }},
]},

// ── E4 Mimi 出生了 ──
{title:"La Nueva Hermanita",titleZh:"Mimi 出生了",dur:180,sentences:[
  {es:"Mamá Cata ha tenido un bebé.",chunks:[{w:"Mamá Cata",role:"s"},{w:"ha tenido",role:"v"},{w:"un bebé.",role:"o"}],zh:"貓媽媽生了一個寶寶。",en:"Mummy Cat has had a baby.",noteZh:"「ha tenido」= 剛剛做完，已經生了",noteEn:"'ha tenido' = just had it, all done",
  expand:{
    note:"ha tenido = 剛剛做完，換主詞練習",
    template:[{g:"name"},{t:"ha tenido un bebé."}],
    groups:[{label:"誰生了",key:"name",options:[
      {es:"Mamá Cata",zh:"貓媽媽"},
      {es:"Mamá Coneja",zh:"兔媽媽"},
      {es:"Mamá Oveja",zh:"羊媽媽"},
    ]}]
  }},
  {es:"Se llama Mimi.",chunks:[{w:"Se llama",role:"v"},{w:"Mimi.",role:"o"}],zh:"她叫做咪咪。",en:"Her name is Mimi.",noteZh:"「se llama」= 自己對自己做的動詞，介紹名字必學",noteEn:"'se llama' = a command you give yourself (used for naming)",
  expand:{
    note:"Se llama ___ = 介紹名字的固定句型",
    template:[{t:"Se llama"},{g:"name"}],
    groups:[{label:"叫什麼名字",key:"name",options:[
      {es:"Mimi.",zh:"咪咪"},
      {es:"Tito.",zh:"迪多"},
      {es:"Nita.",zh:"妮妲"},
    ]}]
  }},
  {es:"Nita y Tito tienen una hermana nueva.",chunks:[{w:"Nita y Tito",role:"s"},{w:"tienen",role:"v"},{w:"una hermana nueva.",role:"o"}],zh:"妮妲和迪多有了一個新妹妹。",en:"Nita and Tito have a new sister.",noteZh:"「tienen」= 有，tener 動詞「他們」",noteEn:"'tienen' = have, the 'they' form of tener",
  expand:{
    note:"hermano（兄弟）/ hermana（姊妹），新的家庭成員換一換",
    template:[{t:"Nita y Tito tienen"},{g:"sibling"}],
    groups:[{label:"新成員",key:"sibling",options:[
      {es:"una hermana nueva.",zh:"一個新妹妹"},
      {es:"un hermano nuevo.",zh:"一個新弟弟"},
      {es:"un bebé nuevo.",zh:"一個新寶寶"},
    ]}]
  }},
  {es:"Mimi es muy pequeñita.",chunks:[{w:"Mimi",role:"s"},{w:"es",role:"v"},{w:"muy pequeñita.",role:"o"}],zh:"咪咪非常小小的。",en:"Mimi is very tiny.",noteZh:"「pequeñita」= 小的的更可愛版本，字尾加 -ita",noteEn:"'pequeñita' = a cuter, smaller version of 'little'",
  expand:{
    note:"-ita / -ito 字尾 = 可愛縮小版，換人換形容詞",
    template:[{g:"name"},{t:"es muy"},{g:"adj"}],
    groups:[
      {label:"誰",key:"name",options:[
        {es:"Mimi",zh:"咪咪"},
        {es:"Tito",zh:"迪多"},
        {es:"El bebé",zh:"寶寶"},
      ]},
      {label:"描述",key:"adj",options:[
        {es:"pequeñita.",zh:"小小的（女）"},
        {es:"pequeñito.",zh:"小小的（男）"},
        {es:"bonita.",zh:"可愛的（女）"},
      ]}
    ]
  }},
  {es:"Tito quiere mucho a su hermanita.",chunks:[{w:"Tito",role:"s"},{w:"quiere mucho",role:"v"},{w:"a su hermanita.",role:"o"}],zh:"迪多非常愛他的小妹妹。",en:"Tito loves his baby sister very much.",noteZh:"「hermanita」= 小妹妹，hermana 加 -ita 更親暱",noteEn:"'hermanita' = little sister, a warm nickname",
  expand:{
    note:"quiere mucho a = 非常愛某人，換誰愛誰",
    template:[{g:"name"},{t:"quiere mucho a su"},{g:"relation"}],
    groups:[
      {label:"誰愛",key:"name",options:[
        {es:"Tito",zh:"迪多"},
        {es:"Nita",zh:"妮妲"},
        {es:"Mamá Cata",zh:"貓媽媽"},
      ]},
      {label:"愛誰",key:"relation",options:[
        {es:"hermanita.",zh:"小妹妹"},
        {es:"hermanito.",zh:"小弟弟"},
        {es:"bebé.",zh:"寶寶"},
      ]}
    ]
  }},
  {es:"Papá Tato está muy feliz.",chunks:[{w:"Papá Tato",role:"s"},{w:"está",role:"v"},{w:"muy feliz.",role:"o"}],zh:"貓爸爸非常開心。",en:"Daddy Cat is very happy.",noteZh:"「está + 形容詞」= 描述當下的心情狀態",noteEn:"'está + adjective' = describes how someone feels right now",
  expand:{
    note:"está + 心情形容詞 = 描述當下狀態，換人換心情",
    template:[{g:"name"},{t:"está muy"},{g:"mood"}],
    groups:[
      {label:"誰",key:"name",options:[
        {es:"Papá Tato",zh:"貓爸爸"},
        {es:"Mamá Cata",zh:"貓媽媽"},
        {es:"Nita",zh:"妮妲"},
      ]},
      {label:"心情",key:"mood",options:[
        {es:"feliz.",zh:"開心"},
        {es:"emocionado.",zh:"興奮（男）"},
        {es:"emocionada.",zh:"興奮（女）"},
        {es:"cansado.",zh:"累（男）"},
      ]}
    ]
  }},
  {es:"Toda la familia está esperando a Mimi.",chunks:[{w:"Toda la familia",role:"s"},{w:"está esperando",role:"v"},{w:"a Mimi.",role:"o"}],zh:"全家人都在等咪咪。",en:"The whole family is waiting for Mimi.",noteZh:"「está esperando」= 正在做，正在等",noteEn:"'está esperando' = happening right now, waiting",
  expand:{
    note:"está esperando a = 正在等某人，換等待的對象",
    template:[{t:"Toda la familia está esperando a"},{g:"name"}],
    groups:[{label:"等誰",key:"name",options:[
      {es:"Mimi.",zh:"咪咪"},
      {es:"Nita.",zh:"妮妲"},
      {es:"los abuelos.",zh:"爺爺奶奶"},
    ]}]
  }},
  {es:"¡Nita ya es una hermana mayor!",chunks:[{w:"¡Nita",role:"s"},{w:"ya es",role:"v"},{w:"una hermana mayor!",role:"o"}],zh:"妮妲已經是大姊姊了！",en:"Nita is already a big sister!",noteZh:"「ya」= 已經，強調狀態改變",noteEn:"'ya' = already, shows something has changed",
  expand:{
    note:"ya es = 已經是了，強調身份改變，陰陽性要一起換",
    template:[{g:"name"},{t:"ya es"},{g:"role"}],
    groups:[
      {label:"誰",key:"name",options:[
        {es:"¡Nita",zh:"妮妲"},
        {es:"¡Tito",zh:"迪多"},
      ]},
      {label:"身份",key:"role",options:[
        {es:"una hermana mayor!",zh:"大姊姊"},
        {es:"un hermano mayor!",zh:"大哥哥"},
        {es:"una hermana pequeña!",zh:"小妹妹"},
      ]}
    ]
  }},
  {es:"Vamos a cuidar a Mimi juntos.",chunks:[{w:"Vamos a cuidar",role:"v"},{w:"a Mimi juntos.",role:"o"}],zh:"我們要一起照顧咪咪。",en:"We're going to take care of Mimi together.",noteZh:"「vamos a + 原形動詞」= 我們要做…",noteEn:"'vamos a + verb' = we're going to do something",
  expand:{
    note:"Vamos a + 原形動詞 juntos. = 我們一起要做…",
    template:[{t:"Vamos a"},{g:"activity"}],
    groups:[{label:"做什麼",key:"activity",options:[
      {es:"cuidar a Mimi juntos.",zh:"一起照顧咪咪"},
      {es:"cantar juntos.",zh:"一起唱歌"},
      {es:"jugar juntos.",zh:"一起玩"},
    ]}]
  }},
  {es:"¡Bienvenida a la familia, Mimi!",chunks:[{w:"¡Bienvenida",role:"v"},{w:"a la familia, Mimi!",role:"o"}],zh:"歡迎來到這個家，咪咪！",en:"Welcome to the family, Mimi!",noteZh:"「Bienvenida」= 歡迎，陰性因為 Mimi 是女生",noteEn:"'Bienvenida' = welcome, feminine form because Mimi is a girl",
  expand:{
    note:"Bienvenida（女）/ Bienvenido（男）跟著歡迎對象的性別走",
    template:[{g:"welcome"},{t:"a la familia,"},{g:"name"}],
    groups:[
      {label:"歡迎詞",key:"welcome",options:[
        {es:"¡Bienvenida",zh:"歡迎（女）"},
        {es:"¡Bienvenido",zh:"歡迎（男）"},
      ]},
      {label:"誰來了",key:"name",options:[
        {es:"Mimi!",zh:"咪咪"},
        {es:"Tito!",zh:"迪多"},
        {es:"Nita!",zh:"妮妲"},
      ]}
    ]
  }}
]},

// ── E5 照顧 Mimi ──
{title:"Cuidando a Mimi",titleZh:"照顧 Mimi",dur:185,sentences:[
  {es:"Mimi llora mucho por la noche.",chunks:[{w:"Mimi",role:"s"},{w:"llora mucho",role:"v"},{w:"por la noche.",role:"o"}],zh:"咪咪晚上常常哭。",en:"Mimi cries a lot at night.",noteZh:"「llora」= 哭，llorar 動詞「她」",noteEn:"'llora' = cries, the 'she' form of llorar",
  expand:{
    note:"por la noche（晚上）換時間，llora 換動作",
    template:[{g:"name"},{t:"llora mucho"},{g:"time"}],
    groups:[
      {label:"誰哭",key:"name",options:[
        {es:"Mimi",zh:"咪咪"},
        {es:"El bebé",zh:"寶寶"},
        {es:"Tito",zh:"迪多"},
      ]},
      {label:"什麼時候",key:"time",options:[
        {es:"por la noche.",zh:"晚上"},
        {es:"por la mañana.",zh:"早上"},
        {es:"a veces.",zh:"有時候"},
      ]}
    ]
  }},
  {es:"Mamá Cata le da de comer a Mimi.",chunks:[{w:"Mamá Cata",role:"s"},{w:"le da de comer",role:"v"},{w:"a Mimi.",role:"o"}],zh:"貓媽媽餵咪咪吃東西。",en:"Mummy Cat feeds Mimi.",noteZh:"「le da de comer」= 餵東西吃，固定搭配",noteEn:"'le da de comer' = feeds her, a fixed phrase",
  expand:{
    note:"le da de comer a = 餵某人，換誰在餵",
    template:[{g:"name"},{t:"le da de comer a Mimi."}],
    groups:[{label:"誰餵",key:"name",options:[
      {es:"Mamá Cata",zh:"貓媽媽"},
      {es:"Papá Tato",zh:"貓爸爸"},
      {es:"La abuela",zh:"奶奶"},
    ]}]
  }},
  {es:"Papá Tato cambia el pañal de Mimi.",chunks:[{w:"Papá Tato",role:"s"},{w:"cambia",role:"v"},{w:"el pañal de Mimi.",role:"o"}],zh:"貓爸爸幫咪咪換尿布。",en:"Daddy Cat changes Mimi's nappy.",noteZh:"「cambia」= 換，cambiar 動詞「他」",noteEn:"'cambia' = changes, the 'he' form of cambiar",
  expand:{
    note:"cambia = 換，換誰在幫忙換尿布",
    template:[{g:"name"},{t:"cambia el pañal de Mimi."}],
    groups:[{label:"誰換",key:"name",options:[
      {es:"Papá Tato",zh:"貓爸爸"},
      {es:"Mamá Cata",zh:"貓媽媽"},
      {es:"El abuelo",zh:"爺爺"},
    ]}]
  }},
  {es:"Nita canta una canción para Mimi.",chunks:[{w:"Nita",role:"s"},{w:"canta",role:"v"},{w:"una canción para Mimi.",role:"o"}],zh:"妮妲唱一首歌給咪咪聽。",en:"Nita sings a song for Mimi.",noteZh:"「canta」= 唱歌，cantar 動詞「她」",noteEn:"'canta' = sings, the 'she' form of cantar",
  expand:{
    note:"canta / toca / lee = 唱/彈/讀，換誰做什麼給 Mimi",
    template:[{g:"name"},{g:"activity"},{t:"para Mimi."}],
    groups:[
      {label:"誰",key:"name",options:[
        {es:"Nita",zh:"妮妲"},
        {es:"Mamá Cata",zh:"貓媽媽"},
        {es:"El abuelo",zh:"爺爺"},
      ]},
      {label:"做什麼",key:"activity",options:[
        {es:"canta una canción",zh:"唱一首歌"},
        {es:"lee un cuento",zh:"讀一個故事"},
        {es:"toca la guitarra",zh:"彈吉他"},
      ]}
    ]
  }},
  {es:"Tito le enseña su dinosaurio a Mimi.",chunks:[{w:"Tito",role:"s"},{w:"le enseña",role:"v"},{w:"su dinosaurio a Mimi.",role:"o"}],zh:"迪多給咪咪看他的恐龍。",en:"Tito shows Mimi his dinosaur.",noteZh:"「le enseña」= 給她看，enseñar 動詞「他」",noteEn:"'le enseña' = shows her, the 'he' form of enseñar",
  expand:{
    note:"le enseña su ___ a Mimi = 給她展示自己的東西",
    template:[{t:"Tito le enseña su"},{g:"thing"},{t:"a Mimi."}],
    groups:[{label:"展示什麼",key:"thing",options:[
      {es:"dinosaurio",zh:"恐龍"},
      {es:"pelota",zh:"球"},
      {es:"libro favorito",zh:"最喜歡的書"},
    ]}]
  }},
  {es:"Mimi duerme en su cuna.",chunks:[{w:"Mimi",role:"s"},{w:"duerme",role:"v"},{w:"en su cuna.",role:"o"}],zh:"咪咪睡在她的搖籃裡。",en:"Mimi sleeps in her crib.",noteZh:"「duerme」= 睡覺，dormir 動詞「她」",noteEn:"'duerme' = sleeps, the 'she' form of dormir",
  expand:{
    note:"duerme en = 睡在某個地方，換睡在哪裡",
    template:[{g:"name"},{t:"duerme en"},{g:"place"}],
    groups:[
      {label:"誰",key:"name",options:[
        {es:"Mimi",zh:"咪咪"},
        {es:"Tito",zh:"迪多"},
        {es:"El gato",zh:"貓咪"},
      ]},
      {label:"哪裡",key:"place",options:[
        {es:"su cuna.",zh:"搖籃"},
        {es:"su cama.",zh:"床"},
        {es:"el sofá.",zh:"沙發"},
      ]}
    ]
  }},
  {es:"Toda la familia ayuda a cuidar a Mimi.",chunks:[{w:"Toda la familia",role:"s"},{w:"ayuda a cuidar",role:"v"},{w:"a Mimi.",role:"o"}],zh:"全家人都幫忙照顧咪咪。",en:"The whole family helps take care of Mimi.",noteZh:"「ayuda a + 原形動詞」= 幫忙做…",noteEn:"'ayuda a + verb' = helps to do something",
  expand:{
    note:"ayuda a + 原形動詞 = 幫忙做某事，換幫忙做什麼",
    template:[{t:"Toda la familia ayuda a"},{g:"activity"}],
    groups:[{label:"幫忙做什麼",key:"activity",options:[
      {es:"cuidar a Mimi.",zh:"照顧咪咪"},
      {es:"limpiar la casa.",zh:"打掃房子"},
      {es:"cocinar la cena.",zh:"煮晚餐"},
    ]}]
  }},
  {es:"Mimi sonríe por primera vez.",chunks:[{w:"Mimi",role:"s"},{w:"sonríe",role:"v"},{w:"por primera vez.",role:"o"}],zh:"咪咪第一次微笑了。",en:"Mimi smiles for the first time.",noteZh:"「sonríe」= 微笑，sonreír 動詞「她」",noteEn:"'sonríe' = smiles, the 'she' form of sonreír",
  expand:{
    note:"por primera vez = 第一次做某事，換動作",
    template:[{g:"name"},{g:"action"},{t:"por primera vez."}],
    groups:[
      {label:"誰",key:"name",options:[
        {es:"Mimi",zh:"咪咪"},
        {es:"El bebé",zh:"寶寶"},
        {es:"Tito",zh:"迪多"},
      ]},
      {label:"第一次做什麼",key:"action",options:[
        {es:"sonríe",zh:"微笑"},
        {es:"camina",zh:"走路"},
        {es:"habla",zh:"說話"},
      ]}
    ]
  }},
  {es:"Nita está muy orgullosa de ser hermana mayor.",chunks:[{w:"Nita",role:"s"},{w:"está muy orgullosa",role:"v"},{w:"de ser hermana mayor.",role:"o"}],zh:"妮妲非常自豪能當大姊姊。",en:"Nita is very proud to be a big sister.",noteZh:"「orgullosa」= 自豪，陰性因為 Nita 是女生",noteEn:"'orgullosa' = proud, feminine form because Nita is a girl",
  expand:{
    note:"orgullosa（女）/ orgulloso（男）跟著人物性別走，換誰自豪",
    template:[{g:"name"},{t:"está muy"},{g:"adj"},{t:"de ser hermana mayor."}],
    groups:[
      {label:"誰",key:"name",options:[
        {es:"Nita",zh:"妮妲（女）"},
        {es:"Tito",zh:"迪多（男）"},
      ]},
      {label:"自豪",key:"adj",options:[
        {es:"orgullosa",zh:"自豪（女）"},
        {es:"orgulloso",zh:"自豪（男）"},
      ]}
    ]
  }},
  {es:"¡Cuidar a un bebé es mucho trabajo!",chunks:[{w:"¡Cuidar a un bebé",role:"s"},{w:"es",role:"v"},{w:"mucho trabajo!",role:"o"}],zh:"照顧寶寶真的是很多工作！",en:"Taking care of a baby is a lot of work!",noteZh:"「Cuidar a un bebé」= 原形動詞當主詞，等於中文的「照顧寶寶這件事」",noteEn:"'Cuidar a un bebé' = the infinitive acts as the subject, like 'taking care of a baby'",
  expand:{
    note:"原形動詞當主詞 + es + 名詞 = …這件事是…，換任務描述",
    template:[{g:"task"},{t:"es mucho trabajo!"}],
    groups:[{label:"什麼任務",key:"task",options:[
      {es:"¡Cuidar a un bebé",zh:"照顧寶寶"},
      {es:"¡Limpiar la casa",zh:"打掃房子"},
      {es:"¡Cocinar cada día",zh:"每天做飯"},
    ]}]
  }}
]},

// ── E6 好吃的東西 ──
{title:"Cosas Ricas para Comer",titleZh:"好吃的東西",dur:175,sentences:[
  {es:"A Nita le encanta el helado de chocolate.",chunks:[{w:"A Nita",role:"s"},{w:"le encanta",role:"v"},{w:"el helado de chocolate.",role:"o"}],zh:"妮妲超愛巧克力冰淇淋。",en:"Nita loves chocolate ice cream.",noteZh:"「helado」= 冰淇淋，同源字 gelato",noteEn:"'helado' = ice cream",
  expand:{
    note:"A + 人 + le encanta = 某人超愛，換人換食物",
    template:[{t:"A"},{g:"name"},{t:"le encanta"},{g:"food"}],
    groups:[
      {label:"誰超愛",key:"name",options:[
        {es:"Nita",zh:"妮妲"},
        {es:"Tito",zh:"迪多"},
        {es:"Papá Tato",zh:"貓爸爸"},
      ]},
      {label:"超愛什麼",key:"food",options:[
        {es:"el helado de chocolate.",zh:"巧克力冰淇淋"},
        {es:"el pastel de fresa.",zh:"草莓蛋糕"},
        {es:"las galletas.",zh:"餅乾"},
      ]}
    ]
  }},
  {es:"Tito come muchas manzanas.",chunks:[{w:"Tito",role:"s"},{w:"come",role:"v"},{w:"muchas manzanas.",role:"o"}],zh:"迪多吃很多蘋果。",en:"Tito eats lots of apples.",noteZh:"「manzanas」= 蘋果，複數要記得加 s",noteEn:"'manzanas' = apples",
  expand:{
    note:"come = 吃，換主詞換食物",
    template:[{g:"name"},{t:"come muchas"},{g:"food"}],
    groups:[
      {label:"誰吃",key:"name",options:[
        {es:"Tito",zh:"迪多"},
        {es:"Nita",zh:"妮妲"},
        {es:"Mamá Cata",zh:"貓媽媽"},
      ]},
      {label:"吃什麼（複數）",key:"food",options:[
        {es:"manzanas.",zh:"蘋果"},
        {es:"naranjas.",zh:"柳橙"},
        {es:"galletas.",zh:"餅乾"},
      ]}
    ]
  }},
  {es:"Mamá Cata hace un pastel de fresa.",chunks:[{w:"Mamá Cata",role:"s"},{w:"hace",role:"v"},{w:"un pastel de fresa.",role:"o"}],zh:"貓媽媽做草莓蛋糕。",en:"Mummy Cat makes a strawberry cake.",noteZh:"「pastel」= 蛋糕，同源字 pastry",noteEn:"'pastel' = cake",
  expand:{
    note:"pastel de + 口味，換水果口味",
    template:[{t:"Mamá Cata hace un pastel de"},{g:"flavor"}],
    groups:[{label:"什麼口味",key:"flavor",options:[
      {es:"fresa.",zh:"草莓"},
      {es:"chocolate.",zh:"巧克力"},
      {es:"limón.",zh:"檸檬"},
      {es:"naranja.",zh:"柳橙"},
    ]}]
  }},
  {es:"Papá Tato quiere un plátano.",chunks:[{w:"Papá Tato",role:"s"},{w:"quiere",role:"v"},{w:"un plátano.",role:"o"}],zh:"貓爸爸想吃一根香蕉。",en:"Daddy Cat wants a banana.",noteZh:"「plátano」= 香蕉，很好記的西語字",noteEn:"'plátano' = banana",
  expand:{
    note:"quiere = 想要，換主詞換食物（un = 單個，una = 陰性單個）",
    template:[{g:"name"},{t:"quiere"},{g:"food"}],
    groups:[
      {label:"誰想吃",key:"name",options:[
        {es:"Papá Tato",zh:"貓爸爸"},
        {es:"Tito",zh:"迪多"},
        {es:"Nita",zh:"妮妲"},
      ]},
      {label:"想吃什麼",key:"food",options:[
        {es:"un plátano.",zh:"一根香蕉"},
        {es:"una manzana.",zh:"一個蘋果"},
        {es:"un poco de queso.",zh:"一點起司"},
      ]}
    ]
  }},
  {es:"Vera Oveja trae galletas para todos.",chunks:[{w:"Vera Oveja",role:"s"},{w:"trae",role:"v"},{w:"galletas para todos.",role:"o"}],zh:"薇拉羊帶餅乾給大家吃。",en:"Vera Oveja brings cookies for everyone.",noteZh:"「galletas」= 餅乾",noteEn:"'galletas' = cookies",
  expand:{
    note:"trae ___ para todos = 帶某食物給大家，換帶什麼來",
    template:[{g:"name"},{t:"trae"},{g:"food"},{t:"para todos."}],
    groups:[
      {label:"誰帶來",key:"name",options:[
        {es:"Vera Oveja",zh:"薇拉羊"},
        {es:"Mamá Cata",zh:"貓媽媽"},
        {es:"La abuela",zh:"奶奶"},
      ]},
      {label:"帶什麼食物",key:"food",options:[
        {es:"galletas",zh:"餅乾"},
        {es:"pasteles",zh:"蛋糕"},
        {es:"frutas",zh:"水果"},
      ]}
    ]
  }},
  {es:"¿Quieres un poco de queso?",chunks:[{w:"¿Quieres",role:"v"},{w:"un poco de queso?",role:"o"}],zh:"你想吃一點起司嗎？",en:"Do you want some cheese?",noteZh:"「un poco de」= 一點點",noteEn:"'un poco de' = a little bit of",
  expand:{
    note:"¿Quieres un poco de ___? = 你想吃一點…嗎？換食物",
    template:[{t:"¿Quieres un poco de"},{g:"food"}],
    groups:[{label:"吃一點什麼",key:"food",options:[
      {es:"queso?",zh:"起司"},
      {es:"pan?",zh:"麵包"},
      {es:"pastel?",zh:"蛋糕"},
      {es:"helado?",zh:"冰淇淋"},
    ]}]
  }},
  {es:"El pan está muy caliente.",chunks:[{w:"El pan",role:"s"},{w:"está",role:"v"},{w:"muy caliente.",role:"o"}],zh:"麵包還很燙。",en:"The bread is very hot.",noteZh:"「pan」= 麵包，同源字 panificio",noteEn:"'pan' = bread",
  expand:{
    note:"está + 狀態形容詞 = 現在的狀態，換食物換狀態",
    template:[{g:"food"},{t:"está muy"},{g:"state"}],
    groups:[
      {label:"什麼食物",key:"food",options:[
        {es:"El pan",zh:"麵包"},
        {es:"El pastel",zh:"蛋糕"},
        {es:"La sopa",zh:"湯"},
      ]},
      {label:"狀態如何",key:"state",options:[
        {es:"caliente.",zh:"燙"},
        {es:"frío.",zh:"冷"},
        {es:"dulce.",zh:"甜"},
        {es:"rico.",zh:"好吃"},
      ]}
    ]
  }},
  {es:"A todos les gustan las naranjas.",chunks:[{w:"A todos les",role:"s"},{w:"gustan",role:"v"},{w:"las naranjas.",role:"o"}],zh:"大家都喜歡柳橙。",en:"Everyone likes oranges.",noteZh:"「naranjas」= 柳橙，複數要用 gustan",noteEn:"'naranjas' = oranges (plural, so it's 'gustan' not 'gusta')",
  expand:{
    note:"gustan（複數食物）/ gusta（單數）；換大家喜歡的食物",
    template:[{t:"A todos les gustan"},{g:"food"}],
    groups:[{label:"大家愛吃什麼（複數）",key:"food",options:[
      {es:"las naranjas.",zh:"柳橙"},
      {es:"las galletas.",zh:"餅乾"},
      {es:"los plátanos.",zh:"香蕉"},
      {es:"los pasteles.",zh:"蛋糕"},
    ]}]
  }},
  {es:"Tito no quiere comer verduras.",chunks:[{w:"Tito",role:"s"},{w:"no quiere comer",role:"v"},{w:"verduras.",role:"o"}],zh:"迪多不想吃蔬菜。",en:"Tito doesn't want to eat vegetables.",noteZh:"「verduras」= 蔬菜，同源字 verdure（義大利文）",noteEn:"'verduras' = vegetables",
  expand:{
    note:"no quiere comer = 不想吃，換主詞換不想吃的食物",
    template:[{g:"name"},{t:"no quiere comer"},{g:"food"}],
    groups:[
      {label:"誰不想吃",key:"name",options:[
        {es:"Tito",zh:"迪多"},
        {es:"Nita",zh:"妮妲"},
        {es:"El bebé",zh:"寶寶"},
      ]},
      {label:"不想吃什麼",key:"food",options:[
        {es:"verduras.",zh:"蔬菜"},
        {es:"fruta.",zh:"水果"},
        {es:"sopa.",zh:"湯"},
      ]}
    ]
  }},
  {es:"¡Vamos a comer pizza esta noche!",chunks:[{w:"¡Vamos a comer",role:"v"},{w:"pizza esta noche!",role:"o"}],zh:"我們今晚要吃披薩！",en:"We're going to eat pizza tonight!",noteZh:"「pizza」= 披薩，跟英文一模一樣",noteEn:"'pizza' = pizza, exactly the same as English",
  expand:{
    note:"¡Vamos a comer ___ esta noche! = 今晚吃什麼，換食物",
    template:[{t:"¡Vamos a comer"},{g:"food"}],
    groups:[{label:"今晚吃什麼",key:"food",options:[
      {es:"pizza esta noche!",zh:"披薩"},
      {es:"pasta esta noche!",zh:"義大利麵"},
      {es:"helado esta noche!",zh:"冰淇淋"},
      {es:"pastel esta noche!",zh:"蛋糕"},
    ]}]
  }}
]}
];
