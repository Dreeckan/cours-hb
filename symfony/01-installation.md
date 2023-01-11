# Installer Symfony et son environnement de travail

Avant de pouvoir travailler concrètement sur Symfony, il faut mettre en place notre environnement de travail.

Pour cela, nous allons installer :

- [Composer, gestionnaire de paquet pour PHP](https://getcomposer.org/doc/00-intro.md) (ou [lien direct vers l'installeur](https://getcomposer.org/Composer-Setup.exe))
- [l'outil en ligne de commande de Symfony](https://symfony.com/download) (ou [lien direct vers l'installeur](https://get.symfony.com/cli/setup.exe))

Si vous utilisez Windows, je vous conseille d'utiliser Powershell pour éviter des erreurs de rendu.

Pour créer un projet Symfony, nous pouvons maintenant utiliser notre ligne de commande (PowerShell dans mon cas) :

```shell
  symfony new --webapp my_project --php=8.1
```

Vous pouvez alors ouvrir ce nouveau dossier avec votre IDE favori. Les deux sous-parties suivantes sont consacrées à la gestion d'un projet Symfony dans notre IDE. Pour la base de données, nous aurons besoin de Wamp/Mamp.

## Plugins utiles pour nos IDE

### PHPStorm

Pour installer un plugin dans PHPStorm, aller dans les options, partie `plugins` (`File` > `Settings` > `Plugins`) et chercher dans la partie `Marketplace`

- Symfony Support
- .env files support
- OpenAPI (Swagger) Editor

Voir également la [vidéo dédiée à la configuration de PHPStorm](https://www.loom.com/share/8660523dee7141a18461dec7a65e3850)

### VS Code

Pour installer un plugin dans VSCode, aller dans le menu de gauche, partie Extensions (avec 4 petits carrés). Pour chacun de ces plugins, je vous conseille d'en regarder la doc et de suivre son processus d'installation.

- DotENV pour mettre de la couleurs dans les fichiers d'environnement (`.env`)
- MySQL (de cweijan) pour faire le lien avec votre base de données ([je vous ai fait une vidéo d'installation et de configuration](https://www.loom.com/share/09f79db6bd6b4226972ac1017d048257))
- php cs fixer (de junstyle)
- PHP Debug (de XDebug)
- PHP Getters & Setters (de phproberto)
- PHP Intelephense (de Ben Mewburn)
- Symfony for VSCode (de TheNouillet)
- Twig Language 2 (de mblode)
- [Git History](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory) (de Don Jayamanne)


## Requis techniques

Avant de commencer à créer un site avec Symfony, certaines notions sont nécessaires :
- Une bonne maîtrise du [PHP orienté objet](../php/20-objet.md) (y compris les espaces de nom)
- Le [principe <abbr title="Model View Controller">MVC</abbr>](../php/40-mvc.md) pour organiser nos fichiers
- Les annotations et attributs en PHP (voir point suivant)

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/f1d89de2d2264c8a8a80fc84c3dc0dad" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

### Annotations et attributs

Je vous invite à lire le [très bon article de Maxime Colin, de la société Elao sur les attributs](https://www.elao.com/blog/dev/les-attributs-php-8-dans-symfony)

Dans plusieurs langages, et particulièrement en PHP avec Symfony, nous avons besoin de fournir des informations supplémentaires sur des symboles (classes, interfaces, traits, etc.), propriétés ou méthodes. Cela permet notamment de générer une documentation, d'améliorer la complétion des <abbr title="Environnement de développement">IDE</abbr> (comme PHP Storm ou VsCode), mais aussi définir le fonctionnement de certaines librairies !
Nous pouvons le faire via des commentaires ou des attributs, 2 éléments du langage PHP que nous allons détailler un peu plus ici.

C'est le cas en Symfony, notamment pour la [définition des routes](20-routing.md) ou la [définition des entités](24-doctrine.md).

Les annotations sont des commentaires spéciaux (au format PHPDoc). Dans l'exemple suivant, on appelle **une classe** Route avec les paramètres de son constructeur, que l'on peut nommer (pour les utiliser dans le désordre). L'inconvénient est le besoin d'un parser (librairie qui va lire nos fichiers PHP pour chercher les annotations) qui, bien que fourni avec Symfony, rajoute un travail supplémentaire dans l'interprétation de notre code.

Un exemple d'annotation :

```php
/**
 * @Route('/', name="default_index")
 */
```

Un attribut est une expression du langage PHP, qui ne nécessite donc pas l'appel à un parser et qui permet le même fonctionnement.

Le même exemple, en attribut :

```php
#[Route('/', name: "default_index")]
```


## Outils de qualité de code

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/d57e65a6e18a43188c054304bd3daf4b" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

### Php CS Fixer

Symfony suit [les conventions d'écriture PSR](https://www.php-fig.org/psr/), mais il n'est pas toujours aisé de les appliquer au quotidien. Heureusement, des outils comme [Php CS Fixer](https://cs.symfony.com/) ont été créé pour nous aider dans cette tâche. Vous pouvez l'ajouter en dépendance de développement de votre projet avec la commande :

```shell
composer require --dev friendsofphp/php-cs-fixer
```

Vous pourrez ensuite le lancer avec `vendor/bin/php-cs-fixer fix` pour mettre à jour votre code, pour respecter les standards de code de Symfony.

Vous pouvez également trouver la configuration par défaut dans le fichier `.php-cs-fixer.dist.php` qui a été créé. Si vous souhaitez la modifier, vous pouvez le faire dans ce fichier, ou dans un fichier `.php-cs-fixer.php` à la racine de votre projet (il ne sera pas versionné).

### PHPStan

[PHPStan est un analyseur statique de code](https://phpstan.org/blog/find-bugs-in-your-code-without-writing-tests). Son but est de détecter autant d'erreurs que possible, simplement en relisant votre code, vérifiant la cohérence des types (de vos variables, paramètres, retours, etc.), des appels, des classes, etc.

Il aide également à écrire un code solide et compréhensible pour les autres développeurs, en renforçant les typages et d'autres bonnes pratiques.

PHPStan fournit 10 niveaux de tests (de 0 à 9), plus ou moins exigeants et nécessitant plus ou moins de modifications dans votre code, pour le rendre meilleur. Je recommande un niveau de 5, au minimum, sur les projets Symfony.

Pour l'installer sur un projet Symfony :

```shell
composer require --dev phpstan/extension-installer phpstan/phpstan-symfony phpstan/phpstan-doctrine phpstan/phpstan-strict-rules
```

Je vous conseille de créer un fichier `phpstan.neon` à la racine de votre projet, pour configurer l'exécution de PHPStan et le lancer plus simplement :

```yaml
parameters:
  level: 9
  paths:
    - src
```

Bien sûr, si vous ne voulez pas affronter le niveau 9 directement, remplacez par le niveau souhaité (il est utile de corriger les problèmes en augmentant le niveau progressivement).

Pour lancer PHPStan : `vendor/bin/phpstan analyse`

### Lancer nos outils avec Composer

Pour éviter de retenir des chemins complexes, nous pouvons préciser des scripts dans notre `composer.json` (:warning: ne remplacez pas les scripts existants, ajoutez seulement les vôtres) :

```json
{
  "scripts": {
    "fix": "php-cs-fixer fix",
    "analyse": "phpstan analyse"
  }
}
```

Ajouter les 2 lignes `fix` et `analyse` dans vos scripts, permet de définir des raccourcis pour lancer Php CS Fixer et PHPStan, sans avoir à se rappeler le détail des commandes ;) .

Ces commandes peuvent être lancées avec `composer fix` et `composer analyse`