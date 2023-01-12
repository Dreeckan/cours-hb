# PHP Orienté objet

[La documentation PHP](https://www.php.net/manual/fr/language.oop5.basic.php)
[Sur OpenClassRooms](https://openclassrooms.com/fr/courses/1665806-programmez-en-oriente-objet-en-php)

## Une classe

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/6fca744165694a70bd531306742ad942" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

En PHP, une classe se nomme en PascalCase, est l'unique contenu d'un fichier (par convention, ça n'est pas obligatoire) et peut avoir :

- des constantes
- des propriétés
- des méthodes
- des appels de traits

:warning: Ne pas confondre classe et objet. Une classe est un plan de fabrication, l'objet est une instance (une version concrète) de cette classe. On peut également faire un parallèle avec les <abbr title="Base de Données">BdD</abbr> : les classes peuvent être comparées aux tables, là où les objets sont des lignes de cette table.

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

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/0da07d720ac748278bc68214d3c92ebc" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

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

Si vous utilisez un Mac, avec Mamp, utilisez plutôt ce code : 

```php
spl_autoload_register(function ($class) {
    $class = str_replace('\\', '/', $class);
    require_once "classes/$class.php";
});
```

## Documenter

Les annotations et le typage sont très utiles pour définir les types des propriétés, paramètres et valeurs de retour. Hélas, en PHP 7, nous ne pouvons pas toujours typer directement les propriétés. Nous sommes obligés d'utiliser les annotations pour le faire (c'est disponible à partir de PHP 7.4 seulement).

En PHP, une variable peut également avoir plusieurs types possibles. On notera alors ces types en annotation, dans la plupart des cas (`int|float` par exemple). Pour le cas d'une valeur pouvant être `null`, on ajoutera un `?` avant le type (`?int` par exemple).

```php
class Beanie 
{
    /** @var array<int, string> */
    protected array $material = []; // On indique le(s) type(s) attendu(s)
    
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

En vidéo : 

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/7f6a2fce59f349e891e4f5f4970f4696" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

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

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/aaccabba313c4c9d89846e058161249d" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

On peut définir des valeurs par défaut (ou d'initialisation) pour les propriétés d'un objet dans le constructeur ou dans les propriétés. Les deux sont équivalents la plupart du temps, mais pas pour des valeurs complexes (par exemple, si vous devez instancier un objet pour l'un des propriétés, il est nécessaire de le faire dans le constructeur).

```php
class Beanie 
{
    // On peut donner une valeur par défaut directement sur la propriété
    protected string $material = 'wool';
    
    public function __construct()
    {
        // La même chose, mais, ici, on peut faire des calculs,
        // appeler des méthodes de l'objet, etc.
        $this->material = 'wool'; 
    }
}
```

Vous pouvez également, si vous le souhaitez, définir des paramètres à votre constructeur (y compris pour définir les propriétés).


```php
class Beanie 
{
    protected string $material;
    
    // On permet de définir la valeur directement lors du new
    // et on peut donner une valeur par défaut directement au paramètre
    public function __construct(string $material = 'wool')
    {
        $this->material = $material; 
    }
}
```

## Constantes de classe

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/5f6d80ecbe3c443a80164f0852deab58" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

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

En vidéo : 

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/c8e3bd5d9cae40048161b17e8c1749d6" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

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
