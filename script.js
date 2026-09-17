// ==========================================================
// Console greeting (dev easter egg)
// ==========================================================
console.log(
  '%c> mujahid@dev %c~/portfolio',
  'color:#C9974C;font-weight:bold;font-size:14px',
  'color:#8A8D93;font-size:14px'
);
console.log('%cCurious? github.com/mujahidamin1', 'color:#5B5E64');

// ==========================================================
// Theme toggle — dark/light with localStorage + system pref
// ==========================================================
(function themeToggle() {
  var toggle = document.getElementById('theme-toggle');
  var root = document.documentElement;
  var STORAGE_KEY = 'portfolio-theme';

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
    // Update meta theme-color
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#F8F6F2' : '#0A0A0B');
  }

  // Initialize: saved pref > system pref > dark
  var saved = localStorage.getItem(STORAGE_KEY);
  var initial = saved || getSystemTheme();
  applyTheme(initial);

  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      var next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  // Listen for system preference changes (only if no saved pref)
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function (e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'light' : 'dark');
    }
  });
})();

// ==========================================================
// Hero terminal boot sequence — types two commands then rests
// ==========================================================
(function typeHero() {
  const cmd1El = document.getElementById('typed-command-1');
  const cmd2El = document.getElementById('typed-command-2');
  const output1 = document.getElementById('hero-output-1');
  const output2 = document.getElementById('hero-output-2');
  const promptLine2 = document.getElementById('prompt-line-2');
  const cursor1 = document.getElementById('cursor-1');
  const cursor2 = document.getElementById('cursor-2');
  const restingPrompt = document.getElementById('prompt-resting');

  if (!cmd1El) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Show everything instantly
    cmd1El.textContent = 'whoami';
    if (output1) output1.classList.add('is-visible');
    if (promptLine2) promptLine2.style.display = '';
    if (cmd2El) cmd2El.textContent = 'cat summary.txt';
    if (output2) output2.classList.add('is-visible');
    if (restingPrompt) { restingPrompt.style.display = ''; restingPrompt.classList.add('is-visible'); }
    if (cursor1) cursor1.style.display = 'none';
    if (cursor2) cursor2.style.display = 'none';
    return;
  }

  function typeText(el, text, speed, callback) {
    let i = 0;
    function step() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(step, speed);
      } else if (callback) {
        callback();
      }
    }
    step();
  }

  // Sequence: type command 1 → show output 1 → type command 2 → show output 2 → rest
  setTimeout(function () {
    typeText(cmd1El, 'whoami', 80, function () {
      // Hide cursor 1 after typing
      if (cursor1) cursor1.style.display = 'none';
      // Show output 1
      setTimeout(function () {
        if (output1) output1.classList.add('is-visible');

        // Show prompt line 2
        setTimeout(function () {
          if (promptLine2) promptLine2.style.display = '';

          // Type command 2
          setTimeout(function () {
            typeText(cmd2El, 'cat summary.txt', 60, function () {
              if (cursor2) cursor2.style.display = 'none';
              // Show output 2
              setTimeout(function () {
                if (output2) output2.classList.add('is-visible');
                // Show resting prompt
                setTimeout(function () {
                  if (restingPrompt) {
                    restingPrompt.style.display = '';
                    restingPrompt.classList.add('is-visible');
                  }
                }, 300);
              }, 200);
            });
          }, 200);
        }, 400);
      }, 200);
    });
  }, 400);
})();

// ==========================================================
// Scroll reveal — staggered cascade with --i index
// ==========================================================
(function scrollReveal() {
  var targets = document.querySelectorAll('.hero, .section, .metrics-strip');
  if (!targets.length) return;

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    targets.forEach(function (t) { t.classList.add('in-view'); });
    // Also make all data-reveal children visible
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.animation = 'none';
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(function (t) { observer.observe(t); });

  // Hero should reveal immediately
  var hero = document.querySelector('.hero');
  if (hero) hero.classList.add('in-view');
})();

// ==========================================================
// Copy-to-clipboard for the email field
// ==========================================================
(function copyButtons() {
  var buttons = document.querySelectorAll('[data-copy-target]');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-copy-target');
      var target = document.getElementById(targetId);
      if (!target) return;

      var text = target.textContent.trim();
      var originalLabel = btn.textContent;

      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = '[ copied ]';
      }).catch(function () {
        btn.textContent = '[ press ctrl+c ]';
      });

      setTimeout(function () {
        btn.textContent = originalLabel;
      }, 1800);
    });
  });
})();

