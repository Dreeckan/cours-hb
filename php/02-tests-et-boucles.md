# Tests et boucles

La [documentation PHP](https://www.php.net/manual/fr/language.control-structures.php)

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/e378ba3c78a145f9b75d814f71eb02af" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>


## Conditions

```php
$variable = 1;

if ($variable == 0) {
    echo 'ok';
} elseif ($variable == -1) {
    echo 'ok aussi';
} else {
    echo 'pourquoi pas ?';
}
```

Equivalent à :

```php
$variable = 1;

switch ($variable) {
    case 0:
        echo 'ok';
        break;
    case -1:
        echo 'ok aussi';
        break;
    default:
        echo 'pourquoi pas ?';
        break;
}
```

### Condition ternaire

Une variante "courte" existe pour les conditions simples.

```php
// Avant le ?, on met notre condition (les parenthèses ne sont pas obligatoires)
// Après le ?, l'instruction à exécuter si la condition est vraie
// Après le :, l'instruction à exécuter si la condition est fausse
($variable === 1) ? echo 'ok' : echo 'pas ok';
```

### Opérateurs courants

- `a == b` pour tester si les valeurs de `a` et `b` sont égales
- `a === b` pour tester si les valeurs de `a` et `b` sont égales **et** de même type
- `a != b` pour tester si les valeurs de `a` et `b` sont différentes
- `a !== b` pour tester si les valeurs de `a` et `b` sont différentes **ou** de type différent
- `a > b` pour tester si la valeur de `a` est strictement supérieure à celle de `b`
- `a >= b` pour tester si la valeur de `a` est supérieure ou égale à celle de `b`
- `a < b` pour tester si la valeur de `a` est strictement inférieure à celle de `b`
- `a <= b` pour tester si la valeur de `a` est inférieure ou égale à celle de `b`
- `a instanceof Object` pour tester si `a` est un Objet de type `Object`

## Boucles

### foreach

Une boucle particulière, permettant de facilement parcourir un tableau (ou un objet `iterable`).

```php

$elements = [1, 3, 12, 42];

foreach ($elements as $key => $value) {
    // 0 : 1 pour la première itération
    // 1 : 3 pour la deuxième
    // ...
    echo $key.' : '.$value;
}
```

Pour modifier `$value` et voir ces modifications appliquer dans le tableau `$elements`, il suffit d'un passage par référence.

```php
$elements = [1, 3, 12, 42];

foreach ($elements as $key => &$value) {
    $value = $value + 2;
}

// Ce qui est équivalent à
foreach ($elements as $key => $value) {
    $elements[$key] = $value + 2;
}

var_dump($elements); // Affichera [3, 5, 14, 44]
```

### for et while

Ces deux boucles sont assez classiques et fonctionnent comme dans beaucoup d'autres langages

```php
$elements = [1, 3, 12, 42];

for ($i = 0; $i < count($elements); $i++) {
    $elements[$i] += 2;
}

var_dump($elements); // Affichera [3, 5, 14, 44]

$j = 0;
while ($j < count($elements)) {
    $elements[$i] += 2;
    $j++;
}

var_dump($elements); // Affichera [5, 7, 16, 46]
```
