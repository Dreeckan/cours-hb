# PDO (PHP Data Object)

## L'extension PDO

[La documentation sur PDO](https://www.php.net/manual/fr/book.pdo.php)

PDO est une extension de PHP, permettant la gestion de la <abbr title="Base de Données">BdD</abbr> (connexion et utilisation de requêtes SQL pour créer/modifier les données).

Il offre différentes fonctionnalités, dont :
- des requêtes préparées, pour améliorer la sécurité et les performances
- des transactions, pour exécuter un ensemble de requête, uniquement si **toutes** fonctionnent (sinon aucune donnée n'est ajoutée/modifiée)

PDO sert de base à de nombreux <abbr title="Object-Relational Mapping">ORM</abbr>, tels que Doctrine, que vous verrez dans [la partie consacrée à Symfony](../symfony/). 

### Quels <abbr title="Système de Gestion de Base de Données">SGBD</abbr> utiliser avec PDO ?
  
- Mysql (l'un des plus courants)
- Oracle 
- PostgreSQL
- et bien d'autres

### Principes

PDO offre des classes pour gérer :
- la connexion à la BdD
- la préparation et l'envoi de requêtes SQL
- la gestion des transactions


## Se connecter à la base

PDO fournit un objet (`PDO`) de connexion à la BdD, que l'on va utiliser pour faire ensuite nos requêtes. On en crée en général une instance, que l'on inclue dans nos autres scripts, pour faire des requêtes. Cet objet peut renvoyer une exception, pour vous permettre de détecter les problèmes de connexion dès que possible.

Pour se connecter, on crée (en général), un fichier spécifique, qu'on appelle sur nos pages (par exemple `includes/config.inc.php`)

```php
<?php
// Ici, adapter les valeurs de dbname et port à votre configuration
$dsn = 'mysql:dbname=cours;port=3306;host=127.0.0.1';
$user = 'root'; // Utilisateur par défaut
$password = ''; // Par défaut, pas de mot de passe sur Wamp

try {
    $connection = new PDO($dsn, $user, $password, [
        // Définition du mode d'erreur : on renvoie une exception 
        // dès qu'une erreur se produit dans les requêtes
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        // On défini sous quel format on récupère les données de la base
        // On peut les récupérer sous la forme :
        // - D'un tableau associatif avec PDO::FETCH_ASSOC
        // - D'un objet avec PDO::FETCH_OBJ
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    exit('Connexion échouée : ' . $e->getMessage());
}
```

## Gérer les erreurs

- La [documentation officielle sur la classe PDOException](https://www.php.net/manual/fr/class.pdoexception.php)
- Le [chapitre de la documentation sur les exceptions](https://www.php.net/manual/fr/language.exceptions.php)

Avec l'initialisation de la connexion ci-dessus, les requêtes renvoient une exception en cas de soucis. Si vous changez le paramètre `PDO::ATTR_ERRMODE`, les méthodes exécutant des requêtes peuvent renvoyer `false` si la requête SQL s'est mal passée. Pour récupérer le détail de l'erreur, vous pouvez utilise la méthode `errorInfo()` de PDO :

```php
if (!$isDone) {
    var_dump($connection->errorInfo());
    // Pour afficher seulement le message d'erreur, vous pouvez utiliser directement l'index 2 du tableau.
    throw new Exception('Erreur lors de la requête : '.$connection->errorInfo()[2]);
}
```

Dans la connexion, vous allez principalement avoir un seul type d'exception `PDOException`, mais vous pourriez avoir d'autres types d'exception :

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

## Requêtes directes

### PDO::query()

Utilisée pour les requêtes `SELECT` :
- Prend en paramètre une requête (dans une variable `$sql` dans la suite)
- S'appelle sur notre connexion : `$connection->query($sql)`
- Renvoie un objet `PDOStatement` (contenant une méthode `fetchAll()`, renvoyant un tableau **associatif** avec les différentes lignes)

Un exemple complet :

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
    throw new Exception('Erreur lors de la requête : '.$connection->errorInfo()[2]);
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

Utilisée pour les requêtes autres que `SELECT` :
- Prend en paramètre une requête (dans une variable `$sql` dans la suite)
- S'appelle sur notre connexion : `$connection->exec($sql)`
- Renvoie le **nombre** de lignes affectées

```php
// On écrit une requête, où on insère 3 éléments
$sql = "INSERT INTO `student`(`fullname`) VALUES ('Rémi Jarjat'), ('Jean-Claude Duss'), ('Marc-André du Gaz de Schiste')";
// On l'exécute et on récupère le nombre de lignes mises à jour
$count = $connection->exec($sql); // $count contient 3 (ou false en cas d'erreur)

// On met à jour tous les éléments de notre table student
$sql = 'UPDATE student SET date = NOW()';
// Si une erreur s'est produite, exec() renvoie une exception
$count = $connection->exec($sql); // $count contient également 3 (on modifie toutes les lignes)
```

Un second exemple, où on attrape les erreurs si elles ne créent pas une exception :

```php
$sql = "INSERT INTO contact (subject, message, email) VALUES ('Test', 'Un message de test super long !', 'test@test.com')";

// Ici $result contient le nombre de lignes modifiées ou false en cas d'erreur
$result = $connection->exec($sql);

// Si $result contient false, on a eu une erreur et on l'affiche
if (!$result) {
    throw new Exception('Erreur lors de la requête : '.$connection->errorInfo()[2]);
}
```

## Les requêtes préparées

Les principaux intérêts d'une requête préparée sont si on veut exécuter une requête avec des nombreux éléments, plusieurs fois ou si on souhaite passer des paramètres sans risquer des erreurs d'écriture (les concaténations de chaines peuvent être dangereuses et pénibles à debugger). Une requête préparée sera exécutée plus vite, si elle est appelée plusieurs fois. Personnellement, je préfère préparer toutes mes requêtes, pour des simplicités d'écriture.

En passant des paramètres, nous allons également pouvoir en vérifier le type, ce qui évitera pas mal d'erreurs côté SQL.

### PDOStatement

[La documentation officielle](https://www.php.net/manual/fr/class.pdostatement.php)

Cet objet intermédiaire va nous permettre de préparer les requêtes, afin de les optimiser et de réduire certaines répétitions de code.

Un squelette minimal :

```php
// On prépare une requête, que l'on va exécuter plus tard
/** @var PDOStatement $statement */
$statement = $connection->prepare($sql);

// On peut lui passer des paramètres directement au moment de l'exécution,
// mais nous allons utiliser la méthode bindParam() à la place, plus pratique
$statement->execute($parameters);

// Si la requête a réussi, on peut récupérer les résultats
/** @var array $results */
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

L'un des grands avantages des requêtes préparées est l'utilisation dans des boucles :

```php
$param = "Test";
$statement = $connection->prepare('INSERT INTO student (fullname) VALUES (?)');
$statement->bindParam(1, $param, PDO::PARAM_STR);
// À chaque exécution de la boucle, le contenu de $param va être changé
// et on insère la donnée modifiée au fur et à mesure
// (le contenu de $param est lu à chaque itération, grâce à bindParam)
for ($i = 0; $i < 10; $i++) {
    $param += $i;
    $statement->execute();
}
```

### Les paramètres nommés

- Pour lier des paramètres (variables PHP) à une requête
- Les paramètres sont nommés, permettant de les repérer plus facilement
- Un paramètre commence toujours par `:` suivi d'un nom

```php
// la méthode bindParam() attend une variable en second paramètre (passage par référence).
// Lui donner une valeur directement provoque une erreur.
$param = "Test";
$statement = $connection->prepare('INSERT INTO student (fullname) VALUES (:name)');
// Notre paramètre :name sera remplacé par la valeur de $param, à l'exécution de la requête
$statement->bindParam(':name', $param, PDO::PARAM_STR);
for ($i = 0; $i < 10; $i++) {
    $param += $i;
    $statement->execute();
}
```

#### Exemples concrets

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

$subject = '';
$message = '';
$email = '';
$pdoStatement->bindParam(':subject', $subject);
$pdoStatement->bindParam(':message', $message);
$pdoStatement->bindParam(':email', $email);

foreach ($contacts as $contact) {
    $subject = $contact['subject'];
    $message = $contact['message'];
    $email = $contact['email'];

    $count = $pdoStatement->execute();
    var_dump($count);
}
```

Un exemple de récupération de données :

```php
$sql = "SELECT * FROM contact";
$pdoStatement = $connection->prepare($sql);
$success = $pdoStatement->execute();

$results = $pdoStatement->fetchAll(PDO::FETCH_ASSOC);
exit(var_dump($results));
```

Un exemple avec utilisation de `fetch()` :

```php
$sql = "SELECT * FROM contact";
$pdoStatement = $connection->prepare($sql);
$isDone = $pdoStatement->execute();

while($result = $pdoStatement->fetch()) {
    var_dump($result);
}
```

## Récupérer l'identifiant du dernier élément enregistré

```php
$stmt = $connection->prepare("INSERT INTO truc (bidule, machin) VALUES(:bidule, :machin)");
$isDone = $stmt->execute();

// Ici, on récupère l'id du dernier élément inséré dans truc 
$id = $connection->lastInsertId();
```

## PHPMyAdmin et la console MySQL de Wamp

- [Un lien pour tester si Wamp est lancé](http://localhost/phpmyadmin/db_structure.php?server=1&db=cours)
- Pour voir notre base de données et la manipuler

## Exercices

Pour vous entrainer à manipuler PDO, utiliser
- les [exercices sur notre site de bonnets](99-exercices.md) (à partir de l'exercice 34)
- le [repository Github dédié à divers exercices](https://github.com/Dreeckan/exercices-php/#8-base-de-donn%C3%A9es). Les exercices à partir du numéro 8 sont dédiés à cela.