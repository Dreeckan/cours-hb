# Doctrine et la BdD

[La documentation officielle](https://symfony.com/doc/current/doctrine.html) que nous allons suivre.

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/02251e40b02349dd8bd34775a05a4e2c" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## Pour résumer

- Pour mettre en place la base, 
  - créer/modifier la variable `DATABASE_URL` dans `.env`
  - Lancer la commande `doctrine:database:create`
- Exécuter les migrations `doctrine:migrations:migrate` pour mettre à jour la <abbr title="Base de Données">BdD</abbr>
- Créer des entités avec `make:entity`
- Créer une ou des migrations avec `make:migration` (ou `doctrine:migrations:diff`) (:warning: pensez à les exécuter avec `doctrine:migrations:migrate`)
- Créer de fausses données avec `DoctrineFixturesBundle` et les charger avec `doctrine:fixtures:load`
- Pour insérer des données dans la base, injecter le service `EntityManagerInterface` et utiliser les méthodes `persist()` et `flush()`
- Pour récupérer des données de la base, injecter le repository correspondant à la table et utiliser ses méthodes
  - Si besoin de requêtes plus complexes, créer des méthodes en utilisant le `QueryBuilder`

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

Si vous utilisez MariaDB, il est plus probable qu'une variante comme celle-ci vous convienne mieux :

```dotenv
DATABASE_URL="mysql://root:pass@127.0.0.1:3307/test-symfony?serverVersion=mariadb-10.4.13"
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
`src/Entity/Tag.php`

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

`src/Entity/Article.php`

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

Si vous n'avez pas créé la BdD, Symfony met à votre disposition une commande pour le faire :

```shell
php bin/console doctrine:database:create
```

Lorsque nous créons des entités, nous voulons que nos changements apparaissent dans notre BdD (tel était notre objectif, au départ). Pour cela, nous avons plusieurs moyens, mais le plus propre d'entre eux est de créer des migrations.

Une migration contient 2 ensemble de requêtes SQL, pour vous permettre de passer d'une version à l'autre de votre BdD. Son nom contient la date précise où vous l'avez générée et permet ainsi de savoir dans quel ordre les migrations doivent être exécutées.

Elle contient 2 méthodes :

- `up` : les requêtes à exécuter pour mettre à jour la base
- `down` : les requêtes à exécuter pour annuler ces modifications (on s'en sert principalement en cas de problèmes)

Pour générer une migration, il faut utiliser la commande (j'ajoute l'option `-n` pour éviter que la ligne de commande demande une confirmation) :

```shell
php bin/console make:migration
```

La commande `php bin/console doctrine:migrations:diff -n` fait exactement la même chose.

:warning: **Conseil** : il peut être utile d'exécuter les migrations *avant* d'en générer une nouvelle en exécutant `php bin/console doctrine:migrations:migrate -n` avant la commande `make:migration` / `doctrine:migrations:diff`

Dans notre exemple, notre migration ressemblera à ceci :

```php
<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210226082708 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE article (id INT AUTO_INCREMENT NOT NULL, tag_id INT NOT NULL, title VARCHAR(255) NOT NULL, content LONGTEXT NOT NULL, INDEX IDX_23A0E66BAD26311 (tag_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tag (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(128) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE article ADD CONSTRAINT FK_23A0E66BAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE article DROP FOREIGN KEY FK_23A0E66BAD26311');
        $this->addSql('DROP TABLE article');
        $this->addSql('DROP TABLE tag');
    }
}
```

Pour exécuter les migrations :

```shell
php bin/console doctrine:migrations:migrate -n
```

Cette commande exécutera toutes les migrations qui n'ont pas déjà été lancées (la liste des migrations déjà exécutées se trouve dans la table `doctrine_migration_versions` de votre BdD).

:warning: **Conseil :** Il est important que votre base puisse être construite de 0 avec les migrations (et éventuellement des fixtures). Vous pouvez tester

### Annuler une migration

Si une migration s'est mal passée (une erreur s'est produite pendant la migration ou crée un bug, par exemple), vous pouvez l'annuler avec la commande `php bin/console doctrine:migrations:execute --down DoctrineMigrations\VersionXXX` où `XXX` est le numéro de version (dans les faits, on passe le FQCN de la migration à la commande).

## L'EntityManager pour sauvegarder

Maintenant que nous avons notre schéma de BdD (nos tables et nos colonnes), voyons comment ajouter des entrées dans nos tables. Nous allons le faire depuis un controller, mais sachez que ce fonctionnement peut être utilisé dans n'importe quel service (classe se trouvant dans `src`, en dehors de notre dossier `src/Entity`).

Un exemple détaillé d'utilisation :

```php
<?php

namespace App\Controller;

use App\Entity\Article;
use App\Entity\Tag;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/blog", name="blog_")
 */
class BlogController extends AbstractController
{
    // ...

    /**
     * @Route("/fixtures", name="fixtures")
     * @param EntityManagerInterface $entityManager
     *
     * @return Response
     */
    public function fixtures(EntityManagerInterface $entityManager): Response
    {
        // On crée un objet Tag (nous n'en avons actuellement aucun)
        $tag = new Tag();
        $tag->setName('animaux');

        // On crée un premier article et on donne des valeurs à ses différents champs
        $article = new Article();
        $article->setTitle('Les animaux fantastiques');
        $article->setContent('Un contenu fabuleux pour un article fantastique');
        // Ici, on fait le lien entre notre article et le tag que nous avons défini plus haut.
        // Doctrine se chargera de retranscrire ce lien dans la BdD.
        // Dans les faits, il mettra l'id de notre tag dans la colonne tag_id de notre article.
        $article->setTag($tag);

        // Ici, on dit à l'entity manager qu'il devra sauvegarder nos deux entités. Vous pouvez voir ce persist que le add de Git
        // Noter qu'il faut appeler la méthode persist sur chacun de nos objets
        // Il est possible de ne le faire qu'une fois, mais c'est une astuce que vous verrez plus tard ;)
        $entityManager->persist($tag);
        $entityManager->persist($article);

        // Noter que les entrée n'existent pas encore en base.
        // Elle n'existent qu'une fois que nous appelons la méthode flush de l'entity manager.
        // Vous pouvez voir la méthode persist comme le commit de Git.
        $entityManager->flush();

        // Ici, j'ai choisi de rediriger vers l'accueil du blog
        return $this->redirectToRoute('blog_index');
    }
}

```

Pour supprimer une entité de la base, utiliser la méthode `remove` :

```php
$entityManager->remove($article);
$entityManager->flush();
```

Il faut donc bien retenir le fonctionnement des méthodes `persist` et `flush` qui font tout le travail.

## Le ParamConverter de Doctrine

La [documentation officielle](https://symfony.com/doc/current/doctrine.html#automatically-fetching-objects-paramconverter)
La [documentation des ParamConverter](https://symfony.com/doc/current/bundles/SensioFrameworkExtraBundle/annotations/converters.html)

Dans un controller, vous pouvez utiliser les paramètres de votre route pour récupérer directement une entité (une ligne de votre table)

```php
    /**
     * @Route("/{id}", name="show")
     *
     * @param Article $article
     *
     * @return Response
     */
    public function show(Article $article): Response
    {
        return $this->render('blog/show.html.twig', [
            'article' => $article,
        ]);
    }
```

Pour appeler cette route, il suffira de faire : 

```twig
<a href="{{ path('show', {id: entity.id}) }}">Un lien vers ma page</a>
```

Dans l'exemple ci-dessus, notre route contient un paramètre `id`, et nous demandons à Symfony de la convertir en un objet `Article`. Pour cela, Doctrine va utiliser ce que l'on appelle un ParamConverter (un objet qui converti les paramètres d'une route/action). Dans les faits, il va vérifier si le nom du paramètre de la route correspond à une propriété de
l'objet. Si c'est le cas, il va faire une requête `SELECT` sur la table `article` pour récupérer l'entrée correspondante (avec un `WHERE id = $id`, en somme).

## Le Repository pour récupérer des entités

La [documentation sur les Repositories](https://symfony.com/doc/current/doctrine.html#doctrine-queries)

Un objet Repository est lié à une entité précise et permet de faire des requêtes `SELECT` sur la table liée.

Dans l'exemple précédent, le ParamConverter utilise une méthode pratique et commune à tous les Repositories : `find($id)`. Il y a 4 méthodes disponibles dans tous les repositories, détaillons-les :

- `findAll()` : Récupère tous les objets de la table (`SELECT * FROM article` par exemple)
- `find($id)` prend en paramètre un identifiant (colonne `id` d'une table) et renvoie l'objet correspondant (`SELECT * FROM article WHERE id = $id` par exemple)
- `findOneBy(array $criteria, array $orderBy = null)` prend 2 paramètres, un tableau de critères (les colonnes et les valeurs à mettre dans un `WHERE`) et un tableau pour ordonner (avec la colonne et l'ordre) et renvoie **un** objet correspondant aux critères (`SELECT * FROM article WHERE title = $title ORDER BY id DESC LIMIT 1` par exemple).

```php
    /**
     * @Route("/{title}", name="show")
     * 
     * On récupère le paramètre title de notre route
     * et on injecte le repository dont nous allons avoir besoin.
     * 
     * Noter que l'on aurait pu utiliser le ParamConverter de Doctrine pour récupérer plus simplement l'article par son titre
     */
    public function show(string $title, ArticleRepository $repository): Response
    {
        // On ne veut récupérer qu'un seul article
        $article = $repository->findOneBy([
            // On passe un tableau de critères, ne contenant qu'une entrée :
            // on cherche dans la colonne title de la table, avec la valeur $title
            // Ce qui revient à faire en SQL : WHERE title = '$title'
            'title' => $title,  
        ], [
            // On précise comment trier les résultats
            // Ce qui revient à faire en SQL : ORDER BY id DESC
            // Ce tri nous est utile si plusieurs articles ont le même titre
            // On ne prend ainsi que celui ayant l'id le plus élevé
            'id' => 'DESC',
        ]);
        return $this->render('blog/show.html.twig', [
            'article' => $article,
        ]);
    }
```

- `findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)` : prend 4 paramètres, un tableau de critères, un tableau pour ordonner, la quantité maximum d'objets à retourner (`LIMIT` en SQL), et le premier élément à retourner (premier paramètre de `LIMIT`) (`SELECT * FROM article WHERE title = $title ORDER BY id DESC LIMIT 0,5` par
  exemple).

```php
    /**
     * @Route("/{title}", name="show")
     * 
     * On récupère le paramètre title de notre route
     * et on injecte le repository dont nous allons avoir besoin.
     * 
     * Noter que l'on aurait pu utiliser le ParamConverter de Doctrine pour récupérer plus simplement l'article par son titre
     */
    public function show(string $title, ArticleRepository $repository): Response
    {
        // On ne veut récupérer qu'un seul article
        $article = $repository->findBy([
            // On passe un tableau de critères, ne contenant qu'une entrée :
            // on cherche dans la colonne title de la table, avec la valeur $title
            // Ce qui revient à faire en SQL : WHERE title = '$title'
            'title' => $title,  
        ], [
            // On précise comment trier les résultats
            // Ce qui revient à faire en SQL : ORDER BY id DESC
            'id' => 'DESC',
        ],
        5, // On veut récupérer 5 résultats maximum
        0 // On commence au premier enregistrement, nous avons donc l'équivalent de LIMIT 0,5
        );
        return $this->render('blog/show.html.twig', [
            'article' => $article,
        ]);
    }
```

### Le QueryBuilder : construire ses propres requêtes

La [documentation sur le QueryBuilder](https://symfony.com/doc/current/doctrine.html#querying-with-the-query-builder)

Nous allons presque toujours utiliser le QueryBuilder pour faire nos requêtes. Il s'agit d'un objet permettant de gérer des requêtes complexes, sans avoir à taper une requête SQL complexe, et d'utiliser la puissance de PHP (boucles, conditions, etc.) pour les construire. Prenons l'exemple fourni lorsqu'on génère un Repository :

```php
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a') // On crée un objet QueryBuilder, en mettant "a" comme alias de notre table article
            ->andWhere('a.exampleField = :val') // On ajoute un WHERE, avec un paramètre ":val" (voir le cours sur PDO et les paramètres nommés)
            ->setParameter('val', $value) // On donne une valeur au paramètre. Contrairement à PDO, il n'est pas obligatoire de donner une variable ici, vous pourriez mettre une valeur directement.
            ->orderBy('a.id', 'ASC') // On tri nos éléments par "id" croissant
            ->setMaxResults(10) // On ne veut que 10 résultats maximum
            ->getQuery() // On récupère la requête générée, qui va correspondre à quelque chose comme "SELECT * FROM article a WHERE a.exampleField = '$value' ORDER BY a.id LIMIT 10"
            ->getResult() // On exécute la requête et on récupère les résultats. On les retourne sous la forme d'un tableau (qui contient des objets Article)
        ;
    }
