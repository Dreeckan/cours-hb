# Les traductions

La [documentation officielle sur les traductions](https://symfony.com/doc/current/translation.html)

Pour utiliser un site en plusieurs langues, il va falloir gérer les traductions de notre site. Même si notre site n'a qu'une seule langue, il est fortement conseillé de toujours utiliser des fichiers de traduction pour gérer les textes, afin d'en permettre l'évolution bien plus facilement.

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
    // Noter le nom étrange, et revenons-y dans un instant
    $translated = $translator->trans('text.test');

    // ...
}
```

Un exemple d'appel de la même traduction dans un fichier `twig` :

```twig
{{ 'text.test'|trans }} {# Ici, c'est le filtre trans qui fait le travail d'appeler le translator et d'aller chercher la traduction #}
```

Regardons le contenu de `translations/messages.fr.yaml` :

```yaml
text:
    test: Ceci est un texte de test.
```

Regardons le contenu de `translations/messages.en.yaml` :

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