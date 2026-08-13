# 🎙️ 錄音待辦清單（RECORDING_QUEUE.md）

2026-07-19 全站TTS盤查：比對 `audio-manifest.js` 各個音檔對照表 vs 各資料檔實際內容量，
找出目前還在fallback瀏覽器TTS、沒有真人錄音的地方。之後有新增內容，照這個格式繼續往下加，
確保不會漏掉——這份是「還缺什麼」的總清單，等妳排出優先順序、我再依批次產生Colab錄音腳本。

## ✅✅✅ 2026-07-19 這輪盤點出的四批缺口全部錄完接上了

E11整集、mom.js第25-39句、grammar.js 166句、歌曲25句+新聞53句——全部有真人錄音，
不再fallback瀏覽器TTS。這份清單留著當之後新內容的盤點格式範本。

---

## 🟡 缺口⑥：彈藥庫E12/E14/E16/E18-E20共27張新卡，`fire_daily`延伸例句54句全部沒錄音（2026-08-12新增）

2026-08-12補齊E11-E20彈藥庫缺口那輪新建的27張卡（`AMMO_DATA` 104→131張），`core_ammo`本身
借用episode既有真人音檔零缺口，但每卡2句`fire_daily`延伸例句（共54句）目前`AMMO_DAILY_AUDIO_MAP`
完全沒有這些卡的key，會fallback瀏覽器TTS。錄完照現有命名規則存成
`audio/ammo/ammo_{卡片id}_daily1.mp3`／`audio/ammo/ammo_{卡片id}_daily2.mp3`即可直接接上，不用改程式碼。

