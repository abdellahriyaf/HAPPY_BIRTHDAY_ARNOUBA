window.Sections=window.Sections||{};
window.Sections.cabinet={mount:function(host,ctx){
'use strict';
var R=window.ROOMS,LOCK=window.CAB_LOCKED||[],KEY='cab_caught_v1';
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
var GOAL=R.reduce(function(a,r){return a+r.photos.length},0);
var caught={};try{caught=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(caught))}catch(e){}}
function cnt(r){return r.photos.filter(function(p,i){return caught[r.id+':'+i]}).length}
function total(){return R.reduce(function(a,r){return a+cnt(r)},0)}
function ph(r,i){return 'data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="'+r.tint+'"/><rect x="8" y="8" width="184" height="184" fill="none" stroke="#6e3b1d" stroke-width="3" stroke-dasharray="8 6"/><text x="100" y="98" text-anchor="middle" font-family="Georgia" font-size="20" fill="#4a2411">'+r.title+'</text><text x="100" y="124" text-anchor="middle" font-family="Georgia" font-size="16" fill="#4a2411">photo '+(i+1)+'</text></svg>')}
function img(r,i){var m=document.createElement('img');m.alt='';m.src=r.photos[i].src;m.onerror=function(){m.onerror=null;m.src=ph(r,i)};return m}
function el(t,c,h){var e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}

var cab=el('div','cab'),stage=el('div','stage'),shade=el('div','shade'),fl=el('div','fl'),hud=el('div','hud'),tip=el('div','tip');
var im=el('img');im.src='img/cabinet.svg';im.alt='A wooden cabinet full of little rooms';stage.appendChild(im);
var score=el('span','pill'),back=el('button','pill','Back');back.type='button';back.hidden=true;
hud.appendChild(back);hud.appendChild(score);
cab.appendChild(stage);cab.appendChild(shade);cab.appendChild(fl);cab.appendChild(hud);cab.appendChild(tip);host.appendChild(cab);

var V,SW,SH,K,cur=null,busy=false,anims=[];
function place(){V={w:cab.clientWidth,h:cab.clientHeight};SW=Math.min(V.w*.98,V.h*.98*.8);SH=SW*1.25;K=SW/1000;
 stage.style.width=SW+'px';stage.style.height=SH+'px';if(!cur)stage.style.transform=rest()}
function rest(){return 'translate('+(V.w-SW)/2+'px,'+(V.h-SH)/2+'px) scale(1)'}
function focus(o){var s=Math.min(V.w/(o.w*K),V.h/(o.h*K))*.92;s=Math.min(s,7);
 return 'translate('+(V.w/2-(o.x+o.w/2)*K*s+(V.w-SW)/2*0)+'px,'+(V.h/2-(o.y+o.h/2)*K*s)+'px) scale('+s+')'}
function move(to){return new Promise(function(ok){
 var from=getComputedStyle(stage).transform;if(from==='none')from=rest();
 if(RM){stage.style.transform=to;return ok()}
 var a=stage.animate([{transform:from,filter:'blur(0px)'},{filter:'blur(9px) saturate(1.2)',offset:.5},{transform:to,filter:'blur(0px)'}],{duration:1150,easing:'cubic-bezier(.65,0,.25,1)'});
 a.onfinish=function(){stage.style.transform=to;ok()}})}
function refresh(){score.textContent='\u2665 '+total()+' / '+GOAL;
 [].forEach.call(stage.querySelectorAll('.hs[data-r]'),function(b){var r=R.filter(function(x){return x.id===b.dataset.r})[0];b.classList.toggle('done',cnt(r)===r.photos.length)})}
function hs(o,locked){var b=el('button','hs'+(locked?' lock':''));b.type='button';b.setAttribute('aria-label',o.title||o.label);
 b.style.cssText='left:'+o.x/10+'%;top:'+o.y/12.5+'%;width:'+o.w/10+'%;height:'+o.h/12.5+'%';
 if(!locked){b.dataset.r=o.id;b.appendChild(el('span','bd','\u2665'));b.onclick=function(){enter(o)}}
 stage.appendChild(b)}
R.forEach(function(r){hs(r,false)});LOCK.forEach(function(l){hs(l,true)});

function lb(r,i){return new Promise(function(ok){
 var k=r.id+':'+i,d=el('div','lb'),c=el('div','lbc');c.appendChild(img(r,i));
 c.appendChild(el('p',null,'')).textContent=r.photos[i].note||'';
 var b=el('button','pill primary','Keep it \u2665');b.type='button';c.appendChild(b);d.appendChild(c);cab.appendChild(d);
 b.onclick=function(){caught[k]=1;save();d.remove();refresh();ok()};b.focus()})}

