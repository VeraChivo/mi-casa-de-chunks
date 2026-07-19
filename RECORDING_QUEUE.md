# 🎙️ 錄音待辦清單（RECORDING_QUEUE.md）

2026-07-19 全站TTS盤查：比對 `audio-manifest.js` 各個音檔對照表 vs 各資料檔實際內容量，
找出目前還在fallback瀏覽器TTS、沒有真人錄音的地方。之後有新增內容，照這個格式繼續往下加，
確保不會漏掉——這份是「還缺什麼」的總清單，等妳排出優先順序、我再依批次產生Colab錄音腳本。

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

## 建議優先順序

1. 🔴 E11整集（10句，唯一整集掛零，最值得先補）
2. 🟡 mom.js 15句（TENER/HACER家族，量小、句子都很短）
3. 🟡 grammar.js 166句（量大，建議分批，先做虛擬語氣類）
4. 🟢 歌曲/新聞（量大且優先度較低，先擱著）

要哪一批我就先幫妳把句子整理成可以直接貼進Colab的錄音腳本（.txt，符合CLAUDE.md已定案的gTTS腳本格式，單批不超過120句）。
