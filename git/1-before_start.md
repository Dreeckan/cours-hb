# Avant de commencer

Tous les éléments présentés dans cette partie sont à faire une seule fois par machine ou système d'exploitation. Ce sont donc des opérations assez rares et très peu souvent utiles, mais bonnes à savoir retrouver.


## Modifier la configuration de Git

En vidéo : 

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/43b5069e990948efbe0797313209708d" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Trois configurations nous sont utiles :

- `git config --global core.editor "nano"` nous permet de changer l'éditeur de texte par défaut à utiliser avec Git (lors d'un commit, d'un rebase, etc.). Pour des programmes qui ne sont pas disponibles directement en ligne de commande (Visual Studio, Sublime Text, etc.), il faut entrer le chemin complet et le nom de l'exécutable (`"C:\Program Files\Sublime Text 3\sublime_text.exe"` par exemple)
- `git config --global user.email "votre@email.exemple"` pour changer l'adresse email de signature des commits (vous aurez probablement à lancer cette commande lors de la première utilisation de Git)
- `git config --global user.name "Votre Nom"` pour changer le nom de signature des commits (vous aurez probablement à lancer cette commande lors de la première utilisation de Git)

Vous pouvez également modifier le fichier `~/.gitconfig` (fichier `.gitconfig` dans votre dossier personnel) pour mettre à jour la configuration de Git pour votre utilisateur.

## Les alias pour raccourcir les commandes

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/a6d96fa1ca754fbc867d630186f0df0e" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Pour créer des alias (raccourci pour une commande Git), on modifie la configuration et on ajoute des éléments dans le paramètre `alias` :

```bash
git config --global alias.commandeRaccourcie "commande plus longue que l'on souhaite utilisée"
git config --global alias.co "checkout" # git co devient un raccourci pour git checkout
git config --global alias.unstage "reset HEAD --" # git unstage unFichier devient un raccourci pour git reset HEAD -- unFichier
```

## Utiliser SSH 

Pour les principes et l'installation d'OpenSSH, je vous invite à jeter un œil [à la section dédiée sur le cours Linux](../linux/#openssh).