function drift(f,i,n){
 var w=Math.min(V.w*.3,150),h=w*1.2,pad=8,top=70;f.style.setProperty('--w',w+'px');
 function pt(){return {x:pad+Math.random()*(V.w-w-pad*2),y:top+Math.random()*(V.h-h-top-60),r:(Math.random()-.5)*26}}
 var p=[pt(),pt(),pt(),pt()];
 function T(q){return 'translate('+q.x+'px,'+q.y+'px) rotate('+q.r+'deg)'}
 f.style.transform=T(p[0]);
 if(RM)return;
 var a=f.animate([{transform:T(p[0])},{transform:T(p[1])},{transform:T(p[2])},{transform:T(p[3])},{transform:T(p[0])}],{duration:11000+Math.random()*6000,iterations:Infinity,easing:'ease-in-out',delay:-Math.random()*8000});
 anims.push(a)}

async function enter(r){
 if(busy||cur)return;busy=true;cur=r;cab.classList.add('inroom');shade.style.setProperty('--tint',r.tint);
 tip.textContent='';await move(focus(r));
 back.hidden=false;tip.textContent='Catch them all!';fl.innerHTML='';anims=[];
 r.photos.forEach(function(p,i){if(caught[r.id+':'+i])return;
  var f=el('button','fp');f.type='button';f.setAttribute('aria-label','Photo '+(i+1));f.appendChild(img(r,i));fl.appendChild(f);drift(f,i);
  f.onclick=async function(){f.style.visibility='hidden';anims.forEach(function(a){a.pause()});
   await lb(r,i);f.remove();anims.forEach(function(a){a.play()});
   if(total()>=GOAL)return finale();
   if(cnt(r)===r.photos.length)setTimeout(leave,500)}});
 busy=false;if(!fl.children.length)leave()}
async function leave(){
 if(!cur||busy)return;busy=true;fl.innerHTML='';anims=[];back.hidden=true;tip.textContent='';
 cab.classList.remove('inroom');cur=null;await move(rest());tip.textContent='Tap a room';busy=false}
back.onclick=leave;

function blower(){var A=window.AudioContext||window.webkitAudioContext;if(!A)return;try{
 var c=new A(),t=c.currentTime,o=c.createOscillator(),g=c.createGain(),l=c.createOscillator(),lg=c.createGain();
 o.type='sawtooth';o.frequency.setValueAtTime(240,t);o.frequency.exponentialRampToValueAtTime(880,t+.3);o.frequency.setValueAtTime(880,t+.85);o.frequency.exponentialRampToValueAtTime(520,t+1.1);
 l.frequency.value=34;lg.gain.value=.1;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.2,t+.06);g.gain.setValueAtTime(.2,t+.9);g.gain.linearRampToValueAtTime(0,t+1.15);
 l.connect(lg);lg.connect(g.gain);o.connect(g);g.connect(c.destination);o.start(t);l.start(t);o.stop(t+1.2);l.stop(t+1.2)}catch(e){}}
function confetti(){var cv=el('canvas','conf');cv.width=cab.clientWidth;cv.height=cab.clientHeight;cab.appendChild(cv);
 var x=cv.getContext('2d'),C=['#c4502f','#e3a62d','#d9a5a5','#7fa9ae','#a8b39a','#f5ebdd'],P=[];
 for(var i=0;i<170;i++)P.push({x:cv.width/2,y:cv.height*.55,vx:(Math.random()-.5)*16,vy:-8-Math.random()*13,s:5+Math.random()*7,r:Math.random()*6,vr:(Math.random()-.5)*.4,c:C[i%C.length]});
 var t0=performance.now();(function f(t){var e=t-t0;x.clearRect(0,0,cv.width,cv.height);
  P.forEach(function(p){p.vy+=.28;p.vx*=.995;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;x.fillRect(-p.s/2,-p.s/3,p.s,p.s*.6);x.restore()});
  if(e<5200)requestAnimationFrame(f);else cv.remove()})(t0)}
async function finale(){
 fl.innerHTML='';back.hidden=true;tip.textContent='';
 await leave();blower();confetti();
 var d=el('div','fin'),b=el('div','box'),s=el('div','stars');
 for(var i=0;i<5;i++){var sp=el('span',null,'\u2605');sp.style.setProperty('--i',i);s.appendChild(sp)}
 b.appendChild(s);b.appendChild(el('h1',null,'Happy Birthday Arnouba'));
 b.appendChild(el('p','sub','You caught all '+GOAL+' of them'));
 var n=el('button','pill primary','Next');n.type='button';n.onclick=function(){d.remove();ctx.next()};b.appendChild(n);d.appendChild(b);cab.appendChild(d);n.focus()}

window.addEventListener('resize',function(){var c=cur;place();if(c)stage.style.transform=focus(c)});
place();refresh();tip.textContent='Tap a room';
if(total()>=GOAL)tip.textContent='Tap a room (all caught!)';
window.CabinetDebug={finale:finale,reset:function(){caught={};save();refresh()}}; /* console helpers for testing */
}};
