/* ========================================
   Stat Z Plus – JS Interactions
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

  // Counter animation
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

  // ===== FORM → WHATSAPP =====
  const WHATSAPP_NUMBER = '917721922860';
  const form = document.getElementById('contact-form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const serviceSelect = document.getElementById('service');
      const service = serviceSelect.options[serviceSelect.selectedIndex].text;
      const message = document.getElementById('message').value.trim();

      // Build WhatsApp message
      const whatsappMessage =
        `*New Enquiry – Stat Z Plus*
━━━━━━━━━━━━━━━
*Name:* ${name}
*Email:* ${email}
*Phone:* ${phone || 'Not provided'}
*Service:* ${service}
*Message:* ${message}
━━━━━━━━━━━━━━━
_Sent from Stat Z Plus Website_`;

      // Encode and open WhatsApp
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

      // Show sending state
      const btn = form.querySelector('.form-submit');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> Opening WhatsApp...';
      btn.style.background = '#25D366';
      btn.style.color = '#fff';

      // Open WhatsApp in new tab
      window.open(whatsappURL, '_blank');

      // Reset button after 2s
      setTimeout(() => {
        btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg> Sent! Check WhatsApp';

        setTimeout(() => {
          form.reset();
          btn.innerHTML = originalHTML;
          btn.style.background = '';
          btn.style.color = '';
        }, 2500);
      }, 1000);
    });
  }
});
