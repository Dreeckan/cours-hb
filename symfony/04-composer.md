# Composer

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

## Installer les dépendances d'un projet

La commande `composer install` permet de récupérer les versions définies dans le fichier `.lock` (et de mettre à jour votre projet si ce fichier a été modifié).

La commande `composer update` tente de mettre à jour vos dépendances, en fonction des contraintes définies dans le fichier `composer.json`. **Attention**, cette commande met à jour le fichier `.lock`.

Si vous avez besoin d'installer une nouvelle dépendance, il faudra utiliser `composer require nomDuPaquetAInstaller`. La commande exacte est en général fournie dans la documentation d'installation de la dépendance (et il est préférable de suivre cette source).