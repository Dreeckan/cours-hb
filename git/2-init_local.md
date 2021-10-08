# Créer un dépôt (local)

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/80dc49928e794a1b8f2e1e5041134b77" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Il y a essentiellement deux cas qui vont vous amener à créer un dépôt local :

- vous avez des fichiers locaux (sur votre machine) que vous souhaitez versionner
- vous voulez contribuer à un projet ayant déjà un dépôt distant

## Init

La commande `git init` permet de créer le dossier `.git` dans un dossier contenant des fichiers à versionner (la racine de votre projet). Cette commande s'utilise dans un **projet qui n'est pas versionné** et vous permet de commencer à le faire.

## Clone

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
