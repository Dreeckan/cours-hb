# Installer Symfony et son environnement de travail

Avant de pouvoir travailler concrètement sur Symfony, il faut mettre en place notre environnement de travail.

Pour cela, nous allons installer : 
- [Composer, gestionnaire de paquet pour PHP](https://getcomposer.org/doc/00-intro.md) (ou [lien direct vers l'installeur](https://getcomposer.org/Composer-Setup.exe))
- [l'outil en ligne de commande de Symfony](https://symfony.com/download) (ou [lien direct vers l'installeur](https://get.symfony.com/cli/setup.exe))
  
Si vous utilisez Windows, je vous conseille d'utiliser Powershell pour éviter des erreurs de rendu.

Pour créer un projet Symfony, nous pouvons maintenant utiliser notre ligne de commande (PowerShell dans mon cas) : 

```bash
  symfony new --full my_project
```

Vous pouvez alors ouvrir ce nouveau dossier avec votre IDE favori. Les deux sous-parties suivantes sont consacrées à la gestion d'un projet Symfony dans notre IDE. Pour la base de données, nous aurons besoin de Wamp/Mamp.

## Plugins utiles pour nos IDE

### PHPStorm

Pour installer un plugin dans PHPStorm, aller dans les options, partie `plugins` (`File` > `Settings` > `Plugins`) et chercher dans la partie `Marketplace`

- Symfony Support
- .env files support
- OpenAPI (Swagger) Editor

Voir également la [vidéo dédiée à la configuration de PHPStorm](https://www.loom.com/share/8660523dee7141a18461dec7a65e3850)

### VS Code

Pour installer un plugin dans VSCode, aller dans le menu de gauche, partie Extensions (avec 4 petits carrés). Pour chacun de ces plugins, je vous conseille d'en regarder la doc et de suivre son processus d'installation.

- DotENV pour mettre de la couleurs dans les fichiers d'environnement (`.env`)
- MySQL (de cweijan) pour faire le lien avec votre base de données ([je vous ai fait une vidéo d'installation et de configuration](https://www.loom.com/share/09f79db6bd6b4226972ac1017d048257))
- php cs fixer (de junstyle)
- PHP Debug (de Felix Becker)
- PHP Getters & Setters (de phproberto)
- PHP Intelephense (de Ben Mewburn)
- Symfony for VSCode (de TheNouillet)
- Twig Language 2 (de mblode)