(function(){
var stage=document.querySelector('.dm-stage');if(!stage)return;
var frame=stage.firstElementChild,applied=0,appliedH=0;
function fit(){
  var w=stage.parentElement.clientWidth||window.innerWidth||document.documentElement.clientWidth;
  if(!w)return false;
  var k=Math.min(1,w/1600);
  if(!k)return false;
  var hh=Math.round(frame.offsetHeight*k);
  if(k!==applied||hh!==appliedH){
    stage.style.transform='scale('+k+')';
    stage.style.height=hh+'px';
    applied=k;appliedH=hh;
  }
  return true;
}
var t0=Date.now();
(function spin(){if(!fit()&&Date.now()-t0<3000)requestAnimationFrame(spin);})();
window.addEventListener('resize',fit);
window.addEventListener('load',fit);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
if(window.ResizeObserver){var rq=false,ro=new ResizeObserver(function(){if(rq)return;rq=true;requestAnimationFrame(function(){rq=false;fit();});});ro.observe(document.documentElement);ro.observe(frame);}
document.addEventListener('click',function(e){var a=e.target.closest('.dm-na');if(a)e.preventDefault();setTimeout(fit,60);});
document.addEventListener('keydown',function(e){
  if(e.target.tagName==='SELECT'||e.target.tagName==='INPUT')return;
  var b=document.querySelectorAll('.dm-btn');if(!b.length)return;
  if(e.key==='ArrowRight'&&b[1])location.href=b[1].getAttribute('href');
  if(e.key==='ArrowLeft'&&b[0])location.href=b[0].getAttribute('href');
});
})();
