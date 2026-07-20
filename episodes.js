/* ── Episode sentence data (E1/E2/E3) ── */
// chunks: {w:"詞/詞組", role:"s"|"v"|"o"|undefined} — role 決定氣泡樣式
// s=主詞(虛線框) v=動詞(實色底) o=受詞/補語(實線框，也用於整句包框) 無role=連接詞等純文字
const EPS=[
// ── E1 妮妲的角落 ──
{title:"El Rincón de Nita",titleZh:"妮妲的角落",dur:187,sentences:[
  {es:"A Nita le gusta estar en los rincones.",chunks:[{w:"A Nita le",role:"s"},{w:"gusta",role:"v"},{w:"estar en los rincones.",role:"o"}],zh:"妮妲喜歡待在角落裡。",en:"Nita likes to be in corners.",noteZh:"A Nita le gusta = 妮妲喜歡…（gustar 句型，人放在句首用 A）",noteEn:"'A Nita le gusta' = Nita likes... (gustar puts the person first with A)",
  expand:{
    note:"A + 人 + le gusta + 動詞原形 = 某人喜歡做某事",
    template:[{t:"A"},{g:"who"},{t:"le gusta estar en los rincones."}],
    groups:[{label:"誰喜歡",key:"who",options:[
      {es:"Nita",zh:"妮妲"},
      {es:"Tito",zh:"迪多"},
      {es:"Mimi",zh:"咪咪"},
    ]}]
  }},
  {es:"El rincón favorito de Nita es muy tranquilo.",chunks:[{w:"El rincón favorito de Nita",role:"s"},{w:"es",role:"v"},{w:"muy tranquilo.",role:"o"}],zh:"妮妲最愛的角落非常安靜。",en:"Nita's favourite corner is very quiet.",noteZh:"形容詞放名詞後面：rincón favorito（最愛的角落）；SER 描述固定特質",noteEn:"Adjectives come after nouns: rincón favorito (favourite corner); SER describes character",
  expand:{
    note:"muy + 形容詞 = 非常…（描述固定特質用 SER es）",
    template:[{t:"El rincón favorito de Nita es muy"},{g:"adj"}],
    groups:[{label:"怎麼樣",key:"adj",options:[
      {es:"tranquilo.",zh:"安靜的"},
      {es:"pequeño.",zh:"小小的"},
      {es:"acogedor.",zh:"舒適的"},
    ]}]
  }},
  {es:"Hoy, Tito quiere jugar a las escondidas.",chunks:[{w:"Hoy,"},{w:"Tito",role:"s"},{w:"quiere",role:"v"},{w:"jugar a las escondidas.",role:"o"}],zh:"今天，迪多想玩躲貓貓。",en:"Today, Tito wants to play hide-and-seek.",noteZh:"quiere + 原形動詞 = 想要做…",noteEn:"'quiere + infinitive' = wants to do...",
  expand:{
    note:"quiere + 原形動詞 = 想要做某事，換人換活動",
    template:[{g:"name"},{t:"quiere"},{g:"activity"}],
    groups:[
      {label:"誰想",key:"name",options:[
        {es:"Tito",zh:"迪多"},
        {es:"Nita",zh:"妮妲"},
        {es:"Mimi",zh:"咪咪"},
      ]},
      {label:"做什麼",key:"activity",options:[
        {es:"jugar a las escondidas.",zh:"玩躲貓貓"},
        {es:"correr en el jardín.",zh:"在花園裡跑"},
        {es:"descansar.",zh:"休息"},
      ]},
    ]
  }},
  {es:"Nita se esconde en el rincón y nadie la puede encontrar.",chunks:[{w:"Nita",role:"s"},{w:"se esconde",role:"v"},{w:"en el rincón",role:"o"},{w:"y",role:"c"},{w:"nadie la puede encontrar.",role:"v"}],zh:"妮妲躲進角落，誰也找不到她。",en:"Nita hides in the corner and nobody can find her.",noteZh:"se esconde = 躲（反身動詞）；nadie = 沒有任何人",noteEn:"'se esconde' = hides (reflexive verb); 'nadie' = nobody",
  expand:{
    note:"se esconde en + 地點 = 躲進某個地方",
    template:[{t:"Nita se esconde en"},{g:"place"},{t:"y nadie la puede encontrar."}],
    groups:[{label:"躲哪裡",key:"place",options:[
      {es:"el rincón",zh:"角落"},
      {es:"el armario",zh:"衣櫥"},
      {es:"el jardín",zh:"花園"},
    ]}]
  }},
  {es:"De repente, empieza a llover.",chunks:[{w:"De repente,"},{w:"empieza a llover.",role:"v"}],zh:"突然，開始下雨了。",en:"Suddenly, it starts to rain.",noteZh:"empieza a + 原形動詞 = 開始做某事；De repente = 突然",noteEn:"'empieza a + infinitive' = starts to...; 'De repente' = suddenly",
  expand:{
    note:"empieza a + 原形動詞 = 開始…（換動作）",
    template:[{t:"De repente, empieza a"},{g:"action"}],
    groups:[{label:"開始什麼",key:"action",options:[
      {es:"llover.",zh:"下雨"},
      {es:"tronar.",zh:"打雷"},
      {es:"nevar.",zh:"下雪"},
    ]}]
  }},
  {es:"Sin pensar, Nita sale corriendo al jardín.",chunks:[{w:"Sin pensar,"},{w:"Nita",role:"s"},{w:"sale corriendo",role:"v"},{w:"al jardín.",role:"o"}],zh:"不假思索，妮妲衝出去到花園裡。",en:"Without thinking, Nita runs out to the garden.",noteZh:"sin + 原形動詞 = 不做某事；sale corriendo = 跑著出去（動詞＋現在分詞）",noteEn:"'sin + infinitive' = without doing...; 'sale corriendo' = runs out (verb + -ando)",
  expand:{
    note:"sin pensar = 不假思索，是衝動行為的固定說法",
    template:[{t:"Sin pensar, Nita sale corriendo"},{g:"place"}],
    groups:[{label:"衝去哪",key:"place",options:[
      {es:"al jardín.",zh:"到花園"},
      {es:"a la calle.",zh:"到街上"},
      {es:"a la cocina.",zh:"到廚房"},
    ]}]
  }},
  {es:"Nita chapotea en los charcos, pero la ropa se moja.",chunks:[{w:"Nita",role:"s"},{w:"chapotea",role:"v"},{w:"en los charcos,",role:"o"},{w:"pero",role:"c"},{w:"la ropa se moja.",role:"v"}],zh:"妮妲在水坑裡玩水，但是衣服被弄濕了。",en:"Nita splashes in the puddles, but her clothes get wet.",noteZh:"pero = 但是（轉折）；se moja = 被弄濕（反身動詞表結果）",noteEn:"'pero' = but (contrast); 'se moja' = gets wet (reflexive showing result)",
  expand:{
    note:"pero 轉折：前面好玩，後面出現小麻煩",
    template:[{t:"Nita chapotea en los charcos, pero"},{g:"problem"}],
    groups:[{label:"但是…",key:"problem",options:[
      {es:"la ropa se moja.",zh:"衣服被弄濕了"},
      {es:"tiene frío.",zh:"她覺得很冷"},
      {es:"se cae.",zh:"她跌倒了"},
    ]}]
  }},
  {es:"La ropa mojada le molesta mucho a Nita.",chunks:[{w:"La ropa mojada",role:"s"},{w:"le molesta mucho",role:"v"},{w:"a Nita.",role:"o"}],zh:"濕掉的衣服讓妮妲非常不舒服。",en:"The wet clothes bother Nita a lot.",noteZh:"molesta 跟 gusta 一樣：讓人不舒服的東西當主詞，人在後用 a",noteEn:"'molesta' works like 'gusta': the annoying thing is the subject, person comes last with 'a'",
  expand:{
    note:"le molesta = 讓某人不舒服（跟 le gusta 同一套句型）",
    template:[{g:"thing"},{t:"le molesta mucho a Nita."}],
    groups:[{label:"什麼讓她不舒服",key:"thing",options:[
      {es:"La ropa mojada",zh:"濕掉的衣服"},
      {es:"El ruido fuerte",zh:"很大的聲音"},
      {es:"La luz brillante",zh:"很亮的光"},
    ]}]
  }},
  {es:"Nita corre a casa y vuelve a su rincón.",chunks:[{w:"Nita",role:"s"},{w:"corre",role:"v"},{w:"a casa",role:"o"},{w:"y",role:"c"},{w:"vuelve a su rincón.",role:"v"}],zh:"妮妲跑回家，回到她的角落。",en:"Nita runs home and goes back to her corner.",noteZh:"a casa = 回家（沒有冠詞）；vuelve a = 回到某個地方",noteEn:"'a casa' = home (no article in Spanish); 'vuelve a' = goes back to",
  expand:{
    note:"vuelve a + 地點 = 回到某個地方",
    template:[{t:"Nita corre a casa y vuelve a"},{g:"place"}],
    groups:[{label:"回到哪裡",key:"place",options:[
      {es:"su rincón.",zh:"她的角落"},
      {es:"su habitación.",zh:"她的房間"},
      {es:"su cama.",zh:"她的床"},
    ]}]
  }},
  {es:"Papá Tato y Mamá Cata se sientan cerca, sin decir nada.",chunks:[{w:"Papá Tato y Mamá Cata",role:"s"},{w:"se sientan",role:"v"},{w:"cerca,",role:"o"},{w:"sin decir nada.",role:"o"}],zh:"達多爸爸和卡妲媽媽就坐在旁邊，什麼也沒說。",en:"Papá Tato and Mamá Cata sit nearby, without saying anything.",noteZh:"se sientan = 坐下（反身動詞）；sin decir nada = 什麼也不說",noteEn:"'se sientan' = sit down (reflexive); 'sin decir nada' = without saying a word",
  expand:{
    note:"sin decir nada = 安靜地陪伴，是示範不強迫的實踐",
    template:[{g:"who"},{t:"se sientan cerca, sin decir nada."}],
    groups:[{label:"誰陪著",key:"who",options:[
      {es:"Papá Tato y Mamá Cata",zh:"達多爸爸和卡妲媽媽"},
      {es:"Mamá Cata",zh:"卡妲媽媽"},
      {es:"Papá Tato",zh:"達多爸爸"},
    ]}]
  }}
]},

// ── E2 骷髏先生不見了 ──
{title:"El Señor Esqueleto Se Ha Perdido",titleZh:"骷髏先生不見了",dur:195,sentences:[
  {es:"El juguete favorito de Tito es el señor Esqueleto.",chunks:[{w:"El juguete favorito de Tito",role:"s"},{w:"es",role:"v"},{w:"el señor Esqueleto.",role:"o"}],zh:"迪多最喜歡的玩具是骷髏先生。",en:"Tito's favourite toy is Mr Skeleton.",noteZh:"「favorito」= 最喜歡的，名詞後置形容詞",noteEn:"'favorito' = favourite (comes after the word it describes)",
  expand:{
    note:"de + 人 = …的（所有格）；換主人練習",
    template:[{t:"El juguete favorito de"},{g:"name"},{t:"es el señor Esqueleto."}],
    groups:[{label:"誰的",key:"name",options:[
      {es:"Tito",zh:"迪多"},
      {es:"Nita",zh:"妮妲"},
      {es:"Vera Oveja",zh:"薇拉羊"},
    ]}]
  }},
  {es:"Cuando Tito se va a la cama el señor Esqueleto se acurruca a su lado.",chunks:[{w:"Cuando",role:"c"},{w:"Tito",role:"s"},{w:"se va",role:"v"},{w:"a la cama",role:"o"},{w:"el señor Esqueleto",role:"s"},{w:"se acurruca",role:"v"},{w:"a su lado.",role:"o"}],zh:"當迪多上床睡覺時，骷髏先生就蜷縮在他身旁。",en:"When Tito goes to bed, Mr Skeleton cuddles up beside him.",noteZh:"「se va a la cama」= 上床睡覺；「a su lado」= 在他旁邊",noteEn:"'se va a la cama' = goes to bed; 'a su lado' = beside him",
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
  {es:"Tito ha perdido al señor Esqueleto.",chunks:[{w:"Tito",role:"s"},{w:"ha perdido",role:"v"},{w:"al señor Esqueleto.",role:"o"}],zh:"迪多把骷髏先生弄丟了。",en:"Tito has lost Mr Skeleton.",noteZh:"「ha perdido」= 剛剛做完，已經弄丟了",noteEn:"'ha perdido' = just lost it, all done",
  expand:{
    note:"ha perdido = 弄丟了，換主詞練習",
    template:[{g:"name"},{t:"ha perdido al señor Esqueleto."}],
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
  {es:"Tito siempre se trae al señor Esqueleto a la bañera.",chunks:[{w:"Tito",role:"s"},{w:"siempre se trae",role:"v"},{w:"al señor Esqueleto a la bañera.",role:"o"}],zh:"迪多總是帶著骷髏先生去洗澡。",en:"Tito always brings Mr Skeleton to the bath.",noteZh:"「siempre」= 總是，頻率副詞放在動詞前",noteEn:"'siempre' = always (frequency adverb, placed before verb)",
  expand:{
    note:"se trae + 東西 = 隨身帶著；換掉帶去的東西練習",
    template:[{t:"Tito siempre se trae"},{g:"thing"},{t:"a la bañera."}],
    groups:[
      {label:"帶什麼",key:"thing",options:[
        {es:"al señor Esqueleto",zh:"骷髏先生"},
        {es:"a su pelota",zh:"他的球"},
        {es:"a su osito",zh:"他的小熊"},
        {es:"a su libro favorito",zh:"他最喜歡的書"},
      ]}
    ]
  }},
  {es:"¡Ya lo sé dónde está el señor Esqueleto!",chunks:[{w:"¡Ya lo sé",role:"v"},{w:"dónde",role:"c"},{w:"está",role:"v"},{w:"el señor Esqueleto!",role:"s"}],zh:"我知道骷髏先生在哪裡了！",en:"I know where Mr Skeleton is!",noteZh:"「Ya lo sé」= 我知道了，ya 表示已然發生",noteEn:"'Ya lo sé' = I already know! 'ya' indicates something just realized",
  expand:{
    note:"¡Ya lo sé dónde está ___! = 我知道…在哪！換要找的東西",
    template:[{t:"¡Ya lo sé dónde está"},{g:"thing"}],
    groups:[{label:"什麼東西",key:"thing",options:[
      {es:"el señor Esqueleto!",zh:"骷髏先生"},
      {es:"su pelota!",zh:"他的球"},
      {es:"su osito!",zh:"他的小熊"},
    ]}]
  }},
  {es:"El señor Esqueleto no está en la cama de Tito.",chunks:[{w:"El señor Esqueleto",role:"s"},{w:"no está",role:"v"},{w:"en la cama de Tito.",role:"o"}],zh:"骷髏先生不在迪多的床上。",en:"Mr Skeleton is not in Tito's bed.",noteZh:"「no está」= 不在（用 estar 表示位置）",noteEn:"'no está' = is not there (uses 'estar' for location)",
  expand:{
    note:"en la cama de + 人 = 在…的床上",
    template:[{t:"El señor Esqueleto no está en la cama de"},{g:"name"}],
    groups:[{label:"誰的床",key:"name",options:[
      {es:"Tito",zh:"迪多"},
      {es:"Nita",zh:"妮妲"},
      {es:"Papá",zh:"爸爸"},
    ]}]
  }},
  {es:"Nita y Papá Tato están jugando a las damas.",chunks:[{w:"Nita y Papá Tato",role:"s"},{w:"están jugando",role:"v"},{w:"a las damas.",role:"o"}],zh:"妮妲和貓爸爸正在玩跳棋。",en:"Nita and Daddy Cat are playing draughts.",noteZh:"「están jugando」= 現在進行式，正在玩",noteEn:"'están jugando' = happening right now, they're playing",
  expand:{
    note:"están jugando = 兩人以上都用複數動詞，換另一位玩伴",
    template:[{t:"Nita y"},{g:"name"},{t:"están jugando a las damas."}],
    groups:[{label:"跟誰玩",key:"name",options:[
      {es:"Papá Tato",zh:"貓爸爸"},
      {es:"mamá Pig",zh:"貓媽媽"},
      {es:"Tito",zh:"迪多"},
    ]}]
  }},
  {es:"¡Ya lo sé, ustedes han estado chapoteando en los charcos de barro!",chunks:[{w:"¡Ya lo sé,",role:"v"},{w:"ustedes han estado chapoteando",role:"v"},{w:"en los charcos de barro!",role:"o"}],zh:"我知道了，你們一直在泥巴坑裡玩水！",en:"I know, you've been splashing in muddy puddles!",noteZh:"「ustedes han estado + 動名詞」= 現在完成進行式，一直在做…（拉美用 ustedes，不用 vosotros）",noteEn:"'ustedes han estado + -ing' = you've been doing it for a while (LatAm uses ustedes, not vosotros)",
  expand:{
    note:"ustedes han estado + Ving = 你們一直在做…（現在完成進行式）",
    template:[{t:"¡Ya lo sé, ustedes han estado"},{g:"activity"}],
    groups:[{label:"一直在做什麼",key:"activity",options:[
      {es:"chapoteando en los charcos de barro!",zh:"在泥巴坑裡玩水"},
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
  {es:"Creo que tienes el corazón un poco flojo.",chunks:[{w:"Creo que",role:"v"},{w:"tienes",role:"v"},{w:"el corazón un poco flojo.",role:"o"}],zh:"我覺得你的心臟有點虛弱。",en:"I think your heart is a little weak.",noteZh:"「Creo que」= 我認為，後接完整子句",noteEn:"'Creo que' = I think that... (followed by a full clause)",
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
  {es:"Tito le enseña su esqueleto a Mimi.",chunks:[{w:"Tito",role:"s"},{w:"le enseña",role:"v"},{w:"su esqueleto a Mimi.",role:"o"}],zh:"迪多給咪咪看他的骷髏。",en:"Tito shows Mimi his skeleton.",noteZh:"「le enseña」= 給她看，enseñar 動詞「他」",noteEn:"'le enseña' = shows her, the 'he' form of enseñar",
  expand:{
    note:"le enseña su ___ a Mimi = 給她展示自己的東西",
    template:[{t:"Tito le enseña su"},{g:"thing"},{t:"a Mimi."}],
    groups:[{label:"展示什麼",key:"thing",options:[
      {es:"esqueleto",zh:"骷髏"},
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
  {es:"A Nita le encanta el helado de chocolate.",chunks:[{w:"A Nita",role:"s"},{w:"le encanta",role:"v"},{w:"el helado de chocolate.",role:"o"}],zh:"妮妲超愛巧克力冰淇淋。",en:"Nita loves chocolate ice cream.",noteZh:"「helado」= 冰淇淋（跟英文 ice cream 沒有同源關係；同源鏈：拉丁文 gelare 結凍 → 義大利文 gelato → 西語 helado）",noteEn:"'helado' = ice cream",
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
  {es:"El pan está muy caliente.",chunks:[{w:"El pan",role:"s"},{w:"está",role:"v"},{w:"muy caliente.",role:"o"}],zh:"麵包還很燙。",en:"The bread is very hot.",noteZh:"「pan」= 麵包，同源字英文 pantry（食物儲藏室，字根都來自拉丁文 panis=麵包）",noteEn:"'pan' = bread",
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
  {es:"Tito no quiere comer verduras.",chunks:[{w:"Tito",role:"s"},{w:"no quiere comer",role:"v"},{w:"verduras.",role:"o"}],zh:"迪多不想吃蔬菜。",en:"Tito doesn't want to eat vegetables.",noteZh:"「verduras」= 蔬菜，同源鏈：拉丁文 viridis 綠色 → 義大利文 verdure → 西語 verduras",noteEn:"'verduras' = vegetables",
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
]},
// ── E7 手忙腳亂的早晨 ──
{title:"Buenos Días, Casa Gato",titleZh:"手忙腳亂的早晨",dur:170,sentences:[
  {es:"Nita tiene mucho sueño.",chunks:[{w:"Nita",role:"s"},{w:"tiene",role:"v"},{w:"mucho sueño.",role:"o"}],zh:"妮妲很想睡。",en:"Nita is very sleepy.",noteZh:"「tiene sueño」= 想睡，tener＋名詞表達生理感覺，不是「擁有」",noteEn:"'tener sueño' = to be sleepy (tener + noun for physical states)",
  expand:{
    note:"tiene mucho sueño = 想睡，換主詞練習",
    template:[{g:"name"},{t:"tiene mucho sueño."}],
    groups:[{label:"誰想睡",key:"name",options:[
      {es:"Nita",zh:"妮妲"},
      {es:"Tito",zh:"迪多"},
      {es:"Kito",zh:"哥哥"},
    ]}]
  }},
  {es:"Mamá Cata despierta a Nita, pero Nita llega tarde.",chunks:[{w:"Mamá Cata",role:"s"},{w:"despierta",role:"v"},{w:"a Nita,",role:"o"},{w:"pero",role:"c",hideYg:true},{w:"Nita",role:"s"},{w:"llega tarde.",role:"v"}],zh:"貓媽媽叫醒妮妲，但妮妲還是遲到了。",en:"Mummy Cat wakes Nita up, but Nita is still late.",noteZh:"「despierta」= 叫醒（despertar 的「他/她」變位）",noteEn:"'despierta' = wakes (someone) up (despertar, 'he/she' form)",
  expand:{
    note:"Mamá Cata despierta a ___. = 貓媽媽叫醒誰，換人",
    template:[{t:"Mamá Cata despierta a"},{g:"name"},{t:", pero llega tarde."}],
    groups:[{label:"叫醒誰",key:"name",options:[
      {es:"Nita",zh:"妮妲"},
      {es:"Tito",zh:"迪多"},
      {es:"Kito",zh:"哥哥"},
    ]}]
  }},
  {es:"Tito tiene hambre.",chunks:[{w:"Tito",role:"s"},{w:"tiene",role:"v"},{w:"hambre.",role:"o"}],zh:"迪多肚子餓了。",en:"Tito is hungry.",noteZh:"「tiene hambre」= 肚子餓，tener 家族常用語",noteEn:"'tener hambre' = to be hungry",
  expand:{
    note:"tiene hambre = 肚子餓，換主詞練習",
    template:[{g:"name"},{t:"tiene hambre."}],
    groups:[{label:"誰餓了",key:"name",options:[
      {es:"Tito",zh:"迪多"},
      {es:"Mimi",zh:"咪咪"},
      {es:"Nita",zh:"妮妲"},
    ]}]
  }},
  {es:"Papá Tato tiene frío.",chunks:[{w:"Papá Tato",role:"s"},{w:"tiene",role:"v"},{w:"frío.",role:"o"}],zh:"貓爸爸覺得冷。",en:"Daddy Cat is cold.",noteZh:"「tiene frío」= 覺得冷，tener 家族",noteEn:"'tener frío' = to be cold",
  expand:{
    note:"tiene frío = 覺得冷，換主詞練習",
    template:[{g:"name"},{t:"tiene frío."}],
    groups:[{label:"誰覺得冷",key:"name",options:[
      {es:"Papá Tato",zh:"貓爸爸"},
      {es:"Mamá Cata",zh:"貓媽媽"},
      {es:"Mimi",zh:"咪咪"},
    ]}]
  }},
  {es:"Hay pan y leche en la mesa.",chunks:[{w:"Hay",role:"v"},{w:"pan y leche en la mesa.",role:"o"}],zh:"桌上有麵包和牛奶。",en:"There's bread and milk on the table.",noteZh:"「Hay」= 有，表示存在，不分陰陽性單複數都用這個字",noteEn:"'Hay' = there is/are, never changes for gender or number",
  expand:{
    note:"Hay ___ en la mesa. = 桌上有…，換東西",
    template:[{t:"Hay"},{g:"food"},{t:"en la mesa."}],
    groups:[{label:"桌上有什麼",key:"food",options:[
      {es:"pan y leche",zh:"麵包和牛奶"},
      {es:"huevos y fruta",zh:"蛋和水果"},
      {es:"café y galletas",zh:"咖啡和餅乾"},
    ]}]
  }},
  {es:"Quiero desayunar con Mimi.",chunks:[{w:"Quiero desayunar",role:"v"},{w:"con Mimi.",role:"o"}],zh:"我想跟咪咪一起吃早餐。",en:"I want to have breakfast with Mimi.",noteZh:"「desayunar」= 吃早餐，Quiero + 原形動詞的另一個例子",noteEn:"'desayunar' = to have breakfast",
  expand:{
    note:"Quiero desayunar con ___. = 我想跟誰一起吃早餐",
    template:[{t:"Quiero desayunar con"},{g:"name"}],
    groups:[{label:"跟誰吃早餐",key:"name",options:[
      {es:"Mimi.",zh:"咪咪"},
      {es:"Nita.",zh:"妮妲"},
      {es:"toda la familia.",zh:"全家人"},
    ]}]
  }},
  {es:"Mamá Cata tiene prisa.",chunks:[{w:"Mamá Cata",role:"s"},{w:"tiene",role:"v"},{w:"prisa.",role:"o"}],zh:"貓媽媽在趕時間。",en:"Mummy Cat is in a hurry.",noteZh:"「tiene prisa」= 趕時間，tener 家族",noteEn:"'tener prisa' = to be in a hurry",
  expand:{
    note:"tiene prisa = 趕時間，換主詞練習",
    template:[{g:"name"},{t:"tiene prisa."}],
    groups:[{label:"誰在趕時間",key:"name",options:[
      {es:"Mamá Cata",zh:"貓媽媽"},
      {es:"Papá Tato",zh:"貓爸爸"},
      {es:"Kito",zh:"哥哥"},
    ]}]
  }},
  {es:"¿Tienes tiempo para un café?",chunks:[{w:"¿Tienes",role:"v"},{w:"tiempo para un café?",role:"o"}],zh:"你有時間喝杯咖啡嗎？",en:"Do you have time for a coffee?",noteZh:"「tiene tiempo」= 有空，也是 tener 家族",noteEn:"'tener tiempo' = to have time",
  expand:{
    note:"¿Tienes tiempo para ___? = 你有時間做…嗎，換活動",
    template:[{t:"¿Tienes tiempo para"},{g:"activity"}],
    groups:[{label:"有時間做什麼",key:"activity",options:[
      {es:"un café?",zh:"喝杯咖啡"},
      {es:"desayunar?",zh:"吃早餐"},
      {es:"hablar?",zh:"聊聊"},
    ]}]
  }},
  {es:"Kito tiene miedo de llegar tarde.",chunks:[{w:"Kito",role:"s"},{w:"tiene miedo de",role:"v"},{w:"llegar tarde.",role:"o"}],zh:"哥哥害怕遲到。",en:"Kito is afraid of being late.",noteZh:"「tiene miedo de」= 害怕，後面接原形動詞",noteEn:"'tener miedo de' = to be afraid of (+ infinitive)",
  expand:{
    note:"tiene miedo de llegar tarde = 害怕遲到，換主詞練習",
    template:[{g:"name"},{t:"tiene miedo de llegar tarde."}],
    groups:[{label:"誰怕遲到",key:"name",options:[
      {es:"Kito",zh:"哥哥"},
      {es:"Nita",zh:"妮妲"},
      {es:"Tito",zh:"迪多"},
    ]}]
  }},
  {es:"Nita se duerme en clase y Vivi la despierta.",chunks:[{w:"Nita",role:"s"},{w:"se duerme",role:"v"},{w:"en clase",role:"o"},{w:"y",role:"c",hideYg:true},{w:"Vivi",role:"s"},{w:"la despierta.",role:"v"}],zh:"妮妲在課堂上睡著了，薇薇老師把她叫醒。",en:"Nita falls asleep in class and Vivi wakes her up.",noteZh:"「se duerme」= 睡著了（dormirse，反身動詞，跟 dormir 意思不同：dormir=睡覺的動作，dormirse=從清醒變成睡著的那個轉變）；Vivi＝薇薇安老師",noteEn:"'se duerme' = falls asleep (dormirse, reflexive — different from dormir 'to sleep'); Vivi = teacher Vivian",
  expand:{
    note:"___ se duerme en clase. = 誰在課堂上睡著了，換人",
    template:[{g:"name"},{t:"se duerme en clase y Vivi la despierta."}],
    groups:[{label:"誰睡著了",key:"name",options:[
      {es:"Nita",zh:"妮妲"},
      {es:"Kito",zh:"哥哥"},
      {es:"Tito",zh:"迪多"},
    ]}]
  }}
]},

// ── E8 迪多和車車 ──
{title:"Tito y el Carrito",titleZh:"迪多和車車",dur:150,sentences:[
  {es:"Tito juega con su carrito, Chito.",chunks:[{w:"Tito",role:"s"},{w:"juega",role:"v"},{w:"con su carrito, Chito.",role:"o"}],zh:"迪多在玩他的車車奇奇。",en:"Tito plays with his little car, Chito.",noteZh:"「juega con」= 玩...（jugar 的「他/她」變位）",noteEn:"'juega con' = plays with (jugar, he/she form)",
  expand:{
    note:"___ juega con su carrito. = 換主詞練習",
    template:[{g:"name"},{t:"juega con su carrito, Chito."}],
    groups:[{label:"誰在玩車車",key:"name",options:[
      {es:"Tito",zh:"迪多"},
      {es:"Nita",zh:"妮妲"},
      {es:"Mimi",zh:"咪咪"},
    ]}]
  }},
  {es:"Mamá Cata le pregunta algo.",chunks:[{w:"Mamá Cata",role:"s"},{w:"le pregunta",role:"v"},{w:"algo.",role:"o"}],zh:"卡妲媽媽問他一件事。",en:"Mom Cata asks him something.",noteZh:"「le pregunta」= 問他/她（間接受詞 le + preguntar）",noteEn:"'le pregunta' = asks him/her (indirect object le + preguntar)",
  expand:{
    note:"Mamá Cata le pregunta ___. = 換問的內容",
    template:[{t:"Mamá Cata le pregunta"},{g:"thing"}],
    groups:[{label:"問什麼",key:"thing",options:[
      {es:"algo.",zh:"一件事"},
      {es:"si tiene hambre.",zh:"是不是餓了"},
      {es:"cómo está.",zh:"他好不好"},
    ]}]
  }},
  {es:"Tito solo asiente con la cabeza.",chunks:[{w:"Tito",role:"s"},{w:"solo asiente",role:"v"},{w:"con la cabeza.",role:"o"}],zh:"迪多只是點點頭。",en:"Tito just nods his head.",noteZh:"「asiente con la cabeza」= 點頭",noteEn:"'asentir con la cabeza' = to nod one's head",
  expand:{
    note:"___ solo asiente con la cabeza. = 換主詞練習",
    template:[{g:"name"},{t:"solo asiente con la cabeza."}],
    groups:[{label:"誰點頭",key:"name",options:[
      {es:"Tito",zh:"迪多"},
      {es:"Kito",zh:"哥哥"},
      {es:"Nita",zh:"妮妲"},
    ]}]
  }},
  {es:"Para el \"no\", Tito simplemente no responde.",chunks:[{w:'Para el "no",'},{w:"Tito",role:"s"},{w:"simplemente no responde.",role:"v"}],zh:"遇到「不」的時候，迪多就是不回應。",en:"For \"no,\" Tito simply doesn't respond.",noteZh:"「no responde」= 不回應（responder 的現在式）",noteEn:"'no responde' = doesn't respond (responder, present tense)",
  expand:{
    note:"Para el \"no\", ___ simplemente no responde. = 換主詞練習",
    template:[{t:'Para el "no",'},{g:"name"},{t:"simplemente no responde."}],
    groups:[{label:"誰不回應",key:"name",options:[
      {es:"Tito",zh:"迪多"},
      {es:"Kito",zh:"哥哥"},
      {es:"Nita",zh:"妮妲"},
    ]}]
  }},
  {es:"Tito la escucha, pero actúa como si no la oyera.",chunks:[{w:"Tito",role:"s"},{w:"la escucha,",role:"v"},{w:"pero",role:"c",hideYg:true},{w:"actúa como si no la oyera.",role:"v"}],zh:"迪多聽到了，卻裝作沒聽到。",en:"Tito hears her, but acts like he doesn't.",noteZh:"「como si no la oyera」= 假裝沒聽到（como si + 虛擬式過去式，表跟事實相反）",noteEn:"'como si + imperfect subjunctive' = as if... (contrary to fact)",
  expand:{
    note:"___ la escucha, pero actúa como si no la oyera. = 換主詞練習",
    template:[{g:"name"},{t:"la escucha, pero actúa como si no la oyera."}],
    groups:[{label:"誰裝作沒聽到",key:"name",options:[
      {es:"Tito",zh:"迪多"},
      {es:"Kito",zh:"哥哥"},
      {es:"Nita",zh:"妮妲"},
    ]}]
  }},
  {es:"Por dentro, Mamá Cata se siente un poco frustrada.",chunks:[{w:"Por dentro,"},{w:"Mamá Cata",role:"s"},{w:"se siente",role:"v"},{w:"un poco frustrada.",role:"o"}],zh:"卡妲媽媽心裡有點火大。",en:"Inside, Mom Cata feels a little frustrated.",noteZh:"「se siente」= 覺得（sentirse 反身動詞）",noteEn:"'se siente' = feels (sentirse, reflexive)",
  expand:{
    note:"Por dentro, ___ se siente un poco frustrada/o. = 換主詞練習",
    template:[{t:"Por dentro,"},{g:"name"},{t:"se siente un poco frustrada."}],
    groups:[{label:"誰有點火大",key:"name",options:[
      {es:"Mamá Cata",zh:"卡妲媽媽"},
      {es:"Papá Tato",zh:"達多爸爸"},
      {es:"Kito",zh:"哥哥"},
    ]}]
  }},
  {es:"Respira hondo y se sienta a su lado.",chunks:[{w:"Respira hondo",role:"v"},{w:"y",role:"c",hideYg:true},{w:"se sienta",role:"v"},{w:"a su lado.",role:"o"}],zh:"她深呼吸，坐到他旁邊。",en:"She breathes deeply and sits beside him.",noteZh:"「Respira hondo」= 深呼吸；隱含主詞是媽媽",noteEn:"'Respira hondo' = breathes deeply; implied subject is Mom",
  expand:{
    note:"Respira hondo y se sienta ___. = 換地點",
    template:[{t:"Respira hondo y se sienta"},{g:"place"}],
    groups:[{label:"坐在哪裡",key:"place",options:[
      {es:"a su lado.",zh:"在他旁邊"},
      {es:"en el suelo.",zh:"在地上"},
      {es:"junto a la puerta.",zh:"在門邊"},
    ]}]
  }},
  {es:"Ella sabe que su niño no lo hace a propósito.",chunks:[{w:"Ella",role:"s"},{w:"sabe",role:"v"},{w:"que su niño no lo hace a propósito.",role:"o"}],zh:"她清楚知道孩子不是故意的。",en:"She knows her child isn't doing it on purpose.",noteZh:"「a propósito」= 故意地",noteEn:"'a propósito' = on purpose",
  expand:{
    note:"Ella sabe que ___ no lo hace a propósito. = 換主詞練習",
    template:[{t:"Ella sabe que"},{g:"name"},{t:"no lo hace a propósito."}],
    groups:[{label:"誰不是故意的",key:"name",options:[
      {es:"su niño",zh:"她的孩子"},
      {es:"Tito",zh:"迪多"},
      {es:"Kito",zh:"哥哥"},
    ]}]
  }},
  {es:"Pero no entiende de dónde viene su propio enojo.",chunks:[{w:"Pero",role:"c",hideYg:true},{w:"no entiende",role:"v"},{w:"de dónde viene su propio enojo.",role:"o"}],zh:"但她不懂自己的怒火是從哪裡來的。",en:"But she doesn't understand where her own anger comes from.",noteZh:"「de dónde viene」= 從哪裡來",noteEn:"'de dónde viene' = where...comes from",
  expand:{
    note:"no entiende de dónde viene su propio ___. = 換情緒詞",
    template:[{t:"Pero no entiende de dónde viene su propio"},{g:"emotion"}],
    groups:[{label:"哪種情緒",key:"emotion",options:[
      {es:"enojo.",zh:"怒火"},
      {es:"miedo.",zh:"恐懼"},
      {es:"cansancio.",zh:"疲憊"},
    ]}]
  }},
  {es:"Esa noche, Mamá Cata se queda pensando en sí misma.",chunks:[{w:"Esa noche,"},{w:"Mamá Cata",role:"s"},{w:"se queda pensando",role:"v"},{w:"en sí misma.",role:"o"}],zh:"那天晚上，卡妲媽媽開始想起自己。",en:"That night, Mom Cata sits thinking about herself.",noteZh:"「se queda pensando」= 陷入沉思（quedarse + Ving）",noteEn:"'se queda pensando' = stays thinking/reflecting (quedarse + gerund)",
  expand:{
    note:"Esa noche, ___ se queda pensando en sí misma/o. = 換主詞練習",
    template:[{t:"Esa noche,"},{g:"name"},{t:"se queda pensando en sí misma."}],
    groups:[{label:"誰陷入沉思",key:"name",options:[
      {es:"Mamá Cata",zh:"卡妲媽媽"},
      {es:"Papá Tato",zh:"達多爸爸"},
      {es:"Kito",zh:"哥哥"},
    ]}]
  }}
]},

// ── E9 我終於知道自己是誰 ──
{title:"Por Fin Sé Quién Soy",titleZh:"我終於知道自己是誰",dur:160,sentences:[
  {es:"Mamá Cata siempre pierde las llaves.",chunks:[{w:"Mamá Cata",role:"s"},{w:"siempre pierde",role:"v"},{w:"las llaves.",role:"o"}],zh:"卡妲媽媽總是找不到鑰匙。",en:"Mom Cata always loses her keys.",noteZh:"「pierde」= 弄丟（perder 的「她」變位）",noteEn:"'pierde' = loses (perder, 'she' form)",
  expand:{
    note:"___ siempre pierde ___. = 換主詞和物品",
    template:[{g:"name"},{t:"siempre pierde"},{g:"thing"}],
    groups:[
      {label:"誰",key:"name",options:[
        {es:"Mamá Cata",zh:"卡妲媽媽"},
        {es:"Papá Tato",zh:"達多爸爸"},
        {es:"Kito",zh:"哥哥"},
      ]},
      {label:"弄丟什麼",key:"thing",options:[
        {es:"las llaves.",zh:"鑰匙"},
        {es:"el teléfono.",zh:"手機"},
        {es:"las gafas.",zh:"眼鏡"},
      ]},
    ]
  }},
  {es:"Pero puede concentrarse en un proyecto por horas y horas.",chunks:[{w:"Pero",role:"c",hideYg:true},{w:"puede concentrarse",role:"v"},{w:"en un proyecto por horas y horas.",role:"o"}],zh:"但她可以對一個計畫專注好幾個小時。",en:"But she can focus on a project for hours and hours.",noteZh:"「puede concentrarse」= 可以專注（poder + 反身原形動詞）",noteEn:"'puede concentrarse' = can focus (poder + reflexive infinitive)",
  expand:{
    note:"puede concentrarse en ___ por horas. = 換專注的事",
    template:[{t:"Pero puede concentrarse en"},{g:"thing"},{t:"por horas y horas."}],
    groups:[{label:"專注在什麼上",key:"thing",options:[
      {es:"un proyecto",zh:"一個計畫"},
      {es:"un dibujo",zh:"一幅畫"},
      {es:"un libro",zh:"一本書"},
    ]}]
  }},
  {es:"Su mente es un volcán de ideas y un caos de horarios.",chunks:[{w:"Su mente",role:"s"},{w:"es",role:"v"},{w:"un volcán de ideas y un caos de horarios.",role:"o"}],zh:"她的腦子是滿滿的點子，也是一團亂的時間表。",en:"Her mind is a volcano of ideas and a chaos of schedules.",noteZh:"隱喻句，volcán=火山、caos=混亂",noteEn:"metaphor: volcán=volcano, caos=chaos",
  expand:{
    note:"Su mente es un volcán de ___. = 換比喻的東西",
    template:[{t:"Su mente es un volcán de"},{g:"thing"},{t:"y un caos de horarios."}],
    groups:[{label:"充滿什麼",key:"thing",options:[
      {es:"ideas",zh:"點子"},
      {es:"planes",zh:"計畫"},
      {es:"preguntas",zh:"問題"},
    ]}]
  }},
  {es:"Un día, ve a Nita jugando de una manera muy familiar.",chunks:[{w:"Un día,"},{w:"ve",role:"v"},{w:"a Nita jugando de una manera muy familiar.",role:"o"}],zh:"有一天，她看見妮妲玩耍的樣子很眼熟。",en:"One day, she sees Nita playing in a very familiar way.",noteZh:"「a Nita」= 受詞前的人稱 a（personal a）",noteEn:"'a Nita' = personal 'a' before a person as direct object",
  expand:{
    note:"ve a ___ jugando de una manera muy familiar. = 換人",
    template:[{t:"Un día, ve a"},{g:"name"},{t:"jugando de una manera muy familiar."}],
    groups:[{label:"看見誰",key:"name",options:[
      {es:"Nita",zh:"妮妲"},
      {es:"Tito",zh:"迪多"},
      {es:"Kito",zh:"哥哥"},
    ]}]
  }},
  {es:"\"Yo también hacía eso de pequeña,\" piensa Mamá Cata.",chunks:[{w:'"Yo',role:"s"},{w:"también hacía",role:"v"},{w:'eso de pequeña,"',role:"o"},{w:"piensa Mamá Cata.",role:"v"}],zh:"「我小時候也是這樣，」卡妲媽媽心想。",en:"\"I did that too when I was little,\" thinks Mom Cata.",noteZh:"「hacía」= 過去習慣性動作（imperfecto）",noteEn:"'hacía' = imperfect tense, habitual past action",
  expand:{
    note:"Yo también hacía eso ___. = 換小時候的說法",
    template:[{t:'"Yo también hacía eso'},{g:"age"},{t:'," piensa Mamá Cata.'}],
    groups:[{label:"小時候",key:"age",options:[
      {es:"de pequeña,",zh:"小時候（女）"},
      {es:"de niña,",zh:"還是女孩的時候"},
      {es:"de joven,",zh:"年輕的時候"},
    ]}]
  }},
  {es:"Empieza a leer sobre el TDAH.",chunks:[{w:"Empieza a leer",role:"v"},{w:"sobre el TDAH.",role:"o"}],zh:"她開始讀關於ADHD的資料。",en:"She starts reading about ADHD.",noteZh:"「TDAH」= Trastorno por Déficit de Atención e Hiperactividad（西語ADHD正式縮寫）",noteEn:"'TDAH' = the Spanish acronym for ADHD",
  expand:{
    note:"Empieza a leer sobre ___. = 換主題",
    template:[{t:"Empieza a leer sobre"},{g:"topic"}],
    groups:[{label:"讀什麼主題",key:"topic",options:[
      {es:"el TDAH.",zh:"ADHD"},
      {es:"el autismo.",zh:"自閉症"},
      {es:"la neurodivergencia.",zh:"神經多樣性"},
    ]}]
  }},
  {es:"Cada síntoma es un espejo de su propia vida.",chunks:[{w:"Cada síntoma",role:"s"},{w:"es",role:"v"},{w:"un espejo de su propia vida.",role:"o"}],zh:"每一條症狀都像照到自己的人生。",en:"Every symptom is a mirror of her own life.",noteZh:"「espejo」= 鏡子（隱喻句）",noteEn:"'espejo' = mirror (metaphor)",
  expand:{
    note:"Cada síntoma es un espejo de ___. = 換描述",
    template:[{t:"Cada síntoma es un espejo de"},{g:"thing"}],
    groups:[{label:"照到什麼",key:"thing",options:[
      {es:"su propia vida.",zh:"她自己的人生"},
      {es:"su infancia.",zh:"她的童年"},
      {es:"su forma de ser.",zh:"她本來的樣子"},
    ]}]
  }},
  {es:"Ahora entiende por qué es tan fuerte y tan dispersa a la vez.",chunks:[{w:"Ahora",role:"c",hideYg:true},{w:"entiende",role:"v"},{w:"por qué es tan fuerte y tan dispersa a la vez.",role:"o"}],zh:"現在她懂了，為什麼自己同時這麼堅韌又這麼散亂。",en:"Now she understands why she's so strong and so scattered at the same time.",noteZh:"「a la vez」= 同時",noteEn:"'a la vez' = at the same time",
  expand:{
    note:"entiende por qué es tan ___ y tan ___ a la vez. = 換兩個對比的特質",
    template:[{t:"Ahora entiende por qué es tan"},{g:"trait1"},{t:"y tan"},{g:"trait2"},{t:"a la vez."}],
    groups:[
      {label:"特質一",key:"trait1",options:[
        {es:"fuerte",zh:"堅韌"},
        {es:"creativa",zh:"有創意"},
      ]},
      {label:"特質二",key:"trait2",options:[
        {es:"dispersa",zh:"散亂"},
        {es:"olvidadiza",zh:"健忘"},
      ]},
    ]
  }},
  {es:"No es un defecto, es su manera de ser.",chunks:[{w:"No es",role:"v"},{w:"un defecto,",role:"o"},{w:"es",role:"v"},{w:"su manera de ser.",role:"o"}],zh:"這不是缺陷，是她本來的樣子。",en:"It's not a flaw, it's her way of being.",noteZh:"「manera de ser」= 天生的樣子/個性",noteEn:"'manera de ser' = one's natural way of being",
  expand:{
    note:"No es un defecto, es su manera de ___. = 換描述",
    template:[{t:"No es un defecto, es su manera de"},{g:"thing"}],
    groups:[{label:"是什麼樣子",key:"thing",options:[
      {es:"ser.",zh:"存在"},
      {es:"pensar.",zh:"思考"},
      {es:"vivir.",zh:"生活"},
    ]}]
  }},
  {es:"Mamá Cata sonríe: \"Por fin sé quién soy.\"",chunks:[{w:"Mamá Cata",role:"s"},{w:"sonríe:",role:"v"},{w:'"Por fin sé quién soy."',role:"o"}],zh:"卡妲媽媽笑了：「我終於知道自己是誰了。」",en:"Mom Cata smiles: \"I finally know who I am.\"",noteZh:"「sé」= 我知道（saber 的「我」變位，不規則）",noteEn:"'sé' = I know (saber, irregular 'yo' form)",
  expand:{
    note:"Por fin sé ___. = 換知道的內容",
    template:[{t:'Mamá Cata sonríe: "Por fin sé'},{g:"who"},{t:'."'}],
    groups:[{label:"知道什麼",key:"who",options:[
      {es:"quién soy.",zh:"我是誰"},
      {es:"lo que necesito.",zh:"我需要什麼"},
      {es:"por qué soy así.",zh:"我為什麼是這樣"},
    ]}]
  }}
]},

// ── E10 我們不是故意對衝的 ──
{title:"Chocamos Sin Querer",titleZh:"我們不是故意對衝的",dur:160,sentences:[
  {es:"Mamá Cata hace un plan para el día.",chunks:[{w:"Mamá Cata",role:"s"},{w:"hace",role:"v"},{w:"un plan para el día.",role:"o"}],zh:"卡妲媽媽排好了今天的行程。",en:"Mom Cata makes a plan for the day.",noteZh:"「hace un plan」= 做計畫（hacer 的「她」變位）",noteEn:"'hace un plan' = makes a plan (hacer, 'she' form)",
  expand:{
    note:"___ hace un plan para el día. = 換主詞練習",
    template:[{g:"name"},{t:"hace un plan para el día."}],
    groups:[{label:"誰排行程",key:"name",options:[
      {es:"Mamá Cata",zh:"卡妲媽媽"},
      {es:"Papá Tato",zh:"達多爸爸"},
      {es:"Kito",zh:"哥哥"},
    ]}]
  }},
  {es:"A Tito no le gustan los cambios repentinos.",chunks:[{w:"A Tito",role:"o"},{w:"no le gustan",role:"v"},{w:"los cambios repentinos.",role:"s"}],zh:"迪多不喜歡突如其來的改變。",en:"Tito doesn't like sudden changes.",noteZh:"「gustar」句型：喜歡的東西當主詞，人當間接受詞",noteEn:"'gustar' construction: the liked thing is the subject, the person is the indirect object",
  expand:{
    note:"A ___ no le gustan los cambios repentinos. = 換主詞練習",
    template:[{t:"A"},{g:"name"},{t:"no le gustan los cambios repentinos."}],
    groups:[{label:"誰不喜歡改變",key:"name",options:[
      {es:"Tito",zh:"迪多"},
      {es:"Kito",zh:"哥哥"},
      {es:"Nita",zh:"妮妲"},
    ]}]
  }},
  {es:"Él necesita todo en el mismo orden, todos los días.",chunks:[{w:"Él",role:"s"},{w:"necesita",role:"v"},{w:"todo en el mismo orden, todos los días.",role:"o"}],zh:"他需要每天都一樣的順序。",en:"He needs everything in the same order, every day.",noteZh:"「en el mismo orden」= 同樣的順序",noteEn:"'en el mismo orden' = in the same order",
  expand:{
    note:"necesita todo en el mismo ___. = 換描述",
    template:[{t:"Él necesita todo en el mismo"},{g:"thing"},{t:", todos los días."}],
    groups:[{label:"什麼要一樣",key:"thing",options:[
      {es:"orden",zh:"順序"},
      {es:"lugar",zh:"位置"},
      {es:"horario",zh:"時間表"},
    ]}]
  }},
  {es:"Tito quiere las cosas ahora mismo.",chunks:[{w:"Tito",role:"s"},{w:"quiere",role:"v"},{w:"las cosas ahora mismo.",role:"o"}],zh:"迪多想要的是「馬上」。",en:"Tito wants things right now.",noteZh:"「ahora mismo」= 馬上、立刻",noteEn:"'ahora mismo' = right now",
  expand:{
    note:"___ quiere las cosas ahora mismo. = 換主詞練習",
    template:[{g:"name"},{t:"quiere las cosas ahora mismo."}],
    groups:[{label:"誰想要馬上",key:"name",options:[
      {es:"Tito",zh:"迪多"},
      {es:"Kito",zh:"哥哥"},
      {es:"Mimi",zh:"咪咪"},
    ]}]
  }},
  {es:"El plan de Mamá Cata se rompe, otra vez.",chunks:[{w:"El plan de Mamá Cata",role:"s"},{w:"se rompe,",role:"v"},{w:"otra vez.",role:"o"}],zh:"卡妲媽媽的計畫又被打亂了。",en:"Mom Cata's plan breaks, again.",noteZh:"「se rompe」= 被打破（romperse，反身動詞表示自然發生的破壞）",noteEn:"'se rompe' = breaks (romperse, reflexive for something breaking on its own)",
  expand:{
    note:"El plan de ___ se rompe, otra vez. = 換主詞練習",
    template:[{t:"El plan de"},{g:"name"},{t:"se rompe, otra vez."}],
    groups:[{label:"誰的計畫被打亂",key:"name",options:[
      {es:"Mamá Cata",zh:"卡妲媽媽"},
      {es:"Papá Tato",zh:"達多爸爸"},
      {es:"Kito",zh:"哥哥"},
    ]}]
  }},
  {es:"Rehacer el plan le cuesta muchísima energía.",chunks:[{w:"Rehacer el plan",role:"s"},{w:"le cuesta",role:"v"},{w:"muchísima energía.",role:"o"}],zh:"重新安排這件事，耗掉她非常多的能量。",en:"Remaking the plan costs her a huge amount of energy.",noteZh:"「costar」句型：跟 gustar 一樣，事情當主詞、人當間接受詞",noteEn:"'costar' construction: like gustar, the thing costs energy 'to' the person",
  expand:{
    note:"Rehacer el plan le cuesta ___. = 換耗費的東西",
    template:[{t:"Rehacer el plan le cuesta"},{g:"thing"}],
    groups:[{label:"耗掉什麼",key:"thing",options:[
      {es:"muchísima energía.",zh:"非常多能量"},
      {es:"toda su paciencia.",zh:"她所有的耐性"},
      {es:"mucho tiempo.",zh:"很多時間"},
    ]}]
  }},
  {es:"Chocan, una y otra vez, sin querer.",chunks:[{w:"Chocan,",role:"v"},{w:"una y otra vez,",role:"o"},{w:"sin querer.",role:"o"}],zh:"他們一次又一次地對衝，誰都不是故意的。",en:"They clash, again and again, without meaning to.",noteZh:"「sin querer」= 不是故意的",noteEn:"'sin querer' = without meaning to, unintentionally",
  expand:{
    note:"Chocan, ___, sin querer. = 換頻率",
    template:[{t:"Chocan,"},{g:"freq"},{t:", sin querer."}],
    groups:[{label:"多常對衝",key:"freq",options:[
      {es:"una y otra vez",zh:"一次又一次"},
      {es:"todos los días",zh:"每一天"},
      {es:"cada mañana",zh:"每天早上"},
    ]}]
  }},
  {es:"Una noche, se pregunta: \"¿Por qué me cuesta tanto?\"",chunks:[{w:"Una noche,"},{w:"se pregunta:",role:"v"},{w:'"¿Por qué me cuesta tanto?"',role:"o"}],zh:"一天晚上，她問自己：「為什麼這件事讓我這麼累？」",en:"One night, she asks herself: \"Why does this cost me so much?\"",noteZh:"「se pregunta」= 問自己（preguntarse，反身動詞）",noteEn:"'se pregunta' = asks herself (preguntarse, reflexive)",
  expand:{
    note:"se pregunta: ¿Por qué ___? = 換問自己的內容",
    template:[{t:'Una noche, se pregunta: "¿Por qué'},{g:"q"},{t:'?"'}],
    groups:[{label:"問自己什麼",key:"q",options:[
      {es:"me cuesta tanto",zh:"這麼耗我"},
      {es:"siempre chocamos",zh:"我們總是對衝"},
      {es:"no puedo cambiar",zh:"我沒辦法改變"},
    ]}]
  }},
  {es:"Empieza a leer sobre el TDAH.",chunks:[{w:"Empieza a leer",role:"v"},{w:"sobre el TDAH.",role:"o"}],zh:"她開始讀關於ADHD的資料。",en:"She starts reading about ADHD.",noteZh:"「TDAH」= 西語ADHD正式縮寫",noteEn:"'TDAH' = the Spanish acronym for ADHD",
  expand:{
    note:"Empieza a leer sobre ___. = 換主題",
    template:[{t:"Empieza a leer sobre"},{g:"topic"}],
    groups:[{label:"讀什麼主題",key:"topic",options:[
      {es:"el TDAH.",zh:"ADHD"},
      {es:"el autismo.",zh:"自閉症"},
      {es:"la regulación emocional.",zh:"情緒調節"},
    ]}]
  }},
  {es:"Entiende: su energía y la regularidad de él son diferentes, no incorrectas.",chunks:[{w:"Entiende:",role:"v"},{w:"su energía y la regularidad de él",role:"s"},{w:"son",role:"v"},{w:"diferentes, no incorrectas.",role:"o"}],zh:"她懂了：她的能量模式和他的規律，只是不同，不是誰錯了。",en:"She understands: her energy and his regularity are different, not wrong.",noteZh:"「diferentes, no incorrectas」= 只是不同，不是不對",noteEn:"'diferentes, no incorrectas' = just different, not wrong",
  expand:{
    note:"su ___ y la regularidad de él son diferentes, no incorrectas. = 換描述的東西",
    template:[{t:"Entiende: su"},{g:"thing"},{t:"y la regularidad de él son diferentes, no incorrectas."}],
    groups:[{label:"她的什麼跟他不同",key:"thing",options:[
      {es:"energía",zh:"能量模式"},
      {es:"forma de pensar",zh:"思考方式"},
      {es:"manera de vivir",zh:"生活方式"},
    ]}]
  }}
]},
// ── E11 亡靈節 ──
{title:"El Camino de la Memoria",titleZh:"記憶之旅",dur:200,sentences:[
  {es:"Hoy es el Día de los Muertos y toda la familia se prepara.",chunks:[{w:"Hoy"},{w:"es",role:"v"},{w:"el Día de los Muertos",role:"o"},{w:"y",role:"c"},{w:"toda la familia",role:"s"},{w:"se prepara.",role:"v"}],zh:"今天是亡靈節，全家人都在準備。",en:"Today is the Day of the Dead and the whole family is getting ready.",noteZh:"y = 而且（順接）；Día de los Muertos = 亡靈節（11月1-2日，墨西哥文化）",noteEn:"y = and (simple sequence); Día de los Muertos = Day of the Dead (Nov 1-2, Mexican culture)",
  expand:{
    note:"Hoy es ___ y toda la familia se prepara. = 換今天是什麼日子",
    template:[{t:"Hoy es"},{g:"day"},{t:"y toda la familia se prepara."}],
    groups:[{label:"今天是",key:"day",options:[
      {es:"el Día de los Muertos",zh:"亡靈節"},
      {es:"un día especial",zh:"一個特別的日子"},
      {es:"el cumpleaños de Mimi",zh:"咪咪的生日"},
    ]}]
  }},
  {es:"Mamá Cata pone flores de cempasúchil porque son el camino de vuelta.",chunks:[{w:"Mamá Cata",role:"s"},{w:"pone",role:"v"},{w:"flores de cempasúchil",role:"o"},{w:"porque",role:"c"},{w:"son el camino de vuelta.",role:"v"}],zh:"卡妲媽媽放上萬壽菊，因為那是靈魂回來的路。",en:"Mamá Cata puts out marigolds because they are the path back.",noteZh:"porque = 因為（說明原因）；cempasúchil = 萬壽菊，亡靈節代表花",noteEn:"porque = because (gives reason); cempasúchil = marigold, the flower of the Day of the Dead",
  expand:{
    note:"Mamá Cata pone ___ porque son el camino de vuelta. = 換放什麼",
    template:[{t:"Mamá Cata pone"},{g:"thing"},{t:"porque son el camino de vuelta."}],
    groups:[{label:"放什麼",key:"thing",options:[
      {es:"flores de cempasúchil",zh:"萬壽菊"},
      {es:"velas encendidas",zh:"點亮的蠟燭"},
      {es:"fotos de la familia",zh:"家族照片"},
    ]}]
  }},
  {es:"Tito no entiende la muerte, pero escucha con atención.",chunks:[{w:"Tito",role:"s"},{w:"no entiende",role:"v"},{w:"la muerte,",role:"o"},{w:"pero",role:"c"},{w:"escucha con atención.",role:"v"}],zh:"迪多不懂死亡是什麼，但他認真在聽。",en:"Tito doesn't understand death, but he listens carefully.",noteZh:"pero = 但是（轉折）；escuchar con atención = 認真聆聽",noteEn:"pero = but (contrast); escuchar con atención = listen carefully",
  expand:{
    note:"Tito no entiende ___, pero escucha con atención. = 換不懂什麼",
    template:[{t:"Tito no entiende"},{g:"thing"},{t:", pero escucha con atención."}],
    groups:[{label:"不懂什麼",key:"thing",options:[
      {es:"la muerte",zh:"死亡"},
      {es:"por qué hay que esperar",zh:"為什麼要等"},
      {es:"todas las palabras",zh:"所有的字"},
    ]}]
  }},
  {es:"El cementerio es silencioso pero está lleno de luz.",chunks:[{w:"El cementerio",role:"s"},{w:"es",role:"v"},{w:"silencioso",role:"o"},{w:"pero",role:"c"},{w:"está",role:"v"},{w:"lleno de luz.",role:"o"}],zh:"墓地很安靜，但到處都是光。",en:"The cemetery is silent but full of light.",noteZh:"SER vs ESTAR：es silencioso（固定特質）/ está lleno de luz（當下狀態）",noteEn:"SER vs ESTAR: es silencioso (permanent quality) / está lleno de luz (current state)",
  expand:{
    note:"El cementerio es silencioso pero está lleno de ___. = 換充滿什麼",
    template:[{t:"El cementerio es silencioso pero está lleno de"},{g:"thing"}],
    groups:[{label:"充滿什麼",key:"thing",options:[
      {es:"luz.",zh:"光"},
      {es:"flores.",zh:"花"},
      {es:"recuerdos.",zh:"回憶"},
    ]}]
  }},
  {es:"Nita mira las fotos y reconoce caras que nunca ha visto.",chunks:[{w:"Nita",role:"s"},{w:"mira",role:"v"},{w:"las fotos",role:"o"},{w:"y",role:"c"},{w:"reconoce",role:"v"},{w:"caras que nunca ha visto.",role:"o"}],zh:"妮妲看著照片，認出了她從來沒見過的臉。",en:"Nita looks at the photos and recognises faces she has never seen.",noteZh:"y = 而且（連接兩個動作）；nunca ha visto = 從來沒見過（現在完成式）",noteEn:"y = and (connecting two actions); nunca ha visto = has never seen (present perfect)",
  expand:{
    note:"Nita mira ___ y reconoce ___. = 換看什麼、認出什麼",
    template:[{t:"Nita mira"},{g:"look"},{t:"y reconoce"},{g:"who"}],
    groups:[
      {label:"看什麼",key:"look",options:[
        {es:"las fotos",zh:"照片"},
        {es:"los dibujos",zh:"圖畫"},
        {es:"las cartas",zh:"信件"},
      ]},
      {label:"認出什麼",key:"who",options:[
        {es:"caras que nunca ha visto.",zh:"從來沒見過的臉"},
        {es:"la escritura de la abuela.",zh:"外婆的筆跡"},
        {es:"el lugar de antes.",zh:"以前的地方"},
      ]}
    ]
  }},
  {es:"Papá Tato dice: \"Los recordamos porque los queremos.\"",chunks:[{w:"Papá Tato",role:"s"},{w:"dice:",role:"v"},{w:'"Los recordamos',role:"o"},{w:"porque",role:"c"},{w:'los queremos."',role:"v"}],zh:"達多爸爸說：「我們記得他們，因為我們愛他們。」",en:"Papá Tato says: \"We remember them because we love them.\"",noteZh:"porque = 因為（說明記得的理由）；recordar = 記得、紀念",noteEn:"porque = because (explains the reason); recordar = to remember, to honour",
  expand:{
    note:"Los recordamos porque ___. = 換記得他們的理由",
    template:[{t:'Papá Tato dice: "Los recordamos porque'},{g:"reason"},{t:'."'}],
    groups:[{label:"為什麼記得他們",key:"reason",options:[
      {es:"los queremos",zh:"我們愛他們"},
      {es:"fueron importantes",zh:"他們很重要"},
      {es:"siguen en nuestro corazón",zh:"他們還在我們心裡"},
    ]}]
  }},
  {es:"Mimi abraza su flor naranja, pero no quiere soltarla.",chunks:[{w:"Mimi",role:"s"},{w:"abraza",role:"v"},{w:"su flor naranja,",role:"o"},{w:"pero",role:"c"},{w:"no quiere soltarla.",role:"v"}],zh:"咪咪抱著她的橘色花朵，但是不想放手。",en:"Mimi hugs her orange flower, but doesn't want to let it go.",noteZh:"pero = 但是（轉折出感受）；soltar = 放手、放開",noteEn:"pero = but (reveals her feeling); soltar = to let go, to release",
  expand:{
    note:"Mimi abraza ___, pero no quiere soltarla. = 換抱著什麼",
    template:[{t:"Mimi abraza"},{g:"thing"},{t:", pero no quiere soltarla."}],
    groups:[{label:"抱著什麼",key:"thing",options:[
      {es:"su flor naranja",zh:"她的橘色花朵"},
      {es:"su osito de peluche",zh:"她的小熊玩偶"},
      {es:"la foto de la abuela",zh:"外婆的照片"},
    ]}]
  }},
  {es:"La familia se sienta junta y comparte historias de los que se fueron.",chunks:[{w:"La familia",role:"s"},{w:"se sienta junta",role:"v"},{w:"y",role:"c"},{w:"comparte",role:"v"},{w:"historias de los que se fueron.",role:"o"}],zh:"一家人坐在一起，分享著那些離去的人的故事。",en:"The family sits together and shares stories of those who have gone.",noteZh:"y = 而且（連接兩個動作）；los que se fueron = 那些離去的人",noteEn:"y = and (connecting two actions); los que se fueron = those who have gone",
  expand:{
    note:"La familia se sienta junta y comparte ___. = 換分享什麼",
    template:[{t:"La familia se sienta junta y comparte"},{g:"what"}],
    groups:[{label:"分享什麼",key:"what",options:[
      {es:"historias de los que se fueron.",zh:"離去的人的故事"},
      {es:"fotos de antes.",zh:"以前的照片"},
      {es:"recuerdos del pasado.",zh:"過去的回憶"},
    ]}]
  }},
  {es:"El amor no se muere, pero sí cambia de forma.",chunks:[{w:"El amor",role:"s"},{w:"no se muere,",role:"v"},{w:"pero",role:"c"},{w:"sí"},{w:"cambia de forma.",role:"v"}],zh:"愛不會死，但它的形式會改變。",en:"Love doesn't die, but it does change form.",noteZh:"no... pero sí = 不是A，但確實是B（sí 強調肯定）；cambia de forma = 改變形式",noteEn:"no... pero sí = not A, but it does B (sí adds emphasis); cambia de forma = changes form",
  expand:{
    note:"El amor no se muere, pero sí ___. = 換確實發生什麼",
    template:[{t:"El amor no se muere, pero sí"},{g:"change"}],
    groups:[{label:"確實發生什麼",key:"change",options:[
      {es:"cambia de forma.",zh:"改變形式"},
      {es:"sigue con nosotros.",zh:"繼續陪著我們"},
      {es:"vive en los recuerdos.",zh:"活在回憶裡"},
    ]}]
  }},
  {es:"La muerte es natural pero el amor es para siempre.",chunks:[{w:"La muerte",role:"s"},{w:"es",role:"v"},{w:"natural",role:"o"},{w:"pero",role:"c"},{w:"el amor",role:"s"},{w:"es",role:"v"},{w:"para siempre.",role:"o"}],zh:"死亡是自然的，但愛是永恆的。",en:"Death is natural but love is forever.",noteZh:"pero = 但是（轉折）；para siempre = 永遠（para 表達無限期限）",noteEn:"pero = but (final contrast); para siempre = forever (para expresses unlimited duration)",
  expand:{
    note:"La muerte es natural pero ___. = 換轉折後什麼是永恆的",
    template:[{t:"La muerte es natural pero"},{g:"contrast"}],
    groups:[{label:"但什麼是永恆",key:"contrast",options:[
      {es:"el amor es para siempre.",zh:"愛是永恆的"},
      {es:"el recuerdo no se va.",zh:"記憶不會離開"},
      {es:"la familia sigue unida.",zh:"家人仍然團聚"},
    ]}]
  }}
]},

// ── E12 小小自我在閣樓 ──
{title:"El Desván",titleZh:"小小自我在閣樓",sentences:[
  {es:"El Yo Pequeñito vive en el desván.",chunks:[{w:"El Yo Pequeñito",role:"s"},{w:"vive",role:"v"},{w:"en el desván.",role:"o"}],zh:"小小自我住在閣樓裡。",en:"Little Self lives in the attic.",noteZh:"vive en = 住在（vivir 也可以表達「住」的地點）",noteEn:"'vive en' = lives in (vivir + location)",
  expand:{note:"El Yo Pequeñito vive en ___. = 換他住在哪裡",template:[{t:"El Yo Pequeñito vive en"},{g:"place"}],groups:[{label:"住在哪裡",key:"place",options:[{es:"el desván.",zh:"閣樓"},{es:"el armario.",zh:"衣櫥"},{es:"el sótano.",zh:"地下室"}]}]}},
  {es:"Está escondido, pero quiere salir.",chunks:[{w:"Está escondido,",role:"v"},{w:"pero",role:"c"},{w:"quiere salir.",role:"v"}],zh:"他躲著，但想出去。",en:"He's hidden, but wants to come out.",noteZh:"Está escondido = 他是躲著的狀態（estar+過去分詞）；quiere salir = 想要出去",noteEn:"'Está escondido' = he is hidden (estar + past participle); 'quiere salir' = wants to leave",
  expand:{note:"pero quiere ___. = 換他想做什麼",template:[{t:"Está escondido, pero"},{g:"want"}],groups:[{label:"他想做什麼",key:"want",options:[{es:"quiere salir.",zh:"想出去"},{es:"quiere jugar.",zh:"想玩"},{es:"quiere hablar.",zh:"想說話"}]}]}},
  {es:'Asoma la cabeza y pregunta: "¿Puedo jugar también?"',chunks:[{w:"Asoma",role:"v"},{w:"la cabeza",role:"o"},{w:"y",role:"c"},{w:"pregunta:",role:"v"},{w:'"¿Puedo jugar también?"',role:"o"}],zh:"他探出頭，問：「我也可以加入嗎？」",en:'He peeks his head out and asks: "Can I join too?"',noteZh:"asomar la cabeza = 探出頭；puedo + 原形動詞 = 我可以做某事",noteEn:"'asomar la cabeza' = to peek one's head out; 'puedo + infinitive' = I can...",
  expand:{note:"pregunta: ___ = 換他問什麼",template:[{t:"Asoma la cabeza y pregunta:"},{g:"question"}],groups:[{label:"他問什麼",key:"question",options:[{es:'"¿Puedo jugar también?"',zh:"我也可以加入嗎？"},{es:'"¿Puedo quedarme aquí?"',zh:"我可以留在這裡嗎？"},{es:'"¿Me pueden escuchar?"',zh:"你們能聽見我嗎？"}]}]}},
  {es:'Ellos le dicen: "Eres muy pequeño todavía."',chunks:[{w:"Ellos",role:"s"},{w:"le dicen:",role:"v"},{w:'"Eres muy pequeño todavía."',role:"o"}],zh:"他們對他說：「你還太小了。」",en:'They tell him: "You\'re still too small."',noteZh:"le dicen = 對他說（間接受詞le）；todavía = 還、仍然",noteEn:"'le dicen' = they say to him (indirect object 'le'); 'todavía' = still",
  expand:{note:"le dicen: ___ = 換他們回答什麼",template:[{t:"Ellos le dicen:"},{g:"reply"}],groups:[{label:"他們回答什麼",key:"reply",options:[{es:'"Eres muy pequeño todavía."',zh:"你還太小了"},{es:'"Ahora no es el momento."',zh:"現在不是時候"},{es:'"Todavía no puedes."',zh:"你還不行"}]}]}},
  {es:"La Tristeza y el Miedo lo abrazan.",chunks:[{w:"La Tristeza y el Miedo",role:"s"},{w:"lo abrazan.",role:"v"}],zh:"悲傷和恐懼抱住他。",en:"Sadness and Fear hug him.",noteZh:"lo abrazan = 抱住他（直接受詞lo）",noteEn:"'lo abrazan' = they hug him (direct object 'lo')",
  expand:{note:"___ lo abrazan. = 換誰抱住他",template:[{g:"who"},{t:"lo abrazan."}],groups:[{label:"誰抱住他",key:"who",options:[{es:"La Tristeza y el Miedo",zh:"悲傷和恐懼"},{es:"Cansancio",zh:"倦倦"},{es:"Esperanza",zh:"嬉汐"}]}]}},
  {es:"Esperan juntos la escalera de madera.",chunks:[{w:"Esperan juntos",role:"v"},{w:"la escalera de madera.",role:"o"}],zh:"他們一起等那道木梯。",en:"They wait together for the wooden ladder.",noteZh:"esperar + 受詞 = 等待某事物（不用加介系詞）；juntos = 一起",noteEn:"'esperar' takes a direct object with no preposition; 'juntos' = together",
  expand:{note:"Esperan juntos ___. = 換等待什麼",template:[{t:"Esperan juntos"},{g:"thing"}],groups:[{label:"等待什麼",key:"thing",options:[{es:"la escalera de madera.",zh:"木梯"},{es:"la luz del sol.",zh:"陽光"},{es:"el momento perfecto.",zh:"完美的時機"}]}]}},
  {es:"Un día, algo se rompe muy fuerte.",chunks:[{w:"Un día,"},{w:"algo",role:"s"},{w:"se rompe muy fuerte.",role:"v"}],zh:"有一天，什麼東西碎裂得很大聲。",en:"One day, something breaks very loudly.",noteZh:"se rompe = 碎裂（反身動詞表自然發生的動作）",noteEn:"'se rompe' = breaks (reflexive verb for something happening on its own)",
  expand:{note:"algo se rompe ___. = 換怎麼碎裂",template:[{t:"Un día, algo se rompe"},{g:"how"}],groups:[{label:"怎麼碎裂",key:"how",options:[{es:"muy fuerte.",zh:"很大聲"},{es:"en silencio.",zh:"無聲無息"},{es:"de repente.",zh:"突然間"}]}]}},
  {es:"El Yo Pequeñito empieza a crecer.",chunks:[{w:"El Yo Pequeñito",role:"s"},{w:"empieza a crecer.",role:"v"}],zh:"小小自我開始長大。",en:"Little Self begins to grow.",noteZh:"empieza a + 原形動詞 = 開始做某事",noteEn:"'empieza a + infinitive' = begins to...",
  expand:{note:"empieza a ___. = 換開始做什麼",template:[{t:"El Yo Pequeñito empieza a"},{g:"action"}],groups:[{label:"開始做什麼",key:"action",options:[{es:"crecer.",zh:"長大"},{es:"caminar.",zh:"走路"},{es:"hablar.",zh:"說話"}]}]}},
  {es:"Por fin puede bajar solo.",chunks:[{w:"Por fin"},{w:"puede bajar solo.",role:"v"}],zh:"他終於可以自己爬下去了。",en:"He can finally climb down alone.",noteZh:"por fin = 終於；solo = 獨自（陽性形容詞，因為主詞是男性 el Yo Pequeñito）",noteEn:"'por fin' = finally; 'solo' = alone (masculine, agreeing with 'el Yo Pequeñito')",
  expand:{note:"puede bajar ___. = 換怎麼下去",template:[{t:"Por fin puede bajar"},{g:"how"}],groups:[{label:"怎麼下去",key:"how",options:[{es:"solo.",zh:"獨自"},{es:"con calma.",zh:"平靜地"},{es:"sin miedo.",zh:"不再害怕"}]}]}},
  {es:'La Esperanza dice: "¡Hoy es el día!"',chunks:[{w:"La Esperanza",role:"s"},{w:"dice:",role:"v"},{w:'"¡Hoy es el día!"',role:"o"}],zh:"希望說：「今天就是那一天！」",en:'Hope says: "Today is the day!"',noteZh:"Hoy es el día = 今天就是那一天（SER表達確定的事實）",noteEn:"'Hoy es el día' = today is the day (SER for a stated fact)",
  expand:{note:"___ dice: \"¡Hoy es el día!\" = 換是誰說的",template:[{g:"who"},{t:'dice: "¡Hoy es el día!"'}],groups:[{label:"誰說的",key:"who",options:[{es:"La Esperanza",zh:"嬉汐"},{es:"El Guardián",zh:"憨憨"},{es:"Cansancio",zh:"倦倦"}]}]}}
]},

// ── E13 小情緒們的自我介紹 ──
{title:"Las Emociones Pequeñas",titleZh:"小情緒們的自我介紹",sentences:[
  {es:"En el desván viven nueve emociones pequeñas.",chunks:[{w:"En el desván",role:"o"},{w:"viven",role:"v"},{w:"nueve emociones pequeñas.",role:"s"}],zh:"閣樓裡住著九個小情緒。",en:"In the attic live nine little emotions.",noteZh:"存在句可以把地點放最前面：En el desván viven... = 閣樓裡住著⋯⋯",noteEn:"Existential sentences can front the location: 'En el desván viven...' = In the attic live...",
  expand:{note:"En el desván viven ___. = 換住著什麼",template:[{t:"En el desván viven"},{g:"count"}],groups:[{label:"住著什麼",key:"count",options:[{es:"nueve emociones pequeñas.",zh:"九個小情緒"},{es:"muchas voces pequeñas.",zh:"很多小小的聲音"},{es:"recuerdos pequeños.",zh:"小小的回憶"}]}]}},
  {es:'"Yo soy Agravio. Represento lo que se traga sin decir."',chunks:[{w:"Yo",role:"s"},{w:"soy",role:"v"},{w:"Agravio.",role:"o"},{w:"Represento",role:"v"},{w:"lo que se traga sin decir.",role:"o"}],zh:"「我是曲屈。我代表那些吞下去沒說出口的委屈。」",en:'"I am Agravio. I represent what gets swallowed unsaid."',noteZh:"lo que se traga sin decir = 那些吞下去沒說出口的（lo que+子句 表達「⋯的事物」）",noteEn:"'lo que se traga sin decir' = what gets swallowed unsaid ('lo que' + clause = 'that which...')",
  expand:{note:"Represento ___. = 換他代表什麼",template:[{t:'"Yo soy Agravio. Represento'},{g:"trait"}],groups:[{label:"他代表什麼",key:"trait",options:[{es:'lo que se traga sin decir."',zh:"吞下去沒說出口的"},{es:'lo que se guarda por dentro."',zh:"藏在心裡的"},{es:'lo que nadie quiere escuchar."',zh:"沒有人想聽的"}]}]}},
  {es:'"Yo soy Tristeza. A veces solo quiero llorar."',chunks:[{w:"Yo",role:"s"},{w:"soy",role:"v"},{w:"Tristeza.",role:"o"},{w:"A veces"},{w:"solo quiero llorar.",role:"v"}],zh:"「我是茫茫。有時候我只是想哭。」",en:'"I am Tristeza. Sometimes I just want to cry."',noteZh:"a veces = 有時候；solo（此處＝只是，副詞，不加重音）",noteEn:"'a veces' = sometimes; 'solo' here means 'just/only' (adverb)",
  expand:{note:"solo quiero ___. = 換她想做什麼",template:[{t:'"Yo soy Tristeza. A veces solo quiero'},{g:"want"}],groups:[{label:"想做什麼",key:"want",options:[{es:'llorar."',zh:"哭"},{es:'estar sola."',zh:"獨處"},{es:'quedarme callada."',zh:"安靜待著"}]}]}},
  {es:'"Yo soy Agrado. Quiero que todos estén contentos."',chunks:[{w:"Yo",role:"s"},{w:"soy",role:"v"},{w:"Agrado.",role:"o"},{w:"Quiero que todos estén contentos.",role:"v"}],zh:"「我是唆嗦。我想讓每個人都開心。」",en:'"I am Agrado. I want everyone to be happy."',noteZh:"Quiero que + 虛擬式 = 我希望⋯（querer que 觸發虛擬式，因為主詞不同）",noteEn:"'Quiero que + subjunctive' = I want... (querer que triggers subjunctive, different subjects)",
  expand:{note:"Quiero que todos estén ___. = 換希望大家怎樣",template:[{t:'"Yo soy Agrado. Quiero que todos estén'},{g:"state"}],groups:[{label:"希望大家怎樣",key:"state",options:[{es:'contentos."',zh:"開心"},{es:'bien."',zh:"好好的"},{es:'tranquilos."',zh:"平靜"}]}]}},
  {es:'"Yo soy Miedo. Me escondo cuando algo cambia."',chunks:[{w:"Yo",role:"s"},{w:"soy",role:"v"},{w:"Miedo.",role:"o"},{w:"Me escondo",role:"v"},{w:"cuando",role:"c"},{w:"algo cambia.",role:"v"}],zh:"「我是糾揪。有變化的時候我就躲起來。」",en:'"I am Miedo. I hide when something changes."',noteZh:"me escondo = 我躲起來（反身動詞）；cuando + 陳述式 = 每次⋯的時候（習慣性）",noteEn:"'me escondo' = I hide (reflexive); 'cuando + indicative' = whenever... (habitual)",
  expand:{note:"Me escondo cuando ___. = 換什麼時候躲起來",template:[{t:'"Yo soy Miedo. Me escondo cuando'},{g:"trigger"}],groups:[{label:"什麼時候躲起來",key:"trigger",options:[{es:'algo cambia."',zh:"有變化的時候"},{es:'hay ruido fuerte."',zh:"有很大聲音的時候"},{es:'todo es nuevo."',zh:"一切都是新的時候"}]}]}},
  {es:'"Yo soy Cansancio. Necesito descansar todo el tiempo."',chunks:[{w:"Yo",role:"s"},{w:"soy",role:"v"},{w:"Cansancio.",role:"o"},{w:"Necesito descansar",role:"v"},{w:"todo el tiempo.",role:"o"}],zh:"「我是倦倦。我隨時都需要休息。」",en:'"I am Cansancio. I need to rest all the time."',noteZh:"necesito + 原形動詞 = 我需要做某事；todo el tiempo = 一直、隨時",noteEn:"'necesito + infinitive' = I need to...; 'todo el tiempo' = all the time",
  expand:{note:"Necesito ___. = 換她需要什麼",template:[{t:'"Yo soy Cansancio. Necesito'},{g:"need"}],groups:[{label:"需要什麼",key:"need",options:[{es:'descansar todo el tiempo."',zh:"隨時休息"},{es:'dormir más."',zh:"多睡一點"},{es:'un momento de silencio."',zh:"一刻安靜"}]}]}},
  {es:'"Yo soy Culpa. Pienso que todo es mi error."',chunks:[{w:"Yo",role:"s"},{w:"soy",role:"v"},{w:"Culpa.",role:"o"},{w:"Pienso que todo es mi error.",role:"v"}],zh:"「我是譴譴。我覺得什麼都是我的錯。」",en:'"I am Culpa. I think everything is my fault."',noteZh:"pienso que + 陳述式 = 我覺得⋯（確信的想法用陳述式，不是虛擬式）",noteEn:"'pienso que + indicative' = I think that... (a belief takes indicative, not subjunctive)",
  expand:{note:"Pienso que todo es ___. = 換覺得什麼是自己的",template:[{t:'"Yo soy Culpa. Pienso que todo es'},{g:"blame"}],groups:[{label:"覺得什麼是自己的",key:"blame",options:[{es:'mi error."',zh:"我的錯"},{es:'mi responsabilidad."',zh:"我的責任"},{es:'mi culpa."',zh:"我的過失"}]}]}},
  {es:'"Yo soy Esperanza. Siempre busco una salida."',chunks:[{w:"Yo",role:"s"},{w:"soy",role:"v"},{w:"Esperanza.",role:"o"},{w:"Siempre"},{w:"busco",role:"v"},{w:"una salida.",role:"o"}],zh:"「我是嬉汐。我一直在找出路。」",en:'"I am Esperanza. I always look for a way out."',noteZh:"siempre = 總是；busco = 我在找（buscar不用加介系詞）",noteEn:"'siempre' = always; 'busco' = I look for (buscar takes no preposition)",
  expand:{note:"Siempre busco ___. = 換一直在找什麼",template:[{t:'"Yo soy Esperanza. Siempre busco'},{g:"seek"}],groups:[{label:"一直在找什麼",key:"seek",options:[{es:'una salida."',zh:"出路"},{es:'una razón para seguir."',zh:"繼續下去的理由"},{es:'un poco de luz."',zh:"一點點光"}]}]}},
  {es:'"Yo soy Guardián. Vigilo la puerta, muy adentro."',chunks:[{w:"Yo",role:"s"},{w:"soy",role:"v"},{w:"Guardián.",role:"o"},{w:"Vigilo",role:"v"},{w:"la puerta, muy adentro.",role:"o"}],zh:"「我是憨憨。我守在最深處的那道門。」",en:'"I am Guardián. I watch the door, deep inside."',noteZh:"vigilar = 看守、守衛；adentro = 裡面深處",noteEn:"'vigilar' = to watch over/guard; 'adentro' = deep inside",
  expand:{note:"Vigilo ___. = 換守著什麼",template:[{t:'"Yo soy Guardián. Vigilo'},{g:"watch"}],groups:[{label:"守著什麼",key:"watch",options:[{es:'la puerta, muy adentro."',zh:"最深處的那道門"},{es:'el silencio del corazón."',zh:"心裡的寂靜"},{es:'cada rincón oscuro."',zh:"每個陰暗的角落"}]}]}},
  {es:'"Y está Juicio, que ataca desde afuera."',chunks:[{w:"Y",role:"c"},{w:"está",role:"v"},{w:"Juicio,",role:"s"},{w:"que ataca desde afuera.",role:"o"}],zh:"「還有錐心魘，那個從外面發動攻擊的。」",en:'"And there\'s Juicio, who attacks from outside."',noteZh:"y está + 名字 = 還有⋯（介紹新角色的存在句）；desde afuera = 從外面",noteEn:"'y está...' = and there's... (introducing a new character); 'desde afuera' = from outside",
  expand:{note:"que ataca ___. = 換從哪裡攻擊",template:[{t:'"Y está Juicio, que ataca'},{g:"from"}],groups:[{label:"從哪裡攻擊",key:"from",options:[{es:'desde afuera."',zh:"從外面"},{es:'sin avisar."',zh:"毫無預警"},{es:'todos los días."',zh:"每一天"}]}]}}
]},

// ── E14 情緒語塊進階：連接詞 ──
{title:"Conectores del Corazón",titleZh:"情緒語塊進階：連接詞",sentences:[
  {es:"Yo soy Agravio. Guardo lo que duele, sin embargo, no lo hago para siempre.",chunks:[{w:"Yo",role:"s"},{w:"soy",role:"v"},{w:"Agravio.",role:"o"},{w:"Guardo",role:"v"},{w:"lo que duele,",role:"o"},{w:"sin embargo,",role:"c"},{w:"no lo hago",role:"v"},{w:"para siempre.",role:"o"}],zh:"我是曲屈。我藏著那些傷，然而，我不會永遠藏著。",en:"I am Agravio. I hold what hurts, however, not forever.",noteZh:"sin embargo = 然而（轉折連接詞，比pero正式）",noteEn:"'sin embargo' = however (more formal contrast connector than 'pero')",
  expand:{note:"no lo hago ___. = 換不會怎樣做",template:[{t:"Yo soy Agravio. Guardo lo que duele, sin embargo, no lo hago"},{g:"how_long"}],groups:[{label:"不會怎樣做",key:"how_long",options:[{es:"para siempre.",zh:"永遠"},{es:"solo.",zh:"獨自一人"},{es:"en silencio.",zh:"沉默地"}]}]}},
  {es:"Yo soy Tristeza. A veces solo quiero llorar, de hecho, no tengo que buscar una razón inmediata.",chunks:[{w:"Yo",role:"s"},{w:"soy",role:"v"},{w:"Tristeza.",role:"o"},{w:"A veces"},{w:"solo quiero llorar,",role:"v"},{w:"de hecho,",role:"c"},{w:"no tengo que buscar",role:"v"},{w:"una razón inmediata.",role:"o"}],zh:"我是茫茫。有時候我只想哭，其實，我不需要立刻找一個理由。",en:"I am Tristeza. Sometimes I just want to cry, in fact, I don't need to find an immediate reason.",noteZh:"de hecho = 其實、事實上；no tener que = 不需要（不是「不可以」）",noteEn:"'de hecho' = in fact; 'no tener que' = don't need to (not 'must not')",
  expand:{note:"no tengo que ___. = 換不需要做什麼",template:[{t:"Yo soy Tristeza. A veces solo quiero llorar, de hecho, no tengo que"},{g:"need"}],groups:[{label:"不需要做什麼",key:"need",options:[{es:"buscar una razón inmediata.",zh:"立刻找一個理由"},{es:"explicarme.",zh:"解釋自己"},{es:"esconder mis lágrimas.",zh:"藏起眼淚"}]}]}},
  {es:"Yo soy Agrado. Quiero que todos estén bien, a pesar de eso, también necesito cuidarme a mí.",chunks:[{w:"Yo",role:"s"},{w:"soy",role:"v"},{w:"Agrado.",role:"o"},{w:"Quiero que todos estén bien,",role:"v"},{w:"a pesar de eso,",role:"c"},{w:"también"},{w:"necesito cuidarme",role:"v"},{w:"a mí.",role:"o"}],zh:"我是唆嗦。我想讓大家都好，即便如此，我也需要照顧自己。",en:"I am Agrado. I want everyone to be okay, even so, I also need to take care of myself.",noteZh:"a pesar de eso = 即便如此（讓步連接詞）；cuidarme a mí = 照顧我自己（反身+強調受詞）",noteEn:"'a pesar de eso' = even so (concessive connector); 'cuidarme a mí' = take care of myself (reflexive + emphatic)",
  expand:{note:"también necesito ___. = 換也需要做什麼",template:[{t:"Yo soy Agrado. Quiero que todos estén bien, a pesar de eso, también necesito"},{g:"need"}],groups:[{label:"也需要做什麼",key:"need",options:[{es:"cuidarme a mí.",zh:"照顧我自己"},{es:"decir que no a veces.",zh:"偶爾說不"},{es:"pensar en mí primero.",zh:"先想到自己"}]}]}},
  {es:"Yo soy Miedo. Cuando algo cambia, me paralizo, por eso, necesito tiempo para adaptarme.",chunks:[{w:"Yo",role:"s"},{w:"soy",role:"v"},{w:"Miedo.",role:"o"},{w:"Cuando",role:"c"},{w:"algo cambia,",role:"v"},{w:"me paralizo,",role:"v"},{w:"por eso,",role:"c"},{w:"necesito tiempo",role:"v"},{w:"para adaptarme.",role:"o"}],zh:"我是糾揪。有變化的時候我就凍住，所以，我需要時間來適應。",en:"I am Miedo. When something changes, I freeze, that's why, I need time to adapt.",noteZh:"por eso = 所以（因果連接詞）；adaptarme = 適應（反身動詞）",noteEn:"'por eso' = that's why (cause-effect connector); 'adaptarme' = to adapt (reflexive)",
  expand:{note:"necesito ___. = 換需要什麼",template:[{t:"Yo soy Miedo. Cuando algo cambia, me paralizo, por eso, necesito"},{g:"need"}],groups:[{label:"需要什麼",key:"need",options:[{es:"tiempo para adaptarme.",zh:"時間來適應"},{es:"espacio para respirar.",zh:"喘息的空間"},{es:"alguien que espere.",zh:"有人願意等待"}]}]}},
  {es:"Yo soy Cansancio. Necesito descanso, además, pedir descanso no es rendirse.",chunks:[{w:"Yo",role:"s"},{w:"soy",role:"v"},{w:"Cansancio.",role:"o"},{w:"Necesito",role:"v"},{w:"descanso,",role:"o"},{w:"además,",role:"c"},{w:"pedir descanso no es rendirse.",role:"v"}],zh:"我是倦倦。我需要休息，而且，要求休息不是放棄。",en:"I am Cansancio. I need rest, besides, asking for rest is not giving up.",noteZh:"además = 而且（補充連接詞）；rendirse = 放棄、投降（反身動詞）",noteEn:"'además' = besides/moreover (additive connector); 'rendirse' = to give up (reflexive)",
  expand:{note:"pedir descanso no es ___. = 換不是什麼",template:[{t:"Yo soy Cansancio. Necesito descanso, además, pedir descanso no es"},{g:"not"}],groups:[{label:"不是什麼",key:"not",options:[{es:"rendirse.",zh:"放棄"},{es:"debilidad.",zh:"軟弱"},{es:"un fracaso.",zh:"失敗"}]}]}},
  {es:"Yo soy Culpa. Creo que todo es mi error, en realidad, no todo depende de mí.",chunks:[{w:"Yo",role:"s"},{w:"soy",role:"v"},{w:"Culpa.",role:"o"},{w:"Creo que todo es mi error,",role:"v"},{w:"en realidad,",role:"c"},{w:"no todo",role:"s"},{w:"depende",role:"v"},{w:"de mí.",role:"o"}],zh:"我是譴譴。我以為什麼都是我的錯，但其實，並不是所有事都取決於我。",en:"I am Culpa. I think everything is my fault, in reality, not everything depends on me.",noteZh:"en realidad = 但其實（強調連接詞，糾正前面的想法）；depender de = 取決於",noteEn:"'en realidad' = in reality (emphatic connector correcting a prior thought); 'depender de' = to depend on",
  expand:{note:"no todo depende de ___. = 換不是取決於誰",template:[{t:"Yo soy Culpa. Creo que todo es mi error, en realidad, no todo depende de"},{g:"who"}],groups:[{label:"不是取決於誰",key:"who",options:[{es:"mí.",zh:"我"},{es:"una sola persona.",zh:"一個人"},{es:"lo que yo hago.",zh:"我做的事"}]}]}},
  {es:"Yo soy Esperanza. Busco la salida al mismo tiempo que acompaño al Yo Pequeñito.",chunks:[{w:"Yo",role:"s"},{w:"soy",role:"v"},{w:"Esperanza.",role:"o"},{w:"Busco",role:"v"},{w:"la salida",role:"o"},{w:"al mismo tiempo que",role:"c"},{w:"acompaño",role:"v"},{w:"al Yo Pequeñito.",role:"o"}],zh:"我是嬉汐。我一邊找出路，同時，也陪伴著小小自我。",en:"I am Esperanza. I search for the way out while at the same time accompanying Little Self.",noteZh:"al mismo tiempo que = 同時（並列連接詞）；acompañar a alguien = 陪伴某人",noteEn:"'al mismo tiempo que' = at the same time as (simultaneous connector); 'acompañar a alguien' = to accompany someone",
  expand:{note:"al mismo tiempo que ___. = 換同時也做什麼",template:[{t:"Yo soy Esperanza. Busco la salida al mismo tiempo que"},{g:"also"}],groups:[{label:"同時也做什麼",key:"also",options:[{es:"acompaño al Yo Pequeñito.",zh:"陪伴著小小自我"},{es:"cuido a los demás.",zh:"照顧其他人"},{es:"sigo caminando.",zh:"繼續往前走"}]}]}},
  {es:"Yo soy Guardián. Protejo el Corazón Verdadero, sobre todo, cuando Juicio ataca.",chunks:[{w:"Yo",role:"s"},{w:"soy",role:"v"},{w:"Guardián.",role:"o"},{w:"Protejo",role:"v"},{w:"el Corazón Verdadero,",role:"o"},{w:"sobre todo,",role:"c"},{w:"cuando",role:"c"},{w:"Juicio ataca.",role:"v"}],zh:"我是憨憨。我守護著本心，尤其是，當錐心魘發動攻擊的時候。",en:"I am Guardián. I protect the True Heart, especially, when Juicio attacks.",noteZh:"sobre todo = 尤其是（強調連接詞）",noteEn:"'sobre todo' = especially/above all (emphatic connector)",
  expand:{note:"sobre todo, cuando ___. = 換尤其是什麼時候",template:[{t:"Yo soy Guardián. Protejo el Corazón Verdadero, sobre todo, cuando"},{g:"when"}],groups:[{label:"尤其是什麼時候",key:"when",options:[{es:"Juicio ataca.",zh:"錐心魘攻擊的時候"},{es:"todo se siente oscuro.",zh:"一切感覺很暗的時候"},{es:"nadie más ayuda.",zh:"沒有其他人幫忙的時候"}]}]}},
  {es:"Yo soy Juicio. Juzgo cada palabra, sin embargo, mis palabras más duras son para mí.",chunks:[{w:"Yo",role:"s"},{w:"soy",role:"v"},{w:"Juicio.",role:"o"},{w:"Juzgo",role:"v"},{w:"cada palabra,",role:"o"},{w:"sin embargo,",role:"c"},{w:"mis palabras más duras",role:"s"},{w:"son",role:"v"},{w:"para mí.",role:"o"}],zh:"我是錐心魘。我評判每一句話，然而，我最狠的話，都是留給自己的。",en:"I am Juicio. I judge every word, however, my harshest words are for myself.",noteZh:"juzgar = 評判；mis palabras más duras = 我最狠的話（最高級形容詞放名詞後）",noteEn:"'juzgar' = to judge; 'mis palabras más duras' = my harshest words (superlative adjective after noun)",
  expand:{note:"son para ___. = 換最狠的話是給誰",template:[{t:"Yo soy Juicio. Juzgo cada palabra, sin embargo, mis palabras más duras son para"},{g:"who"}],groups:[{label:"最狠的話是給誰",key:"who",options:[{es:"mí.",zh:"我自己"},{es:"nadie más.",zh:"沒有別人"},{es:"quien más lo necesita entender.",zh:"最需要理解的那個人"}]}]}},
  {es:"Somos nueve. Somos distintos, por lo tanto, no necesitamos estar de acuerdo para estar juntos.",chunks:[{w:"Somos",role:"v"},{w:"nueve.",role:"o"},{w:"Somos",role:"v"},{w:"distintos,",role:"o"},{w:"por lo tanto,",role:"c"},{w:"no necesitamos estar de acuerdo",role:"v"},{w:"para estar juntos.",role:"o"}],zh:"我們有九個。我們各不相同，因此，不需要意見一致才能在一起。",en:"We are nine. We are different, therefore, we don't need to agree to be together.",noteZh:"por lo tanto = 因此（結果連接詞）；estar de acuerdo = 意見一致",noteEn:"'por lo tanto' = therefore (result connector); 'estar de acuerdo' = to agree",
  expand:{note:"no necesitamos ___. = 換不需要什麼",template:[{t:"Somos nueve. Somos distintos, por lo tanto, no necesitamos"},{g:"not_need"}],groups:[{label:"不需要什麼",key:"not_need",options:[{es:"estar de acuerdo para estar juntos.",zh:"意見一致才能在一起"},{es:"ser iguales para convivir.",zh:"一樣才能共處"},{es:"competir entre nosotros.",zh:"互相競爭"}]}]}}
]},

// ── E15 本心與閣樓 ──
{title:"El Corazón Verdadero",titleZh:"本心與閣樓",sentences:[
  {es:"El Corazón Verdadero es el lugar original, el más profundo.",chunks:[{w:"El Corazón Verdadero",role:"s"},{w:"es",role:"v"},{w:"el lugar original, el más profundo.",role:"o"}],zh:"本心是最原始的場域，最深的地方。",en:"The True Heart is the original place, the deepest place.",noteZh:"el más profundo = 最深的（最高級，形容詞放名詞後）",noteEn:"'el más profundo' = the deepest (superlative, adjective after noun)",
  expand:{note:"El Corazón Verdadero es ___. = 換是什麼樣的地方",template:[{t:"El Corazón Verdadero es"},{g:"desc"}],groups:[{label:"是什麼樣的地方",key:"desc",options:[{es:"el lugar original, el más profundo.",zh:"最原始、最深的地方"},{es:"el punto donde todo comienza.",zh:"一切開始的起點"},{es:"la raíz de quien eres.",zh:"你是誰的根源"}]}]}},
  {es:"El desván vive dentro del Corazón Verdadero.",chunks:[{w:"El desván",role:"s"},{w:"vive",role:"v"},{w:"dentro del Corazón Verdadero.",role:"o"}],zh:"閣樓住在本心裡。",en:"The attic lives within the True Heart.",noteZh:"dentro de = 在⋯之內",noteEn:"'dentro de' = inside/within",
  expand:{note:"___ vive dentro del Corazón Verdadero. = 換誰住在裡面",template:[{g:"who"},{t:"vive dentro del Corazón Verdadero."}],groups:[{label:"誰住在裡面",key:"who",options:[{es:"El desván",zh:"閣樓"},{es:"El Yo Pequeñito",zh:"小小自我"},{es:"Cada emoción pequeña",zh:"每個小情緒"}]}]}},
  {es:"Pero el Corazón fue herido el primero.",chunks:[{w:"Pero",role:"c"},{w:"el Corazón",role:"s"},{w:"fue herido",role:"v"},{w:"el primero.",role:"o"}],zh:"但本心是最早受傷的那個。",en:"But the Heart was wounded first.",noteZh:"fue herido = 被弄傷了（ser+過去分詞＝被動語態）",noteEn:"'fue herido' = was wounded (ser + past participle = passive voice)",
  expand:{note:"fue herido ___. = 換什麼時候受傷",template:[{t:"Pero el Corazón fue herido"},{g:"when"}],groups:[{label:"什麼時候受傷",key:"when",options:[{es:"el primero.",zh:"最早"},{es:"hace mucho tiempo.",zh:"很久以前"},{es:"sin darse cuenta.",zh:"在不知不覺間"}]}]}},
  {es:"En esa herida, apareció una esquina oscura.",chunks:[{w:"En esa herida,"},{w:"apareció",role:"v"},{w:"una esquina oscura.",role:"s"}],zh:"就在那道傷口裡，出現了一個陰暗的角落。",en:"In that wound, a dark corner appeared.",noteZh:"aparecer = 出現；oscura = 陰暗的（形容詞跟esquina陰性一致）",noteEn:"'aparecer' = to appear; 'oscura' = dark (agrees with feminine 'esquina')",
  expand:{note:"apareció ___. = 換出現了什麼",template:[{t:"En esa herida, apareció"},{g:"thing"}],groups:[{label:"出現了什麼",key:"thing",options:[{es:"una esquina oscura.",zh:"一個陰暗的角落"},{es:"un silencio pesado.",zh:"沉重的沉默"},{es:"una grieta pequeña.",zh:"一道小小的裂縫"}]}]}},
  {es:"Ahí se escondió el Yo Pequeñito, junto con las emociones pequeñas.",chunks:[{w:"Ahí"},{w:"se escondió",role:"v"},{w:"el Yo Pequeñito,",role:"s"},{w:"junto con las emociones pequeñas.",role:"o"}],zh:"小小自我就躲在那裡，跟小情緒們在一起。",en:"There Little Self hid, together with the little emotions.",noteZh:"se escondió = 躲了起來（反身動詞的過去式）；junto con = 跟⋯一起",noteEn:"'se escondió' = hid (reflexive, past tense); 'junto con' = together with",
  expand:{note:"se escondió ___, junto con las emociones pequeñas. = 換誰躲在那裡",template:[{t:"Ahí se escondió"},{g:"who"},{t:", junto con las emociones pequeñas."}],groups:[{label:"誰躲在那裡",key:"who",options:[{es:"el Yo Pequeñito",zh:"小小自我"},{es:"una parte de ella",zh:"她的一部分"},{es:"el recuerdo más frágil",zh:"最脆弱的那段記憶"}]}]}},
  {es:"Muy adentro del Corazón, Guardián vigila la puerta.",chunks:[{w:"Muy adentro del Corazón,"},{w:"Guardián",role:"s"},{w:"vigila",role:"v"},{w:"la puerta.",role:"o"}],zh:"在本心的最深處，憨憨守著那道門。",en:"Deep within the Heart, Guardián watches the door.",noteZh:"muy adentro de = 在⋯最深處",noteEn:"'muy adentro de' = deep within",
  expand:{note:"___ vigila la puerta. = 換誰在守門",template:[{t:"Muy adentro del Corazón,"},{g:"who"},{t:"vigila la puerta."}],groups:[{label:"誰在守門",key:"who",options:[{es:"Guardián",zh:"憨憨"},{es:"el silencio",zh:"寂靜"},{es:"una luz pequeña",zh:"一點小小的光"}]}]}},
  {es:"Fue Juicio quien hirió al Corazón desde afuera.",chunks:[{w:"Fue",role:"v"},{w:"Juicio",role:"s"},{w:"quien hirió al Corazón desde afuera.",role:"o"}],zh:"是錐心魘從外面弄傷了本心。",en:"It was Juicio who wounded the Heart from outside.",noteZh:"Fue X quien... = 就是X⋯的那個人（強調句型）",noteEn:"'Fue X quien...' = it was X who... (cleft sentence for emphasis)",
  expand:{note:"Fue ___ quien hirió al Corazón desde afuera. = 換是誰弄傷的",template:[{t:"Fue"},{g:"who"},{t:"quien hirió al Corazón desde afuera."}],groups:[{label:"是誰弄傷的",key:"who",options:[{es:"Juicio",zh:"錐心魘"},{es:"una palabra dura",zh:"一句狠話"},{es:"un momento de rechazo",zh:"一次被拒絕的時刻"}]}]}},
  {es:"Pero Esperanza fluye dentro del Corazón, buscando el camino.",chunks:[{w:"Pero",role:"c"},{w:"Esperanza",role:"s"},{w:"fluye",role:"v"},{w:"dentro del Corazón,",role:"o"},{w:"buscando el camino.",role:"o"}],zh:"但嬉汐在本心裡流動，一直在找路。",en:"But Esperanza flows within the Heart, searching for the way.",noteZh:"buscando el camino = 一邊找路（現在分詞表同時進行的動作）",noteEn:"'buscando el camino' = searching for the way (gerund for a simultaneous action)",
  expand:{note:"Pero ___ fluye dentro del Corazón. = 換誰在裡面流動",template:[{t:"Pero"},{g:"who"},{t:"fluye dentro del Corazón, buscando el camino."}],groups:[{label:"誰在裡面流動",key:"who",options:[{es:"Esperanza",zh:"嬉汐"},{es:"un poco de calma",zh:"一點點平靜"},{es:"la voluntad de seguir",zh:"繼續下去的意志"}]}]}},
  {es:"Ella es quien empuja al Yo Pequeñito a salir del desván.",chunks:[{w:"Ella",role:"s"},{w:"es",role:"v"},{w:"quien empuja al Yo Pequeñito a salir del desván.",role:"o"}],zh:"是她推著小小自我走出閣樓。",en:"She is the one who pushes Little Self to leave the attic.",noteZh:"empujar a alguien a + 原形動詞 = 推某人去做某事",noteEn:"'empujar a alguien a + infinitive' = to push someone to do something",
  expand:{note:"empuja al Yo Pequeñito a ___. = 換推他去做什麼",template:[{t:"Ella es quien empuja al Yo Pequeñito a"},{g:"action"}],groups:[{label:"推他去做什麼",key:"action",options:[{es:"salir del desván.",zh:"走出閣樓"},{es:"confiar de nuevo.",zh:"重新相信"},{es:"seguir caminando.",zh:"繼續往前走"}]}]}},
  {es:"Un día, el Corazón Verdadero volverá a estar completo.",chunks:[{w:"Un día,"},{w:"el Corazón Verdadero",role:"s"},{w:"volverá a estar",role:"v"},{w:"completo.",role:"o"}],zh:"有一天，本心會重新變得完整。",en:"One day, the True Heart will become whole again.",noteZh:"volverá a + 原形動詞 = 將會再次⋯（未來式；volver a表示「再次」）",noteEn:"'volverá a + infinitive' = will once again... (future tense; 'volver a' = to do again)",
  expand:{note:"volverá a estar ___. = 換會變回怎樣",template:[{t:"Un día, el Corazón Verdadero volverá a estar"},{g:"state"}],groups:[{label:"會變回怎樣",key:"state",options:[{es:"completo.",zh:"完整"},{es:"en paz.",zh:"平靜"},{es:"entero de nuevo.",zh:"再次完整如初"}]}]}}
]},

// ── E16 社交電量 ──
{title:"La Batería Social",titleZh:"社交電量",sentences:[
  {es:"Dentro de Cata vive una batería social invisible.",chunks:[{w:"Dentro de Cata"},{w:"vive",role:"v"},{w:"una batería social invisible.",role:"s"}],zh:"卡妲心裡住著一個看不見的社交電量表。",en:"Inside Cata lives an invisible social battery.",noteZh:"vivir也可以表達「存在於⋯裡」，不只是「住」",noteEn:"'vivir' can also mean 'to exist within', not just 'to live'",
  expand:{note:"Dentro de ___ vive una batería social invisible. = 換誰的心裡",template:[{t:"Dentro de"},{g:"who"},{t:"vive una batería social invisible."}],groups:[{label:"誰的心裡",key:"who",options:[{es:"Cata",zh:"卡妲"},{es:"cada persona",zh:"每個人"},{es:"Nita también",zh:"妮妲也是"}]}]}},
  {es:"Cuando está llena, ella puede reír, escuchar y estar con todos.",chunks:[{w:"Cuando",role:"c"},{w:"está llena,",role:"v"},{w:"ella",role:"s"},{w:"puede reír, escuchar y estar",role:"v"},{w:"con todos.",role:"o"}],zh:"電滿的時候，她可以笑、可以聽、可以陪伴每一個人。",en:"When it's full, she can laugh, listen, and be with everyone.",noteZh:"poder + 多個原形動詞 = 可以做好幾件事（動詞並列不用重複poder）",noteEn:"'poder' + multiple infinitives = can do several things (no need to repeat 'poder')",
  expand:{note:"ella puede ___. = 換可以做什麼",template:[{t:"Cuando está llena, ella puede"},{g:"can"}],groups:[{label:"可以做什麼",key:"can",options:[{es:"reír, escuchar y estar con todos.",zh:"笑、聽、陪伴每一個人"},{es:"dar sin cansarse.",zh:"不費力地付出"},{es:"disfrutar la compañía.",zh:"享受陪伴"}]}]}},
  {es:"Pero hablar, escuchar y fingir también gastan batería.",chunks:[{w:"Pero",role:"c"},{w:"hablar, escuchar y fingir",role:"s"},{w:"también"},{w:"gastan",role:"v"},{w:"batería.",role:"o"}],zh:"但說話、聆聽，甚至假裝也在耗電。",en:"But talking, listening, and pretending also drain the battery.",noteZh:"原形動詞可以當主詞：hablar（說話這件事）；gastar = 耗費、花費",noteEn:"infinitives can act as the subject: 'hablar' (the act of speaking); 'gastar' = to spend/drain",
  expand:{note:"Pero ___ también gastan batería. = 換什麼活動也耗電",template:[{t:"Pero"},{g:"activities"},{t:"también gastan batería."}],groups:[{label:"什麼活動也耗電",key:"activities",options:[{es:"hablar, escuchar y fingir",zh:"說話、聆聽、假裝"},{es:"sonreír todo el día",zh:"整天保持微笑"},{es:"estar en lugares ruidosos",zh:"待在吵鬧的地方"}]}]}},
  {es:"Cansancio es quien primero nota cuando la batería baja.",chunks:[{w:"Cansancio",role:"s"},{w:"es",role:"v"},{w:"quien primero nota cuando la batería baja.",role:"o"}],zh:"倦倦是第一個注意到電量下降的人。",en:"Cansancio is the first to notice when the battery drops.",noteZh:"quien primero nota... = 那個第一個注意到⋯的人（強調句型）",noteEn:"'quien primero nota...' = the one who first notices... (emphatic construction)",
  expand:{note:"nota cuando ___. = 換注意到什麼",template:[{t:"Cansancio es quien primero nota cuando"},{g:"what"}],groups:[{label:"注意到什麼",key:"what",options:[{es:"la batería baja.",zh:"電量下降"},{es:"algo ya no fluye.",zh:"有些什麼卡住了"},{es:"ella necesita parar.",zh:"她需要停下來"}]}]}},
  {es:'"Ya no puedo sonreír más," susurra Cansancio.',chunks:[{w:'"Ya no'},{w:"puedo sonreír",role:"v"},{w:'más,"'},{w:"susurra",role:"v"},{w:"Cansancio.",role:"s"}],zh:"「我沒辦法再多笑一次了」，倦倦小小聲說。",en:'"I can\'t smile anymore," Cansancio whispers.',noteZh:"ya no + 動詞 = 已經不再⋯",noteEn:"'ya no + verb' = not anymore...",
  expand:{note:'"Ya no puedo ___ más," susurra Cansancio. = 換沒辦法再做什麼',template:[{t:'"Ya no puedo'},{g:"cant"},{t:'más," susurra Cansancio.'}],groups:[{label:"沒辦法再做什麼",key:"cant",options:[{es:"sonreír",zh:"笑"},{es:"escuchar",zh:"聽"},{es:"fingir",zh:"假裝"}]}]}},
  {es:"Nadie ve la batería, por eso a veces la gente no entiende.",chunks:[{w:"Nadie",role:"s"},{w:"ve",role:"v"},{w:"la batería,",role:"o"},{w:"por eso",role:"c"},{w:"a veces"},{w:"la gente",role:"s"},{w:"no entiende.",role:"v"}],zh:"沒有人看得見這個電量表，所以有時候別人不理解。",en:"Nobody sees the battery, that's why people sometimes don't understand.",noteZh:"nadie = 沒有人（否定主詞不用再加no）",noteEn:"'nadie' = nobody (negative subject, no extra 'no' needed before the verb)",
  expand:{note:"a veces la gente ___. = 換別人會怎樣",template:[{t:"Nadie ve la batería, por eso a veces la gente"},{g:"result"}],groups:[{label:"別人會怎樣",key:"result",options:[{es:"no entiende.",zh:"不理解"},{es:"se confunde.",zh:"感到困惑"},{es:"piensa que está bien.",zh:"以為她沒事"}]}]}},
  {es:"No es que Cata no quiera estar contigo, es que necesita recargar.",chunks:[{w:"No es que",role:"v"},{w:"Cata",role:"s"},{w:"no quiera estar",role:"v"},{w:"contigo,",role:"o"},{w:"es que necesita recargar.",role:"v"}],zh:"不是卡妲不想陪你，是她需要充電。",en:"It's not that Cata doesn't want to be with you, she just needs to recharge.",noteZh:"No es que + 虛擬式 = 不是⋯（否定原因要用虛擬式）；es que = 而是",noteEn:"'No es que + subjunctive' = it's not that... (negated reason takes subjunctive); 'es que' = it's that/rather",
  expand:{note:"es que necesita ___. = 換她需要什麼",template:[{t:"No es que Cata no quiera estar contigo, es que necesita"},{g:"need"}],groups:[{label:"她需要什麼",key:"need",options:[{es:"recargar.",zh:"充電"},{es:"un momento a solas.",zh:"一刻獨處"},{es:"silencio.",zh:"安靜"}]}]}},
  {es:"Recargar no es egoísmo, es cuidar el Corazón Verdadero.",chunks:[{w:"Recargar",role:"s"},{w:"no es",role:"v"},{w:"egoísmo,",role:"o"},{w:"es",role:"v"},{w:"cuidar el Corazón Verdadero.",role:"o"}],zh:"充電不是自私，是在照顧本心。",en:"Recharging isn't selfish, it's taking care of the True Heart.",noteZh:"原形動詞當主詞：Recargar（充電這件事）；cuidar = 照顧",noteEn:"infinitive as subject: 'Recargar' (the act of recharging); 'cuidar' = to take care of",
  expand:{note:"Recargar no es egoísmo, es ___. = 換是在做什麼",template:[{t:"Recargar no es egoísmo, es"},{g:"is"}],groups:[{label:"是在做什麼",key:"is",options:[{es:"cuidar el Corazón Verdadero.",zh:"照顧本心"},{es:"protegerse a sí misma.",zh:"保護自己"},{es:"respetar sus límites.",zh:"尊重自己的界線"}]}]}},
  {es:"Un rincón silencioso, un poco de tiempo a solas: eso basta.",chunks:[{w:"Un rincón silencioso, un poco de tiempo a solas:"},{w:"eso",role:"s"},{w:"basta.",role:"v"}],zh:"一個安靜的角落，一點獨處的時間，這樣就夠了。",en:"A quiet corner, a little time alone: that's enough.",noteZh:"a solas = 獨自一人；bastar = 足夠（eso basta＝這樣就夠了）",noteEn:"'a solas' = alone; 'bastar' = to be enough ('eso basta' = that's enough)",
  expand:{note:"Un rincón silencioso, ___: eso basta. = 換還需要什麼",template:[{t:"Un rincón silencioso,"},{g:"what"},{t:": eso basta."}],groups:[{label:"還需要什麼",key:"what",options:[{es:"un poco de tiempo a solas",zh:"一點獨處的時間"},{es:"un vaso de agua",zh:"一杯水"},{es:"cinco minutos de silencio",zh:"五分鐘的安靜"}]}]}},
  {es:"Cuando la batería vuelve a subir, Cata regresa, más llena y más ella misma.",chunks:[{w:"Cuando",role:"c"},{w:"la batería",role:"s"},{w:"vuelve a subir,",role:"v"},{w:"Cata",role:"s"},{w:"regresa,",role:"v"},{w:"más llena y más ella misma.",role:"o"}],zh:"電量回升之後，卡妲會回來，更飽滿、更像她自己。",en:"When the battery rises again, Cata comes back, fuller and more herself.",noteZh:"vuelve a subir = 再次回升（volver a + 原形動詞）；ella misma = 她自己（強調代名詞）",noteEn:"'vuelve a subir' = rises again (volver a + infinitive); 'ella misma' = herself (emphatic pronoun)",
  expand:{note:"Cata regresa, ___. = 換變得怎樣",template:[{t:"Cuando la batería vuelve a subir, Cata regresa,"},{g:"how"}],groups:[{label:"變得怎樣",key:"how",options:[{es:"más llena y más ella misma.",zh:"更飽滿、更像她自己"},{es:"con más paciencia.",zh:"更有耐心"},{es:"lista para volver a dar.",zh:"準備好再次付出"}]}]}}
]}
];

// ── D-1 劇情生命週期分類（2026-07-20 盤查，純標記，不影響任何既有渲染/入口邏輯）──
// 目的：劇情跟能力卡一樣，不是每一集都該長成同一種東西。分類依據不是「有沒有掛文法卡」，
// 是每集實際在做的事（判斷方式：對照SENTENCE_GRAMMAR_MAP/SENTENCE_AMMO_MAP2連結狀況＋
// CLAUDE.md已記錄的各集創作意圖）。
// 🌾 abilityBuilding 能力培養劇情：整集圍繞一個具體文法/句型系統性教學，長能力
// 🧺 chunkInput     語塊輸入劇情：日常敘事、產出好用語塊，不綁單一文法能力，長語感
// 🌍 cultureImmersion 文化沉浸劇情：特輯型，補文化背景知識，長背景
// 💞 emotionalNarrative 情緒敘事劇情：核心目的是情緒/身份/關係的理解與陪伴，長連結
const EPISODE_LIFECYCLE = {
  abilityBuilding:   [0,1,2,6],           // E1 E2 E3 E7（皆有grammar+ammo完整連結，系統性教SER/ESTAR/gustar/未來式/命令句/TENER/HAY家族）
  chunkInput:        [3,4,5,13],          // E4 E5 E6 E14（日常敘事/連接詞複習，重點在產出語塊不在教單一能力，E14即使包裝成情緒角色，設計初衷是連接詞練習）
  cultureImmersion:  [10],                // E11（亡靈節特輯，明確以文化背景為主，porque/pero教學是附帶收穫）
  emotionalNarrative:[7,8,9,11,12,14,15]  // E8 E9 E10 E12 E13 E15 E16（迪多溝通方式/媽媽自我覺察/媽媽與迪多排程衝突/小小自我系列/社交電量，核心是情緒理解與陪伴）
};

// ── D-2 語塊生態盤查（2026-07-20，範圍：E11-E16共60句，純分類，不改SENTENCE_AMMO_MAP2、
// 不預設全部進彈藥庫、不建新的語用庫/文化庫系統，只回答「這句話屬於哪一種生態位置」）──
// 🧺 reusableChunk      適合反覆使用的生活語塊：值得考慮進彈藥庫（ammo.js）的候選
// 📖 episodeOnly        一次性劇情句：劇情/世界觀專用，留在episodes.js就好，不用另外收
// 💞 emotionalNarrative 情緒敘事句：核心是情緒/身份表達，未來若要做「語用庫」這類候選先看這裡
// 🌍 culturalInfo       文化資訊句：介紹文化背景知識，未來若要做「文化庫」這類候選先看這裡
const CHUNK_ECOLOGY = {
  reusableChunk: [112,113,119, 130,131,132,133,134,135,136,137,138, 154,156,158],
  episodeOnly: [102,103,104,106, 110,114,115,116,117,118, 120, 141,143,144,145,146,147,148, 150,153],
  emotionalNarrative: [105,108,109, 111, 121,122,123,124,125,126,127,128,129, 139, 140,142,149, 151,152,155,157,159],
  culturalInfo: [100,101,107]
};