```

Voyons comment ajouter une condition dans cet exemple :

```php
    // On ajoute un paramètre $inverseOrder : s'il vaut true, nous allons trier par ordre décroissant
    public function findByExampleField($value, $inverseOrder = false)
    {
        $qb = $this->createQueryBuilder('a') // On crée un objet QueryBuilder, en mettant "a" comme alias de notre table article
            ->andWhere('a.exampleField = :val') // On ajoute un WHERE, avec un paramètre ":val" (voir le cours sur PDO et les paramètres nommés)
            ->setParameter('val', $value) // On donne une valeur au paramètre. Contrairement à PDO, il n'est pas obligatoire de donner une variable ici, vous pourriez mettre une valeur directement.
            ->setMaxResults(10) // On ne veut que 10 résultats maximum
        ;
        if ($inverseOrder === true) {
            $qb->orderBy('a.id', 'DESC'); // On tri nos éléments par "id" décroissant
        } else {
            $qb->orderBy('a.id', 'ASC'); // On tri nos éléments par "id" croissant
        }
        return $qb
            ->getQuery() // On récupère la requête générée, qui va correspondre à quelque chose comme "SELECT * FROM article a WHERE a.exampleField = '$value' ORDER BY a.id LIMIT 10"
            ->getResult() // On exécute la requête et on récupère les résultats. On les retourne sous la forme d'un tableau (qui contient des objets Article)
        ;
    }
