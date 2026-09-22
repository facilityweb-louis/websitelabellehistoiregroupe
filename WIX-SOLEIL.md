# Le code qui vit chez Wix

Deux pages Wix affichent ce site dans un cadre. Ce cadre ne connaît pas la
hauteur de ce qu'il contient : sans les quelques lignes ci-dessous, il garde la
hauteur d'un écran, tout ce qui dépasse est rogné, et le pied de page — qui est
tout en bas — est le premier à disparaître.

Ce code ne vit pas dans ce dépôt mais dans l'éditeur Wix. Il est recopié ici
pour qu'on sache le rétablir : il a déjà disparu une fois.

## Le principe

La page envoie sa hauteur à son hôte :

    { type: 'lbh-resize', lbhHeight: 5733 }

L'hôte applique cette hauteur au composant. Le composant faisant alors la taille
exacte du contenu, il n'a plus de défilement propre : c'est la page Wix qui
défile, d'un seul mouvement.

## Page d'accueil

Le composant HTML pointe directement sur
`https://websitelabellehistoiregroupe.pages.dev/#groupe`. Un seul cadre, donc un
seul relais, dans le code de la page :

```js
$w.onReady(() => {
  $w('#html1').onMessage(e => {
    if (e.data && e.data.type === 'lbh-resize') $w('#html1').height = e.data.lbhHeight;
  });
});
```

Remplacer `#html1` par l'identifiant réel du composant, lisible dans le panneau
des propriétés. L'éditeur souligne parfois `.height` en rouge : c'est un
avertissement de complétion, la propriété existe bien à l'exécution.

## Page Soleil

Ici, **deux cadres emboîtés** : le composant HTML de Wix contient un fragment
hébergé par Wix, et c'est ce fragment qui contient le cadre pointant sur le
site. Le message doit donc être relayé deux fois.

### 1. Le fragment (Ajouter → Intégrer → Code personnalisé)

C'est le fragment d'origine, auquel on n'ajoute que les trois lignes de relais.
Le `height: 100%` est conservé : le cadre suivra la hauteur du composant dès que
Wix la lui aura donnée.

```html
<style>
  html, body { margin: 0; padding: 0; height: 100%; background: #060606; overflow: hidden; }
  #soleil { display: block; width: 100%; height: 100%; border: 0; }
</style>

<iframe
  id="soleil"
  src="https://websitelabellehistoiregroupe.pages.dev/soleil"
  title="Soleil · Night-club · Le Touquet-Paris-Plage"
  allow="fullscreen"
  referrerpolicy="no-referrer-when-downgrade">
</iframe>

<script>
  // La page Soleil annonce sa hauteur : on passe le message à Wix, qui
  // redimensionne le composant. Sans ce relais, le message s'arrête ici.
  addEventListener('message', function (e) {
    if (e.data && e.data.type === 'lbh-resize') parent.postMessage(e.data, '*');
  });
</script>
```

### 2. Le code de la page Soleil

Identique à celui de la page d'accueil, avec l'identifiant du composant de cette
page.

## Si rien n'est posé côté Wix

Le composant garde la hauteur d'un écran et la page défile à l'intérieur, comme
avant. Rien ne casse, mais le pied de page redevient malcommode à atteindre.

## Attention aux hauteurs en `vh`

Dans un cadre dimensionné sur le contenu, `vh` et `svh` ne valent plus la
hauteur de l'écran mais celle de la page : un élément qui s'en sert grandit, ce
qui agrandit la page, donc le cadre, donc l'élément. Mesuré avant correction :
la page passait de 5 100 à 15 100 px en cinq allers-retours.

Les règles `.embedded` en tête de `soleil.html` coupent cette boucle en figeant
`--frame-h`, la hauteur du cadre relevée avant le premier redimensionnement —
c'est-à-dire exactement ce que `svh` donnait. **Tout nouvel élément en `vh`,
`svh` ou `dvh` doit recevoir sa règle `.embedded`.**
