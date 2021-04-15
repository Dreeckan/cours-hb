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

Pour télécharger le fichier local, rendez-vous sur [la page dédiée au téléchargement de JQuery](https://jquery.com/download/). Ajoutez la balise `<script>` pour l'importer, juste avant celle de votre code.

### Exercice

- Créer un fichier html et ajouter le fichier JQuery
  - Télécharger le fichier
  - Créer un dossier `lib` (ou lui donner le nom de votre choix) et y mettre le fichier
  - L'inclure dans le html (à la fin du body)
- Les exercices suivants sont à faire dans le même fichier HTML

#### English version

- Create an HTML file and add Jquery file
  - Download JQuery source file
  - Put it in a new folder named `lib` (or any name you prefer)
  - Use it in the HTML file
- Do the other JQuery exercices in this HTML file

## Cibler des éléments avec JQuery

Le principe est le même que `querySelectorAll()`, mais avec une syntaxe bien plus courte. On récupère tous les noeuds répondant à notre sélecteur.

```js
// On appelle par une balise et on récupère tous les h1 de la page
let elements = $('h1');

// On utilise un id
let elements = $('#jean-claude');

// On utilise une classe
let elements = $('.van-dame');

// Tout ça à la fois
let elements = $('div#jean-claude a.van.dame');
```

### Parcourir le DOM

Il arrive que l'on ait besoin de récupérer le parent d'un (ou plusieurs) élément récupéré avec JQuery (et donc, parcourir notre DOM).

Plusieurs méthodes vont nous servir (où le paramètre `selecteur` peut être n'importe quel sélecteur CSS/JS) :

- `children(selecteur)` pour récupérer les **enfants directs** de notre élément
- `find(selecteur)` pour récupérer les **enfants à n'importe quel niveau** de notre élément (ce qui inclue les petits-enfants, etc.)
- `parent()` pour récupérer le noeud parent
- `parents(selecteur)` pour aller chercher dans les noeuds parents, grand-parents, etc.

Imaginons ce HTML :

```html

<article>
    <header>
        <h2>Un titre</h2>
    </header>
    <p></p>
    <p></p>
</article>
<article>
    <header>
        <h2>Un titre</h2>
    </header>
    <p></p>
    <p></p>
</article>
```

```js
// On récupère des éléments dans notre DOM
let articles = $('article');

// On peut utiliser la méthode children() pour récupérer les enfants
// Si l'on veut récupérer la balise header de nos articles : 
let headers = articles.children('header');

// Si on veut récupérer les balises h2, nous pouvons le faire de 2 manières:
// En parcourant les enfants de headers
let h2 = header.children('h2');
// Directement depuis articles, avec find()
h2 = articles.find('h2');

// On va maintenant revenir en arrière et récupérer les articles depuis les h2
// On récupère le noeud parent des h2 (header), puis les parents de ces parents (l'article)
articles = h2.parent().parent();

// On peut aussi aller chercher dans les parents, avec un sélecteur
articles = h2.parents('article');
```

### Récupérer l'un des éléments ciblés

Plusieurs méthodes permettent de récupérer un élément en particulier, dans le tableau des éléments récupérés.

- `.last()` permet de récupérer le dernier élément (JQuery) de la liste (dernier dans le DOM)
- `.first()` permet de récupérer le premier élément (JQuery) de la liste (premier dans le DOM)
- `.eq(number)` permet de récupérer l'élément (JQuery) à l'index `number` de la liste
- `.get(number)` permet de récupérer l'élément (élément DOM, c’est-à-dire en VanillaJS/js classique)

```html
<article>
    <p class="first"></p>
    <p class="second"></p>
    <p class="third"></p>
    <p class="fourth"></p>
</article>
```

```js
// On récupère la liste des paragraphes
let p = $('p');

// Si on veut récupérer le premier élément
let first = p.first(); // p.first est récupéré

// Si on veut récupérer le dernier élément
let last = p.last(); // p.fourth est récupéré

// Si on veut récupérer le n-ème élément
let nth = p.eq(n); // où n vaut entre 0 et 3 dans notre cas

// Si on veut récupérer le n-ème élément, au format VanillaJS
// (attention, on ne pourra dont pas utiliser les méthodes de JQuery directement dessus)
let nthDom = p.get(n);
```

### Exercice

```html

<header id="header" class="header">
    <h1 class="header__title">
        Test JQuery
    </h1>
</header>
<main id="main" class="main">
    <article class="article" data-number="1">
        <header class="article__header">
            <h2>Article 1</h2>
        </header>
        <section class="article__content">
            <p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rutrum tellus in hendrerit congue. Duis porta imperdiet ex a volutpat. </p>
            <p class="paragraph">Phasellus bibendum non urna et hendrerit. Maecenas vestibulum cursus nisi sit amet luctus. Pellentesque molestie congue tempor. Nam venenatis mollis tortor, quis egestas ligula pellentesque eu.</p>
        </section>
    </article>
    <article class="article" data-number="2">
        <header class="article__header">
            <h2>Article 2</h2>
        </header>
        <section class="article__content">
            <p class="paragraph">Nunc vel justo mauris. Sed gravida massa tristique ligula porta imperdiet at ut tortor. Curabitur orci dolor, sagittis at eros non, rhoncus faucibus quam.</p>
            <p class="paragraph">Pellentesque ultricies magna ac sodales laoreet. Praesent sollicitudin gravida turpis, sed tristique turpis bibendum et. Donec nec dolor sagittis, egestas nulla quis, venenatis ligula. Phasellus cursus aliquam dui vitae suscipit. Nullam sed dolor dolor. </p>
        </section>
    </article>
</main>
<footer id="footer" class="footer">
    <ul class="footer__list">
        <li class="footer__element">
            <a href="" class="footer__link">
                Un lien
            </a>
        </li>
        <li class="footer__element">
            <a href="" class="footer__link">
                Un autre lien
            </a>
        </li>
    </ul>
</footer>
```

et dans la balise `head` un peu de style :

```html

<style>
    .paragraph--hovered {
        color: red;
    }
</style>
```

- Ajouter le HTML ci-dessus dans votre `<body>`
- Récupérer tous les noeuds `<a>` de la page (et les afficher avec un `console.log()`)
- Récupérer le noeud ayant l'id `footer` (et l'afficher avec un `console.log()`)
- Récupérer tous les noeuds ayant la classe `article` (et les afficher avec un `console.log()`)
- Récupérer le second paragraphe de chaque `article` (et les afficher avec un `console.log()`)

#### English version

- Add above HTML in your `<body>`
- Get every `<a>` and display them using `console.log()`
- Get the node with id `footer` and display it using `console.log()`
- Get every node with `article` class and display them using `console.log()`
- Get the second paragraphs of each `article` and display them using `console.log()`

## Gestion d'événements

Une fois que vous avez sélectionné un élément, vous pouvez ajouter un event listener avec la méthode `on()`, qui prend en paramètre le nom de l'événement à écouter et la fonction à exécuter (exactement comme la méthode `addEventListener()`, mais en plus court).

```js
$('#jean-claude').on('click', function () {
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
// que les enfants de notre noeud, ayant les classes van et dame
// auront un event listener sur l'événement click
element.on('click', '.van.dame', function (event) {
    console.log('You clicked on Van Dame !');
    console.log(event);
});
```

### Exercices

- Sur tous les liens, ajouter un event listener pour éviter que la page soit rechargée au clic (avec `preventDefault()`)
- Sur le second paragraphe de chaque `article`, au survol de la souris (avec [la méthode `hover` de JQuery](https://api.jquery.com/hover/)), afficher :
  - un message `Vous entrez dans un article` dans la console quand la souris entre dans le paragraphe
  - un message `Vous sortez de l'article` dans la console quand la souris sort de le paragraphe

#### English version

- On every link, add an event listener to avoir page reloading on click (using `preventDefault()`)
- On the second paragraphs of each `article`, display (using [`hover` method of JQuery](https://api.jquery.com/hover/)):
  - `You are entering an article` in the console when the mouse enters the paragraph
  - `You are out of this article` in the console when the mouse exits the paragraph

## Modifier les classes

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

### Exercices

- Sur le second paragraphe de chaque `article`, au survol de la souris (avec [la méthode `hover` de JQuery](https://api.jquery.com/hover/)) :
  - Ajouter la classe `paragraph--hovered` sur l'élément survolé (et uniquement lui) quand la souris entre dans le paragraphe (pour le voir, ouvrez l'inspecteur)
  - Enlever la classe `paragraph--hovered` sur l'élément survolé (et uniquement lui) quand la souris sort de le paragraphe (pour le voir, ouvrez l'inspecteur)
- Faire la même chose à l'aide de `toggleClass()`

#### English version

- On the second paragraphs of each `article` (using [`hover` method of JQuery](https://api.jquery.com/hover/)):
  - Add `paragraph--hovered` class when the mouse enters the paragraph (to see the difference, use the inspector)
  - Remove `paragraph--hovered` class when the mouse exits the paragraph (to see the difference, use the inspector)
- Do the same thing with `toggleClass()`

## Modifier / ajouter du contenu

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

### Exercice

- Au clic sur un lien du footer, remplacer le texte par `Ce lien a été cliqué` (utiliser `$(this)` pour récupérer l'élément cliqué)
- Au chargement de la page, compter le nombre de balises `article` et ajouter ce HTML au début de la balise `main` (en remplaçant `X` par le nombre d'articles) :

```html
<p>Il y a X articles dans cette page. Bonne lecture !</p>
```

#### English version

- When a footer link is clicked, replace its text with `This link has been clicked` (use `$(this)` to get clicked element)
- On page load, count `article` nodes, and add this HTML on the beginning of `main` (replace `X` with that count):

```html
<p>There are X articles on this page. Happy reading!</p>
```

## Récupérer / modifier les attributs

```js
let jeanClaudes = $('.jean-claude');

// Récupérer le contenu d'un attribut
let id = jeanClaudes.attr('id');

// Mettre à jour un attribut
jeanClaudes.attr('id', 'chuck-norris');
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

### Exercices

- Au survol d'un `article` (méthode ou événement `hover`) :
  - récupérer son attribut `data-number`,
  - mettre à jour l'attribut `id` de cet article `id="article-X"` (remplacer X par l'id récupéré dans `data-number`)

#### English version

- When hovering an article (`hover` event and/or method):
  - get its `data-number` attribute,
  - update its `id` attribute: `id="article-X"` (replace X with the content of `data-number`)

### Contenu d'un champ de formulaire

Vous pouvez récupérer / modifier la valeur d'un champ de formulaire avec la méthode `val()` de votre élément.

```js
// On récupère notre champ de formulaire (ici, un input avec l'attribut name="test"
let element = $('input[name="test"]');

// On en récupère la valeur
let value = element.val();

// On modifie la valeur
element.val('Un texte de test');
```

## Exercices récapitulatifs

### Conversion

- Convertir le code de l'exercice "Jeu de Rôle" en JQuery (utiliser [ce fichier si vous préférez](https://github.com/Dreeckan/exercices-js/blob/main/dom/3-jdr.js)) (voir [ma version en vidéo](https://www.loom.com/share/8a343f3a4ce1482a8643b2d50a136bf3))