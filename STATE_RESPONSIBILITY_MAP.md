# 🗺️ State Responsibility Map

> Data & Storage 軌第三份文件（`LOCALSTORAGE_SCHEMA.md` → `STORAGE_VERSIONING.md` → **本文件** → script.js 拆分評估）。
>
> **這份文件只回答一個問題：現在 22 個 localStorage state，各自應該屬於哪個系統責任？只盤點，不重構**——不搬動任何程式碼、不新建任何檔案、不改任何 key。

---

## 一、先做 Reality Check：目前只有 2 個檔案真的持有 localStorage key

重新確認過（grep 全部 `.js`/`.html`）：**只有 `script.js` 跟 `diary.js` 有 `localStorage.getItem/setItem/removeItem` 呼叫**，`stages.js`／`mom.js`／`corazon.js`／`news.js`／`cognates.js`／`ammo.js`／`episodes.js`／`grammar.js`／`sw.js` 全部零筆。

這裡有一個跟直覺不同的發現，值得先講清楚：**`stages.js` 目前並沒有自己的 localStorage key**。🏺封存醞釀（Stage2）的星星進度，是靠 `stages.js` 直接呼叫 `script.js` 共用的 `handleGardenProgress('s2_p'+i, this)`，把資料寫進 `script.js` 的 `peppa_garden_v1` 裡（用 `s2_p0`／`s2_p1`…當作 key 前綴跟其他語塊分開）。也就是說 `stages.js` 在 UI／邏輯層面是獨立的，但**儲存層面完全寄居在 `peppa_garden_v1` 裡，不是自治 owner**。

所以「已有自治 Owner」這個分類，目前只有 **`diary.js`** 一個檔案真的成立（4 個 key：`peppa_mom_diary_v1`／`peppa_mom_notes_v1`／`peppa_talk_diary_v1`／`peppa_talk_grow_intro_seen_v1`，讀寫函式、渲染邏輯、資料形狀全部封裝在 diary.js 內，script.js 只在少數地方呼叫 diary.js 暴露出來的函式，不直接碰這 4 個 key 的 localStorage 讀寫）。

---

## 二、全部 22 個 key 分類表

狀態欄位用三種標記（對應下面「四大分類」的 1/2/3）：
- **已收斂**＝已經有自治 owner 檔案，資料形狀/讀寫邏輯完整封裝，不需要動
- **待整理**＝目前在 script.js，但責任單一明確，getter/setter 函式範圍窄，之後若要拆檔成本低
- **混合**＝一個 key 裡裝了不只一種責任，或被好幾個不相關的系統共同讀寫，拆之前要先想清楚怎麼切

