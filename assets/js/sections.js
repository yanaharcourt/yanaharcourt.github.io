/* =====================================================
   sections.js
   ===================================================== */

/* ── Mobile nav ──────────────────────────────────── */
(function() {
  var burger  = document.getElementById('ynaBurger');
  var overlay = document.getElementById('ynaMobileOverlay');
  if (!burger || !overlay) return;

  var open = false;

  burger.addEventListener('click', function() {
    open = !open;
    burger.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  document.querySelectorAll('.yna-mob-link').forEach(function(link) {
    link.addEventListener('click', function() {
      open = false;
      burger.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ── Scroll: add shadow to header ───────────────── */
(function() {
  var hdr = document.querySelector('.yna-header');
  if (!hdr) return;
  window.addEventListener('scroll', function() {
    hdr.style.borderBottomColor = window.scrollY > 40
      ? 'rgba(0,0,0,0.1)'
      : 'rgba(0,0,0,0.06)';
  }, { passive: true });
})();

/* ── Featured Work — custom cursor ──────────────── */
(function() {
  var cursor = document.getElementById('fwCursor');
  if (!cursor) return;

  var cx = 0, cy = 0, vx = 0, vy = 0;

  document.addEventListener('mousemove', function(e) { cx = e.clientX; cy = e.clientY; });

  (function loop() {
    vx += (cx - vx) * 0.13;
    vy += (cy - vy) * 0.13;
    cursor.style.left = vx + 'px';
    cursor.style.top  = vy + 'px';
    requestAnimationFrame(loop);
  })();

  document.querySelectorAll('.fw-card').forEach(function(card) {
    card.addEventListener('mouseenter', function() { cursor.classList.add('visible'); });
    card.addEventListener('mouseleave', function() { cursor.classList.remove('visible'); });
    card.style.cursor = 'none';
    card.addEventListener('click', function() {
      var href = card.getAttribute('data-href');
      if (!href) return;
      card.getAttribute('data-external')
        ? window.open(href, '_blank')
        : (window.location.href = href);
    });
  });
})();

/* ── Dotted Globe (like Stokt screenshot) ────────── */
(function() {
  var canvas = document.getElementById('mainGlobe');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var W = canvas.width, H = canvas.height;
  var R = Math.min(W, H) * 0.42;
  var CX = W / 2, CY = H / 2 + 16;

  /* Locations that cycle */
  var locs = [
    { lat: 48.85,  lon:   2.35, label: 'Based in Paris, France' },
    { lat: 37.56,  lon: 126.97, label: 'Formerly Seoul, South Korea' }
  ];
  var locIdx = 0;
  var locEl  = document.getElementById('globeLocationText');
  if (locEl) locEl.style.transition = 'opacity 0.35s ease';

  /* Simple dot-cloud globe data: lat/lon pairs for a dot globe */
  var dots = [];
  (function buildDots() {
    for (var lat = -80; lat <= 80; lat += 7) {
      var r = Math.cos(lat * Math.PI / 180);
      var nLon = Math.max(1, Math.round(36 * r));
      for (var i = 0; i < nLon; i++) {
        var lon = (360 / nLon) * i - 180;
        dots.push({ lat: lat, lon: lon });
      }
    }
  })();

  var rotY = (locs[0].lon * Math.PI / 180) - Math.PI / 2;
  var isDrag = false, lastX = 0;
  var autoSpin = true;

  function toVec(lat, lon) {
    var phi   = (90 - lat) * Math.PI / 180;
    var theta = lon * Math.PI / 180;
    return {
      x: Math.sin(phi) * Math.cos(theta),
      y: Math.cos(phi),
      z: Math.sin(phi) * Math.sin(theta)
    };
  }

  function proj(v) {
    var cr = Math.cos(rotY), sr = Math.sin(rotY);
    var x2 = v.x * cr + v.z * sr;
    var z2 = -v.x * sr + v.z * cr;
    return { x: CX + x2 * R, y: CY - v.y * R, depth: z2 };
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    /* Draw each dot */
    dots.forEach(function(d) {
      var p = proj(toVec(d.lat, d.lon));
      if (p.depth < -0.1) return; /* back face */

      var opacity = (p.depth + 1) / 2; /* 0 at edge, 1 at front */
      var size = 1.6 + opacity * 0.6;

      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,' + (0.1 + opacity * 0.12) + ')';
      ctx.fill();
    });

    /* Location dots */
    var t = Date.now();
    locs.forEach(function(loc, i) {
      var p = proj(toVec(loc.lat, loc.lon));
      if (p.depth < 0) return;

      if (i === locIdx) {
        /* Active — indigo pulsing */
        var pulse = (Math.sin(t * 0.003) + 1) / 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 10 + pulse * 10, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99,102,241,' + (0.1 - pulse * 0.08) + ')';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99,102,241,0.25)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#6366f1';
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fill();
      }
    });

    /* Auto spin */
    if (autoSpin) rotY += 0.004;

    /* Cycle location text every 7s */
    var CYCLE = 7000;
    var newIdx = Math.floor((t % (CYCLE * locs.length)) / CYCLE);
    if (newIdx !== locIdx) {
      locIdx = newIdx;
      if (locEl) {
        locEl.style.opacity = '0';
        setTimeout(function() {
          locEl.textContent = locs[locIdx].label;
          locEl.style.opacity = '1';
        }, 350);
      }
    }

    requestAnimationFrame(draw);
  }

  /* Drag */
  canvas.addEventListener('mousedown', function(e) { isDrag = true; lastX = e.clientX; autoSpin = false; });
  window.addEventListener('mouseup',   function()  { isDrag = false; setTimeout(function(){ autoSpin = true; }, 2000); });
  window.addEventListener('mousemove', function(e) { if (isDrag) { rotY += (e.clientX - lastX) * 0.007; lastX = e.clientX; } });
  canvas.addEventListener('touchstart', function(e) { isDrag = true; lastX = e.touches[0].clientX; autoSpin = false; e.preventDefault(); }, { passive: false });
  window.addEventListener('touchend',   function()  { isDrag = false; setTimeout(function(){ autoSpin = true; }, 2000); });
  window.addEventListener('touchmove',  function(e) { if (isDrag) { rotY += (e.touches[0].clientX - lastX) * 0.007; lastX = e.touches[0].clientX; } });

  draw();
})();

/* ── Footer form (original logic) ───────────────── */
(function() {
  document.querySelectorAll('[data-service]').forEach(function(el) {
    el.addEventListener('click', function() { el.classList.toggle('active'); updateSvc(); });
  });
  document.querySelectorAll('[data-budget]').forEach(function(el) {
    el.addEventListener('click', function() {
      document.querySelectorAll('[data-budget]').forEach(function(b){ b.classList.remove('active'); });
      el.classList.add('active');
      document.getElementById('selectedBudget').value = el.dataset.budget;
    });
  });
  function updateSvc() {
    var sel = [];
    document.querySelectorAll('[data-service].active').forEach(function(e){ sel.push(e.dataset.service); });
    document.getElementById('selectedServices').value = sel.join(', ');
  }

  var form = document.getElementById('yanasContactForm');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var msg = document.getElementById('yanasStatusMessage');
    var btn = form.querySelector('.yanas-form_button');
    var svc = document.getElementById('selectedServices').value;
    var bgt = document.getElementById('selectedBudget').value;
    if (!svc) { showMsg(msg, 'yanas-error', 'Please select at least one service.'); return; }
    if (!bgt) { showMsg(msg, 'yanas-error', 'Please select your budget range.'); return; }
    showMsg(msg, 'yanas-loading', 'Sending message...');
    btn.disabled = true; btn.textContent = 'Sending...';
    fetch(form.action, { method:'POST', body: new FormData(form), headers:{'Accept':'application/json'} })
      .then(function(r) {
        if (r.ok) {
          showMsg(msg, 'yanas-success', 'Thank you! Your message has been sent.');
          form.reset();
          document.querySelectorAll('.yanas-form-button_field.active').forEach(function(el){ el.classList.remove('active'); });
        } else throw new Error();
      })
      .catch(function() { showMsg(msg, 'yanas-error', 'Oops! There was a problem. Please try again.'); })
      .finally(function() {
        btn.disabled = false; btn.textContent = 'Start a journey';
        setTimeout(function() { msg.style.display = 'none'; }, 5000);
      });
  });

  function showMsg(el, cls, text) {
    el.className = 'yanas-status-message ' + cls;
    el.textContent = text;
    el.style.display = 'block';
  }

  /* Floating icons animation */
  window.addEventListener('load', function() {
    document.querySelectorAll('.yanas-bg-element').forEach(function(el, i) {
      setTimeout(function() {
        el.style.opacity = '0.04';
        el.style.animation = 'yanas-complex-float ' + (15 + i * 2) + 's ease-in-out infinite';
        el.style.animationDelay = (i * 0.8) + 's';
      }, i * 200);
    });
  });
})();
