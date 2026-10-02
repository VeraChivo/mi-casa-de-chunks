// E17「認識妮妲」短影片時間軸（畫面 render.html 與音訊 audio.js 共用同一份，節奏以真人音檔實際長度排）
// speech＝audio/e17 每句去掉尾端靜音後的實際講話秒數（ffmpeg silencedetect 量測，2026-09-30）
(function(){
const SENTENCES = [
  {es:'Me llamo Nita.',                     key:'Me llamo',          file:'01_me_llamo_nita.mp3',                 speech:1.18},
  {es:'Soy Nita.',                          key:'Soy',               file:'02_soy_nita.mp3',                      speech:0.95},
  {es:'Soy una gatita.',                    key:'una gatita',        file:'03_soy_una_gatita.mp3',                speech:1.26},
  {es:'Mi nombre es Nita.',                 key:'Mi nombre es',      file:'04_mi_nombre_es_nita.mp3',             speech:1.42},
  {es:'Me dicen Nita.',                     key:'Me dicen',          file:'05_me_dicen_nita.mp3',                 speech:1.15},
  {es:'¡Hola! Me llamo Nita.',              key:'¡Hola!',            file:'06_hola_me_llamo_nita.mp3',            speech:1.92},
  {es:'Soy una gata pequeña.',              key:'pequeña',           file:'07_soy_una_gata_pequena.mp3',          speech:1.64},
  {es:'Mi nombre es Nita y soy una gatita.',key:'y',                 file:'08_mi_nombre_es_nita_y_soy_gatita.mp3',speech:2.70},
  {es:'Mucho gusto, soy Nita.',             key:'Mucho gusto',       file:'09_mucho_gusto_soy_nita.mp3',          speech:2.07},
  {es:'Este es mi pequeño mundo.',          key:'mi pequeño mundo',  file:'10_este_es_mi_pequeno_mundo.mp3',      speech:1.79},
];
const TR = 0.5;      // 撕紙轉場長度（跨在兩個場景交界的中間）
const LEAD = 0.35;   // 場景開始到開口的空檔（第一幕給角色登場時間，另外加長）
const TAIL = 0.85;   // 講完後停留
const END_CARD = 2.4;
let t = 0;
const scenes = SENTENCES.map((s,i)=>{
  const lead = i===0 ? 0.7 : LEAD;
  const sc = Object.assign({idx:i, start:t, voice:t+lead, voiceEnd:t+lead+s.speech}, s);
  sc.end = sc.voiceEnd + TAIL;
  t = sc.end;
  return sc;
});
const endCard = {start:t, end:t+END_CARD};
const TL = {W:1080, H:1350, FPS_DRAW:24, FPS_OUT:24, audioDir:'audio/e17', TR, scenes, endCard, duration:endCard.end};
if(typeof module!=='undefined') module.exports = TL; else window.TL = TL;
})();
