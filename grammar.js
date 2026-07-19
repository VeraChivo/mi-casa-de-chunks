/* ── 人稱代名詞查詢庫 ── */
const PRONOUN_LIBRARY = [
  {
    cat:'🙋 農夫本人', catEn:'（做動作的人，像英文的 I / you / he）',
    hint:'在莊園裡耕作流汗、真正做動作的人。因為太常見了，西語常把她省略不寫——看動詞字尾（帶回來的農作物）就知道是哪位農夫出動',
    rows:[
      {es:'yo',            zh:'我',       en:'I',        ex:'Yo tengo hambre. 我肚子餓了。'},
      {es:'tú',             zh:'你',       en:'you'},
      {es:'él / ella',      zh:'他 / 她',  en:'he / she'},
      {es:'nosotros',       zh:'我們',     en:'we'},
      {es:'ustedes',        zh:'你們（拉美通用，不分熟悉/正式）', en:'you all (LatAm)'},
      {es:'ellos / ellas',  zh:'他們 / 她們', en:'they'}
    ],
    example:{es:'Tengo hambre.', zh:'我肚子餓了。（加主詞版：Yo tengo hambre. — 兩句意思一樣，-o 字尾已代表「我」，Yo 可省略）'}
  },
  {
    cat:'📦 倒楣作物', catEn:'（接受動作的人事物，像英文的 him / her / it）',
    hint:'沒人權，永遠被農夫直接拿在手上砸、或裝進籃子裡的東西',
    rows:[
      {es:'me',   zh:'我（被...）',  en:'me'},
      {es:'te',   zh:'你（被...）',  en:'you',  ex:'Te llamo mañana. 我明天打電話給你。'},
      {es:'lo / la', zh:'他/她/它（被...）', en:'him / her / it'},
      {es:'nos',  zh:'我們（被...）', en:'us'},
      {es:'los / las', zh:'他們/她們/你們（被...，拉美 ustedes 共用這個）', en:'them / you all (LatAm)'}
    ],
    example:{es:'Compro el libro. → Lo compro.', speakEs:'Compro el libro. Lo compro.', zh:'我買這本書。→ 我買它。'}
  },
  {
    cat:'👥 八卦鄰居', catEn:'（動作的收件人，像英文的 to him / to her）',
    hint:'農夫辛苦收成、準備好東西後，最終收下禮物的人',
    rows:[
      {es:'me',   zh:'給我',   en:'to me'},
      {es:'te',   zh:'給你',   en:'to you',  ex:'Te doy un regalo. 我給你一個禮物。'},
      {es:'le',   zh:'給他/她/您', en:'to him / to her'},
      {es:'nos',  zh:'給我們', en:'to us'},
      {es:'les',  zh:'給他們/她們/你們（拉美 ustedes 共用這個）', en:'to them / to you all (LatAm)'}
    ],
    example:{es:'Doy el libro a María. → Le doy el libro.', speakEs:'Doy el libro a María. Le doy el libro.', zh:'我把書給瑪麗亞。→ 我把書給她。'},
    note:'⚡ 八卦鄰居瑪麗亞大嬸嘴巴很大：收件人是特定名字時，妳不但要在包裹上寫她的名字（a María），還要對著整座莊園大喊一聲「我是給她喔！」（Le）——兩個都要寫，少喊一聲都不行！Le doy el libro a María.'
  },
  {
    cat:'🪞 自戀鏡子', catEn:'（反身代名詞，像英文的 myself / yourself）',
    hint:'動作沒有丟給鄰居，也沒砸到外面的作物，而是像迴力鏢一樣，農夫對著鏡子裡的自己做動作',
    rows:[
      {es:'me',   zh:'我自己',  en:'myself',  ex:'Me lavo las manos. 我洗我自己的手。'},
      {es:'te',   zh:'你自己',  en:'yourself'},
      {es:'se',   zh:'他/她自己', en:'himself / herself'},
      {es:'nos',  zh:'我們自己', en:'ourselves'},
      {es:'se',   zh:'他們/她們/你們自己（拉美 ustedes 共用這個）', en:'themselves / yourselves (LatAm)'}
    ],
    example:{es:'Me lavo las manos.', zh:'我（自己）洗手。'}
  }
];

/* ── 莊園人物冊進階篇：多個角色同台時的規則 ── */
const PRONOUN_COMBO_RULES = [
  {
    title:'🏎️ 出場排班',
    titleSub:'自戀鏡子 → 八卦鄰居 → 倒楣作物',
    hint:'莊園裡好幾個角色同時要對一個動作發表意見時，排隊順序死板板固定：第1順位永遠是自戀鏡子（反身），第2順位永遠是八卦鄰居（間接），第3順位永遠是倒楣作物（直接），不能插隊',
    example:{es:'Me lo pongo.', zh:'我把它穿上。（鏡子 me ＋ 作物 lo ＋ 動詞 pongo）'}
  },
  {
    title:'🎭 驚天大變身',
    titleSub:'八卦鄰居遇到倒楣作物 → le/les 變 se',
    hint:'八卦鄰居（le/les）遇到單複數倒楣作物（lo/la/los/las）時，唸起來會音韻大撞車<br>（Le lo 像警車在叫），這時 le/les 會瞬間變裝成 se',
    example:{es:'Le lo doy (✗) → Se lo doy. (✓)', speakEs:'Le lo doy. Se lo doy.', zh:'我把書給他。<br>（<span class="nowrap">Le lo doy</span> 唸起來卡，要變成 <span class="nowrap">Se lo doy</span>）'}
  },
  {
    title:'📢 命令大聲公',
    titleSub:'角色全部黏到動詞屁股後面',
    hint:'農夫開啟「命令模式」叫別人做事時，角色們會變成跟屁蟲，全部塞到動詞後面合併成一個新單字',
    example:{es:'Comer + lo → Cómelo.', speakEs:'Cómelo.', zh:'吃掉它！（Comer 吃 ＋ lo 作物，黏在一起）'}
  },
  {
    title:'🏃 正在忙碌中',
    titleSub:'站前面或抱屁股，兩種都可以',
    hint:'農夫正在做某件事（-ando/-iendo）時，角色可以選擇站在動詞前面，也可以選擇黏到動詞屁股後面，兩種說法都對',
    example:{es:'Le estoy escribiendo.<br>＝ Estoy escribiéndole.', speakEs:'Le estoy escribiendo. Estoy escribiéndole.', zh:'我正在寫信給她。（兩種說法都可以）'}
  }
];

function renderPronounComboRules(){
  return `<details class="pron-combo-section">
    <summary class="pron-combo-title">🏰 莊園人物冊進階篇：角色同台大亂鬥 ▾</summary>
    ${PRONOUN_COMBO_RULES.map(r=>`
      <div class="pron-cat-card">
        <div class="pron-cat-header">${r.title}</div>
        <div class="pron-combo-titlesub">${r.titleSub}</div>
        <div class="pron-cat-hint">${r.hint}</div>
        <div class="pron-example" onclick="speakGramSmart('${String(r.example.speakEs||r.example.es).replace(/'/g,"\\'")}')">
          <div class="pron-ex-es">▶ ${r.example.es}</div>
          ${r.example.speakEs && r.example.speakEs!==r.example.es ? `<div class="pron-ex-speak">🔊 實際播放：${r.example.speakEs}</div>` : ''}
          <div class="pron-ex-zh">${r.example.zh}</div>
        </div>
      </div>`).join('')}
  </details>`;
}



const GRAMMAR_CATS = [
  {key:"all",          label:"全部"},
  {key:"ser-estar",    label:"SER vs ESTAR"},
  {key:"tense",        label:"時態"},
  {key:"gustar",       label:"Gustar 句型"},
  {key:"verb-pattern", label:"動詞句型"},
  {key:"phrase",       label:"固定用語"},
  {key:"word-order",   label:"詞序"},
  {key:"gender",       label:"名詞陰陽性"},
  {key:"subjunctive",  label:"虛擬語氣"},
  {key:"connector",    label:"連接詞"},
  {key:"confusable",   label:"易混淆詞組"},
  {key:"vocab",        label:"B2詞彙"},
  {key:"slang",        label:"拉美俚語"},
  {key:"proverb",      label:"諺語"},
  {key:"rhetoric",     label:"修辭"},
  {key:"history",      label:"歷史典故"},
  {key:"politics",     label:"政治語言"},
  {key:"classical",    label:"古典西語"},
  {key:"literature",   label:"文學"},
  {key:"cinema",       label:"影視"},
  {key:"pragmatics",   label:"真實西語"},
  {key:"etiquette",    label:"文化禁忌與禮貌"},
  {key:"etymology",    label:"詞源"},
  {key:"falseeq",      label:"翻譯陷阱"},
  {key:"socioling",    label:"社會語言學"},
  {key:"inclusive",    label:"包容語言"},
  {key:"reading",      label:"閱讀入口"},
  {key:"preposition",  label:"介系詞場景"}
];


