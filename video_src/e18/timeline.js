// E18「我的家人與朋友」短影片時間軸（speech＝audio/e18 每句講話結束秒數，ffmpeg silencedetect 量測，2026-10-02）
(function(){
const S = [
  {es:'Tengo una familia y una amiga.',            key:'familia',        file:'01_tengo_una_familia_y_una_amiga.mp3', speech:2.20, lead:0.7},
  {es:'Yo soy Mamá Cata, la mamá de Nita.',        key:'Mamá Cata',      file:'02_yo_soy_mama_cata.mp3',              speech:2.78, lead:0.7},
  {es:'Yo soy Papá Tato, el papá de Nita.',        key:'Papá Tato',      file:'03_yo_soy_papa_tato.mp3',              speech:2.87, lead:0.7},
  {es:'Yo soy Kito.',                              key:'Kito',           file:'04_yo_soy_kito.mp3',                   speech:1.11, lead:0.35},
  {es:'Soy el hermano mayor de Nita.',             key:'hermano mayor',  file:'05_soy_el_hermano_mayor.mp3',          speech:2.10, lead:0.35},
  {es:'Yo soy Tito, el hermano de Nita.',          key:'Tito',           file:'06_yo_soy_tito.mp3',                   speech:2.63, lead:0.6},
  {es:'Yo soy Mimi, la hermanita bebé de Nita.',   key:'hermanita bebé', file:'07_yo_soy_mimi.mp3',                   speech:3.03, lead:0.6},
  {es:'Yo soy Vera.',                              key:'Vera',           file:'08_yo_soy_vera.mp3',                   speech:1.07, lead:0.6},
  {es:'Soy la mejor amiga de Nita.',               key:'mejor amiga',    file:'09_soy_la_mejor_amiga.mp3',            speech:1.94, lead:0.35},
  {es:'Somos la familia y los amigos de Nita.',    key:'Somos',          file:'10_somos_la_familia_y_los_amigos.mp3', speech:2.68, lead:0.5},
];
const TAIL=0.85; let t=0;
const scenes=S.map((s,i)=>{ const sc=Object.assign({idx:i,start:t,voice:t+s.lead,voiceEnd:t+s.lead+s.speech},s); sc.end=sc.voiceEnd+TAIL; t=sc.end; return sc; });
const TL={W:1080,H:1350,FPS_DRAW:24,FPS_OUT:24,audioDir:'audio/e18',TR:0,scenes,endCard:{start:t,end:t},duration:t};
if(typeof module!=='undefined') module.exports=TL; else window.TL=TL;
})();
