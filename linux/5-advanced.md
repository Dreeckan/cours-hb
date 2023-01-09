# Commandes avancées

## Lancer des commandes en arrière-plan

Gestion des commandes en arrière-plan et meurtres de processus en une vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/bddf49e85f394643b51332a67c17a171" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

- Ajoutez une esperluette (`&`) à la fin de la commande pour la lancer en arrière-plan
- `jobs` affiche les processus en arrière-plan
- `fg %X` où X est le numéro du processus le bascule au premier plan

- `ctrl+Z` permet de mettre en pause un processus et le passe en arrière-plan
- `bg` pour le relancer

## Tuer des processus

- `kill -X Y` où Y est **l'identifiant** du processus
- `pkill -X Z` ou `killall -X Z` où Z est **le nom du processus** du processus

X peut être (entre 64 possibilités) :
- `SIGTERM` (15) lui demande gentiment de se fermer (signal par défaut)
- `SIGKILL` (9) tue le programme, littéralement

Exemples : 
- `kill -SIGKILL 2412`
- `pkill -15 top`
- `killall -9 chrome`

## Les utilisateurs

Utilisateurs et gestions des droits en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/9a863404793a4dc594102ff60cf304af" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Il y a 2 types d'utilisateurs :
- les utilisateurs système ne sont pas réels et sont dédiés à *une* tâche du système (pour certains services (ftp, serveur web, etc.) ou certaines tâches (backups, etc.)). Ils ne peuvent pas se connecter.
- les utilisateurs réels peuvent se connecter, ont un nom d'utilisateur unique et, entre autre un UID (identifiant unique, attribué par le système).

Chaque utilisateur appartient (toujours) à un groupe à son propre nom (ex : `toto` appartient au groupe `toto`). Il peut en avoir d'autres.

Chaque processus et chaque fichier appartiennent **toujours** à un utilisateur **et** un groupe.

Voir le fichier `/etc/passwd` pour la liste des utilisateurs et `/etc/shadow` pour les mots de passe (chiffrés).

### Root

