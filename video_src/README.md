# 🎬 集數短影片產生器（手工紙藝拼貼風）

每集一個資料夾（例：`e17/`），裡面兩個檔：
- `timeline.js`：10 句西語＋每句真人音檔的實際講話秒數 → 自動排出每幕時間
- `render.html`：canvas 逐格畫面（撕紙白邊、紙紋、投影、角色零件、字卡、撕紙轉場）

產生方式（1080×1920 直式，12fps 定格感畫面，輸出 24fps mp4）：
```
node video_src/render_frames.js video_src/e17 <畫面資料夾>
node video_src/audio.js video_src/e17 <out.wav>            # 預覽：配樂＋音效
node video_src/audio.js video_src/e17 <out.wav> --voice    # 成品：另外輸出人聲時間表，講話時配樂自動壓低
ffmpeg -framerate 12 -i <畫面資料夾>/f%04d.jpg -i <out.wav> -vf "fps=24,format=yuv420p" -c:v libx264 -crf 22 -c:a aac -shortest out.mp4
```
人聲一律用 `audio/eNN/` 的真人錄音，不另外用 TTS。
