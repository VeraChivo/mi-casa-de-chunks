# localStorage Schema（資料盤點）

> Data Track 第一步：回答「現在有哪些 key？資料長什麼樣？」不回答「誰負責」
> （下一步 `STATE_RESPONSIBILITY_MAP.md`）、不回答「怎麼處理版本變更」（再下一步
> `STORAGE_VERSIONING.md`）。內容全部來自實際 `grep localStorage.getItem/setItem`
> 逐一追蹤程式碼得出，不是憑印象列清單。

## 盤點方法

```
grep -n "localStorage\.\(get\|set\)Item" *.js
```

共在 `script.js`（19 個 key）／`diary.js`（4 個 key）找到 **23 個現役 key**，
另有 3 個已淘汰但仍被主動清除的舊版 key（`peppa_es_v1/v2/v3`，見下方「淘汰
與遷移」）。**沒有其他 .js 檔案直接讀寫 localStorage**（`maintenance.js` 只讀
不寫，用於健康檢查）。

## 核心學習狀態

| Key | 檔案 | 結構 | 用途 |
|---|---|---|---|
| `peppa_es_v4` | script.js | `{ammoUnlocked, ammoStars, answeredByEp, svoPool, ep, idx}` | 主要學習進度：解鎖的彈藥卡、星級、各集作答紀錄、SVO語塊池、目前所在集數/句數 |
| `peppa_garden_v1` | script.js | `{[chunkText]: {stage, quiz_count}}` | 🌻語塊花園熟練度（🌱→🍃→🍀→🌻四階段），key用**句子/語塊文字本身**不是內部id（見下方「已修正的設計陷阱」） |
| `peppa_garden_watered_v1` | script.js | 單一時間戳（`Date.now()`字串） | 花園新鮮度視覺提示（純視覺，不影響熟練度真實資料，見CLAUDE.md「花園新鮮度視覺層V1」） |
| `peppa_garden_junk_cleaned_v1` | script.js | 旗標 `'1'` | 一次性標記：舊版殘留花園垃圾資料是否已清過 |
| `peppa_es_vocab_v1` | script.js | 陣列 `[{text,...}]` | 💎醞釀私語窖收藏的詞彙/語塊 |
| `peppa_es_grammar_v1` | script.js | `{[grammarId]: userExample}` | 使用者在文法卡自己造的例句 |
| `peppa_es_familiarity_v1` | script.js | `{[chunkKey]: level}` | Chunk熟悉度標記（跟`peppa_garden_v1`是不同的資料軌，兩者關係尚未在文件中明確區分，見下方「待確認」） |
| `peppa_chunk_fam_seen_v1` | script.js | 物件（seen flags） | 🌳語塊家族📺🎵📰徽章的已讀標記 |
| `dynamic_phrases_db` | script.js | `{[verbForm]: [{assoc, zh, es, source}]}` | 使用者在超級變變變/動詞變位庫實戰產生的例句庫（⚠️唯一不遵守`peppa_*`命名慣例的key，見下方「命名不一致」） |

## 里程碑／每日任務

| Key | 檔案 | 結構 | 用途 |
|---|---|---|---|
| `peppa_milestones_v1` | script.js | 陣列（已顯示過的里程碑id） | 語塊股累積天數里程碑勳章，避免重複彈窗 |
| `peppa_first_chunk_date_v1` | script.js | ISO日期字串 | 使用者第一次學習的日期，用來算里程碑累積天數 |
| `peppa_daily_task_v1` | script.js | `{date, tier, energy, doneIdx}` | 🌱今日耕耘任務狀態，`date`跟今天不符時整包重置（不是累積歷史，是「今天」的暫存） |
| `peppa_brief_day_v1` | script.js | 日期數字（`Math.floor(Date.now()/86400000)`） | 🌅農間小報今天是否已顯示過的節流判斷 |

## 日記系統（diary.js 自治模組）

| Key | 檔案 | 結構 | 用途 |
|---|---|---|---|
| `peppa_mom_diary_v1` | diary.js | 陣列 `[{id, dateIso, dateEs, kidNotes:{kidId:note}, moods:[moodId], weather, personalNote, bodyText, createdAt/updatedAt}]` | 💙 Vivencias de mamá（教養日記/媽媽碎語） |
| `peppa_talk_diary_v1` | diary.js | 陣列（含`sentences:[{es,zh}]`等欄位） | 💬 聊療吾心語 |
| `peppa_mom_notes_v1` | diary.js | 陣列 | 🌱 靈感孵化與開發者手札（隨心一筆） |
| `peppa_talk_grow_intro_seen_v1` | diary.js | 旗標 `'1'` | 「🌿幫它長大」功能介紹文字只顯示一次的標記 |

## UI／通知偏好狀態

