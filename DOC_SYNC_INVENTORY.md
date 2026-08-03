# 📖 文件同步盤點清單（Documentation Sync Inventory）

## 🧊 CLAUDE.md 凍結中（2026-08-02 VERA裁定，工作原則，任何人接手先看這條）

> **CLAUDE.md 先凍結，不再新增修改；等相關 feature branch 整理、合併順序確定後，再集中同步。**

**背景**：`git fetch --prune` 後發現至少 3 條 sibling 分支（`claude/localstorage-schema-cleanup-ursehf`／
`claude/storage-versioning-rules-c8m7q6`／`claude/new-project-purpose-features-amidg9`）跟這條分支
一樣，各自獨立在修改 `CLAUDE.md`，尚未合併回 main。這已經不是 Documentation Sync 的範圍（是
版本管理/merge順序問題），VERA 裁定的處理策略是：

1. **確認目前作法正確**：本分支暫緩修改 CLAUDE.md 本身（見下方「決策與後續處理記錄」列出的
   四項 CLAUDE.md 待辦：錄音仿說功能過期敘述、44篇vs53篇矛盾、儲水槽42→59、西語世界殘留字樣）。
2. **不再新增任何一條會修改 CLAUDE.md 的分支**——包含這條 Documentation Sync 分支本身，也包含
   之後任何新開的 track/分支，在 merge 順序確定前都不要動 CLAUDE.md。
3. **先把 Documentation Sync 其他不涉及 CLAUDE.md 的文件完成**（`ROADMAP.md`／`CHANGELOG.md`／
   `CONTENT_RULES.md`／`RECORDING_QUEUE.md`——已完成，見下方「已執行」）。
4. **CLAUDE.md 本身留到整理 merge 順序時一次處理**——屆時要一併考慮的不只是這條分支發現的4項
   過期內容，還有前述3條分支各自的 CLAUDE.md 修改（分別是：📤日記匯出備份條目更新、規則19
   文法白話規則修訂），需要人工判斷合併順序，不能無腦 merge。

**這條原則本身不需要再確認/再問**——之後任何接手的人（不管是VERA自己還是其他AI協作者），
只要看到 CLAUDE.md 有想改的內容，先檢查這條凍結原則還在不在，不在了（表示已解凍/已完成merge
整理）才動手；還在的話，一律記錄到本文件或個人待辦，不要直接修改 CLAUDE.md。

---

2026-08-02 建立。這份文件只做一件事：**比對「文件說了什麼」跟「程式碼實際是什麼」，列出落差**。
不新增功能、不改架構——這是盤點，不是施工（少數確認為單純文件過期的項目，經裁決後已直接修正，
見下方「決策與後續處理記錄」）。

查證方法：直接讀程式碼（grammar.js/script.js/episodes.js/ammo.js/audio-manifest.js/index.html 等）、
用 Node.js 載入資料陣列跑實際數字、grep 交叉比對，不是憑印象判斷。每一項都附「證據」可回頭核對。

---

## 決策與後續處理記錄（2026-08-02，裁決後執行）

針對上一輪五項待確認，裁決如下，並依裁決範圍執行：

| 項目 | 裁決 | 處理狀態 |
|---|---|---|
| 文件過期（ROADMAP/CLAUDE/CHANGELOG等） | ✅ 可以開始修 | 見下方「已執行」，**CLAUDE.md本身暫緩**，理由見下方「重大發現」 |
| clearLS 範圍 | ⏸ 先維持現況，不再擴大，日記保留 | 不動code，僅記錄決策——**但發現此決策實際上已經在別的分支被實作，見下方** |
| c1/c2 篩選 chip | ⏸ 先不要改，另開UX/產品討論 | 不動code，本輪不處理，移出 Documentation Sync 範圍 |
| GRAM_AUDIO_MAP 未同步 | 🔴 優先確認，查證屬實則列為修正項 | 已用 file:line 交叉比對二次確認（見原第2-4節），已登記進 `RECORDING_QUEUE.md`「缺口⑥」，未實際補錄音 |
| FEATURE_INVENTORY 找不到 | 📋 先確認是否路徑/分支/未合併造成 | 已確認——**是未合併造成，不是缺失**，見下方 |

