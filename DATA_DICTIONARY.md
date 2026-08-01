# 📖 DATA_DICTIONARY.md — 資料欄位字典

> Data Track｜資料規範｜定位：資料規範_欄位字典
> 目標：整理現有 localStorage 與資料物件的欄位定義。
> 限制：只整理現況，不修改資料結構。不拆 key、不合併資料、不新增欄位、不寫 migration。

---

## 0. 文件說明（先讀這節）

### 0.1 這份文件怎麼產生的

任務交接時列出的四份前置文件——`LOCALSTORAGE_SCHEMA.md`（資料盤點）、`DATA_DOMAIN_MAP.md`（資料領域）、
`STATE_RESPONSIBILITY_MAP.md`（資料責任）、`STORAGE_VERSIONING.md`（資料管理）——經查證，**在這個 repo
（含全部分支、全部 git 歷史）裡都不存在**（`git log --all` 對這四個檔名沒有任何 commit 紀錄）。推測是先前
某個 session 產出後沒有 commit + push，隨遠端環境容器回收而遺失，不是這次任務刻意跳過。

依照本專案「Reality Check」鐵則（CLAUDE.md 工作流程鐵則第4條、VERA協作模式第2條）——**不可依文件記錄判斷
完成，必須依實際程式碼判斷**——這份字典改為直接從原始碼萃取欄位定義，而不是轉抄前置文件內容。這比依賴
可能過時的中間文件更可靠，但代表：

- 沒有既有的「資料領域分類」「資料責任歸屬」可以直接引用，本文件只做**欄位定義**本身，不重做那三份文件
  的分類/責任/版本管理判斷（那是另外三條軌的工作範圍，不在這裡重複）。
- 若之後補回那四份文件，本文件的欄位定義內容應該互相對得起來；若對不起來，以**程式碼實際行為**為準。

### 0.2 查證基準

- 對照 commit：`88eab79`（`main` 與工作分支 `claude/data-dictionary-fields-j44tg0` 在寫作當下完全同步，無落後）。
- 查證方式：`localStorage.getItem/setItem/removeItem` 全文搜尋（含變數形式的 key，如 `REMINDER_LS_KEY`）＋
  用 Node.js 以 `new Function()` 沙盒實際執行 `episodes.js`／`ammo.js`／`grammar.js`／`cognates.js`／
  `corazon.js`／`mom.js`／`news.js`／`stages.js`／`script.js` 內的常數宣告，取得**執行期真實物件**的
  `Object.keys()`，不是憑肉眼讀程式碼猜欄位——避免漏掉只在部分卡片才出現的可選欄位（如 `contextDialogue`
  只有 13 張 grammar 卡有、`family` 只有少數卡有）。

### 0.3 涵蓋範圍

| 涵蓋 | 不涵蓋（原因） |
|---|---|
| Part A：全部 localStorage key 的完整欄位定義 | 純 UI 顯示用常數（圖示陣列、CSS class 名稱表、靜態提示語錄池）——這些是展示邏輯不是資料，見附錄 |
| Part B：內容資料物件（劇情／彈藥庫／文法卡／同源詞／媽媽區／新聞／關卡）欄位定義 | audio-manifest.js 內部逐一路徑（480+ 條），只描述**結構**不逐條列出檔名 |
| Part C：跨物件的對照表／生命週期標記表欄位定義 | 純函式（render 邏輯、事件處理）不算資料物件，不收錄 |
| Part D：驅動產品邏輯的設定型資料物件 | — |
| Part E：音檔對照表家族的結構說明（不逐條列路徑） | — |

### 0.4 型別標記慣例

本文件用簡化型別標記，對應 JS 執行期實際型別：`string`／`number`／`boolean`／`string[]`／`{...}`（物件，
展開列出欄位）／`Array<{...}>`（物件陣列）／`T|null`／`T?`（可選欄位，不是每筆資料都有）。

---

## Part A — localStorage 欄位字典

全站以 `localStorage` 存放的 key，共 **24 個現行 key**（另有 3 個舊版 key 會在載入時被動清除，見 A.25）。
除了 `peppa_es_v4`／`dynamic_phrases_db` 等少數以外，多數 key 存的是「陣列/物件序列化後的 JSON 字串」。

### A.1 `peppa_es_v4` — 主學習進度（讀寫：`saveToLS()` / `loadFromLS()`，script.js）

核心進度存檔，離開頁面/重整仍要保留的「使用者現在看到哪裡、彈藥庫解鎖到哪」。

| 欄位 | 型別 | 說明 |
|---|---|---|
| `ammoUnlocked` | `string[]` | 已解鎖的彈藥卡 `ammo_id` 清單（對照 `AMMO_DATA[].ammo_id`），依答對句子累積 |
| `ammoStars` | `{[ammo_id]: 0\|1\|2}` | ⚠️ **legacy／目前只讀不寫**：程式仍會讀取與回存這個欄位（相容舊資料），但現行程式碼中已找不到任何寫入路徑；熟練度改由 `peppa_garden_v1` 的 `stage`(0-4) 系統取代 |
| `answeredByEp` | `{[epIndex:number]: number[]}` | 每一集(0-based episode index)已答對的句子索引(0-9)清單，用於重整/切集後正確還原星星進度 |
| `svoPool` | `{s:string[], v:string[], o:string[]}` | Stage3「你學過的語塊庫」的累積詞池，完成句子時從該句 `chunks` 抓出 `role==='s'\|'v'\|'o'` 的文字塞入，依 role 分三個陣列，去重 |
| `ep` | `number` | 使用者目前所在集數 index（對照 `EPS` 陣列索引） |
| `idx` | `number` | 使用者目前所在集數內的句子 index (0-9) |

- 舊版 `peppa_es_v1`／`peppa_es_v2`／`peppa_es_v3` 會在 `loadFromLS()` 執行時用 `removeItem` 清掉（純清理，無資料遷移，代表這些版本的資料結構已被放棄）。
- 納入 `BACKUP_KEYS`：✅

### A.2 `peppa_es_vocab_v1` — 💎 醞釀私語窖收藏清單（讀寫：`saveVocabToLS()` / `loadVocabFromLS()`，script.js）

| 欄位 | 型別 | 說明 |
|---|---|---|
| （整體） | `Array<{...}>` | 陣列本身即整份收藏清單 |
| `id` | `number` | `Date.now()+Math.random()` 產生，做唯一鍵用（非遞增序號，避免同毫秒碰撞） |
| `text` | `string` | 收藏的西語句子/語塊原文（已 trim） |
| `zh` | `string` | 對應中文翻譯，可為空字串 |
| `source` | `string` | 這句話的來源標記（自由文字，例如集數/區塊名稱，或固定值 `"語塊"`），無固定枚舉 |

