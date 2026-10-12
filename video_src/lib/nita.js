// 🐱 妮妲角色模組（擬人貓・Q版約2.5頭身・扁平插畫、無輪廓線）——全部集數的短影片共用這一份，改長相只改這裡
// 定稿方向（2026-10-02 VERA）：貓家族全員擬人化；妮妲＝灰藍色頭髮＋貓耳貓尾、琥珀綠眼、高傲但不衰；
// 左右耳不對稱：左耳尖微折（2026-10-02 VERA 定案 A；earMark 的 ring/tip 只是當時的候選，保留不用）；右耳戴紫色蝴蝶結；
// 紫色哥德風（連帽小斗篷、頸鍊）；紫色的互補色＝黃／黃綠：琥珀綠眼＋金色小點綴（彎月、蝴蝶結中心）；白色短襪。穿著端莊、符合孩子年紀。
// 用法：NITA.draw(ctx, {x, y, s, pose:'stand'|'point', expr:'aloof'|'blink'|'talk'|'side'|'soft', earMark:'fold'|'ring'|'tip', tail, headTilt, headOnly})
(function(){
const C = {
  hair:'#8391A6', hairDark:'#6A788C', hairLight:'#A3AFC0', earIn:'#E6B9C2', earFluff:'#F4D7DE', gold:'#D4A93A',
  skin:'#FCE9DE', skinShade:'#F2D3C6', blush:'rgba(240,150,160,.28)',
  iris:'#C9A13E', irisIn:'#9FAE45', pupil:'#2A2738', lash:'#3B3550', white:'#FFFFFF', mouth:'#9A5A66',
  dress:'#7A55A8', sleeve:'#9B7CC6', dressDark:'#4F3573', cape:'#4A3168', capeIn:'#6B4C93', lace:'#F1ECF6', laceDark:'#3A2752',
  sock:'#FAF8F4', shoe:'#3A2752', charm:'#D4A93A', shadow:'rgba(60,50,40,.16)'
};
function E(ctx,cx,cy,rx,ry,fill,rot=0){ ctx.beginPath(); ctx.ellipse(cx,cy,rx,ry,rot,0,Math.PI*2); ctx.fillStyle=fill; ctx.fill(); }
function P(ctx,pts,fill){ ctx.beginPath(); ctx.moveTo(pts[0][0],pts[0][1]); for(let i=1;i<pts.length;i++) ctx.lineTo(pts[i][0],pts[i][1]); ctx.closePath(); ctx.fillStyle=fill; ctx.fill(); }
function S(ctx,pts,fill){ ctx.beginPath(); ctx.moveTo((pts[0][0]+pts[1][0])/2,(pts[0][1]+pts[1][1])/2);
  for(let i=1;i<=pts.length;i++){ const a=pts[i%pts.length], b=pts[(i+1)%pts.length]; ctx.quadraticCurveTo(a[0],a[1],(a[0]+b[0])/2,(a[1]+b[1])/2); }
  ctx.closePath(); ctx.fillStyle=fill; ctx.fill(); }

function tail(ctx, sway){
  let x=46,y=-140,dir=0.15+sway; const cl=[[x,y]];
  for(let i=1;i<=14;i++){ const u=i/14; dir -= (u<0.5?0.05:0.22); x+=Math.cos(dir)*10; y+=Math.sin(dir)*10; cl.push([x,y]); }
  const L=[],R=[]; cl.forEach((p,i)=>{ const q=cl[Math.min(i+1,cl.length-1)], o=cl[Math.max(i-1,0)]; const dx=q[0]-o[0], dy=q[1]-o[1], n=Math.hypot(dx,dy)||1; const w=11*(1-i/cl.length*0.3);
    L.push([p[0]-dy/n*w, p[1]+dx/n*w]); R.push([p[0]+dy/n*w, p[1]-dx/n*w]); });
  ctx.beginPath(); ctx.moveTo(L[0][0],L[0][1]); L.forEach(p=>ctx.lineTo(p[0],p[1])); for(let i=R.length-1;i>=0;i--) ctx.lineTo(R[i][0],R[i][1]); ctx.closePath(); ctx.fillStyle=C.hair; ctx.fill();
  const e=cl[cl.length-1]; E(ctx,e[0],e[1],8.5,8.5,C.hair);
}
function eye(ctx, cx, cy, st){
  const e=st.expr||'aloof', rx=25, ry=30, out = cx<0?-1:1;
  if(e==='blink'){ ctx.save(); ctx.strokeStyle=C.lash; ctx.lineWidth=5; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(cx-rx,cy+4); ctx.quadraticCurveTo(cx,cy+12,cx+rx,cy+4); ctx.stroke(); ctx.restore(); return; }
  if(e==='soft'){ // 放鬆：眼睛彎成笑眼
    ctx.save(); ctx.strokeStyle=C.lash; ctx.lineWidth=5.5; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(cx-rx,cy+6); ctx.quadraticCurveTo(cx,cy-14,cx+rx,cy+6); ctx.stroke(); ctx.restore(); return; }
  const lookX = e==='side' ? 8*(st.look||1) : 0;   // look:-1 往左看、1 往右看
  ctx.save(); ctx.beginPath(); ctx.ellipse(cx,cy,rx,ry,0,0,Math.PI*2); ctx.clip();
  E(ctx,cx,cy,rx,ry,C.white);
  E(ctx,cx+lookX,cy+3,rx*.82,ry*.86,C.iris); E(ctx,cx+lookX,cy+10,rx*.6,ry*.55,C.irisIn);
  E(ctx,cx+lookX,cy+4,rx*.36,ry*.5,C.pupil);
  E(ctx,cx+lookX-8,cy-8,7,9,'rgba(255,255,255,.95)'); E(ctx,cx+lookX+9,cy+14,3.5,3.5,'rgba(255,255,255,.8)');
  // 上眼皮：平平蓋住上面約三成＝高傲、不理人（不蓋太多，才不會像沒精神）
  const edge = cy - ry + ry*2*0.30;
  P(ctx,[[cx-rx-4,cy-ry-6],[cx+rx+4,cy-ry-6],[cx+rx+4,edge],[cx-rx-4,edge]],C.skin);
  ctx.restore();
  // 睫毛線＋外眼角小翹睫毛
  ctx.save(); ctx.strokeStyle=C.lash; ctx.lineCap='round'; ctx.lineWidth=4.5;
  const hw=rx*0.9; ctx.lineWidth=4;
  ctx.beginPath(); ctx.moveTo(cx-hw,edge+3); ctx.quadraticCurveTo(cx,edge-3,cx+hw,edge+3); ctx.stroke();
  ctx.lineWidth=3; const ox=cx+out*hw;
  ctx.beginPath(); ctx.moveTo(ox,edge+3); ctx.quadraticCurveTo(ox+out*5,edge+1,ox+out*8,edge-5); ctx.stroke();
  ctx.lineWidth=2.5; ctx.strokeStyle='rgba(59,53,80,.45)'; ctx.beginPath(); ctx.moveTo(cx-rx*.7,cy+ry-3); ctx.quadraticCurveTo(cx,cy+ry+2,cx+rx*.7,cy+ry-3); ctx.stroke();
  ctx.restore();
}
function earBow(ctx){
  ctx.save(); ctx.translate(86,-500); ctx.rotate(0.3);
  P(ctx,[[0,0],[-30,-17],[-34,4],[-26,16]],C.dress); P(ctx,[[0,0],[30,-17],[34,4],[26,16]],C.dress);
  P(ctx,[[-4,2],[-14,30],[-6,28]],C.dressDark); P(ctx,[[4,2],[14,30],[6,28]],C.dressDark);
  E(ctx,0,0,8,8,C.dressDark); E(ctx,0,0,3.5,3.5,C.gold);
  ctx.restore();
}
function headBack(ctx){
  // 帽兜（斗篷的帽子垂在頭後面）＋後面的頭髮
  E(ctx,0,-352,112,82,C.cape);
  S(ctx,[[-118,-420],[-124,-330],[-104,-282],[-70,-300],[-60,-380],[60,-380],[70,-300],[104,-282],[124,-330],[118,-420],[0,-500]],C.hairDark);
}
// 貓耳：比較大、外緣微微鼓起、略往外張，內側粉色加幾撮淺粉色耳毛（更像真的貓耳）
function catEar(ctx, side, mark){
  const m=side, X=x=>x*m;
  const fold = mark==='fold';
  const tipY = fold ? -552 : -568;
  S(ctx,[[X(112),-444],[X(124),-500],[X(112),tipY+6],[X(104),tipY],[X(92),tipY+8],[X(62),-522],[X(36),-490]],C.hair);
  S(ctx,[[X(98),-462],[X(106),-500],[X(100),tipY+30],[X(76),-516],[X(56),-490]],C.earIn);
  ctx.save(); ctx.strokeStyle=C.earFluff; ctx.lineWidth=3.5; ctx.lineCap='round';
  [[70,-476,86,-506],[82,-470,96,-500],[60,-484,70,-504]].forEach(([a,b,c,d])=>{ ctx.beginPath(); ctx.moveTo(X(a),b); ctx.quadraticCurveTo(X((a+c)/2+4),(b+d)/2,X(c),d); ctx.stroke(); });
  ctx.restore();
  if(fold){ // 耳尖往前微微折下來（混血折耳感）
    // 折下來的耳尖：一小片三角形往外下方垂，顏色深一階＝看得出是折過來的背面
    S(ctx,[[X(114),-544],[X(104),-553],[X(92),-546],[X(100),-522]],C.hairDark);
  } else if(mark==='ring'){ // 小金耳環
    ctx.save(); ctx.strokeStyle=C.gold; ctx.lineWidth=4.5; ctx.beginPath(); ctx.arc(X(118),-474,9,0,Math.PI*2); ctx.stroke(); ctx.restore();
  } else if(mark==='tip'){ // 耳尖深一點
    ctx.save(); ctx.beginPath(); ctx.rect(X(150)<X(0)?X(150):X(0),-600,150,56); ctx.clip();
    S(ctx,[[X(112),-444],[X(124),-500],[X(112),tipY+6],[X(104),tipY],[X(92),tipY+8],[X(62),-522],[X(36),-490]],C.hairDark); ctx.restore();
  }
}
function head(ctx, st){
  const e=st.expr||'aloof';
  catEar(ctx,-1,st.earMark||'fold'); catEar(ctx,1,null);
  // 臉
  S(ctx,[[-98,-430],[-100,-370],[-80,-325],[-40,-305],[0,-300],[40,-305],[80,-325],[100,-370],[98,-430],[0,-470]],C.skin);
  E(ctx,-58,-350,18,10,C.blush); E(ctx,58,-350,18,10,C.blush);
  // 眼睛、嘴
  eye(ctx,-42,-388,st); eye(ctx,42,-388,st);
  ctx.save(); ctx.strokeStyle=C.mouth; ctx.lineWidth=3.5; ctx.lineCap='round';
  if(e==='talk'){ E(ctx,0,-334,9,8,'#8E4A58'); E(ctx,0,-330,5,3,'#E58E9E'); }
  else if(e==='soft'){ ctx.beginPath(); ctx.moveTo(-10,-337); ctx.quadraticCurveTo(0,-329,10,-337); ctx.stroke(); }
  else { ctx.beginPath(); ctx.moveTo(-7,-334); ctx.lineTo(7,-334); ctx.stroke(); }    // 高傲：嘴角平
  ctx.restore();
  // 瀏海（齊瀏海，尾端分成幾束）＋兩側髮束
  S(ctx,[[-112,-420],[-104,-480],[-60,-512],[0,-522],[60,-512],[104,-480],[112,-420],[96,-404],[80,-430],[62,-410],[40,-436],[20,-414],[0,-438],[-20,-414],[-40,-436],[-62,-410],[-80,-430],[-96,-404]],C.hair);
  S(ctx,[[-112,-430],[-122,-360],[-112,-300],[-92,-290],[-94,-340],[-98,-410]],C.hair);
  S(ctx,[[112,-430],[122,-360],[112,-300],[92,-290],[94,-340],[98,-410]],C.hair);
  S(ctx,[[-40,-506],[-10,-514],[20,-508],[-6,-496]],C.hairLight);           // 頭髮光澤
  earBow(ctx);
}
function arm(ctx, side, raise){
  // side=-1 左、1 右；raise＝舉起角度（0＝自然垂下）
  ctx.save(); ctx.translate(side*46,-268); ctx.rotate(raise||side*-0.28);
  S(ctx,[[-17,-6],[17,-6],[22,30],[16,72],[-16,72],[-22,30]],C.sleeve);     // 泡泡袖（比洋裝淺一階，才看得出手臂）
  P(ctx,[[-18,66],[18,66],[16,80],[-16,80]],C.lace);                         // 袖口蕾絲
  E(ctx,0,90,14,14,C.skin);                                                   // 手
  ctx.restore();
}
function body(ctx, st){
  E(ctx,0,4,110,16,C.shadow);
  tail(ctx, st.tail||0);
  // 腿、白短襪、瑪莉珍鞋
  [-24,24].forEach(x=>{ P(ctx,[[x-11,-112],[x+11,-112],[x+10,-40],[x-10,-40]],C.skin);
    P(ctx,[[x-12,-44],[x+12,-44],[x+12,-16],[x-12,-16]],C.sock);
    E(ctx,x+(x<0?-4:4),-10,22,12,C.shoe); P(ctx,[[x-11,-30],[x+11,-30],[x+11,-25],[x-11,-25]],C.shoe); });
  // 裙子：底下白色蕾絲襯裙＋紫色裙＋深紫蕾絲裙襬
  for(let i=-6;i<=6;i++) E(ctx,i*12.5,-104,7.5,7.5,C.lace);
  P(ctx,[[-44,-232],[44,-232],[78,-112],[-78,-112]],C.dress);
  for(let i=-6;i<=6;i++) E(ctx,i*12.6,-113,6.5,6.5,C.dressDark);
  P(ctx,[[-78,-118],[78,-118],[78,-112],[-78,-112]],C.dressDark);
  // 上身
  P(ctx,[[-40,-300],[40,-300],[46,-228],[-46,-228]],C.dress);
  E(ctx,0,-232,48,6,C.dressDark);                                             // 腰帶
}
function cape(ctx){
  // 連帽小斗篷（肩上一圈，前面打紫色蝴蝶結）
  S(ctx,[[-70,-306],[0,-318],[70,-306],[86,-262],[60,-246],[0,-262],[-60,-246],[-86,-262]],C.cape);
  P(ctx,[[0,-276],[-24,-290],[-26,-264]],C.capeIn); P(ctx,[[0,-276],[24,-290],[26,-264]],C.capeIn); E(ctx,0,-276,7,7,C.dressDark);
  // 脖子＋頸鍊銀彎月
  P(ctx,[[-13,-318],[13,-318],[13,-300],[-13,-300]],C.skinShade);
  P(ctx,[[-15,-312],[15,-312],[15,-305],[-15,-305]],C.dressDark);
  E(ctx,0,-298,6,6,C.charm); E(ctx,3,-300,5,5,C.cape);
}
function drawNita(ctx, st){
  ctx.save(); ctx.translate(st.x, st.y); ctx.scale(st.s||1, st.s||1);
  if(st.headOnly){ ctx.translate(0,400); ctx.rotate(st.headTilt||0); ctx.translate(0,-400); headBack(ctx); head(ctx,st); ctx.restore(); return; }
  ctx.save(); ctx.translate(0,-310); ctx.rotate(st.headTilt||0); ctx.translate(0,310); headBack(ctx); ctx.restore();
  body(ctx, st);
  arm(ctx,-1,0);
  if(st.pose!=='point') arm(ctx,1,0);
  cape(ctx);
  ctx.save(); ctx.translate(0,-310); ctx.rotate(st.headTilt||0); ctx.translate(0,310); head(ctx,st); ctx.restore();
  if(st.pose==='point') arm(ctx,1,st.pointAng ?? -1.9);
  ctx.restore();
}
const NITA = {draw:drawNita, colors:C};
if(typeof module!=='undefined') module.exports=NITA; else window.NITA=NITA;
})();