### 🚨 重大發現：至少 8 條 sibling 分支尚未合併回 main，其中 3 條同時在改 CLAUDE.md

執行「文件過期修正」前，先 `git fetch --prune` 檢查所有遠端分支（原本只看 main），發現：

| 分支 | 內容 | 是否touch CLAUDE.md |
|---|---|---|
| `claude/feature-inventory-system-map-o8aumy` | 新增 `FEATURE_INVENTORY.md`（223行，功能盤點與系統地圖） | 否 |
| `claude/mi-casa-feature-audit-dioiso` | 新增 `FEATURE_AUDIT.md`／`MVP_BOUNDARY.md`／`PRD.md`／`PRODUCT_PRINCIPLES.md`／`SYSTEM_MAP.md`（推測是「Product Track」的產物） | 否 |
| `claude/bug-ui-inventory-repair-rlk906` | commit標題「修bug.ui第一批」——**已修 `clearLS()`，補清5個key**（milestones/first_chunk_date/daily_task/chunk_fam_seen/welcome_tour_seen），並明確留言註解「日記類key刻意不清，VERA 2026-08-02確認保留」——**跟這輪clearLS決策內容完全一致，但是獨立實作、尚未合併** | 是（但只動`script.js`/`index.html`，不動CLAUDE.md） |
| `claude/localstorage-schema-cleanup-ursehf` 與 `claude/storage-versioning-rules-c8m7q6` | 兩分支對CLAUDE.md的diff**完全相同**——新增 `LOCALSTORAGE_SCHEMA.md`/`STORAGE_VERSIONING.md`/`DATA_DOMAIN_MAP.md`/`STATE_RESPONSIBILITY_MAP.md`，同時**也修了`clearLS()`，但只補3個key**（milestones/chunk_fam_seen/first_chunk_date，不含daily_task/welcome_tour_seen），順手修了一個`.chunk-pill.fam-2`遺漏的CSS規則 | **是**——改CLAUDE.md第831行（📤日記匯出備份按鈕條目） |
| `claude/new-project-purpose-features-amidg9` | 新增 `DOCS_INVENTORY.md`（8軌文件分類盤點，跟這次 Documentation Sync 性質高度重疊，2026-08-01建立，比這份早一天）＋`MVP_BOUNDARY.md`/`PRD.md`/`PRODUCT_PRINCIPLES.md`/`FILE_RESPONSIBILITY_MAP.md`/`LOCALSTORAGE_SCHEMA.md`/`STATE_RESPONSIBILITY_MAP.md`/`CULTURE_CITATION_AUDIT.md` | **是**——改CLAUDE.md規則19（文法白話規則），2026-08-02修訂放寬術語判準 |
| `claude/content-schema-assessment-d7hony` | 「內容品質軌」延伸`maintenance.js`必填欄位檢查 | 否 |
| `claude/data-dictionary-fields-j44tg0` | 新增 `DATA_DICTIONARY.md`／`CULTURE_CITATION_AUDIT.md`，改grammar.js | 否 |

**這代表兩件事：**

1. **`FEATURE_INVENTORY.md` 確認是「分支未合併」，不是缺失**——已在
   `claude/feature-inventory-system-map-o8aumy` 分支上，符合裁決預期。「UI Bug Fix Inventory」
   沒有找到同名檔案，但 `claude/bug-ui-inventory-repair-rlk906` 這條分支的 commit 內容
   （`clearLS()`/`jumpToPronounLibrary()`修正）本身就對應得上，只是沒有獨立命名的inventory檔案，
   記錄直接寫在commit訊息裡。
2. **clearLS 決策「先維持現況」已經被至少兩個獨立分支各自實作，而且兩者對不齊**：
   `bug-ui-inventory-repair-rlk906` 補5個key，`localstorage-schema-cleanup-ursehf`／
   `storage-versioning-rules-c8m7q6` 只補3個key（都不含`peppa_daily_task_v1`跟
   `peppa_welcome_tour_seen_v1`）。這**不是**Documentation Sync該處理的範圍（是code層面的
   分支協調問題），但既然裁決已經明確「日記保留、不擴大」，兩邊分支的實作方向是一致的，只是
   涵蓋key數量不同，之後合併時需要有人對齊，這裡先記錄下來避免被忽略。

