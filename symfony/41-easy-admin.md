# Easy Admin Bundle

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/df76d7c122b1497792b6feaf82900a62" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Le bundle [EasyAdminBundle](https://symfony.com/bundles/EasyAdminBundle/current/index.html) vous permet de générer un espace d'administration simplement à partir de quelques fichiers (controllers). Il est très rapide à prendre en main, très puissant et permet de créer une interface très complète, tout en vous permettant de la personnaliser.

La [documentation du bundle](https://symfony.com/bundles/EasyAdminBundle/current/index.html) détaille à peu près tout et je vais vous donner ici seulement les éléments qui permettent de démarrer rapidement.

## Installation et mise en place

Dans un premier temps, installez le bundle avec : 

```composer require easycorp/easyadmin-bundle```

Normalement, cela ne devrait pas créer de problèmes ;) . Vous pourrez alors créer votre premier Dashboard (personnellement, j'en ai toujours un seul) avec : 

```php bin/console make:admin:dashboard``` 

Personnellement, je conserve les options proposées (nommer le controller `DashboardController` et les ranger dans `src/Controller/Admin`), mais c'est à vous de voir.

Le fichier généré, avec quelques commentaires pour expliquer les différents éléments :

```php
<?php

namespace App\Controller\Admin;

use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractDashboardController
{
    // Une route et une action, permettant d'afficher le dashboard
    // lors de l'appel de l'uri /admin
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        // La vue de base donne un petit "tuto" sur ce que vous pouvez faire avec le dashboard
        return parent::index();
    }

    // Différentes configurations sont possibles,
    // pour personnaliser l'interface générale de votre admin
    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('test');
    }

    // C'est ici que nous ajouterons des liens vers les différents CRUDs de notre admin
    // Cette méthode gère les éléments à afficher dans le menu de gauche de notre interface
    public function configureMenuItems(): iterable
    {
        yield MenuItem::linktoDashboard('Dashboard', 'fa fa-home');
        // yield MenuItem::linkToCrud('Label', 'fas fa-list', Entity::class);
    }
}
```

Si vous essayez d'accéder à la route `/admin`, vous devriez avoir accès au dashboard de base.

:warning: Avant d'aller plus loin, je vous conseille très fortement d'[ajouter une contrainte pour que seuls les admins aient accès au dashboard](https://symfony.com/doc/current/EasyAdminBundle/security.html) (voir le fichier `config/packages/security.yaml` par exemple)

Nous pouvons alors générer nos CRUDs avec la commande `php bin/console make:admin:crud`, puis ajouter les liens dans notre `DashBoardController` :

```php
    public function configureMenuItems(): iterable
    {
        yield MenuItem::linktoDashboard('Dashboard', 'fa fa-home');
        yield MenuItem::linkToCrud('Un premier crud', 'fas fa-list', Entity1::class);
        yield MenuItem::linkToCrud('Un second crud', 'fas fa-list', Entity2::class);
        yield MenuItem::linkToCrud('Un troisième crud', 'fas fa-list', Entity3::class);
    }
```

:warning: Les icônes comme `fa fa-home` ou `fas fa-list` viennent de [font-awesome, librairie très utilisée d'icônes](https://fontawesome.com/v5.15/icons?d=gallery&p=2&m=free) et vous pouvez bien sûr les remplacer par celles qui vous semblent plus pertinentes !

Pour personnaliser le dashboard, l'affichage des liens, etc, je vous invite à lire [la documentation sur le sujet](https://symfony.com/bundles/EasyAdminBundle/current/dashboards.html).

## Personnalisation des CRUDs

Lors de la génération d'un CRUD, vous obtenez une classe très vide, mais suffisante pour avoir un CRUD fonctionnel : 

```php
<?php

namespace App\Controller\Admin;

use App\Entity\Entity;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class EntityCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Entity::class;
    }
}
```

Par contre, dès que notre projet devient un peu complexe, il devient nécessaire de modifier les éléments affichés ou modifiable dans les formulaires. Pour cela, nous allons surcharger la méthode `configureFields()`. 

:warning: Il faut garder en tête que les CRUD de EasyAdmin sont décomposés en 4 pages : `index`, `detail`, `edit` et `new`. On peut personnaliser quels champs apparaissent sur chacune de ces pages !

Voici un exemple commenté de ce que l'on peut trouver / faire :

```php
public function configureFields(string $pageName): iterable
{
    return [
        // On affiche la propriété id de notre entité, dans un champ IdField (spécifique aux identifiants).
        IdField::new('id')
            // Mais on ne permet pas de la modifier, ni l'afficher dans les formulaires.
            ->hideOnForm()
            // On aurait pu faire le contraire et utiliser la méthode.
            // ->onlyOnIndex() pour ne l'afficher que sur la liste.
        ,
        // Name est modifiable dans un champ textuel (widget input de type text).
        TextField::new('name'),
        // Description est un texte que l'on pourra mettre en forme, grâce au TextEditorField.
        // Attention, la mise en forme se fait en HTML, et il faut le prendre en compte à l'affichage.
        // Nous aurions aussi pu utiliser TextareaField, pour nosu passer des outils de mise en forme.
        TextEditorField::new('description')
            // On affiche la description sur toutes les pages, sauf la liste
            ->hideOnIndex()
        ,
        // Le BooleanField permet également de changer la valeur depuis la liste.
        // Si vous ne le souhaitez pas, appelez la méthode ->renderAsSwitch(false).
        BooleanField::new('inMenu'),
        IntegerField::new('orderBy'),
        // Comme son nom l'indique, ce champ AssociationField permet de gérer l'association entre deux entités.
        // Dans les faits, un champ <select> sera affiché pour choisir un ou plusieurs entités à associer.
        // Pour que ce champ fonctionne, pensez à implémenter la méthode __toString() dans les entités à associer.
        AssociationField::new('parent'),
    ];
}
```

Il y a, bien sûr, [de très nombreuses autres options, présentées dans la documentation sur les cruds](https://symfony.com/bundles/EasyAdminBundle/current/crud.html) ou dans [la documentation sur les champs](https://symfony.com/doc/current/EasyAdminBundle/fields.html).

## Event Listeners

[La documentation sur les event listeners de EasyAdminBundle](https://symfony.com/doc/current/EasyAdminBundle/events.html)
[La partie du cours sur les event listeners](27-event-listeners.md)

Plusieurs événements existent et permettent de compléter le fonctionnement d'EasyAdmin. Ils permettent de déclencher d'autres actions avant ou après certaines actions (enregistrement d'une entité, suppression d'une entité, etc.) pour compléter le fonctionnement "simple" du CRUD. C'est pas exemple très utile pour hasher le mot de passe d'un utilisateur avant de l'enregistrer en <abbr title="Base de Données">BdD</abbr>.

Les deux événements que j'utilise le plus :

- `BeforeEntityPersistedEvent` est déclenché lorsqu'une entité est créée et permet d'ajouter du fonctionnel **avant** qu'elle ne soit enregistrée en <abbr title="Base de Données">BdD</abbr>
- `BeforeEntityUpdatedEvent` est déclenché lorsqu'une entité est mise à jour et permet d'ajouter du fonctionnel **avant** qu'elle ne soit enregistrée en <abbr title="Base de Données">BdD</abbr>
