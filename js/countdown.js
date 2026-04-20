/* ── countdown.js — función tick() y setInterval ── */
(function () {
  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    var diff = new Date('2026-04-24T00:00:00') - new Date();
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