| Key | 檔案 | 結構 | 用途 |
|---|---|---|---|
| `peppa_active_tab` | script.js | 字串（分頁id） | 記住使用者上次停留的分頁，重新整理後回到原分頁 |
| `peppa_welcome_tour_seen_v1` | script.js | 旗標 | 首次導覽彈窗是否已看過 |
| `peppa_reminder_enabled` | script.js | `'0'`/`'1'` | 🔔每日提醒通知總開關 |
| `peppa_reminder_last_study` / `peppa_reminder_last_diary` | script.js | 日期字串 | 提醒節流：今天這個時段是否已經跳過通知 |
| `peppa_storage_warn_last` | script.js | 時間戳 | localStorage空間預警的節流時間戳，避免24小時內重複跳toast |

## 淘汰與遷移（呼應 FILE_RESPONSIBILITY_MAP.md 的「需確認」項）

**`peppa_es_v1` / `peppa_es_v2` / `peppa_es_v3`**——**已查證不是死程式碼**，
`script.js` 的 `loadFromLS()` 每次載入都會主動執行
`['peppa_es_v1','peppa_es_v2','peppa_es_v3'].forEach(k=>localStorage.removeItem(k))`，
是刻意的舊版清除邏輯，不是遺留垃圾。**FILE_RESPONSIBILITY_MAP.md 裡標記的
「留給下一步判斷」在此正式解決：這三個 key 名稱是遷移清除的目標，不是需要
處理的技術債。**

同時查到另一組**主動遷移**（非清除）邏輯：`peppa_es_v4.ammoStars` 舊資料與
`peppa_es_vocab_v1` 的項目，會在花園系統初始化時被讀出並搬進 `peppa_garden_v1`
（`db[key] = {stage, quiz_count:0}`），舊key本身不會被刪除但資料會被複製過去，
避免使用者升級後花園是空的。

## 命名不一致（記錄，不在這階段修）

**`dynamic_phrases_db`** 是全站唯一不遵守 `peppa_*_v1` 命名慣例的 key（沒有
`peppa_`前綴、沒有版本號）。它確實有被收進 `BACKUP_KEYS`（見下方備份範圍），
功能正常，**這輪只記錄不重新命名**——改key名稱會讓既有使用者的資料在下次
讀取時對不上，屬於「資料管理／版本變更」層級的決定，留給下一步
`STORAGE_VERSIONING.md` 一併評估要不要處理，不在「盤點」這一步擅自動手。

## 備份範圍（`BACKUP_KEYS`，見 script.js:2432）

`📤打包行囊`／`📥行囊歸位`目前只涵蓋 **14 個 key**：
```
peppa_es_v4, peppa_es_vocab_v1, peppa_es_grammar_v1, peppa_es_familiarity_v1,
peppa_garden_v1, peppa_garden_watered_v1, dynamic_phrases_db,
peppa_mom_diary_v1, peppa_mom_notes_v1, peppa_talk_diary_v1,
peppa_milestones_v1, peppa_first_chunk_date_v1, peppa_daily_task_v1,
peppa_chunk_fam_seen_v1
```

**現存 23 個現役 key 裡，有 9 個不在備份範圍內**：`peppa_active_tab`／
`peppa_welcome_tour_seen_v1`／`peppa_reminder_enabled`／
`peppa_reminder_last_study`／`peppa_reminder_last_diary`／
`peppa_storage_warn_last`／`peppa_brief_day_v1`／`peppa_garden_junk_cleaned_v1`／
`peppa_talk_grow_intro_seen_v1`。**逐一看內容，這 9 個多數是 UI 狀態／節流
旗標／一次性提示標記，遺失了不影響學習內容本身**（例如「上次停留的分頁」
重來就重來），**唯一值得討論的例外是 `peppa_reminder_enabled`**——使用者
如果特地開了每日提醒，換裝置/清快取後備份還原卻不會保留這個開關，通知會
悄悄變回關閉狀態。**這裡不判定要不要修，留給下一步資料管理/規範階段決定
是否要把它納入備份範圍。**

## 待確認（留給下一步，不在這裡自己判斷）

- `peppa_garden_v1`（🌻花園熟練度）與 `peppa_es_familiarity_v1`（Chunk熟悉度）
  兩者的關係沒有在任何文件裡明確寫過——是同一件事的兩個舊版本、還是刻意分開
  追蹤的兩種資料？需要在 `STATE_RESPONSIBILITY_MAP.md` 階段追蹤兩者的讀寫
  呼叫點來確認，這裡不猜測。

---

## 下一步

```
✅ 資料盤點（LOCALSTORAGE_SCHEMA.md，本文件）
⬇
▶ 資料責任（STATE_RESPONSIBILITY_MAP.md——現在知道23個key長什麼樣，
  下一步是逐一確認每個key「由哪個功能/流程負責寫入」，順便解開上面
  peppa_garden_v1 vs peppa_es_familiarity_v1 的疑問）
⬇
▶ 資料管理（STORAGE_VERSIONING.md）
⬇
▶ 資料規範（DATA_DICTIONARY.md / CONTENT_SCHEMA.md）
```

---
*首次建立：2026-08-01，內容為實際 `grep`+程式碼追蹤結果，非憑印象列出。*
