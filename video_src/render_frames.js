// 用 Playwright 開 render.html，逐格畫出 12fps 的 jpg（用法：node render_frames.js <集數資料夾> <輸出資料夾> [只抽某幾格,逗號分隔]）
const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs'),path=require('path');
(async()=>{
  const [dir,out,pick]=process.argv.slice(2);
  fs.mkdirSync(out,{recursive:true});
  const TL=require(path.resolve(dir,'timeline.js'));
  const b=await chromium.launch(); const p=await b.newPage();
  const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+path.resolve(dir,'render.html'));
  const n=Math.ceil(TL.duration*TL.FPS_DRAW);
  const frames=pick?pick.split(',').map(Number):[...Array(n).keys()];
  for(const f of frames){
    const d=await p.evaluate(f=>renderToData(f),f);
    fs.writeFileSync(path.join(out,`f${String(f).padStart(4,'0')}.jpg`),Buffer.from(d.split(',')[1],'base64'));
  }
  console.log('frames',frames.length,'of',n,'errors',errs);
  await b.close();
})();
