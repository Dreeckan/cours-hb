# Les controllers

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/12a92f13e0354bfcbfc291f50222ca51" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## Pour résumer

- Le controller est un service, chargé de transformer une requête HTTP (`Request`) en une réponse HTTP (`Response`) à renvoyer à l'utilisateur
- Il fait appel à différents services (`Twig`, `Doctrine`, etc.) pour cela
- Chacune de ses méthodes (appelées actions), est liée à un chemin grâce à une route (voir chapitre précédent)
- On peut injecter des services (`Request`, `Repository`, `EntityManagerInterface`, etc.) soit dans son contructeur, soit en paramètre des actions
- `php bin/console make:controller` permet de générer un controller, avec une action et une vue associée (rendue avec Twig)
- Utiliser `dump()` et `dd()` (dump and die) pour afficher les informations sur vos variables

## Définition et premier exemple

On appelle Controller (ou contrôleur en français) une fonction traitant les données de la requête HTTP et renvoyant une réponse au navigateur (la plupart du temps, une page web). Contrairement à cette définition (globale à PHP et d'autres langages), avec Symfony, on parle de controller pour désigner la classe contenant des actions (au sens strict, ce sont ces actions que l'on devrait appeler controllers).

Dans la pratique, une classe Controller va contenir plusieurs méthodes (actions), qui vont correspondre à des routes (urls, comme nous l'avons vu plus haut). Ces actions vont recevoir toutes les informations de la requête (objet `Request` de Symfony) et envoyer une réponse (objet `Response` de Symfony, ou l'un de ses enfants).

Commande utile pour générer un Controller : `php bin/console make:controller`

Décomposons et complétons notre exemple précédent (:warning: on utilise généralement Twig pour générer du HTML, voir plus bas) :

```php
// src/Controller/BlogController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route(host: "blog.example.com", requirements: ["_locale" => "en|es|fr"], name: "blog_"]
class BlogController extends AbstractController // Notre controller hérite du AbstractController de Symfony, ce qui nous permet d'avoir plusieurs méthodes très utiles. Ca n'est toutefois pas obligatoire, nous pourrions tout à fait définir des controllers qui n'étendent pas AbstractController.
{
    #[Route("/{_locale}", name: "list")]
    public function list(): Response
    {
        // Disons que nous avons une liste d'articles de blog
        $posts = [
            // Des articles
        ];
        
        // On prépare le html à afficher à l'utilisateur
        $html = '<html><body>Articles : '.implode($posts).'</body></html>';
        
        // On prépare un objet Response qui va non seulement contenir notre html, mais également toutes les informations HTTP nécessaires (headers par exemple)
        $response = new Response($html);
        
        // On renvoie la réponse destinée au navigateur
        return $response;
    }
    
    // ...
}
```

## Utiliser les routes

Dans les controllers, nous n'utilisons les routes que par leur nom (ce qui évite également d'avoir à se rappeler des informations autres, comme l'URi correspondante).
Pour récupérer l'url vers une route, le `AbstractController` nous fournit la méthode `generateUrl()` :

```php
$englishUrl = $this->generateUrl('blog_list', ['_locale' => 'en']);
$frenchUrl = $this->generateUrl('blog_list', ['_locale' => 'fr']);
```

Il existe également plusieurs méthodes pour rediriger l'utilisateur vers une autre page (on renvoie alors l'un des enfants de l'objet `Response` : `RedirectResponse`) :

```php
use Symfony\Component\HttpFoundation\RedirectResponse;

// ...
public function index(): RedirectResponse
{
    // Redirige vers la route "homepage"
    return $this->redirectToRoute('homepage');

    // redirectToRoute est un raccourci pour :
    // return new RedirectResponse($this->generateUrl('homepage'));

    // Redirige de manière permanente vers la route "homepage" (Voir le statut HTTP 301)
    return $this->redirectToRoute('homepage', [], 301);

    // Redirige vers une route avec un paramètre
    return $this->redirectToRoute('blog_index', ['page' => 2]);

    // Redirige vers une route avec tous les paramètres $_GET présents
    return $this->redirectToRoute('blog_index', $request->query->all());

    // Redirige vers une page externe au site
    return $this->redirect('http://symfony.com/doc');
}
```

### Rendre une vue Twig

La classe `AbstractController` fournit une méthode `render()` qui nous permet de générer une `Response` à partir d'un fichier Twig (et donc de compiler ce dernier).

```php
// Ici, on va récupérer notre template dans `templates/blog/index.html.twig`
// Il est compilé (transformé, à l'aide de nos paramètres, en HTML) et renvoyé dans un objet Response
return $this->render('blog/index.html.twig', ['page' => 3]);
```

Pour [plus d'informations sur le fonctionnement de Twig, voir la partie dédiée]().

## Dé-buguer

Avec Symfony, vous pouvez dé-buguer vos programmes de plusieurs manières :
- Utiliser `exit`/`die` et `var_dump` comme nous l'avons fait jusqu'à présent (déconseillé si xDebug n'est pas installé et utilisable par la ligne de commande Symfony)
- Utiliser `dump()` et `dd()` (dump and die) pour afficher les informations sur vos variables

Ces fonctions `dump()` et `dd()` sont disponibles dans n'importe quel fichier PHP de votre projet.
La fonction `dump` ne va pas interrompre l'affichage ni le modifier, mais afficher un dump des variables demandées dans le `Profiler` de Symfony (la barre grise en bas de l'écran, quand vous chargez une page)
