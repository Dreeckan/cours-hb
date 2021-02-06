# PHP Procédural

- Introduction et installation d'environnement
- De l'algorithme au site
- Procédures et fonctions
- Interagir avec l'utilisateur

Plusieurs jeux d'exercice ont été préparés :
- [Créons un site de vente de bonnets, très basique](exercices.md)
- [Des exercices de révision](https://github.com/Dreeckan/exercices-php/blob/main/revisions.md) pour revoir les grands principes

## Théorie du PHP

- Conçu en 1994 par Rasmus Lerdorf
- Langage 
  - procédural ou objet (souvent entre deux),
  - interprété,
  - a besoin d'un serveur (Apache par exemple)
- Principalement pour le web (mais aussi CLI)
- La [documentation PHP](https://www.php.net/manual/fr/langref.php), votre meilleure amie

## Environnement de travail

Nous allons (dans un premier temps) utiliser Wamp ou Xampp

Plus tard, nous pourrons utiliser (optionnellement) : 
- Vagrant
- Docker
- L'exécutable de Symfony

## Un fichier php

- Délimiter un script php
- Du php dans le html (et vice versa)


```html
<html lang="fr">
    <body>
        <h1>Un fichier d'exemple</h1>
    
        <p>Affichage de la date : <?php echo date('d/m/Y H:i:s'); ?></p>
    </body>
</html>
```

```php
<?php
    echo '<p>';
    echo date('d/m/Y H:i:s');
    echo '</p>';
?>
```

## Variables

La [documentation PHP](https://www.php.net/manual/fr/language.variables.php)

```php
$unNombre = 0;
$unNombre++; // $unNombre = $unNombre + 1;
$unNombre += 2; // $unNombre = $unNombre + 2;
$unNombre *= 3; // $unNombre = $unNombre * 3;

$unTexte = 'Un texte';
$unTexte .= ' de test'; // $unTexte = $unTexte . ' de test';
```

## Types

La [documentation PHP](https://www.php.net/manual/fr/language.types.php)

- Entier `12`
- Flottant `25.45`
- Chaîne de caractères `'un texte'` ou `"un texte"`
- Booléen `true` ou `false`
- Null `NULL` ou `null`
- Tableau `[1, 2, 3]`
- Objet `new PDO()`

## Tableaux

La [documentation PHP sur les tableaux](https://www.php.net/manual/fr/book.array.php)

```php
$monTableau = array(1, 2, 3);
$monTableau = [1, 2, 3]; // à préférer
```

```php
$mesProduits = [
    0           => 'bonnet en laine',
    1           => 'bonnet en coton',
    'la classe' => 'bonnet en cachemire',
];
```

### Manipuler les tableaux

- Accéder à une entrée

```php
$mesProduits = [
    0           => 'bonnet en laine',
    1           => 'bonnet en coton',
    'la classe' => 'bonnet en cachemire',
];

$unProduit = $mesProduits[0];
$unAutreProduit = $mesProduits['la classe'];
```

- Ajouter une entrée

```php
$mesProduits = [
    0           => 'bonnet en laine',
    1           => 'bonnet en laine bio',
    'la classe' => 'bonnet en laine et cachemire',
];

$mesProduits[2] = 'bonnet arc-en-ciel';
// ou
$mesProduits[] = 'bonnet arc-en-ciel';
```

- Modifier une entrée

```php
$mesProduits = [
    0           => 'bonnet en laine',
    1           => 'bonnet en laine bio',
    'la classe' => 'bonnet en laine et cachemire',
];

$mesProduits[0] = 'bonnet en laine pas bio';
```

- Supprimer une entrée

```php
$mesProduits = [
    0           => 'bonnet en laine',
    1           => 'bonnet en laine bio',
    'la classe' => 'bonnet en laine et cachemire',
];

unset($mesProduits[0]);
```

- Fonctions utiles

```php
// renvoie true si l'entrée existe
$test = isset($mesProduits[0]); 
// renvoie true si l'entrée n'est pas définie ou est une valeur vide (0, '', null, [], etc.)
$test = empty($mesProduits[0]); 
// supprimer une entrée
unset($mesProduits[0]);
// compter le nombre d'éléments dans un tableau
$compte = count($mesProduits); 
```

## Tests et boucles

La [documentation PHP](https://www.php.net/manual/fr/language.control-structures.php)

- conditions (`if`, `else`, `elseif`, `switch`)
- boucles (`for`, `foreach`, `while`)

### Conditions

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
    case 1:
        echo 'ok aussi';
        break;
    default:
        echo 'pourquoi pas ?';
        break;
}
```

#### Opérateurs courants

```php
$a = 1; 
$b = '1';

$a == $b; // true
$a === $b; // false

$a != $b; // true
$a !== $b; // true

$a < $b; // false
$a <= $b; // false
$a > $b; // false
$a >= $b; // false
```

## Procédures et fonctions

- Fonction : fonction avec des arguments (ou non) retournant un résultat avec l'opérateur `return`
- Procédure : fonction ne retournant aucun résultat

```php
// exemple de procédure
function foo()
{
    echo 'un exemple';
}

// exemple de fonction
// Noter que $arguement a une valeur par défaut à 1
function doubleIt($argument = 1)
{
    return $argument * 2;
}

// exemple de fonction avec typage
function doubleIt(float $argument = 1): float
{
    return $argument * 2;
}
```

```php
function doubleIt($argument = 1)
{
    return $argument * 2;
}

echo doubleIt(); // Renvoie 2

echo doubleIt(8); // Renvoie 16
```

## Portée des variables

```php
$a = 1; // Portée globale, disponible partout, hors fonctions

function doubleIt($argument = 1)
{
    // Ici, on ne peut pas appeler $a
    $b = $argument;
    
    return $b * 2;
}
// $b et $argument ne sont disponibles que dans la fonction et n'existent pas ici
```

```php
$a = 1; // Portée globale, disponible partout, hors fonctions

function foo($argument) {
    global $c;
    $c = $argument + 42;
}

foo($a);
echo $c; // affichera 43, $c est explicitement déclarée comme globale
```

### Variables $GLOBALS

Il est possible, dans une fonction, d'accéder aux variables définies globalement :

```php
$a = 1;
$b = 2;

function somme() {
    return $GLOBALS['a'] + $GLOBALS['b'];
}

echo somme(); // affichera 3
```

## Récursivité

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

## Interagir avec l'utilisateur

- GET et POST, récupérer des actions de l'utilisateur
- Sessions et cookies, retenir des données

## GET

- Valeurs se trouvant dans l'url `index.php?bonnet=Classe&matiere=cachemire&logo=`
- Commence par `?` et séparées par des `&`, format `cle=valeur`
- Vous pouvez les récupérer dans la superglobale `$_GET`:
```php
echo $_GET['bonnet']; // Classe
echo $_GET['matiere']; // cachemire
echo $_GET['logo']; // ''
```

## POST

- Valeurs envoyées par un formulaire
- les clés du tableau correspondent à l'attribut `name` de vos champs
- Vous pouvez les récupérer dans la superglobale `$_POST`

## POST (exemple)

```html
<form action="" method="POST">
    <label for="matiere">Matière de votre bonnet</label>
    <input type="text" name="matiere" id="matiere" value="cachemire">
    <input type="submit" name="boutonValidation" value="Valider">
</form>
```

```php
echo $_POST['matiere']; // cachemire
echo $_POST['boutonValidation']; // Valider
```

## La session

[La documentation PHP](https://www.php.net/manual/fr/book.session.php)

- Sert à conserver des informations d'une page à l'autre, jusqu'à fermeture du navigateur (ou 1440 secondes)
- Appeler la fonction `session_start()` au début de toutes les pages
- le contenu de la session se trouve dans la variable superglobale `$_SESSION`
- On peut y ajouter des éléments en modifiant cette variable 

## Les cookies

[La documentation PHP](https://www.php.net/manual/fr/features.cookies.php)

- Servent à conserver des informations sur une durée plus longue
- Conservés sur l'ordinateur de l'utilisateur, par défaut
- Peuvent être un problème de sécurité