**因此本輪對 CLAUDE.md 本身的修改先暫緩**（原本裁決允許修的「錄音仿說功能」「44篇vs53篇」
「儲水槽42→59」等純CLAUDE.md內容過期項目）——理由：`CLAUDE.md`已經有3條分支平行修改中，
這個branch若現在也動CLAUDE.md，會變成第4條平行修改，之後誰要合併這一批分支時，CLAUDE.md
的衝突只會更難處理。**已執行、不涉及CLAUDE.md、也沒有其他分支touch的項目**：

- ✅ `ROADMAP.md`「113張卡」→「117張卡」（無分支touch，已修）
- ✅ `CHANGELOG.md` 回補 2026-07-20~07-26 停更的一週摘要＋本輪Documentation Sync記錄＋
  上述分支未合併發現（無分支touch，已修）
- ✅ `CONTENT_RULES.md`「首頁三橫標」段落加註過期提醒，指向CLAUDE.md現況章節，不刪除歷史記錄
  （無分支touch，已修）
- ✅ `RECORDING_QUEUE.md` 新增「缺口⑥」登記8句缺真人語音的例句（無分支touch，已修）

**CLAUDE.md 本身待辦（暫緩，等分支協調後再處理）**：原清單1-2（錄音仿說功能）、2-1（44篇/53篇矛盾）、
2-2（儲水槽42→59）、2-7（西語世界殘留字樣）——這四項純屬CLAUDE.md文字內容過期，修改本身沒有
爭議，只是建議等CLAUDE.md的分支合併順序確定後再動手，避免多一份衝突。

**c1/c2 篩選chip（原2-3）** 依裁決不在這輪處理，移出 Documentation Sync 範圍，改列產品/UX待討論。

---

## 0. 找不到的已知來源（先誠實說明，不是漏查）

任務描述提到三個「已知來源」：`FEATURE_INVENTORY.md`、Reality Check、UI Bug Fix Inventory。
查證結果：

- **`FEATURE_INVENTORY.md` 不存在**——repo 根目錄與整個 git 歷史（`git log --diff-filter=A --name-only`）都查無此檔案，
  也沒有任何 commit 建立過它。
- **「UI Bug Fix Inventory」不存在**——同上，找不到任何檔名/內容匹配的檔案。
- **Reality Check**——CLAUDE.md 裡有「Reality Check」這個*規則/流程*（工作流程鐵則第4條、VERA協作模式第2條），
  但沒有一份叫這個名字的獨立盤點文件。

**推測**：這三個來源可能是先前 Product Track / Content Quality Track / UI Bug Fix Track 對話中產生的產物，
但沒有落地成 repo 裡的檔案（可能只存在於當時的對話紀錄裡，或者是用別的檔名/形式交付的）。

**這份 Documentation Sync Inventory 因此改用「現有 9 份 .md 文件 vs 實際程式碼」直接比對**，
沒有辦法比對到那三份來源本身的內容。如果那三份東西其實存在於別處（例如某個 commit 訊息、
某次對話的輸出檔案），麻煩指出實際位置，我可以再補查一輪。

---

## 1. 已知待確認四項——逐一查證結果

### 1-1. 文法卡數字（113 → 117）

| 檔案 | 現況寫法 |
|---|---|
| `grammar.js` `GRAMMAR_DATA`（實際程式碼） | **117 張**（g01～g117，逐一數過 id，無重複無缺號） |
| `CLAUDE.md` | 全文 8 處提到「117張」，數字正確、已同步 |
| `ROADMAP.md` 第18行 | 「💧文法儲水槽：A1-C2 五個等級層，**113 張卡**」——**過期** |
| `CHANGELOG.md` 第255行 | 「💧文法儲水槽擴充到 **113 張卡**」——這是一則歷史紀錄（當時確實是113張），本身沒錯，但後續沒有新條目說明後來又漲到117 |

