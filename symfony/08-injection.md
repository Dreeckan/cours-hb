# Les services et l'injection de dépendances

[La documentation spécifique aux services](https://symfony.com/doc/current/service_container.html)

Avec Symfony, tout est service. Un service est une fonctionnalité (peut être seulement une classe), comme l'affichage d'un template, l'envoie des emails, etc. Il en existe déjà de nombreux dans Symfony, déjà fournis (comme Twig, plusieurs éléments de Doctrine ou un Mailer).

Dans les faits, l'exemple suivant `return $this->render('blog/index.html.twig', ['page' => 3]);` fait appel, en interne, au service Twig pour construire le HTML et le met dans un objet `Response`. 

Nous avons donc déjà utilisé un service ! 

Dans les faits, une partie des services sont disponibles dans ce que l'on appelle le Container (ni plus ni moins un tableau d'objets utilisables).

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

Et voilà ! Notre service est configuré et prêt à l'emploi. Nous pouvons maintenant l'appeler dans un controller ou n'importe quel autre service (en utilisant là encore l'autowiring pour l'appeler) :


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

## Pour résumer

- Un service est une classe, dont une instance est créé par Symfony au chargement (on ne fait jamais nous-même un `new` sur un service)
- Toutes les classes dans le dossier `src`, à part les entités (et quelques autres éléments) sont des services
- Un service est une fonctionnalité, qui peut être **injectée** dans le constructeur de **n'importe quel autre service** ou dans des actions de controller.
