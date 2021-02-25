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

### Débug pour Mac et Mamp

Si vous êtes sur Mac avec Mamp, la configuration est différente : 

```dotenv
DATABASE_URL="mysql://root:root@localhost:8889/exo-symfony?serverVersion=5.7"
```

Vous pouvez également avoir des soucis de version de php. Le conflit est entre la version de php de votre Mac et celle de Mamp.

Pour les régler, voici une manipulation qui peut vous aider :

- Trouver votre version de PHP dans Mamp (disons 7.4.12 pour la suite)
- Trouver la version de PHP sur votre Mac (ouvrir un terminal et taper `php -v`). Si elle est différente de celle de Mamp, faire ce qui suit.
- `sudo ln -s /Applications/MAMP/bin/php/php7.4.12/bin/php /usr/local/bin/php` (remplacer `php7.4.12` par votre version de PHP dans Mamp, ex `php7.4.9`)
- Ouvrir un nouveau terminal et lancer la commande `php -v` pour vérifier que le changement a été effectué

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

## Créer des entités

Une entité est une classe PHP (rangée, dans notre cas, dans le dossier `src/Entity`) qui va correspondre à une table de notre BdD. Chaque ligne de cette table correspondra à un objet.

Pour faire schématique :
- Classe = table
- Objet = ligne de cette table

Nous allons créer 2 entités :
- `Article` un article de blog, contenant un titre (string de 255 caractères), un contenu (text) et une catégorie (Tag)
- `Tag` une catégorie, contenant un nom (string de 128 caractères), qui peut être liée à plusieurs articles

Pour créer ces objets, nous avons 2 choix :
- les écrire nous-même
- les générer à l'aide de la commande `php bin/console make:entity`

Je vous conseille toujours le second choix ;).

Dans un premier temps, créons la classe `Article`.
 
- On exécute la commande
- On précise le nom de la classe qu'on veut créer : `Article`
- Puis on ajoute nos champs
  - `title` de type string, longueur 255 et non `null`
  - `content` de type text et non `null`
- Arrêtons-nous ici pour cette entité. Nous ajouterons la relation avec Tag en créant cette entité.

Créons la classe `Tag`

- On exécute la commande
- On précise le nom de la classe qu'on veut créer : `Tag`
- Puis on ajoute nos champs
  - `name` de type string, longueur 128 et non `null`
  - `articles` de type relation (nous serons ainsi guidés pour choisir le type de relation, ici nous voulons du `OneToMany` : 1 Tag lié à n Articles)
    - La commande nous propose également de créer un champ `tag` dans `Article`. Profitons-en, ça pourra nous servir !
    - La commande nous demande également si la propriété `tag` de `Article` peut être null. Disons que non (nos articles doivent obligatoirement avoir une catégorie).
    - Contrairement à la vidéo, à la question d'activer `orphanRemoval` sur cette relation, dire non.
    - La relation est ajoutée !
    - Valider une dernière fois pour terminer les modifications

Nous avons maintenant 4 fichiers créés, dont ces 2 entités : 

- `src/Entity/Tag.php` : 

```php
<?php

namespace App\Entity;

use App\Repository\TagRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TagRepository::class)
 */
class Tag
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=128)
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity=Article::class, mappedBy="tag")
     */
    private $articles;

    public function __construct()
    {
        $this->articles = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|Article[]
     */
    public function getArticles(): Collection
    {
        return $this->articles;
    }

    public function addArticle(Article $article): self
    {
        if (!$this->articles->contains($article)) {
            $this->articles[] = $article;
            $article->setTag($this);
        }

        return $this;
    }

    public function removeArticle(Article $article): self
    {
        if ($this->articles->removeElement($article)) {
            // set the owning side to null (unless already changed)
            if ($article->getTag() === $this) {
                $article->setTag(null);
            }
        }

        return $this;
    }
}

```


- `src/Entity/Article.php` : 

```php
<?php

namespace App\Entity;

use App\Repository\ArticleRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ArticleRepository::class)
 */
class Article
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     */
    private $content;

    /**
     * @ORM\ManyToOne(targetEntity=Tag::class, inversedBy="articles")
     * @ORM\JoinColumn(nullable=false)
     */
    private $tag;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getTag(): ?Tag
    {
        return $this->tag;
    }

    public function setTag(?Tag $tag): self
    {
        $this->tag = $tag;

        return $this;
    }
}
```

## Les migrations

Lorsque nous créons des entités, nous voulons que nos changements apparaissent dans notre BdD (tel était notre objectif, au départ). Pour cela, nous avons plusieurs moyens, mais le plus propre d'entre eux est de créer des migrations.

Une migration

## Exercices liés

Si vous êtes arrivés jusque-là, vous pouvez maintenant [faire les exercices 5 et 6](99-exercices.md)