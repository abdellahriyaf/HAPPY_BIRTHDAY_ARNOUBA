window.Sections=window.Sections||{};
Sections.music={mount:function(el,ctx){
 var T=window.TRACKS||[],pick=null;
 var s=document.createElement('section');s.className='sec';
 s.innerHTML='<h1>Pick a song</h1><p class="sub">Instrumental only. It will play softly through the whole page.</p><div class="cards"></div><p class="note" role="status"></p><button class="btn" disabled>Continue</button>';
 var box=s.querySelector('.cards'),note=s.querySelector('.note'),go=s.querySelector('.btn');
 T.forEach(function(t){
  var b=document.createElement('button');b.className='card';b.type='button';
  b.innerHTML='<span>'+t.title+'<small>'+t.mood+'</small></span><span aria-hidden="true">♪</span>';
  b.onclick=function(){
   note.textContent='';
   ctx.playTrack(t).then(function(){
    pick=t;[].forEach.call(box.children,function(c){c.classList.remove('on')});b.classList.add('on');go.disabled=false;
   },function(){note.textContent='This song is not uploaded yet ('+t.file.split('/').pop()+').'});
  };
  box.appendChild(b)});
 go.onclick=function(){if(!pick)return;ctx.showMute();ctx.next()};
 el.appendChild(s)}};
