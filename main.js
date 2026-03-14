/**
 * main.js — Pampers Article v2
 * Содержит данные по линейкам (PAMPERS_MODELS),
 * рендеринг карточек и таблицы, счётчики, анимации.
 */

(function () {
  'use strict';

  /* ════════════════════════════════════════════════════════
     ДАННЫЕ ЛИНЕЕК PAMPERS
     Редактируйте этот массив для обновления контента
  ════════════════════════════════════════════════════════ */
  const PAMPERS_MODELS = [
    {
      stage:     'Первые дни',
      age:       '0–4 недели',
      weight:    'до 5 кг',
      model:     'Pampers Premium Care Newborn',
      advantage: 'Мягчайший внутренний слой. Специальный вырез для заживления пупочной ранки. Подходит для нежной кожи новорождённого.',
      scenario:  'Роддом и первые недели дома',
      color:     'linear-gradient(135deg, #7C9EF0, #5078DC)'
    },
    {
      stage:     'Первые месяцы',
      age:       '1–4 месяца',
      weight:    '3–6 кг',
      model:     'Pampers Active Baby Mini',
      advantage: 'Эластичные боковые элементы для лёгкого движения. Надёжная защита от протечек при частых сменах.',
      scenario:  'Активное бодрствование и дневной сон',
      color:     'linear-gradient(135deg, #6DC8A0, #3EA87A)'
    },
    {
      stage:     'Активный рост',
      age:       '4–9 месяцев',
      weight:    '6–10 кг',
      model:     'Pampers Premium Care Midi',
      advantage: 'Повышенная мягкость и дышащий внешний слой. Индикатор влажности для новых родителей.',
      scenario:  'Сон, ползание, первые попытки сесть',
      color:     'linear-gradient(135deg, #F0A96D, #D97B36)'
    },
    {
      stage:     'Ночной сон',
      age:       'с 3 месяцев',
      weight:    'от 5 кг',
      model:     'Pampers Baby-Dry Night',
      advantage: 'До 12 часов защиты. Многослойное абсорбирующее ядро удерживает влагу всю ночь. Снижает риск ночного пробуждения.',
      scenario:  'Непрерывный ночной сон',
      color:     'linear-gradient(135deg, #5A6FA0, #283C78)'
    },
    {
      stage:     'Активное движение',
      age:       '9–18 месяцев',
      weight:    '9–14 кг',
      model:     'Pampers Active Fit Maxi',
      advantage: 'Анатомический крой следует каждому движению. Гибкие боковые стенки не стесняют при ползании и хождении.',
      scenario:  'Прогулки, игры, первые шаги',
      color:     'linear-gradient(135deg, #F07070, #D04040)'
    },
    {
      stage:     'Переход к самостоятельности',
      age:       'с 8–10 месяцев',
      weight:    'от 9 кг',
      model:     'Pampers Pants',
      advantage: 'Формат трусиков — легко надеть стоя и быстро снять. Защита как у классических подгузников без сложного надевания.',
      scenario:  'Начало ходьбы и приучение к горшку',
      color:     'linear-gradient(135deg, #A06DF0, #7840D0)'
    }
  ];

  /* ════════════════════════════════════════════════════════
     РЕНДЕР КАРТОЧЕК МОДЕЛЕЙ
  ════════════════════════════════════════════════════════ */
  function renderModelCards () {
    const grid = document.getElementById('models-grid');
    if (!grid) return;

    const fragment = document.createDocumentFragment();

    PAMPERS_MODELS.forEach((m, i) => {
      const card = document.createElement('div');
      card.className = 'model-card reveal';
      card.style.transitionDelay = (i * 0.07) + 's';
      card.setAttribute('role', 'article');
      card.setAttribute('aria-label', m.model);

      card.innerHTML = `
        <div class="model-card-accent" style="background:${m.color}" aria-hidden="true"></div>
        <p class="model-stage">${m.stage}</p>
        <p class="model-age">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" style="opacity:.6"><circle cx="6" cy="6" r="5" stroke="currentColor" stroke-width="1.2" fill="none"/><path d="M6 3.5V6l1.5 1.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
          ${m.age} · ${m.weight}
        </p>
        <h4 class="model-name">${m.model}</h4>
        <p class="model-advantage">${m.advantage}</p>
        <span class="model-tag">${m.scenario}</span>
      `;

      fragment.appendChild(card);
    });

    grid.appendChild(fragment);

    // Trigger reveal for newly added cards
    requestAnimationFrame(() => {
      grid.querySelectorAll('.model-card.reveal').forEach(card => {
        revealObserverInstance && revealObserverInstance.observe(card);
      });
    });
  }

  /* ════════════════════════════════════════════════════════
     РЕНДЕР ТАБЛИЦЫ СРАВНЕНИЯ
  ════════════════════════════════════════════════════════ */
  function renderComparisonTable () {
    const tbody = document.getElementById('pampers-table-body');
    if (!tbody) return;

    const fragment = document.createDocumentFragment();

    PAMPERS_MODELS.forEach(m => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span class="ptable-name">${m.model}</span><br><small style="color:var(--c-text-muted);font-size:0.72rem">${m.age}</small></td>
        <td>${m.stage}</td>
        <td><span class="ptable-advantage">${m.scenario}</span></td>
        <td style="font-size:0.82rem;color:#4B5563;max-width:200px">${m.advantage.split('.')[0]}.</td>
      `;
      fragment.appendChild(tr);
    });

    tbody.appendChild(fragment);
  }

  /* ════════════════════════════════════════════════════════
     ANIMATED COUNTERS
  ════════════════════════════════════════════════════════ */
  function animateCounter (el) {
    const target = parseInt(el.dataset.target, 10);
    if (!target || isNaN(target)) return;

    const duration = 1200;
    const start    = performance.now();

    function step (now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  /* ════════════════════════════════════════════════════════
     SCROLL REVEAL (IntersectionObserver)
  ════════════════════════════════════════════════════════ */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let revealObserverInstance = null;

  function initReveal () {
    const els = document.querySelectorAll('.reveal');

    if (prefersReduced || !('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-visible'));
      return;
    }

    revealObserverInstance = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');

        // Animate counters on reveal
        entry.target.querySelectorAll('.counter[data-target]').forEach(animateCounter);
        if (entry.target.classList.contains('counter') && entry.target.dataset.target) {
          animateCounter(entry.target);
        }

        revealObserverInstance.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => revealObserverInstance.observe(el));
  }

  /* ════════════════════════════════════════════════════════
     READING PROGRESS BAR
  ════════════════════════════════════════════════════════ */
  const progressBar = document.querySelector('.reading-progress');

  function updateProgress () {
    if (!progressBar) return;
    const article = document.querySelector('.article-body');
    if (!article) return;
    const rect    = article.getBoundingClientRect();
    const total   = article.offsetHeight - window.innerHeight;
    const scrolled = Math.max(0, -rect.top);
    const pct     = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;
    progressBar.style.width = pct + '%';
    progressBar.setAttribute('aria-valuenow', Math.round(pct));
  }

  /* ════════════════════════════════════════════════════════
     HEADER SCROLL SHADOW
  ════════════════════════════════════════════════════════ */
  const header = document.querySelector('.site-header');

  function onScroll () {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
    updateProgress();
    highlightTOC();
  }

  /* ════════════════════════════════════════════════════════
     TOC ACTIVE SECTION HIGHLIGHT
  ════════════════════════════════════════════════════════ */
  const tocLinks = document.querySelectorAll('.toc-link');
  const sections = Array.from(tocLinks)
    .map(l => document.getElementById(l.getAttribute('href').replace('#', '')))
    .filter(Boolean);

  function highlightTOC () {
    if (!tocLinks.length) return;
    let activeId = sections[0]?.id;
    sections.forEach(s => {
      if (s.getBoundingClientRect().top <= 100) activeId = s.id;
    });
    tocLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + activeId);
    });
  }

  /* ════════════════════════════════════════════════════════
     MOBILE NAV TOGGLE
  ════════════════════════════════════════════════════════ */
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      mobileNav.hidden = open;
    });
    document.addEventListener('click', e => {
      if (!navToggle.contains(e.target) && !mobileNav.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        mobileNav.hidden = true;
      }
    });
  }

  /* ════════════════════════════════════════════════════════
     INLINE TOC TOGGLE
  ════════════════════════════════════════════════════════ */
  const tocToggle = document.querySelector('.toc-toggle');
  const tocInlineList = document.getElementById('toc-inline-list');

  if (tocToggle && tocInlineList) {
    tocToggle.addEventListener('click', () => {
      const open = tocToggle.getAttribute('aria-expanded') === 'true';
      tocToggle.setAttribute('aria-expanded', String(!open));
      tocInlineList.hidden = open;
    });
    tocInlineList.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        tocToggle.setAttribute('aria-expanded', 'false');
        tocInlineList.hidden = true;
      });
    });
  }

  /* ════════════════════════════════════════════════════════
     SMOOTH ANCHOR SCROLL
  ════════════════════════════════════════════════════════ */
  if (!prefersReduced) {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      });
    });
  }

  /* ════════════════════════════════════════════════════════
     FOOTER YEAR
  ════════════════════════════════════════════════════════ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ════════════════════════════════════════════════════════
     THROTTLED SCROLL LISTENER
  ════════════════════════════════════════════════════════ */
  let scrollTick = false;
  window.addEventListener('scroll', () => {
    if (!scrollTick) {
      requestAnimationFrame(() => { onScroll(); scrollTick = false; });
      scrollTick = true;
    }
  }, { passive: true });

  /* ════════════════════════════════════════════════════════
     INIT
  ════════════════════════════════════════════════════════ */
  // Render data-driven content first
  renderModelCards();
  renderComparisonTable();

  // Then init reveal (so new cards are observed too)
  initReveal();

  // Initial scroll state
  onScroll();

})();
