# Serveur Lamp

Un serveur <abbr title="Linux Apache MySQL Php">Lamp</abbr> est en réalité un ensemble de 3 programmes :

- Apache
- MySQL
- Php

Le `L` correspond simplement à Linux. Il y a plusieurs moyens d'installer un serveur Lamp, nous allons voir la méthode manuelle, qui vous servira si vous voulez mettre votre site en ligne (en production).

![](http://www-igm.univ-mlv.fr/~dr/XPOSE2003/tomcat/images/serveurappli.jpg)

Explications du schéma ci-dessus ([source](http://www-igm.univ-mlv.fr/~dr/XPOSE2003/tomcat/images/serveurappli.jpg)) : 
1. le navigateur envoie une requête HTTP, qui arrive sur le serveur web
2. ce dernier reçoit la demande et fait le lien entre la requête et l'un des sites configurés
3. il appelle alors le serveur d'applications (Java, Php, etc.) pour traiter la demande
4. le serveur d'application reçoit la demande et la traite (en appelant sa source de données et d'éventuels d'autres serveurs)
5. le serveur d'application envoie sa réponse au serveur web
6. le serveur web transmet la réponse au navigateur (*via* une réponse HTTP)

On note ici qu'il faut bien distinguer :
- le serveur (machine hébergeant les sites et les applications)
- le serveur web ou serveur HTTP (comme Apache)
- le serveur d'application (comme Php)
- le serveur de <abbr title="Base de Données">BdD</abbr>

## Définitions

Les définitions en vidéo : 

<div style="position: relative; padding-bottom: 50.46874999999999%; height: 0;"><iframe src="https://www.loom.com/embed/0210a182d2884ab1b0ba999eb6126316" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

### Serveur

Le terme serveur désigne le rôle joué par un appareil matériel destiné à offrir des services à des clients en réseau Internet. ([source](https://www.journaldunet.fr/web-tech/dictionnaire-du-webmastering/1203337-serveur-informatique-definition-traduction/)).

Nous allons surtout voir 3 types de serveurs : les serveurs web, de <abbr title="Base de Données">BdD</abbr> et d'application

### Apache

Apache est un serveur web, dont le travail est d'attendre les requêtes (HTTP) des utilisateurs pour renvoyer une réponse HTTP (en général, la réponse contient une page HTML). Il est l'un des plus répandus, du fait de son âge, de ses nombreuses fonctionnalités et de sa modularité.

C'est ce serveur qui va faire le lien entre l'url demandée et les fichiers (scripts) à exécuter.
Apache est un outil modulaire, permettant de communiquer simplement avec différents serveurs d'application ou différents langages. Il supporte par exemple Php et permet d'appeler très simplement des scripts Php.

Sa conception le rend également très aisément configurable, permettant de s'adapter à tous les cas. Je vous conseille de jeter un œil aux fichiers `.htaccess` d'Apache, permettant d'appliquer une configuration spécifique à un site/dossier.

#### Alternatives

- Nginx ( <3 )
- Tomcat (également développé par Apache ;) )

### MySQL

MySQL est un serveur de <abbr title="Base de Données">BdD</abbr>, permettant de stocker et récupérer des données de manière structurée, à l'aide de requêtes <abbr title="Structured Query Language">SQL</abbr>.

#### Alternatives

- MariaDB (version libre et améliorée de MySQL)
- PostgreSQL (libre et très (très) puissant)
- Oracle (trop puissant et non libre)
- De nombreux autres <abbr title="Systèmes de Gestion de Base de Données">SGBD</abbr>

### PHP

Php est plusieurs choses : 
- un programme permettant d'interpréter du Php (lorsqu'on appelle une commande comme `php bin/console`)
- un serveur d'application (lorsqu'il est appelé par un serveur web comme Apache ou Nginx)

En général, Php se comporte comme un simple interpréteur et est utilisé comme tel par Apache. Lors de l'appel d'une URL, Apache fait le lien avec le fichier `.php` à exécuter et lance la commande pour l'interpréter. 
Il existe toutefois des variantes (comme PHP-fpm) permettant d'utiliser PHP en tant que serveur d'application à part entière. Php-fpm est alors appelé sur un port précis (ou une socket) et attend qu'on lui envoie des informations (requêtes) pour les traiter lui-même. Cette dernière méthode est en général plus rapide et plus efficace.

Comme nous l'avons vu avec l'exécutable Symfony, les dernières version de Php fournissent également un serveur web, qui se comporte en fait comme un serveur web **et** un serveur d'application. Je vous invite à lire [la documentation sur le serveur web interne de Php](https://www.php.net/manual/fr/features.commandline.webserver.php), en vous rappelant que ça n'est pas viable pour un environnement de production ;) .

#### Les extensions Php

Certaines fonctionnalités nécessitent d'ajouter ce que l'on appelle des extensions : des librairies liées à Php, non inclues par défaut dans PHP. Pour les installer, cela dépend de votre système :
- Sur Debian, vous pouvez les installer avec `apt` ou `pecl`
- Sur Windows, vous pouvez les installer en téléchargeant les fichiers `.dll` ou avec `pecl`

## Installation et configuration

[La documentation d'installation d'un serveur Debian chez Drakona](https://e-vinrude.drakolab.fr/cookbooks/debianServerInstall.html)

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/a3bd18f2737b4c98b9fd93b72d055c42" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Tout ce qui suit concerne l'installation d'un serveur LAMP sur une machine Linux (Debian ou basée sur Debian). Pour l'installation sur une machine Windows, voir [l'installation de Wamp dans le cours sur PHP](../php/00-intro.html#environnement-de-travail).

### Apache

La première chose à faire est d'installer Apache. Sur un serveur Debian, on va utiliser la commande :

```bash
sudo apt install apache2 apache2-utils
```

Pour le configurer, on va créer la configuration d'un site dans le dossier `/etc/apache2/sites-available/`. Le dossier `/etc` étant en dehors de notre dossier personnel, nous n'avons pas les droits par défaut, et il nous faut utiliser les droits de super utilisateur. Créons par exemple un fichier de configuration pour un site `www.example.test` :

```bash
sudo nano /etc/apache2/sites-available/example.test.conf
```

Personnellement, je nomme mes configurations en fonction du nom de domaine du site. Il n'y a aucune obligation et le nommage est plutôt libre (le `.conf` n'est pas vraiment optionnel, par contre ;) ).

