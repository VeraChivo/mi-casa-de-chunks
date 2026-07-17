/* ── 內心擬人線：小小自我蛻變攻略 ──
   跟溫馨線（貓家族外部關係）是不同的兩條線：這條線代表內在情緒的各個部分，
   錨定成 Cata 自己的內心世界，只讀＋聽發音，不走完整的翻譯驗證/造句引擎。 */
const SEL_EPS=[
{title:"El Desván",titleZh:"小小自我在閣樓",sentences:[
  {es:"El Yo Pequeñito vive en el desván.",zh:"小小自我住在閣樓裡。",en:"Little Self lives in the attic."},
  {es:"Está escondido, pero quiere salir.",zh:"他躲著，但想出去。",en:"He's hidden, but wants to come out."},
  {es:'Asoma la cabeza y pregunta: "¿Puedo jugar también?"',zh:"他探出頭，問：「我也可以加入嗎？」",en:'He peeks his head out and asks: "Can I join too?"'},
  {es:'Ellos le dicen: "Eres muy pequeño todavía."',zh:"他們對他說：「你還太小了。」",en:'They tell him: "You\'re still too small."'},
  {es:"La Tristeza y el Miedo lo abrazan.",zh:"悲傷和恐懼抱住他。",en:"Sadness and Fear hug him."},
  {es:"Esperan juntos la escalera de madera.",zh:"他們一起等那道木梯。",en:"They wait together for the wooden ladder."},
  {es:"Un día, algo se rompe muy fuerte.",zh:"有一天，什麼東西碎裂得很大聲。",en:"One day, something breaks very loudly."},
  {es:"El Yo Pequeñito empieza a crecer.",zh:"小小自我開始長大。",en:"Little Self begins to grow."},
  {es:"Por fin puede bajar solo.",zh:"他終於可以自己爬下去了。",en:"He can finally climb down alone."},
  {es:'La Esperanza dice: "¡Hoy es el día!"',zh:"希望說：「今天就是那一天！」",en:'Hope says: "Today is the day!"'}
]},
{title:"Las Emociones Pequeñas",titleZh:"小情緒們的自我介紹",sentences:[
  {es:"En el desván viven nueve emociones pequeñas.",zh:"閣樓裡住著九個小情緒。",en:"In the attic live nine little emotions."},
  {es:'"Yo soy Agravio. Represento lo que se traga sin decir."',zh:"「我是曲屈。我代表那些吞下去沒說出口的委屈。」",en:'"I am Agravio. I represent what gets swallowed unsaid."'},
  {es:'"Yo soy Tristeza. A veces solo quiero llorar."',zh:"「我是茫茫。有時候我只是想哭。」",en:'"I am Tristeza. Sometimes I just want to cry."'},
  {es:'"Yo soy Agrado. Quiero que todos estén contentos."',zh:"「我是唆嗦。我想讓每個人都開心。」",en:'"I am Agrado. I want everyone to be happy."'},
  {es:'"Yo soy Miedo. Me escondo cuando algo cambia."',zh:"「我是糾揪。有變化的時候我就躲起來。」",en:'"I am Miedo. I hide when something changes."'},
  {es:'"Yo soy Cansancio. Necesito descansar todo el tiempo."',zh:"「我是倦倦。我隨時都需要休息。」",en:'"I am Cansancio. I need to rest all the time."'},
  {es:'"Yo soy Culpa. Pienso que todo es mi error."',zh:"「我是譴譴。我覺得什麼都是我的錯。」",en:'"I am Culpa. I think everything is my fault."'},
  {es:'"Yo soy Esperanza. Siempre busco una salida."',zh:"「我是嬉汐。我一直在找出路。」",en:'"I am Esperanza. I always look for a way out."'},
  {es:'"Yo soy Guardián. Vigilo la puerta, muy adentro."',zh:"「我是憨憨。我守在最深處的那道門。」",en:'"I am Guardián. I watch the door, deep inside."'},
  {es:'"Y está Juicio, que ataca desde afuera."',zh:"「還有錐心魘，那個從外面發動攻擊的。」",en:'"And there\'s Juicio, who attacks from outside."'}
]},
{title:"Conectores del Corazón",titleZh:"情緒語塊進階：連接詞",sentences:[
  {es:"Yo soy Agravio. Guardo lo que duele, sin embargo, no lo hago para siempre.",zh:"我是曲屈。我藏著那些傷，然而，我不會永遠藏著。",en:"I am Agravio. I hold what hurts, however, not forever."},
  {es:"Yo soy Tristeza. A veces solo quiero llorar, de hecho, no tengo que buscar una razón inmediata.",zh:"我是茫茫。有時候我只想哭，其實，我不需要立刻找一個理由。",en:"I am Tristeza. Sometimes I just want to cry, in fact, I don't need to find an immediate reason."},
  {es:"Yo soy Agrado. Quiero que todos estén bien, a pesar de eso, también necesito cuidarme a mí.",zh:"我是唆嗦。我想讓大家都好，即便如此，我也需要照顧自己。",en:"I am Agrado. I want everyone to be okay, even so, I also need to take care of myself."},
  {es:"Yo soy Miedo. Cuando algo cambia, me paralizo, por eso, necesito tiempo para adaptarme.",zh:"我是糾揪。有變化的時候我就凍住，所以，我需要時間來適應。",en:"I am Miedo. When something changes, I freeze, that's why, I need time to adapt."},
  {es:"Yo soy Cansancio. Necesito descanso, además, pedir descanso no es rendirse.",zh:"我是倦倦。我需要休息，而且，要求休息不是放棄。",en:"I am Cansancio. I need rest, besides, asking for rest is not giving up."},
  {es:"Yo soy Culpa. Creo que todo es mi error, en realidad, no todo depende de mí.",zh:"我是譴譴。我以為什麼都是我的錯，但其實，並不是所有事都取決於我。",en:"I am Culpa. I think everything is my fault, in reality, not everything depends on me."},
  {es:"Yo soy Esperanza. Busco la salida al mismo tiempo que acompaño al Yo Pequeñito.",zh:"我是嬉汐。我一邊找出路，同時，也陪伴著小小自我。",en:"I am Esperanza. I search for the way out while at the same time accompanying Little Self."},
  {es:"Yo soy Guardián. Protejo el Corazón Verdadero, sobre todo, cuando Juicio ataca.",zh:"我是憨憨。我守護著本心，尤其是，當錐心魘發動攻擊的時候。",en:"I am Guardián. I protect the True Heart, especially, when Juicio attacks."},
  {es:"Yo soy Juicio. Juzgo cada palabra, sin embargo, mis palabras más duras son para mí.",zh:"我是錐心魘。我評判每一句話，然而，我最狠的話，都是留給自己的。",en:"I am Juicio. I judge every word, however, my harshest words are for myself."},
  {es:"Somos nueve. Somos distintos, por lo tanto, no necesitamos estar de acuerdo para estar juntos.",zh:"我們有九個。我們各不相同，因此，不需要意見一致才能在一起。",en:"We are nine. We are different, therefore, we don't need to agree to be together."}
]},
{title:"El Corazón Verdadero",titleZh:"本心與閣樓",sentences:[
  {es:"El Corazón Verdadero es el lugar original, el más profundo.",zh:"本心是最原始的場域，最深的地方。",en:"The True Heart is the original place, the deepest place."},
  {es:"El desván vive dentro del Corazón Verdadero.",zh:"閣樓住在本心裡。",en:"The attic lives within the True Heart."},
  {es:"Pero el Corazón fue herido el primero.",zh:"但本心是最早受傷的那個。",en:"But the Heart was wounded first."},
  {es:"En esa herida, apareció una esquina oscura.",zh:"就在那道傷口裡，出現了一個陰暗的角落。",en:"In that wound, a dark corner appeared."},
  {es:"Ahí se escondió el Yo Pequeñito, junto con las emociones pequeñas.",zh:"小小自我就躲在那裡，跟小情緒們在一起。",en:"There Little Self hid, together with the little emotions."},
  {es:"Muy adentro del Corazón, Guardián vigila la puerta.",zh:"在本心的最深處，憨憨守著那道門。",en:"Deep within the Heart, Guardián watches the door."},
  {es:"Fue Juicio quien hirió al Corazón desde afuera.",zh:"是錐心魘從外面弄傷了本心。",en:"It was Juicio who wounded the Heart from outside."},
  {es:"Pero Esperanza fluye dentro del Corazón, buscando el camino.",zh:"但嬉汐在本心裡流動，一直在找路。",en:"But Esperanza flows within the Heart, searching for the way."},
  {es:"Ella es quien empuja al Yo Pequeñito a salir del desván.",zh:"是她推著小小自我走出閣樓。",en:"She is the one who pushes Little Self to leave the attic."},
  {es:"Un día, el Corazón Verdadero volverá a estar completo.",zh:"有一天，本心會重新變得完整。",en:"One day, the True Heart will become whole again."}
]}
];