- 熟練度不存在這個物件裡——「已熟悉／收藏」的視覺狀態改由 `peppa_garden_v1`（用 `text` 當 key 查詢）決定，`peppa_es_vocab_v1` 本身只負責「有沒有收藏」與「收藏內容」。
- 納入 `BACKUP_KEYS`：✅

### A.3 `peppa_es_grammar_v1` — 文法卡使用者造句（讀寫：`saveGrammarLib()` / `loadGrammarLib()`，script.js）

| 欄位 | 型別 | 說明 |
|---|---|---|
| （整體） | `{[gId: string]: {user_examples: string[]}}` | key 是 grammar 卡片 id（如 `"g20"`），value 是該卡累積的使用者造句清單 |
| `user_examples` | `string[]` | 使用者對這個文法點造出的句子，例如 `"tengo hambre"`；由 `saveToGrammarLib(gId, sentence)` 去重後 push |

- 此物件同時被 §A.9 `dynamic_phrases_db` 的「雙寫」機制共同寫入（見 `triggerAutoWrite()`）——同一次「偵測到動詞變位+關聯詞」事件，會**同時**寫進這裡（以 `gId` 分組）跟 `dynamic_phrases_db`（以 `verbForm` 分組），兩者是同一份使用行為的兩種索引方式，不是重複資料。
- 納入 `BACKUP_KEYS`：✅

### A.4 `peppa_es_familiarity_v1` — 語塊熟悉度（讀寫：`saveFamiliarity()` / `loadFamiliarity()`，script.js）

| 欄位 | 型別 | 說明 |
|---|---|---|
| （整體） | `{[word: string]: 0\|1\|2}` | key 是單一語塊/單字文字，value 是熟悉度階段：0=☆未熟／1=◑半熟／2=★全熟（見 `FAM_STARS`/`FAM_LABELS`） |

- 由 `cycleFamiliarity(word)` 循環切換（0→1→2→0）。
- 納入 `BACKUP_KEYS`：✅

### A.5 `peppa_chunk_fam_seen_v1` — 🌳 語塊家族「上次看到的收集數」快照（讀寫：`_chunkFamSeenCounts()` / `_chunkFamSaveSeenCounts()`，script.js）

| 欄位 | 型別 | 說明 |
|---|---|---|
| （整體） | `{[familyKey: string]: number}` | key 對應 `CHUNK_FAMILIES[].key`（如 `"tener"`），value 是上次渲染時該家族已收集的分支數量 |

- 純 UI 用途：比對「這次收集數 > 上次快照數」來決定要不要顯示「🌱 你的 XX 樹有新變化！」提示，不是進度資料本體（進度本體是 `peppa_garden_v1`／`peppa_es_vocab_v1` 對照 `CHUNK_FAMILIES[].branches`即時算出）。
- 納入 `BACKUP_KEYS`：❌（純顯示狀態，遺失不影響學習資料）

### A.6 `peppa_garden_v1` — 🌻 語塊花園熟練度資料庫（讀寫：`getGardenDB()` / `saveGardenDB()`，script.js）

全站最核心的「熟練度」資料庫，橫跨💎收藏／🌾劇情語塊／📔日記心情語塊等多個來源，統一用「文字內容」當 key（不是內部 id，見 §A.6.1 說明）。

| 欄位 | 型別 | 說明 |
|---|---|---|
| （整體） | `{[chunkText: string]: {...}}` | key 是語塊/句子的**文字本身**（如 `"Sereno/a"`、`"tener hambre"`），不是任何內部 id |
| `stage` | `number (0-4)` | 熟練度階段，對照 `GARDEN_STAGES = ['𑁍','🌱','🍃','🍀','🌻']` 與 `_G_LABELS = ['收藏語塊','初萌芽','猛漲期','幸運草・抓蟲複習','日頭花開']` |
| `quiz_count` | `number` | 停留在 stage 3（🍀幸運草）時，累積抓蟲答對次數，滿 3 次自動升到 stage 4（🌻日頭花開） |

**A.6.1 舊版相容 shape（僅讀取時自動轉換，不會寫回舊格式）**：早期版本用 `{count:number, graduated:boolean}` 記錄（`count>=10` 或 `graduated===true` 視為高熟練度），`migrateGardenData()` 在讀取時偵測到這個舊 shape 會自動換算成 `{stage, quiz_count:0}` 並存回（僅換算一次，非每次讀取都轉換，因為換算後 key 已經是新 shape）。

**A.6.2 已知殘留資料類型**：早期一度用 `ammo_id`（如 `"e2_08"`）或內部合成 key（如 `"s2_p1"`）當 key，現在統一改用句子/語塊文字本身。`_gardenChunkDisplay()` 會把這類無法辨識的殘留 key 顯示成「🍂 舊版殘留紀錄（可忽略）」且標記 `junk:true`（不可點擊、不進抽題題庫），`migrateGardenJunkCleanup()`（見 §A.8）會做**一次性**清除。

- 納入 `BACKUP_KEYS`：✅

### A.7 `peppa_garden_watered_v1` — 花園新鮮度時間戳（讀寫：`getLastWatered()` / `markWatered()`，script.js）

| 欄位 | 型別 | 說明 |
|---|---|---|
| （整體） | `string`（存的是 `Date.now()` 轉成的字串，讀出時用 `Number()` 轉回） | 上次「答對至少一題」的時間戳（毫秒） |

- 明確定位為**純視覺提示**，不影響 §A.6 的熟練度資料本身——「太久沒來花會顯得枯萎」只是依這個時間戳計算的顯示效果，不會讓 `stage` 倒退。
- 納入 `BACKUP_KEYS`：✅

### A.8 `peppa_garden_junk_cleaned_v1` — 花園殘留資料清理旗標（讀寫：`migrateGardenJunkCleanup()`，script.js）

| 欄位 | 型別 | 說明 |
|---|---|---|
| （整體） | `string`（固定值 `"1"`） | 存在即代表「已執行過一次性殘留清理」，用來擋住重複執行 |

- 一次性遷移旗標，非使用者可見資料。
- 納入 `BACKUP_KEYS`：❌

### A.9 `dynamic_phrases_db` — 媽媽區靜默掃描累積的動詞變位實戰例句（讀寫：`triggerAutoWrite()` / `renderDynamicConjugationExamples()`，script.js）

| 欄位 | 型別 | 說明 |
|---|---|---|
| （整體） | `{[verbForm: string]: Array<string \| {...}>}` | key 是變位後的動詞形式（如 `"tengo"`），value 是該動詞形式累積到的搭配清單 |
| `assoc` | `string` | 跟這個動詞形式搭配出現的詞（如 `tengo` 後面接的 `hambre`） |
| `zh` | `string` | 中文翻譯，可能為空字串（尚未回填） |
| `es` | `string` | 完整原句（優先用真實原句，否則退回 `verbForm + assoc` 拼接） |
| `source` | `string` | 來源標記，目前只有 `"mom"`（媽媽區靜默掃描寫入）這個值在使用 |

