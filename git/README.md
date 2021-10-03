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

### config

### alias

### SSH

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

## Des outils pour gérer Git

### VsCode

### PHPStorm

### GitKraken