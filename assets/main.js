/* ── Theme init: restore saved preference, else default to light (ignore system preference) */
(function () {
  const saved = localStorage.getItem('theme');
  document.documentElement.setAttribute('data-theme', saved === 'dark' ? 'dark' : 'light');
})();

const REDUCE_MOTION=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Font activation: apply preloaded stylesheet ─────────────────────── */
const fontPreload = document.getElementById('font-preload');
if (fontPreload) fontPreload.rel = 'stylesheet';

/* ── Image error fallbacks ───────────────────────────────────────────── */
(function () {
  const avatarImg = document.getElementById('avatarImg');
  if (avatarImg) {
    const onAvatarError = function () {
      const av = this.closest('.avatar');
      if (av) av.classList.remove('has-img');
    };
    if (avatarImg.complete && avatarImg.naturalWidth === 0) {
      onAvatarError.call(avatarImg);
    } else {
      avatarImg.onerror = onAvatarError;
    }
  }
  const volPhoto = document.querySelector('.vol-photo');
  if (volPhoto) volPhoto.onerror = function () { this.remove(); };
})();

const CV_URL = './assets/Tal_Klein_CV.pdf';

/* ── CV download buttons ─────────────────────────────────────────────── */
document.querySelectorAll('.nav-cv, .mm-dl, .cv-download').forEach(el => {
  el.href = CV_URL; el.setAttribute('download', '');
});

/* ── Burger / mobile menu ────────────────────────────────────────────── */
const burger=document.getElementById('burger'),menu=document.getElementById('mobileMenu');
burger.addEventListener('click',()=>{const open=burger.classList.toggle('open');menu.classList.toggle('open',open);burger.setAttribute('aria-expanded',open);});
menu.querySelectorAll('a').forEach(el=>el.addEventListener('click',()=>{burger.classList.remove('open');menu.classList.remove('open');burger.setAttribute('aria-expanded',false);}));

/* ── Timeline entries: tap / keyboard to expand ──────────────────────── */
document.querySelectorAll('.exp-head').forEach(head=>{
  const toggle=()=>{
    const open=head.closest('.exp').classList.toggle('open');
    head.setAttribute('aria-expanded',open);
  };
  head.addEventListener('click',e=>{ if(e.target.closest('a'))return; toggle(); });
  head.addEventListener('keydown',e=>{
    if(e.key==='Enter'||e.key===' '){ if(e.target.closest('a'))return; e.preventDefault(); toggle(); }
  });
});

/* ── Anchor navigation ───────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click',e=>{
    const id=link.getAttribute('href');
    if(!id||id==='#')return;
    const target=document.querySelector(id);
    if(!target)return;
    e.preventDefault();
    const marker=id==='#top'?target:(target.querySelector('.eyebrow, .display')||target);
    const navH=document.querySelector('.nav')?.getBoundingClientRect().height||0;
    const y=window.scrollY+marker.getBoundingClientRect().top-navH-14;
    window.scrollTo({top:Math.max(0,y),behavior:'smooth'});
    history.pushState(null,'',id);
  });
});

/* ── Theme toggle ────────────────────────────────────────────────────── */
const root=document.documentElement,themeBtn=document.getElementById('themeBtn');
function getEffectiveTheme(){
  return root.getAttribute('data-theme')||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');
}
const themeMeta=document.getElementById('themeColor');
function syncThemeMeta(){
  if(themeMeta)themeMeta.content=getComputedStyle(root).getPropertyValue('--bg-top').trim()||themeMeta.content;
}
function applyTheme(next){
  root.setAttribute('data-theme',next);
  try{localStorage.setItem('theme',next);}catch(_){}
  syncThemeMeta();
  /* canvases repaint synchronously so the transition snapshot is correct */
  document.dispatchEvent(new CustomEvent('themechange'));
}
syncThemeMeta();
themeBtn.addEventListener('click',()=>{
  const next=getEffectiveTheme()==='dark'?'light':'dark';
  themeBtn.classList.toggle('spin');
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!document.startViewTransition||reduce){applyTheme(next);return;}
  /* circular reveal growing out of the toggle button */
  const r=themeBtn.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;
  const rad=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
  document.startViewTransition(()=>applyTheme(next)).ready.then(()=>{
    root.animate({clipPath:[`circle(0px at ${x}px ${y}px)`,`circle(${rad}px at ${x}px ${y}px)`]},
      {duration:650,easing:'cubic-bezier(.4,0,.2,1)',pseudoElement:'::view-transition-new(root)'});
  }).catch(()=>{});
});

