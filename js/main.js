/* ══════════════════════════════════════════════════
   FIESTAS DE ÁLAVA 2026 · San Prudencio
   main.js — Countdown · Nav · Carousel · Lightbox
             Búsqueda con debounce · Filtros combinados
   ══════════════════════════════════════════════════ */

/* ─── COUNTDOWN ─────────────────────────────────── */
(function () {
  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    var diff = new Date('2026-04-28T00:00:00') - new Date();
    if (diff <= 0) {
      ['cd-days','cd-hours','cd-min','cd-sec'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.textContent = '00';
      });
      return;
    }
    document.getElementById('cd-days').textContent  = pad(Math.floor(diff / 864e5));
    document.getElementById('cd-hours').textContent = pad(Math.floor((diff % 864e5) / 36e5));
    document.getElementById('cd-min').textContent   = pad(Math.floor((diff % 36e5) / 6e4));
    document.getElementById('cd-sec').textContent   = pad(Math.floor((diff % 6e4) / 1e3));
  }

  tick();
  setInterval(tick, 1000);
})();


/* ─── NAV TOGGLE (móvil) ────────────────────────── */
(function () {
  var btn   = document.getElementById('nav-toggle');
  var links = document.querySelector('.nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', function () {
    links.classList.toggle('open');
    btn.classList.toggle('open');
  });

  // Cerrar al hacer clic en un enlace
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
      btn.classList.remove('open');
    });
  });
})();


/* ─── CAROUSEL ──────────────────────────────────── */
(function () {
  var track    = document.getElementById('carouselTrack');
  var prevBtn  = document.getElementById('carouselPrev');
  var nextBtn  = document.getElementById('carouselNext');
  var dotsWrap = document.getElementById('carouselDots');
  if (!track) return;

  var cards   = Array.prototype.slice.call(track.querySelectorAll('.trad-card'));
  var total   = cards.length;
  var current = 0;
  var GAP     = 16;

  function cardWidth()  { return cards[0] ? cards[0].offsetWidth : 280; }
  function outerWidth() { return track.parentElement ? track.parentElement.offsetWidth : 600; }
  function visible()    { return Math.max(1, Math.floor((outerWidth() + GAP) / (cardWidth() + GAP))); }
  function maxIdx()     { return Math.max(0, total - visible()); }

  function go(idx) {
    current = Math.max(0, Math.min(idx, maxIdx()));
    track.style.transform = 'translateX(-' + current * (cardWidth() + GAP) + 'px)';
    updateDots();
  }

  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    var n = maxIdx() + 1;
    for (var i = 0; i < n; i++) {
      (function (i) {
        var d = document.createElement('button');
        d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', 'Ir a tarjeta ' + (i + 1));
        d.addEventListener('click', function () { go(i); });
        dotsWrap.appendChild(d);
      })(i);
    }
  }

  function updateDots() {
    if (!dotsWrap) return;
    var dots = dotsWrap.querySelectorAll('.carousel-dot');
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === current);
    });
  }

  prevBtn && prevBtn.addEventListener('click', function () { go(current - 1); });
  nextBtn && nextBtn.addEventListener('click', function () { go(current + 1); });

  // Swipe táctil
  var startX = 0;
  track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) go(current + (dx < 0 ? 1 : -1));
  });

  window.addEventListener('resize', function () { buildDots(); go(current); });
  buildDots();
  go(0);
})();


