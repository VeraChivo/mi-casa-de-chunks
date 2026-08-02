# 🔍 語塊產品盤點｜功能抓漏與改善清單（FEATURE_AUDIT.md）

Product Track｜功能盤點的產出文件。只盤點、不開發——這裡列的項目都還沒有動任何程式碼。

依照既定順序：

```
產品定義（PRODUCT_PRINCIPLES / PRD / MVP_BOUNDARY）
↓
功能盤點
↓
抓漏
↓
新功能評估
```

這份文件對應「功能盤點」與「抓漏」兩步，拆成兩條線，不要只寫新功能：

1. **功能缺口**——對照產品定義範圍，看現有功能有沒有漏做/沒做完的
2. **已發現問題／改善項**——不是缺功能，是既有功能/資料結構本身有風險或待釐清的地方

---

## 🗂️ 串的邊界說明（2026-08-01）

這份盤點跟「Content Quality Track」是不同的串，各自邊界要分清楚，不要互相吃掉對方的工作範圍：

```
Content Quality Track｜內容品質
① 內容檢查補強    ⬜ 未完成（見下方⑦，只記錄現況，未來開發輪再實作）
② 語塊內容格式評估｜Content Structure Review   ✅ 盤點分析已完成（見下方「內容格式評估」章節，
   結論：不建立CONTENT_SCHEMA.md，改列點狀清理候選，實際清理留給未來實作輪）

Ammo Data Cleanup Track｜獨立串（尚未開始，VERA 2026-08-01定調記錄即可、不阻塞）
狀態：📋 已確認的局部重構候選，不是阻塞問題
範圍：見下方「Ammo Data Cleanup Track（記錄）」章節

Documentation Sync｜獨立串（尚未開始，VERA 2026-08-02定調先記錄不順手改）
狀態：📋 已確認CLAUDE.md「🪵方案A：雙音軌錄放對比」條目與實際程式碼不符（echo跟讀功能
     已上線，CLAUDE.md仍記錄「先不動工」），留給未來獨立處理，不在PRD審核途中改CLAUDE.md
範圍：①更正該條目狀態 ②檢查是否還有其他類似落差（這次是抽查發現，不保證只有這一個）

Product Track｜功能盤點（本文件主體）
Track 1 — Product
  01 PRODUCT_PRINCIPLES.md   🟢 Ready（2026-08-02 VERA審核通過方向，見PRODUCT_PRINCIPLES.md，
     文末「待VERA分類的邊界項目」表保留不併入正文，作為之後拆PRD的參考紀錄）
  02 PRD                     🟢 Ready（見PRD.md，聚焦核心學習迴路，Appendix A/B分開放；
     查證過程中發現🎙️跟讀回音比對功能已上線但CLAUDE.md待處理清單記錄過時，已轉為Documentation
     Sync獨立串記錄，不在此處理）
  03 MVP_BOUNDARY            🟢 Ready（2026-08-02 VERA審核通過，取捨文件形式：V1必須有／
     明確不做／延後原因／重新評估條件，每項皆已核對兩個部分齊全，見MVP_BOUNDARY.md）

**✅ Track 1 三文件封箱（2026-08-02）**——PRODUCT_PRINCIPLES / PRD / MVP_BOUNDARY 皆🟢 Ready。

Track 2 已發現問題／改善項   ✅ 7項已查證完成

Feature Inventory / System Map｜下一階段（見SYSTEM_MAP.md）
狀態：✅ 現況地圖已完成——功能 × 實際檔案責任 × MVP_BOUNDARY符合度，逐區塊核對完成，
     過程中新增發現兩項：①`chunkFamiliarity`與`CHUNK_FAMILIES`命名易混淆但是不同系統
     ②`clearLS()`遺漏清除的key範圍比原記錄更廣（milestones/chunk_fam_seen/daily_task皆漏）
```

**這條原則要守住：格式評估／盤點屬於「評估」，一旦動手改`maintenance.js`或任何程式碼，
就已經跨進「實作」，要另開「語塊系統｜內容品質檢查補強實作」串處理，不要在盤點串裡直接動手。**

---

## ⚠️ 前置狀態說明（2026-08-01）

`PRODUCT_PRINCIPLES.md`／`PRD.md`／`MVP_BOUNDARY.md`／Data Track整理文件，目前在repo與全部git歷史
（含所有分支）裡都找不到，推測是先前某個session整理完但沒有commit/push，容器回收後遺失。