const GRAMMAR_DATA = [

  // ══ SER vs ESTAR ══

  {
    id:"g01", cat:"ser-estar", level:"a1a2",
    title:"SER：身分與本質",
    rule:"SER 描述恆久不變的特質：身分、職業、國籍、關係、本質描述。",
    examples:[
      {es:"Yo soy Gatita Nita.", zh:"我是小貓妮妲。（身分）"},
      {es:"Este es mi hermano pequeño.", zh:"這是我的小弟弟。（關係）"},
      {es:"Son las mejores amigas.", zh:"她們是最好的朋友。（本質關係）"}
    ],
    trap:"「她在廚房」= Está en la cocina，位置要用 ESTAR，不用 SER！",
    mnemonic:{
      icon:"💎", word:"DOCTOR", side:"ser",
      desc:"SER 的口訣：抓住「恆久不變」的核心",
      items:[
        {l:"D",label:"Description 描述",ex:"Es simpática."},
        {l:"O",label:"Occupation 職業",ex:"Es doctora."},
        {l:"C",label:"Characteristics 特徵",ex:"Es alto."},
        {l:"T",label:"Time 時間",ex:"Son las tres."},
        {l:"O",label:"Origin 國籍／出身",ex:"Soy de Taiwán."},
        {l:"R",label:"Relationship 關係",ex:"Es mi hermano."}
      ]
    },
    crossLang:"快速對接：SER＝「是」——華語「是」、台語「是（sī）」、客語「係（he）」，四種語言在『本質認同』這個字上都對得起來，比死背 DOCTOR 口訣更直覺！",
    quirk:"📍 事件發生地點 → SER；物體本身的位置 → ESTAR。<br>❌ 直覺：婚禮在哪裡？= 地點 = ESTAR？<br>✅ 其實是：什麼事情在哪裡發生？= SER<br>La boda es en la iglesia.（婚禮在教堂舉行——事件發生地點，用SER，跟tener lugar「舉行」同義）<br>≠ La iglesia está en el centro.（教堂位於市中心——這是教堂這個「東西」本身的位置，才輪到ESTAR）",
    source:"E1·S1 / E1·S2 / E3·S3",
    conj:{
      verb:"ser（是）",
      rows:[
        {person:"yo",         form:"soy",    ex:"Soy estudiante.",     zh:"我是學生。"},
        {person:"tú",         form:"eres",   ex:"¿Eres Nita?",        zh:"你是妮妲嗎？"},
        {person:"él/ella/usted", form:"es",     ex:"Es muy gracioso.",    zh:"他很幽默。"},
        {person:"nosotros",   form:"somos",  ex:"Somos amigos.",       zh:"我們是朋友。"},
        {person:"ellos/ellas/ustedes", form:"son",    ex:"Son las mejores.",    zh:"她們是最棒的。"}
      ]
    },
    conj_subj:{
      verb:"ser（現在虛擬式）",
      rows:[
        {person:"yo",                  form:"sea",     ex:"Espero que sea posible.",    zh:"希望這是可行的。"},
        {person:"tú",                  form:"seas",    ex:"Quiero que seas feliz.",     zh:"我希望你快樂。"},
        {person:"él/ella/usted",       form:"sea",     ex:"Ojalá sea verdad.",         zh:"希望這是真的。"},
        {person:"nosotros",            form:"seamos",  ex:"Para que seamos amigos.",   zh:"為了讓我們成為好朋友。"},
        {person:"ellos/ellas/ustedes", form:"sean",    ex:"Espero que sean amables.",  zh:"希望他們都很友善。"}
      ]
    },
    conj_impsubj:{
      verb:"ser（過去未完成虛擬式）",
      rows:[
        {person:"yo",                  form:"fuera",    ex:"Si yo fuera tú...",           zh:"如果我是你的話..."},
        {person:"tú",                  form:"fueras",   ex:"Si fueras más paciente...",   zh:"如果你更有耐心的話..."},
        {person:"él/ella/usted",       form:"fuera",    ex:"Como si fuera fácil.",        zh:"好像這很簡單似的。"},
        {person:"nosotros",            form:"fuéramos", ex:"Ojalá fuéramos más rápidos.", zh:"要是我們更快就好了。"},
        {person:"ellos/ellas/ustedes", form:"fueran",   ex:"Si fueran distintos...",      zh:"如果他們不一樣的話..."}
      ]
    },
    conj_cond:{
      verb:"ser（條件式）",
      rows:[
        {person:"yo",                  form:"sería",    ex:"Eso sería genial.",          zh:"那會很棒。"},
        {person:"tú",                  form:"serías",   ex:"¿Serías tan amable?",        zh:"你能這麼好嗎？"},
        {person:"él/ella/usted",       form:"sería",    ex:"Sería un buen día.",         zh:"那會是美好的一天。"},
        {person:"nosotros",            form:"seríamos", ex:"Seríamos más felices.",      zh:"我們會更快樂。"},
        {person:"ellos/ellas/ustedes", form:"serían",   ex:"Serían perfectos juntos.",   zh:"他們在一起會很完美。"}
      ]
    }
  },

  {
    id:"g02", cat:"ser-estar", level:"a1a2",
    title:"ESTAR：位置與狀態",
    rule:"ESTAR 描述暫時性的狀態、位置，或正在進行的動作。",
    examples:[
      {es:"El señor Esqueleto no está en la cama de Tito.", zh:"骷髏先生不在迪多的床上。（位置）"},
      {es:"Nita está esperando a Vera Oveja.", zh:"妮妲正在等薇拉羊。（進行中）"},
      {es:"Estoy cansada.", zh:"我現在很累。（暫時狀態）"}
    ],
    trap:"口訣：SER = 本質身分（永久）；ESTAR = 位置狀態（暫時）",
    mnemonic:{
      icon:"🌦️", word:"PLACE", side:"estar",
      desc:"ESTAR 的口訣：抓住「暫時／此刻」的狀態",
      items:[
        {l:"P",label:"Position 位置／姿勢",ex:"Está sentado."},
        {l:"L",label:"Location 地點",ex:"Estoy en casa."},
        {l:"A",label:"Action 動作／進行式",ex:"Estamos comiendo."},
        {l:"C",label:"Condition 狀態／健康",ex:"Está roto."},
        {l:"E",label:"Emotion 情緒",ex:"Estoy feliz."}
      ]
    },
    crossLang:"快速對接：ESTAR＝「在」——華語「在」、台語「在、佇（tī）」、客語「在」，四種語言在『位置／暫時狀態』這個字上也對得起來。記法：SER 是本質的『是』，ESTAR 是暫時的『在』。",
    quirk:"❌ 直覺：死亡很永久，應該是本質身分 = SER？<br>✅ 其實是：西語把死亡當成「外力造成、改變後的狀態」= ESTAR<br>Está muerto.（他死了——跟está roto壞掉了、está cansado累了是同一掛邏輯，不是在描述這個人的本質身分）",
    source:"E2·S8 / E3·S1",
    conj:{
      verb:"estar（在／處於狀態）",
      rows:[
        {person:"yo",         form:"estoy",   ex:"Estoy bien.",         zh:"我很好。"},
        {person:"tú",         form:"estás",   ex:"¿Estás bien?",        zh:"你還好嗎？"},
        {person:"él/ella/usted", form:"está",    ex:"Está aquí.",          zh:"他在這裡。"},
        {person:"nosotros",   form:"estamos", ex:"Estamos en casa.",    zh:"我們在家。"},
        {person:"ellos/ellas/ustedes", form:"están",   ex:"Están jugando.",      zh:"他們在玩。"}
      ]
    },
    conj_subj:{
      verb:"estar（現在虛擬式）",
      rows:[
        {person:"yo",                  form:"esté",      ex:"Espero que estés bien.",       zh:"希望你一切安好。"},
        {person:"tú",                  form:"estés",     ex:"Quiero que estés tranquila.",  zh:"我希望你平靜下來。"},
        {person:"él/ella/usted",       form:"esté",      ex:"Ojalá esté aquí pronto.",      zh:"希望他快點在這裡。"},
        {person:"nosotros",            form:"estemos",   ex:"Para que estemos juntos.",     zh:"為了讓我們在一起。"},
        {person:"ellos/ellas/ustedes", form:"estén",     ex:"Espero que estén bien.",       zh:"希望他們都好。"}
      ]
    },
    conj_impsubj:{
      verb:"estar（過去未完成虛擬式）",
      rows:[
        {person:"yo",                  form:"estuviera",    ex:"Si estuviera allí...",            zh:"如果我在那裡的話..."},
        {person:"tú",                  form:"estuvieras",   ex:"Ojalá estuvieras aquí.",          zh:"要是你在這裡就好了。"},
        {person:"él/ella/usted",       form:"estuviera",    ex:"Como si estuviera enferma.",      zh:"好像她病了似的。"},
        {person:"nosotros",            form:"estuviéramos", ex:"Si estuviéramos juntos...",       zh:"如果我們在一起的話..."},
        {person:"ellos/ellas/ustedes", form:"estuvieran",   ex:"Si estuvieran aquí, ayudarían.", zh:"如果他們在這裡，就會幫忙了。"}
      ]
    },
    conj_cond:{
      verb:"estar（條件式）",
      rows:[
        {person:"yo",                  form:"estaría",    ex:"Yo estaría feliz.",         zh:"我會很快樂。"},
        {person:"tú",                  form:"estarías",   ex:"¿Estarías bien?",           zh:"你會沒事嗎？"},
        {person:"él/ella/usted",       form:"estaría",    ex:"Estaría mejor así.",        zh:"這樣會好一點。"},
        {person:"nosotros",            form:"estaríamos", ex:"Estaríamos más tranquilos.",zh:"我們會更平靜。"},
        {person:"ellos/ellas/ustedes", form:"estarían",   ex:"Estarían cansados.",        zh:"他們會很累。"}
      ]
    }
  },

  {
    id:"g03", cat:"ser-estar", level:"a1a2",
    title:"ESTAR + -ando：正在做某事",
    rule:"ESTAR（正確人稱）+ 動詞字尾改成 -ando / -iendo = 正在做某事。就像英文的 -ing！",
    emph:true,
    examples:[
      {es:"Hoy está lloviendo.", zh:"今天正在下雨。（está + llovier → lloviendo）"},
      {es:"Nita y Papá Tato están jugando a las damas.", zh:"妮妲和貓爸爸達多正在下棋。（están + jugar → jugando）"},
      {es:"Estoy esperando el autobús.", zh:"我正在等公車。（estoy + esperar → esperando）"}
    ],
    trap:"-ar 動詞字尾換 -ando（jugar → jugando）；-er/-ir 動詞字尾換 -iendo（comer → comiendo）",
    source:"E1·S3 / E2·S9 / E3·S1",
    conj:{
      verb:"estar + -ando（西語的-ing形態）",
      rows:[
        {person:"yo",         form:"estoy",   ex:"Estoy comiendo.",     zh:"我在吃飯。"},
        {person:"tú",         form:"estás",   ex:"¿Estás durmiendo?",   zh:"你在睡覺嗎？"},
        {person:"él/ella/usted", form:"está",    ex:"Está lloviendo.",     zh:"在下雨。"},
        {person:"nosotros",   form:"estamos", ex:"Estamos jugando.",    zh:"我們在玩。"},
        {person:"ellos/ellas/ustedes", form:"están",   ex:"Están hablando.",     zh:"他們在說話。"}
      ]
    }
  },

  {
    id:"g04", cat:"ser-estar", level:"a1a2",
    title:"SER vs ESTAR + 描述詞：意思大不同！",
    rule:"同一個描述詞接 SER 或 ESTAR，意思會完全不同！SER = 本質評價；ESTAR = 當下感受。",
    examples:[
      {es:"La sopa es buena.", zh:"這是好湯。（SER：本質評價）"},
      {es:"La sopa está buena.", zh:"這湯現在很好喝。（ESTAR：當下狀態）"},
      {es:"Soy aburrida. vs Estoy aburrida.", zh:"我是無聊的人（SER）vs 我現在很無聊（ESTAR）"}
    ],
    trap:"問自己：這是「天生/本質」的特質，還是「當下/暫時」的狀態？",
    source:"E1~E3 綜合"
  },

  // ══ 時態 ══

  {
    id:"g05", cat:"tense", level:"a1a2",
    title:"「已經做了」：haber + 動詞-ado/-ido形",
    rule:"haber（幫忙的動詞）+ 動詞-ado/-ido形 = 「已經做了某事」，結果跟現在有關。",
    examples:[
      {es:"Nita ha encontrado un charco pequeño.", zh:"妮妲找到了一個小水坑。（ha + encontrado）"},
      {es:"Tito ha perdido al señor Esqueleto.", zh:"迪多把骷髏先生弄丟了。（ha + perdido）"},
      {es:"He perdido mi mochila.", zh:"我把我的書包弄丟了。（「我」用 he）"}
    ],
    trap:"字尾規則：-ar → -ado（encontrar→encontrado）；-er/-ir → -ido（perder→perdido）",
    source:"E1·S7 / E2·S3",
    conj:{
      verb:"haber（幫忙的動詞）",
      rows:[
        {person:"yo",         form:"he",      ex:"He comido.",          zh:"我已吃了。"},
        {person:"tú",         form:"has",     ex:"¿Has llegado?",       zh:"你到了嗎？"},
        {person:"él/ella/usted", form:"ha",      ex:"Ha perdido.",         zh:"他弄丟了。"},
        {person:"nosotros",   form:"hemos",   ex:"Hemos ganado.",       zh:"我們贏了。"},
        {person:"ellos/ellas/ustedes", form:"han",     ex:"Han salido.",         zh:"他們出去了。"}
      ]
    },
    conj_subj:{
      verb:"haber（現在虛擬式，用於現在完成虛擬式）",
      rows:[
        {person:"yo",                  form:"haya",    ex:"No creo que haya venido.",    zh:"我不覺得他來了。"},
        {person:"tú",                  form:"hayas",   ex:"Espero que hayas descansado.",zh:"希望你有好好休息。"},
        {person:"él/ella/usted",       form:"haya",    ex:"Ojalá haya llegado bien.",    zh:"希望他平安抵達了。"},
        {person:"nosotros",            form:"hayamos", ex:"Para que hayamos aprendido.", zh:"為了讓我們有所學習。"},
        {person:"ellos/ellas/ustedes", form:"hayan",   ex:"Es posible que hayan salido.",zh:"他們可能已經出發了。"}
      ]
    },
    conj_impsubj:{
      verb:"haber（過去未完成虛擬式，用於過去完成虛擬式）",
      rows:[
        {person:"yo",                  form:"hubiera",    ex:"Si hubiera sabido antes...",       zh:"如果我早點知道的話..."},
        {person:"tú",                  form:"hubieras",   ex:"Ojalá hubieras venido.",           zh:"要是你有來就好了。"},
        {person:"él/ella/usted",       form:"hubiera",    ex:"Si hubiera estudiado más...",      zh:"如果他有多念一點書的話..."},
        {person:"nosotros",            form:"hubiéramos", ex:"Si hubiéramos llegado a tiempo...",zh:"如果我們有準時到的話..."},
        {person:"ellos/ellas/ustedes", form:"hubieran",   ex:"Si hubieran avisado...",           zh:"如果他們有事先通知的話..."}
      ]
    },
    conj_cond:{
      verb:"haber（條件式，用於條件完成式）",
      rows:[
        {person:"yo",                  form:"habría",    ex:"Lo habría hecho antes.",   zh:"我本來早就做了。"},
        {person:"tú",                  form:"habrías",   ex:"¿Lo habrías intentado?",   zh:"你本來會試試看嗎？"},
        {person:"él/ella/usted",       form:"habría",    ex:"Habría sido mejor así.",   zh:"那樣本來會更好。"},
        {person:"nosotros",            form:"habríamos", ex:"Habríamos llegado antes.", zh:"我們本來早就到了。"},
        {person:"ellos/ellas/ustedes", form:"habrían",   ex:"Habrían venido juntos.",   zh:"他們本來會一起來的。"}
      ]
    }
  },

  {
    id:"g06", cat:"tense", level:"b1",
    title:"「一直做到現在」：haber + estado + -ando",
    rule:"haber + estado + 動詞-ando = 「一直在做某事直到現在」，動作從過去延續到現在。",
    examples:[
      {es:"Ustedes han estado chapoteando en los charcos de barro.", zh:"你們一直在泥巴坑裡玩水。"},
      {es:"He estado estudiando toda la tarde.", zh:"我整個下午都在念書。"},
      {es:"Mamá ha estado cocinando.", zh:"媽媽一直在煮飯。"}
    ],
    trap:"拉美用 ustedes + han + estado；vosotros + habéis + estado 是西班牙用法，這個網站教拉美西語優先練 han。英語對應：have been + -ing",
    source:"E2·S10"
  },

  {
    id:"g07", cat:"tense", level:"a1a2",
    title:"SER 說「將來的事」：seré / serás / será",
    rule:"SER 動詞表示「將來成為」某種身分或角色，常用於角色扮演或預測。",
    examples:[
      {es:"Yo seré la doctora y tú serás la enfermera.", zh:"我來當醫生，你來當護士。"},
      {es:"Tú serás una estrella.", zh:"你將成為一顆明星。"},
      {es:"¿Qué serás de mayor?", zh:"你長大想做什麼？（字面：你將成為什麼？）"}
    ],
    trap:"SER 未來人稱：seré / serás / será / seremos / seréis / serán",
    source:"E3·S7",
    conj:{
      verb:"ser（以後要做：將成為）",
      rows:[
        {person:"yo",         form:"seré",    ex:"Seré médico.",        zh:"我會成為醫生。"},
        {person:"tú",         form:"serás",   ex:"Serás famosa.",       zh:"你會出名的。"},
        {person:"él/ella/usted", form:"será",    ex:"Será un buen día.",   zh:"會是美好的一天。"},
        {person:"nosotros",   form:"seremos", ex:"Seremos campeones.",  zh:"我們將是冠軍。"},
        {person:"ellos/ellas/ustedes", form:"serán",   ex:"Serán felices.",      zh:"他們將幸福。"}
      ]
    }
  },

  // ══ Gustar 句型 ══

  {
    id:"g08", cat:"gustar", level:"a1a2",
    title:"Me gusta vs Me encanta：喜歡的程度",
    rule:"中文腦：「我喜歡這首歌。」→ 西語腦：「這首歌讓我覺得喜歡。」→ Me gusta esta canción. 動詞跟著「被喜歡的事物」走，不是說話者！Me gusta（單數事物）/ Me gustan（複數事物）；Me encanta = 我超愛（比 gusta 強 10 倍）。",
    examples:[
      {es:"Me gusta el chocolate.", zh:"我喜歡巧克力。（單數 → gusta）（es：me gusta = 它讓我喜歡，主詞邏輯跟中文「我喜歡」相反）"},
      {es:"Me encanta chapotear en los charcos.", zh:"我超愛在水坑裡玩水。"},
      {es:"Me gustan las galletas.", zh:"我喜歡餅乾。（複數 → gustan）"},
      {es:"No me gusta la lluvia.", zh:"我不喜歡下雨。（否定：前面加 no）"},
      {es:"¿Te gusta el chocolate?", zh:"你喜歡巧克力嗎？（問句：me換成 te）"}
    ],
    trap:"動詞跟著「被喜歡的事物」走：Me gusta el libro（單）vs Me gustan los libros（複）",
    source:"E1·S6 / E1·S10"
  },

  {
    id:"g09", cat:"gustar", level:"a1a2",
    title:"A + 人 + le gusta：某人喜歡",
    rule:"A + 人名或代名詞 + le/les + gusta(n) + 名詞或原型動詞。",
    examples:[
      {es:"A Tito no le gusta jugar solo.", zh:"迪多不喜歡一個人玩。"},
      {es:"A todos les encanta chapotear en los charcos.", zh:"所有人都超愛在水坑裡玩水。"},
      {es:"A mí me gusta el café.", zh:"我喜歡咖啡。（加 a mí 是為了強調）"}
    ],
    trap:"代名詞對應：a mí me / a ti te / a él,ella,usted le / a nosotros nos / a ustedes,ellos,ellas les（西班牙另有 a vosotros os，拉美不用）",
    source:"E3·S6 / E1·S10"
  },

  // ══ 動詞句型 ══

  {
    id:"g10", cat:"verb-pattern", level:"a1a2",
    title:"¿Podemos + 動詞?：我們可以…嗎？",
    rule:"poder 就是英文的 'can'，用來問「可以嗎」或說「能夠做」。podemos + 原型動詞（字典查到的形式）= 我們能夠 ___。",
    examples:[
      {es:"¿Podemos salir a jugar?", zh:"我們可以出去玩嗎？"},
      {es:"¿Podemos comer ahora?", zh:"我們現在可以吃了嗎？"},
      {es:"¿Podemos ver la tele?", zh:"我們可以看電視嗎？"}
    ],
    trap:"poder 變化比較特別：puedo / puedes / puede / podemos / podéis（拉美:pueden）/ pueden",
    source:"E1·S4",
    conj:{
      verb:"poder（能夠／可以）",
      rows:[
        {person:"yo",         form:"puedo",   ex:"Puedo salir.",        zh:"我可以出去。"},
        {person:"tú",         form:"puedes",  ex:"¿Puedes ayudar?",     zh:"你能幫忙嗎？"},
        {person:"él/ella/usted", form:"puede",   ex:"Puede volar.",        zh:"他能飛。"},
        {person:"nosotros",   form:"podemos", ex:"Podemos jugar.",      zh:"我們可以玩。"},
        {person:"ellos/ellas/ustedes", form:"pueden",  ex:"Pueden correr.",      zh:"他們能跑。"}
      ]
    },
    conj_subj:{
      verb:"poder（現在虛擬式）",
      rows:[
        {person:"yo",                  form:"pueda",    ex:"Espero que pueda venir.",      zh:"希望他能來。"},
        {person:"tú",                  form:"puedas",   ex:"Quiero que puedas descansar.", zh:"我希望你能休息。"},
        {person:"él/ella/usted",       form:"pueda",    ex:"Ojalá pueda lograrlo.",        zh:"希望他能做到。"},
        {person:"nosotros",            form:"podamos",  ex:"Para que podamos ayudar.",     zh:"為了讓我們能幫上忙。"},
        {person:"ellos/ellas/ustedes", form:"puedan",   ex:"Espero que puedan quedarse.",  zh:"希望他們能留下來。"}
      ]
    },
    conj_impsubj:{
      verb:"poder（過去未完成虛擬式）",
      rows:[
        {person:"yo",                  form:"pudiera",    ex:"Si pudiera, lo haría.",       zh:"如果我能做到，我就做了。"},
        {person:"tú",                  form:"pudieras",   ex:"Ojalá pudieras venir.",       zh:"要是你能來就好了。"},
        {person:"él/ella/usted",       form:"pudiera",    ex:"Si pudiera, descansaría.",    zh:"如果他能的話，他就休息了。"},
        {person:"nosotros",            form:"pudiéramos", ex:"Si pudiéramos salir...",      zh:"如果我們能出去的話..."},
        {person:"ellos/ellas/ustedes", form:"pudieran",   ex:"Si pudieran quedarse...",     zh:"如果他們能留下的話..."}
      ]
    },
    conj_cond:{
      verb:"poder（條件式）",
      rows:[
        {person:"yo",                  form:"podría",    ex:"¿Podría ayudarte?",          zh:"我可以幫你嗎？"},
        {person:"tú",                  form:"podrías",   ex:"¿Podrías venir mañana?",     zh:"你明天能來嗎？"},
        {person:"él/ella/usted",       form:"podría",    ex:"Podría ser mejor.",          zh:"這樣可能會更好。"},
        {person:"nosotros",            form:"podríamos", ex:"Podríamos intentarlo.",      zh:"我們可以試試看。"},
        {person:"ellos/ellas/ustedes", form:"podrían",   ex:"Podrían ayudarnos.",         zh:"他們可以幫我們。"}
      ]
    }
  },

  {
    id:"g11", cat:"verb-pattern", level:"a1a2",
    title:"Deber + 動詞：你應該、必須",
    rule:"deber（義務）+ 原型動詞（字典查到的形式）= 應該做、必須做某事。",
    examples:[
      {es:"Debes ponerte las botas de agua.", zh:"你該穿上雨鞋。"},
      {es:"Debes lavarte las manos.", zh:"你該洗手。"},
      {es:"Debemos respetar las reglas.", zh:"我們該遵守規則。"}
    ],
    trap:"deber 變化：debo / debes / debe / debemos / debéis（拉美常用 deben）/ deben",
    source:"E1·S5",
    conj:{
      verb:"deber（應該／必須）",
      rows:[
        {person:"yo",         form:"debo",    ex:"Debo estudiar.",      zh:"我必須念書。"},
        {person:"tú",         form:"debes",   ex:"Debes comer.",        zh:"你必須吃。"},
        {person:"él/ella/usted", form:"debe",    ex:"Debe dormir.",        zh:"他必須睡。"},
        {person:"nosotros",   form:"debemos", ex:"Debemos salir.",      zh:"我們應該出發。"},
        {person:"ellos/ellas/ustedes", form:"deben",   ex:"Deben practicar.",    zh:"他們必須練習。"}
      ]
    },
    conj_subj:{
      verb:"deber（現在虛擬式）",
      rows:[
        {person:"yo",                  form:"deba",    ex:"No creo que deba ir sola.",   zh:"我不覺得她應該一個人去。"},
        {person:"tú",                  form:"debas",   ex:"Es importante que debas saber.",zh:"你應該要知道這件事。"},
        {person:"él/ella/usted",       form:"deba",    ex:"Ojalá no deba hacerlo.",      zh:"希望她不必這樣做。"},
        {person:"nosotros",            form:"debamos", ex:"Para que debamos respetar.",  zh:"為了讓我們都應該尊重。"},
        {person:"ellos/ellas/ustedes", form:"deban",   ex:"Es necesario que deban venir.",zh:"他們有必要來。"}
      ]
    },
    conj_impsubj:{
      verb:"deber（過去未完成虛擬式）",
      rows:[
        {person:"yo",                  form:"debiera",    ex:"Si debiera elegir...",           zh:"如果我必須選擇的話..."},
        {person:"tú",                  form:"debieras",   ex:"Ojalá debieras saberlo.",        zh:"要是你早該知道就好了。"},
        {person:"él/ella/usted",       form:"debiera",    ex:"Si debiera quedarse...",         zh:"如果他必須留下的話..."},
        {person:"nosotros",            form:"debiéramos", ex:"Si debiéramos hacerlo...",       zh:"如果我們必須做的話..."},
        {person:"ellos/ellas/ustedes", form:"debieran",   ex:"Si debieran practicar más...",   zh:"如果他們應該多練習的話..."}
      ]
    },
    conj_cond:{
      verb:"deber（條件式）",
      rows:[
        {person:"yo",                  form:"debería",    ex:"Yo debería descansar.",      zh:"我應該休息了。"},
        {person:"tú",                  form:"deberías",   ex:"Deberías comer algo.",       zh:"你應該吃點東西。"},
        {person:"él/ella/usted",       form:"debería",    ex:"Debería pedir perdón.",      zh:"他應該道歉。"},
        {person:"nosotros",            form:"deberíamos", ex:"Deberíamos hablar.",         zh:"我們應該好好談談。"},
        {person:"ellos/ellas/ustedes", form:"deberían",   ex:"Deberían llegar pronto.",    zh:"他們應該快到了。"}
      ]
    }
  },

  {
    id:"g12", cat:"verb-pattern", level:"a1a2",
    title:"Para + 動詞：為了做某事",
    rule:"para + 原型動詞 = 為了…、目的是…。表示「目的」。",
    examples:[
      {es:"Todos necesitan galletas para curarse.", zh:"所有人都需要餅乾才能康復。"},
      {es:"Necesitas agua para vivir.", zh:"你需要水才能生存。"},
      {es:"Estudio español para viajar.", zh:"我學西語是為了旅行。"}
    ],
    trap:"para（目的）vs por（原因）：Estudio por dinero = 我讀書是因為錢（原因）",
    source:"E3·S10"
  },

  {
    id:"g13", cat:"verb-pattern", level:"a1a2",
    title:"Creo que：讓別人知道我腦中怎麼理解這件事",
    rule:"醫生摸摸額頭說Creo que tienes fiebre.（我覺得你發燒了）——這句話是「我想讓你知道，我腦中對這件事的判斷是這樣」，不是在宣告一個確定的事實。同一個骨架，可以用來猜測別人的狀態，也可以用來講出自己內心對某件事的想法，像是Creo que todo es mi error.（我以為都是我的錯）。",
    examples:[
      {es:"Creo que tienes fiebre.", zh:"我覺得你發燒了。（劇情原句，E3扮醫生場景）"},
      {es:"Creo que todo es mi error.", zh:"我以為都是我的錯。（劇情原句，SEL線）"},
      {es:"Creo que tienes razón.", zh:"我覺得你說得對。（劇情原句，E3）"}
    ],
    family:{
      title:"🌿 Creo que：不只一種畫面",
      intro:"同一個「我想讓你知道我的判斷」骨架，因為想讓對方知道的事不同，會長出不同分支——不是同義句堆疊，每句背後的溝通目的都不一樣。",
      items:[
        {es:"Creo que tienes fiebre.", zh:"🩺猜測判斷：我想讓對方知道我對他狀態的猜測（劇情原句，E3扮醫生場景）"},
        {es:"Creo que todo es mi error.", zh:"💭自我信念：我想讓對方知道我腦中對自己的想法，即使不一定正確（劇情原句，SEL線譴譴的台詞）"}
      ]
    },
    trap:"口語快速版：Creo que sí（我覺得是）/ Creo que no（我覺得不是）。",
    source:"劇情E3／SEL劇情線／彈藥庫e3系列",
    storyRoles:[
      {es:"Creo que tienes fiebre.", semanticRole:"tentative-judgment", communicationGoal:"我想讓對方知道我對他狀態的猜測", scene:"E3劇情（真實例句）"},
      {es:"Creo que todo es mi error.", semanticRole:"self-belief", communicationGoal:"我想讓對方知道我腦中對自己的想法", scene:"SEL劇情線（真實例句）"}
    ]
  },

  // ══ 固定用語 ══

  {
    id:"g14", cat:"phrase", level:"a1a2",
    title:"No pasa nada：沒關係、沒事",
    rule:"字面意思「什麼都沒發生」，是西語最高頻的安慰語之一。",
    examples:[
      {es:"No pasa nada. Sólo es barro.", zh:"沒關係，只是泥巴而已。"},
      {es:"No pasa nada, yo te ayudo.", zh:"沒關係，我來幫你。"},
      {es:"Lo siento. No pasa nada.", zh:"對不起。——沒關係。"}
    ],
    trap:"超萬用！道歉回應、安慰他人、自我寬解都能用，記起來終身受益！",
    source:"E1·S9"
  },

  {
    id:"g15", cat:"phrase", level:"a1a2",
    title:"No te preocupes：不要擔心",
    rule:"preocuparse = 讓自己擔心起來；no te preocupes = 別讓自己擔心。對「你」說不要擔心。",
    examples:[
      {es:"No te preocupes, entre todos lo encontraremos.", zh:"不要擔心，我們大家一起會找到的。"},
      {es:"No te preocupes por el examen.", zh:"不要為考試擔心。"},
      {es:"No te preocupes, todo va a salir bien.", zh:"不要擔心，一切都會順利的。"}
    ],
    trap:"正式場合用：No se preocupe（對 usted）；跟朋友/家人用 No te preocupes",
    source:"E2·S4"
  },

  {
    id:"g16", cat:"phrase", level:"a1a2",
    title:"直接下指令（對你說）",
    rule:"對「你」直接下指令：直接用動詞「他/她」的形式就行了，就像英文命令句去掉 You 一樣。",
    examples:[
      {es:"Respira hondo.", zh:"深呼吸。（respirar → respira）"},
      {es:"Tose.", zh:"咳嗽。（toser → tose）"},
      {es:"Abre la boca, por favor.", zh:"請張開嘴巴。（abrir → abre）"}
    ],
    trap:"否定說法完全不同：No abras la boca（不要張嘴）。例外：ir→ve, ser→sé, hacer→haz",
    source:"E3·S8"
  },

  {
    id:"g17", cat:"verb-pattern", level:"a1a2",
    title:"Sentir：感受情緒動詞",
    rule:"sentir（感受、覺得）用於描述情緒感受。常見句型：¿Cómo te sientes?（妳覺得怎麼樣？）",
    examples:[
      {es:"¿Cómo te sientes?", zh:"妳現在覺得怎麼樣？"},
      {es:"Me siento triste.", zh:"我覺得難過。"},
      {es:"Se siente sola.", zh:"她覺得孤單。"}
    ],
    trap:"sentir（感受到某事）vs sentirse（自身狀態）：日常口語 me siento 最常用",
    source:"媽媽語塊 ATM·SEL",
    conj:{
      verb:"sentir（感受／覺得）",
      rows:[
        {person:"yo",         form:"siento",   ex:"Me siento bien.",    zh:"我覺得很好。"},
        {person:"tú",         form:"sientes",  ex:"¿Cómo te sientes?",  zh:"妳覺得怎麼樣？"},
        {person:"él/ella/usted", form:"siente",   ex:"Se siente sola.",    zh:"她覺得孤單。"},
        {person:"nosotros",   form:"sentimos", ex:"Sentimos mucho.",    zh:"我們非常遺憾。"},
        {person:"ellos/ellas/ustedes", form:"sienten",  ex:"Sienten alegría.",   zh:"他們感到快樂。"}
      ]
    },
    conj_subj:{
      verb:"sentir（現在虛擬式）",
      rows:[
        {person:"yo",                  form:"sienta",    ex:"Espero que no lo sienta así.", zh:"希望她不要這樣感受。"},
        {person:"tú",                  form:"sientas",   ex:"Quiero que te sientas bien.",  zh:"我希望你覺得好一些。"},
        {person:"él/ella/usted",       form:"sienta",    ex:"Ojalá lo sienta mejor.",       zh:"希望他感覺好一點。"},
        {person:"nosotros",            form:"sintamos",  ex:"Para que lo sintamos juntos.", zh:"為了讓我們一起感受。"},
        {person:"ellos/ellas/ustedes", form:"sientan",   ex:"Espero que se sientan cómodos.",zh:"希望他們感到自在。"}
      ]
    },
    conj_impsubj:{
      verb:"sentir（過去未完成虛擬式）",
      rows:[
        {person:"yo",                  form:"sintiera",    ex:"Si lo sintiera, lo diría.",      zh:"如果我有感覺，我就說了。"},
        {person:"tú",                  form:"sintieras",   ex:"Ojalá lo sintieras también.",    zh:"要是你也有這個感受就好了。"},
        {person:"él/ella/usted",       form:"sintiera",    ex:"Como si lo sintiera de verdad.", zh:"好像他真的有感受到似的。"},
        {person:"nosotros",            form:"sintiéramos", ex:"Si lo sintiéramos juntos...",    zh:"如果我們能一起感受的話..."},
        {person:"ellos/ellas/ustedes", form:"sintieran",   ex:"Si sintieran lo mismo...",       zh:"如果他們有同樣的感受的話..."}
      ]
    },
    conj_cond:{
      verb:"sentir（條件式）",
      rows:[
        {person:"yo",                  form:"sentiría",    ex:"Yo sentiría lo mismo.",       zh:"我也會有同樣的感受。"},
        {person:"tú",                  form:"sentirías",   ex:"¿Cómo te sentirías?",         zh:"你會有什麼感受？"},
        {person:"él/ella/usted",       form:"sentiría",    ex:"Sentiría más calma.",         zh:"她會感覺更平靜。"},
        {person:"nosotros",            form:"sentiríamos", ex:"Nos sentiríamos mejor.",      zh:"我們會感覺好一些。"},
        {person:"ellos/ellas/ustedes", form:"sentirían",   ex:"Se sentirían solos.",         zh:"他們會感到孤單。"}
      ]
    }
  },

  {
    id:"g18", cat:"verb-pattern", level:"a1a2",
    title:"Vamos a + 動詞：我們來一起…",
    rule:"vamos a + 原型動詞 = let's + 動詞。也是 ir 動詞 nosotros 現在式。",
    examples:[
      {es:"Vamos a respirar.", zh:"來，我們一起深呼吸。"},
      {es:"Vamos al parque.", zh:"我們去公園吧！"},
      {es:"Vamos a comer.", zh:"我們去吃東西吧！"}
    ],
    trap:"Vamos a + 動詞原形 = let's；Vamos + 地點 = 去哪裡",
    source:"媽媽語塊 ATM·SEL",
    conj:{
      verb:"ir（去）",
      rows:[
        {person:"yo",         form:"voy",   ex:"Voy al colegio.",   zh:"我去學校。"},
        {person:"tú",         form:"vas",   ex:"¿Vas al parque?",   zh:"你去公園嗎？"},
        {person:"él/ella/usted", form:"va",    ex:"Va a casa.",         zh:"他回家去。"},
        {person:"nosotros",   form:"vamos", ex:"Vamos a jugar.",    zh:"我們去玩吧！"},
        {person:"ellos/ellas/ustedes", form:"van",   ex:"Van a la playa.",   zh:"他們去海灘。"}
      ]
    },
    conj_subj:{
      verb:"ir（現在虛擬式）",
      rows:[
        {person:"yo",                  form:"vaya",    ex:"Espero que vaya bien.",        zh:"希望一切順利。"},
        {person:"tú",                  form:"vayas",   ex:"Quiero que vayas con cuidado.",zh:"我希望你小心走。"},
        {person:"él/ella/usted",       form:"vaya",    ex:"Ojalá vaya pronto.",           zh:"希望她快點去。"},
        {person:"nosotros",            form:"vayamos", ex:"Para que vayamos juntos.",     zh:"為了讓我們一起去。"},
        {person:"ellos/ellas/ustedes", form:"vayan",   ex:"Espero que vayan bien.",       zh:"希望他們一切順利。"}
      ]
    },
    conj_impsubj:{
      verb:"ir（過去未完成虛擬式）⚠️ fuera 與 ser 同形，依上下文判斷",
      rows:[
        {person:"yo",                  form:"fuera",    ex:"Si fuera a casa...",           zh:"如果我回家的話...", note:"⚠️ fuera 與 ser 的過去虛擬式同形，依上下文判斷"},
        {person:"tú",                  form:"fueras",   ex:"Ojalá fueras allí.",           zh:"要是你去那裡就好了。"},
        {person:"él/ella/usted",       form:"fuera",    ex:"Como si fuera al trabajo.",    zh:"好像他去上班似的。"},
        {person:"nosotros",            form:"fuéramos", ex:"Si fuéramos juntos...",        zh:"如果我們一起去的話..."},
        {person:"ellos/ellas/ustedes", form:"fueran",   ex:"Si fueran con cuidado...",     zh:"如果他們小心前進的話..."}
      ]
    },
    conj_cond:{
      verb:"ir（條件式）",
      rows:[
        {person:"yo",                  form:"iría",    ex:"Yo iría contigo.",            zh:"我會和你一起去。"},
        {person:"tú",                  form:"irías",   ex:"¿Irías sin mí?",              zh:"你會不帶我就走嗎？"},
        {person:"él/ella/usted",       form:"iría",    ex:"Iría al parque.",             zh:"他會去公園。"},
        {person:"nosotros",            form:"iríamos", ex:"Iríamos de viaje.",           zh:"我們會去旅行。"},
        {person:"ellos/ellas/ustedes", form:"irían",   ex:"Irían juntos.",               zh:"他們會一起去。"}
      ]
    }
  },

  {
    id:"g19", cat:"tense", level:"a1a2",
    title:"IR + a + 動詞：從「去」長出行動路線",
    rule:"準備出門前，西語人常常先說一句「我要去做什麼」——ir的變位加上a和原形動詞，就是這句話的公式：Voy a comer.（我要吃飯了）、¿Vas a salir?（你要出去嗎）、Vamos a empezar.（我們要開始了），任何人稱都能用。voy不只是腳在移動，很多時候是「我現在決定要往那個方向走」的一個開關，人可能根本還沒動。",
    examples:[
      {es:"Todo va a salir bien.", zh:"一切都會順利的。（劇情原句：No te preocupes, todo va a salir bien.）"},
      {es:"Mamá siempre te va a cuidar.", zh:"媽媽會一直守護你喔。（🛌床邊低語呢原句）"},
      {es:"¿Vas a dormir?", zh:"你要去睡了嗎？（新編例句，目前劇情裡還沒有這句）"}
    ],
    family:{
      title:"🌿 IR + a + 動詞：不只一種畫面",
      intro:"同一個「就要...了」骨架，因為想讓對方知道的事不同，會長出不同分支——不是同義句堆疊，每句背後的溝通目的都不一樣。",
      items:[
        {es:"¡Vamos al parque!", zh:"🚶移動：單純講去哪裡，不接動詞（🛌床邊低語呢生活指令原句）"},
        {es:"Mamá siempre te va a cuidar.", zh:"🤝行動安排：持續性的承諾，不是一次性計畫（🛌床邊低語呢原句）"},
        {es:"Todo va a salir bien.", zh:"🔮結果預測：對還沒發生的結果表達安心（彈藥庫e2_04原句）"}
      ]
    },
    trap:"跟「Vamos a + 動詞」（見另一張卡）不要搞混：那張是限定「我們一起來」，這裡任何人稱都能用。ir 也能單獨表示「去某地點」：Voy al parque.（我要去公園）——後面接地點、不接動詞。六人稱完整變位可到🌀超級變變變查 ir。",
    crossLang:"快速對接：IR + a + 動詞＝<br>英文：be going to<br>台語：欲（beh）<br>我欲食（Guá beh tsia̍h）→ 華語：我要吃了<br>客語：愛（oi）<br>𠊎愛食（Ngài oi sṳt）<br>四種語言都在講『即將要做的事』，一秒對上！",
    source:"🛌床邊低語呢（生活指令）／🛌床邊低語呢（core安全感）／彈藥庫e2_04／文法補充",
    storyRoles:[
      {es:"¡Vamos al parque!", semanticRole:"movement", communicationGoal:"我想讓對方知道我要去哪裡", scene:"🛌床邊低語呢／生活指令（mom.js真實tag，真實例句）"},
      {es:"Todo va a salir bien.", semanticRole:"prediction", communicationGoal:"我想讓對方放心、感到安慰", scene:"情緒支持／安慰對話（彈藥庫e2_04真實語境）"},
      {es:"Mamá siempre te va a cuidar.", semanticRole:"action-plan", communicationGoal:"我想讓對方知道我會一直守護你", scene:"bedtime（mom.js真實scene欄位）"}
    ]
  },

  {
    id:"g20", cat:"verb-pattern", level:"a1a2",
    title:"TENER：從「有」長出我的生活狀態",
    rule:"中文會說「我餓了」，英文會說「I am hungry」；西語常用tener hambre，像是在說「我有一種餓的狀態」。同樣的講法延伸到很多身體感受、心情、時間狀態：tener sueño（想睡）、tener miedo（害怕）、tener prisa（趕時間），連年紀（tener ___ años）也是這樣講。",
    examples:[
      {es:"Nita tiene mucho sueño.", zh:"妮妲很想睡。（劇情原句，E7）"},
      {es:"Mamá Cata tiene prisa.", zh:"貓媽媽在趕時間。（劇情原句，E7）"},
      {es:"Tito tiene seis años.", zh:"迪多六歲。（新編例句，目前劇情裡還沒有「年紀」這個用法）"}
    ],
    trap:"英文用 be（I am hungry / I am 6 years old），西語卻用 tener（有）——這是中英文母語者最容易直覺講錯的地方！",
    family:{
      title:"🌳 Tengo + 名詞 家族",
      intro:"別只背「tener」這個動詞，把整串「Tengo + 名詞」的固定搭配當一個家族背起來——中文說「我很餓/我好睏」，西語會說Tengo hambre/Tengo sueño，是同一組講法。",
      items:[
        {es:"Tengo hambre.", zh:"我餓了。"},
        {es:"Tengo sed.", zh:"我渴了。"},
        {es:"Tengo sueño.", zh:"我想睡了。"},
        {es:"Tengo frío.", zh:"我冷了。"},
        {es:"Tengo calor.", zh:"我熱了。"},
        {es:"Tengo miedo.", zh:"我害怕。（es：tener + 名詞 = 感到某種狀態）"},
        {es:"Tengo razón.", zh:"我是對的。"},
        {es:"Tengo prisa.", zh:"我在趕時間。"},
        {es:"Tengo tiempo.", zh:"我有空。"},
        {es:"Tengo suerte.", zh:"我很幸運。"},
        {es:"Tengo ganas de bailar.", zh:"我想跳舞。（tener ganas de + 原形動詞＝想做某事）"}
      ]
    },
    source:"劇情E4（擁有）／劇情E7（身體感受/情緒/時間管理，整集示範）／彈藥庫e4_03／🛌床邊低語呢（TENER家族）／文法補充（年紀用法為新編）",
    storyRoles:[
      {es:"Nita y Tito tienen una hermana nueva.", semanticRole:"possession", communicationGoal:"我想讓對方知道我擁有/多了什麼", scene:"E4劇情（真實例句）"},
      {es:"Nita tiene mucho sueño.", semanticRole:"physical-state", communicationGoal:"我想讓對方知道我身體上的感受", scene:"E7劇情（真實例句）"},
      {es:"Mamá Cata tiene prisa.", semanticRole:"time-state", communicationGoal:"我想讓對方知道我現在的時間處境", scene:"E7劇情（真實例句）"},
      {es:"Kito tiene miedo de llegar tarde.", semanticRole:"emotional-state", communicationGoal:"我想讓對方知道我的心裡感受", scene:"E7劇情（真實例句）"}
    ],
    conj:{
      verb:"tener（有）",
      rows:[
        {person:"yo",         form:"tengo",   ex:"Tengo hambre.",         zh:"我肚子餓了。"},
        {person:"tú",         form:"tienes",  ex:"¿Cuántos años tienes?", zh:"你幾歲？"},
        {person:"él/ella/usted", form:"tiene",   ex:"Tiene sueño.",          zh:"他想睡覺了。"},
        {person:"nosotros",   form:"tenemos", ex:"Tenemos frío.",        zh:"我們很冷。"},
        {person:"ellos/ellas/ustedes", form:"tienen",  ex:"Tienen miedo.",         zh:"他們害怕。"}
      ]
    },
    conj_subj:{
      verb:"tener（現在虛擬式）",
      rows:[
        {person:"yo",                  form:"tenga",    ex:"Espero que tenga tiempo.",      zh:"希望她有時間。"},
        {person:"tú",                  form:"tengas",   ex:"Quiero que tengas cuidado.",    zh:"我希望你小心。"},
        {person:"él/ella/usted",       form:"tenga",    ex:"Ojalá tenga suerte.",           zh:"希望他幸運。"},
        {person:"nosotros",            form:"tengamos", ex:"Para que tengamos paciencia.",  zh:"為了讓我們有耐心。"},
        {person:"ellos/ellas/ustedes", form:"tengan",   ex:"Espero que tengan energía.",    zh:"希望他們有精力。"}
      ]
    },
    conj_impsubj:{
      verb:"tener（過去未完成虛擬式）",
      rows:[
        {person:"yo",                  form:"tuviera",    ex:"Si tuviera dinero...",           zh:"如果我有錢的話..."},
        {person:"tú",                  form:"tuvieras",   ex:"Ojalá tuvieras tiempo.",         zh:"要是你有時間就好了。"},
        {person:"él/ella/usted",       form:"tuviera",    ex:"Si tuviera miedo, lo diría.",    zh:"如果他害怕，他就說了。"},
        {person:"nosotros",            form:"tuviéramos", ex:"Si tuviéramos más tiempo...",    zh:"如果我們有更多時間的話..."},
        {person:"ellos/ellas/ustedes", form:"tuvieran",   ex:"Si tuvieran hambre, comerían.", zh:"如果他們餓了，就會吃了。"}
      ]
    },
    conj_cond:{
      verb:"tener（條件式）⚠️ 不規則詞幹 tendr-",
      rows:[
        {person:"yo",                  form:"tendría",    ex:"Yo tendría miedo también.",   zh:"我也會害怕的。", note:"⚠️ 不規則詞幹 tendr-（不是 tener-）"},
        {person:"tú",                  form:"tendrías",   ex:"¿Tendrías tiempo mañana?",    zh:"你明天有時間嗎？"},
        {person:"él/ella/usted",       form:"tendría",    ex:"Tendría más cuidado.",        zh:"他會更加小心。"},
        {person:"nosotros",            form:"tendríamos", ex:"Tendríamos que salir.",       zh:"我們就得出發了。"},
        {person:"ellos/ellas/ustedes", form:"tendrían",   ex:"Tendrían hambre.",            zh:"他們會餓的。"}
      ]
    }
  },

  {
    id:"g21", cat:"word-order", level:"a1a2",
    title:"形容詞位置：放在名詞後面",
    rule:"跟英文相反，西語的形容詞通常放在被形容的名詞之後。例如：la casa blanca（那棟白色的房子，直譯「房子 白色的」）。",
    examples:[
      {es:"Tienes una hermana mayor.", zh:"你有一個大姊姊。（劇情原句，mayor 放在 hermana 後面）"},
      {es:"Tenemos una casa nueva.", zh:"我們有了一棟新房子。（劇情原句，nueva 放在 casa 後面）"},
      {es:"Mimi es una niña feliz.", zh:"咪咪是個快樂的女孩。（新編例句，feliz 放在 niña 後面）"}
    ],
    trap:"少數常見形容詞（bueno好／malo壞／grande大／primero第一／otro其他）常放在名詞前面，且陽性單數名詞前會省略字尾（buen, mal, gran）——先抓住「大部分放後面」這個大原則，例外之後再慢慢熟悉。",
    crossLang:"這個「性別詞放名詞後面」的邏輯，台語（雞母 ke-bó／雞公 ke-kang／狗公 káu-kang）跟客語（雞嫲 gai-mâ／蝦公 ha-gûng）處理動物性別時也完全一樣，跟西語 gato macho／gato hembra 是同一套語序！",
    source:"彈藥庫 e4_03（前兩句）／文法補充（第三句為新編）"
  },

  {
    id:"g22", cat:"gender", level:"a1a2",
    title:"可鹽可甜（有規矩？）：西語名詞陰陽性",
    rule:"奇異世界：el＝陽性／la＝陰性，連不會動的死物也不放過。<br><br>①能量感——El 像太陽（發散、直接），La 像月亮（包容、承載）。<br>②形狀感——El 常對應延伸／支撐／工具，La 常對應凹槽／容器／收納空間。",
    examples:[
      {es:"El sol brilla mucho hoy.", zh:"今天太陽很亮。（陽性：太陽，發散的能量）"},
      {es:"La luna es hermosa.", zh:"月亮很美。（陰性：月亮，包容的能量）"},
      {es:"La llave está en la mesa.", zh:"鑰匙在桌上。（陰性：llave 鑰匙／mesa 桌子，都是「容器／承載空間」意象）"},
      {es:"El camino es largo.", zh:"這條路很長。（陽性：camino 路，「延伸／支撐」意象）"}
    ],
    trap:"叛逆名詞：長得甜（-a 結尾）骨子裡是鹽——el mapa（地圖）、el día（日子）、el problema（問題）。真正屬於「-ma 希臘字源陽性字群」的只有 problema，跟 programa／sistema／clima／tema 同掛；día、mapa 純粹字尾巧合，各自獨立，別混為一談。<br><br>長得鹽（-o 或子音結尾）骨子裡是甜的：la mano（手）、la flor（花）。<br><br>規矩藏在能量感／形狀感的直覺裡，不是死板字尾規則。",
    crossLang:"台客語同一套氣場：公／牯＝太陽，發散、能量源頭；母／嫲＝月亮，包容、孕育、承載空間，跟西語 El／La 對得上。<br><br>形狀感也一樣：台語「螺絲母」＝螺帽，凹槽收納，呼應 la llave／la puerta／la caja；el lápiz／el puente／el árbol／el camino 這種延伸支撐的工具感，也貼著台客語「公／牯」的陽性直覺。",
    source:"文法補充"
  },

  {
    id:"g23", cat:"verb-pattern", level:"b1",
    title:"Andar + 現在分詞：拉美口語版的「正在」",
    rule:"andar（原意：走動、漫步）+ 動詞字尾改 -ando／-iendo，是拉美口語很愛用的「正在做」，比 estar + -ando 多一種『這陣子到處瞎忙、斷斷續續在做』的語感，不是單純陳述當下正在做。",
    examples:[
      {es:"¿Qué andas haciendo?", zh:"你在忙什麼？（口語常用，也帶點「你又在搞什麼鬼」的語氣）"},
      {es:"Ando buscando trabajo.", zh:"我這陣子都在到處找工作。（斷斷續續、還沒找到）"},
      {es:"Ando pensando en eso.", zh:"我這陣子一直在想那件事。"}
    ],
    trap:"andar + 現在分詞只能搭配「主動做的動作動詞」，不能用在狀態/轉變動詞上（例如不會說 ando siendo，因為 ser 是狀態動詞）。跟 estoy buscando 比，ando buscando 多了「到處/斷斷續續/還沒個結果」的感覺。",
    source:"文法補充",
    conj:{
      verb:"andar（走動；口語進行式）",
      rows:[
        {person:"yo",         form:"ando",    ex:"Ando cansada.",        zh:"我這陣子很累。"},
        {person:"tú",         form:"andas",   ex:"¿Qué andas haciendo?", zh:"你在忙什麼？"},
        {person:"él/ella/usted", form:"anda", ex:"Anda buscando piso.",  zh:"他這陣子在到處找房子。"},
        {person:"nosotros",   form:"andamos", ex:"Andamos de viaje.",    zh:"我們這陣子在到處旅行。"},
        {person:"ellos/ellas/ustedes", form:"andan", ex:"Andan diciendo tonterías.", zh:"他們一直到處亂講些有的沒的。"}
      ]
    },
    conj_subj:{
      verb:"andar（現在虛擬式）",
      rows:[
        {person:"yo",                  form:"ande",    ex:"No quiero que ande buscando problemas.", zh:"我不希望他到處惹麻煩。"},
        {person:"tú",                  form:"andes",   ex:"Espero que andes bien.",                 zh:"希望你一切順利。"},
        {person:"él/ella/usted",       form:"ande",    ex:"Ojalá no ande tan cansada.",             zh:"希望她不要這麼累。"},
        {person:"nosotros",            form:"andemos", ex:"Para que andemos con cuidado.",          zh:"為了讓我們謹慎行事。"},
        {person:"ellos/ellas/ustedes", form:"anden",   ex:"No creo que anden diciendo eso.",        zh:"我不認為他們到處這樣說。"}
      ]
    },
    conj_impsubj:{
      verb:"andar（過去未完成虛擬式）",
      rows:[
        {person:"yo",                  form:"anduviera",    ex:"Si anduviera por ahí...",            zh:"如果我在那附近到處走的話..."},
        {person:"tú",                  form:"anduvieras",   ex:"Ojalá anduvieras más despacio.",     zh:"要是你走慢一點就好了。"},
        {person:"él/ella/usted",       form:"anduviera",    ex:"Como si anduviera perdido.",         zh:"好像他迷路了似的。"},
        {person:"nosotros",            form:"anduviéramos", ex:"Si anduviéramos juntos...",          zh:"如果我們一起走的話..."},
        {person:"ellos/ellas/ustedes", form:"anduvieran",   ex:"Si anduvieran con cuidado...",       zh:"如果他們謹慎行事的話..."}
      ]
    },
    conj_cond:{
      verb:"andar（條件式）",
      rows:[
        {person:"yo",                  form:"andaría",    ex:"Yo andaría más despacio.",        zh:"我會走慢一點。"},
        {person:"tú",                  form:"andarías",   ex:"¿Andarías por allí?",             zh:"你會在那附近到處走嗎？"},
        {person:"él/ella/usted",       form:"andaría",    ex:"Andaría buscando soluciones.",    zh:"她會到處找解決方法。"},
        {person:"nosotros",            form:"andaríamos", ex:"Andaríamos de aventura.",         zh:"我們會到處冒險。"},
        {person:"ellos/ellas/ustedes", form:"andarían",   ex:"Andarían por el barrio.",         zh:"他們會在街區附近走動。"}
      ]
    }
  },

  {
    id:"g24", cat:"phrase", level:"b1",
    title:"Ahorita：拉美人的彈性時間感",
    rule:"課本教的「現在」是 ahora，但拉美日常（尤其墨西哥、哥倫比亞、中美洲）更常聽到「小現在」ahorita——字面是 ahora 加小稱字尾，意思卻彈性到嚇人：可能是『現在立刻』、『等一下下』、『幾小時後』，甚至是『再說吧（其實不太想做）』。",
    examples:[
      {es:"Ahorita voy.", zh:"我現在就去。（也可能只是說說，等一下才去，看語氣和場合）"},
      {es:"Ahorita te llamo.", zh:"我等一下打給你。（時間感因人而異）"},
      {es:"Ahoritita mismo.", zh:"真的立刻馬上。（ahoritita 是加強版，強調真的是現在）"}
    ],
    trap:"跟拉美朋友約時間如果聽到 ahorita，不要照字面當「馬上」——這是拉美文化裡「禮貌又不把話說死」的萬用時間詞，答應得越快，有時候反而是越委婉的「再說」。",
    source:"文法補充"
  },

  {
    id:"g25", cat:"phrase", level:"b1",
    title:"¿Qué tal?：字面翻譯會誤導的招呼語",
    rule:"教科書常把 ¿Qué tal? 直接翻成「你好」，但字面意思其實是「最近如何？／近來怎樣？」——是在問對方的近況，不是單純打招呼的空話，回答時通常會真的簡短說一下近況。",
    examples:[
      {es:"¿Qué tal?", zh:"最近如何？"},
      {es:"¿Qué tal todo?", zh:"一切都還好嗎？"},
      {es:"¿Qué tal la familia?", zh:"家人都好嗎？"}
    ],
    trap:"字面直翻成「你好」會讓妳漏掉這句其實在「問近況」的語感——這種「字面翻譯 vs 實際功能」的落差，教科書很少特別提醒，但很影響妳聽懂對方語氣。",
    source:"文法補充"
  },

  {
    id:"g26", cat:"phrase", level:"b1",
    title:"Vale：西班牙很愛講，拉美卻少見",
    rule:"Vale（好、OK，源自動詞 valer「值得」）是西班牙日常對話裡超高頻的詞，但在拉美很多地方反而少講，各地有自己愛用的說法：阿根廷愛講 dale，哥倫比亞／中美洲愛講 listo。",
    examples:[
      {es:"Vale, nos vemos mañana.", zh:"好，我們明天見。（西班牙）"},
      {es:"Dale, nos vemos mañana.", zh:"好，我們明天見。（阿根廷）"},
      {es:"Listo, nos vemos mañana.", zh:"好，我們明天見。（哥倫比亞／中美洲）"}
    ],
    trap:"西班牙人講 Vale，拉美人一聽就知道妳學的是「西班牙腔」——這個網站教的是拉美西語，日常回應優先練 dale／listo／va，Vale 認得就好，不用當成自己的預設用語。",
    source:"文法補充"
  },

  // ══ 虛擬語氣（Subjuntivo） ══

  {
    id:"g27", cat:"subjunctive", level:"b1",
    title:"虛擬語氣入門：WEIRDO觸發詞",
    rule:"主要子句是「願望／情緒／非人稱評論／請求／懷疑或否定／Ojalá」這六類，而且**主要子句的主詞跟後面子句的主詞不一樣**時，que 後面的動詞要變成虛擬式（不是陳述式）。如果主詞相同，直接用原形動詞就好，不用 que + 虛擬式。",
    examples:[
      {es:"No creo que Nita esté cansada.", zh:"我不認為妮妲累了。（否定信念 D=Doubt/Denial，觸發虛擬式 esté）"},
      {es:"¡Que tengas un buen día!", zh:"祝你有美好的一天！（Ojalá/O 類，Espero que 的省略版）"},
      {es:"A mí me pone de mal humor que la gente haga ruido en el teatro.", zh:"有人在劇院裡製造噪音讓我心情不好。（情緒 E=Emotions，主詞是「我」但吵鬧的是「別人」，主詞不同才觸發虛擬式 haga）"}
    ],
    mnemonic:{
      icon:"🌪️", word:"WEIRDO", side:"subj",
      desc:"六種會觸發虛擬式的主要子句類型",
      items:[
        {l:"W",label:"Wishes 願望",ex:"Quiero que vengas."},
        {l:"E",label:"Emotions 情緒反應",ex:"Me alegra que estés aquí."},
        {l:"I",label:"Impersonal 非人稱評論",ex:"Es importante que estudies."},
        {l:"R",label:"Requests 請求",ex:"Te pido que me ayudes."},
        {l:"D",label:"Doubt/Denial 懷疑或否定",ex:"No creo que sea verdad."},
        {l:"O",label:"Ojalá 祈願",ex:"Ojalá que tengas suerte."}
      ]
    },
    trap:"判斷關鍵不是「這句話難不難」，是**兩個子句的主詞是不是同一個人**：Quiero comer.（我想吃，同一人，用原形動詞）vs Quiero que comas.（我想要你吃，兩個不同人，用虛擬式 comas）。",
    source:"文法補充",
    conj:{
      verb:"hablar（虛擬式現在式，規則 -ar 動詞示範）",
      rows:[
        {person:"yo",         form:"hable",    ex:"Ojalá que hable bien.",           zh:"希望我表現得好。"},
        {person:"tú",         form:"hables",   ex:"Quiero que hables conmigo.",      zh:"我希望你跟我說話。"},
        {person:"él/ella/usted", form:"hable", ex:"Espero que hable pronto.",       zh:"希望他快點開口說話。"},
        {person:"nosotros",   form:"hablemos", ex:"Es importante que hablemos de esto.", zh:"我們有必要聊聊這件事。"},
        {person:"ellos/ellas/ustedes", form:"hablen", ex:"No creo que hablen español.", zh:"我不認為他們會說西語。"}
      ]
    }
  },

  {
    id:"g28", cat:"subjunctive", level:"b1",
    title:"情緒動詞句型：主詞不同才觸發虛擬式",
    rule:"句型＝(A+人稱代詞)＋間接受詞＋情緒動詞＋infinitivo/sustantivo/que+虛擬式。同一個主詞造成自己的情緒反應時，用原形動詞；情緒反應的人（我）跟造成情緒的動作主詞（別人）不同時，才用 que + 虛擬式。",
    examples:[
      {es:"A mí me pone nervioso hablar en público.", zh:"公開說話讓我很緊張。（同一主詞：是「我」自己說話讓自己緊張，用原形動詞 hablar）"},
      {es:"Me relaja escuchar el agua de un arroyo en un bosque.", zh:"在森林中聽溪水聲讓我感到放鬆。（同一主詞，用原形動詞 escuchar）"},
      {es:"Me da vergüenza hablar con desconocidos.", zh:"和陌生人說話讓我感到害羞。（同一主詞，用原形動詞 hablar）"},
      {es:"A mí me pone de mal humor que la gente haga ruido en el teatro.", zh:"有人在劇院裡製造噪音讓我心情不好。（主詞不同：情緒的人是「我」，製造噪音的是「別人 la gente」，才用 que+虛擬式 haga）"}
    ],
    trap:"前三句看起來很像句型④，但差別在「動作是誰做的」——前三句都是「我自己在做那個動作」（我自己說話/我自己聽水聲），所以用原形動詞；句型④是「別人做的動作」讓我心情不好，主詞換人了，才需要 que + 虛擬式。這是最容易搞混、也最能看出真的懂不懂虛擬式的地方。",
    source:"文法補充"
  },

  {
    id:"g29", cat:"subjunctive", level:"b1",
    title:"Ojalá (que) / ¡Que + 虛擬式!：日常祝福語小補給包",
    rule:"很多日常祝福語其實是「Espero que...」被省略掉 Espero 的簡化版——直接用 ¡Que + 虛擬式!開頭，是超高頻的口語祝福句型。Ojalá（源自阿拉伯語，字面「願真主保佑」）也一樣，後面固定接虛擬式表達願望。",
    examples:[
      {es:"¡Que tengas un buen día!", zh:"祝你有美好的一天！（Espero que tengas...的省略版）"},
      {es:"¡Que te mejores pronto!", zh:"祝你早日康復！"},
      {es:"¡Que duermas bien!", zh:"祝你睡個好覺！"},
      {es:"Ojalá que llueva pronto.", zh:"希望快點下雨。"}
    ],
    trap:"「Ojalá」後面加不加 que，兩種說法都有人講、且後面都一定要接虛擬式——網路上常聽到「拉美習慣加 que、西班牙習慣不加」的說法，但這只是母語者論壇觀察，不是查證得到的正式方言學規則，之後可以帶去問老師確認。可以確定的是：Ojalá + 原形動詞（不接 que 也不接虛擬式）不符合 RAE 規範，這個要避免。",
    source:"文法補充"
  },

  // ══ 連接詞 ══

  {
    id:"g30", cat:"connector", level:"a1a2",
    title:"porque：因為",
    rule:"porque（因為）後面一定要接「完整的一句話」（有自己的主詞+動詞），用來說明原因。跟長得很像的 por 不一樣：por 是介系詞，後面直接接名詞就好，不用整句。",
    examples:[
      {es:"Nita está cansada porque no durmió bien anoche.", zh:"妮妲很累，因為她昨晚沒睡好。"},
      {es:"Tito no quiere hablar porque tiene vergüenza.", zh:"迪多不想說話，因為他覺得害羞。"},
      {es:"No fuimos al parque porque estaba lloviendo.", zh:"我們沒去公園，因為在下雨。"}
    ],
    trap:"porque 後面接「主詞+動詞」的完整句子；如果原因只是一個名詞、不是一整句話，要換成 por + 名詞（例如 por la lluvia／因為下雨），不能說 porque la lluvia。",
    source:"文法補充"
  },

  {
    id:"g31", cat:"connector", level:"b1",
    title:"sino / sino que：否定句後的修正",
    rule:"sino 用在「前面是否定句」的情況，修正/替換成正確答案，中文常翻成「不是A而是B」。後面接名詞/形容詞/介系詞短語用 sino；後面要接一整句（有自己的主詞+動詞）就要用 sino que。",
    examples:[
      {es:"Nita no es maleducada, sino que tiene ansiedad social.", zh:"妮妲不是沒禮貌，而是有社交焦慮。（後面是完整子句，用 sino que）"},
      {es:"Esto no es un problema, sino una oportunidad.", zh:"這不是問題，而是機會。（後面只是名詞，用 sino）"},
      {es:"Tito no está enojado, sino cansado.", zh:"迪多不是生氣，而是累了。（後面是形容詞，用 sino）"}
    ],
    trap:"判斷用 sino 還是 sino que，看後面是不是一個完整句子（有自己的主詞+動詞）——有主詞+動詞用 sino que，只是名詞/形容詞/介系詞短語用 sino。sino 一定要「前面是否定句、後面在做替換/修正」才能用，這跟 pero 的單純轉折不一樣（見下一張卡對照）。",
    source:"文法補充"
  },

  {
    id:"g32", cat:"connector", level:"b1",
    title:"pero vs sino：都翻成「但是」，用法差很大",
    rule:"pero＝單純轉折（不管前面是肯定句還是否定句，就是「雖然...但是...」）；sino＝前面一定要是否定句，而且後面在「取代/糾正」被否定掉的東西，才能用。",
    examples:[
      {es:"Quiero ir, pero no tengo tiempo.", zh:"我想去，但是我沒時間。（pero：單純轉折，前面是肯定句）"},
      {es:"No quiero ir, pero lo haré por ti.", zh:"我不想去，但我會為你去做。（pero：前面雖是否定句，後面只是轉折、不是在替換前面的內容，還是用 pero）"},
      {es:"No quiero café, sino té.", zh:"我不要咖啡，而是要茶。（sino：前面否定，後面在替換掉前面被否定的東西）"}
    ],
    trap:"判斷口訣：後面的內容是不是在「取代/糾正」前面被否定掉的東西——是的話用 sino；如果只是單純語氣轉折（不管前面正負），一律用 pero。這是初學者最容易搞混的一組連接詞。",
    source:"文法補充"
  },

  // ══ 易混淆詞組 ══

  {
    id:"g33", cat:"confusable", level:"b1",
    title:"por vs para：都翻成「為了/因為」，方向完全相反",
    rule:"por 看「原因／交換／經過的路徑」——往回看，因為什麼、用什麼換、穿過哪裡；para 看「目的／對象／期限」——往前看，為了什麼、給誰、到什麼時候。",
    examples:[
      {es:"Gracias por tu ayuda.", zh:"謝謝你的幫忙。（por：原因，因為你的幫忙）"},
      {es:"Caminamos por el parque todas las tardes.", zh:"我們每天下午走過這個公園。（por：經過的路徑）"},
      {es:"Compré este regalo para Mimi.", zh:"我幫咪咪買了這個禮物。（para：接收禮物的對象）"},
      {es:"Necesito terminar esto para el viernes.", zh:"我星期五之前得完成這個。（para：期限）"}
    ],
    trap:"混淆時問自己：這是在講「為什麼發生／怎麼換來的／穿過哪裡」（por）還是「要往哪裡去／給誰／到什麼時候」（para）？口訣：por＝因為，para＝為了。",
    source:"文法補充"
  },

  {
    id:"g34", cat:"confusable", level:"b1",
    title:"saber vs conocer：都翻成「知道」，一個是資訊一個是熟悉感",
    rule:"saber＝知道「事實／資訊／怎麼做」（saber + 原形動詞＝會做某事）；conocer＝「認識／熟悉」人、地方、事物，強調本人親自接觸過的熟悉感。",
    examples:[
      {es:"Nita sabe hablar español.", zh:"妮妲會說西語。（saber+原形動詞：知道怎麼做某事）"},
      {es:"¿Sabes qué hora es?", zh:"你知道現在幾點嗎？（saber：知道事實／資訊）"},
      {es:"Conozco a Vera Oveja desde hace mucho tiempo.", zh:"我認識薇拉羊很久了。（conocer：認識人）"},
      {es:"¿Conoces esta ciudad?", zh:"你熟悉這座城市嗎？（conocer：對地方熟悉、去過）"}
    ],
    trap:"認識「人」一定要用 conocer，而且受詞是人時前面要加 a（conocer a alguien）——這是中文母語者最容易漏掉的地方，Sé a Vera 是錯的，要說 Conozco a Vera。",
    source:"文法補充"
  },

  {
    id:"g35", cat:"confusable", level:"b1",
    title:"pedir vs preguntar：中文都是「問」，西語看你是在要東西還是要答案",
    rule:"pedir＝「要／請求」得到東西或請對方做動作（pedir algo／pedir que + 虛擬式）；preguntar＝「問」問題、尋求資訊（preguntar algo／preguntar si...）。",
    examples:[
      {es:"Tito pide un vaso de agua.", zh:"迪多要一杯水。（pedir：要求／索取東西）"},
      {es:"Le pido a Nita que me ayude.", zh:"我請妮妲幫我。（pedir + que + 虛擬式：請求對方做動作，呼應WEIRDO口訣裡的R=Requests）"},
      {es:"Nita pregunta dónde está el gato.", zh:"妮妲問貓在哪裡。（preguntar：問問題，尋求資訊）"},
      {es:"Voy a preguntarle su nombre.", zh:"我要去問他的名字。（preguntar：問資訊）"}
    ],
    trap:"中文都會說「問」，但西語要先分清楚：是在「要東西／請對方做動作」（pedir）還是「單純問問題找答案」（preguntar）——搞混這兩個是中文母語者最常見的錯誤之一。",
    source:"文法補充"
  },

  // ══ B2 成語語塊 ══

  {
    id:"g36", cat:"phrase", level:"b2c1",
    title:"Darle vueltas a algo：鑽牛角尖",
    rule:"字面「把某件事轉來轉去」，意思是反覆思考同一件事、停不下來地一直想，中文的「鑽牛角尖」剛好對得上。",
    examples:[
      {es:"Deja de darle vueltas a lo mismo.", zh:"別再鑽牛角尖想同一件事了。"},
      {es:"Llevo todo el día dándole vueltas a este problema.", zh:"我一整天都在反覆想這個問題。"},
      {es:"No le des más vueltas, ya está decidido.", zh:"別再想了，已經決定了。"}
    ],
    trap:"常跟 dejar de（停止）或 no + 命令式 一起用，勸別人別再鑽牛角尖時很好用：Deja de darle vueltas / No le des más vueltas。",
    source:"文法補充"
  },

  {
    id:"g37", cat:"phrase", level:"b2c1",
    title:"Estar de brazos cruzados：袖手旁觀",
    rule:"字面「雙手交叉站著」，意思是什麼都不做、袖手旁觀，帶一點批評對方該行動卻沒行動的語氣。",
    examples:[
      {es:"No podemos quedarnos de brazos cruzados.", zh:"我們不能袖手旁觀。"},
      {es:"Él siempre está de brazos cruzados cuando hay trabajo.", zh:"每次有工作要做，他總是在那邊什麼都不做。"},
      {es:"Ante esta situación, no hay que estar de brazos cruzados.", zh:"面對這種情況，不該袖手旁觀。"}
    ],
    trap:"常跟 quedarse 連用（quedarse de brazos cruzados），比單純的 estar 多一種「明明可以做點什麼卻選擇不做」的批評語氣。",
    source:"文法補充"
  },

  {
    id:"g38", cat:"phrase", level:"b2c1",
    title:"Hacer la vista gorda：睜一隻眼閉一隻眼",
    rule:"字面「把視線變模糊」，意思是故意忽視某件事、睜一隻眼閉一隻眼，跟英文 turn a blind eye 是同一種「眼睛」隱喻，兩種語言剛好對得上。",
    examples:[
      {es:"El profesor hizo la vista gorda con la tarea tarde.", zh:"老師對遲交的作業睜一隻眼閉一隻眼。"},
      {es:"A veces hay que hacer la vista gorda con los pequeños errores.", zh:"有時候對小錯誤要睜一隻眼閉一隻眼。"},
      {es:"No podemos seguir haciendo la vista gorda con esto.", zh:"我們不能再對這件事視而不見了。"}
    ],
    trap:"固定跟 con（對於...）連用：hacer la vista gorda con algo，後面接被忽視的那件事。",
    source:"文法補充"
  },

  {
    id:"g39", cat:"phrase", level:"b1",
    title:"Caer bien / caer mal：第一印象好壞",
    rule:"caer 字面是「掉落」，但 caer bien/mal a alguien 是形容某人給你的印象好或差——句型結構跟 gustar 一樣是「反過來說」：造成印象的人是主詞，不是「我」。",
    examples:[
      {es:"Nita me cae muy bien.", zh:"我對妮妲印象很好。（字面：妮妲讓我覺得很好）"},
      {es:"Ese chico me cae mal.", zh:"我對那個男生印象不好。"},
      {es:"Me cae gordo.", zh:"我看他不順眼。（拉美口語，比 cae mal 更直接、更帶情緒）"}
    ],
    trap:"跟 gustar 句型結構一模一樣（間接受詞 + 動詞 + 主詞）：問自己「是誰造成這個印象？」，那個人才是文法上的主詞，不是「我」。",
    source:"文法補充"
  },

  {
    id:"g40", cat:"phrase", level:"b2c1",
    title:"Ponerse las pilas：打起精神、加把勁",
    rule:"字面「幫自己裝上電池」，意思是打起精神、振作起來、加把勁去做某件事。",
    examples:[
      {es:"¡Ponte las pilas, el examen es mañana!", zh:"打起精神！明天就要考試了！"},
      {es:"Tienes que ponerte las pilas con este proyecto.", zh:"你得對這個計畫更認真加把勁。"},
      {es:"Vamos a ponernos las pilas.", zh:"我們一起打起精神吧。"}
    ],
    trap:"反身動詞 ponerse，字尾要跟著主詞變（ponte/ponerte/ponernos）——對「你」下命令時最常聽到的是 ¡Ponte las pilas!",
    source:"文法補充"
  },

  {
    id:"g41", cat:"verb-pattern", level:"b1",
    title:"Echar：萬用動詞，意思看後面接什麼",
    rule:"echar 字面是「丟、扔」，但西語日常有好幾組固定搭配延伸出去，意思差很大，是典型的「萬用動詞」——一定要看後面接什麼才能確定意思。",
    examples:[
      {es:"Echaron a Tito del equipo.", zh:"迪多被踢出隊了。（echar a alguien de... ＝開除/趕走）"},
      {es:"¿Me echas un poco de agua?", zh:"可以幫我倒一點水嗎？（echar ＝倒/加）"},
      {es:"Echo de menos a mi familia.", zh:"我想念我的家人。（echar de menos ＝想念）"}
    ],
    trap:"echar 本身意思很廣（丟/倒/放/趕），不能只背「echar=丟」就套用所有句子——重點是記住整組固定搭配（echar a alguien／echar de menos），把它們當語塊背，不要拆開單獨背 echar。",
    source:"文法補充"
  },

  {
    id:"g42", cat:"verb-pattern", level:"b1",
    title:"Quedar en algo：約定好、講好",
    rule:"quedar 本身有「剩下／留下／變成」等意思，但 quedar en + 事情／quedar en que... 是固定搭配，意思是雙方「約定好、講好」要做某件事。",
    examples:[
      {es:"Quedamos en vernos a las cinco.", zh:"我們約好五點見面。"},
      {es:"¿En qué quedamos?", zh:"我們到底講好了什麼？（釐清之前的約定）"},
      {es:"Quedé en llamarte esta noche.", zh:"我說好今晚會打給你。"}
    ],
    trap:"這個 quedar en 跟「quedarse（留下，反身動詞）」是不同用法，不要搞混——quedar en 重點在「en」後面接的是約定的內容。",
    source:"文法補充"
  },

  // ══ B2 詞彙清單 ══

  {
    id:"g43", cat:"vocab", level:"b2c1",
    title:"B2心理形容詞：描述複雜情緒與心理狀態",
    rule:"A1-A2 常用的情緒字（feliz開心/triste難過）不夠用了，B2 需要更精準描述複雜心理狀態的形容詞——這些字幾乎都搭配 estar 或 sentirse（感覺起來），不是 ser，因為講的是暫時的心理狀態，不是永久本質。",
    examples:[
      {es:"Cata se siente agobiada por tantas tareas.", zh:"卡妲被那麼多待辦事項壓得喘不過氣。"},
      {es:"Nita está harta de repetir lo mismo.", zh:"妮妲受夠了一直重複同樣的事。"},
      {es:"Me siento inseguro cuando hablo en público.", zh:"我在公開演講時覺得沒有安全感。"}
    ],
    family:{
      title:"🧠 B2心理形容詞小詞庫",
      intro:"字尾要跟主詞的陰陽性一致（agobiado／agobiada），這裡列的是陽性預設形，實際用時記得改字尾。",
      items:[
        {es:"agobiado", zh:"壓得喘不過氣、心力交瘁（陰性：agobiada）"},
        {es:"decepcionado", zh:"失望（陰性：decepcionada）"},
        {es:"exigente", zh:"要求很高、嚴格（字尾不分陰陽性）"},
        {es:"indiferente", zh:"漠不關心、無所謂（字尾不分陰陽性）"},
        {es:"frustrado", zh:"挫折、灰心（陰性：frustrada）"},
        {es:"estresado", zh:"壓力大（陰性：estresada）"},
        {es:"inseguro", zh:"沒有安全感、不自信（陰性：insegura）"},
        {es:"harto", zh:"受夠了、厭煩（陰性：harta）"}
      ]
    },
    trap:"這些形容詞常跟 estar／sentirse 搭配，不是 ser——因為都是暫時的心理狀態，不是永久本質，跟💎☁️是・在對照站的 ESTAR 用法一致。",
    source:"文法補充"
  },

  {
    id:"g44", cat:"vocab", level:"b2c1",
    title:"B2社會時事詞彙",
    rule:"日常對話升級到能討論社會議題的B2詞彙——這些字常出現在新聞、社群討論、對社會現象發表意見的場合。",
    examples:[
      {es:"El peatón cruzó la calle con cuidado.", zh:"行人小心地過了馬路。"},
      {es:"Todo ciudadano tiene derecho a la igualdad.", zh:"每個公民都有平等的權利。"},
      {es:"Este tema se ha vuelto una gran polémica.", zh:"這個議題變成很大的爭議。"}
    ],
    family:{
      title:"🏛️ B2社會時事詞小詞庫",
      intro:"這些字單獨背意義不大，重點是能組進句子裡討論社會議題——挑幾個試著自己造句看看。",
      items:[
        {es:"peatón", zh:"行人"},
        {es:"ciudadano", zh:"公民"},
        {es:"polémica", zh:"爭議"},
        {es:"prejuicio", zh:"偏見"},
        {es:"igualdad", zh:"平等"},
        {es:"desempeñar", zh:"擔任、發揮（...作用/角色）"},
        {es:"ocio", zh:"休閒"}
      ]
    },
    trap:"desempeñar 幾乎都跟「un papel／un rol」連用（desempeñar un papel importante＝扮演重要角色），記整組固定搭配比單獨背這個動詞更好用。",
    source:"文法補充"
  },

  // ══ 拉美文化小卡 ══

  {
    id:"g45", cat:"phrase", level:"b1",
    title:"打招呼與拜訪禮節：入境隨俗小提醒",
    rule:"拉美的問候禮儀比表面看起來複雜——例如「眼神接觸」不是單純「有禮貌」的規定式禮節，在跨社會地位／年齡的情境下，直視反而可能被解讀成挑釁，這點跟東亞「對長輩避免直視」的邏輯有共通之處，不是「眼神接觸＝尊重」這麼簡單。拜訪別人家時，進門先問候是基本禮貌，這點跟台灣習慣很像；日常聊天如果不熟，通常會避開政治話題。",
    examples:[
      {es:"¡Buenas! ¿Cómo están todos?", zh:"大家好！大家都好嗎？（拜訪時進門先問候）"},
      {es:"Mucho gusto en conocerlo.", zh:"很高興認識您。（正式場合的問候語）"},
      {es:"Prefiero no hablar de política en la mesa.", zh:"我比較不想在餐桌上聊政治。（日常聊天常見的迴避話題）"}
    ],
    trap:"握手／擁抱因地區和熟悉度而異，沒有單一標準；眼神接觸也不是「越直視越有禮貌」，在某些情境下（跨輩分／地位）反而要拿捏分寸，跟台灣「對長輩不要一直盯著看」的直覺其實有共通點。",
    source:"文法補充"
  },

  {
    id:"g46", cat:"phrase", level:"b1",
    title:"各國口頭禪對照",
    rule:"拉美西語不是統一腔調，各國有自己愛用的口頭禪——這是額外認識文化差異用的補充知識，角色台詞仍維持「泛拉美中性詞」，不會因為這張卡就讓角色忽然講出某個特定國家的腔調。",
    examples:[
      {es:"Este... no sé qué decir.", zh:"呃...我不知道要說什麼。（墨西哥常見口頭禪 Este...，類似中文的「這個...」）"},
      {es:"¿Viste? Te lo dije.", zh:"你看到了吧？我早就跟你說了。（阿根廷常用 ¿Viste?，確認對方有沒有注意到）"},
      {es:"¡Dale, vamos!", zh:"好，走吧！（Dale：拉美通用的肯定語，「好/來吧」）"}
    ],
    family:{
      title:"🗺️ 各國口頭禪小地圖",
      intro:"這些是文化知識補充，不是要妳學會每個國家的腔調——認得、聽得懂就好。",
      items:[
        {es:"Este...", zh:"墨西哥：「這個...」的口頭禪墊詞"},
        {es:"Che / ¿Viste?", zh:"阿根廷：「欸／你看吧」的口頭禪"},
        {es:"...po", zh:"智利：句尾常加的語氣詞，類似中文的「啦」"},
        {es:"Pues", zh:"哥倫比亞：句子常見的墊詞"},
        {es:"Dale", zh:"拉美通用肯定語：好、來吧"},
        {es:"Ya", zh:"通用肯定語：好了、可以"},
        {es:"¡Ándale!", zh:"墨西哥：加油／快點／就是這樣"}
      ]
    },
    trap:"這些是文化知識補充，角色台詞維持「泛拉美中性詞」（如 Dale／Listo／Genial），不會因為這張卡就讓角色忽然講出某個特定國家的腔調。",
    source:"文法補充"
  },

  {
    id:"g47", cat:"phrase", level:"b1",
    title:"一詞多義地雷：同一個字，各地意思差很大",
    rule:"有些西語字看起來一樣，在不同國家意思天差地遠，甚至從「可愛的」變成「粗俗的」，跨國溝通時要特別小心。",
    examples:[
      {es:"La guagua se durmió en el coche.", zh:"嬰兒在車上睡著了。（智利／秘魯：guagua＝嬰兒，源自蓋丘亞語）"},
      {es:"Espera la guagua en la parada.", zh:"在站牌等公車。（古巴／波多黎各／加那利群島：guagua＝公車）"},
      {es:"¿Me puedes coger ese libro?", zh:"可以幫我拿那本書嗎？（哥倫比亞：coger＝普通的「拿」，但在墨西哥／阿根廷等地帶粗俗意味）"}
    ],
    trap:"guagua 在智利／秘魯是「嬰兒」，在古巴／波多黎各／加那利群島卻是「公車」，兩個意思完全不相干；coger 在哥倫比亞很普通，但墨西哥／阿根廷等地帶性暗示、算粗俗，保險起見換成 agarrar 或 tomar 比較不會踩雷。另外 palta（祕魯／智利）跟 aguacate（其他地區）都是「酪梨」，只是地區用字不同，沒有地雷。",
    source:"文法補充"
  },

  {
    id:"g48", cat:"phrase", level:"b1",
    title:"跨國禁忌小提醒",
    rule:"拉美各國有自己的禁忌文化，出發前先知道能避免尷尬。",
    examples:[
      {es:"En Uruguay, algunas personas evitan el número trece.", zh:"在烏拉圭，有些人會避諱數字13。"},
      {es:"Es mejor no señalar a alguien con el dedo.", zh:"最好不要用食指指著別人。（提醒：這個禁忌很多文化都有，不是拉美獨有）"}
    ],
    trap:"烏拉圭部分人忌諱數字13、星期五、青色，這是當地部分文化傳統，不是全拉美通用禁忌；用食指指人被視為不禮貌則是跨文化常見的禮儀提醒，不是拉美特有的規矩。",
    source:"文法補充"
  },

  {
    id:"g49", cat:"phrase", level:"b1",
    title:"拉美街頭美食與可可地圖",
    rule:"用食物認識文化是最沒有壓力的入門方式——每個國家都有自己的招牌小吃，可可／熱巧克力的喝法也各地不同。",
    examples:[
      {es:"Los tacos al pastor son mi comida favorita.", zh:"墨西哥牧羊人塔可是我最愛的食物。"},
      {es:"En Costa Rica, el gallo pinto es el desayuno típico.", zh:"在哥斯大黎加，加約賓多（米豆飯）是典型的早餐。"},
      {es:"El chocolate con queso es una combinación curiosa.", zh:"起司熱巧克力是個很特別的組合。（哥倫比亞／厄瓜多的傳統喝法）"}
    ],
    trap:"哥倫比亞／厄瓜多有把起司丟進熱巧克力裡一起喝的傳統喝法（chocolate con queso），聽起來奇怪但當地人很喜歡；肉桂等香料建議選天然的，不是人工香精調味。",
    source:"文法補充"
  },

  // ══ 比較級 ══

  {
    id:"g50", cat:"phrase", level:"b1",
    title:"Más / Menos + 形容詞 + que：比較級公式",
    rule:"跟英文不同！英文依單字長短分裂（bigger vs more beautiful），西語不管單字長短，一律套同一個公式：más（更）／menos（比較不）+ 形容詞 + que（比）。",
    examples:[
      {es:"Este charco es más grande que mi cama.", zh:"這個水坑比我的床更大。"},
      {es:"El bug es menos difícil que ayer.", zh:"這個bug比昨天不難了。"},
      {es:"Nita es más alta que Tito.", zh:"妮妲比迪多高。"}
    ],
    trap:"英文會在形容詞加字尾（taller）或加more（more beautiful），西語完全不加字尾——直接把 más／menos 像貼紙一樣貼在形容詞前面就好，形容詞本身不用變形。",
    source:"文法補充"
  },

  {
    id:"g51", cat:"phrase", level:"b1",
    title:"Tan + 形容詞 + como：一樣...跟...一樣（大地雷：como不是que）",
    rule:"同等比較「一樣...」英文是 as + 形容詞 + as（前後同一個字），西語是 tan + 形容詞 + como——後面固定接 como，不能接 que，這是初學者最常踩的雷。",
    examples:[
      {es:"El bebé es tan lindo como tú.", zh:"寶寶跟你一樣可愛。"},
      {es:"Esta galleta es tan dulce como la miel.", zh:"這塊餅乾跟蜂蜜一樣甜。"},
      {es:"Tito es tan curioso como Nita.", zh:"迪多跟妮妲一樣好奇。"}
    ],
    trap:"❌ tan...que 是錯的組合（que 是「比較級」的專利，跟 más/menos 配對）；✅ tan...como 才是「同等比較」的固定搭配，後面一定要接 como，牢記這個地雷組合不要混。",
    source:"文法補充"
  },

  {
    id:"g52", cat:"phrase", level:"b1",
    title:"Mejor / Peor / Mayor / Menor：四個不規則比較級",
    rule:"這四個字是比較級的傲嬌大魔王——前面絕對不能加 más 或 menos，它們自己就是「更好/更慘/更大/更小」的完整比較級形態，跟英文 good→better、bad→worse 是同一種邏輯。",
    examples:[
      {es:"Tu ayuda es mejor que un café.", zh:"你的幫忙比咖啡更好。"},
      {es:"El clima es peor hoy.", zh:"今天天氣更糟。"},
      {es:"Mi hermano mayor juega en el lodo.", zh:"我哥哥（年紀較大的）在泥巴裡玩。"}
    ],
    trap:"❌ más bueno／más malo 是錯的，要說 mejor／peor；mayor／menor 除了比較級（年長/年幼）也常直接當形容詞用（hermano mayor＝哥哥、hermana menor＝妹妹），不是每次都在做比較。",
    source:"文法補充"
  },

  // ══ B2 虛擬語氣進階 ══

  {
    id:"g53", cat:"subjunctive", level:"b2c1",
    title:"過去虛擬式：Imperfecto de Subjuntivo",
    rule:"當主要子句的動詞是**過去時態**（quería、pidió、esperaba…），而且滿足 WEIRDO 條件時，que 後面要用過去虛擬式（Imperfecto de Subjuntivo）。<br><br>規則變化：<br>• -AR 動詞：hablar → habl<b>ara</b>（我說了但那是在過去語境裡的願望）<br>• -ER / -IR 動詞：comer → com<b>iera</b>、vivir → viv<b>iera</b><br><br>高頻不規則形（背這幾個最夠用）：<br>ser／ir → fuera／fuera　tener → tuviera　hacer → hiciera　poder → pudiera　decir → dijera　haber → hubiera",
    examples:[
      {es:"Mamá Cata quería que Nita durmiera temprano.", zh:"卡妲媽媽希望妮妲早點睡。（quería=過去，→過去虛擬式 durmiera）"},
      {es:"Tito pidió que todos tuvieran paciencia.", zh:"迪多請求大家有點耐心。（pidió=過去，→ tuvieran）"},
      {es:"Era importante que la familia estuviera unida.", zh:"家人團結在一起是很重要的事。（Era=過去非人稱，→ estuviera）"}
    ],
    trap:"記憶公式：主句是過去時態 → que 後面用過去虛擬式。主句是現在時態（quiero/es importante）→ 用現在虛擬式（見 g27）。兩套虛擬式不混用，時間一對上就知道選哪個。",
    source:"文法補充",
    conj:{
      verb:"hablar（過去虛擬式 -ra 形，LatAm 優先用 -ra 不用 -se）",
      rows:[
        {person:"yo",                    form:"hablara",  ex:"Ojalá que hablara más.",    zh:"要是我多說一點就好了。"},
        {person:"tú",                    form:"hablaras", ex:"Quería que hablaras conmigo.",zh:"我希望你跟我說話。"},
        {person:"él/ella/usted",         form:"hablara",  ex:"Era importante que hablara.",zh:"重要的是他開口說話。"},
        {person:"nosotros",              form:"habláramos",ex:"Pidió que habláramos despacio.",zh:"她要求我們說話慢一點。"},
        {person:"ellos/ellas/ustedes",   form:"hablaran", ex:"No creía que hablaran español.",zh:"我沒想到他們會說西語。"}
      ]
    }
  },

  {
    id:"g54", cat:"subjunctive", level:"b2c1",
    title:"現在完成虛擬式：haya + 過去分詞",
    rule:"當 WEIRDO 主句的動詞是**現在時態**，但後面子句說的是一件「可能已經發生」的事，que 後面就用「現在完成虛擬式」：**haya / hayas / haya / hayamos / hayan + 過去分詞（-ado/-ido）**。<br><br>白話判斷法：說的是「現在懷疑/希望/擔心——某件過去的事有沒有發生」→ haya + 過去分詞。",
    examples:[
      {es:"No creo que Nita haya terminado de comer.", zh:"我不覺得妮妲已經吃完了。（現在不信 → 對已發生的事）"},
      {es:"Espero que Tito haya dormido bien anoche.", zh:"希望迪多昨晚睡得好。（現在希望 → 對已發生的事）"},
      {es:"Es una lástima que no hayas venido.", zh:"你沒來真是太可惜了。（現在惋惜 → 對已不來的事實）"}
    ],
    trap:"跟一般現在完成式（He terminado. → 我已經吃完了）的差別是：一般完成式是陳述「確實發生」，現在完成虛擬式是在「懷疑/希望/擔心某件事有沒有發生」——後面那個不確定性才是觸發虛擬式的關鍵。",
    source:"文法補充"
  },

  {
    id:"g55", cat:"subjunctive", level:"b2c1",
    title:"Si + 過去虛擬式 + 條件式：與現實相反的假設",
    rule:"這是西語假設句的 B2 大魔王：說一件**目前並非事實**的假設，格式固定——<br><br>**Si + 過去虛擬式（-ra 形） + 條件式（-ría）**<br><br>對照：Si + 現在陳述式 + 未來式 = 真實可能（見 g19 IR 近未來式旁邊的用法）<br>Si tuviera dinero, compraría → 我沒有錢（所以才假設）<br>Si tengo dinero, compraré → 我可能有錢（真實可能性）",
    examples:[
      {es:"Si tuviera más tiempo, dormiría una siesta cada día.", zh:"如果我有更多時間，我每天都要午睡。（事實：沒時間）"},
      {es:"Si fuera viernes, saldríamos a pasear.", zh:"如果今天是週五，我們就出去散步了。（事實：今天不是週五）"},
      {es:"Si pudiera hablar español, viajaría por toda América Latina.", zh:"如果我能說西語，我就要遊遍整個拉丁美洲。（學到一半的感嘆版）"}
    ],
    trap:"兩套 Si 句不可混搭：Si tuviera + compraría ✅；Si tengo + compraría ❌（時態搭配要一致）。過去虛擬式永遠搭條件式，現在陳述式永遠搭未來式——選定一組就成對用到底。",
    source:"文法補充"
  },

  {
    id:"g56", cat:"connector", level:"b2c1",
    title:"Aunque：雖然（陳述式）vs 即使（虛擬式）",
    rule:"aunque 是 B2 的雙面刃連接詞——後面接陳述式還是虛擬式，意思完全不同：<br><br>• **aunque + 陳述式** = **雖然**（事實讓步，承認這件事確實發生）<br>• **aunque + 虛擬式** = **即使**（假設讓步，這件事還沒確定，只是假設）",
    examples:[
      {es:"Aunque está cansada, Nita sigue dibujando.", zh:"雖然很累，妮妲還是繼續畫畫。（está 陳述式 → 她確實很累，這是事實）"},
      {es:"Aunque esté cansada, Nita seguirá dibujando.", zh:"即使（萬一）累了，妮妲也還是會繼續畫畫。（esté 虛擬式 → 她現在不一定累，是假設情況）"},
      {es:"Aunque llueva, iremos a la fiesta.", zh:"就算下雨，我們也要去派對。（虛擬式，現在不知道會不會下雨）"}
    ],
    trap:"判斷訣竅：說話時你**確定這件事正在發生/已經發生**？用陳述式。你只是**假設/承認一種可能性**，不確定？用虛擬式。同一個 aunque，一字之差，語氣截然不同。",
    source:"文法補充"
  },

  {
    id:"g57", cat:"verb-pattern", level:"b2c1",
    title:"SE 被動 / SE 無人稱：「被動式」的拉美親戚",
    rule:"西語的被動不只有 ser + 過去分詞，日常更自然的說法是用 se：<br><br>① **SE 被動**（se pasivo）：「東西被做了某事」——動詞數量要跟後面的名詞一致（單數→動詞單數，複數→複數）<br>② **SE 無人稱**（se impersonal）：「大家都這樣說/做」——不知道或不想說是誰做的，動詞固定用第三人稱單數",
    examples:[
      {es:"En México se celebra el Día de los Muertos.", zh:"在墨西哥，亡靈節是大家都會慶祝的節日。（se pasivo，主詞 el Día 是單數）（es：se + 動詞 = 不指出動作者的表達方式）"},
      {es:"Se venden flores de cempasúchil en todas partes.", zh:"到處都有萬壽菊在賣。（se pasivo，flores 複數 → venden 複數）"},
      {es:"Se dice que el cempasúchil guía a las almas.", zh:"據說萬壽菊能指引靈魂的路。（se impersonal，que 後面整句，動詞固定單數）"}
    ],
    trap:"SE 被動的動詞要跟名詞在數上一致（Se vende pan. vs Se venden flores.）；SE 無人稱沒有可以配對的名詞主詞，所以永遠是第三人稱單數 se dice/se puede/se considera。判斷有沒有「東西/名詞」是誰在被動受到那個動作——有的話是 SE 被動，沒有的話是 SE 無人稱。",
    source:"文法補充"
  },

  {
    id:"g58", cat:"verb-pattern", level:"b2c1",
    title:"Ponerse / Quedarse / Volverse：三種「變成」",
    rule:"西語有三個表示「變成/成為」的動詞，各有各的語感：<br><br>• **ponerse + 形容詞** = 暫時性情緒／生理狀態的突然改變（「一下子就...」）<br>• **quedarse + 形容詞** = 某件事發生後留下的結果狀態（「結果變成...」）<br>• **volverse + 形容詞／名詞** = 逐漸且深層的改變，像性格或本質變了（「越來越...、變成了...這樣的人」）",
    examples:[
      {es:"Nita se puso muy feliz cuando vio los dibujos.", zh:"妮妲看到畫的時候立刻很開心。（ponerse：情緒瞬間浮現）"},
      {es:"Tito se quedó dormido en el sofá.", zh:"迪多（看著看著）就在沙發上睡著了。（quedarse：某件事導致的結果狀態）"},
      {es:"El cielo se volvió naranja al atardecer.", zh:"黃昏時天空慢慢變成橘色。（volverse：漸進深層的改變）"}
    ],
    trap:"三個都能翻成「變」，但語感差很多：ponerse 強調「突然冒出來的情緒或感覺」（短暫）；quedarse 強調「發生完某事後的結果」（留下來）；volverse 強調「慢慢從根本上改變了」（深層）。不確定時，情緒變化先選 ponerse，結果狀態選 quedarse，性格本質改變選 volverse。",
    source:"文法補充"
  },

  // ══ 拉美俚語箱 ══

  {
    id:"g59", cat:"slang", level:"b2c1",
    title:"拉美各地道地口語：五國俚語地圖",
    rule:"同一件事，不同國家的拉美人說法完全不一樣——這些俚語聽起來很道地，但要注意地區差異，最安全的辦法是先認識、聽懂，在對話裡自然帶出再說。角色台詞仍用泛拉美中性詞（Dale/Listo/Genial），這些俚語是「聽得懂」補充，不是取代中性詞。",
    examples:[
      {es:"¡Qué onda, wey!", zh:"🇲🇽 墨西哥打招呼，什麼情況啊，哥們！（¡Qué onda! 字面是「什麼波浪/什麼感覺」，等同於「哇塞！」「怎麼啦？」，wey（guey 諧音版）是朋友間的稱呼（哥們/老兄）。）"},
      {es:"¡Eso está muy chido!", zh:"🇲🇽 墨西哥，超讚的！（chido/chida 是墨西哥年輕人說「很酷、很棒」的詞，類似英語 cool，在墨西哥以外不常聽到。）"},
      {es:"¡Qué bacano!", zh:"🇨🇴 哥倫比亞，太讚了！太棒了！（bacano 是哥倫比亞和部分加勒比海地區的「很棒」，類似 chido，同樣具地區性。）"},
      {es:"¡Qué quilombo!", zh:"🇦🇷 阿根廷，一團亂/超麻煩！（quilombo 字面源自「妓院」但現在日常泛指「混亂、麻煩事」，形容場面一團糟時阿根廷人常用。）"},
      {es:"¿Cachai o no?", zh:"🇨🇱 智利，你懂嗎？聽懂了沒？（cachai 是智利人幾乎每句話都會帶的口頭禪，字面近似「你抓到了嗎」，功能類似英語的 you know?）"}
    ],
    family:{
      title:"🗺️ 五國俚語速查",
      intro:"聽懂 > 主動使用。先認識這些字，聽到不懵就算成功；說的時候注意你在和哪個國家的人說話。",
      items:[
        {es:"🇲🇽 chido/chida", zh:"好棒／很酷（墨西哥，類似 cool）"},
        {es:"🇲🇽 ¡Qué onda!", zh:"什麼情況！／哇塞！（墨西哥打招呼/驚嘆）"},
        {es:"🇲🇽 wey / güey", zh:"哥們、老兄（墨西哥朋友間稱呼，正式場合不用）"},
        {es:"🇲🇽 no mames", zh:"別鬧了/太誇張了吧（墨西哥，驚訝或不敢置信時用，較口語隨性、注意場合）"},
        {es:"🇨🇴 bacano", zh:"很棒、很酷（哥倫比亞、加勒比海地區）"},
        {es:"🇨🇴 parce / parcerito", zh:"朋友、哥們（哥倫比亞，parcerito 更親昵）"},
        {es:"🇨🇴 vaina", zh:"萬用「東西／事情」（哥倫比亞/委內瑞拉，¿Qué es esa vaina?＝那是什麼東西？）"},
        {es:"🇨🇴 una chimba", zh:"棒透了、極品（哥倫比亞年輕人高頻讚嘆詞，較隨性口語）"},
        {es:"🇦🇷 che", zh:"喂／哎（阿根廷打招呼或引起注意，¡Che, mirá eso!＝喂，看那個！）"},
        {es:"🇦🇷 copado/copada", zh:"很棒、很酷（阿根廷，類似 chido）"},
        {es:"🇦🇷 quilombo", zh:"一團亂、大麻煩（阿根廷，形容場面混亂）"},
        {es:"🇨🇱 po", zh:"語助詞，等同 pues（智利，加在句尾加強語氣，si po＝對啊）"},
        {es:"🇨🇱 cachai", zh:"你懂嗎？／你知道吧（智利，幾乎每句話都會出現的口頭禪）"},
        {es:"🇵🇪 chévere", zh:"很棒、很酷（秘魯/委內瑞拉/加勒比海地區廣泛使用）"},
        {es:"🇵🇪 pata", zh:"朋友、哥們（秘魯，跟墨西哥的wey、哥倫比亞的parce同類意思）"}
      ]
    },
    trap:"¡Qué onda! 只在墨西哥超高頻——到阿根廷說可能會有點奇怪；dale（好的/走吧）跟 listo（好了/準備好）才是最泛拉美、哪裡都用的同意語。不確定對方是哪國人時，先用 Dale/Listo/Genial 最安全。no mames、quilombo、una chimba 這幾個語氣較隨性直接，熟朋友之間用沒問題，正式或初次見面場合先別用。",
    source:"文法補充"
  },

  {
    id:"g60", cat:"slang", level:"b2c1",
    title:"西語網路縮寫：IG/Twitter 拉美網民語言",
    rule:"拉美社群媒體有一套自己的縮寫系統，混合了西語縮寫和通用拉丁字母縮寫，要讀懂拉美 IG 留言或 Twitter 回文，這幾個必須認識。",
    examples:[
      {es:"¿Xq no fuiste?", zh:"為什麼你沒來？（xq = porque（因為／為什麼），是 por qué 的縮寫，口語常見。注意：正式書寫絕對不用 xq，這是純網路用語。）"},
      {es:"¡Gpi a todas!", zh:"感謝所有人！（gpi = gracias por invitar（謝謝邀請），常見於社群貼文感謝標籤、回覆留言。）"},
      {es:"Tkm, no tengo palabras.", zh:"我愛你，我無言以對。（tkm = te quiero mucho（非常愛你/非常喜歡你），跟 tqm 是同一組，是親友間最常用的網路結尾語。）"}
    ],
    family:{
      title:"📱 拉美網路縮寫速查",
      intro:"這些都只用在社群媒體、訊息、貼文——不寫進正式文件。認得就好，主動使用前先感受一下對話的語氣對不對。",
      items:[
        {es:"xq / x q", zh:"porque（因為）or por qué（為什麼）"},
        {es:"gpi", zh:"gracias por invitar（謝謝邀請）"},
        {es:"tkm / tqm", zh:"te quiero mucho（非常愛你/很喜歡你）"},
        {es:"ntp", zh:"no te preocupes（別擔心）"},
        {es:"q", zh:"que（在縮寫裡 q 常代替 que，例：q tal?＝¿Qué tal?）"},
        {es:"msj", zh:"mensaje（訊息），「mándame un msj」＝給我傳個訊"},
        {es:"jaja / jajaja", zh:"哈哈／哈哈哈（西語笑聲，類似英語 lol，j 在西語唸/x/ 所以 jaja 才是正確的笑聲拼法，不是 haha）"}
      ]
    },
    trap:"xq 的讀法是「por qué」或「porque」——看語境判斷。「¿xq no viniste?」是問「為什麼沒來」（疑問），「xq estaba ocupado」是答「因為我很忙」（原因）。jaja 裡的 j 唸作/x/（類似英語 h），所以網路上說 jaja 是真實發音，不是拼錯。",
    source:"文法補充"
  },

  {
    id:"g61", cat:"vocab", level:"b2c1",
    title:"各國評分／批改考卷的巧妙差異",
    rule:"「打分數」在不同國家的邏輯不一樣，數字大小的方向、批改方式都可能完全相反——比較教育制度時不能只看數字表面。德國用 1（最好）到 6（最差）的等第制，Abitur（大學入學資格考）採計時另外換算成 15 到 0 分的量表，數字方向都跟台灣「分數越高越好」的直覺相反。此外，越來越多學校推行「評量量規」（rúbrica）取代單一總分，也開始嘗試用人工智慧輔助批改，減輕老師負擔。",
    examples:[
      {es:"En Alemania, el 1 es la mejor nota y el 6 es la peor.", zh:"在德國，1分是最好的成績，6分是最差的（方向跟台灣直覺相反）。"},
      {es:"Cada vez más escuelas usan una rúbrica de evaluación en vez de solo poner una nota.", zh:"越來越多學校用評量量規，而不是只給一個總分。"},
      {es:"La inteligencia artificial ya corrige exámenes en algunas escuelas.", zh:"有些學校已經開始用人工智慧批改考卷。"}
    ],
    family:{
      title:"📊 評分制度小地圖",
      intro:"這些只是認識文化差異的補充知識，不是要背誦每個國家的規則。",
      items:[
        {es:"Alemania", zh:"1(最好)–6(最差)等第；Abitur 另採計 15–0 分量表"},
        {es:"Taiwán / muchos países de A. Latina", zh:"0–100分，數字越高越好"},
        {es:"Finlandia", zh:"標準化考試少，更重視質性/形成性評量，不執著單一總分"}
      ]
    },
    trap:"跨國比較成績時，先確認「這個數字是越大越好還是越小越好」，不能直接套用台灣的直覺去解讀別的國家的分數——德國的「1」是最頂尖的成績，不是不及格。",
    source:"文法補充"
  },

  {
    id:"g62", cat:"phrase", level:"b1",
    title:"台灣的農業外交：與巴拉圭的真實合作史",
    rule:"台灣與巴拉圭自1957年建交，是台灣目前在南美洲唯一的邦交國。1960、70年代台灣派農業專家赴巴拉圭，把土地改革與稻米種植的經驗帶過去；1973年起協助發展花卉產業，到2003年當地農民已種出超過40個玫瑰品種；近年還協助巴拉圭建立淡水魚（pacu）人工繁殖技術，農技團也曾協助培訓59位業者發展蘇魯比魚（surubí）養殖，並與巴拉圭工商部合作改善瑪黛茶（yerba mate，巴拉圭重要文化作物）的生產鏈。巴拿馬過去也有類似的農技合作計畫，但已在2017年與台灣斷交。這段歷史剛好是「台灣人用西語做跨國合作」的真實案例。（1985年前，此類任務在非洲稱「農耕隊」，在拉美則稱「農業技術團／農技團」，用詞不同，不要混用。）",
    examples:[
      {es:"Taiwán y Paraguay mantienen relaciones diplomáticas desde 1957.", zh:"台灣與巴拉圭自1957年起維持邦交關係。"},
      {es:"La Misión Técnica de Taiwán capacitó a productores de surubí en Paraguay.", zh:"台灣技術團曾培訓巴拉圭的蘇魯比魚養殖業者。"},
      {es:"Taiwán también coopera con Paraguay para mejorar la cadena productiva de la yerba mate.", zh:"台灣也跟巴拉圭合作改善瑪黛茶的生產鏈。"}
    ],
    trap:"這類「農業技術團（農技團）」的外交合作只存在於台灣邦交國，巴拿馬已在2017年斷交，這類技術合作也隨之結束——邦交狀態會直接影響這類長期合作項目的存續。",
    source:"文法補充"
  },

  {
    id:"g63", cat:"phrase", level:"b1",
    title:"墨西哥可樂的兩個面向：好喝的秘密與貧窮的代價",
    rule:"墨西哥可口可樂被很多人認為比其他國家好喝，關鍵在於用「蔗糖」（azúcar de caña）當甜味劑，美國自1980年代起因玉米種植補貼改用更便宜的玉米糖漿，兩種甜味喝起來確實不同；經典玻璃瓶包裝也是原因之一。這股風潮甚至讓 Arca 公司自2005年起透過「懷舊計畫」（Proyecto Nostalgia）把墨西哥版可樂正式外銷到美國，許多美國消費者願意多付一倍價錢購買；2025年時任美國總統川普公開施壓，可口可樂宣布將在美國推出蔗糖版本因應需求（原版玉米糖漿配方仍保留）。但同一款飲料在墨西哥恰帕斯州（Chiapas）卻是另一個故事：當地飲用水長期短缺（可口可樂集團FEMSA自1995年起持有大量水權開採許可），但可樂比瓶裝水便宜，根據2019年CIMSUR研究，恰帕斯當地平均每人每年喝掉821公升可樂——是全國平均160公升的5倍、全球平均的32倍；聖胡安查穆拉（San Juan Chamula）糖尿病更是當地死因第三名，聯合國也曾公開譴責當地飲用水權受侵害的問題。",
    examples:[
      {es:"La Coca-Cola mexicana usa azúcar de caña, no jarabe de maíz.", zh:"墨西哥可樂用蔗糖，不是玉米糖漿。"},
      {es:"En 2025, Coca-Cola anunció que lanzará una versión con azúcar de caña en Estados Unidos.", zh:"2025年，可口可樂宣布將在美國推出蔗糖版本。"},
      {es:"En Chiapas, cada persona bebe en promedio 821 litros de Coca-Cola al año.", zh:"在恰帕斯州，每人平均每年喝掉821公升可樂。"},
      {es:"La escasez de agua potable y el precio barato del refresco explican este fenómeno.", zh:"飲用水短缺加上汽水便宜的價格，解釋了這個現象。"}
    ],
    trap:"這不只是有趣的冷知識——恰帕斯州的可樂消費現象背後是真實的飲用水權與健康危機，聯合國都曾介入譴責，提到這個話題時記得它有輕鬆與沉重兩個面向，不是單純的「口味比較」。",
    source:"文法補充"
  },

  {
    id:"g64", cat:"phrase", level:"b1",
    title:"瑪雅曆法：兩套曆法並行的智慧",
    rule:"馬雅人同時使用兩套曆法：卓爾金曆（Tzolk'in）是260天的宗教祭祀曆（13個數字×20個日名），用來安排祭典、預測雨季/漁獵時機；哈布曆（Haab'）是365天的太陽曆（18個月×20天，加上5天被視為不祥的Wayeb'）。兩套曆法組合起來，要滿52年（18,980天）才會完整重複一次，稱為「曆法輪」（Rueda Calendárica）。除此之外還有「長紀曆」（Cuenta Larga）用線性方式累計天數——2012年12月21日只是長紀曆第13個b'ak'tun週期的結束，被西方媒體誤傳成「世界末日」，其實馬雅文化裡週期結束代表的是更新/重生，不是毀滅。",
    examples:[
      {es:"El Tzolkin es un calendario sagrado de 260 días.", zh:"卓爾金曆是一套260天的神聖曆法。"},
      {es:"El Haab tiene 18 meses de 20 días, más 5 días de mal agüero.", zh:"哈布曆有18個月、每月20天，再加上5天不祥日。"},
      {es:"El 21 de diciembre de 2012 no fue el fin del mundo, sino el fin de un ciclo.", zh:"2012年12月21日不是世界末日，而是一個週期的結束。"}
    ],
    trap:"「2012世界末日」是西方媒體對馬雅長紀曆的誤讀——馬雅人自己的觀念裡，週期結束＝更新重生，不是毀滅預言，這點常被大眾文化誤傳。",
    source:"文法補充"
  },

  {
    id:"g65", cat:"phrase", level:"b1",
    title:"安地斯高原（Altiplano）：極端環境孕育的智慧",
    rule:"安地斯高原（altiplano）橫跨秘魯與玻利維亞交界，平均海拔約3,750公尺，的的喀喀湖（lago Titicaca）就座落於此，是世界上最高的可通航湖泊。馬鈴薯正是在的的喀喀湖附近被馴化的——距今超過7,000年前，如今秘魯保有超過3,500種馬鈴薯品種。當地人也發展出「秋紐」（chuño）保存法：利用高原晝夜溫差極端的特性（夜晚可降到零下20度、白天日照強烈），把馬鈴薯反覆冷凍、日曬、赤腳踩壓脫水，做成可以存放數年的凍乾馬鈴薯——這不是單純曬乾，是適應惡劣高原環境發展出的精密技術。駱馬（llama）與羊駝（alpaca）也是原生於這片高原、適應高海拔的馴化動物。",
    examples:[
      {es:"El lago Titicaca es el lago navegable más alto del mundo.", zh:"的的喀喀湖是世界上最高的可通航湖泊。"},
      {es:"La papa fue domesticada cerca del lago Titicaca hace más de 7000 años.", zh:"馬鈴薯是在的的喀喀湖附近，超過7000年前被馴化的。"},
      {es:"El chuño se hace congelando la papa de noche y secándola al sol de día.", zh:"秋紐是靠夜間冷凍、白天曬乾製成的。"}
    ],
    trap:"秋紐不是「隨便曬乾馬鈴薯」——是精準利用高原日夜溫差極端（夜晚結凍、白天曝曬）的傳統技術，體現的是適應惡劣環境的智慧，不是簡單的食物保存法。",
    source:"文法補充"
  },

  {
    id:"g66", cat:"phrase", level:"b1",
    title:"個人空間泡泡：拉美各國距離感大不同",
    rule:"語言學習平台 Preply 曾彙整全球56國的「個人空間泡泡」研究，發現距離感需求差異很大：奧地利需求距離最短（72公分），哥倫比亞跟阿根廷也偏短、接受距離較近；墨西哥則是拉美國家中最需要個人空間的（99公分），比巴西、哥倫比亞、阿根廷、秘魯都還要遠。這打破「拉美人都很熱情、沒有距離感」的刻板印象——同樣是拉美，墨西哥跟哥倫比亞/阿根廷的距離感其實明顯不同。研究也發現疫情之後，全球多數國家的社交距離需求都顯著增加。",
    examples:[
      {es:"En Colombia y Argentina, la burbuja personal es más pequeña que en México.", zh:"在哥倫比亞跟阿根廷，個人空間泡泡比墨西哥小。"},
      {es:"México es el país latinoamericano que más valora su espacio personal.", zh:"墨西哥是拉美國家中最重視個人空間的。"},
      {es:"Después de la pandemia, la distancia social aumentó en casi todo el mundo.", zh:"疫情之後，全球社交距離幾乎都增加了。"}
    ],
    trap:"不要以為「拉美＝熱情沒距離感」是通用規則——同樣在拉美，墨西哥對個人空間的需求其實比哥倫比亞、阿根廷都高，國與國之間差異很大，不能一概而論。",
    source:"文法補充"
  },

  {
    id:"g67", cat:"phrase", level:"b1",
    title:"「準時」的定義因國而異：拉美 vs 東亞",
    rule:"「準時」在不同文化裡的容忍度差異很大。墨西哥跟哥倫比亞的社交場合，遲到30到60分鐘都被視為正常，甚至是預期中的——哥倫比亞更有專屬說法「hora colombiana」（哥倫比亞時間）來形容這種彈性；秘魯的情況類似，甚至有「hora cabana」的說法。相對地，日本的準時觀念近乎神聖，遲到一分鐘就已經算是嚴重失禮；德國職場文化也把準時視為專業與尊重的表現。就算同樣在拉美，國與國之間也有明顯差異——調查發現83%的智利人認為社交場合遲到可以接受，阿根廷人這麼認為的只有43%。",
    examples:[
      {es:"En México, llegar una hora tarde a una fiesta no es ningún problema.", zh:"在墨西哥，參加派對遲到一小時完全沒問題。"},
      {es:"En Colombia existe la expresión 'hora colombiana' para describir esta flexibilidad.", zh:"哥倫比亞有個說法叫「哥倫比亞時間」，用來形容這種彈性。"},
      {es:"En Japón, un minuto de retraso ya se considera una falta grave.", zh:"在日本，遲到一分鐘就已經算是嚴重的失禮。"}
    ],
    trap:"不要把「拉美＝到處都不準時」當成鐵律——就算同樣在拉美，智利（83%認為社交遲到可接受）跟阿根廷（只有43%）差異也很大，準時觀念要看國家、也要看場合（社交 vs 職場常常不同標準）。",
    source:"文法補充"
  },

  {
    id:"g68", cat:"phrase", level:"b1",
    title:"美國本土的西語變體：新墨西哥州 vs 德州",
    rule:"西語不只在拉美有地域差異，在美國本土也發展出獨特的地方變體。新墨西哥州的「Nuevomexicano」是美國最古老的西語變體之一——16、17世紀西班牙殖民者帶來的西語，跟母國西語隔絕數百年後，保留了許多現代西語已經消失的古語形態，同時又混入納瓦荷語、普韋布洛語等當地原住民語言的詞彙，形成獨一無二的混合體。德州的「Tejano」西語則走另一個方向——深度融合英語，是「Spanglish」（西英混合語）最具代表性的變體，反映的是邊境地區長期雙語生活的日常。兩者都不是「不標準的西語」，而是各自環境下自然演化出的真實語言變體。",
    examples:[
      {es:"El español de Nuevo México conserva formas antiguas que ya no se usan en otros países.", zh:"新墨西哥州的西語保留了其他國家已經不再使用的古語形態。"},
      {es:"El español tejano mezcla mucho el inglés, es el Spanglish por excelencia.", zh:"德州西語深度融合英語，是最具代表性的Spanglish。"}
    ],
    trap:"這兩種變體不是「講得不標準」——語言學上它們是各自歷史環境（隔絕演化 vs 邊境雙語生活）自然發展出的真實變體，跟拉美各國的地方腔調是同一種性質，不該被貼上「錯誤」的標籤。",
    source:"文法補充"
  },

  {
    id:"g69", cat:"phrase", level:"b1",
    title:"「三層漢堡事件」：拉美網路爆紅的約會話題",
    rule:"2026年7月，委內瑞拉網紅Luis Miguel Castillo（@castillaneando）在TikTok分享一段親身經歷：他邀約一位女性第一次約會，途中女方拒絕去他原本提議的餐廳，改去她想去的地方，並點了一份「三層漢堡」（hamburguesa triple）。他事後表示這讓他留下不好的第一印象，並拒絕再見面，影片瞬間爆紅，累積數百萬次觀看。當事女性Kerstin Guenther後來公開回應，反駁自己是因為經濟動機而點餐，並留下爆紅金句：「你希望我點一杯水嗎？」（¿Qué querías que pidiera, un vaso de agua?）。這個事件在西語網路圈掀起「約會該不該AA制（pagar a medias）」「傳統性別角色期待」的大辯論，跟台灣網路上類似的約會金錢觀爭論異曲同工。",
    examples:[
      {es:"El video de la hamburguesa triple se hizo viral en cuestión de días.", zh:"三層漢堡事件的影片幾天內就爆紅了。"},
      {es:"El debate sobre pagar a medias en la primera cita sigue siendo polémico.", zh:"第一次約會該不該AA制的辯論依然很有爭議。"},
      {es:"¿Qué querías que pidiera, un vaso de agua?", zh:"你希望我點一杯水嗎？（爆紅金句）"}
    ],
    trap:"這個事件常被誤傳成「墨西哥男子」「高檔餐廳」——查證後主角其實是委內瑞拉人，餐廳也是女方主動選擇的地方，不是男方原本安排的高檔餐廳，轉述時要注意這些細節容易被以訛傳訛。",
    source:"文法補充"
  },

  {
    id:"g70", cat:"phrase", level:"b1",
    title:"拉美「新型積極父職」：從經濟供養者到情感陪伴者",
    rule:"聯合國人口基金會（UNFPA）拉美與加勒比辦公室2021年在Spotlight Initiative計畫下發布報告「Paternidad activa」，分析拉美地區父職角色的轉型——傳統上父親被期待扮演「經濟供養者」（proveedor económico）的角色，但這份報告倡議推動「共同承擔育兒責任」（corresponsabilidad），鼓勵父親從幼兒早期（primera infancia）就投入情感陪伴，並推廣非暴力教養，逐漸擺脫傳統大男人主義（machismo）對父親角色的單一定義。",
    examples:[
      {es:"La paternidad activa promueve la corresponsabilidad en la crianza.", zh:"積極父職提倡育兒共同承擔責任。"},
      {es:"Cada vez más padres se involucran emocionalmente desde la primera infancia.", zh:"越來越多父親從幼兒早期就開始情感投入。"},
      {es:"El modelo tradicional del padre como único proveedor económico está cambiando.", zh:"父親作為唯一經濟供養者的傳統模式正在改變。"}
    ],
    trap:"這不代表拉美社會已經普遍脫離傳統性別角色分工——UNFPA報告本身強調這是「正在推動中」的轉型過程，需要政策與計畫持續推廣，不是已經實現的現狀。",
    source:"文法補充"
  },

  {
    id:"g71", cat:"phrase", level:"b1",
    title:"亡靈節的真實起源：一個常見迷思的破解",
    rule:"亡靈節常被大眾誤以為是「前西班牙時期原住民信仰與天主教融合」的產物，但墨西哥國家人類學暨歷史局（INAH）研究員 Elsa Malvido 的研究指出：儀式的真正源頭其實是西班牙殖民地帶來的天主教傳統——11月1日諸聖節（Día de Todos los Santos）與11月2日追思已亡節（Día de los Fieles Difuntos）本來就是歐洲中世紀既有的節日，是修士傳教士教給原住民與混血族群的，並非純粹的前西班牙原住民信仰延續下來的。",
    examples:[
      {es:"Mucha gente cree que el Día de Muertos es de origen prehispánico.", zh:"很多人以為亡靈節是前西班牙時期起源的。"},
      {es:"Según el INAH, el origen real es español, colonial y cristiano.", zh:"根據INAH的研究，真正的起源是西班牙殖民天主教傳統。"},
      {es:"Los frailes enseñaron estas costumbres a los indígenas y mestizos.", zh:"修士們把這些習俗教給了原住民與混血族群。"}
    ],
    trap:"這不是要否定亡靈節作為墨西哥重要文化資產的地位——現在的亡靈節確實融入很多在地原住民元素，但最初的儀式框架來自歐洲天主教傳統，「起源」跟「後來演變成的獨特文化融合」是兩件不同的事，不要混為一談。",
    source:"文法補充"
  },

  {
    id:"g72", cat:"phrase", level:"b1",
    title:"拉美LGBTI權益：一場尚未完成的革命",
    rule:"德國之聲（DW）2020年報導「Una revolución inacabada」形容西語世界的LGBTI權益進展是一場「尚未完成的革命」——阿根廷、烏拉圭、哥倫比亞等國已經實現婚姻平權，但同一個語言區內，某些國家仍缺乏反歧視法保護、甚至將同性戀行為刑事化，進步與倒退並存，不能用單一標準概括整個西語世界。",
    examples:[
      {es:"Argentina fue uno de los primeros países en aprobar el matrimonio igualitario.", zh:"阿根廷是最早通過婚姻平權的國家之一。"},
      {es:"El progreso de los derechos LGBTI no es uniforme en todo el mundo hispanohablante.", zh:"LGBTI權益的進展在整個西語世界並不一致。"},
      {es:"Todavía hay países donde la comunidad LGBTI enfrenta discriminación legal.", zh:"仍有些國家的LGBTI社群面臨法律上的歧視。"}
    ],
    trap:"不要假設「拉美」是單一整體——同樣說西語，各國LGBTI權益進展差異極大，阿根廷/烏拉圭這類進步案例不能代表整個地區的現狀。",
    source:"文法補充"
  },

  {
    id:"g73", cat:"phrase", level:"b1",
    title:"拉美原住民語言復興運動",
    rule:"聯合國教科文組織（UNESCO）拉美與加勒比地區教育辦公室2019年發布報告「Conocimientos indígenas y políticas educativas en América Latina」，由智利教育部雙語跨文化教育計畫支持，彙整玻利維亞、智利、厄瓜多、瓜地馬拉、墨西哥、秘魯六國專家的研究，探討如何透過教育政策復興原住民語言（如克丘亞語 Quechua、納瓦特爾語 Náhuatl）與口述傳統、書寫系統。",
    examples:[
      {es:"La educación juega un papel clave en la revitalización de las lenguas indígenas.", zh:"教育在原住民語言復興中扮演關鍵角色。"},
      {es:"El quechua y el náhuatl son algunas de las lenguas originarias más habladas.", zh:"克丘亞語和納瓦特爾語是使用人數較多的原住民語言之一。"},
      {es:"Seis países latinoamericanos participaron en este informe de la UNESCO.", zh:"六個拉美國家參與了這份UNESCO報告。"}
    ],
    trap:"就算克丘亞語這類語言使用人數達數百萬，仍被列為瀕危語言——使用人數多不代表沒有滅絕風險，語言復興需要教育政策與制度層面的持續支持，不是自然就會延續下去。",
    source:"文法補充"
  },

  {
    id:"g74", cat:"phrase", level:"b1",
    title:"蒙特梭利在拉美：從墨西哥到阿根廷的深耕",
    rule:"蒙特梭利教育法不只存在於歐美——拉美有自己紮實的推廣網絡。墨西哥的「墨西哥蒙特梭利協會」（AMMAC）成立於1965年，是墨西哥最早正式推廣蒙特梭利教學法的機構之一，獲得墨西哥國立自治大學（UNAM）等校認證，還特別開發低成本教具、把蒙特梭利帶進偏鄉（維拉克魯茲、格雷羅、瓦哈卡）的鄉村學校。阿根廷的「阿根廷瑪麗亞蒙特梭利基金會」（FAMM）成立於2007年，透過「Montessori Solidario」（團結蒙特梭利）網絡，把蒙特梭利教育帶進弱勢社區——目前累積70個蒙特梭利計畫中，有38個設在弱勢地區，證明蒙特梭利教育不是只服務有錢人家的選項。",
    examples:[
      {es:"La Asociación Montessori de México lleva el método a escuelas rurales.", zh:"墨西哥蒙特梭利協會把這個教學法帶進鄉村學校。"},
      {es:"La Fundación Argentina María Montessori trabaja en comunidades vulnerables.", zh:"阿根廷瑪麗亞蒙特梭利基金會在弱勢社區推動蒙特梭利。"},
      {es:"El método Montessori no es solo para familias con dinero.", zh:"蒙特梭利教學法不是只給有錢人家的選項。"}
    ],
    trap:"蒙特梭利常被誤認為只有私立貴族學校才用得起——但拉美這兩個組織的實際案例證明，透過在地化低成本教具與社區推廣，蒙特梭利完全可以深入弱勢社區跟鄉村學校，不是天生的「貴族教育」。",
    source:"文法補充"
  },

  {
    id:"g75", cat:"subjunctive", level:"b2c1",
    title:"過去虛擬式（Imperfecto de Subjuntivo）：與現在事實相反的假設",
    rule:"過去虛擬式用在「與現在事實相反的假設」句型：Si + 過去虛擬式，...就會 + 條件式。例如 Si tuviera dinero, compraría una finca.（如果我有錢，我就會買一座莊園——但實際上我沒有錢）。過去虛擬式的規則變化基準是「陳述式簡單過去式第三人稱複數」去掉-ron，加上-ra/-ras/-ra/-ramos/-rais/-ran（也有-se字尾的變體，兩者可互換，-ra版本較常用）。也用在Ojalá、no creía que、esperaba que等過去時態的願望/懷疑句型裡。",
    examples:[
      {es:"Si tuviera dinero, viajaría por toda Latinoamérica.", zh:"如果我有錢，我會環遊整個拉丁美洲。"},
      {es:"Ojalá pudiera hablar español perfectamente.", zh:"真希望我能講一口完美的西語。"},
      {es:"No creía que fuera tan difícil aprender los tiempos verbales.", zh:"我沒想到學動詞時態會這麼難。"}
    ],
    trap:"過去虛擬式的規則變化基準是「陳述式簡單過去式第三人稱複數」，不是從原形動詞直接推——例如 tener → tuvieron → tuviera（不是從tener直接變）。這也是為什麼不規則動詞的過去虛擬式反而更好推：只要記得該動詞的簡單過去式第三人稱複數，就能推出整組過去虛擬式變位。",
    source:"文法補充"
  },

  {
    id:"g76", cat:"verb-pattern", level:"b2c1",
    title:"被動語態：voz pasiva 與更常用的 se pasivo",
    rule:"西語有兩種被動語態表達方式。①正式被動語態（voz pasiva）：ser + 過去分詞（依主詞陰陽性單複數變化），常見於書面新聞/正式文件，例如 El edificio fue construido en 1990.（這棟建築建於1990年）。②更常用、更口語的「se被動」（se pasivo）：se + 動詞第三人稱，不需要明確指出動作執行者，例如 Se habla español aquí.（這裡講西語）、Se vende esta casa.（此屋出售）。日常口語裡se pasivo比正式voz pasiva更常見，新聞標題/書面正式文件才比較常用voz pasiva。",
    examples:[
      {es:"El puente fue construido por ingenieros franceses.", zh:"這座橋是由法國工程師建造的。"},
      {es:"Se habla español en toda Latinoamérica.", zh:"整個拉丁美洲都講西語。"},
      {es:"Aquí se vende fruta fresca todos los días.", zh:"這裡每天都賣新鮮水果。"}
    ],
    trap:"se pasivo看起來像反身動詞句型，但意思完全不同——「Se vende la casa」不是「房子賣自己」，是「房子被賣／房子出售中」。判斷關鍵是看主詞是不是真的能主動執行這個動作：房子不能主動賣自己，所以這裡一定是被動用法，不是反身用法。",
    source:"文法補充"
  },

  {
    id:"g77", cat:"connector", level:"b2c1",
    title:"讓步子句：Aunque 的雙重用法（陳述式 vs 虛擬式）",
    rule:"Aunque（雖然/即使）後面接陳述式還是虛擬式，意思會不同：①Aunque + 陳述式＝敘述已知的事實，說話者確定這件事發生了，例如 Aunque llueve, voy a salir.（雖然在下雨〔真的在下雨〕，我還是要出門）。②Aunque + 虛擬式＝假設/不確定的情況，說話者不確定或不在乎這件事是否發生，例如 Aunque llueva, voy a salir.（就算下雨〔不確定會不會下雨，或不在乎〕，我還是要出門）。這是同一個連接詞，換個動詞語氣就能表達完全不同的態度，是B2讓步子句的核心考點。",
    examples:[
      {es:"Aunque llueve, iré a la fiesta.", zh:"雖然在下雨，我還是會去派對（真的在下雨）。"},
      {es:"Aunque llueva, iré a la fiesta.", zh:"就算下雨，我還是會去派對（不確定會不會下雨）。"},
      {es:"Aunque no tengo mucho dinero, soy feliz.", zh:"雖然我沒有很多錢，但我很快樂（陳述事實）。"}
    ],
    trap:"同一句「Aunque + 動詞」，光換陳述式或虛擬式就能傳達說話者到底知不知道／在不在乎這件事是否為真——這個細微差異在中文翻譯上常常看不出來（兩句都可能翻成「雖然/就算下雨」），但西語母語者聽得出來態度不同，這是B2讓步子句最容易被忽略的地方。",
    source:"文法補充"
  },

  {
    id:"g78", cat:"phrase", level:"b1",
    title:"拉美家庭結構多樣性：不只有核心家庭",
    rule:"拉美的家庭型態比「爸爸媽媽小孩」的核心家庭模式更多樣。大家庭同住（abuelos、tíos多代同堂）在許多國家仍是常態，不是例外；教父母制度（compadrazgo）讓沒有血緣關係的人（padrino/madrina）成為家庭核心的一份子，共同承擔養育責任；許多國家的事實婚姻／同居（unión libre）比例很高，不一定會走正式結婚登記；以媽媽/外婆為家庭核心的家庭型態（matrifocal）在加勒比海地區尤其常見，父親角色相對邊緣。聯合國拉美經濟委員會（CEPAL）長年追蹤這些家庭型態的演變趨勢。",
    examples:[
      {es:"En muchas familias latinoamericanas, varias generaciones viven bajo el mismo techo.", zh:"在許多拉美家庭裡，好幾代人住在同一個屋簷下。"},
      {es:"El padrino y la madrina son parte importante de la familia, aunque no tengan lazos de sangre.", zh:"教父教母是家庭重要的一份子，即使沒有血緣關係。"},
      {es:"En algunos países, la unión libre es tan común como el matrimonio formal.", zh:"在某些國家，事實婚姻跟正式結婚一樣普遍。"}
    ],
    trap:"不要預設「家庭」等於「爸爸媽媽小孩」的核心家庭模式——拉美很多地方大家庭同住、教父母參與育兒、不婚同居都是常態而非例外，用單一西方核心家庭的框架去理解拉美家庭會漏掉很多真實樣貌。",
    source:"文法補充"
  },

  {
    id:"g79", cat:"phrase", level:"b1",
    title:"Chifa：中秘融合美食的移民故事",
    rule:"「Chifa」是秘魯的中華融合料理，源自1849年開始抵達秘魯的華人移民（當時被稱為「苦力」culí），多數來自廣東，最初是為了到甘蔗種植園工作。這些移民帶來的飲食傳統，跟當地食材/習慣融合，逐漸發展出秘魯獨有的中華料理。「Chifa」這個詞本身源自廣東話「食飯」（吃飯），1930年代開始在利馬被當地人用來稱呼這類餐館。1921年，利馬唐人街Capón開了第一家正式掛名的Chifa餐廳「Kuong Tong」（意為「廣東」），成功把中式菜餚介紹給利馬人，其中一道用鮑魚、中式菇類與雞肉做成的料理，後來被當地人另外取名為「taypá」，成為經典融合菜代表。",
    examples:[
      {es:"El chifa es la fusión de la cocina china y la peruana.", zh:"Chifa是中式與秘魯料理的融合。"},
      {es:"La palabra 'chifa' viene del cantonés que significa 'comer arroz'.", zh:"「chifa」這個詞源自廣東話，意思是「吃飯」。"},
      {es:"Los primeros inmigrantes chinos llegaron a Perú para trabajar en las plantaciones.", zh:"最早的華人移民抵達秘魯，是為了到種植園工作的。"}
    ],
    trap:"Chifa不是「中國菜在秘魯開分店」——是移民歷經數十年在地化、跟秘魯本土食材與烹飪習慣真正融合後長出來的獨立料理體系，秘魯人自己也把Chifa視為道地秘魯美食的一部分，不是外來料理。",
    source:"文法補充"
  },

  {
    id:"g80", cat:"phrase", level:"b1",
    title:"哈瓦那唐人街：加勒比海曾經最大的中華街",
    rule:"古巴的華人移民史始於1847年6月3日，第一批「苦力」（culíes）搭乘Oquendo號抵達哈瓦那港，多數來自廣東。1847年到1874年間，約有15萬華人移民抵達古巴，多數以契約勞工身分填補非洲奴隸制度逐步廢除後的勞動力缺口，前往甘蔗種植園工作。19世紀末，華人移民聚集在Zanja街與Dragones街一帶，1874年起陸續開設商店、小吃店、洗衣店等，逐漸形成哈瓦那唐人街。20世紀初，約有一萬名華人住在唐人街十個街區裡，曾是僅次於舊金山的世界第二大唐人街。1959年古巴革命後私營事業被收歸國有，大批華人離開古巴，唐人街逐漸沒落，直到1990年代才啟動文化保存與復興計畫。",
    examples:[
      {es:"Los primeros inmigrantes chinos llegaron a Cuba en 1847.", zh:"最早的華人移民在1847年抵達古巴。"},
      {es:"El Barrio Chino de La Habana fue uno de los más grandes del mundo.", zh:"哈瓦那唐人街曾是世界上最大的唐人街之一。"},
      {es:"En la década de 1990 comenzó un programa para revivir la cultura china en Cuba.", zh:"1990年代開始了一項復興古巴華人文化的計畫。"}
    ],
    trap:"哈瓦那唐人街現在人口規模遠不如全盛時期——1959年革命後私營事業收歸國有，大批華人離開古巴，現在的唐人街主要靠1990年代啟動的文化保存計畫維持文化地標的功能，不是仍有大量華人居住的活絡社區，這點跟秘魯Chifa至今仍融入日常飲食文化的狀態不同。",
    source:"文法補充"
  },

  // ══ 🗣️ C1 俚語特區：母語者真的會用，但課本少教 ══
  // 方向跟B2不同：B2懂新聞/文化/正式表達，C1懂母語者日常/影集/雙關/地域差異
  // 不堆髒話/網路梗，重點是「聽得懂、看得懂」，不是要求主動使用

  {
    id:"g81", cat:"slang", level:"c1",
    title:"日常反應：聽懂母語者的口頭禪",
    rule:"這幾個是西語母語者聊天時幾乎每句話都會夾雜的「反應詞」，字面意思常常翻不出來，功能上更接近中文的「還好啦／沒事／隨便」這類填空語氣詞，聽懂比會用更重要。",
    examples:[
      {es:"¿Qué tal? Todo bien, gracias.", zh:"最近如何？都還好，謝謝。（¿Qué tal? 比課本教的「你好」更像是在問近況）"},
      {es:"Se me cayó el café, pero no pasa nada.", zh:"我咖啡打翻了，不過沒關係啦。（No pasa nada：沒事、不用在意）"},
      {es:"¿Vamos mañana? — Está bien.", zh:"我們明天去？——好啊。（Está bien：口頭答應/同意，比Sí更隨性）"},
      {es:"Perdí el autobús otra vez... ni modo.", zh:"我又錯過公車了……唉，沒辦法。（Ni modo：墨西哥高頻口頭禪，「事已至此、只能這樣」的無奈聳肩感）"}
    ],
    trap:"這些詞的共同點是：字面翻譯常常誤導（No pasa nada字面是「什麼都沒發生」，實際是在說「別放在心上」），母語者說出口時往往帶著一個聳肩或攤手的肢體語氣，語調比字面意思更重要。",
    source:"文法補充"
  },

  {
    id:"g82", cat:"slang", level:"c1",
    title:"情緒表達：抱怨、無奈、受夠了怎麼說",
    rule:"表達情緒疲勞/不耐煩時，母語者很少直接說「Estoy enojado」，更常用這類固定短語傳達「已經到極限了」的語氣，且有一個重要地區陷阱：¡Qué pena! 在多數拉美國家是「真可惜」，但在哥倫比亞及部分中美洲，pena 常常指「不好意思/尷尬」，等於是在道歉，不是在惋惜。",
    examples:[
      {es:"¡Qué barbaridad, otra vez llegó tarde!", zh:"太誇張了，他又遲到了！（¡Qué barbaridad!：對誇張的事表達驚訝/不滿）"},
      {es:"Perdí tu regalo... ¡qué pena me da!", zh:"我把你的禮物弄丟了……我真不好意思！（哥倫比亞用法：pena＝尷尬/不好意思，不是「可惜」）"},
      {es:"Puedes ir o no ir, a mí me da igual.", zh:"你去不去都行，我無所謂。（Me da igual：我不在乎）"},
      {es:"Estoy harta de repetir lo mismo mil veces.", zh:"我受夠了重複講一樣的話一千次。（Estoy harto/a de + 名詞/動詞：受夠了……）"},
      {es:"No aguanto más este calor.", zh:"我再也受不了這種熱了。（No aguanto más：我忍不下去了，比No puedo más語氣更強烈）"}
    ],
    trap:"¡Qué pena! 是這批裡最危險的地雷——同一句話，在秘魯/智利聽起來是「真可惜」（惋惜），在哥倫比亞聽起來卻是「不好意思」（道歉/尷尬），聽到這句要先看上下文再判斷情緒方向，不能套單一意思。",
    source:"文法補充"
  },

  {
    id:"g83", cat:"slang", level:"c1",
    title:"人際互動與年輕人口語：另外四國補給",
    rule:"延續五國俚語地圖（見「拉美各地道地口語」卡），這裡補上四個高頻但功能不同的詞：echar la mano 是泛拉美通用的「幫忙」，dale 是最安全的泛拉美同意語，órale 是墨西哥語意最有彈性的一個詞（依語氣可以是驚訝/同意/催促），de una 是哥倫比亞的「立刻/當然」。",
    examples:[
      {es:"¿Me echas la mano con esto?", zh:"你可以幫我一下這個嗎？（echar la mano：泛拉美通用，幫忙）"},
      {es:"¿Vamos al cine? — ¡Dale!", zh:"我們去看電影？——走吧！（dale：最泛拉美的「好啊」，阿根廷/委內瑞拉/加勒比海都高頻）"},
      {es:"¡Órale, no sabía que hablabas español!", zh:"哇，我不知道你會說西語！（órale：墨西哥語氣詞，這裡是驚訝，換個語調可以是「好喔/快點」）"},
      {es:"¿Nos vamos ya? — De una.", zh:"我們現在走嗎？——當然，走吧。（de una：哥倫比亞，立刻/毫不猶豫）"}
    ],
    trap:"órale 是這批裡最需要靠語調判斷意思的詞——同一個字，驚訝地說是「哇！」，平淡地說是「好喔」，急促地說是「快點！」，光看文字容易誤判，要連著語境/語氣一起理解。",
    source:"文法補充"
  },

  {
    id:"g84", cat:"slang", level:"c1",
    title:"影集常見句：母語者的口頭反應",
    rule:"這幾句是西語影集/日常對話裡出現頻率極高的「反應句」，功能類似中文的「真的假的／不會吧／我發誓」，教科書很少教，但聽力材料裡幾乎每集都會出現。",
    examples:[
      {es:"¿En serio? No puedo creerlo.", zh:"真的嗎？我不敢相信。"},
      {es:"No me digas que perdiste las llaves otra vez.", zh:"不會吧，你該不會又把鑰匙弄丟了。（No me digas：字面「別跟我說」，實際是「不會吧/真的假的」）"},
      {es:"Vi el final de la serie... qué fuerte, ¿no?", zh:"我看了影集結局……太誇張了對吧？（Qué fuerte：多見於西班牙，表達震驚/衝擊，拉美也聽得懂）"},
      {es:"Te lo juro, yo no fui.", zh:"我發誓，不是我做的。"},
      {es:"¿Que yo pague todo? ¡Ni hablar!", zh:"要我付全部的錢？想都別想！（Ni hablar：斷然拒絕，比No更堅決）"}
    ],
    trap:"No me digas 字面是命令句「別跟我說」，但實際意思剛好相反——是「請繼續說，我很驚訝」，這種「字面否定、實際是鼓勵繼續講」的反差是初學者最容易誤解的地方。",
    source:"文法補充"
  },

  {
    id:"g85", cat:"slang", level:"c1",
    title:"雙關與幽默：字面翻不出來的成語",
    rule:"這幾個成語如果只看字面會完全誤解意思——「花一隻眼睛」跟「貴」有什麼關係？「有壞奶」又是什麼意思？母語者說這些的時候完全不會意識到字面有多奇怪，因為對他們來說這就是固定搭配，跟中文「炒魷魚」不會被拆開理解是同一個道理。",
    examples:[
      {es:"Al principio no nos conocíamos, pero el chiste ayudó a romper el hielo.", zh:"一開始我們不認識，不過那個笑話幫忙打破了僵局。（romper el hielo：打開話題、化解尷尬）"},
      {es:"Perdona, ¿qué dijiste? Estaba en las nubes.", zh:"抱歉，你說什麼？我剛剛在放空。（estar en las nubes：心不在焉、恍神）"},
      {es:"Hoy tiene mala leche, mejor no le hables.", zh:"他今天心情很差，最好別跟他說話。（tener mala leche：多見於西班牙，心地不好/倒楣/心情差，依語境判斷）"},
      {es:"Ese abrigo me costó un ojo de la cara.", zh:"那件外套花了我一大筆錢。（costar un ojo de la cara：非常貴，字面「花一隻眼睛的價錢」）"}
    ],
    trap:"這類成語的共同點是：拆開單字完全猜不出意思，一定要整組當一個「語塊」記，跟本站一貫的教學原則（禁止單字死背）完全一致——遇到新成語不要逐字翻譯，先當一個不可分割的整體記下來。",
    source:"文法補充"
  },

  // ══ 🗣️ C1 專區第二批：拆成模組，貼近 DELE C1 與真實語境 ══

  {
    id:"g86", cat:"phrase", level:"c1",
    title:"C1慣用語：一針見血、進退兩難這類固定搭配",
    rule:"這批慣用語（locuciones）是C1程度的核心——比A2-B1的單字片語更抽象，常常用具體畫面比喻抽象處境（劍與牆之間、握著平底鍋的柄），全西語圈通用度高，新聞跟日常對話都會出現。",
    examples:[
      {es:"Con esa pregunta, diste en el clavo.", zh:"你這個問題問得一針見血。（dar en el clavo：字面「打中釘子」，精準說中重點）"},
      {es:"Deja de rodear el tema y ve al grano.", zh:"別再拐彎抹角了，直接講重點。（ir al grano：直奔主題）"},
      {es:"Metí la pata al mencionar su ex en la fiesta.", zh:"我在派對上提到他前任，搞砸了。（meter la pata：說錯話、搞砸）"},
      {es:"No le digas eso, solo vas a echar leña al fuego.", zh:"別跟他說那個，你只會火上加油。"},
      {es:"Cuando vio el resultado, se quedó de piedra.", zh:"他看到結果的時候整個人愣住了。（quedarse de piedra：字面「變成石頭」，嚇呆/愣住）"},
      {es:"El jefe tiene la sartén por el mango en esta negociación.", zh:"老闆在這場談判裡握有主導權。（字面「握著平底鍋的柄」，比喻掌控全局）"}
    ],
    family:{
      title:"📌 C1慣用語補給包",
      intro:"這幾個也很高頻，先認得，語感抓到了再找機會用。",
      items:[
        {es:"estar entre la espada y la pared", zh:"進退兩難（字面「在劍與牆之間」）"},
        {es:"poner los pies en la tierra", zh:"腳踏實地、實際一點"},
        {es:"tirar la toalla", zh:"放棄（源自拳擊丟毛巾認輸的動作）"}
      ]
    },
    trap:"這類慣用語幾乎都源自具體的畫面/動作（丟毛巾認輸、握住鍋柄、變成石頭），記的時候不要只背中文翻譯，想像那個畫面反而更好記，也更貼近母語者聽到這句話時腦中浮現的感覺。",
    source:"文法補充"
  },

  {
    id:"g87", cat:"vocab", level:"c1",
    title:"新聞常用抽象動詞：DW／El País天天出現的10個字",
    rule:"讀西語新聞時，這批抽象動詞的出現頻率極高，但課本很少專門教——它們大多用來描述「某人/某方做了什麼動作來回應或推動一件事」，是B2時事傳送門文章裡常見卻沒被特別標註過的高頻字，適合搭配📰B2日報一起讀。",
    examples:[
      {es:"El informe plantea varias preguntas sobre el sistema educativo.", zh:"這份報告提出了幾個關於教育體制的問題。（plantear：提出）"},
      {es:"El artículo aborda el tema de la salud mental en jóvenes.", zh:"這篇文章探討了年輕人心理健康的議題。（abordar：處理、探討）"},
      {es:"El gobierno busca impulsar la economía digital.", zh:"政府正試圖推動數位經濟。（impulsar：推動）"},
      {es:"La ONG trabaja para fomentar la igualdad de género.", zh:"這個非政府組織致力於促進性別平等。（fomentar：促進）"},
      {es:"Los datos evidencian un aumento en el desempleo.", zh:"這些數據顯示失業率上升。（evidenciar：顯示、證明）"}
    ],
    family:{
      title:"📰 新聞抽象動詞速查",
      intro:"這10個動詞在西語新聞裡幾乎天天出現，認得意思就能大幅提升讀新聞的流暢度。",
      items:[
        {es:"consolidar", zh:"鞏固"},
        {es:"cuestionar", zh:"質疑"},
        {es:"destacar",  zh:"強調、突顯"},
        {es:"asumir",    zh:"承擔、擔任"},
        {es:"reivindicar", zh:"爭取、主張（自己的權利）"}
      ]
    },
    trap:"這些動詞多半用在「正式/書面」語境——日常聊天很少會說「voy a fomentar mi amistad contigo」，這類字最適合拿來讀新聞、寫正式文章，跟日常口語的語域（register）不同，讀懂就好，不用急著在對話裡使用。",
    source:"文法補充"
  },

  {
    id:"g88", cat:"connector", level:"c1",
    title:"正式連接詞：讓論述聽起來更有邏輯層次",
    rule:"這批連接詞是C1程度的「論述骨架」——比B1教過的porque/pero/y更正式，常出現在新聞評論、學術寫作、正式演講，能把一長串句子串成有轉折/因果/補充層次的論述，是B2升C1最重要的語感差異之一。",
    examples:[
      {es:"El plan es ambicioso; no obstante, falta financiamiento.", zh:"這個計畫很有野心；然而，資金不足。（no obstante：然而，比pero更正式）"},
      {es:"No hay suficientes datos; por consiguiente, no podemos concluir nada.", zh:"數據不夠充分，因此我們無法下任何結論。（por consiguiente：因此）"},
      {es:"Él prefiere quedarse en casa; ella, en cambio, sale todos los fines de semana.", zh:"他喜歡待在家；她則相反，每個週末都出門。（en cambio：相反、反之）"},
      {es:"Cabe destacar que este fenómeno no es nuevo.", zh:"值得注意的是，這個現象並不是新的。（cabe destacar que：值得注意的是）"},
      {es:"En cuanto a los resultados, todavía es pronto para saberlo.", zh:"關於結果，現在下定論還太早。（en cuanto a：關於……方面）"}
    ],
    family:{
      title:"🧩 正式連接詞速查",
      intro:"這些字寫作/正式演講很好用，日常口語裡母語者也會用其中幾個顯得比較有條理。",
      items:[
        {es:"a pesar de ello", zh:"儘管如此"},
        {es:"de hecho", zh:"事實上"},
        {es:"en definitiva", zh:"總而言之"},
        {es:"por otra parte", zh:"另一方面"},
        {es:"asimismo", zh:"此外、同樣地"}
      ]
    },
    trap:"這批字的功能其實跟g30-g32教過的porque/pero/sino一樣（連接子句），差別只在「語域」（register）更正式——寫作文/準備正式簡報時優先用這批，朋友聊天用porque/pero就好，硬要在日常對話塞no obstante反而顯得生硬。",
    source:"文法補充"
  },

  {
    id:"g89", cat:"slang", level:"c1",
    title:"拉美高頻口語第二批：墨西哥/阿根廷再補幾個",
    rule:"延續「五國俚語地圖」（g59）跟「人際互動與年輕人口語」（g83），這裡補上墨西哥跟阿根廷還沒收錄過的高頻詞——尤其阿根廷的 re + 形容詞是一個很能舉一反三的造詞模式，前面隨便接形容詞都能用。",
    examples:[
      {es:"¿En serio perdiste el vuelo? ¡No manches!", zh:"你真的錯過班機了？不會吧！（no manches：墨西哥，比no mames溫和的「不會吧/真假」）"},
      {es:"Fuimos a la playa, qué padre estuvo.", zh:"我們去了海邊，超棒的。（qué padre：墨西哥，很棒/很讚）"},
      {es:"Hay que aguantar vara hasta que termine el proyecto.", zh:"要撐住熬到這個專案結束。（aguantar vara：墨西哥，忍耐撐過艱難時期，字面「扛著棍子」）"},
      {es:"No banco que me hablen así.", zh:"我受不了別人這樣跟我說話。（bancar：阿根廷，忍受/支持，No lo banco＝我受不了他）"},
      {es:"Esa película está re buena.", zh:"那部電影超好看的。（re + 形容詞：阿根廷，非常……，re可以隨意接在大部分形容詞前面加強語氣）"}
    ],
    trap:"re + 形容詞 是這批裡最好用的造詞模式——阿根廷人幾乎任何形容詞前面都能加re來加強語氣（re lindo/re difícil/re tarde），聽到「re」開頭先反應成「非常」就對了，不用逐字翻譯。",
    source:"文法補充"
  },

  {
    id:"g90", cat:"confusable", level:"c1",
    title:"容易誤解的表達：字面翻不出真正意思",
    rule:"這批片語如果照字面翻譯會完全誤解——「留在空白」是什麼意思？「被做成灰塵」又是什麼？這些都是固定搭配，字面意思幫不了你，一定要整組記下來。",
    examples:[
      {es:"Me preguntaron algo tan difícil que me quedé en blanco.", zh:"他們問了一個很難的問題，我腦袋一片空白。（quedarse en blanco：腦袋空白、想不起來）"},
      {es:"Después de la mudanza, estoy hecho polvo.", zh:"搬完家之後我累壞了。（estar hecho polvo：字面「被做成灰塵」，累到極限）"},
      {es:"Se puso rojo cuando le dijeron que le gustaba.", zh:"當他們說喜歡他的時候，他臉紅了。（ponerse rojo：臉紅）"},
      {es:"Nita y Tito se llevan muy bien.", zh:"妮妲和迪多相處得很融洽。（llevarse bien：相處融洽，跟caer bien不同——llevarse是描述兩人之間的關係，caer bien是描述某人給人的第一印象）"},
      {es:"Este examen es pan comido.", zh:"這場考試易如反掌。（ser pan comido：字面「被吃掉的麵包」，輕而易舉）"}
    ],
    family:{
      title:"🔍 補充兩個",
      intro:"",
      items:[
        {es:"tener pinta de", zh:"看起來像……（Tiene pinta de estar cansado.＝他看起來很累）"},
        {es:"estar de mala leche", zh:"心情很差、脾氣不好（多見於西班牙，跟g85的tener mala leche同源）"}
      ]
    },
    trap:"llevarse bien（相處融洽，描述關係）容易跟g39教過的caer bien（討人喜歡，描述第一印象）搞混——判斷方法：llevarse一定要有「兩個人」在句子裡（Nos llevamos bien），caer bien只需要一個人被評價（Me cae bien）。",
    source:"文法補充"
  },

  {
    id:"g91", cat:"slang", level:"c1",
    title:"母語者感嘆句第二批：影集/日常反應句",
    rule:"延續g84「影集常見句」，這裡再補7句更強烈的反應句——這批有幾句明顯偏西班牙用法（¡Anda ya!／¡Venga ya!／¡Qué pasada!），拉美也聽得懂但不是當地最高頻的講法，聽到時知道意思就好，不用當作拉美日常台詞的預設選項。",
    examples:[
      {es:"¡No me lo puedo creer, ganamos!", zh:"我不敢相信，我們贏了！"},
      {es:"¿Que te comiste todo el pastel? ¡Anda ya!", zh:"你把整個蛋糕吃光了？不是吧！（¡Anda ya!：多見於西班牙，表達不可置信/懷疑）"},
      {es:"¿Otra vez llegas tarde? ¡Venga ya!", zh:"你又遲到了？拜託喔！（¡Venga ya!：多見於西班牙，不耐煩的抱怨）"},
      {es:"¡No fastidies! ¿En serio te despidieron?", zh:"別鬧了！你真的被解僱了？（¡No fastidies!：別鬧了/開玩笑吧，語氣較溫和）"},
      {es:"¡Madre mía, qué susto me diste!", zh:"我的天啊，你嚇死我了！（¡Madre mía!：泛西語圈通用，驚訝/震驚）"}
    ],
    family:{
      title:"😲 再補兩句",
      intro:"",
      items:[
        {es:"¡Qué pasada!", zh:"太厲害了！（多見於西班牙，對厲害的事物讚嘆）"},
        {es:"¡Menudo lío!", zh:"真是一團亂！（形容混亂的場面）"}
      ]
    },
    trap:"¡Madre mía! 是這批裡唯一泛西語圈都通用、沒有地區限制的一句，其餘幾句（¡Anda ya!/¡Venga ya!/¡Qué pasada!）偏西班牙腔，如果只想學拉美最常用的反應句，優先記g84已經教過的¡Qué fuerte!／¡Ni hablar!／¡En serio?就夠用。",
    source:"文法補充"
  },

  {
    id:"g92", cat:"proverb", level:"c1",
    title:"西語諺語：跟中文很多異曲同工的智慧",
    rule:"諺語（refranes）是C1程度很重要的文化資產——很多西語諺語剛好能對應到一句意思相近的中文成語/俗語，記的時候直接配對中文版本，比死記西語字面意思容易得多。",
    examples:[
      {es:"No todo lo que brilla es oro.", zh:"並非閃閃發光的都是金子。（對應中文「金玉其外，敗絮其中」的反向提醒）"},
      {es:"Más vale tarde que nunca.", zh:"遲做總比不做好。"},
      {es:"A caballo regalado no le mires el diente.", zh:"別人送的馬別去看牠的牙齒。（對應中文「禮物別挑剔」）"},
      {es:"Quien mucho abarca, poco aprieta.", zh:"貪多嚼不爛。"},
      {es:"Dime con quién andas y te diré quién eres.", zh:"告訴我你跟誰在一起，我就告訴你你是什麼樣的人。（對應中文「近朱者赤，近墨者黑」）"},
      {es:"No hay mal que por bien no venga.", zh:"塞翁失馬，焉知非福。"}
    ],
    family:{
      title:"📚 再補四句",
      intro:"",
      items:[
        {es:"El hábito no hace al monje.", zh:"人不可貌相（字面「習慣不能造就修士」，別以外表判斷人）"},
        {es:"En boca cerrada no entran moscas.", zh:"禍從口出（字面「閉著的嘴蒼蠅飛不進去」，話少惹禍少）"},
        {es:"Más vale prevenir que curar.", zh:"預防勝於治療。"},
        {es:"El tiempo pone todo en su lugar.", zh:"時間會證明一切。"}
      ]
    },
    trap:"諺語適合「認得就好」，日常對話裡母語者確實會引用（尤其長輩），但初學者硬要在對話中主動使用諺語容易顯得刻意或用錯場合，優先目標是聽到/讀到時能理解，之後聽多了自然知道什麼場合適合接一句。",
    source:"文法補充"
  },

  {
    id:"g93", cat:"slang", level:"c1",
    title:"日常名詞地圖：同一個東西，各國真的不同字",
    rule:"西語是「多中心語言」——約20個官方語言國家各自有自己的媒體/教育系統，沒有單一權威去統一詞彙，這點跟中文（普通話/國語推行力量較集中）不太一樣，日常最基本的名詞（爆米花、手機、電腦、公車）常常各國各自一套字，不是口音差異，是完全不同的單字。",
    examples:[
      {es:"En España y México se dice 'palomitas', pero en Argentina es 'pochoclo'.", zh:"西班牙跟墨西哥說 palomitas（爆米花），但阿根廷說 pochoclo。（palomitas其實是最泛用的預設字，不是西班牙專屬）"},
      {es:"En la mayoría de Latinoamérica dicen 'celular', pero en España dicen 'móvil'.", zh:"拉美多數地方說 celular（手機），西班牙說 móvil。"},
      {es:"En Latinoamérica es 'computadora', en España es 'ordenador'.", zh:"拉美說 computadora（電腦），西班牙說 ordenador。"},
      {es:"¿Tomamos un colectivo? — En Argentina sí, pero en México dirían 'camión' y en Chile 'micro'.", zh:"我們搭公車吧？——阿根廷會說colectivo，墨西哥會說camión，智利會說micro，全部都是「公車」。"}
    ],
    family:{
      title:"🌎 爆米花地圖＋補充幾個",
      intro:"同一個東西，光是「爆米花」跟「公車」這兩樣就能收集到五六種完全不同的單字。",
      items:[
        {es:"🌍 palomitas", zh:"爆米花（西班牙+墨西哥+多數中美洲，最泛用）"},
        {es:"🇦🇷 pochoclo", zh:"爆米花（阿根廷）"},
        {es:"🇨🇴 crispetas", zh:"爆米花（哥倫比亞）"},
        {es:"🇨🇱 cabritas", zh:"爆米花（智利，字面「小山羊」）"},
        {es:"🇻🇪 cotufas", zh:"爆米花（委內瑞拉）"},
        {es:"🇵🇪 canchita", zh:"爆米花（秘魯）"},
        {es:"🇲🇽 popote", zh:"吸管（墨西哥）"},
        {es:"🇪🇸 pajita", zh:"吸管（西班牙）"},
        {es:"🇨🇴 pitillo", zh:"吸管（哥倫比亞，注意：也可指「香菸」，看語境）"}
      ]
    },
    trap:"最經典的地雷是「guagua」——在古巴/波多黎各是「公車」，但在智利/秘魯（受蓋丘亞語影響）卻是「嬰兒/小寶寶」，同一個字兩個意思天差地遠，聽到這個字一定要先確認是在跟哪國人說話，不然會鬧笑話。中文其實也有類似現象（台灣講計程車，中國講出租車，新加坡講德士，香港粵語講的士），只是普通話/國語的推廣力道較強，分散程度沒有西語這麼極端。",
    source:"文法補充"
  },

  // ══ 🎭 C2 Lengua y Cultura：不是更難的文法，是文化理解、語感、修辭 ══
  // C1=Fluidez（流利度）／C2=Profundidad（深度）
  // 目前只收錄安全、不涉及版權/杜撰風險的4個模組：修辭／歷史典故／政治語言／古典西語
  // 文學引用／影視台詞／幽默迷因／雙關語 這幾塊需要更謹慎的版權尺度或真實查證，暫緩

  {
    id:"g94", cat:"rhetoric", level:"c2",
    title:"修辭手法：新聞和演講都在用的5種技巧",
    rule:"B2之後文法幾乎都學完了，真正的差距在於認得出「這句話用了什麼修辭技巧」——新聞標題、政治演講、廣告文案幾乎都建立在這幾種修辭手法上，認得出來，讀西語文本的理解深度會完全不同。",
    examples:[
      {es:"El tiempo es oro.", zh:"時間就是金錢。（metáfora隱喻：直接把兩個不同的東西劃上等號，不用「像」）"},
      {es:"¡Qué puntual! — dicho a alguien que llegó una hora tarde.", zh:"「你真準時！」——對一個遲到一小時的人這樣說。（ironía反諷：說出來的話跟真正意思相反）"},
      {es:"Te lo he dicho un millón de veces.", zh:"我跟你說了一百萬次了。（hipérbole誇飾：刻意誇大來強調語氣，不是字面數字）"},
      {es:"Cuanto más aprendo, más me doy cuenta de lo poco que sé.", zh:"我學得越多，就越發現自己知道得多麼少。（paradoja悖論：表面矛盾卻蘊含道理的說法）"},
      {es:"El viento susurraba entre los árboles.", zh:"風在樹間低語。（personificación擬人：把非人的事物賦予人的動作/情感）"}
    ],
    trap:"這幾種修辭手法中文裡也都有對應（隱喻/反諷/誇飾/悖論/擬人），差別只在西語的觸發詞不太一樣——metáfora不會出現「como」（那是明喻símil，「El tiempo vuela como una flecha」才是明喻），一看到直接劃等號、沒有「像/如同」就是隱喻。",
    source:"文法補充"
  },

  {
    id:"g95", cat:"history", level:"c2",
    title:"為什麼新聞常提到這幾個歷史詞：西語圈的共同記憶",
    rule:"這幾個歷史詞彙不是要背年代細節，而是要認得「新聞/政治人物引用這個詞時，在暗示什麼共同記憶」——它們是西語圈（尤其西班牙與拉美）公共討論裡的共用符碼，不知道背景會漏掉言外之意。",
    examples:[
      {es:"La Reconquista duró casi ocho siglos, de 711 a 1492.", zh:"收復失地運動持續了將近八個世紀，從711年到1492年。（西班牙從伊斯蘭統治下逐步收復領土的漫長過程，至今仍是西班牙民族認同論述的常見引用點）"},
      {es:"El Siglo de Oro español fue una época de gran esplendor literario y artístico.", zh:"西班牙黃金世紀是文學藝術大放異彩的時代。（約16-17世紀，Cervantes、Lope de Vega都活躍於這個時期，「黃金世紀」這個詞本身就常被拿來比喻任何領域的巔峰期）"},
      {es:"La Guerra Civil española dividió al país entre 1936 y 1939.", zh:"西班牙內戰在1936到1939年間讓這個國家分裂。（至今西班牙政治語言裡「兩個西班牙」的分裂意象仍常被引用，是理解當代西班牙政治的重要背景）"},
      {es:"La Conquista de América cambió el curso de la historia de dos continentes.", zh:"美洲的征服改變了兩塊大陸的歷史軌跡。（西班牙殖民美洲的起點，拉美的身分認同論述經常需要回應/重新詮釋這段歷史）"}
    ],
    family:{
      title:"📜 再補一個",
      intro:"",
      items:[
        {es:"Virreinato", zh:"總督轄區（殖民時期的行政體制名稱，例如秘魯的Virreinato del Perú）"}
      ]
    },
    trap:"這些詞彙的重點是「知道背景即可」，不是要能複述完整歷史——聽到政治人物或新聞引用「Reconquista」或「la Guerra Civil」的意象時，能聯想到大概是在講「收復/對抗外來勢力」或「國家分裂的傷痕」這類弦外之音，就已經達到C2程度該有的文化理解深度。",
    source:"文法補充"
  },

  {
    id:"g96", cat:"politics", level:"c2",
    title:"政治語言：izquierda/derecha的真正意思，不是字典意思",
    rule:"這幾個詞字典翻譯很簡單（izquierda=左，derecha=右），但新聞裡的實際意思是政治光譜的位置，這個左右分類的說法源自法國大革命時期國民議會的座位安排（支持革命的坐左邊、保王派坐右邊），之後才演變成全球通用的政治光譜詞彙。",
    examples:[
      {es:"Los partidos de izquierda suelen apoyar más intervención del Estado en la economía.", zh:"左派政黨通常支持國家更多介入經濟。（一般傾向：izquierda關聯社會平等/政府介入，非絕對規則）"},
      {es:"La derecha tradicional defiende el libre mercado y la propiedad privada.", zh:"傳統右派主張自由市場與私有財產。（一般傾向：derecha關聯自由市場/傳統秩序，非絕對規則）"},
      {es:"Un político progresista busca cambios sociales rápidos.", zh:"進步派政治人物追求快速的社會變革。（progresista：傾向改革/加速社會變化的立場）"},
      {es:"Los conservadores prefieren mantener las tradiciones e instituciones existentes.", zh:"保守派傾向維持既有的傳統與體制。（conservador：傾向維持現狀/漸進變化的立場）"}
    ],
    trap:"這批詞的用法在不同國家意義可能有落差——同一個政黨在一國被稱為izquierda，換到另一國的政治光譜位置可能不完全對應，讀新聞時不要把「左/右」當成放諸四海皆準的固定分類，要看該國實際的政治脈絡；這裡只提供中性的字面/歷史定義，不涉及對任何立場的評價。",
    source:"文法補充"
  },

  {
    id:"g97", cat:"classical", level:"c2",
    title:"古典西語：不用學古文，但要認得出處",
    rule:"C2程度不需要真的讀懂古西語文獻，但要能「認出」這是引用自哪個經典源頭——《唐吉訶德》的開頭是全西語圈最常被引用/仿寫的一句話，即使沒讀過原著，母語者也幾乎都認得這句開場白。",
    examples:[
      {es:"En un lugar de la Mancha, de cuyo nombre no quiero acordarme...", zh:"在拉曼查的某個地方，我不想記起它的名字……（《唐吉訶德》1605年開場白，全書最著名的一句，常被戲仿套用在各種語境的開場，1605年作品，公共領域）"}
    ],
    trap:"聽到「de cuyo nombre no quiero acordarme」這種句型被套用在完全不相關的語境（比如講一家難吃的餐廳），那就是在仿寫唐吉訶德的開場白開玩笑——這種「借用經典句型套在日常小事上」的幽默手法在西語圈很常見，認出出處就能get到笑點；此外，正式/宗教語域裡偶爾會出現古老的vosotros動詞變位（現代西班牙日常也還在用，但拉美已完全改用ustedes），聽到時知道是同一套系統的older register即可，不用另外去學。",
    source:"文法補充"
  },

  {
    id:"g98", cat:"literature", level:"c2",
    title:"文學：一句話認一位大師，不讀全文",
    rule:"每位作家只引最短、最著名的一句（每句都已查證是真實原文），重點放在「這句話用了什麼技巧」跟「為什麼母語者一聽就知道是誰寫的」，不提供全文，也不做逐句賞析——認出這句話、懂它的手法跟份量，就是C2程度該有的文學素養。",
    examples:[
      {es:"Verde que te quiero verde.", zh:"綠啊，我多麼愛你這綠色。（Federico García Lorca《夢遊人謠》1928年，收錄於《吉普賽故事詩集》。修辭：anáfora重複疊詠，「verde」像咒語一樣反覆出現，貫穿全詩製造神秘/慾望的氛圍。文化背景：這句是西語圈最常被單獨引用的詩句之一，即使沒讀過全詩，母語者聽到「verde que te quiero verde」也會立刻認出是Lorca。）"},
      {es:"El tiempo es la sustancia de que estoy hecho.", zh:"時間是構成我的材質。（Jorge Luis Borges《時間的新反駁》。修辭：隱喻，把抽象的「時間」直接說成具體的「材質/物質」。文化背景：這句出自Borges探討時間與自我認同的哲學隨筆，是他「用文學語言做哲學思考」風格的代表句，也曾被高達的電影《阿爾發城》引用。）"},
      {es:"Puedo escribir los versos más tristes esta noche.", zh:"今夜我能寫出最悲傷的詩句。（Pablo Neruda《詩篇二十首》第20首開場白，1924年。修辭：直白的第一人稱陳述句，不用華麗辭藻卻極具情感重量，是Neruda早期風格的特色。文化背景：這是二十世紀被引用/翻譯最多次的西語情詩開頭之一，19歲的Neruda寫下這句時還未成名。）"}
    ],
    trap:"Gabriel García Márquez沒有收錄在這批引用裡——不是他不重要（《百年孤寂》幾乎是拉美文學的代名詞），而是他2014年才過世，作品版權保護期還很長，這裡改用談論他開創的「魔幻寫實主義」（realismo mágico：把超自然/奇幻元素用平鋪直敘的語氣描述，讓讀者分不清是真實還是幻想）這個文學技巧本身，不直接引用他的原文字句。",
    source:"文法補充"
  },

  {
    id:"g99", cat:"cinema", level:"c2",
    title:"影視：一句台詞認一部片，不做完整對話",
    rule:"這兩句台詞都已查證是電影真實原文（多來源交叉確認），只收一句＋場景說明＋語氣解析，不重現完整對話——目標是「聽到這句話能聯想到哪部片、哪個場景、什麼語氣」，這是母語者看戲/聊電影時最自然會用到的文化默契。",
    examples:[
      {es:"La vida es como la espuma, por eso hay que darse como el mar.", zh:"人生就像泡沫，所以要像大海一樣付出自己。（《你媽媽也一樣》Y tu mamá también，2001年，Alfonso Cuarón導演。場景：公路旅行途中，樸實的漁夫角色Chuy對兩個滿腦子只顧自己戀愛煩惱的青少年主角說的話。語氣：平靜、帶著生活智慧，跟電影其他部分青春期的浮躁形成強烈對比，是全片情感的轉折點之一。）"},
      {es:"No puedes entrar en el mismo río dos veces.", zh:"你不能兩次踏入同一條河。（《羊男的迷宮》El laberinto del fauno，2006年，Guillermo del Toro導演。場景：談論改變與無常時說出的一句話。語氣：哲學性、帶著淡淡的憂傷，呼應全片在西班牙內戰背景下「童年純真 vs 殘酷現實」的核心對比。）"}
    ],
    trap:"這句河流的台詞其實源自古希臘哲學家赫拉克利特（Heráclito）的名言，電影只是借用這個哲學典故放進台詞裡——聽到西語作品裡出現「el mismo río dos veces」這個意象，可以聯想到這是在引用一個更古老的西方哲學傳統，不是編劇原創的比喻，這種「借用經典典故」的手法跟文學卡片裡Lorca/Borges的引用邏輯是同一回事，都需要認出「這句話還在呼應誰」。",
    source:"文法補充"
  },

  {
    id:"g100", cat:"pragmatics", level:"c2",
    title:"真實西語：o sea／es que／pues 到底在幹嘛",
    rule:"這批詞不是文法，是語用學（pragmática）——母語者天天說，但字典查到的翻譯完全幫不上忙，因為它們的功能不是「表達意思」而是「調節語氣、爭取思考時間、轉換話題、軟化衝突」。同一個詞在不同位置/語調下可以是完全不同的功能，這是B2文法課本幾乎不會教、但C2程度非懂不可的一塊。",
    examples:[
      {es:"O sea, lo que quiero decir es que no puedo ir.", zh:"我是說，我想表達的是我不能去。（o sea：換句話說/我是說，用來重新措辭、講得更清楚，不是「或者是」的字面意思）"},
      {es:"No fui a la fiesta... es que tenía mucho trabajo.", zh:"我沒去派對……是因為我工作很多。（es que：開頭表示「找理由解釋/找藉口」，帶一點防衛/辯解的語氣，中文很難找到對應詞，功能上接近「其實是因為……」）"},
      {es:"Pues no sé qué decirte.", zh:"呃，我不知道該說什麼。（pues：這裡是猶豫語氣詞，爭取思考時間，不是「所以/因此」的邏輯連接功能）"},
      {es:"Bueno... vamos a ver qué pasa.", zh:"呃……我們看看會怎樣吧。（bueno在句首：不是「好的」，是猶豫/轉折/準備換話題的語氣詞）"},
      {es:"Ya veo por qué no viniste.", zh:"我懂了，我知道你為什麼沒來了。（ya veo：不是字面「已經看見」，是「我懂了/我了解了」）"},
      {es:"Ya veremos qué pasa.", zh:"到時候再看看情況吧。（ya veremos：不承諾任何事的緩兵之計，接近「再說吧」）（es：ya 不只表示「已經」，也可表示語氣轉折）"},
      {es:"¡Ya basta!", zh:"夠了！（ya basta：表達已經到極限、要求停止）"},
      {es:"¿Terminaste? — Ya está.", zh:"你弄完了嗎？——好了，就這樣。（ya está：完成了/就這樣定案，帶收尾語氣）"}
    ],
    family:{
      title:"🗣️ Bueno...到底是哪種「好」？",
      intro:"同一個bueno，依語境可能是這幾種完全不同的功能，光看文字猜不出來，要聽語調/看上下文：",
      items:[
        {es:"Bueno, no sé si sea buena idea.", zh:"猶豫：對這件事不太確定"},
        {es:"Bueno, pero yo creo que...", zh:"轉折：準備提出不同意見"},
        {es:"Bueno, ¿y tú qué hiciste hoy?", zh:"換話題：結束目前這個話題"},
        {es:"Bueno, tengo que colgar.", zh:"結束對話：準備收尾/掛電話"},
        {es:"Bueno... si tú lo dices.", zh:"不完全同意：勉強接受，語氣帶保留"}
      ]
    },
    trap:"vamos／anda／venga 這三個詞也是同樣邏輯——vamos常常不是「我們走」而是「我是說/也就是說」（Vamos, que no te gustó＝也就是說你不喜歡）；anda可以是「走吧」也可以是驚訝的「哎呀」；venga（多見於西班牙）除了「來吧」還常用來表示「好啦/講定了」或不耐煩的「拜託」。這批詞的共同心法是：先看整句的語氣/上下文，再決定它在扮演哪個功能，不要死背單一翻譯。",
    source:"文法補充"
  },

  {
    id:"g101", cat:"etiquette", level:"c2",
    title:"文化禁忌與禮貌：tú/usted、家庭稱呼、地區敏感話題",
    rule:"這批是母語者從小自然學會、但課本很少系統整理的社交默契——什麼時候該用usted而不是tú，光靠「熟不熟」這條規則在有些國家完全不適用；哪些話題開玩笑OK、哪些容易踩雷，也因國家而異，不是放諸四海皆準。",
    examples:[
      {es:"En Costa Rica, muchas familias usan 'usted' incluso entre padres e hijos.", zh:"在哥斯大黎加，許多家庭連父母跟子女之間都用usted。（這個現象叫「ustedeo」：多數西語地區tú/usted的分界是「熟悉度」，但哥斯大黎加/哥倫比亞部分地區把usted當成親密關係裡表達溫暖尊重的預設用法，不是疏遠/正式的訊號，套用「熟人才用tú」的直覺在這些地方會誤判。）"},
      {es:"En Colombia, el 'usted' también se usa entre parejas y amigos cercanos.", zh:"在哥倫比亞，usted也用在情侶跟熟朋友之間。（同樣是ustedeo現象，跟西班牙/墨西哥「usted＝疏遠正式」的直覺不同。）"},
      {es:"Le puedes decir 'tío' o 'tía' a un amigo cercano de tus padres, aunque no sea tu pariente real.", zh:"你可以叫爸媽的熟朋友「tío/tía」（叔叔/阿姨），即使他們沒有血緣關係。（虛擬親屬稱謂，跟g78提過的compadrazgo同一個文化邏輯——用家族稱謂表達親密感，不是字面上真的有親戚關係。）"},
      {es:"'Mijo' o 'mija' se usa como forma cariñosa, no solo para hijos biológicos.", zh:"「mijo/mija」（我兒子/我女兒的縮寫）常當親暱稱呼，不是只對親生子女才能用——年長者對晚輩、甚至朋友之間都可能這樣稱呼，表達疼愛而非字面血緣關係。"}
    ],
    family:{
      title:"⚠️ 地區敏感話題（一般性提醒，非涵蓋全部）",
      intro:"以下是幾個「初次見面/不熟的人之間」建議謹慎的話題方向，實際尺度仍要看對象跟情境判斷：",
      items:[
        {es:"política reciente / dictaduras", zh:"近代政治／獨裁歷史（如智利/阿根廷的軍政府時期）——對當地人可能是很沉重的家族記憶，不熟的人之間不適合當玩笑話題"},
        {es:"comparar países (\"tu país es más pobre/atrasado\")", zh:"國家之間比較優劣——容易被解讀成帶著殖民/優越感的評價，即使是無心的比較也可能冒犯"},
        {es:"coger", zh:"這個字在西班牙是中性的「拿、抓」，但在墨西哥/多數拉美地區是粗俗的性暗示詞——同一個字，換個國家意思完全不同，不確定對方國籍時優先用agarrar/tomar更保險"}
      ]
    },
    trap:"tú/usted的選擇不是單純的「文法規則」，是活生生的地區文化默契——同一句話在墨西哥用usted可能顯得客氣得體，在阿根廷朋友之間用usted反而顯得刻意疏遠。不確定時，觀察對方怎麼稱呼你、跟著對方的選擇走，會比死記一套規則更安全。",
    source:"文法補充"
  },

  {
    id:"g102", cat:"etymology", level:"c2",
    title:"西語裡的阿拉伯語遺產：800年伊斯蘭西班牙留下的字",
    rule:"西語詞彙裡藏著大量阿拉伯語借詞——這是伊斯蘭勢力統治伊比利半島（711-1492年，長達近800年）留下的語言遺產，估計現代西語詞彙裡有數千個字源自阿拉伯語。最好認的線索是「al-」開頭——這其實是阿拉伯語的定冠詞「al」黏進了字裡，跟阿拉伯語原文一起被借進西語，變成單字固定的一部分（不像英語borrow時通常會把冠詞拿掉）。",
    examples:[
      {es:"Ojalá tengas un buen viaje.", zh:"希望你旅途順利。（ojalá源自阿拉伯語「law šā' allāh／in šā' allāh」，字面「若真主願意」——這正是為什麼ojalá後面固定接虛擬式（見g29）：它骨子裡本來就是「祈求上天允許」的語氣，不是普通的「希望」，虛擬式的不確定/祈願語感其實就藏在這個詞的阿拉伯語源頭裡。）"},
      {es:"Esta camisa es de algodón.", zh:"這件襯衫是棉做的。（algodón源自阿拉伯語al-qutn，「al-」定冠詞直接黏進西語字裡。）"},
      {es:"¿Me pasas el azúcar?", zh:"可以幫我拿糖嗎？（azúcar源自阿拉伯語as-sukkar，這個字本身還可以再往上追溯到梵語/波斯語，是一條橫跨歐亞的糖業貿易路線留下的語言痕跡。）"}
    ],
    family:{
      title:"🕌 再認得幾個「al-」開頭的字",
      intro:"下次看到西語單字開頭是al-，有很高機率是阿拉伯語借詞：",
      items:[
        {es:"aceite", zh:"油（源自az-zait）"},
        {es:"alcohol", zh:"酒精（源自al-kuhl）"},
        {es:"almohada", zh:"枕頭（源自al-mihadda）"},
        {es:"alfombra", zh:"地毯（源自al-khumra）"},
        {es:"alcalde", zh:"市長（源自al-qadi，原意是「法官」）"},
        {es:"hasta", zh:"直到（介系詞，源自阿拉伯語hatta，沒有al-開頭但一樣是常被引用的例子）"}
      ]
    },
    trap:"這批詞彙的重點不是要背語源學考古細節，而是理解「西語不是一個單純的拉丁語後代」——它是拉丁語骨架上疊了近800年阿拉伯語影響的混血語言，這也是為什麼西語跟同樣源自拉丁語的義大利語/法語相比，詞彙庫明顯多出一整層阿拉伯語血統，這條語源脈絡也能解釋一些「規則例外」（例如ojalá為什麼固定觸發虛擬式）背後真正的歷史原因。此外西語詞彙還有第二層「借詞血統」——來自納瓦特爾語（náhuatl，墨西哥原住民語言）的美洲原生詞彙，例如chocolate（源自náhuatl的xocolatl）、tomate（源自tomatl）——阿拉伯語代表舊大陸伊斯蘭統治的痕跡，納瓦特爾語則代表新大陸原住民文化的痕跡，兩層借詞加在一起，才是西語詞彙真正的混血身世。",
    source:"文法補充"
  },

  {
    id:"g103", cat:"falseeq", level:"c2",
    title:"翻譯陷阱：字典給一個翻譯，但兩個字不能互換",
    rule:"這批不是單字意思錯（不是假同源字），而是「字典查到的翻譯是對的，但兩個西語字之間的細膩差異，字典完全沒告訴你」——這種「同義詞不同感覺」的落差，是C2程度最後也最難的一塊，因為初中階都已經學過這些字，卻不知道母語者怎麼區分它們。",
    examples:[
      {es:"Te quiero.", zh:"我喜歡你（喜歡的程度，用在朋友、家人、關係初期的戀人都可以）。（vs Te amo：兩者字典都翻成「我愛你」，但te quiero語氣較輕、使用範圍廣，te amo通常保留給更深層/更慎重的愛情場合，跟朋友或家人說te amo在有些語境反而顯得太重。）"},
      {es:"Esto es mi casa.", zh:"這是我家（房子本身，物理空間）。（vs hogar：casa是建築物，hogar帶著情感重量，強調「有歸屬感的地方」——Volver a casa是回到那棟房子，volver al hogar強調的是回到心裡覺得溫暖安全的地方，兩者常常互換使用但語感有細微差別。）"},
      {es:"Es un buen amigo.", zh:"他是個好朋友（比較深的交情）。（vs conocido：西語的amigo門檻通常比英語「friend」高，很多英語使用者會叫「friend」的關係，西語母語者反而會說conocido（認識的人），不會隨便升級成amigo。）"},
      {es:"Estoy triste.", zh:"我難過（一般程度的情緒低落）。（vs deprimido：triste是日常的難過/低落，deprimido帶有臨床/嚴重的意涵（接近憂鬱），不要把「我今天心情不好」直接套用deprimido，語氣會過重。）"}
    ],
    trap:"這些字對之所以難，是因為初學者往往先學到「字面對應的那一個」（casa=house, amigo=friend），後來才發現母語者實際使用時心裡另外劃了一條更細的線——解法不是硬記規則，是多聽母語者在什麼情境選哪個字，慢慢校準自己的語感。",
    source:"文法補充"
  },

  {
    id:"g104", cat:"socioling", level:"c2",
    title:"社會語言學：你怎麼說話，洩漏了你是誰",
    rule:"語言選擇不只是「對不對」，還會洩漏說話者的地區、世代、甚至社會階層——這是社會語言學（sociolingüística）研究的核心：同一件事有好幾種說法，選哪一種往往比文法正確與否傳達更多訊息。",
    examples:[
      {es:"Le vi ayer en la calle.", zh:"我昨天在街上看到他（西班牙中部/馬德里常見說法）。（這是「leísmo de persona」——用le取代lo指稱男性人物受詞，在西班牙中部被視為標準甚至略帶文化正統感；但用在指「物」的受詞（如Le compré＝我買了它，該用lo）則被視為不標準。拉美地區普遍沒有這個現象，一律用lo。）"},
      {es:"Vos tenés razón.", zh:"你說得對（阿根廷/烏拉圭voseo）。（voseo在阿根廷/烏拉圭是全國通用、電視新聞都用的標準正式用法，帶著文化自信；但在部分其他國家（如某些安地斯地區），voseo歷史上曾被視為「鄉下/沒受教育」的說法——同樣的文法形式，在不同國家的社會地位天差地遠。）"},
      {es:"Buenas, ¿cómo está usted?", zh:"您好，您好嗎（正式用usted）。（年長世代/傳統場合較常見；許多國家的年輕世代在非正式場合傾向更快跳過usted直接用tú，這種「usted使用頻率隨世代下降」的趨勢本身就是一種可觀察的語言變化。）"}
    ],
    family:{
      title:"🇦🇷 voseo實際變位長什麼樣",
      intro:"vos不是tú的錯誤講法，是一整套獨立的動詞變位——重音位置跟tú版本不同（動詞字尾重音），這不是選擇題，是阿根廷/烏拉圭的標準文法：",
      items:[
        {es:"tú tienes → vos tenés", zh:"你有（tú版本 vs voseo版本，注意tenés的重音在最後一個音節）"},
        {es:"tú quieres → vos querés", zh:"你想要"},
        {es:"tú eres → vos sos", zh:"你是（這組差異最大，sos完全不是eres的變形，是獨立詞源）"}
      ]
    },
    trap:"社會語言學教會我們的最重要一課是：沒有「唯一正確」的西語，只有「這個場合/這個地區/這個世代的人會怎麼說」——leísmo在馬德里是常態，在利馬卻幾乎聽不到；voseo在布宜諾斯艾利斯是新聞主播的標準腔，換個國家意義完全不同。理解這些差異背後的社會脈絡，比死記「哪個才是標準西語」更接近C2該有的語言深度。",
    source:"文法補充"
  },

  {
    id:"g105", cat:"inclusive", level:"c2",
    title:"包容語言：Todos/Todas/Todes 這場還在進行的辯論",
    rule:"西語的陽性複數（如todos）傳統上同時代表「純陽性群體」跟「男女混合群體」，這個文法慣例近年在西語圈引發語言是否隱含性別偏見的公共辯論——這裡只中性描述各種說法實際存在、誰在用、官方立場是什麼，不代表任何立場，讀新聞/社群媒體時看到這些形式能認得、知道背景即可。",
    examples:[
      {es:"Todos los estudiantes deben entregar la tarea.", zh:"所有學生都要交作業。（傳統陽性複數todos，文法上同時涵蓋男女混合群體，是最普遍、教科書教的標準用法。）"},
      {es:"Todos y todas son bienvenidos a la reunión.", zh:"歡迎所有男性和女性參加會議。（todos y todas：陽陰性並列的「雙形式」寫法，行政公文/演講裡常見，明確同時指名男女，比單用todos更清楚但也更冗長。）"},
      {es:"Todes son bienvenides a la comunidad.", zh:"歡迎所有人加入這個社群（不分性別）。（todes：用-e取代-o/-a字尾，是近年在部分社運/LGBTI+/年輕世代圈子裡使用的性別中性形式，RAE〔西班牙皇家學院〕官方不承認這是標準文法，但在特定社群/語境裡是真實會遇到的用法。）"},
      {es:"El alumnado debe entregar la tarea antes del viernes.", zh:"全體學生要在週五前交作業。（alumnado：用集合抽象名詞取代「los alumnos」，一次涵蓋所有性別，這個策略連RAE都認可，是行政/教育文件裡最常見、爭議最小的中性表達方式，比造新字尾更保守安全。）"}
    ],
    family:{
      title:"📋 集合名詞策略：連RAE都認可的中性表達",
      intro:"用「集合抽象名詞」取代「陽性複數＋todos」，是爭議最小的中性化策略——不造新字，只是換一個本來就存在的字：",
      items:[
        {es:"los alumnos → el alumnado / el estudiantado", zh:"學生們 → 全體學生（集合名詞）"},
        {es:"los profesores → el profesorado", zh:"老師們 → 全體教師"},
        {es:"los ciudadanos → la ciudadanía", zh:"公民們 → 公民（集合概念）"},
        {es:"los niños → la infancia", zh:"孩子們 → 兒童（集合概念，較正式/書面）"}
      ]
    },
    trap:"RAE的官方立場是：西語的陽性複數本來就有「泛指/中性」功能，不需要另外造字，todes/-e字尾、todxs/@這類寫法不屬於規範文法；但反對意見認為語言會隨社會演變、官方規範不代表唯一現實。集合名詞策略（alumnado/profesorado/ciudadanía）是三種方案裡爭議最小的一種，因為它不發明新文法，只是換一個本來就存在、大家都能接受的字。讀者遇到todes/elle（第三人稱中性代名詞，介於él/ella之間）這類形式時，只需要知道「這是特定圈子的性別中性表達方式，不是拼字錯誤」，這場辯論在西語圈仍在進行中，沒有單一定論。",
    source:"文法補充"
  },

  {
    id:"g106", cat:"history", level:"c2",
    title:"Al-Ándalus：伊斯蘭西班牙留下的不只是單字",
    rule:"g102提過ojalá/algodón/azúcar這些阿拉伯語借詞，但阿拉伯文明在伊比利半島留下的痕跡遠不只語言——Al-Ándalus是穆斯林統治時期（711-1492年）西班牙的名稱，這段近800年的歷史留下建築、學術、文化共存的實體遺產，至今仍是西班牙國家認同/文化觀光/當代西班牙與阿拉伯世界關係的重要背景知識。",
    examples:[
      {es:"La Mezquita de Córdoba es uno de los monumentos más importantes de Al-Ándalus.", zh:"哥多華清真寺是Al-Ándalus最重要的古蹟之一。（756年開始興建，融合了伊斯蘭建築的馬蹄形拱門與後來天主教收復後加建的大教堂，同一棟建築裡疊著兩種信仰的痕跡，是「文明交會」最具體的實例。）"},
      {es:"La Alhambra de Granada refleja el esplendor del arte islámico en España.", zh:"格拉納達的阿爾罕布拉宮反映了伊斯蘭藝術在西班牙的鼎盛時期。（Nasrid王朝的宮殿，1492年格拉納達陷落〔Reconquista的最後一步〕後才落入天主教君主手中，是穆斯林統治西班牙最後據點的具體象徵。）"},
      {es:"Durante siglos, musulmanes, judíos y cristianos convivieron en la península ibérica.", zh:"好幾個世紀裡，穆斯林、猶太人與基督徒共同生活在伊比利半島上。（la convivencia：這段「共存」時期常被浪漫化描述成宗教和諧共處的黃金時代，但歷史學者也提醒實際情況更複雜，有合作也有衝突，不是單純的烏托邦敘事。）"}
    ],
    trap:"「1492年」是理解這段歷史的關鍵年份——同一年，天主教君主收復格拉納達（Reconquista正式終結）、哥倫布抵達美洲（Conquista的起點）、也是猶太人被驅逐出西班牙的年份，三件事同一年發生並非巧合，代表的是西班牙從「多元信仰共存的中世紀」轉向「單一天主教身分認同」的關鍵轉折點，新聞/歷史論述提到1492年時，背後常常在暗示這整組意義。",
    source:"文法補充"
  },

  {
    id:"g107", cat:"reading", level:"c2",
    title:"外部閱讀入口：C2真正的閱讀練習在網路上，不在這裡",
    rule:"C2程度的閱讀能力不該被綁在幾篇固定文章上——真正的練習是自己去找一篇真實文章讀完、整理重點。這張卡不提供全文，只提供「主題→建議搜尋方向→閱讀任務」，找到文章後自己完成任務（可以寫進📔靈感孵化與開發者手札當練習記錄）。",
    examples:[
      {es:"Tema: memoria histórica — Buscar: site:elpais.com/es memoria histórica España", zh:"主題：歷史記憶（西班牙內戰/獨裁時期的集體記憶論戰）。任務：①用自己的話總結文章論點②指出作者的立場③找出兩個高階表達方式並解釋用法。"},
      {es:"Tema: Al-Ándalus y el mundo árabe — Buscar: site:dw.com/es legado árabe España", zh:"主題：Al-Ándalus與阿拉伯世界遺產。任務：①總結文章提到哪些具體遺跡/文化痕跡②文章怎麼描述「convivencia」這個概念③找兩個跟g106卡片呼應的細節。"},
      {es:"Tema: identidad latinoamericana — Buscar: site:dw.com/es identidad latinoamericana", zh:"主題：拉美認同論述。任務：①這篇文章討論的認同議題是什麼②作者引用了哪些歷史/文化背景③找出一個跟本站C1/C2已學過的文化卡片有關聯的段落。"}
    ],
    family:{
      title:"🔍 更多可以試的搜尋方向",
      intro:"用site:網域名 + 關鍵字的組合，可以鎖定特定媒體的西語文章，避開品質參差的搜尋結果：",
      items:[
        {es:"site:bbc.com/mundo + 關鍵字", zh:"BBC西語頻道，新聞角度多元"},
        {es:"site:elpais.com/es + 關鍵字", zh:"西班牙大報，正式書面語域"},
        {es:"site:dw.com/es + 關鍵字", zh:"德國之聲西語頻道，本站B2日報也用這個來源"}
      ]
    },
    trap:"這個任務系統故意不提供答案——C2程度的真實考驗是「能不能自己在網路上找到一篇文章、看懂它在說什麼、抓出立場跟論證」，這件事沒有標準答案可以核對，練習的價值就在「自己動手找、自己動腦整理」這個過程本身，不是等著被餵一篇已經處理好的文章。",
    source:"文法補充"
  },

  // ══ 🌱 A1-A2 骨架補完：介系詞場景／IR・HACER動詞家族 ══
  // 高階內容(C1/C2)正在補，A1-A2真正缺的不是資料量，是「核心句型網」——
  // 這批不是單字卡，是把en/a/de/con/por/para跟IR/HACER放進真實場景裡

  {
    id:"g108", cat:"preposition", level:"a1a2",
    title:"介系詞場景：en/a/de/con/por/para不是單字，是畫面",
    rule:"這六個介系詞是A1之後每一句話都會用到的地基，但死背「en=在、a=去」這種單一翻譯完全沒用——要記的是「畫面」：en是待在一個空間裡面，a是朝向一個目的地，de是從某個起點來，con是兩樣東西綁在一起，para是朝著一個對象/目的，por是穿過/透過某個路徑或原因。",
    examples:[
      {es:"Estoy en casa.", zh:"我在家。（en：人待在一個空間「裡面」，画面是「被包在裡面」）"},
      {es:"Voy a la escuela.", zh:"我要去學校。（a：朝著一個目的地移動，畫面是「箭頭指向那裡」）"},
      {es:"Vengo de México.", zh:"我從墨西哥來。（de：起點/來源，畫面是「從那裡出發」）"},
      {es:"Quiero un café con leche.", zh:"我要一杯咖啡加牛奶。（con：兩樣東西綁在一起，畫面是「兩個東西黏在一起」）"},
      {es:"Este regalo es para ti.", zh:"這個禮物是給你的。（para：朝著一個對象/目的，畫面是「送到你手上」）"},
      {es:"Pasamos por el parque.", zh:"我們經過公園。（por：穿過一個路徑，畫面是「穿過去/路過」）"}
    ],
    trap:"por跟para是這批裡最容易混的一組（見g33完整對照），但先不用急著鑽研細節——這張卡的重點是先把每個介系詞配一個「畫面」記住，之後遇到por/para的細節分岔，會比死背規則更容易理解，因為你已經知道por的核心畫面是「穿過/經過」，para的核心畫面是「朝向一個終點」。",
    source:"文法補充"
  },

  {
    id:"g109", cat:"verb-pattern", level:"a1a2",
    title:"HACER：從「做」長出的生活變化",
    rule:"貓媽媽排計畫用hace un plan，講天氣冷用hace frío，講很久以前的事用hace mucho tiempo——這幾種用法乍看不同，但都是同一個hacer在讓某件事發生，或標出一段距離。IR的部分已經在g19教過了，這裡專注在HACER自己的生活路線。",
    examples:[
      {es:"Mamá Cata hace un plan para el día.", zh:"貓媽媽排好了今天的行程。（劇情原句，E10）"},
      {es:"Hace frío hoy.", zh:"今天很冷。（hacer + 天氣，西語固定用hacer不是estar）"},
      {es:"Pero el Corazón fue herido hace mucho tiempo.", zh:"但本心很久以前就受了傷。（劇情原句，E15換詞組合）"}
    ],
    family:{
      title:"🌿 HACER：不只一種畫面",
      intro:"同一個「做/發生」骨架，因為想讓對方知道的事不同，會長出不同分支——不是同義句堆疊，每句背後的溝通目的都不一樣。",
      items:[
        {es:"Mamá Cata hace un plan para el día.", zh:"🛠️行動與創造：我做出/完成/安排了某件事（劇情原句，E10）"},
        {es:"Hace frío hoy.", zh:"🌤️環境與身體感受：描述現在的環境/天氣感受（固定搭配，全站慣用）"},
        {es:"Pero el Corazón fue herido hace mucho tiempo.", zh:"⏳時間距離：某件事距今多久（劇情原句，E15換詞組合）"}
      ]
    },
    trap:"hacer frío（天氣冷）是初學者最常犯錯的地方——中文「天氣冷」直覺會想用「是/estar」，但西語的天氣現象（frío/calor/sol/viento）固定搭配hacer，這個不是邏輯規則，是約定俗成的固定搭配，直接背下來比推導原因更有效率。",
    quirk:"❌ 直覺：「天氣是冷的」= ser/estar？<br>✅ 其實是：西語把天氣現象當成「正在發生的事」= hacer<br>❌ Está frío. → ✅ Hace frío.（今天很冷）<br>同樣邏輯套用在calor（熱）/sol（出太陽）/viento（起風），全部固定用hacer，不是ser/estar，直接背下來比推導原因更有效率。",
    source:"劇情E10／劇情E15（換詞組合）／文法補充（🌿常用搭配庫另見下方）",
    storyRoles:[
      {es:"Mamá Cata hace un plan para el día.", semanticRole:"creation-action", communicationGoal:"我想讓對方知道我正在安排或完成什麼", scene:"E10劇情（真實例句）"},
      {es:"Hace frío hoy.", semanticRole:"environmental-state", communicationGoal:"我想讓對方知道現在的環境感受", scene:"日常對話（固定搭配，全站慣用）"},
      {es:"Pero el Corazón fue herido hace mucho tiempo.", semanticRole:"time-distance", communicationGoal:"我想讓對方知道某件事距今多久", scene:"E15劇情（真實換詞組合）"}
    ],
    extraFamily:{
      title:"🔨 常用搭配庫（固定搭配，不是獨立語意分支）",
      intro:"這些是hacer的高頻固定搭配——每句意思彼此不相通（背了hacer caso不代表能類推hacer別的名詞），是各自獨立的詞組，收在這裡當語塊參考，不升級成能力分支。",
      items:[
        {es:"hacer una pregunta", zh:"問一個問題（不是preguntar una pregunta，這是常見的中式直譯錯誤）"},
        {es:"hacer la tarea", zh:"做功課"},
        {es:"hacer un viaje", zh:"去旅行"},
        {es:"hacer caso", zh:"聽從、理會（No me hace caso＝他不理我）"}
      ]
    }
  },

  {
    id:"g110", cat:"pragmatics", level:"c2",
    title:"真實西語第二層：pues／hombre／venga／claro",
    rule:"延續g100的語用學系列——這批比幽默/雙關更快讓人「聽起來像母語者」，因為它們是母語者無意識間、每分鐘都在用的語氣調節詞。這裡把pues的完整功能範圍展開，並補上hombre/venga/claro這三個常被字典誤導成單一翻譯的詞。",
    examples:[
      {es:"Pues... no sé qué decirte.", zh:"呃……我不知道該說什麼。（猶豫填詞，爭取思考時間）"},
      {es:"¿Vienes a la fiesta? — Pues claro.", zh:"你要來派對嗎？——那當然。（pues+claro組合：強化肯定語氣，接近「廢話當然」的輕鬆感）"},
      {es:"Pues yo no lo haría así.", zh:"呃，換作是我不會這樣做。（pues在這裡帶轉折/委婉不同意的語氣，接近「不過/可是」，比直接說pero更委婉）"},
      {es:"¡Hombre! ¡Qué sorpresa verte aquí!", zh:"哎呀！在這裡看到你真是太驚訝了！（hombre當感嘆詞，跟字面「男人」無關，對男性女性都能說，純粹表達驚訝/情緒強調）"},
      {es:"Hombre, no exageres tanto.", zh:"欸，別誇張成這樣。（hombre：帶點輕微的不以為然/勸阻語氣）"},
      {es:"Venga, vamos a comer algo.", zh:"來吧，我們去吃點東西。（venga：多見於西班牙，鼓勵/催促對方行動）"},
      {es:"Venga, quedamos a las cinco.", zh:"好，那我們約五點。（venga：這裡是「講定了/一言為定」，收尾確認的語氣）"},
      {es:"¡Ah, claro! Ahora entiendo.", zh:"啊，原來如此！我現在懂了。（claro單獨使用：表達「我懂了/恍然大悟」，不是字面「清楚」）"}
    ],
    trap:"這批詞的共同心法：hombre不分性別對象都能用（對女性說¡hombre!完全正常，這個字在這裡已經跟「男人」的字面意思脫鉤，變成純粹的語氣詞）；venga多見於西班牙，拉美不常這樣用；pues的功能範圍最廣，可以是猶豫、轉折、強調同意，甚至單獨一個「Pues...」就能表達「呃，這有點難回答」的整段語氣，聽的時候一定要靠語調判斷，不能只看文字。",
    source:"文法補充"
  },

  {
    id:"g111", cat:"subjunctive", level:"b1",
    title:"Dudo que vs No creo que vs Creo que no：三種「不覺得」的中文語感差異",
    rule:"這三種句型字典都會翻成類似「我不覺得/不認為」，但西語文法上分成「否定觸發虛擬式」跟「肯定句＋內部否定」兩條不同路線，中文翻譯如果照字面直譯（尤其Dudo que常被翻成「我懷疑」），會讓中文使用者誤以為語氣很強硬/帶偵查意味，其實日常語氣是溫和委婉的猜測，不是質疑指控。",
    examples:[
      {es:"Dudo que quieras helado.", zh:"我不太覺得你會想吃冰淇淋。<br><br>💡 這是最委婉的猜測——中文不要翻成「我懷疑」，那個字帶偵查/不相信證據的味道，比西語原本隨口猜測的語氣重很多。"},
      {es:"No creo que quieras helado.", zh:"我不認為你想吃冰淇淋。<br><br>💡 比上一句再篤定一點點的「不相信/不認為」。"},
      {es:"Creo que no quieres helado.", zh:"我覺得你不想吃冰淇淋。<br><br>💡 三句裡最直接篤定的判斷——先正面判斷，只是判斷出來的內容是否定的。"}
    ],
    trap:"三句由左到右語氣逐漸篤定：Dudo que（隨口猜測，最委婉）→No creo que（不太相信，中等）→Creo que no（我判斷你不想，最直接）。文法上的分界線很清楚——creer/pensar只有在「否定」的時候才觸發虛擬式（no creo que），一旦creer本身是肯定的、只是後面內容帶no（creo que no），就變回陳述式，這是初學者最容易搞混虛擬式觸發規則的地方之一。翻譯這三句給中文使用者看時，千萬不要把dudar que直接套「我懷疑」，語感會整個跑掉。",
    source:"文法補充"
  },

  // ══ 🌉 B1 橋接：A2單句 → B2抽象論述之間缺的那座橋 ══
  // 核心缺口：敘事能力(串起事件)＋意見表達(不只會Creo que)，這兩塊補上B2的抽象/虛擬式才接得起來

  {
    id:"g112", cat:"connector", level:"b1",
    title:"敘事橋接：把單句串成一段小故事",
    rule:"A2程度通常只會講孤立的單句（Fui al parque.），B1的關鍵突破是「用時間/因果連接詞把好幾個單句串成一段有邏輯的敘事」——cuando/mientras負責時間順序，porque/antes de/después de負責因果跟先後，這幾個詞組合起來，就能把「流水帳」升級成「有頭有尾的故事」。",
    examples:[
      {es:"Fui al parque.", zh:"我去了公園。（A2：孤立單句，只有事實，沒有脈絡）"},
      {es:"Fui al parque porque hacía buen tiempo.", zh:"我去了公園，因為天氣很好。（B1：加porque，開始交代原因，敘事有了第一層邏輯）"},
      {es:"Antes de ir al parque, terminé mi tarea.", zh:"去公園之前，我先做完了功課。（antes de + 原形動詞：交代事件的先後順序）"},
      {es:"Mientras estaba en el parque, empezó a llover.", zh:"我在公園的時候，開始下雨了。（mientras + 過去進行式：兩件事同時發生，一件是背景、一件是插入的新事件）"},
      {es:"Cuando llegué a casa, ya estaba oscuro.", zh:"當我到家的時候，天已經黑了。（cuando + 過去式：標記一個時間點，後面接當下的狀態）"}
    ],
    trap:"這是A2升B2最關鍵的中間橋——B2需要講出像「Aunque considero que los espacios verdes son importantes, muchas ciudades no invierten suficiente.」（雖然我認為綠地空間很重要，但很多城市投資不足）這種抽象論述句，中間差的正是「先學會串連具體事件」這一步：A2只會單句「Fui al parque」，B1學會用porque/cuando/mientras/antes de/después de把好幾件事串成一段敘事，才有能力再往上疊加B2的虛擬式/讓步子句/抽象詞彙——跳過B1敘事直接學B2論述句型，會學得很痛苦，因為連接詞的基本功還沒打穩。",
    source:"文法補充"
  },

  {
    id:"g113", cat:"verb-pattern", level:"b1",
    title:"意見表達：Creo que之外還能怎麼說",
    rule:"g13教過的Creo que是意見表達最基本的入門款，B1程度需要更多變化——en mi opinión/desde mi punto de vista這類開場白讓意見表達更正式有條理，estoy de acuerdo/no estoy de acuerdo讓你能回應別人的意見（同意或反對），depende de讓你能給出不那麼絕對的答案，這些是B1→B2「討論抽象話題」不可或缺的句型骨架。",
    examples:[
      {es:"En mi opinión, los espacios verdes son muy importantes.", zh:"依我看，綠地空間非常重要。（en mi opinión：比creo que更正式的意見開場白，常用在討論/寫作語境）"},
      {es:"Desde mi punto de vista, esta ciudad necesita más parques.", zh:"從我的角度來看，這座城市需要更多公園。（desde mi punto de vista：強調「這是我個人的視角」，語氣比creo que更慎重）"},
      {es:"Estoy de acuerdo contigo.", zh:"我同意你的看法。（estoy de acuerdo con + 人：表達同意）"},
      {es:"No estoy de acuerdo con esa idea.", zh:"我不同意那個想法。（no estoy de acuerdo con + 事物：表達不同意）"},
      {es:"Depende de la situación.", zh:"要看情況而定。（depende de：給出保留、不絕對的答案，日常對話跟正式討論都很常用）"}
    ],
    trap:"這些句型是B2抽象論述的必要零件——B2例句「Aunque considero que los espacios verdes son importantes, muchas ciudades no invierten suficiente.」裡的「considero que」（我認為，比creo que更書面的同義詞）就是從這批意見表達句型再往上升一級，先把en mi opinión/estoy de acuerdo/depende de這幾個練順，才有辦法接住B2那種「先讓步、再表達立場」的複雜論述句。",
    source:"文法補充"
  },

  // ══ 🌉 B1 橋接第二批：敘事排序／因果／經驗時態前導 ══

  {
    id:"g114", cat:"connector", level:"b1",
    title:"敘事排序詞：primero/luego/después/al final",
    rule:"g112教過用porque/cuando/mientras把事件「串起因果」，這批詞負責另一件事——把好幾個步驟按「順序」排列清楚，是講故事、寫食譜、交代流程時的骨架詞，B1程度需要能流暢講出「第一步...然後...後來...最後...」這種多步驟敘事。",
    examples:[
      {es:"Primero, me desperté. Luego, desayuné. Después, fui a la escuela.", zh:"首先，我起床了。然後，我吃了早餐。接著，我去了學校。（primero/luego/después：標記步驟先後，是最基本的敘事排序組合）"},
      {es:"Al final, todo salió bien.", zh:"最後，一切都很順利。（al final：收尾用語，總結整段敘事的結果）"},
      {es:"Primero terminé la tarea, y al final pude descansar.", zh:"我先做完功課，最後才能休息。（primero...al final...：頭尾呼應的完整敘事框架）"}
    ],
    trap:"luego跟después常常可以互換（都是「然後/接著」），差別很細微：luego語氣更口語隨性，después稍微正式一點，日常對話兩個都通用，不用太糾結該選哪個。",
    source:"文法補充"
  },

  {
    id:"g115", cat:"connector", level:"b1",
    title:"因果連接詞：por eso/así que/por lo tanto",
    rule:"g30教過porque（因為，先講原因），這批詞是反過來——先講原因、再講結果，用「所以/因此」把兩件事接起來。三個詞正式程度不同：por eso最口語，así que也偏口語但稍微強調結論，por lo tanto最正式書面，適合寫作/論述場合。",
    examples:[
      {es:"Llovía mucho, por eso no salimos.", zh:"雨下得很大，所以我們沒出門。（por eso：最口語的「所以」，日常對話最常用）"},
      {es:"No tenía dinero, así que no compré nada.", zh:"我沒有錢，所以什麼都沒買。（así que：口語，帶一點「於是就」的順勢感）"},
      {es:"Los datos son insuficientes; por lo tanto, no podemos concluir nada.", zh:"數據不夠充分，因此我們無法下任何結論。（por lo tanto：正式書面用語，跟g88教過的一樣，適合寫作/論述）"}
    ],
    trap:"這三個詞的因果方向都一樣（原因在前，結果在後），差別純粹是語域（register）——朋友聊天用por eso/así que，寫報告/正式討論用por lo tanto，選錯不會造成誤解，但會顯得語氣不搭場合。",
    source:"文法補充"
  },

  {
    id:"g116", cat:"tense", level:"b1",
    title:"經驗時態前導詞：alguna vez/nunca/todavía/ya",
    rule:"這批詞是B1→現在完成式（he hecho...）最常見的搭配副詞，用來問/答「有沒有經驗過」——alguna vez（曾經/有沒有過）通常用在疑問句，nunca（從未）用在否定回答，todavía（還/仍然，常配no todavía＝還沒）用在事情還沒發生，ya（已經）用在事情已經發生。",
    examples:[
      {es:"¿Alguna vez has comido chapulines?", zh:"你有吃過蚱蜢嗎？（¿Alguna vez has + 過去分詞...?：問對方有沒有過這個經驗）"},
      {es:"Nunca he viajado a Argentina.", zh:"我從來沒去過阿根廷。（nunca + he + 過去分詞：從未做過某事）"},
      {es:"Todavía no he terminado la tarea.", zh:"我還沒做完功課。（todavía no + he + 過去分詞：事情還沒發生）"},
      {es:"Ya he comido, gracias.", zh:"我已經吃過了，謝謝。（ya + he + 過去分詞：事情已經發生）"}
    ],
    trap:"這四個詞幾乎都固定搭配現在完成式（he/has/ha + 過去分詞），是「講經驗」最自然的語感標記——聽到alguna vez/nunca/todavía/ya，大腦要立刻反應「後面應該接現在完成式」，這個組合感抓熟了，B1的經驗敘事就會流暢很多。",
    source:"文法補充"
  },

  {
    id:"g117", cat:"verb-pattern", level:"a1a2",
    title:"Llamarse：從名字開始建立自己的位置",
    rule:"llamarse字面是「稱呼自己」（反身動詞），是打開自己在西語世界裡第一個身分入口的鑰匙——「我是誰」「你是誰」「他是誰」，最先都是靠這句話回答的。",
    examples:[
      {es:"Me llamo Vera.", zh:"我叫Vera。（彈藥庫e4_02原句，反身代名詞me不能省略）"},
      {es:"¿Cómo te llamas?", zh:"你叫什麼名字？（新編例句，A1核心問句，目前劇情裡還沒出現）"},
      {es:"Se llama Mimi.", zh:"她叫做咪咪。（劇情原句，E4）"}
    ],
    family:{
      title:"🌿 Llamarse：不只一種畫面",
      intro:"同一個「稱呼」骨架，因為想讓對方知道的事不同，會長出不同分支——不是同義句堆疊，每句背後的溝通目的都不一樣。",
      items:[
        {es:"Me llamo Vera.", zh:"👋自我介紹：我想讓對方知道我的名字（彈藥庫e4_02原句）"},
        {es:"¿Cómo te llamas?", zh:"❓問名字：我想知道對方的名字（新編，A1核心問句）"},
        {es:"Se llama Mimi.", zh:"🤝認識別人：我想讓對方知道另一個人的名字（劇情原句，E4）"}
      ]
    },
    trap:"Me llamo跟Soy都能用在自我介紹（Me llamo Nita. / Soy Nita.意思很接近），差別是llamarse更專注在「名字」這件事本身，soy則是更廣泛的身分描述（可以接名字，也可以接職業/國籍等）——初學者兩句都要會，混著用沒問題。",
    source:"劇情E4／彈藥庫e4_02／文法補充（問句為新編）",
    storyRoles:[
      {es:"Me llamo Vera.", semanticRole:"self-identity", communicationGoal:"我想讓對方知道我的名字", scene:"彈藥庫e4_02（真實例句）"},
      {es:"¿Cómo te llamas?", semanticRole:"inquiry", communicationGoal:"我想知道對方的名字", scene:"新編（A1核心問句，目前劇情裡還沒出現）"},
      {es:"Se llama Mimi.", semanticRole:"introducing-others", communicationGoal:"我想讓對方知道另一個人的名字", scene:"E4劇情（真實例句）"}
    ]
  }

];