/* ── Scroll: tint + header blur + hero title fade ────────────────────── */
(function(){
  const hdr=document.querySelector('header');
  const bar=document.getElementById('scrollProgress');
  let ticking=false;
  function onScroll(){
    if(ticking)return; ticking=true;
    requestAnimationFrame(()=>{
      const maxY=document.documentElement.scrollHeight-window.innerHeight;
      hdr.classList.toggle('scrolled',window.scrollY>20);
      if(bar)bar.style.transform='scaleX('+(maxY>0?Math.min(1,window.scrollY/maxY):0)+')';
      ticking=false;
    });
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();
})();

/* ── Active nav link: highlight the section currently in view ────────── */
(function(){
  const links=[...document.querySelectorAll('.nav-links a:not(.nav-cv), .mm-pad a:not(.mm-dl)')];
  const ids=[...new Set(links.map(a=>a.getAttribute('href')))];
  const secs=ids.map(id=>document.querySelector(id)).filter(Boolean);
  if(!secs.length)return;
  const ind=document.querySelector('.nav-ind');
  function moveInd(a){
    if(!ind)return;
    if(!a||!a.offsetWidth){ind.classList.remove('on');return;}
    ind.style.setProperty('--ix',a.offsetLeft+'px');
    ind.style.setProperty('--iw',a.offsetWidth+'px');
    ind.classList.add('on');
  }
  const current=()=>document.querySelector('.nav-links a.active');
  document.querySelectorAll('.nav-links a:not(.nav-cv)').forEach(a=>{
    a.addEventListener('pointerenter',()=>moveInd(a));
    a.addEventListener('focus',()=>moveInd(a));
  });
  const navLinks=document.querySelector('.nav-links');
  if(navLinks){
    navLinks.addEventListener('pointerleave',()=>moveInd(current()));
    navLinks.addEventListener('focusout',()=>moveInd(current()));
  }
  window.addEventListener('resize',()=>moveInd(current()));
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>moveInd(current()));
  const setActive=id=>{
    links.forEach(a=>{
      const on=a.getAttribute('href')===id;
      a.classList.toggle('active',on);
      if(on)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');
    });
    moveInd(current());
  };
  const spy=new IntersectionObserver(es=>{
    es.forEach(e=>{if(e.isIntersecting)setActive('#'+e.target.id);});
  },{rootMargin:'-45% 0px -50% 0px'});
  secs.forEach(s=>spy.observe(s));
  const hero=document.getElementById('top');
  if(hero)new IntersectionObserver(es=>{
    es.forEach(e=>{if(e.isIntersecting)setActive('#top');});
  },{rootMargin:'-45% 0px -50% 0px'}).observe(hero);
})();

/* ── Copy email ──────────────────────────────────────────────────────── */
(function(){
  const btn=document.getElementById('copyEmail');
  if(!btn)return;
  const label=btn.querySelector('span');
  btn.addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(btn.dataset.email);label.textContent='Copied!';}
    catch(_){window.location.href='mailto:'+btn.dataset.email;return;}
    btn.classList.add('copied');
    setTimeout(()=>{label.textContent='Copy email';btn.classList.remove('copied');},1800);
  });
})();

/* ── Project charts: bar lengths come from data-w (CSP forbids inline styles) */
document.querySelectorAll('.pc-bar[data-w]').forEach(b=>b.style.setProperty('--w',b.dataset.w+'%'));

