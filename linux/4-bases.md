# Commandes de base

Comprendre les commandes :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/15722dba071a4323be5ac835ab24eb32" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## Une commande

- Un programme (exemple : `ls`)
- éventuellement des paramètres (exemple `ls /`)
- éventuellement des options (`ls -al /` = `ls -a -l /` = `ls --all -l /`), qui peuvent être en 1 ou plusieurs lettres (la casse est importante)
- éventuellement des paramètres à ces options
- un manuel pour tout vous expliquer (`ls --help` = `man ls`)

## Où suis-je ?

`pwd` renvoie le chemin absolu correspondant au dossier en cours

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/72881c6766054c8bb3be58d8a6eace22" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## Changer de dossier

La version en vidéo (avec explication des chemins relatifs et absolus) :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/58115d6aac7f460896a529777484f313" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

`cd chemin_vers_le_dossier` où chemin_vers_le_dossier peut être :

- un chemin absolu, commençant par `/` et indiquant tout le chemin depuis la racine jusqu'au dossier (par exemple `/var/log/nginx/`)
- un chemin relatif, (par exemple `var/log/nginx` si vous vous trouvez dans le répertoire `/`)

### Astuces

- Retourner dans votre home : `cd` ou `cd ~`
- Retourner au dossier où vous étiez précédemment : `cd -`

## Lister les fichiers et dossiers

La version en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/27ffe8b758f84ada816b3600819cdddc" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

`ls` liste les fichiers et dossiers dans le dossier en cours
`ls chemin/du/dossier` liste les fichiers dans le dossier `chemin/du/dossier`

### Astuces

- Voir les fichiers et dossiers cachés : `ls -a`
- Avoir une liste contenant plus de détails (droits sur les dossiers, etc) : `ls -l`
- Avoir une liste de différents fichiers et dossiers : `ls -l unFichier unAutreFichier unDossier` (vous affichera des informations sur les fichiers/dossiers demandés)

## Créer un dossier

La version en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/52e1fd8156c84b23b8071e65eee81e78" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

`mkdir chemin/du/dossier` crée le dossier `dossier` dans le répertoire `chemin/du` qui existe déjà.

### Astuces

Pour créer un dossier et des sous-dossiers (dans notre exemple précédent, si `chemin` ou `chemin/du` n'existent pas), il faut ajouter l'option `p` comme ceci : `mkdir -p chemin/du/dossier` et la commande créera tous les dossiers nécessaires pour que votre dossier `dossier` existe.

## Supprimer un fichier et/ou un dossier

La version en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/b56b95c94a3c4488a5812436ff1684c3" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

`rm chemin/du/fichier` pour supprimer un ou des fichiers

### Astuces

- `rm -r` permet de supprimer récursivement un dossier et ce qu'il contient (sous-dossiers inclus)
- `rm -f` permet de ne pas avoir à confirmer des suppressions
- Utiliser une ou des étoiles dans le chemin du fichier peut permettre de supprimer des fichiers à plusieurs endroits à la fois (par exemple `rm -rf /var/log/**/*.gz` va supprimer tous les fichiers ayant l'extension `.gz` dans le dossier `/var/log/` ou n'importe lequel de ses sous-dossiers)

## Lecture de fichiers

La version en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/c6eaa46b3f6c48748d74a4cee4cc7238" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

- cat
  - `cat chemin/vers/le/fichier` ajoute le contenu du fichier `fichier` dans la ligne de commande (sortie standard)
- less
  - `less chemin/vers/le/fichier` ouvre une interface pour lire le fichier `fichier` et permet d'y naviguer, d'y faire des recherches, etc.
- more
  - `more chemin/vers/le/fichier` affiche le contenu du fichier progressivement (écran par écran), jusqu'à la fin du fichier.
- tail
  - `tail chemin/vers/le/fichier` affiche les 10 dernières lignes du fichier `fichier` dans la sortie standard

### Astuces

- taper `q` pour sortir de l'affichage de `more` ou `less`
- `maj+g` pour aller à la fin du fichier avec `more` ou `less`
- `tail -f chemin/vers/le/fichier` affiche les 10 dernières lignes et les données ajoutées au fur et à mesure que le fichier grandit (et bloque la ligne de commande)
- `tail chemin/vers/un/fichier chemin/vers/un/autre/fichier` affiche les 10 dernières lignes des deux fichiers dans la sortie standard

## Créer/modifier des fichiers

La version en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/178534da4fd3448d86fd089bbf287837" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

- `touch chemin/vers/le/fichier` crée un fichier, sans contenu

Plusieurs commandes sont disponibles pour cela. Voici quelques classiques :

- `nano chemin/vers/le/fichier` installé par défaut sur la plupart des systèmes
- `vi chemin/vers/le/fichier` à installer (la plupart du temps) 
- `vim chemin/vers/le/fichier` à installer (la plupart du temps)

### Astuces

- Sortir de vi/vim, appuyer sur la touche `echap` si vous êtes en mode d'insertion/remplacement (voir en bas de l'écran), puis :
  - taper `:q` pour sortir (si vous avez fait des modifications que vous souhaitez ignorer, taper `:q!`)
  - taper `:x` pour enregistrer le fichier et quitter (équivalent à `:wq` où `w` = write)
- Utilisez nano, il est bien plus simple d'utilisation ;) .

## Déplacer et renommer des fichiers

La version en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/414b4b53631e491dbfbed6791c854f7c" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Sous linux, renommer et déplacer sont une seule et même opération (dans les deux cas, on change le nom du fichier).

`mv fichier_source fichier_destination`

Exemple : `mv test.txt /archives/tests/truc.txt` (test.txt n'existera plus)

## Copier

La version en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/6e4542b767314a93870e515606a40c4b" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

`cp fichier_source fichier_destination` copie un fichier et en crée un nouveau

Exemple : `cp test.txt /archives/tests/truc.txt` (test.txt existera toujours)

### Astuces 

- `cp -r` permet de copier récursivement un dossier et tout ce qu'il contient (fichiers comme dossiers)

## Lister les processus en cours

La version en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/6fa2a3eb217c41c1b88a4a83d678b4dc" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

- `ps` affiche les processus de l'utilisateur, `ps -e` tous les processus de la machine.
- `top`, `htop` ou `glances` les affiche avec les consommations de mémoire, de processeur, etc.
