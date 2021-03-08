# Twig

[La documentation officielle de Twig](https://twig.symfony.com/doc/) (qui présente également séparément ce qui vient de Twig ou qui est présent uniquement pour Symfony)

Twig est un moteur de rendu (avec Symfony, vous pouvez tout aussi bien continuer à utiliser PHP, comme nous l'avons vu jusqu'à maintenant) dont le but est de vous simplifier la vie dans la gestion de votre HTML.

## Syntaxe

Twig a sa propre syntaxe, basée sur 5 éléments :
- les tags `{% unExempleDeTag %}{% endunExempleDeTag %}` qui vont vous permettre de faire des calculs divers
- les moustaches (appellation non-officielle) `{{  }}` qui sont là pour afficher du contenu (le contenu d'une variable, le retour d'une fonction ou d'un filtre, etc.)
- les filtres `uneValeurOuVariable | unFiltre(unParamètreDuFiltre)` sont des fonctions dont le premier paramètre se trouve avant le `|` et les suivants dans les parenthèses
- les fonctions `uneFonction(unParamètreDeLaFonction, unSecondParamètre)` plus classiques
- les tests `if uneValeur is unTest(unParamètreDuTest)` vont servir dans des conditions (ainsi que les divers opérateurs, que je vous invite à aller voir par vous-même dans la documentation)

Voyons quelques exemples avec la page d'accueil d'un blog.

Un premier fichier `templates/base.html.twig` :

```Twig
{# Ceci est un commentaire dans Twig #}
<!DOCTYPE html>
<html dir="ltr" lang="fr">
    <body>
        {# Ici, nous définissons un ensemble de blocs, qui seront modifiables dans les templates qui héritent de templates/base.html.twig #}
        {% block bodyHeader %}{% endblock %}
        {% block body %}{% endblock body %}
        {% block bodyFooter %}{% endblock %}
        
        {% block javascripts %}{% endblock %}
    </body>
</html>
```

Un second fichier `templates/blog/layout.html.twig` :

```Twig
{# On étend base.html.twig, on en récupère donc tout le contenu, mais nous ne pouvons plus écrire des choses en dehors de blocks #}
{% extends 'base.html.twig' %}

{% block body %}

    {# Ici, nous partons du principe que nous avons une variable articles (un tableau contenant des objets Article, par exemple) #}
    <h1>
        {# on utilise le filtre |length qui nous renvoie la quantité d'élements dans le tableau #}
        {{ articles|length }}
        articles sur ce blog
    </h1>
    
    {# la syntaxe du for est encore différente du PHP, mais permet aussi beaucoup plus de souplesse (voir la doc pour les différentes utilisations possibles) #}
    {% for article in articles %}
        {# on utilise une condition et un test ici, pour vérifier que notre article n'est pas vide #}
        {% if article is not empty %}
        
            {# On inclue un autre template en lui transmettant des paramètres #}
            {# Ici, on lui dit qu'il n'aura que les paramètres globaux (app) et la variable article #}
            {% include 'blog/_article.html.twig' with { article: article } only %}

        {# Notez ici que les tags ont souvent un début et une fin, mais que l'on utilise plus d'accolades #}
        {% endif %} 
    {% endfor %}
    
{# Il n'est pas obligatoire d'indiquer le nom du block qu'on ferme, c'est simplement plus pratique pour s'y retrouver si le block contient beaucoup de choses #}
{% endblock body %}
```

## Spécifiques à Symfony

Il y a quelques filtres et fonctions utiles à connaître pour travailler avec Twig dans Symfony : 
- `asset()` qui permet de récupérer un fichier (css, image, javascript, etc.) dans le dossier `public` ou l'un de ses sous-dossiers
- `path()` qui permet d'avoir l'URi vers une de vos routes
- `url()` qui permet d'avoir une url (complète, avec le http(s), le nom de domaine, etc.)
- `trans` (filtre ou tag, les deux existent) qui va nous permettre d'appeler nos traductions

Poursuivons notre exemple avec le fichier `blog/_article.html.twig` :

```Twig
<article>
    <header>
        <h2>
            {# Pour récupérer une propriété d'un objet, on utilise généralement cette notation : nomDeLaVariable.nomDeSaPropriete #}
            {# Dans les faits, c'est la méthode getTitle() de notre objet Article qui va être appelée, il faut donc qu'elle soit définie. #}
            {{ article.title }}{# on aurait aussi pu écrire article.getTitle() pour bien montrer l'appel au getter #}
        </h2>
        {# Ici, on charge l'image qui se trouve dans le dossier public/chemin/vers/une/image.jpg. L'avantage est que nous n'avons plus à gérer le dossier dans lequel nous nous trouvons, Symfony le fait pour nous #}
        <img src="{{ asset('/chemin/vers/une/image.jpg') }}" alt="">
    </header>
    {# path nous permet d'avoir le lien (relatif) vers notre article. On utilise généralement le lien relatif car il est plus court à calculer et éviter beaucoup de calculs au navigateur. #}
    {# path prend en premier paramètre le nom d'une route, et en second un "objet" avec les paramètres #}
    <a href="{{ path('blog_show', { slug: article.slug }) }}">
        {# le filtre trans s'applique sur une chaine de caractère (qui peut venir d'une variable), et prend 2 paramètres #}
        {# Le premier est une liste de paramètres nécessaires à la traduction (que nous verrons dans une partie sur les traductions) #}
        {# Le second est le nom du fichier où se trouve la traduction (ici, blog.fr.yaml si l'on est en français) #}
        {{ "Lire l'article"|trans({}, 'blog') }}
    </a>
    {# url prend les mêmes paramètres que path, mais retourne une url absolue #}
    Lien partageable vers l'article : {{ url('blog_show', { slug: article.slug }) }}
</article>
```

## Transmettre des paramètres

Depuis un controller (qui va *rendre* la vue, en utilisant la méthode `render()` disponible dans le `AbstractController` de Symfony), vous pouvez transmettre un tableau de paramètres à la vue. L'index dans ce tableau correspondra au nom de la variable dans le fichier Twig, la valeur à sa valeur.

```php
public function index(int $page = 1): Response 
{
    $listeDesArticles = [];
    return $this->render('blog/index.html.twig', [
        'page'     => $page,
        'articles' => $listeDesArticles, // Ici, la vue Twig aura un paramètre articles, indépendant du nom de la variable dans le controller
    ]);
}
```

### Dé-buguer

Dans les vues Twig, vous disposez d'une fonction `dump()` qui vous permet d'afficher le contenu d'une variable et d'en voir le détail (un peu comme un `var_dump`, mais plus complet et mieux mis en forme). Utilisée sans paramètre, la fonction `dump()` affiche toutes es variables disponibles dans la vue.

Il existe également une commande pour vérifier la validité de vos vues Twig 

## Exercices liés

Si vous êtes arrivés jusque-là, vous pouvez maintenant [faire les exercices 1, 2, 3 et 4](99-exercices.md) (et nous pratiquerons dans les autres exercices également)