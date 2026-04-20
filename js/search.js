/* ── search.js — búsqueda con debounce, chips, filtros, render() ── */
(function () {
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
