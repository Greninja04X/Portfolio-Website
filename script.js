// DOM Ready helper
const ready = (fn) => (document.readyState !== 'loading')
  ? fn()
  : document.addEventListener('DOMContentLoaded', fn);

ready(() => {
  // Smooth scroll for internal hash links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Hamburger — target .subnav (fallback to .nav-links for older pages)
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.subnav') || document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('nav-active');
      hamburger.classList.toggle('toggle');
    });
  }

  // Typed.js (home only)
  if (document.getElementById('typed') && typeof Typed !== 'undefined') {
    new Typed('#typed', {
      strings: [
        'Cyber Security Analyst — Abhishek Mazumder',
        'AI/ML Data Scientist — Ronit Bhowmick',
        'Full-Stack Builders',
        'Secure • Intelligent • Fast'
      ],
      typeSpeed: 90,
      backSpeed: 45,
      loop: true
    });
  }

  // Theme toggle (persist)
  const root = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);

  const setIcon = () => {
    if (!toggleBtn) return;
    const current = root.getAttribute('data-theme') || 'dark';
    toggleBtn.textContent = current === 'dark' ? '🌙' : '☀️';
    toggleBtn.setAttribute('aria-label', current === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  };
  setIcon();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      setIcon();
    });
  }

  // Scroll-Reveal
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealEls = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.getAttribute('data-reveal-delay');
          if (delay) el.style.transitionDelay = `${parseInt(delay, 10) / 100}s`;
          el.classList.add('reveal-visible');
          observer.unobserve(el);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.2 });
    revealEls.forEach(el => obs.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('reveal-visible'));
  }
});
