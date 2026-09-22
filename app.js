/* =========================================================
   LA BELLE HISTOIRE GROUPE — Interactions & contenu
   =========================================================

   ┌─ MODIFIER LE CONTENU ─────────────────────────────────┐
   │ Tout le texte des établissements est dans VENUES ci-   │
   │ dessous. Pour modifier un nom, une description, des    │
   │ tags ou les infos : éditez la ligne correspondante.    │
   │                                                        │
   │ AJOUTER UNE PHOTO à un établissement :                 │
   │   1. déposez l'image dans  assets/venues/              │
   │   2. ajoutez la ligne :  image: "assets/venues/marcel.jpg"
   │   (sans photo, un joli dégradé coloré est utilisé)     │
   │                                                        │
   │ AJOUTER UNE VIDÉO DE FOND au hero :                    │
   │   déposez  assets/hero.mp4  — elle se lance toute seule│
   │   (voir le <video> dans index.html)                    │
   │                                                        │
   │ BRANCHER LES API (Mice Operations / Overfull) :        │
   │   voir le bloc API_CONFIG plus bas dans ce fichier.    │
   └────────────────────────────────────────────────────────┘ */

/* ---------- Mode embarqué : casse la boucle "vh" dans l'iframe Wix ----------
   Si le site tourne dans une iframe (Wix), on pose la classe .embedded sur <html>
   et on fige une hauteur de hero stable basée sur l'écran réel — jamais sur la
   hauteur de l'iframe (qui est elle-même pilotée par Velo, d'où la boucle). */
(function setupEmbedded() {
  const embedded = window.parent && window.parent !== window;
  if (!embedded) return;
  const root = document.documentElement;
  root.classList.add("embedded");
  const screenH = (window.screen && window.screen.height) ? window.screen.height : 800;
  const heroH = Math.max(540, Math.min(Math.round(screenH * 0.82), 900));
  root.style.setProperty("--hero-h", heroH + "px");
})();

const VENUES = [
  {
    id: "flavio", name: "Flavio", year: 1949, dest: "letouquet", destLabel: "Le Touquet",
    theme: "t-chocolat", type: "Gastronomique — Club de la Forêt",
    tags: ["Gastronomique", "Cave 100 réf.", "Traditionnel"],
    image: "assets/venues/flavio-w1200.jpg",
    desc: "L’institution historique du groupe. Une cuisine classique servie par une brigade complète, une cave de près de cent références et un sommelier pour vous accompagner. Le « Club de la Forêt » incarne l’art de recevoir à la française.",
    info: { "Cuisine": "Gastronomique traditionnelle", "Adresse": "Le Touquet-Paris-Plage", "Esprit": "Institution · brigade · cave" }
  },
  {
    id: "impasse", name: "L’Impasse", year: 1999, dest: "letouquet", destLabel: "Le Touquet",
    theme: "t-night", type: "Bar · Food · Music & Drinks",
    tags: ["Music", "Food", "Good Vibes"],
    image: "assets/venues/impasse-w1200.jpg",
    desc: "Le concept mixte du groupe : un bar à l’ambiance soirée où la cuisine, les cocktails et la musique se répondent. Un lieu pensé pour prolonger la nuit en excellente compagnie.",
    info: { "Concept": "Resto · Bar · Musique", "Adresse": "Le Touquet-Paris-Plage", "Ambiance": "Soirée" }
  },
  {
    id: "plage", name: "La Plage des Pirates", year: 2009, dest: "letouquet", destLabel: "Le Touquet",
    theme: "t-sable", type: "Restaurant-bar de plage",
    tags: ["Spritz o'clock", "DJ Set", "Beach Life"],
    image: "assets/venues/pirates-w1200.jpg",
    desc: "Sur la digue, du petit-déjeuner au dîner. Transats à louer, pieds dans le sable et DJs le week-end dès 18h. Le spot beach festif du Touquet, ouvert de mars à octobre.",
    info: { "Saison": "Mars → Octobre", "Horaires": "9h00 → 22h30", "Adresse": "Sur la digue, Le Touquet" }
  },
  {
    id: "marcel", name: "Le Marcel", year: 2016, dest: "letouquet", destLabel: "Le Touquet",
    theme: "t-chocolat", type: "Bar · Cocktails",
    tags: ["Bar", "Cocktails", "Karaoké"],
    image: "assets/venues/marcel-w1200.jpg",
    desc: "Un bar pur au positionnement cocktails affirmé. Cadre soigné, sélection pointue et atmosphère idéale pour l’apéritif comme pour les fins de soirée entre amis.",
    info: { "Type": "Bar à cocktails", "Adresse": "Le Touquet-Paris-Plage", "Ambiance": "Cocktails · apéritif" }
  },
  {
    id: "atelier", name: "L’Atelier Éphémère", year: 2017, dest: "letouquet", destLabel: "Le Touquet",
    theme: "t-vert", type: "Restaurant",
    tags: ["Restaurant", "Terrasse"],
    image: "assets/venues/atelier-w1200.jpg",
    desc: "Un restaurant au concept mouvant, qui se réinvente au fil des saisons et des envies. Une carte qui change, des collaborations, des éditions limitées : l’éphémère comme signature.",
    info: { "Concept": "Carte évolutive", "Adresse": "Le Touquet-Paris-Plage", "Esprit": "Éphémère · saisonnier" }
  },
  {
    id: "basenord", name: "La Base Nord", year: 2018, dest: "letouquet", destLabel: "Le Touquet",
    theme: "t-night", type: "Restaurant",
    tags: ["Vue mer", "Terre-Mer"],
    image: "assets/venues/basenord-w1200.jpg",
    desc: "Une table conviviale et généreuse au cœur du Touquet. Un cadre chaleureux pour partager de bons moments, midi et soir.",
    info: { "Type": "Restaurant", "Adresse": "Le Touquet-Paris-Plage", "Ambiance": "Convivial" }
  },
  {
    id: "caravane", name: "Caravane", year: 2022, dest: "letouquet", destLabel: "Le Touquet",
    theme: "t-vert", type: "Restaurant",
    tags: ["Restaurant", "Show", "Dj Set"],
    image: "assets/venues/caravane-w1200.jpg",
    desc: "La dernière génération des tables du groupe : une cuisine voyageuse, une ambiance vivante et une terrasse pour profiter des beaux jours touquettois.",
    info: { "Type": "Restaurant", "Adresse": "73 rue de Metz, 62520 Le Touquet", "Ambiance": "Vivante · terrasse" }
  },
  {
    id: "amour", name: "L’Amour", year: 2023, dest: "letouquet", destLabel: "Le Touquet",
    theme: "t-bordeaux", type: "Restaurant romantique", heart: true,
    tags: ["Romantique", "Dîner aux chandelles", "Nappe blanche"],
    image: "assets/venues/amour-w1200.jpg",
    desc: "L’adresse romantique du Touquet. Convivial le midi, intimiste le soir avec sa nappe blanche et ses dîners aux chandelles. Le lieu des grandes occasions et des déclarations.",
    info: { "Cuisine": "Romantique · soignée", "Adresse": "74 rue de Metz, Le Touquet", "Soir": "Dîner aux chandelles" }
  },
  {
    id: "nonna", name: "La Nonna", year: 2023, dest: "letouquet", destLabel: "Le Touquet",
    theme: "t-cuivre", type: "Trattoria · Pizzeria napolitaine",
    tags: ["Italien", "Pizza & Pasta", "Aperitivo"],
    image: "assets/venues/nonna-w1200.jpg",
    desc: "Une trattoria à l’italienne : pizza napolitaine signée le pizzaïolo Lucas, pasta maison et aperitivo. Au centre tennistique Pierre de Coubertin, rond-point des Sports.",
    info: { "Cuisine": "Italienne · napolitaine", "Horaires": "10h00 → 22h30", "Adresse": "Centre P. de Coubertin, rond-point des Sports" }
  },
  {
    id: "soleil", name: "Soleil", year: 2025, dest: "letouquet", destLabel: "Le Touquet",
    theme: "t-night", type: "Night-club",
    tags: ["Show", "DJ Set", "Night"],
    image: "assets/venues/soleil.jpg",
    comingSoon: true,
    desc: "Le nouveau club nocturne de La Belle Histoire Groupe au Touquet. Une adresse électrisante pour les nuits qui ne finissent pas.",
    info: { "Concept": "Night-club", "Adresse": "26 rue Saint-Jean, Le Touquet-Paris-Plage", "Ouverture": "Prochainement" }
  },
  {
    id: "tipi", name: "Tipi", year: 2024, dest: "meribel", destLabel: "Méribel",
    theme: "t-mountain", type: "Restaurant d’altitude · piste",
    tags: ["Altitude", "Bistronomie", "After-ski"],
    image: "assets/venues/tipi-w1200.jpg",
    desc: "Sur la Piste de l’Aigle à Méribel-Mottaret, au cœur des 3 Vallées. Le chef Fabien François (ex-Robuchon, Alléno) signe une bistronomie et des spécialités montagnardes. After-ski festif et soirées du jeudi jusqu’à 23h30.",
    info: { "Chef": "Fabien François", "Lieu": "Piste de l’Aigle, Méribel-Mottaret", "Jeudi": "Soirées jusqu’à 23h30" }
  }
];