- **相容舊格式**：陣列元素可能是純字串（更早期格式，代表 `assoc` 本身），也可能是上述物件——所有讀取端都要判斷 `typeof entry === 'string'` 再決定怎麼解讀，這是刻意保留的相容邏輯，不是待修 bug。
- 納入 `BACKUP_KEYS`：✅

### A.10 `peppa_mom_diary_v1` — 💙 Vivencias de mamá 日記（讀寫：`getDiaryDB()` / `saveDiaryDB()`，diary.js）

| 欄位 | 型別 | 說明 |
|---|---|---|
| （整體） | `Array<{...}>` | 陣列，新篇用 `unshift` 加在最前面（清單新到舊） |
| `id` | `string` | 格式 `"d_" + Date.now()` |
| `dateIso` | `string` | `YYYY-MM-DD`，使用者可回溯編輯成任意過去日期 |
| `dateEs` | `string` | `dateIso` 的西語長格式（如 `"Lunes, 6 de julio de 2026"`），存檔時預先算好，不是每次渲染重算 |
| `kidNotes` | `{[kidId: string]: string}` | key 對照 `DIARY_KIDS[].id`（`Luna`/`Kai`/`Yigu`/`Ylin`），value 是當天對這個孩子的碎語 |
| `moods` | `string[]` | 有序的心情 id 清單（對照 `DIARY_MOODS[].items[].id`），順序代表使用者依序點選的心情流轉軌跡 |
| `weather` | `string \| null` | 對照 `DIARY_WEATHER[].id`（如 `"soleado"`），單選 |
| `personalNote` | `string` | 💙 Secretos de mamá 欄位內容（三行覺察小筆記） |
| `bodyText` | `string` | 主要手札正文（含自動草稿或使用者自由書寫） |
| `createdAt` | `number` | 新增時的 `Date.now()` |
| `updatedAt` | `number?` | 僅編輯過的篇目才有，`Date.now()`，編輯時覆蓋原欄位並補上此欄位 |

- 納入 `BACKUP_KEYS`：✅

### A.11 `peppa_talk_diary_v1` — 💬 聊療吾心語（讀寫：`getTalkDB()` / `saveTalkDB()`，diary.js）

| 欄位 | 型別 | 說明 |
|---|---|---|
| （整體） | `Array<{...}>` | 陣列，`unshift` 新增。同一份資料同時承載「正式篇目」與「幫小苗長大的成長回應」兩種 entry，用 `parentId` 是否存在區分 |
| `id` | `string` | 正式篇目格式 `"talk_" + Date.now()`；成長回應同格式但另有 `parentId` |
| `sentences` | `Array<{es:string, zh:string}>?` | 僅正式篇目有：使用者從固定片語庫選中的句子清單（保留順序） |
| `voice` | `string` | 正式篇目：📝媽媽原音欄位內容；成長回應：`talkSaveGrowth()` 寫入的補充文字（回應中同一欄位名稱，語意依 entry 類型而不同） |
| `parentId` | `string?` | 僅成長回應 entry 有：指回原篇目的 `id`，渲染時巢狀掛在原篇目卡片底下，不另開清單 |
| `createdAt` | `number` | `Date.now()` |

- `talkDeleteEntry(id)` 刪除時會**連帶刪除**所有 `parentId === id` 的成長回應（父子一起清）。
- 納入 `BACKUP_KEYS`：✅

### A.12 `peppa_talk_grow_intro_seen_v1` — 聊療吾心語「幫小苗長大」介紹語已讀旗標（讀寫：`_talkGrowIntroHtml()`，diary.js）

| 欄位 | 型別 | 說明 |
|---|---|---|
| （整體） | `string`（固定值 `"1"`） | 存在即代表這個一次性介紹提示已顯示過，之後不再顯示 |

- 納入 `BACKUP_KEYS`：❌

### A.13 `peppa_mom_notes_v1` — 🌱 靈感孵化與開發者手札（讀寫：`getNotesDB()` / `saveNotesDB()`，diary.js）

| 欄位 | 型別 | 說明 |
|---|---|---|
| （整體） | `Array<{...}>` | 陣列，`unshift` 新增 |
| `id` | `string` | 格式 `"n_" + Date.now()` |
| `text` | `string` | 手札正文（已 trim，不可為空） |
| `tag` | `string \| null` | 對照 `NOTES_TAGS[].id`（如 `'feature'`／`'learn'`／`'dev'`），單選，可不選 |
| `createdAt` | `number` | `Date.now()` |
| `updatedAt` | `number?` | 僅編輯過的才有 |

- 納入 `BACKUP_KEYS`：✅

### A.14 `peppa_milestones_v1` — 🏅 累積語塊里程碑已顯示清單（讀寫：`_msGetSeen()` / `_msSave()`，script.js）

| 欄位 | 型別 | 說明 |
|---|---|---|
| （整體） | `number[]` | 已經跳出過慶祝彈窗的里程碑門檻數字清單（對照 `CHUNK_MILESTONES[].n`，如 `[4,15]`），用來擋住同一個里程碑重複彈出 |

- 納入 `BACKUP_KEYS`：✅

### A.15 `peppa_first_chunk_date_v1` — 第一次接觸語塊的日期（讀寫：`getFirstChunkDate()` / `_markFirstChunkDateIfNeeded()`，script.js）

| 欄位 | 型別 | 說明 |
|---|---|---|
| （整體） | `string`（`_dtaskTodayISO()` 格式 `YYYY-MM-DD`）| 只在**第一次**沒有這個值時寫入一次，之後永遠不變，用來計算「已耕耘第幾天」 |

- 納入 `BACKUP_KEYS`：✅

### A.16 `peppa_daily_task_v1` — 🌱 今日耕耘任務狀態（讀寫：`getDailyTaskState()` / `saveDailyTaskState()`，script.js）

| 欄位 | 型別 | 說明 |
|---|---|---|
| `date` | `string` | `YYYY-MM-DD`；讀取時若 `date` 不是今天，整包狀態視為過期並重置為當日初始值（`{date:今天, tier:null, energy:null, doneIdx:[]}`） |
| `tier` | `10 \| 20 \| 30 \| null` | 使用者選擇的時間量級（分鐘），對照 `DAILY_TASK_RECIPES` 的頂層 key |
| `energy` | `'low' \| 'normal' \| 'high' \| null` | 使用者選擇的能量狀態，對照 `DTASK_ENERGY_OPTIONS[].key`，同時是 `DAILY_TASK_RECIPES[tier]` 的第二層 key |
| `doneIdx` | `number[]` | 今天已完成的任務項目 index 清單（對照當前 `tier`+`energy` 命中的 `DAILY_TASK_RECIPES` 陣列索引） |

- 換 `tier` 或換 `energy` 都會把 `doneIdx` 重置為 `[]`（換一組任務清單，進度歸零重算）。
- 納入 `BACKUP_KEYS`：✅

