# Programmation orientée objet

Jusqu'ici, nous avons codé nos programmes de manière procédurale. C'est-à-dire que le code se trouve dans l'ordre de son exécution (le code est exécuté ligne par ligne). En POO (Programmation Orientée Objet), tout s'articule autour de la notions d'objets : des éléments indépendants ayant leurs caractéristiques (appelées propriétés) et leurs fonctionnalités (
appelées méthodes).

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
    isAlive: function () { // Et ici une méthode
        return this.hp > 0;
    }
};
```

### Créer une classe et des objets

Maintenant, si nous voulons créer d'autres objets `Player`, basés sur le même modèle, nous pouvons créer une **classe**, un **plan de fabrication** pour des objets. Pour définir cette classe, commençons par l'essentiel : son nom. On l'écrit en `PascalCase` (c’est-à-dire sans espace entre les mots, avec une majuscule à chaque mot).

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

### Constructeur et propriétés

Les propriétés sont les caractéristiques de notre objet. Dans le cas de notre `Player`, cela peut être :

- ses points de vie,
- son nom,
- sa force,
- sa défense,
- toute autre caractéristique qui nous permettrait de le définir pour notre programme...

Nous pouvons définir ce qu'il se passe lors de l'appel de ce `new` et, si on le souhaite, lui donner des paramètres. Pour cela, nous ajoutons une méthode spéciale, **le constructeur**. Cette méthode est appelée **automatiquement** dès que l'on crée un nouvel objet avec `new`.

```js
// Un exemple de constructeur pour notre objet Player, sans paramètres

class Player {
    constructor() {
        // Ici this équivaut à demande l'objet Player en cours (celui qu'on a créé/instancié avec new)
        // On définit des propriétés et des valeurs par défaut
        // et on peut alors donner n'importe quelle valeurs à nos propriétés
        this.name = "";
        this.hp = 100;
        this.strength = 5;
        this.defense = 10;
    }
}

// Si on fait un new, sans paramètre, les propriétés sont bien définies et contiennent les valeurs demandées
let player1 = new Player();
// On peut accéder à une propriété de la même manière que nous l'avons vu avec les objets littéraux
console.log(player1); // Affiche Player {name: "", hp: 100, strength:5, defense: 10}

// On peut aussi accéder aux propriétés ou les modifier
player1.hp = 110;
console.log(player1.hp); // Affiche 110
```

Pour pouvoir créer un objet avec des valeurs, on donne des paramètres au constructeur :

```js
// Un exemple de constructeur pour notre objet Player, avec des paramètres
// Les 3 derniers ont des valeurs par défaut 
// (si on ne leur donne pas de valeur, ils prennent leur valeur par défaut)

class Player {
    constructor(name, hp = 100, strength = 10, defense = 10) {
        // Attention à ne pas confondre this.name et name
        // La première est une propriété de l'objet Player qu'on instancie
        // La seconde est une variable : le paramètre du constructeur
        this.name = name;
        this.hp = hp;
        this.strength = strength;
        this.defense = defense;
    }
}

// Si on fait un new, sans paramètre, les propriétés sont bien définies et contiennent les valeurs demandées
let player2 = new Player('Test', 125, 11);
console.log(player2.name); // Affiche "Test"
console.log(player2.strength); // Affiche 11
// ...

```

### Les méthodes

Les méthodes correspondent aux capacités ou aux actions que peut réaliser notre objet, c'est une fonction, dans une classe, même si elle ne porte pas le mot-clé `function`.

```js
class Player {
    constructor(name, hp = 100, strength = 10, defense = 10) {
        this.name = name;
        this.hp = hp;
        this.strength = strength;
        this.defense = defense;
    }

    // Notre Player sait s'il est en vie. C'est utile à notre programme ;) .
    isAlive() {
        return this.hp > 0;
    }

    // Une méthode peut également avoir des paramètres, 
    // comme n'importe quelle fonction
    isStrongerThan(strengthToCompare) {
        return this.Strength > strengthToCompare;
    }

    // Une méthode nous permet de réaliser divers calculs,
    // et contenir la logique de notre objet.
    // Ici, on peut dire ce qu'il se passe quand notre joueur prend un coup
    takeHit(strength) {
        let damage = strength - this.defense;
        if (damage > 0) {
            this.hp -= damage;

            return damage;
        }

        return 0;
    }

    attack(otherPlayer) {
        // On peut utiliser les méthodes d'un autre objet Player, 
        // s'il est passé en paramètre
        let damageDealt = otherPlayer.takeHit(this.strength);

        return damageDealt;
    }
}
```

Un petit exemple de programme, utilisant notre objet `Player` précédent :

```js
// Un premier joueur, avec toutes les valeurs par défaut
let player1 = new Player('Joueur1');
// Un second joueur, dont on définit les propriétés à l'aide du constructeur
let player2 = new Player('Joueur2', 125, 11, 5);

let damage = player1.attack(player2);
console.log(player1.name + ' inflige ' + damage + ' points de dégats à ' + player2.name);
```