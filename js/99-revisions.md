# Révisions

Un ensemble d'exercices pour revoir un peu tous les éléments abordés dans le cours.

Créer un fichier `revisions.html` (avec le squelette HTML de base) et y associer un fichier `revisions.js`. Nous allons travailler dans ces deux fichiers, sauf instructions contraires.

## Syntaxe et bases du langage

Dans `revisions.js` :

- Écrire une fonction `square()` qui calcule le carré d'un nombre `n` (soit le calcul `n * n`) et le retourne
  - Écrire 2 appels de cette fonction et afficher le résultat dans la console du navigateur

- Écrire une fonction `compact()` qui prend 2 paramètres (`a` et `b` par exemple) et qui retourne un tableau composé de ces deux paramètres.
  - Écrire 2 appels de cette fonction et afficher le résultat dans la console du navigateur

- Créer un tableau contenant les valeurs `42`, `'test'`, `242.68`
- Retourner l'index de la valeur `'test'` à l'aide d'une méthode des tableaux vue en cours

- Créer un objet (littéral) ayant :
  - la propriété `a` avec pour valeur `42`
  - la propriété `b` avec pour valeur `test`
  - une méthode `fusion` renvoyant la concaténation de `a` et de `b`
- Appeler la méthode `fusion()` et vérifier le résultat

## Conditions et boucles

- Écrire une fonction `greaterThan()` qui prend deux paramètres `a` et `b`
  - Cette fonction doit retourner le plus grand des deux nombres
  - Si l'un des deux n'est pas un nombre, afficher une erreur dans la console et retourner 0
  
- Écrire une fonction qui trie un tableau de nombres :
  - prend en paramètre un tableau (qui contient des nombres, normalement)
  - renvoie un nouveau tableau, avec les éléments dans l'ordre croissant (du plus petit au plus grand) 
  - Tester avec `[11, 2, 54, 50, 26, 8, 91, 011, 15]`
  

## English version

Let's practice everything we saw ;).

Create a file named `revisions.html` (with base html skeleton) and link it to a new file, named `revisions.js`. We will mostly work in these two files (unless specified, off course).

## Language

In `revisions.js` :

- Write a `square()` function. It will compute the square value of a number `n` (`n * n`) and return the result
  - Write 2 calls of this function and display its result in the console

- Écrire une fonction `compact()` qui prend 2 paramètres (`a` et `b` par exemple) et qui retourne un tableau composé de ces deux paramètres.
  - Write 2 calls of this function and display its result in the console

- Create an array with these values: `42`, `'test'`, `242.68`
- Use a method seen to find the value `'test'` and to display its index in the console

- Create a literal object with:
  - a property `a` with a value: `42`
  - a property `b` with a value: `test`
  - a method named `fusion` returning the fusion of `a` and `b`
- Call the `fusion()` method and check the result
