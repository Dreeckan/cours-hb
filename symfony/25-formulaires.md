# Formulaires

[La documentation officielle sur les formulaires](https://symfony.com/doc/current/forms.html)

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/dee4c01c3dfe4748a26cd0464c28b6c5" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## Informations importantes avant de commencer

Tout au long de cette section, nous allons associer nos formulaires directement à nos entités. C'est l'un des cas les plus courants, mais pas le seul. Ils peuvent être liés à n'importe quelle classe PHP, voir à aucune classe (et fonctionner avec des tableaux).
Avec Symfony, les formulaires sont des objets et nous allons en aborder 3 aspects importants :
- Comment créer et utiliser un objet de **construction** du formulaire
- Obtenir un objet pour **l'affichage**
- Utiliser notre objet de construction pour **traiter** les données soumises

## Créer un formulaire

Avant toute chose, nous devons avoir une entité ou un objet à associer à notre formulaire. Reprenons la classe `src/Entity/Tag.php`, définie dans la partie précédente : 

```php
<?php

namespace App\Entity;

use App\Repository\TagRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TagRepository::class)
 */
class Tag
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=128)
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity=Article::class, mappedBy="tag")
     */
    private $articles;

    public function __construct()
    {
        $this->articles = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|Article[]
     */
    public function getArticles(): Collection
    {
        return $this->articles;
    }

    public function addArticle(Article $article): self
    {
        if (!$this->articles->contains($article)) {
            $this->articles[] = $article;
            $article->setTag($this);
        }

        return $this;
    }

    public function removeArticle(Article $article): self
    {
        if ($this->articles->removeElement($article)) {
            // set the owning side to null (unless already changed)
            if ($article->getTag() === $this) {
                $article->setTag(null);
            }
        }

        return $this;
    }
}

```

Pour créer un formulaire associé, utilisons la commande `php bin/console make:form` (encore une fois, les commandes de génération aident beaucoup ;) ). Nous indiquons à la commande que nous voulons créer une classe `TagType` (le `Type` à la fin du nom est standard et permet de reconnaitre les formulaires), lié à notre entité `Tag`.

Nous obtenons un fichier `src/Form/TagType.php` (commenté et un peu amélioré par rapport à ce que génère la commande) :

```php
<?php

namespace App\Form;

use App\Entity\Tag;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

// Les formulaires étendent tous AbstractType, fourni par Symfony, afin de récupérer diverses méthodes utiles à la construction, la configuration et l'affichage du formulaire
class TagType extends AbstractType
{
    // buildForm va nous permettre de définir les différents champs de notre formulaire, leur type et des options dont ils auront besoin
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            // Ici, un champ name est créé, il correspond à la propriété name de notre entité
            ->add(
                'name', // Le champ prend un nom, identique au nom d'une propriété de notre classe liée
                TextType::class, // On peut lui donner un type (ici, on dit que c'est un input de type text 
                [
                    'required' => true, // On passe une option, pour préciser que ce champ est requis (ne doit pas être vide)
                ]
            )
            ->add('articles') // Un autre champ est créé, on laisse Symfony en déterminer le type et les options
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        // On définit certaines options de notre formulaire. Ici, on lie une classe (notre entité Tag) à ce formulaire. 
        $resolver->setDefaults([
            'data_class' => Tag::class,
        ]);
    }
}

```

