# Event listeners/subscribers

En vidéo :


Les event listeners (ou écouteurs d'événement) et les event subscribers (souscripteurs d'événement) sont des services qui vont être appelés lorsqu'un ou des événements précis sont déclenchés. Ils viennent compléter un fonctionnement existant.

## Listener ou subscriber ?

Un listener est une classe liée à **un** événement, mais qui n'a pas conscience de l'événement écouté.
Un subscriber est une classe liée à un ou **plusieurs** événements et il est toujours aisé de savoir quel événement est appelé.

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