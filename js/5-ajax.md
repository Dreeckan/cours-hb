# Ajax

## Définitions

[AJAX (Asynchronous JavaScript and XML)](https://developer.mozilla.org/fr/docs/Web/Guide/AJAX) est un ensemble de techniques pour permettre au front (JS principalement) de communiquer avec un serveur de manière asynchrone.

Bien que le format de données XML ait été largement mis de côté au profit du format JSON, AJAX désigne désormais tout moyen permettant au front de communiquer en HTTP(s) avec un serveur de manière asynchrone (sans rechargement de page).

[JSON (JavaScript Object Notation)](https://la-cascade.io/json-pour-les-debutants/) est un format de données, une manière formalisée d'écrire des données pour les stocker ou les échanger. Sa syntaxe est très proche de celle des objets javascript.

```json
{
  "hp": 100,
  "strength": 10,
  "defense": 5
}
```

## Convertir du JS en JSON

La méthode `JSON.stringify()` vous permet de convertir un objet JS en sa représentation en JSON :

```js
let player = {
    name: 'Tango',
    hp: 100,
    strength: 10,
    defense: 5
}

let jsonPlayer = JSON.stringify(player);
```

JSON accepte les valeurs suivantes :

- Objet
- Array
- Nombre
- Chaîne de caractères
- `true`
- `false`
- `null`

## Convertir du JSON en JS

L'inverse est fait avec la méthode `JSON.parse()`. Attention à bien vérifier que le JSON n'est pas vide avant de la parser.

```js
let jsonPlayer = {"name": "Tango", "hp": 100, "strength": 10, "defense": 5};

let player = JSON.parse(jsonPlayer);
```

## Faire des appels AJAX

Nous pouvons facilement créer des appels AJAX, avec JQuery ou l'API Fetch de VanillaJS. L'idée est de demander le contenu d'une page ou un retour d'API (du contenu en JSON) et le traiter dans notre page. L'intérêt est, le plus souvent, de récupérer des informations stockés sur un autre site web pour les afficher sur le nôtre (mais sachez que l'on peut tout
aussi bien envoyer des données pour les stocker/traiter).

### En Vanilla JS avec Fetch

[Documentation formelle](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API) et [documentation pratique](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch)
Un [cours complet de Pierre Giraud](https://www.pierre-giraud.com/javascript-apprendre-coder-cours/api-fetch/) sur le sujet.

Attention, `fetch()` n'est pas compatible avec Internet Explorer (voir [le tableau de compatibilité sur CanIUse](https://caniuse.com/?search=fetch)).

La fonction `fetch()` prend en paramètre obligatoire l'URL du serveur à contacter et, comme paramètre optionnel un objet de configuration (qui inclue la méthode HTTP à utiliser, GET par défaut). Cette fonction retourne une promesse qui contient la réponse (brute, non utilisable) du serveur. On peut alors la convertir à l'aide des méthodes suivantes pour la
traiter :

- `text()` retourne la réponse sous forme de chaine de caractères (pouvant être du HTML)
- `json()` retourne la réponse en tant qu'objet `JSON`
- `formData()` retourne la réponse en tant qu'objet `FormData`
- `arrayBuffer()` retourne la réponse en tant qu'objet `ArrayBuffer`
- `blob()` retourne la réponse en tant qu'objet `Blob`

Un exemple, attendant une réponse du serveur en JSON :

```js
fetch('https://un-serveur.test')
    // On récupère une promesse, c'est-à-dire un code qui sera exécuté quand la partie précédente sera terminée 
    // (et qui utilisera ce qu'elle retourne)
    // Ici, on convertit notre réponse brut en un objet JSON exploitable
    .then(function (response) {
        return response.json();
    })
    // Une fois la réponse convertie en JSON, 
    // on la récupère dans le paramètre data, 
    // et nous pouvons l'exploiter. 
    // Ici, on l'affiche dans un console.log
    .then(function (data) {
        console.log(data);
    })
    // Si un problème survient dans l'une des étapes précédentes
    // L'erreur est attrapée par la méthode catch
    // et envoyée dans le paramètre error
    // Ici, on l'affiche dans un console.log
    .catch(function (error) {
        console.log(error);
    });

```

### Avec JQuery

[Documentation](https://api.jquery.com/jquery.ajax/)

JQuery a été mis en avant surtout pour cette fonctionnalité. À une époque où l'API Fetch n'existait pas, JQuery proposait une méthode simple et très efficace pour construire les requêtes AJAX. Aujourd'hui encore, elle reste ma préférée. Pour les curieux, je vous laisse chercher des tutos sur XMLHttpRequest, si vous aimez vous faire du mal ;) .

Je ne vais vous montrer ici que la méthode `$.ajax()`, mais sachez qu'il existe 2 autres méthodes `$.get()` et `$.post()` qui peuvent encore réduire la taille de votre code. Cette méthode attend un argument, un objet de configuration. Voici un exemple des paramètres les plus utilisés :

```js
$.ajax({
    url: 'https://un-serveur.test', // url / adresse à appeler 
    method: 'POST', // la méthode utilisée (GET, POST, PUT, PATCH, etc.)
    dataType: "json", // Le type des données attendu en retour. Attention, utiliser jsonp si vous récupérez du contenu d'un site différent du vôtre
    data: { // Les données à envoyer. Ici on utilise un objet JS.
        name: 'Tango',
        hp: 100,
        strength: 10,
        defense: 5
    },
    // Une fonction de callback à appeler en cas de réussite de l'appel
    success: function (response) {
        console.log(response);
    },
    // Une fonction de callback à appeler en cas d'échec de l'appel
    error: function (xhr, status, error) {
        console.log(xhr, status, error);
    }

});
```

## Exercices

### Tests locaux

Dans un premier temps, nous allons essayer de charger du contenu local (sur notre ordinateur), tant JSON que HTML.

- Créer un fichier HTML et un fichier JS, lier les deux (`<script src=""></script>`)
  - Ajouter ce code au début de votre `body`

```html

<div class="uneClasse">
    <ul id="player-list">
    </ul>
</div>
```

- Récupérer les fichiers nécessaires à l'exercice et ajoutez-les à votre projet (Rangez-les dans un dossier `data`)
  - `data/exercice-ajax-html.html`

```html

<li data-name="player1" data-hp="125" id="player1" data-strength="2" data-defense="12">
    Le joueur player1 a 125 points de vie, 2 points de force et 12 points de défense.
</li>
```

- `data/exercice-ajax-single.json`

```json
{
  "name": "player1",
  "hp": 100,
  "defense": 5,
  "strength": 10
}

```

- `data/exercice-ajax-tab.json`

```json
[
  {
    "name": "player1.1",
    "hp": 100,
    "defense": 5,
    "strength": 10
  },
  {
    "name": "player2",
    "hp": 100,
    "defense": 5,
    "strength": 10
  },
  {
    "name": "dungeonMaster",
    "hp": 200,
    "defense": 6,
    "strength": 12
  },
  {
    "name": "dungeonMaster2",
    "hp": 150,
    "defense": 10,
    "strength": 5
  }
]
```

- Nous allons faire 3 requêtes AJAX pour modifier notre HTML et/ou créer des noeuds dans notre page
  - Une première, pour récupérer le HTML et l'intégrer dans la liste (on le récupère avec `$.ajax` ou `fetch()` et on l'ajoute en tant que contenu à notre noeud `ul#player-list`)
  - Nous allons ensuite récupérer chaque fichier JSON (`exercice-ajax-single.json` et `exercice-ajax-tab.json`), récupérer les données, et créer des éléments pour les afficher dans notre DOM. Chaque fichier contient un ou des objets `player` et nous allons nous servir de ces données pour ajouter des `<li>` dans la liste que nous avons importé dans le premier
    appel AJAX.
    - Pour chaque objet dans le fichier JSON, créer un noeud `li` de cette forme :

```html

<li data-name="player1" data-hp="125" id="player1" data-strength="2" data-defense="12">
    Le joueur player1 a 125 points de vie, 2 points de force et 12 points de défense.
</li>
```

#### Indices

- Le fichier `data/exercice-ajax-single.json` contient un objet (JSON) avec les informations nécessaires. Il nous faut récupérer la donnée (et la convertir au format JSON si vous utilisez `fetch`) et créer un noeud HTML avec les données qu'elle contient.
- Le fichier `data/exercice-ajax-tab.json` contient un tableau JSON, avec plusieurs objets qu'il va falloir traiter de la même manière (le fonctionnement va être très similaire, il y aura juste une boucle autour ;) ).

#### English version

First, we will load some content from our computer, JSON and HTML.

- Create an HTML file, and a JS file (use `script` tag to link them)
  - Add this code at the beginning of its `body`

```html

<div class="className">
    <ul id="player-list">
    </ul>
</div>
```

- Download necessary files and add them to your project
  - `data/exercice-ajax-html.html`

```html

<li data-name="player0" data-hp="125" id="player0" data-strength="2" data-defense="12">
    The player0 player has 125 health points, 2 in strength and 12 in defense.
</li>
```

- data/`exercice-ajax-single.json`

```json
{
  "name": "player1",
  "hp": 100,
  "defense": 5,
  "strength": 10
}

```

- `data/exercice-ajax-tab.json`

```json
[
  {
    "name": "player1.1",
    "hp": 100,
    "defense": 5,
    "strength": 10
  },
  {
    "name": "player2",
    "hp": 100,
    "defense": 5,
    "strength": 10
  },
  {
    "name": "dungeonMaster",
    "hp": 200,
    "defense": 6,
    "strength": 12
  },
  {
    "name": "dungeonMaster2",
    "hp": 150,
    "defense": 10,
    "strength": 5
  }
]
```

- We will now make 3 AJAX requests to update our HTML page and/or create new nodes with JS
  - First request: get the HTML file and update the `ul#player-list` tag with its content (get it with `$.ajax` or `fetch()`, as you prefer)
  - Second and third : get the JSON files (`exercice-ajax-single.json` and `exercice-ajax-tab.json`), extract their data, create new nodes and add them to our DOM. Each file contains one or several `player` objects, and we will use these data to create `li` nodes (and add it to a `ul` node that we loaded in our first AJAX request).
    - For every object from our JSON, your `li` node should look like this:

```html

<li data-name="player1" data-hp="125" id="player1" data-strength="2" data-defense="12">
    The player1 player has 125 health points, 2 in strength and 12 in defense.
</li>
```

### Récupérer et afficher des données distantes

Nous allons récupérer des données depuis une API : [https://official-joke-api.appspot.com/jokes/ten](https://official-joke-api.appspot.com/jokes/ten)

Notre but, récupérer des données et les afficher dans une page HTML.

Les objets JSON renvoyés par cette API sont de la forme :

```json
{
  "id": "number",
  "type": "string",
  "setup": "string",
  "punchline": "string"
}
```

Notre HTML de base :

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Jokes API !</title>
</head>
<body>
    <h1>Jokes API</h1>
    <section id="jokes"></section>
</body>
</html>
```

Pour chaque blague, nous allons créer un HTML de cette forme et l'ajouter dans `#jokes` (remplacer les données entre `{}` par celles de l'API).

```html
<article id="joke-{id}" data-type="{type}">
    <h2>{setup}</h2>
    <p>{punchline}</p>
</article>
```

#### English version

Let's get some data from an API : [https://official-joke-api.appspot.com/jokes/ten](https://official-joke-api.appspot.com/jokes/ten)

Our goal is to get data and display them in a HTML page.

Received JSON objects look like this: 

```json
{
  "id": "number",
  "type": "string",
  "setup": "string",
  "punchline": "string"
}
```

Our base HTML:

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Jokes API !</title>
</head>
<body>
    <h1>Jokes API</h1>
    <section id="jokes"></section>
</body>
</html>
```

For every joke we get, create a HTML node, and add it to the `#jokes` node. (replace `{}` values with the ones from the API)

```html
<article id="joke-{id}" data-type="{type}">
    <h2>{setup}</h2>
    <p>{punchline}</p>
</article>
```

### Boss de fin

Nous allons récupérer des données depuis une API plus complexe : [une API sur les Pokémon](https://pokeapi.co/docs/v2)

Dans un premier temps, nous allons récupérer la liste des pokémon de première génération : [les informations sur la première génération](https://pokeapi.co/api/v2/generation/1/).
Nous allons récupérer uniquement la propriété `pokemon_species`, mais nous allons en parcourir tout le contenu (attention, nous allons récupérer les informations de 150 pokémons).
Une fois cette liste récupérée, récupérer leurs parents (propriété `evolves_from_species`) et afficher les noms français (tant pour le Pokémon que pour ses parents). 

Afficher la liste des pokémons sous cette forme : 

```html
<section data-id="{id}" data-url="{url}">
    <h2>{name}</h2>
    {name} est une évolution de <span data-parent-url="{parentUrl}">{parent}</span>
    <a href="" class="more">Plus d'informations</a>
</section>
```

Remplacer les valeurs : 
- `{id}` par l'identifiant du pokémon
- `{url}` par l'url donnant les informations sur le pokémon
- `{name}` le nom français du pokémon
- `{parent}` le nom français du pokémon parent
- `{parentUrl}` par l'url donnant les informations sur le(s) pokémon(s) parent(s)

#### Aller plus loin

Au clic sur le lien `Plus d'informations`, appeler l'API `https://pokeapi.co/api/v2/pokemon/{id}` pour aller chercher d'autres informations

- les types du pokémon (`types`)
- les différents `sprites` (images) et les afficher (balise `img`)

#### English version

Let's get some data from a far more complex API : [a pokemon API](https://pokeapi.co/docs/v2)

First, let's get the list of pokemons from the first generation : [https://pokeapi.co/api/v2/generation/1/](https://pokeapi.co/api/v2/generation/1/).
We will get the property `pokemon_species` and get all of its content (warning, we will receive informations for 150 pokemons).
Once the list received and used, get informations about their parents (from property `evolves_from_species`) and display the french name of all of them (both the pokemon and its parents).

Display every element of the list like this:

```html
<section data-id="{id}" data-url="{url}">
    <h2>{name}</h2>
    {name} est une évolution de <span data-parent-url="{parentUrl}">{parent}</span>
    <a href="" class="more">Plus d'informations</a>
</section>
```

replace the values: 
- `{id}` with the pokemon's id
- `{url}` with the url that gives you informations on this pokemon
- `{name}` pokemon's french name
- `{parent}` parent pokemon's french name
- `{parentUrl}` with the url that gives you informations on this pokemon

##### Go further

When the `Plus d'informations` link is clicked, call the API `https://pokeapi.co/api/v2/pokemon/{id}` to get more informations :

- pokemon's types (`types`)
- get every available images `sprites` and display them (use an `img` node)
