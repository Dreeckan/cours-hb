# Pense-bêtes

## Démarrer un projet Symfony (de zéro)

- `symfony new --full nomDeVotreProjet`
- `git remote add origin UrlVersLeRepository`
- `git branch -M main`
- `git push -u origin main`

## Récupérer un projet (clone)

- `git clone UrlVersLeRepository chemin/vers/le/repository` (exemple : `git clone git@github.com:Dreeckan/symfony-computer.git symfony-computer`)
- `cd chemin/vers/le/repository` (exemple : `cd symfony-computer`)
- `composer install` (pour mettre à jour le contenu du dossier `vendor` et récupérer les dépendances, telles que Symfony)
- Vous êtes prêts à travailler

## Générer des entités et des migrations

- Pour générer/modifier une entité : `php bin/console make:entity`
- Répéter autant que nécessaire
- Générer une migration `php bin/console make:migration`
- Appliquer les migrations `php bin/console doctrine:migrations:migrate -n`
- Votre BdD est à jour

