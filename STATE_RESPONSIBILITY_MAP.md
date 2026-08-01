# State Responsibility Map（資料責任｜狀態責任）

> Data Track 第二步：回答「這筆資料由誰負責？」——哪個模組寫入、哪個功能使用、
> 是否多方共用、是否責任混合。建立在 `LOCALSTORAGE_SCHEMA.md`（資料長什麼樣）
> 之上，這裡只回答「誰動它」，不重複列欄位結構。全部依實際 `grep` 追蹤函式呼叫
> 得出，不是推測。

## 盤點方法

```
確認每個 key 的 getter/setter 函式定義在哪個檔案（= 擁有者）
grep 這些 getter/setter 函式名稱有沒有被其他檔案呼叫（= 是否多方共用）
```

## 結論先講：23 個 key 裡，只有 1 個是真正的多方共用資料

**`peppa_garden_v1`**（🌻語塊花園熟練度）是全站唯一被三個檔案共同讀寫的資料：

| 呼叫者 | 呼叫方式 | 用途 |
|---|---|---|
| `script.js`（擁有者，定義`getGardenDB()`/`saveGardenDB()`） | 直接讀寫 | 至少22處呼叫點，涵蓋SFX發音、彈藥卡解鎖、chunk家族徽章、花園檢視、抓蟲測驗、垃圾資料清理等幾乎全部主線功能 |
| `diary.js` | 呼叫`script.js`的`getGardenDB()`/`saveGardenDB()` | `diaryAdvanceGardenMoods()`——寫日記選的心情語塊，也會累積進花園熟練度（呼應CLAUDE.md「日記與莊園機制」設計） |
| `stages.js` | 呼叫`script.js`的`getGardenDB()` | Stage1/Stage3練習時讀取熟練度做加權出題（🍀最難記優先） |

**這是刻意設計，不是責任混亂**——`peppa_garden_v1` 本來就是全站「學會了多少」
的單一事實來源（Single Source of Truth，呼應 `CONTENT_RULES.md`「單一資料
來源」規則），日記/劇情/Stage練習都應該餵資料進同一個花園，不是各自维护一份。
**唯一該注意的點**：這三個檔案都是透過呼叫 `script.js` 定義的
`getGardenDB()`/`saveGardenDB()` 函式存取，沒有任何檔案繞過這兩個函式直接
`localStorage.getItem('peppa_garden_v1')`——代表**讀寫入口是統一的**，共用不等於
混亂，這點值得記錄下來當作「多方共用但責任清楚」的正面範例。

## 其餘 22 個 key：單一模組自持，無共用

**script.js 自持（18個，扣掉上面的peppa_garden_v1）**：
`peppa_es_v4`／`peppa_es_vocab_v1`／`peppa_es_grammar_v1`／
`peppa_es_familiarity_v1`／`peppa_chunk_fam_seen_v1`／`dynamic_phrases_db`／
`peppa_milestones_v1`／`peppa_first_chunk_date_v1`／`peppa_daily_task_v1`／
`peppa_brief_day_v1`／`peppa_active_tab`／`peppa_welcome_tour_seen_v1`／
`peppa_reminder_enabled`／`peppa_reminder_last_study`／
`peppa_reminder_last_diary`／`peppa_storage_warn_last`／
`peppa_garden_watered_v1`／`peppa_garden_junk_cleaned_v1`——這18個key只在
script.js內部讀寫，沒有被diary.js或stages.js呼叫，**責任單純**。

**diary.js 自持（4個）**：`peppa_mom_diary_v1`／`peppa_talk_diary_v1`／
`peppa_mom_notes_v1`／`peppa_talk_grow_intro_seen_v1`——**已查證script.js
沒有直接呼叫diary.js的存取函式**（`getDiaryDB`/`saveDiaryDB`等 0 處被
script.js呼叫），確認diary.js是真正的自治模組，跟FILE_RESPONSIBILITY_MAP.md
先前的判斷一致。CLAUDE.md提到的「🌼學習完成→日記出口」橋接功能，實際做法是
切換分頁+DOM操作預填文字框（不是直接呼叫diary.js的存檔函式），使用者仍要
自己按下diary.js的存檔按鈕才會真正寫入，不算資料層面的共用。

