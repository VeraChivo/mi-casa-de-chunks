# 📖 CULTURE_CITATION_AUDIT.md — 文化卡引用真實性稽核

> Content QA｜文化內容查證
> 定位：獨立稽核文件，記錄每張文化卡的查證結果、來源與結論。
> 不是規範文件（不放進 CLAUDE.md），可持續更新，不污染規範文件。

---

## 0. 稽核範圍與方法

### 0.1 範圍

`grammar.js` 中 `WORLD_ZONE_MAP.culture`（🎭文化深度）底下、C1/C2難度的 **13張卡**：
`g92`／`g94`／`g95`／`g96`／`g97`／`g98`／`g99`／`g101`／`g102`／`g104`／`g105`／`g106`／`g107`。

這批卡片曾在 2026-07-25 從 💧文法儲水槽 搬進 🎭文化深度區塊（純結構搬移，內容未動），CLAUDE.md 當時就標註「這些卡的 `source` 欄位查證狀態沒有改變……之後若要對外強調『這是真實引用』，建議另外抽時間逐一核對」——本文件即為那次遺留提醒的正式查證結果。

### 0.2 方法

依 CLAUDE.md 已定案的「三項規則查證法」精神（①標題可搜尋到 ②原文可核對 ③內容與描述一致），用 WebSearch 逐一核對每張卡的**具體可查證主張**（真實引文、具體年代、具體制度立場）。教科書等級的通識知識（如常見諺語、標準文法區分）採抽查而非逐句查證，避免把查證成本花在低風險項目上。

### 0.3 本輪只查證，不修改內容

本文件只記錄查證結果，**未修改 `grammar.js` 任何欄位**。修正動作留給未來獨立的 commit（見文末「修正優先級」）。

---

## 1. 逐卡查證結果

### Card: g92
**Title**: 西語諺語：跟中文很多異曲同工的智慧
**Status**: Verified
**Severity**: —

- 抽查2句核心諺語（`Quien mucho abarca, poco aprieta.`／`El hábito no hace al monje.`），皆為真實流傳的西語諺語，語源可追溯（前者見於《La Celestina》1499年）。
- 中文對應解讀（「貪多嚼不爛」「人不可貌相」）為合理的語意類比，卡片本身已標註為「對應」關係，不是宣稱逐字翻譯。
- 其餘10句（含 `family` 補充4句）屬教科書等級常見諺語，未逐句查證，風險判斷為低。

