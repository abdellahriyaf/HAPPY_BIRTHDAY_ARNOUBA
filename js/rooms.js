/* The 8 rooms. x,y,w,h = hotspot on the cabinet art (1000x1250 space). tint = room mood colour.
   Add/remove entries in `photos` to change the count; the goal is the total across all rooms. Put real files in photos/<id>/. */
window.ROOMS=[
 {id:'art',title:'Her art',x:205,y:165,w:300,h:285,tint:'#e9a9a0',photos:[
  {src:'photos/art/1.jpg',note:'Write your comment here.'},{src:'photos/art/2.jpg',note:'Write your comment here.'},{src:'photos/art/3.jpg',note:'Write your comment here.'}]},
 {id:'music',title:'Her music',x:520,y:165,w:170,h:160,tint:'#7fb0b0',photos:[
  {src:'photos/music/1.jpg',note:'Write your comment here.'},{src:'photos/music/2.jpg',note:'Write your comment here.'}]},
 {id:'beauty',title:'Her beauty',x:210,y:470,w:165,h:215,tint:'#e7a37a',photos:[
  {src:'photos/beauty/1.jpg',note:'Write your comment here.'},{src:'photos/beauty/2.jpg',note:'Write your comment here.'}]},
 {id:'crochet',title:'Her crochet',x:213,y:700,w:165,h:195,tint:'#7ea06a',photos:[
  {src:'photos/crochet/1.jpg',note:'Write your comment here.'},{src:'photos/crochet/2.jpg',note:'Write your comment here.'},{src:'photos/crochet/3.jpg',note:'Write your comment here.'}]},
 {id:'dates',title:'Our dates',x:395,y:860,w:200,h:240,tint:'#e9a8b6',photos:[
  {src:'photos/dates/1.jpg',note:'Write your comment here.'},{src:'photos/dates/2.jpg',note:'Write your comment here.'},{src:'photos/dates/3.jpg',note:'Write your comment here.'}]},
 {id:'memories',title:'Her memories',x:712,y:165,w:125,h:425,tint:'#a9b98b',photos:[
  {src:'photos/memories/1.jpg',note:'Write your comment here.'},{src:'photos/memories/2.jpg',note:'Write your comment here.'}]},
 {id:'photographs',title:'Her photographs',x:605,y:815,w:235,h:285,tint:'#e3c35f',photos:[
  {src:'photos/photographs/1.jpg',note:'Write your comment here.'},{src:'photos/photographs/2.jpg',note:'Write your comment here.'}]},
 {id:'gifts',title:'Her gifts',x:220,y:905,w:150,h:235,tint:'#e58a5a',photos:[
  {src:'photos/gifts/1.jpg',note:'Write your comment here.'},{src:'photos/gifts/2.jpg',note:'Write your comment here.'}]}
];
/* Parts of the cabinet reserved for the next steps (not clickable yet) */
window.CAB_LOCKED=[
 {id:'letter',label:'Envelope',x:390,y:470,w:310,h:125},
 {id:'poem',label:'Keyhole drawer',x:520,y:335,w:170,h:115},
 {id:'clouds',label:'Cloud drawer',x:400,y:690,w:330,h:170},
 {id:'leaves',label:'Leaves',x:685,y:610,w:150,h:185}
];
