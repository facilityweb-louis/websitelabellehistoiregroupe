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
    image: "assets/logos/flavio 2.JPG",
    desc: "L’institution historique du groupe. Une cuisine classique servie par une brigade complète, une cave de près de cent références et un sommelier pour vous accompagner. Le « Club de la Forêt » incarne l’art de recevoir à la française.",
    info: { "Cuisine": "Gastronomique traditionnelle", "Adresse": "Le Touquet-Paris-Plage", "Esprit": "Institution · brigade · cave" }
  },
  {
    id: "impasse", name: "L’Impasse", year: 1999, dest: "letouquet", destLabel: "Le Touquet",
    theme: "t-night", type: "Bar · Food · Music & Drinks",
    tags: ["Music", "Food", "Good Vibes"],
    image: "assets/logos/Impasse.JPG",
    desc: "Le concept mixte du groupe : un bar à l’ambiance soirée où la cuisine, les cocktails et la musique se répondent. Un lieu pensé pour prolonger la nuit en excellente compagnie.",
    info: { "Concept": "Resto · Bar · Musique", "Adresse": "Le Touquet-Paris-Plage", "Ambiance": "Soirée" }
  },
  {
    id: "plage", name: "La Plage des Pirates", year: 2009, dest: "letouquet", destLabel: "Le Touquet",
    theme: "t-sable", type: "Restaurant-bar de plage",
    tags: ["Spritz o'clock", "DJ Set", "Beach Life"],
    image: "assets/logos/pirates.jpg",
    desc: "Sur la digue, du petit-déjeuner au dîner. Transats à louer, pieds dans le sable et DJs le week-end dès 18h. Le spot beach festif du Touquet, ouvert de mars à octobre.",
    info: { "Saison": "Mars → Octobre", "Horaires": "9h00 → 22h30", "Adresse": "Sur la digue, Le Touquet" }
  },
  {
    id: "marcel", name: "Le Marcel", year: 2016, dest: "letouquet", destLabel: "Le Touquet",
    theme: "t-chocolat", type: "Bar · Cocktails",
    tags: ["Bar", "Cocktails", "Karaoké"],
    image: "assets/logos/MARCEL  OCT-43.jpg",
    desc: "Un bar pur au positionnement cocktails affirmé. Cadre soigné, sélection pointue et atmosphère idéale pour l’apéritif comme pour les fins de soirée entre amis.",
    info: { "Type": "Bar à cocktails", "Adresse": "Le Touquet-Paris-Plage", "Ambiance": "Cocktails · apéritif" }
  },
  {
    id: "atelier", name: "L’Atelier Éphémère", year: 2017, dest: "letouquet", destLabel: "Le Touquet",
    theme: "t-vert", type: "Restaurant éphémère",
    tags: ["Restaurant", "Terrasse"],
    image: "assets/logos/Atelier ephemere.JPG",
    desc: "Un restaurant au concept mouvant, qui se réinvente au fil des saisons et des envies. Une carte qui change, des collaborations, des éditions limitées : l’éphémère comme signature.",
    info: { "Concept": "Carte évolutive", "Adresse": "Le Touquet-Paris-Plage", "Esprit": "Éphémère · saisonnier" }
  },
  {
    id: "basenord", name: "La Base Nord", year: 2018, dest: "letouquet", destLabel: "Le Touquet",
    theme: "t-night", type: "Restaurant",
    tags: ["Vue mer", "Terre-Mer"],
    image: "assets/logos/labasenord.JPG",
    desc: "Une table conviviale et généreuse au cœur du Touquet. Un cadre chaleureux pour partager de bons moments, midi et soir.",
    info: { "Type": "Restaurant", "Adresse": "Le Touquet-Paris-Plage", "Ambiance": "Convivial" }
  },
  {
    id: "caravane", name: "Caravane", year: 2022, dest: "letouquet", destLabel: "Le Touquet",
    theme: "t-vert", type: "Restaurant",
    tags: ["Restaurant", "Show", "Dj Set"],
    image: "assets/logos/caravane 1.JPG",
    desc: "La dernière génération des tables du groupe : une cuisine voyageuse, une ambiance vivante et une terrasse pour profiter des beaux jours touquettois.",
    info: { "Type": "Restaurant", "Adresse": "Le Touquet-Paris-Plage", "Ambiance": "Vivante · terrasse" }
  },
  {
    id: "amour", name: "L’Amour", year: 2023, dest: "letouquet", destLabel: "Le Touquet",
    theme: "t-bordeaux", type: "Restaurant romantique", heart: true,
    tags: ["Romantique", "Dîner aux chandelles", "Nappe blanche"],
    image: "assets/logos/AMOUR1.jpg",
    desc: "L’adresse romantique du Touquet. Convivial le midi, intimiste le soir avec sa nappe blanche et ses dîners aux chandelles. Le lieu des grandes occasions et des déclarations.",
    info: { "Cuisine": "Romantique · soignée", "Adresse": "74 rue de Metz, Le Touquet", "Soir": "Dîner aux chandelles" }
  },
  {
    id: "nonna", name: "La Nonna", year: 2023, dest: "letouquet", destLabel: "Le Touquet",
    theme: "t-cuivre", type: "Trattoria · Pizzeria napolitaine",
    tags: ["Italien", "Pizza & Pasta", "Aperitivo"],
    image: "assets/logos/NONNA FEV-07.jpg",
    desc: "Une trattoria à l’italienne : pizza napolitaine signée le pizzaïolo Lucas, pasta maison et aperitivo. Au centre tennistique Pierre de Coubertin, rond-point des Sports.",
    info: { "Cuisine": "Italienne · napolitaine", "Horaires": "10h00 → 22h30", "Adresse": "Centre P. de Coubertin, rond-point des Sports" }
  },
  {
    id: "tipi", name: "Tipi", year: 2024, dest: "meribel", destLabel: "Méribel",
    theme: "t-mountain", type: "Restaurant d’altitude · piste",
    tags: ["Altitude", "Bistronomie", "After-ski"],
    image: "assets/logos/tipi.jpg",
    desc: "Sur la Piste de l’Aigle à Méribel-Mottaret, au cœur des 3 Vallées. Le chef Fabien François (ex-Robuchon, Alléno) signe une bistronomie et des spécialités montagnardes. After-ski festif et soirées du jeudi jusqu’à 23h30.",
    info: { "Chef": "Fabien François", "Lieu": "Piste de l’Aigle, Méribel-Mottaret", "Jeudi": "Soirées jusqu’à 23h30" }
  }
];