| State Key | 目前位置 | 實際責任 | 理想 Owner | 狀態 |
|---|---|---|---|---|
| `peppa_mom_diary_v1` | diary.js | 教養日記 Vivencias de mamá | Diary Module | 已收斂 |
| `peppa_mom_notes_v1` | diary.js | 靈感孵化／開發者手札 | Diary Module | 已收斂 |
| `peppa_talk_diary_v1` | diary.js | 聊療吾心語（含🌿幫小苗長大的成長葉） | Diary Module | 已收斂 |
| `peppa_talk_grow_intro_seen_v1` | diary.js | 幫小苗長大 介紹文字已讀旗標 | Diary Module | 已收斂 |
| `peppa_es_v4` | script.js | 彈藥解鎖進度 ＋ 閱讀位置 ＋ SVO造句池（見下方混合詳解） | Progress System | **混合** |
| `peppa_garden_v1` | script.js | 全站熟練度標記匯集地（見下方混合詳解） | Garden / Mastery System | **混合** |
| `dynamic_phrases_db` | script.js | 超級變變變動態片語庫（跟 `peppa_es_grammar_v1` 雙寫自同一事件） | Conjugation Library System | **混合** |
| `peppa_first_chunk_date_v1` | script.js | 第一次使用日期（被 Milestone 系統跟 Header/Profile 兩邊各自讀取） | 目前是 Progress System 寫、被兩個系統讀（見下方混合詳解） | **混合** |
| `peppa_es_vocab_v1` | script.js | 💎醞釀私語窖 詞彙收藏 | Vocab Collection System | 待整理 |
| `peppa_es_grammar_v1` | script.js | 文法卡使用者自己造的句子 | Grammar Card System | 待整理 |
| `peppa_es_familiarity_v1` | script.js | 語塊理解熟悉度（3階☆◑★，已封存的 Familiarity Boundary） | Chunk Recognition Layer | 待整理 |
| `peppa_garden_watered_v1` | script.js | 花園新鮮度時間戳（純視覺） | Garden Freshness | 待整理 |
| `peppa_garden_junk_cleaned_v1` | script.js | 花園舊格式一次性清理旗標 | Garden System（遷移基礎設施） | 待整理 |
| `peppa_milestones_v1` | script.js | 里程碑「已慶祝過」清單 | Milestone System | 待整理 |
| `peppa_daily_task_v1` | script.js | 🌱今日耕耘任務 當日狀態 | Daily Task System | 待整理 |
| `peppa_chunk_fam_seen_v1` | script.js | 🌳語塊家族「下一枝」進度 | Chunk Family System | 待整理 |
| `peppa_active_tab` | script.js | 上次停留分頁 | UI Navigation State | 待整理 |
| `peppa_welcome_tour_seen_v1` | script.js | 歡迎導覽已看過旗標 | Onboarding System | 待整理 |
| `peppa_reminder_enabled` | script.js | 每日提醒開關 | Reminder System | 待整理 |
| `peppa_reminder_last_study` | script.js | 學習提醒去重戳 | Reminder System | 待整理 |
| `peppa_reminder_last_diary` | script.js | 日記提醒去重戳 | Reminder System | 待整理 |
| `peppa_storage_warn_last` | script.js | 空間預警去重戳 | Backup / Storage Infra | 待整理 |

**統計**：已收斂 4／待整理 14／混合 4，共 22。

---

## 三、混合責任詳解（這份文件最重要的發現，逐一講清楚「混」在哪裡）

### `peppa_es_v4`：三種責任綁在同一個物件

```js
{ ammoUnlocked, ammoStars, answeredByEp, svoPool, ep, idx }
```

- `ammoUnlocked`／`answeredByEp` — 彈藥庫解鎖進度（Progress System 核心）
- `ep`／`idx` — 目前讀到第幾集第幾句（Reading Position，跟「解鎖了什麼」是不同概念，只是剛好搭同一班車存檔）
- `svoPool` — 造句用的 S/V/O 語塊池（Sentence-Building System）
- **`ammoStars`** — 查證後這個欄位**只被讀取（load/save round-trip、以及一次性搬進 `peppa_garden_v1` 的遷移邏輯），全站沒有任何地方真的再寫入新值**（`grep ammoStars` 只找到宣告、load、save、遷移四處，沒有任何 `ammoStars[id]=...` 賦值）。這是一個「活著但已經沒人用」的凍結欄位，是花園系統上線前的舊星等追蹤機制殘留。

### `peppa_garden_v1`：至少 5 種不同 UI 表面共用同一個匯集地

透過共用函式 `handleGardenProgress(key, el)` 寫入，用**前綴命名空間**區分來源，全部混在同一個扁平物件裡：

| 前綴 | 來源 | 所在檔案 |
|---|---|---|
| （無前綴，純句子文字） | 💎醞釀私語窖收藏／花園原生詞彙 | script.js |
| `ge_` | 彈藥庫語塊小視窗／變位庫 | script.js |
| `gp_` | ☯️太極定裝鏡陰陽字尾配對 | script.js |
| `sfx_` | 🍓同源庫／前後綴規律庫 | script.js |
| `s2_p` | 🏺封存醞釀 Stage2 巡禮句型 | **stages.js**（見第一節，寄居在這個 key 裡） |

這是全站唯一一個「不同檔案共同寫入同一把 key」的案例，也是為什麼第一節要特別指出 `stages.js` 不是真正的自治 owner。

