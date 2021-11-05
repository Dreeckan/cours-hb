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


## Installation et configuration

### Apache

### MySQL

### PHP


## Mise en ligne d'un projet

Voir [cours de déploiement](../deploy/).