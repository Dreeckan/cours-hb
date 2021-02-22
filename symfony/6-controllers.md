# Les controllers

On appelle Controller (ou contrôleur en français) une fonction traitant les données de la requête HTTP et renvoyant une réponse au navigateur (la plupart du temps, une page web). Contrairement à cette définition (globale à PHP et d'autres langages), avec Symfony, on parle de controller pour désigner la classe contenant des actions (au sens strict, ce sont ces actions que l'on devrait appeler controllers).

Dans la pratique, une classe Controller va contenir plusieurs méthodes (actions), qui vont correspondre à des routes (urls, comme nous l'avons vu plus haut). Ces actions vont recevoir toutes les informations de la requête (objet `Request` de Symfony) et envoyer une réponse (objet `Response` de Symfony, ou l'un de ses enfants).

Commande utile pour générer un Controller : `php bin/console make:controller`

Décomposons et complétons notre exemple précédent :

```php
// src/Controller/BlogController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route(host="blog.example.com", requirements={"_locale": "en|es|fr"}, name="blog_")
 */
class BlogController extends AbstractController // Notre controller hérite du AbstractController de Symfony, ce qui nous permet d'avoir plusieurs méthodes très utiles. Ca n'est toutefois pas obligatoire, nous pourrions tout à fait définir des controllers qui n'étendent pas AbstractController.
{
    /**
     * @Route("/{_locale}", name="list")
     */
    public function list(): Response
    {
        // Disons que nous avons une liste d'articles de blog
        $posts = [
            // Des articles
        ];
        
        // On prépare le html à afficher à l'utilisateur
        $html = '<html><body>Articles : '.implode($posts).'</body></html>';
        
        // On préparer un objet Response qui va non seulement contenir notre html, mais également toutes les informations HTTP nécessaires (headers par exemple)
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

Pour plus d'informations sur le fonctionnement de Twig, voir la partie dédiée.

### Les services et l'autowiring

[La documentation spécifique aux services](https://symfony.com/doc/current/service_container.html)

Avec Symfony, tout est service. Un service est une fonctionnalité (peut être seulement une classe), comme l'affichage d'un template, l'envoie des emails, etc. Il en existe déjà de nombreux dans Symfony, déjà fournis (comme Twig, Doctrine ou un Mailer).
Dans les faits, l'exemple précédent `return $this->render('blog/index.html.twig', ['page' => 3]);` fait appel, en interne, au service Twig pour construire le HTML et le met dans un objet `Response`. Nous avons donc déjà utilisé un service ! Dans les faits, une partie des services sont disponibles dans ce que l'on appelle le Container ()

Dans les faits, la déclaration des services est faite dans le fichier `config/services.yaml`. 

Ce sont ces lignes qui se chargent du plus gros du travail : 

```yaml
services:
    # La configuration de base sur Symfony
    _defaults:
        autowire: true # Injection de dépendance automatique (il suffit de déclarer dans le controller d'un service d'autres service dont on va avoir besoin pour effectivement les avoir dans ce premier service)
        autoconfigure: true # Nous pouvons déclarer des services spéciaux, cette configuration assure qu'ils seront déclarés comme tels automatiquement
        public: false # Par défaut, aucun de nos services ne sont publiques (c'est à dire que très peu de services sont disponibles directement depuis le controller) 
        
    # Ce que disent ces lignes : toutes les classes dans le dossier source sont définies comme des services.
    # À l'exception du contenu des dossiers DependencyInjection, Entity, Migrations et Tests et du fichier Kernel.php, qui ne sont donc pas considérés comme des services
    App\:
        resource: '../src/*'
        exclude: '../src/{DependencyInjection,Entity,Migrations,Tests,Kernel.php}'
        
    # Ces lignes viennent modifier la configuration pour le dossier src/Controller. Elles associent le tag controller.service_arguments aux controllers, qui permet de leur donner un comportement spécifique (être liés à des routes par exemple)
    App\Controller\:
        resource: '../src/Controller'
        tags: ['controller.service_arguments']
