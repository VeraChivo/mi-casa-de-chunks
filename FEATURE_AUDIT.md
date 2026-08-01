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

**建議**：是否要建立`CONTENT_SCHEMA.md`留給資料規範階段決定；如果要做，
最小可行版本可以先比照grammar.js現有的`checkRequiredFields`模式，
幫episodes.js/ammo.js各自補一組必要欄位檢查，不需要另外設計新機制。

---

## 小結

7項全數查證屬實，其中②③⑤⑥屬於「現況記錄＋待未來資料規範階段決定」性質，不急迫；
①屬於架構風險記錄，暫不處理；④在查證過程中發現一個目前確實存在、範圍很小的行為落差
（`clearLS()`遺漏清除`peppa_first_chunk_date_v1`，導致重新開墾後header判斷邏輯不會重置），
建議列入下一次「🔴真bug」批次一併處理（見CLAUDE.md「Git推送節奏規則」的bug優先級）；
⑦確認真正的規範缺口只在episodes.js/ammo.js，grammar.js已有基礎防呆不必重做。

Track 1（功能缺口）仍等待PRD/PRODUCT_PRINCIPLES/MVP_BOUNDARY內容才能展開。
