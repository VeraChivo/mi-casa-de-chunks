// 🏠 妮妲的角落（場景模組，扁平插畫、無輪廓線）——背景用低彩度暖色，讓灰藍＋紫色的妮妲跳出來
// 世界座標固定 1080×1350（4:5），鏡頭用 SCENE.camera() 推近拉遠，同一個房間在每幕都長一樣
(function(){
const C = {
  wallL:'#F3EADF', wallR:'#E8DBC9', base:'#DCCBB5', floor:'#D9C2A2', floorLine:'rgba(150,115,80,.18)',
  frame:'#FFFDF8', glass:'#CFE6EC', cloud:'#FFFFFF', wood:'#C9935A', woodDark:'#A9773F', signText:'#FFF6E6',
  box:'#D7B48A', boxTop:'#C49C6E', boxTape:'#E6CCA6', cushion:'#9EC4BE', cushionIn:'#C3DCD7',
  yarn:'#E9A9B8', yarnLine:'rgba(170,80,100,.45)', pot:'#D99A72', leaf:'#7FA88A', leafDark:'#638F70',
  picFrame:'#B9A58C', picBg:'#5A4878', gold:'#D4A93A', chair:'#C98F7A', chairDark:'#B07966', shadow:'rgba(80,60,40,.14)'
};
const W=1080, H=1350;
function E(ctx,cx,cy,rx,ry,f){ ctx.beginPath(); ctx.ellipse(cx,cy,rx,ry,0,0,Math.PI*2); ctx.fillStyle=f; ctx.fill(); }
function P(ctx,pts,f){ ctx.beginPath(); ctx.moveTo(pts[0][0],pts[0][1]); for(let i=1;i<pts.length;i++) ctx.lineTo(pts[i][0],pts[i][1]); ctx.closePath(); ctx.fillStyle=f; ctx.fill(); }
function R(ctx,x,y,w,h,r,f){ ctx.beginPath(); ctx.roundRect(x,y,w,h,r); ctx.fillStyle=f; ctx.fill(); }

// opts.signGlow: 0~1 木牌發亮（第4句指木牌時用）；opts.chair: 0~1 大沙發出現（第7句比大小用）
function room(ctx, opts={}){
  // 牆角在 x=640：左牆亮、右牆暗一點；地板
  P(ctx,[[-400,-400],[640,-400],[640,960],[-400,1080]],C.wallL);
  P(ctx,[[640,-400],[1500,-400],[1500,1080],[640,960]],C.wallR);
  P(ctx,[[-400,1080],[640,960],[1500,1080],[1500,1800],[-400,1800]],C.floor);
  P(ctx,[[-400,1062],[640,944],[640,960],[-400,1080]],C.base);
  P(ctx,[[640,944],[1500,1062],[1500,1080],[640,960]],C.base);
  for(let i=1;i<6;i++){ const y=1080+i*70; P(ctx,[[-400,y],[1500,y],[1500,y+3],[-400,y+3]],C.floorLine); }
  // 左牆窗戶
  R(ctx,110,240,270,320,18,C.frame); R(ctx,128,258,234,284,10,C.glass);
  E(ctx,200,350,52,22,C.cloud); E(ctx,238,340,36,20,C.cloud); E(ctx,290,450,40,16,C.cloud);
  P(ctx,[[241,258],[249,258],[249,542],[241,542]],C.frame); P(ctx,[[128,396],[362,396],[362,404],[128,404]],C.frame);
  // 右牆：小圓框（夜空＋金色彎月，呼應她的哥德小配件）
  E(ctx,975,250,58,58,C.picFrame); E(ctx,975,250,46,46,C.picBg); E(ctx,968,246,18,18,C.gold); E(ctx,977,240,15,15,C.picBg);
  // 右牆：木牌「Nita」（用細繩掛在釘子上）
  const glow = opts.signGlow||0;
  ctx.save(); ctx.translate(830,470); ctx.rotate(-0.03);
  ctx.strokeStyle=C.woodDark; ctx.lineWidth=4; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(-58,-46); ctx.lineTo(0,-96); ctx.lineTo(58,-46); ctx.stroke(); E(ctx,0,-98,7,7,C.woodDark);
  if(glow>0){ ctx.save(); ctx.globalAlpha=glow*.55; R(ctx,-122,-62,244,124,26,'#FFF0B8'); ctx.restore(); }
  R(ctx,-106,-48,212,96,16,C.wood);
  P(ctx,[[-96,-14],[96,-14],[96,-10],[-96,-10]],C.woodDark+'55'); P(ctx,[[-96,18],[96,18],[96,22],[-96,22]],C.woodDark+'55');
  ctx.font='800 62px "Liberation Sans","DejaVu Sans",sans-serif'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillStyle=C.signText; ctx.fillText('Nita',0,4);
  ctx.restore();
  // 盆栽（左邊角落）
  E(ctx,120,1062,70,12,C.shadow);
  P(ctx,[[78,960],[162,960],[150,1060],[90,1060]],C.pot);
  [[-30,-70,.5],[0,-100,0],[30,-74,-.5],[-12,-50,.9],[16,-46,-.8]].forEach(([dx,dy,r])=>{ ctx.save(); ctx.translate(120+dx*0.4,960); ctx.rotate(r*0.5); ctx.beginPath(); ctx.ellipse(dx*0.6,dy*0.7,16,46,0,0,Math.PI*2); ctx.fillStyle= r>0?C.leafDark:C.leaf; ctx.fill(); ctx.restore(); });
  // 紙箱（右邊）
  E(ctx,910,1092,120,14,C.shadow);
  P(ctx,[[800,930],[1010,918],[1020,1090],[806,1098]],C.box); P(ctx,[[800,930],[900,880],[1010,918]],C.boxTop);
  P(ctx,[[895,926],[915,925],[920,1094],[900,1095]],C.boxTape);
  // 角落坐墊＋毛線球
  E(ctx,640,1060,210,52,C.shadow); E(ctx,640,1040,200,50,C.cushion); E(ctx,640,1028,150,32,C.cushionIn);
  E(ctx,330,1110,36,34,C.yarn); ctx.save(); ctx.strokeStyle=C.yarnLine; ctx.lineWidth=3; for(let k=-1;k<=1;k++){ ctx.beginPath(); ctx.arc(330,1110,12+Math.abs(k)*10,.3+k*.4,2.7+k*.4); ctx.stroke(); } ctx.restore();
  // 大沙發（第7句：比一比，妮妲很小）
  const ch = opts.chair||0;
  if(ch>0){ ctx.save(); ctx.translate(820,1170); ctx.scale(ch,ch);
    E(ctx,0,10,260,26,C.shadow);
    R(ctx,-230,-560,460,330,60,C.chair); R(ctx,-260,-300,520,300,40,C.chairDark); R(ctx,-200,-320,400,120,30,C.chair);
    R(ctx,-300,-430,110,430,50,C.chairDark); R(ctx,190,-430,110,430,50,C.chairDark);
    ctx.restore(); }
}
// 鏡頭：zoom＝放大倍數，(cx,cy)＝畫面中心對準的世界座標
function camera(ctx, z, cx, cy){ ctx.translate(W/2,H/2); ctx.scale(z,z); ctx.translate(-cx,-cy); }
const SCENE = {room, camera, colors:C, W, H};
if(typeof module!=='undefined') module.exports=SCENE; else window.SCENE=SCENE;
})();
