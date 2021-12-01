#  Bundles

Introduction en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/0884e785a5cd40fcad3a43def7d5220a" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Un bundle est une librairie PHP spécifique à Symfony. Comme toute librairie, un bundle permet d'ajouter des fonctionnalités à votre application, mais en l'intégrant dans vos outils de travail de Symfony (par exemple : ajout de fonctions pour Twig, pour Doctrine, etc.) et évite d'avoir à re-coder des éléments que l'on retrouve d'un projet à l'autre.

Pour en trouver de nouveaux, vous pouvez utiliser plusieurs sources :
- La [documentation de Symfony sur le sujet](https://symfony.com/bundles)
- Une [recherche sur GitHub](https://github.com/search?q=topic%3Asymfony-bundle&type=Repositories)
- Une recherche Internet sur la fonctionnalité que vous cherchez (pagination, administration, etc.)
- Des articles partagés sur le net
- Des collègues
- etc.

En général, le plus important est de suivre la documentation fournie par le bundle (elle est la seule à faire foi) pour l'installation, la configuration et l'utilisation. Je vais énoncer ici quelques éléments génériques pouvant servir pour tous les bundles.

## Installer un bundle

Normalement, l'installation se fait *via* composer, avec une commande comme `composer require nom-du-vendor/nom-du-bundle`.

Certaines documentations indiquent de modifier un fichier `app/AppKernel.php`, ce n'est nécessaire que si vous n'utilisez pas Symfony Flex (et normalement, depuis Symfony 3.4, vous utilisez Symfony Flex) et vous devriez pouvoir l'ignorer.

Lors de l'installation, il peut toutefois être utile de vérifier le fichier `config/bundles.php`, pour vous assurer que votre bundle est bien appelé (ce qui devrait être fait automatiquement lors de l'installation).

## Configurer un bundle

Lors de l'installation, si votre bundle fourni une configuration, vous devriez avoir un fichier portant le nom du bundle dans le dossier `config/packages/`. Si ça n'est pas le cas et que vous devez créer le fichier, il faut le nommer comme la racine du YAML.

La documentation m'indique une configuration comme ceci :

```yaml
knp_paginator:
    # ... contenu de la configuration ...
```

Je vais alors devoir créer un fichier `config/packages/knp_paginator.yaml` pour contenir ma configuration.

## Utiliser un bundle

Dans cette section, je n'ai littéralement rien à dire, puisque tout dépend du bundle que vous avez installé ;) .

## Exemples de bundles utiles

- [ApiPlatform](https://api-platform.com/docs/distribution/#using-symfony-and-composer) vous permet de créer une API rapidement dans votre Symfony, à partir de vos entités.
- [EasyAdmin](https://symfony.com/doc/current/bundles/EasyAdminBundle/index.html) pour générer un espace d'administration pour vos entités
- [Doctrine extensions](https://symfony.com/doc/current/bundles/StofDoctrineExtensionsBundle/index.html) pour ajouter des comportements à vos entités (Timestampable, Sluggable, etc.)
- [VichUploader](https://github.com/dustin10/VichUploaderBundle/blob/master/docs/index.md) pour mettre en ligne et gérer des images liées à vos entités
- [Knp Paginator](https://github.com/KnpLabs/KnpPaginatorBundle) pour gérer la pagination de vos listes
- [Knp Menu](https://github.com/KnpLabs/KnpMenuBundle/) pour gérer vos menus sous forme d'objets **propres**

Pour un exemple d'installation et d'utilisation d'un bundle, je vous recommande [la section suivante, traitant de EasyAdminBundle](41-easy-admin.md).