### A.17 `peppa_reminder_enabled`（存於變數 `REMINDER_LS_KEY`）— 每日提醒通知開關（讀寫：`toggleReminders()`，script.js）

| 欄位 | 型別 | 說明 |
|---|---|---|
| （整體） | `'0' \| '1'`（字串） | 是否已開啟瀏覽器通知提醒（仍需搭配 `Notification.permission==='granted'` 才算真的生效） |

- 納入 `BACKUP_KEYS`：❌（裝置/瀏覽器層級的通知授權狀態，換裝置本來就要重新授權，不適合隨備份帶走）

### A.18 `peppa_reminder_last_study` — 學習提醒今日已發送日期戳（讀寫：`checkReminders()`，script.js）

| 欄位 | 型別 | 說明 |
|---|---|---|
| （整體） | `string`（`YYYY-MM-DD`） | 08:30–10:00 時段內，今天是否已經跳過學習提醒通知，避免同一天重複跳 |

- 納入 `BACKUP_KEYS`：❌

### A.19 `peppa_reminder_last_diary` — 日記提醒今日已發送日期戳（讀寫：`checkReminders()`，script.js）

| 欄位 | 型別 | 說明 |
|---|---|---|
| （整體） | `string`（`YYYY-MM-DD`，依 23:00–01:00 跨午夜邏輯計算的「循環日期」） | 23:00–01:00 時段內，今晚是否已經跳過日記提醒通知 |

- 納入 `BACKUP_KEYS`：❌

### A.20 `peppa_brief_day_v1` — 🌅 農間小報（歡迎導覽/晉級彈窗）今日已顯示日戳（讀寫：`showMorningBrief()` 相關邏輯，script.js）

| 欄位 | 型別 | 說明 |
|---|---|---|
| （整體） | `string`（`Math.floor(Date.now()/86400000)` 轉成的字串，即「自 epoch 以來第幾天」） | 今天是否已經顯示過農間小報彈窗，避免同一天重複彈出 |

- 納入 `BACKUP_KEYS`：❌

### A.21 `peppa_welcome_tour_seen_v1` — 莊園導覽是否已看過（讀寫：`showWelcomeTour()`，script.js）

| 欄位 | 型別 | 說明 |
|---|---|---|
| （整體） | `string`（固定值 `"1"`，用 `!!` 轉布林讀取） | 存在即代表首次歡迎導覽已看過，之後進站不再自動彈出（仍可透過「🗺️莊園導覽」按鈕手動重播，重播不受這個旗標影響） |

- 納入 `BACKUP_KEYS`：❌

### A.22 `peppa_active_tab` — 目前所在主分頁（讀寫：`switchMainTab()` / `restoreActiveTab()`，script.js）

| 欄位 | 型別 | 說明 |
|---|---|---|
| （整體） | `'play' \| 'know' \| 'mom' \| 'private'` | 對應🌾田間播語塊／☀️日光育苗場／🛌床邊低語呢／🗃️穀倉大豐收四個分頁，重整頁面後回到上次瀏覽的分頁 |

- 納入 `BACKUP_KEYS`：❌（純 UI 導覽狀態）

### A.23 `peppa_storage_warn_last`（存於變數 `STORAGE_WARN_LS_KEY`）— 空間預警節流時間戳（讀寫：`checkStorageQuota()`，script.js）

| 欄位 | 型別 | 說明 |
|---|---|---|
| （整體） | `string`（`Date.now()` 字串） | 上次跳出「localStorage 空間快滿了」提醒的時間，用來限制 24 小時內只提醒一次 |

- 觸發門檻：`STORAGE_WARN_BYTES = 4*1024*1024`（估算佔用位元組數，抓瀏覽器 5MB 上限的 80% 當警戒線）。
- 納入 `BACKUP_KEYS`：❌

### A.24 一次性 UI 旗標補充：`peppa_talk_grow_intro_seen_v1`

已列於 §A.12，此處僅提醒：本文件已發現的「僅供一次性提示用途、值恆為 `"1"`」型 key 共 3 個——`peppa_garden_junk_cleaned_v1`、`peppa_talk_grow_intro_seen_v1`、`peppa_welcome_tour_seen_v1`，皆刻意不納入 `BACKUP_KEYS`（清空重來的代價很低：只是使用者會再看到一次已看過的提示，不影響任何學習資料）。

### A.25 已淘汰（載入時清除，不再寫入）

| Key | 狀態 |
|---|---|
| `peppa_es_v1` | `loadFromLS()` 執行時用 `removeItem` 清除，不再寫入 |
| `peppa_es_v2` | 同上 |
| `peppa_es_v3` | 同上 |

### A.26 `BACKUP_KEYS` 對照總表（一次看完哪些 key 會被 📤打包行囊／📥行囊歸位 收錄）

```
BACKUP_KEYS = [
  'peppa_es_v4', 'peppa_es_vocab_v1', 'peppa_es_grammar_v1', 'peppa_es_familiarity_v1',
  'peppa_garden_v1', 'peppa_garden_watered_v1', 'dynamic_phrases_db',
  'peppa_mom_diary_v1', 'peppa_mom_notes_v1', 'peppa_talk_diary_v1',
  'peppa_milestones_v1', 'peppa_first_chunk_date_v1', 'peppa_daily_task_v1',
  'peppa_chunk_fam_seen_v1'
]
```

共 14 個 key 納入備份；本文件盤點到的 24 個現行 key 中，其餘 10 個（`peppa_active_tab`／`peppa_garden_junk_cleaned_v1`／`peppa_reminder_enabled`／`peppa_reminder_last_study`／`peppa_reminder_last_diary`／`peppa_brief_day_v1`／`peppa_welcome_tour_seen_v1`／`peppa_talk_grow_intro_seen_v1`／`peppa_storage_warn_last`）性質上都屬於「裝置端 UI 狀態／一次性旗標／節流時間戳」，不影響學習內容或紀錄本身。**這是現況描述，不是待修問題**——是否要擴大備份範圍屬於資料管理決策（STORAGE_VERSIONING 那條軌的範疇），本文件不做建議、不修改 `BACKUP_KEYS`。

---

## Part B — 內容資料物件欄位字典

以下物件皆為程式碼內宣告的常數（`const`），不是 localStorage，使用者互動不會改變這些物件本身；使用者的
互動結果（收藏、完成、熟練度）另外存進 Part A 的 localStorage key 中，用「文字」或「id」跟這些常數對照。

### B.1 `EPS`（episodes.js）— 全站劇情句庫，20 集 × 10 句 = 200 句