/* ---------- Logos (fond transparent → affichés en blanc sur les cartes) ---------- */
// Mappe l'id de l'établissement vers son fichier logo dans assets/logos/
const LOGO_FILE = {
  flavio: "flavio", impasse: "impasse", plage: "pirates", marcel: "marcel",
  atelier: "atelier", basenord: "basenord", caravane: "caravane",
  amour: "amour", nonna: "nonna", tipi: "tipi", soleil: "soleil"
};
function logoSrc(v) { return `assets/logos/logo-${LOGO_FILE[v.id] || v.id}.png?v=2`; }

/* La photo d'un établissement est affichée à trois endroits : la carte, le
   diaporama de la destination Le Touquet et la fenêtre de détail. Il faut que
   les trois demandent exactement la même URL, sinon le navigateur y voit trois
   ressources distinctes et télécharge la photo trois fois. C'est ce qui se
   passait : le diaporama omettait le ?v=2, ce qui doublait à lui seul près de
   3 Mo au chargement. */
function photoSrc(v) { return encodeURI(v.image) + "?v=2"; }

/* ---------- Liens vers les pages Wix des établissements ----------
   Le site tourne dans une iframe github.io : un chemin relatif (/flavio) pointerait
   vers github.io. On résout donc contre le domaine Wix parent.
   WIX_BASE : renseignez le domaine exact (ex: "https://www.labellehistoire.fr").
   Si laissé vide, on le déduit automatiquement de document.referrer. */
const WIX_BASE = "https://www.labellehistoiregroupe.com";
const VENUE_URL = {
  flavio: "/flavio", impasse: "/limpasse", plage: "/plagedespirates",
  marcel: "/lemarcel", atelier: "/latelierephemere", basenord: "/labasenord",
  caravane: "/caravane", amour: "/lamour", nonna: "/la-nonna",
  soleil: "/soleil",
  tipi: "https://www.tipi-meribel.com"
};
function venueHref(v) {
  const path = VENUE_URL[v.id] || "#";
  if (/^https?:/.test(path)) return path;
  let base = WIX_BASE;
  if (!base) { try { base = new URL(document.referrer).origin; } catch (e) {} }
  return base ? base.replace(/\/$/, "") + path : path;
}

