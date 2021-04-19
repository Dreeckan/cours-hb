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

## Les timers

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
