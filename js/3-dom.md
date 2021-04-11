# Le DOM

Le DOM (Document Object Model ou modèle d'objet de document en français) est une représentation du HTML d'une page, qui permet d'accéder aux éléments et de les modifier en js.
Nous allons donc pouvoir interagir avec ce DOM pour :
- Modifier le contenu d'un élément (on parle aussi d'un noeud/node)
- Modifier ses attributs (dont le style)
- Créer ou supprimer des éléments
- Détecter et réagir à des événements (passage de la souris, clic sur un élément)
- Etc.

## Cibler des noeuds

Toute page HTML contient un objet js `document`, représentant votre page, c'est notre point de départ pour toute recherche. Cet objet contient un certain nombre de méthodes pour accéder aux différentes balises qui composent la page.

/!\ Dans cette partie, j'utilise indifféremment les termes de noeud ou d'élément. Ils correspondent ni plus ni moins à une balise de votre HTML (ils en sont la représentation sous forme d'objet JS).

### document.getElementById()

[Documentation](https://developer.mozilla.org/fr/docs/Web/API/Document/getElementById)

Pour récupérer un élément à partir de son attribut `id`. Attention, il ne doit y avoir qu'un seul élément portant cet `id` dans la page (sinon, vous récupérerez simplement le premier).

```js
// renvoie la balise / le noeud avec l'attribut id valant exactement jean-claude, null s'il n'est pas trouvé
let jeanClaude = document.getElementById('jean-claude');
```

### document.getElementsByClassName()

[Documentation](https://developer.mozilla.org/fr/docs/Web/API/Document/getElementsByClassName)

Cette méthode cherche des éléments en fonction d'un nom de classe (les éléments peuvent quand même avoir d'autres classes que celle cherchée) et renvoie un tableau (vide si rien n'est trouvé). Celle-ci peut être appliquée soit sur le `document` directement, soit sur un élément.

```js
// renvoie les balises / les noeuds ayant la classe jean-claude, un tableau vide si aucun élément n'est trouvé
let jeanClaude = document.getElementsByClassName('jean-claude');

// On récupère un élément / noeud
let jeanClaude = document.getElementById('jean-claude');
// Cherche tous les éléments ayant la classe van-dame, dans les enfant du noeud avec l'id jean-claude
let vanDames = jeanClaude.getElementsByClassName('van-dame');
// Cherche tous les éléments ayant les classes van et dame, dans les enfant du noeud avec l'id jean-claude
let vanDames = jeanClaude.getElementsByClassName('van dame');
```

### document.getElementsByTagName()

[Documentation](https://developer.mozilla.org/fr/docs/Web/API/Document/getElementsByTagName)

Cette méthode cherche des éléments en fonction du nom de la balise. Elle s'applique forcément sur le document entier.

```js
// Récupère tous les liens (balise a) de la page
let links = document.getElementsByTagName('a');
```

### document.querySelector()

[Documentation](https://developer.mozilla.org/fr/docs/Web/API/Document/querySelector)

Si vous ne devez en retenir qu'une, c'est celle-ci ! Plus complexe à utiliser, cette méthode prend un sélecteur CSS en argument, et retourne un noeud correspondant (le premier). Elle vous permet de chercher plus ou moins finement un élément, comme vous l'auriez fait avec du CSS.

```js
// Récupérons le premier lien ayant les classes van et dame, dans une balise (div) ayant l'id jean-claude
let link = document.querySelector('div#jean-claude a.van.dame');
```

Si vous avez besoin de revoir les sélecteurs CSS, [je vous invite à (re)faire l'exercice CSS Diner](https://flukeout.github.io/)

### document.querySelectorAll()

[Documentation](https://developer.mozilla.org/fr/docs/Web/API/Document/querySelectorAll)

Si vous voulez récupérer plusieurs éléments, cette méthode reprend exactement le même fonctionnement que `querySelector()`, mais retourne **tous** les noeuds correspondant à la requête.

```js
// Récupérons tous les liens ayant les classes van et dame, dans une balise (div) ayant l'id jean-claude
let links = document.querySelectorAll('div#jean-claude a.van.dame');
```

### Rechercher depuis un noeud

Une fois que vous avez récupéré un noeud, plusieurs attributs permettent de naviguer dans les noeuds proches :
- `element.children` renvoie la liste des enfants (directs) de `element`
- `element.parent` renvoie l'élément parent (celui qui contient ce noeud)
- `element.nextElementSibling` / `element.previousElementSibling` : permettent de naviguer vers les frères de notre élément (noeuds de même niveau, juste après ou avant dans le DOM)

## Modifier le DOM

### Modifier le contenu d'un noeud

Deux propriétés vous permettent de modifier rapidement le contenu d'un noeud `element` que vous avez récupéré :
- `element.innerHTML`: permet d'accéder/modifier le contenu (sous forme de html) de l'élément (conserve donc la balise) ([Documentation](https://developer.mozilla.org/fr/docs/Web/API/Element/innerHTML))
- `element.textContent`: permet d'accéder/modifier le contenu (sous forme textuelle, sans balise) de l'élément (conserve donc la balise) ([Documentation](https://developer.mozilla.org/fr/docs/Web/API/Node/textContent))

```js
let element = document.getElementById('main');
element.innerHTML = "<ul><li>Elément 1</li><li>Elément 2</li></ul>";
console.log(element.innerHTML); // Affiche <ul><li>Elément 1</li><li>Elément 2</li></ul>
```

```js
let element = document.getElementById('main');
element.textContent = "Ceci est un texte, même si vous mettez des balises ici, elles seront ignorées";
console.log(element.textContent); // Affiche Ceci est un texte, même si vous mettez des balises ici, elles seront ignorées
```

### Modifier les classes d'un noeud

[Documentation](https://developer.mozilla.org/fr/docs/Web/API/Element/classList)

La propriété `classList` d'un noeud `element` vous permet d'accéder / modifier la liste des classes d'un noeud. Quelques méthodes bien utiles :

```js
element.classList.add("nouvelleClasse"); // Ajoute la classe nouvelleClasse à l'élément
element.classList.contains("nouvelleClasse"); // Renvoie true (nous venons d'ajouter la classe)
element.classList.remove("nouvelleClasse"); // Enlève la classe nouvelleClasse
element.classList.contains("nouvelleClasse"); // Renvoie false, nous venons de supprimer la classe
element.classList.replace("oldClass", "newClass"); // Replace oldClass par newClass si la classe oldClass est présente
```

### Modifier le style d'un élément (CSS)

[Documentation](https://developer.mozilla.org/fr/docs/Web/API/ElementCSSInlineStyle/style)

La propriété `style` permet de modifier les propriétés CSS d'un élément. Attention, les propriétés CSS sont notés en camelCase (`background-color` devient `backgroundColor`).

```js
element.style.backgroundColor = '#00FF00';
element.style.fontSize = '80px';
```

### Modifier les attributs

- [Documentation de setAttribute()](https://developer.mozilla.org/fr/docs/Web/API/Element/setAttribute)
- [Documentation de getAttribute()](https://developer.mozilla.org/fr/docs/Web/API/Element/getAttribute)
- [Documentation de removeAttribute()](https://developer.mozilla.org/fr/docs/Web/API/Element/removeAttribute)

En javascript, il est possible de modifier les attributs des balises HTML ou de les récupérer.

```js
<button id="button">Valider</button>

let element = document.getElementById('button');

element.setAttribute("type", "submit"); // Ajoute l'attribut type, avec la valeur submit
element.setAttribute("name", "submit-button"); // Ajoute un autre attribut (name)
element.getAttribute("name"); // Affiche submit-button
element.removeAttribute("name");
```

/!\ Il vaut mieux utiliser `removeAttribute` plutôt que de définir la valeur de l'attribut à `null` avec `setAttribute`.


#### Cas particulier des data-attributs

HTML limite les attributs à une liste précise de balises. Toutefois, des balises data-* nous permettent de créer nos propres attributs !

```html
<div class="jean-claude" data-van-dame data-strength="too much" data-humour="unlimited" data-aware="Off curse">
    He is aware.
</div>
```

Pour les manipuler en js, on modifie l'attribut dataset de notre balise.

```js
let element = document.querySelector('[data-van-dame]');

// Modifier des éléments
element.dataset.vanDame = true;
element.dataset.lastName = 'Van Dame';

console.log(element.dataset.aware);
```

### Créer des éléments

[Documentation](https://developer.mozilla.org/fr/docs/Web/API/Document/createElement)

La méthode `createElement()` vous permet de créer un élément à ajouter plus tard au DOM (attention, par défaut, il ne s'affiche nulle part et nous verront comment l'ajouter ensuite).

```js
const newElement = document.createElement("p");
```

#### Ajouter des enfants

[Documentation](https://developer.mozilla.org/fr/docs/Web/API/Node/appendChild)

```js
// On crée notre élément
const newElement = document.createElement("p");

// On récupère son futur parent
let element = document.getElementById("jean-claude");
// On ajouter notre nouvel élément dans le noeud voulu (à la fin)
element.appendChild(newElement);
```

#### Supprimer / remplacer des éléments

- [removeChild()](https://developer.mozilla.org/fr/docs/Web/API/Node/removeChild)
- [replaceChild()](https://developer.mozilla.org/fr/docs/Web/API/Node/replaceChild)

```js
// On crée notre élément
const newElement = document.createElement("p");

// On récupère son futur parent
let element = document.getElementById("jean-claude");
// On ajoute notre nouvel élément dans le noeud voulu (à la fin)
element.appendChild(newElement);

// On peut supprimer notre élément (il faut récupérer le noeud si on ne l'a pas déjà)
element.removeChild(newElement);
// Ou on peut remplace notre élément par un nouveau
element.replaceChild(document.createElement("p"), newElement);
```

## Exercice

Prendre le HTML suivant :

```html
<!doctype html>
<html lang="fr">
<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Test de manipulation du HTML</title>
</head>
<body>
    <header id="header">
            
    </header>
    <main id="main">
        <header class="main-header">
            <h1>Ceci est un titre</h1>
            <p class="paragraph">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget arcu in tellus auctor mattis. Maecenas in scelerisque diam. Praesent sollicitudin sem eu viverra sollicitudin. Nulla bibendum mi et semper convallis. Mauris scelerisque sapien ut velit blandit aliquet. Proin nec lacus ac risus laoreet suscipit quis commodo nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur ligula magna, ultricies non luctus at, placerat vel magna. Nullam nibh lorem, ornare ut ultrices at, malesuada nec risus. Cras dignissim, tortor in ullamcorper euismod, sem nibh consequat magna, eu volutpat ex leo vel tellus. Donec quis ex ac ligula varius porta. Sed laoreet augue sit amet lectus viverra, eu vulputate massa lacinia. Nulla facilisi. Aenean eget diam id ex iaculis tristique ut sed eros. Cras varius erat nunc.
            </p>
            <p class="paragraph">
                Nam vitae sapien magna. Nunc non consequat mi. Nullam non ante in elit vulputate dignissim. Proin hendrerit ut diam et tristique. Duis interdum dui sem, eget bibendum neque lacinia id. Pellentesque venenatis, nisl eu faucibus ultrices, libero arcu rhoncus augue, vel ultrices ex nisl vel nibh. Nullam vitae nibh id lorem condimentum rhoncus id non diam. Aliquam ultricies et erat id mattis. Integer in egestas erat, porttitor blandit lectus. Phasellus dignissim, tellus pellentesque venenatis commodo, turpis tortor auctor leo, sed sagittis eros nisl sed ante.
            </p>
            <p class="paragraph paragraph--exception">
                Duis accumsan turpis nec sollicitudin viverra. Donec non leo aliquam, faucibus risus vitae, egestas erat. Phasellus pulvinar nisi nec risus luctus, et dictum nisi varius. Aenean id euismod tellus. Proin lobortis vestibulum commodo. Sed elit odio, porta at odio eget, hendrerit efficitur massa. Curabitur iaculis sollicitudin nisi.
            </p>
            <p class="paragraph">
                Fusce gravida neque justo, eget convallis nunc ultricies vitae. Integer hendrerit dolor nec finibus pharetra. Sed at est congue, pellentesque nulla vitae, imperdiet erat. Etiam eu fermentum lorem, eu porta tortor. Sed laoreet commodo eros gravida luctus. Integer ornare purus et augue maximus, semper efficitur lorem imperdiet. Nullam eget luctus tortor. Fusce ut euismod dolor. Suspendisse posuere, ante id finibus vestibulum, sem purus ullamcorper est, nec malesuada elit orci et augue. Aenean eu lectus a dui posuere egestas quis sit amet tortor. Fusce at magna eget justo fermentum vulputate.
            </p>
            <p class="paragraph">
                Morbi a risus sit amet lorem molestie bibendum. Sed porttitor non massa sed viverra. Ut vitae mollis turpis. Nunc non pellentesque dolor. Proin malesuada, erat eu sollicitudin vehicula, libero velit pharetra nunc, ac maximus tortor neque rhoncus dolor. Morbi ligula dolor, interdum nec ex in, commodo euismod ipsum. Integer quis mi lobortis, venenatis lorem at, faucibus ligula. Nunc id tristique enim, sed pretium augue. 
            </p>
        </header>
    </main>
    <footer id="footer">
        
    </footer>
</body>
</html>
```

En javascript, faire les modifications suivantes : 

- Cibler la balise `footer` de 2 manières : par son attribut `ìd` (avec la méthode dédiée et avec `querySelector`) et lui ajouter la classe `footer`
- Ajouter une balise `p` à la fin de `main` contenant ce texte : `Ceci est un contenu <strong>très important</strong>`
- Cibler toutes les balises `p` de la page et changer la couleur du texte (`#000F00`) et remplacer la classe `paragraph` par la classe `text`
- Ajouter une balise `ul` dans la balise `header`, avec 4 `li` à l'intérieur pour obtenir le résultat suivant : 
```html
<header id="header">
    <ul class="list" id="important-list">
        <li class="list__element" data-num="1">Ceci est l'élément n°0</li>
        <li class="list__element" data-num="2">Ceci est l'élément n°1</li>
        <li class="list__element" data-num="3">Ceci est l'élément n°2</li>
        <li class="list__element" data-num="4">Ceci est l'élément n°3</li>
    </ul>        
</header>
```

## Les event listeners (écouteurs d'événements)

- [addEventListener](https://developer.mozilla.org/fr/docs/Web/API/EventTarget/addEventListener)
- [Les événements](https://developer.mozilla.org/fr/docs/Web/Events)

Un événement est une **réaction** à une **action** de l'utilisateur. Vous pouvez par exemple détecter si un élément a été cliqué ou survolé par la souris, si un champs de formulaire a été modifié, etc. Je vous invite à regarder [la liste des événements disponibles](https://developer.mozilla.org/fr/docs/Web/Events).

Le premier paramètre de cette méthode est le nom d'un événement, le second est une fonction (fonction de callback) ou le nom d'une fonction.

L'un des plus courant : l'événement `onclick` qui se déclenche au clic de la souris dans un élément.

```js
// On récupère le lien dont l'attribut id est jean-claude
let element = document.querySelector("a#jean-claude");

// On va détecter le clic sur ce lien
element.addEventListener('click', function() {
    element.innerHTML = "I'm aware !";
});
```

Dans notre exemple, vous remarquerez que la page se recharge et que notre texte ne s'affiche pas.

### preventDefault()

Il nous manque 2 choses pour éviter le comportement précédent : 
- Un moyen de savoir ce qui a été cliqué
- Un moyen d'empêcher le comportement normal de notre élément (éviter le rechargement de notre page)

Heureusement, notre fonction de callback (le deuxième paramètre de `addEventListener`) prend un paramètre, l'`event` javascript qui a été produit. Cet objet contient de nombreuses informations et méthodes utiles, dont `preventDefault()`.

```js
// On récupère le lien dont l'attribut id est jean-claude
let element = document.querySelector("a#jean-claude");

// On va détecter le clic sur ce lien. On récupère le paramètre event, afin d'agir sur le navigateur
element.addEventListener('click', function(event) {
    // On prévient le navigateur que l'on ne veut pas suivre le lien
    // (on dit qu'on empêche le comportement par défaut du lien)
    // Notre page ne sera donc pas rechargée et notre texte s'affichera !
    event.preventDefault();
    element.innerHTML = "I'm aware !";
});
```

### stopPropagation()

Cette deuxième méthode de l'`event` nous permet d'éviter un autre comportement : la propagation d'un événement à son parent. 
En effet, quand vous cliquez sur un élément, si cet élément à un parent avec un event listener, il sera également déclenché.

```html
<div id="van-dame">
    <a href="" id="jean-claude">Envoyer</a>
</div>
```

```js
// On récupère le lien dont l'attribut id est jean-claude
let parent = document.querySelector("div#van-dame");
let element = document.querySelector("a#jean-claude");

parent.addEventListener('click', function(event) {
    alert('Van Dame !');
});

element.addEventListener('click', function(event) {
    event.preventDefault();
    // Grâce à cette ligne, si on clique sur le lien, le message d'alert ne sera pas affiché.
    event.stopPropagation();
    element.innerHTML = "I'm aware !";
});
```