/* ---------- Render venue cards ---------- */
/* Nombre de cartes dont la photo est demandée tout de suite. Au-delà, on
   diffère : la grille compte onze maisons, mais selon la largeur d'écran une
   seule (mobile), deux ou trois sont visibles sans faire défiler. Charger les
   onze avant le premier affichage retardait la page de plusieurs mégaoctets.
   Quatre couvre la première rangée des trois dispositions.

   C'est aussi la raison pour laquelle ces quatre-là restent en chargement
   immédiat : un differé sur une carte déjà à l'écran la laisse sur son dégradé
   de repli le temps que la photo arrive, ce qui donne l'impression d'une carte
   éteinte. */
const EAGER_CARDS = 4;

function venueCard(v, i) {
  const lazy = i >= EAGER_CARDS ? ' loading="lazy" decoding="async"' : "";
  const media = v.image ? `<img class="card-media-img" src="${photoSrc(v)}"${lazy} alt=""/>` : "";
  const url = venueHref(v);
  const resaHref = `reserver.html?venue=${v.id}`;

  // Carte "Ouverture prochaine"
  if (v.comingSoon) {
    // Une maison pas encore ouverte peut déjà avoir sa page : on propose alors
    // de la découvrir plutôt que d'afficher une mention inerte.
    const soonAction = VENUE_URL[v.id]
      ? `<a class="mini line" href="${url}" target="_blank" rel="noopener">Découvrir</a>`
      : `<span class="mini line" style="opacity:.5;pointer-events:none;cursor:default">Ouverture prochaine</span>`;
    return `
    <article class="card ${v.theme} card-coming-soon" data-dest="${v.dest}" data-id="${v.id}" aria-label="${v.name}">
      ${media}
      <span class="c-soon-badge">Bientôt</span>
      <span class="c-dest">${v.destLabel}</span>
      <img class="card-logo" src="${logoSrc(v)}" alt="${v.name}" loading="lazy" />
      <div class="c-bottom">
        <p class="c-type">${v.type}</p>
        <div class="c-tags">${v.tags.map(t => `<span>${t}</span>`).join("")}</div>
        <div class="c-actions">
          ${soonAction}
        </div>
      </div>
    </article>`;
  }

  return `
  <a class="card ${v.theme}" href="${url}" target="_blank" rel="noopener" data-dest="${v.dest}" data-id="${v.id}" aria-label="${v.name}">
    ${media}
    <span class="c-year">Depuis ${v.year}</span>
    <span class="c-dest">${v.destLabel}</span>
    <img class="card-logo" src="${logoSrc(v)}" alt="${v.name}" loading="lazy" />
    <div class="c-bottom">
      <p class="c-type">${v.type}</p>
      <div class="c-tags">${v.tags.map(t => `<span>${t}</span>`).join("")}</div>
      <div class="c-actions">
        <span class="mini line">Découvrir</span>
        <button class="mini solid" type="button"
          onclick="event.preventDefault(); event.stopPropagation(); window.location.href='${resaHref}'">Réserver</button>
      </div>
    </div>
  </a>`;
}

function renderVenues(filter = "all") {
  const grid = document.getElementById("venue-grid");
  if (!grid) return;
  const list = filter === "all" ? VENUES : VENUES.filter(v => v.dest === filter);
  grid.innerHTML = list.map(venueCard).join("") + `
    <article class="card discover">
      <div>
        <span class="label" style="color:var(--cuivre-2)">10 + 1 Maisons</span>
        <h3 class="serif" style="margin-top:14px">Découvrir<br>toutes nos maisons</h3>
        <a href="#etablissements" class="btn btn-ghost btn-arrow" style="margin-top:22px"><span>Voir toutes</span></a>
      </div>
    </article>`;
  observeReveal();
}

/* ---------- Carte interactive (vraie carte Leaflet + encart Tipi / Méribel) ----------
   Coordonnées GPS réelles de chaque maison (relevées sur OpenStreetMap).
   Pour déplacer un repère : changez simplement [latitude, longitude]. */
const MAP_LATLNG = {
  basenord: [50.53609, 1.59440],  // 1 av. Jean Ruet — Base Nautique Nord
  atelier:  [50.52475, 1.58264],  // 1 rue Saint-Jean
  impasse:  [50.52322, 1.58490],  // 77 rue de Metz
  amour:    [50.52326, 1.58474],  // 74 rue de Metz
  caravane: [50.52334, 1.58500],  // 73 rue de Metz, 62520 Le Touquet
  marcel:   [50.52256, 1.59037],  // av. des Phares
  flavio:   [50.52169, 1.59229],  // 1 av. du Verger — Club de la Forêt
  plage:    [50.52039, 1.57974],  // Bd de la Plage — la digue
  nonna:    [50.51857, 1.59501],  // rond-point des Sports — P. de Coubertin
  soleil:   [50.52418, 1.58397],  // 26 rue Saint-Jean
  tipi:     [45.37379, 6.58096]   // Piste de l'Aigle — Méribel-Mottaret, 73550
};

let _lbhMap = null;
let _lbhMarkers = null;