## 一個修正：`maintenance.js` 不碰使用者 localStorage

**FILE_RESPONSIBILITY_MAP.md 先前寫「讀localStorage做檢查用」是誤植，這裡
更正**：`maintenance.js`是Node.js腳本，用`loadArray()`/`extractConstArray()`
讀取.js資料檔的**原始文字**做結構檢查（重複ID/必填欄位），完全不觸碰瀏覽器
的localStorage（也不可能——Node.js環境本來就沒有瀏覽器的localStorage）。
已同步修正 `FILE_RESPONSIBILITY_MAP.md` 表格裡的這一行描述。

## 解開 LOCALSTORAGE_SCHEMA.md 留的疑問：`peppa_garden_v1` vs `peppa_es_familiarity_v1`

**確認是兩個不同系統，不是重複資料**：

| | `peppa_garden_v1`（🌻語塊花園） | `peppa_es_familiarity_v1`（Chunk熟悉度星） |
|---|---|---|
| 觸發方式 | 自動——答對抓蟲測驗題／完成句子才會前進 | 手動——使用者自己點星星按鈕循環切換 |
| 資料範圍 | 完整句子/語塊文字，四階段（🌱🍃🍀🌻） | 單一詞彙，三階段（`cycleFamiliarity(word)`，`FAM_STARS`3態循環） |
| 核心函式 | `getGardenDB()`／`saveGardenDB()` | `getFamState(word)`／`cycleFamiliarity(word)` |
| 用途 | 驅動花園抓蟲出題加權、里程碑累積、Stage練習排序 | 使用者自我評估用的小星星標記，範圍窄，只服務單一UI元件（`.fam-star-btn`） |

兩者看起來都是「記錄學會多少」，但一個是系統自動判斷、跨全站功能共用的核心
熟練度系統，一個是使用者自己手動點的局部小標記，**不是同一件事的兩個舊版本，
是刻意分開的兩種資料**，不需要合併。

## 責任混合檢查（她要求的第四個問題）

依上面的盤點，**23個key裡沒有任何一個出現「責任混合」（多個模組各自定義自己
的getter/setter、卻寫同一把key）的情況**——`peppa_garden_v1`雖然多方共用，
但存取入口統一（都透過script.js的兩個函式），不算混合；其餘22個key都是單一
檔案獨自持有。**這代表資料層本身目前沒有真正的責任衝突**，前一步
`FILE_RESPONSIBILITY_MAP.md`標記的「混合責任」問題（script.js責任過重）
是**檔案層級**的問題（一個檔案塞了太多不同功能的邏輯），不是**資料層級**的
問題（資料本身的讀寫入口其實是乾淨的）——這是本階段最重要的區分：**script.js
「檔案」很肥大，但它管理的「資料」邊界其實清楚，兩者是不同層次的健康度**。

---

## 下一步

```
✅ 資料盤點（LOCALSTORAGE_SCHEMA.md）
✅ 資料責任（STATE_RESPONSIBILITY_MAP.md，本文件）
⬇
▶ 資料管理（STORAGE_VERSIONING.md——現在知道「誰負責」，下一步是「資料
  改變時怎麼處理」：peppa_es_v1/v2/v3的清除模式已經是一個範例，dynamic_phrases_db
  的命名不一致、BACKUP_KEYS少了9個key，都是這一步該處理的具體案例）
⬇
▶ 資料規範（DATA_DICTIONARY.md / CONTENT_SCHEMA.md）
```

---
*首次建立：2026-08-01，內容為實際函式呼叫追蹤結果（grep跨檔案函式引用），
非推測。同步修正 FILE_RESPONSIBILITY_MAP.md 一處先前對 maintenance.js 的誤植。*
