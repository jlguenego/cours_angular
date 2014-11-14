API
===

Web browser
-----------

###DOM (Document Object Model)

Le DOM est la représentation standardisée d'un document XML, HTML ou XHTML dans
la mémoire. C'est un arbre d'objets représentant chaque élément du document.

En JavaScript il se situe dans la variable `document`.

Grâce à cette variable, il est possible de manipuler le document, et donc de
modifier une page web.

###BOM (Browser Object Model)

Le BOM est une convention, spécifique à chaque navigateur internet, qui
référence tout les objets exposés par le navigateur.
Bien que non standardisé, le BOM est aproximativement le même pour tout les
navigateurs.

En JavaScript il correspond à la variable `window`. Elle contient **TOUTES** les
variables 'globale'. `document` et `window.document` sont donc les même
variables.

###navigator

C'est une variable contenant toutes les informations sur le navigateur.
De cette manière il est possible d'identifier le navigateur exécutant le script
et d'agir en fonction de celui-ci.
C'est ce que fais JQuery par example. Cela le rend portable.


Node.js
-------

Node.js est une autre implémentation de JavaScript, et qui possède ses
particularités.

Il se veux être un environnement JavaScript pur, ce qui permet d'exécuté des
scripts JavaScript, de la même manière que du Shell ou du Batch par example.

Il possède un ensemble de fonctions et de variables 'd'environnement' qui
définissent l'environnement de Node.js.

###__dirname

C'est une variable qui contient le chemin du dossier du script en cours
d'exécution.

###require

Cette fonction permet de charger un module. Elle renvoie un objet contenant
toutes ses fonctionalités.

Voici un example de code qui ouvre puis imprime le contenue d'un fichier :

####readFile.js
```javascript
// Récupère le module FileSystem.
var fs = require('fs');

// Le nom du fichier à ouvrir.
var fname = 'test.txt';

// Ouverture du fichier. Le chemin est relatif.
// fs.readFileSync renvoie le contenue du fichier sous forme binaire, stocké
// dans un objet. toString permet de le rendre lisible.
var content = fs.readFileSync(fname).toString();

// Affichage du contenu du fichier.
console.log(content);
```

Pour exécuter le script, entrer la commande `node readFile.js`.
Le fichier **test.txt** doit exister juste à côté de **readFile.js**.