function renderMap() {
  const stage  = document.getElementById("map-stage");
  const legend = document.getElementById("map-legend");
  const inset  = document.getElementById("map-inset");
  if (!stage || !legend) return;

  // Tous les établissements avec coordonnées GPS
  const allVenues = VENUES.filter(v => MAP_LATLNG[v.id]);

  // structure : conteneur de la vraie carte + fiche détail superposée
  stage.innerHTML =
    '<div class="map-canvas" id="map-canvas"></div>' +
    '<div class="map-detail" id="map-detail" hidden></div>';

  // Légende : Le Touquet d'abord, puis Méribel avec séparateur
  const touquet = allVenues.filter(v => v.dest === "letouquet");
  const meribel = allVenues.filter(v => v.dest === "meribel");
  legend.innerHTML =
    touquet.map((v, i) =>
      `<li><button class="leg-item" type="button" data-id="${v.id}">` +
        `<span class="leg-n">${String(i + 1).padStart(2, "0")}</span>` +
        `<span class="leg-txt"><strong>${v.name}</strong><em>${v.type}</em></span>` +
      `</button></li>`
    ).join("") +
    (meribel.length ? `<li class="leg-sep"><span>Méribel · Les 3 Vallées</span></li>` : "") +
    meribel.map((v, i) =>
      `<li><button class="leg-item" type="button" data-id="${v.id}">` +
        `<span class="leg-n">${String(touquet.length + i + 1).padStart(2, "0")}</span>` +
        `<span class="leg-txt"><strong>${v.name}</strong><em>${v.type}</em></span>` +
      `</button></li>`
    ).join("");

  // Masquer l'encart Tipi séparé (plus nécessaire)
  if (inset) inset.style.display = "none";

  // fiche détail (réutilisée par les repères et la légende)
  function activate(id, pan) {
    const v = VENUES.find(x => x.id === id);
    if (!v) return;
    const i = allVenues.findIndex(x => x.id === id);
    if (_lbhMarkers) Object.entries(_lbhMarkers).forEach(([mid, m]) => {
      const el = m.getElement();
      if (el) el.classList.toggle("active", mid === id);
    });
    legend.querySelectorAll(".leg-item").forEach(l => l.classList.toggle("active", l.dataset.id === id));
    const detail = document.getElementById("map-detail");
    const url = venueHref(v);
    const ext = /^https?:/.test(url) ? ' target="_blank" rel="noopener"' : "";
    detail.innerHTML =
      `<img class="md-logo" src="${logoSrc(v)}" alt="${v.name}" />` +
      '<div class="md-body">' +
        `<span class="md-num">${String(i + 1).padStart(2, "0")} — ${v.destLabel}</span>` +
        `<h3>${v.name}</h3><p>${v.type}</p>` +
        '<div class="md-actions">' +
          `<a class="mini line" href="${url}"${ext}>Découvrir</a>` +
          `<a class="mini solid" href="reserver.html?venue=${v.id}">Réserver</a>` +
        '</div>' +
      '</div>';
    detail.hidden = false;
    if (pan && _lbhMap && _lbhMarkers[id]) {
      // zoom adapté : Le Touquet → 16, Méribel → 14
      const zoom = v.dest === "meribel" ? 14 : 16;
      _lbhMap.setView(_lbhMarkers[id].getLatLng(), zoom, { animate: true });
    }
  }

  // Leaflet absent (hors-ligne) : on garde la légende, sans plantage
  if (typeof L === "undefined") {
    const c = document.getElementById("map-canvas");
    if (c) c.style.display = "none";
    legend.addEventListener("click", e => { const it = e.target.closest(".leg-item"); if (it) activate(it.dataset.id); });
    return;
  }

  // --- vraie carte (zoom / déplacement) ---
  const map = L.map("map-canvas", {
    scrollWheelZoom: false,
    zoomControl: true
  });
  _lbhMap = map;
  map.on("focus", () => map.scrollWheelZoom.enable());
  map.on("blur",  () => map.scrollWheelZoom.disable());

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  const markers = {};
  _lbhMarkers = markers;
  const pts = [];
  allVenues.forEach(v => {
    const ll = MAP_LATLNG[v.id];
    if (!ll) return;
    pts.push(ll);
    const logo = logoSrc(v);
    const icon = L.divIcon({
      className: "lbh-pin",
      html:
        `<span class="pin-bubble"><span class="pin-logo" style="-webkit-mask-image:url('${encodeURI(logo)}');mask-image:url('${encodeURI(logo)}')"></span></span>` +
        `<span class="pin-label">${v.name}</span>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });
    const m = L.marker(ll, { icon, title: v.name, riseOnHover: true }).addTo(map);
    m.on("click", () => activate(v.id));
    markers[v.id] = m;
  });

  // fitBounds sur tous les points — montre toute la France avec les 2 destinations
  if (pts.length) map.fitBounds(pts, { padding: [48, 48], maxZoom: 7 });

  // clic sur la légende = ouvre la fiche + zoome sur l'adresse
  legend.addEventListener("click", e => { const it = e.target.closest(".leg-item"); if (it) activate(it.dataset.id, true); });

  // pas de fiche par défaut : la carte reste visible tant qu'on n'a pas cliqué

  // Recalcul de taille fiable : le conteneur grandit après chargement (polices,
  // animation reveal, images) — sans ça, les tuiles du bas ne se chargent pas.
  const fix = () => map.invalidateSize();
  [120, 350, 700, 1400].forEach(t => setTimeout(fix, t));
  window.addEventListener("resize", fix);
  if (window.ResizeObserver) new ResizeObserver(fix).observe(stage);
}

/* ---------- Card nav — plus nécessaire, la carte est un <a> natif ---------- */
function initCardNav() {}

/* ---------- Filter chips ---------- */
function initFilter() {
  const bar = document.getElementById("filter-bar");
  if (!bar) return;
  bar.addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    bar.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    renderVenues(chip.dataset.filter);
  });
}

/* ---------- Modal fiche ---------- */
function openVenue(id) {
  const v = VENUES.find(x => x.id === id);
  if (!v) return;
  const overlay = document.getElementById("modal");
  overlay.querySelector(".modal").className = "modal " + v.theme;
  const visual = overlay.querySelector(".modal-visual");
  visual.style.setProperty("--card-grad", v.image ? `url('${photoSrc(v)}') center/cover no-repeat` : "");
  overlay.querySelector(".modal-logo").src = logoSrc(v);
  overlay.querySelector(".modal-visual .mono").textContent = v.name;
  overlay.querySelector("#m-year").textContent = "Depuis " + v.year + " · " + v.destLabel;
  overlay.querySelector("#m-name").innerHTML = v.name + (v.heart ? " ♡" : "");
  overlay.querySelector("#m-type").textContent = v.type;
  overlay.querySelector("#m-tags").innerHTML = v.tags.map(t => `<span>${t}</span>`).join("");
  overlay.querySelector("#m-desc").textContent = v.desc;
  overlay.querySelector("#m-info").innerHTML = Object.entries(v.info)
    .map(([k, val]) => `<div><span class="k">${k}</span><span>${val}</span></div>`).join("");
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeVenue() {
  document.getElementById("modal").classList.remove("open");
  document.body.style.overflow = "";
}

/* ---------- Header scroll state ---------- */
function initHeader() {
  const h = document.querySelector(".site-header");
  if (!h) return;
  const onScroll = () => h.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ---------- Ancres internes (Le Groupe, Nos Établissements, Contact…) ----------
   Dans la page Wix, le cadre est redimensionné à la hauteur de son contenu
   (voir initAutoResize) : il n'a donc aucun défilement propre, c'est la page
   parente qui défile. Un lien "#groupe" demandait au cadre de se déplacer,
   alors qu'il n'avait nulle part où aller : le clic ne produisait rien.

   scrollIntoView, lui, remonte la chaîne de défilement jusqu'aux cadres
   parents, y compris en origines différentes. Aucun code n'est donc à ajouter
   côté Wix. Mesuré : navigation par ancre, le parent reste à 0 ; avec
   scrollIntoView, il se déplace bien jusqu'à la section. */

/* Hauteur réservée à l'en-tête du site Wix, qui reste collé en haut et
   recouvrirait sinon le titre de la section visée. */
const ANCHOR_HEADER = 96;

function initAnchors() {
  document.addEventListener("click", e => {
    const a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute("href");
    if (!href || href === "#") return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;

    e.preventDefault();

    /* Viser le haut de la section ferait arriver sur ses 70 à 150 px de marge
       intérieure : un écran de vide avant le premier mot. On vise donc son
       premier bloc de contenu (le chapeau de section, ou à défaut le
       conteneur), et on remonte la différence par une marge de défilement
       négative. scroll-margin-top est bien pris en compte lorsque le
       défilement se propage au cadre parent : mesuré, la section arrive à
       l'offset demandé et non à 0. */
    const go = () => {
      const head = target.querySelector(":scope > .container > .section-head")
                || target.querySelector(":scope > .container");
      const gap = head
        ? head.getBoundingClientRect().top - target.getBoundingClientRect().top
        : 0;
      target.style.scrollMarginTop = Math.round(ANCHOR_HEADER - gap) + "px";
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    // Le menu mobile fige le corps de page et restitue la position en se
    // fermant : viser la cible avant ce retour la ferait annuler.
    if (document.querySelector(".nav-links.left.open")) setTimeout(go, 180);
    else go();
  });
}

/* ---------- Mobile menu ---------- */
function initBurger() {
  const burger = document.querySelector(".burger");
  const menu   = document.querySelector(".nav-links.left");
  if (!burger || !menu) return;

  let _scrollY = 0, _locked = false;
  const lockScroll = () => {
    _scrollY = window.scrollY;
    _locked = true;
    document.body.style.position   = "fixed";
    document.body.style.top        = `-${_scrollY}px`;
    document.body.style.left       = "0";
    document.body.style.right      = "0";
    document.body.style.overflow   = "hidden";
  };
  const unlockScroll = () => {
    // Ne restituer la position que si on l'avait réellement figée : sinon
    // l'appel renvoie la page en haut alors que rien ne le demandait.
    if (!_locked) return;
    _locked = false;
    document.body.style.position = "";
    document.body.style.top      = "";
    document.body.style.left     = "";
    document.body.style.right    = "";
    document.body.style.overflow = "";
    window.scrollTo(0, _scrollY); // restitue la position
  };

  const open  = () => {
    menu.classList.add("open");
    burger.classList.add("open");
    burger.setAttribute("aria-expanded", "true");
    lockScroll();
    document.addEventListener("keydown", onKey);
  };
  const close = () => {
    menu.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    unlockScroll();
    document.removeEventListener("keydown", onKey);
  };
  const toggle = () => menu.classList.contains("open") ? close() : open();
  const onKey  = e => { if (e.key === "Escape") close(); };

  burger.addEventListener("click", toggle);
  // Ferme au clic sur un lien — sans preventDefault pour laisser la navigation
  // se faire. Uniquement si le menu est ouvert : au-delà de 1024px il ne l'est
  // jamais, et fermer à vide renvoyait la page en haut 80 ms après le clic,
  // en plein défilement vers l'ancre. C'est ce qui empêchait « Le Groupe » et
  // « Nos Établissements » de descendre, alors que « Destinations » et
  // « Contact », qui sont dans la barre de droite, n'étaient pas concernés.
  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      if (menu.classList.contains("open")) setTimeout(close, 80);
    });
  });
  // Ferme au clic sur l'overlay
  menu.addEventListener("click", e => { if (e.target === menu) close(); });
}

/* ---------- Compteurs animés ---------- */
function initCounters() {
  const nums = document.querySelectorAll(".stat .num");
  if (!nums.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      const el = e.target;
      // Extraire la partie numérique (ignorer <sup>)
      const raw = el.childNodes[0].textContent.trim();
      const target = parseInt(raw, 10);
      if (isNaN(target)) return;
      const suffix = el.querySelector("sup") ? el.querySelector("sup").textContent : "";
      const duration = 1400;
      const start = performance.now();
      function step(now) {
        const p = Math.min((now - start) / duration, 1);
        // Ease out cubic
        const ease = 1 - Math.pow(1 - p, 3);
        const val = Math.round(ease * target);
        el.childNodes[0].textContent = val;
        if (el.querySelector("sup")) el.querySelector("sup").textContent = suffix;
        if (p < 1) requestAnimationFrame(step);
        else { el.childNodes[0].textContent = target; if (el.querySelector("sup")) el.querySelector("sup").textContent = suffix; }
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.4 });
  nums.forEach(n => obs.observe(n));
}

/* ---------- Illustrations : apparition au scroll ---------- */
function initIllus() {
  const targets = document.querySelectorAll(".illus-gorille, .illus-vinyle, .illus-cocktails");
  if (!targets.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  targets.forEach(t => obs.observe(t));
}

/* ---------- Reveal on scroll ---------- */
let revealObserver;
function observeReveal() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); revealObserver.unobserve(e.target); } });
    }, { threshold: 0.12 });
  }
  document.querySelectorAll(".reveal:not(.in)").forEach(el => revealObserver.observe(el));
}

/* =========================================================
   API_CONFIG — Branchement Mice Operations & Overfull
   =========================================================
   Renseignez vos URL/clés ici. Tant que `enabled` est false,
   le site utilise les données de démonstration (statiques).
   Passez `enabled` à true une fois vos endpoints prêts.        */
const API_CONFIG = {
  miceOperations: {
    enabled: false,
    eventsUrl: "https://api.mice-operations.com/v1/events",   // GET → liste d'événements
    quoteUrl:  "https://api.mice-operations.com/v1/quotes",   // POST → demande de devis
    apiKey:    "VOTRE_CLE_MICE"
  },
  overfull: {
    enabled: false,
    availabilityUrl: "https://api.overfull.com/v1/availability", // GET → créneaux dispo
    bookingUrl:      "https://api.overfull.com/v1/bookings",     // POST → réservation
    apiKey:          "VOTRE_CLE_OVERFULL"
  }
};

/* --- Événements homepage — affiche les 4 prochains events depuis evenements.json --- */
async function loadHomeEvents() {
  const target = document.getElementById("event-list-home");
  if (!target) return;
  try {
    const res = await fetch("evenements.json?v=" + Date.now());
    const data = await res.json();
    const now = new Date(); now.setHours(0,0,0,0);
    const events = (data.events || [])
      .filter(e => !e.date || new Date(e.date) >= now)
      .slice(0, 4);
    if (!events.length) {
      document.getElementById("event-home-empty").style.display = "";
      return;
    }
    target.innerHTML = events.map(e => {
      const d = e.date ? new Date(e.date) : null;
      const jour = d ? d.getDate() : "";
      const mois = d ? MOIS_FR[d.getMonth()] : "";
      const heure = e.heure ? ` · ${e.heure}` : "";
      return `<div class="event-row">
        <div class="event-date"><div class="d">${jour}</div><div class="m">${mois}</div></div>
        <div class="event-info">
          <p class="event-venue">${e.venue}${heure}</p>
          <h4>${e.artiste || "Événement"}</h4>
        </div>
        <a class="event-cta" href="evenements.html">Voir →</a>
      </div>`;
    }).join("");
  } catch(err) {
    document.getElementById("event-home-empty") && (document.getElementById("event-home-empty").style.display = "");
  }
}

/* --- Événements DJs/Artistes — lit evenements.json (mis à jour chaque matin par agent IA) --- */
const MOIS_FR = ["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"];

async function loadEvents() {
  const target = document.getElementById("event-list-live");
  if (!target) return;
  try {
    const res = await fetch("evenements.json?v=" + Date.now());
    const data = await res.json();
    const events = (data.events || []).filter(e => {
      // N'afficher que les événements de la semaine en cours et à venir
      if (!e.date) return true;
      const d = new Date(e.date);
      const now = new Date(); now.setHours(0,0,0,0);
      return d >= now;
    });

    if (!events.length) {
      document.getElementById("event-empty").style.display = "";
    } else {
      const rows = events.map(e => {
        const d = e.date ? new Date(e.date) : null;
        const jour = d ? d.getDate() : "";
        const mois = d ? MOIS_FR[d.getMonth()] : "";
        const instagramMap = {
          "L'Impasse":           "https://www.instagram.com/limpasse_letouquet/",
          "La Plage des Pirates":"https://www.instagram.com/laplagedespirates/",
          "Caravane":            "https://www.instagram.com/restaurantcaravane/",
          "La Base Nord":        "https://www.instagram.com/la.base.nord/",
          "L'Atelier Éphémère":  "https://www.instagram.com/latelierephemereletouquet/",
          "La Nonna":            "https://www.instagram.com/lanonna_letouquet/",
          "L'Amour":             "https://www.instagram.com/lamour_letouquet/",
          "Flavio":              "https://www.instagram.com/flavio_clubdelaforet/",
          "Le Marcel":           "https://www.instagram.com/lemarcel_letouquet/",
          "Tipi Méribel":        "https://www.instagram.com/tipimeribel/"
        };
        const lien = e.url || instagramMap[e.venue] || "#";
        const heure = e.heure ? ` · ${e.heure}` : "";
        return `<div class="event-row">
          <div class="event-date"><div class="d">${jour}</div><div class="m">${mois}</div></div>
          <div class="event-info">
            <p class="event-venue">${e.venue}${heure}</p>
            <h4>${e.artiste || e.titre || "Événement"}</h4>
          </div>
          <a class="event-cta" href="${lien}" target="_blank" rel="noopener">Voir →</a>
        </div>`;
      }).join("");
      target.innerHTML = rows;
    }

    // Afficher la date de dernière mise à jour
    const upd = document.getElementById("event-updated");
    if (upd && data.updated) {
      const d = new Date(data.updated);
      upd.textContent = `Mis à jour le ${d.toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long"})}`;
    }
  } catch (err) {
    console.warn("evenements.json indisponible.", err);
    document.getElementById("event-empty") && (document.getElementById("event-empty").style.display = "");
  }
}

/* --- Réservation via Overfull (appelée par le formulaire de reserver.html) --- */
async function submitBooking(payload) {
  if (!API_CONFIG.overfull.enabled) {
    return { ok: true, demo: true }; // mode démo : confirmation simulée
  }
  const res = await fetch(API_CONFIG.overfull.bookingUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + API_CONFIG.overfull.apiKey },
    body: JSON.stringify(payload)
  });
  return res.json();
}

/* --- Soumission du formulaire de réservation (reserver.html) --- */
async function handleBooking(form) {
  const get = sel => { const el = form.querySelector(sel); return el ? el.value : ""; };
  const payload = { venue: get("#r-venue"), date: get("#r-date"), time: get("#r-time") };
  const btn = form.querySelector("button[type=submit]");
  if (btn) btn.disabled = true;
  try {
    const r = await submitBooking(payload);
    if (r && (r.ok || r.confirmed || r.demo)) {
      const ok = document.getElementById("resa-ok");
      if (ok) ok.style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else { alert("La réservation n'a pas pu être confirmée. Réessayez."); }
  } catch (e) { alert("Service de réservation indisponible pour le moment."); }
  finally { if (btn) btn.disabled = false; }
}

function initBackTop() {
  const btn = document.getElementById("back-top");
  if (!btn) return;
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.documentElement.scrollTop = 0;
    try { window.parent.postMessage({ type: "scrollToTop" }, "*"); } catch(e) {}
  });
}

