// 👨‍👩‍👧‍👦 貓家族其他角色模組（擬人 Q 版・扁平插畫、無輪廓線）——與 nita.js 共用同一套座標與比例（腳底中心為原點，y 向上為負）
// 設定（2026-10-02 VERA 定案）：
//  達多爸爸＝柴郡貓粉紫＋深紫條紋、龐克頭馬尾、鮮綠上衣＋多口袋工作圍裙（煮菜／修東西會依情境出彩蛋）、神祕小笑
//  卡妲媽媽＝水藍主色、低馬尾、鬆垮毛帽（Miga 的伏筆，不解釋）、溫柔但有點疲憊
//  奇托哥哥＝橘黃運動外套、前面一撮翹毛、外向大笑但眼神會飄
//  迪多弟弟＝淺黃、蓬髮、安靜專注；抱著紅色小車車 Chito（或車車圍繞在腳邊）
//  咪咪妹妹＝粉紅、雙丸子頭、最矮；抱著兔耳骷髏玩偶 Leto
//  薇拉＝擬人羊（捲毛髮、彎角、橫向羊耳）、奶油白
// 用法：FAMILY.draw(ctx, 'dad'|'mom'|'kito'|'tito'|'mimi'|'vera', {x,y,s,expr:'smile'|'talk'|'blink'|'happy', look:-1|0|1, pose:'stand'|'hold'|'cook'|'repair', headTilt, tail, cars})
(function(){
const SK='#FCE9DE', SKS='#F2D3C6', BL='rgba(240,150,160,.30)', INK='#3B3550', SHADOW='rgba(60,50,40,.16)';
function E(ctx,cx,cy,rx,ry,f,rot=0){ ctx.beginPath(); ctx.ellipse(cx,cy,rx,ry,rot,0,Math.PI*2); ctx.fillStyle=f; ctx.fill(); }
function P(ctx,pts,f){ ctx.beginPath(); ctx.moveTo(pts[0][0],pts[0][1]); for(let i=1;i<pts.length;i++) ctx.lineTo(pts[i][0],pts[i][1]); ctx.closePath(); ctx.fillStyle=f; ctx.fill(); }
function S(ctx,pts,f){ ctx.beginPath(); ctx.moveTo((pts[0][0]+pts[1][0])/2,(pts[0][1]+pts[1][1])/2);
  for(let i=1;i<=pts.length;i++){ const a=pts[i%pts.length], b=pts[(i+1)%pts.length]; ctx.quadraticCurveTo(a[0],a[1],(a[0]+b[0])/2,(a[1]+b[1])/2); }
  ctx.closePath(); ctx.fillStyle=f; ctx.fill(); }
function R(ctx,x,y,w,h,r,f){ ctx.beginPath(); ctx.roundRect(x,y,w,h,r); ctx.fillStyle=f; ctx.fill(); }

const SPEC = {
  dad:{ name:'達多爸爸', scale:1.10, bw:1.22,
    hair:'#C9A0DC', hairD:'#7D4FA3', earIn:'#F0D4F2', tail:'#C9A0DC', stripe:'#7D4FA3',
    eye:'#D6DE5A', eyeIn:'#B7C93A', eyeR:[27,32], lid:0.10, slit:true, ear:{h:-566, xs:1, stripe:true},
    type:'pants', top:'#5DBB63', sleeve:'#5DBB63', bottom:'#B59B72', shoe:'#4A3B35', hairStyle:'punk' },
  mom:{ name:'卡妲媽媽', scale:1.06, bw:1.0,
    hair:'#8497AD', hairD:'#6F8299', earIn:'#E6B9C2', tail:'#8497AD',
    eye:'#9A7B52', eyeIn:'#C4A06A', eyeR:[24,29], lid:0.14, ear:{h:-552, xs:1},
    type:'skirt', top:'#F3E9D8', sleeve:'#F3E9D8', bottom:'#6FA3BE', shoe:'#5A6B7A', hairStyle:'momLow' },
  kito:{ name:'奇托哥哥', scale:0.98, bw:1.04,
    hair:'#5E6F8A', hairD:'#48587A', earIn:'#E6B9C2', tail:'#5E6F8A',
    eye:'#B8742F', eyeIn:'#D9A25C', eyeR:[25,30], lid:0, ear:{h:-560, xs:1},
    type:'pants', top:'#F0A33C', sleeve:'#F0A33C', bottom:'#4C5670', shoe:'#FFFFFF', hairStyle:'kito' },
  tito:{ name:'迪多弟弟', scale:0.86, bw:0.98,
    hair:'#A9B8C9', hairD:'#8C9DB2', earIn:'#E6B9C2', tail:'#A9B8C9',
    eye:'#4B3B35', eyeIn:'#6B574D', eyeR:[26,32], lid:0, ear:{h:-534, xs:1, round:true},
    type:'shorts', top:'#F6D66B', sleeve:'#F6D66B', bottom:'#9A7A58', shoe:'#6B5B4B', hairStyle:'fluffy' },
  mimi:{ name:'咪咪妹妹', scale:0.74, bw:0.96,
    hair:'#B7C4D6', hairD:'#9AABC2', earIn:'#F2B6C4', tail:'#B7C4D6',
    eye:'#B5656F', eyeIn:'#D88A94', eyeR:[27,33], lid:0, ear:{h:-552, xs:0.78, round:true},
    type:'dress', top:'#F4A9BC', sleeve:'#F7C3D0', bottom:'#F4A9BC', shoe:'#C1768A', hairStyle:'buns' },
  vera:{ name:'薇拉（羊）', scale:0.92, bw:1.02,
    hair:'#FAF3E4', hairD:'#E9DCC2', earIn:'#F2B6C4', tail:'#FAF3E4',
    eye:'#5F9A70', eyeIn:'#86BB93', eyeR:[25,30], lid:0, sheep:true,
    type:'dress', top:'#FAF3E4', sleeve:'#FAF3E4', bottom:'#F0E4CC', shoe:'#D79AA8', hairStyle:'curly' },
};

// ───── 尾巴（沿用妮妲的畫法：從腰側往外甩、尾端捲起；條紋版給柴郡爸爸）─────
function tail(ctx, sp, sway){
  if(sp.sheep){ E(ctx,52,-150,22,22,sp.hair); E(ctx,66,-160,16,16,sp.hairD); return; }
  let x=46,y=-140,dir=0.15+sway; const cl=[[x,y]];
  for(let i=1;i<=14;i++){ const u=i/14; dir -= (u<0.5?0.05:0.22); x+=Math.cos(dir)*10; y+=Math.sin(dir)*10; cl.push([x,y]); }
  const L=[],Rr=[]; cl.forEach((p,i)=>{ const q=cl[Math.min(i+1,cl.length-1)], o=cl[Math.max(i-1,0)]; const dx=q[0]-o[0], dy=q[1]-o[1], n=Math.hypot(dx,dy)||1; const w=11*(1-i/cl.length*0.3);
    L.push([p[0]-dy/n*w, p[1]+dx/n*w]); Rr.push([p[0]+dy/n*w, p[1]-dx/n*w]); });
  ctx.beginPath(); ctx.moveTo(L[0][0],L[0][1]); L.forEach(p=>ctx.lineTo(p[0],p[1])); for(let i=Rr.length-1;i>=0;i--) ctx.lineTo(Rr[i][0],Rr[i][1]); ctx.closePath(); ctx.fillStyle=sp.tail; ctx.fill();
  const e=cl[cl.length-1]; E(ctx,e[0],e[1],8.5,8.5,sp.tail);
  if(sp.stripe){ ctx.save(); ctx.strokeStyle=sp.stripe; ctx.lineWidth=7; ctx.lineCap='butt';
    [3,6,9,12].forEach(i=>{ const p=cl[i], q=cl[i+1], dx=q[0]-p[0], dy=q[1]-p[1], n=Math.hypot(dx,dy)||1, w=9; ctx.beginPath(); ctx.moveTo(p[0]-dy/n*w,p[1]+dx/n*w); ctx.lineTo(p[0]+dy/n*w,p[1]-dx/n*w); ctx.stroke(); }); ctx.restore(); }
}
// ───── 貓耳／羊耳 ─────
function catEar(ctx, side, sp){
  const m=side, e=sp.ear, X=x=>x*m*(e.xs||1), tip=e.h;
  S(ctx,[[X(112),-444],[X(124),-500],[X(112),tip+6],[X(104),tip],[X(92),tip+8],[X(62),-522],[X(36),-490]],sp.hair);
  S(ctx,[[X(98),-462],[X(106),-500],[X(100),tip+30],[X(76),-516],[X(56),-490]],sp.earIn);
  if(e.stripe){ ctx.save(); ctx.strokeStyle=sp.stripe; ctx.lineWidth=6; ctx.lineCap='round';
    [[tip+18],[tip+36]].forEach(([y],i)=>{ ctx.beginPath(); ctx.moveTo(X(96-i*6),y); ctx.lineTo(X(118-i*4),y+8); ctx.stroke(); }); ctx.restore(); }
}
function sheepEar(ctx, side, sp){
  const m=side; ctx.save(); ctx.translate(m*118,-396); ctx.rotate(m*0.5);
  E(ctx,0,0,44,20,sp.hairD); E(ctx,0,2,30,11,sp.earIn); ctx.restore();
}
function horn(ctx, side, sp){
  const m=side, X=x=>x*m, c='#D8C3A0', d='#BFA77C';
  S(ctx,[[X(70),-478],[X(100),-512],[X(138),-518],[X(160),-490],[X(150),-458],[X(132),-470],[X(138),-486],[X(116),-486],[X(92),-462]],c);
  ctx.save(); ctx.strokeStyle=d; ctx.lineWidth=4; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(X(104),-500); ctx.quadraticCurveTo(X(130),-505,X(144),-486); ctx.stroke(); ctx.restore();
}
// ───── 髮型：back＝在臉後面；front＝在臉前面（瀏海）─────
const HAIR = {
  momLow:{
    back(ctx,sp){ S(ctx,[[-112,-430],[-124,-340],[-110,-286],[-70,-296],[-60,-370],[60,-370],[70,-296],[110,-286],[124,-340],[112,-430],[0,-500]],sp.hairD);
      // 低馬尾：垂在右肩後面，髮尾鬆鬆的
      S(ctx,[[104,-330],[132,-318],[142,-270],[130,-220],[112,-196],[104,-232],[106,-290]],sp.hair);
      E(ctx,112,-322,10,12,'#6FA3BE'); },
    front(ctx,sp){ S(ctx,[[-112,-430],[-122,-360],[-112,-300],[-92,-290],[-94,-340],[-98,-410]],sp.hair); S(ctx,[[112,-430],[122,-360],[112,-300],[92,-290],[94,-340],[98,-410]],sp.hair);
      S(ctx,[[-104,-430],[-60,-448],[10,-452],[70,-430],[96,-410],[40,-404],[-10,-420],[-60,-402],[-100,-408]],sp.hair); } },
  punk:{
    back(ctx,sp){ // 龐克馬尾：從後腦往上甩出去再垂下，髮圈是金色
      S(ctx,[[96,-470],[130,-520],[170,-520],[184,-470],[172,-410],[150,-372],[146,-410],[158,-446],[138,-456],[112,-440]],sp.hair);
      E(ctx,118,-462,10,12,'#D4A93A');
      [[150,-430],[162,-470]].forEach(([a,b])=>{ ctx.save(); ctx.strokeStyle=sp.hairD; ctx.lineWidth=6; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(a,b); ctx.lineTo(a+14,b-10); ctx.stroke(); ctx.restore(); }); },
    front(ctx,sp){ // 兩側剃短（深色貼頭皮）＋中間往上豎起的高冠
      S(ctx,[[-98,-444],[-104,-414],[-96,-392],[-88,-416],[-86,-440]],sp.hairD); S(ctx,[[98,-444],[104,-414],[96,-392],[88,-416],[86,-440]],sp.hairD);
      P(ctx,[[-62,-448],[-70,-540],[-40,-500],[-30,-598],[-6,-520],[14,-614],[34,-520],[56,-588],[66,-500],[84,-540],[80,-444],[0,-470]],sp.hair);
      [[-30,-540,-26,-590],[14,-548,14,-606],[56,-536,54,-578]].forEach(([a,b,c,d])=>{ ctx.save(); ctx.strokeStyle=sp.hairD; ctx.lineWidth=7; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(a,b); ctx.lineTo(c,d); ctx.stroke(); ctx.restore(); });
      S(ctx,[[-88,-436],[-40,-452],[10,-456],[60,-452],[90,-436],[84,-420],[40,-432],[0,-420],[-40,-430],[-84,-420]],sp.hair); } },
  kito:{
    back(ctx,sp){ S(ctx,[[-108,-430],[-112,-370],[-96,-340],[-60,-380],[60,-380],[96,-340],[112,-370],[108,-430],[0,-490]],sp.hairD); },
    front(ctx,sp){ S(ctx,[[-110,-430],[-100,-486],[-50,-512],[10,-518],[70,-506],[106,-470],[112,-420],[96,-410],[84,-436],[60,-412],[40,-440],[14,-414],[-10,-444],[-34,-412],[-60,-440],[-86,-410],[-100,-420]],sp.hair);
      P(ctx,[[-44,-512],[-62,-566],[-30,-540],[-14,-590],[0,-524]],sp.hair);   // 一撮翹毛
      S(ctx,[[-108,-420],[-114,-370],[-100,-350],[-96,-396]],sp.hair); S(ctx,[[108,-420],[114,-370],[100,-350],[96,-396]],sp.hair); } },
  fluffy:{
    back(ctx,sp){ S(ctx,[[-128,-430],[-134,-350],[-112,-300],[-70,-310],[-60,-380],[60,-380],[70,-310],[112,-300],[134,-350],[128,-430],[0,-510]],sp.hairD); },
    front(ctx,sp){ const pts=[]; for(let i=0;i<=12;i++){ const a=Math.PI+(i/12)*Math.PI; pts.push([Math.cos(a)*128,-440+Math.sin(a)*86+(i%2?-8:6)]); }
      S(ctx,pts.concat([[110,-410],[84,-424],[60,-404],[36,-428],[12,-402],[-14,-430],[-40,-404],[-64,-428],[-88,-406],[-110,-412]]),sp.hair);
      S(ctx,[[-124,-430],[-134,-360],[-120,-318],[-100,-330],[-104,-400]],sp.hair); S(ctx,[[124,-430],[134,-360],[120,-318],[100,-330],[104,-400]],sp.hair); } },
  buns:{
    back(ctx,sp){ [-1,1].forEach(m=>{ E(ctx,m*124,-372,32,32,sp.hair); E(ctx,m*124,-372,16,16,sp.hairD); P(ctx,[[m*116,-410],[m*148,-398],[m*134,-382]],'#F2B6C4'); P(ctx,[[m*116,-410],[m*104,-392],[m*134,-382]],'#F2B6C4'); E(ctx,m*118,-402,6,6,'#D4A93A'); });
      S(ctx,[[-104,-430],[-108,-330],[-92,-300],[-62,-330],[-60,-380],[60,-380],[62,-330],[92,-300],[108,-330],[104,-430],[0,-492]],sp.hairD); },
    front(ctx,sp){ S(ctx,[[-106,-430],[-96,-486],[-40,-510],[20,-512],[84,-496],[108,-440],[104,-420],[80,-420],[50,-440],[20,-412],[-16,-440],[-50,-414],[-84,-436],[-102,-414]],sp.hair);
      } },
  curly:{
    back(ctx,sp){ S(ctx,[[-116,-420],[-120,-340],[-100,-300],[-62,-330],[-60,-380],[60,-380],[62,-330],[100,-300],[120,-340],[116,-420],[0,-500]],sp.hairD); },
    front(ctx,sp){ // 羊毛捲髮：一圈一圈的雲朵
      for(let i=0;i<9;i++){ const a=Math.PI+0.18*Math.PI+(i/8)*0.64*Math.PI; E(ctx,Math.cos(a)*112,-428+Math.sin(a)*88,32,32,sp.hair); }
      for(let i=0;i<5;i++){ E(ctx,-72+i*36,-440+(i%2?10:-4),26,24,sp.hair); }
      [[-112,-380],[112,-380]].forEach(([x,y])=>{ E(ctx,x,y,24,28,sp.hair); E(ctx,x*1.04,y+40,20,22,sp.hair); });
      ctx.save(); ctx.strokeStyle=sp.hairD; ctx.lineWidth=3; ctx.lineCap='round'; for(let i=0;i<9;i++){ const a=Math.PI+0.18*Math.PI+(i/8)*0.64*Math.PI; ctx.beginPath(); ctx.arc(Math.cos(a)*112,-428+Math.sin(a)*88,18,0.2,2.4); ctx.stroke(); } ctx.restore(); } },
};
// ───── 眼睛、嘴 ─────
function eye(ctx,cx,cy,sp,st){
  const e=st.expr||'smile', [rx,ry]=sp.eyeR, out=cx<0?-1:1;
  if(e==='blink'){ ctx.save(); ctx.strokeStyle=INK; ctx.lineWidth=5; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(cx-rx,cy+4); ctx.quadraticCurveTo(cx,cy+12,cx+rx,cy+4); ctx.stroke(); ctx.restore(); return; }
  if(e==='happy'){ ctx.save(); ctx.strokeStyle=INK; ctx.lineWidth=5.5; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(cx-rx,cy+6); ctx.quadraticCurveTo(cx,cy-14,cx+rx,cy+6); ctx.stroke(); ctx.restore(); return; }
  const lx=(st.look||0)*8, ly=st.lookY||0;
  ctx.save(); ctx.beginPath(); ctx.ellipse(cx,cy,rx,ry,0,0,Math.PI*2); ctx.clip();
  E(ctx,cx,cy,rx,ry,'#FFFFFF'); E(ctx,cx+lx,cy+3+ly,rx*.84,ry*.88,sp.eye); E(ctx,cx+lx,cy+10+ly,rx*.6,ry*.55,sp.eyeIn);
  if(sp.slit) E(ctx,cx+lx,cy+4+ly,5,ry*.8,INK); else E(ctx,cx+lx,cy+4+ly,rx*.38,ry*.52,INK);
  E(ctx,cx+lx-8,cy-8+ly,7,9,'rgba(255,255,255,.95)'); E(ctx,cx+lx+9,cy+14+ly,3.5,3.5,'rgba(255,255,255,.8)');
  if(sp.lid>0){ const edge=cy-ry+ry*2*sp.lid; P(ctx,[[cx-rx-4,cy-ry-6],[cx+rx+4,cy-ry-6],[cx+rx+4,edge],[cx-rx-4,edge]],SK); }
  ctx.restore();
  ctx.save(); ctx.strokeStyle=INK; ctx.lineCap='round'; ctx.lineWidth=4; const topY=cy-ry+ry*2*sp.lid;
  ctx.beginPath(); ctx.moveTo(cx-rx*.9,topY+2); ctx.quadraticCurveTo(cx,topY-4,cx+rx*.9,topY+2); ctx.stroke();
  ctx.lineWidth=3; const ox=cx+out*rx*.9; ctx.beginPath(); ctx.moveTo(ox,topY+2); ctx.quadraticCurveTo(ox+out*5,topY,ox+out*9,topY-6); ctx.stroke();
  ctx.restore();
}
function mouth(ctx,id,sp,st){
  const e=st.expr||'smile', talk=e==='talk';
  ctx.save(); ctx.strokeStyle='#9A5A66'; ctx.lineWidth=3.6; ctx.lineCap='round'; ctx.lineJoin='round';
  if(talk){ E(ctx,0,-333,10,9,'#8E4A58'); E(ctx,0,-329,6,3.5,'#E58E9E'); ctx.restore(); return; }
  if(id==='dad'){ // 柴郡貓的神祕小笑：只有右邊翹起來
    ctx.strokeStyle='#5A3A78'; ctx.beginPath(); ctx.moveTo(-18,-336); ctx.quadraticCurveTo(2,-326,24,-346); ctx.stroke();
    ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(26,-350); ctx.lineTo(30,-344); ctx.stroke();
    P(ctx,[[-4,-331],[14,-334],[10,-328]],'#FFFFFF'); }
  else if(id==='kito'){ ctx.beginPath(); ctx.moveTo(-26,-342); ctx.quadraticCurveTo(0,-312,26,-342); ctx.closePath(); ctx.fillStyle='#8E4A58'; ctx.fill();
    ctx.save(); ctx.clip(); P(ctx,[[-26,-344],[26,-344],[26,-336],[-26,-336]],'#FFFFFF'); E(ctx,0,-322,12,8,'#E58E9E'); ctx.restore(); ctx.beginPath(); ctx.moveTo(-26,-342); ctx.quadraticCurveTo(0,-312,26,-342); ctx.stroke(); }
  else if(id==='mimi'){ ctx.beginPath(); ctx.moveTo(-18,-342); ctx.quadraticCurveTo(0,-310,18,-342); ctx.closePath(); ctx.fillStyle='#8E4A58'; ctx.fill(); ctx.save(); ctx.clip(); E(ctx,0,-322,10,7,'#E58E9E'); ctx.restore(); }
  else if(id==='tito'){ ctx.beginPath(); ctx.moveTo(-9,-334); ctx.quadraticCurveTo(0,-330,9,-334); ctx.stroke(); }
  else if(id==='mom'){ ctx.beginPath(); ctx.moveTo(-13,-336); ctx.quadraticCurveTo(0,-327,13,-337); ctx.stroke();
    ctx.save(); ctx.strokeStyle='rgba(120,100,130,.35)'; ctx.lineWidth=2.5; [-42,42].forEach(x=>{ ctx.beginPath(); ctx.moveTo(x-12,-352); ctx.quadraticCurveTo(x,-347,x+12,-352); ctx.stroke(); }); ctx.restore(); } // 眼下淡淡的疲憊線
  else { ctx.beginPath(); ctx.moveTo(-14,-338); ctx.quadraticCurveTo(0,-326,14,-338); ctx.stroke(); }
  ctx.restore();
}
// ───── 頭 ─────
function head(ctx,id,sp,st){
  const H=HAIR[sp.hairStyle]; H.back(ctx,sp);
  if(sp.sheep){ horn(ctx,-1,sp); horn(ctx,1,sp); sheepEar(ctx,-1,sp); sheepEar(ctx,1,sp); }
  else { catEar(ctx,-1,sp); catEar(ctx,1,sp); }
  S(ctx,[[-98,-430],[-100,-370],[-80,-325],[-40,-305],[0,-300],[40,-305],[80,-325],[100,-370],[98,-430],[0,-470]],SK);
  E(ctx,-58,-350,18,10,BL); E(ctx,58,-350,18,10,BL);
  eye(ctx,-42,-388,sp,st); eye(ctx,42,-388,sp,st); mouth(ctx,id,sp,st);
  H.front(ctx,sp);
  if(id==='mom') beanie(ctx);
  if(id==='vera'){ // 小花蝴蝶結
    ctx.save(); ctx.translate(-70,-478); [0,72,144,216,288].forEach(a=>{ ctx.save(); ctx.rotate(a*Math.PI/180); E(ctx,0,-16,10,14,'#F2B6C4'); ctx.restore(); }); E(ctx,0,0,8,8,'#D4A93A'); ctx.restore(); }
  if(id==='dad'){ // 耳環：金色小圈
    ctx.save(); ctx.strokeStyle='#D4A93A'; ctx.lineWidth=4.5; ctx.beginPath(); ctx.arc(-118,-470,8,0,Math.PI*2); ctx.stroke(); ctx.restore(); }
}
function beanie(ctx){
  ctx.save(); ctx.translate(0,-478); ctx.rotate(0.09);
  S(ctx,[[70,-34],[120,-26],[146,22],[134,72],[110,46]],'#5E96B3');                 // 鬆垮垂下來的帽尾
  E(ctx,0,-8,98,60,'#6FB5D1');
  ctx.save(); ctx.strokeStyle='rgba(60,110,140,.35)'; ctx.lineWidth=3; for(let i=-3;i<=3;i++){ ctx.beginPath(); ctx.moveTo(i*26,-56); ctx.quadraticCurveTo(i*30,-20,i*26,16); ctx.stroke(); } ctx.restore();
  R(ctx,-104,16,208,40,16,'#A9D8E6');                                                   // 帽緣：水色毛線一圈
  ctx.save(); ctx.strokeStyle='#8EC5D8'; ctx.lineWidth=4; ctx.lineCap='round'; for(let i=-4;i<=4;i++){ ctx.beginPath(); ctx.moveTo(i*22-6,22); ctx.lineTo(i*22+6,50); ctx.stroke(); } ctx.restore();
  ctx.restore();
}
// ───── 手臂（姿勢）─────
function arm(ctx,sp,side,ang,tx){
  ctx.save(); ctx.translate(side*46*(sp.bw>1.1?1.1:1),-268); ctx.rotate(ang);
  S(ctx,[[-17,-6],[17,-6],[22,30],[16,72],[-16,72],[-22,30]],sp.sleeve);
  if(sp.type==='dress'||sp.type==='skirt') P(ctx,[[-18,66],[18,66],[16,80],[-16,80]],'#F1ECF6');
  E(ctx,0,90,14,14,SK);
  ctx.restore();
}
// ───── 小道具 ─────
function redCar(ctx,x,y,s){ ctx.save(); ctx.translate(x,y); ctx.scale(s,s);
  E(ctx,0,26,52,8,'rgba(60,50,40,.12)');
  R(ctx,-52,-4,104,34,12,'#E04C4C'); P(ctx,[[-26,-4],[-14,-30],[22,-30],[38,-4]],'#E86262'); P(ctx,[[-18,-6],[-10,-24],[2,-24],[2,-6]],'#CFE6EC'); P(ctx,[[8,-6],[8,-24],[20,-24],[30,-6]],'#CFE6EC');
  E(ctx,-30,32,13,13,'#3B3550'); E(ctx,30,32,13,13,'#3B3550'); E(ctx,-30,32,5,5,'#DCE1EA'); E(ctx,30,32,5,5,'#DCE1EA'); E(ctx,46,12,5,5,'#F6D66B'); ctx.restore(); }
function skullBunny(ctx,x,y,s){ ctx.save(); ctx.translate(x,y); ctx.scale(s,s);
  [-1,1].forEach(m=>{ ctx.save(); ctx.translate(m*26,-34); ctx.rotate(m*0.22); E(ctx,0,-34,13,40,'#FFFFFF'); E(ctx,0,-32,7,30,'#F2B6C4'); ctx.restore(); });
  E(ctx,0,0,40,36,'#FFFFFF'); R(ctx,-24,24,48,22,10,'#FFFFFF');
  E(ctx,-15,-2,10,12,'#3B3550'); E(ctx,15,-2,10,12,'#3B3550'); P(ctx,[[0,12],[-5,22],[5,22]],'#3B3550');
  ctx.save(); ctx.strokeStyle='#3B3550'; ctx.lineWidth=3; ctx.lineCap='round'; for(let i=-2;i<=2;i++){ ctx.beginPath(); ctx.moveTo(i*9,28); ctx.lineTo(i*9,42); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(-22,34); ctx.lineTo(22,34); ctx.stroke(); ctx.restore();
  E(ctx,-26,14,7,4,'rgba(240,150,160,.5)'); E(ctx,26,14,7,4,'rgba(240,150,160,.5)'); ctx.restore(); }
function spatula(ctx){ ctx.save(); ctx.fillStyle='#D4A93A'; ctx.beginPath(); ctx.roundRect(-4,-4,8,60,4); ctx.fill(); R(ctx,-16,-46,32,46,8,'#C9CED6'); ctx.strokeStyle='#A8AEB8'; ctx.lineWidth=3; [-8,0,8].forEach(x=>{ ctx.beginPath(); ctx.moveTo(x,-38); ctx.lineTo(x,-10); ctx.stroke(); }); ctx.restore(); }
function screwdriver(ctx){ ctx.save(); R(ctx,-9,-6,18,52,7,'#E04C4C'); R(ctx,-3,-50,6,46,2,'#C9CED6'); P(ctx,[[-5,-50],[5,-50],[0,-60]],'#C9CED6'); ctx.restore(); }

// ───── 身體 ─────
function body(ctx,id,sp,st){
  const bw=sp.bw;
  E(ctx,0,4,110*bw,16,SHADOW);
  tail(ctx,sp,st.tail||0);
  // 腿＋鞋
  const legX=[-24*bw,24*bw];
  if(sp.type==='pants'){ legX.forEach(x=>P(ctx,[[x-18,-150],[x+18,-150],[x+16,-30],[x-16,-30]],sp.bottom)); }
  else if(sp.type==='shorts'){ legX.forEach(x=>{ P(ctx,[[x-17,-150],[x+17,-150],[x+15,-96],[x-15,-96]],sp.bottom); P(ctx,[[x-10,-98],[x+10,-98],[x+10,-40],[x-10,-40]],SK); P(ctx,[[x-12,-52],[x+12,-52],[x+12,-34],[x-12,-34]],'#FAF8F4'); }); }
  else { legX.forEach(x=>{ P(ctx,[[x-11,-112],[x+11,-112],[x+10,-40],[x-10,-40]],SK); P(ctx,[[x-12,-48],[x+12,-48],[x+12,-20],[x-12,-20]],'#FAF8F4'); }); }
  legX.forEach(x=>{ E(ctx,x+(x<0?-4:4),-10,sp.type==='pants'?24:22,12,sp.shoe); });
  // 裙／洋裝
  if(sp.type==='skirt'||sp.type==='dress'){
    for(let i=-6;i<=6;i++) E(ctx,i*12.5*bw,-104,7.5,7.5,'#F1ECF6');
    P(ctx,[[-44*bw,-232],[44*bw,-232],[80*bw,-112],[-80*bw,-112]],sp.bottom);
    if(id==='vera'){ for(let i=-6;i<=6;i++) E(ctx,i*13*bw,-114+(i%2?4:-2),13,13,sp.hair); }
    else for(let i=-6;i<=6;i++) E(ctx,i*12.6*bw,-113,6.5,6.5,id==='mimi'?'#F7C3D0':'#4F7C94');
  }
  // 上身
  P(ctx,[[-40*bw,-300],[40*bw,-300],[48*bw,-228],[-48*bw,-228]],sp.top);
  if(id==='kito'){ P(ctx,[[-12,-300],[12,-300],[14,-228],[-14,-228]],'#FFFFFF'); ctx.save(); ctx.strokeStyle='#C77F1E'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(-14,-300); ctx.lineTo(-16,-228); ctx.moveTo(14,-300); ctx.lineTo(16,-228); ctx.stroke(); ctx.restore(); }
  if(id==='tito'){ [-24,24].forEach(x=>P(ctx,[[x-6,-300],[x+6,-300],[x+6,-228],[x-6,-228]],'#2F8F9D')); }
  if(id==='mom'){ P(ctx,[[-40,-300],[40,-300],[44,-244],[-44,-244]],'#E9DCC6'); }
  if(id==='mimi'||id==='vera') { P(ctx,[[-30,-302],[0,-282],[30,-302],[0,-296]],'#FFFFFF'); }
  P(ctx,[[-13,-318],[13,-318],[13,-300],[-13,-300]],SKS);
}
function frontGear(ctx,id,sp,st){
  if(id==='dad'){ // 多口袋工作圍裙＋口袋露出的工具
    P(ctx,[[-34,-296],[34,-296],[56,-146],[-56,-146]],'#4B4458');
    [-30,-6,18].forEach(x=>R(ctx,x-2,-206,34,36,6,'#5D566B')); R(ctx,-34,-170,68,22,6,'#5D566B');
    ctx.save(); ctx.strokeStyle='#4B4458'; ctx.lineWidth=5; ctx.beginPath(); ctx.moveTo(-34,-296); ctx.lineTo(-44,-318); ctx.moveTo(34,-296); ctx.lineTo(44,-318); ctx.stroke(); ctx.restore();
    ctx.save(); ctx.translate(-14,-204); ctx.rotate(-0.25); R(ctx,-5,-26,10,34,4,'#C9CED6'); E(ctx,0,-30,9,9,'#C9CED6'); ctx.restore();           // 扳手
    ctx.save(); ctx.translate(36,-204); ctx.rotate(0.2); ctx.scale(.55,.55); screwdriver(ctx); ctx.restore();                                         // 螺絲起子
    ctx.save(); ctx.translate(-4,-198); ctx.rotate(-0.1); R(ctx,-3,-30,6,32,3,'#D4A93A'); ctx.restore(); }                                              // 鍋鏟柄
  if(id==='mom'){ // 斜背包，包包口露出一團毛線
    ctx.save(); ctx.strokeStyle='#9C7A5B'; ctx.lineWidth=9; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(34,-300); ctx.lineTo(-52,-176); ctx.stroke(); ctx.restore();
    E(ctx,-70,-186,18,16,'#E9A9B8'); R(ctx,-92,-176,50,44,10,'#B8906B'); P(ctx,[[-92,-166],[-42,-166],[-42,-176],[-92,-176]],'#9C7A5B'); E(ctx,-64,-166,5,5,'#D4A93A'); }
  if(id==='tito'){ [-1,1].forEach(m=>R(ctx,m*58-9,-262,18,52,8,'#2F8F9D')); }
}
// ───── 主函式 ─────
function draw(ctx,id,st){
  const sp=SPEC[id]; if(!sp) throw new Error('unknown '+id);
  st=Object.assign({x:0,y:0,s:1,pose:'stand'},st);
  ctx.save(); ctx.translate(st.x,st.y); const k=st.s*sp.scale; ctx.scale(k,k);
  if(st.headOnly){ ctx.translate(0,400); ctx.rotate(st.headTilt||0); ctx.translate(0,-400); head(ctx,id,sp,st); ctx.restore(); return; }
  body(ctx,id,sp,st);
  const pose=st.pose;
  let aL=0.28, aR=-0.28;
  if(pose==='hold'){ aL=-0.14; aR=0.14; }
  if(pose==='cook'||pose==='repair'){ aR=-1.25; }
  if(pose==='hold'){
    frontGear(ctx,id,sp,st);
    if(id==='tito'){ redCar(ctx,0,-190,0.9); }
    if(id==='mimi'){ skullBunny(ctx,0,-186,0.95); }
    arm(ctx,sp,-1,aL); arm(ctx,sp,1,aR);           // 手在道具前面、兩側托著
  } else {
    arm(ctx,sp,-1,aL); arm(ctx,sp,1,aR);
    frontGear(ctx,id,sp,st);
  }
  if(pose==='cook'||pose==='repair'){ // 右手在 (46,-268)＋90*(−sin a, cos a)
    const hx=46*1.1+90*(-Math.sin(aR)), hy=-268+90*Math.cos(aR);
    ctx.save(); ctx.translate(hx,hy); ctx.rotate(pose==='cook'?-0.5:0.4);
    if(pose==='cook') spatula(ctx); else screwdriver(ctx); ctx.restore();
  }
  ctx.save(); ctx.translate(0,-310); ctx.rotate(st.headTilt||0); ctx.translate(0,310); head(ctx,id,sp,st); ctx.restore();
  ctx.restore();
}
const FAMILY={draw, spec:SPEC, helpers:{redCar,skullBunny,spatula,screwdriver}};
if(typeof module!=='undefined') module.exports=FAMILY; else window.FAMILY=FAMILY;
})();
