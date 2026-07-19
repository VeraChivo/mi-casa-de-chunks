# 🎵 歌曲收錄資料庫

不是網站的一部分，是內容維護用的追蹤文件——避免每次找歌詞填空素材都要重新搜尋一輪。
之後任何人（VERA、Claude、未來協助維護的人）要找歌/查歌/收歌，先看這份文件。

---

## ✅ 收錄標準（5條，全部符合才收）

1. **難度**：標明 A0/A1/A2/B1/B2/C1 其中一個等級（對應 `LYRICS_FILL_DATA` 的 `level` 欄位）
2. **官方來源**：官方 YouTube MV／官方 Audio／官方頻道，避免之後連結失效
3. **有可驗證歌詞**：官方字幕／官方歌詞影片／官方網站，比對得到才收
4. **能找到明確秒數**：⚠️ **重要限制**——Claude 沒有播放影片的能力，無法自己核對「歌詞出現在第幾秒」，這件事只有 VERA 親自點開聽過才能確認。之後任何連結附的秒數，一律要是 VERA 自己核對過的，或是有官方字幕檔（含時間碼）可查證的，不能是 AI 自己猜/編的
5. **適合教學**：句型重複、有明確Chunk、含常用文法點——不是每首好歌都適合拿來做填空

**查證方法沿用本站已定案的「三項規則」**（2026-07-18 定案）：①標題可搜尋到 ②原網址可開啟 ③內容與標題一致，三項缺一就不收。

---

## 📊 已收錄歌曲（25首，見 script.js `LYRICS_FILL_DATA`）

| ID | 歌手 | 歌曲 | 等級 | Chunk重點 | 秒數 | 狀態 |
|---|---|---|---|---|---|---|
| lf01 | Juanes | A Dios Le Pido | B1 | pedir que + 虛擬式 | 46s | 🌾已收錄 |
| lf02 | Juan Luis Guerra | Ojalá Que Llueva Café | B1 | ojalá que | 30s | 🌾已收錄 |
| lf03 | Beyoncé ft. Alejandro Fernández | Si Yo Fuera Un Chico | B2 | si + 過去虛擬式 | 20s | 🌾已收錄 |
| lf04 | Julieta Venegas | Limón y Sal | B1 | si por mí fuera | 52s | 🌾已收錄 |
| lf05 | Tradicional | Los Pollitos Dicen | A0 | tener 第三人稱複數 | （搜尋連結） | 🌾已收錄 |
| lf06 | Toy Cantando | Arroz con Leche | A0 | querer 第一人稱 | 6s | 🌾已收錄 |
| lf07 | El Reino Infantil | Estrellita ¿Dónde Estás? | A0 | dónde疑問詞 | 27s | 🌾已收錄 |
| lf08 | Tradicional | La Araña Pequeñita | A0 | subir簡單過去式 | （搜尋連結） | 🌾已收錄 |
| lf09 | Tradicional | De Colores | A1 | vestirse反身動詞 | （搜尋連結） | 🌾已收錄 |
| lf10 | Tradicional | A la Víbora de la Mar | A0 | correr第三人稱複數 | （搜尋連結） | 🌾已收錄 |
| lf11 | Tradicional | Un Elefante se Balanceaba | A1 | balancearse過去未完成式 | （搜尋連結） | 🌾已收錄 |
| lf12 | Tradicional | Cucú Cantaba la Rana | A1 | 陰性名詞 | 70s | 🌾已收錄 |
| lf13 | Toy Cantando | Que Llueva, Que Llueva | A1 | estar表位置 | （點開聽） | 🌾已收錄 |
| lf14 | El Reino Infantil | Las Ruedas del Autobús | A0 | 陰性複數名詞 | （點開聽） | 🌾已收錄 |
| lf15 | El Reino Infantil | El Viejo MacDonald Tenía una Granja | A1 | tener過去未完成式 | （點開聽） | 🌾已收錄 |
| lf16 | Jarabe de Palo | Agua | B1 | tener sed | （點開聽） | 🌾已收錄 |
| lf17 | Becky G ft. Bad Bunny | Mayores | B1 | 關係子句que+陳述式 | （點開聽） | 🌾已收錄 |
| lf18 | Calle 13 | Latinoamérica | B2 | 抽象詞彙sobra | （點開聽） | 🌾已收錄 |
| lf19 | Calle 13 | Latinoamérica | B2 | poder+原形動詞 | （點開聽） | 🌾已收錄 |
| lf20 | Calle 13 | Latinoamérica | B2 | valer la pena成語 | （點開聽） | 🌾已收錄 |
| lf21 | Violeta Parra | Gracias a la Vida | B2 | haber+過去分詞 | （點開聽） | 🌾已收錄 |
| lf22 | Julio Numhauser / Mercedes Sosa | Todo Cambia | B2 | profundo抽象形容詞 | （點開聽） | 🌾已收錄 |
| lf23 | Julio Numhauser / Mercedes Sosa | Todo Cambia | B2 | modo de pensar片語 | （點開聽） | 🌾已收錄 |
| lf24 | Silvio Rodríguez | Ojalá | B2 | ojalá+虛擬式 | （點開聽） | 🌾已收錄 |
| lf25 | Silvio Rodríguez | Ojalá | B2 | dejar de+原形動詞 | （點開聽） | 🌾已收錄 |

**現況盤點**：A0×7、A1×6、B1×5、B2×7，**A2完全空白**（詳見下方缺口分析）。Calle 13《Latinoamérica》已用滿4句版權上限（lf18-20），不要再從這首歌加句子。

---

## ⬜ A2 缺口分析（2026-07-19，尚未動工找歌）

不只是「補一首A2歌」的數量問題——A2 主要是生活場景，應該優先找涵蓋這些主題的歌，而不是隨便一首A2難度的情歌：

- 👨‍👩‍👧 日常生活
- ❤️ 情緒
- 🍽️ 食物
- 🚶 出門
- 🎉 聚會
- ☀️ 天氣

**內容類型目標比例**（之後擴充全站歌曲時參考，不要每次都選同一種類型）：
- 兒歌 20%
- 流行歌 40%
- 動畫/影集主題曲 20%
- 生活/節慶歌曲 20%

---

## 🌱 候選歌單（待收錄）

目前是空的——**任何候選歌都要 VERA 自己搜尋/聽過確認**，Claude 不會主動生成具體歌詞引用或秒數（本站已有多次「隔壁AI」編造引用被抓包的教訓，見 CLAUDE.md）。Claude 可以做的是：用「只列出搜尋結果、不自己編寫」的方法（site:歌詞網站 + 關鍵字）幫忙找候選清單，VERA 再逐一核對。

每首候選歌的生命週期：

```
🌱 待查證 → 🔍 已查證 → 🌾 已收錄
                ↓
            🛠️ 待更新（連結失效/歌詞有誤時退回這裡）
```

| 歌手 | 歌曲 | 等級（推測） | 主題 | 狀態 | 備註 |
|---|---|---|---|---|---|
| （尚無候選） | | | | | |
