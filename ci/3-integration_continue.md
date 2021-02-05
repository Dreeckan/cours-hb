# CI / CD avec Gitlab

[Mon pense-bête favori](https://blog.eleven-labs.com/fr/introduction-gitlab-ci/), par Nicolas Grévin de Eleven Labs

- le fichier `.gitlab-ci.yml`
- les tâches (`jobs`)
- les étapes (`stages`)
- Les pipelines

## Configuration du fichier de CI

- Nom et emplacement standard : `.gitlab-ci.yml` à la racine du projet
- Modifiable dans votre projet : `Settings > CI/CD > General pipelines > Custom CI config path`

## Les runners

- Grands types
    - kubernetes
    - shell
    - docker
    - ssh
- Conseil gitlab.com : toujours utiliser docker (avec le tag `gitlab-org-docker` sur vos tâches)

## Tâches

- L'essentiel : script
- Regrouper les différentes tâches dans des étapes
- Des propriétés supplémentaires

## Pipelines

- Pipelines et Merge requests
- Environnements
- App reviews

## Et maintenant, à vos projets !

# D'autres outils de CI/ CD

- [Jenkins](https://www.jenkins.io/)
- [Bitbucket pipelines](https://bitbucket.org/product/features/pipelines)
- [Github Actions](https://github.com/features/actions)

# D'autres outils utiles

- [Un grand ensemble de tuto devOps par Xavki](https://gitlab.com/xavki/sommaire-xavki-tutos-fr)
- [Un outil d'analyse statique pour Php](https://phpstan.org/)
- [Git workflow](https://www.atlassian.com/fr/git/tutorials/comparing-workflows/gitflow-workflow)
- [Sass](https://sass-lang.com/) (préprocesseur css)
- [Ansible](https://docs.ansible.com/ansible/latest/index.html) (automatisation de tâches et gestion d'état)
- [Webpack](https://webpack.github.io/) (à utiliser notamment via [Webpack Encore](https://symfony.com/doc/current/frontend.html) )
- [Gulp](https://gulpjs.com/) (un task launcher javascript plus ancien que Webpack, mais toujours d'actualité)
- [Une aide pour utiliser Linux et Nginx](https://gist.github.com/Dreeckan/446bf16429966b457b36d0c9ed53876c)
- [Une doc pour les regrouper toutes...](ttps://devdocs.io/)
