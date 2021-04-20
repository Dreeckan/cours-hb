# Outils utiles

## Déclencher du code une fois la page chargée

Pour que notre code Javascript ne se déclenche pas avant que le reste de la page ne soit chargé, plusieurs moyens existent (inclure nos script juste avant la fermeture du `<body>` par exemple). Malheureusement, ce n'est pas toujours fiable. Pour s'assurer que notre DOM soit chargé avec l'exécution de notre JS :

```js
// On ajoute un event listener sur le document (la page) pour s'assurer que le DOM est chargé
// avant d'exécuter le moindre code.
document.addEventListener("DOMContentLoaded", function () {
    // Nous allons mettre tout notre code js ici
    // On peut déclarer des variables ou des fonctions en dehors, 
    // mais tout ce qui est exécuté (appel de fonctions, utilisation du DOM, etc.)
    // doit être ici
});
```

La même chose avec JQuery

```js
$(document).ready(function () {
    // Nous allons mettre tout notre code js ici
    // On peut déclarer des variables ou des fonctions en dehors, 
    // mais tout ce qui est exécuté (appel de fonctions, utilisation du DOM, etc.)
    // doit être ici
});
```

## LocalStorage / SessionStorage

[Documentation](https://developer.mozilla.org/fr/docs/Web/API/Web_Storage_API)

Ces deux fonctionnalités fonctionnent de la même manière, à une différence près : la durée de persistance des données dans le navigateur.
- localStorage stocke les éléments durablement (ils sont conservés même plusieurs jours après, alors que le navigateur a été fermé)
- sessionStorage stocke les éléments le temps de la session (dès que le navigateur est fermé, les données sont supprimées)

Les deux fonctionnalités stockent les éléments dans un structure ressemblant à un tableau. 
- On peut y ajouter des éléments avec la méthode `.setItem('nomDeLItem', 'valeurAssociée')`
- On peut y récupérer des éléments avec la méthode `.getItem('nomDeLItem')`
- On peut y supprimer des éléments avec la méthode `.removeItem('nomDeLItem')`
- On peut en effacer tout le contenu avec la méthode `.clear()`

La valeur que l'on souhaite stocker doit être une valeur textuelle. Nous allons donc le plus souvent devoir convertir nos éléments en JSON (avec `JSON.stringify()` par exemple).

```js
// On stocke un élément durablement
localStorage.setItem('test', 'uneValeurDeTest');

// On affiche cet élément
console.log(localStorage.getItem('test')); // Affiche "uneValeurDeTest"


// On stocke un élément pour la durée de la session
sessionStorage.setItem('test', 'uneValeurDeTest');

// On affiche cet élément
console.log(sessionStorage.getItem('test')); // Affiche "uneValeurDeTest"
```

## Les timers

### Les intervalles

[Documentation](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)

Un intervalle permet de répéter une action à intervalle régulier (toutes les secondes par exemple). Nous allons utiliser la fonction `setInterval()` pour ce genre d'opération. Elle attend 2 paramètres :
- L'action à répéter (une fonction de callback ou une fonction anonyme)
- Le délai (en millisecondes)

```js
// On peut récupérer l'identifiant de l'interval, pour nous permettre de l'arrêter un jour, par exemple.
let idInterval = setInterval(
    function() {
        console.log(`Il s'est passé 1 seconde depuis mon dernier appel`);
    },
    1000 // Une seconde, en millisecondes
);

// Arrête l'exécution de l'intervalle
clearInterval(idInterval);
```

### Les comptes à rebours

[Documentation](https://developer.mozilla.org/fr/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout)

À l'opposé, le compte à rebours permet d'attendre un temps (en millisecondes) avant d'effectuer une action. On utilise la fonction `setTimeout()` qui prend également 2 paramètres :
- L'action à exécuter (une fonction de callback ou une fonction anonyme)
- Le délai (en millisecondes)

```js
// On peut récupérer l'identifiant du compte à rebours, pour nous permettre de l'arrêter avant son exécution, par exemple.
let idTimeout = setTimeout(
    function() {
        console.log(`Je me suis exécuté après 10 secondes d'attente`);
    },
    10000 // 10 secondes, en millisecondes
);

// Arrête l'exécution du compte à rebours
clearTimeout(idTimeout);
```

## Manier les dates en JS

[Documentation](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Date)

L'objet `Date` permet de manipuler les dates, via diverses méthodes.

### Créer un objet date

```js
// Sans argument, cet objet contient la date du jour
let now = new Date();

// Crée un objet contenant la date du 21/04/2021
let soon = new Date('2021-04-21');

// Crée un objet contenant la date du 21/04/2021 à 13h00
let soonWithHour = new Date('2021-04-21T13:00:00');
```

### Récupérer des informations sur la date

- `.getDate()` retourne le jour du mois (entre 1 et 31)
- `.getDay()` retourne le jour de la semaine (entre 0 et 6, 0 étant dimanche et 6 samedi)
- `.getMonth()` retourne le mois (entre 0 et 11, 0 pour janvier et 11 pour décembre)
- `.getFullYear()` retourne l'année (2021 au moment de l'écriture de ce cours)
- `.getHours()` retourne l'heure (entre 0 et 23)
- `.getMinutes()` et `.getSeconds()` retourne les minutes et les secondes
- [etc.](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Date#m%C3%A9thodes_des_instances)

```js
// Sans argument, cet objet contient la date du jour
let now = new Date();

console.log(now.getDate() + '/' + parseInt(now.getMonth() + 1) + '/' + now.getFullYear() + " " + now.getHours() + ':' + now.getMinutes());// Affiche la date actuelle (21/04/2021 09:30 par exemple)
console.log(now.toLocaleString()); // Pour récupérer une date formatée selon la langue en cours
```
