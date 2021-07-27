# Pense-bêtes

## Démarrer un projet Symfony (de zéro)

- `symfony new --full nomDeVotreProjet`
- `cd nomDeVotreProjet`
- `git remote add origin UrlVersLeRepository`
- `git branch -M main`
- `git push -u origin main`

## Récupérer un projet (clone)

- `git clone UrlVersLeRepository chemin/vers/le/repository` (exemple : `git clone git@github.com:Dreeckan/symfony-computer.git symfony-computer`)
- `cd chemin/vers/le/repository` (exemple : `cd symfony-computer`)
- `composer install` (pour mettre à jour le contenu du dossier `vendor` et récupérer les dépendances, telles que Symfony)
- Vous êtes prêts à travailler

S'il a déjà une BdD initialisée (avec des migrations), il faut aussi les appliquer (pour mettre à jour votre BdD) :
- `php bin/console doctrine:database:create` (si vous n'avez pas déjà la BdD)
- `php bin/console doctrine:migrations:migrate -n`

## Travailler sur un projet

- Ouvrir Wamp/Mamp pour la BdD et PhpMyAdmin (ou les avoir installés)
- Ouvrir un terminal (dans votre IDE par exemple)
- `symfony serve` qui vous dira sur quelle adresse vous connecter pour tester votre site

## Commandes composer

- `composer install` pour récupérer les dépendances définies dans le `.lock`
- `composer update` pour mettre à jour les dépendances et le `.lock`
- `composer require nomDuPaquet` pour installer une dépendance (suivre la doc de la dépendance)

## Dé-buguer

- `dump` ou `dd` dans un fichier PHP
- `dump` dans un Twig
- `php bin/console` montre l'intégralité des commandes dont dispose Symfony (dont plusieurs commence par `debug:` ou `lint:`)

## Générer des entités et des migrations

- Pour générer/modifier une entité : `php bin/console make:entity`
- Répéter autant que nécessaire
- Générer une migration `php bin/console make:migration`
- Appliquer les migrations `php bin/console doctrine:migrations:migrate -n`
- Votre BdD est à jour

## Doctrine

- Pour faire des requêtes `SELECT`, utiliser un repository (lié à une table/entité)
- Pour les `UPDATE` / `DELETE`, utiliser l'Entity Manager (`EntityManagerInterface`)

## Formulaires

- Souvent lié à une classe / entité
- Un `FormType` pour gérer les différents champs, leurs types et leurs options
- Des assertions directement dans la classe / entité pour la validation
- Dans un controller, utiliser `$this->createForm()` pour générer un formulaire (objet de traitement), puis utiliser `->createView()` sur ce formulaire pour le transmettre à une vue Twig (objet `FormView`)
- Afficher le formulaire et ses différentes lignes avec `form_start`, `form_end` et `form_row`

## Bundles utiles

- [VichUploader](https://github.com/dustin10/VichUploaderBundle/blob/master/docs/index.md) pour utiliser des images liées à vos entités
- [ApiPlatform](https://api-platform.com/docs/distribution/#using-symfony-and-composer) vous permet de créer une API rapidement dans votre Symfony, à partir de vos entités.