Sur tous les systèmes UNIX, il existe un utilisateur `root` (dont le UID est 0), ayant tous les pouvoirs (lui seul peut modifier les fichiers systèmes). Il est très fortement déconseillé de s'en servir comme d'un utilisateur normal.
Toutefois, sur les distributions basées sur Debian (et sûrement d'autres ;) ), il existe une commande `sudo` (Super User DO) permettant d'exécuter une commande avec les mêmes droits que `root`.

### Commandes de gestion des utilisateurs

À exécuter en tant que super-utilisateur (avec `sudo` ou en se connectant en tant que `root` avec `su`) :

- `useradd identifiantDeVotreUtilisateur` pour créer un utilisateur (voir le manuel pour plus d'options, notamment `-d /chemin/vers/le/homme/du/user`, `-m`, ou `-G`)
- `usermod identifiantDeVotreUtilisateur` s'utilise avec les mêmes options pour modifier un utilisateur existant
- `userdel identifiantDeVotreUtilisateur` pour supprimer un utilisateur
- `passwd` pour modifier le mot de passe d'un utilisateur (par défaut, un utilisateur ne peut modifier que le sien, `root` peut modifier ceux de tous les utilisateurs)
- `su identifiantDeVotreUtilisateur` permet de changer d'utilisateur (recharge complètement l'environnement du terminal)
- `su identifiantDeVotreUtilisateur -c uneCommandeAExecuter` permet lancer une seule commande en tant que `identifiantDeVotreUtilisateur`

## Les groupes

Voir le fichier `/etc/group` pour la liste des groupes.

Ils ont tous un nom unique, un GID unique, des membres (utilisateurs), etc.

## Gestion des permissions

- `chmod` défini les droits (lecture, modification et exécution) sur un fichier
- `chown` défini le propriétaire et le groupe propriétaire sur un fichier

Exemples : 
- `chmod 666 -R .` ou `chmod a+rw -R .`
- `chown utilisateur:groupe README.md`

### Plus de détails sur les droits

- Tout utilisateur a un groupe à son nom
- Les droits sont définis pour un utilisateur, un groupe et les autres
- Peuvent être écrit sous la forme `rwx` (lecture, écriture, exécution)
- Ou sous forme numérale (`666` par exemple), somme de :
    + 1 pour exécution 
    + 2 pour l'écriture 
    + 4 pour la lecture

## Connaître l'espace disponible

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/45718e74719748569c1ec18e05be992b" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

`df -h` affiche l'espace disponible et l'espace utilisé pour chaque partition du système 

## Connaître le poids de certains dossiers ou sous-dossiers

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/43e9cc1345d14e02906958be5b52c7c7" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

`du` affiche récursivement (va également parcourir tous les sous-dossiers et leurs sous-dossiers) la taille de chaque fichier contenu dans le dossier en cours.

### Astuces 

- `du -s` affiche un résumé de la commande `du` et n'affiche que le poids (en octet) du dossier courant (ex : 179643924)
- `du -h` affiche le poids de chaque fichier sous forme "humainement lisible" (en Mo, Go, Ko selon la taille du fichier)
- `du -sh *` affiche le poids de chaque élément contenu dans le dossier courant (le poids des dossiers est ainsi résumé et seul le poids total est indiqué)

## Installer des programmes

`apt` (Another Packaging Tool) est un gestionnaire de paquets qui offre un ensemble de commandes vous permettant de gérer les programmes et librairies installés sur votre machine. Il faut avoir les droits de super-utilisateur pour s'en servir (en général, il faut utiliser la commande `sudo` avant votre programme).

- `sudo apt update` pour mettre à jour la liste des programmes (et leur version) utilisables
- `sudo apt upgrade` pour mettre à jour les programmes installés
- `sudo apt install nomDuProgrammeAInstaller` pour installer `nomDuProgrammeAInstaller`
- `sudo apt remove nomDuProgrammeADesinstaller` pour supprimer `nomDuProgrammeADesinstaller` de la machine (conserve la configuration)
- `sudo apt purge nomDuProgrammeADesinstaller` pour supprimer **complètement** `nomDuProgrammeADesinstaller` de la machine, avec sa configuration (et tous ces fichiers)

## OpenSSH

Installation et configuration sur Windows, en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/988ded8daf40416fa5ae9278580f9624" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

OpenSSH est *normalement* installé par défaut sur toutes les distributions Linux et fourni un ensemble de commandes pour gérer les clés et les connexions SSH :

- `ssh-keygen` pour générer une clé privée et une clé publique
- `ssh-add chemin/vers/la/cle/privee` pour retenir cette clé (on dit qu'on l'ajoute au trousseau de l'utilisateur)
- `ssh user@un-serveur` pour se connecter en SSH (connexion sécurisée) à un serveur et y ouvrir un terminal. Cette connexion utilise les clés du trousseau pour essayer de vous identifier. Si aucune de vos clés n'est enregistrée, il se peut qu'un mot de passe vous soit demandé
- `ssh-copy-id user@un-serveur` pour ajouter les clés enregistrées à l'utilisateur sur un serveur distant
- `ssh-agent -s` pour démarrer le service SSH si besoin (`eval $(ssh-agent -s)` si l'agent refuse *vraiment* de coopérer)

Xavki a fait une [très bonne vidéo explicative sur SSH](https://www.youtube.com/watch?v=3-MDtASgSo8) si vous souhaitez en comprendre les principes.

### OpenSSH avec Windows

:warning: OpenSSH n'est pas installé par défaut sur Windows, veuillez suivre les instructions de la vidéo pour l'installer.

Pour générer et utiliser votre clé publique, les mêmes commandes (à la différence du lancement de l'agent ssh) sont les mêmes !

Dans Git Bash :
- Générer une clé ssh : `ssh-keygen` (et suivre les instructions)
- Vérifier sur l'agent ssh fonctionne : `eval $(ssh-agent -s)`
- Ajouter la clé à votre trousseau : `ssh-add /chemin/vers/votre/cle`
- Ajouter votre clé à Github : `cat /chemin/vers/votre/cle.pub`, et [l'ajouter sur Github](https://github.com/settings/ssh/new)

### SSH dès le démarrage de Windows

- Ouvrir Powershell **en tant qu'administrateur** 
- Lancer cette commande : `Set-Service ssh-agent -StartupType Automatic`

## Entrées et sorties

Une commande Linux a une entrée : ce que vous tapez. Cela peut être ce que vous tapez, des paramètres, des options, etc.

Par contre, une commande a 2 sorties :
- la sortie standard : elle vous affiche quelque chose
- la sortie d'erreur : elle vous affiche quelque chose, mais c'est une erreur !

Notez bien que c'est un comportement par défaut et qu'il peut être modifié. Si on le souhaite, on peut envoyer les erreurs dans un fichier, mais pas les éléments de la sortie standard et *vice versa*.

### Opérateur `>`

Cet opérateur vous permet de renvoyer la sortie standard d'une commande vers un fichier. Vous en remplacez alors le contenu.

`cat monFichier.txt > copieDeMonFichier.txt`
`echo "Ceci est un texte" > unFichierPassionnant.txt`

### Opérateur `>>`

Cet opérateur est identique au précédent, mais écrit **à la fin du fichier** et permet de ne pas perdre le contenu précédent.

`echo "Ceci est un texte" >> unFichierPassionnant.txt`
`echo "Ceci est un texte" >> unFichierPassionnant.txt`

`cat unFichierPassionnant.txt` affichera le contenu suivant :

```
Ceci est un texteCeci est un texte
```

### Opérateur `<`

Ici, la commande va prendre **en entrée** le contenu d'un fichier.

`less < unFichierPassionnant.txt`

### Transmission entre commandes

Avec l'opérateur `|` (appelé pipe), vous pouvez transmettre la sortie d'une commande, pour en faire l'entrée d'une autre.

`ls -Alh | less` affiche le résultat de `ls -Alh` dans la commande `less`

## Enchaîner les commandes

### Exécuter quoiqu'il arrive `||`

Pour exécuter 2 commandes, même si la première renvoie une erreur, utiliser `||`.

`ls unFichierPassionnant.txt || echo "je m'affiche tout le temps"`

Dans l'exemple ci-dessus, si le fichier `unFichierPassionnant.txt` n'existe pas, le `echo` est quand même exécuté.

### Exécuter si la première réussie `&&`

Pour exécuter 2 commandes, si la première réussie, utiliser `&&`.

`ls unFichierPassionnant.txt && echo "je m'affiche si le fichier existe"`

Dans l'exemple ci-dessus, si le fichier `unFichierPassionnant.txt` n'existe pas, le `echo` n'est pas exécuté.