/* État du pont de redimensionnement avec la page hôte.
   "unknown" tant qu'on n'a pas tranché, "alive" si l'hôte suit la hauteur du
   contenu, "dead" s'il garde un cadre de hauteur fixe. Voir checkBridge. */
window.__lbhBridge = "unknown";

function initAutoResize() {
  if (!window.parent || window.parent === window || typeof window.parent.postMessage !== 'function') return;
  let last = 0, scheduled = false;
  // Mesure la vraie hauteur du contenu même si overflow:hidden est actif
  const measure = () => {
    let h = 0;
    Array.from(document.body.children).forEach(el => {
      const bottom = el.offsetTop + el.offsetHeight;
      if (bottom > h) h = bottom;
    });
    return Math.ceil(h) || Math.ceil(document.body.offsetHeight);
  };
  const post = () => {
    scheduled = false;
    const h = measure();
    if (h && Math.abs(h - last) > 1) {                 // anti-jitter : on n'émet que si ça change vraiment
      last = h;
      window.parent.postMessage({ type: 'lbh-resize', lbhHeight: h }, '*');
    }
  };
  const sendHeight = () => {                            // anti-rebond : 1 envoi max par frame
    if (!scheduled) { scheduled = true; requestAnimationFrame(post); }
  };
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(sendHeight).observe(document.body);
  new MutationObserver(sendHeight).observe(document.body, { childList: true, subtree: true, attributes: true, characterData: true });
  window.addEventListener('resize', sendHeight);
  window.addEventListener('orientationchange', () => setTimeout(sendHeight, 250)); // mobile : rotation
  window.addEventListener('load', sendHeight);
  // recale plusieurs fois après chargement : sur mobile les images/polices arrivent tard
  window.addEventListener('load', () => { [150, 400, 900, 1800].forEach(t => setTimeout(sendHeight, t)); });
  // chaque image qui finit de charger peut changer la hauteur (surtout sur mobile lent)
  document.querySelectorAll('img').forEach(img => {
    if (!img.complete) img.addEventListener('load', sendHeight, { once: true });
  });
  sendHeight();

  /* ---- Filet de sécurité : et si personne n'écoute ? ----

     Tout le comportement de la page dans Wix repose sur un accord : on envoie
     notre hauteur, l'hôte redimensionne le cadre, et comme le cadre fait alors
     la taille du contenu il n'a aucun défilement propre — d'où le relais de la
     molette vers le parent et le recours à scrollIntoView pour les ancres.

     Si l'hôte cesse de tenir sa part (code supprimé de l'éditeur Wix, section
     remise à une hauteur fixe), le cadre reste court, le contenu déborde, et la
     molette part au parent au lieu de faire défiler le cadre : tout ce qui est
     sous la pliure devient inatteignable. Le pied de page, tout en bas, est le
     premier à disparaître.

     On ne peut pas interroger le parent, il est sur un autre domaine. Mais
     notre propre fenêtre suffit : dans un cadre correctement redimensionné,
     innerHeight vaut la hauteur du contenu. S'il reste beaucoup plus court, le
     pont est rompu et on rend son défilement au cadre. */
  const checkBridge = () => {
    const h = measure();
    if (!h) return;
    // Marge large : arrondis, bordures de l'hôte, barres d'outils mobiles.
    const alive = window.innerHeight >= h - 300;
    window.__lbhBridge = alive ? "alive" : "dead";
    document.documentElement.classList.toggle("frame-unresized", !alive);
  };
  // Après chargement, le temps que les images tardives aient fixé la hauteur.
  window.addEventListener('load', () => setTimeout(checkBridge, 1500));
  setTimeout(checkBridge, 5000);
}

