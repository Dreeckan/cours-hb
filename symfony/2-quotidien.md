# Symfony au quotidien

## Créer un nouveau projet

Dans un terminal (Powershell par exemple, sous Windows), aller dans le dossier où vous voulez créer votre projet et lancer la commande :

```bash
  symfony new --full my_project
```

Remplacer `my_project` par le nom de votre projet. Vous aurez alors un dossier `my_project`, que vous pouvez ouvrir dans votre IDE.


## Git et les projets Symfony

Par défaut, le programme en ligne de commande de Symfony crée un projet avec un repository (local uniquement) Git. Vous pouvez donc le lier à un projet sur Github, Gitlab, Bitbucket ou autre.

```shell
git remote add origin urlDeVotreRepository
git push --all origin
```

Noter également la présence d'un fichier `.gitignore` à la racine du projet. Il pourra servir si vous voulez éviter de versionner certains fichiers.
Si vous utilisez PHPStorm, je vous recommande de **toujours** ajouter le dossier `.idea` à votre fichier `.gitignore` (c'est un dossier de PHPStorm qui retient vos recherches, certains éléments de configuration locale, etc.).

## Démarrer le serveur Symfony au démarrage

Après avoir ouvert un projet Symfony dans votre IDE, faites quelques étapes simples et vous êtes prêts à travailler.

- Ouvrir un terminal (Sur PHPStorm : cliquer sur `terminal` en bas de la fenêtre, sur VSCode, dans le menu du haut, cliquer sur `Terminal` > `New Terminal`)
- Lancer la commande `symfony serve`

Vous pouvez la laisser tourner en tâche de fond (et y revenir de temps en temps si vous avez des erreurs) et pour utiliser la ligne de commande, vous pouvez ouvrir un nouveau terminal (avec les deux IDE, il y a un bouton `+`).
Et vous pouvez utiliser votre site à l'adresse indiqué par le serveur (en général [http://127.0.0.1:8000](http://127.0.0.1:8000) ou [https://127.0.0.1:8000](https://127.0.0.1:8000)).
