# Un script PHP

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/2b0103e886da43269245ba58934e0065" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Les fichiers de PHP ont l'extension `.php` et peuvent contenir du HTML aussi bien que du PHP. Un script PHP (que ce soit un fichier entier ou une portion de code) se trouve entre `<?php` et `?>`.

Un exemple de Php dans un fichier HTML :

```html
<html lang="fr">
    <body>
        <h1>Un fichier d'exemple</h1>

        <p>
            Affichage de la date :
            <?php echo date('d/m/Y H:i:s'); ?>
        </p>
    </body>
</html>
```

Dans un fichier PHP seul :

```php
<?php
    echo '<p>';
    echo date('d/m/Y H:i:s');
    echo '</p>';
```

## Commentaires

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/3250bf737da7426194f22493a53f32b4" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Vous pouvez ajouter des éléments en commentaire : visible uniquement dans le code source, et non dans le rendu final.
L'intérêt est de donner des informations supplémentaires aux autres développeurs (ou au "vous" du futur) sur ce que fait le code, prévenir de certains problèmes, etc.

```php
// Une ligne de texte commenté, vous pouvez mettre n'importe quoi

/*
 * Un commentaire multiligne
 */
```

## Variables

La [documentation PHP](https://www.php.net/manual/fr/language.variables.php)

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/49e12ca2e66c4ac8b79f705921d35e28" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Une variable sert à contenir une valeur. Le but de la variable est de nous permettre de manipuler cette valeur (opérations mathématiques, la transmettre plus loin dans le code, etc.)

```php
// Ici on parle de déclaration (on définit le nom de la variable)
// et d'initialisation (on lui donne une valeur de départ)
$unNombre = 0;

// On peut modifier la valeur contenue dans notre variable de différentes manières,
// comme des opérations mathématiques, dont voici quelques raccourcis
$unNombre++; // $unNombre = $unNombre + 1;
$unNombre += 2; // $unNombre = $unNombre + 2;
$unNombre *= 3; // $unNombre = $unNombre * 3;

$unTexte = 'Un texte';

// L'opérateur . permet de concaténer 2 chaînes de caractères
$unTexte .= ' de test'; // $unTexte = $unTexte . ' de test';
```

## Constantes

La [documentation PHP](https://www.php.net/manual/fr/language.constants.php)

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/07b90132b4a14729b9a98c31d0d76828" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Nous n'allons pratiquement pas nous servir de ces constantes dans ce cours, mais il est utile de savoir comment les utiliser (pour un site Wordpress, par exemple).

Une constante est toujours écrite en screaming snake case (tout en majuscule, les mots séparés par des `_`). Comme une variable, une constante contient une valeur, mais qui **ne peut pas être modifiée**.

L'intérêt est de conserver en mémoire une valeur qui peut être utilisée à plusieurs endroits dans le code (nom d'éléments par page dans des listes, un texte répété à travers le site, etc.) et que l'on veut éviter de répéter.

```php
// Déclaration et initialisation d'une constante
define("UNE_CONSTANTE", "et sa valeur");

// Utilisation de la valeur de la constante
echo UNE_CONSTANTE;
```

## Types

La [documentation PHP](https://www.php.net/manual/fr/language.types.php)

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/f9aa8834e50f41e1af97a3ab7443dffe" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

-   integer `12` pour représenter les nombres (entiers)
-   float `25.45` pour représenter les nombres à virgule
-   string `'un texte'` ou `"un texte"` pour représenter les textes
-   bool `true` ou `false` pour représenter les valeurs logiques (booléennes)
-   null `NULL` ou `null` pour représenter une valeur vide
-   array `[1, 2, 3]` pour représenter des ensembles de données (en Php, les données sont quelconques, elles n'ont pas besoin d'être du même type)
-   Object `new PDO()` pour représenter des données plus complexes

### Tableaux

La [documentation PHP sur les tableaux](https://www.php.net/manual/fr/book.array.php)

En PHP, les entrées des tableaux peuvent être de types différents

```php
$monTableau = array(1, '2', 3.2, new Object());
$monTableau = [1, '2', 3.2, new Object()]; // La syntaxe courte, à préférer
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

-   Accéder à une entrée

On utilise alors l'index correspondant à la ligne qu'on veut récupérer.

```php
$mesProduits = [
    0           => 'foo',
    1           => 'bonnet en coton',
    'uneEntrée' => 2,
];

$unProduit = $mesProduits[0];
$unAutreProduit = $mesProduits['uneEntrée'];
```

-   Ajouter une entrée

```php
$mesProduits = [
    0           => 'foo',
    1           => 'bar',
    'uneEntrée' => 2,
];

// On peut ajouter une entrée à un index précis
$mesProduits[2] = 'un texte de test';
// ou dire à PHP de gérer l'index (ici, le texte sera ajouté à l'index 2)
$mesProduits[] = 'un texte de test';
```

Note : le dernier exemple ci-dessus (`$mesProduits[] = $value`) est équivalent à `.push(value)` de Javascript. Un index numérique est calculé (PHP récupère le dernier index numérique, et l'incrémente pour avoir le nouvel index) et `$value` est ajouté à cet index.

-   Modifier une entrée

```php
$mesProduits = [
    0           => 'foo',
    1           => 'bar',
    'uneEntrée' => 2,
];

// On modifie l'élément à l'index 0
$mesProduits[0] = 'no more foo';
```

-   Supprimer une entrée

```php
$mesProduits = [
    0           => 'foo',
    1           => 'bar',
    'uneEntrée' => 2,
];

unset($mesProduits[0]);
```

-   Fonctions utiles

```php
$mesProduits = [
    0           => 'foo',
    'vide'      => false,
    1           => 'bar',
    'uneEntrée' => 2,
];

// renvoie true si l'entrée existe
$test = isset($mesProduits[0]);// true
$test = isset($mesProduits[666]); // false

// renvoie true si l'entrée n'est pas définie ou est une valeur vide (0, '', null, [], false, etc.)
$test = empty($mesProduits[0]); // false
$test = empty($mesProduits['vide']); // true


// supprimer une entrée
unset($mesProduits[0]);

// compter le nombre d'éléments dans un tableau
$compte = count($mesProduits);
```
