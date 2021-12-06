# Déploiement

Pour apprendre à installer, vous pouvez retrouver [une documentation sur le déploiement avec Ansible](https://e-vinrude.drakolab.fr/cookbooks/firstTimeDeploy.html) écrite pour mes collègues.

## Déploiement par FTP

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/c66268b37c624ca6a801362cb87b9bd0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Le FTP est un protocole de transfert de fichiers, permettant de se connecter à un serveur pour mettre en ligne des fichiers ou en récupérer depuis un serveur. Il peut s'utiliser en ligne de commande, ou en utilisant des interfaces graphiques, comme [FileZilla](https://filezilla-project.org/download.php?show_all=1).

Il est très utile pour les sites simples (HTML, JS, CSS), ne nécessitant pas de lancer des commandes sur le serveur ou si le serveur n'offre pas d'accès SSH.

Pour déployer un site en FTP, nous avons besoin : 
- de l'adresse du site (IP ou nom de domaine)
- d'un port à utiliser
- d'un identifiant et d'un mot de passe **ou** d'une clé SSH valide (ajoutée au serveur)
- de [FileZilla](https://filezilla-project.org/download.php?show_all=1) ou d'un outil de FTP équivalent.

### Configurer FileZilla

Les options par défaut de FileZilla font en général très bien l'affaire, si bien que nous avons seulement besoin de configurer l'accès à notre site.

Pour cela, ouvrez le gestionnaire de sites (`Fichiers > Gestionnaire de sites...` ou le bouton "Gestionnaire de sites" en haut à gauche) et entrez les informations requises.

![](/assets/img/deploy/filezilla-new-site.png)

- Protocole : FTP ou SFTP sont les deux options les plus courantes (nous allons choisir SFTP)
- Hôte : adresse IP ou nom de domaine fourni par l'hébergeur
- Chiffrement (apparait si connexion FTP) : vous permet de dire comment chiffrer la connexion (à voir selon l'hébergement)
- Type d'authentification : je vous recommande `Normale` (qui permet de retenir identifiant **et** mot de passe)

Une fois les informations entrées, plus qu'à cliquer sur `Connexion` pour tester et parcourir les fichiers.

### Transférer des fichiers

Cette partie est très simple, il suffit de déplacer les fichiers d'un côté de l'interface à l'autre.


## Utiliser SSH et Git

### Configurer OpenSSH

Dans un premier temps, il faut s'assurer d'avoir :
- installé OpenSSH (il faut se rendre dans les fonctionnalités facultatives de Windows)
- un agent SSH qui fonctionne (je vous conseille de le faire démarrer avec votre système, en exécutant cette commande **dans un powershell, démarré en tant qu'administrateur** : `Set-Service ssh-agent -StartupType Automatic`)
- une paire de clés SSH (Utiliser `ssh-keygen` pour en générer)
- que votre clé soit ajoutée à votre trousseau en cours (`ssh-add chemin/vers/la/clé/privée` si ça n'est pas le cas)
- que la clé publique soit ajoutée à votre compte GitHub **et** au serveur (`ssh-copy-id utilisateur@ip-du-serveur` si ça n'est pas déjà fait)

Si besoin, j'ai également fait une vidéo sur la configuration d'OpenSSH sous Windows : 

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/988ded8daf40416fa5ae9278580f9624" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

### Déployer

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/9e0fc06958dc425bb0dbe600bcdd2d29" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Une fois les questions de configuration SSH réglées, il faut configurer le serveur (Apache ou Nginx) et mettre en ligne les fichiers. 

Pour cette dernière étape, c'est très simple, il nous suffit de faire un `git clone` de notre projet, pour la première installation, ou un `git pull` par la suite :) .

### Configurer un serveur

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/369d2b7d36ce43f5aa5012c1e097bbb7" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Dans la vidéo ci-dessus, je vous présente la configuration avec Nginx, mais je vous renvoie au [cours sur LAMP](../lamp/) pour l'installation et la configuration d'un serveur avec Apache, MySQL et Php.

Des exemples de configuration Nginx, présentés dans la vidéo :

- Une configuration simple, pour afficher un site statique (site en HTML, CSS et JS) :

```nginx
server {
    # On indique la racine de nos fichiers.
    root /var/www/formation-hb.drakolab.fr/current/.vuepress/dist;
    # Par défaut, quand on cherche un dossier, on charge 
    # automatiquement le fichier index.html de ce dossier,
    # sans avoir à l'appeler explicitement.
    index index.html;
    # On défini les domaines qui appelleront le site.
    server_name formation-hb.drakolab.fr;
}
```

- Une configuration complexe, pour un site Symfony (récupérée de [la documentation de Symfony](https://symfony.com/doc/current/setup/web_server_configuration.html#nginx)) :

```nginx
server {
    # On défini les domaines qui appelleront le site.
    # Ici, on a 2 domaines et tous leurs sous-domaines.
    server_name
        heureuxdesordre.com *.heureuxdesordre.com
        heureuxdesordre.fr *.heureuxdesordre.fr
    ;

    # La racine de notre site.
    root /var/www/heureuxdesordre.com/current/public;
    
    location / {
        # Par défaut, on essaie de répondre à la requête en allant chercher 
        # un fichier. Si ça n'est pas un fichier, on envoie la requête à index.php
        # Voir le fonctionnement de Symfony et de son Front Controller ;).
        try_files $uri /index.php$is_args$args;
    }
    
    # Pour toutes les requêtes passant par index.php,
    # on va faire interprêter la requête par Php-fpm
    # (serveur d'application de Php).
    location ~ ^/index\.php(/|$) {
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
        fastcgi_split_path_info ^(.+\.php)(/.*)$;
        include fastcgi_params;

        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        fastcgi_param DOCUMENT_ROOT $realpath_root;

        # Remove the internal directive to allow URIs like this
        internal;
    }

    # Si on cherche à accéder à un fichier .php (autre que index.php),
    # On retourne une erreur 404.
    location ~ \.php$ {
        return 404;
    }

    # On indique où vont être stocké les logs d'erreur et d'accès.
    error_log /var/log/nginx/heureuxdesordre/error.log;
    access_log /var/log/nginx/heureuxdesordre/access.log;
}
```

## Automatiser le déploiement

Pour automatiser les déploiements, on se base en général sur Git et un repository distant (GitHub, GitLab, etc.) et on utilise des outils comme :

- [Deployer, pour mettre en ligne, *via* SSH](https://deployer.org/)
- [PHPloy, pour mettre en ligne, *via* FTP](https://github.com/banago/PHPloy).

L'idée est alors de s'assurer d'avoir la dernière version de nos fichiers (ainsi que les nouveaux fichiers et les suppressions) pour les mettre en ligne. Les outils SSH permettent également de lancer automatiquement l'ensemble des commandes nécessaires à cette mise à jour (pour un site Symfony, on a souvent plusieurs commandes à lancer).


## Resources utiles

- Le [cours sur LAMP (Apache + MySQL + Php)](../lamp)
- [Installer un serveur Debian](https://e-vinrude.drakolab.fr/cookbooks/debianServerInstall.html)
- [Configurer un serveur Nginx](https://e-vinrude.drakolab.fr/snippets/adminSys/nginx.html)
- La [documentation de Symfony sur la configuration Nginx](https://symfony.com/doc/current/setup/web_server_configuration.html#nginx)