```

Ainsi, un service de génération de mail pourra être déclaré comme suit : 

```php
// src/Service/MailGenerator.php
namespace App\Service;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class MailGenerator
{
    /** @var MailerInterface */
    private $mailer;

    // On demande un service qui implémente l'interface MailerInterface (voir la doc de Symfony pour la liste des services disponibles ;) )
    // Le service correspondant est automatiquement injecté
    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    public function generateAndSend(string $message, string $emailDest = 'you@example.com'): bool
    {
        $email = (new Email())
            ->from('admin@example.com')
            ->to($emailDest)
            ->subject('Un message !')
            ->text($message);

        // Nous pouvons utiliser notre service $mailer où bon nous chante, comme dans n'importe quel objet
        $this->mailer->send($email);

        // ...

        return true;
    }
}
```

Maintenant, imaginons que nous voulions ajouter un deuxième paramètre à notre constructeur, mais pas un service. Par exemple, l'adresse utilisée pour l'envoi, que nous voulons récupérer dans la configuration. Il faut alors modifier notre service et le déclarer **manuellement**.

```php
// src/Service/MailGenerator.php
namespace App\Service;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class MailGenerator
{
    /** @var MailerInterface */
    private $mailer;

    /** @var string */
    private $fromEmail;

    // On demande un service qui implémente l'interface MailerInterface (voir la doc de Symfony pour la liste des services disponibles ;) )
    // Le service correspondant est automatiquement injecté
    public function __construct(MailerInterface $mailer, string $fromEmail)
    {
        $this->mailer = $mailer;
        $this->fromEmail = $fromEmail;
    }

    public function generateAndSend(string $message, string $emailDest = 'you@example.com'): bool
    {
        $email = (new Email())
            ->from($this->fromEmail)
            ->to($emailDest)
            ->subject('Un message !')
            ->text($message);

        // Nous pouvons utiliser notre service $mailer où bon nous chante, comme dans n'importe quel objet
        $this->mailer->send($email);

        // ...

        return true;
    }
}
```

Pour déclarer manuellement notre service, tout en profitant (quand même) de l'autowiring, il suffit d'ajouter à la fin de `config/services.yaml`, dans la partie `services` :

```yaml
services:
    
    # ...
    # Tout ce qui était avant est inchangé
    # ...
    
    App\Service\MailGenerator: # L'identifiant de notre service est son FQCN (nom complet de la classe)
        arguments: # On modifie le comportement de l'injection en lui disant de modifier les arguments (du constructeur) du service
            $fromEmail: 'admin@example.com' # on fait alors correspondre notre paramètre $fromEmail à une valeur
```

Et voilà ! Notre service est configuré et prêt à l'emploi. Nous pouvons maintenant l'appeler dans un controller (en utilisant là encore l'autowiring pour l'appeler) :


```php
// src/Controller/MailController.php
namespace App\Controller;

use App\Service\MailGenerator; // On va avoir besoin de cette classe et on va utiliser son nom court
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MailController extends AbstractController
{
    /**
     * @Route("/email/envoie", name="mail_send")
     */
    public function sendMail(MailGenerator $mailGenerator): Response
    {
        $mailGenerator->generateAndSend('Un message à caractère informatif !', 'toto@example.com');
        
        return $this->render('mail/sendMail.html.twig');
    }
}
```

L'un des services que nous allons le plus souvent injecter dans les controllers et l'objet `Request` de Symfony, mais nous en parlerons dans la partie sur les formulaires.

Pour résumer, dans les paramètres de notre action, nous pouvons récupérer :
- les paramètres de notre route
- des services que nous injectons pour les utiliser dans l'action.

L'un des principaux objectifs de ce découpage en services est de réduire le controller à son minimum et ce pourquoi il est fait : être un chef d'orchestre entre la requête et le rendu final.
