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