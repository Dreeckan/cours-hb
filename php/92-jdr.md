# Projet : Personnages de Jeux de Rôle

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

Wizards of the Cost, notre client, veut que ses joueurs de PâteFinder (leur dernier jeu de rôle papier) puisse gérer leurs feuilles de personnages en ligne.

Une feuille de personnage contient :
- le nom du personnage
- le nom du joueur / de la joueuse
- des caractéristiques 
- des compétences
- des équipements

Les caractéristiques d'un personnage :
  - son initiative (maximum 10)
  - points de vie maximum
  - points de vie actuels
  - points de magie maximum
  - points de magie actuels
  - la force (maximum 20)
  - la dextérité (maximum 20)
  - la constitution (maximum 20)
  - l'intelligence (maximum 20)
  - la sagesse (maximum 20)
  - la chance (maximum 20)

Une compétence contient :
- un nom
- une caractéristique associée
- un niveau

Un équipement est défini par :
- un nom
- des dégâts (peuvent être de 0)
- une portée

Chaque joueur pourra se connecter et voir / créer / modifier ses fiches de personnages. Son espace personnel contiendra donc une liste de ses fiches, avec quelques informations.


## Page de connexion

Pour utiliser le site, un utilisateur **doit** être connecté. Si un utilisateur n'est pas connecté, mais cherche à accéder à une autre page, il sera renvoyé vers la page de connexion.

Ce formulaire demandera un nom d'utilisateur et un mot de passe. Les informations seront conservées dans la session si elles correspondent à une entrée en <abbr title="Base de Données">BdD</abbr>. Sinon, on affichera un message d'erreur approprié.


## Accueil de l'utilisateur

Quand un utilisateur s'est connecté, il peut accéder à la liste de ses fiches de personnage. 

Il doit pouvoir accéder à un formulaire pour créer un nouveau personnage depuis cette page.

Chaque fiche doit présenter :
- le nom du personnage
- ses caractéristiques
- la liste des compétences
- la liste des équipements
- un lien pour modifier les informations de base et les caractéristiques
- un lien pour modifier une compétence
- un lien pour ajouter une compétence
- un lien pour modifier un équipement
- un lien pour ajouter un équipement
- un lien pour voir la fiche en entier
- un lien pour supprimer la fiche


## Créer / modifier les informations de base

Le propriétaire de la fiche doit pouvoir mettre à jour tous les éléments de base et les caractéristiques de la fiche.




## Suppression de la fiche

La suppression d'une feuille de personnage supprime tous les éléments associés (compétences et équipements).


## Critères d'acceptation (notation)

Pour valider le rendu, voici ce qui est attendu par votre chef de projet, pour chacun d'entre vous : 

- Création/manipulation d'au moins une classe/objet
- Création de requêtes de BdD (au moins une insertion, une mise à jour et une récupération de données)
- Manipulation d'un formulaire complexe (filtre, création/modification d'un objet, etc.)
- Respect des normes PSR (1, 12 et 4) pour tout le code
- Chaque ticket fait l'objet d'une <abbr title="Pull Request">PR</abbr>

Éléments communs à fournir :
- Un schéma de base de données
- un dump de la base de données finale