**Track 1（功能缺口）在拿到這三份文件內容之前無法真正展開**——「缺口」要對照「已定義的範圍」才有意義，
沒有範圍定義，任何缺口判斷都只是憑印象猜，容易把待辦/草稿/已淘汰概念誤當成正式缺口（這正是先前
討論中特別提醒要避免的事）。目前先留空，等文件內容補回來再回頭填。

**Track 2（已發現問題／改善項）不依賴那三份文件**——這是對現有程式碼/資料結構的既有事實查證，
本輪已逐項用grep/read核對過，不是照抄，以下標示「✅已驗證」的都是這輪實際檢查過程式碼得到的結果。

---

## Track 1：功能缺口

⏳ 待補——需要 PRODUCT_PRINCIPLES.md / PRD.md / MVP_BOUNDARY.md 內容才能對照範圍展開。

---

## Track 2：已發現問題／改善項

### ① script.js 責任過重

**現況查證（✅已驗證，2026-08-01）**：
- 實際行數：5265行（`wc -l script.js`核對，與提報數字完全一致）
- 頂層具名function數：301個（`grep -cE '^function\s+\w+' script.js`），與提報「303個」相差極小
  （不同計數口徑會有±5的落差，數量級一致，視為確認）
- 檔案內同時管理：劇情render、文法卡渲染、彈藥庫解鎖、花園熟練度、日記、提醒通知、
  里程碑、backup/restore、maintenance相關render等橫跨全站的狀態與邏輯

**狀態**：✅已驗證屬實。

**建議**：目前先不拆檔——這是規模／架構風險的記錄，不是要立刻重構。之後如果要拆，建議先有
明確的domain邊界（可能要等Track1範圍文件到位、或先做下面②③的資料domain釐清）再動手，
不要沒有邊界定義就先拆檔案。

---

### ② peppa_garden_v1 邊界問題

**現況查證（✅已驗證，2026-08-01）**：
`getGardenDB()`/`saveGardenDB()`都只對應單一localStorage key（`peppa_garden_v1`），但實際存進
這個容器的key帶有至少4種不同前綴／格式，分屬不同來源：
- `sfx_`開頭（見`_gardenChunkDisplay`）
- `ge_`開頭（grammar例句語塊，見`renderConjLibrary`裡新增的熟練度星星）
- `gp_`開頭
- `s2_p\d+`（Stage2練習句型，非固定句子）
- 沒有底線的原始句子/單字（正常語塊）
- 舊版殘留、格式不明的key（`_isLegacyJunkChunk`專門處理這類）

這證實了提報的判斷：**不是責任混亂（同一份程式碼職責清楚，都是「熟練度追蹤」），
而是同一個儲存容器裡混了好幾個不同domain的key**（彈藥庫語塊／文法例句語塊／SFX／Stage2練習），
只是靠前綴字串手動分辨，沒有正式的命名規範文件。

**狀態**：✅已驗證屬實。

**建議**：不用現在拆分容器（改key格式會動到既有使用者的localStorage資料，風險高於效益）。
留給未來「資料規範階段」明確定義每個前綴的範圍與新增規則（例如：新的domain要不要開新前綴、
前綴命名規則是什麼），這輪只需要記錄現況。

---

### ③ dynamic_phrases_db 命名例外

**現況查證（✅已驗證，2026-08-01）**：
全站掃描所有`localStorage.getItem/setItem/removeItem`使用的key（共19個），只有
`dynamic_phrases_db`一個不是`peppa_*`開頭，其餘18個全部遵守`peppa_*`命名慣例。

**狀態**：✅已驗證屬實，且確認是**唯一**例外（不是「大概只有這個」，是逐一列出後確認只有這一個）。

**建議**：不改key名稱（會導致既有使用者這部分資料在下次讀取時消失，等同資料遺失）。
留到「資料規範階段」一併決定：要嘛承認這是歷史例外並記錄下來，要嘛規劃遷移路徑
（讀舊key→寫新key→棄用舊key的漸進式遷移，不是直接改名）。

---

### ④ backup/reset 邊界

**現況查證（✅已驗證，2026-08-01，且發現一個先前未記錄的新問題）**：

