/* The rooms and the floating photos. One entry per photo: put the image in photos/<room>/ and write the comment.
   The total number of photos is the number of points (the plan is 19). */
(function(){
function ph(room,notes){return notes.map(function(t,i){return{src:'photos/'+room+'/'+(i+1)+'.jpg',note:t}})}
var N='Your comment for this photo goes here.';
window.ROOMS=[
 {id:'beauty',cell:'D',title:'Her beauty',color:'#CF6F4A',photos:ph('beauty',[N,N,N])},
 {id:'gifts',cell:'B',title:'Her gifts',color:'#6FA9AA',photos:ph('gifts',[N,N])},
 {id:'memories',cell:'A',title:'Her memories',color:'#F2C3B8',photos:ph('memories',[N,N])},
 {id:'dates',cell:'J',title:'Our dates',color:'#8FA5B4',photos:ph('dates',[N,N])},
 {id:'story',cell:'C',title:'Our story',color:'#8EA55A',photos:ph('story',[N,N])},
 {id:'crochet',cell:'I',title:'Her crochet',color:'#F0C860',photos:ph('crochet',[N,N])},
 {id:'photographs',cell:'H',title:'Her photographs',color:'#4C6A38',photos:ph('photographs',[N,N])},
 {id:'art',cell:'K',title:'Her art',color:'#BCD4C4',photos:ph('art',[N,N])},
 {id:'music',cell:'G',title:'Her music',color:'#7F9A52',photos:ph('music',[N,N])}
];
})();
