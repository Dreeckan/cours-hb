# Manipulation logique

## Opérateurs arithmétiques

Les opérations disponibles :

- Addition `+` (attention, cet opérateur sert également à la concaténation de chaînes de caractères)
```js
let result = 1 + 1;
console.log(result); // Affiche 2

result = result + 2; // Ajoute 2 à result
result += 2; // Ajoute 2 à result
result++; // Ajoute 1 à result
```

- Soustraction `-`
```js
let result = 10 - 1;
console.log(result); // Affiche 9

result = result - 2; // Enlève 2 à result
result -= 2; // Enlève 2 à result
result--; // Enlève 1 à result
```

- Division `/`
```js
let result = 10 / 2;
console.log(result); // Affiche 5

result = result / 2; // Divise result par 2
result /= 2; // Divise result par 2
```

- Multiplication `*`
```js
let result = 10 * 2;
console.log(result); // Affiche 20

result = result * 2; // Multiplie result par 2
result *= 2; // Multiplie result par 2
```

- Modulo `%` (reste de la division d'un nombre par un autre)
```js
let result = 5 % 4; // le reste de la division de 5 / 4 vaut 1
result = result % 2; // le reste de 1 par 2 vaut 1
result %= 2; // Idem
```

## Comparaisons

Une comparaison est une opération dont le résultat est un booléen (`true` ou `false`) :
- `true` si la comparaison / le test est vrai
- `false` si la comparaison / le test est faux

Les opérateurs de comparaison : 

- `a == b` pour tester si les valeurs de `a` et `b` sont égales
- `a === b` pour tester si les valeurs de `a` et `b` sont égales **et** de même type
- `a != b` pour tester si les valeurs de `a` et `b` sont différentes
- `a !== b` pour tester si les valeurs de `a` et `b` sont différentes **ou** de type différent
- `a > b` pour tester si la valeur de `a` est strictement supérieure à celle de `b`
- `a >= b` pour tester si la valeur de `a` est supérieure ou égale à celle de `b`
- `a < b` pour tester si la valeur de `a` est strictement inférieure à celle de `b`
- `a <= b` pour tester si la valeur de `a` est inférieure ou égale à celle de `b`

### Vérifications de type

Différentes fonctions fournies par Javascript permettent de tester le type d'une valeur (et retournent un booléen) :
- `isNaN(x)` vérifie si la variable `x` contient une valeur autre qu'un nombre (retourne `true` si `x` n'est pas un nombre).
- `isInteger(x)` vérifie si la variable `x` contient une valeur de type nombre entier (nombre sans virgule : retourne `true` si c'est le cas).
- `Array.isArray(x)` retourne `true` si `x` est un objet de type `Array`
- Beaucoup d'autres à découvrir ;) .

## Opérateurs logiques

Les opérateurs logiques permettent d'obtenir une valeur booléenne à partir d'autres valeurs booléennes.
- `&&` est un "et" logique : il renvoie `true` si (et seulement si) la valeur à gauche **et** la valeur à droite valent `true`
- `||` est un "ou" logique : il renvoie `true` si la valeur à gauche **ou** la valeur à droite vaut `true`
- `!` est une négation : il renvoie `true` si la valeur (notée après) vaut `false` et renvoie `false` si la valeur vaut `true`

Une table de vérité :

| a     | b     | | !a    | `a && b` | `a || b` | 
| ----- | ----- |-| ----- | -------- | -------- |
| false | false | | true  | false    | false    |
| false | true  | | true  | false    | true     |
| false | true  | | true  | false    | true     |
| true  | false | | false | false    | true     |
| true  | true  | | false | true     | true     |

## Concaténation

En javascript, pour assembler 2 chaînes de caractères, on utilise l'opérateur `+` (le comportement de cet opérateur change selon le type des données)

```js
console.log("test" + 42); // Affiche "test42"
console.log("77" + 7); // Affiche "777"

let name = "world";
console.log("Hello " + name + "!"); // Affiche "Hello world!"
```

### Manière moderne (ES6)

La chaîne se met entre anti-quotes et la chaîne à insérer se place dans les accolades : `${}`

```js
let name = "world";
let string = `Hello ${name}!`;
console.log(string); // Affiche Hello world!
```

## Conditions

Ces structures de contrôle nous permettent d'exécuter des instructions si certains pré-requis sont vérifiés (sinon, ils ne s'exécuteront pas et le code continuera).