/* CEFR 等級標籤（不當內容鎖，只當導覽用的視覺標籤＋篩選）*/
const GRAMMAR_LEVEL_TIERS = [
  {key:"a1a2", icon:"🌱", label:"護土嫩芽"},
  {key:"b1",   icon:"💧", label:"甘露超頻"},
  {key:"b2c1", icon:"🍯", label:"蜂王蜜釀"},
  {key:"c1",   icon:"🗣️", label:"街頭母語"},
  {key:"c2",   icon:"🎭", label:"文化深度"}
];

/* 全局句子索引（ep*10 + sentenceIdx）→ grammar_id
   null = 該句沒有對應的主要文法點 */
const SENTENCE_GRAMMAR_MAP = {
  // E1 妮妲的角落
   0:'g09',  // A Nita le gusta estar → gustar 句型
   1:'g01',  // rincón favorito es muy tranquilo → SER 描述
   2:'g10',  // Tito quiere jugar → querer + infinitive
   3:'g10',  // nadie la puede encontrar → poder
   4: null,  // empieza a llover（無專屬文法卡）
   5: null,  // sin pensar, sale corriendo（無專屬文法卡）
   6:'g32',  // pero → 連接詞轉折卡
   7:'g09',  // la ropa mojada le molesta → molestar 跟 gustar 同句型
   8: null,  // vuelve a su rincón（無專屬文法卡）
   9: null,  // se sientan cerca, sin decir nada（無專屬文法卡）
  // E2 骷髏先生不見了
  10:'g01',  // juguete favorito de Tito es → SER
  11: null,  // se va a la cama（無對應文法點）
  12:'g05',  // ha perdido → 已經做了
  13:'g15',  // No te preocupes → 固定用語
  14:'g01',  // Un detective es una persona → SER 職業
  15: null,  // siempre se trae（無對應文法點）
  16:'g02',  // dónde está → ESTAR 位置
  17:'g02',  // no está en la cama → ESTAR 位置
  18:'g03',  // están jugando → ESTAR + -ando
  19:'g06',  // habéis estado saltando → 一直做到現在
  // E3 最好的朋友
  20:'g03',  // está esperando → ESTAR + -ando
  21:'g09',  // quiere mucho a Vera → A+人+le 同族結構
  22:'g01',  // Son las mejores amigas → SER
  23:'g01',  // Este juego es solo para → SER
  24:'g01',  // Soy una princesa → SER 身分
  25:'g09',  // A Tito no le gusta → A+人+le
  26:'g07',  // Yo seré la doctora → SER 說將來的事
  27:'g16',  // respira hondo / tose → 下指令
  28:'g13',  // Creo que tienes → Creo que
  29:'g12',  // para curarse → para + 動詞
  // E7 手忙腳亂的早晨
  60:'g20',  // tiene mucho sueño → TENER 家族
  61: null,  // Mamá Cata despierta a Nita（尚無 despertar 專屬卡）
  62:'g20',  // tiene hambre → TENER 家族
  63:'g20',  // tiene frío → TENER 家族
  64: null,  // Hay pan y leche（尚無 HAY 專屬卡）
  65: null,  // Quiero desayunar con Mimi
  66:'g20',  // tiene prisa → TENER 家族
  67:'g20',  // ¿Tienes tiempo? → TENER 家族
  68:'g20',  // tiene miedo de → TENER 家族
  69: null,  // Nita se duerme en clase（尚無 dormirse 反身動詞專屬卡）
  // E11 亡靈節 El Camino de la Memoria
  100:'g01',  // Hoy es el Día → SER 描述事件
  101:'g30',  // porque son el camino → porque 子句
  102:'g32',  // pero escucha → pero 轉折
  103:'g32',  // es silencioso pero está → pero 轉折（SER/ESTAR 對比）
  104: null,  // y reconoce caras → y 順接，無專屬卡
  105:'g30',  // porque los queremos → porque 子句
  106:'g32',  // pero no quiere soltarla → pero 轉折
  107: null,  // y comparte historias → y 順接，無專屬卡
  108:'g32',  // pero sí cambia de forma → pero 強調對比
  109:'g32',  // pero el amor es para siempre → pero 轉折
};
