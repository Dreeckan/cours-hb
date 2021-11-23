# Travailler avec Docker

Dans les dernières versions de Symfony, la création d'un projet s'accompagne d'un fichier `docker-compose.yml`, permettant de travailler facilement avec Docker. Grâce à cela, plus besoin de Wamp !

## Pré-requis

- [Docker](https://docs.docker.com/install/) doit être installé
- Avoir un projet Symfony prêt à être lancé

## Utilisation

Le fichier `docker-compose.yml` fourni :

```yaml
version: '3'

services:
###> doctrine/doctrine-bundle ###
  database:
    image: postgres:${POSTGRES_VERSION:-13}-alpine
    environment:
      POSTGRES_DB: ${POSTGRES_DB:-app}
      # You should definitely change the password in production
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-ChangeMe}
      POSTGRES_USER: ${POSTGRES_USER:-symfony}
    volumes:
      - db-data:/var/lib/postgresql/data:rw
      # You may use a bind-mounted host directory instead, so that it is harder to accidentally remove the volume and lose all your data!
      # - ./docker/db/data:/var/lib/postgresql/data:rw
###< doctrine/doctrine-bundle ###

volumes:
###> doctrine/doctrine-bundle ###
  db-data:
###< doctrine/doctrine-bundle ###

```

Par défaut, ce fichier permet de créer un serveur de <abbr title="Base de Données">BdD</abbr> [PostgreSQL](https://www.postgresql.org/). Vous n'avez alors rien à changer pour commencer à travailler !

Avec cette configuration, vérifiez bien que votre fichier `.env` (ou `.env.local`) contient : 
```dotenv
DATABASE_URL="postgresql://symfony:ChangeMe@127.0.0.1:5432/app?serverVersion=13&charset=utf8"
```

Pour commencer à travailler, lancer la commande `docker compose up -d` dans votre terminal, puis `symfony serve`, et (théoriquement) tout est prêt !

:warning: Il n'y a pas d'équivalent à PhpMyAdmin fourni ! Pour voir le contenu de votre <abbr title="Base de Données">BdD</abbr>, il faut utiliser les outils intégrés de l'<abbr title="Integrated Development Environment">IDE</abbr> (onglet Database de PhpStorm ou son équivalent dans VsCode)