/* ─── LIGHTBOX ───────────────────────────────────── */
(function () {
  var lb      = document.getElementById('lightbox');
  var overlay = document.getElementById('lightboxOverlay');
  var closeBtn= document.getElementById('lightboxClose');
  var imgWrap = document.getElementById('lightboxImg');
  var caption = document.getElementById('lightboxCaption');
  if (!lb) return;

  var videoMap = {
    'tamborrada': 'https://www.youtube.com/embed/_22G9-d7fpk?autoplay=1',
    'retreta':    'https://www.youtube.com/embed/eoj5EGmWWGg?autoplay=1',
    'armentia':   'https://www.youtube.com/embed/NmOXDl6lC0A?autoplay=1',
    'perretxicos':'https://www.youtube.com/embed/jvPFmM93QFA?autoplay=1',
    'danzas':     'https://www.youtube.com/embed/_P_jMkdWFXg?autoplay=1',
    'deportes':   'https://www.youtube.com/embed/5NVFtEdajT0?autoplay=1',
    'estibaliz':  'https://www.youtube.com/embed/TPO491zLtbw?autoplay=1'
  };

  document.querySelectorAll('.gallery-item, .gal-item').forEach(function (item) {
    item.addEventListener('click', function () {
      var name     = item.querySelector('.gallery-name');
      var videoKey = item.dataset.video;
      var embedUrl = videoKey && videoMap[videoKey];
      if (imgWrap) {
        imgWrap.innerHTML = '';
        if (embedUrl) {
          var iframe = document.createElement('iframe');
          iframe.src = embedUrl;
          iframe.width = '100%';
          iframe.height = '360';
          iframe.frameBorder = '0';
          iframe.allowFullscreen = true;
          iframe.allow = 'autoplay; encrypted-media';
          imgWrap.appendChild(iframe);
        } else {
          var img = item.querySelector('.gallery-img');
          if (img) {
            var clone = document.createElement('img');
            clone.src = img.src;
            clone.alt = img.alt;
            imgWrap.appendChild(clone);
          }
        }
      }
      if (caption) caption.textContent = name ? name.textContent.trim() : (item.dataset.label || '');
      lb.classList.add('open');
    });
  });

  function close() {
    lb.classList.remove('open');
    if (imgWrap) imgWrap.innerHTML = '';
  }
  overlay  && overlay.addEventListener('click', close);
  closeBtn && closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();


/* ─── BÚSQUEDA + FILTROS ─────────────────────────── */
(function () {
  /* Datos de actividades */
  var activities = [
    {
      icon: '🥁', title: 'La Tamborrada',
      tag: 'Música · 50 aniversario',
      desc: 'Cocineros y socios de cuadrillas desfilan al son del txistu y el tambor por el Casco Medieval. 50 aniversario en 2026.',
      place: 'Casco Medieval', day: '27 Abr',
      cat: ['musica', '27']
    },
    {
      icon: '🎺', title: 'La Retreta',
      tag: 'Música · 100 aniversario',
      desc: 'Desde el balcón del Palacio de la Diputación Foral. Coro Joven de Álava y espectáculo piromusical ecosostenible.',
      place: 'Balcón de la Diputación', day: '27 Abr',
      cat: ['musica', '27']
    },
    {
      icon: '⛪', title: 'Romería a Armentia',
      tag: 'Espiritualidad · Tradición',
      desc: 'Miles de alaveses peregrinan a la Basílica románica del siglo XII. Zortziko de chistularis a las 9:00h.',
      place: 'Basílica de Armentia', day: '28 Abr',
      cat: ['religion', '28']
    },
    {
      icon: '🍄', title: 'Los Perretxikos',
      tag: 'Gastronomía · Primavera',
      desc: 'Concurso gastronómico con perretxikos y caracoles. Txosnas con txakoli frío y pintxos de temporada.',
      place: 'Campas de Armentia', day: '28 Abr',
      cat: ['gastronomia', '28']
    },
    {
      icon: '💃', title: 'Danzas Tradicionales',
      tag: 'Danza · Cultura vasca',
      desc: 'Aurresku, grupos folklóricos con trajes tradicionales vascos y Fanfarre Eguna. Concurso de cuadrillas.',
      place: 'Plaza de la Provincia', day: '28 Abr',
      cat: ['danza', '28']
    },
    {
      icon: '🏋️', title: 'Kirol Herrikoia',
      tag: 'Deporte rural vasco',
      desc: 'Aizkolaris, harrijasotzaileak y demás disciplinas del deporte rural vasco. Exhibiciones en ambiente festivo.',
      place: 'Campas de Armentia', day: '28 Abr',
      cat: ['deporte', '28']
    },
    {
      icon: '⛰️', title: 'Romería a Estíbaliz',
      tag: 'Espiritualidad · Cierre',
      desc: 'Peregrinación al cerro de Estíbaliz con su basílica románica. Talleres y animación musical en las campas.',
      place: 'Cerro de Estíbaliz', day: '1 May',
      cat: ['religion', '1']
    }
  ];

  var inputEl    = document.getElementById('searchInput');
  var clearBtn   = document.getElementById('searchClear');
  var resultsEl  = document.getElementById('searchResults');
  var countEl    = document.getElementById('resCount');
  var noResultEl = document.getElementById('noResults');
  var chipsEl    = document.getElementById('filterChips');
  if (!inputEl || !resultsEl) return;

  var chips        = chipsEl ? Array.prototype.slice.call(chipsEl.querySelectorAll('.chip')) : [];
  var activeFilters = ['all'];
  var query        = '';
  var timer        = null;

  /* ── Escapar regex ── */
  function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  /* ── Resaltar texto con <mark> ── */
  function hl(text, q) {
    if (!q) return text;
    return text.replace(new RegExp('(' + escapeRe(q) + ')', 'gi'), '<mark>$1</mark>');
  }

  /* ── ¿Pasa los filtros? ── */
  function passes(a) {
    if (activeFilters.indexOf('all') === -1) {
      var ok = false;
      for (var i = 0; i < activeFilters.length; i++) {
        if (a.cat.indexOf(activeFilters[i]) !== -1) { ok = true; break; }
      }
      if (!ok) return false;
    }
    if (query) {
      var haystack = [a.title, a.desc, a.tag, a.place, a.day].join(' ').toLowerCase();
      if (haystack.indexOf(query.toLowerCase()) === -1) return false;
    }
    return true;
  }

  /* ── Renderizar resultados ── */
  function render() {
    var filtered = activities.filter(passes);
    var q = query;

    countEl.textContent = 'Mostrando ' + filtered.length + ' de ' + activities.length + ' actividades';

    if (filtered.length === 0) {
      resultsEl.innerHTML = '';
      noResultEl.style.display = 'block';
      return;
    }
    noResultEl.style.display = 'none';

    resultsEl.innerHTML = filtered.map(function (a) {
      return '<div class="result-card">'
        + '<span class="result-card__icon">' + a.icon + '</span>'
        + '<span class="result-card__tag">'   + hl(a.tag,   q) + '</span>'
        + '<div class="result-card__title">'  + hl(a.title, q) + '</div>'
        + '<div class="result-card__desc">'   + hl(a.desc,  q) + '</div>'
        + '<div class="result-card__meta">'   + hl(a.day,   q) + ' · ' + hl(a.place, q) + '</div>'
        + '</div>';
    }).join('');
  }

  /* ── Input con debounce 280ms ── */
  inputEl.addEventListener('input', function () {
    query = inputEl.value.trim();
    clearBtn.classList.toggle('visible', query.length > 0);
    clearTimeout(timer);
    timer = setTimeout(render, 280);
  });

  /* ── Botón limpiar ── */
  clearBtn && clearBtn.addEventListener('click', function () {
    inputEl.value = '';
    query = '';
    clearBtn.classList.remove('visible');
    render();
    inputEl.focus();
  });

  /* ── Chips de filtro ── */
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.dataset.filter;

      if (f === 'all') {
        activeFilters = ['all'];
        chips.forEach(function (c) { c.classList.remove('active', 'chip--on'); });
        chip.classList.add('chip--on');
      } else {
        var allChip = chipsEl.querySelector('.chip[data-filter="all"]');
        if (allChip) allChip.classList.remove('chip--on');
        activeFilters = activeFilters.filter(function (x) { return x !== 'all'; });

        var idx = activeFilters.indexOf(f);
        if (idx !== -1) {
          activeFilters.splice(idx, 1);
          chip.classList.remove('active', 'chip--on');
        } else {
          activeFilters.push(f);
          chip.classList.add('active');
        }

        // Si no hay ningún filtro activo, volver a "todos"
        if (activeFilters.length === 0) {
          activeFilters = ['all'];
          if (allChip) allChip.classList.add('chip--on');
        }
      }
      render();
    });
  });

  // Render inicial
  render();
})();


