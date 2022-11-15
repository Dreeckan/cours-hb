# Linux

Présentation de ce cours en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/8c30e64e7b9b4494b591e73e592c8c2d" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Dans ce cours Linux, nous allons discuter du fonctionnement général d'une distribution Linux/Unix, mais aussi de virtualisation (avec Virtualbox) et de conteneurisation (avec Docker). 

Si vous souhaitez aller (bien) plus en profondeur, je vous recommande [l'excellente série de vidéos de Xavki sur Linux](https://www.youtube.com/watch?v=-6MA0OCTXko&list=PLn6POgpklwWp1yRsq3-PyyisSIDg94ct9)


## Installer VirtualBox et créer une Machine virtuelle

Installation de VirtualBox et création d'une VM (machine virtuelle) en vidéo : 

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/60d5493cfcf84b5e80ebba436246a215" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

- [Activer la virtualisation dans le Bios](https://www.tech2tech.fr/comment-activer-la-technologie-de-virtualisation-sur-mon-pc/)
- Installer Virtualbox ([pour Windows](https://download.virtualbox.org/virtualbox/6.1.16/VirtualBox-6.1.16-140961-Win.exe) ou [pour Mac](https://download.virtualbox.org/virtualbox/6.1.16/VirtualBox-6.1.16-140961-OSX.dmg))
- Télécharger une VM : [Ubuntu 20.04](https://sourceforge.net/projects/linuxvmimages/files/VirtualBox/U/Ubuntu_20.10_VB.zip/download)

## Alternative : <abbr>WSL</abbr>

Vous pouvez utiliser [<abbr>WSL</abbr> (Windows Subsystem for Linux)](https://fr.wikipedia.org/wiki/Windows_Subsystem_for_Linux) pour avoir accès à une machine virtuelle Linux, directement avec Windows. Plus pratique et plus stable, il nous permettra de tester la ligne de commande Linux et d'utiliser une machine virtuelle plus efficacement que VirtualBox ou équivalent.

:warning: Attention, pour un usage professionnel (avec Vagrant, par exemple), VirtualBox ou un équivalent est encore nécessaire.

Pour l'installer, rien de plus simple : 
- Ouvrir PowerShell en mode **administrateur**
- Installer <abbr>WSL</abbr> avec la commande `wsl --install`
- Si vous aviez déjà <abbr>WSL</abbr> installé, mais pas Ubuntu, utiliser la commande `wsl --install -d Ubuntu`.

## Principes fondateurs

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/1a1a3e5da81e43a69bbb37a205efa23d" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

- Liberté d'exécution
- Liberté de lecture du code
- Liberté de redistribution
- Liberté de modification

En opposition au logiciel propriétaire, dont le fonctionnement est opaque et géré de manière privée (seul un petit groupe peut en connaitre le fonctionnement et le modifier), le logiciel libre est gratuit à exécuter, le code est visible de tous (nécessite quelques compétences pour le lire ;) ), peut être modifié par tous et redistribué à tous. Ces logiciels doivent également avoir un périmètre fonctionnel simple, adapté au besoin, ne doivent pas dépendre d'un `vendor` (logiciel ou librairie sous licence non libre) et utilisable par le plus grand nombre (ce dernier point est éternellement sujet de débats).

En général, les logiciels libres utilisent des outils de gestion de version (comme [Git](https://git-scm.com/)), pour permettre ce travail collaboratif (*via* les Pull Requests, sur Github, par exemple).

Pour assurer la pérennité de ces projets, des licences ont été mises en place, comme les licences GPL, BSD, MIT, Apache, etc. Toutes garantissent la propriété et les valeurs fondamentales de ces logiciels.
Par exemple, [Symfony est distribué sous licence MIT](https://symfony.com/doc/current/contributing/code/license.html).

## Historique

- Noyau développé en 1991 par Linus Torvalds
- Nombreuses distributions basées dessus
    - Debian (maintenue depuis 1993 et que nous allons voir)
    - Red Hat
    - Arch Linux
    - Et bien d'autres...
- 85% des smartphones et tablettes tactiles et de nombreux serveurs (LAMP)

## Rangement des fichiers

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/f9d9d06790484fa6884f04298cb6310a" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

![Le système de fichiers de Linux](/assets/img/linux/linux-filesystem.png)

### Les dossiers essentiels

- `/` la racine du système
- `/bin/` les programmes exécutables
- `/etc/` les fichiers de configuration des programmes
- `/home/` les dossiers personnels des utilisateurs (`/root/` est celui du super utilisateur)
- `/lib/` les librairies utilisées par les programmes (dont le noyau)
- `/usr/` la plupart des programmes que vous installez (mais aussi ceux du système)
- `/var/` les données variables (logs, cache, etc)
- `/tmp/` les fichiers temporaires

### Quelques mentions honorables

- `/boot/` les fichiers de démarrage du système
- `/opt/` les programmes supplémentaires non maintenus par Linux (Skype par exemple)
- `/snap/` les programmes gérés par le gestionnaire de paquets `snap`
- `/srv/` l'emplacement classique pour l'hébergement de sites

## Les processus

Le cours en vidéo : 

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/150be547bd2044ad965b97cef503a222" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

2 Types :

- Processus interactifs (Foreground/interactive processes)
- Processus en tâche de fond (Background processes)

### Les démons (daemons)

- Des processus en tâche de fond spéciaux
- Qui ne meurent jamais
- Démarrent avec le système (généralement)
- Peuvent être contrôlés par l'utilisateur (arrêt, démarrage, re-démarrage)

Exemples : Apache, Nginx, cron, Docker

### Accéder au terminal

- Lancer un émulateur de terminal (application `Terminal`/`Konsole`/...)
- Passer sur les interfaces de ligne de commande du système (`ctrl+alt+F2 à 6`, `ctrl+alt+F1` pour revenir au bureau)

#### Avec Windows

- Lancer Git Bash

### L'interface

- Une interface minimale

![Un exemple de terminal classique (bash)](/assets/img/linux/terminal_bash.png)

- Ou un peu moins

![Un exemple de terminal amélioré (zsh + oh my zsh)](/assets/img/linux/terminal_mine.png)

### Personnaliser son terminal

Dans l'exemple ci-dessus, j'ai installé zsh, [oh my zsh](https://ohmyz.sh/) et le [thème Powerlevel10k](https://github.com/romkatv/powerlevel10k)

#### Avec Mac

Plusieurs articles expliquent comment [personnaliser le terminal](https://dev.to/equiman/iterm2--oh-my-zsh--powerlevel9k-best-terminal-combination-for-geeks-58l5) pour utiliser les mêmes éléments que sous Linux. (Un [autre exemple d'article](https://www.tronyxworld.be/2020/zsh_omz_p10k/))

## Commandes de base

Comprendre les commandes :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/15722dba071a4323be5ac835ab24eb32" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

### Une commande

- Un programme (exemple : `ls`)
- éventuellement des paramètres (exemple `ls /`)
- éventuellement des options (`ls -al /` = `ls -a -l /` = `ls --all -l /`), qui peuvent être en 1 ou plusieurs lettres (la casse est importante)
- éventuellement des paramètres à ces options
- un manuel pour tout vous expliquer (`ls --help` = `man ls`)

### Où suis-je ?

`pwd` renvoie le chemin absolu correspondant au dossier en cours

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/72881c6766054c8bb3be58d8a6eace22" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

### Changer de dossier

La version en vidéo (avec explication des chemins relatifs et absolus) :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/58115d6aac7f460896a529777484f313" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

`cd chemin_vers_le_dossier` où chemin_vers_le_dossier peut être :

- un chemin absolu, commençant par `/` et indiquant tout le chemin depuis la racine jusqu'au dossier (par exemple `/var/log/nginx/`)
- un chemin relatif, (par exemple `var/log/nginx` si vous vous trouvez dans le répertoire `/`)

#### Astuces

- Retourner dans votre home : `cd` ou `cd ~`
- Retourner au dossier où vous étiez précédemment : `cd -`

### Lister les fichiers et dossiers

La version en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/27ffe8b758f84ada816b3600819cdddc" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

`ls` liste les fichiers et dossiers dans le dossier en cours
`ls chemin/du/dossier` liste les fichiers dans le dossier `chemin/du/dossier`

#### Astuces

- Voir les fichiers et dossiers cachés : `ls -a`
- Avoir une liste contenant plus de détails (droits sur les dossiers, etc) : `ls -l`
- Avoir une liste de différents fichiers et dossiers : `ls -l unFichier unAutreFichier unDossier` (vous affichera des informations sur les fichiers/dossiers demandés)

### Créer un dossier

La version en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/52e1fd8156c84b23b8071e65eee81e78" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

`mkdir chemin/du/dossier` crée le dossier `dossier` dans le répertoire `chemin/du` qui existe déjà.

#### Astuces

Pour créer un dossier et des sous-dossiers (dans notre exemple précédent, si `chemin` ou `chemin/du` n'existent pas), il faut ajouter l'option `p` comme ceci : `mkdir -p chemin/du/dossier` et la commande créera tous les dossiers nécessaires pour que votre dossier `dossier` existe.

### Supprimer un fichier et/ou un dossier

La version en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/b56b95c94a3c4488a5812436ff1684c3" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

`rm chemin/du/fichier` pour supprimer un ou des fichiers

#### Astuces

- `rm -r` permet de supprimer récursivement un dossier et ce qu'il contient (sous-dossiers inclus)
- `rm -f` permet de ne pas avoir à confirmer des suppressions
- Utiliser une ou des étoiles dans le chemin du fichier peut permettre de supprimer des fichiers à plusieurs endroits à la fois (par exemple `rm -rf /var/log/**/*.gz` va supprimer tous les fichiers ayant l'extension `.gz` dans le dossier `/var/log/` ou n'importe lequel de ses sous-dossiers)

### Lecture de fichiers

La version en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/c6eaa46b3f6c48748d74a4cee4cc7238" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

- cat
  - `cat chemin/vers/le/fichier` ajoute le contenu du fichier `fichier` dans la ligne de commande (sortie standard)
- less
  - `less chemin/vers/le/fichier` ouvre une interface pour lire le fichier `fichier` et permet d'y naviguer, d'y faire des recherches, etc.
- more
  - `more chemin/vers/le/fichier` affiche le contenu du fichier progressivement (écran par écran), jusqu'à la fin du fichier.
- tail
  - `tail chemin/vers/le/fichier` affiche les 10 dernières lignes du fichier `fichier` dans la sortie standard

#### Astuces

- taper `q` pour sortir de l'affichage de `more` ou `less`
- `maj+g` pour aller à la fin du fichier avec `more` ou `less`
- `tail -f chemin/vers/le/fichier` affiche les 10 dernières lignes et les données ajoutées au fur et à mesure que le fichier grandit (et bloque la ligne de commande)
- `tail chemin/vers/un/fichier chemin/vers/un/autre/fichier` affiche les 10 dernières lignes des deux fichiers dans la sortie standard

### Créer/modifier des fichiers

La version en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/178534da4fd3448d86fd089bbf287837" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

- `touch chemin/vers/le/fichier` crée un fichier, sans contenu

Plusieurs commandes sont disponibles pour cela. Voici quelques classiques :

- `nano chemin/vers/le/fichier` installé par défaut sur la plupart des systèmes
- `vi chemin/vers/le/fichier` à installer (la plupart du temps) 
- `vim chemin/vers/le/fichier` à installer (la plupart du temps)

#### Astuces

- Sortir de vi/vim, appuyer sur la touche `echap` si vous êtes en mode d'insertion/remplacement (voir en bas de l'écran), puis :
  - taper `:q` pour sortir (si vous avez fait des modifications que vous souhaitez ignorer, taper `:q!`)
  - taper `:x` pour enregistrer le fichier et quitter (équivalent à `:wq` où `w` = write)
- Utilisez nano, il est bien plus simple d'utilisation ;) .

### Déplacer et renommer des fichiers

La version en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/414b4b53631e491dbfbed6791c854f7c" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Sous linux, renommer et déplacer sont une seule et même opération (dans les deux cas, on change le nom du fichier).

`mv fichier_source fichier_destination`

Exemple : `mv test.txt /archives/tests/truc.txt` (test.txt n'existera plus)

### Copier

La version en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/6e4542b767314a93870e515606a40c4b" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

`cp fichier_source fichier_destination` copie un fichier et en crée un nouveau

Exemple : `cp test.txt /archives/tests/truc.txt` (test.txt existera toujours)

#### Astuces 

- `cp -r` permet de copier récursivement un dossier et tout ce qu'il contient (fichiers comme dossiers)

### Lister les processus en cours

La version en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/6fa2a3eb217c41c1b88a4a83d678b4dc" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

- `ps` affiche les processus de l'utilisateur, `ps -e` tous les processus de la machine.
- `top`, `htop` ou `glances` les affiche avec les consommations de mémoire, de processeur, etc.

## Commandes avancées

### Lancer des commandes en arrière-plan

Gestion des commandes en arrière-plan et meurtres de processus en une vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/bddf49e85f394643b51332a67c17a171" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

- Ajoutez une esperluette (`&`) à la fin de la commande pour la lancer en arrière-plan
- `jobs` affiche les processus en arrière-plan
- `fg %X` où X est le numéro du processus le bascule au premier plan

- `ctrl+Z` permet de mettre en pause un processus et le passe en arrière-plan
- `bg` pour le relancer

### Tuer des processus

- `kill -X Y` où Y est **l'identifiant** du processus
- `pkill -X Z` ou `killall -X Z` où Z est **le nom du processus** du processus

X peut être (entre 64 possibilités) :
- `SIGTERM` (15) lui demande gentiment de se fermer (signal par défaut)
- `SIGKILL` (9) tue le programme, littéralement

Exemples : 
- `kill -SIGKILL 2412`
- `pkill -15 top`
- `killall -9 chrome`

### Les utilisateurs

Utilisateurs et gestions des droits en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/9a863404793a4dc594102ff60cf304af" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Il y a 2 types d'utilisateurs :
- les utilisateurs système ne sont pas réels et sont dédiés à *une* tâche du système (pour certains services (ftp, serveur web, etc.) ou certaines tâches (backups, etc.)). Ils ne peuvent pas se connecter.
- les utilisateurs réels peuvent se connecter, ont un nom d'utilisateur unique et, entre autre un UID (identifiant unique, attribué par le système).

Chaque utilisateur appartient (toujours) à un groupe à son propre nom (ex : `toto` appartient au groupe `toto`). Il peut en avoir d'autres.

Chaque processus et chaque fichier appartiennent **toujours** à un utilisateur **et** un groupe.

Voir le fichier `/etc/passwd` pour la liste des utilisateurs et `/etc/shadow` pour les mots de passe (chiffrés).

#### Root

Sur tous les systèmes UNIX, il existe un utilisateur `root` (dont le UID est 0), ayant tous les pouvoirs (lui seul peut modifier les fichiers systèmes). Il est très fortement déconseillé de s'en servir comme d'un utilisateur normal.
Toutefois, sur les distributions basées sur Debian (et sûrement d'autres ;) ), il existe une commande `sudo` (Super User DO) permettant d'exécuter une commande avec les mêmes droits que `root`.

#### Commandes de gestion des utilisateurs

À exécuter en tant que super-utilisateur (avec `sudo` ou en se connectant en tant que `root` avec `su`) :

- `useradd identifiantDeVotreUtilisateur` pour créer un utilisateur (voir le manuel pour plus d'options, notamment `-d /chemin/vers/le/homme/du/user`, `-m`, ou `-G`)
- `usermod identifiantDeVotreUtilisateur` s'utilise avec les mêmes options pour modifier un utilisateur existant
- `userdel identifiantDeVotreUtilisateur` pour supprimer un utilisateur
- `passwd` pour modifier le mot de passe d'un utilisateur (par défaut, un utilisateur ne peut modifier que le sien, `root` peut modifier ceux de tous les utilisateurs)
- `su identifiantDeVotreUtilisateur` permet de changer d'utilisateur (recharge complètement l'environnement du terminal)
- `su identifiantDeVotreUtilisateur -c uneCommandeAExecuter` permet lancer une seule commande en tant que `identifiantDeVotreUtilisateur`

### Les groupes

Voir le fichier `/etc/group` pour la liste des groupes.

Ils ont tous un nom unique, un GID unique, des membres (utilisateurs), etc.

### Gestion des permissions

- `chmod` défini les droits (lecture, modification et exécution) sur un fichier
- `chown` défini le propriétaire et le groupe propriétaire sur un fichier

Exemples : 
- `chmod 666 -R .` ou `chmod a+rw -R .`
- `chown utilisateur:groupe README.md`

#### Plus de détails sur les droits

- Tout utilisateur a un groupe à son nom
- Les droits sont définis pour un utilisateur, un groupe et les autres
- Peuvent être écrit sous la forme `rwx` (lecture, écriture, exécution)
- Ou sous forme numérale (`666` par exemple), somme de :
    + 1 pour exécution 
    + 2 pour l'écriture 
    + 4 pour la lecture

### Connaître l'espace disponible

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/45718e74719748569c1ec18e05be992b" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

`df -h` affiche l'espace disponible et l'espace utilisé pour chaque partition du système 

### Connaître le poids de certains dossiers ou sous-dossiers

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/43e9cc1345d14e02906958be5b52c7c7" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

`du` affiche récursivement (va également parcourir tous les sous-dossiers et leurs sous-dossiers) la taille de chaque fichier contenu dans le dossier en cours.

#### Astuces 

- `du -s` affiche un résumé de la commande `du` et n'affiche que le poids (en octet) du dossier courant (ex : 179643924)
- `du -h` affiche le poids de chaque fichier sous forme "humainement lisible" (en Mo, Go, Ko selon la taille du fichier)
- `du -sh *` affiche le poids de chaque élément contenu dans le dossier courant (le poids des dossiers est ainsi résumé et seul le poids total est indiqué)

### Installer des programmes

`apt` (Another Packaging Tool) est un gestionnaire de paquets qui offre un ensemble de commandes vous permettant de gérer les programmes et librairies installés sur votre machine. Il faut avoir les droits de super-utilisateur pour s'en servir (en général, il faut utiliser la commande `sudo` avant votre programme).

- `sudo apt update` pour mettre à jour la liste des programmes (et leur version) utilisables
- `sudo apt upgrade` pour mettre à jour les programmes installés
- `sudo apt install nomDuProgrammeAInstaller` pour installer `nomDuProgrammeAInstaller`
- `sudo apt remove nomDuProgrammeADesinstaller` pour supprimer `nomDuProgrammeADesinstaller` de la machine (conserve la configuration)
- `sudo apt purge nomDuProgrammeADesinstaller` pour supprimer **complètement** `nomDuProgrammeADesinstaller` de la machine, avec sa configuration (et tous ces fichiers)

### OpenSSH

Installation et configuration sur Windows, en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/988ded8daf40416fa5ae9278580f9624" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

OpenSSH est *normalement* installé par défaut sur toutes les distributions Linux et fourni un ensemble de commandes pour gérer les clés et les connexions SSH :

- `ssh-keygen` pour générer une clé privée et une clé publique
- `ssh-add chemin/vers/la/cle/privee` pour retenir cette clé (on dit qu'on l'ajoute au trousseau de l'utilisateur)
- `ssh user@un-serveur` pour se connecter en SSH (connexion sécurisée) à un serveur et y ouvrir un terminal. Cette connexion utilise les clés du trousseau pour essayer de vous identifier. Si aucune de vos clés n'est enregistrée, il se peut qu'un mot de passe vous soit demandé
- `ssh-copy-id user@un-serveur` pour ajouter les clés enregistrées à l'utilisateur sur un serveur distant
- `ssh-agent -s` pour démarrer le service SSH si besoin (`eval $(ssh-agent -s)` si l'agent refuse *vraiment* de coopérer)

#### OpenSSH avec Windows

:warning: OpenSSH n'est pas installé par défaut sur Windows, veuillez suivre les instructions de la vidéo pour l'installer.

Pour générer et utiliser votre clé publique, les mêmes commandes (à la différence du lancement de l'agent ssh) sont les mêmes !

Dans Git Bash :
- Générer une clé ssh : `ssh-keygen` (et suivre les instructions)
- Vérifier sur l'agent ssh fonctionne : `eval $(ssh-agent -s)`
- Ajouter la clé à votre trousseau : `ssh-add /chemin/vers/votre/cle`
- Ajouter votre clé à Github : `cat /chemin/vers/votre/cle.pub`, et [l'ajouter sur Github](https://github.com/settings/ssh/new)

#### SSH dès le démarrage de Windows

- Ouvrir Powershell **en tant qu'administrateur** 
- Lancer cette commande : `Set-Service ssh-agent -StartupType Automatic`

### Entrées et sorties

Une commande Linux a une entrée : ce que vous tapez. Cela peut être ce que vous tapez, des paramètres, des options, etc.

Par contre, une commande a 2 sorties :
- la sortie standard : elle vous affiche quelque chose
- la sortie d'erreur : elle vous affiche quelque chose, mais c'est une erreur !

Notez bien que c'est un comportement par défaut et qu'il peut être modifié. Si on le souhaite, on peut envoyer les erreurs dans un fichier, mais pas les éléments de la sortie standard et *vice versa*.

#### Opérateur `>`

Cet opérateur vous permet de renvoyer la sortie standard d'une commande vers un fichier. Vous en remplacez alors le contenu.

`cat monFichier.txt > copieDeMonFichier.txt`
`echo "Ceci est un texte" > unFichierPassionnant.txt`

#### Opérateur `>>`

Cet opérateur est identique au précédent, mais écrit **à la fin du fichier** et permet de ne pas perdre le contenu précédent.

`echo "Ceci est un texte" >> unFichierPassionnant.txt`
`echo "Ceci est un texte" >> unFichierPassionnant.txt`

`cat unFichierPassionnant.txt` affichera le contenu suivant :

```
Ceci est un texteCeci est un texte
```

#### Opérateur `<`

Ici, la commande va prendre **en entrée** le contenu d'un fichier.

`less < unFichierPassionnant.txt`

#### Transmission entre commandes

Avec l'opérateur `|` (appelé pipe), vous pouvez transmettre la sortie d'une commande, pour en faire l'entrée d'une autre.

`ls -Alh | less` affiche le résultat de `ls -Alh` dans la commande `less`

### Enchaîner les commandes

#### Exécuter quoiqu'il arrive `||`

Pour exécuter 2 commandes, même si la première renvoie une erreur, utiliser `||`.

`ls unFichierPassionnant.txt || echo "je m'affiche tout le temps"`

Dans l'exemple ci-dessus, si le fichier `unFichierPassionnant.txt` n'existe pas, le `echo` est quand même exécuté.

#### Exécuter si la première réussie `&&`

Pour exécuter 2 commandes, si la première réussie, utiliser `&&`.

`ls unFichierPassionnant.txt && echo "je m'affiche si le fichier existe"`

Dans l'exemple ci-dessus, si le fichier `unFichierPassionnant.txt` n'existe pas, le `echo` n'est pas exécuté.

## Virtualisation

- Des machines dans la machine
- Hyperviseurs

En vidéo : 

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/bd25adc5530647f1a57a3cd0f50db521" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

### Historique

- Développée dans les années 70-80.
- Popularisée dans les années 90 (émulateurs de vieilles machines).
- Véritable boom ensuite dans les environnements de travail.
- Très utilisée de nos jours dans les grands parcs informatiques (y compris hébergeurs).

### Intérêts

- Une VM fonctionne de manière identique quel que soit l'hôte (en théorie).
- Allocation de resources dynamiques.
- Mutualisation des resources.
- Destructible/redimensionnable à l'infini sans casser l'hôte.
- Isolation des différents systèmes.

### Inconvénients

- Problèmes très variables de performances.
- Les systèmes virtualisés sont dépendants de leur hôte.
- Coûteux, long et souvent difficile à mettre en place.

### Les virtualisations

[La virtualisation expliquée par Red Hat](https://www.redhat.com/fr/topics/virtualization/what-is-virtualization)

#### Virtualisation des données

- Ensemble de données éparpillées regroupées en une source unique

![](/assets/img/linux/virtualization-data.png)

#### Virtualisation des postes de travail

- Permet de déployer, administrer et surveiller des postes de travail depuis un seul outil

![](/assets/img/linux/virtualization-desktop.png)

#### Virtualisation de serveurs

- Une même machine héberge plusieurs serveurs et répartie les resources

![](/assets/img/linux/virtualization-server.png)

#### Virtualisation des systèmes d'exploitation

- Avoir accès à d'autres OS dans une même machine

![](/assets/img/linux/virtualization-os.png)

#### Virtualisation de réseau

- Séparation des fonctions clés d'un réseau en différents environnements et regroupement des machines physiques

![](/assets/img/linux/virtualization-network.png)

### Hyperviseurs

- Logiciel chargé de répartir les resources

[![](/assets/img/linux/hyperviseur.png)](https://openclassrooms.com/fr/courses/2035806-virtualisez-votre-architecture-et-vos-environnements-de-travail/6313926-decouvrez-la-virtualisation-une-reponse-a-des-problemes-de-terrain)

#### Deux types principaux d'hyperviseurs

![](/assets/img/linux/hyperviseur-types.jpg) 

##### Hyperviseur de type 1 (bare metal)

- Directement sur la machine (hardware) et les OS s'exécutent par-dessus.
- Principalement pour virtualiser des parcs de machines (serveurs, réseau d'entreprise).

##### Hyperviseur de type 2 (host metal)

- Fonctionne à l'intérieur d'un système d'exploitation.
- Oracle VM VirtualBox, VMWare, KVM, etc.

## Conteneurisation

La conteneurisation permet de packager tous les services, scripts, API, librairies dont une application a besoin. L’objectif : en permettre l’exécution sur n’importe quel noyau compatible.

Un conteneur utilise ce noyau et ne fait pas appel à l'OS parent.

- Un [tutoriel sur Docker](https://www.youtube.com/watch?v=XgKOC6X8W28) par [Grafikart](https://www.grafikart.fr/) ([très bonne chaine](https://www.youtube.com/channel/UCj_iGliGCkLcHSZ8eqVNPDQ) que je vous recommande).
- Un [autre tutoriel Docker](https://www.youtube.com/watch?v=fdlZqRZXWOc&list=PLn6POgpklwWq0iz59-px2z-qjDdZKEvWd) par [Xavki](https://www.youtube.com/channel/UCs_AZuYXi6NA9tkdbhjItHQ) (encore une très bonne chaine).

En vidéo : 

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/82f67695be5a4126897120f1e57208db" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

### Différences avec la virtualisation

- Légèreté : peu d'espace occupé.
- élasticité : pas d'allocation de resource d'avance.
- performance : pas d'hyperviseur pas d'OS invité.

![](/assets/img/linux/container-vs-vm.png)

### Docker et Kubernetes

- Docker : logiciel de conteneurisation.
- Kubernetes : orchestrateur de conteneurs (fourni des outils de déploiement, de gestion de montée en charge sur des clusters de serveurs).

## Quel environnement choisir ?

En vidéo : 

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/484a302746aa48c085afb6a867837fcf" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

### Local (Wamp)

- Très performant (directement sur votre machine, sans intermédiaire).
- Relativement simple d'utilisation.
- Compliqué à configurer (surtout pour plusieurs applications) et maintenir.
- Relativement simple à faire évoluer (nécessite de connaître le fonctionnement de php, apache et mysql dans certains cas).

### Virtualisation (Virtualbox / Vagrant)

- Permet d'avoir un environnement de travail proche du serveur.
- Pas de configuration à faire, tout est prêt.
- Compliqué à mettre en place initialement (créer la VM).
- Très difficile de faire fonctionner plusieurs applications en parallèle et à les faire communiquer.
- Moins performant que du local (partage des fichiers et des resources avec l'hôte).
- Peut être difficile à faire évoluer (mais pas toujours).

### Conteneurisation (Docker)

- Permet d'avoir un environnement de travail proche du serveur.
- Peut être géré depuis quelques fichiers de configuration (relativement simples).
- Permet de gérer plusieurs applications en parallèle, voir à les faire communiquer *simplement*.
- Un peu moins performant que du local (partage des fichiers).
- Peut être modifié facilement.

### Installer des environnements

- [Visual Code](https://www.microsoft.com/en-us/download/details.aspx?id=30679) 
- [Télécharger Wamp](https://www.wampserver.com/)
- [Télécharger Virtualbox](https://www.virtualbox.org/wiki/Downloads) et (optionnel) [Vagrant](https://www.vagrantup.com/downloads)
- [Télécharger Docker](https://docs.docker.com/docker-for-windows/install/)

## Aller plus loin 

Pour aller plus loin, je vous recommande fortement [une playlist dédiée à Linux de la (très bonne) chaîne Youtube Xavki](https://www.youtube.com/watch?v=-6MA0OCTXko&list=PLn6POgpklwWp1yRsq3-PyyisSIDg94ct9)

## Exercices

Tous ces exercices prennent place dans un terminal Linux et sont testés avec une machine Ubuntu. Si des adaptations sont nécessaires pour un Mac ou d'autres systèmes UNIX, merci de me le signaler ;) .

Avant de commencer, ouvrir un terminal.

### 1. Commandes de base

- Créer un dossier `Work/Linux/exercices` dans votre dossier personnel
- Se rendre dans ce dossier
- Y créer un fichier `exercice1.txt` et copier/coller les commandes que vous avez entrées pour les énoncés précédents
- Créer un fichier (vide) `exercice2.txt`
- Créer un dossier `1` et un dossier `2`
- Déplacer `exercice1.txt` dans `1` et `exercice2.txt` dans `2`
- Afficher la liste des fichiers et dossiers dans `Work/Linux/exercices` (avec les droits sur les fichiers)
- Ajouter cet affichage à la fin du fichier `exercice1.txt`
- Copier le fichier `exercice1.txt` dans un nouveau fichier `Work/Linux/exercices/1/copie.txt`
- Créer un projet Git dans le dossier `Work/Linux/exercices`
- Ajouter un premier commit
- Créer un projet GitHub et inviter `Dreeckan` sur votre projet pour relecture
- Pousser votre commit

### 2. Fonctionnement général

Rester dans le dossier `Work/Linux/exercices`. Pour les questions ci-dessous, écrivez votre réponse dans le fichier `Work/Linux/exercices/2/exercice2.txt`.

- Quel est la taille (le poids en octets / kilo-octets) de `exercice1.txt` ?
- Dans quel dossier est rangé **la configuration** d'un programme comme apt ?
- Où se trouve **l'exécutable** de `apt` ? Trouverez-vous une commande (non indiquée dans le cours) permettant d'avoir cette information ? Si oui, l'indiquer avec votre réponse.
- Quelle commande utiliser pour lister les processus actuellement actifs ? Afficher les résultats pour **tous les utilisateurs** du système et les ajouter à votre fichier.
- Quelles sont les différences entre les commandes `less` et `more` ?
- Quelle commande utiliser pour demander "poliment" l'arrêt du programme java ?
- Quelle commande utiliser pour arrêter le processus ayant l'identifiant 5240 ?

- Créer un nouveau commit et le pousser sur GitHub.

### 3. Commandes avancées

- Créer une branche `exercice3`
- Créer un dossier `Work/Linux/exercices/3`
- Que se passe-t-il si vous faites un commit ? (vous écrirez votre réponse après avoir créé le fichier `exercice3.txt`)
- Se rendre dans ce dossier
- Y créer un fichier `exercice3.txt`
- En une seule **ligne**, créer un dossier `Work/Linux/exercices/3/chaine/` et y créer un fichier `nouveau`
- Utiliser `cat` pour ouvrir vos 3 fichiers d'exercice à la fois et afficher le contenu avec less. Écrire ensuite la commande utilisée à la fin de `exercice3.txt`
- Utiliser une seule **commande** pour :
  - afficher la liste des fichiers, dossiers et tout leur contenu dans `Work/Linux/exercices` (avec les droits sur les fichiers) 
  - et les ajouter dans le fichier `exercice3.txt`

- Donner les droits suivants aux dossiers et fichiers de `Work/Linux/exercices/3` :
  - les utilisateurs peuvent lire et écrire
  - le groupe peut lire
  - les autres n'ont aucun droit
- Changer le groupe du dossier `Work/Linux/exercices/3/chaine/` pour appartenir au groupe `root`.

- Créer un commit

- En une commande, supprimer tous les fichiers avec l'extension `.txt`, sans supprimer les dossiers
- Annuler cette suppression
- Écrire les deux commandes dans `exercice3.txt`

- Créer un commit, pousser les modifications et créer une PR (Pull Request)