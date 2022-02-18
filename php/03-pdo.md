# PDO (PHP Data Object)

## L'extension PDO

[La documentation sur PDO](https://www.php.net/manual/fr/book.pdo.php)

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/fc75e45d8a0c48b8bb3f487febb136bc" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

PDO est une extension de PHP, permettant la gestion de la <abbr title="Base de Données">BdD</abbr> (connexion et utilisation de requêtes SQL pour créer/modifier les données).

Il offre différentes fonctionnalités, dont :
- des requêtes préparées, pour améliorer la sécurité et les performances
- des transactions, pour exécuter un ensemble de requête, uniquement si **toutes** fonctionnent (sinon aucune donnée n'est ajoutée/modifiée)

PDO sert de base à de nombreux <abbr title="Object-Relational Mapping">ORM</abbr>, tels que Doctrine, que vous verrez dans [la partie consacrée à Symfony](../symfony/). 

On peut l'utiliser avec les <abbr title="Système de Gestion de Base de Données">SGBD</abbr> suivants (entre autre) :
- Mysql (l'un des plus courants)
- PostgreSQL (une excellente référence)
- Oracle 
- et bien d'autres

Dans les faits, PDO offre des classes pour gérer :
- la connexion à la BdD
- la préparation et l'envoi de requêtes SQL
- la gestion des transactions


## Se connecter à la base

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/6b42ca476091438eb83254eea75cd2ae" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

PDO fournit un objet (`PDO`) de connexion à la BdD, que l'on va utiliser pour faire ensuite nos requêtes. On en crée en général une instance, que l'on inclue dans nos autres scripts, pour faire des requêtes. Cet objet peut renvoyer une exception, pour vous permettre de détecter les problèmes de connexion dès que possible.

Pour se connecter, on crée (en général), un fichier spécifique, qu'on appelle sur nos pages (par exemple `includes/config.inc.php`)

```php
<?php
// Ici, adapter les valeurs de dbname et port à votre configuration
// dbname contient le nom de la BdD à utiliser
// port est le port à utiliser (3306 par défaut)
// host est le nom d'hôte de notre serveur de BdD
// (127.0.0.1 ou localhost, les deux sont équivalents)
$dsn = 'mysql:dbname=cours;port=3306;host=127.0.0.1';
$user = 'root'; // Utilisateur par défaut
$password = ''; // Par défaut, pas de mot de passe sur Wamp

// Try nous permet d'attraper une exception
// catch (il peut y en avoir plusieurs) d'exécuter d'autres instructions 
// quand une erreur de type PDOException est levée
try {
    // On crée une connexion (objet PDO) à norte BdD,
    // nous pourrons nous en servir dans la suite du programme
    $connection = new PDO($dsn, $user, $password, [
        // Définition du mode d'erreur : on renvoie une exception 
        // dès qu'une erreur se produit dans les requêtes
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        // On définit sous quel format on récupère les données de la base
        // On peut les récupérer sous la forme :
        // - D'un tableau associatif avec PDO::FETCH_ASSOC
        // - D'un objet avec PDO::FETCH_OBJ
        // - D'un objet utilisant une de vos classes avec PDO::FETCH_CLASS
        // - D'injections dans un objet avec PDO::FETCH_INTO
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    exit('Connexion échouée : ' . $e->getMessage());
}
```

## Gérer les erreurs

- La [documentation officielle sur la classe PDOException](https://www.php.net/manual/fr/class.pdoexception.php)
- Le [chapitre de la documentation sur les exceptions](https://www.php.net/manual/fr/language.exceptions.php)

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/2d1b828fb9a744bc9b82fc2f718ce6bc" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

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

Lorsque vous exécutez des requêtes avec PDO, des exceptions peuvent être levées. De la même manière que pour la connexion à la <abbr title="Base de Données">BdD</abbr>, vous pouvez utiliser un bloc try-catch pour gérer l'erreur (ou laisser l'erreur se produire et arrêter votre programme, selon les cas).



## Requêtes directes

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/7b8de596a0bc4ebc82152e05a11ac467" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

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
// Si une erreur est survenue (requête invalide), query() lève une exception
$statement = $connection->query($sql);

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
$count = $connection->exec($sql); 
// $count contient 3 (ou une exception est levée en cas d'erreur)

// On met à jour tous les éléments de notre table student
$sql = 'UPDATE student SET date = NOW()';
// Si une erreur s'est produite, exec() renvoie une exception
$count = $connection->exec($sql); 
// $count contient également 3 (on modifie toutes les lignes)
```

### Quelques exemples en vidéo

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/2d438dae5ffc49abb7728848adc61376" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## Les requêtes préparées

Une requête préparée permet d'exécuter une requête complexe, d'en simplifier l'écriture (surtout pour les requêtes avec paramètres) et d'éviter les erreurs tant d'écriture que d'injection SQL (sécurisation des données). 
Une requête préparée sera exécutée plus vite, si elle est appelée plusieurs fois. Personnellement, je préfère préparer toutes mes requêtes, pour simplifier leur écriture et éviter de concaténer des chaînes de caractères.

### PDOStatement

[La documentation officielle](https://www.php.net/manual/fr/class.pdostatement.php)

Cet objet intermédiaire va nous permettre de préparer les requêtes, afin de les optimiser et de réduire certaines répétitions de code.

Un squelette minimal :

```php
// On prépare une requête, que l'on va exécuter plus tard
/** @var PDOStatement $statement */
$statement = $connection->prepare($sql);

// On peut lui passer des paramètres directement au moment de l'exécution.
// Nous allons utiliser la méthode bindParam() pour des exécutions dans des boucles
// ou avec un tableau en paramètre pour une requête unique
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

L'exemple ci-dessus est équivalent à :

```php
// la méthode bindParam() attend une variable en second paramètre (passage par référence).
// Lui donner une valeur directement provoque une erreur.
$statement = $connection->prepare('SELECT fullname FROM student WHERE fullname LIKE ?');
// Attention, la numérotation des paramètres commence à 1, pas à 0
$statement->bindValue(1, "Test", PDO::PARAM_STR);
$statement->execute();
```

L'exemple ci-dessus est équivalent à :

```php
$statement = $connection->prepare('SELECT fullname FROM student WHERE fullname LIKE ?');
$statement->execute([
    "Test",
]);
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
    $param .= $i;
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
    $param .= $i;
    $statement->execute();
}
```

L'exemple ci-dessus est équivalent à :

```php
$statement = $connection->prepare('INSERT INTO student (fullname) VALUES (:name)');
// Notre paramètre :name sera remplacé par la valeur de $param, à l'exécution de la requête
for ($i = 0; $i < 10; $i++) {
    $statement->bindValue(':name', "Test".$i, PDO::PARAM_STR);
    $statement->execute();
}
```

L'exemple ci-dessus est équivalent à :

```php
$statement = $connection->prepare('INSERT INTO student (fullname) VALUES (:name)');
// Notre paramètre :name sera remplacé par la valeur de $param, à l'exécution de la requête
for ($i = 0; $i < 10; $i++) {
    $param .= $i;
    $statement->execute([
        // Ici les : ne sont pas obligatoires
        ':name' => 'Test'.$i,
    ]);
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
    ],
    [
        'subject' => 'Test3',
        'message' => 'Un message de test3 super long !',
        'email'   => 'test3@test.com',
    ],
    [
        'subject' => 'Test4',
        'message' => 'Un message de test4 super long !',
        'email'   => 'test4@test.com',
    ],
    [
        'subject' => 'Test5',
        'message' => 'Un message de test5 super long !',
        'email'   => 'test5@test.com',
    ],
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

La même chose, avec `bindValue()` :

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
    ],
    [
        'subject' => 'Test3',
        'message' => 'Un message de test3 super long !',
        'email'   => 'test3@test.com',
    ],
    [
        'subject' => 'Test4',
        'message' => 'Un message de test4 super long !',
        'email'   => 'test4@test.com',
    ],
    [
        'subject' => 'Test5',
        'message' => 'Un message de test5 super long !',
        'email'   => 'test5@test.com',
    ],
];

foreach ($contacts as $contact) {
    $pdoStatement->bindValue(':subject', $contact['subject']);
    $pdoStatement->bindValue(':message', $contact['message']);
    $pdoStatement->bindValue(':email', $contact['email']);

    $count = $pdoStatement->execute();
    var_dump($count);
}
```

La même chose, sans l'appel à `bindParam()` ou `bindValue()` :

:warning: Notez que l'écriture est plus courte, mais la vérification des données est moins efficace.

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
    ],
    [
        'subject' => 'Test3',
        'message' => 'Un message de test3 super long !',
        'email'   => 'test3@test.com',
    ],
    [
        'subject' => 'Test4',
        'message' => 'Un message de test4 super long !',
        'email'   => 'test4@test.com',
    ],
    [
        'subject' => 'Test5',
        'message' => 'Un message de test5 super long !',
        'email'   => 'test5@test.com',
    ],
];

foreach ($contacts as $contact) {
    $count = $pdoStatement->execute([
        ':subject' => $contact['subject'],
        ':message' => $contact['message'],
        ':email'   => $contact['email'],
    ]);
    var_dump($count);
}
```

Un exemple de récupération de données :

```php
$sql = "SELECT * FROM contact";
$pdoStatement = $connection->prepare($sql);
$success = $pdoStatement->execute();

$results = $pdoStatement->fetchAll();
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

// Ici, on récupère l'id du dernier élément inséré dans la table truc 
$id = $connection->lastInsertId();
```

## Remplir des objets avec nos données

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/42852fca3e194ec9a5658009e3a87dd7" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Avec PDO, vous pouvez remplir directement vos objets avec les constantes `PDO::FETCH_CLASS` ou `PDO::FETCH_INTO`. Dans les deux cas, votre objet PHP sera rempli avec les données récupérées en base !
Le premier crée une instance de la classe demandée, quoiqu'il arrive. Le second met à jour une instance existante.

```php
require_once("classes/User.php");
$sth = $db->prepare("SELECT * FROM user WHERE id = 1");

// On demande à PDO de nous créer un User
// avec ce qu'il va récupérer en BdD
$sth->setFetchMode( PDO::FETCH_CLASS, User::class);
$sth->execute();
// On a une nouvelle instance de notre classe User
// avec ses données remplies.
$user = $sth->fetch();

$user = new User();
$sth->setFetchMode( PDO::FETCH_INTO, $user);
$sth->execute();
// On a rempli les données de notre user
// à partir des données en base.
$user = $sth->fetch();
```

:warning: `PDO::FETCH_CLASS` appelle le constructeur **après** avoir rempli les données de l'objet. 

Pour utiliser les termes de la documentation :

> Lorsque des objets sont récupérés via PDO::FETCH_CLASS, les propriétés de l'objet sont assignées en premier, puis le constructeur de la classe est appelé. Si PDO::FETCH_PROPS_LATE est également donné, cet ordre est inversé, c'est-à-dire d'abord le constructeur est appelé, et ensuite les propriétés sont assignées. 

Si cela pose problème, vous pouvez ajouter un drapeau (flag) supplémentaire :

```php
// On peut utiliser plusieurs flags pour plus d'options
$sth->setFetchMode(PDO::FETCH_CLASS|PDO::FETCH_PROPS_LATE, User::class);
$user = $sth->fetch();
```

## Exercices

Pour vous entrainer à manipuler PDO, utiliser
- les [exercices sur notre site de bonnets](90-exercices.md#_26-creer-une-base-de-donnees) (à partir de l'exercice 26)
- le [repository Github dédié à divers exercices](https://github.com/Dreeckan/exercices-php/).