```
EPS: Array<{
  title: string,        // 西語集名，如 "El Rincón de Nita"
  titleZh: string,      // 中文集名
  dur: number,          // 預估時長（秒），UI 顯示用
  sentences: Array<{
    es: string,          // 西語原句
    zh: string,          // 中文翻譯
    en: string,          // 英文翻譯
    chunks: Array<{
      w: string,          // 語塊文字
      role?: 's'|'v'|'o'|'c',  // s=主詞(虛線框) v=動詞(實色底) o=受詞/補語(實線框，也用於整句包框) c=連接詞 未填=純文字/無角色
      hideYg?: boolean     // true時不顯示YouGlish查詢入口
    }>,
    noteZh?: string,     // 中文文法小提示（revealAnswer()顯示，缺此欄位會顯示字面"undefined"，見CLAUDE.md規則26教訓）
    noteEn?: string,     // 英文版同上
    expand?: {            // 造句區換詞心智圖，非必填
      note: string,               // 句型說明
      template: Array<{t?:string, g?:string}>,  // t=固定文字片段 g=可替換插槽的key（對照groups[].key）
      groups: Array<{
        label: string,             // 插槽中文標籤
        key: string,               // 對照template裡的g值
        options: Array<{es:string, zh:string}>  // 可選的替換詞清單
      }>
    }
  }>
}>
```

- 200 句總索引（`globalIdx`）採**固定跨距**：`globalIdx = ep(episode index, 0-based) * 10 + idx(句子 index, 0-9)`。這代表**每集必須剛好 10 句**——多一句都會跟下一集的 globalIdx 撞在一起，全站多處（`SENTENCE_GRAMMAR_MAP`／`SENTENCE_AMMO_MAP2`／`AUDIO_MANIFEST`／`CHUNK_ECOLOGY`／`EPISODE_LIFECYCLE`／`EPISODE_COMPLETION_MARKERS`）都依賴這個固定跨距對照，是全站資料完整性的關鍵約束。
- 新增集數只能附加在 `EPS` 陣列**最後**，插入中間會打壞既有 globalIdx 對照（CLAUDE.md「新增劇情集數標準流程」已明文規範）。

### B.2 `AMMO_DATA`（ammo.js）— 語塊彈藥庫，104 張卡

```
AMMO_DATA: Array<{
  ammo_id: string,          // 卡片唯一id，格式 "e{episode}_{序號}"，如 "e1_01"
  ep: string,                // 所屬集數顯示名稱，如 "E1 · El Rincón de Nita"
  core_ammo: string,         // 核心西語句（通常＝劇情原句，但E1這批已知例外，見AMMO_LIFECYCLE）
  core_zh: string,           // 核心句中文翻譯
  be_verb_type: 'ser'|'estar'|'none',  // 這句核心動詞是SER/ESTAR/皆非
  be_verb_note: string,      // 對應be_verb_type的白話說明，'none'時為空字串
  pattern: string,           // 句型骨架（含[插槽]標記），如 "Yo soy [身分/名字]."
  pattern_zh: string,        // 句型骨架中文
  pattern_note: string,      // 句型使用提醒
  slots: string[],           // pattern裡的插槽名稱清單
  fire_peppa: {
    es: string, zh: string,
    ts: number|null,         // 對應原始影片時間戳秒數，目前全部104張皆為null（見下方註記）
    chunks: Array<{ w:string, role?:'s'|'v'|'o'|'c', note?:string, hideYg?:boolean }>
  },
  fire_daily: Array<{        // 日常延伸例句，通常2句
    es: string, zh: string,
    chunks: Array<{ w:string, role?:'s'|'v'|'o'|'c' }>
  }>
}>
```

- `fire_peppa.ts` 全部 104 筆皆為 `null`——CLAUDE.md 已記錄這是設計上從未真正接上的欄位（原本為了做「跳轉影片時間戳」功能保留，該功能已確認捨棄，欄位維持存在但不生效）。
- 納入 `SENTENCE_AMMO_MAP2`（見 §C.2）的句子才會被 `unlockAmmo()` 解鎖對應卡片；沒被對照到的卡片無法透過完成句子解鎖。

### B.3 `GRAMMAR_DATA`（grammar.js）— 文法卡資料庫，117 張卡

這是全站欄位最多、可選欄位最複雜的資料物件，只有 `id`／`cat`／`level`／`title`／`rule`／`examples`／`trap`／`source` 是每張卡必有，其餘皆為選填（依卡片性質決定要不要用）。

| 欄位 | 型別 | 必填 | 說明 |
|---|---|---|---|
| `id` | `string` | ✅ | 格式 `"g" + 數字`，如 `"g01"`，全站唯一，被 `SENTENCE_GRAMMAR_MAP`／`MOM_TAG_GID_MAP`／`WORLD_ZONE_MAP` 等多處引用 |
| `cat` | `string` | ✅ | 分類 key，共 26 種現行值：`ser-estar`／`tense`／`gustar`／`verb-pattern`／`phrase`／`word-order`／`gender`／`subjunctive`／`connector`／`confusable`／`vocab`／`slang`／`proverb`／`rhetoric`／`history`／`politics`／`classical`／`literature`／`cinema`／`pragmatics`／`etiquette`／`etymology`／`falseeq`／`socioling`／`inclusive`／`reading`／`preposition`（對照 `GRAMMAR_CATS` 的顯示標籤） |
| `level` | `'a1a2'\|'b1'\|'b2c1'\|'c1'\|'c2'` | ✅ | CEFR 難度分層（對照 `GRAMMAR_LEVEL_TIERS` 的圖示/標籤，注意 `c1`/`c2` 這兩個 level 值目前實際用途已轉為「🗣️街頭母語」「🎭文化深度」分類標籤，非嚴格CEFR C1/C2難度，見 §C.7） |
| `title` | `string` | ✅ | 卡片標題（含emoji包裝） |
| `rule` | `string`（HTML片段） | ✅ | 核心規則說明，依規則15/19白話原則撰寫 |
| `examples` | `Array<{es:string, zh:string}>` | ✅ | 例句清單，長度通常2-3句 |
| `trap` | `string`（HTML片段） | ✅ | 常見陷阱/易混淆提醒 |
| `source` | `string` | ✅ | 例句真實語料來源標記（如 `"E17·S2／E18·S5"`，或 `"文法補充"` 代表新編非劇情原句） |
| `mnemonic` | `{icon, word, side, desc, items: Array<{l,label,ex}>}?` | ❌ | 助記口訣區塊（如 SER 的 DOCTOR 口訣），只有少數核心卡有 |
| `crossLang` | `string`（HTML片段）? | ❌ | 🌐語感橋樑：跨語言（英/台/客語等）概念對接說明，依規則20模板撰寫 |
| `quirk` | `string`（HTML片段）? | ❌ | 打破直覺的特例說明（目前僅 SER/ESTAR 少數卡使用） |
| `note` | `string`? | ❌ | 💡補充理解區塊（藍色系，跟 trap 的紅色/quirk 的紫色區隔），純字串 |
| `family` | `{title, intro, items: Array<{es,zh}>}?` | ❌ | 同一句型的語意延伸分支（不是同義句堆疊，每句溝通目的不同） |
| `extraFamily` | `{title, intro, items: Array<{es,zh}>}?` | ❌ | 高頻固定搭配清單（各自獨立、不能類推的詞組，跟 `family` 不同層次，見規則21 HACER拆骨判準） |
| `storyRoles` | `Array<{es, semanticRole, communicationGoal, scene}>?` | ❌ | 每句例句的語用角色標記（語意角色/溝通目的/情境），僅少數卡有 |
| `emph` | `boolean?` | ❌ | true 時 `rule` 文字加強視覺樣式（`.grammar-rule-emph`） |
| `contextDialogue` | `Array<{situation, lines:Array<{speaker,es,zh}>, note}>?` | ❌ | 情境對話示範（2026-07-19後陸續加入13張卡，見規則模板） |
| `conj` | `{verb:string, rows:Array<{person,form,ex,zh}>}?` | ❌ | 現在式五人稱變位表（yo/tú/él-ella-usted/nosotros/ellos-ellas-ustedes，拉美西語不含vosotros，見規則「五人稱變位表定案」） |
| `conj_subj` | 同 `conj` shape? | ❌ | 現在虛擬式變位表 |
| `conj_impsubj` | 同 `conj` shape? | ❌ | 過去未完成虛擬式變位表 |
| `conj_cond` | 同 `conj` shape? | ❌ | 條件式變位表 |

