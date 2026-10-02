// 程式合成配樂＋音效（烏克麗麗風撥弦 Karplus-Strong、低音、沙鈴、撕紙聲、字卡「啵」、結尾叮鈴）
// 用法：node audio.js <集數資料夾> <輸出.wav> [--voice]
//   不加 --voice：預覽版，只有配樂和音效
//   加 --voice：成品版，另外輸出 voice_track.wav（真人音檔依時間軸排好，由 ffmpeg 混音；講話時配樂自動壓低）
const fs=require('fs'), path=require('path');
const [dir,outWav,flag]=process.argv.slice(2);
const TL=require(path.resolve(dir,'timeline.js'));
const SR=44100, N=Math.ceil((TL.duration+0.6)*SR);
const music=new Float32Array(N), sfx=new Float32Array(N);
let seed=12345; const rnd=()=>{seed=(seed*1103515245+12345)&0x7fffffff; return seed/0x7fffffff;};
const hz=m=>440*Math.pow(2,(m-69)/12);

function pluck(buf,t0,midi,dur,vol){
  const f=hz(midi), per=Math.round(SR/f), ring=new Float32Array(per);
  for(let i=0;i<per;i++) ring[i]=rnd()*2-1;
  const s0=Math.round(t0*SR), n=Math.round(dur*SR); let idx=0;
  for(let i=0;i<n && s0+i<N;i++){
    const a=ring[idx], b=ring[(idx+1)%per]; ring[idx]=(a+b)*0.5*0.996; idx=(idx+1)%per;
    const env = i<200 ? i/200 : 1;
    buf[s0+i]+=a*vol*env;
  }
}
function tone(buf,t0,f0,f1,dur,vol,type='sine'){
  const s0=Math.round(t0*SR), n=Math.round(dur*SR); let ph=0;
  for(let i=0;i<n && s0+i<N;i++){ const p=i/n, f=f0+(f1-f0)*p; ph+=2*Math.PI*f/SR;
    const env=Math.min(1,i/300)*Math.pow(1-p,2); buf[s0+i]+=(type==='sine'?Math.sin(ph):Math.sign(Math.sin(ph))*0.3)*vol*env; }
}
function noise(buf,t0,dur,vol,bright){ // 簡單一階濾波雜訊（bright 越大越清脆）
  const s0=Math.round(t0*SR), n=Math.round(dur*SR); let lp=0, hp=0, prev=0;
  for(let i=0;i<n && s0+i<N;i++){ const p=i/n; const x=rnd()*2-1; lp+= (x-lp)*bright; hp = lp-prev; prev=lp;
    const env=Math.sin(Math.PI*Math.min(1,p*1.2))*(0.6+0.4*Math.sin(p*60)*Math.sin(p*17)); buf[s0+i]+=hp*vol*env*3; }
}

// ── 配樂：100 BPM，C–Am–F–G，每和弦一小節，八分音符分解和弦 ──
const BPM=100, beat=60/BPM, bar=beat*4;
const CHORDS=[[60,64,67,72],[57,60,64,69],[53,57,60,65],[55,59,62,67]];
const PATTERN=[0,2,1,3,2,1,3,2];
const BASS=[48,45,41,43];
const MEL=[[76,null,79,null,76,74,72,null],[72,null,74,null,76,null,72,null],[69,null,72,null,74,72,69,null],[71,null,74,null,79,null,77,76]];
const musicEnd=TL.duration+0.4;
for(let b=0; b*bar<musicEnd; b++){
  const c=b%4, t0=b*bar;
  PATTERN.forEach((k,i)=>pluck(music,t0+i*beat/2,CHORDS[c][k],1.2,0.16));
  tone(music,t0,hz(BASS[c]),hz(BASS[c]),bar*0.9,0.22);
  tone(music,t0+beat*2,hz(BASS[c]+7),hz(BASS[c]+7),beat*1.5,0.12);
  if(b>=1) MEL[c].forEach((m,i)=>{ if(m) pluck(music,t0+i*beat/2,m,0.9,0.11); });
  for(let i=0;i<8;i++) noise(music,t0+i*beat/2+beat/4,0.05,i%2?0.05:0.03,0.9);   // 沙鈴
}
// 淡入淡出
for(let i=0;i<N;i++){ const t=i/SR; music[i]*=Math.min(1,t/0.8)*Math.min(1,Math.max(0,(musicEnd-t)/1.2)); }

// ── 音效 ──
const boundaries=TL.scenes.slice(1).map(s=>s.start).concat([TL.endCard.start]);
boundaries.forEach(b=>tone(sfx,b,620,520,0.08,0.10));                              // 換幕：很輕的「啵」（硬切，不用轉場聲）
TL.scenes.forEach(s=>tone(sfx,s.voice-0.15,900,380,0.12,0.25));                    // 字卡「啵」
tone(sfx,TL.scenes[0].start+0.05,500,1100,0.18,0.22);                              // 妮妲登場
[88,91,95,100].forEach((m,i)=>tone(sfx,TL.endCard.start+0.45+i*0.09,hz(m),hz(m),0.7,0.12)); // 結尾叮鈴

// ── 講話時配樂自動壓低（成品版才有人聲）──
const duck=new Float32Array(N).fill(1);
if(flag==='--voice') TL.scenes.forEach(s=>{ for(let i=Math.round((s.voice-0.15)*SR); i<Math.round((s.voiceEnd+0.2)*SR) && i<N; i++) duck[i]=0.45; });
for(let i=1;i<N;i++) duck[i]=duck[i-1]+(duck[i]-duck[i-1])*0.002;                 // 平滑，避免忽大忽小

function writeWav(file, samples){
  const buf=Buffer.alloc(44+samples.length*2);
  buf.write('RIFF',0); buf.writeUInt32LE(36+samples.length*2,4); buf.write('WAVE',8); buf.write('fmt ',12);
  buf.writeUInt32LE(16,16); buf.writeUInt16LE(1,20); buf.writeUInt16LE(1,22); buf.writeUInt32LE(SR,24); buf.writeUInt32LE(SR*2,28); buf.writeUInt16LE(2,32); buf.writeUInt16LE(16,34);
  buf.write('data',36); buf.writeUInt32LE(samples.length*2,40);
  for(let i=0;i<samples.length;i++){ const v=Math.max(-1,Math.min(1,samples[i])); buf.writeInt16LE(Math.round(v*32000),44+i*2); }
  fs.writeFileSync(file,buf);
}
const mix=new Float32Array(N); let peak=0;
for(let i=0;i<N;i++){ mix[i]=music[i]*0.7*duck[i]+sfx[i]; peak=Math.max(peak,Math.abs(mix[i])); }
const g=peak>0.9?0.9/peak:1; for(let i=0;i<N;i++) mix[i]*=g;
writeWav(outWav, mix);
console.log('wav', outWav, (N/SR).toFixed(2)+'s', 'peak', peak.toFixed(2));

// 成品版：真人音檔排成一條人聲軌，交給 ffmpeg 用 adelay 疊上去
if(flag==='--voice'){
  const list=TL.scenes.map(s=>({file:path.resolve(dir,'../..',TL.audioDir||'audio/e17',s.file), at:s.voice}));
  fs.writeFileSync(outWav.replace(/\.wav$/,'_voice.json'), JSON.stringify(list));
}
