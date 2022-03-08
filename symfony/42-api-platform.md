# API Platform

Cette partie concerne des **bases** d'[API Platform](https://api-platform.com/), nous n'allons pas évoquer de fonctionnalités avancées et resterons sur les notions de base, pour créer une API simple rapidement.

[La documentation officielle](https://api-platform.com/)

[Un tutoriel très complet sur API Platform (grandement recommandé)](https://grafikart.fr/formations/api-plaform) sur lequel je me suis basé pour l'écriture de ce cours.

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/605225f8ca7242f9930b0a626e74b603" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## En résumé

- Pour créer une API rapidement, on utilise API Platform (mais ça n'est pas le seul moyen disponible)
- On personnalise notre API *via* de la configuration (principalement annotations / attributs)
- Une documentation est directement générée (peut être utilisée dans plusieurs formats : Swagger ou ReDoc)
- On peut personnaliser les propriétés disponibles dans l'API avec des annotations / attributs dans nos entités (on associe des groupes de sérialisation)
- On peut valider les données entrées à l'aide d'annotations / d'attributs

## La sérialisation

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/3d99a532f7134703b175c8eff3830d51" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Le processus de sérialisation est lié à Symfony et API Platform l'exploite pour ses propres besoins. Commençons par quelques définitions :

- La sérialisation est la conversion d'un objet PHP en un autre format, en général un format de communication (JSON, Xml, etc)
- La dé-sérialisation est l'opération inverse : on récupère une donnée JSON (ou équivalent) et on la convertit en objet(s) PHP

Ces opérations de (dé)sérialisation sont composées d'opérations intermédiaires :

- La normalisation est l'opération de conversion d'un objet PHP en tableau
- La dé-normalisation est l'opération de conversion d'un tableau en objet PHP
- L'encodage est l'opération de conversion d'un tableau en un format de communication (JSON, Xml, etc)
- Le décodage est l'opération de conversion depuis un format de communication (JSON, Xml, etc) en un tableau PHP

Schéma récapitulatif (venu de la [documentation d'API Platform sur la sérialisation](https://api-platform.com/docs/core/serialization/)) :
![](https://api-platform.com/static/f5bf57af8c8a3275d8ba1c9ced6e890d/39a20/SerializerWorkflow.png)

## Mettre en place une API avec API Platform

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/27c0fb72fb3643acb006410a35e0e902" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Nous partons du principe que nous allons initialiser une API dans une application Symfony existante (créée avec `symfony new --webapp` par exemple).

Dans un tel projet, il faut installer API Platform : `composer require api`

Une fois cela fait, il faut préciser à API Platform quelles entités nous voulons utiliser dans notre API. Pour cela, il suffit d'ajouter une annotation/un attribut `APIResource` dans votre entité :

```php
<?php
// api/src/Entity/Test.php

namespace App\Entity;

use APIPlatform\Core\Annotation\APIResource;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[APIResource]
class Test 
{
    #[ORM\Column]
    protected string $property = "";
    // ...
}
```

Plus qu'à vider le cache (`php bin/console cache:clear`) et aller sur la route `/api/doc` et il est possible de voir les routes fraîchement créées et les tester.

Répéter l'opération sur différentes entités et une bonne base d'API, suffisante pour les cas simples, est disponible.

## Aller plus loin

Avec API Platform, il est aisé de personnaliser les opérations et les éléments à faire apparaitre.

### Personnaliser les propriétés renvoyées

Grâce à des annotations / attributs, il est possible de préciser quelles propriétés (dé)sérialiser. On peut se greffer au système de normalisation ou de dé-normalisation de Symfony, grâce à des annotations et aux paramètres de l'annotation `ApiResource` :

```php
<?php
// api/src/Entity/Test.php

namespace App\Entity;

use APIPlatform\Core\Annotation\APIResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['read']],
    denormalizationContext: ['groups' => ['write']],
)]
class Test 
{
    #[Groups(["read", "write"])]
    protected string $property = "";
    
    #[Groups(["read"])]
    protected string $property2 = "";
    // ...
}
```

Dans l'exemple ci-dessus, la propriété `property` sera utilisable à la fois dans le contexte de normalisation (lecture avec `GET` d'un élément ou d'une collection) ou de dé-normalisation (écriture avec `PUT`, `POST` ou `PATCH`). La propriété `property2` ne sera utilisable **que** lors d'une normalisation (lecture avec `GET` d'un élément ou d'une collection).

Vous pouvez également aller plus loin, en précisant les groupes de (dé)normalisation pour chaque opération (opération sur les items ou les collections, directement sur une opération `GET` d'un item ou d'une collection, etc.) :

```php
<?php
// api/src/Entity/Test.php

namespace App\Entity;

use APIPlatform\Core\Annotation\APIResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    normalizationContext: ['groups' => ['read']],
    denormalizationContext: ['groups' => ['write']],
    itemOperations: [
        'get',
        'put' => [
            'denormalization_context' => ['groups' => ['put']],
        ],
    ],
    collectionOperations: [
        'get' => [
            'normalization_context' => ['groups' => ['read:collection']],
        ],
    ],
)]
class Test 
{
    #[Groups(["read", "write", "put"])]
    protected string $property = "";
    
    #[Groups(["read", "read:collection"])]
    protected string $property2 = "";
    // ...
}
```

Dans cet exemple, on définit quelles opérations sont disponibles et quels groupes sont appelés pour (dé)normaliser. Seules les opérations `GET` et `PUT` (routes `GET /api/tests/{id}` et `PUT /api/tests/{id}`) pour les items sont disponibles et l'opération `GET` (route `GET /api/tests`) sur les collections.

:warning: Noter que :

- Les opérations sur les items et les collections sont séparées et peuvent être personnalisées / désactivées
- Les groupes peuvent permettre de personnaliser finement les éléments utilisables dans les différentes routes
- Il est important de définir un nommage cohérent pour les groupes, pour éviter des soucis (:warning: dans l'exemple ci-dessus, le nommage des groupes est à re-penser !)

Une idée de nommage (venue des [vidéos de Grafikart](https://grafikart.fr/tutoriels/api-platform-serialisation-1904)) serait de nommer les groupes sous la forme `opération:Objet:type` où :

- `opération` est le nom de l'opération liée au groupe : `read`, `write`, `get`, `put`, etc.
- `Objet` est le nom court de la classe (dans mon exemple `Test`)
- `type` est le type d'opération : `item` ou `collection`


### Validation des données

Lors de l'insertion ou la modification de nos données, il est courant de confirmer leur validité. Le faire dans une API ne change pas cette règle et plusieurs outils sont à notre disposition pour cela.

Nous pouvons déjà [utiliser la validation de Symfony](25-formulaires.html#validation) sur les différentes propriétés. API Platform pourra alors utiliser cette validation pour afficher les messages d'erreur, le cas échéant.

Cependant, il est possible d'aller plus loin et de [définir des groupes de validation](https://api-platform.com/docs/core/validation/#using-validation-groups) pour l'api, ou même [définir des groupes de validation par opération](https://api-platform.com/docs/core/validation/#using-validation-groups-on-operations) !

Comme nous resterons à des bases dans ce cours, je vous laisserai voir les documentations ci-dessus pour des exemples plus détaillés.