/* ---------- Diaporama carte "Le Touquet" (photos des établissements) ---------- */
function initDestSlideshow() {
  const card = document.querySelector(".dest-letouquet");
  if (!card) return;
  const imgs = VENUES.filter(v => v.dest === "letouquet" && v.image).map(photoSrc);
  if (!imgs.length) return;

  /* Les vignettes ne reçoivent leur src qu'au fur et à mesure du défilé, avec
     une longueur d'avance. Les demander toutes à la construction faisait venir
     l'intégralité des photos d'établissement dès le chargement — soit près de
     3 Mo pour une image visible à la fois, et cela annulait le chargement
     différé des cartes, qui utilisent exactement les mêmes fichiers. */
  const slides = document.createElement("div");
  slides.className = "dest-slides";
  const items = imgs.map((src, i) => {
    const img = document.createElement("img");
    img.alt = "";
    img.dataset.src = src;
    if (i === 0) img.classList.add("on");
    slides.appendChild(img);
    return img;
  });
  card.insertBefore(slides, card.firstChild);

  const fetchOne = n => {
    const img = items[n % items.length];
    if (!img.src) img.src = img.dataset.src;
  };
  fetchOne(0);
  fetchOne(1);

  let i = 0;
  setInterval(() => {
    items[i].classList.remove("on");
    i = (i + 1) % items.length;
    items[i].classList.add("on");
    fetchOne(i + 1); // la suivante est demandée pendant l'affichage de celle-ci
  }, 3200);
}

