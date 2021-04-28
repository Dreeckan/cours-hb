# PDO (PHP Data Object)

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
- Prévu pour vous envoyer des erreurs "claires et gérables" (attention, ironie)
- Les transactions (faire plusieurs requête et les annuler facilement en cas de souci dans l'une d'entre elles)
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

Pour se connecter, on crée (en général), un fichier spécifique, qu'on appelle sur nos pages (par exemple `includes/config.inc.php`)
```php
// Ici, adapter les valeurs de dbname et port à votre configuration
$dsn = 'mysql:dbname=cours;port=3306;host=127.0.0.1';
$user = 'root'; // Utilisateur par défaut
$password = ''; // Par défaut, pas de mot de passe sur Wamp

try {
    $connection = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    exit('Connexion échouée : ' . $e->getMessage());
}
```

### Requêtes directes

- Avec `PDO::query()` pour les `SELECT`
- Avec `PDO::exec()` pour celles qui ne renvoient pas de résultats

### PDO::query()

- Prend en paramètre une requête (dans une variable `$sql` dans la suite)
- S'appelle sur notre connexion : `$connection->query($sql)`
- Renvoie un objet `PDOStatement` (contenant une méthode `fetchAll()`, renvoyant un tableau **associatif** avec les différentes lignes) ou `false` en cas d'erreur

```php
// On crée notre requête, en prenant soin qu'elle soit valide (tester dans PhpMyAdmin, par exemple)
$sql =  'SELECT id, fullname, date FROM student ORDER BY fullname';
// On appelle notre objet PDO ($connection)
// et on utilise sa méthode query() pour exécuter notre requête
// On récupère un objet PDOStatement qui va nous permettre de recevoir nos résultats
// Si une erreur est survenue, query() renvoie false
$statement = $connection->query($sql);

// Si $result contient false, on a eu une erreur et on l'affiche
if (!$statement) {
    // Vous n'êtes bien sûr pas obligés d'arrêter l'exécution du programme 
    exit(var_dump($connection->errorInfo()));
}

// Si on souhaite récupérer tous nos résultats dans un tableau associatif,
// on utilise fetchAll() 
$results = $statement->fetchAll(PDO::FETCH_ASSOC);

// On parcourt nos résultats
foreach  ($results as $result) {
    var_dump($result);
}
```

### PDO::exec()

- Prend en paramètre une requête (dans une variable `$sql` dans la suite)
- S'appelle sur notre connexion : `$connection->exec($sql)`
- Renvoie le **nombre** de lignes affectées

```php
// On écrit une requête, où on insère 3 éléments
$sql = "INSERT INTO `student`(`fullname`) VALUES ('Rémi Jarjat'), ('Jean-Claude Duss'), ('Marc-André du Gaz de Schiste')";
// On l'exécute et on récupère le nombre de lignes mises à jour
$count = $connection->exec($sql); // $count contient 3

// On met à jour tous les éléments de notre table student
$sql = 'UPDATE student SET date = NOW()';
$count = $connection->exec($sql); // $count contient également 3 (on modifie toutes les lignes)
```

Un second exemple, où on attrape les erreurs :

```php
$sql = "INSERT INTO contact (subject, message, email) VALUES ('Test', 'Un message de test super long !', 'test@test.com')";

// Ici $result contient le nombre de lignes modifiées ou false en cas d'erreur
$result = $connection->exec($sql);

// Si $result contient false, on a eu une erreur et on l'affiche
if (!$result) {
    var_dump($connection->errorInfo());
}
```

### Les requêtes préparées

Les principaux intérêts d'une requête préparée sont si on veut exécuter une requête avec des nombreux éléments, plusieurs fois ou si on souhaite passer des paramètres sans risquer des erreurs d'écriture (les concaténations de chaines peuvent être dangereuses et pénibles à debugger). Une requête préparée sera exécutée plus vite, si elle est appelée plusieurs fois. Personnellement, je préfère préparer toutes mes requêtes, pour des simplicités d'écriture.

En passant des paramètres, nous allons également pouvoir en vérifier le type, ce qui évitera pas mal d'erreurs côté SQL.

### PDOStatement

[La documentation officielle](https://www.php.net/manual/fr/class.pdostatement.php)

- Un objet pour gérer les requêtes préparées
- Permet de les exécuter, leur passer des paramètres et diverses opérations

Un squelette minimal :

```php
// On prépare une requête, que l'on va exécuter plus tard
$statement = $connection->prepare($sql);

// On peut lui passer des paramètres directement au moment de l'exécution,
// mais nous allons utiliser la méthode bindParam() à la place, plus pratique
$statement->execute($parameters);

// Si la requête a réussi, on peut récupérer les résultats
$results = $statement->fetchAll();
```

### Les marqueurs de positionnement

- Pour lier des paramètres (variables PHP) à une requête
- Les paramètres sont simplement numérotés

```php
// la méthode bindParam() attend une variable en second paramètre (passage par référence).
// Lui donner une valeur directement provoque une erreur.
$param = "Test";
$statement = $connection->prepare('SELECT fullname FROM student WHERE fullname LIKE ?');
// Attention, la numérotation des paramètres commence à 1, pas à 0
$statement->bindParam(1, $param, PDO::PARAM_STR);
$statement->execute();
```

### Les paramètres nommés

- Pour lier des paramètres (variables PHP) à une requête
- Les paramètres sont nommés, permettant de les repérer plus facilement
- Un paramètre commence toujours pas `:` suivi d'un nom

```php
// la méthode bindParam() attend une variable en second paramètre (passage par référence).
// Lui donner une valeur directement provoque une erreur.
$param = "Test";
$statement = $connection->prepare('SELECT fullname FROM student WHERE fullname LIKE :name');
// Notre paramètre :name sera remplacé par la valeur de $param, à l'exécution de la requête
$statement->bindParam(':name', $param, PDO::PARAM_STR);
$statement->execute();
```

#### Exemples concrets, avec les erreurs

Un exemple d'une requête préparée, insérant un tableau de données dans une table `contact`

```php
$sql = "INSERT INTO contact (subject, message, email) VALUES (:subject, :message, :email)";

$pdoStatement = $connection->prepare($sql);

$contacts = [
    [
        'subject' => 'Test',
        'message' => 'Un message de test super long !',
        'email'   => 'test@test.com',
    ],
    [
        'subject' => 'Test2',
        'message' => 'Un message de test2 super long !',
        'email'   => 'test2@test.com',
    ]
];

foreach ($contacts as $contact) {
    $pdoStatement->bindParam(':subject', $contact['subject']);
    $pdoStatement->bindParam(':message', $contact['message']);
    $pdoStatement->bindParam(':email', $contact['email']);

    $count = $pdoStatement->execute();

    if ($count === false) {
        exit(var_dump($connection->errorInfo()));
    }
}
```

Un exemple de récupération de données :

```php
$sql = "SELECT * FROM contact";
$pdoStatement = $connection->prepare($sql);
$success = $pdoStatement->execute();

if (!$success) {
    exit(var_dump($connection->errorInfo()));
}

$results = $pdoStatement->fetchAll(PDO::FETCH_ASSOC);
exit(var_dump($results));
```

Un exemple avec utilisation de `fetch()` :

```php
$sql = "SELECT * FROM contact";
$pdoStatement = $connection->prepare($sql);
$success = $pdoStatement->execute();

if (!$success) {
    exit(var_dump($connection->errorInfo()));
}

while($result = $pdoStatement->fetch(PDO::FETCH_ASSOC)) {
    var_dump($result);
}
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