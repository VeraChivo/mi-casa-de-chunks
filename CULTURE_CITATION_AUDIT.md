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
**Status**: Fixed（2026-08-02）
**Severity**: High（修正前）

**Issue 1 — 《你媽媽也一樣》人物／場景誤植**
- 台詞「La vida es como la espuma, por eso hay que darse como el mar.」本身**真實存在**，確實出自《Y tu mamá también》（2001，Alfonso Cuarón）。
- 但卡片描述「樸實的漁夫角色Chuy對兩個滿腦子只顧自己戀愛煩惱的青少年主角說的話」**場景歸屬有誤**——查證（含學術文獻 Project MUSE）顯示這句話實際是 **Luisa**（Maribel Verdú飾）的話，透過旁白／她潛入水中前的自白方式出現，不是Chuy對兩位主角說的對白。Chuy 確實是片中的漁夫角色，但不是這句台詞的說話者。

**Issue 2 — 《羊男的迷宮》疑似不存在台詞（風險較高）**

*查證範圍*：對「No puedes entrar en el mismo río dos veces.」分三輪搜尋——①西語原文直接搜尋 ②改搜英文片名+"cannot step in the same river twice" ③改搜西語變體「no te puedes bañar dos veces en el mismo río」＋片名交叉查。三輪都指向同一結論：查了**六個獨立來源**——官方英文劇本PDF（dailyscript.com）、IMDb quotes頁面、GradeSaver quotes、ScreenRant「10 Most Memorable Quotes」、CBR「10 Best Quotes Ranked」、TV Tropes quotes頁面，**全部都找不到這句台詞**，且第三輪搜尋顯示這句赫拉克利特原話常被聯想到的反而是《今天暫時停止》(Groundhog Day)這類完全不相關的電影，沒有任何結果把它跟《羊男的迷宮》連在一起。

*查證限制*（誠實揭露，避免「查不到=絕對不存在」的過度斷言）：以上六個來源都是**劇本文件／粉絲整理的名言清單**，不是逐格看過整部電影的逐字字幕核對——理論上不能100%排除這句話是「電影裡一閃而過、沒被任何名言網站收錄的次要台詞」或「西語配音/字幕版本的在地化改寫，跟英文劇本不完全一致」。但六個獨立、性質不同的來源（官方劇本＋五個各自獨立編輯的名言精選網站）**同時都沒收錄同一句話**，這已經是相當強的統計證據——如果這句話真的是電影裡有份量的台詞，至少該出現在其中一兩個「10大名言」精選清單裡。综合判斷：證據強度足以支撐「Severity: High／建議直接處理」，但嚴謹起見不用「證實不存在」這種絕對用語，改用**「查無實據、高度疑似」**這個判斷用語（本文件標題已依此調整）。

*為何判定 Severity: High*：這不是普通的年代/敘述誤差（那種歸類為Medium，見g106），而是「具體引用可能整句是編造的」——這正是CLAUDE.md規則反覆記錄、本站最想防範的風險類型（見已記錄的Camilo/Rosalía假歌詞、假DW新聞標題案例，同樣是「AI生出一句聽起來完美、實際查無依據的具體引用」）。這類錯誤如果流出去被使用者當真引用轉述，比單純的年份誤植更容易造成公開層面的可信度損害，故列最高優先級。

