/* ========================================
   Stat Z Plus – Simple & Clean JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  const scrollTopBtn = document.querySelector('.scroll-top');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  });

  // Scroll to top
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Scroll reveal
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Simple counter animation
  const counters = document.querySelectorAll('.count-up');
  const counterObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          let current = 0;
          const step = Math.ceil(target / 60);
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = current + suffix;
          }, 25);
          counterObs.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(c => counterObs.observe(c));

  // Form submit
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      btn.innerHTML = '⏳ Sending...';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '✅ Sent Successfully!';
        btn.style.background = '#10b981';
        btn.style.color = '#fff';

        setTimeout(() => {
          form.reset();
          btn.innerHTML = '🚀 Send Message';
          btn.disabled = false;
          btn.style.background = '';
          btn.style.color = '';
        }, 2500);
      }, 1200);
    });
  }
});
