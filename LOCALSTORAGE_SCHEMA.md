# 🗝️ 地窖帳冊 — LocalStorage 全站盤點

> 這份文件記錄「莊園裡每個木桶裝的是什麼」——全站目前有幾個 localStorage key、各自存什麼形狀的資料、誰讀誰寫、備份/重置有沒有涵蓋到。
>
> **只有 `script.js` 跟 `diary.js` 會碰 localStorage**（已用 `grep` 掃過全部 `.js`/`.html` 確認），其餘檔案都是純資料/純渲染，不直接讀寫。

## 🚨 鐵則提醒（引用 CLAUDE.md 工作守則第 5 條）

> **LocalStorage key 是既定命名，不要改 key 名稱，會讓用戶資料消失。**

這份盤點只整理現況、修資料矛盾（例如「重置」漏清某個衍生 key），**不重新命名、不合併、不搬移任何既有 key**。

---

## 一、Key 全覽表（22 個，依用途分 8 組）

### A. 核心學習進度

| Key | 形狀 | 讀寫函式 | 備份 | 重新開墾清除 |
|---|---|---|---|---|
| `peppa_es_v4` | `{ammoUnlocked:string[], ammoStars:{}, answeredByEp:{}, svoPool:{s:[],v:[],o:[]}, ep:number, idx:number}` | `saveToLS()` / `loadFromLS()` | ✅ | ✅ |
| `peppa_es_vocab_v1` | `Array<{id, text, zh, source}>`（💎醞釀私語窖收藏） | `saveVocabToLS()` / `loadVocabFromLS()` | ✅ | ✅ |
| `peppa_es_grammar_v1` | `{[gId]: string[]}`（文法卡使用者造句） | `saveToGrammarLib()` / `loadGrammarLib()` | ✅ | ✅ |
| `dynamic_phrases_db` | `{[verbForm]: Array<{assoc,zh,es,source} \| string(舊格式)>}`（超級變變變動態片語庫） | `triggerAutoWrite()` 寫 / `renderConjLibrary()` 讀 | ✅ | ✅ |

### B. 熟練度 / 花園系統（⚠️ 見下方「發現：兩套平行的熟悉度系統」）

| Key | 形狀 | 讀寫函式 | 備份 | 重新開墾清除 |
|---|---|---|---|---|
| `peppa_es_familiarity_v1` | `{[chunkText]: 0\|1\|2}`（3階☆/◑/★，貼在每句課文的語塊底線） | `saveFamiliarity()` / `loadFamiliarity()`，切換用 `cycleFamiliarity()` | ✅ | ✅ |
| `peppa_garden_v1` | `{[chunkText]: {stage:0-4, ...}}`（5階🍀🍃🌱🌻，驅動💎收藏＋抓蟲題庫加權） | `saveGardenDB()` / `getGardenDB()` | ✅ | ✅ |
| `peppa_garden_watered_v1` | 時間戳字串（花園新鮮度，純視覺，不影響熟練度資料本身） | `markWatered()` / `getLastWatered()` | ✅ | ✅ |
| `peppa_garden_junk_cleaned_v1` | `'1'`（一次性遷移旗標，擋住舊版殘留 key 重複清理） | `migrateGardenJunkCleanup()` | 不需要（冪等） | 不需要（`garden_v1`已空，重跑也無害） |

### C. 日記／手札內容（教養日記、非「學習紀錄」）

| Key | 形狀 | 讀寫函式 | 備份 | 重新開墾清除 |
|---|---|---|---|---|
| `peppa_mom_diary_v1` | `Array<{id, dateIso, dateEs, kidNotes:{}, moods:[], weather, personalNote, bodyText, createdAt, updatedAt?}>`（💙Vivencias de mamá） | `saveDiaryDB()` / `getDiaryDB()`（diary.js） | ✅ | ❌ 刻意不清（日記≠學習紀錄） |
| `peppa_mom_notes_v1` | `Array<{id, text, tag, createdAt, updatedAt?}>`（🌱靈感孵化與開發者手札） | `saveNotesDB()` / `getNotesDB()`（diary.js） | ✅ | ❌ 刻意不清 |
| `peppa_talk_diary_v1` | `Array<{id, sentences:[{es,zh}], voice, createdAt}>`（根句）＋`Array<{id, parentId, voice, createdAt}>`（🌿幫小苗長大的成長葉，用 `parentId` 掛在根句下） | `saveTalkDB()` / `getTalkDB()`（diary.js） | ✅ | ❌ 刻意不清 |

### D. 里程碑／進度標記（衍生自 A/B 組資料，本次重點修復對象）

| Key | 形狀 | 讀寫函式 | 備份 | 重新開墾清除 |
|---|---|---|---|---|
| `peppa_milestones_v1` | `number[]`（已經彈出慶祝過的里程碑顆數，例：`[4,15]`） | `_msSave()` / `_msGetSeen()` | ✅ | ✅ **本次修復** |
| `peppa_first_chunk_date_v1` | ISO 日期字串 `'YYYY-MM-DD'`（第一次解鎖語塊的日期，header「🌱點播初芽 vs 🌿園區印記」判斷的唯一依據） | `_markFirstChunkDateIfNeeded()` / `getFirstChunkDate()` | ✅ | ✅ **本次修復** |
| `peppa_chunk_fam_seen_v1` | `{[familyId]: number}`（🌳語塊家族「下一枝」進度） | `_chunkFamSaveSeenCounts()` / `_chunkFamSeenCounts()` | ✅ | ✅ **本次修復** |

