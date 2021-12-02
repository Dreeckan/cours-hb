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


## Accueil

La page d'accueil est une passerelle vers les autres espaces et permet d'avoir un aperçu des sujets du moment, à travers 4 sections :
- "Votes en cours" présente les 10 votes en cours (ordonnés par échéance de vote décroissante : ceux qui terminent bientôt en premier)
- "Votes populaires" présente les 10 votes les plus populaires (avec le plus de participations)
- "Propositions récentes" présente les 10 propositions créées le plus récemment
- "Propositions populaires" présente les 10 propositions (encore en cours) ayant le plus de participations