**Evidence**
- [X/Carmenchu：La vida es como la espuma — Maribel Verdú](https://x.com/CarmenchuFM/status/1875722906011074698)
- [Project MUSE：Sex, Class, and Mexico in Alfonso Cuarón's Y tu mamá también（Luisa歸屬）](https://muse.jhu.edu/article/170435)
- [dailyscript.com：Pan's Labyrinth 官方劇本PDF（查無此句）](https://www.dailyscript.com/scripts/PansLabyrinthEnglishScreenplay.pdf)
- [IMDb：El laberinto del fauno quotes（查無此句）](https://www.imdb.com/title/tt0457430/quotes/)
- [GradeSaver：Pan's Labyrinth quotes（查無此句）](https://www.gradesaver.com/pans-labyrinth/study-guide/quotes)
- [ScreenRant：Guillermo Del Toro's Pan's Labyrinth 10 Most Memorable Quotes（查無此句）](https://screenrant.com/guillermo-del-toro-pans-labyrinth-memorable-quotes/)
- [CBR：10 Best Quotes From Pan's Labyrinth, Ranked（查無此句）](https://www.cbr.com/pans-labyrinth-best-quotes-ranked/)
- [TV Tropes：Quotes/PansLabyrinth（查無此句）](https://tvtropes.org/pmwiki/pmwiki.php/Quotes/PansLabyrinth)

**教學目的保留評估**（供未來修正時參考，本輪不動手實作）

g99的`rule`欄位明講設計目的：「目標是『聽到這句話能聯想到哪部片、哪個場景、什麼語氣』」——是一種「聽到台詞→定位電影/場景/語氣」的文化默契訓練，跟g98文學卡「一句話認一位大師」是同一種能力的影視版本。修正時要分別保留兩句各自的教學意圖，不是「隨便換一句查證過的台詞」就算過關：

- **《你媽媽也一樣》**：原本的教學框架是「樸實漁夫的生活智慧 vs 兩個滿腦子戀愛煩惱的青少年」，語氣設定成「平靜、帶著生活智慧」。若照查證結果改成正確歸屬（Luisa潛入水中前的話／內心獨白），**不能只是把「Chuy」換成「Luisa」**——這句話在電影裡的份量其實更重（後段劇情揭露Luisa在這趟旅行時已身患絕症，這趟公路旅行是她人生最後的冒險，這句話因此帶著「明知無常、仍選擇擁抱當下」的雙重意義），語氣描述也要從「老漁夫的民間智慧」改寫成「一個女人對無常人生的坦然擁抱」，兩者情感重量不同，直接find-and-replace人名會讓語氣解析跟實際場景對不上。
- **《羊男的迷宮》**：原本的教學框架是「哲學性、帶著淡淡的憂傷，呼應全片『童年純真 vs 殘酷現實』的核心對比」。若這句查無實據，修正時有兩條路：①在同一部片裡找一句**已查證真實存在**、同樣能扛起「純真vs殘酷現實」這個對比的台詞（例如查證過程中曾檢索到 Doctor對Vidal上尉說的「服從不需要理由，這是只有你這種人才做得到的事」這類已有西語片段來源的台詞，可作為候選方向，但需要用同等嚴謹度重新查證，本輪未做這一步）②如果找不到同等份量的替代句，考慮換掉整部電影（但要重新設計整段「場景+語氣解析」，不是換句話就好）。無論哪條路，都要維持卡片「一句話認一部片」的設計精神，不能為了「有查證過就好」而選一句份量不夠、教不出「文化默契」的台詞。

**Fix（2026-08-02，已寫入 `grammar.js`）**

- **《你媽媽也一樣》**：`Chuy`→正確歸屬為`Luisa`（Maribel Verdú飾）；場景重寫為「公路旅行尾聲、獨自潛入海裡前的自白，電影後段才揭露這趟旅行是她人生最後一次遠行」；語氣解讀依你的方向從「漁夫智慧／生活哲學」改為「面對生命有限性時的坦然與成熟」，與原本兩位青少年主角的浮躁對比這個教學設計保留不動。
- **《羊男的迷宮》**：採**第一選擇（換台詞，不換電影）**——查證找到片中另一句已被多來源獨立收錄的真實台詞：`"Obedecer por obedecer, así, sin pensarlo, eso sólo lo hacen gentes como usted, capitán."`（醫生費雷洛對維達爾上尉說的話）。
  - **查證來源**（3個獨立分析型來源交叉確認核心語意與場景，1個audio-frases類站點作為次要佐證措辭有輕微出入，已取多數決）：
    - [Apalabrado 部落格「Obediencia ciega」逐場景分析（"sin pensarlo"版本）](https://apalabrado.wordpress.com/2026/05/08/obediencia-ciega/)
    - [La Mente es Maravillosa：desobediencia虛擬語氣主題分析（同樣是"sin pensarlo"版本，與上者獨立互證）](https://lamenteesmaravillosa.com/el-laberinto-del-fauno/)
    - [Cultture：Las 10 mejores citas de El laberinto del fauno（官方精選TOP10引用清單，收錄此句為代表台詞之一）](https://www.cultture.com/las-10-mejores-citas-de-el-laberinto-del-fauno-clasificadas)
    - [audiofrases.com：音檔逐字稿（次要佐證，"sin cuestionarlo"版本，與上述兩者措辭有小出入，已依多數決採用"sin pensarlo"）](https://audiofrases.com/frases-de-peliculas-de-fantasia/audio-frases-de-el-laberinto-del-fauno/porque-obedecer-por-obedecer-asi-sin-cuestionarlo-es-solo-para-personas-como-usted-capitan)
  - **主題契合度比原句更高**：查證過程額外找到del Toro本人受訪原話——「這部片其實是一則支持不服從的小寓言，因為……負責任的第一步就是不服從——為自己思考」，且此線與女主角Ofelia最後拒絕潘神命令、不肯犧牲弟弟是同一主題的兩種呈現（成人世界的政治抵抗 vs 童話世界的良知選擇）——完整覆蓋你要求的「純真／暴力現實／成人世界／信念衝突」四個面向，教學重量比原本查無實據的赫拉克利特引言更貼近全片核心。
  - `trap`欄位已同步整段重寫（原本講「這句台詞源自赫拉克利特」的內容已不適用，改寫成講述「不服從的美德」這個主題脈絡）。

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
**Status**: Fixed（2026-08-02）
**Severity**: Medium（修正前）

**Issue — 哥多華清真寺興建年份誤植**
- 卡片寫「756年開始興建」——查證顯示這是**把兩個不同的歷史事件搞混了**：
  - **756年**：Abderramán I 在Alameda戰役擊敗Yusuf al-Fihri後，佔領哥多華、自立為獨立酋長（Emir），建立**哥多華酋長國（Emirato de Córdoba）**——這是「建國年份」，不是「清真寺動工年份」。
  - **785年動工／786年落成第一期**（兩輪查證交叉確認：史料對「動工」與「主體完工」兩個時間點分別記載，非單一年份）：Abderramán I 買下原西哥德教堂用地、拆除後**開始興建哥多華清真寺**，落成第一期在隔年，比756年建國晚了約29-30年。
  - **建議修正方向**：「756年開始興建」→「785年開始興建」（若要強調「這棟建築花了一年多才蓋好第一期」，可寫成「785-786年」區間，兩種寫法皆有史料支持，786年單獨使用時容易被誤讀成「動工年」而非「完工年」，建議避免只寫786。）
- 卡片「1492年」相關三件事同年發生（收復失地運動終結＝格拉納達陷落／哥倫布抵達美洲／猶太人被驅逐）——這是廣為人知且可信的史實，**未發現問題**，不影響本卡整體評級（僅Issue本身是Medium風險，不是整卡作廢）。

**Evidence**
- [Wikipedia ES：Mezquita-catedral de Córdoba（786年落成）](https://es.wikipedia.org/wiki/Mezquita-catedral_de_C%C3%B3rdoba)
- [Wikipedia ES：Abderramán I（756年建國，非清真寺年份）](https://es.wikipedia.org/wiki/Abderram%C3%A1n_I)
- [nuestrahistoria.es：14 mayo 756，origen Emirato de Córdoba（確認756年是「建國」而非「清真寺」事件）](https://nuestrahistoria.es/efemerides-14-mayo-origen-emirato-cordoba/)
- [artencordoba.com：Primitiva Mezquita de Abd al-Rahman I（785年購地拆除動工，786年完成第一期）](https://www.artencordoba.com/en/mosque-cordoba/the-mosque/primitive-mosque-abd-al-rahman-i/)
- [bajolamiradadecordoba：La Mezquita que construyó Abderramán I（785年動工、786年完工的雙年份記載）](https://bajolamiradadecordoba.blogspot.com/2015/07/la-mezquita-que-construyo-abderraman-i.html)

**查證限制**：史料對「動工」跟「完工第一期」兩個時間點的年份標註不完全一致（多數來源用785/786，少數來源直接寫786涵蓋兩者），這是原始史料本身的常態模糊，不是本次查證的疏漏——修正時建議保留這個彈性（785-786），不要為了「單一數字」而過度精確化成查無依據的單一年份。

**Fix（2026-08-02，已寫入 `grammar.js`）**：僅做單點修正——「756年開始興建」→「785年動工、786年落成第一期」，其餘描述（馬蹄形拱門、天主教收復後加建、文明交會意象）完全沒動；卡片的1492年三件事同年發生、Al-Ándalus其餘史實背景描述本來就查證無誤，同樣不動，符合最小修正原則。

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

## 2. 修正優先級（狀態：全部已收斂）

### ✅ Fixed（原 High，2張）
- **g99**：《你媽媽也一樣》人物/場景誤植（Chuy→Luisa，語氣改為「面對生命有限性時的坦然與成熟」）；《羊男的迷宮》換成已查證的Doctor Ferreiro台詞（不換電影）。詳見上方Card entry的Fix記錄。

### ✅ Fixed（原 Medium，1張）
- **g106**：756→785/786年區間表述，僅單點修正，其餘描述未動。

### 🟢 Verified（10張，之後不用重複查）
g92／g94／g95／g96／g97／g98／g101／g102／g104／g105／g107。

---

## 3. Commit 策略（已完成）

依「查證與修正分開」原則，執行過三個階段：

- **Commit 1**（`137b66c`）：只新增稽核文件，不動 `grammar.js`。
- **Review pass**（`8959323`）：依三項標準（Evidence充分性／教學目的保留／g106最小修正）補強稽核文件本身的證據鏈與限制揭露，仍未動 `grammar.js`。
- **Commit 2**（`content: fix culture citation issues`）：實際修正 `grammar.js` 的 g99／g106，並同步把本文件對應卡片的 `Status` 從 `Needs Fix` 改為 `Fixed`——原始 Issue 記錄保留當作歷史脈絡，沒有整段刪除改寫，Fix記錄緊接在對應Issue後面，方便對照「改之前/改之後」。

---

## 變更記錄

| 日期 | 內容 |
|---|---|
| 2026-08-02 | 首版建立。13張C1/C2文化卡逐一查證，2張(g99/g106)標記Needs Fix，10張Verified，1張(g94)無需查證外部引用。本輪僅查證，未修改grammar.js。 |
| 2026-08-02 | Review pass（Commit前檢視，仍未修改grammar.js）：①g99補上查證範圍/查證限制/風險判定理由三個小節，並補齊先前只在文字提到、沒附連結的3個Evidence連結（ScreenRant/CBR/TV Tropes）；②g99新增「教學目的保留評估」，先分析兩句台詞各自原本的教學設計意圖，供未來修正時參考，本輪不執行修正；③g106年份精修：756→786的單一數字結論改成785年動工/786年落成第一期的區間表述（原文786年措辭有「動工」與「完工」自我矛盾，已修正並補充2個新查證來源）。 |
| 2026-08-02 | Commit 2：正式修正`grammar.js`。g99——《你媽媽也一樣》人物歸屬Chuy→Luisa＋語氣改寫為「面對生命有限性時的坦然與成熟」；《羊男的迷宮》查無實據的赫拉克利特台詞換成已多來源查證的Doctor Ferreiro「不服從」台詞（換台詞不換電影，trap欄位同步整段重寫）。g106——756年→785年動工/786年落成第一期，僅單點修正。兩張卡Status皆更新為Fixed，原始Issue記錄保留未刪，Fix記錄緊接其後。`node --check`與`node maintenance.js`皆確認0錯誤、117張卡數量不變。 |
