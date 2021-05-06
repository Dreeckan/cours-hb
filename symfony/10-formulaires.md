# Formulaires

[La documentation officielle sur les formulaires](https://symfony.com/doc/current/forms.html)

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

### Personnaliser le formulaire

Pour utiliser directement Bootstrap 4, Symfony fournit un thème de formulaire permettant d'avoir directement les bonnes classes sur tous les champs et leurs contenants :

```yaml
twig:
    default_path: '%kernel.project_dir%/templates'
    form_themes: ['bootstrap_4_horizontal_layout.html.twig'] # On dit à Symfony d'utiliser un thème déjà prêt, intégrant les classes de Boostrap (version 4)
```

Pour que notre thème fonctionne, il nous faut ajouter le css de Bootstrap dans notre fichier `base.html.twig` : 

```Twig
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
```

Il y a également d'autres thèmes disponibles, que vous pouvez voir dans le dossier `vendor/symfony/twig-bridge/Resources/views/Form/` de votre projet (par défaut, Symfony utilise le thème `form_div_layout.html.twig`).

Nous pouvons également aller bien plus loin et créer notre propre thème de formulaire, mais je vous laisse voir [la documentation Symfony sur le sujet](https://symfony.com/doc/current/form/form_themes.html).

## Validation

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