/* ---------- Init ---------- */
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
// Supprime le hash de l'URL sans recharger (évite le scroll vers une ancre au chargement)
if (window.location.hash) history.replaceState(null, "", window.location.pathname + window.location.search);
// Force scroll top
const _forceTop = () => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body && (document.body.scrollTop = 0);
  try { window.parent.postMessage({ type: "scrollToTop" }, "*"); } catch(e) {}
};
_forceTop();
// Second passage après chargement complet (images, fonts)
window.addEventListener("load", () => requestAnimationFrame(_forceTop));

// ── Scroll passthrough iframe → parent Wix (wheel desktop uniquement) ──
(function() {
  const inIframe = () => { try { return window.self !== window.top; } catch(e) { return true; } };
  if (!inIframe()) return;
  window.addEventListener("wheel", function(e) {
    /* Si l'hôte ne redimensionne plus le cadre (voir checkBridge), le cadre a
       son propre défilement et c'est lui qu'il faut laisser faire : relayer la
       molette au parent bloquerait le visiteur en haut de la page. */
    if (window.__lbhBridge === "dead") return;
    try { window.parent.postMessage({ type: "lbh-wheel", deltaY: e.deltaY, deltaX: e.deltaX }, "*"); } catch(e2) {}
  }, { passive: true });
})();