`BACKUP_KEYS`目前有14個key。實際存在的19個key裡，有6個不在`BACKUP_KEYS`清單內：
`peppa_active_tab`、`peppa_brief_day_v1`、`peppa_garden_junk_cleaned_v1`、
`peppa_reminder_last_diary`、`peppa_reminder_last_study`、`peppa_welcome_tour_seen_v1`。
這6個多半是UI狀態/一次性旗標，不一定需要進backup，但目前沒有文件說明「哪些key故意不進backup」，
純粹是遺漏還是刻意排除無法從程式碼本身判斷。

**🆕 新發現（本輪查證時發現，先前記錄未提及）**：`clearLS()`（🌾重新開墾／清除所有學習紀錄）
只清除7個key（`peppa_es_v4`／`peppa_es_vocab_v1`／`peppa_garden_v1`／`peppa_garden_watered_v1`／
`peppa_es_grammar_v1`／`peppa_es_familiarity_v1`／`dynamic_phrases_db`），比`BACKUP_KEYS`少了7個：
`peppa_mom_diary_v1`／`peppa_mom_notes_v1`／`peppa_talk_diary_v1`（日記類，刻意保留合理，
清除學習進度不應該連日記一起洗掉）／`peppa_milestones_v1`／`peppa_daily_task_v1`／
`peppa_chunk_fam_seen_v1`／**`peppa_first_chunk_date_v1`（不合理，見下方說明）**。

其中`peppa_first_chunk_date_v1`沒被`clearLS()`清除，會導致實際行為跟CLAUDE.md記錄的預期不符：
`renderHeaderStartSlot()`（header最左邊🌱點播初芽／🌿園區印記切換）直接用
`getFirstChunkDate()`是否為null判斷「是不是新手」——`clearLS()`重新開墾後這個值還在，
代表使用者按了「重新開墾」，header卻仍然顯示「🌿園區印記」而不是回到「🌱點播初芽」的初始狀態，
跟CLAUDE.md裡「重新開墾後回到還在等妳播下第一顆種子的初始文案」的預期不一致。

**狀態**：✅已驗證屬實，且比原描述更明確——這不只是「曾經修過、要保留檢查規則」的歷史提醒，
而是**目前仍存在**的具體行為落差（`clearLS`遺漏`peppa_first_chunk_date_v1`）。

**建議**：這屬於「抓漏」範疇的具體bug，不是新功能，但因為本輪定位是盤點不開發，先記錄不動手。
之後修的話範圍很小（`clearLS()`裡補一行`localStorage.removeItem('peppa_first_chunk_date_v1')`，
同時評估`peppa_milestones_v1`/`peppa_daily_task_v1`/`peppa_chunk_fam_seen_v1`要不要一併納入）。
另外建議：新增key時要同時過三張表（是否進`BACKUP_KEYS`／是否進`clearLS`／是否有正式理由排除），
不要各自增修時各憑印象決定。

---

### ⑤ ammoStars 遺留欄位

**現況查證（✅已驗證，2026-08-01）**：
`ammoStars`（`{ammo_id: 0|1|2}`）存在於：宣告初始值、從`peppa_es_v4`舊資料migrate進來、
存進`saveToLS()`、`clearLS()`裡重置——但除了這幾個「搬運」動作外，全站找不到任何地方
**讀取**`ammoStars[xxx]`的值來做判斷或渲染（`grep -n "ammoStars\["`零結果）。

**狀態**：✅已驗證屬實——讀寫路徑齊全，但沒有消費端，是貨真價實的死欄位。

**建議**：不是新功能缺口，是可清理項。因為只是被動搬運、不影響任何現有功能，風險低，
但仍建議先確認一次「是否之後某個計畫中的功能會用到它」（例如彈藥卡本身的星等顯示，
目前站上彈藥卡似乎沒有這個UI）再決定是否移除，避免移除後才發現漏看了某處引用。

---

### ⑥ peppa_first_chunk_date_v1 使用邊界

**現況查證（✅已驗證，2026-08-01）**：
同一個key被兩個不同用途的函式解讀：
- `renderHeaderStartSlot()`：把「是否為null」當作**新手判斷flag**（決定header顯示🌱還是🌿）
- `renderMilestoneBadgeStrip()`／`daysSinceFirstChunk()`：把日期本身當作**耕耘天數計算基準**

