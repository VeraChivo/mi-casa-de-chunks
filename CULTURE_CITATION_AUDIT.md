# Culture Citation Audit（文化卡引用查證紀錄）

> Content Quality Track 產出。範圍：grammar.js 裡真正引用了具體可查證外部來源
> （真人真事的作者/電影/歷史事件）的 C1/C2 文化卡，不是全部 C1/C2 卡片
> （其餘語用學/禮儀/社會語言學類卡片是概念說明，沒有單一可查證引用，不在此範圍）。
> 依 CLAUDE.md 十大鐵則②「真實語料優先」與「三項規則查證法」（①標題可搜尋到
> ②原網址可開啟③內容與標題一致）執行。**只查證，不改 grammar.js**——修正留給
> 下一輪 commit，證據先固定，修改後發生。

## Scope

- g95（history）／g96（politics）／g97（classical）／g98（literature）／
  g99（cinema）／g102（etymology）／g106（history）

排除範圍：g94/g100/g101/g103/g104/g105/g107/g110 及全部 c1 級卡片
（g81-g93）——這些是概念性/語用學說明，沒有單一可查證的具體引用，不屬於
「引用真實性查證」的範圍。

## Summary（2026-08-02 第一輪查證）

- 查證聲明總數：30
- ✅ Verified：25
- 🟡 Accepted Simplification（輕微簡化，不算錯，不用修）：2
- 🔴 Needs Fix：3（分屬 g99 兩處＋g106 一處）

| 卡片 | 狀態 | 備註 |
|---|---|---|
| g95 | ✅ Verified | 5/5聲明全過（Reconquista年代/黃金世紀/西班牙內戰/Virreinato制度） |
| g96 | ✅ Verified | 1/1（左右派詞源：法國大革命國民議會座位安排） |
| g97 | ✅ Verified | 1/1（唐吉訶德開場白逐字核對Cervantes Virtual Library原文） |
| g98 | ✅ Verified | 4/4（Lorca/Borges/Neruda三句詩文引用＋GGM未引用的理由） |
| g99 | 🔴 Needs Fix | 0/2確認，2個問題（見下方Issue A/B） |
| g102 | 🟡 Accepted Simplification | 9/11確認，2處輕微簡化不算錯 |
| g106 | 🔴 Needs Fix | 4/5確認，1個歷史年代錯誤（見下方） |

## Issues（需要修正，尚未修）

### 🔴 g99 · Issue A — Incorrect attribution（人物歸屬錯誤）

**卡片內容**：「La vida es como la espuma, por eso hay que darse como el
mar.」（人生就像泡沫，所以要像大海一樣付出自己）標記為漁夫角色 Chuy 對兩位
青少年主角說的話。

**查證結果**：這句台詞確實是《你媽媽也一樣》（Y tu mamá también，2001，
Alfonso Cuarón）的真實台詞（多來源交叉確認），**但講這句話的是女主角
Luisa（Maribel Verdú飾），不是Chuy**。Chuy Carranza是片中真實存在的第四代
漁夫角色，會帶主角一行人去Boca del Cielo，但沒有任何來源把這句台詞歸給他。

**修正方向**：Chuy → Luisa，且需要重新調整卡片裡搭配這句話的「語氣/場景」
文化解讀（原本圍繞Chuy「樸實漁夫講出生活智慧」的敘事框架不成立，Luisa
說這句話的情境/意涵不同，不是只換名字就結束）。

### 🔴 g99 · Issue B — Unverified quotation（引用查無實據）

**卡片內容**：「No puedes entrar en el mismo río dos veces.」標記為
《羊男的迷宮》（El laberinto del fauno，2006，Guillermo del Toro）真實台詞。

**查證結果**：**遍查電影劇本、對白、多個「最佳台詞」彙整網站（含
frasesdelavida.com／mundifrases.com／screenrant.com「10 Most Memorable
Quotes」等）都找不到這句話出現在電影裡**。電影裡確實有的知名台詞是「El mal
rara vez toma forma... al principio se parece más a un suspiro」跟「La
magia no existe, ni para ti, ni para mí, ni para nadie」，這句河流台詞不在
其中。赫拉克利特「人不能兩次踏入同一條河流」這個哲學典故本身查證屬實，但
「電影引用了這句話」這個具體聲明查無實據，**跟本專案先前抓到的
Camilo/Rosalía假歌詞引用是同一種手法特徵**（真實存在的名言被嫁接到不相關的
真實作品上）。

**修正方向**：不保留這句引用，除非找到可靠來源佐證。優先在同一部片裡找
已驗證存在的台詞替換；找不到再考慮換一部片。

### 🟠 g106 — Historical date error（歷史年代錯誤）

**卡片內容**：「La Mezquita de Córdoba... 756年開始興建」

**查證結果**：哥多華清真寺的建築特徵（伊斯蘭馬蹄形拱門＋後來加建的天主教
主教堂）查證屬實，但**756年不是清真寺開工年份**——756年是Abd al-Rahman一世
建立獨立哥多華酋長國（掌權）的年份，兩件事被誤植成同一件。多個獨立來源
（redhistoria.com／estudi-arte.blogspot.com／tourmezquitadecordoba.com）
一致指出清真寺實際開工年份是 **785-786年**，788年由其繼任者Hisham一世完工。

**修正方向**：最小修正，只改年份數字 756 → 785-786，不擴寫整段歷史敘述。

## Accepted Simplification（輕微簡化，判定不用修）

**g102**：①ojalá卡片把兩個不同的阿拉伯語片語（law šā' allāh／in šā' allāh）
當同義並列使用，語言學上是兩個不同的詞（前者是非現實條件詞law，後者是
現實條件詞in，現代問候語inshallah用的是後者），但兩者語意接近，屬於常見的
通俗簡化，不到錯誤程度。②chocolate←xocolatl是最普遍的通俗字源說法，但RAE
《歷史辭典》等學術來源指出這個字源在納瓦特爾語最早文獻裡查無確切對應形式，
學界仍有其他字源提案存在爭議——不是錯，是「通俗共識」與「學術共識」之間
的落差，不影響教學使用。

## Status Log

- 2026-08-02：第一輪查證完成（本文件建立）。**grammar.js 尚未修改**，等
  下一輪 commit 處理 g99 Issue A/B 與 g106。
- ⬜ 下一步：修正 g99（重新歸屬台詞＋替換或移除河流引用）與 g106（年份），
  修完後回來把對應卡片的狀態從🔴改成✅並記錄修正內容。

---
*首次建立：2026-08-02，查證方法為WebSearch三項規則查證法，未編造任何引用；
grammar.js本身未被修改，這份文件是修改前的證據記錄。*
