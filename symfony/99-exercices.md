# Exercices

## 1. Créer une première page avec Symfony (exercice guidé)

- Avoir un projet Symfony neuf (fraîchement créé, sans modification)
- Créer une page qui va être disponible sur l'uri `/page`
- Afficher un lorem ipsum `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a dolor eleifend, efficitur elit sed, auctor sapien. Nulla lobortis augue sagittis viverra cursus. Fusce laoreet.`

### Résolution

- On crée notre projet (si ça n'est pas déjà fait), avec la commande `symfony new --full my_project`
- On l'ouvre avec notre IDE et on lance le serveur Symfony (`symfony serve` dans un terminal)
- On crée notre controller (nous sommes dans un projet neuf, nous n'en avons pas), avec la commande `php bin/console make:controller`. Nommons-le `DefaultController`
- Nous avons une nouvelle classe créée dans `src/Controller/DefaultController.php` et un nouveau template (une nouvelle vue) dans `template/default/index.html.twig`
- Regardons `src/Controller/DefaultController.php` :
```php
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    /**
     * @Route("/", name="homepage")
     */
    public function index(): Response
    {
        return $this->render('default/index.html.twig', [
            'controller_name' => 'DefaultController',
        ]);
    }
}
```
- Il contient une classe `DefaultController` (qui étend `AbstractController`, venu de Symfony) et une méthode `index()` (c'est elle qui va particulièrement nous intéresser)
- Cette méthode `index()` a une annotation (commentaire commençant par `@`) nommée `Route`. Il s'agit d'une annotation permettant à Symfony de faire le lien entre une URi et une méthode de controller (aussi appelée action) à exécuter. Ici, `index()` sera appelée si nous chargeons la racine du site (`http://127.0.0.1:8000/`, en somme).
- `index()` va faire une seule chose : renvoyer un html, construit à partir du fichier `default/index.html.twig` (qui se trouve dans le dossier `templates`). Pour se faire, on va appeler la méthode `render()` du controller, qui va créer un rendu de notre fichier Twig (en faire un html), en utilisant le tableau de paramètres, passé en deuxième argument.

Regardons maintenant notre fichier `templates/default/index.html.twig` (j'enlève le html présent, pour simplifier l'affichage) : 

```twig
{% extends 'base.html.twig' %}

{% block title %}Hello DefaultController!{% endblock %}

{% block body %}
    <h1>Hello {{ controller_name }}! ✅</h1>
{% endblock %}
```

Plusieurs choses à voir ici aussi : 
- La syntaxe de Twig : 
  - les tags `{% %}` : pour les divers mots clés du langage propre à Twig (conditions, extensions, blocs, etc.)
  - les `{{ }}` (affectueusement appelées moustaches) : pour afficher une valeur (ici, le contenu d'une variable `controller_name`)
- Ce fichier étend `templates/base.html.twig`, il en récupère donc les blocs et les étends. Il est impossible de mettre du texte en dehors d'un bloc, si vous étendez une vue.

Voilà, vous avez fait votre première page avec Symfony !

## 2. Exercice (apprivoiser le controller et la vue)

- On veut créer une nouvelle page (avec l'URi `/page`, dans le controller `DefaultController`)
- Dans la méthode du controller, déclarer une variable `$test` et l'initialiser à `false`
- Créer un nouveau template `default/page.html.twig` qui va hériter de `base.html.twig`
- Envoyer la variable `$test` dans la vue
- Utiliser la fonction `dump()` pour afficher toutes les variables disponibles dans la vue si `$test` vaut `true`
- Vérifier en faisant varier `$test` dans la méthode du controller

## 3. Exercice (apprivoiser Twig et sa documentation)

- Nous allons continuer à expérimenter dans le même projet Symfony
- Dans le [fichier zip joint](/assets/exercice-integration.zip), récupérer les fichiers et les insérer dans le dossier `public` de votre projet
- Créer une route (dans le controller de votre choix, vous pouvez en créer un nouveau pour vous entrainer) et une action (attention, bien définir une nouvelle URi, comme `/page/devbook`)
- Reprendre le contenu du fichier `index.html` et faire en sorte qu'il hérite de `base.html.twig` (utiliser les `block` définis dans ce fichier pour y ranger les js et css)
- Vérifier l'affichage
- Normalement, les images, css et javascripts ne devraient pas se charger correctement, il va falloir utiliser la [fonction asset() de Twig](https://symfony.com/doc/current/reference/twig_reference.html#asset) pour les charger 
- Vérifier régulièrement l'affichage et que tout se charge
- Une fois fait, découper votre fichier HTML en plusieurs fichiers (un fichier twig par section, par exemple, un fichier `hero-section.html.twig`) et inclure les différents fichiers à l'aide du [tag include de Twig](https://twig.symfony.com/doc/3.x/tags/include.html)
- Normalement, votre affichage doit être le même qu'au début, mais vous avez découpé le tout en plusieurs fichiers (plus faciles à maintenir)

## 4. Manier des assets, les controllers et Twig

- Nous allons travailler sur votre Business Case
- Le but est de créer les pages demandées (nous allons commencer par les pages statiques et sans formulaire), avec leurs images, css et javascripts.

## 5. Manier Doctrine pour utiliser une BdD

- Dans notre projet de test (dans lequel nous avons fait les exercices 1, 2 et 3), nous allons ajouter des entités et synchroniser notre BdD
- Créons deux entités, à l'aide de la commande `php bin/console make:entity` :
  - `Composer` ayant 6 propriétés : 
    - `id` (entier, généré automatiquement)
    - `name` (string, longueur de 255, non null)
    - `description` (texte, non null)
    - `birth` (entier)
    - `death` (entier)
    - `birthCountry` (string, longueur de 128)
  - `Music` ayant 4 propriétés :
    - `id` (entier, généré automatiquement)
    - `name` (string, longueur de 255, non null)
    - `year` (entier)
    - `composer` (une relation avec `Composer` de type `ManyToOne`)
- Regardons les fichiers générés par notre commande. Les deux premiers sont nos entités (objet PHP simple, avec des annotations pour le lien avec la BdD). Les suivants sont nos repositories (ce sont eux qui vont nous permettre de faire des requêtes).
  - `src/Entity/Composer.php`
  - `src/Entity/Music.php`
  - `src/Repository/ComposerRepository.php`
  - `src/Repository/MusicRepository.php`
- Créer et jouer la migration qui correspond
  - `php bin/console doctrine:migrations:diff` pour créer la migration
  - Vérifier le fichier de migration correspondant (son nom est affiché par la commande)
  - `php bin/console doctrine:migrations:migrate` pour la lancer
  - Vérifier que les tables sont bien créées et que tous les champs sont bien présents
- Créer une route pour le chemin `/composer` (et un nouveau controller) qui va :
  - Prendre en paramètre `ComposerRepository` (c'est-à-dire que votre action sera de cette forme `public function monAction(ComposerRepository $composerRepository)`)
  - Récupérer la liste des compositeurs (`Composer`)
  - Les afficher dans un tableau html (ils vous avaient manqué, j'en suis sûr)
- Créer une route pour le chemin `/composer/new` (dans le même controller que précédemment) qui va :
  - Prendre en paramètre `ComposerRepository` (c'est-à-dire que votre action sera de cette forme `public function monAction(ComposerRepository $composerRepository)`)
  - Créer un ou des objets `Composer` (avec un `new Composer`) et les persister en base (méthodes `persist($object)` et `flush()` du service `EntityManagerInterface`)
  - Rediriger vers la page de liste `/composer`
- Créer une route pour le chemin `/composer/{id}` (dans le même controller que précédemment) qui va :
  - Prendre en paramètre un objet `Composer`
  - Créer un template qui va en afficher les différentes propriétés (y compris les différents objets `Music` associés, que vous pouvez récupérer avec `composer.musics` dans votre template)