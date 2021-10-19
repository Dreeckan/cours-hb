# Exercices PHP

Pré-requis :
- avoir un environnement de travail ([Wamp](https://www.wampserver.com/) / [Xampp](https://www.apachefriends.org/fr/index.html) / [Mamp](https://www.mamp.info/en/downloads/) ou équivalent)
- avoir des bases de PHP

## 1. Utilisation des tableaux

- Créer une page html (balise `html`, `body`) dans un fichier PHP (`index.php` par exemple)
- y créer un tableau PHP contenant ces produits :
    - Bonnet en laine
    - Bonnet en laine bio
    - Bonnet en laine et cachemire
    - Bonnet arc-en-ciel
- afficher ces produits dans le html en utilisant une boucle (foreach conseillé), dans une `table`

## 2. Tableaux imbriqués

- Complexifions les données et transformons nos données en tableaux :
    - Bonnet en laine : 10€
    - Bonnet en laine bio : 14€
    - Bonnet en laine et cachemire : 20€
    - Bonnet arc-en-ciel : 12€
- Tous les produits vont également avoir la même description : `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a leo diam. Quisque lorem orci, accumsan quis dolor sed, gravida.`
- Mettre à jour l'affichage en conséquence

## 3. Conditions

- Si un prix est inférieur ou égal à 12€, afficher le prix en vert, sinon l'afficher en bleu.

## 4. Fonctions

- Nos prix étaient ici TTC (incluaient la TVA), nous allons faire une fonction calculant le montant hors taxes d'un produit.
- Afficher les prix HT dans la colonne avant celle des prix TTC

## 5. Manipulation des chaines de caractère et des variables

- Faire une fonction qui affiche un produit (va reprendre l'affichage d'une ligne du tableau)
- Appeler cette fonction dans la boucle

## 6. Séparation des fichiers

- Séparer le code en plusieurs fichiers 
    - Un fichier pour les variables
    - Un autre pour les fonctions
    - Un pour le HTML
- Appeler ces fichiers dans le HTML ([utiliser `include` pour appeler les différents fichiers](https://www.php.net/manual/fr/function.include.php) où vous le souhaitez)

## 7. Utiliser git

- Créer un projet sur Github ou Gitlab (si vous souhaitez le mettre en privé, invitez `Dreeckan` ou `remi@drakona.fr` sur le projet)
- Créer votre fichier `.gitignore` et y ajouter 2 lignes : `.idea` et `.vscode`
- Pusher votre code sur Github ou Gitlab
- Partager le lien (en privé sur Discord ou en m'invitant sur le projet)
- Créer une branche `ajout-layout` pour l'exercice suivant

## 8. Mise en place d'un layout

Ce que j'appelle layout : nous allons découper notre HTML pour en extraire les éléments communs (balises `<html>`, `<head>`, `<body>`, etc.) et les mettre dans des fichiers qui vont être inclus dans toutes nos pages.

- Créer un dossier `includes` et y ajouter les fichiers contenant les variables et les fonctions
- Dans ce dossier, y ajouter un fichier `header.php` et un fichier `footer.php`

## 9. Header

- Dans `header.php`, déplacer les includes des fichiers de variables et de fonctions (remplacer les includes par des `require_once` et rechercher ce que fait cette fonction)
- Ajouter le html qui va être commun à toutes nos pages (balises `<html>`, `<head>`, `<body>`, etc.)
- Inclure le fichier `header.php` dans la page de liste des bonnets

## 10. Footer

- Dans `footer.php`, ajouter le html commun à toutes nos pages se trouvant après le php
- Inclure ce fichier `footer.php` dans la page de liste

Si vous êtes arrivés jusqu'ici, sachez qu'[une correction vidéo des exercices 1 à 10 est disponible](https://www.loom.com/embed/26cb9035fe9743bcacdb62a32fd1d6be) :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/26cb9035fe9743bcacdb62a32fd1d6be" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## 11. Création d'une page d'accueil

- Renommer le fichier contenant la liste des bonnets en `list.php` (surtout si, comme moi, vous l'avez appelé `ìndex.php`). On ne change rien dans ce fichier pour le moment, nous allons créer une nouvelle page d'accueil, séparée.
- Créer un nouveau fichier `index.php` et y appeler nos header et footer avec `include` ou `include_once` (pour inclure les éléments communs à toutes les pages)
- Inclure le style et le js de Bootstrap (version 4), [disponible ici](https://getbootstrap.com/docs/4.5/getting-started/introduction/)
- Inclure sur cette page une liste des 3 premiers bonnets de notre liste (chacun prendra 1/3 de la page en largeur)
- Leur trouver une image pour les rendre plus jolis (je laisse ça à votre jugement ;)) et ajouter le lien de cette image dans les données
- Utiliser [les cards de Bootstrap](https://getbootstrap.com/docs/4.5/components/card/) pour les mettre en forme

## 12. Lier nos pages

- Dans la page d'accueil, sous les 3 produits, ajouter un lien vers list.php (`Voir tous les produits`)
- Le mettre en forme avec Bootstrap (en lui appliquant la classe des boutons par exemple)

## 13. Faire relire votre code

- Créer une Pull Request (ou Merge Request si vous êtes sur Gitlab)
- Mettez-vous en groupe (si ce n'est déjà fait) et invitez-vous sur vos projets respectifs
- Relisez le code des autres et faites-leur vos retours sur leur code

## 14. Mettre en place un menu

- Créer une nouvelle branche (git) (nommée par exemple `ajout-session`) et y travailler
- Ajouter un menu en haut de toutes les pages
- Mettre un lien vers la page `index.php` et un autre vers `list.php`
- Le mettre en forme avec Bootstrap (composant [navbar](https://getbootstrap.com/docs/4.5/components/navbar/) par exemple) 

## 15. Créer une page de connexion

- Créer une page `login.php` (à la racine du projet, avec les autres pages)
- Y ajouter un formulaire de connexion (un champ login, un champ password et un bouton de validation)
- Le mettre en forme avec Bootstrap
- Afficher le login de l'utilisateur dans le menu à la soumission du formulaire
- Cette valeur (`$_POST['login']`) pouvant ne pas exister, bien s'assurer de son existence avant affichage

## 16. Mise en place de la session

- Ajouter le `session_start()` à l'endroit adéquat
- Lors de la connexion de l'utilisateur, mettre son login en session
- Afficher ce login depuis la session, s'il est disponible

## 17. Créer une page de déconnexion

- Créer une page `logout.php`
- Cette page ne va contenir que quelques lignes
- Utiliser la fonction `session_destroy()` pour détruire les données en session
- une fois la fonction appelée (avec succès ;) ), utiliser la fonction `header()` pour rediriger vers la page `index.php` (et donc, pas besoin d'appeler quoique ce soit d'autre)
```php
// Cette fonction a une utilisation assez particulière,
// Voici l'écriture pour rediriger vers la page index.php
header("Location: index.php");
```

### Astuces

Si vous souhaitez afficher un message alors que vous avez une redirection avec `header()`, vous pouvez passer un paramètre `$_GET` :

```php
// Dans logout.php :
// On transmet un paramètre GET pour noter que l'utilisateur est déconnecté
header("Location: index.php?disconnected=1");

// Dans header.php (par exemple) :
// On récupère le paramètre, s'il existe, et on affiche un message
if (!empty($_GET['disconnected']) && $_GET['disconnected'] == 1) {
    echo "<div>Vous êtes déconnecté</div>";
}
```

La correction en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/1b7b5f3e768e4e17921ccdfdfe1bb270" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## 18. Vérification du mot de passe

- Ajouter (dans `variables.php` par exemple) une valeur de mot de passe attendue (par exemple 'toto')
- Dans le formulaire de connexion, vérifier que le mot de passe est correct
  - Si ça n'est pas le cas, afficher un message d'erreur
  - Si c'est le cas, afficher un message de réussite et ajouter le login dans la session
- Vérifier également que le login n'est pas vide (et afficher un message d'erreur)
- Mettre en forme les messages avec Bootstrap (composant [alerts](https://getbootstrap.com/docs/4.5/components/alerts/) par exemple)

## 19. Créer une PR (Pull Request)

- Créer une Pull Request
- Invitez quelqu'un.e qui n'est pas votre voisin.e sur votre projet
- Faites vous inviter par cette personne également
- Relisez le code et faites vos retours
- Approuvez (ou non) sa PR
- Une fois votre PR validée par un.e pair.e, vous pouvez la fusionner (merge)

## 20. Créer un front controller

- Nous allons maintenant utiliser notre fichier `index.php` en tant qu'unique script PHP appelé. C'est-à-dire que nous n'appellerons plus `list.php` (et les autres pages) directement, mais en passant par elle. (en appelant `index.php?page=list`)
- Créer un script `home.php` qui va contenir notre page d'accueil (renommer le fichier `index.php` en `home.php`)
- Ranger les fichiers de pages qu'on a jusqu'à présent (list, login, home, etc.) dans un dossier `pages`
- Dans `index.php`, nous allons récupérer un paramètre `GET`, nommé `page`, qui contiendra la page à charger (page d'accueil, liste des produits, panier, etc.)
- Mettre à jour les autres pages en conséquence pour réduire autant que possible le code des pages

## 21. Ajouter des éléments au panier

- Sur la page de liste (`list.php`), ajouter un bouton "Ajouter au panier" (on ajoute un seul élément à la fois dans le panier)
- Gérer l'ajout au panier d'un élément (passer un identifiant (à ajouter dans la liste des produits) qui sera récupéré avec `$_GET`)
- Les éléments doivent être présents dans la session

**Exemple de format de `$_SESSION['cart']`**

```php
[
    666 => 2, // 2 éléments avec l'id 666 sont dans le panier
    32 => 1, // 1 élément avec l'id 32 est présent dans le panier
];
```

## 22. Afficher les éléments du panier

- Créer une page `cart.php` (si ça n'est pas déjà fait) dans laquelle vous allez afficher le panier
- Ajouter des boutons (liens) pour ajouter ou supprimer des éléments déjà présents
- Calculer et afficher le prix pour chaque ligne (`$price * $quantity`)
- Calculer et afficher le prix total du panier
- Ajouter un bouton pour vider le panier
- Le panier doit être disponible même si l'utilisateur n'est pas connecté

## 23. Créer une PR (Pull Request)

- Créez une Pull Request
- Invitez quelqu'un.e sur votre projet
- Faites vous inviter par cette personne également
- Relisez le code et faites vos retours (vérifiez que le code valide bien les normes PSR-1 **et** PSR-12, par exemple)
- Approuvez (ou non) sa PR
- Une fois votre PR validée par un.e pair.e, vous pouvez la fusionner (merge) 

La correction en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/99b6ad7900ab4f23b632f43af20ef8c8" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## 24. Ajouter un formulaire de contact

- Trois champs :
  - Sujet (champ de type text)
  - Email (pour recontacter la personne) (champ de type email)
  - Message (champ de type textarea)
- Contraintes (valider que les champs correspondent à ces critères, tant en html que PHP) :
  - Sujet non vide (Attention au cas `' '`)
  - Email valide (non vide et de la forme `test@test.test`)
  - Message non vide (Attention au cas `' '`)

**Indices**

- Il existe une fonction PHP qui va vérifier la validité d'une variable (dont un email)
- Il faut passer les données en POST dans votre formulaire
- Vous pouvez ajouter une validation au niveau du HTML, mais il faudra quand même faire la validation PHP (il est facile de contourner la validation HTML) 

## 26. Pull Request

- Créez une Pull Request
- Invitez quelqu'un.e sur votre projet
- Faites vous inviter par cette personne également
- Relisez le code et faites vos retours (vérifiez que le code valide bien les normes PSR-1 **et** PSR-12, par exemple)
- Approuvez (ou non) sa PR
- Une fois votre PR validée par un.e pair.e, vous pouvez la fusionner (merge)

## 27. Utilisation des objets

- Créer une nouvelle branche git `utilisation-objets`
- Création d'une première classe `Beanie` qui va stocker nos données de bonnets
- Ajouter des constantes (tailles et matières) pour définir les valeurs du formulaire de tri
- Définir propriétés et méthodes
- Remplacer les tableaux dans `$mesProduits` par des objets (`$mesProduits` devient alors un tableau contenant des objets `Beanie`)
- Mettre à jour nos différentes pages en conséquence 

## 28. Pull Request

- Créez une Pull Request
- Invitez quelqu'un.e sur votre projet
- Faites vous inviter par cette personne également
- Relisez le code et faites vos retours (vérifiez que le code valide bien les normes PSR-12 **et** PSR-4, par exemple)
- Approuvez (ou non) sa PR
- Une fois votre PR validée par un.e pair.e, vous pouvez la fusionner (merge) 

## 29. Liste et filtres

- Créer une nouvelle branche git `ajout-filtres`
- Sur la liste des produits `list.php`, ajouter des filtres (formulaire, avec la `method` à `GET`) :
  - Par taille (S, M, L, XL)
  - Par matière (laine, soie, coton, cachemire, etc.)
  - Par prix (avec un minimum et un maximum)
- Ajouter ces éléments dans vos données 
  - Un bonnet peut avoir plusieurs tailles disponibles
  - peut avoir plusieurs matières 

### Aides

- On va ajouter un formulaire pour ces filtres (3 champs, dont 2 champs `<select>`), que l'on va ajouter avant le tableau de `list.php`
- Les tailles et les matières vont être rangées dans des constantes de classe et ce sont ces constantes qu'on va appeler pour afficher le contenu de nos `<select>`, en appelant le tableau `Beanie::AVAILABLE_SIZES` par exemple.
- Pour filtrer les éléments de notre tableau de données, on va utiliser la fonction `array_filter()` 

## 30. Retenir les valeurs entrées dans notre formulaire

- Dans le formulaire de filtre, quand une valeur est définie (par exemple : `$minPrice = 5`), on veut qu'elle apparaisse de nouveau dans le formulaire (par défaut, les valeurs sont remises à zéro). 

## 31. Pull Request

- Créez une Pull Request
- Invitez quelqu'un.e sur votre projet
- Faites vous inviter par cette personne également
- Relisez le code et faites vos retours (vérifiez que le code valide bien les normes PSR-12 **et** PSR-4, par exemple)
- Approuvez (ou non) sa PR
- Une fois votre PR validée par un.e pair.e, vous pouvez la fusionner (merge)

## 32. Continuer la conversion en objets

- Créer les classes suivantes et les utiliser dans le code existant (dans tous les cas, je vous laisse libre pour les propriétés et les méthodes) :
  - `Contact` un objet de gestion des messages de contact (lui passer un tableau de paramètres dans le constructeur, pour faire le lien plus rapidement entre le formulaire et l'objet)
  - `BeanieFilter` un objet pour le formulaire de filtres des bonnets
  - `Cart` un objet pour gérer le panier et le mettre en session
  - `Page` un objet pour les informations d'une page
- Si du code est répété, créer un/des traits pour factoriser (les ranger dans un sous-dossier de `classes`)

## 33. Pull Request

- Créez une Pull Request
- Invitez quelqu'un.e sur votre projet
- Faites vous inviter par cette personne également
- Relisez le code et faites vos retours (vérifiez que le code valide bien les normes PSR-12 **et** PSR-4, par exemple)
- Approuvez (ou non) sa PR
- Une fois votre PR validée par un.e pair.e, vous pouvez la fusionner (merge)

## 34. Créer une base de données

- Ouvrir [PhpMyAdmin](http://localhost/phpmyadmin/)
- Y créer une base de données `exo_beanies`
- Créer des tables pour les objets 
  - `Contact` (nommer la table `contact`)
  - `Beanie` (nommer la table `beanie`)
- Créer un fichier de connexion à la BdD `includes/config.inc.php` et faire en sorte d'avoir une connexion fonctionnelle dans toutes vos pages.
- Insérer des données dans la table `beanie` à l'aide de l'une des deux méthodes suivantes :
  - dans PhpMyAdmin, ajouter des données dans la table `beanie` (avec les valeurs de votre fichiers `variables.php` par exemple)
  - écrire un script PHP `includes/fixtures.php` insérant les données
  
## 35. Formulaire de contact, en BdD

- Modifier votre page de contact pour insérer les données du formulaire dans la table `contact`
  - N'insérer les données **que** si aucune erreur n'est remontée
  
## 36. Utiliser les données de la BdD

- Créer une classe `BeanieFactory` dans `classes/Factory/BeanieFactory.php` qui va avoir une méthode `create()` 
  - ayant pour paramètre un tableau (une ligne récupérée dans la BdD) 
  - renvoyant un objet `Beanie` contenant les données venues de la table
- Modifier vos pages pour récupérer les données depuis la table `beanie`, plutôt qu'une variable
  - Adapter le code des différentes pages pour utiliser la BdD plutôt que le tableau (fixe) qu'on utilisait jusqu'à présent

## 37. Pull Request

- Créez une Pull Request
- Invitez quelqu'un.e sur votre projet
- Faites vous inviter par cette personne également
- Relisez le code et faites vos retours (vérifiez que le code valide bien les normes PSR-12 **et** PSR-4, par exemple)
- Approuvez (ou non) sa PR
- Une fois votre PR validée par un.e pair.e, vous pouvez la fusionner (merge)

## Révisions

Pour réviser tous ces points et les travailler avant de passer aux objets, vous pouvez [vous entrainer avec ces exercices de révision](https://github.com/Dreeckan/exercices-php/blob/main/revisions.md).