**結論**：CLAUDE.md 本身已經同步，**ROADMAP.md 是唯一還寫著舊數字「113」的地方，屬於文件過期**。

---

### 1-2. 錄音仿說功能已實作但文件未更新

**實作現況**（已用 git blame 確認上線時間）：
- `index.html:214-215` 有 `🐝 小蜜蜂導師` / `🎙️ 輪到我仿說` 兩顆按鈕
- `script.js:1484-1542` 完整實作 `echoStartRecording()` / `echoPlayRef()` / `echoToggleRecord()`，
  用瀏覽器原生 `MediaRecorder API`，錄音存成本機 Blob URL，跟官方 TTS 前後比對播放
- `git blame` 顯示這段程式碼在 **2026-07-24** 由 commit `9a3ff0c` 加入，已經上線

**文件現況**：`CLAUDE.md` 第768行「🪵 方案A：雙音軌錄放對比」條目仍標注：
> 🔴純記錄評估，VERA說「我自己想要」——先不動工，等她自己想清楚再說

**結論**：**這是文件過期**，功能已於 2026-07-24 實作上線，但 2026-07-17 那則「尚未動工」的記錄從未更新。
建議把這條從「🔴純記錄評估」改成「✅已完成」並補上實際實作位置。

---

### 1-3. clearLS / reset 行為描述

實際查證 `script.js:2503-2516` 的 `clearLS()`（對應按鈕「🌾 重新開墾」）：

```js
function clearLS(){
  if(!confirm('🌱 再來一場大冒險？你確定嗎')) return;
  localStorage.removeItem('peppa_es_v4');
  localStorage.removeItem('peppa_es_vocab_v1');
  localStorage.removeItem('peppa_garden_v1');
  localStorage.removeItem('peppa_garden_watered_v1');
  localStorage.removeItem('peppa_es_grammar_v1');
  localStorage.removeItem('peppa_es_familiarity_v1');
  localStorage.removeItem('dynamic_phrases_db');
  ...
}
```

只清除 **7 個 key**。但 `script.js:2432` 的 `BACKUP_KEYS`（📤打包行囊/📥行囊歸位備份範圍）實際涵蓋 **14 個 key**：

```
peppa_es_v4, peppa_es_vocab_v1, peppa_es_grammar_v1, peppa_es_familiarity_v1,
peppa_garden_v1, peppa_garden_watered_v1, dynamic_phrases_db,
peppa_mom_diary_v1, peppa_mom_notes_v1, peppa_talk_diary_v1,
peppa_milestones_v1, peppa_first_chunk_date_v1, peppa_daily_task_v1, peppa_chunk_fam_seen_v1
```

`clearLS()` **沒有清除**的 7 個：`peppa_mom_diary_v1`（媽媽碎語）、`peppa_mom_notes_v1`（隨心一筆）、
`peppa_talk_diary_v1`（**聊療吾心語**）、`peppa_milestones_v1`（里程碑）、`peppa_first_chunk_date_v1`
（開始使用日期）、`peppa_daily_task_v1`（今日任務狀態）、`peppa_chunk_fam_seen_v1`（家族瀏覽紀錄）。

**文件現況**：CLAUDE.md 第841行只提到「`清除所有學習紀錄`（`clearLS()`）會一併清掉這個新鮮度時間戳」，
這句本身是對的（`peppa_garden_watered_v1` 確實有被清），但**全文找不到任何一處明確說明 clearLS() 只清
「學習進度/花園/彈藥庫」這類遊戲化資料，刻意保留「日記/聊療吾心語/里程碑」這類個人書寫內容**。

**這屬於「待確認」而非直接判定為 bug**——有兩種可能：
1. **是刻意設計**：VERA 的日記/聊療吾心語是「个人書寫」性質，重置練習進度時保留這些內容合理（畢竟按鈕文案
   「🌾重新開墾 · Empezar de nuevo（清除所有紀錄）」講的可能是「學習紀錄」不是「所有 localStorage」）。
2. **是沒補齊的落差**：按鈕標籤寫「清除所有紀錄」，字面上使用者會預期日記也被清掉，若真的想保留日記，
   按鈕文案應該更精準（例如「重置學習進度（保留日記）」），否則使用者可能誤以為日記也被清除、或反過來
   誤以為真的被清掉而心慌。

