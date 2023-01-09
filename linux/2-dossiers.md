# Rangement des fichiers

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/f9d9d06790484fa6884f04298cb6310a" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

![Le système de fichiers de Linux](/assets/img/linux/linux-filesystem.png)

## Les dossiers essentiels

- `/` la racine du système
- `/bin/` les programmes exécutables
- `/etc/` les fichiers de configuration des programmes
- `/home/` les dossiers personnels des utilisateurs (`/root/` est celui du super utilisateur)
- `/lib/` les librairies utilisées par les programmes (dont le noyau)
- `/usr/` la plupart des programmes que vous installez (mais aussi ceux du système)
- `/var/` les données variables (logs, cache, etc)
- `/tmp/` les fichiers temporaires

## Quelques mentions honorables

- `/boot/` les fichiers de démarrage du système
- `/opt/` les programmes supplémentaires non maintenus par Linux (Skype par exemple)
- `/snap/` les programmes gérés par le gestionnaire de paquets `snap`
- `/srv/` l'emplacement classique pour l'hébergement de sites
