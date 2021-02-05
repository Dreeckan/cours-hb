# Linux

## Historique

- Noyau développé en 1991 par Linus Torvalds
- Nombreuses distributions basées dessus
    - Debian (maintenue depuis 1993 et que nous allons voir)
    - Red Hat
    - Arch Linux
    - Et bien d'autres...
- 85% des smartphones et tablettes tactiles et de nombreux serveurs (LAMP)

## Rangement des fichiers

![Le système de fichiers de Linux](linux-filesystem.png)

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

2 Types :

- Processus interactifs (Foreground/interactive processes)
- Processus en tâche de fond (Background processes)

### Les démons (daemons)

- Des processus en tâche de fond spéciaux
- Qui ne meurent jamais
- Démarrent avec le système (généralement)
- Peuvent être contrôlés par l'utilisateur (arrêt, démarrage, re-démarrage)

Exemples : Apache, Nginx, cron, Docker

# Passer à la pratique

- [Activer la virtualisation dans le Bios](https://www.tech2tech.fr/comment-activer-la-technologie-de-virtualisation-sur-mon-pc/)
- Installer Virtualbox ([pour Windows](https://download.virtualbox.org/virtualbox/6.1.16/VirtualBox-6.1.16-140961-Win.exe) ou [pour Mac](https://download.virtualbox.org/virtualbox/6.1.16/VirtualBox-6.1.16-140961-OSX.dmg))
- Télécharger une VM : [Ubuntu 20.04](https://sourceforge.net/projects/linuxvmimages/files/VirtualBox/U/Ubuntu_20.10_VB.zip/download)

## Accéder au terminal

- Lancer un émulateur de terminal (application `Terminal`/`Konsole`/...)
- Passer sur les interfaces de ligne du commande du système (`ctrl+alt+F2 à 6`, `ctrl+alt+F1` pour revenir au bureau)

### Sous Windows

- Lancer Powershell ou Git Bash

## L'interface

- Une interface minimale

![Un exemple de terminal classique (bash)](/assets/img/linux/terminal_bash.png)

- Ou un peu moins

![Un exemple de terminal amélioré (zsh + oh my zsh)](/assets/img/linux/terminal_mine.png)
Dans cet exemple, j'ai installé, zsh, [oh my zsh](https://ohmyz.sh/) et le [thème Powerlevel10k](https://github.com/romkatv/powerlevel10k)

## Une commande

- Un programme (exemple : `ls`)
- éventuellement des paramètres (exemple `ls /`)
- éventuellement des options (`ls -al /` = `ls -a -l /` = `ls --all -l /`), qui peuvent être en 1 ou plusieurs lettres (la casse est importante)
- éventuellement des paramètres à ces options
- un manuel pour tout vous expliquer (`ls --help` = `man ls`)

## Commandes de base

- Se repérer et se déplacer
- Lister, créer, modifier et supprimer

### Où suis-je ?

`pwd` renvoie le chemin absolu correspondant au dossier en cours

![](https://media.giphy.com/media/6uGhT1O4sxpi8/giphy.gif)

### Changer de dossier

`cd chemin_vers_le_dossier` où chemin_vers_le_dossier peut être :

- un chemin absolu, commençant par `/` et indiquant tout le chemin depuis la racine jusqu'au dossier (par exemple `/var/log/nginx/`)
- un chemin relatif, (par exemple `var/log/nginx` si vous vous trouvez dans le répertoire `/`)

#### Astuces

- Retourner dans votre home : `cd` ou `cd ~`
- Retourner au dossier où vous étiez précédemment : `cd -`

### Lister les fichiers et dossiers

`ls` liste les fichiers et dossiers dans le dossier en cours
`ls chemin/du/dossier` liste les fichiers dans le dossier `chemin/du/dossier`

#### Astuces

- Voir les fichiers et dossiers cachés : `ls -a`
- Avoir un listing contenant plus de détails (droits sur les dossiers, etc) : `ls -l`

### Créer un dossier

`mkdir chemin/du/dossier` crée le dossier `dossier` dans le répertoire `chemin/du` qui existe déjà.

#### Astuces
Pour créer un dossier et des sous-dossiers (dans notre exemple précédent, si `chemin` ou `chemin/du` n'existent pas), il faut ajouter l'option `p` comme ceci : `mkdir -p chemin/du/dossier` et la commande créera tous les dossiers nécessaires pour que votre dossier `dossier` existe.

### Supprimer un fichier et/ou un dossier

`rm chemin/du/fichier` pour supprimer un ou des fichiers

#### Astuces

- `rm -r` permet de supprimer récursivement un dossier et ce qu'il contient (sous-dossiers inclus)
- `rm -f` permet de ne pas avoir à confirmer des suppressions
- Utiliser une ou des étoiles dans le chemin du fichier peut permettre de supprimer des fichiers à plusieurs endroits à la fois (par exemple `rm -rf /var/log/**/*.gz` va supprimer tous les fichiers ayant l'extension `.gz` dans le dossier `/var/log/` ou n'importe lequel de ses sous-dossiers)

### Lecture de fichiers : cat

- `cat chemin/vers/le/fichier` ajoute le contenu du fichier `fichier` dans la ligne de commande (sortie standard)

### Lecture de fichiers : less

- `less chemin/vers/le/fichier` ouvre une interface pour lire le fichier `fichier` et permet d'y naviguer, d'y faire des recherches, etc.

### Astuces

- taper `q` pour sortir de l'affichage
- `maj+g` pour aller à la fin du fichier

### Lecture de fichiers : tail

- `tail chemin/vers/le/fichier` affiche les 10 dernières lignes du fichier `fichier` dans la sortie standard

### Astuces

- `tail -f chemin/vers/le/fichier` affiche les 10 dernières lignes et les données ajoutées au fur et à mesure que le fichier grandit (et bloque la ligne de commande)
- `tail chemin/vers/un/fichier chemin/vers/un/autre/fichier` affiche les 10 dernières lignes des deux fichiers dans la sortie standard

### Création d'un fichier

- `touch chemin/vers/le/fichier` crée un fichier, sans contenu

![](https://media.giphy.com/media/U23WekMlGy6cImpMim/giphy.gif)

### Modifier des fichiers

Plusieurs commandes sont disponibles pour cela. Voici quelques classiques :

- `nano chemin/vers/le/fichier` installé par défaut sur la plupart des systèmes
- `vi chemin/vers/le/fichier` à installer (la plupart du temps) 
- `vim chemin/vers/le/fichier` à installer (la plupart du temps)

### Déplacer et renommer des fichiers

Sous linux, renommer et déplacer sont une seule et même opération (dans les deux cas, on change le nom du fichier).

- `mv fichier_source fichier_destination`

Exemple : `mv test.txt /archives/tests/truc.txt` (test.txt n'existera plus)

### Copier

`cp fichier_source fichier_destination` copie un fichier et en crée un nouveau

Exemple : `cp test.txt /archives/tests/truc.txt` (test.txt existera toujours)

#### Astuces 

- `cp -r` permet de copier récursivement un dossier et tout ce qu'il contient (fichiers comme dossiers)

### Lister les processus en cours

- `ps` affiche les processus de l'utilisateur, `ps -e` tous les processus de la machine.
- `top`, `htop` ou `glances` les affiche avec les consommations de mémoire, de processeur, etc.

![](https://media.giphy.com/media/11ISwbgCxEzMyY/giphy.gif)

## Commandes avancées

![](https://media.giphy.com/media/HtYsYjPsw1nVu/giphy.gif)

### Lancer des commandes en arrière-plan

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

Exemples : `kill -SIGKILL 2412`, `pkill -15 top`, `killall -9 chrome`

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

## Connaître l'espace disponible

`df -h` affiche l'espace disponible et l'espace utilisé pour chaque partition du système 

## Connaître le poids de certains dossiers ou sous-dossiers

`du` affiche récursivement (va également parcourir tous les sous-dossiers et leurs sous-dossiers) la taille de chaque fichier contenu dans le dossier en cours.

### Astuces 

- `du -s` affiche un résumé de la commande `du` et n'affiche que le poids (en octet) du dossier courant (ex : 179643924)
- `du -h` affiche le poids de chaque fichier sous forme "humainement lisible" (en Mo, Go, Ko selon la taille du fichier)
- `du -sh *` affiche le poids de chaque élément contenu dans le dossier courant (le poids des dossiers est ainsi résumé et seul le poids total est indiqué)

### OpenSSH

- `ssh-keygen` pour générer une clé privée et une clé publique
- `ssh-add chemin/vers/la/cle/privee` pour retenir cette clé
- `ssh-copy-id user@un-serveur` pour l'ajouter à votre utilisateur sur un serveur distant
- `ssh-agent -s` pour démarrer le service SSH si besoin

### OpenSSH sous Windows

Dans Git Bash :
- Générer une clé ssh : `ssh-keygen` (et suivre les instructions)
- Vérifier sur l'agent ssh fonctionne : `eval $(ssh-agent -s)`
- Ajouter la clé à votre trousseau : `ssh-add /chemin/vers/votre/cle`
- Ajouter votre clé à Github : `cat /chemin/vers/votre/cle.pub`, et [l'ajouter sur Github](https://github.com/settings/ssh/new)

### SSH dès le démarrage de Windows

- Ouvrir Powershell **en tant qu'administrateur** 
- Lancer cette commande : `Set-Service ssh-agent -StartupType Automatic`

# Virtualisation

- Des machines dans la machine
- Hyperviseurs

## Historique

- Développée dans les années 70-80
- Popularisée dans les années 90 (émulateurs de vieilles machines)
- Véritable boom ensuite dans les environnements de travail

## Intérêts

- Une VM fonctionne de manière identique quel que soit l'hôte (en théorie)
- allocation de resources dynamiques
- mutualisation des resources
- destructible/redimensionnable à l'infini sans casser l'hôte
- isolation des différents systèmes

## Inconvénients

- Problèmes très variables de performances
- les systèmes virtualisés sont dépendant de leur hôte
- coûteux, long et souvent difficile à mettre en place

## Les virtualisations

[La virtualisation expliquée par Red Hat](https://www.redhat.com/fr/topics/virtualization/what-is-virtualization)

![](https://media.giphy.com/media/gtfppP6qR3tiU/giphy.gif)

### Virtualisation des données

- Ensemble de données éparpillées regroupées en une source unique

![height:300px](/assets/img/linux/virtualization-data.png)

### Virtualisation des postes de travail

- Permet de déployer, administrer et surveiller des postes de travail depuis un seul outil

![height:300px](/assets/img/linux/virtualization-desktop.png)

### Virtualisation de serveurs

- Une même machine héberge plusieurs serveurs et répartie les resources

![height:300px](/assets/img/linux/virtualization-server.png)

### Virtualisation des systèmes d'exploitation

- Avoir accès à d'autres OS dans une même machine

![height:300px](/assets/img/linux/virtualization-os.png)

### Virtualisation de réseau

- Séparation des fonctions clés d'un réseau en différents environnements et regroupement des machines physiques

![height:300px](/assets/img/linux/virtualization-network.png)

## Hyperviseurs

- Logiciel chargé de répartir les resources

[![](/assets/img/linux/hyperviseur.png)](https://openclassrooms.com/fr/courses/2035806-virtualisez-votre-architecture-et-vos-environnements-de-travail/6313926-decouvrez-la-virtualisation-une-reponse-a-des-problemes-de-terrain)

### Deux types principaux d'hyperviseurs

![](/assets/img/linux/hyperviseur-types.jpg) 

### Hyperviseur de type 1 (bare metal)

- Directement sur la machine (hardware) et les OS s'exécutent par-dessus
- Principalement pour virtualiser des parcs de machines (serveurs, réseau d'entreprise)

### Hyperviseur de type 2 (host metal)

- Fonctionne à l'intérieur d'un système d'exploitation
- Oracle VM VirtualBox, VMWare, KVM, etc.

# Conteneurisation

La conteneurisation permet de packager tous les services, scripts, API, librairies dont une application a besoin. L’objectif : en permettre l’exécution sur n’importe quel noyau compatible.

Un conteneur utilise ce noyau et ne fait pas appel à l'OS parent.

- Un [tutoriel sur Docker](https://www.youtube.com/watch?v=XgKOC6X8W28) par [Grafikart](https://www.grafikart.fr/) ([très bonne chaine](https://www.youtube.com/channel/UCj_iGliGCkLcHSZ8eqVNPDQ) que je vous recommande)
- Un [autre tutoriel Docker](https://www.youtube.com/watch?v=fdlZqRZXWOc&list=PLn6POgpklwWq0iz59-px2z-qjDdZKEvWd) par [Xavki](https://www.youtube.com/channel/UCs_AZuYXi6NA9tkdbhjItHQ) (encore une très bonne chaine)

## Différences avec la virtualisation

- Légèreté : peu d'espace occupé
- élasticité : pas d'allocation de resource d'avance
- performance : pas d'hyperviseur pas d'OS invité

![](/assets/img/linux/container-vs-vm.png)

## Docker et Kubernetes

- Docker : logiciel de conteneurisation
- Kubernetes : orchestrateur de conteneurs (fourni des outils de déploiement, de gestion de montée en charge sur des clusters de serveurs)

# Quel environnement choisir ?

- Local (Wamp)
- virtualisation (Virtualbox / Vagrant) 
- conteneurisation (Docker)

## Local (Wamp)

- Très performant (directement sur votre machine, sans intermédiaire)
- Relativement simple d'utilisation
- Compliqué à configurer (surtout pour plusieurs applications) et maintenir
- Relativement simple à faire évoluer (nécessite de connaître le fonctionnement de php, apache et mysql dans certains cas)

## Virtualisation (Virtualbox / Vagrant)

- Permet d'avoir un environnement de travail proche du serveur
- Pas de configuration à faire, tout est prêt
- Compliqué à mettre en place initialement (créer la VM)
- Très difficile de faire fonctionner plusieurs applications en parallèle et à les faire communiquer
- Moins performant que du local (partage des fichiers et des resources avec l'hôte)
- Peut être difficile à faire évoluer (mais pas toujours)

## Conteneurisation (Docker)

- Permet d'avoir un environnement de travail proche du serveur
- Peut être géré depuis quelques fichiers de configuration (relativement simples)
- Permet de gérer plusieurs applications en parallèle, voir à les faire communiquer
- Un peu moins performant que du local (partage des fichiers)
- Peut être modifié facilement

## Installer des environnements

- [Visual Code](https://www.microsoft.com/en-us/download/details.aspx?id=30679) et [Télécharger Wamp](https://www.wampserver.com/)
- [Télécharger Virtualbox](https://www.virtualbox.org/wiki/Downloads) et [Vagrant](https://www.vagrantup.com/downloads)
- [Télécharger Docker](https://docs.docker.com/docker-for-windows/install/)

## Et voilà !

![](https://media.giphy.com/media/3o8dFn5CXJlCV9ZEsg/giphy.gif)