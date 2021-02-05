# PSR et PHP Doc

- PSR 
- Application pratique
- PHP Doc
- Trouver dans la doc... Et ailleurs

## PSR 1, 2/12 et 4

Des **normes** d'écriture et de rangement de notre code  

- [PSR-1](https://www.php-fig.org/psr/psr-1/) donne des normes d'écriture de base
- [PSR-2](https://www.php-fig.org/psr/psr-2/) est une extension de PSR-1 (Dans les faits, il faut suivre [PSR-12, plutôt que PSR-2](https://www.php-fig.org/psr/psr-12/))
- [PSR-4](https://www.php-fig.org/psr/psr-4/) pour le rangement des classes et leur auto-chargement (autoloading)

Sources : [PHP-fig](https://www.php-fig.org/), [nouvelle-techno.fr](https://nouvelle-techno.fr/actualites/bonnes-pratiques-php-psr-1-et-psr-4)

## PSR-1

- Les fichiers ne doivent utiliser que `<?php` ou `<?=` pour déclarer du code php
- Le code doit être encodé en UTF-8
- Les fichiers doivent soit déclarer des symboles, soit créer des effets de bord, mais pas les deux
- Espaces de nom et classes doivent suivre une norme PSR d'auto-chargement
- Les noms de classe doivent être au format `PascalCase`
- Les méthodes et fonctions au format `camelCase` 

### Balises php

- Nous n'utilisons que les balises `<?php` et `?>` pour entourer notre code PHP, restons là-dessus ;)
- D'autres existent : 
    - `<?` fonctionne dans certains (vieux) projets et sont déconseillées
    - `<?=` "balises echo courtes" fonctionnent toujours et permettent de faire un `echo` du code qu'elles contiennent
- La norme PSR-1 recommande `<?php` et `<?=` uniquement 

### Code en UTF-8

L'encodage des fichiers en UTF-8 permet d'éviter des problèmes de compatibilité entre les différents OS, navigateurs et serveurs. Une valeur à vérifier dans votre éditeur de code.

### Effets des fichiers

Les fichiers php doivent soit déclarer des symboles (classes, fonctions, constantes, etc.), soit avoir un effet de bord (afficher du html, modifier la configuration de php, etc.), mais ne doivent pas faire les deux.

Il s'agit en fait de compartimenter ce qui tient de la déclaration et ce que modifie l'affichage / le serveur. En somme, séparer les resources et le concret.

#### Un exemple à éviter

```php
<?php
// side effect: change ini settings
ini_set('error_reporting', E_ALL);

// side effect: loads a file
include "file.php";

// side effect: generates output
echo "<html>\n";

// declaration
function foo()
{
    // function body
}
 
```

### Normes d'autoloading

Nous verrons la norme PSR-4 par la suite, mais elle doit être utilisée pour tous les projets utilisant des objets PHP.

### Nommage des classes

Le format `PascalCase` veut dire que tous les mots composant le nom de la classe doivent commencer par une majuscule et qu'il ne doit pas y avoir d'espace entre les mots.

Exemple : `PictureInformations` pour une classe de stockage des informations d'une image

### Nommage des fonctions

Pour les distinguer des classes et les rapprocher des variables, on utilise le `camelCase` (premier mot en minuscule, les suivants commençant par une majuscule) pour nommer fonctions, procédures et méthodes.

## PSR-12

- Le code doit respecter PSR-1
- Tous les fichiers doivent utiliser le format Unix pour les fins de ligne (LF)
- Tous les fichiers doivent se terminer par un seul LF
- `?>` ne doit pas apparaître à la fin d'un fichier ne contenant que du PHP
- Il ne doit pas y avoir de limite (dure) de nombre de caractères pour une ligne
- Idéalement, une ligne ne doit pas dépasser les 120 caractères
- Encore mieux : 80 caractères

### PSR-12 (suite)

- Aucun espace à la fin des lignes
- Des sauts de ligne sont autorisés pour faciliter la lisibilité du code sauf cas interdits
- Une seule instruction par ligne maximum
- L'indentation doit être composée de 4 espaces et non des tabulations
- Les mots réservés de PHP et les types doivent être en minuscule
- Les versions courtes de ces mots doivent être utilisés (`bool` au lieu de `boolean` par exemple)

```php
<?php

/**
 * Un exemple de classe PHP respectueux des CS
 */

declare(strict_types=1);

namespace Vendor\Package;

use Vendor\Package\{ClassA as A, ClassB, ClassC as C};
use Vendor\Package\SomeNamespace\ClassD as D;
use Vendor\Package\AnotherNamespace\ClassE as E;

use function Vendor\Package\{functionA, functionB, functionC};
use function Another\Vendor\functionD;

use const Vendor\Package\{CONSTANT_A, CONSTANT_B, CONSTANT_C};
use const Another\Vendor\CONSTANT_D;

/**
 * FooBar is an example class.
 */
class FooBar
{
    // ... additional PHP code ...
}
```

### PSR-12 (suite suite)

```php
<?php
function fooBarBaz($arg1, &$arg2, $arg3 = []): ?string
{
    // function body
}

```

### PSR-12 (suite suite suite)

```php
<?php

namespace Vendor\Package;

class ClassName
{
    public function aVeryLongMethodName(
        ClassTypeHint $arg1,
        &$arg2,
        array $arg3 = []
    ): ?string {
        // method body
    }
}

```

### Format des appels

```php
bar();
$foo->bar($arg1);
Foo::bar($arg2, $arg3);
 
$foo->bar(
    $longArgument,
    $longerArgument,
    $muchLongerArgument
);
```

### Format des appels (suite)

```php
somefunction($foo, $bar, [
  // ...
], $baz);

$app->get('/hello/{name}', function ($name) use ($app) {
    return 'Hello ' . $app->escape($name);
});
```

### Structures de contrôle (if, for, while, etc.)

```php
<?php

if (
    $expr1
    && $expr2
) {
    // if body
} elseif ($expr3) {
    // elseif body
} else {
    // else body;
}
```

### Switch

```php
switch ($expr) {
    case 0:
        echo 'First case, with a break';
        break;
    case 1:
        echo 'Second case, which falls through';
        // no break
    case 2:
    case 3:
    case 4:
        echo 'Third case, return instead of break';
        return;
    default:
        echo 'Default case';
        break;
}
```

### Opérateurs

```php
$i++;
++$j;
$intValue = (int) $input;

if ($a === $b) {
    $foo = $bar ?? $a ?? $b;
} elseif ($a > $b) {
    $foo = $a + $b * $c;
}

$variable = $foo ? $foo : 'bar'; // $variable = $foo ?: 'bar';

```

### Fonctions anonymes

```php
$closureWithArgs = function ($arg1, $arg2) {
    // body
};

$closureWithArgsAndVars = function ($arg1, $arg2) use ($var1, $var2) {
    // body
};

$closureWithArgsVarsAndReturn = function ($arg1, $arg2) use ($var1, $var2): bool {
    // body
};
```

## PSR-4

S'applique aux classes, interfaces, traits et structures similaires et défini à la fois comment les nommer **et** les ranger
  
Le *FQCN* (Fully Qualified Class Name) est composé de :

- Un espace de nom principal (premier élément, aussi appelé prefix)
- Peut avoir un ou des sous-espaces de nom
- Un nom de classe (dernier élément)

### Correspondances entre namespace et fichier

![Des exemples de nommages, avec les dossiers correspondants](/assets/img/php/psr4-example.png)

## Appliquer toutes ces normes

- [PHP CS Fixer](https://github.com/FriendsOfPHP/PHP-CS-Fixer) est un outil très répandu et peut être intégré dans la plupart des IDE (voir [le plugin pour VS Code](https://github.com/junstyle/vscode-php-cs-fixer))
- Les règles de formatage de votre éditeur de code (exemple sur PHPStorm)
- [Hook de pré-commit](https://git-scm.com/book/fr/v2/Personnalisation-de-Git-Crochets-Git)
- Tout en même temps

## Installer PHP-cs-fixer sur VS Code

- Installer le plugin mentionné dans la slide précédente
- [Télécharger PHP CS Fixer](https://cs.symfony.com/download/php-cs-fixer-v2.phar) (je le télécharge dans le dossier `www` de mon wamp)
- Configurer l'extension avec le chemin de php et celui de php-cs-fixer

![Installer PHP CS Fixer](/assets/img/php/phpcsfixer-install-1.png)

![Installer PHP CS Fixer](/assets/img/php/phpcsfixer-install-2.png)

# PHP Doc

- Lire la documentation
  - Le langage
  - Les fonctions
- Chercher dans php.net
- Que faire si je ne comprends pas la doc ou ses exemples ?

## La documentation

- [La documentation PHP en Français](https://www.php.net/manual/fr/) pour **tout** savoir sur le langage, de sa syntaxe jusqu'aux extensions disponibles
- La [référence des fonctions](https://www.php.net/manual/fr/funcref.php) pour trouver toute la documentation sur les fonctions utiles de PHP

## Lire la documentation

- Prenons [un exemple de fonction PHP : strtolower()](https://www.php.net/manual/fr/function.strtolower.php)
  - Description : que fait-elle ?
  - La signature de la fonction : Quels paramètres et que retourne-t-elle ?
  - Liste de paramètres et valeur de retour : plus d'explications sur les paramètres et le retour
  - Exemples : Concrètement, comment s'en servir ?
  - Notes : les subtilités
  - Voir aussi : les fonctions liées (similaires, opposées ou dans le même fonctionnement)
  
---

### Aller plus loin avec la doc

- La colonne de droite vous donne toutes les fonctions de la même section
- Leurs noms sont "explicites" et peuvent aider à savoir ce qu'elles font
- C'est l'un des principaux moyens de découverte de fonctions PHP (hors Stack Overflow)

## Fouiller dans la documentation

- Si vous savez le nom de la fonction que vous cherchez, le moteur de recherche est la solution
- Sinon, il faut soit connaître la doc comme votre poche / avoir une idée de la section dont vous avez besoin, soit chercher sur un autre moteur de recherche

### Exemples

- Je cherche une fonction liée aux tableaux, je vais regarder la [page de la documentation sur les tableaux](https://www.php.net/manual/fr/ref.array.php)
- Je cherche une fonction pour afficher la date du jour, [je fouille dans la doc liée aux fonctions de dates et heures](https://www.php.net/manual/fr/ref.datetime.php) ou je vais [demander à mon moteur de recherche](https://www.google.com/search?q=php+afficher+date+du+jour) qui me permettra de [tomber sur la doc que je cherchais](https://www.php.net/manual/fr/function.date.php) (je peux aussi chercher au hasard dans le moteur de recherche de la documentation)
- Je cherche comment remplacer du texte dans un tableau. Le plus simple (à moins de connaître la fonction) est [mon moteur de recherche](https://www.google.com/search?q=php+remplacer+du+texte+dans+un+tableau)

## À quels sites puis-je faire confiance ?

- La [doc officielle de php](https://www.php.net/manual/fr/)
- La documentation de vos outils (la [doc de Bootstrap](https://getbootstrap.com/docs/4.5/getting-started/introduction/) ou de [Symfony](https://symfony.com/doc/current/index.html) par exemple)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/php)
- Des outils de centralisation de documentations, comme [devdocs.io](https://devdocs.io/)
- Certains articles de blogs ou posts de forum _**récents**_
