# 🧭 Data Domain Map

> Data Track 第四份文件，插在 `STATE_RESPONSIBILITY_MAP.md` 跟未來的 `DATA_DICTIONARY.md` 之間（VERA 2026-08-01 排序：`LOCALSTORAGE_SCHEMA` → `STATE_RESPONSIBILITY_MAP` → `STORAGE_VERSIONING` → **`DATA_DOMAIN_MAP`（本文件）** → `DATA_DICTIONARY` → `CONTENT_SCHEMA`）。
>
> **這份文件只回答一個問題：這些資料屬於哪個產品領域？不拆資料，只切責任邊界。** `STATE_RESPONSIBILITY_MAP.md` 回答的是「這個 key 現在放在哪個檔案、該不該搬」；這份文件回答的是更上一層的「這個 key（或 key 裡的一部分）概念上屬於哪個功能領域、被幾個領域共用」——兩份文件互補，不重複。

---

## 一、為什麼要先做這份文件，才能寫欄位字典

`STATE_RESPONSIBILITY_MAP.md` 已經找出 4 個「混合」key，但只講了「混在一起」，沒有講「混的是哪幾個領域、哪些是刻意共用、哪些只是剛好擠在同一個容器裡」。如果現在直接跳去寫 `DATA_DICTIONARY.md`（逐欄位定義型別/必填/預設值），只會忠實記錄下現況的混亂，之後真的要動 `peppa_garden_v1` 或 `peppa_es_v4` 時，欄位字典幫不上「這欄位可以搬去哪裡」的判斷。**先切好領域邊界，欄位字典才有意義。**

---

## 二、產品領域清單（Domain List）

| Domain | 對應 key | 是否有自己專屬的 key |
|---|---|---|
| **Progress Domain**（彈藥解鎖進度／閱讀位置） | `peppa_es_v4` 的 `ammoUnlocked`／`answeredByEp`／`ep`／`idx` | ✅ 有（但跟其他 domain 共用同一個物件，見第三節） |
| **Sentence-Building Domain**（造句 SVO 池） | `peppa_es_v4` 的 `svoPool` | ⚠️ 寄居在 Progress Domain 的同一個 key 裡 |
| **Vocab Collection Domain**（💎醞釀私語窖） | `peppa_es_vocab_v1` | ✅ 有 |
| **Grammar Card Domain**（文法卡使用者造句） | `peppa_es_grammar_v1`（＋`dynamic_phrases_db`，見第三節） | ✅ 有 |
| **Conjugation Library Domain**（超級變變變） | `dynamic_phrases_db` | ✅ 有 |
| **Chunk Recognition Domain**（3階☆◑★，已封存的 Familiarity Boundary） | `peppa_es_familiarity_v1` | ✅ 有 |
| **Garden / Mastery Domain**（5階🍀🍃🌱🌻花園熟練度＋新鮮度） | `peppa_garden_v1`（主體）／`peppa_garden_watered_v1`／`peppa_garden_junk_cleaned_v1` | ✅ 有，但同時是好幾個其他 domain 的共用容器（見第三節，這是本文件的核心案例） |
| **Chunk Family Domain**（🌳語塊家族「下一枝」） | `peppa_chunk_fam_seen_v1` | ✅ 有，但**判斷邏輯讀取整個 Garden Domain 的物件**（`_chunkFamCollectedKeys()` 對 `getGardenDB()` 不分前綴掃全部 key） |
| **Review / Quiz Domain**（🐛抓蟲題庫出題加權） | 沒有自己的 key | ⚠️ 完全寄居在 Garden Domain：`generateBattleQuestionPool()` 對 `getGardenDB()` 不分前綴抽全部 key 出題 |
| **Milestone Domain**（里程碑慶祝） | `peppa_milestones_v1` | ✅ 有，但**觸發條件讀取 Progress Domain**（`ammoUnlocked.length`），**天數顯示讀取 Header/Profile Domain 的 key**（見第四節） |
| **Header / Profile Domain**（header「🌱點播初芽／🌿園區印記」） | 沒有自己的 key | ⚠️ 完全依賴讀取 `peppa_first_chunk_date_v1`（產權上屬於 Progress Domain，見第四節） |
| **Gender-Pair Practice Domain**（☯️太極定裝鏡） | 沒有自己的 key | ⚠️ 完全寄居在 Garden Domain（`gp_` 前綴） |
| **Cognate / Suffix Domain**（🍓同源庫／前後綴規律庫） | 沒有自己的 key | ⚠️ 完全寄居在 Garden Domain（`sfx_` 前綴） |
| **Stage2 Practice Domain**（🏺封存醞釀句型練習，stages.js） | 沒有自己的 key | ⚠️ 完全寄居在 Garden Domain（`s2_p` 前綴）——**stages.js 只有 UI／流程責任，沒有資料責任**（呼應 `STATE_RESPONSIBILITY_MAP.md` 的訂正） |
| **Diary Domain**（教養日記／手札／聊療吾心語） | `peppa_mom_diary_v1`／`peppa_mom_notes_v1`／`peppa_talk_diary_v1`／`peppa_talk_grow_intro_seen_v1` | ✅ 有，且已收斂在 diary.js（唯一真正的自治領域） |
| **Daily Task Domain**（🌱今日耕耘任務） | `peppa_daily_task_v1` | ✅ 有 |
| **Onboarding Domain**（導覽／功能介紹已讀旗標） | `peppa_welcome_tour_seen_v1` | ✅ 有 |
| **UI Navigation Domain**（介面狀態） | `peppa_active_tab` | ✅ 有 |
| **Reminder Domain**（每日提醒） | `peppa_reminder_enabled`／`peppa_reminder_last_study`／`peppa_reminder_last_diary` | ✅ 有 |
| **Backup / Storage Infra Domain**（資料保險箱基礎設施） | `peppa_storage_warn_last`（＋跨全部 domain 的 `BACKUP_KEYS`／`clearLS()` 機制本身） | ✅ 有（這個 domain 的本質就是「橫跨其他所有 domain」，性質特殊，見第五節） |

