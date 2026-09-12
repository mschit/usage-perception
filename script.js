(function () {
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.getElementById('nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function setOpen(section, open) {
    if (!section) return;
    var btn = section.querySelector(':scope > .chapter-head > .toggle-btn');
    section.classList.toggle('is-open', open);
    if (btn) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Fold section ▴' : 'Unfold section ▾';
    }
  }

  document.querySelectorAll('.chapter, .subchapter').forEach(function (section) {
    var btn = section.querySelector(':scope > .chapter-head > .toggle-btn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var isOpen = section.classList.contains('is-open');
      setOpen(section, !isOpen);
    });
  });

  function expandFromHash(hash) {
    if (!hash) return;
    var target = document.querySelector(hash);
    if (!target || !(target.classList.contains('chapter') || target.classList.contains('subchapter'))) return;
    setOpen(target, true);
    if (target.classList.contains('subchapter')) {
      var parentChapter = target.closest('.chapter');
      setOpen(parentChapter, true);
    }
    setTimeout(function () {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 20);
  }

  document.querySelectorAll('a[data-nav]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var hash = link.getAttribute('href');
      if (hash && hash.startsWith('#')) {
        var target = document.querySelector(hash);
        if (target && (target.classList.contains('chapter') || target.classList.contains('subchapter'))) {
          e.preventDefault();
          expandFromHash(hash);
          history.pushState(null, '', hash);
        }
      }
    });
  });

  if (window.location.hash) {
    expandFromHash(window.location.hash);
  }
})();
