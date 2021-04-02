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

