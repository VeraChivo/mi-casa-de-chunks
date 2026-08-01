# File Responsibility Map（檔案責任分界文件）

> 不是工程文件，是「責任分界文件」——回答每個檔案在莊園系統裡負責維護哪一種
> 產品資產。不改程式、不搬檔案、不拆 script.js，純盤點。分類依據來自實際檢查
> （行數／函式數量／localStorage 讀寫位置／`index.html` 載入順序），不是猜測。

## 盤點方法（供之後複查對照）

```
行數：            wc -l *.js
函式密度：        grep -c "^function " *.js
localStorage 讀寫位置：  grep -rln "localStorage" *.js
載入順序：        index.html 的 <script src> 順序
```

**關鍵發現**：`index.html` 的載入順序是「資料檔案（episodes/audio-manifest/ammo/
cognates/grammar/stages/mom/diary/corazon/news）→ script.js（最後）」，這個順序
本身就反映了架構意圖：**資料先於邏輯載入，script.js 是依賴全部資料檔的控制器**，
不是巧合。

## 分類表

| 檔案 | 行數 | 目前責任 | MVP關聯 | 問題 |
|---|---|---|---|---|
| `episodes.js` | 1527 | 劇情資料（0個function，純陣列） | 核心 | 無 |
| `grammar.js` | 2785 | 文法卡資料（1個function，其餘皆資料） | 核心 | 無 |
| `ammo.js` | 1386 | 語塊彈藥庫資料（0個function） | 核心 | 無 |
| `audio-manifest.js` | 1912 | 音檔路徑對照表（0個function） | 核心（品質前提） | 無 |
| `cognates.js` | 772 | 同源詞/假朋友資料（1個function） | 支援 | 無 |
| `mom.js` | 187 | 媽媽區語塊資料（2個function） | 支援 | 無 |
| `corazon.js` | 115 | 心田深耕語塊資料（1個function） | 支援 | 無 |
| `news.js` | 449 | B2新聞資料（0個function，純資料） | 支援 | 無 |
| `stages.js` | 540 | Stage1/2/3練習引擎（27個function，自帶render/狀態） | 核心 | 自成一個小型子系統，未來若要拆分可獨立 |
| `diary.js` | 979 | 日記功能全套（79個function，自帶render/狀態/localStorage） | 核心 | 已是責任邊界最清楚的「自治模組」，值得當範本 |
| `maintenance.js` | 396 | 內容健康檢查腳本（10個function，讀localStorage做檢查用） | 支援 | 需補「規則來源」——目前檢查邏輯直接寫死，沒有文件對照CONTENT_RULES.md哪一條 |
| `script.js` | 5265 | render＋狀態管理＋事件處理＋localStorage讀寫（303個function，39個render*函式，管理24個peppa_*key） | 核心 | **責任過重（見下方混合責任說明）** |
| `index.html` | — | 純HTML結構（無inline CSS/JS，依專案基本資訊定案） | 核心 | 無 |
| `style.css` | — | 全站樣式＋:root CSS變數 | 核心 | 無 |
| `sw.js` | 20 | Service Worker（安裝到主畫面/推播通知支援） | 支援 | 無 |
| `manifest.json` | 15 | PWA manifest | 支援 | 無 |

## ① 核心責任（Core Owner）

**`episodes.js` / `grammar.js` / `ammo.js` / `audio-manifest.js`**——四個純資料
檔案，0-1 個 function，職責單一（只放教學內容/音檔路徑，不放 UI 邏輯、不放
學習規則），是 MVP 核心（劇情線/文法系統/語塊系統）的資料層，符合工作守則的
既有設計原則（一句話：**這四個檔案「不可以」變成有邏輯的檔案**）。

**`diary.js`**——雖然自帶 79 個 function（含 render/state/localStorage），但是
一個**責任邊界清楚的自治模組**：只管日記功能（Vivencias de mamá／聊療吾心語），
自己的 localStorage key（`peppa_mom_diary_v1`／`peppa_talk_diary_v1`等）不跟
script.js 管理的 24 個 key 混用。這種「自治模組」模式值得當作**未來 script.js
拆分的參考範本**（見下方混合責任建議）。