**19 個領域，對應 22 個 key**——領域數量比 key 數量多，因為 `peppa_es_v4` 拆成 2 個領域、`peppa_garden_v1` 拆成至少 6 個領域共用。

---

## 三、核心案例：`peppa_garden_v1` 的領域分解

`STATE_RESPONSIBILITY_MAP.md` 已經列出這個 key 有 5 種前綴來源，這份文件進一步分成**兩種性質完全不同的混合**：

### ① 刻意設計的跨領域共享（`ge_` 前綴）

程式碼自己的註解寫得很清楚：

> 「改用全站統一的 `ge_` 前綴，跟語法卡/詞綴卡/變位庫共用同一套追蹤邏輯——**同一個字在哪裡點星星，熟練度都是同一份，不用額外的識別碼區分**。」

這是**設計意圖**，不是意外混雜——「這個西語字/片語我熟不熟」本來就該是跨情境共享的單一狀態，不管你是在彈藥庫小視窗、還是變位庫例句裡點到同一個字，理應累積同一份熟練度。**這部分不需要、也不應該切開。**

### ② 各自領域碰巧共用同一個容器（`gp_`／`sfx_`／`s2_p`／無前綴詞彙）

跟 ① 不同，太極定裝鏡的陰陽字尾配對練習、同源庫的前後綴詞彙、Stage2 的句型練習、💎收藏的原生詞彙——這四種**概念上彼此獨立**（陰陽字尾配對熟不熟，跟句型練習熟不熟，是不同的能力面向），只是因為都需要「一顆可以點的星星＋5階熟練度」這個 UI 元件，就直接借用了 Garden Domain 現成的 `handleGardenProgress()`／`getGardenDB()` 讀寫路徑，**沒有各自的領域邊界檢查**。

### ③ 兩個下游功能對整個物件做無差別掃描

- **Chunk Family Domain**（`_chunkFamCollectedKeys()`）跟 **Review/Quiz Domain**（`generateBattleQuestionPool()`）都是直接對 `getGardenDB()` 回傳的整個物件做 `Object.keys()`，**不分前綴、掃描全部內容**（後者只用 `_isLegacyJunkChunk()` 濾掉舊格式殘留，不濾前綴）。也就是說：抓蟲複習題庫理論上可以抽到「太極定裝鏡點過的字」或「同源庫點過的字」當題目，語塊家族的「已收集關鍵字」判斷也一樣不分來源。這目前看起來是可接受的設計（畢竟「複習你標記過的任何東西」本身合理），但**沒有任何一行程式碼明確聲明過這個範圍是刻意的**——這是之後寫 `DATA_DICTIONARY.md` 時，`peppa_garden_v1` 最需要明確定義「讀取範圍是否該限定前綴」的地方。

### 建議的領域邊界（只切邊界，不搬資料）