- `PRONOUN_LIBRARY`（人稱代名詞查詢庫，`Array<{cat, catEn, hint, rows:Array<{es,zh,en,ex?}>, example, note?}>`）與 `PRONOUN_COMBO_RULES`（進階組合規則，`Array<{title, titleSub, hint, example}>`）為同檔案內的獨立小型資料物件，供🏰莊園人物冊使用，不掛在 `GRAMMAR_DATA` 底下。
- `PRONOUN_ROLE_LEGEND`（script.js，`Array<{icon, worldName, question, term}>`，4 筆）：入口層命名對照表，對應規則30「名稱層級規則」——`worldName`(世界觀名稱)／`question`(白話定位)／`term`(正式術語)三層分開存放。

### B.4 cognates.js — 同源詞／假朋友詞庫

| 常數 | Shape | 說明 |
|---|---|---|
| `COGNATE_LIBRARY` | `Array<{en, es, art?, zh, ep, cognateInfo?}>`，38 筆 | 英西同源字主庫，`art` 為西語冠詞（可為空字串） |
| `cognateInfo` | `{relationType:'confirmed'\|'uncertain'\|'falseFriend', originRoot?, originChain?:{branches:Array<{language,path,meaningShift}>}, confidence?:'high'\|'medium'\|'low', note?, source?}` | 規則22「三方邊界表」定義的同源判定資料，非全部38筆都有此欄位（早期資料尚未補齊） |
| `FALSE_COGNATES` | `Array<{es, art, looksLike, wrongZh, realZh, trap, wrongEx:{es,zh}, rightEx:{es,zh}}>`，8 筆 | 🍄假朋友詞庫（外形像英文、意思卻不同） |
| `SUFFIX_PATTERNS` | `Array<{rule, hint, words:Array<{en,es,art,zh,gendered?,ex:{es,zh,chunks?}}>}>`，13 筆 | 🔤前後綴規律庫 |
| `GENDER_PAIRS` | `Array<{zh, options:Array<{suf,word,ex,exZh}>}>`，11 筆 | ⚧陰陽字尾配對（如 pequeño/pequeña） |
| `SENTENCE_YG_KW` | `{[globalIdxKey: string]: string}`，30 筆 | key 格式 `"e{ep}_s{idx}"`，value 是 YouGlish 精準搜尋短語 |
| `SENTENCE_COGNATES` | `{[globalIdxKey: string]: {title:string, rows:string[]}}`，30 筆 | key 同上，英西同源槓桿摺疊寶箱內容 |
| `COGNATE_PATTERN_TAGS` | `{[enWord: string]: 'suffix'\|'double'\|'sound'\|'core'\|'other'}` | key 是 `COGNATE_LIBRARY[].en`，決定卡片分類 tag |
| `COGNATE_PATTERN_LABELS` | `{[tag: string]: string}`，5 筆 | tag → 顯示標籤文字對照 |

### B.5 `CORAZON_DATA`（corazon.js）— 💬 心田深耕真心話句庫

```
CORAZON_DATA: {
  [numericIndex: string]: {   // 物件非陣列，但key實際為'0'~'5'（6個主題）
    id: string,               // 主題id，如 "sentimientos"
    title: string,            // 標題（含西語+中文）
    desc: string,             // 副標
    items: Array<{ es:string, zh:string, tag:string }>
  }
}
```

### B.6 `MOM_ATM_DATA`（mom.js）— 🛌 媽媽語塊ATM資料

```
MOM_ATM_DATA: {
  sel_phrases: { title, description, items: Array<{es,zh,tag,scene?}> },   // 🛡️情緒會說話
  mom_daily:   { title, description, items: Array<{es,zh,tag,scene?}> },   // 🎀馬麻有話講
  peppa_chunks:{ title, description, items: Array<{es,zh,tag,scene?}> }    // 👩🏻馬麻小情緒&🐱情緒這樣說
}
```

- `MOM_TAG_GID_MAP`：`{[verbForm: string]: gId}`，把常見動詞形式（如 `"puedo"`）對照到 `GRAMMAR_DATA` 卡片id，供靜默掃描媽媽區文字時判斷該寫進哪張文法卡。
- `MOM_AUDIO_KEY_MAP`：媽媽區文字 → 音檔 key 對照（結構同其餘 audio map，詳見 §E）。

### B.7 `NEWS_ITEMS` / `DW_HISTORY`（news.js）— 🌎拉美巡禮：世界新聞

```
NEWS_ITEMS: Array<{
  id: string,          // 如 "nw01"
  source: string,      // 目前固定 "DW Español"
  sourceUrl: string,   // 真實文章URL（已依CLAUDE.md「三項規則查證法」逐篇查證）
  headline: string,    // 挖空版標題，挖空處用 [?] 標記
  task: {
    type: 'blank',      // 目前僅此一種題型
    answer: string,     // 正確填空詞
    zh: string,          // 答案中文翻譯
    hint: string         // 提示（西語釋義）
  },
  cefr: string,         // 目前全部53筆皆為 "B2"
  topic: string          // 主題分類（含emoji），如 "economía 💰"，共12種現行值
}>，53筆
```

- `DW_HISTORY`：`{title:string, body:Array<{label,es,zh}>}`，介紹DW這個新聞來源本身的背景小卡，非新聞本體資料。

### B.8 stages.js — 練習關卡固定詞庫

