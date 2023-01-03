# Exercices

## Manipuler les bases de Git et GitHub

Dans un premier temps, voyons pour manipuler Git sur un projet individuel, pour personnaliser votre profil GitHub et en faire un CV.

- Créer un dépôt sur GitHub, portant le même nom que votre compte (mon pseudo GitHub est `Dreeckan`, je crée un dépôt `Dreeckan`). 
- Récupérer ce projet sur votre machine 
- Ouvrir le projet dans VS Code

- Créer/modifier le fichier `README.md`
  - Ajouter/modifier un titre de niveau 1 cohérent (par exemple, votre nom)
  - Ajouter un autre titre, de niveau 2 (par exemple, "Mes compétences")
  - Ajouter d'autres titres pour définir un squelette/plan pour votre profil
- Créer un commit avec ces nouvelles informations

- Ajouter du contenu dans les différentes sections créées (par exemple, une liste de vos compétences). Créer au moins :
  - une liste à puce
  - un paragraphe de texte
  - une image et/ou un lien
- Créer un commit avec ces nouvelles informations
- Pousser ces modifications sur GitHub
- Vérifier que toutes vos modifications sont présentes sur GitHub et visible sur votre profil publique ([https://github.com/Dreeckan](https://github.com/Dreeckan) dans mon cas)


## Bonnes pratiques Git

Nous allons maintenant créer un nouveau projet en solitaire, pour nous habituer aux bonnes pratiques de Git et GitHub.

- Créer un dépôt privé sur GitHub
- Récupérer ce projet sur votre machine 
- Ouvrir le projet dans VS Code

- Créer un fichier `README.md`
- Lui donner un titre principal (comme `Une documentation intéressante`)
- Créer un commit 
- Pousser ces modifications sur GitHub

- Créer deux nouveaux fichiers `index.html` et `index.js`
- Ajouter un titre secondaire (comme `Une section passionnante`)
- Modifier le commit précédent pour intégrer ces modifications
- Pousser ces modifications sur GitHub (s'attendre à un souci, nous avons modifié l'historique ;) )

- Créer une nouvelle branche `2-la-suite`
- Ajouter du contenu dans `index.js` :

```js
console.log('OK');
```

- Ajouter du contenu dans `index.html` :

```html
<p>Un texte de test</p>
```

- Pousser cette branche et créer une Pull Request

- Revenir sur la branche principale (`main`)
- Créer une nouvelle branche `3-gestion-de-conflit`
- Ajouter du contenu dans `index.js` :

```js
console.log('Conflit en approche');
```

- Ajouter du contenu dans `index.html` :

```html
<p>Un texte de test, qui va poser problème, non ?</p>
```

- Pousser cette branche et créer une Pull Request
- Fusionner une première Pull Request
- Constater le conflit empêchant de fusionner la seconde Pull Request
- Résoudre le conflit sur votre machine
- Pousser à nouveau la branche
- Fusionner la Pull Request correspondante

## Travailler en équipe

Maintenant que nous avons travaillé en solo, créons un projet à plusieurs et gérons des conflits.

- Former une équipe (au moins 2 personnes)
- Créer un dépôt **publique** sur GitHub (une seule personne le crée) et inviter les autres en tant que collaborateurs sur le projet.
- Configurer le projet pour :
  - protéger la branche `main` (on ne doit pas pouvoir faire de `push --force` sur cette branche)
  - obliger les `Pull Requests` à être relues par tous les membres du projet - 1 (si vous êtes 4, il doit y avoir 3 approbations)

- Un membre de l'équipe va créer le projet en local (sur sa machine), y créer un fichier `README.md`, un premier commit et le pousser.
- Les autres pourront alors récupérer le projet en le clonant.

- Chacun va créer une branche (portant votre nom, par exemple). Par convention, on écrit les noms de branche en snake-case (tout en minuscule, en séparant les mots par des tirets `-`).
- Dans votre branche :
  - Créer un fichier portant votre nom (sans espace dans le nom), au format MarkDown
  - Y ajouter un peu de contenu (titre, un peu de texte, une image... Comme vous le souhaitez ;) )
  - Ajouter un lien **relatif** vers ce fichier dans le fichier `README.md`
  - Créer un dossier `images` dans le projet, y ajouter une image et l'appeler dans le fichier portant votre nom.
  - Créer un ou des commits, puis pousser les modifications
  - Créer une `Pull Request` sur GitHub
  - La faire relire par vos collègues

- Une fois une `Pull Request` validée, elle peut être fusionnée
  - Si vous avez des conflits, les résoudre (conseil : faites-le en groupe ;) )