/* ── Hero numbers count up once on load ──────────────────────────────── */
(function(){
  if(REDUCE_MOTION())return;
  document.querySelectorAll('.hero-stats .v').forEach((el,i)=>{
    const m=el.textContent.match(/^([\d,]+)(.*)$/);
    if(!m)return;
    const target=parseInt(m[1].replace(/,/g,''),10),suffix=m[2],final=el.textContent;
    if(!(target>1))return;
    const dur=1400,delay=600+i*120;
    el.textContent='0'+suffix;
    setTimeout(()=>{
      const t0=performance.now();
      (function tick(t){
        const k=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-k,3);
        el.textContent=Math.round(target*e).toLocaleString('en-US')+suffix;
        if(k<1)requestAnimationFrame(tick);else el.textContent=final;
      })(t0);
    },delay);
  });
})();

/* ── Journey line fills as you scroll; each dot lights once passed ───── */
(function(){
  const tls=[...document.querySelectorAll('.timeline')];
  if(!tls.length)return;
  let ticking=false;
  function update(){
    ticking=false;
    const mark=window.innerHeight*0.62;
    tls.forEach(tl=>{
      const r=tl.getBoundingClientRect(),h=r.height-48;
      const p=h>0?Math.max(0,Math.min(1,(mark-r.top-24)/h)):0;
      tl.style.setProperty('--fill',p.toFixed(3));
      tl.querySelectorAll(':scope > .card').forEach(c=>{
        c.classList.toggle('passed',c.getBoundingClientRect().top+30<mark);
      });
    });
  }
  window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(update);}},{passive:true});
  window.addEventListener('resize',update);
  update();
})();

/* ── Scroll reveal ───────────────────────────────────────────────────── */
document.querySelectorAll('.reveal').forEach(sec=>{
  sec.querySelectorAll('.facts, .timeline .card, .prow, .sk-row, .contact-cta, .crow').forEach((el,i)=>{
    el.classList.add('stagger');el.style.setProperty('--d',Math.min(i,8));
  });
});
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* ── Cursor spotlight on cards (pointer devices only) ─────────────────── */
if(window.matchMedia('(hover: hover)').matches){
  document.querySelectorAll('.crow').forEach(el=>{
    el.classList.add('spot');
    el.addEventListener('pointermove',e=>{
      const r=el.getBoundingClientRect();
      el.style.setProperty('--mx',(e.clientX-r.left)+'px');
      el.style.setProperty('--my',(e.clientY-r.top)+'px');
    });
  });
}