Pour les différents [types de champs disponibles et leurs options](https://symfony.com/doc/current/reference/forms/types.html), je vous invite à vous référer à [la documentation officielle](https://symfony.com/doc/current/reference/forms/types.html)

## Utiliser ce formulaire dans un controller

Pour créer un formulaire à partir de notre `TagType` (qui est un plan de fabrication, ou formulaire type), Symfony et son `AbstractController` nous offre une méthode `createForm` :

```php
/**
     * @Route("/new", name="tag_new")
     */
    public function new(Request $request, EntityManagerInterface $em): Response
    {
        $tag = new Tag();

        // On crée le formulaire (objet de traitement)
        // Premier paramètre : le formulaire type (FQCN)
        // Deuxième paramètre : l'objet à manipuler (à synchroniser avec le formulaire)
        // Troisième paramètre : des options du formulaire
        $form = $this->createForm(TagType::class, $tag, [
            'method' => 'POST',
            'action' => $this->generateUrl('tag_new'),
        ]);

        // On dit explicitement au formulaire de traiter ce que contient la requête (objet Request)
        $form->handleRequest($request);

        // On regarde si le formulaire a été soumis ET est valide
        if ($form->isSubmitted() && $form->isValid()) {
            // On enregistre
            $em->persist($tag);
            $em->flush();

            // Une fois que le formulaire est validé,
            // on redirige pour éviter que l'utilisateur ne recharge la page
            // et soumette la même information une seconde fois
            return $this->redirectToRoute('tag_index');
        }

        return $this->render('tag/new.html.twig', [
            'form' => $form->createView(), // On crée un objet FormView, qui sert à l'affichage de notre formulaire
        ]);
    }
```

Il y a plusieurs éléments à noter ici : 
- `$form = $this->createForm(TagType::class, $tag)` permet de créer un objet `Form` pour traiter le formulaire et synchroniser notre objet `$tag` avec le contenu du formulaire.
- `$form->handleRequest($request);` dit au formulaire d'aller regarder les données GET et POST dans la requête (et les insère dans notre objet `$tag` si nécessaire)
- `if ($form->isSubmitted() && $form->isValid()) {` on vérifie si le formulaire a été soumis et si son contenu est valide. Si ça n'est pas le cas, on affiche le formulaire avec les éventuelles erreurs. Si le formulaire est valide (voir la section sur la validation, plus bas), on enregistre les données en base.
- `'form' => $form->createView()` crée un objet FormView afin de gérer son affichage dans notre vue Twig

## Afficher le formulaire

Prenons un affichage assez classique : 

```Twig
    {# On affiche la balise <form> #}
    {{ form_start(form) }}
        {# On affiche une "row" de notre formulaire, c'est à dire un bloc qui va contenir le label (balise label) et le widget (ici un champ input de type text) #}
        {# On ajoute des attributs sur la div, sur le widget et sur le label #}
        {{ form_row(form.name, {
            row_attr: {
                class: 'form-line',
                "data-line": true
            },
            attr: {
                class: 'form-widget',
            },
            label_attr: {
                class: 'form-label',
            },
        }) }}
        
        {# On affiche une "row" de notre formulaire, c'est à dire un bloc qui va contenir le label (balise label) et le widget (ici un champ input de type text) #}
        {{ form_row(form.computers) }}

        {# On affiche les éventuels champs qui n'aurait pas été affichés jusqu'ici #}
        {{ form_rest(form) }}
        {# On ajoute un bouton de validation du formulaire, nous n'en avons pas mis dans notre objet TagType #}
        <button type="submit" class="btn btn-primary">Valider</button>
    {# On affiche la balise </form> et les éventuels champs qui n'aurait pas été affichés jusqu'ici #}
    {{ form_end(form) }}
```

Plusieurs fonctions Twig (uniquement disponibles avec Symfony) peuvent nous servir pour afficher un formulaire ou ses éléments (dans les exemples, nous avons une variable form, qui contient un objet `FormView`) :
- `form(form)` affiche tout le formulaire (les balises `<form></form>` et tous les champs)
- `form_row(form.nomDuChamp)` affiche une ligne de formulaire (en général, une `div` contenant : un label, les éventuelles erreurs et le widget)
- `form_label(form.nomDuChamp)` affiche la balise `<label></label>` lié au champ `nomDuChamp`
- `form_widget(form.nomDuChamp)` affiche le widget du champ (n'importe quel type de champ de formulaire HTML avec lequel l'utilisateur peut interagir)
- `form_errors(form.nomDuChamp)` affiche un bloc avec les erreurs liées au champ `nomDuChamp`

Ce schéma venu de la documentation résume tout cela :

<object data="https://symfony.com/doc/current/_images/form/form-field-parts.svg" type="image/svg+xml"></object>

### Personnaliser tous les formulaires

Pour utiliser directement Bootstrap 5, Symfony fournit un thème de formulaire permettant d'avoir directement les bonnes classes sur tous les champs et leurs contenants :

```yaml
twig:
    default_path: '%kernel.project_dir%/templates'
    form_themes: ['bootstrap_5_horizontal_layout.html.twig'] # On dit à Symfony d'utiliser un thème déjà prêt, intégrant les classes de Boostrap (version 4)
```

Pour que notre thème fonctionne, il nous faut ajouter le css de Bootstrap dans notre fichier `base.html.twig` : 

```Twig
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
```

Il y a également d'autres thèmes disponibles, que vous pouvez voir dans le dossier `vendor/symfony/twig-bridge/Resources/views/Form/` de votre projet (par défaut, Symfony utilise le thème `form_div_layout.html.twig`).

Nous pouvons également aller bien plus loin et créer notre propre thème de formulaire, je vous laisse voir [la documentation Symfony sur le sujet](https://symfony.com/doc/current/form/form_themes.html) ou ci-dessous.

### Les thèmes de formulaire

Outre les thèmes fournis par Symfony, vous pouvez créer vos propres thèmes. Soit pour étendre ce que propose un thème existant, soit pour personnaliser un ensemble de champs. Un thème est d'être réutilisable et peut être utilisé sur un, plusieurs ou tous les formulaires d'un site. 

#### Appliquer les thèmes

Une fois votre thème créé, vous pouvez l'utiliser comme ci-dessus (définition d'un thème global, appliqué à tous les formulaires) ou sur un formulaire précis, avec le tag `form_theme` dans Twig.

Appliquer un thème sur un formulaire :

```twig
{% form_theme form 'foundation_5_layout.html.twig' %}

{{ form_start(form) }}
    {# ... #}
{{ form_end(form) }}
```

Appliquer plusieurs thèmes sur un formulaire :

```twig
{% form_theme form with [
    'foundation_5_layout.html.twig',
    'forms/my_custom_theme.html.twig'
] %}
```

Vous pouvez également appliquer un thème à un sous-formulaire de la même manière :

```twig
{% form_theme form.child 'foundation_5_layout.html.twig' %}
```

Vous pouvez également appliquer un thème à un formulaire et un autre à l'un de ses enfants :

```twig
{# Ajout d'un thème sur tout le formulaire #}
{% form_theme form 'form/my_custom_theme.html.twig' %}
{# Ajout d'un thème sur un enfant #}
{% form_theme form.child 'form/my_other_theme.html.twig' %}
```

Vous pouvez forcer l'application d'un seul thème sur un formulaire : 

```twig
{% form_theme form with ['foundation_5_layout.html.twig'] only %}
```

#### Créer un thème

Créer un thème de formulaire permet de définir comment chaque champ va s'afficher (que ce soit pour tous vos formulaires ou des formulaires spécifiques). Nous pouvons ici personnaliser **tout** le HTML du champ.

Vous pourrez trouver un exemple (et le thème appliqué par défaut à **tous** les formulaires) dans `vendor/symfony/twig-bridge/Resources/views/Form/form_div_layout.html.twig`

Lorsque Symfony est configuré pour utiliser Twig pour afficher nos vues (ce qui est notre cas ;) ), il utillise des blocs Twig pour afficher les différents champs de notre formulaire. Il en crée pour chaque partie du champ, à savoir :
- le label (que l'on peut appeler avec `form_label(form)`)
- le widget (par exemple un champ `input` ou `select`) (que l'on peut appeler avec `form_input(form)`)
- les erreurs  (que l'on peut appeler avec `form_errors(form)`)
- le message d'aide (`help`) (que l'on peut appeler avec `form_help(form)`)

Toutes ces parties sont regroupées dans une `row` (par défaut, une `div` qui contient les 4 autres éléments) (que l'on peut appeler avec `form_row(form)`).

Pour créer votre propre thème, vous pouvez vous inspirer de `vendor/symfony/twig-bridge/Resources/views/Form/bootstrap_5_layout.html.twig`. nous allons en prendre des exemples, pour décortiquer le fonctionnement du thème.

Déjà, on peut constater que ce thème en étend un autre (c'est le moyen le plus simple, pour styler **tous** les formulaires), qui étend lui-même `form_div_layout.html.twig` :

```twig
{% use "bootstrap_base_layout.html.twig" %}
```

Ce qui veut dire que le template va hériter de tous les blocs de ses parents et peut les surcharger. Par exemple, pour modifier l'affichage d'un bouton (de type submit), ce thème nous donne ce code : 

```twig
{%- block submit_widget -%}
    {%- set attr = attr|merge({class: (attr.class|default('btn-primary'))|trim}) -%}
    {{- parent() -}}
{%- endblock submit_widget %}
```

Décomposons : 

`{%- block submit_widget -%}` définit le bloc que nous surchargeons/créons. Le nom du bloc contient:
  - Le nom du champ `submit`
    - L'élément du formulaire qui est modifié/affiché dans ce bloc : le `widget` 
Ce bloc est donc appelé quand le formulaire appelle la fonction `form_widget()` d'un champ de type `SubmitType`

Ainsi, si nous avons un formulaire de contact (nommé `contact`), on peut modifier l'affichage d'un champ `email` comme ceci : 

```twig
{%- block contact_email_widget -%}
  {# On personnalise l'affichage ici #}
{%- endblock -%}
```

Si on veut modifier l'affichage du label, on utilisera `block contact_email_label`, ou `block contact_email_row` pour la ligne, par exemple.

```twig
{%- block submit_widget -%}
    {%- set attr = attr|merge({class: (attr.class|default('btn-primary'))|trim}) -%}
    {{- parent() -}}
{%- endblock submit_widget %}
```

Ici, on fait plusieurs opérations :
- `attr = ` : On modifie la variable `attr`, 
- `|merge(...)` : en la fusionnant avec un autre tableau, 
- `{class: (attr.class|default('btn-primary'))|trim}` : contenant la classe `'btn-primary'` si aucune classe n'est présente dans le tableau `attr` d'origine (et dans sa propriété `class`)

Tout cela nous permet d'afficher les boutons type submit avec la classe `btn-primary` par défaut.

On appelle ensuite le block `submit_widget` du parent pour en récupérer tout le fonctionnement (la seule différence est donc la modification de la variable `attr`).

Un autre exemple, pour personnaliser toutes nos `form_row()`, sans faire appel à un block d'un parent :

```twig
{%- block form_row -%}
    <div class="form__row">
        {{- form_label(form) -}}
        {{- form_errors(form) -}}
        {{- form_widget(form) -}}
        {{- form_help(form) -}}
    </div>
{%- endblock form_row -%}
```

Avec ce thème, on ajoute une classe `form__row` à toutes les rows que l'on appelle avec la fonction `form_row()`.

:warning: Faire ceci rend inutilisable l'option `row_attr` que vous pouvez passer à la fonction `form_row()`, il s'agit juste d'un exemple.

##### Personnaliser un formulaire précis

Dans votre thème, vous pourriez vouloir personnaliser un formulaire très précis (par exemple, l'affichage d'une liste de races de chiens dans un formulaire de création d'un chien).

Dans l'affichage de notre formulaire, on peut ajouter un `dump()` pour trouver l'information qui nous intéresse, `block_prefix` :

```twig
    {{ form_start(form) }}
        {{ form_row(form.name) }}
        {{ form_row(form.breeds) }}

        {{ dump(form.breeds) }}

        <button type="submit">Valider</button>
    {{ form_end(form) }}
```

Avec ce dump, nous pouvons trouver l'information ici :

![](/assets/img/php/block_prefixes.PNG)

Cette variable `block_prefixes` nous donne la base des différents noms que nous pouvons donner à notre block (dans notre thème de formulaire), du plus générique (`form`) au plus spécifique (`_dog_breeds`). Grâce à cela, nous pouvons déduire les noms possibles pour notre bloc : 

- `form_row` pour personnaliser toutes les `form_row`
- `choice_row` pour personnaliser la row de tous les formulaires `ChoiceType` (dont hérite `EntityType`)
- `entity_row` pour personnaliser la row de tous les formulaires `EntityType`
- `_dog_breeds_row` si on veut personnaliser la row de ce formulaire spécifique

Dans notre exemple, l'idée est de ne personnaliser que **ce** champ précis. Nous allons donc avoir ceci dans notre fichier de thème :

```twig
{% block _dog_breeds_row %}
    {{ dump() }}
{% endblock _dog_breeds_row %}
```

Le `dump` dans l'exemple ci-dessus permet d'afficher toutes les variables disponibles au moment de l'appel. Vous remarquerez que vous ne manquez pas d'informations à exploiter ;) .

Personnellement, je vais me contenter d'ajouter une classe sur la row et d'appeler l'affichage d'une row classique :

```twig
{% block _dog_breeds_row %}
    {% set row_attr = row_attr|merge({
        'class': (row_attr.class|default('') ~ ' breed__list')|trim,
    }) %}
    {{ form_row(form, {
        row_attr: row_attr,
    }) }}
{% endblock _dog_breeds_row %}
```

On peut, bien sûr, aller beaucoup plus loin avec ces thèmes, mais je vous invite à consulter la [documentation officielle sur les thèmes](https://symfony.com/doc/current/form/form_themes.html#creating-your-own-form-theme) pour plus de détails et d'exemples.

## Validation

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/b88d161509d748049d9f0e1c8883cfbc" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Pour vérifier que notre entité est valide, [Symfony met à notre disposition un ensemble d'outils de validation](https://symfony.com/doc/current/validation.html).

Par exemple, nous pouvons vérifier que la propriété `name` de notre objet `Tag` n'est pas vide :

```php
<?php

namespace App\Entity;

use App\Repository\TagRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=TagRepository::class)
 */
class Tag
{
    // ...
    
    /**
     * @ORM\Column(type="string", length=128)
     * // Une assertion pour vérifier que notre name n'est pas vide
     * @Assert\NotBlank()
     * // Une autre pour vérifier qu'il contienne au moins 4 caractères
     * @Assert\Length(min=4)
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity=Article::class, mappedBy="tag")
     */
    private $articles;

    // ... 
}

```

On utilise la validation de manière assez constante : 
- On utilise le namespace des contraintes fournies par Symfony `use Symfony\Component\Validator\Constraints as Assert;`
- On appelle des assertions en annotation de nos propriétés ou méthodes : `@Assert\NotBlank()`

Vous trouverez une liste plus complète des assertions disponibles dans [la documentation sur la validation](https://symfony.com/doc/current/validation.html#constraints)

Ainsi, si on valide le formulaire de création de tag avec une valeur invalide, un message d'erreur sera affiché (ce message peut d'ailleurs être personnalisé, mais je vous invite à consulter la documentation pour voir comment).

## Pour résumer

- Les formulaires sont définis dans un service `FormType` (en général nommé `NomDeLaClasseAssocieeType`).
- On peut générer ce `FormType` avec la commande `make:form` (qui nous permet également d'associer une classe / une entité).
- La méthode `buildForm()` du `FormType` permet d'ajouter des champs de formulaire ou d'en gérer le type et les options.
  - Les types sont (pour la plupart) définis dans l'espace de noms `Symfony\Component\Form\Extension\Core\Type`. Si le type est `null`, Symfony se charge d'en définir un à partir de l'objet associé au formulaire.
  - les options sont dépendantes du type choisi (voir [les documentations des différents types](https://symfony.com/doc/current/reference/forms/types.html))
- Pour utiliser un formulaire dans un contrôleur, on utilise `$this->createForm(FQCNDuFormType, $unObjetQuiVaRecevoirLesDonnees)`
- La mise à jour des données lors de la soumission du formulaire se faire avec `->handleRequest($request)`
- On peut savoir si le formulaire a été soumis avec la méthode `->isSubmitted()` du formulaire
- Les données peuvent (et doivent, la plupart du temps) être validées par le formulaire avec la méthode `->isValid()` du formulaire
  - Des contraintes (assertions) sont ajoutées dans l'entité / l'objet lié au formulaire ([liste des contraintes disponibles par défaut](https://symfony.com/doc/current/validation.html#constraints))