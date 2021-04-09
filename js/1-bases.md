# Les bases du langage

## Les types de valeur

Il n'y a que 7 types de valeur possible en JS, réparties en 2 groupes.

### Les valeurs primitives

- `undefined` est attribuée à toutes les valeurs manquantes (non intentionnelles, vous ne définissez pas cette valeur vous-même)
- `null` est attribuée pour les valeurs manquantes (intentionnelles, vous la définissez vous-même)
- `true` (vrai) et `false` (faux), appelés booléens, servent aux opérations logiques
- les nombres (`0`, `32`, `-12`, `42.42`)
- les chaînes de caractères (`"test"`, `'test'`, `"Un texte un peu plus long"`) pour représenter les textes

### Objets et fonctions

- les objets (dont le plus simple est `{}`, mais nous en verrons bien d'autres) servent à grouper des données
- les fonctions pour faire référence à du code

### Déterminer le type d'une valeur

La fonction `typeof()` renvoie une chaîne de caractères contenant le type. Quelques exemples : 

```js
typeof(42) // "number"
typeof("Test") // "string"
typeof("42") // "string"
```

### Transformer certaines valeurs

Plusieurs fonctions permettent de changer le type d'une valeur :
- `parseInt()` pour convertir une chaîne de caractères en nombre entier ([documentation sur parseInt()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/parseInt))
- `parseFloat()` pour convertir une chaîne de caractères en nombre flottant ([documentation sur parseFloat()](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/parseFloat))

## Les variables

Une variable est un élément qui **pointe** vers une valeur, et n'est pas une valeur. On dit qu'une variable "contient" une valeur.

Elle peut contenir une valeur de n'importe quel type vu précédemment (et en changer pendant notre programme si besoin).

### Déclarer une variable et affecter une valeur

```js
let uneVariable = 'test';
var uneVariable = 'test';
```

Deux façons de faire : 
- `let` : introduit en javascript 2015, c'est la méthode à préférer. La portée de cette variable est strictement restreinte à son bloc (voir plus loin, sur la portée des variables).
- `var` : l'ancienne méthode, qui fonctionne toujours. La portée de cette variable n'est pas restreinte à son bloc (voir plus loin, sur la portée des variables).

On peut déclarer une variable en l'initialisant avec une valeur (ou non), ou en déclarer plusieurs sur une même ligne. Quelques exemples :

```js
// On déclarer une variable sans lui donner de valeur (elle contient la valeur null)
let uneVariable;
uneVariable = 'test'; // on affecte une valeur

// Ces deux lignes peuvent être condensées en une seule :
let uneVariable = 'test';

// Déclarer plusieurs variables sur une même ligne :
let uneVariable, uneAutreVariable = 'test', encoreUneVariable;
```

## Les constantes

Les constantes sont très proches des variables, mais il faut **impérativement** leur donner une valeur au moment de leur déclaration et cette valeur **ne pourra pas être changée par la suite** (d'où le nom de constante ;) ). On les déclare avec le mot-clé `const` et, par convention, les constantes sont écrites tout en majuscules et les mots séparés par des underscores (`_`).

```js
const UNE_CONSTANTE = 'test';
```

## Contexte et portée des variables

Le contexte d'exécution est une entité regroupant des informations sur un code exécutable.
Quand un script JavaScript est exécuté, un contexte d'exécution **global** est créé.
Ensuite, **chaque appel de fonction crée un nouveau contexte d'exécution associé à cette fonction**.
Chaque contexte peut ainsi contenir des variables ayant le même nom mais ne faisant pas référence à la même valeur, chacune dépendant de son propre contexte.

On peut résumer ceci en disant que le contexte global représente l'entièreté du script. 
- Toute variable définie en dehors d'une fonction ou d'une structure de contrôle est dite globale.
- Toute variable définie dans une fonction ou structure de contrôle est dite locale et ne sera pas disponible dans le contexte global.

Quelque exemple pour rendre ça plus clair :

- Une variable globale
```js
// On défini une variable test dans le contexte global
let test = 'test';
function testFonction() {
    // on la modifie dans une fonction (elle ne sera modifiée que lors de l'appel de cette fonction)
    test = 'test2';
}

console.log(test); // affiche 'test'
testFonction();
console.log(test); // affiche 'test2'
```

- Une variable locale
```js
function testFonction() {
    // On déclare une variable locale, elle n'est disponible que dans la fonction
    let test = 'test1';
}

console.log(test); // "Error: test is not defined" car la variable n'existe pas dans le contexte global
```

- utiliser une variable locale et une variable globale ayant le même nom
```js
// On défini une variable test dans le contexte global
let test = 'test';
function testFonction() {
    // on la modifie dans une fonction (elle ne sera modifiée que lors de l'appel de cette fonction)
    let test = 'test2';
    console.log(test) // affiche 'test2'
}

console.log(test); // affiche 'test'
testFonction(); // le console.log() de la fonction est appelé et 'test2' est affiché
console.log(test); // affiche 'test'
```

## Différences entre `let` et `var`

Jusqu'ici, vous auriez pu remplacer `let` par `var` dans tous les exemples, sans que cela n'ait de conséquences.
La différence se produit au niveau des blocs (c'est-à-dire les `if`, boucles, `switch`, etc.).
Si le code a été exécuté, alors le `let` n'existera que dans le bloc, alors qu'un `var` existera au niveau du contexte parent (local ou global).

```js
if (true) {
  let variableLet = "let";
  var variableVar = "var";
}

console.log(variableLet); //Affiche Error: variableLet is not defined
console.log(variableVar); //Affiche "var"
```

Dans l'exemple ci-dessus, `variableLet` n'existe pas en dehors du bloc (défini par le `if`), alors que `variableVar`, si.

Que se passe-t-il si vous déclarer une nouvelle variable avec le même nom dans une condition ? 

- Avec `var` :
```js
var test = 'test';

if (test === 'test') {
  var test = 42;

  console.log(test); // Affiche 42
}

console.log(test); // Affiche 42
```

- Avec `let` :
```js
var test = 'test';

if (test === 'test') {
  var test = 42;

  console.log(test); // Affiche 42
}

console.log(test); // Affiche 'test'
```

En conclusion : utiliser `let` vous permet un code plus propre, où les variables sont déclarés dans le contexte **et** dans les blocs où elles sont nécessaires (visuellement plus rapide à retrouver et moins de risques d'erreur). 

## Le mode strict de javascript

Le mode strict de javascript (ES5) vous permet d'utiliser une version plus restrictive (et vous forçant à écrire du code plus propre) de javascript. Ce mode :
- Élimine des erreurs silencieuses en les transformant en exceptions à l'exécution du code
- Permet aux moteurs javascript des navigateurs d'effectuer des optimisations sans entraves (et donc votre code sera potentiellement plus rapide)

Pour s'en servir, commencez vos fichier `.js` par `"use strict";` ou `'use strict';`.

## Types de données complexes

### Les tableaux

[La documentation Mozilla sur les tableaux](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array).
[Introduction aux tableaux](https://developer.mozilla.org/fr/docs/Learn/JavaScript/First_steps/Arrays)

Un tableau est un ensemble de valeurs indexées. C'est-à-dire que pour chaque entrée du tableau (qui contient une valeur), un index y est associé et permet de le récupérer facilement.

Créer un tableau : 

```js
// Méthode courte
let tableau = [
    'test',
    42,
    99.99,
    [0]
];

// Méthode "longue" et strictement équivalente
let tableau = new Array(
    'test',
    42,
    99.99,
    [0]
);
```

Nous obtenons alors un tableau, indexé en 0 contenant nos valeurs.
- 0: 'test',
- 1: 42,
- 2: 99.99,
- 3: [0] (remarquez ici que l'on peut mettre n'importe quel type de valeur dans notre tableau)

On peut également compter le nombre d'éléments contenu dans un tableau à l'aide de la propriété `.length`.

```js
let tableau = [
    'test',
    42,
    99.99,
    [0]
];

console.log(tableau.length); // affiche 4
```

#### Vérifier si une valeur est dans le tableau (ou une string)

La méthode `indexOf` permet de vérifier l'existence d'un ou plusieurs caractères dans un tableau ou une chaîne de caractères. 
Elle retourne un nombre correspondant à l'index (la position) de la valeur. Si cette valeur n'est pas présente, la méthode renvoie `-1`.

```js
let array = [
    'test',
    42,
    99.99,
    [0]
];

console.log(array.indexOf(42)); // Affiche 1 (cette valeur est à l'index 1)
console.log(array.indexOf('test2')); // Affiche -1 (cette valeur n'est pas dans le tableau)

let string = "Une chaine de caractère plutôt longue, avec plein de mots et de lettres dedans.";

console.log(string.indexOf('carac')); // Affiche 14 (existe à la position 14, soit la 15ème lettre)
console.log(string.indexOf('fmdoskjmlskj')); // Affiche -1 (n'est pas dans la chaîne)
console.log(string.indexOf('c')); // Affiche 3 (existe à la position 3, soit la 4ème lettre)

```


### Les objets

Une [liste des objets déjà définis dans Javascript](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects).

Les objets sont une structure de données complexe nous permettant de regrouper des valeurs tout en créant nos propres index (nommés propriétés). 

```js
// Méthode courte
let student = {
    firstname: "Test",
    lastname: "Ouille",
    number: "42"
};

// Méthode "longue" et strictement équivalente
let student = new Object();
student.firstname = "Test";
student.lastname = "Ouille";
student.number = "42";
```

Dans le cadre d'un objet, on ne parle pas d'index mais de propriété. Une propriété n'est pas une variable, elle n'existe que dans l'objet et il faut donc renseigner l'objet auquel elle appartient.

```js
// pour afficher le nom de famille, qui est à la propriété lastname
console.log(student.lastname); // "Ouille"

// on peut aussi l'écrire de cette façon là
console.log(student["lastname"]); // "Ouille"
```

### Les fonctions

[La documentation sur les fonctions de Mozilla](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/function)

#### Déclaration

Les fonctions contiennent du code (un groupe d'instructions) qui ne s'exécute que lorsque la fonction est appelée. On leur donne un nom, des paramètres (optionnels) et un corps. Une fonction peut être déclarée n'importe où dans le code, et peut même être appelée avant d'être déclarée.

```js
// Un appel de fonction, dont on met le résultat (retourné par le mot-clé return) dans une variable.
let somme = sum(42, 73);

// La déclaration, incluant le nom de la fonction et ses 2 paramètres
function sum(number1, number2) {
    // Ici est le corps de la fonction
    let result = number1 + number2;
    
    return result; // cette fonction retourne une valeur, qui peut être utilisée plus tard lorsqu'on appelle la fonction
}
```

Comme pour les variables, on utilise (par convention) des noms de fonction clairs (indiquant leur utilité), écrites en camel case et en anglais (pas d'accent ni caractères spéciaux dans le nom).

#### Les paramètres

Les [paramètres](https://developer.mozilla.org/fr/docs/Glossary/Parameter) (les noms dans les parenthèses de la fonction) sont des variables qui vont servir dans la fonction, dont les valeurs seront définies lors de l'appel de la fonction.

Dans l'exemple précédent, `number1` est un paramètre et contient la valeur `42` lors de l'appel de l'exemple. On dit que 42 est un argument de `sum` (c'est-à-dire une valeur qu'on donne à la fonction).

Un paramètre peut être optionnel et on peut lui donner une valeur par défaut (si aucun argument n'est fourni pour lui donner une valeur).

```js
function sum(number1, number2 = 0) {
    return number1 + number2; // Revient à renvoyer number1 + 0 si number2 n'est pas défini
}

sum(42); // renvoie 42
```

#### Les instructions

Le but premier d'une fonction est d'exécuter une série d'instructions (qui ne s'exécutent que lorsque la fonction est appelée). Ces instructions peuvent utiliser les variables des paramètres, en créer de nouvelles (toute variable déclarée n'existera pas en dehors de la fonction), etc.

#### Renvoyer une valeur 

Envoyer une valeur n'est pas obligatoire, mais peut se révéler utile, selon les cas. 
On va en général retourner (avec le mot-clé `return`) le résultat d'un calcul (ou de diverses opérations).

```js
function sum(number1, number2 = 0) {
    return number1 + number2; 
}
let total = sum(42, 73); // Renvoie 115
let total2 = sum(2, 3); // Renvoie 5
```

#### Les fonctions anonymes

Comme leur nom l'indique, les fonctions anonymes n'ont pas de nom. En général, ces fonctions sont utilisées une fois dans le code. Nous en verrons des exemples tout au long de ce cours, même s'il est préférable de créer une fonction nommée.

#### Les fonctions fléchées

Depuis la version 2015 de javascript, on peut utiliser des fonctions à la syntaxe plus courte, avec quelques différences importantes :
- La syntaxe change
- leur place dans le code est importante (il faut les déclarer **avant** de les appeler)
- le contexte dans la fonction est le même qu'à l'extérieur de la fonction

```js
let sum = (number1, number2) => {
    return number1 + number2;
}
```

Il existe même une écriture plus courte dans ce cas (si la fonction ne contient qu'une seule instruction avec un `return`) :

```js
let sum = (number1, number2) => number1 + number2;
```

## Quand mettre un point-virgule ?

Un certain nombre d'instructions se finissent pas un point-virgule `;`, mais pas toute. 
La plus courante, l'affectation (`a = x;`) se termine toujours par un `;`. 
Les instructions contenant des accolades `{}`, comme les conditions, les boucles, etc. ne prennent pas de `;`.

Pour aller plus loin, [un article très intéressant sur les `;` en js](https://jeremymouzin.com/blog/les-points-virgules-en-javascript-le-guide-definitif/)
