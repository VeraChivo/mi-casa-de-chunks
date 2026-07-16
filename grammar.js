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
    example:{es:'Le estoy escribiendo. ＝ Estoy escribiéndole.', speakEs:'Le estoy escribiendo. Estoy escribiéndole.', zh:'我正在寫信給她。（兩種說法都可以）'}
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
        <div class="pron-example" onclick="speakGramSmart('${String(r.speakEs||r.example.es).replace(/'/g,"\\'")}')">
          <div class="pron-ex-es">▶ ${r.example.es}</div>
          ${r.speakEs && r.speakEs!==r.example.es ? `<div class="pron-ex-speak">🔊 實際播放：${r.speakEs}</div>` : ''}
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
  {key:"connector",    label:"連接詞"}
];


const GRAMMAR_DATA = [

  // ══ SER vs ESTAR ══

  {
    id:"g01", cat:"ser-estar",
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
    quirk:"🐛 調皮特例：La boda es en la iglesia.（婚禮在教堂舉行）——明明是一次性的活動，卻用 SER，因為 SER 專門描述「事件發生的地點」（跟 tener lugar「舉行」同義）；只有實體東西本身的所在位置才輪到 ESTAR（比較：La iglesia está en el centro. 教堂在市中心）。",
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
    }
  },

  {
    id:"g02", cat:"ser-estar",
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
    quirk:"🐛 調皮特例：Está muerto.（他死了）——明明死亡看起來很永久，卻用 ESTAR，因為西語把死亡當成一種「外力造成、改變後的狀態」，跟 está roto（壞掉了）、está cansado（累了）是同一掛邏輯，不是在描述這個人的本質身分。",
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
    }
  },

  {
    id:"g03", cat:"ser-estar",
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
    id:"g04", cat:"ser-estar",
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
    id:"g05", cat:"tense",
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
    }
  },

  {
    id:"g06", cat:"tense",
    title:"「一直做到現在」：haber + estado + -ando",
    rule:"haber + estado + 動詞-ando = 「一直在做某事直到現在」，動作從過去延續到現在。",
    examples:[
      {es:"Habéis estado saltando en los charcos de barro.", zh:"你們一直在泥巴坑裡跳。"},
      {es:"He estado estudiando toda la tarde.", zh:"我整個下午都在念書。"},
      {es:"Mamá ha estado cocinando.", zh:"媽媽一直在煮飯。"}
    ],
    trap:"habéis = 你們（西班牙用法）；拉美常用 han + estado 取代。英語對應：have been + -ing",
    source:"E2·S10"
  },

  {
    id:"g07", cat:"tense",
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
    id:"g08", cat:"gustar",
    title:"Me gusta vs Me encanta：喜歡的程度",
    rule:"中文腦：「我喜歡這首歌。」→ 西語腦：「這首歌讓我覺得喜歡。」→ Me gusta esta canción. 動詞跟著「被喜歡的事物」走，不是說話者！Me gusta（單數事物）/ Me gustan（複數事物）；Me encanta = 我超愛（比 gusta 強 10 倍）。",
    examples:[
      {es:"Me gusta el chocolate.", zh:"我喜歡巧克力。（單數 → gusta）"},
      {es:"Me encanta saltar en los charcos.", zh:"我超愛在水坑裡跳。"},
      {es:"Me gustan las galletas.", zh:"我喜歡餅乾。（複數 → gustan）"},
      {es:"No me gusta la lluvia.", zh:"我不喜歡下雨。（否定：前面加 no）"},
      {es:"¿Te gusta el chocolate?", zh:"你喜歡巧克力嗎？（問句：me換成 te）"}
    ],
    trap:"動詞跟著「被喜歡的事物」走：Me gusta el libro（單）vs Me gustan los libros（複）",
    source:"E1·S6 / E1·S10"
  },

  {
    id:"g09", cat:"gustar",
    title:"A + 人 + le gusta：某人喜歡",
    rule:"A + 人名或代名詞 + le/les + gusta(n) + 名詞或原型動詞。",
    examples:[
      {es:"A Tito no le gusta jugar solo.", zh:"迪多不喜歡一個人玩。"},
      {es:"A todos les encanta saltar en los charcos.", zh:"所有人都超愛在水坑裡跳。"},
      {es:"A mí me gusta el café.", zh:"我喜歡咖啡。（加 a mí 是為了強調）"}
    ],
    trap:"代名詞對應：a mí me / a ti te / a él,ella,usted le / a nosotros nos / a ustedes,ellos,ellas les（西班牙另有 a vosotros os，拉美不用）",
    source:"E3·S6 / E1·S10"
  },

  // ══ 動詞句型 ══

  {
    id:"g10", cat:"verb-pattern",
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
    }
  },

  {
    id:"g11", cat:"verb-pattern",
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
    }
  },

  {
    id:"g12", cat:"verb-pattern",
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
    id:"g13", cat:"verb-pattern",
    title:"Creo que + 子句：我認為…",
    rule:"Creo que + 完整子句 = 我認為、我覺得。表達個人意見或推測。",
    examples:[
      {es:"Creo que tienes el corazón un poco flojo.", zh:"我覺得你的心臟有點虛弱。"},
      {es:"Creo que tienes fiebre.", zh:"我覺得你發燒了。"},
      {es:"Creo que tienes razón.", zh:"我覺得你說得對。"}
    ],
    trap:"口語快速版：Creo que sí（我覺得是）/ Creo que no（我覺得不是）",
    source:"E3·S9"
  },

  // ══ 固定用語 ══

  {
    id:"g14", cat:"phrase",
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
    id:"g15", cat:"phrase",
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
    id:"g16", cat:"phrase",
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
    id:"g17", cat:"verb-pattern",
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
    }
  },

  {
    id:"g18", cat:"verb-pattern",
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
    }
  },

  {
    id:"g19", cat:"tense",
    title:"IR + a + 動詞：即將要做的未來式",
    rule:"ir（去）的變位 + a + 原型動詞（字典查到的形式）= 就要去做某事，跟英文 be going to 幾乎一模一樣！這是任何人稱都能用的萬用近未來式，不是只有「我們一起來」的意思。",
    examples:[
      {es:"Todo va a salir bien.", zh:"一切都會順利的。（劇情原句：No te preocupes, todo va a salir bien.）"},
      {es:"Voy a comer.", zh:"我要去吃飯了。（新編例句，目前劇情裡還沒有這句）"},
      {es:"¿Vas a dormir?", zh:"你要去睡了嗎？（新編例句，目前劇情裡還沒有這句）"}
    ],
    trap:"跟「Vamos a + 動詞」（見另一張卡）不要搞混：那張是限定「我們一起來」，這裡任何人稱都能用。ir 也能單獨表示「去某地點」：Voy al parque.（我要去公園）——後面接地點、不接動詞。六人稱完整變位可到🌀超級變變變查 ir。",
    crossLang:"快速對接：IR + a + 動詞＝英文 be going to——台語「欲（beh）」：我欲食（Guá beh tsia̍h）＝我要吃了；客語「愛（oi）」：𠊎愛食（Ngài oi sṳt）＝我要吃了。四種語言都在講『即將要做的事』，一秒對上！",
    source:"彈藥庫 e2_04（第一句）／文法補充（其餘為新編）"
  },

  {
    id:"g20", cat:"verb-pattern",
    title:"TENER：擁有、年紀、生理感覺",
    rule:"tener 字面是「擁有」，但西語常用 tener 描述「年紀」或「生理感覺」，中英文會用 to be 處理的地方，西語卻用 to have！例如：tener hambre（有飢餓＝肚子餓了）、tener ___ años（有 ___ 歲＝ ___ 歲）。",
    examples:[
      {es:"Nita y Tito tienen una hermana nueva.", zh:"妮妲和迪多有了一個新妹妹。（劇情原句，擁有用法）"},
      {es:"Tienes una hermana mayor.", zh:"你有一個大姊姊。（劇情原句，擁有用法，同時示範 hermana mayor＝形容詞放名詞後面）"},
      {es:"Tito tiene seis años.", zh:"迪多六歲。（新編例句，目前劇情裡還沒有「年紀」這個用法，直譯：迪多有六年）"}
    ],
    trap:"英文用 be（I am hungry / I am 6 years old），西語卻用 tener（有）——這是中英文母語者最容易直覺講錯的地方！",
    family:{
      title:"🌳 Tengo + 名詞 家族",
      intro:"別只背「tener」這個動詞，把整串「Tengo + 名詞」的固定搭配當一個家族背起來——中英文用 be 處理的感覺/狀態，西語統一用 tener（有）帶出來。",
      items:[
        {es:"Tengo hambre.", zh:"我餓了。"},
        {es:"Tengo sed.", zh:"我渴了。"},
        {es:"Tengo sueño.", zh:"我想睡了。"},
        {es:"Tengo frío.", zh:"我冷了。"},
        {es:"Tengo calor.", zh:"我熱了。"},
        {es:"Tengo miedo.", zh:"我害怕。"},
        {es:"Tengo razón.", zh:"我是對的。"},
        {es:"Tengo prisa.", zh:"我在趕時間。"},
        {es:"Tengo tiempo.", zh:"我有空。"},
        {es:"Tengo suerte.", zh:"我很幸運。"},
        {es:"Tengo ganas de bailar.", zh:"我想跳舞。（tener ganas de + 原形動詞＝想做某事）"}
      ]
    },
    source:"彈藥庫 e4_03（前兩句）／文法補充（年紀用法為新編）",
    conj:{
      verb:"tener（有）",
      rows:[
        {person:"yo",         form:"tengo",   ex:"Tengo hambre.",         zh:"我肚子餓了。"},
        {person:"tú",         form:"tienes",  ex:"¿Cuántos años tienes?", zh:"你幾歲？"},
        {person:"él/ella/usted", form:"tiene",   ex:"Tiene sueño.",          zh:"他想睡覺了。"},
        {person:"nosotros",   form:"tenemos", ex:"Tenemos frío.",        zh:"我們很冷。"},
        {person:"ellos/ellas/ustedes", form:"tienen",  ex:"Tienen miedo.",         zh:"他們害怕。"}
      ]
    }
  },

  {
    id:"g21", cat:"word-order",
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
    id:"g22", cat:"gender",
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
    id:"g23", cat:"verb-pattern",
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
    }
  },

  {
    id:"g24", cat:"phrase",
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
    id:"g25", cat:"phrase",
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
    id:"g26", cat:"phrase",
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
    id:"g27", cat:"subjunctive",
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
    id:"g28", cat:"subjunctive",
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
    id:"g29", cat:"subjunctive",
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
    id:"g30", cat:"connector",
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
    id:"g31", cat:"connector",
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
    id:"g32", cat:"connector",
    title:"pero vs sino：都翻成「但是」，用法差很大",
    rule:"pero＝單純轉折（不管前面是肯定句還是否定句，就是「雖然...但是...」）；sino＝前面一定要是否定句，而且後面在「取代/糾正」被否定掉的東西，才能用。",
    examples:[
      {es:"Quiero ir, pero no tengo tiempo.", zh:"我想去，但是我沒時間。（pero：單純轉折，前面是肯定句）"},
      {es:"No quiero ir, pero lo haré por ti.", zh:"我不想去，但我會為你去做。（pero：前面雖是否定句，後面只是轉折、不是在替換前面的內容，還是用 pero）"},
      {es:"No quiero café, sino té.", zh:"我不要咖啡，而是要茶。（sino：前面否定，後面在替換掉前面被否定的東西）"}
    ],
    trap:"判斷口訣：後面的內容是不是在「取代/糾正」前面被否定掉的東西——是的話用 sino；如果只是單純語氣轉折（不管前面正負），一律用 pero。這是初學者最容易搞混的一組連接詞。",
    source:"文法補充"
  }

];

/* 全局句子索引（ep*10 + sentenceIdx）→ grammar_id
   null = 該句沒有對應的主要文法點 */
const SENTENCE_GRAMMAR_MAP = {
  // E1 泥巴坑
   0:'g01',  // Yo soy Gatita Nita. → SER 身分
   1:'g01',  // Este es mi hermano → SER 關係
   2:'g03',  // está lloviendo → ESTAR + -ando
   3:'g10',  // ¿Podemos salir? → Podemos
   4:'g11',  // debes ponerte → Deber
   5:'g08',  // Me encanta saltar → encanta
   6:'g05',  // ha encontrado → 已經做了
   7:'g01',  // sí que es grande → SER 本質
   8:'g14',  // No pasa nada → 固定用語
   9:'g09',  // A todos les encanta → A+人+le
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
};
