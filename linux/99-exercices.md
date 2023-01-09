# Exercices

Tous ces exercices prennent place dans un terminal Linux et sont testés avec une machine Ubuntu. Si des adaptations sont nécessaires pour un Mac ou d'autres systèmes UNIX, merci de me le signaler ;) .

Avant de commencer, ouvrir un terminal.

## 1. Commandes de base

- Créer un dossier `Work/Linux/exercices` dans votre dossier personnel
- Se rendre dans ce dossier
- Y créer un fichier `exercice1.txt` et copier/coller les commandes que vous avez entrées pour les énoncés précédents
- Créer un fichier (vide) `exercice2.txt`
- Créer un dossier `1` et un dossier `2`
- Déplacer `exercice1.txt` dans `1` et `exercice2.txt` dans `2`
- Afficher la liste des fichiers et dossiers dans `Work/Linux/exercices` (avec les droits sur les fichiers)
- Ajouter cet affichage à la fin du fichier `exercice1.txt`
- Copier le fichier `exercice1.txt` dans un nouveau fichier `Work/Linux/exercices/1/copie.txt`
- Créer un projet Git dans le dossier `Work/Linux/exercices`
- Ajouter un premier commit
- Créer un projet GitHub et inviter `Dreeckan` sur votre projet pour relecture
- Pousser votre commit

## 2. Fonctionnement général

Rester dans le dossier `Work/Linux/exercices`. Pour les questions ci-dessous, écrivez votre réponse dans le fichier `Work/Linux/exercices/2/exercice2.txt`.

- Quel est la taille (le poids en octets / kilo-octets) de `exercice1.txt` ?
- Dans quel dossier est rangé **la configuration** d'un programme comme `apt` (ou `zsh`, si vous utilisez un Mac) ?
- Avec les explications du cours, où se trouve **l'exécutable** de `apt` (ou `zsh`, si vous utilisez un Mac) ?
- Quelle commande utiliser pour lister les processus actuellement actifs ? Afficher les résultats pour **tous les utilisateurs** du système et les ajouter à votre fichier.
- Quelles sont les différences entre les commandes `less` et `more` ?
- Quelle commande utiliser pour demander "poliment" l'arrêt du programme java ?
- Quelle commande utiliser pour arrêter le processus ayant l'identifiant 5240 ?

- Créer un nouveau commit et le pousser sur GitHub.

## 3. Commandes avancées

- Créer une branche (et s'y rendre) `exercice3`
- Créer un dossier `Work/Linux/exercices/3`
- Que se passe-t-il si vous faites un commit ? (vous écrirez votre réponse après avoir créé le fichier `exercice3.txt`)
- Se rendre dans ce dossier
- Y créer un fichier `exercice3.txt`
- En une seule **ligne**, créer un dossier `Work/Linux/exercices/3/chaine/` et y créer un fichier `nouveau`
- Utiliser `cat` pour ouvrir vos 3 fichiers d'exercice à la fois et afficher le contenu avec less. Écrire ensuite la commande utilisée à la fin de `exercice3.txt`
- Utiliser une seule **commande** pour :
  - afficher la liste des fichiers, dossiers et tout leur contenu dans `Work/Linux/exercices` (avec les droits sur les fichiers) 
  - et les ajouter dans le fichier `exercice3.txt`

- Donner les droits suivants aux dossiers et fichiers de `Work/Linux/exercices/3` :
  - les utilisateurs peuvent lire, écrire et exécuter
  - le groupe peut lire
  - les autres n'ont aucun droit
- Changer le groupe du dossier `Work/Linux/exercices/3/chaine/` pour appartenir au groupe `root` (`staff` pour Mac).

- Créer un commit

- En une commande, supprimer tous les fichiers avec l'extension `.txt`, sans supprimer les dossiers
- Annuler cette suppression
- Écrire les deux commandes dans `exercice3.txt`

- Créer un commit, pousser les modifications et créer une PR (Pull Request)

## 4. Refaire les exercices précédents - version difficile

- Refaire les exercices précédents, sans utiliser `nano`, `vim`, `VSCode` ou autre éditeur de texte
- Essayer de grouper autant que possible les commandes, pour les faire en une seule ligne

## 5. D'autres exercices en ligne

- [Utiliser less, cd, pwd, etc.](http://web.mit.edu/mprat/Public/web/Terminus/Web/main.html)
- [Un jeu d'apprentissage général de la ligne de commande](https://linuxsurvival.com/) 
