# Révisions

Un ensemble d'exercices pour revoir un peu tous les éléments abordés dans le cours.

Créer un fichier `revisions.html` (avec le squelette HTML de base) et y associer un fichier `revisions.js`. Nous allons travailler dans ces deux fichiers pour les premières parties.

## 1. Syntaxe et bases du langage

Dans `revisions.js` :

- Écrire une fonction `square()` qui calcule le carré d'un nombre `n` (soit le calcul `n * n`) et le retourne
  - Écrire 2 appels de cette fonction (appeler cette fonction avec des valeurs différentes) et afficher le résultat dans la console du navigateur

- Écrire une fonction `compact()` qui prend 2 paramètres (`a` et `b` par exemple) et qui retourne un tableau composé de ces deux paramètres.
  - Écrire 2 appels de cette fonction (appeler cette fonction avec des valeurs différentes) et afficher le résultat dans la console du navigateur

- Créer un tableau contenant les valeurs `42`, `'test'`, `242.68`
- Retourner l'index de la valeur `'test'` à l'aide d'une méthode des tableaux vue en cours

- Créer un objet (littéral) ayant :
  - la propriété `a` avec pour valeur `42`
  - la propriété `b` avec pour valeur `test`
  - une méthode `fusion` renvoyant la concaténation de `a` et de `b`
- Appeler la méthode `fusion()` et vérifier le résultat

## 2. Conditions et boucles

- Écrire une fonction `greaterThan()` qui prend deux paramètres `a` et `b`
  - Cette fonction doit retourner le plus grand des deux nombres
  - Si l'un des deux n'est pas un nombre, afficher une erreur dans la console et retourner 0

- Écrire une fonction qui trie un tableau de nombres :
  - prend en paramètre un tableau (qui contient des nombres, normalement)
  - renvoie un nouveau tableau, avec les éléments dans l'ordre croissant (du plus petit au plus grand)
  - Tester avec `[11, 2, 54, 50, 26, 8, 91, 011, 15]` ou un tableau de votre choix

