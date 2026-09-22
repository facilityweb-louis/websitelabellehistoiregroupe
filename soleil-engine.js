/* Moteur d'animation de la page Soleil.
 *
 * Le même fichier sert dans deux contextes :
 *   - la page autonome  : initSoleil(document, document.body)
 *   - l'élément Wix     : initSoleil(shadowRoot, hostElement)
 *
 * Toutes les positions sont calculées par rapport au conteneur, jamais par
 * rapport au haut du document. La page peut donc être posée au milieu d'une
 * autre page sans que le parallaxe ni la barre de progression se décalent.
 */
(function () {
  'use strict';

  function initSoleil(root, container) {
    if (!root) return;
    container = container || root.body || root.host;
    if (!container) return;

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var byId = function (id) {
      return root.getElementById ? root.getElementById(id) : root.querySelector('#' + id);
    };
    var all = function (sel) { return root.querySelectorAll(sel); };

    var heroBg     = byId('hero-bg');
    var nav        = byId('s-nav');
    var showcase   = byId('s-showcase');
    var showcaseBg = byId('showcase-bg');
    var progress   = byId('scroll-progress');
    var marquee    = root.querySelector('.marquee-track');
    var ticker     = root.querySelector('.ticker-inner');

    var REVEALABLE = '.reveal-block, .fade-in, .reveal-img, .prog-list';

    // Découpe un titre en lignes masquées, puis en lettres décalées dans le temps.
    function splitHeading(el) {
      var lines = [[]];
      [].slice.call(el.childNodes).forEach(function (n) {
        if (n.nodeType === 1 && n.tagName === 'BR') lines.push([]);
        else lines[lines.length - 1].push(n);
      });
      el.textContent = '';
      lines.forEach(function (nodes) {
        var line  = document.createElement('span');
        var inner = document.createElement('span');
        line.className = 'ln';
        inner.className = 'ln-in';
        nodes.forEach(function (n) { inner.appendChild(n); });
        line.appendChild(inner);
        el.appendChild(line);
      });

      var index = 0;
      var toChars = function (node) {
        [].slice.call(node.childNodes).forEach(function (child) {
          if (child.nodeType === 3) {
            var frag = document.createDocumentFragment();
            var text = child.textContent;
            for (var i = 0; i < text.length; i++) {
              var span = document.createElement('span');
              span.className = 'ch';
              span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
              span.style.transitionDelay = (index++ * 26) + 'ms';
              frag.appendChild(span);
            }
            child.replaceWith(frag);
          } else if (child.nodeType === 1) {
            toChars(child);
          }
        });
      };
      el.querySelectorAll('.ln-in').forEach(toChars);

      var block = el.closest('.reveal-block');
      if (block) block.classList.add('is-split');
    }

    // Navigation et menu sont câblés avant toute sortie anticipée : ils doivent
    // rester utilisables même quand les animations sont désactivées.

    // Les ancres internes ne fonctionnent pas dans un shadow DOM : on les gère.
    all('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = a.getAttribute('href');
        if (href === '#') return;
        var target = root.getElementById
          ? root.getElementById(href.slice(1))
          : root.querySelector(href);
        if (!target) return;
        e.preventDefault();
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY,
          behavior: reduce ? 'auto' : 'smooth'
        });
      });
    });

    // Sous 680px les liens sont repliés derrière un bouton : la barre est trop
    // étroite pour les porter.
    var burger = byId('nav-burger');
    if (burger && nav) {
      var setMenu = function (open) {
        nav.classList.toggle('menu-open', open);
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
        // Le document hôte, pas le conteneur : c'est lui qui défile.
        document.body.style.overflow = open ? 'hidden' : '';
      };

      burger.addEventListener('click', function () {
        setMenu(!nav.classList.contains('menu-open'));
      });

      // Un menu laissé ouvert masquerait la section qu'on vient d'atteindre.
      all('.nav-links a').forEach(function (a) {
        a.addEventListener('click', function () { setMenu(false); });
      });

      window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.key === 'Esc') setMenu(false);
      });

      // Au passage en écran large le panneau disparaît : sans cela le
      // défilement du document resterait bloqué.
      window.addEventListener('resize', function () {
        if (window.innerWidth > 680) setMenu(false);
      });
    }

    if (reduce) {
      all(REVEALABLE).forEach(function (el) { el.classList.add('revealed'); });
      return;
    }

    all('.showcase-quote, .manifeste-big, .programme-h2, .contact-h2').forEach(splitHeading);

    var pending = [].slice.call(all(REVEALABLE));
    function checkReveals() {
      if (!pending.length) return;
      var limit = window.innerHeight * 0.92;
      var shown = 0;
      pending = pending.filter(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top > limit) return true;
        (function (node, delay) {
          setTimeout(function () { node.classList.add('revealed'); }, delay);
        })(el, shown++ * 90);
        return false;
      });
    }

    // Les bandeaux défilants sont pilotés en JS pour réagir à la vitesse de scroll.
    var marqueeLoop = 0, tickerLoop = 0, marqueeX = 0, tickerX = 0;

    function measure() {
      if (marquee) marqueeLoop = marquee.scrollWidth / 3;
      if (ticker)  tickerLoop  = ticker.scrollWidth / 2;
      if (tickerX === 0) tickerX = -tickerLoop;
    }
    if (marquee) marquee.style.animation = 'none';
    if (ticker)  ticker.style.animation  = 'none';
    measure();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);

    var clamp = function (v, min, max) { return Math.max(min, Math.min(max, v)); };

    var lastY = window.scrollY, velocity = 0;

    function frame() {
      var y  = window.scrollY;
      var dy = y - lastY;
      lastY = y;
      velocity += (dy - velocity) * 0.18;
      if (Math.abs(velocity) < 0.01) velocity = 0;

      // Défilement local : 0 quand le haut de la page Soleil touche le haut de
      // l'écran. Mesuré à chaque image sur la position réelle du conteneur, et
      // non une fois pour toutes au démarrage : sur Wix la mise en page bouge
      // encore après l'insertion du bloc, et une origine figée trop tôt
      // décalait le parallaxe jusqu'à sortir la photo de son cadre.
      var cr    = container.getBoundingClientRect();
      var local = -cr.top;

      checkReveals();

      // Le décalage n'est calculé que sur la plage où le hero est effectivement
      // à l'écran. Au-delà il croîtrait sans fin et une valeur aberrante
      // suffirait à pousser la photo hors de son cadre : ici elle est bornée.
      if (heroBg) {
        var heroH = heroBg.offsetHeight;
        heroBg.style.transform = 'translate3d(0, ' +
          (clamp(local, -window.innerHeight, heroH) * 0.32).toFixed(2) + 'px, 0)';
      }

      if (showcase && showcaseBg) {
        var r = showcase.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) {
          var p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
          showcaseBg.style.transform = 'translate3d(0, ' + (p * 60) + 'px, 0)';
        }
      }

      // Les éléments fixes ne doivent vivre que tant que la page Soleil est à l'écran,
      // sinon ils flottent par-dessus le reste de la page hôte.
      var inView = cr.bottom > 80 && cr.top < window.innerHeight * 0.5;

      if (nav) {
        // La barre reste visible en permanence, en verre dépoli translucide.
        if (local > 80) {
          nav.style.background      = 'rgba(6,6,6,0.55)';
          nav.style.backdropFilter  = 'blur(18px) saturate(140%)';
          nav.style.webkitBackdropFilter = 'blur(18px) saturate(140%)';
          nav.style.borderColor     = 'rgba(245,240,235,0.08)';
        } else {
          nav.style.background      = 'transparent';
          nav.style.backdropFilter  = 'none';
          nav.style.webkitBackdropFilter = 'none';
          nav.style.borderColor     = 'transparent';
        }

        // Elle ne s'efface que lorsque le bloc Soleil quitte l'écran, ce qui
        // n'arrive que dans l'élément personnalisé, jamais dans l'iframe.
        if (!inView) nav.classList.add('nav-hidden');
        else         nav.classList.remove('nav-hidden');
      }

      if (progress) {
        var max = container.offsetHeight - window.innerHeight;
        progress.style.transform = 'scaleX(' + (max > 0 ? clamp(local / max, 0, 1) : 0) + ')';
        progress.style.opacity = inView ? '1' : '0';
      }

      var boost = clamp(velocity * 0.45, -34, 34);

      if (marqueeLoop) {
        marqueeX -= 1.15 + boost;
        if (marqueeX <= -marqueeLoop) marqueeX += marqueeLoop;
        if (marqueeX > 0)             marqueeX -= marqueeLoop;
        marquee.style.transform = 'translate3d(' + marqueeX.toFixed(2) + 'px, 0, 0)';
      }

      if (tickerLoop) {
        tickerX += 0.9 + boost * 0.8;
        if (tickerX >= 0)          tickerX -= tickerLoop;
        if (tickerX < -tickerLoop) tickerX += tickerLoop;
        ticker.style.transform =
          'translate3d(' + tickerX.toFixed(2) + 'px, 0, 0) skewX(' +
          clamp(-velocity * 0.09, -7, 7).toFixed(2) + 'deg)';
      }

      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  window.initSoleil = initSoleil;
})();