```

Ces QueryBuilders et les différentes méthodes de notre repository nous permettent de conserver les requêtes courantes en un point, et de ne pas avoir à les réécrire.

### Les jointures

Imaginons que nous voulons créer un moteur de recherche pour notre blog et que nous voulons chercher à la fois dans les titres d'article, dans leur contenu, mais aussi dans les noms du tag associé. Dans ce cas, nous voulons faire notre recherche sur 2 tables, simultanément. Pour cela, nous allons utiliser une jointure :

```php
    public function search(string $text)
    {
        return $this->createQueryBuilder('a') // On crée un objet QueryBuilder, en mettant "a" comme alias de notre table article
            ->join('a.tag', 't') // Ici, on suit les propriétés de notre entité : on demande à Doctrine une jointure sur la propriété tag de notre article (il se débrouille ensuite pour faire la correspondance par id), et on lui dit de l'appeler t dans la suite de la requête
            ->where('a.content LIKE :val') // On ajoute un WHERE, avec un paramètre ":val" (voir le cours sur PDO et les paramètres nommés)
            ->orWhere('a.title LIKE :val')
            ->orWhere('t.name LIKE :val')// On peut ensuite utiliser notre table t (les tags) pour regarder le champs name
            ->setParameter('val', '%'.$text.'%') // On donne une valeur au paramètre. Contrairement à PDO, il n'est pas obligatoire de donner une variable ici, vous pourriez mettre une valeur directement.
            ->getQuery() // On récupère la requête générée
            ->getResult() // On exécute la requête et on récupère les résultats. On les retourne sous la forme d'un tableau (qui contient des objets Article)
        ;
    }
