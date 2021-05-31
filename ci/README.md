# Intégration continue

Nous allons avoir besoin de notions sur :

- Git
- Gitlab / Github / Bitbucket / équivalent
- Docker

## Définitions

### Déploiement continu

L'idée du déploiement continu est de livrer les nouvelles fonctionnalités au client dès qu'elles sont disponibles. Pour cela, on déploie les modifications de manière **automatique** dès leur validation (en général par le client sur un autre environnement) ou leur fusion dans la branche principale.

On cherche ainsi à améliorer l'application en continu et créer des cycles courts de développement. Chaque déploiement pouvant être annulé facilement (car peu de modification), on évite aussi l'une des grandes contraintes des cycles longs.

### Intégration continue

L'intégration continue a pour but de vérifier chaque modification du code source, pour éviter les régressions et autres bugs (autant que possible). Un outil d'intégration continue permet de lancer automatiquement diverses actions de vérification du projet (compilation, linters, test unitaires et fonctionnels, etc.) ou toute autre tâche automatisable (cf
déploiement continu ;) ).

#### Pré-requis

- le code est versionné (git, svn, etc.)
- des outils de vérification automatiques existent dans le projet (tests, etc.)

### Outils d'intégration continue

- [Jenkins](https://www.jenkins.io/)
- [TravisCI](https://travis-ci.com/)
- [CruiseControl](http://cruisecontrol.sourceforge.net/)
- mais aussi [Github actions](https://docs.github.com/en/actions), [Bitbucket Pipelines](https://bitbucket.org/product/fr/features/pipelines) ou [Gitlab CI](https://docs.gitlab.com/ee/ci/)

Nous allons surtout voir le tout dernier élément de cette liste (Gitlab CI) car c'est celui que je maîtrise le mieux.

## [Gitlab](https://www.gitlab.com)

Bien que tout ce qui suit s'applique aussi bien à Github ou Bitbucket, la syntaxe et les denominations changent d'un outil à l'autre. Les concepts restent les mêmes et il est plutôt aisé d'adapter ce que vous verrez ici à d'autres outils de CI/CD.

Gitlab est un gestionnaire de repositories git en ligne. Il peut servir entre autre de :

- gestionnaire de tickets
- d'outil de revue de code
- plateforme de CI/CD
- et bien d'autres choses

Il est disponible :

- sur [Gitlab.com](https://www.gitlab.com)
- en image docker
- à installer sur un serveur

Nous allons nous baser sur Git et ses mécaniques, voici quelques resources pouvant être utiles pour le maîtriser :

- [Git Cheat Sheet](https://about.gitlab.com/images/press/git-cheat-sheet.pdf) (ou [en Français](https://github.github.com/training-kit/downloads/fr/github-git-cheat-sheet.pdf))
- [la documentation officielle](https://git-scm.com/docs)
- une [documentation Bitbucket](https://www.atlassian.com/fr/git/tutorials/learn-git-with-bitbucket-cloud) assez complète et en français

### Revue de code

L'un des grands intérêts de travailler avec Git (en plus d'avoir un code versionné) est de faciliter le travail collaboratif, grâce notamment aux revues de code.

Mais **pourquoi relire le code d'un autre dev ?**

- Vérifier que la demande initiale est respectée
- Que le code produit répond aux **bonnes pratiques communes**
- Avoir un second (ou troisième, quatrième, etc.) point de vue sur le travail effectué et trouver d'éventuels bugs

Cette revue de code se fait en général dans les Merge Requests (MR) du projet.

## CI / CD avec Gitlab

Un exemple de Workflow que nous pouvons construire :

![Un Workflow Gitlab : depuis une nouvelle branche, on lance les actions automatiques jusqu'au merge, qui déclenche d'autres actions automatiques](https://docs.gitlab.com/ee/ci/introduction/img/gitlab_workflow_example_11_9.png)

Pour se faire, notre principal outil va être le fichier `.gitlab-ci.yml`. C'est dans ce fichier que nous allons définir nos tâches (`jobs`) et nos étapes (`stages`).

- L'ensemble des étapes forment ce qu'on appelle un `Pipeline`.
- Les étapes contiennent des tâches. Ce sont des commandes (actions) que l'on va faire lancer à notre serveur (Gitlab).
- Les tâches sont exécutées par des `runners`

### Configuration du fichier de CI

[Mon pense-bête favori](https://blog.eleven-labs.com/fr/introduction-gitlab-ci/), par Nicolas Grévin de Eleven Labs

Son nom et son emplacement sont standard : `.gitlab-ci.yml` à la racine du projet Sur Gitlab, vous pouvez modifier cela dans : `Settings (menu de gauche) > CI/CD > General pipelines > Custom CI config path`

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

# Un autre job, qui va déployer notre application sur le serveur de prod
deploy:
  # Avant d'exécuter le script, on va faire un ensemble de commandes,
  # pour avoir une clé SSH valide et prête à l'emploi
  before_script:
    # On s'assure que openssh est installé
    - 'command -v ssh-agent >/dev/null || ( apt-get update -y && apt-get install openssh-client -y )'
    # On lance le client SSH
    - eval $(ssh-agent -s)
    # On va chercher la variable d'environnement DEPLOY_SK, définie dans Gitlab
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

### Les runners

Pour lancer les tâches, Gitlab utilise des programmes, les `runners`. Gitlab fourni de nombreux runners et vous permet éventuellement d'en créer vous-même, en quelques lignes de commande, si vous avez votre propre serveur.

Il y a 4 grands types de runners, disponibles par défaut :

- shell (la ligne de commande du serveur)
- ssh (on exécute nos commandes *via* SSH sur un autre serveur)
- docker (on exécute nos commandes dans un container Docker)
- Kubernetes (on exécute nos commandes dans un environnement Kubernetes)

:warning: Conseil gitlab.com : toujours utiliser docker (avec le tag `gitlab-org-docker` sur vos tâches, à moins que vous ne codiez en Ruby ;) )

### Tâches

- L'essentiel : script
- Regrouper les différentes tâches dans des étapes
- Des propriétés supplémentaires

### Pipelines

- Pipelines et Merge requests
- Environnements
- App reviews

### D'autres outils de CI/ CD

- [Jenkins](https://www.jenkins.io/)
- [Bitbucket pipelines](https://bitbucket.org/product/features/pipelines)
- [Github Actions](https://github.com/features/actions)

### D'autres outils utiles

- [Un grand ensemble de tuto devOps par Xavki](https://gitlab.com/xavki/sommaire-xavki-tutos-fr)
- [Un outil d'analyse statique pour Php](https://phpstan.org/)
- [Git workflow](https://www.atlassian.com/fr/git/tutorials/comparing-workflows/gitflow-workflow)
- [Sass](https://sass-lang.com/) (préprocesseur css)
- [Ansible](https://docs.ansible.com/ansible/latest/index.html) (automatisation de tâches et gestion d'état)
- [Webpack](https://webpack.github.io/) (à utiliser notamment via [Webpack Encore](https://symfony.com/doc/current/frontend.html) )
- [Gulp](https://gulpjs.com/) (un task launcher javascript plus ancien que Webpack, mais toujours d'actualité)
- [Une aide pour utiliser Linux et Nginx](https://gist.github.com/Dreeckan/446bf16429966b457b36d0c9ed53876c)
- [Une doc pour les regrouper toutes...](ttps://devdocs.io/)
