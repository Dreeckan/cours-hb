# Enregistrer des changements

## Status - Voir l'état du dépôt local

En vidéo : 

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/14f386d48da142d5bcc2f27a85fd691c" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

`git status` :

Cette commande nous permet de voir les modifications depuis la dernière version enregistrée (le dernier commit). On peut y voir les fichiers créés, modifiés ou supprimés, et s'ils sont en attente de validation ou non (ajoutés à l'index, ou non).

## Diff - Voir les modifications en attente

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/b285ee8b7aac487e8e37ebb17179f73e" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

`git diff` affiche l'ensemble des modifications sur les fichiers déjà versionnés par Git. Cette commande présente tous les fichiers modifiés et les changements à l'intérieur (les lignes commençant par `+` sont ajoutées, celles commençant par `-` sont supprimées par rapport à la version précédemment enregistrée).

Pour voir uniquement les modifications d'un ou plusieurs fichiers, utiliser `git diff nomDuFichier nomDUnAutreFichier`.

## .gitignore - Ne pas versionner des fichiers

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/cbf45501b82c480eb911f3d3834f0281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Très souvent dans vos projets, vous ne voulez pas versionner certains fichiers (librairies externes qui sont téléchargées avec des gestionnaires de paquets (npm, composer, etc.), fichiers de cache, liés à l'IDE, etc.). 
Pour cela, on peut créer/modifier un fichier `.gitignore` à la racine du projet pour indiquer à Git les fichiers et dossiers à ignorer.

```gitignore
/node_modules/ # le dossier node_modules/ ne sera pas versionné
.vuepress/dist/ # Le sous-dossier dist/ du dossier .vuepress/ est ignoré (le reste du dossier .vuepress/ est versionné)
*.sublime-* # tous les fichiers qui contiennent .sublime- dans leur nom sont ignorés
.idea/ # Si vous utilisez PhpStorm, je vous recommande d'ignorer ce dossier également
.vscode/ # Si vous utilisez Visual Studio, je vous recommande d'ignorer ce dossier également
test.md # Le fichier test.md sera ignoré
**/*.cache # les fichiers terminant par .cache seront ignorés (dans les sous-dossiers, quel que soit leur niveau) 
```

## Add - Préparer un commit

En vidéo : 

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/3067a76b00c6455daa22a7dc2fc3c132" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

`git add` permet d'ajouter des modifications à l'index. L'idée de cette commande est de préparer la création d'un commit (version signée contenant un ensemble cohérent de modifications) et de dire à Git quelles modifications nous allons vouloir valider par la suite. 

Quelques usages courants :

- `git add .` ajoute à l'index toutes les modifications, ainsi que les nouveaux fichiers et les fichiers supprimés
- `git add nomDuFichier nomDUnAutreFichier` ajoute uniquement à l'index les modifications des fichiers `nomDuFichier` et `nomDUnAutreFichier`
- `git add -p` ouvre un mode interactif permettant de choisir quelles modifications ajouter à l'index dans vos fichiers **modifiés** (n'affiche pas les nouveaux fichiers ou les fichiers supprimés).

## Reset - Sortir des éléments de l'index

Si vous avez ajouté des fichiers à l'index, avec `git add`, mais que vous voulez les sortir de l'index, la commande `git reset` permet de revenir en arrière.

Quelques usages courants :
- `git reset` pour sortir **tous** les fichiers de l'index (vous conservez les modifications)
- `git reset nomDuFichier` pour sortir **uniquement** le fichier `nomDuFichier` de l'index (vous conservez les modifications)
- `git reset --hard` pour sortir **tous** les fichiers de l'index **et supprimer toutes les modifications**
- `git reset --hard nomDuFichier` pour sortir **uniquement** le fichier `nomDuFichier` de l'index **et supprimer toutes les modifications de ce fichier**

## Commit - Valider des modifications

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/dfec002e50714c2d8007e67670b9ca51" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

`git commit` enregistre les modifications de l'index et leur associe un auteur (avec un nom et un email) et un message (obligatoire). On peut dire que `git commit` créer une nouvelle version ou valide les modifications.

Quelques usages courants :

- `git commit -m "Votre message de commit"` vous permet de créer un commit et d'y associer directement un message
- `git commit` vous permet de créer un commit et ouvre l'éditeur de texte par défaut pour entrer un message

:warning: Dans tous les cas, si vous laissez un message vide, le commit ne sera pas enregistré.

## Log - Voir l'historique des commits

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/a39d82c5d5f84b0e8df96af56d3f9ad7" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Pour voir l'historique des commits, avec leurs auteurs, les dates, etc. on utilise la commande `git log`.

Quelques usages courants :

- `git log` affiche toutes les informations des commits, sous forme de liste (un peu rude à lire parfois)
- `git log --graph` les affiche sous forme d'arbre (très pratique lorsque votre dépôt a des branches)
- `git log --oneline` les affiche sous forme courte (identifiant de commit + message uniquement)
- `git log -p nom-du-fichier` pour voir l'historique et les modifications d'**un** fichier

## Stash - Remiser des modifications

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/e29607cf9a0741058e526192214573aa" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Il se peut que, pour une raison ou une autre, vous ayez besoin de mettre des modifications de côté (changement de ticket, une fonctionnalité à décaler / annuler, etc.). Les stash, ou remisages, permettent de revenir au commit précédent et faire disparaitre les modifications en cours sur vos fichiers, en les sauvegardant ailleurs.

Quelques usages courants :

- `git stash` pour mettre de côté toutes les modifications en cours (:warning: ne remise pas les nouveaux fichiers, `git stash -u` permet de le faire)
- `git stash pop` pour appliquer les modifications du dernier stash enregistré et le **supprimer** du remisage
- `git stash apply` pour appliquer les modifications du dernier stash enregistré et le **conserver** dans le remisage

Quelques usages moins courants (avec plusieurs stashes) :

- `git stash list` pour afficher la liste des stashes
- `git stash save "Un message pour se souvenir"` pour créer un stash avec un message associé. Très pratique pour se rappeler du but ou du contexte de ce stash
- `git stash pop stash@{1}` pop le stash avec l'identifiant 1 (voir le retour de `git stash list`)
- `git stash show` pour afficher le contenu du stash (`git stash show -p` pour voir le diff)
- `git stash drop stash@{1}` supprime le stash avec l'identifiant 1 (:warning: ces modifications sont perdues)
- `git stash clear` supprime **tous** les stashes
