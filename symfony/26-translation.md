# Les traductions

La [documentation officielle sur les traductions](https://symfony.com/doc/current/translation.html) et [la Fast-Track de Symfony](https://symfony.com/doc/current/the-fast-track/en/28-intl.html)
Nous allons directement utiliser [le format ICU pour gérer les paramètres et les pluriels](https://symfony.com/doc/current/translation/message_format.html), dans nos traductions

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/9c40d518fead4ceab470b37c718f80f7" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Pour utiliser un site en plusieurs langues, il va falloir gérer les traductions de notre site. Même si notre site n'a qu'une seule langue, il est fortement conseillé de toujours utiliser des fichiers de traduction pour gérer les textes, afin d'en permettre l'évolution bien plus facilement.

## En résumé

- Les traductions se trouvent dans le dossier `translations` du projet
- Les fichiers `Yaml` portent des noms comme `front.fr.yaml` où `front` est appelé un domaine et où `fr` peut être remplacé par une autre langue
- On peut traduire une chaine de caractères de différentes façons :
  - en appelant la méthode `trans('unTexteOuUneChaine', [], 'unDomaine')` du service `Symfony\Contracts\Translation\TranslatorInterface`
  - en appelant le filtre `'unTexteOuUneChaine'|trans({}, 'unDomaine')` dans une vue Twig

## Configuration

La configuration de base (dans `config/packages/translation.yaml`)

```yaml
framework:
    default_locale: 'fr' # Défini la langue par défaut du site (ici en français)
    translator:
        default_path: '%kernel.project_dir%/translations' # Défini où se trouve les traductions
```

## Utilisation

Un exemple dans un controller (on récupère le service de traduction et on lui demande de traduire un texte) :

```php
use Symfony\Contracts\Translation\TranslatorInterface;

// On injecte le service de traduction
public function index(TranslatorInterface $translator)
{
    // On lui demande de récupérer la traduction du texte text.test.
    // Par défaut, il va la chercher dans le fichier messages.fr.yaml.
    // Noter le nom étrange et revenons-y dans un instant
    $translated = $translator->trans('text.test');

    // ...
}
```

Un exemple d'appel de la même traduction dans un fichier `twig` :

```twig
{{ 'text.test'|trans }} {# Ici, c'est le filtre trans qui fait le travail d'appeler le translator et d'aller chercher la traduction #}
```

Regardons le contenu de `translations/messages.fr.yaml` (ou `translations/messages+intl-icu.fr.yaml` si vous utilisez le format ICU) :

```yaml
text:
    test: Ceci est un texte de test.
```

Regardons le contenu de `translations/messages.en.yaml` (ou `translations/messages+intl-icu.en.yaml` si vous utilisez le format ICU) :

```yaml
text:
    test: This is a test text.
```

Ce que fait le translator ici : 
- Il récupère la langue de l'utilisateur (qui est dans la requête http / la session)
- Il ouvre le fichier de traduction correspondant
- Il trouve la traduction

Dans cet exemple, j'utilise une clé de traduction, afin de ranger / organiser mes traductions. J'aurais aussi pu utiliser un texte quelconque à traduire, mais je préfère ces formats plus condensés et qui me permettent de grouper mes traductions.

## Les domaines

Pour l'instant, toutes les traductions que vous entrez doivent se trouver dans le fichier `messages.*.yaml`. Idéalement, surtout si votre site prend de l'ampleur et que vous commencez à avoir beaucoup de textes, il est fortement recommandé d'utiliser plusieurs fichiers, selon les fonctionnalités (un fichier pour l'administration, un pour la validation des formulaires, etc.). Le découpage est à votre discrétion.

Ce que l'on appelle un domaine de traduction est en fait un fichier (comme `messages`) pour chacune des langues.

Pour gérer cela (imaginons que nous ayons un fichier `text.fr.yaml`) et appeler un fichier / domaine précis :

Un exemple dans un controller (on récupère le service de traduction et on lui demande de traduire un texte) :

```php
use Symfony\Contracts\Translation\TranslatorInterface;

// On injecte le service de traduction
public function index(TranslatorInterface $translator)
{
    $translated = $translator->trans('text.test', [], 'text');

    // ...
}
```

Un exemple d'appel de la même traduction dans un fichier `twig` :

```twig
{{ 'text.test'|trans({}, 'text') }}
```

## Les paramètres

### Format ICU

Ce format a été intégré à Symfony relativement récemment et tous les projets ne l'utilisent pas forcément.

Imaginons que dans un texte, je veuille passer un paramètre (la date du jour par exemple). Dans mon fichier `translations/messages+intl-icu.fr.yaml` j'aurais :

```yaml
text:
    test: Nous sommes le {date}
```

Et dans l'appel de ma traduction (en Twig) : 

```twig
{{ 'text.test'|trans({
  'date': 'now'|date('d/m/Y'),
}) }}
```

### Format "classique"

`translations/messages.fr.yaml` :

```yaml
text:
    test: Nous sommes le %date%
```

Et dans l'appel de ma traduction (en Twig) : 

```twig
{{ 'text.test'|trans({
  '%date%': 'now'|date('d/m/Y'),
}) }}
```

## Gestion des pluriels (et autres conditions)

Je ne vais parler ici que de la méthode avec ICU, plus pratique et plus lisible, même si sa syntaxe est assez particulière.
L'avantage de cette syntaxe est qu'elle se rapproche d'un `switch` en PHP, prenant une variable et en regardant la valeur pour définir la traduction à choisir.

Prenons un exemple avec des pluriels :

Dans `translations/messages+intl-icu.fr.yaml`

```yaml
num_of_apples: >-
    {apples, plural,
        =0    {Il n'y a pas de pommes}
        one   {Il y a une pomme...}
        other {Il y a # pommes !}
    }
```

- `apples, plural` définissent qu'on utilise le paramètre `apples` et que l'on va utiliser la fonction `plural` (qu'on gère des pluriels, en somme ;) )
- `=0    {Il n'y a pas de pommes}` dit que si `apples` est égale à 0, on appelle le texte dans les accolades
- `one   {Il y a une pomme...}` dit que si `apples` est égale à 1, on appelle le texte dans les accolades
- `other {Il y a # pommes !}` si les deux conditions précédentes ne sont pas vraies, on appelle le texte dans les accolades. Le `#` dans les accolades sera remplacé par la valeur de `apples`.

Un appel de cette traduction : 

```php
echo $translator->trans('num_of_apples', ['apples' => 23]); // Il y a 23 pommes !
echo $translator->trans('num_of_apples', ['apples' => 1]); // Il y a une pomme...
```

Cette notation peut également servir pour utiliser des conditions. Prenons cet exemple : 

```php
echo $translator->trans('text.test', [
    'style' => 'Rock',
    'like' => 'yes',
]);

echo $translator->trans('text.test', [
    'style' => 'Jazz',
    'like' => 'not_applicable',
]);
```

```yaml
text:
    test: >-
        {like, select,
            yes   {J'aime le {style} !}
            no    {Je n'aime pas spécialement le {style} !}
            other {Pas d'avis sur le {style} !}
        }
```

- `like, select,` : `like` va utiliser le paramètre `like` passé par le PHP et `select`est la fonction utilisée (on va regarder directement la correspondance / l'égalité entre `like` et les valeurs en dessous)
- `yes` : si `like` vaut `yes`, alors on affiche notre amour pour un style musical (passé en paramètre)
- `no` : si `like` vaut `no`, alors on affiche notre désamour pour un style musical (passé en paramètre)
- `other` : si `like` vaut `no`, alors on affiche notre manque d'avis pour un style musical (passé en paramètre)

## Dans les formulaires

Dans la configuration des formulaires, les labels sont directement traduits et vous pouvez configurer quelques éléments supplémentaires :

```php
class TestType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('test', TextType::class, [
                // On peut donner une clé de traduction pour le label
                'label' => 'user.form.password', 
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            // on définit le fichier de traduction à utiliser
            'translation_domain' => 'front', 
        ]);
    }
}
```


## Traduire les textes en BdD

Pour simplifier le travail de traduction des données en <abbr title="Base de Données">BdD</abbr>, plusieurs bundles sont disponibles :
- [StofDoctrineExtensionsBundle](https://symfony.com/bundles/StofDoctrineExtensionsBundle/current/index.html) permet d'[ajouter un comportement `Translatable`](https://github.com/doctrine-extensions/DoctrineExtensions/blob/main/doc/translatable.md#setup-and-autoloading) pour ajouter les champs à traduire dans vos entités
- [A2lixTranslationFormBundle](https://github.com/a2lix/TranslationFormBundle) pour gérer vos traductions dans les formulaires de modifications de vos entités


## Des urls et des langues

Vous pouvez également gérer [les traductions de vos routes](https://symfony.com/doc/current/routing.html#localized-routes-i18n), directement dans l'annotation de route, pour définir l'url dans les différentes langues.

Il est également possible (et bien utile) de définir des préfixes en fonction des langues, pour **toutes** vos routes d'un coup. 

Dans `config/routes/annotations.yaml`, vous pouvez écrire : 
```yaml
controllers:
    resource: ../../src/Controller/
    type: annotation
    prefix:
        fr: '' # Les routes sans un préfixe de langue seront en français
        en: '/en' # les routes avec /en au début seront en anglais
```


## Récupérer les textes sans traductions

Pendant le développement, on n'a pas toujours les textes définitifs dans toutes les langues directement. Il faut parfois revenir sur le projet plus tard et refaire des fichiers de traduction (classiquement, lorsqu'on ajoute une nouvelle langue). Une commande Symfony est prévue pour récupérer les traductions manquantes : `translation:update`. Cette commande va chercher les appels aux traductions dans les fichiers Twig dans `templates` (où les dossiers où vous avez dit avoir des templates) et dans les services appelant le `Translator`.

Quelques exemples d'utilisation : 

```shell
# Affiche dans la console les traductions manquantes pour le français
php bin/console translation:update --dump-messages fr

# Crée les entrées manquantes dans les fichiers pour le français
php bin/console translation:update --force fr
```

## Dé-buguer

Quand vous ajoutez un fichier de traduction, les traductions ne sont pas forcément prises en compte directement. Pour corriger ce problème, lancer la commande `php bin/console cache:clear`.

Il existe également une commande `php bin/console debug:translation` qui peut vous rendre de grands services :
- `php bin/console debug:translation fr` permet de voir toutes les traductions disponibles pour le français et montre l'état (si la traduction est manquante dans la langue, par exemple)
- `php bin/console debug:translation fr --domain=messages` permet de voir toutes les traductions disponibles dans le domaine (fichier) messages, pour le français et montre l'état (si la traduction est manquante dans la langue, par exemple)
- `php bin/console debug:translation fr --only-unused` permet de voir toutes les traductions non utilisées (ni dans le PHP, ni dans les Twig, mais définies dans les fichiers de traduction)
- `php bin/console debug:translation fr --only-missing` permet de voir toutes les traductions présentes dans le PHP ou les Twig, mais pas présentes dans les fichiers de traduction