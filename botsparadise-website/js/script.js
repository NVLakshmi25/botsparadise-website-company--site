// BOTSPARADISE website JavaScript
// Theme switcher, tooltips, reveal animations, navigation, form demo, and back-to-top.

// Premium UI: theme preference, tooltips, pointer-aware card glow and reveal-on-scroll.
    (() => {
      const root = document.documentElement;
      const toggle = document.getElementById('themeToggle');
      const icon = document.getElementById('themeIcon');
      const savedTheme = (() => { try { return localStorage.getItem('bp-theme'); } catch (_) { return null; } })();
      const preferredTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const setTheme = (theme) => {
        root.dataset.theme = theme;
        if (icon) icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
        if (toggle) {
          const next = theme === 'dark' ? 'light' : 'dark';
          toggle.setAttribute('aria-label', `Switch to ${next} theme`);
          toggle.setAttribute('title', `Switch to ${next} theme`);
          const tip = bootstrap.Tooltip.getInstance(toggle);
          if (tip) tip.setContent({ '.tooltip-inner': `Switch to ${next} theme` });
        }
        try { localStorage.setItem('bp-theme', theme); } catch (_) {}
      };
      setTheme(savedTheme || preferredTheme);
      if (toggle) toggle.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

      // Bootstrap tooltips: keyboard and pointer accessible.
      document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
        new bootstrap.Tooltip(el, { trigger: 'hover focus', boundary: 'window' });
      });

      // Subtle scroll reveals, with a safe fallback for older browsers.
      const revealTargets = document.querySelectorAll('.section-heading, main section .row > [class*="col-"], .service-card, .portfolio-card, .blog-card, .value-card, .career-card, .review-card');
      revealTargets.forEach((el, i) => {
        el.setAttribute('data-reveal', '');
        el.setAttribute('data-reveal-delay', String(i % 4));
      });
      if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
        revealTargets.forEach((el) => revealObserver.observe(el));
      } else {
        revealTargets.forEach((el) => el.classList.add('revealed'));
      }

      // A restrained cursor-following glow gives cards a more tactile feel.
      document.querySelectorAll('.service-card, .portfolio-card, .blog-card, .value-card').forEach((card) => {
        card.addEventListener('pointermove', (event) => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
          card.style.setProperty('--my', `${event.clientY - rect.top}px`);
        }, { passive: true });
      });
    })();

    // Current copyright year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Close the mobile navigation after selecting a section
    document.querySelectorAll('#navContent .nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        const navContent = document.getElementById('navContent');
        if (navContent.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navContent).hide();
        }
      });
    });

    // Back-to-top button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('show', window.scrollY > 350);
    }, { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Active navigation link as the user scrolls
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('#mainNavbar .nav-link');
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach((section) => sectionObserver.observe(section));

    // Front-end validation only. Connect this form to a backend/form service to deliver messages.
    document.getElementById('contactForm').addEventListener('submit', (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const message = document.getElementById('formMessage');
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      message.className = 'small text-success mt-2';
      message.textContent = 'Your details are validated in this demo. To send the message to BOTSPARADISE, connect this form to a server endpoint or form service.';
      form.reset();
    });