/* ── Neural-network background canvas ───────────────────────────────── */
(function(){
  const canvas=document.getElementById('nn-bg');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const LAYERS=[3,5,7,6,8,7,8,6,7,5,3];
  const CONN=3;
  let nodes=[],edges=[],dpr=1;
  const clearIds=['about','experience','projects','skills'];
  const clearEls=clearIds.map(id=>document.getElementById(id)).filter(Boolean);

  function build(){
    nodes=[];edges=[];
    const W=window.innerWidth,H=window.innerHeight;
    const mx=W*0.06,my=H*0.09,uw=W-2*mx,uh=H-2*my;
    const ls=uw/(LAYERS.length-1);
    const layers=LAYERS.map((cnt,li)=>{
      const x=mx+li*ls,sp=uh/(cnt+1),arr=[];
      for(let i=0;i<cnt;i++) arr.push({
        x: x+(Math.random()-0.5)*ls*0.35,
        y: my+sp*(i+1)+(Math.random()-0.5)*sp*0.55
      });
      return arr;
    });
    nodes=layers.flat();
    for(let li=0;li<layers.length-1;li++){
      layers[li].forEach(n=>{
        [...layers[li+1]].sort((a,b)=>Math.abs(a.y-n.y)-Math.abs(b.y-n.y))
          .slice(0,Math.min(CONN,layers[li+1].length))
          .forEach(m=>edges.push({from:n,to:m}));
      });
    }
  }

  /* A few "signals" run along random edges, like activations firing. */
  let pulses=[];
  function spawn(){
    const e=edges[Math.floor(Math.random()*edges.length)];
    return e?{e,t:0,speed:0.004+Math.random()*0.006}:null;
  }
  function draw(){
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    const dark=getEffectiveTheme()==='dark';
    const nc=dark?'180,210,255':'116,101,76';
    const pc=dark?'123,156,255':'36,71,214';
    ctx.lineWidth=0.75;
    edges.forEach(e=>{
      ctx.strokeStyle=`rgba(${nc},${dark?0.11:0.095})`;
      ctx.beginPath();ctx.moveTo(e.from.x,e.from.y);ctx.lineTo(e.to.x,e.to.y);ctx.stroke();
    });
    nodes.forEach(n=>{
      ctx.fillStyle=`rgba(${nc},${dark?0.32:0.18})`;
      ctx.beginPath();ctx.arc(n.x,n.y,2.6,0,Math.PI*2);ctx.fill();
    });
    pulses.forEach(p=>{
      const {from:a,to:b}=p.e,x=a.x+(b.x-a.x)*p.t,y=a.y+(b.y-a.y)*p.t;
      const fade=Math.sin(Math.PI*p.t);
      const g=ctx.createRadialGradient(x,y,0,x,y,9);
      g.addColorStop(0,`rgba(${pc},${0.55*fade})`);g.addColorStop(1,`rgba(${pc},0)`);
      ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,9,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=`rgba(${pc},${0.8*fade})`;ctx.beginPath();ctx.arc(x,y,1.8,0,Math.PI*2);ctx.fill();
    });
    /* Erase the net across the content band (About → Skills) with feathered
       edges, so it lives in the hero and contact areas without hard seams. */
    if(clearEls.length){
      const top=clearEls[0].getBoundingClientRect().top,bottom=clearEls[clearEls.length-1].getBoundingClientRect().bottom;
      const h=bottom-top,F=Math.min(220,h/2);
      if(h>0&&bottom>0&&top<window.innerHeight){
        const g=ctx.createLinearGradient(0,top-F*0.4,0,bottom);
        const a=F/(h+F*0.4);
        g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(Math.min(.5,a),'rgba(0,0,0,1)');
        g.addColorStop(Math.max(.5,1-a*0.6),'rgba(0,0,0,1)');g.addColorStop(1,'rgba(0,0,0,0)');
        ctx.globalCompositeOperation='destination-out';
        ctx.fillStyle=g;ctx.fillRect(0,top-F*0.4,window.innerWidth,h+F*0.4);
        ctx.globalCompositeOperation='source-over';
      }
    }
  }

  function resize(){
    dpr=window.devicePixelRatio||1;
    canvas.width=window.innerWidth*dpr;
    canvas.height=window.innerHeight*dpr;
    build();draw();
  }

  let raf;
  window.addEventListener('scroll',()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(draw);},{passive:true});
  /* animate only while the net is actually on screen (hero / contact),
     the tab is visible, and the visitor hasn't asked for reduced motion */
  function netVisible(){
    if(!clearEls.length)return true;
    const top=clearEls[0].getBoundingClientRect().top,bottom=clearEls[clearEls.length-1].getBoundingClientRect().bottom;
    return top>60||bottom<window.innerHeight-60;
  }
  let last=0;
  function loop(t){
    requestAnimationFrame(loop);
    if(document.hidden||REDUCE_MOTION()||t-last<33)return;   // ~30fps is plenty
    last=t;
    if(!netVisible()){if(pulses.length){pulses=[];draw();}return;}
    while(pulses.length<7){const p=spawn();if(!p)break;p.t=Math.random()*0.3;pulses.push(p);}
    pulses.forEach(p=>{p.t+=p.speed;});
    pulses=pulses.map(p=>p.t>=1?spawn()||p:p);
    draw();
  }
  requestAnimationFrame(loop);
  document.addEventListener('themechange',draw);
  let rt;window.addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(resize,120);});
  resize();
})();

