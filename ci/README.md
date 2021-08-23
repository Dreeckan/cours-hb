# Intégration continue

## Pré-requis

- Git
- GitLab / GitHub / Bitbucket / équivalent
- Yaml ([apprendre le YAML en 5 minutes](https://www.codeproject.com/Articles/1214409/Learn-YAML-in-five-minutes))

## Définitions

L'introduction en vidéo : 

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/85edd5f003384961baa88d784ef2ca9c" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

### DevOps

Le DevOps est une pratique technique, visant à unifier le développement (logiciel) et l'administration système (gestion des serveurs).

Dans les faits, on parle de DevOps à la fois pour la pratique et comme métier/spécialisation. Dans les deux cas, il s'agit de mettre en place divers outils, permettant de s'assurer de la qualité du produit et du respect du cahier des charges au fur et à mesure du développement.

En pratique, cela implique :
- des cycles de développement courts
- un travail d'équipe (relecture du code et mise en place de pratiques communes)
- la mise en place, dès le départ, de tests, d'outils de vérification de la qualité du code ou de la performance, etc. et leur automatisation
- la mise en place d'environnements de travail au plus près de l'environnement de production (et lancement des outils automatisés dans ce contexte)
- des mises à disposition (déploiement) très régulières, que ce soit pour des tests ou en production
- la surveillance du fonctionnement et de la qualité de la production par des métriques définies au plus tôt.

### Déploiement continu

L'idée du déploiement continu est de livrer les nouvelles fonctionnalités au client dès qu'elles sont disponibles. Pour cela, on déploie les modifications de manière **automatique** dès leur validation (en général par le client sur un autre environnement) ou leur fusion dans la branche principale.

On cherche ainsi à améliorer l'application en continu et créer des cycles courts de développement. Chaque déploiement pouvant être annulé facilement (car peu de modification), on évite aussi l'une des grandes contraintes des cycles longs.

### Intégration continue

L'intégration continue a pour but de vérifier chaque modification du code source, pour éviter les régressions et autres bugs (autant que possible). Un outil d'intégration continue permet de lancer automatiquement diverses actions de vérification du projet (compilation, linters, test unitaires et fonctionnels, etc.) ou toute autre tâche automatisable (cf
déploiement continu ;) ).

Pour utiliser des outils d'intégration continue, il faut que :

- le code soit versionné (git, svn, etc.)
- des outils de vérification automatiques existent dans le projet (compilation, tests, etc.)

Si on souhaite mettre en place du déploiement continu (avec ou sans intégration continue), il faut que :

- le projet puisse être mis sur un serveur / sa machine de destination
- des outils de déploiement aient été mis en place

#### Outils d'intégration continue

- [Jenkins](https://www.jenkins.io/)
- [TravisCI](https://travis-ci.com/)
- [CruiseControl](http://cruisecontrol.sourceforge.net/)
- mais aussi [GitHub actions](https://docs.github.com/en/actions), [Bitbucket Pipelines](https://bitbucket.org/product/fr/features/pipelines) ou [GitLab CI](https://docs.gitlab.com/ee/ci/)

Nous allons nous concentrer sur les [GitHub actions](https://docs.github.com/en/actions) et [GitLab CI](https://docs.gitlab.com/ee/ci/), qui sont plutôt simples à utiliser et plus rapides à mettre en place (en plus d'avoir une logique similaire).

### Docker

Docker est un logiciel libre permettant de lancer des applications dans des conteneurs, ayant des tâches spécifiques (en général, chaque conteneur permet de lancer 1 programme précis, avec ses dépendances directes). 

Contrairement à la virtualisation, qui reproduit toutes les caractéristiques d'une machine, la conteneurisation s'appuie sur certaines parties de la machine hôte (dont le système d'exploitation) pour fonctionner (ce qui améliore grandement la compatibilité et la flexibilité). Un autre intérêt est de séparer complètement l'exécution des différents services nécessaires à une application (BdD, serveur, etc.), les lançant dans des processus séparés.


### D'autres outils utiles

- [Un grand ensemble de tuto DevOps par Xavki](https://gitlab.com/xavki/sommaire-xavki-tutos-fr)
- [Un outil d'analyse statique pour Php](https://phpstan.org/)
- [Git workflow](https://www.atlassian.com/fr/git/tutorials/comparing-workflows/gitflow-workflow)
- [Ansible](https://docs.ansible.com/ansible/latest/index.html) (automatisation de tâches et gestion d'états)

## [GitLab](https://www.gitlab.com) et [GitHub](https://www.github.com)

Une présentation de GitLab et GitHub en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/294683a858734af694d4b2edcb68d4c5" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Bien que tout ce qui suit s'applique aussi bien à Bitbucket, la syntaxe et les denominations changent d'un outil à l'autre. Les concepts restent les mêmes et il est plutôt aisé d'adapter ce que vous verrez ici à d'autres outils de CI/CD.

GitLab et GitHub sont des gestionnaires de repositories git en ligne. Ils peuvent servir, entre autre, de :

- gestionnaire de tickets
- d'outils de revue de code
- plateforme de CI/CD

Nous allons nous baser sur Git et ses mécaniques, voici quelques resources pouvant être utiles pour le maîtriser :

- [Git Cheat Sheet](https://about.gitlab.com/images/press/git-cheat-sheet.pdf) (ou [en Français](https://github.github.com/training-kit/downloads/fr/github-git-cheat-sheet.pdf))
- [la documentation officielle](https://git-scm.com/docs)
- une [documentation Bitbucket](https://www.atlassian.com/fr/git/tutorials/learn-git-with-bitbucket-cloud) assez complète et en français

### Revue de code

L'un des grands intérêts de travailler avec Git (en plus d'avoir un code versionné) est de faciliter le travail collaboratif, grâce notamment aux revues de code.

Mais **pourquoi relire le code d'un autre dev ?**

- Vérifier que la demande initiale est respectée
- Que le code produit répond aux **bonnes pratiques communes**
- Avoir un second (ou troisième, quatrième, etc.) point de vue sur le travail effectué et trouver d'éventuels bugs avant qu'ils ne se dévoilent au client.

Cette revue de code se fait en général dans les Merge/Pull Requests (MR ou PR) du projet.

## CI / CD avec GitLab

La [documentation officielle de GitLab](https://docs.gitlab.com/ee/ci/introduction/index.html) à laquelle je vais beaucoup me référer.

Pour se faire, notre principal outil va être le fichier `.gitlab-ci.yml`. C'est dans ce fichier que nous allons définir nos tâches (`jobs`) et nos étapes (`stages`).

- L'ensemble des étapes forment ce qu'on appelle un `Pipeline`.
- Les étapes contiennent des tâches. Ce sont des commandes (actions) que l'on va faire lancer à notre serveur (GitLab).
- Les tâches sont exécutées par des `runners`

### Un exemple

Un exemple de Workflow que nous pouvons construire :

![Un Workflow GitLab : depuis une nouvelle branche, on lance les actions automatiques jusqu'au merge, qui déclenche d'autres actions automatiques](https://docs.gitlab.com/ee/ci/introduction/img/gitlab_workflow_example_11_9.png)

La version plus détaillée :

![Un Workflow GitLab : depuis une nouvelle branche, on lance les actions automatiques jusqu'au merge, qui déclenche d'autres actions automatiques](https://docs.gitlab.com/ee/ci/introduction/img/gitlab_workflow_example_extended_v12_3.png)

Que se passe-t-il dans ces images :

- Un développeur crée une branche et crée plusieurs changements (des commits)
- Dès que le serveur reçoit ses commits (push), un pipeline est lancé
  - ce pipeline contient un ensemble d'étapes (stages) qui doivent être validées pour passer à la suivante
  - chaque étape définit plusieurs tâches à exécuter et, dans notre exemple, certaines tâches créent une erreur
- Le pipeline renvoie une erreur
- Le développeur crée plusieurs commits pour corriger les différents problèmes et les push
- Un nouveau pipeline est lancé
- Cette fois, tout fonctionne. L'une des tâches est le déploiement d'une Review App, c’est-à-dire le déploiement d'un site permettant de tester la branche, dans des conditions réelles (très utile pour le reviewer de la Merge Request ;) ).
- Un(e) autre membre de l'équipe relit et teste le code du développeur et approuve sa Merge Request
- La Merge Request est fusionnée
- Un nouveau pipeline est lancé
  - si le projet fait de la livraison continue (*Continuous Delivery*), une tâche peut être lancée (manuellement) pour mettre l'application en production
  - si le projet fait du déploiement continue (*Continuous Deployment*), cette tâche est lancée automatiquement

### Configuration du fichier de CI

[Mon pense-bête favori](https://blog.eleven-labs.com/fr/introduction-gitlab-ci/), par Nicolas Grévin de Eleven Labs

Son nom et son emplacement sont standard : `.gitlab-ci.yml` à la racine du projet Sur GitLab, vous pouvez modifier cela dans : `Settings (menu de gauche) > CI/CD > General pipelines > Custom CI config path`

Toutefois, je vous conseille de garder la configuration de base, c'est ce qui est attendu par beaucoup de développeurs.

Un exemple de fichier `.gitlab-ci.yml` (celui utilisé par ce site) :

```yaml
# Pour réaliser ce fichier, je me suis basé sur le tuto d'Eleven Labs : 
# https://blog.eleven-labs.com/fr/introduction-gitlab-ci/

# On définit les différentes étapes (stages) à faire tourner dans le pipeline
stages:
  # cette étape (stage) va compiler l'application, 
  # permettant de vérifier qu'il n'y ait pas d'erreur dès la compilation
  - build
  # Déploie l'application sur le serveur approprié, si nécessaire
  - deploy

# On définit une tâche (job) qui pourra être lancée lors d'un stage
pages:
  # Ce job sera exécuté lors du stage build
  stage: build
  # On va lancer ce job dans un container Docker. 
  # Ici, une image nodejs de chez Drakona, en version 14 (utilisant Alpine)
  image: drakona/node:14-alpine
  # On met certains dossiers en cache, pour les conserver d'une exécution à l'autre
  cache:
    paths:
      # Ici, on garde le dossier node_modules, 
      # afin de ne pas re-télécharger toutes les dépendances à chaque fois
      - node_modules/
  # Le script que va utiliser ce job. Ici, on profite de notre Makefile !
  script:
    - make update build
  artifacts:
    paths:
      - public
  # Des tags pour déterminer quel runner va exécuter la tâche.
  # Ici, c'est une configuration personnalisée, pour notre GitLab.
  # Nous avons créé nos propres runners
  tags:
    # Pour cette tâche, nous allons utiliser un runner utilisant Docker
    # Dans notre cas, il y a 6 runners répondant à ce tag
    # Et c'est le premier disponible qui l'exécutera.
    - docker

# Un autre job, qui va déployer notre application sur le serveur de prod
deploy:
  # Avant d'exécuter le script, on va faire un ensemble de commandes,
  # pour avoir une clé SSH valide et prête à l'emploi
  before_script:
    # On s'assure que openssh est installé
    - 'command -v ssh-agent >/dev/null || ( apt-get update -y && apt-get install openssh-client -y )'
    # On lance le client SSH
    - eval $(ssh-agent -s)
    # On va chercher la variable d'environnement DEPLOY_SK, définie dans GitLab
    # et qui contient une clé privée que l'on va utiliser pour le déploiement
    - echo "$DEPLOY_SK" | tr -d '\r' | ssh-add -
    # On s'assure d'avoir un dossier .ssh et qu'il ait des droits corrects
    - mkdir -p ~/.ssh
    - chmod 700 ~/.ssh
  # Ce job se lance lors du stage deploy
  stage: deploy
  # Le script à exécuter
  script: make deploy
  # Ce déploiement n'a lieu que si l'on fait une action sur main 
  # (commit, push, merge, etc.)
  only:
    - main
```

### Pipelines

Par défaut, un pipeline est lancé dès qu'un nouveau commit est poussé (push) sur GitLab (si vous en poussez plusieurs dans la même branche, un seul pipeline sera lancé, sur le dernier commit). 

Vous pouvez voir les pipelines directement dans la partie `CI/CD` de votre repository, mais ils sont plus pratiques à d'autres emplacements de l'interface.

Sur la partie `Project Overview` :

![](/assets/img/ci/ci-pipeline-overview.png)

Sur la liste des Merge Requests : 

![](/assets/img/ci/ci-pipeline-mr.png)

Ou sur une `Merge Request` : 

![](/assets/img/ci/ci-pipeline-mr2.png)

C'est sur ce dernier affichage que vous pouvez avoir l'adresse pour une [Review App](https://docs.gitlab.com/ee/ci/review_apps/), qui est le lien entre une branche de votre repository et un [environnement](https://docs.gitlab.com/ee/ci/environments/index.html) (un serveur permettant de tester cette branche, en somme).

[La documentation officielle sur les Review App](https://docs.gitlab.com/ee/ci/review_apps/) et [celle sur les environnements](https://docs.gitlab.com/ee/ci/environments/index.html)

### Les runners

Pour lancer les tâches, GitLab utilise des programmes indépendants, les `runners`. GitLab fourni de nombreux runners et vous permet éventuellement d'en créer vous-même, en quelques lignes de commande.

Il y a 4 grands types de runners, disponibles par défaut :

- shell (la ligne de commande du serveur)
- ssh (on exécute nos commandes *via* SSH sur un autre serveur)
- docker (on exécute nos commandes dans un container Docker)
- Kubernetes (on exécute nos commandes dans un environnement Kubernetes)

:warning: Conseil gitlab.com : toujours utiliser docker (avec le tag `gitlab-org-docker` et une image Docker sur vos tâches, à moins que vous ne codiez en Ruby ;) ).

### Tâches / jobs

Une tâche doit toujours lancer un ou des scripts (commandes à exécuter), tout le reste est optionnel. De nombreuses options permettent de personnaliser les conditions de lancement de la tâche, les pré-requis, etc. Les différentes options des tâches :

- script : déclaration obligatoire, contenant les commandes à exécuter
```yaml
pages:
  script:
    - make update
    - make build
```
- before_script ou after_script : permet d'exécuter une ou des commandes avant ou après le script de notre tâche. Vous pouvez également les définir pour toutes vos tâches, en les précisant à la racine
```yaml
before_script:
  - echo "avant tous les scripts, sauf si un before script est défini dans une tâche"

pages:
  before_script:
    - echo "avant script"
  script:
    - make update
    - make build
  after_script:
    - echo "après script"
```
- image : nom d'une image Docker à utiliser pour exécuter la tâche. Peut être écrit à la racine pour l'exécution de toutes les tâches.
```yaml
# toutes les tâches seront exécutées dans des conteneurs nodejs, en version 12
image: node:12

pages:
  # Cette tâche sera exécutée dans un conteneur php-fpm
  image: php:fpm
```
- services : permet d'ajouter des conteneurs Docker pour aider dans les tâches (associer une BdD par exemple)
```yaml
pages:
  image: php:fpm
  # On appelle le service postgres pour accéder à une BdD
  services:
    - postgres
```
- stages : permet de regrouper les tâches dans des étapes :
```yaml
# Déclaration des différentes étapes disponibles
stages:
  - build
  - deploy
  
pages:
  # la tâche pages est dans l'étape build
  stage: build
#...
deploy:
  # la tâche deploy est dans l'étape deploy
  stage: deploy
```
- only et except : définition de contraintes d'exécution d'une tâche. `only` peut, par exemple, préciser qu'on ne lancera la tâche que lors d'un *push sur master*, `except` que si le push à lieu sur *une branche autre que master*
```yaml
deploy-master:
  script: make deploy
  only:
    - master # Le job sera effectué uniquement lors d’un événement sur la branche master

test-not-master:
  script: make test
  except:
    - master # Le job sera effectué sur toutes les branches lors d’un événement sauf sur la branche master

```
- cache : Mettre des fichiers et des répertoires en cache et qui seront disponible dans le pipeline (ils sont détruits après l'exécution du pipeline, que ce soit un succès ou non)
```yaml
push-cache:
  script: make cache
  cache:
    # Chemin des fichiers et dossiers à conserver
    paths:
      - cache # répertoire mis en cache
    policy: push # On précise qu'on ajoute au cache

pull-cache:
  script: make somethingWithCache
  cache:
    paths:
      - build
    policy: pull # récupération du dossier build dans le cache
```

Et beaucoup d'autres, que je vous invite [à découvrir ici](https://blog.eleven-labs.com/fr/introduction-gitlab-ci/) ;) 

## CI / CD avec GitHub

L'[introduction officielle aux GitHub Actions](https://docs.github.com/en/actions/learn-github-actions), et la vidéo qui va avec : 

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/cP0I9w2coGU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



:warning: L'utilisation de GitHub Actions est limitée et dépend de votre abonnement à GitHub (pour les projets professionnels d'envergure, un abonnement peut être nécessaire, mais pas pour les projets personnels, normalement). Voir [la documentation officielle sur les limitations de GitHub Actions selon votre abonnement](https://docs.github.com/en/actions/reference/usage-limits-billing-and-administration#about-billing-for-github-actions).

Avec GitHub, on ne parle plus de Pipelines, mais d'Actions. Tout comme avec GitLab, GitHub Actions permet d'exécuter un ensemble de tâches quand un événement se produit sur le repository (distant). Le lexique est toutefois assez différent et il vaut mieux éviter de mélanger.

- Un **Workflow** est une procédure automatique, décrivant les différents Jobs qui vont être lancés quand un Event se produit,
- un **Event** (push sur le repository, par exemple) on déclenche un ou plusieurs Jobs,
- un **Job** contient des Steps,
- une **Step** contient des actions,
- une **Action** est un script (une commande) à exécuter.

Les Jobs sont exécutés par des **runners** (et peuvent être différents pour chaque Job). Un **runner** lance les différentes actions sur une machine virtuelle (Ubuntu Linux, Microsoft Windows ou macOS)

![Un résumé des composants des Actions GitHub](https://docs.github.com/assets/images/help/images/overview-actions-design.png)

### Le dossier `.github/`

Pour mettre en place des Workflows, il faut créer un ensemble de fichiers `.yml` dans le dossier `.github/workflows/` du projet (en local, donc ;) ). Ces fichiers peuvent être nommé assez librement, mais leur nom doit être toujours en minuscule, et on remplace les espaces par des tirets `-`.

La documentation propose de créer le fichier `.github/workflows/learn-github-actions.yml`, contenant le code suivant (voir les commentaires pour le détail). Cette commande crée et prépare un environnement nodejs et exécute la commande `bats -v`

```yaml
# On donne un nom à notre Workflow (optionnel). C'est ce nom qui apparaitra sur GitHub
name: learn-github-actions
# On donne une liste d'événements pour le déclencher
# Ici, dès qu'on push sur le repo distant
on: [push]

# On liste les Jobs à effectuer
jobs:
    # On a un seul job : check-bats-version qui va préparer un projet nodejs 
    # et exécuter une commande
    check-bats-version:
        # Ce job est exécuté dans une machine virtuelle Ubuntu
        # Dans sa dernière version.
        # Pour l'exécuter dans une version précise (disons 19.04), il aurait fallu écrire
        # runs-on: ubuntu-19.04
        runs-on: ubuntu-latest
        # On définit les steps (la liste des actions) à exécuter
        steps:
            # On appelle une action déjà définie par la communauté (noter le mot-clé uses)
            # Ici, c'est une action qui va récupérer le code (via git clone, a priori) et nous mettre sur la bonne branche
            - uses: actions/checkout@v2
            # Une action pour préparer un environnement nodejs
            - uses: actions/setup-node@v2
                # Avec un paramètre spécifique : on veut la version 14 de nodejs
                with:
                  node-version: '14'
            # On lance une commande (run) pour installer la librairie bats
            - run: npm install -g bats
            # On lance la commande 
            - run: bats -v
```

Il est intéressant de noter, dans l'exemple ce-dessus, l'usage des mots-clés `uses` et `run` :
- [`uses` va utiliser un autre fichier, définit par la communauté](https://docs.github.com/en/actions/learn-github-actions/finding-and-customizing-actions) (disponible dans les actions de *tous* les projets) ou par vous-mêmes (voir plus bas), pour exécuter une ou plusieurs commandes (avec d'éventuels paramètres)
- `run` va exécuter une commande directement

#### Utiliser et définir ses propres actions

[La documentation officielle pour la création d'actions](https://docs.github.com/en/actions/creating-actions)

Définir vos propres actions vous permet de regrouper des actions courantes (préparer un environnement de tests pour un projet Symfony, par exemple) dans un fichier à part entière, afin de ne pas alourdir le fichier principal. Par convention, elles sont rangées dans le dossier `.github/actions/` de votre projet.

## Docker

### Définitions et concepts

### Utiliser une ou des images Docker

### Créer une image Docker

## CI de notre application Symfony

### Utilisation des bases

Dans un premier temps, nous allons créer un pipeline fictif, avec des echos comme scripts.

Dans une nouvelle branche Git, construire un pipeline respectant les consignes suivantes (les scripts sont indiqués entre parenthèses) :

- des tâches 
  - composer (`echo 'composer install'`)
  - database (`echo "création d'une BdD et exécution des migrations et fixtures"`)
  - tests unitaires (`echo 'tests unitaires'`)
  - tests fonctionnels (`echo 'tests fonctionnels'`)
  - déploiement prod (`echo 'déploiement prod'`), uniquement sur la branche main / master (votre branche principale) et à déclencher manuellement (ne doit pas être lancée automatiquement)
  - déploiement démo (`echo 'déploiement démo'`), uniquement sur la branche principale
  - déploiement App Review (`echo 'déploiement app review'`), sur les branches autres que votre branche principale

- des étapes :
  - `build` qui contiendra les tâches `composer` et `database`
  - `test` qui contiendra les tâches de tests unitaires et fonctionnels
  - `deploy` qui contiendra les tâches de déploiement (prod, démo et App Review)
  
Pour tester votre pipeline, faites un push de cette branche ;) .

Question supplémentaire, nécessaire pour la suite : comment faire en sorte de ne pas avoir à faire un `composer install` et de mettre en place la BdD pour chaque tâche ?

### Ajout de Docker

Maintenant, nous allons mettre en place des scripts réels. Pour cela, nous allons également utiliser 2 images Docker : 
- `drakona/php:7.4-symfony` en tant qu'image pour toutes nos tâches
- `mysql:5.7` en tant que service, pour obtenir une BdD

- Comment configurer MySQL ? (voir documentation de l'image mysql sur DockerHub)
- Comment avoir la bonne configuration dans le fichier `.env` pendant le pipeline ?
- Ajouter les scripts réels : 
  - la tâche `composer` doit lancer un `composer install`
  - la tâche `database` doit lancer les migrations et les fixtures
  
Pour le moment, les autres tâches vont continuer à faire des `echo`