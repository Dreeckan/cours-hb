# Easy Admin Bundle

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/df76d7c122b1497792b6feaf82900a62" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Le bundle [EasyAdminBundle](https://symfony.com/bundles/EasyAdminBundle/current/index.html) vous permet de générer un espace d'administration simplement à partir de quelques fichiers (controllers). Il est très rapide à prendre en main, très puissant et permet de créer une interface très complète, tout en vous permettant de la personnaliser.

La [documentation du bundle](https://symfony.com/bundles/EasyAdminBundle/current/index.html) détaille à peu près tout et je vais vous donner ici seulement les éléments qui permettent de démarrer rapidement.

## Installation et mise en place

Dans un premier temps, installez le bundle avec : `composer require easycorp/easyadmin-bundle`. Normalement, cela ne devrait pas créer de problèmes ;) .

Vous pourrez alors créer votre premier Dashboard (personnellement, j'en ai toujours un seul) avec : `php bin/console make:admin:dashboard`. Personnellement, je conserve les options proposées (nommer le controller `DashboardController` et les ranger dans `src/Controller/Admin`), mais c'est à vous de voir.

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

:warning: Avant d'aller plus loin, je vous conseille très fortement d'ajouter une contrainte pour que **seuls les admins aient accès au dashboard** (voir le fichier `config/packages/security.yaml`)

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

Pour personnaliser le dashboard, l'affichage des liens, etc, je vous invite à lire [la documentation sur le sujet](https://symfony.com/bundles/EasyAdminBundle/current/dashboards.html).

## Personnalisation des CRUDs