### If

La condition `if` est un "si" : "Si cette condition est vraie, alors faire les instructions suivantes".

```js
let test = false;
let test2 = true;

// Dans les parenthèses de notre if, l'expression devra renvoyer un booléen
// Si ce booléen vaut true, une alerte sera affichée
// Dans les deux cas, le code après le if est exécuté
if (test && test2) {
    alert('conditions respectées');
}
console.log('fin');
```

On peut également donner des instructions à exécuter si la condition du `if` n'est pas respectée avec un `else` (sinon) :

```js
// On demande à l'utilisateur de saisir une réponse à la question
let answer = prompt("Êtes-vous là ? Répondre 'oui' ou 'yes'.");
// Si la réponse de l'utilisateur (contenue dans la variable "answer") est égale à "oui" ou "yes",
// alors on rentre dans la condition
if ( (answer == "oui") || (answer == "yes") ) {
    alert("Vous êtes là !"); // On affiche une alerte
} else {
    // Si la condition du if n'est pas respectée, on affiche une autre alerte
    alert("Dommage, un gâteau vous attendais...");
}
console.log('fin');
```

On peut également vérifier plusieurs conditions (plus précises) d'affilée :

```js
let answer = prompt("Êtes-vous là ? Répondre 'oui' ou 'yes'.");

// Si la réponse est oui, on affiche une alerte en français
if (answer == "oui") {
    alert("Vous êtes ici !");
} else if (answer == "yes") {
    // Si la réponse est yes, on affiche une alerte en anglais
    alert("You are here!");
} else {
    // Si la condition du if n'est pas respectée, on affiche une autre alerte
    alert("Dommage, un gâteau vous attendais...");
}
console.log('fin');
```

### Switch

Si vous voulez faire plusieurs `else if` (en général au dela de 3 ou 4), il devient intéressant d'utiliser le `switch`. Cette structure vous permet de vérifier la valeur contenue dans une variable et d'appeler des instructions en fonction.

Attention, le switch fait une comparaison avec l'opérateur `===` et vérifie donc également le type de la valeur.

```js
let answer = prompt("Êtes-vous là ? Répondre 'oui', 'yes' ou 'да'.");

switch (answer) {
    case 'oui': // équivaut à answer === 'oui' 
        alert("Vous êtes ici !");
        // Ce break permet de sortir du switch, une fois les instructions 
        // au dessus réalisées. S'il n'est pas là, le script continu et 
        // exécute les instructions du case suivant
        break;
    case 'yes':
        alert("You are here!");
        break;
    case 'да':
        alert("Вы здесь!");
        break;
    default: // équivaut à else et n'est pas obligatoire
        alert("Dommage, un gâteau vous attendais...");
        break;
}
console.log('fin');
```

Faire un "ou" dans un switch :

```js
let answer = prompt("Êtes-vous là ? Répondre 'oui', 'yes' ou 'да'.");

switch (answer) {
    case 'oui': 
    case 'yes': 
    case 'да':
        // Dans les trois cas, nous affichons le même message
        alert("Vous êtes ici !");
        break;
    default: // équivaut à else et n'est pas obligatoire
        alert("Dommage, un gâteau vous attendais...");
        break;
}
console.log('fin');
```

### Ternaire

La condition ternaire est simplement un `if...else` en une seule ligne. Il se structure ainsi :

`condition ? instruction si true : instructions si false`

```js
// On demande à l'utilisateur de saisir une réponse à la question
let answer = prompt("Êtes-vous là ? Répondre 'oui'.");

// Si answer vaut oui, on affiche "Vous êtes ici !", sinon "Dommage, un gâteau vous attendais..."
answer == 'oui' ? alert("Vous êtes ici !") : alert("Dommage, un gâteau vous attendais...");

console.log('fin');
```

## Boucles

Les boucles sont le plus souvent utilisées pour parcourir des ensembles de données, comme les tableaux.

3 éléments sont essentiels dans une boucle :
- une initialisation (un contexte de départ, pour entrer dans la boucle)
- une condition de sortie (on doit pouvoir sortir de la boucle)
- un pas (à quel vitesse parcourt-on la boucle ? Parcourt-on tous les éléments ?)

