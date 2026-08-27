# 這個 skill 的來源

- 上游：https://github.com/POUND0423/AI-drama-pound （v0.1.0，commit `d3724f7`，2026-08-26）
- 授權：MIT（見同資料夾 `LICENSE`，著作權 © 2026 POUND0423）
- 原始格式：OpenAI Codex standalone skill，安裝路徑 `$HOME/.agents/skills/`

## 轉成 Claude Code skill 時做了什麼

只做搬運，**沒有改任何一個字的內容**：

- `SKILL.md`、`references/`（workflow / format / checklists）原樣複製
- 沒有帶進來 `agents/openai.yaml`——那是 Codex 專用的介面設定（display_name／
  default_prompt／allow_implicit_invocation），Claude Code 不讀這個檔
- 補了 `LICENSE` 與這份 `UPSTREAM.md`（MIT 要求保留著作權聲明）

frontmatter 兩邊本來就相容（都是 `name` + `description`，且 name 與資料夾同名），
所以不用改寫。

## 維護原則

這是**外部上游的內容**，不是本站自己寫的規則。要改內容前先想清楚：

- 上游更新想同步 → 重新複製 `skill-src/ai-short-drama-screenwriter/` 覆蓋即可，
  但會蓋掉任何本地修改，所以盡量不要就地改它
- 想加本站專屬的東西（貓家族世界觀、辛辣線隱私規則、SEL 情緒角色設定）→
  **另外開一個本站自己的 skill 或 reference 檔**，不要混進上游檔案裡，
  不然之後分不出哪些是上游的、哪些是我們加的

## 已知邊界（決定要不要做短片時很重要）

這個 skill **只寫劇本**，明確拒絕輸出逐鏡分鏡、景別、運鏡與 AI 影片模型提示詞
（見 `SKILL.md` 共同規則最後幾條）。上游 README 也講明「本倉庫不包含分鏡或影片
提示詞技能」。所以「劇本 → 可生成的短片」中間那段目前是空的，需要另外補。
