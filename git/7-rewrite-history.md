# Réécrire l'historique

## Commit --amend - Modifier le dernier commit

La commande `git commit --amend` permet de modifier le dernier commit.

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/95e059f894e5489f8adf01f9963f2211" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

- *(optionnel)* Vous pouvez ajouter des modifications au commit précédent en les ajoutant à l'index (`git add .` ou `git add nomDuFichier`)
- `git commit --amend` vous ouvre l'éditeur de texte pour modifier le message du dernier commit (le fermer pour valider)
- Votre dernier commit a été modifié (et n'a plus le même identifiant)

:warning: Si vous aviez déjà envoyé le commit sur le dépôt distant, il faudra utiliser l'option `--force` lors du `push`. Veillez donc à ne pas perdre des commits sur le distant !


## Rebase - Modifier tout l'historique

La commande `git rebase` permet de modifier l'historique de la branche en cours. Non seulement d'en changer la "base" (son commit de départ), mais aussi de réécrire les commits eux-mêmes.

En vidéo : 

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/a26a0e8551fd4e56a6efd185f07cb79a" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

L'utilisation la plus complète est `git rebase -i main` (remplacer `main` par une autre branche si besoin), qui vous ouvre un éditeur pour définir ce que vous souhaitez faire pour chaque commit présent entre la tête de lecture et le dernier commit de la branche `main`. 

Vous pouvez, **entre autre** :

- utiliser le commit en utilisant `p` ou `pick` sur la ligne de votre commit (il sera utilisé sans modification)
- supprimer le commit en utilisant `d` ou `drop` sur la ligne de votre commit (il sera supprimé, ainsi que les modifications qu'il contient). Notez que c'est équivalent à supprimer la ligne du commit
- modifier le message de commit en utilisant `r` ou `reword` sur la ligne de votre commit (vous ouvrira un éditeur de texte pour modifier le message)
- fusionner un commit avec le précédent en utilisant `s` ou `squash` sur la ligne de votre commit (un seul des deux commits sera conservé, mais **toutes** les modifications seront conservées)

Une fois que vous avez choisi quoi faire de chaque commit, les commandes indiquées et les commits seront appliqués l'un après l'autre.

:warning: Si vous aviez déjà envoyé les commits sur le dépôt distant, il faudra utiliser l'option `--force` lors du `push`. Veillez donc à ne pas perdre des commits sur le distant !