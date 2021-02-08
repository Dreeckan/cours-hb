# Symfony

Cette partie va reprendre en grande partie le fonctionnement de [la documentation officielle de Symfony](https://symfony.com/doc/current/index.html). Cette documentation servira de référence assez souvent tout au long de ce cours.

## Installation

Avant de pouvoir travailler concrètement sur Symfony, il faut mettre en place notre environnement de travail.

Pour cela, nous allons installer : 
- [Composer, gestionnaire de paquet pour PHP](https://getcomposer.org/download/)
- [l'outil en ligne de commande de Symfony](https://symfony.com/download)
  
Si vous utilisez Windows, je vous conseille d'utiliser Powershell pour éviter des erreurs de rendu.

Pour créer un projet Symfony, nous pouvons maintenant utiliser notre ligne de commande (PowerShell dans mon cas) : 

```bash
  symfony new --full my_project
```

Pour lancer un serveur (nous allons utiliser le serveur fourni par Symfony, plutôt que Wamp) :

```bash
cd my_project
symfony server:start
```

Vous pouvez alors ouvrir ce nouveau dossier avec votre IDE favori et commencer à travailler. Le site devrait être disponible avec l'url `http://localhost:8000/`

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
- `var` : des fichiers temporaires (cache, logs, etc.) qui vont servir de ressources pour l'exécution de notre site
- `vendor` : les librairies dont nous allons nous servir (dont Symfony !)