// 一鍵產生一集短影片：畫面 → 配樂音效 → 真人人聲依時間軸疊上去 → mp4
// 用法：node video_src/build.js e17 <輸出資料夾>   （ffmpeg 用 imageio-ffmpeg 附的那支）
const {execFileSync}=require('child_process'), path=require('path'), fs=require('fs');
const [ep,out]=process.argv.slice(2);
const dir=path.resolve(__dirname,ep), TL=require(path.join(dir,'timeline.js'));
const FF=execFileSync('python3',['-c','import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())']).toString().trim();
fs.mkdirSync(out,{recursive:true});
const frames=path.join(out,'frames'), wav=path.join(out,'bed.wav'), mp4=path.join(out,`${ep}.mp4`);
execFileSync('node',[path.join(__dirname,'render_frames.js'),dir,frames],{stdio:'inherit'});
execFileSync('node',[path.join(__dirname,'audio.js'),dir,wav,'--voice'],{stdio:'inherit'});
const voices=JSON.parse(fs.readFileSync(wav.replace(/\.wav$/,'_voice.json')));
const args=['-y','-loglevel','error','-framerate',String(TL.FPS_DRAW),'-i',path.join(frames,'f%04d.jpg'),'-i',wav];
voices.forEach(v=>args.push('-i',v.file));
let fc=''; voices.forEach((v,i)=>{ const ms=Math.round(v.at*1000); fc+=`[${i+2}:a]aresample=44100,adelay=${ms}|${ms},volume=1.35[v${i}];`; });
fc+=`[1:a]aresample=44100[bed];[bed]${voices.map((_,i)=>`[v${i}]`).join('')}amix=inputs=${voices.length+1}:normalize=0,alimiter=limit=0.8:level=0[a]`;
args.push('-filter_complex',fc,'-map','0:v','-map','[a]','-r',String(TL.FPS_OUT),'-pix_fmt','yuv420p','-c:v','libx264','-preset','slow','-crf','24','-c:a','aac','-ar','44100','-b:a','128k','-shortest','-movflags','+faststart',mp4);
execFileSync(FF,args,{stdio:'inherit'});
console.log('done',mp4,(fs.statSync(mp4).size/1048576).toFixed(1)+'MB');
