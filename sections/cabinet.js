window.Sections=window.Sections||{};
window.Sections.cabinet={mount:function(host,ctx){
 var M=window.CABMAP,Z=M.zones,B=M.box,R=window.ROOMS,CT=window.CONTENT||{},RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
 var TOTAL=R.reduce(function(n,r){return n+r.photos.length},0);
 if(TOTAL!==19&&window.console)console.warn('Photos in js/photos.js: '+TOTAL+' (the plan says 19)');
 var KEY='arn-cab-v2',S={};
 try{S=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){}
 if(/[?&]reset/.test(location.search))S={};
 S.caught=S.caught||[];
 function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
 function A(el,kf,o){o=o||{};if(!o.fill)o.fill='forwards';if(RM)o.duration=1;return el.animate(kf,o).finished.catch(function(){})}
 function wait(ms){return new Promise(function(r){setTimeout(r,RM?1:ms)})}
 function bbox(pts,g){g=g||0;var xs=pts.map(function(p){return p[0]}),ys=pts.map(function(p){return p[1]});var x=Math.min.apply(0,xs)-g,y=Math.min.apply(0,ys)-g;return{x:x,y:y,w:Math.max.apply(0,xs)+g-x,h:Math.max.apply(0,ys)+g-y}}
 function pos(b){return'left:'+((b.x-B[0])/B[2]*100)+'%;top:'+((b.y-B[1])/B[3]*100)+'%;width:'+(b.w/B[2]*100)+'%;height:'+(b.h/B[3]*100)+'%'}
 /* polygon with softly rounded corners, so the highlight never looks like a hard box */
 function soft(p,r){var n=p.length,d='';
  for(var i=0;i<n;i++){var a=p[(i+n-1)%n],b=p[i],c=p[(i+1)%n];
   function u(q){var dx=q[0]-b[0],dy=q[1]-b[1],l=Math.sqrt(dx*dx+dy*dy)||1;return[dx/l,dy/l,l]}
   var v1=u(a),v2=u(c),l1=Math.min(r,v1[2]/2),l2=Math.min(r,v2[2]/2);
   d+=(i?'L':'M')+(b[0]+v1[0]*l1).toFixed(1)+' '+(b[1]+v1[1]*l1).toFixed(1)+'Q'+b[0]+' '+b[1]+' '+(b[0]+v2[0]*l2).toFixed(1)+' '+(b[1]+v2[1]*l2).toFixed(1)}
  return d+'Z'}
 function caughtIn(r){return r.photos.filter(function(p,i){return S.caught.indexOf(r.id+'-'+i)>-1}).length}
 function allDone(){return S.caught.length>=TOTAL}
 var KEYSVG='<svg viewBox="0 0 64 28" aria-hidden="true"><g fill="none" stroke="#b9782c" stroke-width="2.4" stroke-linejoin="round"><circle cx="11" cy="14" r="9" fill="#f2c24a"/><circle cx="11" cy="14" r="3.4" fill="#fff4cf"/><path d="M20 14H60" stroke-width="5"/><path d="M20 14H60" stroke-width="2.6" stroke="#f2c24a"/><path d="M50 14V24M58 14V21" stroke-width="4"/><path d="M50 14V23M58 14V20" stroke-width="1.8" stroke="#f2c24a"/></g></svg>';
 var SCROLLSVG='<svg viewBox="0 0 80 70" aria-hidden="true"><rect x="8" y="14" width="64" height="44" rx="4" fill="#f5e8c6" stroke="#c9b27a" stroke-width="2.5"/><rect x="4" y="10" width="72" height="9" rx="4.5" fill="#ecd9a6" stroke="#c9b27a" stroke-width="2.5"/><rect x="4" y="53" width="72" height="9" rx="4.5" fill="#ecd9a6" stroke="#c9b27a" stroke-width="2.5"/><rect x="34" y="8" width="12" height="56" fill="#d8737f" stroke="#a84a58" stroke-width="2"/></svg>';
 var SPECIAL={envelope:'The letter',clouds:'The cloudy drawer',castle:'Our story',lock:'The locked drawer'};
 var s=document.createElement('section');s.className='sec cabsec';s.dataset.phase='explore';
 var zones='',fogs='',seed=3;
 R.forEach(function(r,i){zones+='<path class="zone room" data-r="'+i+'" tabindex="0" role="button" aria-label="Open '+r.title+'" d="'+soft(Z[r.zone],10)+'"/>'});
 Object.keys(SPECIAL).forEach(function(k){
  zones+='<path class="zone special off" data-z="'+k+'" tabindex="-1" role="button" aria-label="'+SPECIAL[k]+'" d="'+soft(Z[k],10)+'"/>';
  var b=bbox(Z[k],7),clip=Z[k].map(function(p){return((p[0]-b.x)/b.w*100).toFixed(1)+'% '+((p[1]-b.y)/b.h*100).toFixed(1)+'%'}).join(',');
  var blobs='';for(var j=0;j<6;j++){seed=(seed*37+11)%101;var x=10+(seed*7)%80,y=10+(seed*13)%80;blobs+='<i style="--x:'+x+'%;--y:'+y+'%;--s:'+(70+seed%40)+'%;--d:'+(7+seed%6)+'s;--mx:'+((seed%5)*5-10)+'%;--my:'+((seed%7)*4-12)+'%"></i>'}
  fogs+='<div class="fog" data-f="'+k+'" style="'+pos(b)+';clip-path:polygon('+clip+')">'+blobs+'</div>'});
 var lb=bbox(Z.lock);
 s.innerHTML='<div class="cabtop"><p class="cabcap"></p><div class="keybadge" hidden aria-label="You have the key">'+KEYSVG+'</div></div><div class="cabbox"><div class="cab" id="cab"><img class="cabimg" src="cabinet.webp" alt="A painted wooden cabinet full of little rooms" draggable="false">'
  +'<div class="lockbay" style="'+pos(lb)+'"><img class="lockfront" src="lockfront.webp" alt="" draggable="false"><span class="lockglow"></span></div>'
  +'<svg class="map" viewBox="'+B.join(' ')+'">'+zones+'</svg>'+fogs+'</div></div><p class="tally"></p><button class="pill primary" id="cont" type="button" hidden>Play the game</button>';
 host.appendChild(s);
 var cab=s.querySelector('#cab'),cap=s.querySelector('.cabcap'),tally=s.querySelector('.tally'),cont=s.querySelector('#cont'),badge=s.querySelector('.keybadge'),bay=s.querySelector('.lockbay'),front=s.querySelector('.lockfront'),glow=s.querySelector('.lockglow');
 function zone(k){return s.querySelector('.zone[data-z="'+k+'"]')}
 function roomZone(i){return s.querySelector('.zone.room[data-r="'+i+'"]')}
 function enable(k,pulse){var z=zone(k);z.classList.remove('off');z.tabIndex=0;z.classList.toggle('pulse',!!pulse)}
 function lift(k,instant){var f=s.querySelector('.fog[data-f="'+k+'"]');if(f){if(instant)f.remove();else{f.classList.add('lift');setTimeout(function(){f.remove()},1900)}}}
 function stage(p){
  s.dataset.phase=p;
  var T={letter:'The mist over the envelope has cleared',poem:'The cloudy drawer is open now',story:'The castle is waiting for you',lock:'One last drawer is still locked',done:''};
  cap.textContent=T[p]||'';tally.textContent='';
  ['envelope','clouds','castle','lock'].forEach(function(k){var z=zone(k);if(z)z.classList.remove('pulse')})}
 function refresh(){
  R.forEach(function(r,i){roomZone(i).classList.toggle('done',caughtIn(r)===r.photos.length)});
  if(s.dataset.phase==='explore'){cap.textContent='Open every room and catch all the photos';tally.textContent='Caught '+S.caught.length+' / '+TOTAL}}
 refresh();
 function act(el,fn){el.addEventListener('click',fn);el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();fn()}})}
 var room=null;
 R.forEach(function(r,i){act(roomZone(i),function(){if(!room&&s.dataset.phase==='explore')openRoom(i)})});

 /* ---------- rooms ---------- */
 function openRoom(i){
  var r=R[i],cell=bbox(Z[r.zone]),cr=cab.getBoundingClientRect(),sc=cr.width/B[2];
  var ox=(cell.x+cell.w/2-B[0])*sc,oy=(cell.y+cell.h/2-B[1])*sc,cx=cr.left+ox,cy=cr.top+oy;
  var k=Math.min(9,Math.min(innerWidth/(cell.w*sc),innerHeight/(cell.h*sc))*1.08);
  var left=r.photos.map(function(p,n){return n}).filter(function(n){return S.caught.indexOf(r.id+'-'+n)<0});
  var el=document.createElement('div');el.className='room';el.style.setProperty('--c',r.color);
  el.innerHTML='<div class="rbackdrop"><img src="rooms/'+r.id+'.webp" alt="" draggable="false"></div><div class="rshade"></div><header class="rbar"><button class="pill rbtn" type="button">\u2039 Cabinet</button><div class="rtitle"></div><div class="rcount"><b></b> / '+r.photos.length+'</div></header><div class="rfield"></div><p class="rmsg" role="status"></p>';
  el.querySelector('.rtitle').textContent=r.title;
  document.body.appendChild(el);
  room={i:i,el:el,k:k,tx:innerWidth/2-cx,ty:innerHeight/2-cy};
  cab.style.transformOrigin=ox+'px '+oy+'px';
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
  if(!room)return Promise.resolve();var rm=room;room=null;
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

 /* ---------- paper overlays: letter, poem, story ---------- */
 function paper(kind,pages,img,last,onClose){
  var T=CT[kind]||{},ov=document.createElement('div'),i=0;ov.className='ov';
  ov.innerHTML='<div class="paper '+kind+'" dir="'+(T.dir||'ltr')+'">'+(img?'<div class="phead"><img src="'+img+'" alt="" draggable="false"></div>':'')+'<div class="ptxt"></div><button class="pill primary pbtn" type="button"></button></div>';
  var box=ov.querySelector('.ptxt'),b=ov.querySelector('.pbtn');
  function render(){box.innerHTML='';var pg=pages[i],h=document.createElement('h3');h.textContent=pg.title||'';box.appendChild(h);
   (pg.lines||[]).forEach(function(t){var p=document.createElement('p');p.textContent=t;box.appendChild(p)});
   box.scrollTop=0;b.textContent=i<pages.length-1?'Next':last}
  render();document.body.appendChild(ov);
  A(ov,[{opacity:0},{opacity:1}],{duration:320});
  A(ov.firstChild,[{transform:'translateY(40px) scale(.92)',opacity:0},{transform:'none',opacity:1}],{duration:520,easing:'cubic-bezier(.25,1.2,.4,1)'});
  b.onclick=function(){
   if(i<pages.length-1){i++;render();return}
   b.disabled=true;A(ov,[{opacity:1},{opacity:0}],{duration:340}).then(function(){ov.remove();onClose()})}}
 function center(el){var r=el.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}}
 function sprite(cls,svg,w){var e=document.createElement('div');e.className=cls;e.innerHTML=svg;e.style.width=w+'px';document.body.appendChild(e);return e}

 /* ---------- the story, in the order you described ---------- */
 function beginLetter(){stage('letter');lift('envelope');enable('envelope',true)}
 act(zone('envelope'),function(){
  var L=CT.letter||{};
  paper('letter',[{title:L.title||'',lines:L.paragraphs||[]}],null,'Fold the letter',function(){if(!S.lr)foundKey();})});
 async function foundKey(){
  S.lr=1;save();
  var e=center(zone('envelope')),k=sprite('keyspr',KEYSVG,64);k.style.left=(e.x-32)+'px';k.style.top=(e.y-14)+'px';
  await A(k,[{transform:'scale(0) rotate(-40deg)',opacity:0},{transform:'scale(1.7) rotate(8deg)',opacity:1,offset:.7},{transform:'scale(1.4) rotate(0)',opacity:1}],{duration:800,easing:'ease-out'});
  await wait(700);
  badge.hidden=false;var b=center(badge);
  await A(k,[{transform:'translate(0,0) scale(1.4)'},{transform:'translate('+(b.x-e.x)+'px,'+(b.y-e.y)+'px) scale(.45)',opacity:.9}],{duration:900,easing:'cubic-bezier(.5,0,.3,1)'});
  k.remove();A(badge,[{transform:'scale(0)'},{transform:'scale(1.3)'},{transform:'scale(1)'}],{duration:450});
  stage('poem');lift('clouds');enable('clouds',true);S.kb=1;save()}
 act(zone('clouds'),async function(){
  var P=CT.poem||{},c=center(zone('clouds')),sc=sprite('scrollspr',SCROLLSVG,84);sc.style.left=(c.x-42)+'px';sc.style.top=(c.y-35)+'px';
  zone('clouds').classList.remove('pulse');
  await A(sc,[{transform:'scale(.2) translateY(30px)',opacity:0},{transform:'scale(1.5) translateY(-60px) rotate(-8deg)',opacity:1,offset:.7},{transform:'scale(1.3) translateY(-50px)',opacity:1}],{duration:800,easing:'ease-out'});
  await wait(350);sc.remove();
  paper('poem',[{title:P.title||'',lines:P.lines||[]}],'rooms/poem.webp','Close',function(){if(!S.pm){S.pm=1;save();stage('story');lift('castle');enable('castle',true)}})});
 act(zone('castle'),function(){
  var T=CT.story||{pages:[]};zone('castle').classList.remove('pulse');
  paper('story',T.pages,'rooms/story.webp','Close',function(){if(!S.st){S.st=1;save();stage('lock');lift('lock');enable('lock',true)}})});
 act(zone('lock'),async function(){
  if(S.dr)return;S.dr=1;save();zone('lock').classList.remove('pulse');
  var k=sprite('keyspr',KEYSVG,64),b=center(badge),h=center(zone('lock'));k.style.left=(b.x-32)+'px';k.style.top=(b.y-14)+'px';
  badge.hidden=true;
  var dx=h.x-b.x-8,dy=h.y-b.y;
  await A(k,[{transform:'translate(0,0) scale(.5)'},{transform:'translate('+dx*.5+'px,'+(dy*.5-60)+'px) scale(1.4) rotate(-15deg)',offset:.5},{transform:'translate('+dx+'px,'+dy+'px) scale(1) rotate(0)'}],{duration:1000,easing:'ease-in-out'});
  await A(k,[{transform:'translate('+dx+'px,'+dy+'px) rotate(0)'},{transform:'translate('+dx+'px,'+dy+'px) rotate(90deg)'}],{duration:420,easing:'ease-in-out'});
  window.Player&&window.Player.fx(function(c,out){var t=c.currentTime,o=c.createOscillator(),g=c.createGain();o.type='square';o.frequency.setValueAtTime(900,t);o.frequency.exponentialRampToValueAtTime(300,t+.09);g.gain.setValueAtTime(.12,t);g.gain.exponentialRampToValueAtTime(.001,t+.12);o.connect(g);g.connect(out);o.start(t);o.stop(t+.14)});
  A(k,[{opacity:1},{opacity:0}],{duration:400,delay:150}).then(function(){k.remove()});
  bay.style.visibility='visible';
  await A(front,[{transform:'none'},{transform:'translateY(78%) scale(1.06)'}],{duration:800,easing:'cubic-bezier(.3,1.2,.5,1)'});
  A(glow,[{opacity:0,transform:'scale(.4)'},{opacity:1,transform:'scale(1.4)',offset:.5},{opacity:.85,transform:'scale(1.1)'}],{duration:900});
  await wait(900);finish()});
 function finish(){stage('done');cont.hidden=false;A(cont,[{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'none'}],{duration:500})}
 cont.onclick=function(){ctx.next()};

 /* ---------- resume where she left off ---------- */
 function opened(){bay.style.visibility='visible';front.style.transform='translateY(78%) scale(1.06)';glow.style.opacity='.85'}
 if(S.kb)badge.hidden=false;
 if(S.dr){['envelope','clouds','castle','lock'].forEach(function(k){lift(k,true);enable(k)});opened();badge.hidden=true;finish()}
 else if(S.st){['envelope','clouds','castle'].forEach(function(k){lift(k,true);enable(k)});lift('lock',true);enable('lock',true);stage('lock')}
 else if(S.pm){['envelope','clouds'].forEach(function(k){lift(k,true);enable(k)});lift('castle',true);enable('castle',true);stage('story')}
 else if(S.lr){lift('envelope',true);enable('envelope');lift('clouds',true);enable('clouds',true);stage('poem');badge.hidden=false}
 else if(allDone()){
  if(S.fin)wait(600).then(beginLetter);
  else wait(800).then(function(){Finale.show({total:TOTAL,onNext:function(){S.fin=1;save();wait(300).then(beginLetter)}})})}
}};