/* ---------- Logos (fond transparent → affichés en blanc sur les cartes) ---------- */
// Mappe l'id de l'établissement vers son fichier logo dans assets/logos/
const LOGO_FILE = {
  flavio: "flavio", impasse: "impasse", plage: "pirates", marcel: "marcel",
  atelier: "atelier", basenord: "basenord", caravane: "caravane",
  amour: "amour", nonna: "nonna", tipi: "tipi"
};
function logoSrc(v) { return `assets/logos/logo-${LOGO_FILE[v.id] || v.id}.png`; }

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
function venueCard(v) {
  const media = v.image ? `<img class="card-media-img" loading="lazy" src="${encodeURI(v.image)}" alt="${v.name}"/>` : "";
  const url = venueHref(v);
  const external = /^https?:/.test(url);
  const discoverAttrs = external ? ' target="_blank" rel="noopener"' : "";
  const resaHref = `reserver.html?venue=${v.id}`; // ouvre la page Réserver sur le widget de cet établissement
  return `
  <article class="card ${v.theme}" data-dest="${v.dest}" data-id="${v.id}" data-href="${url}" aria-label="${v.name}">
    ${media}
    <span class="c-year">Depuis ${v.year}</span>
    <span class="c-dest">${v.destLabel}</span>
    <img class="card-logo" src="${logoSrc(v)}" alt="${v.name}" loading="lazy" />
    <div class="c-bottom">
      <p class="c-type">${v.type}</p>
      <div class="c-tags">${v.tags.map(t => `<span>${t}</span>`).join("")}</div>
      <div class="c-actions">
        <a class="mini line" href="${url}"${discoverAttrs}>Découvrir</a>
        <a class="mini solid" href="${resaHref}">Réserver</a>
      </div>
    </div>
  </article>`;
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
  caravane: [50.52308, 1.58515],  // 73 rue de Metz
  marcel:   [50.52256, 1.59037],  // av. des Phares
  flavio:   [50.52169, 1.59229],  // 1 av. du Verger — Club de la Forêt
  plage:    [50.52039, 1.57974],  // Bd de la Plage — la digue
  nonna:    [50.51857, 1.59501]   // rond-point des Sports — P. de Coubertin
};

let _lbhMap = null;
let _lbhMarkers = null;

