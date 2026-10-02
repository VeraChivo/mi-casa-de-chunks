// E18「我的家人與朋友」短影片時間軸（speech＝audio/e18 每句講話結束秒數，ffmpeg silencedetect 量測，2026-10-02）
(function(){
const S = [
  {es:'Tengo una familia.',                    key:'Tengo',          file:'01_tengo_una_familia.mp3',              speech:1.36, lead:0.7},
  {es:'Yo soy Mamá Cata, la mamá de Nita.',        key:'la mamá de Nita', file:'02_yo_soy_mama_cata.mp3',              speech:2.78, lead:0.7},
  {es:'Yo soy Papá Tato, el papá de Nita.',        key:'el papá de Nita', file:'03_yo_soy_papa_tato.mp3',              speech:2.87, lead:0.7},
  {es:'Yo soy Kito.',                              key:'Yo soy',          file:'04_yo_soy_kito.mp3',                   speech:1.11, lead:0.35},
  {es:'Soy el hermano mayor de Nita.',             key:'hermano mayor',  file:'05_soy_el_hermano_mayor.mp3',          speech:2.10, lead:0.35},
  {es:'Yo soy Tito, el hermano de Nita.',          key:'el hermano de Nita', file:'06_yo_soy_tito.mp3',                   speech:2.63, lead:0.6},
  {es:'Yo soy Mimi, la hermanita bebé de Nita.',   key:'la hermanita bebé', file:'07_yo_soy_mimi.mp3',                   speech:3.03, lead:0.6},
  {es:'Yo soy Nita, la hermana de Kito, Tito y Mimi.', key:'la hermana de Kito, Tito y Mimi', file:'08_yo_soy_nita_la_hermana.mp3',        speech:3.96, lead:0.5},
  {es:'Somos seis en la familia.',                 key:'Somos seis',     file:'09_somos_seis.mp3',                    speech:1.81, lead:0.4},
  {es:'Somos la familia de Nita.',                 key:'Somos',          file:'10_somos_la_familia_de_nita.mp3',      speech:1.86, lead:0.5},
];
const TAIL=0.85; let t=0;
const scenes=S.map((s,i)=>{ const sc=Object.assign({idx:i,start:t,voice:t+s.lead,voiceEnd:t+s.lead+s.speech},s); sc.end=sc.voiceEnd+TAIL; t=sc.end; return sc; });
const TL={W:1080,H:1350,FPS_DRAW:24,FPS_OUT:24,audioDir:'audio/e18',TR:0,scenes,endCard:{start:t,end:t},duration:t};
if(typeof module!=='undefined') module.exports=TL; else window.TL=TL;
})();
