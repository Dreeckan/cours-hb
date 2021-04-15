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

JSON accepte les valeurs suivantes :

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
let jsonPlayer = {"name":"Tango","hp":100,"strength":10,"defense":5};

let player = JSON.parse(jsonPlayer);
```

## Faire des appels AJAX

Nous pouvons facilement créer des appels AJAX, avec JQuery ou l'API Fetch de VanillaJS. L'idée est de demander le contenu d'une page ou un retour d'API (du contenu en JSON) et le traiter dans notre page. L'intérêt est, le plus souvent, de récupérer des informations stockés sur un autre site web pour les afficher sur le nôtre (mais sachez que l'on peut tout aussi bien envoyer des données pour les stocker/traiter).

### En Vanilla JS avec Fetch

[Documentation formelle](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API) et [documentation pratique](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch)
Un [cours complet de Pierre Giraud](https://www.pierre-giraud.com/javascript-apprendre-coder-cours/api-fetch/) sur le sujet

La fonction `fetch()` prend en paramètre obligatoire l'URL du serveur à contacter et, comme paramètre optionnel un objet de configuration (qui inclue la méthode HTTP à utiliser, GET par défaut). Cette fonction retourne une promesse qui contient la réponse (brute, non utilisable) du serveur. On peut alors la convertir à l'aide des méthodes suivantes pour la traiter :

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
    .then(function(response) {
        return response.json();
    }) 
    // Une fois la réponse convertie en JSON, 
    // on la récupère dans le paramètre data, 
    // et nous pouvons l'exploiter. 
    // Ici, on l'affiche dans un console.log
    .then(function(data) {
        console.log(data);
    })
    // Si un problème survient dans l'une des étapes précédentes
    // L'erreur est attrapée par la méthode catch
    // et envoyée dans le paramètre error
    // Ici, on l'affiche dans un console.log
    .catch(function(error) {
        console.log(error);
    });

```

### Avec JQuery

[Documentation](https://api.jquery.com/jquery.ajax/)

JQuery a été mis en avant surtout pour cette fonctionnalité. À une époque où l'API Fetch n'existait pas, JQuery proposait une méthode simple et très efficace pour construire les requêtes AJAX. Aujourd'hui encore, elle reste ma préférée. 
Pour les curieux, je vous laisse chercher des tutos sur XMLHttpRequest, si vous aimez vous faire du mal ;) .

Je ne vais vous montrer ici que la méthode `$.ajax()`, mais sachez qu'il existe 2 autres méthodes `$.get()` et `$.post()` qui peuvent encore réduire la taille de votre code.
Cette méthode attend un argument, un objet de configuration. Voici un exemple des paramètres les plus utilisés :

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
    success: function(response) {
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
- Récupérer les fichiers nécessaires à l'exercice et ajoutez-les à votre projet (au même niveau que votre HTML et votre JS)
  - [Un fichier HTML](/asset/exercice-ajax-html.html)
  - [Un fichier JSON contenant une donnée](/asset/exercice-ajax-single.json)
  - [Un fichier JSON contenant un tableau de données](/asset/exercice-ajax-tab.json)
- Nous allons faire 3 requêtes AJAX pour modifier notre HTML et/ou créer des noeuds dans notre page
  - Une première, pour récupérer le HTML et l'intégrer dans le body (on le récupère avec `$.ajax` ou `fetch()` et on l'ajoute en tant que contenu à notre noeud `body`)
  - Nous allons ensuite récupérer chaque fichier JSON (`exercice-ajax-single.json` et `exercice-ajax-tab.json`), récupérer les données, et créer des éléments pour les afficher dans notre DOM. Chaque fichier contient un ou des objets `player` et nous allons nous servir de ces données pour ajouter des `<li>` dans la liste que nous avons importé dans le premier appel AJAX.
    - Pour chaque objet dans le fichier JSON, créer un noeud `li` de cette forme :
```html
<li data-name="player1" data-hp="125" id="player1" data-strength="2" data-defense="12">
    Le joueur player1 a 125 points de vie, 2 points de force et 12 points de défense.
</li>
```

#### Indices

- Le fichier `exercice-ajax-single.json` contient un objet (JSON) avec les informations nécessaire. Il nous faut récupérer la donnée (et la convertir au format JSON si vous utilisez `fetch`) et créer un noeud HTML avec les données qu'elle contient.
- Le fichier `exercice-ajax-tab.json` contient un tableau JSON, avec plusieurs objets qu'il va falloir traiter de la même manière (le fonctionnement va être très similaire, il y aura juste une boucle autour ;) )

### Utiliser une API pour récupérer des données complexes

[API Météo](https://api.meteo-concept.com/documentation)