/* ---------- Vidéos différées ----------
   Une vidéo marquée preload="none" + data-src n'est téléchargée qu'une fois
   proche de l'écran. Sans ça, une vidéo de section réclame ses mégaoctets en
   même temps que celle du hero et retarde tout le premier affichage. La marge
   de 300px lui laisse le temps d'arriver avant d'être vue ; l'affiche tient la
   place entre-temps. */
function initLazyVideo() {
  const vids = document.querySelectorAll("video.lazy-video[data-src]");
  if (!vids.length) return;

  /* Deux verrous, parce qu'un seul ne suffit pas.

     Le verrou de proximité (IntersectionObserver) ne sert à rien dans
     l'embarquement Wix : l'iframe y est dimensionnée à la hauteur du contenu,
     donc tout est « visible » dès le départ et l'observateur se déclenche
     aussitôt pour toute la page.

     Le verrou de temps couvre ce cas : on ne demande rien avant que la page
     ait fini de charger. La vidéo du hero, qui est le même fichier, a alors
     déjà sa requête en cours ou terminée, et celle-ci est servie par le cache
     au lieu de repartir sur le réseau. */
  let pageLoaded = document.readyState === "complete";
  const wanted = new Set();

  const start = v => {
    if (v.dataset.started) return;
    v.dataset.started = "1";
    const s = document.createElement("source");
    s.src = v.dataset.src;
    s.type = "video/mp4";
    v.appendChild(s);
    v.load();
    // play() peut être refusé (mode économie de données du navigateur) : la
    // vidéo reste alors sur son affiche, ce qui est un repli acceptable.
    v.play().catch(() => {});
  };

  const want = v => { wanted.add(v); if (pageLoaded) start(v); };

  if (!pageLoaded) {
    window.addEventListener("load", () => {
      pageLoaded = true;
      wanted.forEach(start);
    });
  }

  // Sans IntersectionObserver (très anciens navigateurs), on s'en remet au
  // seul verrou de temps plutôt que de laisser un cadre vide indéfiniment.
  if (!("IntersectionObserver" in window)) { vids.forEach(want); return; }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      want(e.target);
      obs.unobserve(e.target);
    });
  }, { rootMargin: "300px 0px" });
  vids.forEach(v => io.observe(v));
}

document.addEventListener("DOMContentLoaded", () => {
  renderVenues();
  initCardNav();
  renderMap();
  initDestSlideshow();
  loadHomeEvents();
  initFilter();
  initHeader();
  initBurger();
  initAnchors();
  observeReveal();
  initCounters();
  initIllus();
  initLazyVideo();
  loadEvents();
  initAutoResize();
  initBackTop();
  // Rafraîchissement automatique des événements toutes les 60 secondes
  setInterval(() => { loadHomeEvents(); loadEvents(); }, 60_000);
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeVenue(); });
  const ov = document.getElementById("modal");
  if (ov) ov.addEventListener("click", e => { if (e.target === ov) closeVenue(); });
});