| 常數 | Shape | 用途 |
|---|---|---|
| `TU_YO_PAIRS` | `Array<{yo,tu,zh}>`，7筆 | Stage2 tú/yo人稱互換練習句對 |
| `S3_SUBJECTS` | `Array<{es,zh}>`，2筆（Yo/Tú） | Stage3固定主詞選項 |
| `S3_VERBS` | `Array<{id,verb_yo,verb_tu,zh,lock_s,no_subj_prefix,obj_type}>`，7筆 | Stage3固定動詞選項；`lock_s`限定只能配哪個主詞(`null`=不限)；`no_subj_prefix`=輸出時是否省略主詞前綴；`obj_type`='noun'\|'inf'決定要配哪種`S3_OBJECTS` |
| `S3_OBJECTS` | `Array<{es_m,es_f,zh,has_gender,type}>`，8筆 | Stage3固定補語選項；`has_gender`=是否依陽/陰性切換字尾；`type`='noun'\|'inf' |

- ⚠️ Stage3 是「固定操練器」設計（S3_SUBJECTS只有2個主詞、S3_VERBS/S3_OBJECTS皆為固定清單），不是自由組合造句系統——CLAUDE.md已記錄過「學過的語塊不能直接塞進這三個固定清單」的技術限制，之後任何改動這三個常數前要先確認不會打壞下游變位/性別/音檔判斷邏輯。

### B.9 `LYRICS_FILL_DATA`（script.js）— 🎵 聽歌填空資料，25筆

```
Array<{
  id: string,           // 如 "lf01"
  artist: string, song: string,
  level: string, levelLabel: string,   // 如 'b1' / 'B1'
  yt: string, ytLabel: string,          // YouTube連結與顯示文字（已查證，見CLAUDE.md版權查證記錄）
  before: string, blank: string, after: string,  // 歌詞挖空前/挖空詞/挖空後
  hint: string,          // 填空提示
  sprout: string,        // 補充語感說明
  grammar: string        // 文法點完整說明
}>
```

### B.10 `CHUNK_FAMILIES` / `CHUNK_MILESTONES`（script.js）

```
CHUNK_FAMILIES: Array<{
  key: string, icon: string, title: string, grammarId: string, formHint: string,
  branches: Array<{ match:string, es:string, zh:string }>
}>，2筆（tener家族／hacer家族）

CHUNK_MILESTONES: Array<{
  n: number,        // 達成門檻（累積解鎖語塊數）
  cefr: string, badge: string, name: string, msg: string,
  song?: { artist, title, chunk, t:number, yt }   // 對應歌曲彩蛋，t=秒數
}>，5筆（4/15/45/90/180）
```

- `CHUNK_FAMILIES[].branches[].match` 是拿來模糊比對使用者已收集語塊（`peppa_es_vocab_v1`／`peppa_garden_v1`）文字內容用的關鍵字，不是精確 key。

---

## Part C — 對照表／生命週期標記表欄位字典

這類物件的共同性質：**純標記，不改動它們所對照的原始資料欄位**（CLAUDE.md 多處強調「純資料標記，沒有動 xxx 既有欄位」），是「誰跟誰有關聯／這筆資料現在是什麼狀態」的索引層。

### C.1 `SENTENCE_GRAMMAR_MAP`（grammar.js）

```
{ [globalIdx: number]: gId:string | null }
```
- key 是 episodes.js 的 200 句全域索引（0-199），value 是對照到的 `GRAMMAR_DATA[].id`，`null` 代表這句暫無對應文法卡（要附註原因，非留白不管）。

### C.2 `SENTENCE_AMMO_MAP2`（script.js）

```
{ [globalIdx: number]: ammo_id[] }
```
- key 同上，value 是這句完成後應解鎖的 `AMMO_DATA[].ammo_id` 清單（可能對照多張卡，也可能完全沒有對照——沒被列在這裡的句子不會觸發任何彈藥卡解鎖）。

### C.3 `GRAMMAR_LIFECYCLE`（grammar.js）

```
{
  active: gId[],       // 21張，現役能力
  crossStory: gId[],   // 95張，跨劇情概念能力（不需要單一劇情句支撐是設計常態，非孤兒）
  historical: gId[],   // 1張(g14)，歷史能力：對應劇情已被替換移除
  incubating: gId[]    // 0張，保留給未來新卡尚未接上任何入口時使用
}
```

### C.4 `AMMO_LIFECYCLE`（ammo.js）

```
{ historical: ammo_id[] }   // 目前10筆：e1_01~e1_10，舊版「泥巴坑」劇情殘留，待內容重新編排
```

### C.5 `EPISODE_LIFECYCLE`（episodes.js）

```
{
  abilityBuilding: number[],    // episode index清單，能力培養劇情
  chunkInput: number[],          // 語塊輸入劇情
  cultureImmersion: number[],    // 文化沉浸劇情
  emotionalNarrative: number[]   // 情緒敘事劇情
}
```
- 分類依據是「這集實際在做什麼」，不是「有沒有掛文法卡」——`emotionalNarrative`類集數本來就設計成零文法卡連結，不算資料缺陷。

### C.6 `EPISODE_COMPLETION_MARKERS`（episodes.js）

```
{
  storyFinale: number[],    // 故事線真正終章episode index，目前刻意留空[]（見規則31，過去曾用ep===EPS.length-1隱性判斷，已改宣告式）
  routeComplete: number[]   // 新手引導路線完成點，目前[19]（E20）
}
```

### C.7 `CHUNK_ECOLOGY`（episodes.js，範圍：globalIdx 100-159，即E11-E16共60句）

```
{
  reusableChunk: number[],       // 15句，適合反覆使用的生活語塊（彈藥庫候選）
  episodeOnly: number[],         // 20句，一次性劇情句
  emotionalNarrative: number[],  // 22句，情緒敘事句
  culturalInfo: number[]         // 3句，文化資訊句
}
```

### C.8 `WORLD_ZONE_MAP` / `WORLD_SUBCAT`（grammar.js）

```
WORLD_ZONE_MAP: { slang: gId[], culture: gId[] }   // 分流去🌎拉美巡禮的文法卡清單（26張街頭母語／32張文化深度）
WORLD_SUBCAT: {
  slang:   Array<{key, label, gIds:gId[]}>,   // 4類次分類（固定搭配/口頭禪/網路用語/俚語）
  culture: Array<{key, label, gIds:gId[]}>    // 4類次分類（歷史與社會/生活與節慶/人物與議題/文學影視）
}
```
- 純加法分類，不改動 `GRAMMAR_DATA` 對應卡片的任何既有欄位——同一張卡的內容從 💧文法儲水槽 或 🌎拉美巡禮 兩個入口點進去都是同一個 `openGrammarCard()` 渲染。

### C.9 `GRAMMAR_LEVEL_TIERS` / `GRAMMAR_CATS`（grammar.js）

```
GRAMMAR_LEVEL_TIERS: Array<{key, icon, label}>   // 5筆：a1a2🌱护土嫩芽／b1💧甘露超頻／b2c1🍯蜂王蜜釀／c1🗣️街頭母語／c2🎭文化深度
GRAMMAR_CATS: Array<{key, label}>                 // cat值 → 中文顯示標籤對照（含 key:'all' 代表全部）
```