| 卡片 | # | 西語 | 中文 |
|---|---|---|---|
| e12_03 | 1 | ¿Puedo comer también? | 我也可以吃嗎？ |
| e12_03 | 2 | ¿Puedo ir también? | 我也可以去嗎？ |
| e12_04 | 1 | Eres muy joven todavía. | 你還太年輕了。 |
| e12_04 | 2 | Eres muy nueva todavía. | 妳還太新手了。 |
| e12_10 | 1 | Nita dice: "¡Hoy es un buen día!" | 妮妲說：「今天是美好的一天！」 |
| e12_10 | 2 | ¡Hoy es el momento! | 今天就是這個時刻！ |
| e14_01 | 1 | Hoy llueve, sin embargo, vamos a salir. | 今天下雨，然而，我們還是要出門。 |
| e14_01 | 2 | Estoy cansada, sin embargo, quiero terminar esto. | 我累了，然而，我想把這件事做完。 |
| e14_02 | 1 | De hecho, no tengo que explicarlo todo. | 其實，我不需要把一切都解釋清楚。 |
| e14_02 | 2 | De hecho, no tengo que estar bien todo el tiempo. | 其實，我不需要一直都很好。 |
| e14_03 | 1 | A pesar de eso, también necesito descansar. | 即便如此，我也需要休息。 |
| e14_03 | 2 | A pesar de eso, también necesito decir que no. | 即便如此，我也需要說不。 |
| e14_04 | 1 | Estoy nerviosa, por eso, necesito respirar hondo. | 我很緊張，所以，我需要深呼吸。 |
| e14_04 | 2 | No dormí bien, por eso, necesito una siesta. | 我沒睡好，所以，我需要小睡一下。 |
| e14_05 | 1 | Pedir ayuda no es debilidad. | 尋求幫助不是軟弱。 |
| e14_05 | 2 | Llorar no es un fracaso. | 哭泣不是失敗。 |
| e14_06 | 1 | En realidad, no todo depende de ti. | 但其實，不是所有事都取決於你。 |
| e14_06 | 2 | En realidad, no todo depende de una sola persona. | 但其實，不是所有事都取決於一個人。 |
| e14_07 | 1 | Estudio al mismo tiempo que escucho música. | 我一邊讀書，同時聽音樂。 |
| e14_07 | 2 | Camino al mismo tiempo que pienso. | 我一邊走路，同時思考。 |
| e14_08 | 1 | Necesito silencio, sobre todo, cuando estoy cansada. | 我需要安靜，尤其是，當我累的時候。 |
| e14_08 | 2 | Ella sonríe, sobre todo, cuando ve a su familia. | 她會笑，尤其是，當她看到家人的時候。 |
| e14_09 | 1 | Mis críticas más duras son para mí misma. | 我最狠的批評，都是留給我自己的。 |
| e14_09 | 2 | Mis pensamientos más oscuros son para nadie. | 我最陰暗的念頭，不留給任何人。 |
| e16_05 | 1 | "Ya no puedo esperar más," dice Nita. | 「我沒辦法再等了」，妮妲說。 |
| e16_05 | 2 | Ya no puedo caminar más. | 我沒辦法再走了。 |
| e16_07 | 1 | No es que no quiera ir, es que estoy cansada. | 不是我不想去，是我累了。 |
| e16_07 | 2 | No es que Tito no te escuche, es que necesita silencio. | 不是迪多不聽你說話，是他需要安靜。 |
| e16_09 | 1 | Un vaso de agua, cinco minutos de silencio: eso basta. | 一杯水，五分鐘的安靜：這樣就夠了。 |
| e16_09 | 2 | Una sonrisa, un abrazo: eso basta. | 一個微笑，一個擁抱：這樣就夠了。 |
| e18_01 | 1 | Tengo un hermano y una hermana. | 我有一個哥哥和一個姐姐。 |
| e18_01 | 2 | Tengo un perro y un gato. | 我有一隻狗和一隻貓。 |
| e18_02 | 1 | Yo soy Ana, la profesora de Carlos. | 我是安娜，卡洛斯的老師。 |
| e18_02 | 2 | Yo soy Luis, el vecino de Vera. | 我是路易斯，薇拉的鄰居。 |
| e18_05 | 1 | Soy la hermana menor de Kito. | 我是奇托的妹妹。 |
| e18_05 | 2 | Soy el amigo mayor del grupo. | 我是這群朋友裡年紀最大的。 |
| e18_10 | 1 | Somos los vecinos de Cata. | 我們是卡妲的鄰居。 |
| e18_10 | 2 | Somos compañeros de clase. | 我們是同班同學。 |
| e19_01 | 1 | Mimi tiene sueño después de comer. | 咪咪吃飽後想睡。 |
| e19_01 | 2 | Todos tienen sueño por la noche. | 大家晚上都想睡。 |
| e19_03 | 1 | Mamá está cocinando en la cocina. | 媽媽正在廚房裡煮飯。 |
| e19_03 | 2 | Los niños están jugando en el parque. | 孩子們正在公園裡玩。 |
| e19_04 | 1 | Nita está esperando el autobús. | 妮妲在等公車。 |
| e19_04 | 2 | Estoy esperando tu respuesta. | 我在等你的回覆。 |
| e19_09 | 1 | Tengo ganas de bailar. | 我很想跳舞。 |
| e19_09 | 2 | Mimi tiene ganas de comer galletas. | 咪咪很想吃餅乾。 |
| e20_01 | 1 | A Vera le gusta el chocolate. | 薇拉喜歡巧克力。 |
| e20_01 | 2 | A Kito le gusta la música. | 奇托喜歡音樂。 |
| e20_03 | 1 | A Mamá Cata le encanta leer por la noche. | 卡妲媽媽超愛晚上讀書。 |
| e20_03 | 2 | A Vera le encanta escuchar música. | 薇拉超愛聽音樂。 |
| e20_06 | 1 | A Nita le encantan los charcos. | 妮妲超愛水坑。 |
| e20_06 | 2 | A Tito le encantan los carritos. | 迪多超愛小車車。 |
| e20_08 | 1 | A Mimi no le gusta la lluvia. | 咪咪不喜歡下雨。 |
| e20_08 | 2 | A Nita no le gusta esperar. | 妮妲不喜歡等待。 |

**優先度**：不急——這批卡的核心句（`core_ammo`）已經有真人音檔，使用者點卡片主體不會聽到TTS，
只有展開「🔥全速運轉」延伸例句才會遇到。等VERA下次要錄音時，這是現成可以直接產生Colab腳本的清單。

---

