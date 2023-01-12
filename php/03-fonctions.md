# Procédures et fonctions

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/238d4e8be4d741a08b5fa2fa5fdd2e70" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

- Fonction : fonction avec des arguments (ou non) retournant un résultat avec l'opérateur `return`
- Procédure : fonction ne retournant aucun résultat

Par défaut, les paramètres n'ont pas de type (et peuvent prendre n'importe lequel sans erreur).

```php
// exemple de procédure
function foo()
{
    echo 'un exemple';
}

// exemple de fonction
// Noter que $argument a une valeur par défaut à 1
function doubleIt($argument = 1)
{
    return $argument * 2;
}

// exemple de fonction avec typage
function doubleItWithTypes(float $argument = 1): float
{
    return $argument * 2;
}

// exemple de fonction avec typage, pouvant également être null
function doubleItWithTypes(?float $argument = 1): ?float
{
    if (empty($argument)) {
        return null;
    }
    return $argument * 2;
}
```

Idéalement, il est utile d'ajouter des commentaires (annotations) pour préciser des éléments supplémentaires (types des paramètres et des retours, etc.). En php, on ne peut pas (encore) donner plusieurs types à un paramètre ou un retour et on ne peut que le faire avec une annotation.

```php
/**
 * @param $argument int|float On précise ici que $argument peut être un entier ou un flottant
 * @return int|float On précise que la fonction retourne un entier ou un flottant
 */
function doubleIt($argument = 1)
{
    return $argument * 2;
}

/**
 * @param int|null $argument
 * @return int
 */
function doubleItInt(?int $argument = 1): int
{
    if (empty($argument)) {
        return 0;
    }
    return $argument * 2;
}
```

Appeler des fonctions :

```php
function doubleIt($argument = 1)
{
    return $argument * 2;
}

echo doubleIt(); // Renvoie 2

echo doubleIt(8); // Renvoie 16
```

### Fonctions anonymes

Dans certains cas, vous aurez besoin des fonctions anonymes : des fonctions que vous déclarez pour l'utiliser directement.

```php
<?php
$tab = [1, 2, 3, 5, 6, 89, 8, 357, 68, 5, 3];

// ATTENTION, on passe $element par référence,
// c'est-à-dire qu'on va le modifier pendant le parcours
array_walk($tab, function (&$element) {
    // $element contient l'élément du tableau actuellement traité
    // On le modifie (ce qui n'aurait pas été possible sans le passage par référence)
    $element *= 2;
});
```

Comme toute fonction PHP, aucune valeur extérieure ne peut être appelée, mais on peut contourner ce souci grâce au mot-clé `use` !

```php
<?php
$tab = [1, 2, 3, 5, 6, 89, 8, 357, 68, 5, 3];

// Cette fois, on va multiplier chaque élément du tableau
// par un nombre $nb défini en dehors de la fonction
$nb = 3;

// On peut injecter la variable $nb dans la fonction anonyme
// avec le mot-clé use
array_walk($tab, function (&$element) use ($nb) {
    $element *= $nb;
});
```


## Portée des variables

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/ddcfe05047c144ea8226f79568384aba" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

```php
$a = 1; // Disponible dans l'espace de nom par défaut, disponible partout, hors fonctions

function doubleIt($argument = 1)
{
    // Ici, on ne peut pas appeler $a
    $b = $argument;
    
    return $b * 2;
}
// $b et $argument ne sont disponibles que dans la fonction et n'existent pas ici
```

On peut déclarer une variable comme globale, à n'importe quel endroit du code. Elle sera disponible après que le code ait été exécuté (un peu comme `var` en Javascript).

```php
$a = 1; // Disponible dans l'espace de nom par défaut, disponible partout, hors fonctions

function foo($argument) {
    global $c;
    $c = $argument + 42;
}

foo($a);
echo $c; // affichera 43, $c est explicitement déclarée comme globale
```

### Variables $GLOBALS

Il est possible, dans une fonction, d'accéder aux variables définies globalement, mais c'est fortement déconseillé :

```php
$a = 1;
$b = 2;

function somme() {
    return $GLOBALS['a'] + $GLOBALS['b'];
}

echo somme(); // affichera 3
```


## Récursivité

En vidéo : 

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/59999a8438d04c9f909a3b2d3919eba4" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Une fonction qui s'appelle elle-même :

```php
function recursive($argument = 1) {
    $current = $argument;
    if ($current < 5) {
        $current = recursive($current + 1);
    }
    
    return $current; // cette fonction va invariablement finir par renvoyer,
    // sauf si l'argument contient un nombre plus grand
}
```
