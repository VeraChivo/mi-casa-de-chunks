/* ── 語塊彈藥庫資料：S1 E1~E6，每句一張卡，共 60 張 ── */
const AMMO_DATA = [
  // ══════════ E1 · Charcos de Barro ══════════
  {
    ammo_id:"e1_01", ep:"E1 · Charcos de Barro",
    core_ammo:"Yo soy Gatita Nita.", core_zh:"我是小貓妮妲。",
    be_verb_type:"ser", be_verb_note:"Ser 用在身分本質：Yo soy = 我是（恆久不變的身分）",
    pattern:"Yo soy [身分/名字].", pattern_zh:"我是 ___。",
    pattern_note:"省略 Yo 直接說 Soy 也通，西語常省主詞", slots:["身分/名字"],
    fire_peppa:{es:"Yo soy Gatita Nita.", zh:"我是小貓妮妲。", ts:null,
      chunks:[{w:"(yo)",role:"s"},{w:"soy",role:"v",note:"ser ➔ 變位 soy ➔ 意思：我是（身分本質，「我」）"},{w:"Gatita Nita.",role:"o"}]},
    fire_daily:[
      {es:"Yo soy estudiante.", zh:"我是學生。", chunks:[{w:"(yo)",role:"s"},{w:"soy",role:"v"},{w:"estudiante.",role:"o"}]},
      {es:"Yo soy de Taiwán.", zh:"我是台灣人。", chunks:[{w:"(yo)",role:"s"},{w:"soy",role:"v"},{w:"de Taiwán.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e1_02", ep:"E1 · Charcos de Barro",
    core_ammo:"Este es mi hermano pequeño Tito.", core_zh:"這是我的小弟弟迪多。",
    be_verb_type:"ser", be_verb_note:"Ser 描述身分關係：Este es = 這是（介紹某人）",
    pattern:"Este es mi [關係] [名字].", pattern_zh:"這是我的 ___ ___。",
    pattern_note:"Este/Esta 跟著關係詞性別走", slots:["關係","名字"],
    fire_peppa:{es:"Este es mi hermano pequeño Tito.", zh:"這是我的小弟弟迪多。", ts:null,
      chunks:[{w:"Este",role:"s"},{w:"es",role:"v",note:"ser ➔ 變位 es ➔ 意思：是（介紹他人身分）"},{w:"mi hermano pequeño Tito.",role:"o"}]},
    fire_daily:[
      {es:"Esta es mi hermana mayor.", zh:"這是我姊姊。", chunks:[{w:"Esta",role:"s"},{w:"es",role:"v"},{w:"mi hermana mayor.",role:"o"}]},
      {es:"Este es mi amigo Carlos.", zh:"這是我朋友卡洛斯。", chunks:[{w:"Este",role:"s"},{w:"es",role:"v"},{w:"mi amigo Carlos.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e1_03", ep:"E1 · Charcos de Barro",
    core_ammo:"Hoy está lloviendo así que no pueden jugar fuera.", core_zh:"今天在下雨，所以不能去外面玩。",
    be_verb_type:"estar", be_verb_note:"Estar + -ando/-iendo = 正在做，描述正在發生的事",
    pattern:"Hoy está [動詞-ndo].", pattern_zh:"今天正在 ___。",
    pattern_note:"estar + -ing形態，暫時性動作", slots:["動詞-ndo"],
    fire_peppa:{es:"Hoy está lloviendo así que no pueden jugar fuera.", zh:"今天在下雨，所以不能去外面玩。", ts:null,
      chunks:[{w:"Hoy",hideYg:true},{w:"está lloviendo",role:"v",note:"estar ➔ está + llover ➔ lloviendo ➔ 意思：正在下雨（estar + -ing形態 = 進行式）"},{w:"así que",role:"c",hideYg:true},{w:"no pueden jugar fuera.",role:"v",note:"poder ➔ pueden（「他們」）+ no ➔ 意思：不能去玩"}]},
    fire_daily:[
      {es:"Hoy está nevando mucho.", zh:"今天下很大的雪。", chunks:[{w:"Hoy",hideYg:true},{w:"está nevando",role:"v"},{w:"mucho.",role:"c"}]},
      {es:"Ahora mismo está sonando el teléfono.", zh:"現在電話正在響。", chunks:[{w:"Ahora mismo"},{w:"está sonando",role:"v"},{w:"el teléfono.",role:"s"}]}
    ]
  },
  {
    ammo_id:"e1_04", ep:"E1 · Charcos de Barro",
    core_ammo:"¿Podemos salir a jugar?", core_zh:"我們可以出去玩嗎？",
    be_verb_type:"none", be_verb_note:"",
    pattern:"¿Podemos [原形動詞]?", pattern_zh:"我們可以 ___ 嗎？",
    pattern_note:"poder 「我們」，徵求許可", slots:["原形動詞"],
    fire_peppa:{es:"¿Podemos salir a jugar?", zh:"我們可以出去玩嗎？", ts:null,
      chunks:[{w:"(nosotros)",role:"s",hideYg:true},{w:"¿Podemos salir a jugar?",role:"v",note:"poder ➔ podemos（「我們」）➔ 意思：我們可以嗎？（徵求許可）"}]},
    fire_daily:[
      {es:"¿Podemos ver la tele?", zh:"我們可以看電視嗎？", chunks:[{w:"(nosotros)",role:"s"},{w:"¿Podemos ver la tele?",role:"v"}]},
      {es:"¿Podemos comer ahora?", zh:"我們現在可以吃了嗎？", chunks:[{w:"(nosotros)",role:"s"},{w:"¿Podemos comer ahora?",role:"v"}]}
    ]
  },
  {
    ammo_id:"e1_05", ep:"E1 · Charcos de Barro",
    core_ammo:"Nita, debes ponerte las botas de agua.", core_zh:"妮妲，你該穿上雨鞋。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"Debes [原形動詞] [受詞].", pattern_zh:"你必須 ___ ___。",
    pattern_note:"deber + 原形動詞 = 義務、必須做", slots:["原形動詞","受詞"],
    fire_peppa:{es:"Nita, debes ponerte las botas de agua.", zh:"妮妲，你該穿上雨鞋。", ts:null,
      chunks:[{w:"Nita,",hideYg:true},{w:"debes ponerte",role:"v",note:"deber ➔ debes（「你」）+ poner ➔ ponerte ➔ 意思：你必須穿上（deber + 原形 = 義務）"},{w:"las botas de agua.",role:"o"}]},
    fire_daily:[
      {es:"Debes hacer la tarea.", zh:"你該做功課。", chunks:[{w:"(tú)",role:"s"},{w:"Debes hacer",role:"v"},{w:"la tarea.",role:"o"}]},
      {es:"Debes lavarte las manos.", zh:"你該洗手。", chunks:[{w:"(tú)",role:"s"},{w:"Debes lavarte",role:"v"},{w:"las manos.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e1_06", ep:"E1 · Charcos de Barro",
    core_ammo:"¡Me encanta saltar en los charcos!", core_zh:"我超愛在水坑裡跳！",
    be_verb_type:"none", be_verb_note:"",
    pattern:"¡Me encanta [原形動詞]!", pattern_zh:"我超愛 ___！",
    pattern_note:"me encanta 比 me gusta 更強烈", slots:["原形動詞"],
    fire_peppa:{es:"¡Me encanta saltar en los charcos!", zh:"我超愛在水坑裡跳！", ts:null,
      chunks:[{w:"¡Me",role:"s",hideYg:true},{w:"encanta saltar en los charcos!",role:"v",note:"encantar ➔ encanta（「他/她」）➔ 意思：超愛（比 gustar 語氣更強，倒裝語序）"}]},
    fire_daily:[
      {es:"¡Me encanta bailar!", zh:"我超愛跳舞！", chunks:[{w:"¡Me",role:"s"},{w:"encanta bailar!",role:"v"}]},
      {es:"¡Me encanta comer helado!", zh:"我超愛吃冰淇淋！", chunks:[{w:"¡Me",role:"s"},{w:"encanta comer helado!",role:"v"}]}
    ]
  },
  {
    ammo_id:"e1_07", ep:"E1 · Charcos de Barro",
    core_ammo:"Nita ha encontrado un charco pequeño.", core_zh:"妮妲找到了一個小水坑。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人] ha encontrado [受詞].", pattern_zh:"___ 找到了 ___。",
    pattern_note:"ha + -ado/-ido形 = 已完成說法", slots:["人","受詞"],
    fire_peppa:{es:"Nita ha encontrado un charco pequeño.", zh:"妮妲找到了一個小水坑。", ts:null,
      chunks:[{w:"Nita",role:"s"},{w:"ha encontrado",role:"v",note:"encontrar ➔ encontrado（-ado/-ido形）+ haber ➔ ha ➔ 意思：找到了（已完成說法）"},{w:"un charco pequeño.",role:"o"}]},
    fire_daily:[
      {es:"Mamá ha encontrado las llaves.", zh:"媽媽找到鑰匙了。", chunks:[{w:"Mamá",role:"s"},{w:"ha encontrado",role:"v"},{w:"las llaves.",role:"o"}]},
      {es:"He encontrado mi libro.", zh:"我找到我的書了。", chunks:[{w:"(yo)",role:"s"},{w:"He encontrado",role:"v"},{w:"mi libro.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e1_08", ep:"E1 · Charcos de Barro",
    core_ammo:"¡Ese charco sí que es grande!", core_zh:"那個水坑真的好大！",
    be_verb_type:"ser", be_verb_note:"Ser 描述本質特徵：sí que es = 真的是（強調語氣）",
    pattern:"¡Ese [名詞] sí que es [形容詞]!", pattern_zh:"那個 ___ 真的好 ___！",
    pattern_note:"sí que = 加強語氣，真的、確實", slots:["名詞","形容詞"],
    fire_peppa:{es:"¡Ese charco sí que es grande!", zh:"那個水坑真的好大！", ts:null,
      chunks:[{w:"¡Ese charco",role:"s"},{w:"sí que es",role:"v",note:"ser ➔ es，加 sí que 強調語氣 ➔ 意思：真的好大（確實是…）"},{w:"grande!",role:"o"}]},
    fire_daily:[
      {es:"¡Esa casa sí que es grande!", zh:"那間房子真的好大！", chunks:[{w:"¡Esa casa",role:"s"},{w:"sí que es",role:"v"},{w:"grande!",role:"o"}]},
      {es:"¡Este pastel sí que es rico!", zh:"這個蛋糕真的好好吃！", chunks:[{w:"¡Este pastel",role:"s"},{w:"sí que es",role:"v"},{w:"rico!",role:"o"}]}
    ]
  },
  {
    ammo_id:"e1_09", ep:"E1 · Charcos de Barro",
    core_ammo:"No pasa nada. Sólo es barro.", core_zh:"沒關係，只是泥巴而已。",
    be_verb_type:"ser", be_verb_note:"Ser 描述本質：Sólo es = 只是（描述事物本質）",
    pattern:"No pasa nada. Sólo es [名詞].", pattern_zh:"沒關係，只是 ___ 而已。",
    pattern_note:"No pasa nada = 西語最常用的安慰語", slots:["名詞"],
    fire_peppa:{es:"No pasa nada. Sólo es barro.", zh:"沒關係，只是泥巴而已。", ts:null,
      chunks:[{w:"No pasa nada.",role:"v",note:"pasar ➔ pasa（「他/她」）+ no ➔ 意思：沒關係（西語最常用安慰語）"},{w:"Sólo es",role:"v",note:"ser ➔ es + sólo ➔ 意思：只是…而已（描述本質）"},{w:"barro.",role:"o"}]},
    fire_daily:[
      {es:"No pasa nada. Sólo es agua.", zh:"沒關係，只是水而已。", chunks:[{w:"No pasa nada.",role:"v"},{w:"Sólo es",role:"v"},{w:"agua.",role:"o"}]},
      {es:"No pasa nada. Sólo es un rasguño.", zh:"沒關係，只是擦傷而已。", chunks:[{w:"No pasa nada.",role:"v"},{w:"Sólo es",role:"v"},{w:"un rasguño.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e1_10", ep:"E1 · Charcos de Barro",
    core_ammo:"A todos les encanta saltar en los charcos de barro.", core_zh:"所有人都超愛在泥巴坑裡跳！",
    be_verb_type:"none", be_verb_note:"",
    pattern:"A todos les encanta [原形動詞].", pattern_zh:"所有人都超愛 ___。",
    pattern_note:"encanta 「他們」，les 取代 me", slots:["原形動詞"],
    fire_peppa:{es:"A todos les encanta saltar en los charcos de barro.", zh:"所有人都超愛在泥巴坑裡跳！", ts:null,
      chunks:[{w:"A todos les",role:"s",hideYg:true},{w:"encanta saltar en los charcos de barro.",role:"v",note:"encantar ➔ encanta（「他/她」）+ les（間接受詞（英文的 to him / to her / to them）代詞）➔ 意思：所有人都超愛（A+人+le/les encanta = 某人超愛）"}]},
    fire_daily:[
      {es:"A todos les encanta cantar.", zh:"所有人都超愛唱歌。", chunks:[{w:"A todos les",role:"s"},{w:"encanta cantar.",role:"v"}]},
      {es:"A todos les encanta el verano.", zh:"所有人都超愛夏天。", chunks:[{w:"A todos les",role:"s"},{w:"encanta el verano.",role:"v"}]}
    ]
  },

  // ══════════ E2 · El Señor Esqueleto Se Ha Perdido ══════════
  {
    ammo_id:"e2_01", ep:"E2 · El Señor Esqueleto Se Ha Perdido",
    core_ammo:"El juguete favorito de Tito es el señor Esqueleto.", core_zh:"迪多最喜歡的玩具是骷髏先生。",
    be_verb_type:"ser", be_verb_note:"Ser 描述身分本質：es = 是（介紹事物）",
    pattern:"El juguete favorito de [人] es [名詞].", pattern_zh:"___ 最喜歡的玩具是 ___。",
    pattern_note:"favorito 放在名詞後面，跟英文相反", slots:["人","名詞"],
    fire_peppa:{es:"El juguete favorito de Tito es el señor Esqueleto.", zh:"迪多最喜歡的玩具是骷髏先生。", ts:null,
      chunks:[{w:"El juguete favorito de Tito",role:"s"},{w:"es",role:"v",note:"ser ➔ es ➔ 意思：是（介紹事物身分，favorito 放在名詞後）"},{w:"el señor Esqueleto.",role:"o"}]},
    fire_daily:[
      {es:"Mi color favorito es el azul.", zh:"我最喜歡的顏色是藍色。", chunks:[{w:"Mi color favorito",role:"s"},{w:"es",role:"v"},{w:"el azul.",role:"o"}]},
      {es:"El libro favorito de mi hermana es Harry Potter.", zh:"我姊姊最喜歡的書是哈利波特。", chunks:[{w:"El libro favorito de mi hermana",role:"s"},{w:"es",role:"v"},{w:"Harry Potter.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e2_02", ep:"E2 · El Señor Esqueleto Se Ha Perdido",
    core_ammo:"Cuando Tito se va a la cama el señor Esqueleto se acurruca a su lado.", core_zh:"當迪多上床睡覺時，骷髏先生就蜷縮在他身旁。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"Cuando [人] se va a la cama...", pattern_zh:"當 ___ 上床睡覺時…",
    pattern_note:"se va a la cama = 去睡覺，自己對自己做的動詞片語", slots:["人"],
    fire_peppa:{es:"Cuando Tito se va a la cama el señor Esqueleto se acurruca a su lado.", zh:"當迪多上床睡覺時，骷髏先生就蜷縮在他身旁。", ts:null,
      chunks:[{w:"Cuando",role:"c",hideYg:true},{w:"Tito",role:"s"},{w:"se va a la cama",role:"v",note:"irse ➔ se va（自己對自己做的動詞）+ a la cama ➔ 意思：去睡覺（irse a = 去做某事）"},{w:"el señor Esqueleto",role:"s"},{w:"se acurruca",role:"v",note:"acurrucarse ➔ se acurruca ➔ 意思：蜷縮（自己對自己做的動詞，「他/她」）"},{w:"a su lado.",role:"o"}]},
    fire_daily:[
      {es:"Yo me voy a la cama a las nueve.", zh:"我九點去睡覺。", chunks:[{w:"Yo",role:"s"},{w:"me voy a la cama",role:"v"},{w:"a las nueve.",role:"o"}]},
      {es:"Cuando mamá se va a la cama, apaga la luz.", zh:"當媽媽上床睡覺時，她會關燈。", chunks:[{w:"Cuando",role:"c",hideYg:true},{w:"mamá",role:"s"},{w:"se va a la cama,",role:"v"},{w:"apaga",role:"v"},{w:"la luz.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e2_03", ep:"E2 · El Señor Esqueleto Se Ha Perdido",
    core_ammo:"Tito ha perdido al señor Esqueleto.", core_zh:"迪多把骷髏先生弄丟了。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人] ha perdido [受詞].", pattern_zh:"___ 把 ___ 弄丟了。",
    pattern_note:"ha perdido = 已經弄丟了（已完成說法）", slots:["人","受詞"],
    fire_peppa:{es:"Tito ha perdido al señor Esqueleto.", zh:"迪多把骷髏先生弄丟了。", ts:null,
      chunks:[{w:"Tito",role:"s"},{w:"ha perdido",role:"v",note:"perder ➔ perdido（-ado/-ido形）+ haber ➔ ha ➔ 意思：弄丟了（已完成說法）"},{w:"al señor Esqueleto.",role:"o"}]},
    fire_daily:[
      {es:"He perdido mi mochila.", zh:"我把我的書包弄丟了。", chunks:[{w:"(yo)",role:"s"},{w:"He perdido",role:"v"},{w:"mi mochila.",role:"o"}]},
      {es:"Papá ha perdido las llaves del coche.", zh:"爸爸把車鑰匙弄丟了。", chunks:[{w:"Papá",role:"s"},{w:"ha perdido",role:"v"},{w:"las llaves del coche.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e2_04", ep:"E2 · El Señor Esqueleto Se Ha Perdido",
    core_ammo:"No te preocupes Tito, entre todos lo encontraremos.", core_zh:"不要擔心迪多，我們大家一起會找到牠的。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"No te preocupes, [理由].", pattern_zh:"不要擔心，___。",
    pattern_note:"No te preocupes = 安慰別人的固定講法，意思是「別擔心」", slots:["理由"],
    fire_peppa:{es:"No te preocupes Tito, entre todos lo encontraremos.", zh:"不要擔心迪多，我們大家一起會找到牠的。", ts:null,
      chunks:[{w:"No te preocupes",role:"v",note:"preocuparse ➔ preocupes（自己對自己做的動詞，直接下指令否定）➔ 意思：不要擔心（西語安慰語）"},{w:"Tito,",hideYg:true},{w:"entre todos",role:"s",hideYg:true},{w:"lo encontraremos.",role:"v",note:"encontrar ➔ encontraremos（以後要做複數）➔ 意思：我們將會找到"}]},
    fire_daily:[
      {es:"No te preocupes por el examen.", zh:"不要為考試擔心。", chunks:[{w:"No te preocupes",role:"v"},{w:"por el examen.",role:"o"}]},
      {es:"No te preocupes, todo va a salir bien.", zh:"不要擔心，一切都會順利的。", chunks:[{w:"No te preocupes,",role:"v"},{w:"todo",role:"s"},{w:"va a salir bien.",role:"v"}]}
    ]
  },
  {
    ammo_id:"e2_05", ep:"E2 · El Señor Esqueleto Se Ha Perdido",
    core_ammo:"Un detective es una persona muy buena encontrando cosas.", core_zh:"偵探是一個非常擅長找東西的人。",
    be_verb_type:"ser", be_verb_note:"Ser 定義身分職業：detective es = 偵探是…（本質定義）",
    pattern:"Un [職業] es una persona muy buena [-ing形態].", pattern_zh:"___ 是一個非常擅長 ___ 的人。",
    pattern_note:"muy buena + -ing形態 = 非常擅長於做某事", slots:["職業","-ing形態"],
    fire_peppa:{es:"Un detective es una persona muy buena encontrando cosas.", zh:"偵探是一個非常擅長找東西的人。", ts:null,
      chunks:[{w:"Un detective",role:"s"},{w:"es",role:"v",note:"ser ➔ es ➔ 意思：是（職業定義用 ser）"},{w:"una persona muy buena encontrando cosas.",role:"o"}]},
    fire_daily:[
      {es:"Mi abuela es muy buena cocinando.", zh:"我奶奶非常擅長煮飯。", chunks:[{w:"Mi abuela",role:"s"},{w:"es muy buena cocinando.",role:"v"}]},
      {es:"Un profesor es una persona muy buena explicando cosas.", zh:"老師是一個非常擅長解釋事情的人。", chunks:[{w:"Un profesor",role:"s"},{w:"es",role:"v"},{w:"una persona muy buena explicando cosas.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e2_06", ep:"E2 · El Señor Esqueleto Se Ha Perdido",
    core_ammo:"Tito siempre se trae al señor Esqueleto a la bañera.", core_zh:"迪多總是帶著骷髏先生去洗澡。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人] siempre se trae [物] a [地點].", pattern_zh:"___ 總是帶著 ___ 去 ___。",
    pattern_note:"siempre 放在動詞前，表頻率", slots:["人","物","地點"],
    fire_peppa:{es:"Tito siempre se trae al señor Esqueleto a la bañera.", zh:"迪多總是帶著骷髏先生去洗澡。", ts:null,
      chunks:[{w:"Tito",role:"s"},{w:"siempre se trae",role:"v",note:"traerse ➔ se trae（自己對自己做的動詞）+ siempre（頻率副詞）➔ 意思：總是帶著去（siempre 放動詞前）"},{w:"al señor Esqueleto",role:"o"},{w:"a la bañera.",role:"o"}]},
    fire_daily:[
      {es:"Yo siempre me traigo un libro a la escuela.", zh:"我總是帶一本書去學校。", chunks:[{w:"Yo",role:"s"},{w:"siempre me traigo",role:"v"},{w:"un libro",role:"o"},{w:"a la escuela.",role:"o"}]},
      {es:"Vera siempre se trae su muñeca al parque.", zh:"薇拉總是帶她的娃娃去公園。", chunks:[{w:"Vera",role:"s"},{w:"siempre se trae",role:"v"},{w:"su muñeca",role:"o"},{w:"al parque.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e2_07", ep:"E2 · El Señor Esqueleto Se Ha Perdido",
    core_ammo:"¡Ya lo sé dónde está el señor Esqueleto!", core_zh:"我知道骷髏先生在哪裡了！",
    be_verb_type:"estar", be_verb_note:"Estar 表示位置：dónde está = 在哪裡（位置用 estar）",
    pattern:"¡Ya lo sé dónde está [名詞]!", pattern_zh:"我知道 ___ 在哪裡了！",
    pattern_note:"Ya lo sé = 我知道了，ya 表示已然發生", slots:["名詞"],
    fire_peppa:{es:"¡Ya lo sé dónde está el señor Esqueleto!", zh:"我知道骷髏先生在哪裡了！", ts:null,
      chunks:[{w:"(yo)",role:"s",hideYg:true},{w:"¡Ya lo sé",role:"v",note:"saber ➔ sé（「我」變化比較特別）+ ya ➔ 意思：我知道了（ya = 已然發生）"},{w:"dónde está",role:"c",note:"estar ➔ está ➔ 意思：在哪裡（位置/狀態用 estar，不用 ser）"},{w:"el señor Esqueleto!",role:"s"}]},
    fire_daily:[
      {es:"¡Ya lo sé dónde está mi mochila!", zh:"我知道我的書包在哪裡了！", chunks:[{w:"(yo)",role:"s"},{w:"¡Ya lo sé",role:"v"},{w:"dónde está",role:"c"},{w:"mi mochila!",role:"s"}]},
      {es:"¡Ya lo sé dónde está el gato!", zh:"我知道貓在哪裡了！", chunks:[{w:"(yo)",role:"s"},{w:"¡Ya lo sé",role:"v"},{w:"dónde está",role:"c"},{w:"el gato!",role:"s"}]}
    ]
  },
  {
    ammo_id:"e2_08", ep:"E2 · El Señor Esqueleto Se Ha Perdido",
    core_ammo:"El señor Esqueleto no está en la cama de Tito.", core_zh:"骷髏先生不在迪多的床上。",
    be_verb_type:"estar", be_verb_note:"Estar 表示位置：no está en = 不在（estar 管位置）",
    pattern:"[名詞] no está en [地點].", pattern_zh:"___ 不在 ___。",
    pattern_note:"口訣：SER = 本質身分；ESTAR = 位置狀態", slots:["名詞","地點"],
    fire_peppa:{es:"El señor Esqueleto no está en la cama de Tito.", zh:"骷髏先生不在迪多的床上。", ts:null,
      chunks:[{w:"El señor Esqueleto",role:"s"},{w:"no está",role:"v",note:"estar ➔ está（「他/她」）+ no ➔ 意思：不在（口訣：SER=本質，ESTAR=位置）"},{w:"en la cama de Tito.",role:"o"}]},
    fire_daily:[
      {es:"El gato no está en la cocina.", zh:"貓不在廚房。", chunks:[{w:"El gato",role:"s"},{w:"no está",role:"v"},{w:"en la cocina.",role:"o"}]},
      {es:"Mis llaves no están en la mesa.", zh:"我的鑰匙不在桌上。", chunks:[{w:"Mis llaves",role:"s"},{w:"no están",role:"v"},{w:"en la mesa.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e2_09", ep:"E2 · El Señor Esqueleto Se Ha Perdido",
    core_ammo:"Nita y Papá Tato están jugando a las damas.", core_zh:"妮妲和貓爸爸正在下西洋棋。",
    be_verb_type:"estar", be_verb_note:"Estar + -ando = 正在做，正在做某事",
    pattern:"[人] están jugando a [遊戲].", pattern_zh:"___ 正在玩 ___。",
    pattern_note:"están jugando = 正在做複數", slots:["人","遊戲"],
    fire_peppa:{es:"Nita y Papá Tato están jugando a las damas.", zh:"妮妲和貓爸爸正在下西洋棋。", ts:null,
      chunks:[{w:"Nita y Papá Tato",role:"s"},{w:"están jugando",role:"v",note:"jugar ➔ jugando + estar ➔ están ➔ 意思：正在玩（複數進行式，estar + -ing形態）"},{w:"a las damas.",role:"o"}]},
    fire_daily:[
      {es:"Los niños están jugando al fútbol.", zh:"孩子們正在踢足球。", chunks:[{w:"Los niños",role:"s"},{w:"están jugando",role:"v"},{w:"al fútbol.",role:"o"}]},
      {es:"Mi hermano y yo estamos jugando a las cartas.", zh:"我哥哥和我正在玩牌。", chunks:[{w:"Mi hermano y yo",role:"s"},{w:"estamos jugando",role:"v"},{w:"a las cartas.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e2_10", ep:"E2 · El Señor Esqueleto Se Ha Perdido",
    core_ammo:"¡Ya lo sé, habéis estado saltando en los charcos de barro!", core_zh:"我知道了，你們一直在泥巴坑裡跳！",
    be_verb_type:"estar", be_verb_note:"habéis estado + -ando = 一直做到現在，一直在做某事",
    pattern:"Habéis estado [動詞-ndo] en [地點].", pattern_zh:"你們一直在 ___ ___。",
    pattern_note:"habéis estado + -ing形態 = 完成進行式", slots:["動詞-ndo","地點"],
    fire_peppa:{es:"¡Ya lo sé, habéis estado saltando en los charcos de barro!", zh:"我知道了，你們一直在泥巴坑裡跳！", ts:null,
      chunks:[{w:"(yo)",role:"s",hideYg:true},{w:"¡Ya lo sé,",role:"v",note:"saber ➔ sé（變化比較特別）+ ya ➔ 意思：我知道了（強調已知）"},{w:"habéis estado saltando",role:"v",note:"saltar ➔ saltando + haber ➔ habéis + estar ➔ estado ➔ 意思：你們一直在跳（一直做到現在）"},{w:"en los charcos de barro!",role:"o"}]},
    fire_daily:[
      {es:"Habéis estado corriendo en el parque.", zh:"你們一直在公園裡跑步。", chunks:[{w:"(vosotros)",role:"s"},{w:"Habéis estado corriendo",role:"v"},{w:"en el parque.",role:"o"}]},
      {es:"Habéis estado cantando toda la tarde.", zh:"你們整個下午都在唱歌。", chunks:[{w:"(vosotros)",role:"s"},{w:"Habéis estado cantando",role:"v"},{w:"toda la tarde.",role:"o"}]}
    ]
  },

  // ══════════ E3 · La Mejor Amiga ══════════
  {
    ammo_id:"e3_01", ep:"E3 · La Mejor Amiga",
    core_ammo:"Nita está esperando a su mejor amiga, Vera Oveja.", core_zh:"妮妲正在等她最好的朋友薇拉羊。",
    be_verb_type:"estar", be_verb_note:"Estar + -ando = 正在做，正在等待",
    pattern:"[人] está esperando a [人2].", pattern_zh:"___ 正在等 ___。",
    pattern_note:"está esperando = 正在做", slots:["人","人2"],
    fire_peppa:{es:"Nita está esperando a su mejor amiga, Vera Oveja.", zh:"妮妲正在等她最好的朋友薇拉羊。", ts:null,
      chunks:[{w:"Nita",role:"s"},{w:"está esperando",role:"v",note:"esperar ➔ esperando + estar ➔ está ➔ 意思：正在等（進行式，-ing形態 -ando）"},{w:"a su mejor amiga, Vera Oveja.",role:"o"}]},
    fire_daily:[
      {es:"Mamá está esperando el autobús.", zh:"媽媽正在等公車。", chunks:[{w:"Mamá",role:"s"},{w:"está esperando",role:"v"},{w:"el autobús.",role:"o"}]},
      {es:"Estoy esperando a mi amigo en la puerta.", zh:"我正在門口等我朋友。", chunks:[{w:"(yo)",role:"s"},{w:"Estoy esperando",role:"v"},{w:"a mi amigo en la puerta.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e3_02", ep:"E3 · La Mejor Amiga",
    core_ammo:"Nita quiere mucho a Vera y Vera quiere mucho a Nita.", core_zh:"妮妲非常喜歡薇拉，薇拉也非常喜歡妮妲。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人1] quiere mucho a [人2].", pattern_zh:"___ 非常喜歡 ___。",
    pattern_note:"querer a alguien = 喜歡/愛某人，人名前必加 a", slots:["人1","人2"],
    fire_peppa:{es:"Nita quiere mucho a Vera y Vera quiere mucho a Nita.", zh:"妮妲非常喜歡薇拉，薇拉也非常喜歡妮妲。", ts:null,
      chunks:[{w:"Nita",role:"s"},{w:"quiere mucho",role:"v",note:"querer ➔ quiere（「他/她」）+ mucho（強調）➔ 意思：非常喜歡/愛（人名前必加 a）"},{w:"a Vera",role:"o"},{w:"y",role:"c",hideYg:true},{w:"Vera",role:"s"},{w:"quiere mucho",role:"v",note:"querer ➔ quiere（「他/她」）+ mucho（強調）➔ 意思：非常喜歡/愛（人名前必加 a）"},{w:"a Nita.",role:"o"}]},
    fire_daily:[
      {es:"Yo quiero mucho a mi familia.", zh:"我非常愛我的家人。", chunks:[{w:"Yo",role:"s"},{w:"quiero mucho",role:"v"},{w:"a mi familia.",role:"o"}]},
      {es:"Tito quiere mucho a su hermana.", zh:"迪多非常喜歡他姊姊。", chunks:[{w:"Tito",role:"s"},{w:"quiere mucho",role:"v"},{w:"a su hermana.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e3_03", ep:"E3 · La Mejor Amiga",
    core_ammo:"Son las mejores amigas.", core_zh:"她們是最好的朋友。",
    be_verb_type:"ser", be_verb_note:"Ser 描述本質關係：Son = 她們是（恆久身分關係）",
    pattern:"Son [形容詞最高級] [名詞複數].", pattern_zh:"她們是 ___ ___。",
    pattern_note:"mejores = mejor 的複數形", slots:["形容詞最高級","名詞複數"],
    fire_peppa:{es:"Son las mejores amigas.", zh:"她們是最好的朋友。", ts:null,
      chunks:[{w:"(ellas)",role:"s",hideYg:true},{w:"Son",role:"v",note:"ser ➔ son（「他們」）➔ 意思：她們是（複數身分關係）"},{w:"las mejores amigas.",role:"o"}]},
    fire_daily:[
      {es:"Somos buenos amigos.", zh:"我們是好朋友。", chunks:[{w:"(nosotros)",role:"s"},{w:"Somos",role:"v"},{w:"buenos amigos.",role:"o"}]},
      {es:"Son los mejores jugadores.", zh:"他們是最好的球員。", chunks:[{w:"(ellos)",role:"s"},{w:"Son",role:"v"},{w:"los mejores jugadores.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e3_04", ep:"E3 · La Mejor Amiga",
    core_ammo:"¡No Tito! Este juego es solo para niñas mayores.", core_zh:"不行迪多！這個遊戲只給大一點的女孩玩。",
    be_verb_type:"ser", be_verb_note:"Ser 描述本質規則：es solo para = 只是給…（規則限定）",
    pattern:"Este [名詞] es solo para [對象].", pattern_zh:"這個 ___ 只給 ___。",
    pattern_note:"solo para = 只給、只限", slots:["名詞","對象"],
    fire_peppa:{es:"¡No Tito! Este juego es solo para niñas mayores.", zh:"不行迪多！這個遊戲只給大一點的女孩玩。", ts:null,
      chunks:[{w:"¡No Tito!",hideYg:true},{w:"Este juego",role:"s"},{w:"es",role:"v",note:"ser ➔ es ➔ 意思：是（規則/本質用 ser，solo para = 只給）"},{w:"solo para niñas mayores.",role:"o"}]},
    fire_daily:[
      {es:"Esta silla es solo para mamá.", zh:"這張椅子只給媽媽坐。", chunks:[{w:"Esta silla",role:"s"},{w:"es",role:"v"},{w:"solo para mamá.",role:"o"}]},
      {es:"Este libro es solo para adultos.", zh:"這本書只給大人看。", chunks:[{w:"Este libro",role:"s"},{w:"es",role:"v"},{w:"solo para adultos.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e3_05", ep:"E3 · La Mejor Amiga",
    core_ammo:"¡Soy una princesa salida de un cuento!", core_zh:"我是從故事書裡走出來的公主！",
    be_verb_type:"ser", be_verb_note:"Ser 描述身分：Soy = 我是（角色扮演）",
    pattern:"¡Soy [角色] salida de [來源]!", pattern_zh:"我是從 ___ 走出來的 ___！",
    pattern_note:"salida de = 從…走出來的（a）", slots:["角色","來源"],
    fire_peppa:{es:"¡Soy una princesa salida de un cuento!", zh:"我是從故事書裡走出來的公主！", ts:null,
      chunks:[{w:"(yo)",role:"s",hideYg:true},{w:"¡Soy",role:"v",note:"ser ➔ soy（「我」）➔ 意思：我是（角色扮演身分，恆久本質用 ser）"},{w:"una princesa salida de un cuento!",role:"o"}]},
    fire_daily:[
      {es:"¡Soy un superhéroe!", zh:"我是超級英雄！", chunks:[{w:"(yo)",role:"s"},{w:"¡Soy",role:"v"},{w:"un superhéroe!",role:"o"}]},
      {es:"¡Soy una doctora muy buena!", zh:"我是非常厲害的醫生！", chunks:[{w:"(yo)",role:"s"},{w:"¡Soy",role:"v"},{w:"una doctora muy buena!",role:"o"}]}
    ]
  },
  {
    ammo_id:"e3_06", ep:"E3 · La Mejor Amiga",
    core_ammo:"A Tito no le gusta jugar solo.", core_zh:"迪多不喜歡一個人玩。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"A [人] no le gusta [原形動詞].", pattern_zh:"___ 不喜歡 ___。",
    pattern_note:"A + 人 + le gusta = 某人喜歡，西語必學句型", slots:["人","原形動詞"],
    fire_peppa:{es:"A Tito no le gusta jugar solo.", zh:"迪多不喜歡一個人玩。", ts:null,
      chunks:[{w:"A Tito",role:"s"},{w:"no le gusta",role:"v",note:"gustar ➔ gusta（「他/她」）+ le（間接受詞（英文的 to him / to her / to them））+ no ➔ 意思：不喜歡（倒裝：A+人+le gusta+動詞）"},{w:"jugar solo.",role:"o"}]},
    fire_daily:[
      {es:"A mí no me gusta el café.", zh:"我不喜歡咖啡。", chunks:[{w:"A mí",role:"s"},{w:"no me gusta",role:"v"},{w:"el café.",role:"o"}]},
      {es:"A Vera le gusta dibujar.", zh:"薇拉喜歡畫畫。", chunks:[{w:"A Vera",role:"s"},{w:"le gusta",role:"v"},{w:"dibujar.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e3_07", ep:"E3 · La Mejor Amiga",
    core_ammo:"Yo seré la doctora y tú serás la enfermera.", core_zh:"我來當醫生，你來當護士。",
    be_verb_type:"ser", be_verb_note:"Ser 以後要做：seré / serás，角色扮演的身分用 Ser",
    pattern:"Yo seré [身份A] y tú serás [身份B].", pattern_zh:"我當 ___，你當 ___。",
    pattern_note:"ser 以後要做：seré / serás / será", slots:["身份A","身份B"],
    fire_peppa:{es:"Yo seré la doctora y tú serás la enfermera.", zh:"我來當醫生，你來當護士。", ts:null,
      chunks:[{w:"Yo",role:"s"},{w:"seré",role:"v",note:"ser ➔ seré（以後要做「我」）➔ 意思：我將是/我來當（未來角色）"},{w:"la doctora",role:"o"},{w:"y",role:"c",hideYg:true},{w:"tú",role:"s"},{w:"serás",role:"v",note:"ser ➔ serás（以後要做「你」）➔ 意思：你將是/你來當"},{w:"la enfermera.",role:"o"}]},
    fire_daily:[
      {es:"Yo seré el chef y tú serás el cliente.", zh:"我來當主廚，你來當客人。", chunks:[{w:"Yo",role:"s"},{w:"seré",role:"v"},{w:"el chef",role:"o"},{w:"y",role:"c"},{w:"tú",role:"s"},{w:"serás",role:"v"},{w:"el cliente.",role:"o"}]},
      {es:"Tú serás la profesora y yo seré el alumno.", zh:"你來當老師，我來當學生。", chunks:[{w:"Tú",role:"s"},{w:"serás",role:"v"},{w:"la profesora",role:"o"},{w:"y",role:"c"},{w:"yo",role:"s"},{w:"seré",role:"v"},{w:"el alumno.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e3_08", ep:"E3 · La Mejor Amiga",
    core_ammo:"Ahora Tito, respira hondo. Después tose.", core_zh:"現在迪多，深呼吸。然後咳嗽。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人], respira hondo.", pattern_zh:"___，深呼吸。",
    pattern_note:"直接下指令直接用動詞「你」的動詞變化", slots:["人"],
    fire_peppa:{es:"Ahora Tito, respira hondo. Después tose.", zh:"現在迪多，深呼吸。然後咳嗽。", ts:null,
      chunks:[{w:"Ahora Tito,",hideYg:true},{w:"respira hondo.",role:"v",note:"respirar ➔ respira（直接下指令，「你」）➔ 意思：深呼吸（hondo = 深）"},{w:"Después",role:"c",hideYg:true},{w:"tose.",role:"v",note:"toser ➔ tose（直接下指令，「你」）➔ 意思：咳嗽（直接命令）"}]},
    fire_daily:[
      {es:"Abre la boca, por favor.", zh:"請張開嘴巴。", chunks:[{w:"(tú)",role:"s"},{w:"Abre",role:"v"},{w:"la boca, por favor.",role:"o"}]},
      {es:"Nita, respira hondo y cuenta hasta diez.", zh:"妮妲，深呼吸然後數到十。", chunks:[{w:"Nita,",hideYg:true},{w:"respira hondo",role:"v"},{w:"y cuenta hasta diez.",role:"v"}]}
    ]
  },
  {
    ammo_id:"e3_09", ep:"E3 · La Mejor Amiga",
    core_ammo:"Creo que tienes el corazón un poco flojo.", core_zh:"我覺得你的心臟有點虛弱。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"Creo que tienes [身體部位] un poco [形容詞].", pattern_zh:"我認為你的 ___ 有點 ___。",
    pattern_note:"Creo que = 我認為，後接完整子句", slots:["身體部位","形容詞"],
    fire_peppa:{es:"Creo que tienes el corazón un poco flojo.", zh:"我覺得你的心臟有點虛弱。", ts:null,
      chunks:[{w:"(yo)",role:"s",hideYg:true},{w:"Creo que",role:"v",note:"creer ➔ creo（「我」）+ que（連接子句）➔ 意思：我認為…（Creo que + 完整句）"},{w:"tienes",role:"v",note:"tener ➔ tienes（「你」）➔ 意思：你有（用於身體感覺：tienes fiebre = 你發燒了）"},{w:"el corazón un poco flojo.",role:"o"}]},
    fire_daily:[
      {es:"Creo que tienes fiebre.", zh:"我覺得你發燒了。", chunks:[{w:"(yo)",role:"s"},{w:"Creo que",role:"v"},{w:"tienes",role:"v"},{w:"fiebre.",role:"o"}]},
      {es:"Creo que tienes razón.", zh:"我覺得你說得對。", chunks:[{w:"(yo)",role:"s"},{w:"Creo que",role:"v"},{w:"tienes",role:"v"},{w:"razón.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e3_10", ep:"E3 · La Mejor Amiga",
    core_ammo:"Todos necesitan muchas galletas para curarse.", core_zh:"所有人都需要很多餅乾才能康復。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"Todos necesitan [名詞] para [原形動詞].", pattern_zh:"所有人都需要 ___ 才能 ___。",
    pattern_note:"para + 原形動詞 = 為了做某事", slots:["名詞","原形動詞"],
    fire_peppa:{es:"Todos necesitan muchas galletas para curarse.", zh:"所有人都需要很多餅乾才能康復。", ts:null,
      chunks:[{w:"Todos",role:"s"},{w:"necesitan",role:"v",note:"necesitar ➔ necesitan（「他們」）➔ 意思：需要（para + 原形動詞 = 為了做某事）"},{w:"muchas galletas para curarse.",role:"o"}]},
    fire_daily:[
      {es:"Necesitas agua para vivir.", zh:"你需要水才能生存。", chunks:[{w:"(tú)",role:"s"},{w:"Necesitas",role:"v"},{w:"agua para vivir.",role:"o"}]},
      {es:"Necesitamos tiempo para descansar.", zh:"我們需要時間休息。", chunks:[{w:"(nosotros)",role:"s"},{w:"Necesitamos",role:"v"},{w:"tiempo para descansar.",role:"o"}]}
    ]
  },

  // ══════════ E4 · La Nueva Hermanita ══════════
  {
    ammo_id:"e4_01", ep:"E4 · La Nueva Hermanita",
    core_ammo:"Mamá Cata ha tenido un bebé.", core_zh:"貓媽媽生了一個寶寶。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人] ha tenido un bebé.", pattern_zh:"___ 生了一個寶寶。",
    pattern_note:"ha + -ido形 = 現在完成（剛剛做完）", slots:["人"],
    fire_peppa:{es:"Mamá Cata ha tenido un bebé.", zh:"貓媽媽生了一個寶寶。", ts:null,
      chunks:[{w:"Mamá Cata",role:"s"},{w:"ha tenido",role:"v",note:"tener ➔ tenido（-ido形）+ haber ➔ ha ➔ 意思：剛剛生了（現在完成式，強調剛完成）"},{w:"un bebé.",role:"o"}]},
    fire_daily:[
      {es:"Mamá ha tenido un largo día.", zh:"媽媽度過了漫長的一天。", chunks:[{w:"Mamá",role:"s"},{w:"ha tenido",role:"v"},{w:"un largo día.",role:"o"}]},
      {es:"He tenido una buena idea.", zh:"我有了一個好主意。", chunks:[{w:"(yo)",role:"s"},{w:"He tenido",role:"v"},{w:"una buena idea.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e4_02", ep:"E4 · La Nueva Hermanita",
    core_ammo:"Se llama Mimi.", core_zh:"她叫做咪咪。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"Se llama [名字].", pattern_zh:"她／他叫做 ___。",
    pattern_note:"llamarse 反身動詞：se llama = 自稱，介紹名字必學", slots:["名字"],
    fire_peppa:{es:"Se llama Mimi.", zh:"她叫做咪咪。", ts:null,
      chunks:[{w:"(ella)",role:"s",hideYg:true},{w:"Se llama",role:"v",note:"llamarse ➔ se llama（「她」）➔ 意思：叫做（反身動詞，介紹名字固定句型）"},{w:"Mimi.",role:"o"}]},
    fire_daily:[
      {es:"Se llama Tito.", zh:"他叫做迪多。", chunks:[{w:"(él)",role:"s"},{w:"Se llama",role:"v"},{w:"Tito.",role:"o"}]},
      {es:"Me llamo Vera.", zh:"我叫做 Vera。", chunks:[{w:"(yo)",role:"s"},{w:"Me llamo",role:"v"},{w:"Vera.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e4_03", ep:"E4 · La Nueva Hermanita",
    core_ammo:"Nita y Tito tienen una hermana nueva.", core_zh:"妮妲和迪多有了一個新妹妹。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人] tienen [名詞].", pattern_zh:"___ 有 ___。",
    pattern_note:"tener 動詞「他們」= tienen，表示擁有", slots:["人","名詞"],
    fire_peppa:{es:"Nita y Tito tienen una hermana nueva.", zh:"妮妲和迪多有了一個新妹妹。", ts:null,
      chunks:[{w:"Nita y Tito",role:"s"},{w:"tienen",role:"v",note:"tener ➔ tienen（「他們」）➔ 意思：有（擁有，tener 是超高頻動詞）"},{w:"una hermana nueva.",role:"o"}]},
    fire_daily:[
      {es:"Tenemos una casa nueva.", zh:"我們有了一棟新房子。", chunks:[{w:"(nosotros)",role:"s"},{w:"Tenemos",role:"v"},{w:"una casa nueva.",role:"o"}]},
      {es:"Tienes una hermana mayor.", zh:"你有一個大姊姊。", chunks:[{w:"(tú)",role:"s"},{w:"Tienes",role:"v"},{w:"una hermana mayor.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e4_04", ep:"E4 · La Nueva Hermanita",
    core_ammo:"Mimi es muy pequeñita.", core_zh:"咪咪非常小小的。",
    be_verb_type:"ser", be_verb_note:"Ser 描述本質特徵：es muy pequeñita = 非常小（本質狀態）",
    pattern:"[人/物] es muy [形容詞-ita/ito].", pattern_zh:"___ 非常 ___。",
    pattern_note:"-ita/-ito 字尾 = 縮小可愛版，跟著名詞性別走", slots:["人/物","形容詞-ita/ito"],
    fire_peppa:{es:"Mimi es muy pequeñita.", zh:"咪咪非常小小的。", ts:null,
      chunks:[{w:"Mimi",role:"s"},{w:"es",role:"v",note:"ser ➔ es ➔ 意思：是（描述本質特徵，-ita 字尾是縮小可愛說法）"},{w:"muy pequeñita.",role:"o"}]},
    fire_daily:[
      {es:"El bebé es muy pequeñito.", zh:"寶寶非常小小的（男）。", chunks:[{w:"El bebé",role:"s"},{w:"es",role:"v"},{w:"muy pequeñito.",role:"o"}]},
      {es:"Esta flor es muy bonita.", zh:"這朵花非常漂亮。", chunks:[{w:"Esta flor",role:"s"},{w:"es",role:"v"},{w:"muy bonita.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e4_05", ep:"E4 · La Nueva Hermanita",
    core_ammo:"Tito quiere mucho a su hermanita.", core_zh:"迪多非常愛他的小妹妹。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人] quiere mucho a [受詞].", pattern_zh:"___ 非常愛 ___。",
    pattern_note:"querer mucho a = 非常愛某人，a 接人名是固定用法", slots:["人","受詞"],
    fire_peppa:{es:"Tito quiere mucho a su hermanita.", zh:"迪多非常愛他的小妹妹。", ts:null,
      chunks:[{w:"Tito",role:"s"},{w:"quiere mucho",role:"v",note:"querer ➔ quiere（「他」）+ mucho ➔ 意思：非常愛（querer mucho a + 人 = 超愛某人）"},{w:"a su hermanita.",role:"o"}]},
    fire_daily:[
      {es:"Nita quiere mucho a su mamá.", zh:"妮妲非常愛她的媽媽。", chunks:[{w:"Nita",role:"s"},{w:"quiere mucho",role:"v"},{w:"a su mamá.",role:"o"}]},
      {es:"Te quiero mucho.", zh:"我非常愛你。", chunks:[{w:"(yo)",role:"s"},{w:"Te quiero mucho.",role:"v"}]}
    ]
  },
  {
    ammo_id:"e4_06", ep:"E4 · La Nueva Hermanita",
    core_ammo:"Papá Tato está muy feliz.", core_zh:"貓爸爸非常開心。",
    be_verb_type:"estar", be_verb_note:"Estar + 形容詞 = 描述當下心情狀態（暫時的）",
    pattern:"[人] está muy [心情形容詞].", pattern_zh:"___ 非常 ___（心情）。",
    pattern_note:"estar 表示當下感受，心情用 estar，不用 ser", slots:["人","心情形容詞"],
    fire_peppa:{es:"Papá Tato está muy feliz.", zh:"貓爸爸非常開心。", ts:null,
      chunks:[{w:"Papá Tato",role:"s"},{w:"está",role:"v",note:"estar ➔ está（「他」）➔ 意思：（當下）感覺（estar 描述當下心情，feliz = 開心）"},{w:"muy feliz.",role:"o"}]},
    fire_daily:[
      {es:"Mamá está muy cansada.", zh:"媽媽非常累。", chunks:[{w:"Mamá",role:"s"},{w:"está",role:"v"},{w:"muy cansada.",role:"o"}]},
      {es:"Estoy muy contento.", zh:"我非常高興。", chunks:[{w:"(yo)",role:"s"},{w:"Estoy",role:"v"},{w:"muy contento.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e4_07", ep:"E4 · La Nueva Hermanita",
    core_ammo:"Toda la familia está esperando a Mimi.", core_zh:"全家人都在等咪咪。",
    be_verb_type:"estar", be_verb_note:"Estar + -ando/-iendo = 正在做（進行式）",
    pattern:"[人] está esperando a [受詞].", pattern_zh:"___ 正在等 ___。",
    pattern_note:"estar + -ando = 正在進行，esperar a + 人 = 等待某人", slots:["人","受詞"],
    fire_peppa:{es:"Toda la familia está esperando a Mimi.", zh:"全家人都在等咪咪。", ts:null,
      chunks:[{w:"Toda la familia",role:"s"},{w:"está esperando",role:"v",note:"estar ➔ está + esperar ➔ esperando ➔ 意思：正在等（進行式 = estar + -ando）"},{w:"a Mimi.",role:"o"}]},
    fire_daily:[
      {es:"Estoy esperando el autobús.", zh:"我正在等公車。", chunks:[{w:"(yo)",role:"s"},{w:"Estoy esperando",role:"v"},{w:"el autobús.",role:"o"}]},
      {es:"Mamá está esperando en casa.", zh:"媽媽正在家裡等。", chunks:[{w:"Mamá",role:"s"},{w:"está esperando",role:"v"},{w:"en casa.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e4_08", ep:"E4 · La Nueva Hermanita",
    core_ammo:"¡Nita ya es una hermana mayor!", core_zh:"妮妲已經是大姊姊了！",
    be_verb_type:"ser", be_verb_note:"Ser 描述身分：ya es = 已經是了（ya 強調狀態改變）",
    pattern:"¡[人] ya es [身分]!", pattern_zh:"___ 已經是 ___ 了！",
    pattern_note:"ya = 已經，強調狀態剛改變，特別有臨場感", slots:["人","身分"],
    fire_peppa:{es:"¡Nita ya es una hermana mayor!", zh:"妮妲已經是大姊姊了！", ts:null,
      chunks:[{w:"¡Nita",role:"s"},{w:"ya es",role:"v",note:"ser ➔ es + ya ➔ 意思：已經是了（ya 強調剛剛發生的改變，臨場感超強）"},{w:"una hermana mayor!",role:"o"}]},
    fire_daily:[
      {es:"¡Ya es hora de comer!", zh:"已經到吃飯時間了！", chunks:[{w:"¡Ya es",role:"v"},{w:"hora de comer!",role:"o"}]},
      {es:"Tito ya es muy grande.", zh:"迪多已經很大了。", chunks:[{w:"Tito",role:"s"},{w:"ya es",role:"v"},{w:"muy grande.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e4_09", ep:"E4 · La Nueva Hermanita",
    core_ammo:"Vamos a cuidar a Mimi juntos.", core_zh:"我們要一起照顧咪咪。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"Vamos a [原形動詞] juntos.", pattern_zh:"我們要一起 ___。",
    pattern_note:"Vamos a + 原形動詞 = 我們要做…，juntos 加強「一起」的感覺", slots:["原形動詞"],
    fire_peppa:{es:"Vamos a cuidar a Mimi juntos.", zh:"我們要一起照顧咪咪。", ts:null,
      chunks:[{w:"(nosotros)",role:"s",hideYg:true},{w:"Vamos a cuidar",role:"v",note:"ir ➔ vamos（「我們」）+ a + cuidar ➔ 意思：我們要照顧（vamos a + 原形 = 近未來要做某事）"},{w:"a Mimi juntos.",role:"o"}]},
    fire_daily:[
      {es:"Vamos a jugar juntos.", zh:"我們要一起玩。", chunks:[{w:"(nosotros)",role:"s"},{w:"Vamos a jugar juntos.",role:"v"}]},
      {es:"Vamos a cantar juntos.", zh:"我們要一起唱歌。", chunks:[{w:"(nosotros)",role:"s"},{w:"Vamos a cantar juntos.",role:"v"}]}
    ]
  },
  {
    ammo_id:"e4_10", ep:"E4 · La Nueva Hermanita",
    core_ammo:"¡Bienvenida a la familia, Mimi!", core_zh:"歡迎來到這個家，咪咪！",
    be_verb_type:"none", be_verb_note:"",
    pattern:"¡Bienvenida/o a [地方], [名字]!", pattern_zh:"歡迎來到 ___，___！",
    pattern_note:"Bienvenida（女）/ Bienvenido（男）跟歡迎對象的性別走", slots:["地方","名字"],
    fire_peppa:{es:"¡Bienvenida a la familia, Mimi!", zh:"歡迎來到這個家，咪咪！", ts:null,
      chunks:[{w:"¡Bienvenida",role:"v",note:"bienvenida（陰性）/ bienvenido（陽性）跟著歡迎對象的性別走"},{w:"a la familia, Mimi!",role:"o"}]},
    fire_daily:[
      {es:"¡Bienvenido a casa, papá!", zh:"歡迎回家，爸爸！", chunks:[{w:"¡Bienvenido",role:"v"},{w:"a casa, papá!",role:"o"}]},
      {es:"¡Bienvenidos al equipo!", zh:"歡迎加入團隊！", chunks:[{w:"¡Bienvenidos",role:"v"},{w:"al equipo!",role:"o"}]}
    ]
  },

  // ══════════ E5 · Cuidando a Mimi ══════════
  {
    ammo_id:"e5_01", ep:"E5 · Cuidando a Mimi",
    core_ammo:"Mimi llora mucho por la noche.", core_zh:"咪咪晚上常常哭。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人] llora mucho [時間].", pattern_zh:"___ 常常在 ___ 哭。",
    pattern_note:"llorar = 哭，llora 是「她/他」，mucho 加強頻率", slots:["人","時間"],
    fire_peppa:{es:"Mimi llora mucho por la noche.", zh:"咪咪晚上常常哭。", ts:null,
      chunks:[{w:"Mimi",role:"s"},{w:"llora mucho",role:"v",note:"llorar ➔ llora（「她」）➔ 意思：哭（mucho = 很多，表示頻率）"},{w:"por la noche.",role:"o"}]},
    fire_daily:[
      {es:"El bebé llora mucho por la mañana.", zh:"寶寶早上常常哭。", chunks:[{w:"El bebé",role:"s"},{w:"llora mucho",role:"v"},{w:"por la mañana.",role:"o"}]},
      {es:"Lloro mucho cuando estoy triste.", zh:"我悲傷的時候常常哭。", chunks:[{w:"(yo)",role:"s"},{w:"Lloro mucho",role:"v"},{w:"cuando estoy triste.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e5_02", ep:"E5 · Cuidando a Mimi",
    core_ammo:"Mamá Cata le da de comer a Mimi.", core_zh:"貓媽媽餵咪咪吃東西。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人] le da de comer a [受詞].", pattern_zh:"___ 餵 ___ 吃東西。",
    pattern_note:"le da de comer a + 人 = 餵某人，固定搭配直接整句記", slots:["人","受詞"],
    fire_peppa:{es:"Mamá Cata le da de comer a Mimi.", zh:"貓媽媽餵咪咪吃東西。", ts:null,
      chunks:[{w:"Mamá Cata",role:"s"},{w:"le da de comer",role:"v",note:"dar de comer a = 餵吃（固定搭配）+ le = 給她（間接受詞代詞）"},{w:"a Mimi.",role:"o"}]},
    fire_daily:[
      {es:"Papá le da de comer al gato.", zh:"爸爸餵貓吃東西。", chunks:[{w:"Papá",role:"s"},{w:"le da de comer",role:"v"},{w:"al gato.",role:"o"}]},
      {es:"Le doy de comer al pez.", zh:"我餵魚吃東西。", chunks:[{w:"(yo)",role:"s"},{w:"Le doy de comer",role:"v"},{w:"al pez.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e5_03", ep:"E5 · Cuidando a Mimi",
    core_ammo:"Papá Tato cambia el pañal de Mimi.", core_zh:"貓爸爸幫咪咪換尿布。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人] cambia el pañal de [受詞].", pattern_zh:"___ 幫 ___ 換尿布。",
    pattern_note:"cambiar = 換，cambia 是「他/她」，超實用育兒詞彙", slots:["人","受詞"],
    fire_peppa:{es:"Papá Tato cambia el pañal de Mimi.", zh:"貓爸爸幫咪咪換尿布。", ts:null,
      chunks:[{w:"Papá Tato",role:"s"},{w:"cambia",role:"v",note:"cambiar ➔ cambia（「他」）➔ 意思：換（cambiar = 換，用途超廣）"},{w:"el pañal de Mimi.",role:"o"}]},
    fire_daily:[
      {es:"Cambia la ropa del bebé.", zh:"幫寶寶換衣服。", chunks:[{w:"(tú)",role:"s",hideYg:true},{w:"Cambia",role:"v"},{w:"la ropa del bebé.",role:"o"}]},
      {es:"Mamá cambia las sábanas.", zh:"媽媽換床單。", chunks:[{w:"Mamá",role:"s"},{w:"cambia",role:"v"},{w:"las sábanas.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e5_04", ep:"E5 · Cuidando a Mimi",
    core_ammo:"Nita canta una canción para Mimi.", core_zh:"妮妲唱一首歌給咪咪聽。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人] canta [受詞] para [受詞].", pattern_zh:"___ 唱 ___ 給 ___ 聽。",
    pattern_note:"para = 為了，cantar = 唱歌，canta 是「她/他」", slots:["人","受詞","受詞"],
    fire_peppa:{es:"Nita canta una canción para Mimi.", zh:"妮妲唱一首歌給咪咪聽。", ts:null,
      chunks:[{w:"Nita",role:"s"},{w:"canta",role:"v",note:"cantar ➔ canta（「她」）➔ 意思：唱歌（para = 為了，給某人）"},{w:"una canción para Mimi.",role:"o"}]},
    fire_daily:[
      {es:"Papá canta una canción para el bebé.", zh:"爸爸唱一首歌給寶寶聽。", chunks:[{w:"Papá",role:"s"},{w:"canta",role:"v"},{w:"una canción para el bebé.",role:"o"}]},
      {es:"Canto una canción para ti.", zh:"我唱一首歌給你聽。", chunks:[{w:"(yo)",role:"s"},{w:"Canto",role:"v"},{w:"una canción para ti.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e5_05", ep:"E5 · Cuidando a Mimi",
    core_ammo:"Tito le enseña su esqueleto a Mimi.", core_zh:"迪多給咪咪看他的骷髏。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人] le enseña [受詞] a [受詞].", pattern_zh:"___ 給 ___ 看 ___。",
    pattern_note:"enseñar = 展示/給看，le = 間接受詞代詞（給她/他）", slots:["人","受詞","受詞"],
    fire_peppa:{es:"Tito le enseña su esqueleto a Mimi.", zh:"迪多給咪咪看他的骷髏。", ts:null,
      chunks:[{w:"Tito",role:"s"},{w:"le enseña",role:"v",note:"enseñar ➔ enseña（「他」）+ le = 間接受詞代詞 ➔ 意思：給她看（enseñar a = 展示給某人）"},{w:"su esqueleto a Mimi.",role:"o"}]},
    fire_daily:[
      {es:"Le enseño mi foto a mamá.", zh:"我給媽媽看我的照片。", chunks:[{w:"(yo)",role:"s"},{w:"Le enseño",role:"v"},{w:"mi foto a mamá.",role:"o"}]},
      {es:"Nita le enseña su libro a Tito.", zh:"妮妲給迪多看她的書。", chunks:[{w:"Nita",role:"s"},{w:"le enseña",role:"v"},{w:"su libro a Tito.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e5_06", ep:"E5 · Cuidando a Mimi",
    core_ammo:"Mimi duerme en su cuna.", core_zh:"咪咪睡在她的搖籃裡。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人] duerme en [地方].", pattern_zh:"___ 睡在 ___。",
    pattern_note:"dormir = 睡覺，duerme 是「她/他」，en = 在（位置）", slots:["人","地方"],
    fire_peppa:{es:"Mimi duerme en su cuna.", zh:"咪咪睡在她的搖籃裡。", ts:null,
      chunks:[{w:"Mimi",role:"s"},{w:"duerme",role:"v",note:"dormir ➔ duerme（「她」）➔ 意思：睡覺（-ue- 母音交換是西語常見現象）"},{w:"en su cuna.",role:"o"}]},
    fire_daily:[
      {es:"Tito duerme en su cama.", zh:"迪多睡在他的床上。", chunks:[{w:"Tito",role:"s"},{w:"duerme",role:"v"},{w:"en su cama.",role:"o"}]},
      {es:"El gato duerme en el sofá.", zh:"貓咪睡在沙發上。", chunks:[{w:"El gato",role:"s"},{w:"duerme",role:"v"},{w:"en el sofá.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e5_07", ep:"E5 · Cuidando a Mimi",
    core_ammo:"Toda la familia ayuda a cuidar a Mimi.", core_zh:"全家人都幫忙照顧咪咪。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人] ayuda a [原形動詞].", pattern_zh:"___ 幫忙 ___。",
    pattern_note:"ayudar a + 原形動詞 = 幫忙做某事，超實用句型", slots:["人","原形動詞"],
    fire_peppa:{es:"Toda la familia ayuda a cuidar a Mimi.", zh:"全家人都幫忙照顧咪咪。", ts:null,
      chunks:[{w:"Toda la familia",role:"s"},{w:"ayuda a cuidar",role:"v",note:"ayudar ➔ ayuda（「她/他」）+ a + cuidar ➔ 意思：幫忙照顧（ayudar a + 原形 = 幫忙做某事）"},{w:"a Mimi.",role:"o"}]},
    fire_daily:[
      {es:"Nita ayuda a poner la mesa.", zh:"妮妲幫忙擺餐桌。", chunks:[{w:"Nita",role:"s"},{w:"ayuda a poner",role:"v"},{w:"la mesa.",role:"o"}]},
      {es:"Te ayudo a limpiar.", zh:"我幫你打掃。", chunks:[{w:"(yo)",role:"s"},{w:"Te ayudo a limpiar.",role:"v"}]}
    ]
  },
  {
    ammo_id:"e5_08", ep:"E5 · Cuidando a Mimi",
    core_ammo:"Mimi sonríe por primera vez.", core_zh:"咪咪第一次微笑了。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人] [動詞] por primera vez.", pattern_zh:"___ 第一次 ___了。",
    pattern_note:"por primera vez = 第一次做某事，超有情感的固定搭配", slots:["人","動詞"],
    fire_peppa:{es:"Mimi sonríe por primera vez.", zh:"咪咪第一次微笑了。", ts:null,
      chunks:[{w:"Mimi",role:"s"},{w:"sonríe",role:"v",note:"sonreír ➔ sonríe（「她」）➔ 意思：微笑（-íe- 母音交換，情感色彩很強的詞）"},{w:"por primera vez.",role:"o"}]},
    fire_daily:[
      {es:"Tito camina por primera vez.", zh:"迪多第一次走路了。", chunks:[{w:"Tito",role:"s"},{w:"camina",role:"v"},{w:"por primera vez.",role:"o"}]},
      {es:"Hablo español por primera vez.", zh:"我第一次說西班牙語了。", chunks:[{w:"(yo)",role:"s"},{w:"Hablo español",role:"v"},{w:"por primera vez.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e5_09", ep:"E5 · Cuidando a Mimi",
    core_ammo:"Nita está muy orgullosa de ser hermana mayor.", core_zh:"妮妲非常自豪能當大姊姊。",
    be_verb_type:"estar", be_verb_note:"Estar + 形容詞 = 描述當下的情緒狀態",
    pattern:"[人] está muy orgullosa/o de [原形動詞].", pattern_zh:"___ 非常自豪能 ___。",
    pattern_note:"orgullosa（女）/ orgulloso（男）跟著主詞性別走", slots:["人","原形動詞"],
    fire_peppa:{es:"Nita está muy orgullosa de ser hermana mayor.", zh:"妮妲非常自豪能當大姊姊。", ts:null,
      chunks:[{w:"Nita",role:"s"},{w:"está muy orgullosa",role:"v",note:"estar ➔ está + orgullosa（陰性形容詞）➔ 意思：非常自豪（estar 描述當下情感，orgullosa 跟著女性主詞走）"},{w:"de ser hermana mayor.",role:"o"}]},
    fire_daily:[
      {es:"Estoy muy orgullosa de ti.", zh:"我非常為你驕傲。", chunks:[{w:"(yo)",role:"s"},{w:"Estoy muy orgullosa",role:"v"},{w:"de ti.",role:"o"}]},
      {es:"Papá está muy orgulloso de Tito.", zh:"爸爸非常以迪多為傲。", chunks:[{w:"Papá",role:"s"},{w:"está muy orgulloso",role:"v"},{w:"de Tito.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e5_10", ep:"E5 · Cuidando a Mimi",
    core_ammo:"¡Cuidar a un bebé es mucho trabajo!", core_zh:"照顧寶寶真的是很多工作！",
    be_verb_type:"ser", be_verb_note:"Ser 描述本質：es mucho trabajo = 是很多工作（本質說法）",
    pattern:"¡[原形動詞] es mucho trabajo!", pattern_zh:"___ 真的是很多工作！",
    pattern_note:"原形動詞當主詞 + es = 某件事是…，很帥的句型", slots:["原形動詞"],
    fire_peppa:{es:"¡Cuidar a un bebé es mucho trabajo!", zh:"照顧寶寶真的是很多工作！", ts:null,
      chunks:[{w:"¡Cuidar a un bebé",role:"s"},{w:"es",role:"v",note:"ser ➔ es ➔ 意思：是（原形動詞當主詞 = 「做這件事」是…，等於英文 'to do something is…'）"},{w:"mucho trabajo!",role:"o"}]},
    fire_daily:[
      {es:"¡Cocinar todos los días es mucho trabajo!", zh:"每天煮飯真的是很多工作！", chunks:[{w:"¡Cocinar todos los días",role:"s"},{w:"es",role:"v"},{w:"mucho trabajo!",role:"o"}]},
      {es:"¡Aprender español es interesante!", zh:"學西班牙語真的很有趣！", chunks:[{w:"¡Aprender español",role:"s"},{w:"es",role:"v"},{w:"interesante!",role:"o"}]}
    ]
  },

  // ══════════ E6 · Cosas Ricas para Comer ══════════
  {
    ammo_id:"e6_01", ep:"E6 · Cosas Ricas para Comer",
    core_ammo:"A Nita le encanta el helado de chocolate.", core_zh:"妮妲超愛巧克力冰淇淋。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"A [人] le encanta [名詞].", pattern_zh:"___ 超愛 ___。",
    pattern_note:"A + 人 + le encanta + 名詞 = 某人超愛某東西，倒裝語序記整句", slots:["人","名詞"],
    fire_peppa:{es:"A Nita le encanta el helado de chocolate.", zh:"妮妲超愛巧克力冰淇淋。", ts:null,
      chunks:[{w:"A Nita",role:"s"},{w:"le encanta",role:"v",note:"encantar ➔ encanta（「它」）+ le = 給她 ➔ 意思：她超愛（A + 人 + le encanta = 某人超愛某物，比 gustar 更強烈）"},{w:"el helado de chocolate.",role:"o"}]},
    fire_daily:[
      {es:"A Tito le encanta el esqueleto.", zh:"迪多超愛骷髏。", chunks:[{w:"A Tito",role:"s"},{w:"le encanta",role:"v"},{w:"el esqueleto.",role:"o"}]},
      {es:"A mí me encanta el helado.", zh:"我超愛冰淇淋。", chunks:[{w:"A mí",role:"s"},{w:"me encanta",role:"v"},{w:"el helado.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e6_02", ep:"E6 · Cosas Ricas para Comer",
    core_ammo:"Tito come muchas manzanas.", core_zh:"迪多吃很多蘋果。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人] come muchas/muchos [食物（複數）].", pattern_zh:"___ 吃很多 ___。",
    pattern_note:"comer = 吃，come 是「她/他」；muchas（陰性複數）/ muchos（陽性複數）", slots:["人","食物（複數）"],
    fire_peppa:{es:"Tito come muchas manzanas.", zh:"迪多吃很多蘋果。", ts:null,
      chunks:[{w:"Tito",role:"s"},{w:"come",role:"v",note:"comer ➔ come（「他」）➔ 意思：吃（超基礎動詞，muchas 搭陰性複數名詞）"},{w:"muchas manzanas.",role:"o"}]},
    fire_daily:[
      {es:"Nita come muchas galletas.", zh:"妮妲吃很多餅乾。", chunks:[{w:"Nita",role:"s"},{w:"come",role:"v"},{w:"muchas galletas.",role:"o"}]},
      {es:"Como muchas frutas.", zh:"我吃很多水果。", chunks:[{w:"(yo)",role:"s"},{w:"Como",role:"v"},{w:"muchas frutas.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e6_03", ep:"E6 · Cosas Ricas para Comer",
    core_ammo:"Mamá Cata hace un pastel de fresa.", core_zh:"貓媽媽做草莓蛋糕。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人] hace un pastel de [口味].", pattern_zh:"___ 做 ___ 口味的蛋糕。",
    pattern_note:"hacer = 做/製作，hace 是「她/他」；pastel de + 口味固定搭配", slots:["人","口味"],
    fire_peppa:{es:"Mamá Cata hace un pastel de fresa.", zh:"貓媽媽做草莓蛋糕。", ts:null,
      chunks:[{w:"Mamá Cata",role:"s"},{w:"hace",role:"v",note:"hacer ➔ hace（「她」）➔ 意思：做/製作（高頻動詞，pastel de + 口味 = ___ 口味的蛋糕）"},{w:"un pastel de fresa.",role:"o"}]},
    fire_daily:[
      {es:"Hago un pastel de chocolate.", zh:"我做巧克力蛋糕。", chunks:[{w:"(yo)",role:"s"},{w:"Hago",role:"v"},{w:"un pastel de chocolate.",role:"o"}]},
      {es:"La abuela hace galletas de naranja.", zh:"奶奶做柳橙餅乾。", chunks:[{w:"La abuela",role:"s"},{w:"hace",role:"v"},{w:"galletas de naranja.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e6_04", ep:"E6 · Cosas Ricas para Comer",
    core_ammo:"Papá Tato quiere un plátano.", core_zh:"貓爸爸想吃一根香蕉。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人] quiere [食物].", pattern_zh:"___ 想要 ___。",
    pattern_note:"querer = 想要，quiere 是「她/他」；un（陽性）/ una（陰性）", slots:["人","食物"],
    fire_peppa:{es:"Papá Tato quiere un plátano.", zh:"貓爸爸想吃一根香蕉。", ts:null,
      chunks:[{w:"Papá Tato",role:"s"},{w:"quiere",role:"v",note:"querer ➔ quiere（「他」）➔ 意思：想要（超高頻動詞，可接名詞或原形動詞）"},{w:"un plátano.",role:"o"}]},
    fire_daily:[
      {es:"Quiero una manzana.", zh:"我想要一個蘋果。", chunks:[{w:"(yo)",role:"s"},{w:"Quiero",role:"v"},{w:"una manzana.",role:"o"}]},
      {es:"Tito quiere un helado.", zh:"迪多想要冰淇淋。", chunks:[{w:"Tito",role:"s"},{w:"quiere",role:"v"},{w:"un helado.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e6_05", ep:"E6 · Cosas Ricas para Comer",
    core_ammo:"Vera Oveja trae galletas para todos.", core_zh:"薇拉羊帶餅乾給大家吃。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人] trae [食物] para todos.", pattern_zh:"___ 帶 ___ 給大家。",
    pattern_note:"traer = 帶來，trae 是「她/他」；para todos = 為了所有人", slots:["人","食物"],
    fire_peppa:{es:"Vera Oveja trae galletas para todos.", zh:"薇拉羊帶餅乾給大家吃。", ts:null,
      chunks:[{w:"Vera Oveja",role:"s"},{w:"trae",role:"v",note:"traer ➔ trae（「她」）➔ 意思：帶來（traer vs llevar：帶來這裡 vs 帶去那裡）"},{w:"galletas para todos.",role:"o"}]},
    fire_daily:[
      {es:"Mamá trae fruta para todos.", zh:"媽媽帶水果給大家。", chunks:[{w:"Mamá",role:"s"},{w:"trae",role:"v"},{w:"fruta para todos.",role:"o"}]},
      {es:"Traigo agua para ti.", zh:"我帶水給你。", chunks:[{w:"(yo)",role:"s"},{w:"Traigo",role:"v"},{w:"agua para ti.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e6_06", ep:"E6 · Cosas Ricas para Comer",
    core_ammo:"¿Quieres un poco de queso?", core_zh:"你想吃一點起司嗎？",
    be_verb_type:"none", be_verb_note:"",
    pattern:"¿Quieres un poco de [食物]?", pattern_zh:"你想吃一點 ___ 嗎？",
    pattern_note:"un poco de + 不可數名詞 = 一點點，用來邀請對方吃東西", slots:["食物"],
    fire_peppa:{es:"¿Quieres un poco de queso?", zh:"你想吃一點起司嗎？", ts:null,
      chunks:[{w:"(tú)",role:"s",hideYg:true},{w:"¿Quieres",role:"v",note:"querer ➔ quieres（「你」）➔ 意思：你想要嗎？（疑問句，超常用的邀請語）"},{w:"un poco de queso?",role:"o"}]},
    fire_daily:[
      {es:"¿Quieres un poco de pan?", zh:"你想吃一點麵包嗎？", chunks:[{w:"(tú)",role:"s"},{w:"¿Quieres",role:"v"},{w:"un poco de pan?",role:"o"}]},
      {es:"¿Quieres un poco de agua?", zh:"你想喝點水嗎？", chunks:[{w:"(tú)",role:"s"},{w:"¿Quieres",role:"v"},{w:"un poco de agua?",role:"o"}]}
    ]
  },
  {
    ammo_id:"e6_07", ep:"E6 · Cosas Ricas para Comer",
    core_ammo:"El pan está muy caliente.", core_zh:"麵包還很燙。",
    be_verb_type:"estar", be_verb_note:"Estar + 形容詞 = 當下的狀態（暫時的）",
    pattern:"[食物] está muy [狀態形容詞].", pattern_zh:"___ 還很 ___。",
    pattern_note:"estar 表示食物當下的狀態，caliente（燙）/ frío（冷）等", slots:["食物","狀態形容詞"],
    fire_peppa:{es:"El pan está muy caliente.", zh:"麵包還很燙。", ts:null,
      chunks:[{w:"El pan",role:"s"},{w:"está",role:"v",note:"estar ➔ está ➔ 意思：（當下）是（描述食物暫時狀態，caliente = 燙）"},{w:"muy caliente.",role:"o"}]},
    fire_daily:[
      {es:"La sopa está muy caliente.", zh:"湯還很燙。", chunks:[{w:"La sopa",role:"s"},{w:"está",role:"v"},{w:"muy caliente.",role:"o"}]},
      {es:"El helado está muy frío.", zh:"冰淇淋很冷。", chunks:[{w:"El helado",role:"s"},{w:"está",role:"v"},{w:"muy frío.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e6_08", ep:"E6 · Cosas Ricas para Comer",
    core_ammo:"A todos les gustan las naranjas.", core_zh:"大家都喜歡柳橙。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"A todos les gustan [食物（複數）].", pattern_zh:"大家都喜歡 ___。",
    pattern_note:"gustan（複數食物）/ gusta（單數）；比 encanta 語氣稍輕", slots:["食物（複數）"],
    fire_peppa:{es:"A todos les gustan las naranjas.", zh:"大家都喜歡柳橙。", ts:null,
      chunks:[{w:"A todos les",role:"s"},{w:"gustan",role:"v",note:"gustar ➔ gustan（複數主詞）+ les = 給他們 ➔ 意思：喜歡（比 encanta 輕，複數食物用 gustan）"},{w:"las naranjas.",role:"o"}]},
    fire_daily:[
      {es:"A todos les gustan las galletas.", zh:"大家都喜歡餅乾。", chunks:[{w:"A todos les",role:"s"},{w:"gustan",role:"v"},{w:"las galletas.",role:"o"}]},
      {es:"Me gustan las manzanas.", zh:"我喜歡蘋果。", chunks:[{w:"(a mí)",role:"s"},{w:"Me gustan",role:"v"},{w:"las manzanas.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e6_09", ep:"E6 · Cosas Ricas para Comer",
    core_ammo:"Tito no quiere comer verduras.", core_zh:"迪多不想吃蔬菜。",
    be_verb_type:"none", be_verb_note:"",
    pattern:"[人] no quiere comer [食物].", pattern_zh:"___ 不想吃 ___。",
    pattern_note:"no quiere comer = 不想吃，負面表達直接整句記", slots:["人","食物"],
    fire_peppa:{es:"Tito no quiere comer verduras.", zh:"迪多不想吃蔬菜。", ts:null,
      chunks:[{w:"Tito",role:"s"},{w:"no quiere comer",role:"v",note:"querer ➔ quiere（「他」）+ no + comer ➔ 意思：不想吃（no + 動詞 = 否定）"},{w:"verduras.",role:"o"}]},
    fire_daily:[
      {es:"No quiero comer sopa.", zh:"我不想喝湯。", chunks:[{w:"(yo)",role:"s"},{w:"No quiero comer",role:"v"},{w:"sopa.",role:"o"}]},
      {es:"El bebé no quiere comer fruta.", zh:"寶寶不想吃水果。", chunks:[{w:"El bebé",role:"s"},{w:"no quiere comer",role:"v"},{w:"fruta.",role:"o"}]}
    ]
  },
  {
    ammo_id:"e6_10", ep:"E6 · Cosas Ricas para Comer",
    core_ammo:"¡Vamos a comer pizza esta noche!", core_zh:"我們今晚要吃披薩！",
    be_verb_type:"none", be_verb_note:"",
    pattern:"¡Vamos a comer [食物] esta noche!", pattern_zh:"我們今晚要吃 ___！",
    pattern_note:"Vamos a comer = 我們要吃，esta noche = 今晚，超實用日常用語", slots:["食物"],
    fire_peppa:{es:"¡Vamos a comer pizza esta noche!", zh:"我們今晚要吃披薩！", ts:null,
      chunks:[{w:"(nosotros)",role:"s",hideYg:true},{w:"¡Vamos a comer",role:"v",note:"ir ➔ vamos（「我們」）+ a + comer ➔ 意思：我們要吃（近未來式，充滿期待的語氣）"},{w:"pizza esta noche!",role:"o"}]},
    fire_daily:[
      {es:"¡Vamos a comer helado esta noche!", zh:"我們今晚要吃冰淇淋！", chunks:[{w:"(nosotros)",role:"s"},{w:"¡Vamos a comer",role:"v"},{w:"helado esta noche!",role:"o"}]},
      {es:"¡Vamos a comer juntos!", zh:"我們一起吃吧！", chunks:[{w:"(nosotros)",role:"s"},{w:"¡Vamos a comer juntos!",role:"v"}]}
    ]
  },
];
