# Webpack

[Site officiel](https://webpack.js.org/)

Webpack est un outil de compilation de vos modules javascript, mais il ne se limite pas à ça. Webpack va transformer vos fichiers javascript et faire en sorte de les compiler (convertir les fichiers pour améliorer la compatibilité par exemple) dans des *bundles* (paquets). Webpack crée un arbre de dépendances, afin de déterminer quelles resources doivent
être utilisées dans quel bundle (ce qui permet de réduire la taille de vos fichiers css/js ;) ).

## Pourquoi Webpack ?

Webpack permet de compiler de nombreux fichiers composant un site (JS, Sass, polices d'écritures (fonts), images, etc.) et d'y appliquer diverses opérations très simplement. L'un des principaux objectifs de Webpack est d'optimiser les différentes *modules* d'un site, pour ne charger que le minimum nécessaire pour chaque page. 

Dans un développement par composants (voir ReactJS, VueJS, Angular, etc.), webpack permet de ne charger que les composants nécessaires, les optimiser, voir améliorer la compatibilité avec les anciens navigateurs.

Webpack étant un logiciel libre, de nombreux outils supplémentaires ont également été développés, permettant d'étendre encore ses possibilités.

### D'autres outils plus anciens

Historiquement, d'autres outils (qu'on appelle task runners) permettaient de faire la même chose et Webpack en hérite directement.

- [Grunt](https://gruntjs.com/)
- [Gulp](https://gulpjs.com/)

Ces task runners avaient la fâcheuse tendance à être plutôt lourds à utiliser, nécessitant beaucoup de configuration pour être utilisable. Ils restent plutôt pratiques pour des sites légers, même si Webpack reste plus simple à mettre en place et à utiliser.

## Installer Webpack

[La documentation d'installation](https://webpack.js.org/guides/installation/)

Pré-requis : 

- [Nodejs](https://nodejs.org/fr/) (version 10 minimum, dernière LTS conseillée)

Pour lancer l'installation, utiliser les commandes suivantes :

```shell
npm install --save-dev webpack

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
        filename: 'app.bundle.js', // Crée un fichier ./dist/app.bundle.js
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
        filename: '[name].bundle.js', // Crée les fichiers ./dist/app.bundle.js et ./dist/admin.bundle.js
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
        filename: 'app.bundle.js', // Crée un fichier ./dist/app.bundle.js
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
        filename: 'app.bundle.js', // Crée un fichier ./dist/app.bundle.js
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

Un autre exemple de plugin utile : [recevoir des notifications quand le build est terminé](https://github.com/Turbo87/webpack-notifier#readme) 

### Mode

[La documentation sur les modes](https://webpack.js.org/configuration/mode)

Le mode fourni un ensemble d'outils prédéfinis (et personnalisables) selon l'environnement (développement ou production).

```js
module.exports = {
  mode: 'production' // ou 'development' ou 'none'
};
```

En production, plusieurs plugins d'optimisation sont activés, alors qu'en développement des outils de développement pour aider à débugguer les modules.

## Des outils 

- Une [liste des loaders](https://webpack.js.org/loaders/) est fournie par Webpack et nous utiliserons certains d'entre eux dans un exercice.

- Des [guides sont fournis et permettent de prendre en main Webpack](https://webpack.js.org/guides/)

- Aller plus loin dans [la configuration de Webpack](https://webpack.js.org/configuration/)

- Un exemple de [configuration Webpack (très) complexe et complète](/assets/exemple-webpack.zip)

## En pratique

Nous allons maintenant tenter de mettre en place Webpack dans un projet contenant du javascript et du sass et expérimenter sur quelques plugins et outils.
