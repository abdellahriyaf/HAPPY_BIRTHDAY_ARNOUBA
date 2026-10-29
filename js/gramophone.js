/* The one gramophone: drawn once, centred during the intro, then parked in the bottom-left corner as the music button. */
(function(){
'use strict';
var INK='#C8652C',DK='#1f2326',BR='#5b3a24',R=440;
function el(cx,cy,rx,ry){return'M'+(cx-rx)+' '+cy+'a'+rx+' '+ry+' 0 1 0 '+2*rx+' 0a'+rx+' '+ry+' 0 1 0 '+(-2*rx)+' 0Z'}
function rng(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
/* hand wobble on the geometry itself: crisp at any zoom, no displacement filters */
function wob(p,seed,amp){var L=p.getTotalLength();if(!L)return;var r=rng(seed*97),n=Math.max(6,Math.ceil(L/3)),f1=.18+r()*.1,f2=.5+r()*.2,a1=r()*6.28,a2=r()*6.28,b1=r()*6.28,b2=r()*6.28,d='';
 for(var i=0;i<=n;i++){var q=p.getPointAtLength(L*i/n),t=i*3,e=Math.min(1,Math.sin(Math.PI*i/n)*3);
  var x=q.x+e*amp*(Math.sin(t*f1+a1)+.5*Math.sin(t*f2+a2)),y=q.y+e*amp*(Math.sin(t*f1+b1)+.5*Math.sin(t*f2+b2));
  d+=(i?'L':'M')+x.toFixed(1)+' '+y.toFixed(1)}
 p.setAttribute('d',d)}
var HORN='M146 150 C176 132 214 86 250 20 C262 6 290 10 304 38 C322 48 338 76 342 106 C354 126 352 160 336 184 C338 216 326 234 308 233 C268 216 216 190 160 188 C152 186 148 176 146 168Z';
var MOUTH='M254 24 C240 70 232 112 240 140 C250 175 280 208 308 232 C326 234 338 216 336 184 C352 160 354 126 342 106 C338 76 322 48 304 38 C290 10 262 6 254 24Z';
var I=[
{d:el(102,372,10,6),c:'#D2722F'},{d:el(171,388,10,6),c:'#D2722F'},{d:el(298,375,10,6),c:'#D2722F'},
{d:'M84 345 L171 357 L316 345 L318 360 L171 374 L82 359Z',c:'#E0803A'},
{d:'M92 300 L171 309 L171 358 L92 347Z',c:'#F4A862'},
{d:'M171 309 L310 301 L310 349 L171 358Z',c:'#E98E45'},
{d:'M88 287 L121 273 L284 273 L315 285 L310 301 L171 309 L92 300Z',c:'#F9C98A'},
{t:20,d:'M152 170 C130 175 112 190 112 210 L112 262',c:'#EF9B52'},
{t:7,d:'M101 222 L123 222',c:'#E07F39'},
{d:el(202,283,80,22),c:'#3E4348',ic:DK,nm:1},
{d:HORN,c:'#F2A05A'},{d:MOUTH,c:'#FBD7A2'},
{t:8,d:'M137 165 L143 191',c:'#E07F39'},
{d:'M192 317 L288 311 L288 343 L192 349Z',c:'#FBDDAE'},
{t:6,d:'M310 338 L328 338',c:'#D2722F'},{t:6,d:'M328 338 L328 326',c:'#D2722F'},
{d:'M326 318 h34 a6 6 0 0 1 0 12 h-34 z',c:'#D8573F'},
{d:el(332,70,3,8),c:'#FFF1D6',ni:1},{d:el(343,130,2.6,9),c:'#FFF1D6',ni:1},{d:el(327,208,2.6,8),c:'#FFF1D6',ni:1},
{l:1,d:'M244 70 C275 66 305 70 330 80'},{l:1,d:'M241 105 C275 104 312 108 342 120'},{l:1,d:'M246 145 C280 148 318 156 344 168'},{l:1,d:'M262 185 C290 190 316 198 330 210'},
{l:1,d:'M168 152 C196 138 218 108 236 66'},{l:1,d:'M178 170 C206 160 226 140 238 112'},{l:1,d:'M190 186 C216 184 234 170 244 150'}
];
function staticSvg(){
 var g='',m='',ink='',k=0;
 I.forEach(function(o){k++;
  if(o.l){ink+='<path data-w="'+k+'" d="'+o.d+'" fill="none" stroke="'+INK+'" stroke-width="1.2" stroke-linecap="round"/>';return}
  if(o.t){
   g+='<path data-w="'+k+'" d="'+o.d+'" fill="none" stroke="'+INK+'" stroke-width="'+(o.t+3)+'" stroke-linecap="round"/><path data-w="'+k+'" d="'+o.d+'" fill="none" stroke="'+o.c+'" stroke-width="'+o.t+'" stroke-linecap="round"/>';
   m+='<path data-w="'+k+'" d="'+o.d+'" fill="none" stroke="#fff" stroke-width="'+o.t+'" stroke-linecap="round"/>';return}
  g+='<path d="'+o.d+'" fill="'+o.c+'"/>';
  if(!o.nm)m+='<path d="'+o.d+'" fill="#fff"/>';
  if(!o.ni)ink+='<path data-w="'+k+'" d="'+o.d+'" fill="none" stroke="'+(o.ic||INK)+'" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/>'});
 return'<svg viewBox="0 0 400 400" aria-hidden="true"><defs><filter id="wc" color-interpolation-filters="sRGB" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".03 .04" numOctaves="3" seed="5"/><feColorMatrix values="0 0 0 0 .72 0 0 0 0 .33 0 0 0 0 .08 0 0 0 1.5 -.45"/></filter><mask id="gm" maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="400">'+m+'</mask></defs><ellipse cx="200" cy="392" rx="125" ry="6" fill="#5a3a22" opacity=".14"/><g transform="translate(1.6 1.2)">'+g+'<g mask="url(#gm)" opacity=".55"><rect width="400" height="400" filter="url(#wc)"/></g></g><g>'+ink+'</g></svg>'}
function overlaySvg(){
 var gr=[[70,19.5],[60,16.5],[50,13.5],[40,11]].map(function(a){return'<path d="'+el(202,283,a[0],a[1])+'"/>'}).join('');
 return'<svg viewBox="0 0 400 400" aria-hidden="true"><g class="spin" fill="none" stroke="#7b8187" stroke-width=".8" stroke-opacity=".75" stroke-dasharray="70 22">'+gr+'</g>'
 +'<path id="lab" d="'+el(202,283,26,7)+'" fill="#F0A85A"/><path data-w="90" d="'+el(202,283,26,7)+'" fill="none" stroke="'+INK+'" stroke-width="1.4"/><path d="'+el(202,283,2.8,1.5)+'" fill="'+BR+'"/>'
 +'<g id="arm"><path data-w="91" d="M112 243 C140 238 170 240 198 245" fill="none" stroke="'+INK+'" stroke-width="14" stroke-linecap="round"/><path data-w="91" d="M112 243 C140 238 170 240 198 245" fill="none" stroke="#EF9B52" stroke-width="11" stroke-linecap="round"/>'
 +'<path data-w="92" d="'+el(206,248,12,11)+'" fill="#E88C49" stroke="'+INK+'" stroke-width="1.6"/><path d="'+el(206,248,5,4.5)+'" fill="#FBDDAE" stroke="'+INK+'" stroke-width="1"/><path d="M206 258 L206 266" stroke="'+BR+'" stroke-width="1.6" stroke-linecap="round"/>'
 +'<path data-w="93" d="'+el(112,243,10,10)+'" fill="#E88C49" stroke="'+INK+'" stroke-width="1.6"/></g>'
 +'<path id="heart" d="M240 341 C225 331 227 320 235 320 C238 320 240 322 240 325 C240 322 242 320 245 320 C253 320 255 331 240 341Z" fill="#D8573F" stroke="'+INK+'" stroke-width="1.2"/></svg>'}

var box,hit,anchor=null,state='off',notesT=null,lastP=false;
function place(pre){
 var vh=innerHeight,k,tx,ty,o=0;
 if(state==='corner'){k=.21;tx=0;ty=0}
 else if(state==='center'&&anchor){var r=anchor.getBoundingClientRect();k=r.width/R;tx=r.left+r.width/2-12-R/2*k;ty=r.top+r.height/2-(vh-12)+R/2*k}
 else return;
 if(pre){k*=.7;ty+=30}
 box.style.setProperty('--k',k);box.style.setProperty('--tx',tx+'px');box.style.setProperty('--ty',ty+'px')}
function notes(on){
 clearInterval(notesT);if(!on)return;
 notesT=setInterval(function(){
  var n=document.createElement('span');n.className='nt';n.textContent=['♪','♫','♥'][Math.random()*3|0];
  n.style.cssText='left:'+(290+Math.random()*80)+'px;top:'+(44+Math.random()*110)+'px;--dx:'+(Math.random()*160-30)+'px';
  box.appendChild(n);setTimeout(function(){n.remove()},2700)},650)}
window.Gramo={
 init:function(){
  box=document.createElement('div');box.id='gramo';box.className='gramo off';
  box.innerHTML='<div class="gin">'+staticSvg()+overlaySvg()+'</div><button class="ghit" type="button" tabindex="-1" aria-label="Open music and sounds"></button>';
  document.body.appendChild(box);
  [].forEach.call(box.querySelectorAll('path[data-w]'),function(p){wob(p,+p.getAttribute('data-w'),.6)});
  hit=box.querySelector('.ghit');
  var lab=box.querySelector('#lab');
  window.Player.on(function(s){
   var c=window.Player.current();lab.setAttribute('fill',c?c.color:'#F0A85A');
   var p=s.playing&&s.on;box.classList.toggle('playing',p);
   if(p!==lastP){lastP=p;notes(p&&!document.hidden)}});
  addEventListener('resize',function(){place()})},
 show:function(a){
  anchor=a;state='center';box.classList.remove('ready');place(true);void box.offsetWidth;
  box.classList.add('ready');box.classList.remove('off');place()},
 dock:function(){
  state='corner';box.classList.add('ready','docked');box.classList.remove('off');place();document.body.classList.add('docked');hit.tabIndex=0},
 el:function(){return box},
 onClick:function(f){hit.addEventListener('click',f)}};
})();