## 🔴 缺口①：E11 亡靈節特輯《El Camino de la Memoria》— 整集10句完全沒錄音

`AUDIO_MANIFEST` 目前16集只有15集有音檔，唯獨這集（index 10）是空的。CLAUDE.md 也記錄過這個缺口。
**建議優先度最高**——這是唯一「整集掛零」的劇情內容，其餘E1-E10、E12-E16都已完整。

需要具體文字：episodes.js 第10集（10句劇情句），可以直接請我抓出來準備錄音腳本。

---

## 🟡 缺口②：🛌床邊低語呢／馬麻有話講 · peppa_chunks 分類第25-39句（TENER/HACER家族，共15句）

`MOM_AUDIO_MAP.chunks` 只錄了前24句（mom_chunks_01~24.mp3），第25句之後（TENER/HACER家族）
從沒錄過。具體句子：

| # | 西語 | 中文 |
|---|---|---|
| 25 | Tengo hambre. | 我肚子餓了。 |
| 26 | Tengo sed. | 我口渴了。 |
| 27 | Tengo frío. | 我覺得好冷。 |
| 28 | Tengo calor. | 我覺得好熱。 |
| 29 | Tengo miedo. | 我會怕。 |
| 30 | Tienes razón. | 你說得對。 |
| 31 | ¡Qué suerte tienes! | 你好幸運喔！ |
| 32 | Tengo ganas de abrazarte. | 我好想抱抱你。 |
| 33 | Vamos a hacer ejercicio. | 我們來運動吧。 |
| 34 | ¿Puedo hacerte una pregunta? | 我可以問你一個問題嗎？ |
| 35 | Hay que hacer la tarea. | 該做功課囉。 |
| 36 | Vamos a hacer un viaje. | 我們要去旅行囉。 |
| 37 | Tienes que hacerle caso a mamá. | 要聽媽媽的話喔。 |
| 38 | Hace frío hoy. | 今天天氣好冷。 |
| 39 | Hace calor hoy. | 今天天氣好熱。 |

錄完只要照現有命名規則存成 `mom_chunks_25.mp3` ~ `mom_chunks_39.mp3` 就能直接接上，不用改程式碼。

---

## 🟡 缺口③：💧文法儲水槽／🔄超級變變變 — 166句範例句沒有錄音

`GRAM_AUDIO_MAP` 現有839筆，但grammar.js目前總共467句不重複例句，其中166句完全沒對應錄音——
主要集中在最近新增的B2/C1內容（虛擬語氣、連接詞、易混淆詞組、成語、拉美俚語、B2詞彙、比較級等）。
量比較大，**不建議一次全錄**，建議照卡片分類分批：

- 虛擬語氣類（g27/g28/g29 WEIRDO口訣/情緒動詞/Ojalá）
- 連接詞類（g30/g31/g32 porque/sino/pero）
- 易混淆詞組（g33/g34/g35 por-para/saber-conocer/pedir-preguntar）
- 成語/俚語（g36-g40、拉美文化小卡g45-g49）
- B2詞彙（g43/g44）
- 比較級（g50/g51/g52）

需要的話我可以先抓出其中一批（例如虛擬語氣，優先度最高、之前討論最多次）的完整句子清單。

---

## 🟢 缺口④：🎵歌曲填空 LYRICS_FILL_DATA — 全部25句都是TTS，從未錄過

歌詞本身（引號填空句）目前完全依賴瀏覽器TTS，沒有一句是真人錄音。這批句子涉及公共財兒歌
（lf05-lf15）跟有版權限制只能少量引用的流行歌（lf01-lf04/lf16-lf25），**如果要錄，公共財兒歌
的部分風險較低，可以先錄這批（lf05-lf15，共11句）**，流行歌那幾句版權考量下建議維持TTS或再討論。

---

## 🟢 缺口⑤：📰B2時事傳送門 news.js — 53則填空題全部TTS，從未錄過

新聞句子是DW等真實新聞的B2級語塊，全部依賴TTS。因為是每天輪播的內容池、單則使用機率不算高，
優先度目前最低，除非妳覺得這塊很常用再考慮排進去。

