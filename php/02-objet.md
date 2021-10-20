# PHP Orienté objet

[La documentation PHP](https://www.php.net/manual/fr/language.oop5.basic.php)
[Sur OpenClassRooms](https://openclassrooms.com/fr/courses/1665806-programmez-en-oriente-objet-en-php)

## Une classe

En PHP, une classe se nomme en PascalCase, est l'unique contenu d'un fichier (par convention, ça n'est pas obligatoire) et peut avoir :

- des constantes
- des propriétés
- des méthodes
- des appels de traits

:warning: Ne pas confondre classe et objet. Une classe est un plan de fabrication, l'objet est une instance (une version concrète) de cette classe.

```php
<?php
// classes/Beanie.php

// Nom avec une majuscule entre chaque mot et dès le premier mot
class Beanie
{
    // Une propriété.
    // On ne peut pas en définir le type directement,
    // mais on peut l'indiquer en annotation 
    protected string $material; 
    
    public function __construct() 
    {
        $this->material = 'Wool';
    }

     // Une méthode
     // sans type de retour, mais on pourrait l'ajouter
     // et/ou l'indiquer en annotation
    public function getMaterial()
    {
        return $this->material;
    }
    
    /**
     * @param string|null $material
     * @return $this
     */
    public function setMaterial(?string $material): Beanie
    {
         $this->material = $material;
         
         return $this;
    }
}

// index.php
// Instanciation d'un objet
// Et appel d'une méthode
$beanie = new Beanie();
$beanie->setMaterial('Wool');
$beanie->getMaterial();
```

## Utiliser nos classes

En PHP, par défaut, les classes ne sont pas chargées automatiquement, il faut les charger nous-même (soit avec `require`/`require_once`, soit avec un autoloader qui le fera pour nous).

```php
require 'classes/MaClasse.php';
```

Ou utiliser un autoloader :

```php
spl_autoload_register(function ($class) { 
    require_once "classes/$class.php";
});
```

## Visibilité des propriétés et méthodes

- `public` : la propriété / méthode est utilisable en dehors de l'objet
- `private` : la propriété / méthode **n'est pas** utilisable en dehors de l'objet
- `protected` : la propriété / méthode n'est utilisable **que** par les classes enfants (voir section sur l'héritage)

## Documenter ses classes

Les annotations et le typage sont très utiles pour définir les types des propriétés, paramètres et valeurs de retour. Hélas, en PHP 7, nous ne pouvons pas toujours typer directement les propriétés. Nous sommes obligés d'utiliser les annotations pour le faire (c'est disponible à partir de PHP 7.4 seulement).

En PHP, une variable peut également avoir plusieurs types possibles. On notera alors ces types en annotation, dans la plupart des cas (`int|float` par exemple). Pour le cas d'une valeur pouvant être `null`, on ajoutera un `?` avant le type (`?int` par exemple).

```php
class Beanie 
{
    /** @var array */
    protected $material = []; // On indique le(s) type(s) attendu(s)
    
    /**
     * @param bool $aCondition
     * 
     * @return array
     */
    public function getMaterial(bool $aCondition = false): array
    {
        return $this->material;
    }
}
```

## `$this` : pseudo-variable, vraie utilité

`$this` permet d'accéder à l'objet en cours. Toujours utile pour le mettre à jour !
Il est nécessaire pour assurer l'encapsulation de nos propriétés (on ne les modifie jamais directement, mais toujours *via* des méthodes).

```php
class Beanie 
{
    protected $material;
     
    public function getMaterial() // Une méthode
    {
        // $this, utilisée dans un objet permet d'accéder à l'objet en cours
        return $this->material;
    }
}
```

## Constructeur

On peut définir des valeurs par défaut (ou d'initialisation) pour les propriétés d'un objet

```php
class Beanie 
{
    protected $material = 'wool';// On donne une valeur par défaut
    
    public function __construct()
    {
        // La même chose, mais, ici, on peut faire des calculs,
        // appeler des méthodes de l'objet, etc.
        $this->material = 'wool'; 
    }
}
```

## Constantes de classe

La [documentation sur les constantes](https://www.php.net/manual/fr/language.oop5.constants.php)

```php
class Beanie 
{
    const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL']; // Une constante de classe
    
    public function getAvailableSizes()
    {
        return self::AVAILABLE_SIZES;
    }
}
var_dump(Beanie::AVAILABLE_SIZES); 
```

## $this ou self ?

- Les deux s'utilisent dans la classe,
- `$this` si vous êtes dans le contexte d'un objet instancié ("j'ai des propriétés/méthodes, je vais m'en servir")
- `self` pour appeler des éléments dits `static` (constantes, méthodes statiques) ("Des éléments sont définis par la classe, je veux m'en servir dans mon objet")

```php
class Beanie 
{
    const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL']; // Appelée avec Beanie::AVAILABLE_SIZES
    
    public static $property; // Appelée avec Beanie::$property
    
    public function getAvailableSizes()
    {
        return self::AVAILABLE_SIZES; // appelée avec $b->getAvailableSizes()
    }
    
    public static function availableSizes()
    {
        return self::AVAILABLE_SIZES; // appelée avec Beanie::availableSizes()
    }
}
```

## Héritage

[Des types de bonnets sous-côtés](https://blog.delusionmfg.com/12-types-of-beanies-you-have-to-check-out)

```php
class EarflapBeanie extends Beanie
{
    // A accès aux propriétés et aux méthodes de Beanie, mais uniquement si public ou protected 
    // Cette propriété n'existe que pour les objets EarflapBeanie
    private $uneProprieteEnPlus;
    
    // On peut également surcharger le constructeur (ou toute autre méthode de l'objet parent)
    // pour ajouter des comportements
    public function __construct()
    {
        // On peut appeler le constructeur du parent (pour en garder le fonctionnement)
        parent::__construct();
        // En général, on veut ajouter des comportements spécifiques après l'appel du constructeur parent
        $this->uneProprieteEnPlus = true; 
    }
    
    public function uneMethodeEnPlus()
    {
        // Cette méthode n'est pas utilisable sur un objet Beanie, mais uniquement par les objets EarflapBeanie
    }
}
```

## Visibilité

```php
class Beanie 
{
    protected $name;
    private $test;
    public $description;
}
class EarflapBeanie extends Beanie
{
    // On peut utiliser / surcharger $this->name et $this->$description
    // mais pas $this->test qui n'est disponible QUE dans les objets Beanie et pas leurs enfants
}
```

## La fonction `get_class()`

```php
abstract class Bar
{
    public function __construct()
    {
        // On récupère l'objet réellement en cours
        var_dump(get_class($this));
        // On récupère l'objet où la déclaration est faite
        var_dump(get_class());
    }
}

class Foo extends Bar {
}

$foo = new Foo();
var_dump(Foo::class); // Renvoie la même chose que get_class($foo)

```

## instanceof

- Mot-clé permettant de vérifier si une variable est une instance d'une classe/interface (ou d'une de ses filles)

```php
// Bar.php
class Bar {}
// Foo.php
class Foo extends Bar {}
// index.php
$foo = new Foo();
$bar = new Bar();
var_dump($foo instanceof Foo); // Bool (true)
var_dump($foo instanceof Bar); // Bool (true)
```

## Méthodes abstraites

[La documentation](https://www.php.net/manual/fr/language.oop5.abstract.php)

```php
abstract class Test 
{
    abstract public function getTest();
}

class Foo extends Test
{
    // Pour étendre Test, Foo DOIT avoir une méthode getTest() définie
    public function getTest()
    {
        return 'ok';
    }
}
```

## Interface

[La documentation](https://www.php.net/manual/fr/language.oop5.interfaces.php)

```php
interface Test
{
    public function getTest();
}

class Foo implements Test, Test2, Test3
{
    // Pour implémenter Test, Foo DOIT avoir une méthode getTest() définie
    public function getTest()
    {
        return 'ok';
    }
}
```

## Traits

- [La documentation](https://www.php.net/manual/fr/language.oop5.traits.php)
- Fonctionne comme une classe
- Regroupe des propriétés et des méthodes
- S'utilise avec `use` (oui, encore !) pour **inclure** le code du trait dans une classe

```php
// classes/Traits/TestTrait.php
namespace Traits;
trait TestTrait 
{
    protected $test;
    protected function getTest()
    {
        // ...
    }
}

// classes/Test.php
use Traits\TestTrait;
class Test
{
    use TestTrait;
    use TestTrait2;
}
```

## Espaces de nom

Le nommage d'une classe (on parle de nom complet ou <abbr title="Fully Qualified Class Name">FQCN</abbr>) ne se limite pas au seul nom de la classe. Le <abbr title="Fully Qualified Class Name">FQCN</abbr> contient également l'espace de nom de la classe, c’est-à-dire un éventuel préfixe, et le dossier où la classe se trouve.
Ce <abbr title="Fully Qualified Class Name">FQCN</abbr> se base sur un dossier (dans notre exemple `classes`).

Imaginons l'organisation de fichiers suivantes :

```
classes/
| - Traits/
    | - Truc/
        | - TestTrait2.php
    | - TestTrait.php
| - Foo.php
| - Bar.php
| - Baz.php
```

Si `classes` est le dossier servant de base à nos classes PHP, les différentes classes auront (ou non) un namespace (espace de nom). Par exemple, `Foo`, `Bar`, `Baz` n'auront pas de namespace (ils sont à la racine de nos classes), alors que `TestTrait` et `TestTrait2` auront un namespace, pour indiquer le dossier où il se trouve :

```php
// classes/Traits/TestTrait.php
namespace Traits;

trait TestTrait 
{
// ...
}
// classes/Traits/Truc/TestTrait2.php
namespace Traits\Truc;

trait TestTrait2
{
// ...
}
```

:warning: La séparation des dossiers s'écrit avec un `\` dans les namespaces

## Exercices

Pour vous entrainer à manipuler des objets PHP, utiliser le [repository Github dédié à divers exercices](https://github.com/Dreeckan/exercices-php/). Les exercices 1 à 7 concernent cette partie