程式碼註解本身有寫明這是刻意設計（「判斷依據直接沿用getFirstChunkDate()，
不另開一個『是否為新手』的flag（單一資料來源）」），所以不是誤用，是刻意共用同一份資料。
但這也代表：**這個key身兼兩種語意**（有沒有=新手判斷／值是什麼=天數計算基準），
如果之後要修改其中一種用途的邏輯，很容易牽動另一邊而不自知——上面④發現的
`clearLS()`遺漏就是這種耦合風險的實例（清reset本來只是想重置學習進度，
卻因為沒清這個key，連帶讓「新手判斷」邏輯也跟著壞掉）。

**狀態**：✅已驗證屬實，且與④的新發現直接相關，建議兩條一起看。

**建議**：不急著拆成兩個獨立key（現有「單一資料來源」的設計本身沒錯，重複資料來源反而
更容易不同步）。但需要在文件裡明確寫下「這個key同時是A用途也是B用途」，
之後任何人改動前先檢查這兩處消費端，不要只看其中一個。

---

### ⑦ 內容規範缺口（episodes.js / grammar.js / ammo.js）

**現況查證（✅已驗證，2026-08-01，且發現比提報更細緻的現況）**：
`maintenance.js`目前有做`checkDuplicateIds`/`checkRequiredFields`兩種通用檢查，
但只套用在4個資料源：`GRAMMAR_DATA`（grammar.js）、`NEWS_ITEMS`（news.js）、
`LYRICS_FILL_DATA`（歌詞填空）、`FALSE_COGNATES`（假同源詞）。

**grammar.js其實已經有基本的必要欄位檢查**（`cat`/`level`/`title`/`rule`/`examples`/`source`），
跟提報「三個檔案都完全沒有規範」略有出入；**真正完全零檢查的是`episodes.js`（EPS陣列）
跟`ammo.js`（AMMO_DATA）**——這兩個檔案的資料格式目前純靠開發時的手動慣例維持一致，
沒有任何程式化的必要欄位/重複ID檢查。

**狀態**：✅部分驗證屬實，並修正了範圍——grammar.js已有基礎防呆，episodes.js/ammo.js才是真正的缺口。

#### Content Quality Track ① 內容檢查補強

```
⬜ 未完成

現況：
maintenance.js 尚未覆蓋 EPS / AMMO_DATA 必填欄位與 ID 檢查。

待辦：
未來開發輪再補（另開「語塊系統｜內容品質檢查補強實作」串處理，比照grammar.js
現有的checkRequiredFields模式即可，不需要另外設計新機制）。此輪盤點只記錄現況，不動手。
```

---

---

## 🧩 語塊內容格式評估｜Content Structure Review（Content Quality Track ②，2026-08-01）

**方法**：不用示意欄位表用猜的，直接用node載入`episodes.js`/`grammar.js`/`ammo.js`裡的真實陣列
（`EPS`/`GRAMMAR_DATA`/`AMMO_DATA`），統計每個欄位在全部項目裡的實際覆蓋率，用數字判斷
「這是固定規則」還是「這是零星累積」，不是憑印象猜。

### episodes.js（EPS，共20集／200句）

- **集層級（100%固定4欄）**：`title`／`titleZh`／`dur`／`sentences`
- **句層級（100%固定6欄）**：`es`／`chunks`／`zh`／`en`／`noteZh`／`noteEn`——**全部200句無一例外都有這6欄**
- **句層級（選填1欄）**：`expand`（164/200＝82%，沒有的18%是刻意沒做換詞練習的句子，非缺漏）
- **語塊層級**：`w`／`role`（role偶爾是undefined，代表非S/V/O/連接詞的裝飾字，如逗號後的語氣詞）／
  極少數`hideYg`（特殊UI旗標，用途未深究，屬於個位數的一次性欄位）

**結論**：episodes.js是三者裡結構最乾淨的，核心欄位100%一致，沒有找到欄位層級的不一致。

### grammar.js（GRAMMAR_DATA，共117張卡）

- **100%固定8欄**：`id`／`cat`／`level`／`title`／`rule`／`examples`／`trap`／`source`
  （**注意**：`maintenance.js`目前只驗證其中6個——`cat`/`level`/`title`/`rule`/`examples`/`source`，
  `trap`雖然實際100%都有，卻沒被列進必要欄位檢查清單，這是驗證清單跟實際現況之間一個小落差，
  但因為trap目前本來就100%達標，暫不影響資料品質，只是清單本身沒跟上現況）
