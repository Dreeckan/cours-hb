# Git

Introduction en vidéo : 

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/55b8f8a0bbc94c189bb7319572371770" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Git est un logiciel de gestion de versions, simplifiant grandement le travail en équipe dans les projets informatiques (mais pas que ;) ). Nous allons voir ensemble comment s'en servir et en quoi il peut nous être utile.

## Pré-requis

- Avoir un outil de ligne de commande installé (Git Bash, Terminal, Powershell, etc.)
- Installer Git (lien pour [installer Git pour Windows](https://git-scm.com/download/win))

L'installation en Vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/1a793713a89d4e4581e0261cb2679e52" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>


## Resources

- [En français, par Github](https://training.github.com/downloads/fr/github-git-cheat-sheet.pdf)
- [Un tuto complet en Français par Bitbucket](https://www.atlassian.com/fr/git/tutorials)


## Terminologie

### Git

Git est un **logiciel** en ligne de commande, permettant la gestion de version d'un projet et le travail collaboratif. Il est installé sur les machines des différents participants au projet et permet de suivre ses modifications au fil du temps.

Il a de nombreux avantages, dont :

- l'historique complet des changements ayant eu lieu sur un fichier (qui y a fait quoi et quand ?)
- le travail en équipe en parallèle, où chaque membre de l'équipe peut travailler sans être gêné par le travail des autres (modifier les mêmes fichiers en même temps, etc.) grâce aux branches
- la traçabilité des changements, à travers tout le projet et au fil du temps. Chaque ensemble de modifications est accompagné d'un message précisant le but des changements.

En un mot, Git facilite grandement le travail collaboratif **et** la gestion d'un projet.

### Dépôt / repository

Ce qu'on appelle un dépôt est le dossier `.git` se trouvant dans le dossier de votre projet. Il a été créé par Git (à votre demande) pour suivre les modifications et les recenser. 

On parle aussi de dépôt local pour ce dossier sur votre machine, et de dépôt distant lorsqu'il se trouve sur une autre machine (en général, un outil en ligne comme GitHub / GitLab / BitBucket).

#### GitHub / GitLab / BitBucket

Ce sont trois exemples de sites permettant d'avoir un dépôt distant, servant de point central (et de sauvegarde) à vos projets. Tous trois ont leurs spécificités, mais se basent sur Git et fournissent des outils similaires. Nous allons nous concentrer sur GitHub dans ce cours et je vous invite à y créer un compte.

Une autre utilité de ces sites, en tant que développeurs ou développeuses, est de montrer votre activité et présenter votre travail à des collègues ou recruteurs (beaucoup de dev se servent de leurs profils sur ces outils comme complément à leur CV).


## Avant de commencer

### Modifier la configuration de Git

En vidéo : 

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/43b5069e990948efbe0797313209708d" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Trois configurations nous sont utiles :

- `git config --global core.editor "nano"` nous permet de changer l'éditeur de texte par défaut à utiliser avec Git (lors d'un commit, d'un rebase, etc.). Pour des programmes qui ne sont pas disponibles directement en ligne de commande (Visual Studio, Sublime Text, etc.), il faut entrer le chemin complet et le nom de l'exécutable (`"C:\Program Files\Sublime Text 3\sublime_text.exe"` par exemple)
- `git config --global user.email "votre@email.exemple"` pour changer l'adresse email de signature des commits (vous aurez probablement à lancer cette commande lors de la première utilisation de Git)
- `git config --global user.name "Votre Nom"` pour changer le nom de signature des commits (vous aurez probablement à lancer cette commande lors de la première utilisation de Git)

Vous pouvez également modifier le fichier `~/.gitconfig` (fichier `.gitconfig` dans votre dossier personnel) pour mettre à jour la configuration de Git pour votre utilisateur.

### Les alias pour raccourcir les commandes

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/a6d96fa1ca754fbc867d630186f0df0e" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Pour créer des alias (raccourci pour une commande Git), on modifie la configuration et on ajoute des éléments dans le paramètre `alias` :

```bash
git config --global alias.commandeRaccourcie "commande plus longue que l'on souhaite utilisée"
git config --global alias.co "checkout" # git co devient un raccourci pour git checkout
git config --global alias.unstage "reset HEAD --" # git unstage unFichier devient un raccourci pour git reset HEAD -- unFichier
```

### Utiliser SSH 

Pour les principes et l'installation d'OpenSSH, je vous invite à jeter un œil [à la section dédiée sur le cours Linux](../linux/#openssh).

## Créer un dépôt (local)

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/80dc49928e794a1b8f2e1e5041134b77" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Il y a essentiellement deux cas qui vont vous amener à créer un dépôt local :

- vous avez des fichiers locaux (sur votre machine) que vous souhaitez versionner
- vous voulez contribuer à un projet ayant déjà un dépôt distant

### Init

La commande `git init` permet de créer le dossier `.git` dans un dossier contenant des fichiers à versionner (la racine de votre projet). Cette commande s'utilise dans un **projet qui n'est pas versionné** et vous permet de commencer à le faire.

### Clone

La commande `git clone` vous permet de copier (cloner) un dépôt distant, pour créer un dépôt local, vous permettant de travailler. Elle a deux utilisations principales :

Créer un dossier portant le nom du projet, dans le dossier en cours :

```bash
git clone lienDuProjet
```

Remplir un dossier avec les fichiers du projet (et le créer si besoin) :

```bash
git clone lienDuProjet chemin/vers/le/dossier
```

Sur Github, vous trouverez le lien du projet grâce au bouton vert `Code` : 

![](/assets/img/git/url_clone.png)

:warning: Pour travailler sur un projet avec Git, on ne télécharge jamais de zip ou autre fichier, mais on passe **toujours** par la commande `clone`. 

## Enregistrer des changements

### Status - Voir l'état du dépôt local

En vidéo : 

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/14f386d48da142d5bcc2f27a85fd691c" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

`git status` :

Cette commande nous permet de voir les modifications depuis la dernière version enregistrée (le dernier commit). On peut y voir les fichiers créés, modifiés ou supprimés, et s'ils sont en attente de validation ou non (ajoutés à l'index, ou non).

### Diff - Voir les modifications en attente

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/b285ee8b7aac487e8e37ebb17179f73e" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

`git diff` affiche l'ensemble des modifications sur les fichiers déjà versionnés par Git. Cette commande présente tous les fichiers modifiés et les changements à l'intérieur (les lignes commençant par `+` sont ajoutées, celles commençant par `-` sont supprimées par rapport à la version précédemment enregistrée).

Pour voir uniquement les modifications d'un ou plusieurs fichiers, utiliser `git diff nomDuFichier nomDUnAutreFichier`.

### .gitignore - Ne pas versionner des fichiers

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

### Add - Préparer un commit

En vidéo : 

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/3067a76b00c6455daa22a7dc2fc3c132" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

`git add` permet d'ajouter des modifications à l'index. L'idée de cette commande est de préparer la création d'un commit (version signée contenant un ensemble cohérent de modifications) et de dire à Git quelles modifications nous allons vouloir valider par la suite. 

Quelques usages courants :

- `git add .` ajoute à l'index toutes les modifications, ainsi que les nouveaux fichiers et les fichiers supprimés
- `git add nomDuFichier nomDUnAutreFichier` ajoute uniquement à l'index les modifications des fichiers `nomDuFichier` et `nomDUnAutreFichier`
- `git add -p` ouvre un mode interactif permettant de choisir quelles modifications ajouter à l'index dans vos fichiers **modifiés** (n'affiche pas les nouveaux fichiers ou les fichiers supprimés).

### Commit - Valider des modifications

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/dfec002e50714c2d8007e67670b9ca51" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

`git commit` enregistre les modifications de l'index et leur associe un auteur (avec un nom et un email) et un message (obligatoire). On peut dire que `git commit` créer une nouvelle version ou valide les modifications.

Quelques usages courants :

- `git commit -m "Votre message de commit"` vous permet de créer un commit et d'y associer directement un message
- `git commit` vous permet de créer un commit et ouvre l'éditeur de texte par défaut pour entrer un message

:warning: Dans tous les cas, si vous laissez un message vide, le commit ne sera pas enregistré.

### Log - Voir l'historique des commits

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/a39d82c5d5f84b0e8df96af56d3f9ad7" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Pour voir l'historique des commits, avec leurs auteurs, les dates, etc. on utilise la commande `git log`.

Quelques usages courants :

- `git log` affiche toutes les informations des commits, sous forme de liste (un peu rude à lire parfois)
- `git log --graph` les affiche sous forme d'arbre (très pratique lorsque votre dépôt a des branches)

### Stash - Remiser des modifications

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


## Des branches

Introduction en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/b2fd25a25ca744b5be30129d37580275" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Les branches sont l'un des principaux outils de travail en équipe avec un outil de gestion de version tel que Git. Une branche nous permet de créer un ensemble de commits (en général lié à une fonctionnalité ou un débug) indépendants de la branche principale. On parle alors de branche de travail. 

Cette branche a une origine, le commit sur lequel se trouvait la tête de lecture, et son but est d'être fusionnée avec la branche principale, une fois le développement de la fonctionnalité terminé.

### Lister les branches

En vidéo : 

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/5f21307d9f484e1ebd63ea221db8e415" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Pour lister les branches et vérifier sur laquelle setrouve la tête de lecture, on utilise la commande `git branch`.

### Créer une branche

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/2338ecbd6c4e4bf79cf03e272fb4c42b" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Pour créer une branche, deux options existent :

- `git branch nomDeLaNouvelleBranche` crée une branche, **mais ne déplace pas la tête de lecture**
- `git checkout -b nomDeLaNouvelleBranche` crée une branche et deplace la tête de lecture (nous verrons la commande `checkout` par la suite)

### Changer de branche

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/8beb17f8d7b147d085c1222436313472" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Pour changer de branche, la commande `git checkout` s'utilise de la manière suivante :
`git checkout nomDeLaBranche`.

`git checkout` permet, de manière plus générale, de déplacer la tête de lecture sur une référence (une branche, un tag, un commit, etc.).

## Mise en commun du travail

Introduction en vidéo : 

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/b3e98e3f1df34ddfa2cf73f94b49b449" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Pour la plupart des projets, le travail de groupe est primordial. Git nous permet de grandement le simplifier, mais le faire en ligne de commande serait bien pénible.

C'est pour ça (et bien d'autres choses) que des outils en ligne existent, tels que :
- [GitHub](https://www.github.com)
- [BitBucket](https://bitbucket.org)
- [GitLab](https://gitlab.com)
- et sûrement bien d'autres !

Nous allons nous concentrer sur le premier, car le plus répandu, mais sachez que GitLab et BitBucket peuvent être installés gratuitement sur un serveur privé (c'est ce que nous avons fait chez [Drakona](https://www.drakolab.fr) ;) ).

Je vous conseille donc de créer au moins un compte sur [GitHub](https://www.github.com), qui pourra également vous servir de portfolio ou de carte de visite !

### Créer un repository distant

En vidéo : 

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/a3220709a8304d1c9f9b98fc1f204a51" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Pour créer un repository sur GitHub, il suffit d'aller sur [la page de création d'un dépôt](https://github.com/new), d'entrer un nom et de décocher les cases... Et tout est prêt pour la suite.

### Lier le local et le distant

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/ba54e2869b2649299a88f5b7a57ac570" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Si vous avez déjà un dépôt local **non vide** (avec au moins 1 commit), nous allons associer ce local avec le distant que nous avons créé sur GitHub avec la commande
`git remote add origin git@github.com:cheminDuDepot.git` où `origin` est l'alias (ou le nom) du dépôt distant, pour votre machine et `git@github.com:cheminDuDepot.git` le lien SSH vers votre dépôt distant.

Si vous n'avez qu'un repository distant **non vide** (avec au moins 1 commit), nous pouvons récupérer les fichiers **et** lier les deux dépôts avec 
`git clone git@github.com:cheminDuDepot.git` qui créera un dossier portant le nom du projet, là où vous vous trouvez.
Dans ce cas, le distant s'appellera origin et sera directement lié (le dossier est prêt à être utilisé).

Si vous avez un dossier vide, il faut :
- initialiser un dépôt git avec `git init`
- créer un premier fichier (ou un ensemble de fichiers)
- créer un premier commit
- lier ce nouveau dépôt avec le dépôt distant `git remote add origin git@github.com:cheminDuDepot.git`

### Push et pull



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


## Des outils pour se simplifier Git

### VsCode

### PHPStorm

### GitKraken