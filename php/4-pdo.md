# PDO (PHP Data Object)

Rémi Jarjat / Développeur multi-rôles chez [Drakona](https://www.drakona.fr)

- L'extension PDO
- Usage
- Gérer les erreurs (les exceptions)
- MVC et PDO

## L'extension PDO

[La documentation sur PDO](https://www.php.net/manual/fr/book.pdo.php)

- Pourquoi ?
  - la plupart des SGBD gérés (et donc facilite le changement)
  - Requêtes préparées (sécurité et performance)
  - Transactions (ne pas casser les bases)
  - Facilité d'utilisation
  - Base pour tous les ORMs

### Quels SGBD utiliser avec PDO ?
  
SGBD : Système de Gestion de Base de Données

- Mysql
- Oracle
- PostgreSQL
- et bien d'autres

### Principes

- Un objet pour gérer votre BdD
- Les requêtes passent par cet objet
- Prévu pour vous envoyer des erreurs "claires et gérables"
- Les transactions
- Un paquet d'outils pour faciliter les requêtes

## Requêtes

- Requêtes directes ou préparées
- Passer des arguments
- Constantes utiles
- Marqueurs et paramètres nommés

### Se connecter à la base

- Créer une instance de PDO à utiliser dans le reste du site
- Utiliser nos identifiants une seule fois
- Savoir tout de suite en cas de soucis de connexion

```php
$dsn = 'mysql:dbname=cours;host=127.0.0.1';
$user = 'root'; // Utilisateur par défaut
$password = ''; // Par défaut, pas de mot de passe sur Wamp

try {
    $connection = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    echo 'Connexion échouée : ' . $e->getMessage();
}
```

### Requêtes directes

- Avec `PDO::query()` pour les `SELECT`
- Avec `PDO::exec()` pour celles qui ne renvoient pas de résultats

### PDO::query()

- Prend en paramètre une requête (dans une variable `$sql` dans la suite)
- S'appelle sur notre connexion : `$connection->query($sql)`
- Renvoie un tableau **associatif** avec les différentes lignes

```php
$sql =  'SELECT id, fullname, date FROM student ORDER BY fullname';
$results = $connection->query($sql);

foreach  ($results->fetchAll(PDO::FETCH_ASSOC) as $result) {
    var_dump($result);
}
```

### PDO::exec()

- Prend en paramètre une requête (dans une variable `$sql` dans la suite)
- S'appelle sur notre connexion : `$connection->exec($sql)`
- Renvoie le **nombre** de lignes affectées

```php
$sql = "INSERT INTO `student`(`fullname`) VALUES ('Rémi Jarjat'), ('Jean-Claude Duss'), ('Marc-André du Gaz de Schiste')";
$count = $connection->exec($sql); // $count contient 3

$sql = 'UPDATE student SET date = NOW()';
$count = $connection->exec($sql); // $count contient également 3 (on modifie toutes les lignes)
```

### Les requêtes préparées

- Pour une requête 
  - avec des paramètres que l'on peut vérifier
  - exécuter plusieurs fois plus rapidement
- Tous types de requêtes

### PDOStatement

[La documentation officielle](https://www.php.net/manual/fr/class.pdostatement.php)

- Un objet pour gérer les requêtes préparées
- Permet de les exécuter, leur passer des paramètres et diverses opérations

```php
$statement = $connection->prepare($sql);
$statement->execute($parameters);
$results = $statement->fetchAll();
```

### Les marqueurs de positionnement

- Pour lier des paramètres (variables PHP) à une requête
- Les paramètres sont simplement numérotés

```php
$param = "Test";
$statement = $connection->prepare('SELECT fullname FROM student WHERE fullname LIKE ?');
$statement->bindParam(1, $param, PDO::PARAM_STR);
$statement->execute();
```

### Les paramètres nommés

- Pour lier des paramètres (variables PHP) à une requête
- Les paramètres sont simplement numérotés

```php
$param = "Test";
$statement = $connection->prepare('SELECT fullname FROM student WHERE fullname LIKE :name');
$statement->bindParam(':name', $param, PDO::PARAM_STR);
$statement->execute();
```

## Les exceptions

- La [documentation officielle sur la classe PDOException](https://www.php.net/manual/fr/class.pdoexception.php)
- Le [chapitre de la documentation sur les exceptions](https://www.php.net/manual/fr/language.exceptions.php)

```php
$dsn = 'mysql:dbname=cours;host=127.0.0.1';
$user = 'root'; // Utilisateur par défaut
$password = ''; // Par défaut, pas de mot de passe sur Wamp

try {
    $connection = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    echo 'Connexion échouée : ' . $e->getMessage();
} catch (Exception $e) {
    echo 'Connexion échouée : ' . $e->getMessage();
}
```

## PHPMyAdmin et la console MySQL de Wamp

- [Un lien pour tester si Wamp est lancé](http://localhost/phpmyadmin/db_structure.php?server=1&db=cours)
- Pour voir notre base de données et la manipuler

## Exercices

Pour vous entrainer à manipuler PDO, utiliser le [repository Github dédié à divers exercices](https://github.com/Dreeckan/exercices-php/#8-base-de-donn%C3%A9es). Les exercices à partir du numéro 8 sont dédiés à cela.