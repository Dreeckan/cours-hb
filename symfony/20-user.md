# Connexion et sécurisation

La [documentation officielle](https://symfony.com/doc/current/security.html), que l'on va suivre / reprendre.

[Une vidéo pour vous montrer comment faire](https://www.loom.com/share/c35c8ab1e4614a4ebf0eeffd0f8fad94)

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

On obtient alors une entité `User` comme celle-ci (je n'ai pas ajouté de propriétés, et ma propriété identifiant est `email`) :

```php
<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 */
class User implements UserInterface
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
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
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
- injecter le service `UserPasswordEncoderInterface` et l'utiliser pour encoder le mot de passe.
- ou encoder vos mots de passe avec la commande `security:encode-password` de Symfony avant de les mettre dans vos `User`

## Configuration

La configuration se fait dans le fichier `config/packages/security.yaml`. Détaillons-le (j'ai également ajouté des éléments utiles pour plus tard) : 

```yaml
security:
    
    # Pour activer certaines fonctionnalités (expérimentales) de Symfony 
    enable_authenticator_manager: true
    
    # On ajoute notre hiérarchie de rôles. On dit lesquels ont des droits plus élevés que les autres.
    role_hierarchy:
        # ROLE_ADMIN a des privilèges plus élevés que ROLE_USER
        ROLE_ADMIN:       ROLE_USER
        # Et ROLE_SUPER_ADMIN a des privilèges plus élevés que ROLE_ADMIN et ROLE_USER
        ROLE_SUPER_ADMIN: [ROLE_ADMIN, ROLE_ALLOWED_TO_SWITCH]
    # On sait maintenant que si une fonctionnalité est disponible pour le ROLE_ADMIN (au minimum), 
    # alors seuls les utilisateurs avec le ROLE_SUPER_ADMIN ou le ROLE_ADMIN peuvent y accéder.
    # Ceux ayant le ROLE_USER ou aucun rôle recevront une erreur (accès non autorisé)
        
        
    # On définit ici les différents moyens de coder nos mots de passe, 
    # en fonction des entités
    encoders:
        # On dit au composant de Symfony de choisir l'algorithme (le plus efficace)
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
            
            # On précise au composant Guard (chargé de la connexion et de la sécurisation)
            # la ou les classes chargées de la connexion d'un utilisateur
            guard:
                authenticators:
                    - App\Security\LoginFormAuthenticator
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
                path: security_logout
                # Vous pouvez également choisir une route où envoyer votre utilisateur après déconnexion
                # target: app_any_route
                
            # configure le nombre maximum de tentatives de connexion par minute
            login_throttling:
                max_attempts: 5

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

Ce fichier est le coeur de la sécurisation de votre site, mais beaucoup d'autres éléments peuvent venir le compléter et le raffiner.

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
namespace App\Security;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Core\Exception\InvalidCsrfTokenException;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Symfony\Component\Security\Guard\Authenticator\AbstractFormLoginAuthenticator;
use Symfony\Component\Security\Guard\PasswordAuthenticatedInterface;
use Symfony\Component\Security\Http\Util\TargetPathTrait;

class LoginFormAuthenticator extends AbstractFormLoginAuthenticator implements PasswordAuthenticatedInterface
{
    use TargetPathTrait;

    // La route de login par défaut. A adapter à vos besoins (ici, je remplace par security_login, personnellement)
    public const LOGIN_ROUTE = 'app_login';

    // Le manager est nécessaire pour récupérer notre utilisateur. On peut le remplacer par le UserRepository
    private $entityManager;
    
    // Service de génération d'URL / de chemins
    private $urlGenerator;
    
    // Service de génération de jeton CSRF, pour sécuriser les formulaires
    private $csrfTokenManager;
    
    // Service d'encodage des mots de passe
    private $passwordEncoder;

    public function __construct(EntityManagerInterface $entityManager, UrlGeneratorInterface $urlGenerator, CsrfTokenManagerInterface $csrfTokenManager, UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->entityManager = $entityManager;
        $this->urlGenerator = $urlGenerator;
        $this->csrfTokenManager = $csrfTokenManager;
        $this->passwordEncoder = $passwordEncoder;
    }

    // Cette méthode vérifie si notre authenticator est bien celui qui doit être appelé quand on appelle une route
    public function supports(Request $request): bool
    {
        // Il regarde si la route appelée est bien celle de connexion et est bien appelée au format POST
        // (soumission du formulaire)
        return self::LOGIN_ROUTE === $request->attributes->get('_route')
            && $request->isMethod('POST');
    }

    // Récupère les informations du formulaire de connexion et les retourne
    public function getCredentials(Request $request)
    {
        $credentials = [
            // On récupère les données envoyées via POST
            // Si vous modifiez les noms des champs de votre formulaire,
            // c'est ici qu'il faudra faire les modifications nécessaires
            'email' => $request->request->get('email'),
            'password' => $request->request->get('password'),
            'csrf_token' => $request->request->get('_csrf_token'),
        ];
        // On stocke en session le dernier identifiant utilisé
        $request->getSession()->set(
            Security::LAST_USERNAME,
            $credentials['email']
        );

        return $credentials;
    }

    // On va essayer de récupérer l'utilisateur qu'on essaie de connecter
    public function getUser($credentials, UserProviderInterface $userProvider): ?User
    {
        // On vérifie si le jeton CSRF est bien le bon
        $token = new CsrfToken('authenticate', $credentials['csrf_token']);
        if (!$this->csrfTokenManager->isTokenValid($token)) {
            throw new InvalidCsrfTokenException();
        }

        // On récupère l'utilisateur dont l'utilisateur a entré l'identifiant et le mot de passe
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $credentials['email']]);

        // Si on ne le trouve pas, on renvoie une exception
        // qui sera attrapée et convertie en un message d'erreur
        if (!$user) {
            // fail authentication with a custom error
            throw new CustomUserMessageAuthenticationException('Email could not be found.');
        }

        return $user;
    }

    // Vérifie si le mot de passe entré est le bon
    public function checkCredentials($credentials, UserInterface $user): bool
    {
        return $this->passwordEncoder->isPasswordValid($user, $credentials['password']);
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function getPassword($credentials): ?string
    {
        return $credentials['password'];
    }

    // Ici, on ajoute un chemin vers lequel envoyer l'utilisateur après connexion
    // Il faut bien penser à l'ajouter
    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey): ?Response
    {
        if ($targetPath = $this->getTargetPath($request->getSession(), $providerKey)) {
            return new RedirectResponse($targetPath);
        }

        // For example : return new RedirectResponse($this->urlGenerator->generate('some_route'));
        throw new \Exception('TODO: provide a valid redirect inside '.__FILE__);
    }

    // On récupère l'url (le chemin) de la route de login
    protected function getLoginUrl(): string
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
        * Il faut avoir le rôle ROLE_SUPER_ADMIN pour cette méthode seulement
        *
        * @IsGranted("ROLE_ADMIN")
        */
        public function adminDashboard(): Response
        {
            // Fait exactement la même chose que l'annotation au dessus.
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