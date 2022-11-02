# Des branches

Introduction en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/b2fd25a25ca744b5be30129d37580275" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Les branches sont l'un des principaux outils de travail en équipe avec un outil de gestion de version tel que Git. Une branche nous permet de créer un ensemble de commits (en général lié à une fonctionnalité ou un débug) indépendants de la branche principale. On parle alors de branche de travail. 

Cette branche a une origine, le commit sur lequel se trouvait la tête de lecture et son but est d'être fusionnée avec la branche principale, une fois le développement de la fonctionnalité terminé.

## Lister les branches

En vidéo : 

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/5f21307d9f484e1ebd63ea221db8e415" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Pour lister les branches et vérifier sur laquelle se trouve la tête de lecture, on utilise la commande `git branch`.

## Créer une branche

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/2338ecbd6c4e4bf79cf03e272fb4c42b" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Pour créer une branche, deux options existent :

- `git branch nomDeLaNouvelleBranche` crée une branche, **mais ne déplace pas la tête de lecture**
- `git checkout -b nomDeLaNouvelleBranche` crée une branche et déplace la tête de lecture (nous verrons la commande `checkout` par la suite)

## Changer de branche

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/8beb17f8d7b147d085c1222436313472" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Pour changer de branche, la commande `git checkout` s'utilise de la manière suivante :
`git checkout nomDeLaBranche`.

`git checkout` permet, de manière plus générale, de déplacer la tête de lecture sur une référence (une branche, un tag, un commit, etc.).