function renderMap() {
  const stage  = document.getElementById("map-stage");
  const legend = document.getElementById("map-legend");
  const inset  = document.getElementById("map-inset");
  if (!stage || !legend) return;
  const touquet = VENUES.filter(v => v.dest === "letouquet");

  // structure : conteneur de la vraie carte + fiche détail superposée
  stage.innerHTML =
    '<div class="map-canvas" id="map-canvas"></div>' +
    '<div class="map-detail" id="map-detail" hidden></div>';

  // légende numérotée
  legend.innerHTML = touquet.map((v, i) =>
    `<li><button class="leg-item" type="button" data-id="${v.id}">` +
      `<span class="leg-n">${String(i + 1).padStart(2, "0")}</span>` +
      `<span class="leg-txt"><strong>${v.name}</strong><em>${v.type}</em></span>` +
    `</button></li>`
  ).join("");

  // encart Tipi / Méribel
  const tipi = VENUES.find(v => v.id === "tipi");
  if (inset && tipi) {
    const url = venueHref(tipi);
    const ext = /^https?:/.test(url) ? ' target="_blank" rel="noopener"' : "";
    inset.innerHTML =
      '<span class="inset-flag">Les 3 Vallées · Altitude</span>' +
      '<span class="inset-place">Méribel</span>' +
      `<img class="inset-logo" src="${logoSrc(tipi)}" alt="${tipi.name}" />` +
      `<h4>${tipi.name}</h4><p>${tipi.type}</p>` +
      '<div class="md-actions">' +
        `<a class="mini line" href="${url}"${ext}>Découvrir</a>` +
        `<a class="mini solid" href="reserver.html?venue=${tipi.id}">Réserver</a>` +
      '</div>';
  }

  // fiche détail (réutilisée par les repères et la légende)
  function activate(id, pan) {
    const v = VENUES.find(x => x.id === id);
    if (!v) return;
    const i = touquet.findIndex(x => x.id === id);
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
      _lbhMap.setView(_lbhMarkers[id].getLatLng(), Math.max(_lbhMap.getZoom(), 16), { animate: true });
    }
  }

  // Leaflet absent (hors-ligne) : on garde la légende + l'encart, sans plantage
  if (typeof L === "undefined") {
    const c = document.getElementById("map-canvas");
    if (c) c.style.display = "none";
    legend.addEventListener("click", e => { const it = e.target.closest(".leg-item"); if (it) activate(it.dataset.id); });
    return;
  }

  // --- vraie carte (zoom / déplacement) ---
  const map = L.map("map-canvas", {
    scrollWheelZoom: false,   // n'attrape pas le scroll de la page tant qu'on ne clique pas
    zoomControl: true
  });
  _lbhMap = map;
  map.on("focus", () => map.scrollWheelZoom.enable());
  map.on("blur",  () => map.scrollWheelZoom.disable());

  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
  }).addTo(map);

  const markers = {};
  _lbhMarkers = markers;
  const pts = [];
  touquet.forEach((v, i) => {
    const ll = MAP_LATLNG[v.id];
    if (!ll) return;
    pts.push(ll);
    const icon = L.divIcon({
      className: "lbh-pin",
      html: `<span>${i + 1}</span>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });
    const m = L.marker(ll, { icon, title: v.name, riseOnHover: true }).addTo(map);
    m.on("click", () => activate(v.id));   // la fiche ne s'ouvre qu'au clic
    markers[v.id] = m;
  });

  if (pts.length) map.fitBounds(pts, { padding: [48, 48], maxZoom: 15 });

  // clic sur la légende = ouvre la fiche + zoome sur l'adresse
  legend.addEventListener("click", e => { const it = e.target.closest(".leg-item"); if (it) activate(it.dataset.id, true); });

  // pas de fiche par défaut : la carte reste visible tant qu'on n'a pas cliqué
  setTimeout(() => map.invalidateSize(), 300);          // recalcul après révélation
  window.addEventListener("resize", () => map.invalidateSize());
}

/* ---------- Clic sur toute la carte = Découvrir (sauf sur les 2 boutons) ---------- */
function initCardNav() {
  const grid = document.getElementById("venue-grid");
  if (!grid) return;
  grid.addEventListener("click", e => {
    if (e.target.closest(".c-actions")) return;            // laisse les boutons Découvrir/Réserver agir normalement
    const card = e.target.closest(".card[data-href]");
    if (!card) return;
    const href = card.getAttribute("data-href");
    if (href && href !== "#") window.location.href = href;
  });
}

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
  visual.style.setProperty("--card-grad", v.image ? `url('${v.image}') center/cover no-repeat` : "");
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

/* ---------- Mobile menu ---------- */
function initBurger() {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".nav-links.left");
  if (!burger || !menu) return;
  burger.addEventListener("click", () => menu.classList.toggle("open"));
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));
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

/* --- Événements via Mice Operations (remplit #event-list-live si présent) --- */
async function loadEvents() {
  const target = document.getElementById("event-list-live");
  if (!target || !API_CONFIG.miceOperations.enabled) return; // sinon : liste statique conservée
  try {
    const res = await fetch(API_CONFIG.miceOperations.eventsUrl, {
      headers: { Authorization: "Bearer " + API_CONFIG.miceOperations.apiKey }
    });
    const events = await res.json();
    target.innerHTML = events.map(e => `
      <div class="event-row">
        <div class="event-date"><div class="d">${e.day}</div><div class="m">${e.month}</div></div>
        <div class="event-info"><h4>${e.title}</h4><p>${e.venue} · ${e.time}</p></div>
        <a class="event-cta" href="${e.url || '#'}">Découvrir →</a>
      </div>`).join("");
  } catch (err) { console.warn("Mice Operations indisponible, données de démo utilisées.", err); }
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

function initAutoResize() {
  if (!window.parent || window.parent === window || typeof window.parent.postMessage !== 'function') return;
  let last = 0, scheduled = false;
  const measure = () => Math.ceil(Math.max(
    document.documentElement.scrollHeight,
    document.body ? document.body.scrollHeight : 0,
    document.body ? document.body.offsetHeight : 0
  ));
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
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderVenues();
  initCardNav();
  renderMap();
  initFilter();
  initHeader();
  initBurger();
  observeReveal();
  loadEvents();
  initAutoResize();
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeVenue(); });
  const ov = document.getElementById("modal");
  if (ov) ov.addEventListener("click", e => { if (e.target === ov) closeVenue(); });
});
