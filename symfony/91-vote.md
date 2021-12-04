# Projet : vote citoyen

Nous allons mettre en place un projet Symfony, rendu sur Github/Gitlab, en utilisant des tickets (outil à définir). Le processus de travail doit être comme suit : 
- utiliser Git pour enregistrer les modifications de chaque développeur
- une branche doit être créée pour chaque ticket
  - lorsque le ticket est terminé, une Pull/Merge Request (appelée <abbr title="Pull/Merge Request">MR</abbr> par la suite) doit être créée
  - cette MR doit être relue par un autre développeur pour :
    - remonter des incohérences
    - vérifier que le code écrit répond à la demande
    - vérifier que le code écrit correspond aux normes de codage défini au sein de l'équipe (et peut permettre de les définir)

## La demande client

Nous avons reçu la demande d'un client et notre équipe commerciale a décidé d'accepter le projet. Il convient maintenant de répartir le travail au sein de votre équipe et de le réaliser. Il doit être mis en place avec le framework Symfony et le design est à votre convenance, mais doit rester au plus simple.

Le client est un regroupement politique local, souhaitant mettre en place des outils de participation citoyenne.

Le site sera partagé en plusieurs espaces, reliés par le menu général et une page d'accueil :

- "Vote", pour permettre à des citoyens de se prononcer sur des propositions
- "Proposition", pour permettre à des citoyens de remonter des problèmes et de proposer des solutions (qui seront ensuite soumises au vote)
- "Espace personnel", pour gérer mes informations, retrouver facilement mes participations (votes, propositions, etc.)
- "Administration", pour ajouter des données de base, inscrire/promouvoir des responsables, vérifier/modérer les données, etc.

## Définitions

### Proposition

Une proposition est un espace de discussion autour d'un sujet nécessitant l'aval de la communauté. Ce sujet peut être un problème (trop grands effectifs dans les classes de primaire, rue abîmées, etc.) ou une proposition d'amélioration de la vie locale (mise à disposition d'un local pour une association, organisation d'une <abbr title="Association pour le maintien d'une agriculture paysanne">AMAP</abbr>, etc.).

Une proposition n'a pas de durée de vie, peut être discutée aussi longtemps que les participants le juge nécessaire. Une fois les discussions terminées, la proposition peut être soumise au vote.

### Vote

Un vote est l'étape finale d'une proposition, pour vérifier si ce qu'elle contient va être appliqué ou non par la communauté. Tous les membres de la communauté peuvent participer ou être représentés et un vote est essentiellement un nombre d'avis favorables ou défavorables.

Pour qu'un vote soit accepté, il faut qu'une certaine proportion des votants soit atteinte à la fin du temps imparti et un certain nombre de votes.


## Accueil

La page d'accueil est une passerelle vers les autres espaces et permet d'avoir un aperçu des sujets du moment, à travers 4 sections :
- "Votes en cours" présente les 10 votes en cours (ordonnés par échéance de vote décroissante : ceux qui terminent bientôt en premier)
- "Votes populaires" présente les 10 votes les plus populaires (avec le plus de participations)
- "Propositions récentes" présente les 10 propositions créées le plus récemment
- "Propositions populaires" présente les 10 propositions (encore en cours) ayant le plus de participations


## Administration/modération

Cette partie permet de gérer les réglages généraux du site :
- nombre de votes et de propositions à afficher sur la page d'accueil (par défaut, 10)
- pour les votes :
  - pourcentage minimum de membres devant voter pour qu'un vote soit accepté (par défaut, 50%)
  - pourcentage de membres ayant donné un avis favorable pour qu'un vote soit accepté (par défaut, 66.66%)
- pour les propositions :
  - proportion minimum de pré-votes favorables à un vote (par défaut, 50%)
  - nombre minimum de pré-votes favorables à un vote

Mais aussi de voir et modifier (pour modération) les différents éléments visibles sur le site :
- mots-clés
- votes
- propositions
- contenu des discussions, etc.


## Proposition

Les propositions sont le point central du site. Tous les visiteurs du site peuvent consulter cette partie, mais seuls les membres inscrits peuvent participer.
Une proposition comporte différents éléments :
- Un sujet (ou titre) présentant en quelques mots (moins de 200 caractères) le contenu de la proposition
- Une description présentant en détail cette proposition (idéalement, le texte pourra être mis en forme, avec du texte en gras, italique, des titres, etc.)
- Des liens (permettant de se renseigner sur le sujet)
- Des mots-clés

D'autres membres inscrits peuvent participer :
- en commentant : ajouter un texte, qui doit obligatoirement être associé à au moins 2 possibilités de réponses (réponses à choix multiples)
- fournir un complément d'information (pouvant être modifié) : un lien (accompagné d'un texte de commentaire) permettant de se renseigner sur le sujet
- en pré-votant (pouvant être modifié) : 
  - se montrer favorable à un vote
  - se montrer défavorable à un vote, en précisant une raison :
    - défavorable au sujet
    - manque d'informations
    - autre (commentaire obligatoire)


## Vote

Tous les visiteurs du site peuvent consulter cette partie, mais seuls les membres inscrits peuvent participer.

Cette partie permet de voir tous les votes en cours, avec une pagination en affichant 10 par page, et de chercher et filtrer dans cette liste.
La recherche permet de chercher dans :
- le titre du vote
- la description du vote
- les mots-clés

Les filtres permettent de filtrer les votes en cours par :
- date de début de vote (avant ou après une date entrée)
- date de fin de vote (avant ou après une date entrée)
- nombre de votes manquants (une fourchette de nombres)
- nom de votes (une fourchette de nombres)
- mots-clés (il faut pouvoir en sélectionner plusieurs, qui réduisent de plus en plus la liste)

Il faut également proposer une série de tris, par :
- titre du vote
- date de fin
- date de début
- nombre de votes
- nombre de votes manquants

Chaque élément de la liste devra présenter : 
- le titre du vote (avec un lien vers la fiche complète du vote)
- les mots-clés associés
- le début de la description (400 premiers caractères)
- les dates de début et de fin
- le nombre de votes reçus et le nombre de votes manquants

Une page présentant le détail d'un vote devra présenter :
- le titre du vote
- les mots-clés associés
- la description 
- les dates de début et de fin
- le nombre de votes reçus et le nombre de votes manquants
- des informations sur la proposition à l'origine de ce vote :
  - la date de création de la proposition
  - la date de validation de la proposition
  - le nombre de participants et de réactions à la proposition
  - la liste des dépositaires
- l'ensemble des liens permettant de se renseigner sur le sujet
- le moyen de voter (vote pouvant être modifié) :
  - en faveur (complète)
  - en faveur partielle
  - neutre (vote blanc, pris en compte dans les calculs)
  - en défaveur partielle
  - en défaveur (complète)

