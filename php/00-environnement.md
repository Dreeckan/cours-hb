# Environnement de travail

Nous allons travailler avec [Wamp](https://sourceforge.net/projects/wampserver/files/latest/download) pour avoir un serveur Apache, MySQL, PHP et PhpMyAdmin sur notre Windows. Tout ce que nous allons voir fonctionne aussi avec [Xampp](https://www.apachefriends.org/fr/index.html), [Mamp](https://www.mamp.info/en/downloads/) ou un équivalent. Pour ces deux derniers, faites bien attention à la configuration (surtout les ports) qui peuvent être différents de ceux de Wamp.

Pour l'utiliser convenablement, nous allons devoir travailler dans le dossier `www` de Wamp (`C:\wamp64\www` par défaut). Nous y créerons différents dossiers pour qu'ils soient accessibles simplement : si nous créons un dossier `exercices-php`, son contenu sera disponible sur [http://localhost/exercices-php/](http://localhost/exercices-php/).

Une vidéo pour vous aider à résoudre les problèmes de ports et de version des programmes (PHP et MySQL surtout) :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/b835ff259c954b73997523c051fa1d98" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## Alternative - Laragon

Si vous avez déjà installé [Laragon](https://laragon.org) sur votre machine, nous pouvons également nous en servir.

Si vous ne l'avez pas installé, voici [le lien de téléchargement](https://laragon.org/download/) et une vidéo de l'installation :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/d19ac2557626460e802530ba57575fcd" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Une vidéo de prise en main, où je découvre un peu Laragon, sa configuration et une utilisation de base :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/aae42d13cca4482f8b6a7bf02a293683" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

Je ne peux que vous recommander la vidéo de [Grafikart](https://grafikart.fr/) sur le sujet :

<iframe width="560" height="315" src="https://www.youtube.com/embed/sHHl5kihXD4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Alternative pour les Macs - MAMP

Si vous avez un Mac, vous pouvez installer [Mamp](https://www.mamp.info/en/downloads/), un programme "équivalent" à Wamp, mais pour Mac. Il a toutefois quelques soucis (non affichage des erreurs, par défaut) et ous allons l'améliorer un peu !

Je me base sur [cet article de Josh Buchea](https://joshbuchea.com/mac-enable-xdebug-in-mamp/) pour activer XDebug (pour rendre vos `var_dump()` plus pratiques).

Modifiez les fichiers suivants (il faut impérativement modifier les deux) :
- `/Applications/MAMP/conf/php7.4.21/php.ini`
- `/Applications/MAMP/bin/php/php7.4.21/conf/php.ini`

Trouvez la ligne `display_errors = Off` et la remplacer par `display_errors = On` pour voir les messages d'erreur.

À la fin du fichier, dé-commentez la ligne pour activer xDebug. Vous devriez avoir quelque chose comme ça dans votre fichier (attention, conservez le vôtre, je n'ai pas testé les valeurs entrées ici) :

```ini
zend_extension="/Applications/MAMP/bin/php/php7.4.21/lib/php/extensions/no-debug-non-zts-20151012/xdebug.so"
```

Redémarrez MAMP et vous devriez voir vos erreurs et avoir un affichage des `var_dump()` bien plus lisible !