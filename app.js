/* ============================================================
   SARABJOT SINGH — PORTFOLIO
   Warm agentic interactions: theme, canvas, scroll reveal
   ============================================================ */

(function () {
  'use strict';

  var html = document.documentElement;
  var THEME_KEY = 'ss-theme-v2';

  /* ── Theme ─────────────────────────────────────────────── */
  function getStored() {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }
  function setTheme(t) {
    html.setAttribute('data-theme', t);
    try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
  }
  function initTheme() {
    var stored = getStored();
    if (stored) { setTheme(stored); return; }
    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  /* ── Mobile Menu ────────────────────────────────────────── */
  var mobileBtn = document.getElementById('mobile-menu-btn');
  var mobileNav = document.getElementById('mobile-nav');
  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', function () {
      var open = mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open', !open);
      mobileBtn.classList.toggle('open', !open);
      mobileBtn.setAttribute('aria-expanded', String(!open));
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        mobileBtn.classList.remove('open');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Header Scroll ──────────────────────────────────────── */
  var header = document.getElementById('site-header');
  window.addEventListener('scroll', function () {
    if (header) header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  /* ── Canvas — warm terracotta particles ─────────────────── */
  var canvas = document.getElementById('bg-canvas');
  var ctx = canvas ? canvas.getContext('2d') : null;
  var pts = [];
  var raf;
  var W = 0, H = 0;

  function warmColor(alpha) {
    var isDark = html.getAttribute('data-theme') !== 'light';
    return isDark
      ? 'rgba(193,95,60,' + alpha + ')'
      : 'rgba(176,85,48,' + alpha + ')';
  }

  function resize() {
    if (!canvas) return;
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function mkPt() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.2 + 0.4,
      o: Math.random() * 0.35 + 0.05
    };
  }

  function initPts() {
    var n = Math.min(Math.floor((W * H) / 22000), 60);
    pts = [];
    for (var i = 0; i < n; i++) pts.push(mkPt());
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    var maxD = 130;
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = warmColor(p.o);
      ctx.fill();
      for (var j = i + 1; j < pts.length; j++) {
        var q = pts[j];
        var dx = p.x - q.x, dy = p.y - q.y;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d < maxD) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = warmColor((1 - d / maxD) * 0.1);
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(draw);
  }

  function initCanvas() {
    if (!canvas) return;
    resize();
    initPts();
    if (raf) cancelAnimationFrame(raf);
    draw();
  }

  window.addEventListener('resize', function () { resize(); initPts(); }, { passive: true });

  /* ── Scroll Reveal ──────────────────────────────────────── */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Active Nav ─────────────────────────────────────────── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.main-nav a');
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var id = e.target.getAttribute('id');
          navLinks.forEach(function (l) {
            l.classList.toggle('active', l.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.25, rootMargin: '-64px 0px -40% 0px' });
    sections.forEach(function (s) { so.observe(s); });
  }

  /* ── Smooth Scroll ──────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
      }
    });
  });

  /* ── Subtle cursor glow (desktop) ───────────────────────── */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var glow = document.createElement('div');
    glow.style.cssText = 'position:fixed;width:500px;height:500px;border-radius:50%;pointer-events:none;z-index:0;transform:translate(-50%,-50%);transition:opacity 0.4s ease;background:radial-gradient(circle,rgba(193,95,60,0.06) 0%,transparent 70%);opacity:0;';
    document.body.appendChild(glow);
    var glowOn = false;
    document.addEventListener('mousemove', function (e) {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
      if (!glowOn) { glow.style.opacity = '1'; glowOn = true; }
    }, { passive: true });
    document.addEventListener('mouseleave', function () { glow.style.opacity = '0'; glowOn = false; });
  }

  /* ── Init ───────────────────────────────────────────────── */
  initTheme();
  initCanvas();

}());
