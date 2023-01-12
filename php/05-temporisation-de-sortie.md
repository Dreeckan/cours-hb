# La temporisation de sortie

En vidéo : 

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/ee7221772dc34d6090b7e76f0cc89e53" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Dans certains cas (la plupart, en fait), on veut éviter que l'affichage se fasse au fur et à mesure que le HTML est calculé. 

Ceci permet, par exemple, de rediriger l'utilisateur avec `header()`, alors que du HTML a déjà été rendu !

- `ob_start()` sert à démarrer la temporisation de sortie
- `ob_end_flush()` retourne le contenu rendu jusque-là (il est nécessaire de l'afficher avec un `echo` ou autre fonction d'affichage)

```php
ob_start();
?>
<p>Du HTML</p>
<?php
// On est redirigé vers la page, malgré le HTML au-dessus.
header('Location: une-autre-page.php');
echo ob_end_flush();
```

Sans temporisation de sortie, on aurait une erreur :

```php
<p>Du HTML</p>
<?php
// On a une erreur, on ne peut pas faire une redirection après avoir affiché du HTML
header('Location: une-autre-page.php');
```