### `dynamic_phrases_db` 跟 `peppa_es_grammar_v1`：同一事件雙寫兩個 key

`triggerAutoWrite()`（程式碼自己的註解寫著「雙寫：peppa_es_grammar_v1（gId-based）+ dynamic_phrases_db（verbForm-based）」）從同一個「使用者造出一句話」事件，同時往兩個形狀不同的 key 寫入近似的資料（一個用文法卡 ID 索引、一個用動詞變位形式索引）。兩者不是同一份資料的兩個副本（形狀跟索引方式都不同），但確實是同一個觸發來源，算是「概念上該一起討論」的一對。

### `peppa_first_chunk_date_v1`：一寫二讀，讀的兩邊互不知道對方存在

- **寫**：`_markFirstChunkDateIfNeeded()`，掛在 `unlockAmmo()`（Progress System 的事件）
- **讀①**：`renderMilestoneBadgeStrip()` 算「耕耘第幾天」（Milestone System）
- **讀②**：`renderHeaderStartSlot()` 判斷 header 要顯示「🌱點播初芽」還是「🌿園區印記」（Header/Profile Layer）——程式碼自己註解強調這是「單一資料來源，不另開一個『是否為新手』的 flag」，這是好設計，但也代表這個 key 事實上同時是兩個系統的依賴，拆分時不能只看其中一邊。

---

## 四、未來可能拆出的模組候選（觀察用，不是這輪的施工項）

從「待整理」的 14 個 key 裡，挑出幾組**本來就已經有自己一套 getter/setter、不太跟其他全域變數糾纏**的候選，供之後真的討論 script.js 拆分時當起點（不是本輪要做的事，純粹先標記出「這幾群東西看起來比較好拆」）：

- **Reminder System**（`peppa_reminder_enabled`／`peppa_reminder_last_study`／`peppa_reminder_last_diary`）——3 個 key，讀寫都收斂在 `checkReminders()`／`toggleReminders()`／`updateReminderBtn()` 幾個函式裡，跟其他全域狀態幾乎沒有交叉引用，是目前看起來**耦合度最低**的一組。
- **Daily Task System**（`peppa_daily_task_v1`）——單一 key，`getDailyTaskState()`／`saveDailyTaskState()`封裝完整，自己依日期失效不需要外部觸發清除。
- **Milestone System**（`peppa_milestones_v1`）——讀寫函式窄（`_msGetSeen()`／`_msSave()`），但**依賴外部的 `ammoUnlocked.length` 當輸入**，不是 100% 自我完備，拆分時要一併決定「進度來源」要不要也一起搬。

**沒有被列進候選、且看起來耦合度最高，之後最不建議先動的**：`peppa_garden_v1`（跨 5 個 UI 表面共用）、`peppa_es_v4`（三種責任＋一個凍結欄位）——這兩個如果要拆，屬於架構層級的決定，不是「把檔案搬過去」這麼單純。

---

## 五、這份地圖現在能回答、之後才要問的問題

有了這份盤點，之後真的要討論 `script.js` 拆分時，至少可以先確認三件事而不用臨場重新調查：

1. **script.js 是否需要拆**——多數 key（14/22）本來就責任單一，只是「湊巧」放在同一個檔案，拆分本身的價值要另外評估，不是「因為檔案很長」就等於「需要拆」。
2. **哪些 state 可以移出**——第四節列的 3 組候選，耦合度低，若真的要拆，優先動這幾個風險最小。
3. **哪些只是 UI state**——`peppa_active_tab`／`peppa_welcome_tour_seen_v1` 這類不算「系統資料」，比較像「畫面記憶」，就算不拆成獨立模組也不影響整體架構清晰度，優先度最低。

**這份文件到此為止，維持「先盤點，不重構」的邊界**——沒有搬動任何程式碼、沒有新建任何檔案、沒有動任何 localStorage key。script.js 是否要拆、怎麼拆，是下一步才要決定的事。
