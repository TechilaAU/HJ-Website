/* HJ Landscaping — shared site behaviour */
(function(){
  "use strict";

  /* ---- Nav: scroll state + mobile toggle ---- */
  var nav = document.getElementById('nav');
  if(nav && !nav.classList.contains('solid')){
    var onScroll = function(){
      if(window.scrollY > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if(toggle && links){
    var setMenu = function(open){
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    toggle.addEventListener('click', function(e){
      e.stopPropagation();
      setMenu(!document.body.classList.contains('nav-open'));
    });
    // close when a link is tapped
    links.addEventListener('click', function(e){
      if(e.target.tagName === 'A') setMenu(false);
    });
    // close on Escape
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && document.body.classList.contains('nav-open')) setMenu(false);
    });
    // close when tapping outside the panel (on the page behind)
    document.addEventListener('click', function(e){
      if(!document.body.classList.contains('nav-open')) return;
      if(!links.contains(e.target) && !toggle.contains(e.target)) setMenu(false);
    });
  }

  /* ---- Filter chips (visual only on static build) ---- */
  var filters = document.getElementById('filters');
  if(filters){
    filters.addEventListener('click', function(e){
      if(!e.target.classList.contains('chip')) return;
      filters.querySelectorAll('.chip').forEach(function(c){ c.classList.remove('active'); });
      e.target.classList.add('active');
    });
  }

  /* ---- Lead form ---- */
  var form = document.getElementById('leadForm');
  var thanks = document.getElementById('thanks');
  if(form && thanks){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      form.hidden = true;
      thanks.hidden = false;
      thanks.scrollIntoView({behavior:'smooth', block:'center'});
    });
  }

  /* ---- Before / After slider ---- */
  var ba = document.getElementById('ba');
  if(ba){
    var before = document.getElementById('baBefore');
    var divider = document.getElementById('baDivider');
    var handle = document.getElementById('baHandle');
    var dragging = false;
    var setPct = function(p){
      p = Math.max(0, Math.min(100, p));
      before.style.clipPath = 'inset(0 ' + (100 - p) + '% 0 0)';
      divider.style.left = p + '%';
    };
    var moveTo = function(clientX){
      var r = ba.getBoundingClientRect();
      setPct(((clientX - r.left) / r.width) * 100);
    };
    handle.addEventListener('mousedown', function(){ dragging = true; });
    handle.addEventListener('touchstart', function(){ dragging = true; }, {passive:true});
    ba.addEventListener('mousedown', function(e){ dragging = true; moveTo(e.clientX); });
    window.addEventListener('mousemove', function(e){ if(dragging) moveTo(e.clientX); });
    window.addEventListener('touchmove', function(e){ if(dragging && e.touches[0]) moveTo(e.touches[0].clientX); }, {passive:true});
    window.addEventListener('mouseup', function(){ dragging = false; });
    window.addEventListener('touchend', function(){ dragging = false; });
    handle.addEventListener('keydown', function(e){
      var cur = parseFloat(divider.style.left) || 50;
      if(e.key === 'ArrowLeft'){ setPct(cur - 4); e.preventDefault(); }
      if(e.key === 'ArrowRight'){ setPct(cur + 4); e.preventDefault(); }
    });
  }

  /* ---- Scroll reveal ---- */
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
  }

  /* ---- Footer year ---- */
  var y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
})();