- **`examples`內部結構100%一致**：405筆全部都是`{es, zh}`兩欄，沒有任何一筆例外
- **`family`內部結構100%一致**：25張有用到的卡，全部都是`{title, intro, items}`物件
- **低使用率的enrichment欄位（`family`25/117、`conj`13/117、`contextDialogue`13/117、
  `crossLang`5/117、`storyRoles`5/117、`mnemonic`3/117、`quirk`3/117、`emph`/`note`/`extraFamily`
  各僅1張）**——查證後**這些不是格式漂移，是刻意的單卡強化**：例如`mnemonic`只給g01/g02/g27
  （SER/ESTAR口訣卡、虛擬語氣入門卡）、`quirk`只給g01/g02/g109（有特例反直覺用法要補充的卡），
  每個都對應CLAUDE.md裡記錄過的具體教學需求，不是隨便加的。這跟「歷史累積雜訊」是兩回事，
  評估時不能因為使用率低就當成問題。
- **`contextDialogue`有一個小的結構怪異點**：13張卡全部都是「長度為1的陣列」包住單一
  `{situation, lines, note}`物件，而不是直接存成物件本身。陣列包單一物件在目前13/13案例裡
  完全一致，不算bug，但這個「明明只會有一筆卻包成陣列」的寫法，之後如果有人真的想放第二組
  情境對話，資料結構已經支援（陣列可以推第二筆），算是預留彈性而非錯誤，只是目前看起來略為多餘。

**結論**：grammar.js整體健康，必要欄位100%一致；「欄位很多、使用率參差」是刻意的漸進式豐富化
設計，不是規範缺口。

### ammo.js（AMMO_DATA，共104張卡）

- **100%固定12欄**：`ammo_id`／`ep`／`core_ammo`／`core_zh`／`be_verb_type`／`be_verb_note`／
  `pattern`／`pattern_zh`／`pattern_note`／`slots`／`fire_peppa`／`fire_daily`
- **🆕 發現一組真正的「歷史累積」欄位（不是刻意設計）**：`be_verb_type`／`be_verb_note`
  兩欄100%存在於全部104張卡，但`be_verb_type`的值只有3種——`ser`(22張)／`estar`(10張)／
  `none`(**72張，占69%**)，`none`的72張裡`be_verb_note`全部是空字串。這代表這組欄位名稱
  是早期彈藥庫還聚焦在SER/ESTAR教學時代設計的，後來彈藥庫擴充涵蓋PODER/DEBER/GUSTAR/
  TENER等各種句型後，這組欄位對69%的卡片來說已經名不符實，只能靠`"none"`當佔位值撐住
  schema一致性——這正是「哪些欄位只是歷史累積」的具體例證。
- **🆕 確認`fire_peppa.ts`是100%死欄位**：全部104張卡（不只CLAUDE.md先前記錄的60張，
  這次是全量核對）的`fire_peppa.ts`都是`null`，對應CLAUDE.md已記錄的「真實發音功能規劃
  （影片時間戳跳轉）VERA已決定丟棄」——這個欄位留在schema裡但完全沒有任何用途，是可以
  安全清理的死欄位。
- **健康的部分**：`pattern_note`100%有內容（0筆空字串）；`slots`穩定是陣列（長度1-3隨內容
  變化，屬合理變異不是不一致）；`fire_daily`**100%固定長度為2**（104/104都剛好2筆每日例句，
  這是目前只靠慣例維持、從沒被寫成正式規則的「隱性固定規格」）；語塊層級`w`/`role`/選填的
  `note`/`hideYg`跟episodes.js的語塊格式一致，沒有分裂出不同慣例。

**結論**：ammo.js是三者中**唯一有真正歷史包袱**的檔案——`be_verb_type`/`be_verb_note`（69%卡片
名不符實）與`fire_peppa.ts`（100%死值）都是具體、範圍明確、可以清楚指出「為什麼是歷史遺留」
的欄位，不是含糊的整體評價。

---

### 回答四個問題

1. **三套資料格式是否健康？** 三套都不差，但程度不同：episodes.js最乾淨（0個問題欄位）、
   grammar.js健康（必要欄位穩固，豐富欄位是刻意設計不是雜訊，只有trap的檢查清單落後於現況這個
   小落差）、ammo.js有兩個具體的歷史包袱欄位（`be_verb_type`/`be_verb_note`、`fire_peppa.ts`）。