```
Garden Domain（peppa_garden_v1，容器不變）
├─ ge_*      → Chunk Recognition Sub-domain（刻意跨領域共享，維持現狀）
├─ gp_*      → Gender-Pair Practice Sub-domain（太極定裝鏡專屬）
├─ sfx_*     → Cognate/Suffix Sub-domain（同源庫專屬）
├─ s2_p*     → Stage2 Practice Sub-domain（stages.js專屬）
└─（無前綴） → Vocab Collection Sub-domain（💎收藏專屬）

下游消費者：
├─ Review/Quiz Domain      讀取「全部」sub-domain（現況，待正式定義是否為刻意設計）
└─ Chunk Family Domain     讀取「全部」sub-domain（現況，同上）
```

這張圖不代表要拆出 5 個新 key——只是把「同一個容器裡，其實裝著哪些各自獨立的東西」講清楚，之後 `DATA_DICTIONARY.md` 要逐欄位定義時，可以照這個 sub-domain 分組寫，而不是把 `peppa_garden_v1` 當成單一扁平結構處理。

---

## 四、案例：`peppa_first_chunk_date_v1`——下一輪資料規範最優先要處理的案例

領域歸屬目前是「誰寫」跟「誰讀」不對稱：

- **產權（誰寫）**：`_markFirstChunkDateIfNeeded()` 掛在 `unlockAmmo()`，屬於 **Progress Domain** 的事件
- **消費者①**：**Milestone Domain**（`renderMilestoneBadgeStrip()` 算「耕耘第幾天」）
- **消費者②**：**Header/Profile Domain**（`renderHeaderStartSlot()` 判斷新手／老手樣式）——這個領域完全沒有自己的 key，唯一的資料依據就是這個原本屬於 Progress Domain 的欄位

VERA 已指出這是「未來資料規範最值得處理的案例」——**這輪不處理**，先記錄清楚問題形狀：一個欄位同時是兩個下游領域的唯一資料來源，卻沒有一個明確屬於「Header/Profile Domain」自己的 key。之後寫 `DATA_DICTIONARY.md` 時，這裡要明確定義這個欄位的「正式歸屬」是 Progress Domain 還是應該獨立成一個跨領域的「User Tenure（使用者年資）」概念。

---

## 五、案例：`peppa_es_v4` 的 `ammoStars`——凍結欄位處理流程（記錄流程，這輪不執行）

`STATE_RESPONSIBILITY_MAP.md` 已確認這個欄位只被 load/save round-trip 跟一次性遷移邏輯讀取，全站沒有任何地方真的再寫入新值。VERA 明確要求**不要直接清掉**，改用三步驟流程，這輪只記錄流程、不執行任何一步：

```
① 確認無讀取依賴
        ↓
② 移除欄位
        ↓
③ 必要時 migration
```

第①步「確認無讀取依賴」目前只做過**寫入面**的確認（沒有任何地方賦新值），還沒有做過**讀取面**的完整確認（例如：有沒有任何未來功能、或已經停用但還掛著的程式碼路徑，理論上還會去讀 `ammoStars` 的值來做判斷，而不只是單純把它搬進 `peppa_garden_v1`）。這輪維持「已標記，暫緩處理」的狀態，不進到第②步。

---

## 六、Backup / Storage Infra Domain 的特殊性質

跟其他 18 個領域不同，這個領域的本質就是「橫跨所有其他領域」——`BACKUP_KEYS` 陣列跟 `clearLS()` 的移除清單，物理上是兩份字串陣列，但語意上分別代表「哪些領域的資料算使用者內容」跟「哪些領域的資料算學習紀錄」。`STORAGE_VERSIONING.md` 第四題已經把這個領域的檢查邏輯訂成三題檢查清單（是否使用者內容／是否學習紀錄／形狀會不會演進），這裡不重複，只標註：**這個領域沒有自己的「資料」，它的責任是「知道其他所有領域的資料該不該被它自己管到」**。

---

## 七、下一步（不是這輪要做的事）

依 VERA 排定的順序，接下來是：

1. **`DATA_DICTIONARY.md`**——逐欄位定義型別／必填／預設值／合法範圍，這次有了 domain 邊界（尤其是 `peppa_garden_v1` 的 sub-domain 分組跟 `peppa_first_chunk_date_v1` 的歸屬問題），寫欄位字典時才不會只是忠實抄錄現況的混亂。
2. **`CONTENT_SCHEMA.md`**——性質上跟這條 Data Track 稍微不同（比較像是 episodes.js／grammar.js／ammo.js 這類「教學內容資料」的 schema，不是 localStorage runtime state），排在字典之後。

這份文件到此為止，**沒有搬動任何程式碼、沒有新建任何 key、沒有拆開 `peppa_garden_v1`**，維持 Data Track 從第一份文件開始就一直遵守的「先盤點，不重構」邊界。