**Evidence**
- [Billiken：quien mucho abarca poco aprieta](https://billiken.lat/saber-mas/quien-mucho-abarca-poco-aprieta-que-quiere-decir-la-famosa-frase/)
- [Del dicho al hecho histórico（起源溯及《La Celestina》1499）](https://www.ui1.es/blog-ui1/del-dicho-al-hecho-historico-de-donde-viene-la-expresion-quien-mucho-abarca-poco-aprieta)

---

### Card: g94
**Title**: El tiempo es oro：新聞和演講怎麼把話說得更有力
**Status**: Verified
**Severity**: —

- 非引用真實出處——例句是自建示範句，用來教修辭手法（隱喻/反諷/誇飾/悖論/擬人），不涉及「這是誰說的」這類可查證風險。
- 唯一可查證的是術語定義：隱喻(metáfora)不用「como」、明喻(símil)才用「como」——這個判準正確，符合西語修辭學標準定義。

**Evidence**
- 判準本身為西語修辭學通識知識，未另外檢附連結。

---

### Card: g95
**Title**: 為什麼新聞常提到這幾個歷史詞：西語圈的共同記憶
**Status**: Verified
**Severity**: —

- Reconquista（711-1492）、西班牙黃金世紀（16-17世紀，含Cervantes/Lope de Vega）、西班牙內戰（1936-1939）、美洲征服，皆為公認歷史年代與事件，屬通識等級史實。
- 抽查年代換算（711→1492＝781年，卡片寫「將近八個世紀」）數學正確。
- 未逐句查證每個描述的措辭，但無發現與已知史實矛盾之處。

**Evidence**
- 通識等級史實，未另外檢附連結。

---

### Card: g96
**Title**: 政治語言：izquierda/derecha的真正意思，不是字典意思
**Status**: Verified
**Severity**: —

- 查證核心主張：izquierda/derecha源自1789年法國國民制憲議會座位安排——**逐項核對吻合**：支持革命/反對國王絕對權力者坐左邊，保王派/支持國王否決權者坐右邊。
- 卡片對「同一政黨在不同國家政治光譜位置不完全對應」的提醒也符合政治學常識，未發現錯誤。

**Evidence**
- [nosabesnada.com：izquierda derecha 1789](https://www.nosabesnada.com/historia/la-izquierda-y-la-derecha/)
- [wandersidiomas：origen términos Revolución Francesa](https://wandersidiomas.es/origen-de-los-terminos-derecha-e-izquierda-en-la-revolucion-francesa/)

---

### Card: g97
**Title**: 古典西語：不用學古文，但要認得出處
**Status**: Verified
**Severity**: —

- 《唐吉訶德》開場白「En un lugar de la Mancha, de cuyo nombre no quiero acordarme...」逐字比對 Cervantes Virtual／CVC 官方文本，**完全一致**。
- 卡片對「這句常被戲仿套用在無關語境」的文化觀察屬合理描述，非可查證的具體事實聲明。

**Evidence**
- [Biblioteca Virtual Miguel de Cervantes：Don Quijote 原文](https://www.cervantesvirtual.com/obra-visor/el-ingenioso-hidalgo-don-quijote-de-la-mancha--10/html/fefcf8b4-82b1-11df-acc7-002185ce6064_28.html)
- [CVC：Don Quijote 第一部第一章](https://cvc.cervantes.es/literatura/clasicos/quijote/edicion/parte1/cap01/default.htm)

---

### Card: g98
**Title**: 文學：一句話認一位大師，不讀全文
**Status**: Verified
**Severity**: —（全部13張中查證結果最乾淨的一張）

- **Lorca**「Verde que te quiero verde.」：確認出自《Romance sonámbulo》（夢遊人謠），收錄於《Romancero gitano》（吉普賽故事詩集），1928年出版——卡片描述完全吻合。
- **Borges**「El tiempo es la sustancia de que estoy hecho.」：確認出自《Nueva refutación del tiempo》（時間的新反駁），收錄於《Otras inquisiciones》（1952）——卡片描述吻合。
- **附帶細節額外查證**：卡片提到「曾被高達的電影《阿爾發城》引用」——查證顯示**這個細節不只正確，甚至比卡片描述得更精確**：Godard 承認讀過 Borges 這篇隨筆後才寫劇本，且電影結尾機器人 Alpha 60 **逐字引用**了這句話（只把原文最後的「soy Borges」換成「soy Alpha 60」）。
- **Neruda**「Puedo escribir los versos más tristes esta noche.」：確認出自《Veinte poemas de amor y una canción desesperada》第20首開場白，1924年出版——卡片描述吻合。
- 卡片刻意不收錄 García Márquez 原文（因版權保護期未過），改談論「魔幻寫實主義」技巧本身——這個處理方式本身沒有查證風險，是刻意的保守設計。

**Evidence**
- [poemas-del-alma：Romance sonámbulo](https://www.poemas-del-alma.com/romance-sonambulo.htm)
- [Wikipedia ES：Nueva refutación del tiempo](https://es.wikipedia.org/wiki/Nueva_refutaci%C3%B3n_del_tiempo)
- [peliplat：Alphaville Godard lee a Borges（逐字引用細節）](https://www.peliplat.com/es/article/10012837/alphaville-1965-godard-lee-a-borges)
- [neruda.uchile.cl：Poema 20 官方文本](https://www.neruda.uchile.cl/obra/obra20poemas5.html)

---

### Card: g99
**Title**: 影視：一句台詞認一部片，不做完整對話
**Status**: Needs Fix
**Severity**: High

**Issue 1 — 《你媽媽也一樣》人物／場景誤植**
- 台詞「La vida es como la espuma, por eso hay que darse como el mar.」本身**真實存在**，確實出自《Y tu mamá también》（2001，Alfonso Cuarón）。
- 但卡片描述「樸實的漁夫角色Chuy對兩個滿腦子只顧自己戀愛煩惱的青少年主角說的話」**場景歸屬有誤**——查證（含學術文獻 Project MUSE）顯示這句話實際是 **Luisa**（Maribel Verdú飾）的話，透過旁白／她潛入水中前的自白方式出現，不是Chuy對兩位主角說的對白。Chuy 確實是片中的漁夫角色，但不是這句台詞的說話者。

**Issue 2 — 《羊男的迷宮》疑似不存在台詞（風險較高）**
- 「No puedes entrar en el mismo río dos veces.」——查了**六個獨立來源**：官方英文劇本PDF（dailyscript.com）、IMDb quotes頁面、GradeSaver quotes、ScreenRant「10 Most Memorable Quotes」、CBR「10 Best Quotes Ranked」、TV Tropes quotes頁面，**全部都找不到這句台詞**。
- 這句話本身是古希臘哲學家赫拉克利特的名言（「人不能兩次踏入同一條河流」），高度懷疑是「借用電影『純真vs殘酷現實』的核心主題，反推編造一句聽起來很合理但實際不存在的台詞」——跟CLAUDE.md已記錄過的「隔壁AI編造具體引用」（Camilo/Rosalía假歌詞、假新聞標題）是同一種模式，屬於**AI幻覺型引用**。

**Evidence**
- [X/Carmenchu：La vida es como la espuma — Maribel Verdú](https://x.com/CarmenchuFM/status/1875722906011074698)
- [Project MUSE：Sex, Class, and Mexico in Alfonso Cuarón's Y tu mamá también（Luisa歸屬）](https://muse.jhu.edu/article/170435)
- [dailyscript.com：Pan's Labyrinth 官方劇本PDF（查無此句）](https://www.dailyscript.com/scripts/PansLabyrinthEnglishScreenplay.pdf)
- [IMDb：El laberinto del fauno quotes（查無此句）](https://www.imdb.com/title/tt0457430/quotes/)
- [GradeSaver：Pan's Labyrinth quotes（查無此句）](https://www.gradesaver.com/pans-labyrinth/study-guide/quotes)

---

### Card: g101
**Title**: 文化禁忌與禮貌：tú/usted、家庭稱呼、地區敏感話題
**Status**: Verified
**Severity**: —

- 哥斯大黎加「ustedeo」現象（父母子女間用usted表達親密而非疏遠）——查證吻合真實社會語言學研究：usted在哥斯大黎加是家庭內表達溫暖/親密的預設用法，tuteo反而被視為外國人用法。
- tío/tía虛擬親屬稱謂、mijo/mija親暱用法，屬拉美文化通識，未發現問題。
- 敏感話題提醒（政治/獨裁歷史、國家比較、coger的地區差異）屬合理的文化提醒，coger的西班牙/墨西哥語意差異是查證過的既有站內知識（見g47）。

**Evidence**
- [Wikipedia ES：Ustedeo](https://es.wikipedia.org/wiki/Ustedeo)
- [ERIC：Ustedeo, voseo, or tuteo in Costa Rica](https://files.eric.ed.gov/fulltext/EJ1361594.pdf)

---

### Card: g102
**Title**: 西語裡的阿拉伯語遺產：800年伊斯蘭西班牙留下的字
**Status**: Verified
**Severity**: —

- `algodón` ← Hispano-Arabic `alquṭún`（源自古典阿拉伯語`quṭn`）：詞源正確。
- `azúcar` ← `as-sukkar`：詞源正確。
- `ojalá`：卡片列出兩種阿拉伯語源說法（`law šā' allāh／in šā' allāh`）——查證顯示更精確的學術說法是 `law sha'a Allah`（「若真主願意」），卡片已涵蓋這個版本，非錯誤，只是可以更精準（拿掉`in šā' allāh`這個「常被誤傳」的版本會更嚴謹，但不算查證意義上的錯誤）。
- `family`補充的 aceite/alcohol/almohada/alfombra/alcalde/hasta 等「al-」開頭借詞，屬西語語源學通識，未逐一查證。

**Evidence**
- [etimologia.com：ojalá](https://etimologia.com/ojala/)
- [SpanishDict：Spanish Words of Arabic Origin](https://www.spanishdict.com/guide/spanish-words-of-arabic-origin)

---

### Card: g104
**Title**: 社會語言學：你怎麼說話，洩漏了你是誰
**Status**: Verified
**Severity**: —

- leísmo de persona（可接受，尤其馬德里）vs leísmo de cosa（不可接受）的區分——**與RAE官方文件完全吻合**。
- voseo變位形式（`tú tienes→vos tenés`／`tú quieres→vos querés`／`tú eres→vos sos`）為標準阿根廷/烏拉圭變位，屬西語語言學通識，可信度高，未另外查證。
- usted使用頻率隨世代下降的觀察屬合理描述，非具體可查證的單一事實聲明。

**Evidence**
- [RAE：leísmo, laísmo y loísmo 官方文件](https://www.rae.es/gram%C3%A1tica/sintaxis/variaci%C3%B3n-en-los-pronombres-%C3%A1tonos-de-tercera-persona-i-le%C3%ADsmo-la%C3%ADsmo-y-lo%C3%ADsmo-caracter%C3%ADsticas-del-le%C3%ADsmo)

---

### Card: g105
**Title**: 包容語言：Todos/Todas/Todes 這場還在進行的辯論
**Status**: Verified
**Severity**: —

- RAE對`todes`/`-e`字尾不承認為規範文法——查證吻合。
- RAE認可`alumnado`／`profesorado`／`ciudadanía`等集合抽象名詞策略為爭議最小的中性表達方式——查證吻合RAE官方文件用詞（含「equilibrios sintácticos」等RAE原文措辭）。
- 卡片中性描述辯論雙方立場、不表態，符合本站規則15「查來源分級」與規則23「AI語氣清理」對政治敏感內容的處理原則。

**Evidence**
- [RAE：Informe sobre el lenguaje inclusivo（PDF）](https://www.rae.es/sites/default/files/Informe_lenguaje_inclusivo.pdf)
- [infolibre：RAE critica el lenguaje inclusivo del Congreso](https://www.infolibre.es/cultura/rae-critica-lenguaje-inclusivo-propone-congreso-hay-deseo-acrecentar-distancia-mundo-real_1_1714928.html)

---

### Card: g106
**Title**: Al-Ándalus：伊斯蘭西班牙留下的不只是單字
**Status**: Needs Fix
**Severity**: Medium

**Issue — 哥多華清真寺興建年份誤植**
- 卡片寫「756年開始興建」——查證顯示這是**把兩個不同的歷史事件搞混了**：
  - **756年**：Abderramán I 在Alameda戰役擊敗Yusuf al-Fihri後，佔領哥多華、自立為獨立酋長（Emir），建立**哥多華酋長國（Emirato de Córdoba）**——這是「建國年份」，不是「清真寺動工年份」。
  - **786年**（實際動工年份，多數史料共識為784-786年，786年為完工/最常見採用年份）：Abderramán I 才**開始興建哥多華清真寺**，比建國晚了30年。
- 卡片「1492年」相關三件事同年發生（收復失地運動終結＝格拉納達陷落／哥倫布抵達美洲／猶太人被驅逐）——這是廣為人知且可信的史實，**未發現問題**，不影響本卡整體評級（僅Issue本身是Medium風險，不是整卡作廢）。

**Evidence**
- [Wikipedia ES：Mezquita-catedral de Córdoba（786年）](https://es.wikipedia.org/wiki/Mezquita-catedral_de_C%C3%B3rdoba)
- [Wikipedia ES：Abderramán I（756年建國）](https://es.wikipedia.org/wiki/Abderram%C3%A1n_I)
- [nuestrahistoria.es：14 mayo 756，origen Emirato de Córdoba](https://nuestrahistoria.es/efemerides-14-mayo-origen-emirato-cordoba/)

---

### Card: g107
**Title**: 外部閱讀入口：C2真正的閱讀練習在網路上，不在這裡
**Status**: Verified
**Severity**: —

- 這張卡不含具體引用內容，只提供「主題→建議搜尋方向→閱讀任務」的引導式設計（`site:elpais.com`／`site:dw.com/es`／`site:bbc.com/mundo`），不涉及「這是誰說的」這類可查證風險。
- 建議的三個媒體網域（El País／DW／BBC Mundo）皆為真實存在、知名的西語新聞媒體，`dw.com/es`也是本站B2時事傳送門（news.js）已使用並查證過的來源，一致性沒有問題。

**Evidence**
- 不涉及具體引用查證，屬結構性檢查（確認網域真實存在）。

---

## 2. 修正優先級

### 🔴 High（建議優先修正）
- **g99**：《你媽媽也一樣》人物/場景誤植（Chuy→應為Luisa）；《羊男的迷宮》疑似不存在台詞（AI幻覺型引用，風險最高，建議直接換掉或移除，不建議保留一個查無實據的具體引用）。

### 🟠 Medium
- **g106**：756→786年份誤植，修正成本低（只需調整「756年開始興建」這句敘述，不影響卡片其餘內容）。

### 🟢 Verified（10張，之後不用重複查）
g92／g94／g95／g96／g97／g98／g101／g102／g104／g105／g107。

---

## 3. Commit 策略

依「查證與修正分開」原則，本文件對應 **Commit 1**（只新增稽核文件，不動 `grammar.js`）。修正 g99／g106 的實際內容改動，留給未來獨立的 **Commit 2**（`content: fix verified culture citation issues`），修正時建議：

- g99：《你媽媽也一樣》可修正場景描述（改成正確歸屬Luisa），或換一句已查證屬實的台詞；《羊男的迷宮》建議整句換成另一句已查證真實存在的台詞，不建議保留查無實據的引用。
- g106：把「756年開始興建」改成「786年開始興建」，756年的酋長國建立史實可以保留但需要跟清真寺動工年份分開描述，避免再次混淆兩個事件。
- 修正後應同步更新本文件對應卡片的 `Status` 從 `Needs Fix` 改為 `Fixed`，並保留原始 Issue 記錄當作歷史脈絡，不要整段刪除改寫。

---

## 變更記錄

| 日期 | 內容 |
|---|---|
| 2026-08-02 | 首版建立。13張C1/C2文化卡逐一查證，2張(g99/g106)標記Needs Fix，10張Verified，1張(g94)無需查證外部引用。本輪僅查證，未修改grammar.js。 |
