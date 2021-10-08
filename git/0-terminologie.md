# Terminologie

## Git

Git est un **logiciel** en ligne de commande, permettant la gestion de version d'un projet et le travail collaboratif. Il est installé sur les machines des différents participants au projet et permet de suivre ses modifications au fil du temps.

Il a de nombreux avantages, dont :

- l'historique complet des changements ayant eu lieu sur un fichier (qui y a fait quoi et quand ?)
- le travail en équipe en parallèle, où chaque membre de l'équipe peut travailler sans être gêné par le travail des autres (modifier les mêmes fichiers en même temps, etc.) grâce aux branches
- la traçabilité des changements, à travers tout le projet et au fil du temps. Chaque ensemble de modifications est accompagné d'un message précisant le but des changements.

En un mot, Git facilite grandement le travail collaboratif **et** la gestion d'un projet.

## Dépôt / repository

Ce qu'on appelle un dépôt est le dossier `.git` se trouvant dans le dossier de votre projet. Il a été créé par Git (à votre demande) pour suivre les modifications et les recenser. 

On parle aussi de dépôt local pour ce dossier sur votre machine, et de dépôt distant lorsqu'il se trouve sur une autre machine (en général, un outil en ligne comme GitHub / GitLab / BitBucket).

### GitHub / GitLab / BitBucket

Ce sont trois exemples de sites permettant d'avoir un dépôt distant, servant de point central (et de sauvegarde) à vos projets. Tous trois ont leurs spécificités, mais se basent sur Git et fournissent des outils similaires. Nous allons nous concentrer sur GitHub dans ce cours et je vous invite à y créer un compte.

Une autre utilité de ces sites, en tant que développeurs ou développeuses, est de montrer votre activité et présenter votre travail à des collègues ou recruteurs (beaucoup de dev se servent de leurs profils sur ces outils comme complément à leur CV).
