// pronunciation.js — 🗣️ 西語純發音特區資料
//
// 第一輪範圍：只做 R/RR 一組最小對立音組（2026-08-10 VERA定案，見開發討論）。
// 之後新增音位（ñ／b-v／j-g／ll-y…）時，直接在 PRONUNCIATION_SKILLS 陣列
// 多加一個同結構的物件即可，不用改渲染邏輯——是複製內容模型，不是重新設計系統。
//
// 每個 skill 底下是「最小對立組」pairs，每個 pair 固定兩個對比詞（word），
// 對應六步流程：🔊聽官方音 → 看詞義/差異提示 → 🎙️錄自己 → ▶️回放比對 → 自己判斷 → 🌱聽出差異了。
// 沒有語音辨識、沒有AI評分、不接🌻花園熟練度、不做技能樹、不做舌位/嘴型圖、不做地區腔調——
// 這些都是這一輪明確排除的範圍，之後如果要做是另外的產品決策，不要順手加進這個檔案。

const PRONUNCIATION_SKILLS = [
  {
    id: 'pron_r_rr',
    icon: '👅',
    title: 'R / RR',
    subtitle: '單擊音 vs 強彈舌，聽出差一個字母意思差多少',
    pairs: [
      {
        id: 'pron_r_rr_pero_perro',
        words: [
          { id:'pron_r_rr_pero_perro__pero',  es:'pero',  zh:'但是', diffLabel:'單擊音' },
          { id:'pron_r_rr_pero_perro__perro', es:'perro', zh:'狗',   diffLabel:'強彈舌' }
        ]
      },
      {
        id: 'pron_r_rr_caro_carro',
        words: [
          { id:'pron_r_rr_caro_carro__caro',  es:'caro',  zh:'貴的', diffLabel:'單擊音' },
          { id:'pron_r_rr_caro_carro__carro', es:'carro', zh:'車',   diffLabel:'強彈舌' }
        ]
      },
      {
        id: 'pron_r_rr_coro_corro',
        words: [
          { id:'pron_r_rr_coro_corro__coro',  es:'coro',  zh:'合唱團', diffLabel:'單擊音' },
          { id:'pron_r_rr_coro_corro__corro', es:'corro', zh:'我跑',   diffLabel:'強彈舌' }
        ]
      }
    ]
  }
];

// 真人音檔優先，找不到就 fallback 瀏覽器TTS（跟 GRAM_AUDIO_MAP 同一套邏輯，
// 但獨立命名空間——這裡的 key 是發音特區自己的詞，不跟文法卡例句共用）。
// 目前尚未錄音，先留空物件，播放時會自動 fallback TTS，不會出錯。
const PRON_AUDIO_MAP = {};
