# Structure et utilisation d'un projet

## Pour résumer

- `composer install` pour télécharger le contenu du dossier `vendor` (non versionné) ou le mettre à jour à partir du `composer.lock`
- `composer update` pour mettre à jour le contenu du dossier `vendor` avec les dernières versions disponibles (modifie le `composer.lock` et `symfony.lock`)
- La configuration d'un projet Symfony se passe dans `.env` ou `.env.local` (configuration liée à la machine qui lance le projet) ou dans le dossier `config` (configuration des librairies utilisées)
- **Tous** les fichiers visibles par les utilisateurs du site (css, js, etc.) sont dans le dossier `public`
- Le code Php que nous allons produire se trouve dans `src`
- Les vues (templates Twig) se trouvent dans `templates`

## Structure d'un projet Symfony

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

### Installer les dépendances d'un projet

La commande `composer install` permet de récupérer les versions définies dans le fichier `.lock` (et de mettre à jour votre projet si ce fichier a été modifié).

La commande `composer update` tente de mettre à jour vos dépendances, en fonction des contraintes définies dans le fichier `composer.json`. **Attention**, cette commande met à jour le fichier `.lock`.

Si vous avez besoin d'installer une nouvelle dépendance, il faudra utiliser `composer require nomDuPaquetAInstaller`. La commande exacte est en général fournie dans la documentation d'installation de la dépendance (et il est préférable de suivre cette source). Certains bundles utilisent des recettes pour créer des fichiers supplémentaires, mettre en place une configuration de base, etc. et il vaut mieux les y autoriser ! Ces recettes sont là pour vous faire gagner du temps, et elles le font bien ;) .