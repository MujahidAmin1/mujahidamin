// ==========================================================
// Hero terminal type-in — runs once on load
// ==========================================================
(function typeHero() {
  const el = document.getElementById('typed-command');
  if (!el) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const command = 'whoami';

  if (prefersReducedMotion) {
    el.textContent = command;
    return;
  }

  let i = 0;
  function step() {
    if (i <= command.length) {
      el.textContent = command.slice(0, i);
      i++;
      setTimeout(step, 90);
    }
  }
  // small delay so it feels like the page "booted" first
  setTimeout(step, 350);
})();

// ==========================================================
// Scroll reveal — one fade/slide per section, not per card
// ==========================================================
(function scrollReveal() {
  const targets = document.querySelectorAll('.hero, .section');
  if (!targets.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    targets.forEach((t) => t.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((t) => observer.observe(t));

  // Hero should reveal immediately, not wait for scroll
  const hero = document.querySelector('.hero');
  if (hero) hero.classList.add('in-view');
})();

// ==========================================================
// Copy-to-clipboard for the email field
// ==========================================================
(function copyButtons() {
  const buttons = document.querySelectorAll('[data-copy-target]');
  buttons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const targetId = btn.getAttribute('data-copy-target');
      const target = document.getElementById(targetId);
      if (!target) return;

      const text = target.textContent.trim();
      const originalLabel = btn.textContent;

      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = '[ copied ]';
      } catch (err) {
        btn.textContent = '[ press ctrl+c ]';
      }

      setTimeout(() => {
        btn.textContent = originalLabel;
      }, 1800);
    });
  });
})();

// ==========================================================
// Contact form — placeholder handler
// Replace this with a real submit (mailto, Formspree, your own
// backend endpoint, etc.) before going live.
// ==========================================================
(function contactForm() {
  const form = document.getElementById('contact-form');
  const note = document.getElementById('form-note');
  if (!form || !note) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // TODO: wire this up to a real endpoint (Formspree, your own
    // Express/Node backend, EmailJS, etc.) instead of mailto.
    const fromEmail = document.getElementById('from-email').value;
    const subject = document.getElementById('subject').value;
    const body = document.getElementById('body').value;

    const mailtoLink = `mailto:mujahidameen205@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(`From: ${fromEmail}\n\n${body}`)}`;

    window.location.href = mailtoLink;

    note.textContent = '> message handed off to your mail client...';
  });
})();

// ==========================================================
// Active nav link on scroll (nice-to-have, not required)
// ==========================================================
(function activeNav() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const map = new Map();
  navLinks.forEach((link) => {
    const id = link.getAttribute('href').replace('#', '');
    map.set(id, link);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = map.get(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((s) => observer.observe(s));
})();
