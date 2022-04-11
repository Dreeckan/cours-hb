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

#### Une configuration simple, pour afficher un site statique (site en HTML, CSS et JS)

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

#### Une configuration complexe, pour un site Symfony (récupérée de [la documentation de Symfony](https://symfony.com/doc/current/setup/web_server_configuration.html#nginx))

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

### Mise en place d'un déploiement avec Deployer

Tout d'abord, [télécharger Deployer](https://deployer.org/download). Pour le moment, je vous conseille de placer le fichier `deployer.phar` à la racine de votre projet (en attenant que la dernière version soit disponible via composer).

Lancer la commande `php ./deployer.phar init` pour préparer le script. Personnellement, je choisis un fichier de configuration en Yaml, pour un projet Symfony et le lien vers mon repository est déjà entré.

J'obtiens un fichier `deploy.yaml` qu'il ne me reste qu'à adapter.

```yaml
# Cette ligne permet d'utiliser la configuration toute prête pour un projet Symfony
# Il ne nous reste qu'à adapter aux particularités du projet.
import:
  - recipe/symfony.php

config:
  # Cette ligne a déjà été entrée, normalement. 
  # Je vous conseille toutefois de vous assurer d'avoir le lien SSH
  repository: 'git@github.com:dreeckan/example.git'
  # Une option pour Windows, qui ne supporte pas le multiplexing
  ssh_multiplexing: false

# On configure le ou les serveurs où l'on veut déployer
hosts:
  prod.example.com:
    remote_user: deployer
    deploy_path: '/var/www/prod/'

# On peut créer des tâches supplémentaires si on le souhaite
# Deployer nous laisse, par défaut, une tâche pour lancer un build npm 
# (inutile si vous n'avez pas de javascript)
tasks:
  build:
    - cd: '{{release_path}}'
    - run: 'npm run build'

# On peut utiliser after et before pour ajouter des tâches après ou avant d'autres
# Ici, on demande de débloquer le déploiement lorsqu'un déploiement échoue
after:
  deploy:failed: deploy:unlock
```

Prenons un code un peu amélioré et voyons ce qui a été ajouté

```yaml
# Cette ligne permet d'utiliser la configuration toute prête pour un projet Symfony
# Il ne nous reste qu'à adapter aux particularités du projet.
import:
  - recipe/symfony.php

config:
  # Cette ligne a déjà été entrée, normalement. 
  # Je vous conseille toutefois de vous assurer d'avoir le lien SSH
  repository: 'git@github.com:dreeckan/example.git'
  # On transmet notre clé SSH pour la connexion à GitHub / GitLab
  forward_agent: true
  # Pour Windows, qui ne prend pas en compte le multiplexing
  ssh_multiplexing: false
  # Je ne veux pas envoyer de stats, merci ;)
  allow_anonymous_stats: false
  # Le nom de l'utilisateur qui doit pouvoir écrire dans certains dossiers du serveur
  http_user: www-data
  # On veut utiliser la commande chmod pour permettre l'écriture dans certains dossiers
  writable_mode: 'chmod'
  # Ce chmod sera exécuté en tant que super utilisateur
  writable_use_sudo: true
  keep_releases: 5
  # Variables utilisées pour le message Discord (voir plus bas "notify:XXX")
  application: 'Example site'
  discord_webhook: "https://discordapp.com/api/webhooks/XX/XXXXXXXXXXXXXXXX"
  
  # Les dossiers partagés (conservés d'une release à l'autre)
  shared_dirs:
    - var/log
    - var/sessions
    - var/uploads/images
    - public/cache
  # Les fichiers partagés (conservés d'une release à l'autre)
  shared_files:
    - .env.local
  # Les fichiers où le serveur doit pouvoir écrire
  writable_dirs:
    - var
    - var/log
    - var/cache
    - var/sessions
    - var/uploads/images
    - public/cache

# Liste des hôtes (serveurs) où l'on souhaite déployer et leurs configurations
hosts:
  # je masque l'IP du serveur ;)
  XXX.XXX.XXX.XXX:
    # C'est l'utilisateur debian du serveur qu'on va utiliser
    remote_user: debian
    # Dans quel dossier du serveur va-t-on déployer (installer nos fichiers) ?
    deploy_path: '/var/www/www.example.com'
    # La branche à déployer
    branch: master
    # Une variable pour Discord (voir plus bas "notify:success")
    real_url: 'www.example.com'

# On définit un ensemble de tâches personnalisées, qui vont être utiles pendant/autour du déploiement.
# Il faudra encore les placer dans le processus de déploiement
tasks:
  # La tâche build va appeler la commande make update dans le dossier de la release
  # Cette commande va faire (entre autre) : composer install, npm install, passer les migrations, etc.
  # Noter l'appel à la variable release_path, définie par Deployer
  build:
    - cd: '{{release_path}}'
    - run: 'make update'
  # On exécute 2 commandes (arbitraires) pour mettre à jour les droits sur le dossier du projet.
  make:rights:
    - run: sudo chown debian:www-data -R {{ deploy_path }}
    - run: sudo chmod g+w -R {{ deploy_path }}
      
  # Des tâches pour envoyer des notifications sur Discord, grâce à un webhook
  # Noter l'appel à la variable application, discord_webhook et real_url définies par nos soins, plus haut
  notify:start:
    - run: "curl -H \"Content-Type: application/json\" -X POST -d '{\"content\": \"**Début** du déploiement de {{application}} sur le serveur **prod** !\"}' {{discord_webhook}}"
  notify:success:
    - run: "curl -H \"Content-Type: application/json\" -X POST -d '{\"content\": \"**Réussite** du déploiement de {{application}} sur le serveur **prod** ! :D Il est temps de tester sur https://{{ real_url }} !\"}' {{discord_webhook}}"
  notify:fail:
    - run: "curl -H \"Content-Type: application/json\" -X POST -d '{\"content\": \"**Échec** du déploiement de {{application}} sur le serveur **prod** >.< !\"}' {{discord_webhook}}"

# On définit quand nos tâches vont être effectuées.
before:
  # Avant de mettre en place le lien symbolique, on lance la tâche build
  deploy:symlink: build
  # Avant de lancer le déploiement, on envoie un message sur Discord
  deploy: notify:start

# On définit quand nos tâches vont être effectuées.
after:
  # après un échec de déploiement, on débloque le déploiement, et on envoie un message sur Discord
  deploy:failed:
    - deploy:unlock
    - notify:fail
  # après un déploiement, on change les droits et on envoie un message sur Discord
  deploy: 
    - make:rights
    - notify:success
```

## Resources utiles

- Le [cours sur LAMP (Apache + MySQL + Php)](../lamp)
- [Installer un serveur Debian](https://e-vinrude.drakolab.fr/cookbooks/debianServerInstall.html)
- [Configurer un serveur Nginx](https://e-vinrude.drakolab.fr/snippets/adminSys/nginx.html)
- La [documentation de Symfony sur la configuration Nginx](https://symfony.com/doc/current/setup/web_server_configuration.html#nginx)
