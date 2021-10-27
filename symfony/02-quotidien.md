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

Pour utiliser un nom de domaine, ajouter dans le fichier `/etc/hosts` (Linux et Mac) ou `C:\windows\system32\drivers\etc\hosts` sous Windows :
```
127.0.0.1       www.test.test
```
et votre site sera accessible sur `www.test.test:8000`

### En cas de soucis 

Si votre site local n'est pas accessible (ni sur [http://127.0.0.1:8000](http://127.0.0.1:8000) ou [https://127.0.0.1:8000](https://127.0.0.1:8000)), vérifiez :

- que vous avez lancé votre serveur dans le bon dossier (la racine de votre projet Symfony)
- qu'il n'y a pas (trop) d'erreurs lors du lancement de la commande `symfony serve`
- l'url sur laquelle le serveur doit répondre (ce serveur permet également d'avoir plusieurs serveurs en parallèle, chacun aura son propre port)

Si vous avez vérifié tout ça, essayer de redémarrer le serveur : 

- `symfony server:stop` pour l'arrêter
- `symfony serve` pour le relancer

### Processus de travail en groupe

Au quotidien, je travaille sur des tickets, afin de savoir les tâches à effectuer.

Quand je commence à travailler sur un nouveau ticket,
- Je marque le ticket comme "en cours"
- Je crée une branche contenant le numéro et le but du ticket (ex : `42-connexion-utilisateur`)

Lorsque je crée des commits, j'inclus le numéro de ticket dans le message de commit (ex : `42 - Création de l'entité User`)

Je push quand je le souhaite, la fonctionnalité terminée ou non.

Une fois la fonctionnalité terminée, je crée une <abbr title="Pull Request">PR</abbr>, que je m'assigne, et je demande à mes collègues de la relire (je peux les ajouter en tant que reviewers).

Si la branche principale a été modifiée entre temps ou si des conflits sont indiqués par GitHub, je mets à jour ma branche :
- Je mets à jour la branche principale `git checkout main` et `git pull`
- Je retourne sur ma branche `git checkout -`
- Je rebase ma branche sur la branche principale `git rebase main`

Si des conflits apparaissent pendant le rebase :
- Je les vois avec `git status`, ce sont les fichiers en rouge `modifié des deux côtés`/`both modified`
- Je les corrige dans mon <abbr title="Integrated Development Environment">IDE</abbr>
- Je signale à git que les conflits sont corrigés `git add nomDuFichier`
- Je continue le rebase (je passe au commit suivant) `git rebase --continue`

Une fois le rebase fait, je push le nouvel historique `git push --force`

:warning: Vérifiez bien que vous n'avez rien cassé **avant** de push en force.

J'attends que mes collègues aient relu et validé ma <abbr title="Pull Request">PR</abbr>. C'est en général le moment pour moi de relire les <abbr title="Pull Request">PR</abbr> de mes collègues ou commencer un nouveau ticket.

