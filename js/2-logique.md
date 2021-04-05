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

## Concaténation

En javascript, pour assembler 2 chaînes de caractères, on utilise l'opérateur `+` (le comportement de cet opérateur change selon le type des données)

```js
console.log("test" + 42); // Affiche "test42"
console.log("77" + 7); // Affiche "777"

let name = "world";
console.log("Hello " + name + "!"); // Affiche "Hello world!"
```

## Manière moderne (ES6)

La chaîne se met entre anti-quotes et la chaîne à insérer se place dans les accolades : `${}`

```js
let name = "world";
let string = `Hello ${name}!`;
console.log(string); // Affiche Hello world!
```
