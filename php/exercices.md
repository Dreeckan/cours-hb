# Exercices PHP

Pré-requis :
- avoir un environnement de travail (Wamp/Xampp ou équivalent)
- avoir des bases de PHP

## Utilisation des tableaux

- Créer une page html (balise `html`, `body`) dans un fichier PHP (`index.php` par exemple)
- y créer un tableau PHP contenant ces produits :
    - Bonnet en laine
    - Bonnet en laine bio
    - Bonnet en laine et cachemire
    - Bonnet arc-en-ciel
- afficher ces produits dans le html en utilisant une boucle (foreach conseillé), dans une `table`

## Tableaux imbriqués

- Complexifions les données et transformons nos données en tableaux :
    - Bonnet en laine : 10€
    - Bonnet en laine bio : 14€
    - Bonnet en laine et cachemire : 20€
    - Bonnet arc-en-ciel : 12€
- Tous les produits vont également avoir la même description : `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a leo diam. Quisque lorem orci, accumsan quis dolor sed, gravida.`
- Mettre à jour l'affichage en conséquence

## Conditions

- Si un prix est inférieur ou égal à 12€, afficher le prix en vert, sinon l'afficher en bleu.

## Fonctions

- Nos prix étaient ici TTC (incluaient la TVA), nous allons faire une fonction calculant le montant hors taxes d'un produit.
- Afficher les prix HT dans la colonne avant celle des prix TTC

## Manipulation des chaines de caractère et des variables

- Faire une fonction qui affiche un produit (va reprendre l'affichage d'une ligne du tableau)
- Appeler cette fonction dans la boucle

## Séparation des fichiers

- Séparer le code en plusieurs fichiers
    - Un fichier pour les variables
    - Un autre pour les fonctions
    - Un pour le HTML
- Appeler ces fichiers dans le HTML 

## Utiliser git