**結論**：這是「文件缺漏＋措辭可能誤導」的組合，需要 VERA 確認是否為刻意設計，再決定要不要調整
按鈕文案或補一則 CLAUDE.md 說明（本輪不擅自判斷、不擅自修改）。

---

### 1-4. Feature Inventory 發現的其他文件落差

`FEATURE_INVENTORY.md` 本身找不到（見第0節），以下是本輪盤點用「程式碼 vs 現有9份文件」交叉比對，
額外抓到的具體落差，效果上等同於這一項要求的「其他文件落差」：

---

## 2. 本輪盤點額外發現的落差

### 2-1.【CLAUDE.md 內部矛盾】新聞篇數「44篇」vs「53篇」

- **實際程式碼**：`news.js` `NEWS_ITEMS` 目前 **53 篇**（`id:'nw01'`～`'nw53'`，逐一數過）
- CLAUDE.md 第563、1643行：寫「53篇」——**正確**
- CLAUDE.md **第1563、1663行**：寫「news.js現有**44篇**B2新聞」——**過期，跟同一份文件裡其他段落自相矛盾**

**結論**：文件過期，且是同一份文件內部就對不上，不是跟程式碼比對才發現的問題，建議優先修正
（兩處都出現在「🌎拉美巡禮入口」規劃段落，容易誤導未來閱讀者以為篇數縮水過）。

---

### 2-2.【文件過期】💧文法儲水槽剩餘卡數「42張」vs 實際「59張」

CLAUDE.md 2026-07-25「Day2」checkpoint 明確寫：
> 已用Playwright驗證：儲水槽「全部」剩**42張**

實際用 Node.js 載入 `GRAMMAR_DATA`（117張）扣掉 `WORLD_ZONE_MAP.slang`（26張）跟 `.culture`（32張）：

```
total 117
reservoir(remain) 59   ← 不是42
```

**推測原因**：2026-07-25 當時做完 slang/culture 分流後，儲水槽確實剩42張；但**之後（2026-07-26當天）
又有多批新增/調整**（例如「①第一輪擴大：13張卡套用模板」等變動雖然多是改既有卡內容，但期間
grammar.js 總卡數從約100張成長到117張），這些新增的卡片沒有同步被分類進 `WORLD_ZONE_MAP`，
導致落在儲水槽（reservoir）裡的卡片數量比 Day2 記錄的當下多了 17 張，Day2 那則 checkpoint 沒有回頭更新。

**結論**：文件過期。若 59 張裡有應該屬於🗣️街頭母語/🎭文化深度但漏分類的卡片，就是「實作需要調整」
（該補進 `WORLD_ZONE_MAP`）；若這 17 張本來就該留在儲水槽（單純語言規則），就只是數字沒更新，
純文件問題。**這點需要實際看過這17張卡的內容才能判斷屬於哪一種，本輪不擅自分類。**

---

### 2-3.【實作需要調整/待確認】💧文法儲水槽的等級篩選 chip：c1/c2 幾乎是死路

`grammar.js` `GRAMMAR_LEVEL_TIERS`（第2628-2634行）目前有 **5 個等級**：

```js
{key:"a1a2", icon:"🌱", label:"護土嫩芽"},
{key:"b1",   icon:"💧", label:"甘露超頻"},
{key:"b2c1", icon:"🍯", label:"蜂王蜜釀"},
{key:"c1",   icon:"🗣️", label:"街頭母語"},
{key:"c2",   icon:"🎭", label:"文化深度"}
```

但 `renderGrammarSupplement()`（`script.js:3125`）在套用等級篩選**之前**，已經先用
`!_isWorldZoned(g.id)` 把所有屬於 `WORLD_ZONE_MAP.slang`/`.culture` 的卡片排除在候選池外
（這是2026-07-25拉美巡禮分流時特意做的，避免同一張卡兩處都看得到）。

實際跑數字：

```
level:'c1' 的卡共13張，其中11張已經被 WORLD_ZONE_MAP 排除，剩下能顯示的只有2張（g87, g88）
level:'c2' 的卡共15張，全部15張都已經被 WORLD_ZONE_MAP 排除 → 顯示"這個分類目前沒有符合的卡片"（100%空的）
```

