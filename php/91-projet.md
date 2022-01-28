# Projet : montage d'ordinateurs

Nous allons mettre en place un projet Php, rendu sur Github/Gitlab, en utilisant des tickets (outil à définir). Le processus de travail doit être comme suit : 
- utiliser Git pour enregistrer les modifications de chaque développeur
- une branche doit être créée pour chaque ticket de code
  - lorsque le ticket est terminé, une Pull/Merge Request (appelée MR par la suite) doit être créée
  - cette MR doit être relue par un autre développeur pour :
    - remonter des incohérences
    - vérifier que le code écrit répond à la demande
    - vérifier que le code écrit correspond aux normes de codage défini au sein de l'équipe (et peut permettre de les définir)

Ce projet est prévu pour une équipe de 2 à 3 personnes.

## La demande client

Nous avons reçu la demande d'un client et notre équipe commerciale a décidé d'accepter le projet. Il convient maintenant de répartir le travail au sein de votre équipe et de le réaliser. Il doit être mis en place avec le framework Symfony et le design est à votre convenance, mais doit rester au plus simple.

Le client, <abbr title="Computer ">CLDL</abbr>, vend des ordinateurs préparés par leurs équipes, à partir de pièces détachées qu'ils achètent en gros. Leurs équipes sont partagées entre les **concepteurs** (qui prévoient l'assemblage des ordinateurs) et les **monteurs** (qui vont récupérer les directives des concepteurs et préparer les machines).
On considère qu'un ordinateur qui doit être monté doit avoir les pièces suivantes :
- carte mère (1)
- processeur (1)
- mémoire vive (au moins 1)
- carte graphique (1)
- clavier (1)
- souris / pad (1)
- écran (au moins 1)
- alimentation (1)
- disque dur / SSD (au moins 1)

C'est un site réservé à ces deux équipes. 
Chaque équipe aura un identifiant et un mot de passe différent pour se connecter et utiliser des fonctionnalités différentes.


## Partie Concepteur

Les concepteurs auront accès à un ensemble de fonctionnalités :
- Voir des statistiques de base sur les machines conçues / préparées
- Ajouter les pièces et gérer leur stock
- Créer ou modifier de nouveaux modèles (ordinateur portable ou tour)
- Répondre aux commentaires des monteurs

### Statistiques