---

## Part D — 產品邏輯設定資料物件

### D.1 `NEWCOMER_ROADMAP`（script.js）

```
{
  title: string, subtitle: string,
  chapters: Array<{
    title: string, description: string,
    scenes: Array<{
      icon: string, label: string,
      chunks: Array<{es,zh}>,       // 該場景預覽句子，通常1-2句
      jumpLabel: string,
      jump: { type:'episode', ep:number }
    }>
  }>
}
```
- 目前僅1個chapter（第一站：我的西語小世界，對應E17-E20）。之後新增章節只需在 `chapters` 陣列加一個物件，不用改渲染邏輯（見CLAUDE.md首頁banner改版記錄）。

### D.2 `ENTRY_MATRIX_ITEMS`（script.js）

```
Array<{ icon, label, sub, target, disabled?:boolean }>，6筆
```
- `target` 值供 `entryMatrixJump(target)` / `dtaskJump(target)` 判斷跳轉去向：`'daily'|'grammar'|'lyrics'|'news'|'mom'|'surprise'` 等。

### D.3 `DAILY_TASK_RECIPES` / `DTASK_ENERGY_OPTIONS`（script.js）

```
DAILY_TASK_RECIPES: {
  10: { low: Array<{icon,label,target}>, normal: [...], high: [...] },
  20: { low:[...], normal:[...], high:[...] },
  30: { low:[...], normal:[...], high:[...] }
}
DTASK_ENERGY_OPTIONS: Array<{key,icon,label}>，3筆（low/normal/high）
```
- 三層 key：時間量級(10/20/30分鐘) → 能量狀態(low/normal/high) → 任務項目陣列，對照 §A.16 `peppa_daily_task_v1` 的 `tier`/`energy`/`doneIdx`。

### D.4 `WELCOME_TOUR_STEPS`（script.js）

```
Array<{ icon, title, desc, levelButtons?:boolean }>
```
- `levelButtons:true` 的步驟會額外渲染 `LEVEL_NAV_ITEMS`（`Array<{icon,label,sub,action?:'start', level?:string}>`）當快速入口按鈕。

### D.5 `WORKSHOP_TOOLS`（script.js）— 🧰莊園工具間

```
{
  title: string, subtitle: string,
  categories: Array<{
    icon: string, label: string,
    tools: Array<{ label:string, url:string }>
  }>
}
```
- 3個分類（聽音工具／查詢工具／創作工具），純外部連結清單，無使用者資料。

---

## Part E — 音檔對照表家族（audio-manifest.js）

全部是「文字/索引 → mp3路徑」的查找表，找不到對應路徑時一律 fallback 回瀏覽器 TTS（`speakFull()`），不會造成錯誤。逐一路徑內容不在本文件重複列出，只記錄**結構**：

| 常數 | Key Shape | Value Shape | 用途 |
|---|---|---|---|
| `AUDIO_MANIFEST` | `{[epIndex:number]: Array<string[]>}` | 每句對應一個 mp3 路徑陣列（依序播放） | 劇情句真人音檔（對照 `EPS`） |
| `MOM_AUDIO_MAP` | `{[momCategoryKey:string]: string[]}` | mp3路徑陣列 | 媽媽區語塊音檔 |
| `CORAZON_AUDIO_MAP` | `{[corazonTopicId:string]: string[]}` | mp3路徑陣列 | 心田深耕音檔 |
| `GP_AUDIO_MAP` | `Array<string[]>`（索引式） | mp3路徑陣列 | （造句區相關音檔，索引對照句子globalIdx） |
| `AMMO_DAILY_AUDIO_MAP` | `{[ammo_id:string]: string[]}` | mp3路徑陣列 | 彈藥庫 `fire_daily` 例句音檔 |
| `CHUNK_AUDIO_MAP` | `{[chunkText:string]: string}` | 單一mp3路徑 | 劇情逐字語塊點擊音檔（找不到時41%比例會fallback TTS，見CLAUDE.md已記錄的音檔缺口盤點） |
| `GRAM_AUDIO_MAP` | `{[sentenceText:string]: string}` | 單一mp3路徑 | 文法卡例句音檔（用句子全文當key） |
| `STAGE2_AUDIO_MAP` | `Array<{yo:string, tu:string}>` | — | Stage2對照句音檔 |
| `DIARY_MOOD_AUDIO_MAP` | `{[moodId:string]: string}` | 單一mp3路徑 | 日記心情詞音檔 |
| `DIARY_WEATHER_AUDIO_MAP` | `{[weatherId:string]: string}` | 單一mp3路徑 | 日記天氣詞音檔 |

---

## 附錄 — 本次未逐一收錄欄位定義的範圍（純展示邏輯，非資料物件）

以下常數是 UI 顯示/樣式用的查找表或訊息池，本質是「畫面怎麼呈現」而非「內容資料」，故不逐一列欄位：

- 圖示/樣式對照：`GARDEN_STAGES`、`_G_LABELS`、`FAM_STARS`、`FAM_LABELS`、`FAM_CLASSES`、`PERSON_ICONS`、`PERSON_ICONS_5`、`STAR_STATES`、`NUM_WORDS`、`NUM_EMOJI`、`ORD_WORDS`
- 靜態訊息池：`CHEERS`、`CELEBRATION_NEN_YA`、`CELEBRATION_CHAO_PIN`、`DTASK_CELEBRATE_MSGS`、`DTASK_ENERGY_PROMPT_ES`、`REMINDER_STUDY_MSGS`、`REMINDER_DIARY_MSGS`
- 純函式輔助用小型比對表：`CONJ_FORM_MAP`（執行期由 `GRAMMAR_DATA` 動態建出，非獨立資料源）、`SER_ESTAR_CONFUSIONS`、`SER_TO_ESTAR_FORM`、`TALK_GROWTH_MARKERS`、`CONN_FLOW`、`CONN_PAUSE`、`CONJ_AUDIO_PERSON`、`CONJ_AUDIO_VERB`、`CONJ_TENSE_LABELS`
- `CHANGELOG_DATA`：版本更新日誌顯示內容，性質上接近文件而非資料模型，未收錄。
- `feedbackTemplates`、`EP_COGNATES`、`CAT_GROUPS`：範圍較小或僅內部輔助用途，未逐一展開。

若後續需要，這批可再另立一份「UI 常數字典」處理，但依本輪任務範圍（localStorage 與資料物件的欄位定義），刻意排除在外。

---

## 變更記錄

| 日期 | 內容 |
|---|---|
| 2026-08-01 | 首版建立。因四份前置文件（LOCALSTORAGE_SCHEMA/DATA_DOMAIN_MAP/STATE_RESPONSIBILITY_MAP/STORAGE_VERSIONING）在repo中不存在，改為直接從原始碼（對照commit 88eab79）萃取欄位定義寫成本文件。 |
