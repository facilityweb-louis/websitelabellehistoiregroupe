# Le code qui vit chez Wix

Deux pages Wix affichent ce site dans un cadre. Ce cadre ne connaît pas la
hauteur de ce qu'il contient : sans les quelques lignes ci-dessous, il garde sa
hauteur d'origine, tout ce qui dépasse est rogné, et le pied de page — qui est
tout en bas — est le premier à disparaître.

Ce code ne vit pas dans ce dépôt, il vit dans l'éditeur Wix. Il est recopié ici
pour qu'on sache le rétablir : il a déjà disparu une fois.

## Ce qui se passe

La page envoie sa hauteur à son hôte :

    { type: 'lbh-resize', lbhHeight: 5143 }

L'hôte applique cette hauteur au composant. Comme le composant fait alors
exactement la taille du contenu, il n'a plus de défilement propre : c'est la
page Wix qui défile, d'un seul mouvement. C'est pour cela que la page d'accueil
relaie aussi la molette au parent.

## Page d'accueil

Le composant HTML pointe directement sur
`https://websitelabellehistoiregroupe.pages.dev/#groupe`. Un seul cadre, donc
un seul relais à écrire, dans le code de la page :

```js
$w.onReady(() => {
  $w('#html1').onMessage(e => {
    if (e.data && e.data.type === 'lbh-resize') $w('#html1').height = e.data.lbhHeight;
  });
});
```

Remplacer `#html1` par l'identifiant réel du composant, lisible dans le panneau
des propriétés. L'éditeur souligne parfois `.height` en rouge : c'est un
avertissement de complétion, pas une erreur — la propriété existe bien à
l'exécution.

## Page Soleil

Ici il y a **deux cadres emboîtés** : le composant HTML de Wix contient un
fragment hébergé par Wix, et c'est ce fragment qui contient le cadre pointant
sur le site. Le message doit donc être relayé deux fois.

### 1. Le fragment (Ajouter → Intégrer → Code personnalisé)

Le `height: 100%` et le `overflow: hidden` de l'ancienne version étaient
précisément ce qui rognait la page : le cadre intérieur ne pouvait pas dépasser
la hauteur du composant, et ce qui dépassait était masqué.

```html
<style>
  html, body { margin: 0; padding: 0; background: #060606; overflow: hidden; }
  /* Pas de hauteur imposée : c'est le message reçu plus bas qui la donne. */
  #soleil { display: block; width: 100%; height: 844px; border: 0; }
</style>

<iframe
  id="soleil"
  src="https://websitelabellehistoiregroupe.pages.dev/soleil"
  title="Soleil · Night-club · Le Touquet-Paris-Plage"
  allow="fullscreen"
  referrerpolicy="no-referrer-when-downgrade">
</iframe>

<script>
  // La page Soleil annonce sa hauteur : on l'applique au cadre, puis on passe
  // le message à Wix, qui redimensionne le composant à son tour.
  addEventListener('message', function (e) {
    if (!e.data || e.data.type !== 'lbh-resize') return;
    document.getElementById('soleil').style.height = e.data.lbhHeight + 'px';
    parent.postMessage(e.data, '*');
  });
</script>
```

### 2. Le code de la page Soleil

Identique à celui de la page d'accueil, avec l'identifiant du composant de
cette page.

## Vérifier

Le pied de page « © 2026 Soleil · La Belle Histoire Groupe » doit être
atteignable en bas de page, sans barre de défilement à l'intérieur du cadre.

Si la hauteur s'emballe au lieu de se stabiliser, c'est qu'un élément de la page
se mesure en hauteur d'écran : dans un cadre à la taille du contenu, `vh` vaut
la hauteur du contenu, que l'élément fait alors grandir à son tour. Les règles
`.embedded` en tête de `soleil.html` existent pour couper cette boucle ; il faut
en ajouter une pour tout nouvel élément en `vh`, `svh` ou `dvh`.
