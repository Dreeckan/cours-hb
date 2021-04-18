# Programmation orientée objet

Jusqu'ici, nous avons codé nos programmes de manière procédurale. C'est-à-dire que le code se trouve dans l'ordre de son exécution (le code est exécuté ligne par ligne). En POO (Programmation Orientée Objet), tout s'articule autour de la notions d'objets : des éléments indépendants ayant leurs caractéristiques (appelées propriétés) et leurs fonctionnalités (appelées méthodes). 

## Pourquoi la POO ?

La programmation orientée objet permet plusieurs choses :

- une plus grande flexibilité du code (modifier une classe permet de modifier le comportement de tous les objets d'un coup)
- une meilleure lisibilité (un objet regroupe toutes les caractéristiques et les fonctionnalités dont il a besoin)
- une meilleure maintenabilité (pas besoin de copier-coller des éléments à plusieurs endroits du code et la logique est plus facile à retrouver)

## Mise en pratique

Dans certains exercices de ce cours, j'ai utilisé ce qu'on appelle des objets littéraux. Un exemple d'**objet littéral**, qui va nous servir d'exemple pour la suite :

```js
let player = {
    hp: 10, // On a ici une propriété de notre objet
    name: 'Dreeckan',
    strength: 5,
    defense: 10,
    isAlive: function() { // Et ici une méthode
        return this.hp > 0;
    }
};
```

### Créer une classe et des objets

Maintenant, si nous voulons créer d'autres objets `Player`, basés sur le même modèle, nous pouvons créer une **classe**, un **plan de fabrication** pour des objets.
Pour définir cette classe, commençons par l'essentiel : son nom. On l'écrit en `PascalCase` (c’est-à-dire sans espace entre les mots, avec une majuscule à chaque mot). 

```js
// Définition d'une classe
class Player {
    // Ici, nous ajouterons nos propriétés et méthodes
}
```

Une fois que nous avons notre classe, nous pouvons créer des objets (on parle d'instances de la classe `Player`) à partir de ce plan de fabrication. Pour le faire, nous allons utiliser le mot-clé `new` :

```js
let player1 = new Player();
let player2 = new Player();
```

### Le constructeur

Nous pouvons définir ce qu'il se passe lors de l'appel de ce `new` et, si on le souhaite, lui donner des paramètres. Pour cela, nous ajoutons une méthode spéciale, **le constructeur**.