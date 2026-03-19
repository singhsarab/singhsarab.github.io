/* ============================================================
   SARABJOT SINGH — PORTFOLIO
   Interactive JS: theme toggle, canvas, scroll reveal, counters
   ============================================================ */

(function () {
  'use strict';

  /* ── Theme Toggle ──────────────────────────────────────────── */
  const html = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const THEME_KEY = 'ss-portfolio-theme';

  function getStoredTheme() {
    try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }

  function initTheme() {
    const stored = getStoredTheme();
    if (stored) {
      setTheme(stored);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = html.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!getStoredTheme()) setTheme(e.matches ? 'dark' : 'light');
  });

  /* ── Mobile Menu ───────────────────────────────────────────── */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function () {
      const isOpen = mobileNav.classList.contains('open');
      mobileNav.classList.toggle('open', !isOpen);
      mobileMenuBtn.classList.toggle('open', !isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', String(!isOpen));
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        mobileMenuBtn.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ── Header Scroll ─────────────────────────────────────────── */
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', function () {
    if (header) header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* ── Animated Canvas Background ────────────────────────────── */
  var canvas = document.getElementById('bg-canvas');
  var ctx = canvas ? canvas.getContext('2d') : null;
  var particles = [];
  var animFrame;
  var canvasW = 0, canvasH = 0;

  function getThemeColors() {
    var isDark = html.getAttribute('data-theme') !== 'light';
    return isDark
      ? { dot: 'rgba(99,102,241,', line: 'rgba(99,102,241,' }
      : { dot: 'rgba(79,70,229,', line: 'rgba(79,70,229,' };
  }

  function resizeCanvas() {
    if (!canvas) return;
    canvasW = canvas.width = window.innerWidth;
    canvasH = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvasW,
      y: Math.random() * canvasH,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1
    };
  }

  function initParticles() {
    var count = Math.min(Math.floor((canvasW * canvasH) / 18000), 80);
    particles = [];
    for (var i = 0; i < count; i++) particles.push(createParticle());
  }

  function drawParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasW, canvasH);
    var colors = getThemeColors();
    var maxDist = 140;

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvasW;
      if (p.x > canvasW) p.x = 0;
      if (p.y < 0) p.y = canvasH;
      if (p.y > canvasH) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = colors.dot + p.opacity + ')';
      ctx.fill();

      for (var j = i + 1; j < particles.length; j++) {
        var q = particles[j];
        var dx = p.x - q.x;
        var dy = p.y - q.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          var alpha = (1 - dist / maxDist) * 0.15;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = colors.line + alpha + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    animFrame = requestAnimationFrame(drawParticles);
  }

  function initCanvas() {
    if (!canvas) return;
    resizeCanvas();
    initParticles();
    if (animFrame) cancelAnimationFrame(animFrame);
    drawParticles();
  }

  window.addEventListener('resize', function () {
    resizeCanvas();
    initParticles();
  }, { passive: true });

  /* ── Scroll Reveal ─────────────────────────────────────────── */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Counter Animation ─────────────────────────────────────── */
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var duration = 1800;
    var start = performance.now();
    function step(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      el.textContent = Math.round(easeOutCubic(progress) * target);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var counterEls = document.querySelectorAll('.stat-num[data-target]');
  if ('IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counterEls.forEach(function (el) { counterObserver.observe(el); });
  }

  /* ── Active Nav Highlight ──────────────────────────────────── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.main-nav a');

  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.3, rootMargin: '-64px 0px -40% 0px' });
    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

  /* ── Smooth Scroll ─────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ── Cursor Glow (desktop only) ────────────────────────────── */
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var glow = document.createElement('div');
    glow.style.cssText = 'position:fixed;width:400px;height:400px;border-radius:50%;pointer-events:none;z-index:0;transform:translate(-50%,-50%);transition:opacity 0.3s ease;background:radial-gradient(circle,var(--accent-glow) 0%,transparent 70%);opacity:0';
    document.body.appendChild(glow);

    var glowVisible = false;
    document.addEventListener('mousemove', function (e) {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
      if (!glowVisible) { glow.style.opacity = '1'; glowVisible = true; }
    }, { passive: true });
    document.addEventListener('mouseleave', function () {
      glow.style.opacity = '0'; glowVisible = false;
    });
  }

  /* ── Init ──────────────────────────────────────────────────── */
  initTheme();
  initCanvas();

}());
