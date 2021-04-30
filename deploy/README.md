# Exercice de déploiement

Le serveur sur lequel nous allons déployer : 
- `51.178.42.85`
- utilisateur `debian`, mot de passe `m2Xr4YmbjHKW`

Etapes : 
- Avoir une clé SSH (si besoin, utiliser la commande `ssh-keygen` pour en créer une)
- Utiliser cette clé ssh `ssh-add` (si vous utilisez un chemin particulier, différent de `/c/Users/remij/.ssh/id_rsa` (git bash) ou `C:\Users\remij/.ssh/id_rsa` (Powershell), ajoutez ce chemin `ssh-add /c/Users/remij/.ssh/id_rsa`). On utilise la clé privée ici (celle sans extension)
- L'ajouter au serveur avec la commande `ssh-copy-id debian@51.178.42.85` (entrer le mot de passe au dessus quand demandé, vous n'aurez alors plus besoin de l'entrer)
- Télécharger le fichier deployer.phar dans un projet Symfony ([https://deployer.org/deployer.phar](https://deployer.org/deployer.phar))
- Créer un fichier de configuration `deploy.php` dans ce projet
    - Pour le paramètre `repository`, récupérer le lien de clone de votre repository sur Github / Gitlab / Bitbucket (`git@nomDuServeur:votreRepository`) 
    - Créer un host(), avec le stage `prod` et en nom de dossier pour le déploiement `/var/www/votreNom/`
- Tester que la connexion fonctionne avec `php deployer.phar ssh prod` (si vous avez créé un `stage` portant le nom `prod`)
- Une fois votre script en place, tester le déploiement

Fichier d'exemple de `deploy.php` : 
```php
<?php

namespace Deployer;

require 'recipe/symfony4.php';

// Project name
set('application', 'name');

// Project repository (use ssh version, starting with git@)
set('repository', 'urlVersVotreRepo');

set('git_tty', false);

// Shared files/dirs between deploys
add('shared_files', []);
add('shared_dirs', [
    'var/log',
    'var/sessions',
]);

// Writable dirs by web server
add('writable_dirs', [
    'var/log',
    'var/sessions',
]);
set('allow_anonymous_stats', false);

set('http_user', 'www-data');

// Hosts

host('51.77.158.108')
    ->stage('prod')
    ->user('debian')
    ->port(22)
    ->forwardAgent(true)
    ->set('deploy_path', '/var/www/test.com')
    ->set('branch', 'master')
    ->set('composer_options', '{{composer_action}} --verbose --prefer-dist --no-progress --no-interaction --optimize-autoloader --no-suggest');

// Tasks

```