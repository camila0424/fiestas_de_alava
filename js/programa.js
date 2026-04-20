/* ── programa.js — carrusel del programa (#progTrack) ── */
(function () {
  var track    = document.getElementById('progTrack');
  var prevBtn  = document.getElementById('progPrev');
  var nextBtn  = document.getElementById('progNext');
  var dotsWrap = document.getElementById('progDots');
  if (!track) return;

  var cards   = Array.prototype.slice.call(track.querySelectorAll('.prog-day'));
  var total   = cards.length;
  var current = 0;
  var GAP     = 12;

  function outerWidth() { return track.parentElement ? track.parentElement.offsetWidth : 800; }

  /* Calcula el total real de píxeles del track sumando cada tarjeta */
  function trackWidth() {
    return cards.reduce(function (acc, c) { return acc + c.offsetWidth + GAP; }, -GAP);
  }

  /* Pasos necesarios para llegar al final: ceil((trackW - outerW) / paso) */
  function maxIdx() {
    var ow = outerWidth();
    var tw = trackWidth();
    if (tw <= ow) return 0;
    /* paso = ancho de la primera tarjeta + gap */
    var step = cards[0] ? cards[0].offsetWidth + GAP : 172;
    return Math.ceil((tw - ow) / step);
  }

  /* Posición X para el índice dado; en el último paso ajusta al borde derecho exacto */
  function posFor(idx) {
    var ow  = outerWidth();
    var tw  = trackWidth();
    var step = cards[0] ? cards[0].offsetWidth + GAP : 172;
    var raw  = idx * step;
    /* nunca sobrepasar el final del track */
    return Math.min(raw, Math.max(0, tw - ow));
  }

  function go(idx) {
    current = Math.max(0, Math.min(idx, maxIdx()));
    track.style.transform = 'translateX(-' + posFor(current) + 'px)';
    if (prevBtn) prevBtn.style.opacity = current === 0        ? '.35' : '1';
    if (nextBtn) nextBtn.style.opacity = current >= maxIdx() ? '.35' : '1';
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
        d.setAttribute('aria-label', 'Día ' + (i + 1));
        d.addEventListener('click', function () { go(i); });
        dotsWrap.appendChild(d);
      })(i);
    }
  }

  function updateDots() {
    if (!dotsWrap) return;
    dotsWrap.querySelectorAll('.carousel-dot').forEach(function (d, i) {
      d.classList.toggle('active', i === current);
    });
  }

  prevBtn && prevBtn.addEventListener('click', function () { go(current - 1); });
  nextBtn && nextBtn.addEventListener('click', function () { go(current + 1); });

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
