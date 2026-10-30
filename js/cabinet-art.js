/* Our own painted cabinet (style and layout inspired by the reference, nothing traced). Coordinates live in an 800x1000 space. */
(function(){
'use strict';
var INK='#6b4a32',VB=[60,55,660,880];
function rng(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function wob(p,seed,amp){var L=p.getTotalLength();if(!L)return;var r=rng(seed*97),n=Math.max(6,Math.ceil(L/4)),f1=.12+r()*.08,f2=.4+r()*.2,a1=r()*6.28,a2=r()*6.28,b1=r()*6.28,b2=r()*6.28,d='';
 for(var i=0;i<=n;i++){var q=p.getPointAtLength(L*i/n),t=i*4,e=Math.min(1,Math.sin(Math.PI*i/n)*3);
  d+=(i?'L':'M')+(q.x+e*amp*(Math.sin(t*f1+a1)+.18*Math.sin(t*f2+a2))).toFixed(1)+' '+(q.y+e*amp*(Math.sin(t*f1+b1)+.18*Math.sin(t*f2+b2))).toFixed(1)}
 p.setAttribute('d',d)}
function rect(x,y,w,h){return'M'+x+' '+y+'h'+w+'v'+h+'h'+-w+'Z'}
var ART={
A:function(){return'<rect width="244" height="232" fill="#aab3bb"/><rect x="62" y="18" width="120" height="186" fill="#f6e3a4"/><path d="M122 18V204M62 110H182" stroke="#7a5a38" stroke-width="4" fill="none"/>'
 +'<path d="M16 24C40 72 6 122 30 152C42 176 20 206 36 222L112 214C100 170 118 120 104 70C98 50 104 36 108 24Z" fill="#f2c3b8" stroke="#d1948c" stroke-width="2"/>'
 +'<path d="M228 24C204 72 238 122 214 152C202 176 224 206 208 222L132 214C144 170 126 120 140 70C146 50 140 36 136 24Z" fill="#f2c3b8" stroke="#d1948c" stroke-width="2"/>'
 +'<path d="M40 60C52 100 34 140 48 190M66 50C76 100 60 150 72 200M90 44C98 100 86 150 96 206M204 60C192 100 210 140 196 190M178 50C168 100 184 150 172 200M154 44C146 100 158 150 148 206" stroke="#d99a90" stroke-width="2" fill="none" opacity=".7"/>'
 +'<path d="M8 22H236" stroke="#8a6a40" stroke-width="5" stroke-linecap="round"/><circle cx="8" cy="22" r="7" fill="#c08c48"/><circle cx="236" cy="22" r="7" fill="#c08c48"/><rect y="214" width="244" height="18" fill="#d9a064"/>'},
B:function(){return'<rect width="154" height="122" fill="#6fa9aa"/><rect y="92" width="154" height="30" fill="#e4a95a"/><ellipse cx="78" cy="62" rx="42" ry="34" fill="#efe2c4" stroke="#b79d6c" stroke-width="2"/>'
 +'<path d="M50 74C44 44 76 26 98 42C116 56 108 84 84 84C68 84 62 68 74 60C82 56 90 62 86 68" fill="none" stroke="#b79d6c" stroke-width="3" stroke-linecap="round"/><path d="M40 70C36 50 52 34 70 30" fill="none" stroke="#fff8e6" stroke-width="3" stroke-linecap="round" opacity=".7"/>'},
B2:function(){return'<rect width="154" height="102" fill="#3a2418"/><rect y="90" width="154" height="12" fill="#5b3a24"/>'},
C:function(){return'<defs><linearGradient id="skC" x2="0" y2="1"><stop offset="0" stop-color="#c3b2c1"/><stop offset="1" stop-color="#ecc9b4"/></linearGradient></defs><rect width="100" height="342" fill="url(#skC)"/><rect y="96" width="100" height="246" fill="#8ea55a"/>'
 +'<path d="M30 104V54L36 38L42 54V74H52V32L58 14L64 32V74H72V58L78 46L84 58V104Z" fill="#4b4752"/><path d="M0 100C30 84 70 86 100 104V342H0Z" fill="#8ea55a"/><path d="M0 150C40 130 70 150 100 140V200C60 190 30 210 0 200Z" fill="#a6b86a" opacity=".6"/>'
 +'<path d="M58 106C16 146 92 172 50 212C12 252 88 282 46 336" fill="none" stroke="#ebc45c" stroke-width="9" stroke-linecap="round"/><path d="M20 70c6-8 14-8 20 0M70 52c5-6 12-6 17 0" fill="none" stroke="#6b5a6a" stroke-width="1.6"/>'},
D:function(){return'<rect width="138" height="174" fill="#cf6f4a"/><path d="M10 0C0 60 20 110 6 174M34 0C20 50 44 100 26 174M60 0C46 40 70 90 56 150M96 0C86 50 106 100 92 174M126 0C118 40 134 100 126 174" fill="none" stroke="#e68d5a" stroke-width="12" opacity=".55"/><path d="M20 0C14 50 34 90 22 174" fill="none" stroke="#a8452a" stroke-width="10" opacity=".5"/>'
 +'<ellipse cx="62" cy="58" rx="17" ry="28" fill="#f0c6a2" stroke="#c98a62" stroke-width="2"/><path d="M62 40C54 46 54 62 64 70" fill="none" stroke="#c98a62" stroke-width="2.5"/>'
 +'<path d="M44 174C40 130 58 104 86 100C100 98 104 110 94 118C88 124 90 132 98 130C106 128 110 138 100 144C94 148 98 156 104 154C108 168 100 174 100 174Z" fill="#f0c6a2" stroke="#c98a62" stroke-width="2"/><path d="M84 106C74 118 68 140 70 164" fill="none" stroke="#c98a62" stroke-width="2"/>'},
E:function(){return'<rect width="258" height="108" fill="#a07687"/><rect y="70" width="258" height="38" fill="#c8707f"/><g transform="rotate(-4 129 54)"><rect x="66" y="16" width="126" height="76" fill="#f2e5c2" stroke="#c9b27a" stroke-width="2"/><path d="M66 16L129 62L192 16" fill="#ead7a8" stroke="#c9b27a" stroke-width="2"/><path d="M66 92L112 56M192 92L146 56" stroke="#c9b27a" stroke-width="1.5"/></g>'},
F:function(){var t=window.CONTENT?window.CONTENT.date:'22/01/2008';
 return'<rect width="232" height="154" fill="#e9b072"/><rect x="12" y="12" width="208" height="130" rx="6" fill="none" stroke="#b9783c" stroke-width="3"/><rect x="18" y="18" width="196" height="118" rx="4" fill="none" stroke="#f6d09a" stroke-width="2"/>'
 +'<g font-family="Fraunces,Georgia,serif" font-size="31" font-weight="600" text-anchor="middle"><text x="117" y="76" fill="#f8d9a4">'+t+'</text><text x="116" y="75" fill="#a8672f">'+t+'</text></g>'
 +'<path d="M116 128C92 110 95 90 106 90C111 90 116 94 116 98C116 94 121 90 126 90C137 90 140 110 116 128Z" transform="translate(1 -2)" fill="#f8d9a4"/><path d="M116 127C92 109 95 89 106 89C111 89 116 93 116 97C116 93 121 89 126 89C137 89 140 109 116 127Z" transform="translate(0 -2)" fill="#a8672f"/>'},
G:function(){var s='<defs><linearGradient id="skG" x2="0" y2="1"><stop offset="0" stop-color="#7f9a52"/><stop offset="1" stop-color="#a9b96c"/></linearGradient></defs><rect width="118" height="154" fill="url(#skG)"/><path d="M20 0C30 40 10 80 26 154M70 0C82 50 60 100 76 154M104 0C112 50 96 100 108 154" fill="none" stroke="#c9d49a" stroke-width="6" opacity=".35"/>';
 [[22,24,30,'#e6683a'],[78,14,-40,'#d9a93f'],[52,56,70,'#c4502f'],[96,70,-20,'#e6683a'],[24,98,-60,'#d9a93f'],[68,112,25,'#e6683a'],[100,132,-50,'#c4502f'],[38,138,40,'#d9a93f']].forEach(function(l){s+='<g transform="translate('+l[0]+' '+l[1]+') rotate('+l[2]+')"><path d="M0 -13C9 -6 9 7 0 14C-9 7 -9 -6 0 -13Z" fill="'+l[3]+'" stroke="#8a4a22" stroke-width="1.4"/><path d="M0 -11V14" stroke="#8a4a22" stroke-width="1.2"/></g>'});
 return s},
H:function(){var s='<rect width="138" height="152" fill="#2f4a2b"/><circle cx="69" cy="76" r="72" fill="#4c6a38"/>';
 for(var a=0;a<360;a+=9){var r=a*Math.PI/180,c=Math.cos(r),d=Math.sin(r),i=26+((a*3)%9),o=i+30+((a*7)%17);s+='<path d="M'+(69+c*i).toFixed(1)+' '+(76+d*i).toFixed(1)+'L'+(69+c*o).toFixed(1)+' '+(76+d*o).toFixed(1)+'" stroke="'+(a%18?'#1f3520':'#7b9a52')+'" stroke-width="3.4" stroke-linecap="round" fill="none"/>'}
 return s+'<path d="M69 40L78 66L104 62L84 80L96 106L69 92L42 106L54 80L34 62L60 66Z" fill="#c4e2e2"/>'},
I:function(){return'<rect width="138" height="170" fill="#f0c860"/><circle cx="110" cy="40" r="50" fill="#f6dc8a" opacity=".7"/>'
 +'<path d="M6 24L84 6V168L6 170Z" fill="#d9894a" stroke="#8a5530" stroke-width="2.5"/><path d="M14 40L76 26M14 100L76 96M14 150L76 152" stroke="#b86d38" stroke-width="2" opacity=".6"/><circle cx="72" cy="96" r="5.5" fill="#d8dce0" stroke="#7b8187" stroke-width="1.5"/>'
 +'<path d="M14 0C30 40 6 70 30 100C46 124 22 150 40 170M118 170C100 130 126 100 104 70C90 50 112 26 100 0" fill="none" stroke="#5f8a3a" stroke-width="3" stroke-linecap="round"/>'
 +[[30,100],[40,168],[22,52],[104,70],[112,120],[100,10]].map(function(p){return'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="6.5" fill="#e0603a"/><circle cx="'+p[0]+'" cy="'+p[1]+'" r="2.4" fill="#f6dc8a"/>'}).join('')},
J:function(){return'<rect width="168" height="244" fill="#8fa5b4"/><path d="M20 0C30 40 10 80 24 130M64 0C74 50 54 90 70 140M120 0C128 40 112 90 126 130" fill="none" stroke="#c9d6de" stroke-width="3" opacity=".5"/><rect y="200" width="168" height="44" fill="#e3a2b0"/>'
 +'<path d="M116 126C104 112 128 100 114 84C108 72 122 62 118 52" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".7"/>'
 +'<rect x="26" y="118" width="46" height="76" rx="4" fill="#5a3a2a" stroke="#d6dde2" stroke-width="3"/><rect x="22" y="110" width="54" height="10" rx="3" fill="#c9ced2"/><rect x="45" y="94" width="8" height="18" fill="#c9ced2"/><circle cx="49" cy="92" r="7" fill="#b9bfc4"/><path d="M30 126V188" stroke="#fff" stroke-width="3" opacity=".35"/>'
 +'<path d="M96 150H146L142 192C140 200 102 200 100 192Z" fill="#f2e8d0" stroke="#c9b894" stroke-width="2"/><path d="M146 160C162 158 162 184 142 184" fill="none" stroke="#c9b894" stroke-width="5"/>'
 +'<ellipse cx="66" cy="210" rx="34" ry="8" fill="#f2e8d0"/><ellipse cx="66" cy="207" rx="18" ry="5" fill="#e8b24a"/>'},
K:function(){return'<defs><linearGradient id="skK" x2="0" y2="1"><stop offset="0" stop-color="#ecca64"/><stop offset=".45" stop-color="#bcd4c4"/><stop offset="1" stop-color="#86b0cc"/></linearGradient></defs><rect width="188" height="244" fill="url(#skK)"/>'
 +'<path d="M0 150C40 134 70 160 110 142C140 130 170 146 188 138V244H0Z" fill="#a9c8d6" opacity=".7"/><path d="M10 176C50 164 80 188 120 172M60 204C100 192 130 212 176 198" fill="none" stroke="#fff" stroke-width="3" opacity=".6" stroke-linecap="round"/>'
 +'<path d="M14 150C50 120 80 160 124 132" fill="none" stroke="#e6a040" stroke-width="16" stroke-linecap="round"/><path d="M96 120C120 96 150 112 176 96" fill="none" stroke="#e6a040" stroke-width="14" stroke-linecap="round"/><ellipse cx="150" cy="122" rx="20" ry="13" fill="#7a4a2a"/>'}
};
var CELLS={A:{x:172,y:134,w:244,h:232},B:{x:426,y:136,w:154,h:122},B2:{x:426,y:262,w:154,h:102},C:{x:584,y:136,w:100,h:342},D:{x:172,y:386,w:138,h:174},E:{x:322,y:386,w:258,h:108},F:{x:322,y:500,w:232,h:154},G:{x:566,y:500,w:118,h:154},H:{x:172,y:578,w:138,h:152},I:{x:172,y:736,w:138,h:170},J:{x:322,y:662,w:168,h:244},K:{x:496,y:662,w:188,h:244}};
function svgSkel(inner){return'<svg viewBox="'+VB.join(' ')+'" aria-hidden="true">'+inner+'</svg>'}
function leaves(x,y0,y1,n,sk){var s='';for(var i=0;i<n;i++){var y=y0+(y1-y0)*i/(n-1),l=(i%2?-1:1);s+='<ellipse cx="'+(x+l*9*sk)+'" cy="'+y+'" rx="'+(5*sk)+'" ry="'+(13*sk)+'" transform="rotate('+(l*38)+' '+(x+l*9*sk)+' '+y+')" fill="#9aaeb0"/>'}return s}
function cabinetSvg(){
 var back=[[78,75],[152,112],[168,918],[104,858]],slab=[[78,75],[610,68],[700,104],[152,114]],ink='',cells='',cps='',m='',k=0;
 function poly(a){return'M'+a.map(function(p){return p.join(' ')}).join('L')+'Z'}
 function line(d,w){ink+='<path data-w="'+(++k)+'" d="'+d+'" fill="none" stroke="'+INK+'" stroke-width="'+(w||3)+'" stroke-linejoin="round" stroke-linecap="round"/>'}
 Object.keys(CELLS).forEach(function(id){
  var c=CELLS[id];
  cps+='<clipPath id="cp-'+id+'"><rect width="'+c.w+'" height="'+c.h+'"/></clipPath>';
  cells+='<g transform="translate('+c.x+' '+c.y+')"><g clip-path="url(#cp-'+id+')">'+ART[id]()+'<rect width="'+c.w+'" height="'+c.h+'" fill="none" stroke="#2c1a10" stroke-opacity=".38" stroke-width="12"/></g></g>';
  line(rect(c.x,c.y,c.w,c.h),2.6)});
 line(poly(back),3.4);line(poly(slab),3.4);line(rect(150,112,550,806),3.6);
 m='<path d="'+poly(back)+'" fill="#fff"/><path d="'+poly(slab)+'" fill="#fff"/><path d="'+rect(150,112,550,806)+'" fill="#fff"/>';
 var deco='<path d="M122 190L136 246L150 296" fill="none"/>'+leaves(116,190,470,8,1)+leaves(130,570,850,8,.95)
  +'<path d="M112 500a22 22 0 1 0 14 40a17 17 0 1 1-14-40z" fill="#f3d0b0" transform="translate(6 -40)"/>'
  +'<circle cx="380" cy="90" r="16" fill="#f6d27a"/>'+[0,40,80,120,160,200,240,280,320,360].map(function(a){return'<path d="M380 90L'+(380+Math.cos(a*Math.PI/180)*28)+' '+(90+Math.sin(a*Math.PI/180)*28)+'" stroke="#f6d27a" stroke-width="3"/>'}).join('')
  +'<ellipse cx="318" cy="94" rx="34" ry="8" fill="#cfe0e4"/><ellipse cx="452" cy="94" rx="30" ry="7" fill="#cfe0e4"/>'
  +[218,264,520,566].map(function(x){return'<path d="M'+x+' 84l8 8l-8 8l-8-8z" fill="#f2c36a"/>'}).join('');
 return svgSkel('<defs><filter id="wc2" color-interpolation-filters="sRGB" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".02 .03" numOctaves="3" seed="9"/><feColorMatrix values="0 0 0 0 .55 0 0 0 0 .3 0 0 0 0 .1 0 0 0 1.4 -.5"/></filter><mask id="gm2" maskUnits="userSpaceOnUse" x="0" y="0" width="800" height="1000">'+m+'</mask>'+cps+'</defs>'
  +'<ellipse cx="400" cy="926" rx="300" ry="10" fill="#5a3a22" opacity=".16"/>'
  +'<path d="'+poly(back)+'" fill="#c9854a"/><path d="'+poly(back)+'" fill="url(#hatch)"/><path d="'+poly(slab)+'" fill="#ecb575"/><path d="'+poly(slab)+'" fill="url(#hatch)"/>'
  +'<path d="'+rect(150,112,550,806)+'" fill="#e2a062"/><path d="'+rect(150,112,550,806)+'" fill="url(#hatch)"/>'+deco+cells
  +'<g mask="url(#gm2)" opacity=".4"><rect x="0" y="0" width="800" height="1000" filter="url(#wc2)"/></g><g>'+ink+'</g>')}
function back(id,w,h){return'<svg viewBox="0 0 '+w+' '+h+'" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'+ART[id]()+'</svg>'}
function panelSvg(w,h,body,id){return'<svg viewBox="0 0 '+w+' '+h+'" aria-hidden="true"><g>'+body+'</g></svg>'}
function door(){var w=258,h=108;return'<svg viewBox="0 0 '+w+' '+h+'" aria-hidden="true"><rect width="'+w+'" height="'+h+'" rx="4" fill="#d9894a"/><rect width="'+w+'" height="'+h+'" rx="4" fill="url(#hatch)"/><path d="M10 12H248V96H10Z" fill="none" stroke="#b86d38" stroke-width="3"/><path d="M14 16H244V92H14Z" fill="none" stroke="#f0b27a" stroke-width="2"/><circle cx="226" cy="54" r="9" fill="#d8dce0" stroke="#7b8187" stroke-width="2"/><rect x="0" y="14" width="8" height="22" rx="3" fill="#b88a46"/><rect x="0" y="72" width="8" height="22" rx="3" fill="#b88a46"/><rect width="'+w+'" height="'+h+'" rx="4" fill="none" stroke="'+INK+'" stroke-width="3"/></svg>'}
function drawerFront(){var w=154,h=102;return'<svg viewBox="0 0 '+w+' '+h+'" aria-hidden="true"><rect width="'+w+'" height="'+h+'" rx="3" fill="#e2a062"/><rect width="'+w+'" height="'+h+'" rx="3" fill="url(#hatch)"/><rect x="8" y="8" width="138" height="86" fill="none" stroke="#b9783c" stroke-width="2.5"/><ellipse cx="77" cy="52" rx="19" ry="23" fill="#d8dce0" stroke="#7b8187" stroke-width="2.5"/><path d="M77 40a6 6 0 0 1 3 11l3 15h-12l3-15a6 6 0 0 1 3-11z" fill="#2a2d30"/><rect width="'+w+'" height="'+h+'" rx="3" fill="none" stroke="'+INK+'" stroke-width="3"/></svg>'}
function keySvg(){return'<svg viewBox="0 0 64 28" aria-hidden="true"><g fill="none" stroke="#b9782c" stroke-width="2.4" stroke-linejoin="round"><circle cx="11" cy="14" r="9" fill="#f2c24a"/><circle cx="11" cy="14" r="3.4" fill="#fff4cf"/><path d="M20 14H60" stroke-width="5" stroke="#b9782c"/><path d="M20 14H60" stroke-width="2.6" stroke="#f2c24a"/><path d="M50 14V24M58 14V21" stroke-width="4" stroke="#b9782c"/><path d="M50 14V23M58 14V20" stroke-width="1.8" stroke="#f2c24a"/></g></svg>'}
function scrollSvg(){return'<svg viewBox="0 0 80 70" aria-hidden="true"><rect x="8" y="14" width="64" height="44" rx="4" fill="#f5e8c6" stroke="#c9b27a" stroke-width="2.5"/><rect x="4" y="10" width="72" height="9" rx="4.5" fill="#ecd9a6" stroke="#c9b27a" stroke-width="2.5"/><rect x="4" y="53" width="72" height="9" rx="4.5" fill="#ecd9a6" stroke="#c9b27a" stroke-width="2.5"/><rect x="34" y="8" width="12" height="56" fill="#d8737f" stroke="#a84a58" stroke-width="2"/></svg>'}
window.CabArt={CELLS:CELLS,VB:VB,svg:cabinetSvg,back:back,door:door,drawer:drawerFront,key:keySvg,scroll:scrollSvg,wob:wob,
 mount:function(root){[].forEach.call(root.querySelectorAll('path[data-w]'),function(p){wob(p,+p.getAttribute('data-w'),.7)})}};
})();
