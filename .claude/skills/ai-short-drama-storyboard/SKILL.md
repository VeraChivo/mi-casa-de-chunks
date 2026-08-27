---
name: ai-short-drama-storyboard
description: Use when converting a finished short-form or vertical drama script into shot lists, storyboards, video-model prompts, clip-cut plans, or when reviewing and revising existing shot breakdowns and video prompts.
---

# AI 短劇分鏡與影片提示詞

## 核心原則

把已定稿的劇本轉成可執行的拍攝或生成指令。**不改劇情**：台詞、事件、角色與情緒落點以劇本為準，發現問題只回報，不自行改寫。預設使用繁體中文。

## 判斷任務

- 完整交付：讀取 `references/workflow.md`，先確認製作限制，再分階段產出。
- 只要分鏡表：讀取 `references/shotlist.md`。
- 只要影片模型提示詞：讀取 `references/prompting.md`。
- 剪輯交付（完整片與短片切點）：讀取 `references/workflow.md` 第 6 階段。
- 審閱或修改既有分鏡／提示詞：讀取 `references/checklists.md`。

## 共同規則

- 沒有劇本就不開始分鏡；只有大綱時先說明缺口，不自行補寫場次與台詞。
- 一個鏡頭承載一個可見動作或一次資訊改變，不把整場塞進一鏡。
- 保留使用者指定的比例、時長、平台、預算、場景數與角色數。
- 豎屏時把關鍵人物、動作與畫面文字放在中央可辨識範圍，不依賴畫面邊緣。
- 台詞長度用實際唸過一次的秒數估算，不用字數硬換算成秒數。
- **影片模型的參數名稱、語法與能力必須先查證再寫**，不得憑記憶輸出模型專屬參數；查不到就只交付模型無關的鏡頭規格，並說明原因。
- 角色外觀、服裝、場景陳設一旦設定就跨鏡沿用，變動要寫明原因。
- 世界觀限制（角色設定、用語規則、隱私或分級要求）由使用者提供，一律照做，不自行放寬。

## 輸出契約

分鏡任務：必要假設、分鏡表、必要時附鏡頭意圖說明。

提示詞任務：每鏡一則提示詞、共用的一致性設定、以及模型語法的查證狀態。

剪輯任務：完整片結構，加上每支短片的切點、獨立看懂所需的最小資訊與收尾。

審閱任務：依影響程度排序的問題、對應鏡號的證據、可執行修正。
