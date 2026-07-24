// Star field background
(function() {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let stars = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      a: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.02 + 0.005
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      s.a += s.speed;
      const alpha = (Math.sin(s.a) + 1) / 2 * 0.6 + 0.1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 210, 255, ${alpha})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// Scroll animations
(function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
})();

// Navbar scroll
(function() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
})();

// Mobile hamburger
(function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
})();

// Smooth tab scroll for sub-world pages
(function() {
  document.querySelectorAll('.world-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.world-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.target);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Update active tab on scroll
  const sections = document.querySelectorAll('.module-section');
  const tabs = document.querySelectorAll('.world-tab');
  if (sections.length && tabs.length) {
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => {
        const top = s.getBoundingClientRect().top;
        if (top < 300) current = s.id;
      });
      tabs.forEach(t => {
        t.classList.toggle('active', t.dataset.target === current);
      });
    });
  }
})();
