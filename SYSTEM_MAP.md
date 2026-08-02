# 🗺️ SYSTEM_MAP.md（現況地圖：功能 × 檔案責任 × MVP邊界）

## 用途與定位

Track 1三份文件（PRODUCT_PRINCIPLES／PRD／MVP_BOUNDARY）封箱後的下一步，VERA定調為
**Feature Inventory / Responsibility Review**，不是新功能開發。目的：

> 避免以後又要「靠搜尋才發現隱藏狀態」——這輪Product Track裡已經發生過至少兩次
> （🎙️跟讀回音比對已上線但CLAUDE.md記錄過時／`clearLS()`遺漏清除key的落差），
> 這份文件就是為了把「現在到底是什麼狀態」一次盤點清楚、留下可查的紀錄。

**這是持續性參考文件，不是一次性報告**——之後新增/修改功能時，理論上該連帶更新這裡對應
的行，但這輪不強制建立更新流程，只先把現況地圖畫出來。

**跟PRD.md Appendix A的差異**：Appendix A只回答「這是Core/Supporting/Future」；這份文件
多兩欄——**實際檔案責任**（哪個檔案/函式在做這件事，包含對應的localStorage key）與
**是否符合MVP_BOUNDARY**（拿MVP_BOUNDARY.md已定案的取捨，逐項核對現況有沒有牴觸）。

**方法**：延續這輪一直在用的做法——直接查`index.html`/`script.js`/各資料檔的實際程式碼，
不是憑CLAUDE.md文字描述推測。

---

## Header 常駐入口

| 功能 | 標籤 | 檔案/函式責任 | localStorage key | 符合MVP_BOUNDARY？ | 備註 |
|---|---|---|---|---|---|
| 🌿園區印記／🌱點播初芽 | Core | `script.js: renderHeaderStartSlot()`／`getFirstChunkDate()` | `peppa_first_chunk_date_v1` | ✅ 符合（資料持久化精神） | 見FEATURE_AUDIT④⑥：`clearLS()`遺漏清除此key、且此key身兼「新手判斷」與「天數計算」雙重語意 |
| 🎁入園巧遇 | Core | `script.js: entryMatrixJump()`／`ENTRY_MATRIX_ITEMS` | `peppa_daily_task_v1`（透過今日耕耘任務） | ✅ 符合 | |
| 🧭探索路線 | Supporting | `script.js: openLevelNavDirect()` | 無獨立key | ✅ 符合（既有配套，不重新評估） | |
| 🗺️莊園導覽 | Supporting | `script.js: showWorldTour()`／`WELCOME_TOUR_STEPS` | `peppa_welcome_tour_seen_v1` | ✅ 符合 | 此key不在`BACKUP_KEYS`裡（純UI一次性旗標，不進backup合理） |
| 🧰莊園工具 | Supporting | `script.js: openWorkshopPanel()`／`WORKSHOP_TOOLS` | 無（純外部連結） | ✅ 符合 | |
| 🌎拉美巡禮 | Future | `script.js: openWorldEntryPanel()`／`renderNewsSection()`等 | 無獨立key | ✅ 符合（MVP_BOUNDARY§3已明確列為「內容規模擴充」不做項，現況部分上線屬正常階段性進度，不算牴觸） | |

## 🌾田間播語塊（tabPlay）

