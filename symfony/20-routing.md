# Le routing

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/12a92f13e0354bfcbfc291f50222ca51" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>


## Pour résumer

- Les routes font le lien entre les urls et les actions (méthodes de controllers).
- Elles sont définies par (au moins) un chemin (premier paramètre) et un nom.
- Elles sont associées à une action sous forme d'annotations.
- Elles peuvent prendre des paramètres, notés dans le chemin `{nomDuParametre}` et le paramètre est disponible comme paramètre de l'action `$nomDuParametre`.
  - Ces paramètres peuvent avoir des contraintes de forme (paramètre `requirements` des routes) ou des valeurs par défaut


## De l'URL du navigateur

Lors de l'appel d'une URL par le navigateur (`https://formation-hb.drakolab.fr/php` par exemple), le serveur (Nginx ou Apache, la plupart du temps) va transmettre la requête (`/php`) au fichier `public/index.php`. Symfony va alors appeler différents éléments pour traiter la requête :

- Le router, qui va faire le lien entre `/php` et un controller, grâce aux routes définies (si aucune route ne correspond, une erreur 404 est renvoyée)
- Une fois ce lien fait, Symfony sait quelle action utiliser (méthode d'un controller situé dans `src/Controller`) et va l'appeler
- L'action va faire ses traitements (appels à la BdD, calculs divers, etc.) et, pour rendre une page HTML, va en général appeler le moteur de rendu (Twig)
- Twig prend le fichier `.twig` (`.html.twig` s'il doit être transformé en html, par exemple) demandé et le compile avec les données reçues. Twig renvoie alors ce html au controller
- Le controller ajoute le rendu dans un objet `Response`, qu'il va renvoyer.
- Symfony se charge alors d'envoyer cette `Response` au serveur (Nginx ou Apache, la plupart du temps)
- Le serveur transmet au navigateur
- Le navigateur affiche le résultat (j'omets ici volontairement pas mal d'aller-retours, seuls nous intéressent les mécaniques de Symfony)

## Les routes de Symfony

La [documentation officielle sur le Routing](https://symfony.com/doc/current/routing.html)

Le but de ce routing : faire le lien entre une URL et une action de controller. Il nous permet également d'avoir des URLs très propres, comme `/lire/article/debuter-avec-symfony` plutôt que `index.php?article_id=42`.

Nous allons utiliser les annotations pour définir nos routes directement dans nos controllers. Cela correspond à une [bonne pratique de Symfony](https://symfony.com/doc/current/best_practices.html). Avec une installation complète de Symfony (grâce à la commande `symfony new --full my_project`), nous pouvons utiliser directement les annotations pour définir
nos routes dans nos controllers. Sans cela, nous aurions dû ajouter le module d'annotations dans le projet `composer require doctrine/annotations`.

Un exemple de déclaration de route (sous forme d'annotation) :

```php
// src/Controller/BlogController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class BlogController extends AbstractController
{
    // ...
    
    /**
     * Ici, on peut s'assurer que le paramètre page est un entier (l'expression régulière \d+ fait cette vérification)
     */
    #[Route("/blog/{page}", name: "blog_list", requirements: ["page" => "\d+"])]
    public function list(int $page = 1): Response
    {
        // ...
    }

    #[Route("/blog/{slug}", name: "blog_show")]
    public function show(string $slug): Response
    {
        // $slug va prendre la valeur déclarée dans l'url ({slug})
        // Autrement dit, si l'uri est /blog/un-article, alors $slug='un-article'
    }
}
```

### Préfixes et paramètres globaux à un controller

Un autre élément important : les préfixes. Le code suivant permet que :

- toutes les routes d'un controller commencent par exemple par `blog`, vous pouvez faire ceci :
- toutes les routes portent un nom commençant par `blog_`
- toutes les routes contiennent un paramètre `_locale` et qu'il ne puisse prendre que certaines valeurs précises (`en`, `es` ou `fr`)

```php
// src/Controller/BlogController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Toutes les URi liées aux routes de ce controller commencent par /blog
 * Les noms de toutes les routes commencent par blog_ (on a donc blog_list et blog_show ici)
 * On force tous les paramètres _locale des différentes actions à 3 valeurs possibles : en, es ou fr
 */
 #[Route("/blog", name: "blog_", requirements: ["_locale" => "en|es|fr"])]
class BlogController extends AbstractController
{
    #[Route("/{_locale}", name: "list")]
    public function list(): Response
    {
        // ...
    }

    #[Route("/{_locale}/posts/{slug}", name: "show")]
    public function show(string $slug): Response
    {
        // ...
    }
}
```

Vous noterez ici que la variable `_locale` n'apparait pas dans les paramètres de l'action (méthode de controller). Il existe plusieurs paramètres gérés directement par Symfony. Le paramètre `_locale` permet par exemple de gérer les traductions directement avec l'URL

### Les sous-domaines

Disons que notre blog, qui sera disponible sur le site `example.com` se trouve plus exactement sur `blog.example.com`. Nous ne sommes pas obligés de créer 2 sites différents pour `blog.example.com` ou `www.example.com`, mais pouvons dire que toutes les routes de notre BlogController doivent être appelées avec le sous-domaine `blog` :

```php
// src/Controller/BlogController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route(host: "blog.example.com", requirements: ["_locale" => "en|es|fr"], name: "blog_"]
class BlogController extends AbstractController
{
    #[Route("/{_locale}", name: "list")]
    public function list(): Response
    {
        // ...
    }

    #[Route("/{_locale}/posts/{slug}", name: "show")]
    public function show(string $slug): Response
    {
        // ...
    }
}
```

## Dé-buguer

Si vous avez des problèmes avec vos routes (qui ne sont pas prises correctement en compte par exemple), deux commandes peuvent être utiles :

- `php bin/console debug:router` qui vous permet de lister toutes les routes de votre application, avec cette variante pour ne pas avoir les routes du profiler et des outils de débug de Symfony : `php bin/console debug:router --env=prod`
- `php bin/console router:match /un/chemin/a/tester` pour savoir quel controller et quelle action sont appelées pour le chemin donné

