# Introduction à PHP

PHP est un langage à la fois procédural et orienté objet. 
Pour l'utiliser, nous aurons besoin d'un serveur, pour interpréter notre code : il sera lu et interprété en une page HTML après exécution et renvoyé via http(s).

PHP est principalement utilisé pour la création de sites webs, mais peut également servir pour des outils en ligne de commande.

La [documentation de PHP, un resource essentielle](https://www.php.net/manual/fr/) et disponible en français.

## Environnement de travail

Nous allons travailler avec [Wamp](https://sourceforge.net/projects/wampserver/files/latest/download) pour avoir un serveur Apache, MySQL, PHP et PhpMyAdmin sur notre Windows. Tout ce que nous allons voir fonctionne aussi avec [Xampp](https://www.apachefriends.org/fr/index.html), [Mamp](https://www.mamp.info/en/downloads/) ou un équivalent.

Pour l'utiliser convenablement, nous allons devoir travailler dans le dossier `www` de Wamp (`C:\wamp64\www` par défaut). Nous y créerons différents dossiers pour qu'ils soient accessibles simplement : si nous créons un dossier `exercices-php`, son contenu sera disponible sur [http://localhost/exercices-php/](http://localhost/exercices-php/).

## Un script PHP

Les fichiers de PHP ont l'extension `.php` et peuvent contenir du HTML aussi bien que du PHP. Un script PHP (que ce soit un fichier entier ou une portion de code) se trouve entre `<?php ` et ` ?>`.

Un exemple dans un fichier HTML : 

```html
<html lang="fr">
    <body>
        <h1>Un fichier d'exemple</h1>
    
        <p>Affichage de la date : <?php echo date('d/m/Y H:i:s'); ?></p>
    </body>
</html>
```

Dans un fichier PHP seul :

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

- integer `12`
- float `25.45`
- string `'un texte'` ou `"un texte"`
- bool `true` ou `false`
- Null `NULL` ou `null`
- array `[1, 2, 3]`
- Object `new PDO()`

### Tableaux

La [documentation PHP sur les tableaux](https://www.php.net/manual/fr/book.array.php)

En PHP, les entrées des tableaux peuvent être de types différents

```php
$monTableau = array(1, '2', 3.2);
$monTableau = [1, '2', 3.2]; // La syntaxe courte, à préférer
```

Et il en va de même pour les clés

```php
$mesProduits = [
    0           => 'foo',
    1           => 'bonnet en coton',
    'uneEntrée' => 2,
];
```

### Manipuler les tableaux

- Accéder à une entrée

```php
$mesProduits = [
    0           => 'foo',
    1           => 'bonnet en coton',
    'uneEntrée' => 2,
];

$unProduit = $mesProduits[0];
$unAutreProduit = $mesProduits['uneEntrée'];
```

- Ajouter une entrée

```php
$mesProduits = [
    0           => 'foo',
    1           => 'bar',
    'uneEntrée' => 2,
];

$mesProduits[2] = 'un texte de test';
// ou
$mesProduits[] = 'un texte de test';
```

- Modifier une entrée

```php
$mesProduits = [
    0           => 'foo',
    1           => 'bar',
    'uneEntrée' => 2,
];

$mesProduits[0] = 'no more foo';
```

- Supprimer une entrée

```php
$mesProduits = [
    0           => 'foo',
    1           => 'bar',
    'uneEntrée' => 2,
];

unset($mesProduits[0]);
```

- Fonctions utiles

```php
$mesProduits = [
    0           => 'foo',
    1           => 'bar',
    'uneEntrée' => 2,
];

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

- `a == b` pour tester si les valeurs de `a` et `b` sont égales
- `a === b` pour tester si les valeurs de `a` et `b` sont égales **et** de même type
- `a != b` pour tester si les valeurs de `a` et `b` sont différentes
- `a !== b` pour tester si les valeurs de `a` et `b` sont différentes **ou** de type différent
- `a > b` pour tester si la valeur de `a` est strictement supérieure à celle de `b`
- `a >= b` pour tester si la valeur de `a` est supérieure ou égale à celle de `b`
- `a < b` pour tester si la valeur de `a` est strictement inférieure à celle de `b`
- `a <= b` pour tester si la valeur de `a` est inférieure ou égale à celle de `b`

### Boucles

#### foreach

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

var_dump($elements); // Affichera [3, 5, 14, 44]
```

#### for et while

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

## Procédures et fonctions

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
// Noter que $arguement a une valeur par défaut à 1
function doubleIt($argument = 1)
{
    return $argument * 2;
}

// exemple de fonction avec typage
function doubleItWithTypes(float $argument = 1): float
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

- GET et POST permettent de récupérer des actions de l'utilisateur ponctuellement (soumission d'un formulaire, suivi d'un lien avec des paramètres, etc.)
- Sessions et cookies, permettent de retenir des données à plus ou moins long terme
  - Les sessions durent par défaut 20 minutes ou jusqu'à la fermeture du navigateur
  - Les cookies durent pour la plupart entre 1 mois et 1 an (ou n'ont pas de limite de durée)

### Des valeurs dans l'url

- Valeurs se trouvant dans l'url `index.php?bonnet=Classe&matiere=cachemire&logo=`
- Commence par `?` et séparées par des `&`, format `cle=valeur`
- Vous pouvez les récupérer dans la superglobale `$_GET`:

```php
echo $_GET['bonnet']; // Classe
echo $_GET['matiere']; // cachemire
echo $_GET['logo']; // ''
```

### Des valeurs envoyées par un formulaire

- Valeurs généralement envoyées par un formulaire
- les clés du tableau correspondent à l'attribut `name` de vos champs HTML (`input`, `textarea`, `select`, etc.)
- Vous pouvez les récupérer dans la superglobale `$_POST`

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

### La session

[La documentation PHP](https://www.php.net/manual/fr/book.session.php)

- Sert à conserver des informations d'une page à l'autre, jusqu'à fermeture du navigateur (ou 1440 secondes par défaut)
- Appeler la fonction `session_start()` au début de toutes les pages pour que la session fonctionne correctement
- le contenu de la session se trouve dans la variable superglobale `$_SESSION`
- On peut y ajouter/modifier/supprimer des éléments en modifiant ce tableau

### Les cookies

[La documentation PHP](https://www.php.net/manual/fr/features.cookies.php)

- Servent à conserver des informations sur une durée plus longue
- Peuvent être un problème de sécurité selon les informations stockées. En effet, s'ils contiennent des données sensibles, celles-ci sont stockées (par défaut) dans un fichier texte dans l'ordinateur de l'utilisateur.
- On peut créer un cookie avec la fonction `setCookie()` ([documentation](https://www.php.net/manual/fr/function.setcookie.php))
- Récupérer le ou les cookies dans la variable superglobale `$_COOKIE`