Lorsqu'il se connecte, un concepteur a accès à plusieurs blocs, lui indiquant : 
- Les derniers commentaires des monteurs (avec une indication s'ils sont répondus ou non), les plus récents en premier
- Les différents modèles et le nombre d'exemplaires montés, ainsi que des liens pour modifier ou archiver un modèle (on ne supprime jamais un modèle)

Il aura également un lien vers les interfaces de gestion des modèles (liste complète des modèles, avec possibilité de les modifier/archiver et d'en créer de nouveaux) et un lien pour créer un nouveau modèle.

Il aura également un lien vers les interfaces de gestion des pièces (liste complète des pièces, avec possibilité de les modifier/archiver et d'en créer de nouvelles) et un lien pour entrer des pièces dans le stock.

### Gestion des stocks de pièces

#### Lister les pièces en stock

Cette interface affiche d'abord un tableau listant toutes les pièces, avec les éléments suivants :
- nom de la pièce
- quantité en stock
- prix
- nombre de modèles créés avec cette pièce
- catégories

Cette liste peut être triée par :
- quantité en stock
- nom
- prix
- date d'ajout
- modèles créés avec cette pièce

Cette liste peut être filtrée par :
- prix (entre un minimum et un maximum)
- catégorie(s) (processeur, carte graphique, etc.)
- les types d'ordinateur compatibles (tour ou portable)

Des actions sont possibles sur les pièces, avec certaines restrictions :
- Suppression / archivage :
  - une pièce qui a déjà été utilisée dans un modèle ne peut pas être supprimée
  - une pièce qui a déjà été utilisée dans un modèle peut être archivée (elle apparait dans l'interface, mais ne peut plus être modifiée et disparait quand son stock atteint 0)
- modifier
- modifier le stock

#### Ajouter / Modifier une pièce

Un formulaire permettant de modifier les propriétés de la pièce :
- son nom
- sa description (optionnelle)
- ses catégories associées
- son prix d'achat (HT)
- les types d'ordinateur compatibles (tour ou portable)

:warning: Une pièce n'est plus modifiable si elle est archivée.

#### Modifier le stock d'une pièce

Un formulaire permettant d'ajouter ou de retirer du stock un certain nombre d'exemplaires d'une pièce.
On veut un historique des entrées et sorties de chaque pièce, incluant la date et le nombre d'exemplaires entrés ou sortis. Cette historique sera affiché sous le formulaire de modification de stock.

#### Suppression / archivage d'une pièce

Plusieurs règles définissent si une pièce peut être supprimée ou archivée (pour l'utilisateur, il s'agira du même bouton "supprimer") :
- Une pièce peut être supprimée si et seulement si aucun ordinateur n'a été préparé par l'équipe des monteurs **et** si son stock atteint 0.
- Si un ordinateur a déjà été préparé avec une pièce, cette dernière peut être archivée : elle n'est plus disponible pour la création de nouveaux modèles, ni pour le montage, mais reste visible pour les monteurs.


### Modèles

Les concepteurs peuvent créer / modifier des modèles de machines à créer par les monteurs. Ils auront donc accès à un <abbr title="Create Read Update Delete">CRUD</abbr> leur permettant de voir les modèles existants, les modifier, les archiver, ou en créer de nouveaux. 

#### Liste

Cette interface affiche d'abord un tableau listant tous les modèles, avec les éléments suivants :
- nom du modèle
- nombre d'ordinateurs créés avec ce modèle
- prix total des pièces du modèle

Cette liste peut être triée par :
- quantité en stock
- nom
- prix
- date d'ajout
- modèles créés avec cette pièce

Cette liste peut être filtrée par :
- prix (entre un minimum et un maximum)
- catégorie(s) (processeur, carte graphique, etc.)
- commentaires non lus (si cochée, n'affiche que les modèles avec des commentaires non lus par les concepteurs)

Des actions sont possibles sur les pièces, avec certaines restrictions :
- Suppression / archivage :
  - une pièce qui a déjà été utilisée dans un modèle ne peut pas être supprimée
  - une pièce qui a déjà été utilisée dans un modèle peut être archivée (elle apparait dans l'interface, mais ne peut plus être modifiée et disparait quand son stock atteint 0)
- modifier
- modifier le stock

#### Création / modification d'un modèle

Un formulaire permettant de modifier les propriétés du modèle :
- son nom
- son type (ordinateur portable ou tour)
- sa description (optionnelle)
- choisir les différentes pièces :
  - carte mère (1)
  - processeur (1)
  - mémoire vive (au moins 1)
  - carte graphique (1)
  - clavier (1)
  - souris / pad (1)
  - écran (au moins 1)
  - alimentation (1)
  - disque dur / SSD (au moins 1)

Lors de la validation du formulaire (après l'envoi, avant insertion en <abbr title="Base de Données">BdD</abbr>), il faut vérifier que toutes les pièces choisies sont compatibles avec le type d'ordinateur choisi.

:warning: Un modèle n'est plus modifiable s'il est archivé.

#### Afficher un modèle et les commentaires

Une page de détails sur un modèle doit donner rapidement les informations nécessaires au montage (nom et type de la pièce sont les informations importantes).
Sous ces informations, afficher un formulaire de commentaire et la liste des commentaires précédents (le plus récent en haut), avec la date et le nom d'utilisateur l'ayant créé.
Ouvrir cette page marque les commentaires comme lus par l'équipe concepteur.

## Partie Monteur

Les monteurs auront accès à un ensemble de fonctionnalités :
- Voir les modèles proposés par les concepteurs
- Leur faire des retours (commentaires) sur les différents modèles
- Indiquer les modèles montés (et le nombre d'exemplaires)

### Liste des modèles

Une liste des modèles sous forme de tableau, indiquant sur chaque modèle :
- le nom du modèle
- la description
- la liste des pièces
- le nombre de commentaires **non lus** par les monteurs sur le modèle
- des actions :
  - ajouter des modèles montés
  - voir le modèle

### Afficher un modèle et ses commentaires

Une page de détails sur un modèle doit donner rapidement les informations nécessaires au montage (nom et type de la pièce sont les informations importantes).
Sous ces informations, afficher un formulaire de commentaire et la liste des commentaires précédents (le plus récent en haut), avec la date et le nom d'utilisateur l'ayant créé.
Ouvrir cette page marque les commentaires comme lus par l'équipe montage.