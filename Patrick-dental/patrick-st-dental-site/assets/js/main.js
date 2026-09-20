/* Patrick St Dental: shared behaviour for index.html and shop.html.
   Every block checks that its elements exist, so the same file runs on both pages. */
(function(){
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function(id){ return document.getElementById(id); };
  var all = function(sel, root){ return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- Header: shadow on scroll ---------- */
  var header = $('siteHeader');
  function onScroll(){ if(header) header.classList.toggle('is-scrolled', window.scrollY > 8); updateSticky(); }

  /* ---------- Mobile menu ---------- */
  var toggle = $('menuToggle'), menu = $('mobileMenu');
  function setMenu(open){
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  if(toggle && menu){
    toggle.addEventListener('click', function(){ setMenu(!menu.classList.contains('open')); });
    menu.addEventListener('click', function(e){ if(e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && menu.classList.contains('open')){ setMenu(false); toggle.focus(); }
    });
  }

  /* ---------- Scroll reveal (staggered) ---------- */
  all('[data-stagger]').forEach(function(group){
    Array.prototype.forEach.call(group.children, function(child, i){ child.style.setProperty('--i', i); });
  });
  var revealEls = all('.reveal');
  if(reduceMotion || !('IntersectionObserver' in window)){
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  } else {
    var revealObs = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ entry.target.classList.add('is-visible'); revealObs.unobserve(entry.target); }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -6% 0px'});
    revealEls.forEach(function(el){ revealObs.observe(el); });
  }

  /* ---------- Current section in the nav (in-page anchors only) ---------- */
  var navLinks = all('.nav-links a[href^="#"]');
  if(navLinks.length && 'IntersectionObserver' in window){
    var map = {};
    navLinks.forEach(function(a){ map[a.getAttribute('href').slice(1)] = a; });
    var clearNav = function(){ navLinks.forEach(function(a){ a.removeAttribute('aria-current'); }); };
    var spy = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        var link = map[entry.target.id];
        if(link && entry.isIntersecting){ clearNav(); link.setAttribute('aria-current','true'); }
      });
    }, {rootMargin:'-40% 0px -55% 0px'});
    Object.keys(map).forEach(function(id){ var s = $(id); if(s) spy.observe(s); });
    ['top','reviews','faq','book'].forEach(function(id){
      var s = $(id); if(!s) return;
      new IntersectionObserver(function(e){ if(e[0].isIntersecting) clearNav(); }, {rootMargin:'-40% 0px -55% 0px'}).observe(s);
    });
  }

  /* ---------- Sticky call / book bar on phones ---------- */
  var sticky = $('stickyCta'), stickyBlocked = false;
  function updateSticky(){
    if(sticky) sticky.classList.toggle('is-visible', window.scrollY > 520 && !stickyBlocked);
  }
  if(sticky && 'IntersectionObserver' in window){
    var seen = {};
    var blockObs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ seen[e.target.id] = e.isIntersecting; });
      stickyBlocked = Object.keys(seen).some(function(k){ return seen[k]; });
      updateSticky();
    });
    ['book','contact','shop-cta'].forEach(function(id){ var s = $(id); if(s) blockObs.observe(s); });
  }
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});

  /* ---------- FAQ accordion: one open at a time ---------- */
  var faqItems = all('.faq-item');
  function setFaq(item, open){
    item.classList.toggle('is-open', open);
    item.querySelector('.faq-question').setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  faqItems.forEach(function(item){
    item.querySelector('.faq-question').addEventListener('click', function(){
      var willOpen = !item.classList.contains('is-open');
      faqItems.forEach(function(other){ if(other !== item) setFaq(other, false); });
      setFaq(item, willOpen);
    });
  });

  /* ---------- Modals (doctor bio, full price list) with focus trap ---------- */
  var activeModal = null, lastFocused = null;
  function openModal(ov, focusEl){
    lastFocused = document.activeElement; activeModal = ov;
    ov.classList.add('open');
    document.body.style.overflow = 'hidden';
    (focusEl || ov.querySelector('.modal-close')).focus();
  }
  function closeModal(skipFocus){
    if(!activeModal) return;
    activeModal.classList.remove('open'); activeModal = null;
    document.body.style.overflow = '';
    if(lastFocused && !skipFocus) lastFocused.focus();
  }
  all('.modal-overlay').forEach(function(ov){
    ov.addEventListener('click', function(e){
      var link = e.target.closest('a');
      if(e.target === ov || e.target.closest('.modal-close') || (link && link.hasAttribute('data-close'))) closeModal(!!link);
    });
  });
  document.addEventListener('keydown', function(e){
    if(!activeModal) return;
    if(e.key === 'Escape'){ closeModal(); return; }
    if(e.key === 'Tab'){
      var focusable = all('a[href],button:not([disabled]),[tabindex="0"]', activeModal);
      var first = focusable[0], last = focusable[focusable.length - 1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
  });

  /* Doctor bio */
  var doctorOverlay = $('doctorModalOverlay');
  if(doctorOverlay){
    all('[data-doctor]').forEach(function(card){
      card.addEventListener('click', function(){
        var tpl = $('doctor-' + card.getAttribute('data-doctor'));
        if(!tpl) return;
        var f = {};
        all('[data-field]', tpl.content).forEach(function(el){ f[el.getAttribute('data-field')] = el.textContent; });
        var photo = $('doctorModalPhoto');
        photo.src = f.photo || ''; photo.alt = f.name || '';
        $('doctorModalName').textContent = f.name || '';
        $('doctorModalRole').textContent = f.role || '';
        $('doctorModalBio').textContent = f.bio || '';
        var tags = $('doctorModalTags'); tags.innerHTML = '';
        (f.tags || '').split(',').filter(Boolean).forEach(function(t){
          var sp = document.createElement('span'); sp.textContent = t.trim(); tags.appendChild(sp);
        });
        openModal(doctorOverlay);
      });
    });
  }

  /* Full price list: section chips scroll the list and follow it */
  var feesOverlay = $('feesModalOverlay'), feesScroll = $('feesScroll');
  if(feesOverlay && feesScroll){
    var chips = all('.fees-chip');
    var groups = chips.map(function(c){ return $(c.getAttribute('data-target')); });
    var setActiveChip = function(i){
      chips.forEach(function(c, idx){
        if(idx === i) c.setAttribute('aria-current','true'); else c.removeAttribute('aria-current');
      });
      var bar = chips[i] && chips[i].parentElement;
      if(bar) bar.scrollTo({left: chips[i].offsetLeft - bar.clientWidth / 2 + chips[i].offsetWidth / 2, behavior: reduceMotion ? 'auto' : 'smooth'});
    };
    var updateChips = function(){
      var y = feesScroll.scrollTop + 48, current = 0;
      groups.forEach(function(g, i){ if(g.offsetTop <= y) current = i; });
      if(feesScroll.scrollTop + feesScroll.clientHeight >= feesScroll.scrollHeight - 4) current = groups.length - 1;
      setActiveChip(current);
    };
    chips.forEach(function(chip, i){
      chip.addEventListener('click', function(){
        feesScroll.scrollTo({top: groups[i].offsetTop - 8, behavior: reduceMotion ? 'auto' : 'smooth'});
      });
    });
    feesScroll.addEventListener('scroll', updateChips, {passive:true});
    all('[data-open-fees]').forEach(function(btn){
      btn.addEventListener('click', function(){
        feesScroll.scrollTop = 0;
        openModal(feesOverlay);
        updateChips();
      });
    });
  }

  /* ---------- Shop: pick a need, highlight only its products ---------- */
  var pickRows = all('[data-pick]');
  if(pickRows.length){
    var products = all('.product-grid .product');
    var pickStatus = $('pickStatus'), pickLabel = $('pickLabel'), pickClear = $('pickClear');
    var setPick = function(row){
      var ids = row ? row.getAttribute('data-pick').split(' ') : [];
      products.forEach(function(p){ p.classList.remove('is-picked'); });
      void document.body.offsetWidth; /* restart the pulse animation */
      products.forEach(function(p){ if(ids.indexOf(p.id) > -1) p.classList.add('is-picked'); });
      pickRows.forEach(function(r){
        r.classList.toggle('is-active', r === row);
        if(r === row) r.setAttribute('aria-current','true'); else r.removeAttribute('aria-current');
      });
      pickStatus.hidden = !row;
      if(row) pickLabel.textContent = row.getAttribute('data-pick-label');
    };
    /* Bring the picked cards into view: centre them below the sticky header
       (or align the first one to the top when they don't fit on screen). */
    var scrollToPicked = function(){
      var picked = products.filter(function(p){ return p.classList.contains('is-picked'); });
      if(!picked.length) return;
      var tops = picked.map(function(p){ return p.getBoundingClientRect().top + window.scrollY; });
      var bottoms = picked.map(function(p){ return p.getBoundingClientRect().bottom + window.scrollY; });
      var top = Math.min.apply(null, tops), bottom = Math.max.apply(null, bottoms);
      var headerH = 88, vh = window.innerHeight, span = bottom - top, target;
      if(span + 48 <= vh - headerH) target = top + span / 2 - (headerH + (vh - headerH) / 2);
      else target = top - headerH - 24;
      window.scrollTo({top: Math.max(0, target), behavior: reduceMotion ? 'auto' : 'smooth'});
    };
    pickRows.forEach(function(row){
      row.addEventListener('click', function(e){
        e.preventDefault();
        setPick(row);
        scrollToPicked();
      });
    });
    pickClear.addEventListener('click', function(){ setPick(null); });
  }

  /* ---------- Booking form: inline validation ---------- */
  var form = $('bookForm');
  if(form){
    var card = $('bookCard'), nameInput = $('bookName'), phoneInput = $('bookPhone');
    var phoneField = $('phoneField'), submitBtn = $('bookSubmit');
    var setError = function(input, wrap, msgId, message){
      $(msgId).textContent = message || '';
      input.setAttribute('aria-invalid', message ? 'true' : 'false');
      if(wrap) wrap.classList.toggle('is-invalid', !!message);
    };
    var validate = function(){
      var ok = true;
      if(nameInput.value.trim().length < 2){ setError(nameInput, null, 'err-name', 'Enter your name so we know who to ask for.'); ok = false; }
      else setError(nameInput, null, 'err-name', '');
      var digits = phoneInput.value.replace(/\D/g,'');
      if(digits.length < 7 || digits.length > 11){ setError(phoneInput, phoneField, 'err-phone', 'Enter a phone number we can call, for example 89 602 8689.'); ok = false; }
      else setError(phoneInput, phoneField, 'err-phone', '');
      return ok;
    };
    nameInput.addEventListener('input', function(){ if(nameInput.getAttribute('aria-invalid') === 'true') validate(); });
    phoneInput.addEventListener('input', function(){ if(phoneInput.getAttribute('aria-invalid') === 'true') validate(); });
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(!validate()){ (nameInput.getAttribute('aria-invalid') === 'true' ? nameInput : phoneInput).focus(); return; }
      submitBtn.disabled = true; submitBtn.textContent = 'Sending…';
      /* Replace this timeout with a real request to your booking system. */
      setTimeout(function(){
        $('bookSuccessText').textContent = 'Thanks, ' + nameInput.value.trim().split(' ')[0] + '. We\'ll call you on +353 ' + phoneInput.value.trim() + ' during opening hours.';
        card.classList.add('is-sent');
        $('bookSuccess').focus();
      }, 700);
    });
  }
})();
