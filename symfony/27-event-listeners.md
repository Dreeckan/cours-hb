# Event listeners/subscribers

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/01b83b1084b8486590cc03c05deb8392" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Les event listeners (ou écouteurs d'événement) et les event subscribers (souscripteurs d'événement) sont des services qui vont être appelés lorsqu'un ou des événements précis sont déclenchés. Ils viennent compléter un fonctionnement existant.

## Pour résumer 

- Les Event Listeners et Event Subscribers sont des services (classes Php) et ont un comportement très similaire.
- Les Event Listeners :
  - permettent d'écouter un événement (Event), défini par son nom (unique)
  - ont une méthode par Event écouté, de la forme `on` + nom de l'Event en CamelCase (`onKernelException` pour un événement `kernel.exception`)
  - cette méthode prend en paramètre un objet Event, lié à l'événement écouté
  - doit être déclaré avec un tag par event dans le fichier `config/services.yaml`.
```yaml
services:
    App\EventListener\ExceptionListener:
        tags:
            - { name: kernel.event_listener, event: kernel.exception }
```
- Les Event Subscribers
  - implémentent l'interface `Symfony\Component\EventDispatcher\EventSubscriberInterface`
  - permettent d'écouter un ou plusieurs événements (Event)
  - la méthode `getSubscribedEvents()` permet de faire le lien entre les événements écoutés (on peut écrire le FQCN de l'événement ou le nom de l'événement) et les méthodes à appeler pour chacun (avec d'éventuelles priorités)
  - les méthodes ont des noms libres, mais les paramètres sont définis par l'événement.
- Il est possible de créer nos propres événements en étendant `Symfony\Contracts\EventDispatcher\Event`.
- Ces événements doivent toujours avoir un nom **unique**.
- On peut émettre un événement grâce au service `event_dispatcher` (depuis un controller) ou depuis le service `Symfony\Contracts\EventDispatcher\EventDispatcherInterface`.

## Listener ou subscriber ?

Un listener est une classe liée à un ou plusieurs événements, mais qui n'a pas conscience des événements écoutés (ils ne sont pas indiqués dans la classe).
Un subscriber est une classe liée à un ou plusieurs événements et il est toujours aisé de savoir quel événement est appelé (ils sont indiqués dans la classe).

Une autre différence majeure est la mise en place : le listener oblige à créer une entrée dans `config/services.yaml`, alors que le subscriber n'en a pas besoin.

Prenons un listener `src/EventListener/ExceptionListener.php` surveillant si une exception a été envoyée :

```php
namespace App\EventListener;

use Symfony\Component\HttpKernel\Event\ExceptionEvent;

class ExceptionListener
{
    public function onKernelException(ExceptionEvent $event)
    {
        // ... Code à déclencher en cas d'exception
    }
}
```

Il faudra l'enregistrer dans `config/services.yaml` :

```yaml
services:
    App\EventListener\ExceptionListener:
        tags:
            - { name: kernel.event_listener, event: kernel.exception }
```

:warning: ce sont les tags qui sont importants ici. Vous pouvez injecter automatiquement d'autres services dans celui-ci, malgré tout.

Un subscriber sera plutôt de cette forme :

```php
namespace App\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class ExceptionSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        // retourne les événements souscrits, les méthodes associées et leurs priorités
        return [
            // On souscrit à l'événement KernelEvents::EXCEPTION
            KernelEvents::EXCEPTION => [
                // Les 3 méthodes ci-dessous seront appelées,
                // le nombre (optionnel) permet de savoir l'ordre d'appel.
                // Les méthodes associées au nombre le plus haut seront exécutées en premier,
                // puis celles avec un nombre plus bas, etc.
                ['processException', 10],
                ['logException', 0],
                ['notifyException', -10],
            ],
        ];
    }

    public function processException(ExceptionEvent $event)
    {
        // ...
    }

    public function logException(ExceptionEvent $event)
    {
        // ...
    }

    public function notifyException(ExceptionEvent $event)
    {
        // ...
    }
}
```

:warning: C'est la méthode `getSubscribedEvents` qui définit quelle méthode est appelée pour quel événement et dans quel ordre. Il est donc très important de bien la comprendre.

### Que choisir ?

Personnellement, j'ai toujours utilisé des subscribers (autant que possible), le fonctionnement des deux types étant très proches. Ma préférence vient du fait que je préfère avoir toutes les informations dans une classe, plutôt que de devoir chercher sa configuration et le contenu de la classe pour comprendre le fonctionnement.

Il semble que les listeners soient plus souples et permettent aux bundles de plus facilement (dés)activer des listeners en fonction de la configuration. Il s'agit en grande partie d'un choix personnel, donc ;) .

