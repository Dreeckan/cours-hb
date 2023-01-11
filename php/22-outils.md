# Outils

## FQCN et `get_class()`

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/33d964336c744c62a63b5d30bec3a3e7" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Il arrive qu'on ait besoin de récupérer le nom complet de notre classe (avec son *namespace* complet), qu'on appelle aussi <abbr title="Fully Qualified Class Name">FQCN (Fully Qualified Class Name)</abbr>. Pour cela, nous avons 2 moyens :
- la fonction `get_class()` qui retourne :
  - le nom complet de l'objet en cours, si utilisé dans une classe, sans paramètre (appel : `get_class()`)
  - le nom complet de l'objet passé en paramètre (appel : `get_class(new DateTime())` ou `get_class($foo)`)
- `NomDeLaClasse::class` qui nous permet de récupérer le <abbr title="Fully Qualified Class Name">FQCN</abbr> directement à partir du nom de la classe

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

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/bb19555096894924b4dd51d4e4af0564" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Le mot-clé `ìnstanceof` permet de vérifier si une variable est une instance d'une classe, d'une interface ou d'une de ses filles.

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
var_dump($foo instanceof Test); // Bool (false)
```