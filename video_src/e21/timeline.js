// E21「我的朋友薇拉」短影片時間軸（speech＝audio/e21 每句講話結束秒數，ffmpeg silencedetect 量測，2026-10-03）
(function(){
const S = [
  {es:'Esta es mi amiga Vera.',                          key:'Esta es', file:'01_esta_es_mi_amiga_vera.mp3',          speech:1.63, lead:0.8},
  {es:'Vera es una oveja.',                              key:'es',      file:'02_vera_es_una_oveja.mp3',              speech:1.47, lead:0.4},
  {es:'Es blanca y suave.',                              key:'Es',      file:'03_es_blanca_y_suave.mp3',              speech:1.43, lead:0.4},
  {es:'Es muy divertida.',                               key:'Es',      file:'04_es_muy_divertida.mp3',               speech:1.29, lead:0.4},
  {es:'También es amable con todos.',                    key:'es',      file:'05_tambien_es_amable_con_todos.mp3',    speech:2.08, lead:0.6},
  {es:'Es muy lista.',                                   key:'Es',      file:'06_es_muy_lista.mp3',                   speech:1.10, lead:0.4},
  {es:'Es mi mejor amiga.',                              key:'Es',      file:'07_es_mi_mejor_amiga.mp3',              speech:1.34, lead:0.4},
  {es:'Ella es muy simpática y yo soy un poco tímida.',  key:'es',      file:'08_ella_simpatica_yo_timida.mp3',       speech:3.39, lead:0.4},
  {es:'Y somos buenas amigas.',                          key:'somos',   file:'09_y_somos_buenas_amigas.mp3',          speech:1.77, lead:0.4},
  {es:'Vera es mi amiga.',                               key:'es',      file:'10_vera_es_mi_amiga.mp3',               speech:1.33, lead:0.5},
];
const TAIL=0.85; let t=0;
const scenes=S.map((s,i)=>{ const sc=Object.assign({idx:i,start:t,voice:t+s.lead,voiceEnd:t+s.lead+s.speech},s); sc.end=sc.voiceEnd+TAIL; t=sc.end; return sc; });
const TL={W:1080,H:1350,FPS_DRAW:24,FPS_OUT:24,audioDir:'audio/e21',TR:0,scenes,endCard:{start:t,end:t},duration:t};
if(typeof module!=='undefined') module.exports=TL; else window.TL=TL;
})();