- Demander un nombre à l'utilisateur (fonction `prompt()`)
  - S'il entre autre chose qu'un nombre (vérifier avec `isNaN()`), continuer à lui demander un nombre (afficher le message tant que la réponse n'est pas conforme aux attentes)
  - Afficher avec `alert()` si le nombre qu'il a donné est pair ou impair

- Demander un nombre entre 0 et 100 à l'utilisateur (fonction `prompt()`)
  - S'il entre autre chose qu'un nombre (vérifier avec `isNaN()`), continuer à lui demander un nombre (afficher le message tant que la réponse n'est pas conforme aux attentes)
  - Afficher avec `alert()` si le nombre qu'il a donné est premier ou non (peut être divisé par un nombre plus petit, voir [une définition des nombres premiers pour plus d'information](https://fr.wikipedia.org/wiki/Nombre_premier))

## 3. DOM, événements et JQuery

Ajouter ce HTML dans la balise `body` de votre fichier `revisions.html`.

```html

<form action="" class="form">
    <div>
        <label for="username">Nom d'utilisateur</label>
        <input id="username" type="text">
    </div>
    <div>
        <label for="password">Mot de passe</label>
        <input id="password" type="password">
    </div>
    <button type="submit">Valider</button>
</form>
<article id="article-1">
    <section class="section">
        <header>
            <h2 class="title">
                Ceci est un titre
            </h2>
            <a href="" class="readMore">
                Plus d'informations
            </a>
        </header>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu fringilla ante. Mauris dui leo, convallis sed semper vitae, commodo ultrices erat. Sed condimentum purus at maximus laoreet. Vestibulum in auctor tellus. Nulla placerat, magna in pulvinar sodales, arcu neque efficitur magna, a maximus enim orci eu sem. Cras faucibus sem quis nisl
            tincidunt, at mollis magna blandit. Donec nec ornare libero. Nunc nec varius purus, ut feugiat neque. Sed dolor magna, sodales quis vehicula in, venenatis et augue. Integer varius augue ut ultricies efficitur. Maecenas eget elit gravida, rutrum risus sed, pulvinar velit. Nulla facilisi.
        </p>
        <p>
            Maecenas vel convallis nunc. Proin urna felis, interdum vitae justo sit amet, scelerisque faucibus nisi. Curabitur sed nisl non diam vulputate suscipit sit amet nec nibh. Vivamus tincidunt tristique tempus. Cras pulvinar diam eu nisi tempus mollis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
            Praesent in porttitor enim. Phasellus consectetur dapibus metus, et fermentum dolor fringilla eget.
        </p>
        <p>
            Duis in neque nec neque faucibus rutrum quis at erat. Sed pellentesque, ligula sed malesuada euismod, purus felis laoreet nibh, vel consectetur dolor ex eu orci. Quisque et semper ipsum. Nullam varius sapien quis mauris viverra, non euismod dui porttitor. Phasellus tincidunt accumsan ultricies. Fusce sodales porta rhoncus. Ut interdum leo at ante
            aliquet gravida.
        </p>
    </section>
    <section class="section">
        <header>
            <h2 class="title">
                Ceci est un titre
            </h2>
            <a href="" class="readMore">
                Plus d'informations
            </a>
        </header>
        <p>
            Nam fringilla metus a lorem sodales, non vestibulum sem volutpat. Phasellus suscipit nibh ultricies arcu feugiat, nec gravida nunc lobortis. Etiam urna sapien, rutrum sit amet aliquam sed, aliquet at neque. Fusce pellentesque tortor elit, non congue massa rhoncus nec. Etiam vel eleifend nisl, hendrerit gravida ipsum. Fusce ac ultricies lorem. In
            sed tincidunt turpis. Curabitur scelerisque quam in porta pellentesque. Praesent egestas luctus erat. Nulla facilisi. Curabitur et dui urna. Nulla suscipit scelerisque metus. Etiam nec consectetur orci. Nulla interdum mollis pulvinar.
        </p>
        <p>
            Vestibulum ac fermentum sem. Pellentesque tristique volutpat tortor non pharetra. Nullam risus nunc, tincidunt a eleifend eu, hendrerit id ex. Sed suscipit hendrerit nisl vel fermentum. Integer egestas leo ipsum, non scelerisque massa lacinia sed. Nam auctor felis dui, eu eleifend sem sollicitudin ut. Vivamus aliquam urna tincidunt, elementum
            neque at, ornare lectus. Nullam eu metus at ligula tincidunt suscipit. Morbi malesuada neque vel elit ullamcorper fringilla. Aliquam interdum, turpis et pharetra commodo, lacus orci lacinia enim, nec suscipit lectus nunc efficitur ante. Curabitur id eros erat.
        </p>
        <p>
            Cras eros sapien, dapibus sit amet varius iaculis, dictum non urna. Mauris consequat odio vitae vulputate tincidunt. Aenean vel laoreet augue. In arcu ipsum, volutpat quis pulvinar non, porta non nibh. Mauris eu suscipit urna, a placerat sem. Aliquam erat volutpat. Aliquam sed magna purus. Nullam volutpat sit amet est at facilisis. Morbi laoreet,
            tellus nec pellentesque fringilla, felis est tempor nisi, ut aliquam urna nisl sit amet eros. Vivamus neque massa, luctus quis porttitor a, accumsan et nisi. Aliquam erat volutpat. Donec fringilla imperdiet sapien, laoreet porta metus euismod ac. Vestibulum eget eleifend dolor. Aliquam pulvinar risus at suscipit tincidunt. Phasellus at enim
            pretium, condimentum orci in, lobortis nisl.
        </p>
    </section>
    <section class="section">
        <header>
            <h2 class="title">
                Ceci est un titre
            </h2>
            <a href="" class="readMore">
                Plus d'informations
            </a>
        </header>
        <p>
            Donec at odio vulputate, ullamcorper lorem sit amet, pharetra magna. Nam quis dolor massa. Aenean vitae nisl lorem. Aenean non feugiat odio, id gravida sem. Sed fringilla euismod ornare. Nunc ac purus sit amet nulla bibendum dapibus et nec sapien. Mauris nec tempus eros, vestibulum condimentum metus. Donec euismod metus nunc, nec euismod neque
            semper eu. Cras a magna in mauris tristique tincidunt. Pellentesque ut eros sit amet eros dictum malesuada eget sit amet magna.
        </p>
        <p>
            Integer a mi nibh. Ut a elementum tellus, at finibus diam. Curabitur finibus ex sit amet purus rutrum, eu condimentum massa condimentum. Vivamus sed leo in dolor vehicula facilisis ac eget sem. Ut eget pellentesque nisl. Ut consectetur vulputate enim. Cras facilisis dui ut dui sagittis, a dignissim neque accumsan. Curabitur in magna justo. Proin
            nec placerat massa. Curabitur id lacus nisi. Nam id diam magna. Maecenas elementum nisi nisl, sit amet rhoncus massa venenatis in.
        </p>
        <p>
            Mauris mollis tellus est, non scelerisque ante cursus quis. Suspendisse mattis quam felis, ut faucibus lectus rutrum eget. Pellentesque id diam suscipit, consequat eros in, condimentum nunc. Nullam a nunc at metus rutrum mollis sollicitudin pretium est. Vestibulum ac eleifend nisi. Pellentesque habitant morbi tristique senectus et netus et
            malesuada fames ac turpis egestas. Duis ultricies tortor massa, eget semper ligula ornare nec. Ut faucibus, mauris vitae malesuada gravida, metus dolor pretium velit, at pretium leo metus eget dui. Fusce luctus urna ut est imperdiet, gravida auctor erat suscipit.
        </p>
    </section>
</article>
<article id="article-2">
    <section class="section">
        <header>
            <h2 class="title">
                Ceci est un titre
            </h2>
            <a href="" class="readMore">
                Plus d'informations
            </a>
        </header>
        <p>
            Pellentesque congue aliquam vulputate. Nulla et leo varius, pellentesque purus quis, euismod odio. Sed ut ex at felis placerat pharetra. Proin lobortis vulputate ante. Mauris bibendum lorem non odio placerat, eu porta erat blandit. Suspendisse laoreet dolor eu ornare imperdiet. Vivamus pellentesque pretium diam, vitae varius justo vestibulum sit
            amet.
        </p>
    </section>
</article>
```

:warning: Attention

Nous allons également créer un fichier `dom.js` dans lequel nous allons travailler (attention à bien remplacer `revisions.js` par `dom.js` dans votre balise `<script>` pour éviter que vos `prompt()` s'affichent à chaque chargement).

- Ajouter JQuery à votre projet (et inclure la balise `<script>` nécessaire avant celui de `dom.js`)

- Sélectionner tous les paragraphes
  - avec VanillaJS et leur ajouter la classe `paragraph`
  - avec JQuery et leur ajouter la classe `paragraph-jq`

- Sélectionner le deuxième paragraphe de chaque section
  - avec VanillaJS et leur ajouter l'attribut `data-position` avec la valeur `"second"`
  - avec JQuery et leur ajouter l'attibut `data-position-jq` avec la valeur `"second"`
  
- Ajouter un événement `submit` sur la balise `form` et empêcher le rechargement de la page lorsqu'on clique sur le bouton `Valider`
  - Avec VanillaJS
  - Avec JQuery
  
- Ajouter un événement `click` sur tous les liens avec la classe `readMore`, empêcher le changement de page lors du clic sur le lien et afficher le contenu du paragraphe `p` le plus proche avec `alert()`
  - Avec VanillaJS
  - Avec JQuery
  
## 4. AJAX

Nous allons créer un fichier `ajax.js` dans lequel nous allons travailler (attention à bien remplacer `dom.js` par `ajax.js` dans votre balise `<script>`).

Utilisons l'API fournie ici : [https://cataas.com/#/](https://cataas.com/#/)
On y récupère des images de chats et nous allons récupérer les informations en json avant de les afficher.

Ajouter le HTML suivant au début du body de votre fichier `revisions.html` : 
```html
<button id="cat-button" type="button">Give me a cat !</button>
<img id="cat-image" src="" alt="">
<div id="cat-tags"></div>
```

- Ajouter un événement au clic sur le bouton. Lors du clic :
  - Récupérer en AJAX (avec VanillaJS ou JQuery, comme vous préférez), les informations de `https://cataas.com/cat/gif?json=true`
    - Utiliser la propriété `url` de l'objet JSON récupéré pour remplacer l'attribut `src` de l'image
    - Utiliser la propriété `tags` de l'objet JSON récupéré en AJAX
      - remplacer le contenu de la `div` avec l'id `cat-tags`, 
      - ajouter des éléments `<span class="catTag">{tag}</span>` (remplacer `{tag}` par une valeur réelle) pour chaque tag de la propriété `tags`

## English version

Let's practice everything we saw ;).

Create a file named `revisions.html` (with base html skeleton) and link it to a new file, named `revisions.js`. We will mostly work in these two files (unless specified, off course).

### 1. Language

In `revisions.js` :

- Write a `square()` function. It will compute the square value of a number `n` (`n * n`) and return the result
  - Write 2 calls of this function and display its result in the console

- Écrire une fonction `compact()` qui prend 2 paramètres (`a` et `b` par exemple) et qui retourne un tableau composé de ces deux paramètres.
  - Write 2 calls of this function and display its result in the console

- Create an array with these values: `42`, `'test'`, `242.68`
- Use a method seen to find the value `'test'` and to display its index in the console

- Create a literal object with:
  - a property `a` with a value: `42`
  - a property `b` with a value: `test`
  - a method named `fusion` returning the fusion of `a` and `b`
- Call the `fusion()` method and check the result

### 2. Conditions and loops

- Write a fonction `greaterThan()` with two parameters `a` and `b`
  - This function must return the greater number
  - If one of the parameters is not a number, return 0

- Write a function that will order an array
  - Takes an array (with only numbers in it) as a parameter
  - Returns a new array, in which every elements are ordered (smallest first)
  - Test with `[11, 2, 54, 50, 26, 8, 91, 011, 15]` or any array you want

- Ask the user a number (with the `prompt()` function)
  - If the user enters something that is not a number (check with `isNaN()`), keep asking for a number
  - Display a message with the `alert()` function and tell the user if the number was odd or not

- Ask the user a number between 0 and 100 (with the `prompt()` function)
  - If the user enters something that is not a number (check with `isNaN()`), keep asking for a number
  - Display a message with the `alert()` function and tell the user if the number is a prime number or not ([Prime Number on Wikipedia](https://en.wikipedia.org/wiki/Prime_number))

### 3. DOM, events and JQuery

Ajouter ce HTML dans la balise `body` de votre fichier `revisions.html`.

```html

<form action="" class="form">
    <div>
        <label for="username">Nom d'utilisateur</label>
        <input id="username" type="text">
    </div>
    <div>
        <label for="password">Mot de passe</label>
        <input id="password" type="password">
    </div>
    <button type="submit">Valider</button>
</form>
<article id="article-1">
    <section class="section">
        <header>
            <h2 class="title">
                Ceci est un titre
            </h2>
            <a href="" class="readMore">
                Plus d'informations
            </a>
        </header>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu fringilla ante. Mauris dui leo, convallis sed semper vitae, commodo ultrices erat. Sed condimentum purus at maximus laoreet. Vestibulum in auctor tellus. Nulla placerat, magna in pulvinar sodales, arcu neque efficitur magna, a maximus enim orci eu sem. Cras faucibus sem quis nisl
            tincidunt, at mollis magna blandit. Donec nec ornare libero. Nunc nec varius purus, ut feugiat neque. Sed dolor magna, sodales quis vehicula in, venenatis et augue. Integer varius augue ut ultricies efficitur. Maecenas eget elit gravida, rutrum risus sed, pulvinar velit. Nulla facilisi.
        </p>
        <p>
            Maecenas vel convallis nunc. Proin urna felis, interdum vitae justo sit amet, scelerisque faucibus nisi. Curabitur sed nisl non diam vulputate suscipit sit amet nec nibh. Vivamus tincidunt tristique tempus. Cras pulvinar diam eu nisi tempus mollis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
            Praesent in porttitor enim. Phasellus consectetur dapibus metus, et fermentum dolor fringilla eget.
        </p>
        <p>
            Duis in neque nec neque faucibus rutrum quis at erat. Sed pellentesque, ligula sed malesuada euismod, purus felis laoreet nibh, vel consectetur dolor ex eu orci. Quisque et semper ipsum. Nullam varius sapien quis mauris viverra, non euismod dui porttitor. Phasellus tincidunt accumsan ultricies. Fusce sodales porta rhoncus. Ut interdum leo at ante
            aliquet gravida.
        </p>
    </section>
    <section class="section">
        <header>
            <h2 class="title">
                Ceci est un titre
            </h2>
            <a href="" class="readMore">
                Plus d'informations
            </a>
        </header>
        <p>
            Nam fringilla metus a lorem sodales, non vestibulum sem volutpat. Phasellus suscipit nibh ultricies arcu feugiat, nec gravida nunc lobortis. Etiam urna sapien, rutrum sit amet aliquam sed, aliquet at neque. Fusce pellentesque tortor elit, non congue massa rhoncus nec. Etiam vel eleifend nisl, hendrerit gravida ipsum. Fusce ac ultricies lorem. In
            sed tincidunt turpis. Curabitur scelerisque quam in porta pellentesque. Praesent egestas luctus erat. Nulla facilisi. Curabitur et dui urna. Nulla suscipit scelerisque metus. Etiam nec consectetur orci. Nulla interdum mollis pulvinar.
        </p>
        <p>
            Vestibulum ac fermentum sem. Pellentesque tristique volutpat tortor non pharetra. Nullam risus nunc, tincidunt a eleifend eu, hendrerit id ex. Sed suscipit hendrerit nisl vel fermentum. Integer egestas leo ipsum, non scelerisque massa lacinia sed. Nam auctor felis dui, eu eleifend sem sollicitudin ut. Vivamus aliquam urna tincidunt, elementum
            neque at, ornare lectus. Nullam eu metus at ligula tincidunt suscipit. Morbi malesuada neque vel elit ullamcorper fringilla. Aliquam interdum, turpis et pharetra commodo, lacus orci lacinia enim, nec suscipit lectus nunc efficitur ante. Curabitur id eros erat.
        </p>
        <p>
            Cras eros sapien, dapibus sit amet varius iaculis, dictum non urna. Mauris consequat odio vitae vulputate tincidunt. Aenean vel laoreet augue. In arcu ipsum, volutpat quis pulvinar non, porta non nibh. Mauris eu suscipit urna, a placerat sem. Aliquam erat volutpat. Aliquam sed magna purus. Nullam volutpat sit amet est at facilisis. Morbi laoreet,
            tellus nec pellentesque fringilla, felis est tempor nisi, ut aliquam urna nisl sit amet eros. Vivamus neque massa, luctus quis porttitor a, accumsan et nisi. Aliquam erat volutpat. Donec fringilla imperdiet sapien, laoreet porta metus euismod ac. Vestibulum eget eleifend dolor. Aliquam pulvinar risus at suscipit tincidunt. Phasellus at enim
            pretium, condimentum orci in, lobortis nisl.
        </p>
    </section>
    <section class="section">
        <header>
            <h2 class="title">
                Ceci est un titre
            </h2>
            <a href="" class="readMore">
                Plus d'informations
            </a>
        </header>
        <p>
            Donec at odio vulputate, ullamcorper lorem sit amet, pharetra magna. Nam quis dolor massa. Aenean vitae nisl lorem. Aenean non feugiat odio, id gravida sem. Sed fringilla euismod ornare. Nunc ac purus sit amet nulla bibendum dapibus et nec sapien. Mauris nec tempus eros, vestibulum condimentum metus. Donec euismod metus nunc, nec euismod neque
            semper eu. Cras a magna in mauris tristique tincidunt. Pellentesque ut eros sit amet eros dictum malesuada eget sit amet magna.
        </p>
        <p>
            Integer a mi nibh. Ut a elementum tellus, at finibus diam. Curabitur finibus ex sit amet purus rutrum, eu condimentum massa condimentum. Vivamus sed leo in dolor vehicula facilisis ac eget sem. Ut eget pellentesque nisl. Ut consectetur vulputate enim. Cras facilisis dui ut dui sagittis, a dignissim neque accumsan. Curabitur in magna justo. Proin
            nec placerat massa. Curabitur id lacus nisi. Nam id diam magna. Maecenas elementum nisi nisl, sit amet rhoncus massa venenatis in.
        </p>
        <p>
            Mauris mollis tellus est, non scelerisque ante cursus quis. Suspendisse mattis quam felis, ut faucibus lectus rutrum eget. Pellentesque id diam suscipit, consequat eros in, condimentum nunc. Nullam a nunc at metus rutrum mollis sollicitudin pretium est. Vestibulum ac eleifend nisi. Pellentesque habitant morbi tristique senectus et netus et
            malesuada fames ac turpis egestas. Duis ultricies tortor massa, eget semper ligula ornare nec. Ut faucibus, mauris vitae malesuada gravida, metus dolor pretium velit, at pretium leo metus eget dui. Fusce luctus urna ut est imperdiet, gravida auctor erat suscipit.
        </p>
    </section>
</article>
<article id="article-2">
    <section class="section">
        <header>
            <h2 class="title">
                Ceci est un titre
            </h2>
            <a href="" class="readMore">
                Plus d'informations
            </a>
        </header>
        <p>
            Pellentesque congue aliquam vulputate. Nulla et leo varius, pellentesque purus quis, euismod odio. Sed ut ex at felis placerat pharetra. Proin lobortis vulputate ante. Mauris bibendum lorem non odio placerat, eu porta erat blandit. Suspendisse laoreet dolor eu ornare imperdiet. Vivamus pellentesque pretium diam, vitae varius justo vestibulum sit
            amet.
        </p>
    </section>
</article>
```

:warning: Warning

Create a file named `dom.js`. We will work in this file for this section (warning, replace `revisions.js` by `dom.js` in `<script>` to avoid displaying `prompt()` calls on every page load).

- Add JQuery to your project (and include necessary `<script>` tag before `dom.js`)

- Select all paragraphs of the page
  - with VanillaJS and add the class `paragraph` to all of them
  - with JQuery and add the class `paragraph-jq` to all of them

- Select every second paragraphs of each section
  - with VanillaJS and add them the attribute `data-position` with the value `"second"`
  - with JQuery and add them the attribute `data-position-jq` with the value `"second"`
  
- Add a `submit` event on the `form` node and prevent page reloading when clicking on the `Valider` button
  - Do it with VanillaJS
  - Do it with JQuery
  
- Add a `click` event on every link with the `readMore` class, prevent page change on click on the link and display the content of the nearest `p` with `alert()`
  - Do it with VanillaJS
  - Do it with JQuery
  
### 4. AJAX

Create a new file `ajax.js` in which we will work for this part (warning, replace `dom.js` by `ajax.js` in `<script>`)

We will [get some data from this API](https://cataas.com/#/) as JSON objects, to display some cat's gifs.

Add this HTML in `revisions.html` (at the beginning of your `body`): 
```html
<button id="cat-button" type="button">Give me a cat !</button>
<img id="cat-image" src="" alt="">
<div id="cat-tags"></div>
```

- Add a `click` event on the button:
  - With AJAX (use JQuery ou VanillaJS, as you prefer), get some data from `https://cataas.com/cat/gif?json=true`
    - Use the `url` property of the JSON object to replace the `src` attribute of the image
    - Use the `tags` property of the JSON object
      - Replace the content of the `div` node (the one with `cat-tags` id), 
      - Add a node `<span class="catTag">{tag}</span>` (replace `{tag}` with a real value) for each tag in the `tags` property