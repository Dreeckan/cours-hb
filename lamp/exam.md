# QCM LAMP

## 1. Quel serveur web avons-nous utilisé pour le développement de notre site Symfony ?

- [ ] Apache
- [ ] Nginx
- [ ] Symfony
- [ ] Php

## 2. Quel serveur de Base de Données avons-nous utilisé en Php et Symfony ?

- [ ] MariaDB
- [ ] MySQL
- [ ] PostgreSQL
- [ ] Apache

## 3. Quelle affirmation est juste ?

- [ ] Un serveur web récupère en temps réel ce qu'un utilisateur entre dans les champs de formulaire
- [ ] Un serveur web récupère les requêtes HTTP envoyées par le navigateur de l'utilisateur
- [ ] Un serveur web renvoie des fichiers PHP au navigateur de l'utilisateur
- [ ] Un serveur web fait le lien entre les fichiers du navigateur et une URL 

## 4. Quelle affirmation est juste ?

- [ ] Un serveur web appelle la base de données
- [ ] Un serveur web appelle un serveur DNS
- [ ] Un serveur web appelle un nom de domaine
- [ ] Un serveur web appelle un serveur d'application

## 5. Quelle affirmation est fausse ?

- [ ] PHP dispose d'un serveur web intégré
- [ ] Symfony utilise le serveur web de PHP pour créer un serveur web
- [ ] Les fichiers d'un site sont interprétés directement par le serveur web
- [ ] Un serveur web fait le lien entre un nom de domaine et les fichiers d'un site

## 6. Comment le serveur de BdD est-il appelé ?

- [ ] par le serveur web
- [ ] par le serveur d'application
- [ ] par des requêtes du navigateur
- [ ] par MySQL et des requêtes SQL

## 7. Comment récupère-t-on des données dans un serveur de BdD

- [ ] avec des requêtes SQL envoyées par le serveur web
- [ ] avec des requêtes PHP envoyées par le serveur web
- [ ] avec des requêtes SQL envoyées par le serveur d'application
- [ ] avec des requêtes PHP envoyées par le serveur d'application

## 8. Avec Php/Symfony, comment récupère-t-on des données depuis la BdD ?

- [ ] Avec des requêtes `INSERT INTO` avec l'une des fonctions du langage (PDO/Doctrine par exemple)
- [ ] Avec des requêtes `SELECT` envoyées au serveur web
- [ ] Avec des requêtes `SELECT` avec l'une des fonctions du langage (PDO/Doctrine par exemple)
- [ ] Avec des requêtes `INSERT INTO` envoyées au serveur web

## 9. Avec Wamp, comment sont interprétés les fichiers `.php` et leur contenu ?

- [ ] Avec Php-fpm, appelé par Apache (Php-fpm interprète alors les scripts)
- [ ] Via Apache, qui fait interpréter les scripts par le programme Php
- [ ] Les fichiers php sont compilés et non interprétés
- [ ] Wamp utilise directement un serveur Php pour interpréter les scripts

## 10. Avec Symfony, comment sont interprétés les fichiers `.php` et leur contenu ?

- [ ] Avec Php-fpm, appelé par Apache (Php-fpm interprète alors les scripts)
- [ ] Via Apache, qui fait interpréter les scripts par le programme Php
- [ ] Les fichiers php sont compilés et non interprétés
- [ ] Symfony utilise directement un serveur Php pour interpréter les scripts

## 11. Comment appelle-t-on les fichiers de configuration d'un site avec Apache ?

- [ ] Virtual Host
- [ ] Remote Host
- [ ] Real Host
- [ ] Visual Host

## 12. Quelle directive n'existe pas dans une configuration Apache ?

- [ ] DocumentRoot
- [ ] server
- [ ] ServerName
- [ ] ServerAlias

## 13. Dans quel dossier se trouvent (par défaut) les configurations des sites ?

- [ ] `/etc/apache2/sites-available/`
- [ ] `/etc/apt/sites-enabled/`
- [ ] `/etc/www-data/sites-enabled/`
- [ ] `/etc/apache2-sites/available/`

## 14. Quel code est juste pour configurer l'accès à la BdD avec PDO ?

- [ ]

```php
$dsn = 'mysql:db=cours;port=3306;host=127.0.0.1';
$user = 'root';
$password = '';

try {
    $connection = new PDO($dsn, $users, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    exit('Connexion échouée : ' . $e->getMessage());
}
```

- [ ]

```php
$dsn = 'mysql:dbname=cours;ports=3306;host=127.0.0.1';
$user = 'root';
$password = '';

try {
    $connection = new PDOConnect($dsn, $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    exit('Connexion échouée : ' . $e->getMessage());
}
```

- [ ]

```php
$dsn = 'mysql:dbname=cours;ports=3306;host=127.0.0.1';
$user = 'root';
$password = '';

try {
    $connection = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    exit('Connexion échouée : ' . $e->getMessage());
}
```

- [ ]

```php
$dsn = 'mysql:dbname=cours;port=3306;host=127.0.0.1';
$user = 'root'; 
$password = '';

try {
    $connection = new PDO($dns, $user, $pass);
} catch (PDOException $e) {
    exit('Connexion échouée : ' . $e->getMessage());
}
```

## 15. Quel code est juste pour configurer l'accès à la BdD avec Symfony ?

- [ ]

```php
$dsn = 'mysql:db=cours;port=3306;host=127.0.0.1';
$user = 'root';
$password = '';

try {
    $connection = new PDO($dsn, $users, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    exit('Connexion échouée : ' . $e->getMessage());
}
```

- [ ] Dans un fichier `.env.local`

```dotenv
DATABASE_URL=mysql://root:pass:3306/cours
```

- [ ] Dans un fichier `.env.local`

```dotenv
DATABASE_URL=mysql://root:pass@127.0.0.1:336/cours
```

- [ ] Dans un fichier `.env.local`

```dotenv
DATABASE_URL=mysql://root:pass@127.0.0.1:3306/cours
```

## 16. 