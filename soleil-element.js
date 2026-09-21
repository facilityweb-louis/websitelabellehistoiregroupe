/* <soleil-page> — la page Soleil sous forme d'élément personnalisé Wix.
 *
 * Contrairement à une iframe, le contenu s'insère dans le DOM de la page hôte :
 * pleine largeur réelle, une seule barre de défilement, animations pilotées par
 * le scroll de la page, et contenu lisible par les moteurs de recherche.
 *
 * Le balisage et les styles sont lus à l'exécution depuis la page autonome, qui
 * reste donc la source unique de vérité : une modification de soleil.html se
 * répercute ici sans toucher à ce fichier.
 *
 * Déclaration dans Wix Studio :
 *   Ajouter → Intégrations → Élément personnalisé
 *   Nom de la balise : soleil-page
 *   Source du script : https://websitelabellehistoiregroupe.pages.dev/soleil-element.js
 */
(function () {
  'use strict';

  // window.SOLEIL_ORIGIN permet de pointer une autre instance (test local).
  var ORIGIN = typeof window.SOLEIL_ORIGIN === 'string'
    ? window.SOLEIL_ORIGIN
    : 'https://websitelabellehistoiregroupe.pages.dev';
  var ENGINE = ORIGIN + '/assets/soleil/soleil.js';

  // URL propre en production, repli sur le fichier pour tout hébergeur qui ne
  // réécrit pas les extensions.
  function fetchPage() {
    var opts = { credentials: 'omit' };
    return fetch(ORIGIN + '/soleil', opts).then(function (r) {
      if (r.ok) return r.text();
      return fetch(ORIGIN + '/soleil.html', opts).then(function (r2) {
        if (!r2.ok) throw new Error('HTTP ' + r2.status);
        return r2.text();
      });
    });
  }

  // Les liens relatifs de la page autonome pointent vers les pages du site Wix.
  var LINKS = {
    'index.html':           'https://www.labellehistoiregroupe.com/',
    'evenements.html':      'https://www.labellehistoiregroupe.com/evenements',
    'reserver.html':        'https://www.labellehistoiregroupe.com/reserver',
    'mentions-legales.html': 'https://www.labellehistoiregroupe.com/mentions-legales',
    'soleil.html':          '#'
  };

  var enginePromise = null;
  function loadEngine() {
    if (window.initSoleil) return Promise.resolve();
    if (enginePromise) return enginePromise;
    enginePromise = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = ENGINE;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
    return enginePromise;
  }

  // Les polices doivent être déclarées au niveau du document : une @font-face
  // définie dans un shadow root ne s'applique pas à son contenu.
  function loadFonts(doc) {
    doc.querySelectorAll('link[rel="stylesheet"], link[rel="preconnect"]').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || href.indexOf('fonts.g') === -1) return;
      if (document.head.querySelector('link[href="' + href + '"]')) return;
      var clone = document.createElement('link');
      clone.rel = link.getAttribute('rel');
      clone.href = href;
      if (link.hasAttribute('crossorigin')) clone.crossOrigin = '';
      document.head.appendChild(clone);
    });
  }

  // Un shadow root n'a ni <html> ni <body> : on redirige ces règles vers l'hôte.
  // Les url() relatives se résoudraient sinon contre la page Wix, pas contre
  // le domaine qui héberge les images.
  function adaptStyles(css) {
    css = css
      .replace(/:root\s*\{/g, ':host {')
      .replace(/^\s*html\s*\{[^}]*\}/m, '')
      .replace(/\bbody::before\b/g, '.soleil-root::before')
      .replace(/^\s*body\s*\{/m, '.soleil-root {');

    // Les URI de données contiennent elles-mêmes des url() (le filtre SVG du
    // grain) : on les met de côté avant de réécrire, sinon on les corrompt.
    var stash = [];
    css = css.replace(/url\((["'])(data:[\s\S]*?)\1\)/g, function (match) {
      stash.push(match);
      return '__DATA_URI_' + (stash.length - 1) + '__';
    });

    css = css.replace(
      /url\((['"]?)(?!https?:|\/\/|#)([^)'"]+)\1\)/g,
      'url($1' + ORIGIN + '/$2$1)'
    );

    return css.replace(/__DATA_URI_(\d+)__/g, function (m, i) { return stash[i]; });
  }

  function absolutise(root) {
    root.querySelectorAll('[src]').forEach(function (el) {
      var v = el.getAttribute('src');
      if (v && !/^(https?:|data:|\/\/)/.test(v)) el.setAttribute('src', ORIGIN + '/' + v.replace(/^\//, ''));
    });
    root.querySelectorAll('a[href]').forEach(function (a) {
      var v = a.getAttribute('href');
      if (!v) return;
      if (LINKS[v] !== undefined) { a.setAttribute('href', LINKS[v]); return; }
      if (/^(https?:|mailto:|tel:|#)/.test(v)) return;
      a.setAttribute('href', ORIGIN + '/' + v.replace(/^\//, ''));
    });
    // Les images de fond en CSS inline (hero, showcase) pointent aussi en relatif.
    root.querySelectorAll('[style*="url("]').forEach(function (el) {
      el.setAttribute('style', el.getAttribute('style').replace(
        /url\((['"]?)(?!https?:|data:|\/\/)([^)'"]+)\1\)/g,
        'url($1' + ORIGIN + '/$2$1)'
      ));
    });
  }

  var OVERRIDES = [
    ':host { display: block; position: relative; isolation: isolate;',
    '        background: #060606; color: #F5F0EB; overflow-x: hidden; }',
    /* Le grain est limité au bloc Soleil au lieu de couvrir toute la page hôte. */
    '.soleil-root::before { position: absolute; }',
    '.scroll-progress { transition: opacity .3s; }',
    /* Wix impose parfois des styles de texte hérités : on neutralise. */
    '.soleil-root, .soleil-root * { text-align: inherit; }'
  ].join('\n');

  class SoleilPage extends HTMLElement {
    connectedCallback() {
      if (this._ready) return;
      this._ready = true;

      var host = this;
      var shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = '<div class="soleil-root"></div>';

      Promise.all([fetchPage(), loadEngine()]).then(function (results) {
        var doc = new DOMParser().parseFromString(results[0], 'text/html');

        loadFonts(doc);

        var css = '';
        doc.querySelectorAll('style').forEach(function (s) { css += s.textContent; });

        var style = document.createElement('style');
        style.textContent = adaptStyles(css) + '\n' + OVERRIDES;
        shadow.insertBefore(style, shadow.firstChild);

        var mount = shadow.querySelector('.soleil-root');
        doc.body.querySelectorAll('script').forEach(function (s) { s.remove(); });
        mount.innerHTML = doc.body.innerHTML;
        absolutise(mount);

        window.initSoleil(shadow, host);
        host.dispatchEvent(new CustomEvent('soleil-ready'));
      }).catch(function (err) {
        console.error('[soleil-page]', err);
        shadow.querySelector('.soleil-root').innerHTML =
          '<p style="padding:40px;font-family:sans-serif;color:#F5F0EB;background:#060606">' +
          'La page Soleil n\'a pas pu être chargée.</p>';
      });
    }
  }

  if (!customElements.get('soleil-page')) {
    customElements.define('soleil-page', SoleilPage);
  }
})();