### E. 每日任務（依日期自動失效，不需要手動清）

| Key | 形狀 | 讀寫函式 | 備份 | 重新開墾清除 |
|---|---|---|---|---|
| `peppa_daily_task_v1` | `{date, tier, energy, doneIdx:[]}` | `saveDailyTaskState()` / `getDailyTaskState()` | ✅（無害） | 不需要（`date`跟今天不符就自動視為新的一天） |

### F. UI／裝置狀態（故意不進備份，不是「內容」）

| Key | 形狀 | 用途 |
|---|---|---|
| `peppa_active_tab` | `'play'\|'know'\|'mom'\|'private'` | 記住上次停留的分頁 |
| `peppa_welcome_tour_seen_v1` | `'1'` | 歡迎導覽是否看過 |
| `peppa_talk_grow_intro_seen_v1` | `'1'` | 🌿幫小苗長大 介紹文字是否看過 |

### G. 提醒系統

| Key | 形狀 | 用途 | 備份 |
|---|---|---|---|
| `peppa_reminder_enabled`（`REMINDER_LS_KEY`） | `'0'\|'1'` | 使用者是否開啟每日提醒（實際跳通知前還會另外檢查瀏覽器 `Notification.permission`，這個 key 只是意圖旗標，不會單獨造成誤導狀態） | ✅ **本次新增** |
| `peppa_reminder_last_study` | 日期字串 | 學習提醒今天是否已跳過（去重用） | ❌ 故意不收（去重狀態） |
| `peppa_reminder_last_diary` | 日期字串 | 日記提醒去重 | ❌ 故意不收 |

### H. 空間預警去重

| Key | 形狀 | 用途 | 備份 |
|---|---|---|---|
| `peppa_storage_warn_last`（`STORAGE_WARN_LS_KEY`） | 時間戳字串 | 「快滿了」提醒 24 小時只跳一次的去重戳記 | ❌ 故意不收 |

---

## 二、本次修復的 3 個資料矛盾（`clearLS()` 重新開墾按鈕）

**背景**：CLAUDE.md 已記錄「🌻 開心農場感」章節明講「`清除所有學習紀錄`（`clearLS()`）會一併清掉這個新鮮度時間戳，`重新開墾`後回到『還在等妳播下第一顆種子』的初始文案」——這是官方定義的「重新開墾＝真正的全新狀態」設計意圖。逐一比對 `clearLS()` 實際清除的 7 個 key，發現有 3 個**衍生自同一批資料、但函式本身漏清**的 key，會讓「重新開墾」後出現名實不符的狀態：

1. **`peppa_milestones_v1` 沒清** → `ammoUnlocked` 已經歸零，但「已慶祝過的里程碑顆數」還留著。使用者重新集滿同樣顆數（例如 4 顆）時，`_checkNewMilestone()` 會因為 `seen.includes(4)` 已經是 true 而不再彈出慶祝彈窗。
2. **`peppa_chunk_fam_seen_v1` 沒清** → 🌳語塊家族的「下一枝」進度停留在重置前的數字，跟已經清空的 `vocabList`/`ammoUnlocked` 對不上。
3. **`peppa_first_chunk_date_v1` 沒清** → `renderHeaderStartSlot()` 的程式碼註解明講這是「單一資料來源，不另開一個『是否為新手』的 flag」，但這個 flag 沒被清掉，導致重置後 header 仍顯示「🌿 園區印記（老手樣式，第N天）」而不是「🌱 點播初芽（新手樣式）」——跟使用者剛剛按下「再來一場大冒險」的預期完全相反。

**修法**：`clearLS()` 補上這三個 `localStorage.removeItem()`，並補呼叫 `renderHeaderStartSlot()`／`renderMilestoneBadgeStrip()`（這兩個原本只在 `unlockAmmo()`／INIT 時呼叫，`clearLS()` 之前完全沒呼叫過，導致就算資料清乾淨了，畫面上的 header 按鈕跟里程碑徽章列也要等下次重新整理才會更新）。已用 Node 模擬完整跑一次 `clearLS()`（seed 假資料→執行→檢查 7＋3 個 key 全部清除、日記類 3 個 key 維持不變、兩個 render 函式確實被呼叫）驗證通過。

**同時發現並修復的關聯 bug**：`chunk-pill.fam-2`（3 階熟悉度系統裡「★全熟」狀態）在 `style.css` 裡完全沒有對應的 CSS 規則——`fam-0`／`fam-1` 都有底線樣式，`fam-2` 缺席，代表使用者把語塊標記到「全熟」時，畫面上的底線提示會直接消失、跟完全沒標記過看起來一樣。已補上 `.chunk-pill.fam-2{font-weight:900;text-decoration:underline 1.5px solid var(--ok)}`，用既有的 `--ok`（成功綠）延續原本的視覺分級邏輯。

