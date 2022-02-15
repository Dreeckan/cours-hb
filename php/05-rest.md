# Webservices REST

- Une architecture / socle commun
- Un client
- Un webservice REST

## Bon à savoir avant de commencer

- Un [très bon tuto sur OpenClassroom](https://openclassrooms.com/fr/courses/6573181-adoptez-les-api-rest-pour-vos-projets-web)
- XML
- JSON
- HTTP, les ["status codes"](https://restfulapi.net/http-status-codes/)

## Définition de REST

- Un système pour cadrer les échanges entre plusieurs programmes / applications
- 6 grands principes à respecter
  - Client-serveur
  - Sans état
  - En couche
  - Utilisation du cache
  - Interface uniforme
  - Code à la demande (optionnel)

### Client-serveur

- Un ou des clients pour **consommer** les données
- Un serveur (qui peut en cacher plusieurs) pour **stocker** les données et **traiter** les requêtes

### Sans état

Le serveur ne gère pas la session, le client doit envoyer les informations de connexion à *chaque requête* (on parle souvent de token et/ou de clé API)

### En couche 

Le client ne peut savoir s'il est connecté au serveur final ou à un intermédiaire (pour répartir la charge, par exemple)

### Utilisation du cache

Clients comme serveurs peuvent mettre en cache les réponses, afin de réduire la quantité de requêtes, améliorer la sécurité (moins d'informations qui transitent, par exemple)

### Interface uniforme

- Identification des resources dans les requêtes (on ne récupère/modifie qu'un objet par requête)
- Une documentation complète pour chaque url (la resource envoyée ne représente pas forcément directement la donnée stockée)
- Messages auto-descriptifs (l'information fournie donne toutes les informations nécessaires à l'interprétation de la donnée)
- Des liens pour accéder aux autres représentations et découvrir les autres url

## Créer un client REST

- Pouvoir utiliser les différentes méthodes (verbes) HTTP (GET, POST, PUT, PATCH, DELETE)
- Gérer les erreurs et les changements
- Utilisation de cUrl
- Guzzle, [Symfony HTTP Client](https://symfony.com/doc/current/http_client.html)

### Le cas AJAX

- Des requêtes depuis le javascript
- Pour récupérer du contenu (HTML, JSON, XML, etc.)
- Et l'utiliser à nouveau dans le javascript

## Un service (serveur) REST

- Accepter des requêtes (et donc un ensemble d'urls à définir)
- Une documentation (le plus [souvent générée automatiquement](https://symfony.com/doc/current/bundles/NelmioApiDocBundle/index.html) grâce aux annotations)
- Faire les traitements et envoyer une réponse cohérente (renvoyer l'objet inséré, s'assurer d'avoir des liens internes cohérents, etc.)
- Sécuriser les transactions (gérer l'identification et les accès)

### Aller un peu plus loin

- Mashup, une API pour en cacher plusieurs
- Des outils pour faciliter la création d'API REST ([des tutos avec Symfony](https://openclassrooms.com/fr/courses/4087036-construisez-une-api-rest-avec-symfony), des [outils surpuissants](https://api-platform.com/) ou [faciles à intégrer dans Symfony](https://github.com/FriendsOfSymfony/FOSRestBundle))
- Des outils de test : via navigateur, [Postman](https://www.postman.com/downloads/) ou PhpUnit (entre autre)