也就是說：💧文法儲水槽裡的「🗣️街頭母語」篩選 chip 點下去只會看到2張孤兒卡（跟真正的26張街頭母語內容
對不上），「🎭文化深度」篩選 chip 點下去**保證是空的**。這兩顆 chip 看起來像正常的篩選功能，但因為
`WORLD_ZONE_MAP` 分流機制上線後沒有人回頭清理 `GRAMMAR_LEVEL_TIERS` 裡重複的 c1/c2 分類，變成一個
「看起來能點、點了會困惑」的介面死角。

連帶影響：CLAUDE.md「🗺️莊園地圖」章節第1538行「🧭探索路線」那格寫「程度分流（依a1a2/b1/b2c1/c1挑路線）」
只列了4個等級，實際 `GRAMMAR_LEVEL_TIERS` 有5個（漏了c2），這行本身也需要更新。

**結論**：這是**實作需要調整**的項目（c1/c2 這兩個等級標籤是 WORLD_ZONE_MAP 分流上線前的舊分類法，
分流後變成技術債，該移除或重新設計，不是文件寫錯字的問題）。是否移除/怎麼處理需要 VERA 確認，
本輪只記錄現象、不擅自刪改。

---

### 2-4.【實作需要調整/待確認】2026-07-26 examples 替換批次，新句子沒有接上文法儲水槽的真人語音

CLAUDE.md 第659-660行「8張高頻卡examples真實語料補接」記錄 2026-07-26 把 g01/g02/g03/g08/g09/g13/g30/g32/g117
的例句換成真實劇情句（例如 g08 換成 E20 的「A Nita le gusta el helado.」等）。

但 `audio-manifest.js` 的 `GRAM_AUDIO_MAP`（`script.js` 的 `speakGramSmart()` 用來查表播真人音檔的地方，
查不到就 fallback 瀏覽器TTS）**逐一比對後確認完全沒有這些新句子的鍵值**：

| 卡片 | 新換上的句子 | GRAM_AUDIO_MAP 是否有對應 |
|---|---|---|
| g08 | `A Nita le gusta el helado.` | ❌ 沒有 |
| g08 | `A Tito le encanta su carrito rojo.` | ❌ 沒有 |
| g08 | `A Tito no le gusta el ruido fuerte.` | ❌ 沒有 |
| g01 | `Soy Nita.` | ❌ 沒有 |
| g01 | `Soy el hermano mayor de Nita.` | ❌ 沒有 |
| g02 | `Tito está esperando su turno para jugar.` | ❌ 沒有 |
| g30 | `Papá Tato dice: "Los recordamos porque los queremos."` | ❌ 沒有 |
| g32 | `El amor no se muere, pero sí cambia de forma.` / `Nita chapotea en los charcos, pero la ropa se moja.` | ❌ 沒有 |
| g117 | `Me llamo Nita.` | ✅ 有（`audio/gram/story_scene0_01.mp3`） |
| g13 | `Creo que tienes el corazón un poco flojo.` | ✅ 有（`audio/gram/g13_ex1.mp3`） |

（`RECORDING_QUEUE.md` 最後一次更新是 2026-07-19，早於這批 2026-07-26 的例句替換，所以這批缺口
本來就不可能被那份清單記錄到——不是那份清單漏做，是時間序上它還沒發生。）

**結論**：符合 CLAUDE.md 工作守則第28條「任何內容新增/修改後，固定跑一次音檔檢查鏈」的漏網案例——
這批 2026-07-26 的 examples 替換，改動當下沒有跑完整條音檔檢查鏈（內容變了但沒補音檔，即使多數
句子其實本來就是「劇情裡已經錄過音」的真句，只是 `GRAM_AUDIO_MAP` 這張表沒有另外收錄）。
使用者點這幾句的「聽整句」會 fallback 成瀏覽器TTS，跟「儲水槽全部真人音檔」的既有敘述不符。
**這是實作需要調整**（八句裡有八句缺，只有兩句因為沿用已存在的其他錄音而有效）。