Nous allons voir comment parcourir le tableau suivant de différente manière :

```js
let tab = [
    'test',
    42,
    'truc',
    99.99
];
```

### While

On peut traduire `while` par "Tant que". Cette boucle prend une condition et exécute les instructions dans son corps tant que cette condition est respectée.

Parcourons toutes les valeurs de `tab` :

```js
// On crée un compteur, qui vous nous permettre de savoir
// où nous en sommes dans le parcours de notre tableau
let i = 0;

// On récupère la longueur du tableau (nombre d'éléments)
// et on le parcourt tant que i est plus petit 
// que le nombre d'éléments du tableau 
while (i < tab.length) {
    console.log(`L'index ${i} de tab vaut ${tab[i]}`);
    
    // Si on oublie cette incrémentation, on ne sort jamais de notre boucle...
    i++;
}
```

### for

Avec un boucle `for`, on définit directement un compteur, sa valeur maximum (cas d'arrêt) et sa progression (ou incrémentation) :

```js
for (let i = 0; i < tab.length; i++) {
    console.log(`L'index ${i} de tab vaut ${tab[i]}`);
}
```

### for...of

La boucle `for...of` permet de récupérer directement la valeur de l'élément en cours, sans avoir à passer par `tab[i]` :

```js
// J'utilise à nouveau un compteur, pour afficher le numéro de la ligne.
let i = 0;

// Bien entendu, vous nommez votre variable comme vous le souhaitez,
// pas forcément element.
for (let element of tab) {
    console.log(`L'index ${i} de tab vaut ${element}`);
    i++;
}
```

### forEach

La foreach fonctionne un peu comme la boucle `for...of` si ce n'est qu'elle utilise une fonction qui récupère en paramètre la valeur de la ligne du tableau au passage de la boucle :

```js
// J'utilise à nouveau un compteur, pour afficher le numéro de la ligne.
let i = 0;

tab.forEach(function(element) {
    console.log(`L'index ${i} de tab vaut ${element}`);
    i++;
});
```

La même chose avec une fonction fléchée :

```js
// J'utilise à nouveau un compteur, pour afficher le numéro de la ligne.
let i = 0;

tab.forEach((element) => {
    console.log(`L'index ${i} de tab vaut ${element}`);
    i++;
});
```

## Exercice 1 : utiliser les conditions et les fonctions

Une petite calculatrice de montant TTC à partir du HT :

- On va demander un montant HT (hors taxe) à l'utilisateur (avec la fonction `prompt`)
- si ce que l'utilisateur a entré n'est pas un nombre (utiliser la fonction [isNaN()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/isNaN), afficher un message d'erreur avec `alert()`
- sinon, calculer le montant TTC selon la formule suivante : `montantTTC = montantHT * 1.2`


## Exercice 2 : les boucles 

### 2.1. Liste d'animaux

- Créer un tableau de données contenant les données suivantes (chaque ligne peut être un tableau ou un objet)

      Animal : Chat | Nom : Lily
      Animal : Chien | Nom : Tango
      Animal : Poisson | Nom : Maurice
      Animal : Vache | Nom : Françoise
      Animal : Raton | Nom : Rocket

- Parcourir le tableau et générer l'affichage ci-dessus pour chacun des 4 types de boucle :
  1. while
  2. for
  3. for...of
  4. forEach
  
### 2.2. Afficher des nombres pairs

- Demander à l'utilisateur un nombre à l'aide de la fonction `prompt()`
  - Ce nombre doit être compris entre 10 et 100. Si ça n'est pas le cas (ou si ça n'est pas un nombre), afficher un message d'erreur avec la fonction `alert()`
- Afficher tous les nombres entiers pairs entre 2 et ce nombre à l'aide de `console.log()` et d'une boucle (à vous de voir laquelle)
  
### 2.3. Trouver le mot le plus court/long

- Créer un tableau avec les mots suivants :
  - Cucurbitacée
  - Landau
  - Chatons
  - Morceau
  - Gâteau
  - Pâtisserie
- Écrire une fonction renvoyant le mot de plus court et appeler cette fonction (afficher le résultat dans un `console.log()`)
- Écrire une fonction renvoyant le mot de plus long et appeler cette fonction (afficher le résultat dans un `console.log()`)
