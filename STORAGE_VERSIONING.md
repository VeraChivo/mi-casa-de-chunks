# 📐 Storage Versioning 規則

> **📍 定位**：`資料管理_版本管理`（Data Track｜資料管理）

> Data Track 下一階段第一項（見 `LOCALSTORAGE_SCHEMA.md` 第六節）。這份文件回答 VERA 提出的四個問題：新 key 何時升版／舊版保留多久／migration function 放哪／clearLS 與 backup 是否需要同步版本——**全部依現有程式碼的實際做法歸納，不是憑空發明新規則**，目的是把已經在用、但沒寫下來的默契變成白紙黑字，避免下次又要重新摸索一次。

---

## 先看證據：現有版本演進的真實樣貌

`LOCALSTORAGE_SCHEMA.md` 盤點過的 22 個 key，命名上大多帶 `_v1` 尾碼，但**目前檔案可查的 52 個 commit 歷史裡，只有 `peppa_es_v4` 真的經歷過「換新 key 名稱」這種升版**（`loadFromLS()` 裡還留著 `['peppa_es_v1','peppa_es_v2','peppa_es_v3'].forEach(k=>localStorage.removeItem(k))` 這行清舊版殘留的代碼，但 v1→v4 各版之間實際改了什麼，已經超出目前 git 歷史可查範圍，早於現存 commit 紀錄）。

其餘 21 個 key，包含 `peppa_daily_task_v1`、`peppa_garden_v1`、`BACKUP_KEYS` 陣列本身，**全部都是用「原地長欄位／原地改形狀」的方式演進，從來沒有真的把 `_v1` 升成 `_v2`**。最清楚的證據是 `migrateOldDataToGarden()`（script.js）：

```js
// Normalize old garden entries {count, graduated} → {stage}
Object.entries(db).forEach(([k, e]) => {
  if (e && typeof e === 'object' && typeof e.count === 'number' && typeof e.stage === 'undefined') {
    const stage = e.graduated ? 4 : e.count >= 10 ? 3 : e.count >= 5 ? 2 : e.count >= 1 ? 1 : 0;
    db[k] = { stage, quiz_count: e.quiz_count || 0 };
    changed = true;
  }
});
```

`peppa_garden_v1` 的資料形狀從 `{count, graduated}` 整個換成 `{stage, quiz_count}`——這是不相容的 breaking change，但做法是**在同一個 key 裡用 `typeof` 偵測舊形狀、原地轉寫**，而不是開一個 `peppa_garden_v2`。這跟 CLAUDE.md 工作守則第 5 條「LocalStorage key 是 peppa_es_v4：不要改 key 名稱，會讓用戶資料消失」的精神完全一致——**這份文件把「不要改 key 名稱」的鐵則，延伸成一套完整的版本演進規則**。

---

## Q1：新 key 何時升版（換新 key 名稱）？

**預設答案：不升版。** 分兩種情況：

| 變化類型 | 做法 | 範例 |
|---|---|---|
| **新增欄位**（既有物件多一個 field） | 直接加，不用任何遷移 | `peppa_daily_task_v1` 陸續長出 `tier`／`energy`／`doneIdx`，`BACKUP_KEYS` 陣列從 9 個成長到 15 個，都沒有動任何 key 名稱 |
| **形狀不相容變化**（欄位改名／型別改變／陣列⇄物件互換） | 寫一個**原地遷移函式**，用 `typeof`／欄位存在與否偵測舊形狀，讀取時當場轉寫成新形狀存回同一個 key | `migrateOldDataToGarden()` 把 `{count,graduated}` 轉成 `{stage,quiz_count}` |
| **真的需要換全新 key 名稱**（例如新舊資料在語意上就是兩件不同的事，不是同一份資料改形狀） | 才升版（`_v1`→`_v2`），且**同一個 commit 必須附上舊 key 的自動清除邏輯**（見 Q2），不能只加新 key、放著舊 key 不管 | `peppa_es_v4`（歷史案例，舊版演進脈絡已不可考，僅存清除殘留的程式碼） |

**為什麼預設不升版**：升版＝改 key 名稱，這正是 CLAUDE.md 明講「會讓用戶資料消失」的高風險動作（使用者資料留在舊 key，程式碼開始讀新 key，沒有遷移就等於資料憑空不見）。原地遷移函式風險低很多——舊資料還在原本的 key 裡，只是被轉寫成新形狀，就算轉寫邏輯有 bug，資料本身沒有真的被清掉，還有救。

---

## Q2：舊版保留多久？

**不保留「一段時間」，偵測到就立刻清。** 兩種既有模式都是這樣：

