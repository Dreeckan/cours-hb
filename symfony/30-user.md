# Connexion et sécurisation

La [documentation officielle](https://symfony.com/doc/current/security.html), que l'on va suivre / reprendre.

:warning: Cette partie a été écrite pour Symfony 5.3 et plusieurs choses ont été modifiées depuis la version 5.2 (le fonctionnement reste le même, mais plusieurs éléments étaient plus complexes). Vous trouverez une [version de présentation de la version 5.2 de Symfony dans cette vidéo](https://www.loom.com/embed/c35c8ab1e4614a4ebf0eeffd0f8fad94).

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/c7351975038f4bbf86d3eed13356b7c1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## Pour résumer

- `php bin/console make:user` pour créer une classe servant à la connexion
- `php bin/console make:auth` pour créer le système de connexion et mettre en place la sécurisation de base
- Mettre à jour l'Authenticator créé, ainsi que la page de connexion
- Pour s'assurer des droits d'un utilisateur, on peut utiliser :
  - L'annotation `@IsGranted()` (Controllers) 
  - La fonction `is_granted()` (Twig)
  - La méthode `isGranted()` du service `Symfony\Component\Security\Core\Security` (services)
- On peut récupérer l'utilisateur connecté avec :
  - `$this->getUser()` dans un controller étendant `AbstractController`
  - `$this->security->getUser()` dans un service où le service `Security` a été injecté
  - ```{{ app.user }}``` dans une vue Twig

## Installation et préparation

Tout d'abord, installer le bundle nécessaire (il est inclus par défaut, sur les projets initialisés avec `--full`) :

```bash
composer require symfony/security-bundle
```

Il faut alors créer une entité pour gérer nos utilisateurs (la plupart du temps, on l'appelle `User`, mais vous pouvez adapter le nom à votre besoin). On utilise la commande `make:user` pour générer cette entité particulière.

```bash
php bin/console make:user
```

Dans la plupart des cas, nous voulez stocker notre entité `User` en base (c'est pour cela que je parle d'entité ;) ), mais sachez que ça n'est pas obligatoire. 

Il faut alors déterminer une propriété qui nous servira d'identifiant (une propriété dont la valeur sera unique et que nous afficherons à nos utilisateurs). En général, on crée une propriété `username` ou `email` pour cela.

Et bien sûr, si nous stockons les informations en base, il faut demander à Symfony de hasher les mots de passe.

La commande va nous ajouter / modifier plusieurs fichiers :
- `src/Entity/User.php` notre entité User
- `src/Repository/UserRepository.php` le repository associé (noter la méthode `upgradePassword()`)
- `config/packages/security.yaml` met à jour la configuration sur la sécurité, pour prendre en compte notre entité User

Si besoin d'ajouter plus de champs, on peut utiliser la commande `make:entity`. Il s'agit ensuite de créer une migration, de la vérifier et de la lancer.

On obtient alors une entité `User` comme celle-ci (je n'ai pas ajouté de propriétés et ma propriété identifiant est `email`) :

```php
<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 */
abstract class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @deprecated since Symfony 5.3, use getUserIdentifier instead
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }
}

```

Je vous conseille ensuite des créer des fixtures (fausses données) pour entrer un ou plusieurs `User` dans votre base (utiliser la commande `make:fixtures` de [DoctrineFixturesBundle](https://symfony.com/doc/current/bundles/DoctrineFixturesBundle/index.html)). Pour que les mots de passe soient encodés dans vos Fixtures, il faut bien penser à :
- injecter le service `UserPasswordHasherInterface` et l'utiliser pour encoder le mot de passe.
- ou encoder vos mots de passe avec la commande `security:encode-password` de Symfony avant de les mettre dans vos `User`

## Configuration

La configuration se fait dans le fichier `config/packages/security.yaml`. Détaillons-le (j'ai également ajouté des éléments utiles pour plus tard) : 

```yaml
security:
    # Pour activer certaines fonctionnalités (expérimentales) de Symfony 
    enable_authenticator_manager: true
    # https://symfony.com/doc/current/security.html#registering-the-user-hashing-passwords
    # On définit ici les différents moyens de hasher 
    # nos mots de passe, en fonction des entités
    password_hashers:
        Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface: 'auto'
        # On dit au composant de Symfony de choisir 
        # l'algorithme (le plus efficace)
        # pour encoder les mots de passe de l'entité User.
        # On pourrait avoir plusieurs entités, avec des encodeurs différents
        App\Entity\User:
            algorithm: auto

    # On défini des providers (fournisseurs) pour dire quels entités 
    # nous servent à définir un utilisateur
    # et quelle propriété nous permet de l'identifier
    # https://symfony.com/doc/current/security.html#where-do-users-come-from-user-providers
    providers:
        # used to reload user from session & other features (e.g. switch_user)
        app_user_provider:
            entity:
                class: App\Entity\User
                property: email
                
    # Les firewalls vont nous permettre de définir différentes règles
    # de sécurité (avec des manières de fonctionner différentes)
    # Dans notre cas, le firewall main va être appliqué lors de l'appel 
    # de toutes nos routes et va vérifier si l'utilisateur
    # peut ou non accéder à une page avec ses autorisations en cours
    # (par exemple, s'il peut accéder à une page sans être connecté)
    firewalls:
        dev:
            pattern: ^/(_(profiler|wdt)|css|images|js)/
            security: false
        main:
            anonymous: true
            lazy: true
            provider: app_user_provider
            
            # On précise, au composant de sécurité, l'authenticator 
            # à utiliser pour gérer notre connexion
            custom_authenticator: App\Security\Authenticator
            # Plus de détails sur la fonctionnalité "se souvenir de moi" ici : 
            # https://symfony.com/doc/current/security/remember_me.html
            remember_me:
                secret:   '%kernel.secret%'
                lifetime: 604800 # 1 semaine, en secondes
                path:     /
                # Par défaut, cette fonctionnalité n'est activé que si l'utilisateur coche une case
                # Vous pouvez faire en sorte que tout utilisateur connecté le reste 1 semaine
                # en dé-commentant la ligne ci-dessous
                #always_remember_me: true
            
            # Le nom de la route gérant la déconnexion
            # Symfony se charge de déterminer s'il s'agit du nom d'une route ou d'un chemin
            # (j'aurais pu mettre /deconnexion, par exemple)
            logout:
                path: app_logout
                # Vous pouvez également choisir une route où envoyer votre utilisateur après déconnexion
                # target: app_any_route

            # activate different ways to authenticate
            # https://symfony.com/doc/current/security.html#firewalls-authentication

            # https://symfony.com/doc/current/security/impersonating_user.html
            # switch_user: true

    # Ici, on donne des règles pour demander des rôles précis aux utilisateurs
    # selon une expression régulière sur les chemins demandés.
    # L'intérêt est de demander des droits précis pour accéder à des zones du site
    # (toute la partie admin, ou la gestion du compte, par exemple)
    # Si l'utilisateur n'a pas les bons droits, nous pouvons l'envoyer
    # vers le formulaire de connexion, par exemple
    access_control:
        # On demande à l'utilisateur d'avoir le rôle ROLE_ADMIN, 
        # pour toutes les routes commençant par /admin
        # - { path: ^/admin, roles: ROLE_ADMIN } 
        # On demande à l'utilisateur d'avoir le rôle ROLE_USER, 
        # pour toutes les routes commençant par /profile
        # - { path: ^/profile, roles: ROLE_USER }
```

Ce fichier est le cœur de la sécurisation de votre site, mais beaucoup d'autres éléments peuvent venir le compléter et le raffiner.

## Connecter un utilisateur 

[Les différents Authentication Providers fournis par Symfony](https://symfony.com/doc/current/security/auth_providers.html)

Des bundles comme le [HWIOAuthBundle](https://github.com/hwi/HWIOAuthBundle) complètent encore cette liste.

L'un des moyens les plus classiques, le formulaire de connexion, est le cas que nous allons voir. Si vous voulez apprendre en détail comment créer un système de connexion, je vous recommande chaudement [la documentation de Symfony sur la création d'une authentification par token d'API](https://symfony.com/doc/current/security/guard_authentication.html).

Pour créer notre système de connexion, nous allons utiliser la commande `make:auth` qui va nous préparer le travail.

`php bin/console make:auth`

```
What style of authentication do you want? [Empty authenticator]:
 [0] Empty authenticator
 [1] Login form authenticator
```
Ici, on fait le choix 1.

```
The class name of the authenticator to create (e.g. AppCustomAuthenticator):
```
Si on suit la documentation, on va entrer `LoginFormAuthenticator`, mais vous pouvez le nommer comme bon vous semble.

```
Choose a name for the controller class (e.g. SecurityController) [SecurityController]:
```
Le nom de `SecurityController` est le plus courant, et vous le verrez dans beaucoup de projets Symfony.

```
Do you want to generate a '/logout' URL? (yes/no) [yes]:
```

Je vous conseille de toujours créer un moyen pour vos utilisateurs de se déconnecter. Ils apprécieront ;) .

On obtient alors plusieurs fichiers, dont le `SecurityController` suivant :

```php
// src/Controller/SecurityController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    /**
     * @Route("/login", name="app_login")
     */
    public function login(AuthenticationUtils $authenticationUtils): Response
    {
        // if ($this->getUser()) {
        //     return $this->redirectToRoute('target_path');
        // }

        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();
        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        return $this->render('security/login.html.twig', ['last_username' => $lastUsername, 'error' => $error]);
    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function logout(): void
    {
        throw new \LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
```

Je vous conseille de personnaliser les chemins et les noms des routes, pour correspondre à *vos* conventions de nommage. Par exemple, je mettrais les chemins en français et renommerais les routes `security_login `et` security_logout`. Il faudra bien sûr modifier ces noms à plusieurs endroits (`login.html.twig` et `security.yaml`, notamment).

Notez que le fichier `login.html.twig` contient un formulaire html et non un formulaire Symfony. C'est ici voulu et rien ne vous empêche d'en créer un, si ce n'est de faire extrêmement attention aux noms des champs. Il contient également une section à dé-commenter si vous souhaitez activer la fonctionnalité "Se souvenir de moi".

Il nous reste maintenant à décortiquer / expliquer le `LoginFormAuthenticator` qui a été généré :

```php
// src/Security/LoginFormAuthenticator.php

<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Http\Authenticator\AbstractLoginFormAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\CsrfTokenBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\PasswordCredentials;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\PassportInterface;
use Symfony\Component\Security\Http\Util\TargetPathTrait;

class Authenticator extends AbstractLoginFormAuthenticator
{
    use TargetPathTrait;

    // La route de login par défaut. À adapter à vos besoins (ici, je remplace par security_login, personnellement)
    public const LOGIN_ROUTE = 'app_login';

    // Service de génération d'URL / de chemins
    private UrlGeneratorInterface $urlGenerator;

    // On pourrait injecter ici d'autres services qui nous seraient utiles lors de la connexion (un service qui vérifierait si nous nous connectons depuis une nouvelle IP, par exemple)
    public function __construct(UrlGeneratorInterface $urlGenerator)
    {
        $this->urlGenerator = $urlGenerator;
    }

    public function authenticate(Request $request): PassportInterface
    {
        // On récupère les données envoyées via POST
        // Si vous modifiez les noms des champs de votre formulaire,
        // c'est dans cette méthode qu'il faudra faire les modifications nécessaires
        $email = $request->request->get('email', '');

        $request->getSession()->set(Security::LAST_USERNAME, $email);

        return new Passport(
            new UserBadge($email),
            new PasswordCredentials($request->request->get('password', '')),
            [
                new CsrfTokenBadge('authenticate', $request->request->get('_csrf_token')),
            ]
        );
    }


    // Cette méthode permet de définir le comportement
    // après une connexion réussie.
    // Par défaut, on redirige l'utilisateur vers la page demandée au départ
    // ou une page définie par défaut (souvent, la page d'accueil
    // ou du compte)
    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        // Par défaut, un utilisateur est renvoyé vers la page où il souhaitait aller.
        // Par exemple, s'il avait demandé la page /admin, sans être connecté, la page de connexion apparait. Une fois ses identifiants entrés et vérifiés, il sera renvoyé vers cette page /admin, automatiquement
        if ($targetPath = $this->getTargetPath($request->getSession(), $firewallName)) {
            return new RedirectResponse($targetPath);
        }

        // For example:
        //return new RedirectResponse($this->urlGenerator->generate('some_route'));
        throw new \Exception('TODO: provide a valid redirect inside '.__FILE__);
    }

    // Pour récupérer l'url (le chemin) de la route de login
    protected function getLoginUrl(Request $request): string
    {
        return $this->urlGenerator->generate(self::LOGIN_ROUTE);
    }
}
```

:warning: Ne pas oublier de compléter la méthode `onAuthenticationSuccess` de notre authenticator et lui donner une url pour rediriger l'utilisateur.

## Utiliser les droits

Nos `User` ont toujours au moins le `ROLE_USER` (voir leur méthode `getRoles()`), donc un utilisateur connecté a au moins ce rôle. Voir également la section `role_hierarchy`dans le `security.yaml` de ce chapitre.

### Security.yaml 

Avec Symfony, il y a de nombreux moyens de vérifier si un utilisateur peut réaliser une action. Le premier, dans le fichier `security.yaml`, permet de définir une sécurisation pour des plages d'urls :

```yaml
    access_control:
        # On demande à l'utilisateur d'avoir le rôle ROLE_ADMIN, 
        # pour toutes les routes commençant par /admin
        - { path: ^/admin, roles: ROLE_ADMIN } 
```

Cet exemple basique contient l'essentiel, mais vous pouvez [aller beaucoup plus loin dans la précision](https://symfony.com/doc/current/security/access_control.html).

### IsGranted() et is_granted()

Dans un contrôleur :

```php
    // src/Controller/AdminController.php
    // ...

    use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
   
    /**
     * Pour accéder à TOUTES les méthodes de ce contrôleur, il faut avoir le ROLE_ADMIN
     *
     * @IsGranted("ROLE_ADMIN")
     */
    class AdminController extends AbstractController
    {
       /**
        * Il faut avoir le rôle ROLE_ADMIN pour cette méthode seulement
        *
        * @IsGranted("ROLE_ADMIN")
        */
        public function adminDashboard(): Response
        {
            // Fait exactement la même chose que l'annotation au-dessus.
            $this->denyAccessUnlessGranted('ROLE_ADMIN');
            // ...
        }
    }
```

Dans un template : 

```twig
{% if is_granted('ROLE_ADMIN') %}
    {# Seuls les admins peuvent voir ceci #}
{% endif %}
```

Vous pouvez également utiliser cette fonctionnalité dans un service, en injectant le service `Symfony\Component\Security\Core\Security` :

```php
// src/Newsletter/NewsletterManager.php

// ...
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Core\Security;

class SalesReportManager
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public function sendNewsletter()
    {
        $salesData = [];

        if ($this->security->isGranted('ROLE_SALES_ADMIN')) {
            $salesData['top_secret_numbers'] = rand();
        }

        // ...
    }

    // ...
}
```

## Récupérer le `User` connecté

### Dans un contrôleur

```php
public function index(): Response
{
    // Renvoie votre utilisateur (ou null s'il n'est pas connecté)
    // Il est conseillé d'ajouter un commentaire pour que l'IDE connaisse
    // la classe exacte utilisée (par défaut, il voir un objet UserInterface, sans vos méthodes)

    /** @var User $user */    
    $user = $this->getUser();
}
```

### Dans un service

```php
// src/Service/ExampleService.php
// ...

use Symfony\Component\Security\Core\Security;

class ExampleService
{
    private $security;

    public function __construct(Security $security)
    {
        // Il vaut mieux éviter d'appeler le User directement
        // dans le constructeur d'un service
        // Il pourrait ne pas être correctement initialisé à ce moment-là
        $this->security = $security;
    }

    public function someMethod()
    {
        // Retourne le User (ou null si pas connecté)
        $user = $this->security->getUser();

        // ...
    }
}
```

### Dans un template 

```twig
  {# Retourne le User (ou null si pas connecté) #}
  {{ app.user }}
 ```

## Gérer les droits avec les Voters

Une fonctionnalité très avancée, les Voters, vous permet de gérer les droits aussi finement que vous le souhaitez. Bien que les rôles permettent déjà beaucoup de puissance, il arrive que des droits plus précis soient nécessaires. Par exemple, si vous créez un site pour une grosse entreprise, avec un service marketing et un autre commercial, il se peut que chaque service (et chaque utilisateur de ces services) aient accès seulement à des fonctionnalités précises.

Pour ces cas, bien plus complexes, de gestion des ACL (Access Control Lists), je vous recommande très fortement [la documentation Symfony sur les voters](https://symfony.com/doc/current/security/voters.html) et vous pouvez aller encore plus loin, avec [la documentation sur le processus d'autorisation de Symfony](https://symfony.com/doc/current/components/security/authorization.html)