// ==========================================================
// Contact form — Formspree AJAX with validation
// ==========================================================
(function contactForm() {
  var form = document.getElementById('contact-form');
  var note = document.getElementById('form-note');
  var submitBtn = document.getElementById('form-submit-btn');
  if (!form || !note) return;

  var FORMSPREE_URL = 'https://formspree.io/f/mnpnqdpb';

  function clearErrors() {
    form.querySelectorAll('.is-error').forEach(function (el) {
      el.classList.remove('is-error');
    });
    note.classList.remove('is-error');
    note.textContent = '';
  }

  function showError(fieldId, message) {
    var field = document.getElementById(fieldId);
    if (field) field.classList.add('is-error');
    note.classList.add('is-error');
    note.textContent = '> error: ' + message;
  }

  function setSubmitting(busy) {
    if (submitBtn) {
      submitBtn.disabled = busy;
      submitBtn.textContent = busy ? '[ sending... ]' : '[ send message ] >';
    }
  }

  // Clear errors on focus
  form.querySelectorAll('input, textarea').forEach(function (field) {
    field.addEventListener('focus', function () {
      field.classList.remove('is-error');
      if (note.classList.contains('is-error')) {
        note.classList.remove('is-error');
        note.textContent = '';
      }
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    var fromEmail = document.getElementById('from-email').value.trim();
    var subject = document.getElementById('subject').value.trim();
    var body = document.getElementById('body').value.trim();

    // Client-side validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fromEmail || !emailRegex.test(fromEmail)) {
      showError('from-email', 'please enter a valid email address');
      return;
    }
    if (!subject) {
      showError('subject', 'please enter a subject');
      return;
    }
    if (!body) {
      showError('body', 'please enter your message');
      return;
    }

    setSubmitting(true);

    var formData = new FormData(form);

    fetch(FORMSPREE_URL, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(function (response) {
      setSubmitting(false);
      if (response.ok) {
        note.classList.remove('is-error');
        note.textContent = '> message sent successfully — I\'ll get back to you soon';
        form.reset();
      } else {
        return response.json().then(function (data) {
          if (data.errors) {
            var messages = data.errors.map(function (err) { return err.message; }).join(', ');
            showError('from-email', messages);
          } else {
            showError('from-email', 'failed to send message — please try again or email me directly');
          }
        });
      }
    })
    .catch(function () {
      setSubmitting(false);
      showError('from-email', 'network error — please check your connection and retry');
    });
  });
})();

// ==========================================================
// Active nav link on scroll + sliding indicator
// ==========================================================
(function activeNav() {
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav-links a');
  var indicator = document.querySelector('.nav-indicator');
  if (!sections.length || !navLinks.length) return;

  var map = new Map();
  navLinks.forEach(function (link) {
    var id = link.getAttribute('href').replace('#', '');
    map.set(id, link);
  });

  function moveIndicator(activeLink) {
    if (!indicator || !activeLink) return;
    var parentRect = activeLink.parentElement.getBoundingClientRect();
    var linkRect = activeLink.getBoundingClientRect();
    indicator.style.width = linkRect.width + 'px';
    indicator.style.transform = 'translateX(' + (linkRect.left - parentRect.left) + 'px)';
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        var link = map.get(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove('is-active'); });
          link.classList.add('is-active');
          moveIndicator(link);
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach(function (s) { observer.observe(s); });

  // Recalc on resize
  window.addEventListener('resize', function () {
    var active = document.querySelector('.nav-links a.is-active');
    if (active) moveIndicator(active);
  });
})();

// ==========================================================
// Scroll progress indicator
// ==========================================================
(function scrollProgress() {
  var bar = document.querySelector('.scroll-progress');
  if (!bar) return;

  function update() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? scrollTop / docHeight : 0;
    bar.style.setProperty('--scroll', progress.toFixed(4));
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ==========================================================
// Metrics count-up animation
// ==========================================================
(function countUp() {
  var metrics = document.querySelectorAll('[data-count-target]');
  if (!metrics.length) return;

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    metrics.forEach(function (el) {
      el.textContent = el.getAttribute('data-count-target');
    });
    return;
  }

  function animateCount(el, target, duration) {
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var elapsed = timestamp - startTime;
      var progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      var easedProgress = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(easedProgress * target);
      el.textContent = current >= 1000 ? current.toLocaleString() : current;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = parseInt(entry.target.getAttribute('data-count-target'), 10);
          var duration = target > 100 ? 1500 : 800;
          animateCount(entry.target, target, duration);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  metrics.forEach(function (el) { observer.observe(el); });
})();

// ==========================================================
// ⌘K Command Palette
// ==========================================================
(function commandPalette() {
  var overlay = document.getElementById('palette-overlay');
  var input = document.getElementById('palette-input');
  var resultsList = document.getElementById('palette-results');
  var triggerBtn = document.getElementById('nav-palette-btn');

  if (!overlay || !input || !resultsList) return;

  var commands = [
    { group: 'Go to', label: 'About', action: function () { scrollTo('#about'); } },
    { group: 'Go to', label: 'Experience', action: function () { scrollTo('#experience'); } },
    { group: 'Go to', label: 'Projects', action: function () { scrollTo('#projects'); } },
    { group: 'Go to', label: 'Stack', action: function () { scrollTo('#stack'); } },
    { group: 'Go to', label: 'Contact', action: function () { scrollTo('#contact'); } },
    { group: 'Open', label: 'GitHub', action: function () { window.open('https://github.com/mujahidamin1', '_blank'); } },
    { group: 'Open', label: 'LinkedIn', action: function () { window.open('https://www.linkedin.com/in/mujahid-amin-28b3a6235', '_blank'); } },
    { group: 'Action', label: 'Copy email', action: function () {
      navigator.clipboard.writeText('mujahidameen205@gmail.com').catch(function () {});
    }},
    { group: 'Action', label: 'Download résumé', action: function () {
      window.open('https://drive.google.com/file/d/1W25ZlPjyRTFhGExNmx1rqFxZ4CQLVTfq/view?usp=sharing', '_blank');
    }},
    { group: 'Action', label: 'Toggle theme', action: function () {
      var btn = document.getElementById('theme-toggle');
      if (btn) btn.click();
    }}
  ];

  var selectedIndex = 0;
  var filtered = commands.slice();
  var previousFocus = null;

  function scrollTo(selector) {
    var el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderResults() {
    resultsList.innerHTML = '';
    if (filtered.length === 0) {
      resultsList.innerHTML = '<li class="palette-empty">No commands found</li>';
      return;
    }
    filtered.forEach(function (cmd, i) {
      var li = document.createElement('li');
      li.className = 'palette-result' + (i === selectedIndex ? ' is-selected' : '');
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', i === selectedIndex ? 'true' : 'false');
      li.innerHTML =
        '<span class="palette-result-group">' + cmd.group + '</span>' +
        '<span class="palette-result-label">' + cmd.label + '</span>';
      li.addEventListener('click', function () {
        runCommand(i);
      });
      resultsList.appendChild(li);
    });

    // Scroll selected into view
    var selected = resultsList.querySelector('.is-selected');
    if (selected) selected.scrollIntoView({ block: 'nearest' });
  }

  function filterCommands() {
    var query = input.value.toLowerCase().trim();
    if (!query) {
      filtered = commands.slice();
    } else {
      filtered = commands.filter(function (cmd) {
        return cmd.label.toLowerCase().includes(query) ||
               cmd.group.toLowerCase().includes(query);
      });
    }
    selectedIndex = 0;
    renderResults();
  }

  function runCommand(index) {
    if (filtered[index]) {
      closePalette();
      filtered[index].action();
    }
  }

  function openPalette() {
    previousFocus = document.activeElement;
    overlay.hidden = false;
    // Force reflow before adding class for transition
    overlay.offsetHeight;
    overlay.classList.add('is-open');
    input.value = '';
    filtered = commands.slice();
    selectedIndex = 0;
    renderResults();
    input.focus();
  }

  function closePalette() {
    overlay.classList.remove('is-open');
    setTimeout(function () {
      overlay.hidden = true;
    }, 200);
    if (previousFocus) previousFocus.focus();
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', function (e) {
    // Open palette: Cmd+K / Ctrl+K
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (overlay.hidden) {
        openPalette();
      } else {
        closePalette();
      }
      return;
    }

    // Only handle these when palette is open
    if (overlay.hidden) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closePalette();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % filtered.length;
      renderResults();
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + filtered.length) % filtered.length;
      renderResults();
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      runCommand(selectedIndex);
      return;
    }
  });

  // Filter on input
  input.addEventListener('input', filterCommands);

  // Close on backdrop click
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closePalette();
  });

  // Nav button trigger
  if (triggerBtn) {
    triggerBtn.addEventListener('click', function () {
      openPalette();
    });
  }
})();