| 功能 | 標籤 | 檔案/函式責任 | localStorage key | 符合MVP_BOUNDARY？ | 備註 |
|---|---|---|---|---|---|
| 劇情卡片系統 | Core | `episodes.js: EPS`／`script.js: render()`/`revealAnswer()` | `peppa_es_v4`（ep/idx/answered） | ✅ 符合 | |
| 彈藥庫 | Core | `ammo.js: AMMO_DATA`／`script.js: unlockAmmo()` | `peppa_es_v4`（ammoUnlocked/ammoStars） | ✅ 符合 | 見FEATURE_AUDIT⑤：`ammoStars`讀寫齊全但零消費端，死欄位；⑦：ammo.js另有`be_verb_type`歷史包袱（Ammo Cleanup Track範圍） |
| 花園熟練度 | Core | `script.js: getGardenDB()`/`saveGardenDB()` | `peppa_garden_v1` | ✅ 符合 | 見FEATURE_AUDIT②：容器內混4種domain前綴（sfx_/ge_/gp_/s2_p），靠字串手動分辨 |
| 造句區 | Supporting | `script.js: checkMakeFree()`/`getMakePattern()` | 存於`svoPool`（併入`peppa_es_v4`） | ✅ 符合 | |
| 🌾莊園巡禮精釀三階段 | Supporting | `stages.js: startStage1()`等 | 部分存進`peppa_garden_v1`（`s2_p`前綴） | ✅ 符合 | |
| 里程碑徽章條 | Supporting | `script.js: renderMilestoneBadgeStrip()`/`CHUNK_MILESTONES`/`_msGetSeen()` | `peppa_milestones_v1` | ⚠️ 部分符合 | `clearLS()`未清除此key（見FEATURE_AUDIT④建議清單），跟🌿園區印記同一類遺漏 |
| 🗺️新人路線圖 | Supporting | `script.js: renderStoryIndex()`/`NEWCOMER_ROADMAP` | 無獨立key | ✅ 符合 | |
| 🎙️跟讀回音比對 | Supporting | `script.js: echoStartRecording()`等（真實MediaRecorder API） | 無持久化（blob僅存於記憶體，不跨session） | ✅ 符合 | **Documentation Sync案例**：CLAUDE.md待處理清單記錄「先不動工」，實際已完整上線，見FEATURE_AUDIT/PRD第5節 |
| 英西同源槓桿 | Supporting | `cognates.js: buildCogDetails()` | 無獨立key | ✅ 符合 | |
| 📝記到手札（diaryBridge） | Supporting | 連結至`diary.js` | 見下方教養日記 | ✅ 符合 | |

## ☀️日光育苗場（tabKnow）

| 功能 | 標籤 | 檔案/函式責任 | localStorage key | 符合MVP_BOUNDARY？ | 備註 |
|---|---|---|---|---|---|
| 💧文法儲水槽 | Core | `grammar.js: GRAMMAR_DATA`／`script.js: renderGrammarSupplement()` | `peppa_es_grammar_v1`（grammarUserExamples） | ✅ 符合 | |
| 🏰莊園人物冊 | Supporting | `script.js: renderPronounLibrary()`/`PRONOUN_LIBRARY` | 無獨立key | ✅ 符合 | |
| ☯️太極變身鏡 | Supporting | `script.js: renderConjLibrary()`/`GENDER_PAIRS` | 熟練度星星併入`peppa_garden_v1`（`ge_`前綴） | ✅ 符合 | |
| 🫐遍地捻野莓（同源庫/假朋友） | Supporting | `cognates.js: SUFFIX_PATTERNS`/`FALSE_COGNATES` | 無獨立key | ✅ 符合 | |
| 🎵聽歌填空 | Supporting | `script.js: LYRICS_FILL_DATA`相關render | 答對狀態併入`peppa_garden_v1`（`sfx_`前綴推測） | ✅ 符合 | |
| 🌎拉美巡禮（tabKnow內） | Future | 同Header項 | 同上 | ✅ 符合 | 與Header是同一套渲染，不是重複功能 |

## 🛌床邊低語呢（tabMom）

| 功能 | 標籤 | 檔案/函式責任 | localStorage key | 符合MVP_BOUNDARY？ | 備註 |
|---|---|---|---|---|---|
| 💬心田深耕／聊療吾心語 | Supporting | `corazon.js: CORAZON_DATA`／`diary.js`相關函式 | `peppa_talk_diary_v1` | ✅ 符合 | |

## 🗃️穀倉大豐收（tabPrivate）

