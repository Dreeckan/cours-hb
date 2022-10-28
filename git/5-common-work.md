# Mise en commun du travail

Introduction en vidéo : 

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/b3e98e3f1df34ddfa2cf73f94b49b449" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Pour la plupart des projets, le travail de groupe est primordial. Git permet de grandement le simplifier, mais le faire en ligne de commande serait bien pénible.

C'est pour ça (et bien d'autres choses) que des outils en ligne existent, tels que :
- [GitHub](https://www.github.com)
- [BitBucket](https://bitbucket.org)
- [GitLab](https://gitlab.com)
- et sûrement bien d'autres !

Nous allons nous concentrer sur le premier, car le plus répandu, mais sachez que GitLab et BitBucket peuvent être installés gratuitement sur un serveur privé (c'est ce que nous avons fait chez [Drakona](https://www.drakolab.fr) ;) ).

Je vous conseille donc de créer au moins un compte sur [GitHub](https://www.github.com), qui pourra également vous servir de portfolio ou de carte de visite !

## Créer un repository distant

En vidéo : 

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/a3220709a8304d1c9f9b98fc1f204a51" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Pour créer un repository sur GitHub, il suffit d'aller sur [la page de création d'un dépôt](https://github.com/new), d'entrer un nom et de décocher les cases... Et tout est prêt pour la suite.

## Lier le local et le distant

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/ba54e2869b2649299a88f5b7a57ac570" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Si vous avez déjà un dépôt local **non vide** (avec au moins 1 commit), nous allons associer ce local avec le distant que nous avons créé sur GitHub avec la commande
`git remote add origin git@github.com:cheminDuDepot.git` où `origin` est l'alias (ou le nom) du dépôt distant, pour votre machine et `git@github.com:cheminDuDepot.git` le lien SSH vers votre dépôt distant.

Si vous n'avez qu'un repository distant **non vide** (avec au moins 1 commit), nous pouvons récupérer les fichiers **et** lier les deux dépôts avec 
`git clone git@github.com:cheminDuDepot.git` qui créera un dossier portant le nom du projet, là où vous vous trouvez.
Dans ce cas, le distant s'appellera origin et sera directement lié (le dossier est prêt à être utilisé).

Si vous avez un dossier vide, il faut :
- initialiser un dépôt git avec `git init`
- créer un premier fichier (ou un ensemble de fichiers)
- créer un premier commit
- lier ce nouveau dépôt avec le dépôt distant `git remote add origin git@github.com:cheminDuDepot.git`

## Push et pull

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/dc3c6c9609ab48b6824ff7c3eeb69f91" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Maintenant que nous avons notre dépôt distant et qu'il est lié à notre dépôt local, il est temps d'envoyer et de récupérer des informations vers et depuis celui-ci.

Des commandes courantes :
- `git fetch` récupère les informations **sans changer vos fichiers locaux** (permet simplement d'avoir les informations du distant, s'il y a de nouvelles branches, de nouveaux commits, etc.)
- `git pull origin nomDeLaBranche` est à exécuter en étant sur la branche `nomDeLaBranche` sur votre dépôt local et permet de la mettre à jour par rapport à la branche `nomDeLaBranche` du distant (vos fichiers sont modifiés et vous récupérez les commits du distant)
- `git push origin nomDeLaBranche` est à exécuter en étant sur la branche `nomDeLaBranche` sur votre dépôt local et permet de mettre à jour la branche distante avec les commits locaux
- `git push -u origin nomDeLaBranche` est à exécuter en étant sur la branche `nomDeLaBranche` sur votre dépôt local et permet de mettre à jour le distant **et** de demander à Git de retenir le lien entre la branche locale et la branche distante. Avec ce lien, vous pourrez vous contenter de lancer `git push` ou `git pull` sans plus d'arguments (ce qui simplifie la vie ;) ).

## Pull Request (PR)

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/9d97b712d3ab448399f93663ccaaf42f" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Dans un projet à plusieurs, personne ne doit modifier directement la branche principale (`main` ou `master` la plupart du temps), mais on travaille dans des branches séparées et, lorsqu'elles sont terminées, on crée une Pull Request sur le dépôt distant (GitHub pour nous), que l'on fait relire (vérifier) par un collègue jusqu'à validation. La branche peut alors être fusionnée dans la branche principale (ou une autre branche de destination, ça arrive aussi). Je vous invite à plutôt regarder la vidéo, pour des exemples concrets.

## Merge, rebase, conflits

Une fois la <abbr title="Pull Request">PR</abbr> faite, relue et qu'il faut la fusionner dans la branche principale, il ne reste plus qu'à appuyer sur le bouton `Merge Pull Request` sur la page GitHub. Malheureusement, si vous êtes plusieurs à avoir travaillé sur les mêmes fichiers, vous rencontrerez des conflits (Git ne sait pas quelles modifications il doit conserver ou comment les fusionner). Nous allons voir comment les régler, pour permettre la fusion.

En vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/5b54c6a7fdf840c8bf6cac233af4f0b6" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

La première étape est de retourner sur votre machine, afin de régler les conflits. Pour cela, de nombreuses méthodes existent, mais la plus pratique (dans le cadre d'un fonctionnement avec Github) reste d'utiliser la commande `git rebase`. 

Le rebase consiste à changer le point de départ de votre branche (qui avait pour point de départ un commit, généralement de la branche principale) vers un autre commit, plus à jour. Pour avoir un moyen plus visuel de comprendre ce changement, je vous invite à regarder la vidéo ci-dessus ou de tester sur un [outil de visualisation de Git](http://git-school.github.io/visualizing-git/#rewritten-history), très pratique pour apprendre (sur l'exemple donné, il faut juste lancer la commande `git rebase master` pour voir un rebase en action).

Dans la plupart des cas, nous allons faire comme suit (je pars du principe que vous êtes sur la branche à rebase) :

- `git checkout main` pour aller sur la branche principale
- `git pull origin main` (ou juste `git pull`) pour la mettre à jour (et s'assurer d'avoir **tous** les derniers changements)
- `git checkout -` pour retourner sur la branche de travail
- `git rebase main` pour lancer le rebase
- Il faut maintenant gérer les éventuels conflits. Git rebase appliquant vos commits un par un, il est possible que vous ayez des conflits pour un ou plusieurs commits, et il faudra répéter les opérations suivantes :
  - ouvrir les fichiers concernés dans votre <abbr title="Integrated Development Environment">IDE</abbr> et les corriger pour garder la ou les modifications que vous souhaitez conserver
  - une fois tous les conflits gérés, utiliser la commande `git add` (`git add .` ou `git add nomDuFichier`) pour les ajouter à l'index, afin de préciser à la commande `rebase` que les conflits ont été corrigés
  - `git rebase --continue` pour passer au commit suivant
- Une fois tous les commits appliqués, votre branche locale est à jour
- `git push --force origin nom-de-votre-branche` pour mettre à jour **de force** l'historique de votre branche sur GitHub (ne faites **jamais** cette opération sur la branche principale)
- Faites re-faire une relecture rapide de votre <abbr title="Pull Request">PR</abbr>, pour vous assurer que tout est toujours bon
- Vous pouvez fusionner ou faire fusionner votre <abbr title="Pull Request">PR</abbr>
