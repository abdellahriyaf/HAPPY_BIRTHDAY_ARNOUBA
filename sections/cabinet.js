window.Sections=window.Sections||{};
window.Sections.cabinet={mount:function(host,ctx){
 var C=window.CabArt,R=window.ROOMS,CT=window.CONTENT||{},RM=matchMedia('(prefers-reduced-motion: reduce)').matches,VB=C.VB;
 var TOTAL=R.reduce(function(n,r){return n+r.photos.length},0);
 if(TOTAL!==19&&window.console)console.warn('Photos in js/photos.js: '+TOTAL+' (the plan says 19)');
 var KEY='arn-cab-v1',S={};
 try{S=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){}
 if(/[?&]reset/.test(location.search))S={};
 S.caught=S.caught||[];
 function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
 function A(el,kf,o){o=o||{};if(!o.fill)o.fill='forwards';if(RM)o.duration=1;return el.animate(kf,o).finished.catch(function(){})}
 function wait(ms){return new Promise(function(r){setTimeout(r,RM?1:ms)})}
 function pos(c,g){g=g||0;return'left:'+((c.x-g-VB[0])/VB[2]*100)+'%;top:'+((c.y-g-VB[1])/VB[3]*100)+'%;width:'+((c.w+2*g)/VB[2]*100)+'%;height:'+((c.h+2*g)/VB[3]*100)+'%'}
 function caughtIn(r){return r.photos.filter(function(p,i){return S.caught.indexOf(r.id+'-'+i)>-1}).length}
 function allDone(){return S.caught.length>=TOTAL}
 var CE=C.CELLS;
 var s=document.createElement('section');s.className='sec cabsec';s.dataset.phase='explore';
 s.innerHTML='<p class="cabcap"></p><div class="cabbox"><div class="cab" id="cab">'+C.svg()
  +R.map(function(r,i){return'<button class="hit room" type="button" data-r="'+i+'" style="'+pos(CE[r.cell])+'" aria-label="Open '+r.title+'"><span class="pip"></span></button>'}).join('')
  +'<div class="drawerbay" style="'+pos(CE.B2)+'"><div class="drawer">'+C.drawer()+'</div><div class="scrollspr" hidden>'+C.scroll()+'</div></div>'
  +'<button class="hit lock" type="button" style="'+pos(CE.B2)+'" aria-label="Locked drawer" disabled></button>'
  +'<div class="door" style="'+pos(CE.E,3)+'">'+C.door()+'</div>'
  +'<button class="hit env" type="button" style="'+pos(CE.E)+'" aria-label="Open the letter" disabled></button></div></div>'
  +'<p class="tally"></p><button class="pill primary" id="cont" type="button" hidden>Continue</button>';
 host.appendChild(s);C.mount(s);
 var cab=s.querySelector('#cab'),cap=s.querySelector('.cabcap'),tally=s.querySelector('.tally'),cont=s.querySelector('#cont'),door=s.querySelector('.door'),drawer=s.querySelector('.drawer'),scrollSpr=s.querySelector('.scrollspr'),envBtn=s.querySelector('.env'),hits=[].slice.call(s.querySelectorAll('.hit.room'));
 function refresh(){
  hits.forEach(function(b,i){var r=R[i],left=r.photos.length-caughtIn(r),p=b.querySelector('.pip');
   p.textContent=left?left:'\u2605';b.classList.toggle('done',!left)});
  if(s.dataset.phase==='explore'){cap.textContent='Open every room and catch all the photos';tally.textContent='Caught '+S.caught.length+' / '+TOTAL}}
 refresh();
 var room=null;
 hits.forEach(function(b,i){b.onclick=function(){if(!room&&s.dataset.phase==='explore')openRoom(i)}});

 /* ---------- rooms ---------- */
 function openRoom(i){
  var r=R[i],cell=CE[r.cell],cr=cab.getBoundingClientRect(),sc=cr.width/VB[2];
  var ox=(cell.x+cell.w/2-VB[0])*sc,oy=(cell.y+cell.h/2-VB[1])*sc,cx=cr.left+ox,cy=cr.top+oy;
  var k=Math.min(9,Math.min(innerWidth/(cell.w*sc),innerHeight/(cell.h*sc))*1.08);
  var left=r.photos.map(function(p,n){return n}).filter(function(n){return S.caught.indexOf(r.id+'-'+n)<0});
  var el=document.createElement('div');el.className='room';el.style.setProperty('--c',r.color);
  el.innerHTML='<div class="rbackdrop">'+C.back(r.cell,cell.w,cell.h)+'</div><div class="rshade"></div><header class="rbar"><button class="pill rbtn" type="button">\u2039 Cabinet</button><div class="rtitle"></div><div class="rcount"><b></b> / '+r.photos.length+'</div></header><div class="rfield"></div><p class="rmsg" role="status"></p>';
  el.querySelector('.rtitle').textContent=r.title;
  document.body.appendChild(el);
  room={i:i,el:el,k:k,tx:innerWidth/2-cx,ty:innerHeight/2-cy,ox:ox,oy:oy};
  function cnt(){el.querySelector('.rcount b').textContent=caughtIn(r)}cnt();
  var field=el.querySelector('.rfield'),rnd=mulberry(i*31+7),cols=2,rows=Math.ceil(left.length/cols);
  left.forEach(function(n,j){
   var p=r.photos[n],b=document.createElement('button');b.type='button';b.className='fp';b.setAttribute('aria-label','Photo '+(n+1)+' in '+r.title);
   var col=j%cols,row=Math.floor(j/cols),x=10+col*44+(left.length%2&&j===left.length-1?22:0)+rnd()*6,y=16+row*(66/Math.max(rows,1))+rnd()*4;
   b.style.cssText='left:'+x+'%;top:'+y+'%;--r:'+(rnd()*8-4).toFixed(1)+'deg;--ax:'+(rnd()*60-30).toFixed(0)+'px;--ay:'+(rnd()*50-25).toFixed(0)+'px;--bx:'+(rnd()*70-35).toFixed(0)+'px;--by:'+(rnd()*60-30).toFixed(0)+'px;--cx:'+(rnd()*50-25).toFixed(0)+'px;--cy:'+(rnd()*50-25).toFixed(0)+'px;--d:'+(16+rnd()*10).toFixed(1)+'s;--dl:-'+(rnd()*12).toFixed(1)+'s';
   b.innerHTML='<span class="tape"></span><span class="pimg"><img alt="" src="'+p.src+'" onerror="this.remove()"></span>';
   b.onclick=function(){openViewer(r,n,b,cnt)};field.appendChild(b)});
  A(cab,[{transform:'none',filter:'blur(0px)'},{transform:'translate('+room.tx+'px,'+room.ty+'px) scale('+k+')',filter:'blur(10px)'}],{duration:720,easing:'cubic-bezier(.65,0,.85,.4)'});
  wait(440).then(function(){A(el,[{opacity:0},{opacity:1}],{duration:340})});
  wait(800).then(function(){cab.style.visibility='hidden'});
  el.querySelector('.rbtn').onclick=function(){closeRoom()}}
 function closeRoom(){
  if(!room)return;var rm=room;room=null;
  cab.style.visibility='';
  A(rm.el,[{opacity:1},{opacity:0}],{duration:320});
  A(cab,[{transform:'translate('+rm.tx+'px,'+rm.ty+'px) scale('+rm.k+')',filter:'blur(10px)'},{transform:'none',filter:'blur(0px)'}],{duration:650,easing:'cubic-bezier(.15,.6,.35,1)'}).then(function(){rm.el.remove();refresh()});
  return wait(650)}
 function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}

 /* ---------- photo viewer ---------- */
 function openViewer(r,n,fp,cnt){
  var p=r.photos[n],v=document.createElement('div');v.className='viewer';
  v.innerHTML='<figure class="big"><span class="pimg"><img alt="" src="'+p.src+'" onerror="this.remove()"></span><figcaption></figcaption></figure><button class="pill primary keep" type="button">Keep it \u2665</button>';
  v.querySelector('figcaption').textContent=p.note||'';
  document.body.appendChild(v);
  var fig=v.querySelector('.big'),f=fp.getBoundingClientRect(),t=fig.getBoundingClientRect();
  fp.style.visibility='hidden';
  A(v,[{opacity:0},{opacity:1}],{duration:260});
  A(fig,[{transform:'translate('+(f.left+f.width/2-t.left-t.width/2)+'px,'+(f.top+f.height/2-t.top-t.height/2)+'px) scale('+(f.width/t.width)+')'},{transform:'none'}],{duration:520,easing:'cubic-bezier(.25,1.2,.4,1)'});
  var done=false;
  function close(){
   if(done)return;done=true;
   var target=room&&room.el.querySelector('.rcount').getBoundingClientRect(),b=fig.getBoundingClientRect();
   S.caught.push(r.id+'-'+n);save();
   if(target)A(fig,[{transform:'none',opacity:1},{transform:'translate('+(target.left+target.width/2-b.left-b.width/2)+'px,'+(target.top+target.height/2-b.top-b.height/2)+'px) scale(.12)',opacity:0}],{duration:560,easing:'cubic-bezier(.5,0,.3,1)'});
   A(v,[{opacity:1},{opacity:0}],{duration:380,delay:200}).then(function(){v.remove()});
   fp.remove();
   wait(560).then(function(){
    cnt();var rc=room&&room.el.querySelector('.rcount');if(rc)A(rc,[{transform:'scale(1)'},{transform:'scale(1.35)'},{transform:'scale(1)'}],{duration:360});
    var left=r.photos.length-caughtIn(r),msg=room&&room.el.querySelector('.rmsg');
    if(!left&&room){msg.textContent=allDone()?'That was the last one!':'All found in this room \u2726';A(msg,[{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'none'}],{duration:400});
     wait(1500).then(function(){if(allDone()){S.fin=1;save();Finale.show({total:TOTAL,onNext:function(){closeRoom().then(function(){wait(300).then(beginLetter)})}})}else closeRoom()})}})}
  v.querySelector('.keep').onclick=close;v.onclick=function(e){if(e.target===v)close()}
  addEventListener('keydown',function esc(e){if(e.key==='Escape'){removeEventListener('keydown',esc);close()}})}

 /* ---------- letter, key, poem ---------- */
 function beginLetter(){
  s.dataset.phase='letter';cap.textContent='Something is waiting for you in the envelope';tally.textContent='';
  A(door,[{transform:'perspective(700px) rotateY(0deg)'},{transform:'perspective(700px) rotateY(-112deg)'}],{duration:1100,easing:'cubic-bezier(.4,0,.2,1)'}).then(function(){door.style.visibility='hidden'});
  wait(900).then(function(){envBtn.disabled=false;envBtn.classList.add('glow')})}
 envBtn.onclick=function(){envBtn.disabled=true;envBtn.classList.remove('glow');openLetter()};
 function paper(kind,title,lines,btnText,onClose){
  var T=CT[kind]||{},ov=document.createElement('div');ov.className='ov';ov.innerHTML='<div class="paper '+kind+'" dir="'+(T.dir||'ltr')+'"><div class="ptxt"><h3></h3></div><button class="pill primary pbtn" type="button"></button></div>';
  var box=ov.querySelector('.ptxt');ov.querySelector('h3').textContent=title;
  lines.forEach(function(t){var p=document.createElement('p');p.textContent=t;box.appendChild(p)});
  var b=ov.querySelector('.pbtn');b.textContent=btnText;document.body.appendChild(ov);
  A(ov,[{opacity:0},{opacity:1}],{duration:320});
  A(ov.firstChild,[{transform:'translateY(40px) scale(.92)',opacity:0},{transform:'none',opacity:1}],{duration:520,easing:'cubic-bezier(.25,1.2,.4,1)'});
  b.onclick=function(){b.disabled=true;A(ov,[{opacity:1},{opacity:0}],{duration:340}).then(function(){ov.remove();onClose()})}}
 function openLetter(){
  var L=CT.letter||{lines:[]};
  paper('letter',L.title||'',L.paragraphs||[],'Fold the letter',function(){S.lr=1;save();keySequence()})}
 function center(el){var r=el.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}}
 async function keySequence(){
  var k=document.createElement('div');k.className='keyspr';k.innerHTML=C.key();document.body.appendChild(k);
  var e=center(envBtn),h=center(s.querySelector('.lock')),kw=64;
  k.style.left=(e.x-kw/2)+'px';k.style.top=(e.y-14)+'px';
  await A(k,[{transform:'scale(0) rotate(-40deg)',opacity:0},{transform:'scale(1.5) rotate(8deg)',opacity:1,offset:.7},{transform:'scale(1.2) rotate(0)',opacity:1}],{duration:700,easing:'ease-out'});
  await wait(350);
  var dx=h.x-e.x-6,dy=h.y-e.y;
  await A(k,[{transform:'translate(0,0) scale(1.2)'},{transform:'translate('+dx*.5+'px,'+(dy*.5-70)+'px) scale(1.4) rotate(-20deg)',offset:.5},{transform:'translate('+dx+'px,'+dy+'px) scale(1) rotate(0deg)'}],{duration:1000,easing:'ease-in-out'});
  await A(k,[{transform:'translate('+dx+'px,'+dy+'px) scale(1) rotate(0deg)'},{transform:'translate('+dx+'px,'+dy+'px) scale(1) rotate(90deg)'}],{duration:420,easing:'ease-in-out'});
  window.Player&&window.Player.fx(function(c,out){var t=c.currentTime,o=c.createOscillator(),g=c.createGain();o.type='square';o.frequency.setValueAtTime(900,t);o.frequency.exponentialRampToValueAtTime(300,t+.09);g.gain.setValueAtTime(.12,t);g.gain.exponentialRampToValueAtTime(.001,t+.12);o.connect(g);g.connect(out);o.start(t);o.stop(t+.14)});
  A(k,[{opacity:1},{opacity:0}],{duration:400,delay:150});
  await A(drawer,[{transform:'none'},{transform:'translateY(48%) scale(1.07)'}],{duration:650,easing:'cubic-bezier(.3,1.3,.5,1)'});
  k.remove();
  scrollSpr.hidden=false;
  await A(scrollSpr,[{transform:'translateY(40%) scale(.2)',opacity:0},{transform:'translateY(-120%) scale(1.5) rotate(-8deg)',opacity:1,offset:.7},{transform:'translateY(-90%) scale(1.3) rotate(0)',opacity:1}],{duration:800,easing:'ease-out'});
  await wait(500);
  var P=CT.poem||{lines:[]};
  paper('poem',P.title||'',P.lines||[],'Close',function(){S.pm=1;save();finish()})}
 function finish(){s.dataset.phase='done';cap.textContent='';tally.textContent='';cont.hidden=false;A(cont,[{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'none'}],{duration:500});
  var lock=s.querySelector('.lock');lock.disabled=false;lock.onclick=function(){var P=CT.poem||{lines:[]};paper('poem',P.title||'',P.lines||[],'Close',function(){})}}
 cont.onclick=function(){ctx.next()};

 /* ---------- resume where she left off ---------- */
 if(allDone()){
  if(S.pm){door.style.visibility='hidden';drawer.style.transform='translateY(48%) scale(1.07)';scrollSpr.hidden=false;scrollSpr.style.transform='translateY(-90%) scale(1.3)';finish()}
  else if(S.lr){door.style.visibility='hidden';wait(900).then(keySequence)}
  else if(S.fin){wait(600).then(beginLetter)}
  else{wait(800).then(function(){Finale.show({total:TOTAL,onNext:function(){S.fin=1;save();wait(300).then(beginLetter)}})})}}
}};
