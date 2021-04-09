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