**`stages.js`**——同理，Stage1/2/3 練習引擎（🌾莊園巡禮精釀程序）自成一個小型
子系統，27 個 function 都圍繞「巡田拾語/入桶陳韻/琥珀熟成」這一件事。

## ② 支援責任（Support）

**`maintenance.js`**——品質檢查腳本，職責是「驗證上面核心資料檔有沒有斷鏈/
格式錯誤」，不是內容來源本身。**問題**：檢查規則目前寫死在程式碼裡，沒有指回
`CONTENT_RULES.md` 的對應條文，之後如果 CONTENT_RULES.md 改了規則，
maintenance.js 不會自動跟著更新，需要人工同步。

**`cognates.js` / `mom.js` / `corazon.js` / `news.js`**——皆為資料檔但屬於
「延伸探索」而非「主線學習」（見莊園地圖分類），函式數量趨近於零，職責單一，
沒有發現問題。

**`sw.js` / `manifest.json`**——PWA 基礎設施，職責單一（安裝到主畫面/推播），
沒有發現問題。

## ③ 混合責任（Mixed / Refactor Candidate）

**`script.js`（5265 行，303 個 function）是這份盤點裡唯一的「混合責任」檔案**，
證據：

- 39 個 `render*` 函式（畫面渲染）
- 直接讀寫 24 個不同的 `peppa_*` localStorage key（狀態管理）
- 9 處 `addEventListener`（事件處理）
- 同時包含：分頁切換、彈窗開合、TTS 播放、造句核對、花園熟練度計算、每日
  提醒排程、備份匯出匯入……幾乎全站除了「日記」與「Stage練習」以外的邏輯
  都在這裡

**這輪只標記，不拆**——依你的指示，這一步不做重構決定，只留下證據供之後
`localStorage Schema` 與 `Engineering 文件補齊`階段參考。**唯一值得先記錄的
觀察**：`diary.js`／`stages.js` 已經示範了「自治模組」是可行的分割方式（自己的
render + 自己的 localStorage key + 不跟 script.js 的全域狀態糾纏），如果未來
真的要拆 script.js，這兩個檔案就是現成的參考模式，不用重新發明拆法。

## ④ 歷史遺留（Legacy / Review）

**這輪盤點沒有找到需要移入 archive 的檔案**——`yigu.html`／
`yigu-sentences.html`（Yigú構音/句子練習頁面）雖然跟主站完全獨立，但 CLAUDE.md
明確記錄它們是「刻意」獨立的功能（等治療師提供正式教材），不算遺留；
`spanish-songs/`（卡珊歌曲庫子專案）同樣是刻意獨立的子專案，不是廢棄物。
**唯一列入「需確認」的是 localStorage key 版本殘留**：`peppa_es_v1`／
`peppa_es_v2`／`peppa_es_v3` 三個舊版 key 名稱出現在 script.js 裡（跟現役的
`peppa_es_v4` 並列），需要在下一步 `localStorage Schema` 階段確認這三個是否
還在被讀取（例如舊版資料遷移邏輯）還是純粹的死程式碼——**這輪不判定，留給
下一步**，因為判斷需要追蹤程式碼實際呼叫路徑，屬於 Schema 階段的工作範圍。

---

## 下一步

```
✅ PRODUCT_PRINCIPLES
✅ DOCS_INVENTORY
✅ PRD
✅ MVP_BOUNDARY
✅ FILE_RESPONSIBILITY_MAP（本文件）
⬇
▶ localStorage Schema（下一步——現在知道哪些檔案負責寫入 localStorage
  ［script.js 24個key／diary.js 5個key］，可以逐一列出每個 key 存什麼結構）
⬇
▶ Engineering 文件補齊
```

---
*首次建立：2026-08-01，分類依據為實際程式碼檢查（行數/函式數/localStorage
讀寫位置/載入順序），非猜測。*