2. **哪些欄位是固定規則？** episodes.js的集層級4欄＋句層級6欄（100%）；grammar.js的8欄
   （100%，含trap）；ammo.js的12欄（100%，含`fire_daily`固定長度2這個隱性規則）。

3. **哪些欄位只是歷史累積？** 只有ammo.js的`be_verb_type`／`be_verb_note`／`fire_peppa.ts`
   三個欄位符合「歷史累積」定義（早期設計、現在名不符實或完全死值）。grammar.js的低使用率
   欄位（family/conj/mnemonic/quirk等）**不算**歷史累積，是刻意的單卡強化，不要混為一談。

4. **是否需要建立`CONTENT_SCHEMA.md`？** **維持先前的Reality Check方向：不需要現在建立。**
   理由用這輪的實際數字支撐：真正的問題只有ammo.js的2組具體欄位（範圍很小、很好指認），
   不是「三個檔案格式普遍混亂」。寫一份完整schema文件解決不了這兩個具體欄位的問題，
   反而可能把grammar.js刻意設計的豐富欄位誤判成「不一致該規範化」，做錯方向。
   比較對的下一步是**點狀清理**（評估`be_verb_type`改名或拿掉、評估`fire_peppa.ts`整欄移除），
   不是寫規範文件——但這已經是「實作」範疇，依照本文件開頭的邊界說明，這輪只記錄發現，
   不在這裡動手。

---

## 🗃️ Ammo Data Cleanup Track（記錄，2026-08-01 VERA定調，尚未開始）

VERA決定：**不現在開這條串，先回Product Track**。把ammo.js這兩組欄位定義為「已確認的局部
重構候選，不是阻塞問題」——不影響現在的產品盤點工作，先記錄，之後獨立開一條
`Ammo Data Cleanup Track`再處理，範圍只鎖定這兩組欄位，不要跟其他改動混在一起。

### be_verb_type / be_verb_note
問題定性：不是錯，是命名與現況不一致（69%卡片值為`"none"`，早期SER/ESTAR聚焦時代命名）。
未來動工前需要先查的三件事（VERA列出）：
1. 現有引用位置——`script.js`裡實際讀取這兩個欄位的地方有哪些、渲染時怎麼用
2. 未來AI使用方式——如果之後有其他工具/流程要讀ammo.js資料，改名/移除會不會影響
3. 是否有外部依賴——localStorage/備份資料裡有沒有反向依賴這個欄位名稱
候選方向：改名成更廣義欄位／保留舊欄位相容／直接移除，三個方向都還沒選，等真的開工再評估。

### fire_peppa.ts
問題定性：較單純——104/104筆皆為`null`，對應的影片時間戳功能已確認放棄（見CLAUDE.md）。
未來可以考慮整欄移除，但不急，維持在候選清單裡即可。

---

## 小結

7項全數查證屬實，其中②③⑤⑥屬於「現況記錄＋待未來資料規範階段決定」性質，不急迫；
①屬於架構風險記錄，暫不處理；④在查證過程中發現一個目前確實存在、範圍很小的行為落差
（`clearLS()`遺漏清除`peppa_first_chunk_date_v1`，導致重新開墾後header判斷邏輯不會重置），
建議列入下一次「🔴真bug」批次一併處理（見CLAUDE.md「Git推送節奏規則」的bug優先級）；
⑦確認真正的規範缺口只在episodes.js/ammo.js，grammar.js已有基礎防呆不必重做。

**Track 1（功能缺口）已完成三份文件（PRODUCT_PRINCIPLES/PRD/MVP_BOUNDARY，皆🟢 Ready）。**

**SYSTEM_MAP.md（Feature Inventory）補充**：逐區塊核對「檔案責任 × MVP_BOUNDARY符合度」後，
確認`clearLS()`遺漏清除的key範圍比④原記錄更廣——除了`peppa_first_chunk_date_v1`，
`peppa_milestones_v1`／`peppa_chunk_fam_seen_v1`／`peppa_daily_task_v1`同樣沒被清除，
建議這次一併排進真bug批次修復；另發現`chunkFamiliarity`（單字熟悉度標記）與`CHUNK_FAMILIES`
（語塊家族收集功能）命名易混淆但是兩個獨立系統，記錄供未來改名參考，本輪不動手。
