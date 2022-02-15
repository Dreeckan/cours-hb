# MVC

[L'article Wikipédia sur le MVC](https://fr.wikipedia.org/wiki/Mod%C3%A8le-vue-contr%C3%B4leur)

## Principes

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/444c50527d2d4c518f472e2d9e59c8c4" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Le modèle <abbr title="Model View Controller">MVC</abbr> (Modèle Vue Contrôleur) est une manière de ranger et concevoir le code pour le séparer autant que possible en 3 éléments distincts :
- Le modèle, c'est-à-dire les éléments liés aux données (les classes liées à nos tables de <abbr title="Base de Données">BdD</abbr> par exemple)
- Les vues, c'est-à-dire les fichiers purement dédiés à l'affichage (contenu d'une page)
- Les contrôleurs, c'est-à-dire un ensemble de fichiers "chefs d'orchestre" qui vont recevoir la requête de l'utilisateur et appeler le modèle et la vue, pour construire la réponse finale.

![Schéma présentant le modèle MVC](https://upload.wikimedia.org/wikipedia/commons/b/b2/Mod%C3%A8le-vue-contr%C3%B4leur_%28MVC%29_-_fr.png)

Détails du schéma (honteusement piqué sur Wikipédia ;) ) :

1. L'utilisateur envoie une requête HTTP (demande une URL), qui va être reçue par un contrôleur
2. Le contrôleur va demander des données au modèle (généralement, la <abbr title="Base de Données">BdD</abbr>)
3. Le contrôleur reçoit les données, fait d'éventuels calculs avec
4. Le contrôleur transmet les données à la vue, qui va les exploiter pour créer l'affichage
5. Cet affichage est renvoyé à l'utilisateur qui avait fait la requête HTTP (une réponse HTTP est renvoyée)

Ce découpage facilite la maintenabilité du code, force une séparation entre les éléments et permet divers rangements pour retrouver plus efficacement les fichiers.

## Mise en place dans un projet

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/2d33b6fca8694c5dac87171284420aa8" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Concrètement, dans la plupart des projets, vous pouvez utiliser des frameworks (comme Symfony) pour le mettre en place. Dans un premier temps, nous allons voir comment organiser du code Php procédural, pour passer en mode <abbr title="Modèle Vue Contrôleur">MVC</abbr>.

La plupart du temps, nous allons nous baser sur des objets et des classes pour organiser tout ça. Voici un exemple de structure minimale pour un projet <abbr title="Modèle Vue Contrôleur">MVC</abbr> : 

```
- src/
| - Controller/
| - Model/
| - View/
- index.php
```

Pour ajouter une page dans cette structure, nous aurions besoin d'ajouter un fichier dans chacun des dossiers `Controller`, `Model` et `View`. Prenons l'exemple d'un site référençant toutes les races de chien et des informations sur chacune. 

Pour ajouter une page listant les listes de chiens, il nous faudrait :

- Une table `breed` (race) dans notre <abbr title="Base de Données">BdD</abbr> et une entité `Breed` correspondante
- Une vue `list-breeds.php` pour afficher le contenu de la liste des races de chiens
- Un controller `ListBreedController` pour gérer l'appel aux données et à l'affichage de la liste

```
- src/
| - Controller/
| | - ListBreedController.php
| - Model/
| | - Breed.php
| - View/
| | - list-breeds.php
- index.php
```

Dans `ListBreedController`, on peut s'attendre à un appel à la <abbr title="Base de Données">BdD</abbr> pour récupérer les différentes races `Breed` et un appel à la vue `list-breeds`.

Bien sûr, pour que tout ça fonctionne, il faut que notre front controller (`index.php`) reçoive la requête et puisse faire le lien entre ce qu'il reçoit et un contrôleur. 
