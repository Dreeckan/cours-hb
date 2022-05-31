# Webservices REST

## Bon à savoir avant de commencer

- Un [très bon tuto sur OpenClassroom](https://openclassrooms.com/fr/courses/6573181-adoptez-les-api-rest-pour-vos-projets-web)
- Une [autre très bonne explication de ce qu'est une API REST](https://code-garage.fr/blog/qu-est-ce-qu-une-api-rest/)
- XML
- JSON
- HTTP, les ["status codes"](https://restfulapi.net/http-status-codes/)


## Définition de REST

On parle d'un système REST (en général, une API REST) pour désigner un système servant à cadrer les échanges entre plusieurs programmes / applications. En général une API REST sert de point central pour les données. D'autres programmes lui envoient des données ou les récupèrent et les autres programmes n'ont pas à se soucier du fonctionnement interne de l'API.

Toute l'organisation d'une API REST est centrée sur les données. C'est l'une de ses principales caractéristiques : 
- on récupère des listes d'un type de données 
- ou on ajoute / modifie / crée une donnée d'un type

Par exemple, une API de gestion de films fournira une route (url) pour créer / ajouter / modifier un film, une autre pour lister les films. Si l'on souhaite modifier les acteurs liés à un film, cela se passera sur une autre route.

Pour créer un système REST, il y a **6 grands principes** à respecter, définis ci-après.

### Client-serveur

Un ou des clients cont **consommer** les données. Le système REST est un serveur (et peut en cacher plusieurs autres) pour **stocker** les données et **traiter** les requêtes.

### Sans état

Le serveur ne gère pas la session, le client doit envoyer les informations de connexion à **chaque requête** (on parle souvent de token de connexion, de clé API ou de jeton de connexion).

### En couche 

Le client ne peut savoir s'il est connecté au serveur final ou à un intermédiaire (pour répartir la charge, par exemple). Un système REST peut être composé d'une multitude de serveurs, mais l'architecture doit rester invisible aux clients.

### Utilisation du cache

Clients comme serveurs peuvent mettre en cache les réponses, afin de réduire la quantité de requêtes et améliorer la sécurité (moins d'informations qui transitent, par exemple).

### Interface uniforme

Une interface uniforme est définie par :
- L'identification claire des resources dans les requêtes (on ne récupère/modifie qu'un objet par requête)
- Une documentation complète pour chaque url (la resource envoyée ne représente pas forcément directement la donnée stockée)
- Messages auto-descriptifs (l'information fournie donne toutes les informations nécessaires à l'interprétation de la donnée)
- Des liens pour accéder aux autres représentations et découvrir les autres urls


## Créer un client REST

Pour créer un client REST, il faut :
- Pouvoir utiliser les différentes méthodes (verbes) HTTP (GET, POST, PUT, PATCH, DELETE)
- Gérer les erreurs et les changements de l'API
- Utilisation de cUrl ou équivalent avec une librairie comme Guzzle, [Symfony HTTP Client](https://symfony.com/doc/current/http_client.html) ou équivalent

### Le cas AJAX

Il est aisé de créer un client REST avec javascript, en utilisant AJAX (`fetch()` par exemple), pour récupérer des données JSON.
En général, en AJAX, on peut aisément récupérer des données *via* n'importe quel verbe (GET, POST, PUT, etc.) et traiter la réponse dans la foulée.


## Un service REST

Pour créer un serveur (ou service) REST, il faut qu'il : 
- accepte des requêtes HTTP (et donc un ensemble d'urls à définir), suivant un format standardisé
- Une documentation (le plus [souvent générée automatiquement](https://symfony.com/doc/current/bundles/NelmioApiDocBundle/index.html) grâce aux annotations)
- Faire les traitements et envoyer une réponse cohérente (renvoyer l'objet inséré, s'assurer d'avoir des liens internes cohérents, etc.)
- Sécuriser les transactions (gérer l'identification et les accès)

### Format des urls avec REST

Pour créer une API, on va utiliser un ensemble réduit d'urls et la plupart des verbes HTTP (comme GET, POST, PUT, PATCH, UPDATE, etc.).

![Exemple d'un ensemble de routes REST, avec ApiPlatform (Swagger UI)](/assets/img/php/rest_example.png)

Dans l'image ci-dessus, remarquez que l'on utilise 2 urls différentes, mais 5 verbes HTTP différents pour obtenir 6 routes différentes, avec des fonctionnements différents :
- GET `/api/recipes/` retourne une liste d'objets `recipe`
- POST `/api/recipes/` permet de créer un nouvel objet `recipe`

Les urls prenant un identifiant permettent d'agir sur un objet `recipe` précis :
- GET `/api/recipes/{id}` retourne un objet `recipe`
- PUT `/api/recipes/{id}` remplace un objet `recipe`
- DELETE `/api/recipes/{id}` supprime un objet `recipe`
- PATCH `/api/recipes/{id}` pour mettre à jour un objet `recipe`

### Aller un peu plus loin

- Des outils pour faciliter la création d'API REST ([des tutos avec Symfony](https://openclassrooms.com/fr/courses/4087036-construisez-une-api-rest-avec-symfony), des [outils surpuissants](https://api-platform.com/) ou [faciles à intégrer dans Symfony](https://github.com/FriendsOfSymfony/FOSRestBundle))
- Des outils de test : *via* le navigateur, [Postman](https://www.postman.com/downloads/) ou PhpUnit (entre autre)
