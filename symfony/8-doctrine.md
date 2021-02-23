# Doctrine et la BdD

[La documentation officielle](https://symfony.com/doc/current/doctrine.html) que nous allons suivre.

## Configurer la BdD

Pour travailler avec Doctrine, pas besoin de créer une base de données, nous allons voir comment le faire simplement avec la ligne de commande.

D'abord, configurer l'accès à la base. Pour cela, modifier le fichier `.env` :

```dotenv
# In all environments, the following files are loaded if they exist,
# the latter taking precedence over the former:
#
# * .env                contains default values for the environment variables needed by the app
# * .env.local          uncommitted file with local overrides
# * .env.$APP_ENV       committed environment-specific defaults
# * .env.$APP_ENV.local uncommitted environment-specific overrides
#
# Real environment variables win over .env files.
#
# DO NOT DEFINE PRODUCTION SECRETS IN THIS FILE NOR IN ANY OTHER COMMITTED FILES.
#
# Run "composer dump-env prod" to compile .env files for production use (requires symfony/flex >=1.2).
# https://symfony.com/doc/current/best_practices.html#use-environment-variables-for-infrastructure-configuration

# ##> symfony/framework-bundle ###
APP_ENV=dev
APP_SECRET=e194910b102ef1a834e9967fb13ec881
# ##< symfony/framework-bundle ###

# ##> symfony/mailer ###
# MAILER_DSN=smtp://localhost
# ##< symfony/mailer ###

# ##> doctrine/doctrine-bundle ###
# Format described at https://www.doctrine-project.org/projects/doctrine-dbal/en/latest/reference/configuration.html#connecting-using-a-url
# IMPORTANT: You MUST configure your server version, either here or in config/packages/doctrine.yaml
#
# DATABASE_URL="sqlite:///%kernel.project_dir%/var/data.db"
# DATABASE_URL="mysql://db_user:db_password@127.0.0.1:3306/db_name?serverVersion=5.7"
DATABASE_URL="mysql://root:@127.0.0.1:3306/test-symfony?serverVersion=5.7"
# ##< doctrine/doctrine-bundle ###
```

La ligne qui nous intéresse est celle-ci : 

```dotenv
DATABASE_URL="mysql://root:pass@127.0.0.1:3306/test-symfony?serverVersion=5.7"
```

Décomposons-la pour comprendre ce qu'elle fait et comment :

- `mysql://` est le protocole à utiliser (le type de BdD qu'on utilise, si vous préférez). Ici, mysql
- `root:pass` est la combinaison `identifiant:motDePasse` à utiliser pour se connecter à notre BdD. Avec Wamp, nous allons plutôt avoir `root:` et pour Mamp `root:root`
- `127.0.0.1:3306` est l'adresse IP de notre BdD, suivi du port. Tant que nous travaillons en local, nous n'avons pas besoin de les changer. Noter que `127.0.0.1` peut être remplacé par `localhost`, les deux sont équivalent.
- `/test-symfony` est le nom de la BdD que l'on va utiliser. Pas besoin de la créer avant, nous la créerons juste après.

Pour des exemples avec d'autres types de BdD, je vous invite à regarder la [section dédiée de la doc officielle](https://symfony.com/doc/current/doctrine.html#configuring-the-database)

Une fois configurée, lancer la commande `php bin/console doctrine:database:create` dans votre terminal pour créer la BdD. Bien sûr, pas besoin de le faire si votre BdD existe déjà.

Si vous souhaitez afficher la liste des commandes disponibles avec Doctrine, lancer la commande `php bin/console list doctrine`.

## Configurer Doctrine

Regardons le fichier `config/packages/doctrine.yaml`. Nous n'avons normalement rien besoin de modifier.

```yaml
# le premier niveau nous indique que nous configurons Doctrine (logique ;) )
doctrine:
    # Cette section sert à configurer l'accès à la BdD
    dbal: 
        # Ici, nous récupérons notre variable d'environnement DATABASE_URL (définie dans .env)
        # pour nous en servir dans Doctrine.
        url: '%env(resolve:DATABASE_URL)%'

        # IMPORTANT: You MUST configure your server version,
        # either here or in the DATABASE_URL env var (see .env file)
        #server_version: '13'
    # Cette section va configurer l'ORM (Object-Relational mapping ou Mapping objet-relationnel).
    # C'est à dire l'outil faisant le lien entre nos objets PHP et nos tables (le coeur de Doctrine en somme)
    orm:
        # Doctrine va générer des classes "proxy" servant à gérer plus rapidement les objets (en ajoutant des méthodes spécifiques pour son usage, comme gérer le cache par exemple)
        auto_generate_proxy_classes: true
        # Ce paramètre défini comment Doctrine convertit le nom d'une classe en un nom de table (et même chose pour les noms de propriétés en noms de champs)
        naming_strategy: doctrine.orm.naming_strategy.underscore_number_aware
        # On indique à Doctrine qu'on veut qu'il détecte nos entités (objets à convertir en tables) automatiquement
        auto_mapping: true
        # On lui indique quand même sur quels dossiers il doit travailler et comment les lire
        mappings:
            # Ici, nous pouvons donner à Doctrine plusieurs dossiers où se trouvent des entités
            # Cette section sert surtout si vous utilisez une structure personnalisée (ce que nous n'allons pas faire ;) ).
            App:
                # Un paramètre historique de Symfony, nous n'en tiendrons pas compte. Il servait en Symfony 2 et 3 (nous voyons la version 5)
                is_bundle: false
                # Nous indiquons que notre mapping (les indications des types des champs par exemple) est fait à l'aide d'annotations (il est possible de le faire en Yaml ou en Xml, mais ces méthodes sont dépréciées)
                type: annotation
                # Nous indiquons dans quel dossier chercher nos entités. %kernel.project_dir% est un paramètre, toujours défini dans Symfony, vous permettant de récupérer le chemin vers la racine du projet. On s'en sert surtout dans les configurations des packages (dépendances ou librairies que l'on charge avec Composer dans notre projet)
                dir: '%kernel.project_dir%/src/Entity'
                prefix: 'App\Entity'
                alias: App
```