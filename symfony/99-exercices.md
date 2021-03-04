# Exercices

La correction de ces exercices est disponible sur un [repository Github dédié](https://github.com/Dreeckan/test-symfony)

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

### 5.1. Configuration et création de la base

- Dans notre projet de test (dans lequel nous avons fait les exercices 1, 2 et 3), nous allons ajouter des entités et synchroniser notre BdD
- Nous allons avoir besoin que Wamp/Mamp soit démarré pour avoir MySQL et PhpMyAdmin
- Configurer votre base de données et la créer avec la ligne de commande 
  - Dans le fichier `.env`, mettre à jour le paramètre `DATABASE_URL` avec vos informations de connexion et le nom de votre BdD
  - Créer la BdD avec la commande `php bin/console doctrine:database:create`

### 5.2. Création d'entités et de leurs champs

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
  
### 5.3. Migration

- Créer et jouer la migration qui correspond
  - `php bin/console doctrine:migrations:diff` pour créer la migration
  - Vérifier le fichier de migration correspondant (son nom est affiché par la commande)
  - `php bin/console doctrine:migrations:migrate` pour la lancer
  - Vérifier que les tables sont bien créées et que tous les champs sont bien présents
  
### 5.4. Utiliser ces entités dans les controllers

#### 5.4.1. Appeler le repository pour récupérer tous les objets Composer

- Créer une route pour le chemin `/composer` (et un nouveau controller) qui va :
  - Prendre en paramètre `ComposerRepository` (c'est-à-dire que votre action sera de cette forme `public function monAction(ComposerRepository $composerRepository)`)
  - Récupérer la liste des compositeurs (`Composer`) à l'aide de `$composerRepository->findAll()`
  - Créer la vue correspondante (fichier Twig comme `templates/composer/index.html.twig`, par exemple) et utiliser la méthode `$this->render()` du controller pour renvoyer une `Response`
  - Dans la vue, afficher vos objets dans un tableau html (ils vous avaient manqué, j'en suis sûr)

#### 5.4.2. Créer des objets et les sauvegarder en base
  
- Créer une route pour le chemin `/composer/new` (dans le même controller que précédemment) qui va :
  - Prendre en paramètre `EntityManagerInterface` (c'est-à-dire que votre action sera de cette forme `public function monAction(EntityManagerInterface $entityManager)`)
  - Créer un ou des objets `Composer` (avec un `new Composer`)
  - Les persister en base (méthodes `persist($object)` et `flush()` du service `EntityManagerInterface`)
  - Rediriger vers la page de liste `/composer`

#### 5.4.3. Récupérer un objet par son identifiant
  
- Créer une route pour le chemin `/composer/{id}` (dans le même controller que précédemment) qui va :
  - Prendre en paramètre un objet `Composer` (c'est-à-dire que votre action sera de cette forme `public function monAction(Composer $composer)`)
  - Créer un template qui va en afficher les différentes propriétés (y compris les différents objets `Music` associés, que vous pouvez récupérer avec `composer.musics` dans votre template)
  
#### 5.4.4. Aller un peu plus loin avec l'objet Music

Pour tout ce qui a été fait jusqu'ici, il y a un [corrigé vidéo](https://www.loom.com/share/09a47cb371e24523ac05043d5fb54f53) si vous le souhaitez. Le corrigé de ce qui suit est [disponible dans cette vidéo](https://www.loom.com/share/2b370106884f405da6335ae8975091c1)

Nous allons faire de même avec les objets `Music`

- Créer une route pour le chemin `/music` (et un nouveau controller `MusicController`) qui va :
  - Prendre en paramètre `MusicRepository` (c'est-à-dire que votre action sera de cette forme `public function monAction(MusicRepository $musicRepository)`)
  - Récupérer la liste des morceaux (`Music`) à l'aide de `$musicRepository->findAll()`
  - Créer la vue correspondante (fichier Twig comme `templates/music/index.html.twig`, par exemple) et utiliser la méthode `$this->render()` du controller pour renvoyer une `Response`
  - Dans la vue, afficher vos objets dans un tableau html (ils vous avaient manqué, j'en suis sûr)
  
- Créer une route pour le chemin `/music/new` (dans le même controller que précédemment) qui va :
  - Prendre en paramètre `EntityManagerInterface` et `ComposerRepository` (c'est-à-dire que votre action sera de cette forme `public function monAction(EntityManagerInterface $entityManager, ComposerRepository $composerRepository)`)
  - Créer un ou des objets `Music` (avec un `new Music`)
  - Récupérer un ou des objets `Composer` et les associer à vos objets `Music` fraîchement créés
    - Pour cela, nous allons utiliser `$composerRepository->findBy(['name' => "nom d'un compositeur que vous avez entré"])` pour chercher un compositeur
    - `findBy` permet de faire une requête `SELECT` avec des `WHERE`, sans taper de SQL.
  - Les persister en base (méthodes `persist($object)` et `flush()` du service `EntityManagerInterface`)
  - Rediriger vers la page de liste `/music`
  
- Créer une route pour le chemin `/music/{id}` (dans le même controller que précédemment) qui va :
  - Prendre en paramètre un objet `Music`
  - Créer un template qui va en afficher les différentes propriétés (y compris le nom du morceau, à l'aide de `music.composer.name`)

- Compléter votre vue de l'exercice `5.4.3` pour récupérer les musiques associées (et/ou vérifier que tout fonctionne)

## 6. Manier le QueryBuilder

Maintenant, nous allons écrire des requêtes, dans nos repositories, en utilisant le QueryBuilder de Doctrine.

Pour chacune des requêtes demandées, les tester dans un controller, où vous avez préalablement injecté le repository.

Dans `ComposerRespository`, écrire :
- Une méthode `bornAfter(int $year)` qui prend en paramètre une année, et renvoie tous les compositeurs nés après l'année `$year`
- Une méthode `bornBetween(int $start, int $end)` qui prend en paramètre deux années, une de début, une de fin, et renvoie tous les compositeurs nés après l'année `$start` et avant l'année `$end`
- Une méthode `searchInName(string $name)` qui prend en paramètre un nom ou un morceau de nom, et renvoie tous les compositeurs dont le nom correspond à la recherche (utiliser `LIKE %recherche%`)

Dans `MusicRepository`, écrire :
- Une méthode `searchInName(string $name)` sur le même principe que la précédente
- Une méthode `searchByComposerName(string $composerName)` qui prend en paramètre un nom ou un morceau de nom de compositeur et renvoie tous les morceaux correspondant.

Dans `ComposerRespository` de nouveau, écrire :
- Une méthode `search(string $text)` qui prend en paramètre un nom ou un morceau de nom, et renvoie tous les compositeurs dont 
  - le nom correspond à la recherche (utiliser `LIKE %recherche%`)
  - ou le nom d'un morceau qu'il a composé correspond à la recherche
- Tester ce repository dans un controller

## 7. Projet : outil de montage d'ordinateurs

Un ["corrigé" de l'exercice](https://github.com/Dreeckan/symfony-computer) est disponible sur Github. Pour les tickets créés, voir la [liste des issues](https://github.com/Dreeckan/symfony-computer/issues?q=is%3Aissue).

Nous avons reçu ce cahier des charges :

> Nous sommes une entreprise de vente d'ordinateurs prêt à l'emploi et personnalisés. Notre objectif est que tous nos clients puissent avoir un ordinateur qui leur correspond et réponde à leurs besoins de manière efficace.
> 
> Pour répondre à cette demande, nos techniciens / monteurs souhaitent disposer d'un outil pour préparer les configurations à présenter à nos clients. Cet outil devra permettre de :
> - Créer des composants (CPU, RAM, carte graphique, boitier, alimentation, disque dur (ou SSD), carte mère, carte réseau), les modifier et les supprimer
> - Créer des périphériques (Clavier, souris, écran, enceintes, webcam), les modifier et les supprimer
> - Créer des ordinateurs, qui contiendront divers composants (un de chaque en général) et qui auront des périphériques associés (un de chaque également), les modifier et les supprimer
> 
> Cet outil sera installé en interne et nous n'aurons pour le moment pas besoin de nous connecter / gérer des utilisateurs
> 
> Chaque élément aura un ensemble de caractéristiques (que nous verrons dans un deuxième cahier des charges), mais surtout un prix unitaire (en € HT). Notre programme devra calculer le prix des ordinateurs montés à partir du prix des pièces.

L'objectif est maintenant de découper cette demande pour pouvoir la traiter et se partager les tâches au sein de notre équipe. Pour cela il va falloir : 
- Faire le MCD (un exemple de ce qu'on a fait, [au format image](/assets/mcd-computer.png), ou [le fichier Looping](/assets/mcd-computer.loo))
- Déterminer les différentes fonctionnalités
- Créer le projet sur Github
- Inviter les différents participants
- Créer des tickets associés (Issues sur Github par exemple)
  - ces tickets doivent être cours à traiter (2 à 4h grand maximum)
- Se les répartir entre les différents développeurs
- Avancer en parallèle (ou tous ensemble, les deux méthodes sont possibles)

### 7.1. Premières améliorations

Notre client est content de nos avancées, et il a besoin de nouvelles fonctionnalités pour rendre son outil plus pratique. Voici ce qu'il a écrit :

> Maintenant que nous pouvons travailler, il nous manque 2 choses 
> - un menu pour naviguer entre les différentes pages (présent sur toutes les pages)
> - Une page d'accueil pour voir les informations importantes :
>   - Le nombre d'ordinateurs préparés (c'est-à-dire qui ont le bon nombre de périphériques et de composants)
>   - Le prix moyen des ordinateurs qui ont été préparés (c'est-à-dire qui ont le bon nombre de périphériques et de composants)
>   - Le prix total des composants en stock
>   - Le prix total des périphériques en stock
 
De nouveau, il faut :
- Découper la demande en fonctionnalités
- Créer des tickets (issues)
- Les répartir
- Les coder (une fois fait, créer des PR et les faire relire par les autres membres du groupe)
 
Outils utiles : 
- [KnpMenuBundle](https://symfony.com/doc/current/bundles/KnpMenuBundle/index.html) pour gérer le menu (et pouvoir ajouter des pages dynamiquement plus simplement)
- `COUNT` et `SUM` peuvent être utilisées directement dans le `select()` du QueryBuilder
- `->getQUery()->getSingleScalarResult()` vous permet de ne récupérer qu'un seul résultat (un nombre) avec des requêtes `SUM` / `COUNT`