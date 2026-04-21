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
    /* Actualizar posición de la burbuja durante la animación del carrusel */
    var rafId;
    function seguirCarrusel() {
      actualizarBurbuja();
      rafId = requestAnimationFrame(seguirCarrusel);
      setTimeout(function() { cancelAnimationFrame(rafId); }, 500);
    }
    seguirCarrusel();
  }

  function actualizarBurbuja() {
    var burbuja   = document.getElementById('noticiaBurbuja');
    var card27    = document.querySelector('.prog-day[data-day="27"]');
    var outer     = document.getElementById('progTrack').parentElement;
    var container = burbuja ? burbuja.parentElement : null;
    if (!burbuja || !card27 || !outer || !container) return;

    var outerRect     = outer.getBoundingClientRect();
    var rect27        = card27.getBoundingClientRect();
    var containerRect = container.getBoundingClientRect();

    /* Centro horizontal de la tarjeta 27 */
    var centroX = rect27.left + rect27.width / 2;

    /* La tarjeta es visible si su centro está dentro del contenedor del track */
    var esVisible = centroX >= outerRect.left + 20 && centroX <= outerRect.right - 20;

    if (esVisible) {
      /* Centrar la burbuja sobre la tarjeta 27 horizontalmente */
      var burbujaW     = 240;
      var leftRelativo = centroX - containerRect.left - burbujaW / 2;

      /* Mantenerla dentro de los límites del container */
      var maxLeft = containerRect.width - burbujaW - 8;
      leftRelativo = Math.max(8, Math.min(leftRelativo, maxLeft));

      /* Encima de la tarjeta con 12px de separación */
      var topRelativo = rect27.top - containerRect.top - burbuja.offsetHeight - 12;

      /* Si no hay espacio arriba, no mostrar */
      if (topRelativo < 0) {
        burbuja.classList.remove('visible');
        setTimeout(function() {
          if (!burbuja.classList.contains('visible')) burbuja.style.display = 'none';
        }, 350);
        return;
      }

      burbuja.style.left = leftRelativo + 'px';
      burbuja.style.top  = topRelativo + 'px';
      burbuja.style.display = 'block';
      requestAnimationFrame(function() {
        burbuja.classList.add('visible');
      });

    } else {
      /* La tarjeta 27 no está visible — ocultar la burbuja */
      burbuja.classList.remove('visible');
      setTimeout(function() {
        if (!burbuja.classList.contains('visible')) burbuja.style.display = 'none';
      }, 350);
    }
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

  window.addEventListener('resize', function () { buildDots(); go(current); actualizarBurbuja(); });
  buildDots();
  go(0);

})();