```

Nous avons donc récupéré des objets Article grâce à notre recherche sur 3 colonnes différentes (dans 2 tables différentes !).

### Les différentes méthodes du `QueryBuilder`

- `select()` remplace le contenu de la clause `SELECT` de la requête. Prend une chaine de caractères ou un tableau. 
- `addSelect()` ajoute des éléments à la clause `SELECT` de la requête. Prend une chaine de caractères ou un tableau. 
- `where()`, `orWhere()`, `andWhere()` pour gérer la clause `WHERE` de la requête (la première remplace). Prend une chaine de caractères.
- `setParameter()` pour définir la valeur d'un paramètre (défini avec `:nomDeLaVariable`). Prend 2 paramètres : le nom de la variable (sans les `:`) et en second, la valeur (peut être une variable, ou non)
- `join()`, `innerJoin()`, `leftJoin()` pour créer une jointure avec une table. Prend le nom de la propriété à "suivre" (dans notre exemple `a.tags` pour joindre la table `tag`) et en second paramètre, l'alias de la table jointe (`t` par exemple).
- `orderBy()`, `addOrderBy()` pour gérer la clause `ORDER BY` de la requête. Prend 2 paramètres : la propriété sur laquelle appliquer le tri et en second, le sens du tri `ASC` ou `DESC`.
- `setMaxResults()` pour gérer la clause `LIMIT` (limit) de la requête. Prend le nombre d'éléments à récupérer.
- `setFirstResult()` pour gérer la clause `LIMIT` (offset) de la requête. Prend le numéro (indexé en 0) du premier élément à afficher.
- `getQuery()` récupère les différentes clauses entrées et crée la requête DQL et la requête SQL qui va être appliquée.
  
À partir de la `Query` (retournée par `getQuery()`), nous avons plusieurs moyens de récupérer nos résultats :

- `getResult()` retourne les résultats de la requête sous la forme d'un tableau d'objets.
- `getSingleResult()` retourne un seul résultat. Si la requête en renvoie plusieurs ou aucun, une exception sera levée.
- `getOneOrNullResult()` retourne aucun ou un seul résultat (null ou un objet). Si la requête en renvoie plusieurs, une exception sera levée.
- `getScalarResult()` retourne un tableau de nombres (si vous avez une requête avec uniquement des `COUNT` ou équivalent dans la clause `SELECT`).
- `getSingleScalarResult()` retourne un nombre (si vous avez une requête avec uniquement un `COUNT` ou équivalent dans la clause `SELECT`).

## Tester nos requêtes

En général, nous allons vouloir utiliser nos Repositories dans d'autres services (classes en dehors de `src/Entity`). Pour tester nos requêtes, nous pouvons par exemple appeler notre Repository dans un Controller :

```php
// src/Controller/BlogController.php
namespace App\Controller;

