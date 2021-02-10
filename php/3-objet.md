# PHP Orienté objet

- Une représentation de la réalité
- En objet, tout est classe

[Des exercices pour bien avancer](https://github.com/Dreeckan/exercices-php)

## Une représentation de la réalité

- Tout est objet
- Comprendre le fonctionnement d'un objet
- Dans le contexte de notre développement

## Une structure de données plus complexe et complète

[La documentation PHP](https://www.php.net/manual/fr/language.oop5.basic.php)
[Sur OpenClassRooms](https://openclassrooms.com/fr/courses/1665806-programmez-en-oriente-objet-en-php)

- Boîte fermée pour encapsuler vos données
- Regrouper la logique métier
- Sert à structurer vos données

## Une classe

- Un nom
- Des constantes
- Des propriétés 
- Des méthodes
- 1 classe = 1 fichier
- Classe ou objet ?

## Un exemple de classe

```php
// Beanie.php
// Nom avec une majuscule entre chaque mot et dès le premier mot
class Beanie
{
    protected $material; // Une propriété

     // Une méthode
    public function getMaterial()
    {
        return $this->material;
    }
}

// index.php
$beanie = new Beanie();
echo $beanie->getMaterial();
```

## Utiliser nos classes

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
    public function getMaterial($aCondition = false): array
    {
        return $this->material;
    }
}
```

## `$this` : pseudo-variable, vraie utilité

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

## $this ou self ? Exemple

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
        parent::__construct(); // On peut appeler le constructeur du parent (pour en garder le fonctionnement)
        $this->uneProprieteEnPlus = true; // En général, on veut ajouter des comportements spécifiques après l'appel du constructeur parent
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

## La fonction get_class()

```php
abstract class Bar
{
    public function __construct()
    {
        var_dump(get_class($this)); // On récupère l'objet réellement en cours
        var_dump(get_class()); // On récupère l'objet où la déclaration est faite
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

## Exercices

Pour vous entrainer à manipuler des objets PHP, utiliser le [repository Github dédié à divers exercices](https://github.com/Dreeckan/exercices-php/). Les exercices 1 à 7 concernent cette partie