- Créer un projet sur Github ou Gitlab (si vous souhaitez le mettre en privé, invitez `Dreeckan` ou `remi@drakona.fr` sur le projet)
- Initialiser le repository local et créer votre fichier (vide pour l'instant) `.gitignore`
- Pusher votre code sur Github ou Gitlab
- Partager le lien (en privé sur Discord ou en m'invitant sur le projet)
- Créer une branche `ajout-layout` pour l'exercice suivant

## Mise en place d'un layout

Ce que j'appelle layout : nous allons découper notre HTML pour en extraire les éléments communs (balises `<html>`, `<head>`, `<body>`, etc.) et les mettre dans des fichiers qui vont être inclus dans toutes nos pages.

- Créer un dossier `includes` et y ajouter les fichiers contenant les variables et les fonctions
- Dans ce dossier, y ajouter un fichier `header.php` et un fichier `footer.php`

## Header

- Dans `header.php`, déplacer les includes des fichiers de variables et de fonctions (remplacer les includes par des `require_once` et rechercher ce que fait cette fonction)
- Ajouter le html qui va être commun à toutes nos pages (balises `<html>`, `<head>`, `<body>`, etc.)
- Inclure le fichier `header.php` dans la page de liste des bonnets

## Footer

- Dans `footer.php`, ajouter le html commun à toutes nos pages se trouvant après le php
- Inclure ce fichier `footer.php` dans la page de liste

## Création d'une page d'accueil

- Renommer le fichier contenant la liste des bonnets en `list.php` (surtout si, comme moi, vous l'avez appelé `ìndex.php`)
- Créer un nouveau fichier `index.php` et y appeler nos header et footer (pour inclure les éléments communs à toutes les pages)
- Inclure le style et le js de Bootstrap (version 4), [disponible ici](https://getbootstrap.com/docs/4.5/getting-started/introduction/)

## Création d'une page d'accueil (suite)

- Inclure sur cette page une liste des 3 premiers bonnets de notre liste (chacun prendra 1/3 de la page en largeur)
- Leur trouver une image pour les rendre plus jolis (je laisse ça à votre jugement ;)) et ajouter le lien de cette image dans les données
- Utiliser [les cards de Bootstrap](https://getbootstrap.com/docs/4.5/components/card/) pour les mettre en forme

## Lier nos pages

- Dans la page d'accueil, sous les 3 produits, ajouter un lien vers list.php (`Voir tous les produits`)
- Le mettre en forme avec Bootstrap (en lui appliquant la classe des boutons par exemple)

## Faire relire votre code

- Créer une Pull Request (ou Merge Request si vous êtes sur Gitlab)
- Mettez-vous en groupe (si ce n'est déjà fait) et invitez-vous sur vos projets respectifs
- Relisez le code des autres et faites-leur vos retours sur leur code

## Mettre en place un menu

- Créer une nouvelle branche (git) (nommée par exemple `ajout-session`) et y travailler
- Ajouter un menu en haut de toutes les pages
- Mettre un lien vers la page `index.php` et un autre vers `list.php`
- Le mettre en forme avec Bootstrap (composant [navbar](https://getbootstrap.com/docs/4.5/components/navbar/) par exemple) 

## Créer une page de connexion

- Créer une page `login.php` (à la racine du projet, avec les autres pages)
- Y ajouter un formulaire de connexion (un champ login, un champ password et un bouton de validation)
- Le mettre en forme avec Bootstrap
- Afficher le login de l'utilisateur dans le menu à la soumission du formulaire
- Cette valeur (`$_POST['login']`) pouvant ne pas exister, bien s'assurer de son existence avant affichage

## Mise en place de la session

- Ajouter le `session_start()` à l'endroit adéquat
- Lors de la connexion de l'utilisateur, mettre son login en session
- Afficher ce login depuis la session, s'il est disponible

## Créer une page de déconnexion

- Créer une page `logout.php`
- Chercher comment déconnecter un utilisateur (fermer sa session)
- L'appliquer sur cette page et ajouter un message pour l'utilisateur (`Vous êtes bien déconnecté.e`)
- Mettre en forme avec Bootstrap (composant [alerts](https://getbootstrap.com/docs/4.5/components/alerts/) par exemple)

## Vérification du mot de passe

- Ajouter (dans `vars.php` par exemple) une valeur de mot de passe attendue (par exemple 'toto')
- Dans le formulaire de connexion, vérifier que le mot de passe est correct
  - Si ça n'est pas le cas, afficher un message d'erreur
  - Si c'est le cas, afficher un message de réussite et ajouter le login dans la session
- Vérifier également que le login n'est pas vide (et afficher un message d'erreur)

## Créer une PR (Pull Request)

- Créer une Pull Request
- Invitez quelqu'un.e qui n'est pas votre voisin.e sur votre projet
- Faites vous inviter par cette personne également
- Relisez le code et faites vos retours
- Approuvez (ou non) sa PR
- Une fois votre PR validée par un.e pair.e, vous pouvez la fusionner (merge)

## Ajouter des éléments au panier

- Sur la page de liste (`list.php`), ajouter un bouton "Ajouter au panier" (on ajoute un seul élément à la fois dans le panier)
- Gérer l'ajout au panier d'un élément (passer un identifiant (à ajouter dans la liste des produits) qui sera récupéré avec `$_GET`)
- Les éléments doivent être présents dans la session

### exemple de format de `$_SESSION['cart']`

```php
[
    666 => 2, // 2 éléments avec l'id 666 sont dans le panier
    32 => 1, // 1 élément avec l'id 32 est présent dans le panier
];
```

## Afficher les éléments du panier

- Créer une page `cart.php` (si ça n'est pas déjà fait) dans laquelle vous allez afficher le panier
- Ajouter des boutons (liens) pour ajouter ou supprimer des éléments déjà présents
- Calculer et afficher le prix pour chaque ligne (`$price * $quantity`)
- Calculer et afficher le prix total du panier
- Ajouter un bouton pour vider le panier
- Le panier doit être disponible même si l'utilisateur n'est pas connecté

## Créer une PR (Pull Request)

- Créez une Pull Request
- Invitez quelqu'un.e sur votre projet
- Faites vous inviter par cette personne également
- Relisez le code et faites vos retours (vérifiez que le code valide bien les normes PSR-1 **et** PSR-12, par exemple)
- Approuvez (ou non) sa PR
- Une fois votre PR validée par un.e pair.e, vous pouvez la fusionner (merge) 

## Ajouter un formulaire de contact

- Trois champs :
  - Sujet (champ de type text)
  - Email (pour recontacter la personne) (champ de type email)
  - Message (champ de type textarea)
- Contraintes (valider que les champs correspondent à ces critères, tant en html que PHP) :
  - Sujet non vide (Attention au cas `' '`)
  - Email valide (non vide et de la forme `test@test.test`)
  - Message non vide (Attention au cas `' '`)

### Formulaire de contact, indices

- Il existe une fonction PHP qui va vérifier la validité d'une variable (dont un email)
- Il faut passer les données en POST dans votre formulaire
- Vous pouvez ajouter une validation au niveau du HTML, mais il faudra quand même faire la validation PHP (il est facile de contourner la validation HTML) 

## Pull Request

- Créez une Pull Request
- Invitez quelqu'un.e sur votre projet
- Faites vous inviter par cette personne également
- Relisez le code et faites vos retours (vérifiez que le code valide bien les normes PSR-1 **et** PSR-12, par exemple)
- Approuvez (ou non) sa PR
- Une fois votre PR validée par un.e pair.e, vous pouvez la fusionner (merge)

## Utilisation des objets

- Créer une nouvelle branche git `utilisation-objets`
- Création d'une première classe `Beanie` qui va stocker nos données de bonnets
- Ajouter des constantes (tailles et matières) pour définir les valeurs du formulaire de tri
- Définir propriétés et méthodes
- Remplacer les tableaux dans `$mesProduits` par des objets (`$mesProduits` devient alors un tableau contenant des objets `Beanie`)
- Mettre à jour nos différentes pages en conséquence 

## Pull Request

- Créez une Pull Request
- Invitez quelqu'un.e sur votre projet
- Faites vous inviter par cette personne également
- Relisez le code et faites vos retours (vérifiez que le code valide bien les normes PSR-12 **et** PSR-4, par exemple)
- Approuvez (ou non) sa PR
- Une fois votre PR validée par un.e pair.e, vous pouvez la fusionner (merge) 

## Liste et filtres

- Créer une nouvelle branche git `ajout-filtres`
- Sur la liste des produits `list.php`, ajouter des filtres (formulaire, avec la `method` à `GET`) :
  - Par taille (S, M, L, XL)
  - Par matière (laine, soie, coton, cachemire, etc.)
  - Par prix (avec un minimum et un maximum)
- Ajouter ces éléments dans vos données 
  - Un bonnet peut avoir plusieurs tailles disponibles
  - peut avoir plusieurs matières 

## Liste et filtres (aides)

- On va ajouter un formulaire pour ces filtres (3 champs, dont 2 champs `<select>`), que l'on va ajouter avant le tableau de `list.php`
- Les tailles et les matières vont être rangées dans des constantes de classe et ce sont ces constantes qu'on va appeler pour afficher le contenu de nos `<select>`, en appelant le tableau `Beanie::AVAILABLE_SIZES` par exemple.
- Pour filtrer les éléments de notre tableau de données, on va utiliser la fonction `array_filter()` 

## Retenir les valeurs entrées dans notre formulaire

- Dans le formulaire de filtre, quand une valeur est définie (par exemple : `$minPrice = 5`), on veut qu'elle apparaisse de nouveau dans le formulaire (par défaut, les valeurs sont remises à zéro). 

## Pull Request

- Créez une Pull Request
- Invitez quelqu'un.e sur votre projet
- Faites vous inviter par cette personne également
- Relisez le code et faites vos retours (vérifiez que le code valide bien les normes PSR-12 **et** PSR-4, par exemple)
- Approuvez (ou non) sa PR
- Une fois votre PR validée par un.e pair.e, vous pouvez la fusionner (merge)