use App\Repository\ArticleRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class BlogController extends AbstractController 
{
    /**
     * @Route("/blog/search/{text}", name="blog_search")
     */
    public function search(ArticleRepository $repo, string $text): Response
    {
        $articles = $repo->search($text);
        
        dump($articles); // Cette fonction va afficher la variable $articles et son contenu (un peu comme un var_dump(), mais en plus beau et plus pratique) dans le profiler de Symfony
        dd($articles); // Cette fonction va afficher la variable $articles et son contenu, mais aussi arrêter le programme (dump and die) (comme un exit(var_dump()))
        
        return $this->render('blog/search.html.twig', [
            'results' => $articles,
        ]);
    }
    
    // ...
}
```

## Créer de fausses données (fixtures)

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/9cc4ebbdd27540fb8430c26130c778cd" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Pour tester notre application (surtout pour le développement), nous pouvons insérer des données de bases (souvent fausses). Pour cela, je vous conseille d'utiliser le [DoctrineFixturesBundle](https://symfony.com/doc/current/bundles/DoctrineFixturesBundle/index.html).

Par défaut, l'installation de ce bundle crée un fichier `src/DataFixtures/AppFixtures.php`. Vous pouvez vous en servir pour créer tout ou partie de vos fausses données. Personnellement, je vous conseille de supprimer ce fichier et d'en créer un par table que vous voulez remplir (un peu plus compliqué, mais plus propre et léger à relire).

Conservons notre exemple de blog, pour créer 2 jeux de fixtures (fausses données). Il faut d'abord choisir dans quel ordre nous allons faire l'insertion. Dans notre cas (2 entités), nous pouvons le faire aussi bien dans un sens que dans l'autre. Je choisis de commencer par les tags, puis les articles :

`src/DataFixtures/TagFixtures.php`

```php
<?php

