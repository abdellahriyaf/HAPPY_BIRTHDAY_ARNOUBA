(function(){
'use strict';
var ORDER=['music','cabinet','letter','poem','game'];
var app=document.getElementById('app'),muteBtn=document.getElementById('mute');
var audio=new Audio();audio.loop=true;audio.preload='auto';
var i=-1,busy=false,fadeT;
window.Sections=window.Sections||{};
function fade(to,ms){clearInterval(fadeT);var from=audio.volume,t0=Date.now();fadeT=setInterval(function(){var k=Math.min(1,(Date.now()-t0)/ms);audio.volume=from+(to-from)*k;if(k>=1)clearInterval(fadeT)},40)}
var ctx={
 audio:audio,
 next:function(){go(i+1)},
 playTrack:function(t){return new Promise(function(res,rej){
  audio.onerror=function(){rej(new Error('missing'))};
  audio.pause();audio.src=t.file;audio.volume=0;
  var p=audio.play();
  (p&&p.then?p:Promise.resolve()).then(function(){fade(.7,1500);res()},rej);
 })},
 showMute:function(){muteBtn.hidden=false}
};
muteBtn.onclick=function(){var off=!audio.muted;audio.muted=off;muteBtn.classList.toggle('off',off)};
function load(n){return new Promise(function(ok){
 if(window.Sections[n])return ok(true);
 var s=document.createElement('script');s.src='sections/'+n+'.js';
 s.onload=function(){ok(!!window.Sections[n])};s.onerror=function(){ok(false)};
 document.head.appendChild(s)})}
function soon(n,last){var el=document.createElement('div');el.className='sec';
 el.innerHTML='<h1>Coming soon</h1><p class="sub">The "'+n+'" part is not built yet.</p>';
 if(!last){var b=document.createElement('button');b.className='btn';b.textContent='Next';b.onclick=ctx.next;el.appendChild(b)}
 app.appendChild(el)}
async function go(n){
 if(busy||n>=ORDER.length)return;busy=true;
 try{
  var old=app.firstElementChild;
  if(old){old.classList.add('leave');await new Promise(function(r){setTimeout(r,400)})}
  app.innerHTML='';i=n;
  var name=ORDER[n];
  if(await load(name))window.Sections[name].mount(app,ctx);else soon(name,n===ORDER.length-1);
 }finally{busy=false}
}
go(0);
})();