---

### 2-5.【文件過期，範圍較大】`CHANGELOG.md` 內容全部停在 2026-07-19，缺一整週的記錄

`CHANGELOG.md` 開頭寫「從 2026-07-19 開始記錄」，但檢查全部 25 則條目，**日期全部是 2026-07-19 當天**
（`grep "^## 2026-07-2[0-9]"` 完全沒有 20 號以後的條目）。git 顯示這個檔案最後一次被改動是
2026-07-24（跟前面「錄音仿說功能」上線同一個 commit），但那次改動顯然沒有真的加新的一則條目。

而 CLAUDE.md 裡從 2026-07-20 到 2026-07-26 之間有大量已完成的工作（Sprint E、Stage 1/2/3 收斂、
E17-E20 第一站、13張卡模板套用、🌎拉美巡禮更名與分流、g13等真bug修正……），這整整一週的變動
**完全沒有反映在 CHANGELOG.md 裡**。

**結論**：文件過期，範圍是「整個檔案停更一週」，不是單一數字錯誤。是否需要回補要看 CHANGELOG.md
在專案裡實際扮演的角色（如果只是給人類讀者看的摘要、CLAUDE.md 才是真正的權威記錄，那可能是
「刻意先擱置」而非疏漏；如果 CHANGELOG.md 是對外/對協作者的主要索引，就需要回補）。

---

### 2-6.【文件過期，範圍較大】`CONTENT_RULES.md` 全部停在 2026-07-19，header 設計描述已被取代

`CONTENT_RULES.md` 全部 15 個章節標題都標注「2026-07-19」，其中「🧭 全站入口盤點」章節（第95-129行）
描述的是**三顆按鈕**的首頁 header（🌱點播初芽/🌿我的成長 動態切換 ＋ ☀️今日耕耘 ＋ 🗺️莊園導覽）。

實際 `index.html:28-35` 現在的 header 是 **6 顆按鈕**的 grid 版面：
🧭探索路線／🗺️莊園導覽／🎁入園巧遇／`#headerStartSlot`(動態🌱/🌿)／🧰莊園工具／🌎拉美巡禮。

對照差異：
- CONTENT_RULES.md 提到的「☀️今日耕耘」作為獨立 header 按鈕**已經不存在**（現在是靠🎁入園巧遇跳轉，
  或用 `ENTRY_MATRIX_ITEMS` 常駐在任務卡片底部，不是 header 按鈕）
- CONTENT_RULES.md 完全沒提到「🧭探索路線」「🧰莊園工具」「🌎拉美巡禮/西語世界」這三個現在存在的入口
- CLAUDE.md 裡則有正確、對應到現況的「🗺️莊園地圖」章節（六個Header入口定位表，2026-07-24定案），
  跟 CONTENT_RULES.md 的舊描述沒有互相參照/更新

**結論**：文件過期。這是 header 經過至少兩輪重新設計後（三橫標 → 六宮格），CONTENT_RULES.md 停在
第一輪設計，沒跟著更新到第二輪。CLAUDE.md 本身是同步的，只是 CONTENT_RULES.md 沒跟上。

---

### 2-7.【低優先／措辭殘留】UI文字裡仍有舊名稱字樣

`script.js:2714`（`openWorldEntryPanel()` 裡 🎭文化深度的副標文字）：
```
探索西語世界背後的歷史、社會與文化脈絡
```
`🌎西語世界` 已於 2026-07-26 正式更名為 `🌎拉美巡禮`（index.html 按鈕、CLAUDE.md 皆已同步），但這句
UI 文案裡仍留著「西語世界」字樣。這裡的「西語世界」比較像泛稱（Spanish-speaking world），不是直接
指涉舊功能名稱，語意上勉強說得通，但容易讓人誤以為改名沒改乾淨。

同一函式正上方的程式碼註解（`script.js:2684-2685`）也還寫著「文化探索/語言觀察兩項目前故意
disabled+建置中」——但實際上這兩個入口（現在叫「街頭母語」「文化深度」）**已經不是 disabled**，
`worldEntryJumpSlang()` / `worldEntryJumpCulture()` 都已經正常可點擊跳轉。這是**程式碼註解**過期，
不是文件過期，但一樣會誤導之後接手的人，所以一併記錄在這裡。

