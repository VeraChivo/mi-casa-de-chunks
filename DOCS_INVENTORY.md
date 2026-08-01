# 文件分類盤點（DOCS_INVENTORY.md）

> 目的：不開發、不搬移任何內容，先把現有文件對照到 8 軌分類，看清楚「現在誰負責什麼」，
> 找出重複與缺口。這是分類盤點的產出，不是執行計畫——搬不搬、怎麼搬，留給下一步再決定。

## 8 軌分類（2026-08-01 定案版本，配合純 Vanilla JS／零後端現況修正）

```
01 🌿 MASTER       莊園核心理念／世界觀／長期方向／決策紀錄
02 📋 PRD          使用者需求／功能清單／MVP範圍／使用流程
03 🎨 UX/UI        頁面結構／CSS規範／靜態互動／使用體驗
04 🤖 AI 系統      AI角色／Prompt／語塊邏輯／對話流程／發音功能設計
05 🧩 Vanilla Frontend   HTML／CSS／Vanilla JS／DOM架構／資料流
06 📦 Data & Storage     localStorage／JSON資料結構／使用者資料模型
07 🔐 Quality & Maintenance   程式品質／命名規範／檔案整理／測試方式／安全
08 📚 Docs         README／開發手冊／功能說明／CHANGELOG
```

## 現有檔案 → 8軌對照

| 檔案 | 主要歸屬 | 次要歸屬 | 備註 |
|---|---|---|---|
| `PRODUCT_PRINCIPLES.md` | 01 MASTER | — | 剛建立，唯一乾淨對到單一軌的檔案 |
| `CLAUDE.md`（389KB） | **跨全部8軌** | — | 見下方「核心問題」 |
| `ROADMAP.md` | 02 PRD | 04 AI／06 Data | 已完成／進行中／之後可以考慮／明確不做，四大類都是功能規劃性質 |
| `CONTENT_RULES.md` | 07 Quality | 03 UX／06 Data | 內容規範種子文件，混了開工流程規則(07)、收合策略/字級下限(03)、單一資料來源/資料責任分離(06) |
| `CHANGELOG.md` | 08 Docs | — | 逐日修正記錄，橫跨所有軌但性質是「log」不是「spec」 |
| `ACCEPTANCE_CHECKLIST.md` | 07 Quality | — | 功能驗收表，跟CONTENT_RULES.md開頭三問有重疊 |
| `SONGS.md` | 02 PRD | 04 AI | 歌曲收錄標準/候選歌單是內容規劃，Chunk驅動候選池邏輯偏AI/教學設計 |
| `UX_ISSUES.md` | 03 UX/UI | — | 巡園紀錄，待處理/已收斂，對到單一軌算乾淨 |
| `RECORDING_QUEUE.md` | 07 Quality | 06 Data | 錄音缺口追蹤，屬於內容完整性的品管清單 |
| `README.md` | 08 Docs | — | 目前幾乎是空的（只有標題一行） |
| `.js`/`.css`/`.html` 原始碼 | 05 Vanilla Frontend | 06 Data | script.js/episodes.js/grammar.js等資料檔本身就是05+06的實作 |

## 核心問題：CLAUDE.md 一份檔案同時扮演 8 個角色

CLAUDE.md 目前內部大致長這樣（依你我先前討論的順序）：

- **01 MASTER**：Mi Pequeña Casa 設計哲學（十大鐵則／黑白黃名單）、教學哲學、開發野史
- **02 PRD**：功能清單、莊園地圖、CEFR課綱對照表
- **03 UX/UI**：命名與版式規則、手機優先規範、莊園工具間草稿
- **04 AI**：（目前最薄弱，只有零散的AI教練「陪伴不是督促」方向，沒有具體prompt/人格規格）
- **05/06**：專案基本資訊、檔案結構、核心CSS變數、localStorage key備註
- **07 Quality**：工作流程鐵則、Git推送節奏規則、VERA協作模式、系統性重要備註
- **08 Docs**：整份文件本身就是最大的一本手冊

而且 CLAUDE.md 裡的「已知待修問題」／「待處理」兩個巨大區塊，**跟獨立的 `ROADMAP.md`／`CHANGELOG.md`／`UX_ISSUES.md`／`RECORDING_QUEUE.md` 四份檔案在做同一件事**（追蹤完成/進行中/待辦），只是一份寫在CLAUDE.md裡、一份寫在專屬檔案裡——這是目前最明顯的重複，之後真的要拆檔案時，這裡會是第一個要處理的重疊。

**這輪盤點不建議現在就拆**，只先標出來，避免之後誤判成「CLAUDE.md資訊不夠」而重複造一份。

## 缺口盤點（依你先前提供的三級分類，修正成符合 Vanilla JS／零後端現況）

### 🔴 一級（影響開發，但要先確認「要不要做」再排優先序）
- **localStorage 資料schema總覽**：目前每個功能各自在CLAUDE.md裡提到自己的key（`peppa_es_v4`／`peppa_garden_v1`／`peppa_talk_diary_v1`等），沒有一份集中列出所有key、各自存什麼結構的文件
- **檔案職責說明**：CLAUDE.md「檔案結構」小節只列了檔名，沒有講每個.js檔案的職責邊界（例如script.js跟stages.js的分工原則）
- **State Flow（畫面狀態流轉）**：沒有集中文件描述分頁切換/彈窗history處理這類跨檔案的狀態邏輯（目前散落在「系統性重要備註」的手機返回鍵那條）
- **AI Memory／Prompt Architecture**：完全空白，因為AI教練功能還沒做（PRODUCT_PRINCIPLES.md已列為開放問題，不是這輪要補的）

### 🟡 二級（Beta前，需要先問要不要做）
- Onboarding：**已有**（🗺️莊園導覽 WELCOME_TOUR_STEPS）
- Notification：**已有**（🔔每日提醒通知）
- Empty State：**部分有**（多處「還沒有任何足跡」類告示牌文案，沒有統一規範）
- Error Handling／Loading狀態／Settings：**沒看到集中規範**

### 🟢 三級（正式版，且可能跟現有哲學衝突，需要先判斷要不要做）
- SEO／後台Dashboard／Analytics／A/B Testing／管理員系統／多語系：**目前都不存在**
- ⚠️ 這幾項如果要做，要先過 `PRODUCT_PRINCIPLES.md` 原則09（技術棧本身就是產品哲學）跟原則10（不過度照顧使用者）——不是自動預設要補，要先確認符不符合莊園精神

## 這輪盤點沒有做的事（刻意不做，避免變成開發）

- 沒有搬動/複製 CLAUDE.md 任何一段內容
- 沒有建立 PRD／UX／AI／Frontend 等其他7份文件的實際內容
- 沒有處理 CLAUDE.md 與 ROADMAP/CHANGELOG/UX_ISSUES/RECORDING_QUEUE 的重複問題
- 沒有回答任何「要不要做」的缺口問題——那些是產品決策，留給你

## 建議的下一步（等你確認，不自動執行）

1. 先確認 8 軌分類本身有沒有問題（例如 SONGS.md 這種橫跨PRD/AI的檔案，要不要拆）
2. 決定 CLAUDE.md 內部的「已知待修問題／待處理」要不要跟四份獨立追蹤檔案合併，還是維持現狀分開
3. 決定 🔴一級缺口裡，哪些現在就要開始整理成文件（例如「localStorage資料schema」相對獨立、風險低，可以先做）

---
*首次建立：2026-08-01，純分類盤點，不涉及任何內容搬移或新增規則。*
