# Webpack

[Site officiel](https://webpack.js.org/)

Webpack est un outil de compilation de vos modules javascript, mais il ne se limite pas à ça. Webpack va transformer vos fichiers javascript et faire en sorte de les compiler (convertir les fichiers pour améliorer la compatibilité par exemple) dans des *bundles* (paquets). Webpack crée un arbre de dépendances, afin de déterminer quelles resources doivent
être utilisées dans quel bundle (ce qui permet de réduire la taille de vos fichiers css/js ;) ).

## Installer Webpack

[La documentation d'installation](https://webpack.js.org/guides/installation/)

Pré-requis : 

- [Nodejs](https://nodejs.org/fr/) (version 10 minimum, dernière LTS conseillée)

Pour lancer l'installation, utiliser une des commandes suivantes :

```shell
npm install --save-dev webpack
# Ou une version spécifique
npm install --save-dev webpack@<version>
```

De la même manière, il faut installer l'outil en ligne de commande : 

```shell
npm install --save-dev webpack-cli
```

## Concepts principaux

[La documentation officielle](https://webpack.js.org/concepts/)

La configuration de Webpack se fait dans un fichier `webpack.config.js`, se trouvant généralement à la racine de votre projet.

Avant toute chose, il nous faut définir ces termes (et voir des applications pratique de configuration) :

- Entrée / Entry
- Sortie / Output
- Loaders
- Plugins
- Mode

### Entrée / Entry

[La documentation sur les entrée](https://webpack.js.org/concepts/entry-points/) et [la configuration complète des entrées](https://webpack.js.org/configuration/entry-context/)

Une entry (ou entrée en français) est un point d'entrée pour la compilation. C'est à partir de *ce(s) fichier(s)* que Webpack va créer un arbre de dépendances. La plupart du temps, il s'agit d'un fichier Javascript (par défaut, Webpack va chercher le fichier `src/index.js`).

Pour définir/changer nos points d'entrée, voici un exemple de `webpack.config.js` :

```js
module.exports = {
    entry: './assets/js/app.js',
};
```

Un autre exemple avec plusieurs points d'entrée :

```js
module.exports = {
    entry: {
        main: './assets/js/app.js',
        admin: './assets/js/admin.js'
    },
};
```

### Sortie / Output

[La documentation sur les sorties](https://webpack.js.org/concepts/output/) et [la configuration complète de la propriété output](https://webpack.js.org/configuration/output/)

Cette propriété définie le ou les fichiers créés par Webpack et où les ranger. La propriété output a elle-même 2 propriétés : `path` (dans quel dossier ranger le fichier en sortie) et `filename` (comment nommer les fichiers).

```js
module.exports = {
    entry: './assets/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js', // Crée un fichier ./dist/app.js
    }
};
```

Un autre exemple avec plusieurs points d'entrée :

```js
module.exports = {
    entry: {
        main: './assets/js/app.js',
        admin: './assets/js/admin.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js', // Crée les fichiers ./dist/app.js et ./dist/admin.js
    },
};
```

### Loaders

[La documentation sur les loaders](https://webpack.js.org/concepts/loaders/)

Par défaut, Webpack ne comprends que les fichiers JS et JSON. Les loaders lui permettent de traiter d'autres types de fichiers (css, sass, etc.), pour les traiter / compiler. Les loaders ont besoin de 2 propriétés : `test` pour définir quels fichiers sont concernés et `use` pour dire quel loader doit être utilisé pour transformer le fichier.

Imaginons que nous importons des fichiers `.scss` ([langage Sass](https://sass-lang.com/), préprocesseur CSS) dans nos fichiers Javascript. Pour qu'ils soient traités par Webpack (et donc, compilés en css), nous devons appeler un loader `sass-loader` :

```js
module.exports = {
    entry: './assets/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js', // Crée un fichier ./dist/app.js
    },
    module: {
        rules: [
            {test: /\.scss$/, use: 'sass-loader'}
        ]
    }
};
```

Quand un fichier dont le nom se termine par `.scss` est rencontré, Webpack va transmettre le fichier pour traitement au `sass-loader` et l'ajouter au bundle/paquet.

:warning: Noter la valeur de test, qui est une expression régulière, qu'on peut écrire `/\.scss$/`, `"/\.scss$/"` ou `'/\.scss$/'`

### Plugins

[La documentation sur les plugins](https://webpack.js.org/concepts/plugins/) et [la liste des plugins officiels disponibles](https://webpack.js.org/plugins/)

Webpack compile des modules (fichiers), et les plugins permettent d'ajouter des comportements et fonctionnalités supplémentaires (optimisation du code, gestion de fichiers, etc.).


```js
const HtmlWebpackPlugin = require('html-webpack-plugin'); // Installé avec Npm
const webpack = require('webpack'); // Pour accéder aux plugins inclus dans Webpack

module.exports = {
    entry: './assets/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js', // Crée un fichier ./dist/app.js
    },
    module: {
        rules: [
            {test: /\.scss$/, use: 'sass-loader'}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'})
    ]
};
```

### Mode

[La documentation sur les modes](https://webpack.js.org/configuration/mode)

Le mode fourni un ensemble d'outils prédéfinis (et personnalisables) selon l'environnement (développement ou production).

```js
module.exports = {
  mode: 'production' // ou 'development' ou 'none'
};
```

En production, plusieurs plugins d'optimisation sont activés, alors qu'en développement des outils de développement pour aider à débugguer les modules.