namespace App\DataFixtures;

use App\Entity\Tag;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class TagFixtures extends Fixture
{
    /**
     * @inheritDoc
     */
    public function load(ObjectManager $manager)
    {
        // C'est dans cette méthode que nous allons créer nos données
        // et les sauvegarder avec l'ObjetManager (un parent de EntityManager)
        
        // Je veux utiliser des noms de tags qui sonnent un peu réels
        // Même si j'utilise des mots au hasard
        $tagNames = [
            'informatiques',
            'chiens',
            'navigateurs',
            'statistiques',
            'promenades',
            'archerie',
        ];
        
        foreach ($tagNames as $tagName) {
            // Je crée des objets tags et les rempli
            // avant d'en demander l'enregistrement à l'ObjectManager
            $tag = new Tag();
            $tag->setName($tagName);
            
            $manager->persist($tag);
        }

        // On sauvegarde effectivement tout en base
        $manager->flush();
    }
}
```

`src/DataFixtures/ArticleFixtures.php`

```php
<?php

namespace App\DataFixtures;

use App\Entity\Article;
use App\Repository\TagRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

// Implémenter DependentFixtureInterface permet au bundle de savoir
// qu'il va devoir charger d'autres fixtures avant, ce qui va définir 
// un ordre de priorité
class TagFixtures extends Fixture implements DependentFixtureInterface
{
    /**
     * @var TagRepository 
     */
    protected $tagRepository;
    
    // Ici, on va se servir des tags qu'on a déjà inséré en base (pas obligatoire ;) )
    public function __construct(TagRepository $tagRepository)
    {
        $this->tagRepository = $tagRepository;
    }
    /**
     * @inheritDoc
     */
    public function load(ObjectManager $manager)
    {
        // C'est dans cette méthode que nous allons créer nos données
        // et les sauvegarder avec l'ObjetManager (un parent de EntityManager)
        
        // Les titres et contenus des articles va être identiques, on les prépare avant la boucle
        
        $title = ' : Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...';
        $content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce luctus neque justo, id vulputate velit malesuada in. Donec vulputate ipsum vitae orci vestibulum, et tempus orci hendrerit. Vestibulum mattis sit amet eros sodales accumsan. Proin auctor tellus vitae hendrerit viverra. Aliquam erat volutpat. Duis suscipit lacus tortor, non hendrerit sapien dapibus vel. Phasellus urna orci, porta vel arcu vitae, posuere efficitur diam. Phasellus convallis ante enim, a lobortis tortor fermentum et. Aenean hendrerit congue nulla quis interdum. Nullam quis magna sem. Duis quis pulvinar ante, ac posuere velit.";
        
        
        // Pour les utiliser dans les articles, on récupère la liste complète de nos tags
        $tags = $this->tagRepository->findAll();
        
        // On crée une dizaine d'articles
        for ($i = 0; $i < 10; $i++) {
            $article = new Article();
            $article->setTitle($i.$title);
            $article->setContent($content);
            
            // On récupère un tag aléatoire dans la liste $tags, qu'on va associer à notre article
            $randomNumber = mt_rand(0, count($tags) - 1);
            $article->setTag($tags[$randomNumber]);// Si $randomNumber contient 0, on récupère notre 1er tag
            
            // On prépare l'article à l'insertion en base
            $manager->persist($article);
        }

        // On sauvegarde effectivement tout en base
        $manager->flush();
    }

    // Cette méthode sert à dire au bundle quelles fixtures
    // doivent être appliquées avant celles-ci
    public function getDependencies()
    {
        return [
            TagFixtures::class,
        ];
    }
}
```


Maintenant que nous avons nos jeux de (fausses) données, nous pouvons les appliquer avec la commande `php bin/console doctrine:fixtures:load`.

Par défaut, cette commande vide la base avant d'ajouter les données. Si vous souhaitez ajouter des données à la base existante, ajouter l'option `--append` : `php bin/console doctrine:fixtures:load --append`.
