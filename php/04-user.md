
# Interagir avec l'utilisateur

En vidéo : 

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/1ad7cd0531014f6b8e0b7afc4a8fd775" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

- GET et POST permettent de récupérer des actions de l'utilisateur ponctuellement (soumission d'un formulaire, suivi d'un lien avec des paramètres, etc.)
- Sessions et cookies, permettent de retenir des données à plus ou moins long terme
  - Les sessions durent par défaut 20 minutes ou jusqu'à la fermeture du navigateur
  - Les cookies durent pour la plupart entre 1 mois et 1 an (ou n'ont pas de limite de durée)

## Des valeurs dans l'url

- Valeurs se trouvant dans l'url `index.php?bonnet=Classe&matiere=cachemire&logo=`
- Commence par `?` et séparées par des `&`, format `cle=valeur`
- Vous pouvez les récupérer dans la superglobale `$_GET`:

```php
echo $_GET['bonnet']; // Classe
echo $_GET['matiere']; // cachemire
echo $_GET['logo']; // ''
```

## Des valeurs envoyées par un formulaire

- Valeurs généralement envoyées par un formulaire
- les clés du tableau correspondent à l'attribut `name` de vos champs HTML (`input`, `textarea`, `select`, etc.)
- Vous pouvez les récupérer dans la superglobale `$_POST`

```html
<form action="" method="POST">
    <label for="matiere">Matière de votre bonnet</label>
    <input type="text" name="matiere" id="matiere" value="cachemire">
    <input type="submit" name="boutonValidation" value="Valider">
</form>
```

```php
echo $_POST['matiere']; // cachemire
echo $_POST['boutonValidation']; // Valider
```

## La session

[La documentation PHP](https://www.php.net/manual/fr/book.session.php)

- Sert à conserver des informations d'une page à l'autre, jusqu'à fermeture du navigateur (ou 1440 secondes par défaut)
- Appeler la fonction `session_start()` au début de toutes les pages pour que la session fonctionne correctement
- le contenu de la session se trouve dans la variable superglobale `$_SESSION`
- On peut y ajouter/modifier/supprimer des éléments en modifiant ce tableau
```php
$_SESSION['login'] = 'unLogin';
echo $_SESSION['login']; 
// etc.
```

## Les cookies

[La documentation PHP](https://www.php.net/manual/fr/features.cookies.php)

- Servent à conserver des informations sur une durée plus longue
- Peuvent être un problème de sécurité selon les informations stockées. En effet, s'ils contiennent des données sensibles, celles-ci sont stockées (par défaut) dans un fichier texte dans l'ordinateur de l'utilisateur.
- On peut créer un cookie avec la fonction `setCookie()` ([documentation](https://www.php.net/manual/fr/function.setcookie.php))
- Récupérer le ou les cookies dans la variable superglobale `$_COOKIE`