**結論**：低優先級的措辭/註解殘留，不影響功能，建議之後小修一併處理即可，不急。

---

## 3. 分類彙總表

| # | 項目 | 分類 | 嚴重度 |
|---|---|---|---|
| 1-1 | ROADMAP.md「113張卡」 | 📄 文件過期 | 低（純數字） |
| 1-2 | 錄音仿說「尚未動工」敘述 | 📄 文件過期 | 中（會誤導未來協作者重複規劃已完成的功能） |
| 1-3 | clearLS 不清除日記/里程碑，按鈕文案「清除所有紀錄」可能誤導 | ⚠️ 待VERA確認 | 中（涉及使用者資料预期，需要VERA裁決是否為刻意設計） |
| 2-1 | CLAUDE.md 自己「44篇」vs「53篇」互相矛盾 | 📄 文件過期 | 低（同文件內部矛盾，易修） |
| 2-2 | 儲水槽「42張」vs 實際59張 | 📄 文件過期（不排除牽出 2-3 的分類遺漏） | 中 |
| 2-3 | GRAMMAR_LEVEL_TIERS c1/c2 篩選chip變成死路/幾乎死路 | 🔧 實作需要調整 | 中（使用者體感是「功能壞掉」） |
| 2-4 | 2026-07-26 examples批次新句子缺真人語音 | 🔧 實作需要調整 | 中（違反已定案的工作守則第28條音檔檢查鏈） |
| 2-5 | CHANGELOG.md 停更一週 | 📄 文件過期（範圍大） | 待確認優先度（要看這份文件的實際用途） |
| 2-6 | CONTENT_RULES.md header描述停在舊版三按鈕設計 | 📄 文件過期（範圍大） | 中（新協作者容易依照舊描述做錯判斷） |
| 2-7 | script.js 殘留「西語世界」字樣＋過期程式碼註解 | 📄 文件過期（低優先） | 低 |

---

## 4. 目前狀態總覽（2026-08-02 更新，取代原本的「建議下一步」猜測性排序）

以下狀態已反映「決策與後續處理記錄」章節的裁決結果，不用再回頭看第2節每條的「建議」字樣
（那些是裁決前寫的，內容分析仍有效，但優先序建議已被下面取代）：

| # | 項目 | 狀態 |
|---|---|---|
| 1-1 | ROADMAP.md 113→117 | ✅ 已修（見決策記錄） |
| 1-2 | 錄音仿說「尚未動工」敘述（CLAUDE.md） | 🧊 CLAUDE.md凍結中，暫緩 |
| 1-3 | clearLS 不清除日記/里程碑 | ⏸ 裁決維持現況；程式碼層面已有分支各自實作但未對齊，見決策記錄 |
| 2-1 | CLAUDE.md「44篇」vs「53篇」矛盾 | 🧊 CLAUDE.md凍結中，暫緩 |
| 2-2 | 儲水槽「42張」vs 實際59張（CLAUDE.md） | 🧊 CLAUDE.md凍結中，暫緩 |
| 2-3 | c1/c2 篩選chip死路（grammar.js/script.js） | ⏸ 裁決移出Documentation Sync範圍，另開UX/產品討論 |
| 2-4 | 2026-07-26 examples批次缺真人語音 | ✅ 已登記進 `RECORDING_QUEUE.md`「缺口⑥」，尚未實際補錄音 |
| 2-5 | CHANGELOG.md 停更一週 | ✅ 已回補摘要 |
| 2-6 | CONTENT_RULES.md header描述過期 | ✅ 已加註過期提醒 |
| 2-7 | script.js 殘留「西語世界」字樣＋過期註解 | ⏸ 屬於程式碼/UI範圍，不在Documentation Sync處理，留給下一個UI/code track |

**CLAUDE.md 相關項目（1-2、2-1、2-2）現在的唯一狀態就是「凍結中」**，不需要再個別排優先序，
等 🧊 凍結解除（分支合併順序確定）後一次處理，見文件最上方的凍結公告。