/* ── Skills neural-network graph ─────────────────────────────────────── */
(function(){
  const canvas=document.getElementById('skill-graph');
  if(!canvas)return;
  const nodeLayer=document.getElementById('skill-node-layer');
  const ctx=canvas.getContext('2d');
  const css=v=>getComputedStyle(root).getPropertyValue(v).trim();
  let C={};
  function palette(){
    C={ac:css('--accent'),acB:css('--accent-bright'),ink:css('--ink'),
       soft:css('--ink-soft'),faint:css('--ink-faint'),cell:css('--cell-bg'),
       card:css('--card'),border:css('--border')};
  }
  function colorMix(a,b,t){
    const pa=parseHex(a),pb=parseHex(b);
    if(!pa||!pb)return a;
    const c=pa.map((v,i)=>Math.round(v+(pb[i]-v)*t));
    return `rgb(${c[0]},${c[1]},${c[2]})`;
  }
  function parseHex(v){
    const h=v.trim().replace('#','');
    if(h.length===3)return h.split('').map(x=>parseInt(x+x,16));
    if(h.length===6)return [0,2,4].map(i=>parseInt(h.slice(i,i+2),16));
    return null;
  }

  const LAYER_DEFS=[
    ['TK'],
    ['Python','SQL','Linux','Git','Docker','Jupyter','VS Code'],
    ['Machine Learning','scikit-learn','Gradient Boosting','Feature Engineering','Causal Inference','Statistical Modeling','Dimensionality Reduction','A/B testing','Classification','Clustering','Model Evaluation'],
    ['PyTorch','Neural Networks','Fine-Tuning','LoRA / QLoRA','Transformers Architecture','Text Classification','Sentence Embeddings','Tokenization','Information Extraction','Image Classification','Object Detection','OpenCV','YOLO'],
    ['Prompt Engineering','RAG','Vector Search','Hugging Face','LangGraph','CrewAI','MCP','APIs','Structured Outputs','Few-shot Learning','LLM Evaluation'],
    ['Pandas','NumPy','Data Visualization','Matplotlib','Plotly','Tableau','ETL Pipelines','PostgreSQL','GCP','Weights & Biases (W&B)','FastAPI'],
    ['Data Scientist','ML Engineer','AI Engineer','DL Engineer','ML / AI Researcher'],
  ];
  const LAYERS=LAYER_DEFS.map((labels,li)=>labels.map(l=>({l,li})));
  const nodeByKey={},nodeByLabel={};
  LAYERS.flat().forEach(n=>{
    nodeByKey[n.l+'@'+n.li]=n;
    (nodeByLabel[n.l]||(nodeByLabel[n.l]=[])).push(n);
  });

  const EDGE_DEFS=[
    [0,0,1,0,0.95],[0,0,1,1,0.92],[0,0,1,3,0.9],
    [0,0,1,2,0.8],[0,0,1,5,0.78],[0,0,1,6,0.76],
    [0,0,1,8,0.82],[0,0,1,9,0.76],[0,0,1,10,0.78],
    [0,1,1,3,0.86],[0,1,1,7,0.7],[0,1,1,5,0.55],
    [0,5,1,0,0.78],[0,5,1,5,0.64],[0,5,1,10,0.62],
    [0,3,1,0,0.45],[0,2,1,0,0.42],[0,4,1,0,0.42],[0,6,1,0,0.42],
    [0,0,4,0,0.95],[0,0,4,1,0.92],[0,1,4,7,0.95],[0,1,4,6,0.86],
    [0,4,4,10,0.6],[0,4,4,8,0.58],
    [1,0,2,1,0.82],[1,0,2,0,0.76],[1,0,2,5,0.78],
    [1,0,2,9,0.66],[1,0,2,10,0.58],[1,1,2,5,0.74],[1,1,2,8,0.55],
    [1,3,2,5,0.8],[1,3,2,8,0.72],[1,3,2,6,0.58],[1,3,2,9,0.52],
    [1,5,2,1,0.58],[1,5,2,5,0.62],[1,6,2,6,0.76],
    [1,8,2,5,0.95],[1,8,2,9,0.86],[1,8,2,10,0.82],
    [1,9,2,6,0.7],[1,10,2,5,0.62],[1,10,2,9,0.58],[1,10,2,10,0.58],
    [2,0,3,3,0.86],[2,0,3,10,0.58],
    [2,2,3,3,0.9],[2,2,3,10,0.78],[2,2,3,9,0.55],
    [2,3,3,3,0.84],[2,3,3,10,0.66],
    [2,4,3,3,0.88],[2,4,3,1,0.8],[2,4,3,0,0.68],[2,4,3,8,0.58],
    [2,5,3,10,0.66],[2,5,3,8,0.56],
    [2,6,3,1,0.96],[2,6,3,2,0.96],[2,6,3,3,0.74],
    [2,7,3,1,0.58],[2,7,3,0,0.52],
    [2,8,3,1,0.86],[2,8,3,8,0.86],[2,8,3,10,0.66],[2,8,3,7,0.56],
    [2,9,3,10,0.38],[2,10,3,10,0.38],[2,12,3,7,0.48],
    [3,1,4,10,0.86],[3,1,4,7,0.62],[3,1,4,8,0.58],
    [3,2,4,7,0.72],[3,2,4,10,0.66],[3,2,4,8,0.58],
    [3,3,4,9,0.76],[3,3,4,8,0.62],[3,3,4,10,0.56],
    [3,4,4,10,0.76],[3,4,4,8,0.6],[3,5,4,10,0.56],
    [3,6,4,10,0.68],[3,7,4,10,0.95],
    [3,8,4,7,0.64],[3,8,4,6,0.58],[3,8,4,0,0.52],
    [3,10,4,9,0.88],[3,10,4,2,0.64],[3,10,4,4,0.54],[3,10,4,3,0.5],
    [4,0,5,0,0.95],[4,0,5,1,0.55],
    [4,1,5,0,0.86],[4,1,5,1,0.74],[4,1,5,3,0.65],
    [4,2,5,0,0.9],[4,2,5,4,0.55],
    [4,3,5,0,0.78],[4,4,5,0,0.76],[4,5,5,0,0.78],
    [4,6,5,0,0.76],[4,6,5,1,0.84],[4,6,5,2,0.62],
    [4,7,5,0,0.78],[4,7,5,1,0.66],[4,7,5,2,0.62],
    [4,8,5,1,0.86],[4,8,5,2,0.86],[4,8,5,3,0.72],
    [4,9,5,1,0.8],[4,9,5,3,0.82],[4,9,5,4,0.78],
    [4,10,5,1,0.82],[4,10,5,2,0.9],
    [1,0,5,0,0.78],[1,0,5,1,0.76],[1,0,5,4,0.62],
    [1,1,5,0,0.78],[1,1,5,1,0.68],
    [1,2,5,0,0.82],[1,2,5,1,0.64],
    [1,3,5,0,0.86],[1,3,5,1,0.72],
    [1,4,5,0,0.82],[1,4,5,4,0.88],
    [1,5,5,0,0.82],[1,5,5,4,0.78],
    [1,7,5,0,0.82],
    [1,10,5,0,0.7],[1,10,5,1,0.86],[1,10,5,4,0.76],
    [1,8,5,0,0.68],[1,9,5,0,0.62],
    [2,0,5,3,0.92],[2,0,5,1,0.82],[2,0,5,2,0.72],
    [2,1,5,3,0.86],[2,1,5,4,0.66],
    [2,2,5,2,0.84],[2,2,5,3,0.76],
    [2,3,5,2,0.84],[2,3,5,3,0.7],[2,3,5,4,0.65],
    [2,4,5,2,0.86],[2,4,5,4,0.8],
    [2,8,5,2,0.74],[2,8,5,0,0.6],
    [2,9,5,3,0.8],[2,10,5,3,0.82],[2,10,5,2,0.72],
    [2,11,5,3,0.55],[2,12,5,3,0.8],[2,12,5,2,0.64],
    [3,0,5,2,0.72],
    [3,1,5,2,0.92],[3,1,5,1,0.72],
    [3,2,5,2,0.8],[3,2,5,1,0.62],
    [3,3,5,2,0.78],[3,3,5,3,0.62],
    [3,4,5,2,0.84],[3,5,5,2,0.66],[3,6,5,2,0.68],
    [3,8,5,2,0.7],
    [3,10,5,2,0.78],[3,10,5,4,0.86],
  ];

  let EDGES=[];
  function buildEdges(){
    EDGES=EDGE_DEFS.map(([ali,ai,bli,bi,w])=>{
      const a=LAYERS[ali+1]?.[ai],b=LAYERS[bli+1]?.[bi];
      return a&&b?{a,b,w,toLi:b.li}:null;
    }).filter(Boolean);
    const tk=LAYERS[0][0];
    LAYERS[1].forEach(n=>EDGES.push({a:tk,b:n,w:0.65,toLi:1}));
  }

  let W=0,H=0,dpr=1;
  const FONTS=['600 13px','600 11.5px','600 11.5px','600 11.2px','600 11.2px','600 11.5px','600 11.5px'];
  const HH=[38,30,28,28,30,38];
  const LLABELS=['Me','Foundations','Core ML & Stats','Deep Learning & NLP','LLMs & Agents','Data & Infrastructure ','Roles'];

  let LX=[];
  function measure(){
    const maxW=[];
    LAYERS.forEach((layer,li)=>{
      ctx.font=FONTS[li]+" 'Plus Jakarta Sans',sans-serif";
      let mw=0;
      layer.forEach(n=>{
        n.h=li===0?34:li===1?22:30;
        n.w=Math.ceil(ctx.measureText(n.l).width)+28;
        if(n.w>mw)mw=n.w;
      });
      maxW[li]=mw;
    });
    const N=LAYERS.length,padL=W*0.025,padR=W*0.02;
    const SW=maxW.reduce((a,b)=>a+b,0);
    const gap=Math.max(8,(W-padL-padR-SW)/(N-1));
    LX=[];LX[0]=padL+maxW[0]/2;
    for(let i=1;i<N;i++)LX[i]=LX[i-1]+maxW[i-1]/2+gap+maxW[i]/2;
  }
  function lx(li){return LX[li];}
  function position(){
    const padTop=14,padBottom=34;
    LAYERS.forEach((layer,li)=>{
      const n=layer.length,avail=H-padTop-padBottom;
      layer.forEach((node,i)=>{node.x=lx(li);node.y=padTop+avail*(i+0.5)/n;});
    });
  }

  let focusNode=null,nodeEls=new Map();
  const graphEl=canvas.closest('.skillgraph');
  function neighbours(n){
    const set=new Set([n]);
    EDGES.forEach(e=>{if(e.a===n)set.add(e.b);if(e.b===n)set.add(e.a);});
    return set;
  }
  function setFocus(n){
    focusNode=n;
    const lit=n?neighbours(n):null;
    graphEl&&graphEl.classList.toggle('focus',!!n);
    nodeEls.forEach((el,node)=>{
      el.classList.toggle('lit',!!lit&&lit.has(node));
      el.classList.toggle('self',node===n);
    });
    draw();
  }
  function drawEdge(e,alpha){
    if(alpha<=0)return;
    const {a,b,w}=e,cpx=(a.x+b.x)/2;
    if(focusNode){
      const on=e.a===focusNode||e.b===focusNode;
      ctx.beginPath();ctx.moveTo(a.x+a.w/2,a.y);ctx.bezierCurveTo(cpx,a.y,cpx,b.y,b.x-b.w/2,b.y);
      ctx.strokeStyle=C.ac;
      ctx.lineWidth=on?0.8+w*1.4:0.2+w*0.6;
      ctx.globalAlpha=on?0.35+w*0.5:0.025;
      ctx.stroke();ctx.globalAlpha=1;
      return;
    }
    ctx.beginPath();
    ctx.moveTo(a.x+a.w/2,a.y);
    ctx.bezierCurveTo(cpx,a.y,cpx,b.y,b.x-b.w/2,b.y);
    ctx.strokeStyle=C.ac;
    ctx.lineWidth=0.2+w*0.95;
    ctx.globalAlpha=alpha*(0.03+w*0.13);
    ctx.stroke();
    ctx.globalAlpha=1;
  }

  function renderNodes(){
    if(!nodeLayer)return;
    nodeLayer.style.height=H+'px';
    nodeLayer.replaceChildren();
    nodeEls=new Map();
    LAYERS.forEach(layer=>layer.forEach(n=>{
      const el=document.createElement('span');
      const isIO=n.li===0||n.li===LAYERS.length-1;
      el.className='skill-node '+(isIO?'io':'hidden-skill');
      el.textContent=n.l;
      el.style.left=Math.round(n.x-n.w/2)+'px';
      el.style.top=Math.round(n.y-n.h/2)+'px';
      el.style.width=n.w+'px';
      el.style.height=n.h+'px';
      el.style.font=FONTS[n.li]+" 'Plus Jakarta Sans',sans-serif";
      el.addEventListener('pointerenter',()=>setFocus(n));
      el.addEventListener('pointerleave',()=>{if(focusNode===n)setFocus(null);});
      nodeEls.set(n,el);
      if(isIO){
        el.style.background=colorMix(C.ac,C.cell,0.88);
      }
      nodeLayer.appendChild(el);
    }));
    LAYERS.forEach((_,li)=>{
      const el=document.createElement('span');
      el.className='skill-layer-label';
      el.textContent=LLABELS[li];
      ctx.font="800 11.5px 'Plus Jakarta Sans',sans-serif";
      const lw=ctx.measureText(LLABELS[li]).width;
      el.style.left=Math.round(lx(li)-lw/2)+'px';
      el.style.top=(H-22)+'px';
      nodeLayer.appendChild(el);
    });
  }

  function draw(){
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,W,H);
    EDGES.forEach(e=>drawEdge(e,1));
  }
  function repaintNodes(){
    nodeEls.forEach((el,n)=>{
      if(n.li===0||n.li===LAYERS.length-1)el.style.background=colorMix(C.ac,C.cell,0.88);
    });
  }

  function size(){
    const rect=canvas.getBoundingClientRect();
    if(rect.width===0)return;
    dpr=window.devicePixelRatio||1;
    W=rect.width;H=rect.height;
    canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    palette();measure();position();buildEdges();focusNode=null;renderNodes();draw();
  }

  document.addEventListener('themechange',()=>{palette();repaintNodes();draw();});

  /* Overview (evidence cards) / Network (this graph) toggle */
  const tabs=[...document.querySelectorAll('.seg-btn')];
  function select(tab){
    tabs.forEach(t=>{
      const on=t===tab,panel=document.getElementById(t.getAttribute('aria-controls'));
      t.classList.toggle('on',on);
      t.setAttribute('aria-selected',on);
      t.tabIndex=on?0:-1;
      if(panel)panel.hidden=!on;
    });
    if(tab.id==='tab-network')requestAnimationFrame(size);
  }
  tabs.forEach((t,i)=>{
    t.addEventListener('click',()=>select(t));
    t.addEventListener('keydown',e=>{
      if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft')return;
      e.preventDefault();
      const n=tabs[(i+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length];
      n.focus();select(n);
    });
  });
  let rt;window.addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(size,140);});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>size());
  window.addEventListener('load',size);
  size();
})();

/* ── Projects: one line each, click a row to open its details ─────────── */
document.querySelectorAll('.prow-head').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const open=btn.getAttribute('aria-expanded')!=='true';
    btn.setAttribute('aria-expanded',open);
    btn.closest('.prow').classList.toggle('open',open);
  });
});