À l'intérieur, j'y indique le nom du site et un ou des alias, et le chemin vers mes fichiers :

```apacheconf
<VirtualHost *:80>
    # On indique l'admin à contacter en cas de soucis (optionnel)
    ServerAdmin contact@example.test
    # Le chemin où se trouvent les fichiers visibles du site
    DocumentRoot /var/www/test/public
    # Le nom de domaine attendu par défaut
    ServerName www.example.test
    # Un second nom de domaine (ou plus) pouvant donner sur ce site (optionnel)
    ServerAlias example.test

    # On définit des options et des droits sur le dossier du site
    <Directory /var/www/test/public/>
        # -Indexes : on n'affiche pas le contenu du dossier si aucun fichier d'index n'est trouvé
        # +FollowSymLinks : Si un fichier ou un dossier est un lien symbolique, on le suit
        Options -Indexes +FollowSymLinks
        # On permet à un fichier .htaccess de surcharger la configuration
        Allowoverride ALL
        
        # Les deux balises suivantes définissent des droits sur le dossier
        # selon si le module mod_authz_core.c existe ou non sur ce système
        # Dans les deux cas, on accorde toujours le droit de lecture sur les fichiers
        <IfModule mod_authz_core.c>
            # Apache 2.4
            Require all granted
        </IfModule>
        <IfModule !mod_authz_core.c>
            # Apache 2.2
            Order deny,allow
            Allow from all
        </IfModule>
    </Directory>

    # On récupère les logs d'accès dans le premier fichier
    CustomLog /var/log/apache2/example.test.log vhost_combined
    # Et les logs d'erreur dans le second
    ErrorLog /var/log/apache2/example.test.errors.log
</VirtualHost>
```

Une fois votre fichier de configuration prêt, vous pouvez l'activer **et rendre le site disponible** avec la commande :

```bash
sudo ad2ensite example.test.conf
sudo service apache2 restart
```

Votre fichier de configuration est alors lié dans le dossier `/etc/apache2/sites-enabled/` et devient donc disponible dès le redémarrage d'apache.

### MySQL

Pour installer MySQL, on va installer le serveur et le client :

```bash
sudo apt install mysql-client mysql-server
```

Une fois le serveur installé, vous allez devoir le configurer ! Normalement, vous aurez quelques éléments d'installation proposés (version de MySQL principalement). Je vous laisse juge des versions dont vous avez besoin.

Une fois MySQL installé, on peut définir un mot de passe d'administrateur (root) avec la commande :

```bash
sudo mysql_secure_installation
```

Une série de questions va alors vous être posées et il peut être utile de dire oui à la plupart (je vous invite à regarder la vidéo d'installation pour plus de détails). 

En général, il vaut mieux [créer un utilisateur et lui donner des droits](https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql) pour mettre à jour une BdD précise, sans avoir accès aux autres. Ainsi, si le mot de passe d'une de vos bases est compromis, les autres restent isolées. Dans un premier temps, se connecter à la console MySQL :

```bash
sudo mysql -uroot -p
```

Puis entrer les commandes suivantes (à adapter selon vos éléments à vous) :

```sql
CREATE USER 'votreUtilisateur'@'localhost' IDENTIFIED BY 'motDePasse';
GRANT ALL PRIVILEGES ON uneBdD . * TO 'votreUtilisateur'@'localhost';
FLUSH PRIVILEGES;
```

Pour plus de détails, je vous conseille la lecture de [cet article détaillant la création d'un utilisateur et la gestion des droits](https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql).

Votre serveur MySQL devrait être prêt à l'utilisation ;) .

### PHP

Installer Php implique d'installer php et les extensions dont vous avez besoin (ce qui n'est pas toujours simple à déterminer). La commande d'installation suivante installe Php 7.4 et les extensions nécessaires à Symfony (plus quelques optionnelles) :

```bash
sudo apt update && sudo apt install php-pear php7.4 php7.4-{cli,common,curl,dev,fpm,gd,intl,json,mbstring,mysql,readline,xml,zip}
```

`php7.4-{cli,common}` est équivalent à `php7.4-cli php7.4-common`

Installer Composer : 

```bash
curl -sS https://getcomposer.org/installer -o composer-setup.php && sudo php composer-setup.php --install-dir=/usr/local/bin --filename=composer && rm -rf composer-setup.php
```

## Mise en ligne d'un projet

Voir [cours de déploiement](../deploy/).