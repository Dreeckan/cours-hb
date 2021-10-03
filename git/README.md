# Git

## Resources

- [En français, par Github](https://training.github.com/downloads/fr/github-git-cheat-sheet.pdf)
- [Un tuto complet en Français par Bitbucket](https://www.atlassian.com/fr/git/tutorials)

## Au quotidien

- `git status` :

Voir l'état d'un repository local. Savoir quels fichiers ont été modifiés, ajoutés ou supprimés, si la branche est bien synchronisée avec celle du serveur (si elle existe ET est synchronisée).

- `git diff` :

Voir les modifications dans un fichier (`git diff nomDuFichier`) ou l'ensemble des modifications dans les fichiers (attention, les ajouts de fichiers n'apparaissent pas).

- `git add chemin/vers/un/ou/des/fichiers` : 

Ajouter un ou plusieurs fichiers à l'index ("les préparer à être commit"). Peut être utilisée avec `git add .` pour ajouter tous les fichiers ou `git add nomDunDossier` pour un dossier et tous les fichiers modifiés qu'il contient. 
Une autre utilisation possible est `git add -p`, qui vous permet d'afficher les modifications et de les ajouter par chunk (petits morceaux). Idéal si vous ne voulez prendre que certaines modifications, dans des fichiers précis, pour créer un commit.

- `git commit` : 

Valider les modifications de l'index (ajoutée avec `git add`) dans un ensemble cohérent, avec un message de description. Sans option, `git commit` ouvre un éditeur de texte en ligne de commande (`vim` ou `nano`). S'utilise avec l'option `-m "Votre message"` pour entrer le message directement (sans avoir besoin d'ouvrir un éditeur de texte).

- `git push` :

Si vous avez un repository distant lié et synchronisé, `git push` envoie les nouveaux commits de la branche en cours sur le repository distant. Pour synchroniser la branche avec le repository distant, vous pouvez faire `git push -u origin votreBranche` (où `origin` est le nom que vous avez donné à votre repository distant : voir la commande `git remote add`).

- `git pull` :

Si vous avez un repository distant lié et synchronisé, `git pull` récupère les nouveaux commits de la branche en cours sur le repository distant. Si le repository ou la branche n'est pas synchronisé, il faut préciser le nom du serveur et de la branche à récupérer : `git pull origin votreBranche` (où `origin` est le nom que vous avez donné à votre repository distant : voir la commande `git remote add`).

## Commandes de mise en place d'un projet

- `git init` :

Pour démarrer un repository local. Se placer dans le dossier à versionner avant. Une fois le repository initialiser, il faut au moins créer un premier commit et lier un repository distant (pour pouvoir push, si tel est votre besoin).

- `git remote add origin repositoryDistant` :
  
Pour ajouter un repository distant (`repositoryDistant` est l'url et `origin` un alias du serveur). Vous pouvez avoir autant de repositories distants que vous le souhaitez, mais il est conseillé de n'en avoir qu'un par projet (si besoin, vous pouvez utiliser ce que l'on appelle des miroirs).

- `git remote remove origin` :
  
Pour supprimer la liaison avec un repository distant (`origin` un alias du serveur). Attention, cela ne supprimer pas le repository distant, seulement le lien entre votre repository local et ce repository distant.

- `git clone repositoryDistant nomDuDossierDeDestination` :

Récupère un projet distant (présent sur Github, Bitbucket ou Gitlab) et crée un dossier `nomDuDossierDeDestination`. Si ce `nomDuDossierDeDestination` n'est pas défini, un dossier portant le nom du projet sera créé (Pour un projet comme `https://github.com/Dreeckan/exercices-php/`, le dossier sera `exercices-php`).



## Terminologie

## Créer un dépôt (local)

### config

### alias

### init

### clone

## Enregistrer des changements

### status

### diff

### add

### .gitignore

### commit

### stash

## Des branches

### Créer

### changer de branche

## Mise en commun du travail

### push

### pull

### PR

### Merge, rebase, conflits

## Annuler des changements

### checkout

### clean

### revert

### reset

### rm

## Réécrire l'historique

### commit --amend

### rebase