---

## ✅ 已確認覆蓋完整，不用管

- 💬心田深耕 CORAZON_DATA（34句，含最新的🕯️跨國際不孤單）：`CORAZON_AUDIO_MAP` 六類全部對得上
- 🧺語塊採集籃 fire_daily（200句）：`AMMO_DAILY_AUDIO_MAP` 100張卡×2句全部對得上
- 🔤前後綴歡心前42字：上一輪已重新接上VERA的真人錄音
- E1-E10、E12-E16 共15集劇情：`AUDIO_MANIFEST` 全部覆蓋
- 🛌peppa_chunks第1-24句、sel_phrases全部4句、mom_daily全部7句
- 🌳GP_AUDIO_MAP（自戀鏡子/太極變身鏡人稱練習）、STAGE2_AUDIO_MAP（封存醞釀）：兩者都是小規模封閉集合，數量比對一致

---

## ✅ 四批錄音腳本已產生（2026-07-19，依VERA指示分批）

- **第1批 `grammar_batch1_of2.txt`**：文法儲水槽缺口 前83句 ✅ **已完成（2026-07-19）**——
  83個mp3全部驗證通過，接進`GRAM_AUDIO_MAP`（839→922筆），存在`audio/gram/gram_missing_a_001~083.mp3`
- **第2批 `grammar_batch2_of2.txt`**：文法儲水槽缺口 後83句 ✅ **已完成（2026-07-19）**——
  83個mp3全部驗證通過，接進`GRAM_AUDIO_MAP`（922→1005筆），存在`audio/gram/gram_missing_b_001~083.mp3`。
  至此grammar.js全部467句不重複例句都有真人錄音，文法儲水槽這條線完成
- **第3批 `songs_and_news.txt`**：歌曲填空25句＋新聞填空53句，合計78句 ✅ **已完成**——
  查證發現這批其實在本輪對話更早之前就已經處理過（commit 21e6cc8「接進第3/4份真人錄音」），
  `GRAM_AUDIO_MAP`裡25句歌詞（`audio/lyrics/lyrics_lf01~25.mp3`）+53句新聞
  （`audio/news/news_nw01~53.mp3`）全部已存在且對應正確，78句0缺漏。2026-07-19再次收到
  VERA上傳的`songs_news_batch.zip`是重複批次，比對後確認內容跟既有錄音是同一批，未重新覆蓋
- **第4批 `e11_and_mom.txt` → 已更新為 `script_D2.txt`（59句）**：原本以為E11要「先錄整句、
  事後切割分段」（CLAUDE.md那條規則是給真人錄音設計的——真人怕漏字才要求先錄一次完整版）。
  VERA提醒這批是TTS不是真人錄音，語塊+整句可以直接分開各自產生，不用先錄再切。已重新盤查
  E11每句的實際語塊（S/V/C/連接詞），跟CHUNK_AUDIO_MAP既有詞彙比對後，扣掉11個已經錄過的
  重複詞（Hoy/es/y/pero/Tito/está/Nita/Mamá Cata/Papá Tato/Mimi/no entiende），只剩34個真的
  沒錄過的語塊，加上10句整句、15句mom.js，合計59句一次生成。
  ✅ **已完成（2026-07-19）**——59個mp3全部驗證通過：34個語塊接進`CHUNK_AUDIO_MAP`（含兩個
  帶引號的特殊語塊「"Los recordamos」/「los queremos."」，已確認跟episodes.js原文逐字元對齊）、
  10句整句接進`AUDIO_MANIFEST[10]`（E11從掛零補到完整，16集劇情全數覆蓋）、15句接進
  `MOM_AUDIO_MAP.chunks`（24→39筆，peppa_chunks分類全數覆蓋）

四個都是可以直接複製貼進Colab執行的.txt腳本（gTTS，lang='es' tld='com.mx'，含重試機制跟隨機停頓，
跑完自動打包zip觸發下載）。錄完把zip丟回來，我負責接上audio-manifest.js（CHUNK_AUDIO_MAP／
AUDIO_MANIFEST／MOM_AUDIO_MAP三個對照表都會用到）。
