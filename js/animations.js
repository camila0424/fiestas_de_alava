/* ── animations.js — IntersectionObserver scroll + hero--out/hero--back ── */
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
