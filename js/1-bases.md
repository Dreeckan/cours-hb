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
function test() {
    // on la modifie dans une fonction (elle ne sera modifiée que lors de l'appel de cette fonction)
    test = 'test2';
}

console.log(test); // affiche 'test'
test();
console.log(test); // affiche 'test2'
```

- Une variable locale
```js
function test() {
    // On déclare une variable locale, elle n'est disponible que dans la fonction
    let test = 'test1';
}

console.log(test); // "Error: test is not defined" car la variable n'existe pas dans le contexte global
```

- utiliser une variable locale et une variable globale ayant le même nom
```js
// On défini une variable test dans le contexte global
let test = 'test';
function test() {
    // on la modifie dans une fonction (elle ne sera modifiée que lors de l'appel de cette fonction)
    let test = 'test2';
    console.log(test) // affiche 'test2'
}

console.log(test); // affiche 'test'
test(); // le console.log() de la fonction est appelé et 'test2' est affiché
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