1. **無旗標、每次都重新檢查**（`migrateOldDataToGarden()`）：沒有用任何「已經遷移過」的 flag 擋，每次 INIT 都重新掃一次 `db`，用 `typeof e.count==='number' && typeof e.stage==='undefined'` 判斷「這筆資料還是舊形狀嗎」——沒有殘留舊形狀時，這個迴圈只是空跑，成本很低，不需要靠 flag 省效能。
2. **有旗標，做過一次就不再做**（`migrateGardenJunkCleanup()`）：因為要做的清理本身要整個掃過 `db` 的 key 判斷是不是垃圾格式，比較重，所以用 `peppa_garden_junk_cleaned_v1` 這個一次性旗標擋住重複執行，但「有沒有清過」的判斷依然是每次 INIT 都會跑一次（只是判斷到已清過就直接 `return`）。
3. **真的換了新 key 名稱**（v1/v2/v3→v4 歷史案例）：舊 key 在 `loadFromLS()` 裡**無條件**每次 INIT 都嘗試 `removeItem`（就算舊 key 早就不存在，`removeItem` 對不存在的 key 呼叫也不會報錯），不是「保留 N 天/N 版之後再清」。

**規則**：不設「保留期」這個概念——舊格式只要偵測到就地轉寫或刪除，成本用「有沒有 flag 擋」控制，不是用「保留多久」控制。這樣才不會有「明明遷移邏輯已經寫好、卻因為還在保留期所以繼續讀到舊資料」的模糊地帶。

---

## Q3：migration function 放哪？

**固定放 `script.js`，掛在 `INIT` 序列裡「對應的 load 函式之後、第一個依賴這份資料的 render 之前」**。目前 INIT 的實際順序（節錄）：

```js
loadFromLS();
answered=(answeredByEp[ep]||[]).slice();
loadVocabFromLS();
loadFamiliarity();
loadGrammarLib();
migrateOldDataToGarden();     // ← 依賴 peppa_es_v4／peppa_es_vocab_v1／peppa_garden_v1，所以排在三者的load之後
migrateGardenJunkCleanup();   // ← 依賴 migrateOldDataToGarden() 已經把資料轉寫好，所以排在它後面
buildNav();
render();
renderAmmo();
renderMilestoneBadgeStrip();
renderHeaderStartSlot();
...
```

之後新增任何 migration function，比照這個位置規則：①對應的 `load*()` 呼叫完才能開始 migrate（migrate 函式內部直接用 `localStorage.getItem`／`getGardenDB()` 等既有 getter 讀最新資料，不用額外傳參數）②所有 render 之前完成，讓畫面第一次渲染就是遷移後的正確狀態，不要遷移完才觸發二次重繪。

**不要放 `diary.js`**（除非遷移對象本身就是 diary.js 專屬管理的 key，例如未來 `peppa_mom_diary_v1` 形狀要換的話），也不要放進 `maintenance.js`（那支只做靜態內容檢查，不執行在瀏覽器 runtime，沒有能力碰使用者的 localStorage，這點 `maintenance.js` 檔案開頭註解本身也講得很清楚）。

---

## Q4：clearLS／backup 是否需要同步版本？

**現況：`BACKUP_KEYS` 陣列跟 `clearLS()` 的移除清單是兩份手動維護、互相獨立的字串陣列，沒有任何自動同步機制**——這正是這次 Data Track 第一階段抓到 3 個 `clearLS()` 漏清、1 個 `BACKUP_KEYS` 漏收的根本原因：新增 key 時，兩份清單很容易只改其中一份就忘記另一份。

**這不是「加版本號」能解決的問題**（版本號解決的是「同一個 key 的形狀變了怎麼辦」，不是「這個 key 該不該出現在另一份清單裡」），所以規則不是「同步版本」，而是**固定的新增 key 檢查清單**——之後任何新增一個會長期存在的 localStorage key，同一個 commit 要一併確認：

```
新增 localStorage key 時，回答這三題：
1. 這是使用者創造的內容/偏好嗎？→ 是就加進 BACKUP_KEYS
2. 這是「學習紀錄」的一部分嗎（會被🌱重新開墾影響的資料）？→ 是就加進 clearLS() 的移除清單
3. 這個 key 的形狀未來還可能變嗎？→ 會的話，現在就先把 migrate 函式的位置/命名想好（不用先寫，但要在 LOCALSTORAGE_SCHEMA.md 標註「形狀可能演進」）
```

`LOCALSTORAGE_SCHEMA.md` 每個 key 的表格本身已經有「備份／重新開墾清除」兩欄——**那張表就是這份檢查清單的落地**，之後新增 key 的同時要把該 key 加進那張表對應的分組，並填好這兩欄，不是另外開一份清單。

---

## 小結：四條規則一句話版

1. **能加欄位就加欄位，不要換 key 名稱**——換名字是最後手段。
2. **偵測到舊形狀就地轉寫/刪除，不設保留期**——用 flag 控制「做過沒」，不是用時間控制「還能不能讀」。
3. **migration function 放 script.js，排在對應 load 之後、render 之前**——照 INIT 既有順序插入，不要另立位置。
4. **新增 key 一律過 `LOCALSTORAGE_SCHEMA.md` 的三題檢查清單**——backup／clearLS／未來會不會變形狀，三題都要回答，不是加了 key 就算完工。
