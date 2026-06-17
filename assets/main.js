/* ── Theme init: restore saved preference, else default to light (ignore system preference) */
(function () {
  const saved = localStorage.getItem('theme');
  document.documentElement.setAttribute('data-theme', saved === 'dark' ? 'dark' : 'light');
})();

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
themeBtn.addEventListener('click',()=>{
  const next=getEffectiveTheme()==='dark'?'light':'dark';
  root.setAttribute('data-theme',next);
  localStorage.setItem('theme',next);
});

/* ── Scroll: tint + header blur + hero title fade ────────────────────── */
(function(){
  const hdr=document.querySelector('header');
  let ticking=false;
  function onScroll(){
    if(ticking)return; ticking=true;
    requestAnimationFrame(()=>{
      const maxY=document.documentElement.scrollHeight-window.innerHeight;
      root.style.setProperty('--scroll',maxY>0?Math.min(1,window.scrollY/maxY):0);
      hdr.classList.toggle('scrolled',window.scrollY>20);
      ticking=false;
    });
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();
})();

/* ── Scroll reveal ───────────────────────────────────────────────────── */
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

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

  function draw(){
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    const dark=getEffectiveTheme()==='dark';
    const nc=dark?'180,210,255':'116,101,76';
    ctx.lineWidth=0.75;
    edges.forEach(e=>{
      ctx.strokeStyle=`rgba(${nc},${dark?0.11:0.095})`;
      ctx.beginPath();ctx.moveTo(e.from.x,e.from.y);ctx.lineTo(e.to.x,e.to.y);ctx.stroke();
    });
    nodes.forEach(n=>{
      ctx.fillStyle=`rgba(${nc},${dark?0.32:0.18})`;
      ctx.beginPath();ctx.arc(n.x,n.y,2.6,0,Math.PI*2);ctx.fill();
    });
    clearEls.forEach(el=>{
      const r=el.getBoundingClientRect();
      ctx.clearRect(r.left,r.top,r.width,r.height);
    });
  }

  function resize(){
    dpr=window.devicePixelRatio||1;
    canvas.width=window.innerWidth*dpr;
    canvas.height=window.innerHeight*dpr;
    build();draw();
  }

  let raf;
  window.addEventListener('scroll',()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(draw);},{passive:true});
  themeBtn.addEventListener('click',()=>setTimeout(draw,50));
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

  function drawEdge(e,alpha){
    if(alpha<=0)return;
    const {a,b,w}=e,cpx=(a.x+b.x)/2;
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
    renderNodes();
  }

  function size(){
    const rect=canvas.getBoundingClientRect();
    if(rect.width===0)return;
    dpr=window.devicePixelRatio||1;
    W=rect.width;H=rect.height;
    canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    palette();measure();position();buildEdges();draw();
  }

  (function buildMobile(){
    const wrap=document.getElementById('skill-mobile');
    if(!wrap)return;
    const frag=document.createDocumentFragment();
    const last=LAYER_DEFS.length-1;
    LAYER_DEFS.forEach((labels,li)=>{
      if(li===0||li===last)return;
      const card=document.createElement('div');
      card.className='skillcard';
      const h=document.createElement('h3');
      const sd=document.createElement('span');sd.className='sd';
      h.append(sd,document.createTextNode(LLABELS[li].trim()));
      const tags=document.createElement('div');tags.className='stags';
      labels.forEach(l=>{
        const s=document.createElement('span');
        s.className='stag';
        s.textContent=l;
        tags.appendChild(s);
      });
      card.append(h,tags);
      frag.appendChild(card);
    });
    wrap.appendChild(frag);
  })();

  themeBtn.addEventListener('click',()=>setTimeout(()=>{palette();draw();},60));
  let rt;window.addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(size,140);});
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>size());
  window.addEventListener('load',size);
  size();
})();

/* ── Projects carousel ───────────────────────────────────────────────── */
(function(){
  const viewport=document.getElementById('carousel');
  const track=document.getElementById('track');
  const prev=document.getElementById('railPrev'),next=document.getElementById('railNext'),dotsWrap=document.getElementById('railDots');
  if(!track)return;
  const N=track.children.length;
  const cards=Array.from(track.children);

  dotsWrap.textContent='1 / '+N;

  let index=0;
  let stepW=0,peek=0,pageCount=N;
  function measure(){
    stepW=cards[1]?cards[1].offsetLeft-cards[0].offsetLeft:cards[0]?.offsetWidth||0;
    peek=window.innerWidth>=760?30:0;
    const visible=window.innerWidth>=760?2:1;
    pageCount=Math.max(1,N-visible+1);
    index=Math.min(index,pageCount-1);
  }
  function baseX(){
    const maxLeft=Math.min(0,viewport.clientWidth-track.scrollWidth);
    return Math.max(maxLeft,-cards[index].offsetLeft+peek);
  }
  function setActive(){dotsWrap.textContent=(index+1)+' / '+pageCount;}
  function render(animate){
    track.classList.toggle('animate',!!animate);
    if(animate){track.classList.add('moving');clearTimeout(movingT);movingT=setTimeout(()=>{if(!dragging)track.classList.remove('moving');},620);}
    track.style.transform='translateX('+Math.round(baseX())+'px)';
    setActive();
  }
  let movingT;
  track.addEventListener('transitionend',()=>{if(!dragging)track.classList.remove('moving');});
  function go(dir){index=(index+dir+pageCount)%pageCount;render(true);}
  next.addEventListener('click',()=>go(1));
  prev.addEventListener('click',()=>go(-1));

  let dragging=false,startX=0,startTf=0,moved=0;
  function curTf(){const m=getComputedStyle(track).transform;if(m&&m!=='none'){return new DOMMatrixReadOnly(m).m41;}return baseX();}
  function down(x){dragging=true;moved=0;startX=x;startTf=curTf();track.classList.remove('animate');track.classList.add('moving');}
  function move(x){if(!dragging)return;moved=x-startX;track.style.transform='translate3d('+Math.round(startTf+moved)+'px,0,0)';}
  function up(){if(!dragging)return;dragging=false;
    if(Math.abs(moved)>stepW*0.18){if(moved<0)index=(index+1)%pageCount;else index=(index-1+pageCount)%pageCount;}
    render(true);
  }
  viewport.addEventListener('pointerdown',e=>{
    if(e.target.closest('a, h3, p, .chip, .statbox, .bullets'))return;
    down(e.clientX);viewport.setPointerCapture(e.pointerId);
  });
  viewport.addEventListener('pointermove',e=>{if(dragging){move(e.clientX);}});
  viewport.addEventListener('pointerup',up);
  viewport.addEventListener('pointercancel',up);
  viewport.addEventListener('dragstart',e=>e.preventDefault());

  function init(){measure();index=0;track.classList.remove('animate');render(false);}
  window.addEventListener('load',init);
  setTimeout(init,60);
  let rt;window.addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{measure();render(false);},120);});
})();