## Créer un subscriber

[Les event listeners de Doctrine](https://symfony.com/doc/current/doctrine/events.html) sont un cas un peu particulier, et nous allons commencer par eux.

Nous allons créer un event subscriber qui hash un mot de passe ([voir partie suivante, sur le système de connexion](30-user.md)) lorsqu'on enregistre un objet `User`. Nous en ferons ensuite un autre faisant la même opération, mais lors de l'enregistrement dans EasyAdmin. Les deux sont, bien sûr, redondant et sont présentés pour vous montrer les deux cas de figure.

Créons un fichier `src/EventListener/HashPasswordSubscriber.php` :

```php
namespace App\EventListener;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\EventSubscriber\EventSubscriberInterface;
use Doctrine\ORM\Events;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class HashPasswordSubscriber implements EventSubscriberInterface
{
    protected UserPasswordHasherInterface $hasher;
    
    // On injecte le service de hashage de mot de passe
    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }
    
    // Les event subscribers de Doctrine ont des méthodes figées
    // et getSubscribedEvents() ne renvoie que les événements écoutés
    public function getSubscribedEvents(): array
    {
        return [
            Events::prePersist,
            Events::preUpdate,
        ];
    }
    
    // Cette méthode est automatiquement appelée lorsque l'événement Events::prePersist est déclenché
    public function prePersist(LifecycleEventArgs $args): void
    {
        $this->hashPassword($args);
    }
    
    // Cette méthode est automatiquement appelée lorsque l'événement Events::preUpdate est déclenché
    public function preUpdate(LifecycleEventArgs $args): void
    {
        $this->hashPassword($args);
    }
    
    protected function hashPassword(LifecycleEventArgs $args): void
    {
        // On récupère l'entité qui a déclenché l'événement
        $entity = $args->getObject();
        
        // Si ça n'est pas un User ou si la propriété plainPassword est vide,
        // On ne fait rien
        if (!$entity instanceof User || empty($entity->getPlainPassword())) {
            return;
        }
        
        // On définit le nouveau mot de passe, en hashant la propriété plainPassword (temporaire)
        $entity->setPassword(
            $this->passwordHasher->hashPassword($entity, $entity->getPlainPassword())
        );
    }
}
```

La même chose, mais en se basant sur les événements de EasyAdmin (et donc uniquement dans ce contexte) : 

```php
<?php

namespace App\EventListener;

use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Event\BeforeEntityPersistedEvent;
use EasyCorp\Bundle\EasyAdminBundle\Event\BeforeEntityUpdatedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AdminUserUpdateSubscriber implements EventSubscriberInterface
{
    protected UserPasswordHasherInterface $hasher;

    // On injecte le service de hashage de mot de passe
    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    // On définit quelle méthode appeler lors du déclenchement d'un des événements
    public static function getSubscribedEvents(): array
    {
        // Notez qu'aucune priorité n'est définie (c'est le cas le plus courant, pour moi).
        // Ceci est équivalent à une priorité de 0
        // Notez également que l'on utilise le FQCN des événement, et non une constante. Les deux fonctionnent ;)
        return [
            BeforeEntityPersistedEvent::class => ['updateUserPassword'],
            BeforeEntityUpdatedEvent::class   => ['updateUserPassword'],
        ];
    }

    /**
     * @param BeforeEntityPersistedEvent|BeforeEntityUpdatedEvent $event
     */
    public function updateUserPassword($event): void
    {
        $entity = $event->getEntityInstance();

        if (!($entity instanceof User || empty($entity->getPlainPassword()))) {
            return;
        }

        // On définit le nouveau mot de passe, en hashant la propriété plainPassword (temporaire)
        $entity->setPassword(
            $this->hasher->hashPassword($entity, $entity->getPlainPassword())
        );
    }
}
```

## Créer nos propres événements

La [documentation du composant EventDispatcher](https://symfony.com/doc/current/components/event_dispatcher.html)

Exemple de création d'événements personnalisés, en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/71b2c1735f80442d95f0c16cdb12dad3" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Les événements sont représentés par un nom **unique** et sont lié à un objet d'événement, qui sera transmis aux listeners, afin de fournir des informations supplémentaires.

Le nom de l'événement doit suivre les conventions suivantes :

- il est en minuscule, ne peut contenir que des nombres, des points (`.`) ou des underscores (`_`)
- il est toujours composé d'au moins 2 mots, dont le premier représente un espace de nom et se sépare du mot suivant pas un point `.` (exemple `order.`)
- le nom final est un verbe, indiquant l'action qui a été produite (exemple `order.placed`)

Pour des questions de rangement et de clarté, je vous recommande de définir ce nom dans une constante de classe, rangée dans un dossier `Event`. 
Un exemple pour un site de vente, pourrait être un fichier `src/Event/OrderEvents.php` (noter le pluriel) (:warning: ce fichier n'est pas obligatoire, vous pouvez également indiquer le nom de votre event directement dans l'objet Event) :

```php
namespace App\Event;

use App\Event\OrderStartedEvent;
use App\Event\OrderPlacedEvent;

final class OrderEvents
{
    /**
     * Pour simplifier la completion par les IDE 
     * et se rappeler plus aisément l'événement associé, 
     * on ajoute une annotation pour l'indiquer
     * 
     * @Event("App\Event\OrderStartedEvent")
     */
    public const STARTED = 'order.started';
    
    /**
     * @Event("App\Event\OrderPlacedEvent")
     */
    public const PLACED = 'order.placed';

    // On ajoute des aliases, qui peuvent être utilisés 
    // dans certains cas précis, pour lier events et noms
    // (si vos events font partie d'un bundle, par exemple)
    public const ALIASES = [
        OrderStartedEvent::class => self::STARTED,
        OrderPlacedEvent::class  => self::PLACED,
    ];
}

```

Le fichier `src/Event/OrderPlacedEvent.php` (noter le singulier) ressemblerait à ceci :

```php
namespace Symfony\Component\HttpKernel\Event;

use App\Entity\Order;
use Symfony\Contracts\EventDispatcher\Event;

class OrderPlacedEvent extends Event
{
    // On peut également indiquer le nom de l'événement directement dans celui-ci
    // Pour éviter de créer 2 classes
    // public const NAME = 'order.placed';

    private Order $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }
    
    public function getOrder(): Order
    {
        return $this->order;
    }
}
```

Un Event Listener ou un Event Subscriber pourrait alors s'enregistrer pour l'un des événements présents dans `OrderEvents` et utiliser l'objet `Order` contenu dans l'événement pour ajouter un traitement (génération d'un numéro de facture, envoi d'un fichier `pdf`, etc.).

## Déclencher un événement manuellement

Dans notre exemple précédent, nous avons créé un événement, mais n'avions pas de moyen de le déclencher. Pour cela, nous allons utiliser le service `EventDispatcher` de Symfony pour le faire. 

Depuis un controller, dans une action : 

```php
// On récupère le service event dispatcher
$eventDispatcher = $this->get('event_dispatcher');

// On crée un event, contenant les informations qui seront utiles au listener
$event = new OrderPlacedEvent($order);

// On envoi l'événement, qui sera rattrapé par des listeners
$eventDispatcher->dispatch($event, OrderEvents::STARTED);
```

Dans un service : 

```php
// On injecte l'event dispatcher dans notre service
public function __construct(EventDispatcherInterface $dispatcher)
{
    $this->dispatcher = $dispatcher;
}

public function doSomethingWithAnOrder(Order $order)
{
    // On crée un event, contenant les informations qui seront utiles au listener
    $event = new OrderPlacedEvent($order);
    
    // On envoi l'événement, qui sera rattrapé par des listeners
    $eventDispatcher->dispatch($event, OrderEvents::STARTED);
}
```