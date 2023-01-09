# Installation

## Installer VirtualBox et créer une Machine virtuelle

Installation de VirtualBox et création d'une VM (machine virtuelle) en vidéo :

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/60d5493cfcf84b5e80ebba436246a215" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

- [Activer la virtualisation dans le Bios](https://www.tech2tech.fr/comment-activer-la-technologie-de-virtualisation-sur-mon-pc/)
- Installer Virtualbox ([pour Windows](https://download.virtualbox.org/virtualbox/6.1.16/VirtualBox-6.1.16-140961-Win.exe) ou [pour Mac](https://download.virtualbox.org/virtualbox/6.1.16/VirtualBox-6.1.16-140961-OSX.dmg))
- Télécharger une VM : [Ubuntu 20.04](https://sourceforge.net/projects/linuxvmimages/files/VirtualBox/U/Ubuntu_20.10_VB.zip/download)

## <abbr>WSL</abbr> - Alternative

Vous pouvez utiliser [<abbr>WSL</abbr> (Windows Subsystem for Linux)](https://fr.wikipedia.org/wiki/Windows_Subsystem_for_Linux) pour avoir accès à une machine virtuelle Linux, directement avec Windows. Plus pratique et plus stable, il nous permettra de tester la ligne de commande Linux et d'utiliser une machine virtuelle plus efficacement que VirtualBox ou équivalent.

:warning: Attention, pour un usage professionnel (avec Vagrant, par exemple), VirtualBox ou un équivalent est encore nécessaire.

Pour l'installer, rien de plus simple :
- Ouvrir PowerShell en mode **administrateur**
- Installer <abbr>WSL</abbr> avec la commande `wsl --install`
- Si vous aviez déjà <abbr>WSL</abbr> installé, mais pas Ubuntu, utiliser la commande `wsl --install -d Ubuntu`.