**同時修復的小 gap**：`BACKUP_KEYS` 沒收 `peppa_reminder_enabled`（使用者主動點開的每日提醒偏好）。查證過 `checkReminders()` 一定會先檢查瀏覽器 `Notification.permission==='granted'` 才會真的跳通知，所以就算備份還原到權限沒開的裝置上，這個 key 也不會造成任何誤導性狀態，純粹是安全地把使用者的意圖偏好一併備份走，補進 `BACKUP_KEYS` 沒有風險。

**沒有動的地方**：`peppa_garden_junk_cleaned_v1`（本來就是冪等的一次性旗標，不清也沒差）、日記三個 key（`peppa_mom_diary_v1`／`peppa_mom_notes_v1`／`peppa_talk_diary_v1`，CLAUDE.md 已明確定義「重新開墾」清的是「學習紀錄」不是「日記」，`clearLS()` 的 toast 文字也寫著「已清除**所有學習紀錄**」而非「所有資料」）。

---

## 三、發現但未處理：兩套平行的熟悉度系統 ⚠️ 需要 VERA 判斷

盤點過程中發現一個比較大的架構問題，**沒有動它**，因為這觸及「進度追蹤怎麼運作」這種站台核心邏輯，不在「AI 可以自行：修正錯字/格式/找出資料矛盾」的範圍內，屬於「AI 不可自行」——需要 VERA 判斷是否要處理、怎麼處理：

全站目前有**兩套完全獨立、互不同步**的「這個語塊我熟不熟」追蹤機制：

| | `peppa_es_familiarity_v1` | `peppa_garden_v1` |
|---|---|---|
| 階段數 | 3 階（☆未熟／◑半熟／★全熟） | 5 階（🍀🍃🌱🌻，另有🍀🍃猛漲期等） |
| 觸發方式 | 點課文語塊跳出的小視窗裡，手動點星星循環切換 | 收藏進💎醞釀私語窖後，點花朵圖示手動推進 |
| 顯示位置 | 每句課文裡，語塊 pill 底下加底線 | 💎醞釀私語窖清單／🌳語塊家族／🐛抓蟲題庫加權 |
| 資料驅動範圍 | 只影響視覺底線，不影響任何題目/加權邏輯 | 驅動抓蟲題庫出題加權（🍀最難記權重最高）、驅動花園新鮮度 |

兩者對同一個西語字/片語完全可能出現不一致的狀態（例如某個詞在課文閱讀時被手動標成「★全熟」，但從沒被收進💎私語窖過、`peppa_garden_v1`裡完全沒有這個詞的紀錄）。從 git 歷史脈絡推測，`peppa_es_familiarity_v1` 疑似是較早期的功能，`peppa_garden_v1` 花園系統是後來疊加上去的更完整系統，兩者從未被合併或清楚分工——但這只是推測，沒有查到 CLAUDE.md 明確記載過這個設計決定。

**這次沒有做的事**：不合併、不刪除、不改變任一系統的運作方式，只做了上面第二節「讓 fam-2 狀態的視覺回饋恢復可見」這個純 CSS 補漏（不影響資料/邏輯）。要不要合併成一套、或明確定義兩者的分工（例如一個代表「閱讀時的主觀感覺」、一個代表「系統客觀追蹤的複習排程」），需要 VERA 決定方向，不是「修錯字」等級的事。

---

## 四、故意排除在備份範圍外的 key（非遺漏，記錄理由避免之後被誤判成 bug）

| Key | 排除理由 |
|---|---|
| `peppa_garden_junk_cleaned_v1` | 一次性遷移旗標，冪等，備份/還原後重跑一次也無害 |
| `peppa_active_tab` | 純 UI 狀態（上次停留分頁），不是使用者創造的內容 |
| `peppa_welcome_tour_seen_v1` | Onboarding 旗標，還原後最多重看一次導覽，無傷大雅 |
| `peppa_talk_grow_intro_seen_v1` | 同上，功能介紹文字的已讀旗標 |
| `peppa_reminder_last_study` / `peppa_reminder_last_diary` | 提醒去重用的日期戳，本來就該每天/每裝置各自判斷，不該跨裝置搬 |
| `peppa_storage_warn_last` | 空間預警去重戳，同上 |

---

## 五、CLAUDE.md 文件同步（Reality Check，工作流程鐵則第 4 條）

CLAUDE.md「📤 日記匯出備份按鈕」段落寫著「備份範圍＝全站 **9** 個 localStorage key」——查證後 `BACKUP_KEYS` 陣列實際上早已成長到 14 個（`peppa_milestones_v1`／`peppa_first_chunk_date_v1`／`peppa_daily_task_v1`／`peppa_chunk_fam_seen_v1` 是後續功能陸续加進去、沒回頭更新這句數字），這次再加上 `peppa_reminder_enabled` 變成 15 個。這份文件本身就是最新狀態，之後 CLAUDE.md 若要引用備份範圍，直接連結這份文件或改寫成「詳見 LOCALSTORAGE_SCHEMA.md」，不用再手動同步數字。