/* ─── ANIMACIONES POR SCROLL ─────────────────────── */
(function () {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
      } else {
        entry.target.classList.remove('in');
      }
    });
  }, { threshold: 0.15 });

  /* Títulos de sección — alternan izquierda y derecha */
  document.querySelectorAll('h2, h3').forEach(function(el, i) {
    el.classList.add(i % 2 === 0 ? 'anim-left' : 'anim-right');
    observer.observe(el);
  });

  /* Tags de sección */
  document.querySelectorAll('.section-tag, .st, .p-tag').forEach(function(el) {
    el.classList.add('anim-up');
    observer.observe(el);
  });

  /* Tarjetas del programa */
  document.querySelectorAll('.day-card').forEach(function(el, i) {
    el.style.transitionDelay = (i * 0.08) + 's';
    observer.observe(el);
  });

  /* Tarjetas de tradición / result-card */
  document.querySelectorAll('.trad-card, .result-card').forEach(function(el, i) {
    el.classList.add('anim-scale');
    el.style.transitionDelay = (i * 0.07) + 's';
    observer.observe(el);
  });

  /* Timeline items */
  document.querySelectorAll('.tl-item').forEach(function(el, i) {
    el.classList.add('anim-left');
    el.style.transitionDelay = (i * 0.12) + 's';
    observer.observe(el);
  });

  /* Portrait / imagen del santo */
  document.querySelectorAll('.portrait__frame, .quien__portrait').forEach(function(el) {
    el.classList.add('anim-rotate');
    observer.observe(el);
  });

  /* Galería */
  document.querySelectorAll('.gallery-item, .gal-item').forEach(function(el, i) {
    el.style.transitionDelay = (i * 0.1) + 's';
    observer.observe(el);
  });

  /* Search box y filtros */
  document.querySelectorAll('.search-box, .filter-chips, .filters-section').forEach(function(el) {
    el.classList.add('anim-up');
    observer.observe(el);
  });
})();


/* ── Hero entrada/salida con scroll ── */
(function () {
  var hero = document.getElementById('hero');
  if (!hero) return;

  var heroObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        hero.classList.remove('out');
        void hero.offsetWidth;
        hero.classList.add('back');
        setTimeout(function() { hero.classList.remove('back'); }, 1200);
      } else {
        hero.classList.remove('back');
        hero.classList.add('out');
        setTimeout(function() { hero.classList.remove('out'); }, 700);
      }
    });
  }, { threshold: 0.15 });

  heroObserver.observe(hero);
})();


/* ── Hero animación scroll (hero--out / hero--back) ── */
(function () {
  var hero = document.querySelector('.hero') || document.getElementById('hero');
  if (!hero) return;
  var saliendo = false;

  new IntersectionObserver(function (entries) {
    var entry = entries[0];

    if (!entry.isIntersecting) {
      hero.classList.remove('hero--back');
      void hero.offsetWidth;
      hero.classList.add('hero--out');
      saliendo = true;
    } else if (saliendo) {
      hero.classList.remove('hero--out');
      void hero.offsetWidth;
      hero.classList.add('hero--back');
      saliendo = false;
    }
  }, { threshold: 0.1 }).observe(hero);
})();