| 功能 | 標籤 | 檔案/函式責任 | localStorage key | 符合MVP_BOUNDARY？ | 備註 |
|---|---|---|---|---|---|
| 花園檢視／抓蟲複習 | Core | `script.js: renderGardenView()`/`generateBattleQuestionPool()` | `peppa_garden_v1` | ✅ 符合 | |
| 💎醞釀私語窖（詞彙收藏） | Supporting | `script.js: vocabList`相關（獨立於peppa_es_v4） | `peppa_es_vocab_v1` | ✅ 符合 | |
| 詞彙熟悉度標記 | Supporting | `script.js: getFamState()`/`chunkFamiliarity` | `peppa_es_familiarity_v1` | ✅ 符合 | ⚠️ **命名易混淆**：跟下面「🌳語塊茁壯」的`CHUNK_FAMILIES`名稱相近但是兩個完全不同的系統——這個是單字的手動3階段熟悉度標記（`getFamState`），跟語塊家族收集完全無關。之後如果有人單看變數名`chunkFamiliarity`容易誤以為跟`CHUNK_FAMILIES`是同一套，建議之後改名時留意這個潛在混淆點（本輪不改名，只記錄） |
| 📔教養日記／Vivencias de mamá | Supporting | `diary.js` | `peppa_mom_diary_v1`／`peppa_mom_notes_v1` | ✅ 符合 | |
| 🌳語塊茁壯（chunk family） | Supporting | `script.js: CHUNK_FAMILIES`／`_chunkFamSaveSeenCounts()` | `peppa_chunk_fam_seen_v1` | ⚠️ 部分符合 | `clearLS()`未清除此key（同milestone/first_chunk_date，見FEATURE_AUDIT④） |
| 🌾今日耕耘任務 | Core | `script.js: renderDailyTask()` | `peppa_daily_task_v1` | ⚠️ 部分符合 | `clearLS()`未清除此key |
| 🔔每日提醒通知 | Supporting | `script.js: initReminders()`/`_reminderShow()` | `peppa_reminder_last_diary`／`peppa_reminder_last_study` | ✅ 符合 | 兩key皆不在`BACKUP_KEYS`（純去重旗標，不進backup合理） |
| 📤備份／匯出匯入 | Core | `script.js: exportBackup()`/`importBackupFile()` | `BACKUP_KEYS`（14個） | ⚠️ **有落差** | 見FEATURE_AUDIT④：實際19個key裡有6個不在`BACKUP_KEYS`（`peppa_active_tab`/`peppa_brief_day_v1`/`peppa_garden_junk_cleaned_v1`/`peppa_reminder_last_diary`/`peppa_reminder_last_study`/`peppa_welcome_tour_seen_v1`）——多半是UI狀態旗標，不進backup可以理解，但目前沒有文件說明「哪些故意排除」 |
| 🎖️晉級證書／完成畫面 | Supporting | `script.js: showComplete()` | 無獨立key | ✅ 符合 | |

## 資料層（非使用者可見功能，但支撐上述運作）

| 項目 | 標籤 | 檔案責任 | 符合MVP_BOUNDARY？ | 備註 |
|---|---|---|---|---|
| episodes.js / grammar.js / ammo.js 資料結構 | Core | 見FEATURE_AUDIT.md「語塊內容格式評估」 | ✅ 符合 | episodes.js/grammar.js健康；ammo.js兩組歷史欄位屬Ammo Cleanup Track範圍（MVP_BOUNDARY§3已明確定案延後） |
| maintenance.js 內容檢查 | Supporting | `maintenance.js: checkDuplicateIds()`/`checkRequiredFields()` | ✅ 符合（MVP_BOUNDARY§3「內容資料清理實作」已定案延後） | 目前只覆蓋`GRAMMAR_DATA`/`NEWS_ITEMS`/`LYRICS_FILL_DATA`/`FALSE_COGNATES`四個資料源，`EPS`/`AMMO_DATA`未覆蓋（Content Quality Track①） |

---

## 本輪盤查發現的新項目（非既有FEATURE_AUDIT.md條目，記錄供未來參考）

- **命名易混淆**：`chunkFamiliarity`（單字3階段熟悉度標記，key: `peppa_es_familiarity_v1`）
  與`CHUNK_FAMILIES`（🌳語塊茁壯家族收集功能，key: `peppa_chunk_fam_seen_v1`）是兩個完全
  不同的系統，但變數/概念命名非常相近，容易讓未來的人（包含AI）誤判成同一套。本輪只記錄，
  不改名（改名涉及既有資料/程式碼多處引用，屬於實作範疇，不在盤點串裡動手）。
- **`clearLS()`遺漏範圍比原先FEATURE_AUDIT④記錄的更廣**：除了已知的`peppa_first_chunk_date_v1`
  （會影響header新手判斷），這次盤查确认`peppa_milestones_v1`／`peppa_chunk_fam_seen_v1`／
  `peppa_daily_task_v1`也都沒被`clearLS()`清除。這些連帶影響到「重新開墾」按鈕的實際完整性——
  使用者按下「重新開墾」後，里程碑徽章／語塊茁壯收集進度／今日任務狀態都不會重置。
  仍歸類在FEATURE_AUDIT④同一個問題底下，不是新的獨立issue，只是把影響範圍補完整。

---

## 下一步建議（記錄，非本文件範圍內動工）

1. `clearLS()`遺漏清除多個key（見上方新發現）符合CLAUDE.md「🔴真bug」優先級定義，
   建議排進下一次真bug批次，不用等湊批次（呼應MVP_BOUNDARY§3「內容資料清理實作」的
   重新評估條件）。
2. Documentation Sync（🎙️跟讀回音比對條目）仍待處理，見FEATURE_AUDIT.md/Task列表。
3. 這份地圖之後如果要維持「持續性參考」的價值，建議之後新增/修改功能時養成順手更新
   對應行的習慣——但這是流程建議，不是這輪要建立的強制機制。
