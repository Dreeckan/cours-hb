# Factorisation

## Classes et méthodes abstraites

[La documentation](https://www.php.net/manual/fr/language.oop5.abstract.php)

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/593e1d83b8774b1a9eac0f7392b68942" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Une classe abstraite sert à définir un ensemble de propriétés et de méthodes, qui seront utilisables dans les classes filles. Cette classe ne peut être instanciée (on ne peut pas faire un `new`). 

L'intérêt est de regrouper des propriétés et méthodes communes, sans permettre d'instancier la classe. On ne peut par exemple pas faire un `new Animal` dans l'exemple ci-dessous. Il faut instancier les classes filles à la place.

Une méthode abstraite peut être définie dans une classe abstraite. On écrit le mot-clé `abstract` suivi de la signature de la fonction.
Son but est de forcer l'implémentation de la méthode dans les classes filles (qui devront donner un corps à la méthode).

```php
abstract class Animal 
{
    abstract public function call(): string;
}

class Dog extends Animal
{
    // Pour étendre Animal, Dog DOIT avoir une méthode call() définie
    public function call(): string
    {
        return 'Waf';
    }
}
```

## Interface

[La documentation](https://www.php.net/manual/fr/language.oop5.interfaces.php)

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/103e62866bfc4beb871e10e79d16b00d" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Une interface permet de forcer l'implémentation de certaines méthodes dans un objet. C'est un contrat, permettant d'assurer que certaines méthodes sont définies et implémentées dans une ou plusieurs classes.

:warning: Une classe peut implémenter plusieurs interfaces.

:warning: Une interface peut étendre un ou plusieurs interfaces.

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

[La documentation](https://www.php.net/manual/fr/language.oop5.traits.php)

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/4b9cd3e24b604c799d6e7ec10d40de06" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Un trait fonctionne comme une classe et permet de regrouper des propriétés et des méthodes qui vont ête utilisées dans d'autres classes. Un trait ne peut pas être instancié. Il s'utilise avec `use` (oui, encore !) pour **inclure** le code du trait dans une classe. 

Pensez l'utilisation d'un trait comme un copier-coller dans une classe : vous prenez tout le contenu du trait et le collez là où l'appel est fait.

Un exemple de déclaration de trait, où on déclare une propriété et un getter :

```php
trait TestTrait 
{
    private $test;
    private function getTest()
    {
        // ...
    }
}
```

Un exemple d'utilisation de ce trait dans une classe :

```php
class Test
{
    use TestTrait; 
    use TestTrait2;
    // Ici, on peut utiliser $this->test et $this->getTest(),
    // meme s'ils sont privés ! 
    // Comme les éléments sont inclus, $this->test
    // est déclaré privé dans la classe Test
}
```

## Espaces de nom

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/3f3b43f9369b42cfba40d956e9aedaa4" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Le nommage d'une classe (on parle de nom complet ou <abbr title="Fully Qualified Class Name">FQCN</abbr>) ne se limite pas au seul nom de la classe. Le <abbr title="Fully Qualified Class Name">FQCN</abbr> contient également l'espace de nom de la classe, c’est-à-dire un éventuel préfixe et le dossier où la classe se trouve.
Ce <abbr title="Fully Qualified Class Name">FQCN</abbr> se base sur un dossier (dans notre exemple `classes`).

Imaginons l'organisation suivante :

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

## Exceptions et try/catch

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/de998293df9c484ab5a2eac6faf885a0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

En Php, et dans de nombreux autres langages orientés objet, une mécanique permet de gérer les erreurs : les exceptions. Il faut les comprendre comme "des cas non prévus" du programme et, lorsqu'une exception est levée (qu'une erreur se produit), le programme peut réagir en fonction.

Cela permet par exemple d'utiliser une connexion de secours si une première BdD ne répond pas, ou de réagir à n'importe quelle erreur **prévue** dans notre programme.
Php propose déjà un objet `Exception`, vous permettant d'en créer une et vous pouvez la lever avec le mot-clé `throw`. 

Une exception peut être attrapée, pour la traiter ou afficher le message d'erreur, avec le bloc try/catch : 

```php
function throwException() {
    // Pour lever une exception, on utilise le mot-clé throw
    throw new Exception('Ceci est une exception');
}

// On peut "tester" des instructions dans un bloc try
// Si une exception est levée dans ces instructions,
// on peut les attraper dans un ou des blocs catch
try {
    throwException();
} catch(Exception $e) {
    echo $e->getMessage();
}
```