# Symfony

Cette partie va reprendre en grande partie le fonctionnement de [la documentation officielle de Symfony](https://symfony.com/doc/current/index.html). Cette documentation servira de référence assez souvent tout au long de ce cours.

Un [dossier avec des vidéos explicatives du cours et des exercices](https://loom.com/share/folder/5c8d96796b7e466bbd24b9ce7d2a563b) est disponible

## Installation

Avant de pouvoir travailler concrètement sur Symfony, il faut mettre en place notre environnement de travail.

Pour cela, nous allons installer : 
- [Composer, gestionnaire de paquet pour PHP](https://getcomposer.org/doc/00-intro.md)
- [l'outil en ligne de commande de Symfony](https://symfony.com/download)
  
Si vous utilisez Windows, je vous conseille d'utiliser Powershell pour éviter des erreurs de rendu.

Pour créer un projet Symfony, nous pouvons maintenant utiliser notre ligne de commande (PowerShell dans mon cas) : 

```bash
  symfony new --full my_project
```

Vous pouvez alors ouvrir ce nouveau dossier avec votre IDE favori. Les deux sous-parties suivantes sont consacrées à la gestion d'un projet Symfony dans notre IDE.

### Plugins utiles pour nos IDE

#### PHPStorm

Pour installer un plugin dans PHPStorm, aller dans les options, partie `plugins` (`File` > `Settings` > `Plugins`) et chercher dans la partie `Marketplace`

- Symfony Support

Voir également la [vidéo dédiée à la configuration de PHPStorm](https://www.loom.com/share/8660523dee7141a18461dec7a65e3850)

#### VS Code

Pour installer un plugin dans VSCode, aller dans le menu de gauche, partie Extensions (avec 4 petits carrés). Pour chacun de ces plugins, je vous conseille d'en regarder la doc et de suivre son processus d'installation.

- DotENV pour mettre de la couleurs dans les fichiers d'environnement (`.env`)
- MySQL (de cweijan) pour faire le lien avec votre base de données ([je vous ai fait une vidéo d'installation et de configuration](https://www.loom.com/share/09f79db6bd6b4226972ac1017d048257))
- php cs fixer (de junstyle)
- PHP Debug (de Felix Becker)
- PHP Getters & Setters (de phproberto)
- PHP Intelephense (de Ben Mewburn)
- Symfony for VSCode (de TheNouillet)
- Twig Language 2 (de mblode)

## Travailler au quotidien sur un projet Symfony

### Créer un nouveau projet

Dans un terminal (Powershell par exemple, sous Windows), aller dans le dossier où vous voulez créer votre projet et lancer la commande :

```bash
  symfony new --full my_project
```

Remplacer `my_project` par le nom de votre projet. Vous aurez alors un dossier `my_project`, que vous pouvez ouvrir dans votre IDE.


### Git et les projets Symfony

Par défaut, le programme en ligne de commande de Symfony crée un projet avec un repository (local uniquement) Git. Vous pouvez donc le lier à un projet sur Github, Gitlab, Bitbucket ou autre.

```shell
git remote add origin urlDeVotreRepository
git push --all origin
```

Noter également la présence d'un fichier `.gitignore` à la racine du projet. Il pourra servir si vous voulez éviter de versionner certains fichiers.
Si vous utilisez PHPStorm, je vous recommande de **toujours** ajouter le dossier `.idea` à votre fichier `.gitignore` (c'est un dossier de PHPStorm qui retient vos recherches, certains éléments de configuration locale, etc.).

### Démarrer le serveur Symfony au démarrage

Après avoir ouvert un projet Symfony dans votre IDE, faites quelques étapes simples et vous êtes prêts à travailler.

- Ouvrir un terminal (Sur PHPStorm : cliquer sur `terminal` en bas de la fenêtre, sur VSCode, dans le menu du haut, cliquer sur `Terminal` > `New Terminal`)
- Lancer la commande `symfony serve`

Vous pouvez la laisser tourner en tâche de fond (et y revenir de temps en temps si vous avez des erreurs) et pour utiliser la ligne de commande, vous pouvez ouvrir un nouveau terminal (avec les deux IDE, il y a un bouton `+`).
Et vous pouvez utiliser votre site à l'adresse indiqué par le serveur (en général [http://127.0.0.1:8000](http://127.0.0.1:8000) ou [https://127.0.0.1:8000](https://127.0.0.1:8000)).


## Un projet Symfony

Regardons le contenu du projet que nous venons de créer. Il contient déjà de nombreux fichiers et dossiers :

![](/assets/img/php/symfony_fichiers.png)

Prenons d'abord les dossiers dans l'ordre d'apparition :

- `bin` : contient les "binaires", des fichiers exécutables en ligne de commande, qui vont nous être utiles dans le développement, mais aussi pour notre application (`bin/console` en particulier va beaucoup nous servir)
- `config` : La configuration des différents éléments du site. Les routes, les services et les configurations des librairies utilisées
- `migrations` : je l'ai évoqué avec PDO, les fichiers permettant de passer d'une version à l'autre de notre base de données seront rangés ici
- `public` : la face visible de notre site. Ce dossier est le seul visible par le serveur. Tout se passe autour de l'appel du fichier `index.php` (qui est notre front controller)
- `src` : c'est ici que nous allons travailler la plupart du temps. Ce dossier aura sa présentation à part
- `templates` : un autre dossier essentiel et que l'on va tout le temps utiliser (sauf si on code une API), car il contient toutes les vues du site (tout le HTML, pour simplifier ;) )
- `tests` : le repaire des tests unitaires et fonctionnels
- `translations` : les traductions de vos textes iront dans ce dossier
- `var` : des fichiers temporaires (cache, logs, etc.) qui vont servir de ressources pour l'exécution de notre site. Il est géré par Symfony et nous n'avons pas souvent besoin d'y modifier des éléments
- `vendor` : les librairies dont nous allons nous servir (dont Symfony !). Il est géré par composer et nous n'allons pas souvent en voir le contenu (même si l'on s'en sert ;) )

Ensuite, nous avons quelques fichiers à regarder de plus près : 

- `.env` et `.env.test` : ces fichiers contiennent des variables d'environnement, qui vont nous permettre de configurer notre site (identifiants de base de données, etc.) pour les différents **environnements** que nous allons utiliser
- `composer.json`, `composer.lock` et `symfony.lock` : nous permettent de gérer les versions de nos dépendances PHP (librairies externes). Ils sont en général modifiés lors de l'utilisation de commandes `composer require`, ou `composer update` (mais jamais lors d'un `composer install`)
- `.gitignore` : liste les fichiers qui ne sont pas versionnés par git dans le projet. Ajouter les vôtres peut être utile (configuration de l'IDE, images uploadées, etc.)

## Composer

Comme nous n'en avons pas parlé jusqu'à maintenant, prenons le temps de voir ce qu'est Composer.

Ils s'agit d'un outil de gestion de dépendances (dependency manager) pour PHP. Tout comme `npm` (javascript) et bien d'autres, il permet de choisir les paquets (librairies) dont nous allons avoir besoin et d'en choisir des versions plus ou moins précise. L'intérêt est ici de :
- télécharger les librairies dont on a besoin, dans les bonnes versions, et de s'assurer de pouvoir facilement les mettre à jour
- s'assurer facilement que les dépendances de notre projet sont toujours bien compatibles entre elles

Ouvrons maintenant un fichier `composer.json` (morceaux choisis) :

```json
{
    "require": {
        "php": ">=7.2.5",
        "ext-ctype": "*",
        "ext-iconv": "*",
        "sensio/framework-extra-bundle": "^5.1",
        "symfony/asset": "*",
        "symfony/console": "*",
        "symfony/dotenv": "*",
        "symfony/expression-language": "*",
        "symfony/flex": "^1.3.1",
        "symfony/form": "*",
        "symfony/framework-bundle": "*",
        "symfony/http-client": "*",
        "symfony/intl": "*",
        "symfony/mailer": "*",
        "symfony/mime": "*",
        "symfony/monolog-bundle": "^3.1",
        "symfony/notifier": "*",
        "symfony/orm-pack": "*",
        "symfony/process": "*",
        "symfony/security-bundle": "*",
        "symfony/serializer-pack": "*",
        "symfony/string": "*",
        "symfony/translation": "*",
        "symfony/twig-pack": "*",
        "symfony/validator": "*",
        "symfony/web-link": "*",
        "symfony/yaml": "*"
    },
    "require-dev": {
        "symfony/debug-pack": "*",
        "symfony/maker-bundle": "^1.0",
        "symfony/profiler-pack": "*",
        "symfony/test-pack": "*"
    },
    "autoload": {
        "psr-4": {
            "App\\": "src/"
        }
    },
    "autoload-dev": {
        "psr-4": {
            "App\\Tests\\": "tests/"
        }
    },
    "scripts": {
        "auto-scripts": {
            "cache:clear": "symfony-cmd",
            "assets:install %PUBLIC_DIR%": "symfony-cmd"
        },
        "post-install-cmd": [
            "@auto-scripts"
        ],
        "post-update-cmd": [
            "@auto-scripts"
        ]
    },
    "extra": {
        "symfony": {
            "allow-contrib": false,
            "require": "5.2.*"
        }
    }
}
```

Les fichiers `.lock` sont là pour assurer les versions précises de nos dépendances. Ils sont versionnés afin d'assurer la cohérence entre développeurs et entre serveurs (on s'assure d'avoir exactement les mêmes versions partout). 

## Créer une première page avec Symfony (exercice guidé)

- Avoir un projet Symfony neuf (fraîchement créé, sans modification)
- Créer une page qui va être disponible sur l'uri `/page`
- Afficher un lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus a dolor eleifend, efficitur elit sed, auctor sapien. Nulla lobortis augue sagittis viverra cursus. Fusce laoreet.

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

## Exercice (apprivoiser le controller et la vue)

- On veut créer une nouvelle page (avec l'URi `/page`, dans le controller `DefaultController`)
- Dans la méthode du controller, déclarer une variable `$test` et l'initialiser à `false`
- Créer un nouveau template `default/page.html.twig` qui va hériter de `base.html.twig`
- Envoyer la variable `$test` dans la vue
- Utiliser la fonction `dump()` pour afficher toutes les variables disponibles dans la vue si `$test` vaut `true`
- Vérifier en faisant varier `$test` dans la méthode du controller

## Exercice (apprivoiser Twig et sa documentation)

- Nous allons continuer à tester dans le même projet Symfony
- Dans le fichier zip joint ci-après, récupérer les fichiers et les insérer dans le dossier `public` de votre projet
- Créer une route (dans le controller de votre choix, vous pouvez en créer un nouveau pour vous entrainer) et une action (attention, bien définir une nouvelle URi)
- Reprendre le contenu du fichier `index.html` et faire en sorte qu'il hérite de `base.html.twig` (utiliser les `block` définis dans ce fichier pour y ranger les js et css)
- Vérifier l'affichage
- Normalement, les images, css et javascripts ne devraient pas se charger correctement, il va falloir utiliser la [fonction `asset()` de Twig](https://symfony.com/doc/current/reference/twig_reference.html#asset) pour les charger 
- Vérifier régulièrement l'affichage et que tout se charge
- Une fois fait, découper votre fichier HTML en plusieurs fichiers (un fichier twig par section, par exemple, un fichier `hero-section.html.twig`) et inclure les différents fichiers à l'aide du [tag `include` de Twig](https://twig.symfony.com/doc/3.x/tags/include.html)
- Normalement, votre affichage doit être le même qu'au début, mais vous avez découpé le tout en plusieurs fichiers (plus faciles à maintenir)