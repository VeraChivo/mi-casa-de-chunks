// 🐱 妮妲角色模組（扁平插畫、無輪廓線）——全部集數的短影片共用這一份，改長相只改這裡
// 定稿方向（2026-09-30 VERA）：混血藍貓、高傲不好親近；白襪子只到腳趾一小截；左耳外側一撮白毛（右耳沒有）
// 用法：drawNita(ctx, {x, y, s, pose:'sit'|'paw', expr:'aloof'|'blink'|'talk'|'side'|'soft', tail, headTilt, chinUp, headOnly})
(function(){
const C = {
  goth:'#6E4A9E', gothDeep:'#47306A', gothLace:'#3A2752', charm:'#DCE1EA',
  fur:'#8391A6', furDark:'#6C7A8F', furLight:'#A1ADBD', lid:'#6A788C',
  earIn:'#C9A2AB', nose:'#8C7280', iris:'#D2A23F', irisIn:'#AFA949', pupil:'#1E2430', eyeRim:'#4B5668',
  sock:'#FAF8F4', tuft:'#F4F2EE', whisker:'#F6F8FA', mouth:'#4B5668', shadow:'rgba(60,50,40,.16)'
};
function E(ctx,cx,cy,rx,ry,fill,rot=0){ ctx.beginPath(); ctx.ellipse(cx,cy,rx,ry,rot,0,Math.PI*2); ctx.fillStyle=fill; ctx.fill(); }
function P(ctx,pts,fill){ ctx.beginPath(); ctx.moveTo(pts[0][0],pts[0][1]); for(let i=1;i<pts.length;i++) ctx.lineTo(pts[i][0],pts[i][1]); ctx.closePath(); ctx.fillStyle=fill; ctx.fill(); }
// 平滑曲線（二次貝茲串接）填色
function S(ctx,pts,fill){ ctx.beginPath(); ctx.moveTo((pts[0][0]+pts[1][0])/2,(pts[0][1]+pts[1][1])/2);
  for(let i=1;i<=pts.length;i++){ const a=pts[i%pts.length], b=pts[(i+1)%pts.length]; ctx.quadraticCurveTo(a[0],a[1],(a[0]+b[0])/2,(a[1]+b[1])/2); }
  ctx.closePath(); ctx.fillStyle=fill; ctx.fill(); }
// 尾巴：中心線＋漸細寬度組成的長條
function tail(ctx, ang){
  // 以角度累積出彎曲的中心線
  let x=64,y=-46,dir=-1.25+ang; const cl=[[x,y]];
  for(let i=1;i<=16;i++){ const u=i/16; dir += (u<0.7? 0.035 : 0.16); x+=Math.cos(dir)*12.5; y+=Math.sin(dir)*12.5; cl.push([x,y]); }
  const L=[],R=[]; cl.forEach((p,i)=>{ const q=cl[Math.min(i+1,cl.length-1)], o=cl[Math.max(i-1,0)]; const dx=q[0]-o[0], dy=q[1]-o[1], n=Math.hypot(dx,dy)||1; const w=13*(1-i/cl.length*0.45);
    L.push([p[0]-dy/n*w, p[1]+dx/n*w]); R.push([p[0]+dy/n*w, p[1]-dx/n*w]); });
  const end=cl[cl.length-1];
  ctx.beginPath(); ctx.moveTo(L[0][0],L[0][1]); L.forEach(p=>ctx.lineTo(p[0],p[1])); ctx.arc(end[0],end[1],13*0.55,0,Math.PI*2); for(let i=R.length-1;i>=0;i--) ctx.lineTo(R[i][0],R[i][1]); ctx.closePath(); ctx.fillStyle=C.fur; ctx.fill();
  E(ctx,end[0],end[1],13*0.58,13*0.58,C.fur);
}
function eye(ctx, cx, cy, st){
  const rx=28, ry=20, e=st.expr||'aloof';
  // 杏仁眼：上下兩條弧線組成，外眼角微微上揚
  const almond=()=>{ ctx.beginPath(); ctx.moveTo(cx-rx,cy+2); ctx.quadraticCurveTo(cx,cy-ry*2.1,cx+rx,cy-3); ctx.quadraticCurveTo(cx,cy+ry*1.7,cx-rx,cy+2); ctx.closePath(); };
  if(e==='blink'){ ctx.save(); ctx.strokeStyle=C.eyeRim; ctx.lineWidth=4; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(cx-rx,cy+3); ctx.quadraticCurveTo(cx,cy+9,cx+rx,cy); ctx.stroke(); ctx.restore(); return; }
  const lid = e==='soft' ? .18 : .28;              // 上眼皮只蓋一點點（蓋太多會像沒精神、衰衰的）
  const lookX = e==='side' ? 9 : 0, lookY = 0;     // 平視，不往下看
  ctx.save(); almond(); ctx.clip();
  E(ctx,cx,cy,rx+4,ry+6,C.iris); E(ctx,cx+lookX,cy+lookY,rx*.58,ry*.8,C.irisIn);
  E(ctx,cx+lookX,cy+lookY,5,ry*.85,C.pupil);
  E(ctx,cx+lookX+7,cy+lookY-5,3,3,'rgba(255,255,255,.85)');
  // 上眼皮：跟臉同色、平直蓋下來，只在邊緣留一條細睫毛線＝看起來懶得理人
  const top=cy-ry*2.2, edge=cy-ry+lid*2*ry;
  const sideL = 0, sideR = 0;   // 眼皮平的：內眼角低＝像生氣、內眼角高＝像難過，平的才是冷淡
  P(ctx,[[cx-rx-4,top],[cx+rx+4,top],[cx+rx+4,edge+sideR],[cx-rx-4,edge+sideL]],C.fur);
  ctx.restore();
  ctx.save(); ctx.strokeStyle=C.eyeRim; ctx.lineWidth=3.2; ctx.lineCap='round';
  const sL = 0, sR = 0;
  ctx.beginPath(); ctx.moveTo(cx-rx+2,edge+sL); ctx.lineTo(cx+rx-1,edge+sR); ctx.stroke();
  const out = cx<0 ? -1 : 1, ox = cx + out*(rx-1), oy = edge - 2; ctx.lineWidth=2.6;
  ctx.beginPath(); ctx.moveTo(ox,oy); ctx.quadraticCurveTo(ox+out*8,oy-4,ox+out*13,oy-11); ctx.moveTo(ox-out*5,oy); ctx.quadraticCurveTo(ox+out*2,oy-6,ox+out*4,oy-14); ctx.stroke();
  ctx.restore();
  // 下眼皮往上推＝瞇眼的自信高傲（不是半垂眼皮的沒精神）；放鬆時推得更多、弧度更彎＝眼神帶笑
  ctx.save(); almond(); ctx.clip(); const push = e==='soft' ? 9 : 6;
  ctx.fillStyle=C.fur; ctx.beginPath(); ctx.moveTo(cx-rx-4,cy+ry*1.2); ctx.lineTo(cx-rx-4,cy+ry-push+4); ctx.quadraticCurveTo(cx,cy+ry-push*2.2,cx+rx+4,cy+ry-push); ctx.lineTo(cx+rx+4,cy+ry*1.2); ctx.closePath(); ctx.fill();
  ctx.restore(); ctx.save();
  ctx.restore();
}
function head(ctx, st){
  const up = (st.chinUp ?? 1) * 7;                 // 下巴微抬：五官整體往上一點
  // 耳朵（寬、略短，混血藍貓的圓臉比例）
  P(ctx,[[-104,-330],[-92,-440],[-38,-378]],C.fur);  P(ctx,[[-90,-346],[-86,-412],[-56,-378]],C.earIn);
  P(ctx,[[104,-330],[92,-440],[38,-378]],C.fur);     P(ctx,[[90,-346],[86,-412],[56,-378]],C.earIn);
  // 左耳外側一撮白毛（只有左耳，刻意不對稱）
  S(ctx,[[-101,-340],[-107,-358],[-97,-364],[-102,-382],[-93,-390],[-96,-408],[-89,-412],[-85,-386],[-92,-354]],C.tuft);
  // 頭＋兩頰（藍貓的圓鼓臉頰）
  E(ctx,0,-302,108,94,C.fur); E(ctx,-44,-268,58,44,C.fur); E(ctx,44,-268,58,44,C.fur); E(ctx,0,-250,40,30,C.fur);
  // 眼睛
  eye(ctx,-47,-302-up,st); eye(ctx,47,-302-up,st);
  // 鬍鬚墊、鼻子、嘴
  E(ctx,-19,-256-up,25,18,C.furLight); E(ctx,19,-256-up,25,18,C.furLight); E(ctx,0,-244-up,14,9,C.furLight);
  P(ctx,[[-11,-275-up],[11,-275-up],[0,-263-up]],C.nose);
  ctx.save(); ctx.strokeStyle=C.mouth; ctx.lineWidth=3; ctx.lineCap='round';
  const e=st.expr||'aloof';
  if(e==='talk'){ E(ctx,0,-246-up,9,7,'#3E2F3A'); }
  else if(e==='soft'){ ctx.beginPath(); ctx.moveTo(0,-263-up); ctx.lineTo(0,-255-up); ctx.moveTo(-12,-250-up); ctx.quadraticCurveTo(-6,-246-up,0,-255-up); ctx.quadraticCurveTo(6,-246-up,12,-250-up); ctx.stroke(); }
  else { ctx.beginPath(); ctx.moveTo(0,-263-up); ctx.lineTo(0,-254-up); ctx.moveTo(-10,-251-up); ctx.lineTo(0,-254-up); ctx.lineTo(10,-251-up); ctx.stroke(); } // 高傲：嘴角平，不笑
  ctx.strokeStyle=C.whisker; ctx.lineWidth=2.8;
  [[-1,-6],[-1,6],[1,-6],[1,6]].forEach(([m,dy])=>{ ctx.beginPath(); ctx.moveTo(m*40,-256-up+dy); ctx.quadraticCurveTo(m*95,-262-up+dy*1.4,m*122,-258-up+dy*2.6); ctx.stroke(); });
  ctx.restore();
}
// 🦇 紫色哥德裝飾：絲絨頸鍊（下緣蕾絲＋銀色小月亮）、右耳蝴蝶結
function choker(ctx){
  ctx.save();
  // 蕾絲：頸鍊下緣一排小半圓
  // 蕾絲：沿著頸鍊下緣弧線排一圈小圓，上半被頸鍊蓋住，只露出下半＝蕾絲邊
  for(let i=-6;i<=6;i++){ const x=i*10, y=-193-10*Math.pow(x/60,2); E(ctx,x,y,5.2,5.2,C.gothDeep); }
  ctx.beginPath(); ctx.moveTo(-62,-218); ctx.quadraticCurveTo(0,-198,62,-218); ctx.lineTo(60,-202); ctx.quadraticCurveTo(0,-182,-60,-202); ctx.closePath(); ctx.fillStyle=C.goth; ctx.fill();
  // 銀色小月亮
  P(ctx,[[0,-198],[-2,-190],[2,-190]],C.charm);
  E(ctx,0,-178,11,11,C.charm); E(ctx,6,-182,9.5,9.5,C.furLight);   // 彎月：銀色圓＋用胸口顏色切掉一角
  ctx.restore();
}
function earBow(ctx){
  ctx.save(); ctx.translate(74,-392); ctx.rotate(0.35);
  P(ctx,[[0,0],[-30,-17],[-34,4],[-26,16]],C.goth); P(ctx,[[0,0],[30,-17],[34,4],[26,16]],C.goth);
  P(ctx,[[-4,2],[-14,30],[-6,28]],C.gothDeep); P(ctx,[[4,2],[14,30],[6,28]],C.gothDeep);
  E(ctx,0,0,8,8,C.gothDeep); E(ctx,0,0,3,3,C.charm);
  ctx.restore();
}
function drawNita(ctx, st){
  ctx.save(); ctx.translate(st.x, st.y); ctx.scale(st.s||1, st.s||1);
  if(st.headOnly){ ctx.translate(0,300); ctx.rotate(st.headTilt||0); ctx.translate(0,-300); head(ctx,st); if(st.goth!==false) earBow(ctx); ctx.restore(); return; }
  E(ctx,0,4,150,20,C.shadow);                                        // 腳下柔和影子（取代輪廓線，讓貓從背景跳出來）
  // 抬手指東西時尾巴換到另一側，不跟抬起的手疊在一起
  if(st.pose==='paw'){ ctx.save(); ctx.scale(-1,1); tail(ctx, st.tail||0); ctx.restore(); } else tail(ctx, st.tail||0);
  E(ctx,-46,-58,48,58,C.furDark); E(ctx,46,-58,48,58,C.furDark);      // 後腿（坐姿）
  E(ctx,-56,-10,30,12,C.furDark); E(ctx,56,-10,30,12,C.furDark);
  E(ctx,0,-152,64,116,C.fur);                                          // 身體（坐直）
  E(ctx,0,-162,34,72,C.furLight);                                      // 胸口淡色
  // 前腳：左腳直立；右腳可以抬起來指東西（pose:'paw'）
  const leg=(sx, raise)=>{ ctx.save(); ctx.translate(sx,-150); if(raise) ctx.rotate(raise);
    S(ctx,[[-19,-4],[19,-4],[17,50],[13,110],[12,130],[-12,130],[-13,110],[-17,50]],C.fur); E(ctx,0,136,19,13,C.fur);
    ctx.save(); ctx.beginPath(); ctx.ellipse(0,136,19,13,0,0,Math.PI*2); ctx.clip(); E(ctx,0,145,18,7,C.sock); ctx.restore(); // 白襪子：只有腳趾一小截
    ctx.restore(); };
  leg(-24, 0);
  if(st.pose!=='paw') leg(24, 0);
  if(st.goth!==false) choker(ctx);
  ctx.save(); ctx.translate(0,-222); ctx.rotate(st.headTilt||0); ctx.translate(0,222); head(ctx,st); if(st.goth!==false) earBow(ctx); ctx.restore();
  if(st.pose==='paw'){ ctx.save(); ctx.translate(26,-20); leg(24, st.pawAng ?? -1.85); ctx.restore(); }
  ctx.restore();
}
const NITA = {draw:drawNita, colors:C};
if(typeof module!=='undefined') module.exports=NITA; else window.NITA=NITA;
})();
