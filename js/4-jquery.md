# JQuery

[Documentation](https://api.jquery.com/)

JQuery est une librairie très utilisée pendant des années pour manipuler le DOM et ses événements (mais pas que, beaucoup de développeurs ne connaissent que JQuery pour manier le javascript).

## Installation

Il y a 2 moyens d'installer JQuery dans un projet : par un fichier stocké en ligne, par JQuery, ou de télécharger leur fichier et l'utiliser dans votre projet.

Avantages du CDN (fichier en ligne)
- rien à télécharger
- un ligne suffit pour s'en servir

Avantages du fichier local :
- ne tombe jamais en panne
- pas besoin de connexion Internet pour travailler (et donc pas besoin de faire une requête http sur un serveur distant pour ça)

### CDN

Vous pourrez trouver [le lien vers le CDN sur la page officielle](https://code.jquery.com/). Je vous conseille la version `minified`, qui contient toutes les fonctionnalités (contrairement à la version `slim`) et est plus légère à télécharger.

### Fichier local

Pour télécharger le fichier local, rendez-vous sur [la page dédiée au téléchargement de JQuery](https://jquery.com/download/).
Ajoutez la balise `<script>` pour l'importer, juste avant celle de votre code.

## Cibler des éléments avec JQuery

Le principe est le même que `querySelectorAll()`, mais avec une syntaxe bien plus courte. On récupère tous les noeuds répondant à notre sélecteur.

```js
// On appelle par une balise et on récupère tous les h1 de la page
let element = $('h1');

// On utilise un id
let element = $('#jean-claude');

// On utilise une classe
let element = $('.van-dame');

// Tout ça à la fois
let element = $('div#jean-claude a.van.dame');
```

## Gestion d'événements

Une fois que vous avez sélectionné un élément, vous pouvez ajouter un event listener avec la méthode `on()`, qui prend en paramètre le nom de l'événement à écouter et la fonction à exécuter (exactement comme la méthode `addEventListener()`, mais en plus court).

```js
$('#jean-claude').on('click', function() {
    console.log('I am aware !');
});
```

### Gestion d'événement sur un noeud qui n'existe pas encore

Il est même possible d'installer un event listener pour un/des noeuds qui n'ont pas encore été créés ! On cible un noeud existant et on précise que ses enfants qui seront créés avec un sélecteur précis, auront un événement associé.

```html
<div id="jean-claude"></div>
```

```js
let element = $('#jean-claude');
// On ajoute un paramètre au milieu pour indiquer 
// que les enfant de notre noeud, ayant les classes van et dame
// auront un event listener sur l'événement click
element.on('click', '.van.dame', function() {
    console.log('You clicked on Van Dame !');
});
```

### Modifier les classes

```js
let element = $('#jean-claude');
// On ajoute une classe à notre Jean Claude
element.addClass('uneClasse');

// On supprime une classe à notre Jean Claude
element.removeClass('uneClasse');

// Retourne true si l'élément a cette classe, false sinon
element.hasClass('uneClasse'); 

// On ajoute une classe si elle n'existe pas
// et on l'enlève si elle existe déjà !
element.toggleClass('uneClasse');
```

### Modifier / ajouter du contenu

```js
let element = $('#jean-claude');

// Remplace le contenu de la balise par un texte
element.text('La classe !');

// Remplace le contenu de la balise par du html
element.html('La <strong>classe</strong> !');

// Ajoute le contenu à la fin de la balise
element.append('La <strong>classe</strong> !');

// Ou dans l'autre sens, on crée un nouveau noeud et on l'ajoute à la fin de notre Jean Claude
$('La <strong>classe</strong> !').appendTo('#jean-claude');

// Ajoute le contenu au début de la balise
element.prepend('La <strong>classe</strong> !');

// Ou dans l'autre sens, on crée un nouveau noeud et on l'ajoute au début de notre Jean Claude
$('La <strong>classe</strong> !').prependTo('#jean-claude');
```

### Récupérer / modifier les attributs

```js
let jeanClaude = $('.jean-claude');

// Récupérer le contenu d'un attribut
let id = jeanClaude.attr('id');

// Mettre à jour un attribut
jeanClaude.attr('id', 'chuck-norris');
```

### Récupérer/modifier les data-attributs

```html
<div class="jean-claude" data-van-dame data-strength="too much" data-humour="unlimited" data-aware="Off curse">
    He is aware.
</div>
```

```js
let jeanClaude = $('.jean-claude');

// Récupérer le contenu de data-strength
let strength = jeanClaude.data('strength');

// Mettre à jour le contenu de data-strength
let strength = jeanClaude.data('strength', 'more than that');
```