Les Objets
==========

JavaScript est un langage orienté objet, comme Java, C++, Perl, Python, etc.
Mais il a une différence importante: les classes n'existent pas.
En revanche, les objets ont un prototype, stocké sous forme de propriété.

Déclaration, instanciation et utilisation
-----------------------------------------

Pour déclarer un nouveaux type, on utilise une fonction.

####Exemple
```javascript
function Personne(lastname, firstname, age) {
	var my_secret = 'Je suis chauve';
	this.lastname = lastname;
	this.firstname = firstname;
	this.age = age;

	this.sayHello = function() {
		console.log('Bonjour, je suis ' + this.firstname);
	}

	this.getSecret = function() {
		return my_secret;
	}
}

var p1 = new Personne('Dupond', 'Bertrand', 45);
var p2 = new Personne('Durand', 'Michel', 47);
console.log(p1);
console.log(p2);

p1.sayHello();
p2.sayHello();

console.log(p1.lastname);
console.log(p2.firstname);

delete p2.firstname;
p2.sayHello();
console.log(p2);

console.log(this);

console.log(p1.getSecret());
```

####Résultat
```
Personne {lastname: "Dupond", firstname: "Bertrand", age: 45, getSecret: function, sayHello: function}
	age: 45
	firstname: "Bertrand"
	getSecret: function () {
	lastname: "Dupond"
	sayHello: function () {
	__proto__: Personne
Personne {lastname: "Durand", firstname: "Michel", age: 47, getSecret: function, sayHello: function}
	age: 47
	firstname: "Michel"
	getSecret: function () {
	lastname: "Durand"
	sayHello: function () {
	__proto__: Personne
Bonjour, je suis Bertrand
Bonjour, je suis Michel
Dupond
Michel
Bonjour, je suis undefined
Personne {lastname: "Durand", age: 47, getSecret: function, sayHello: function}
	age: 47
	getSecret: function () {
	lastname: "Durand"
	sayHello: function () {
	__proto__: Personne
Window {top: Window, window: Window, location: Location, Proxy: Object, external: Object…}
Je suis chauve
```

Note:

- JavaScript est équipé d'un ramasse miettes (en anglais "garbage collector").
- Il existe un mot-clef ```delete```
mais il sert à autre chose qu'à détruire un objet.
Il sert à enlever une propriété d'un objet.
- Le mot-clef ```this``` sert à désigner l'objet lui même lors de sa déclartion
ou dans ses fonctions internes.
Dans un navigateur, ```this``` désigne l'objet ```window``` dans le contexte globale.
- Il n'y a pas de modificateur tels que ```public```, ```protected``` ou ```private```
comme en Java ou C++. En revanche, il est possible de contrôler
la visibilité d'une propriété via le scope des variables.
Les variables privées sont des variables locales à la fonction de déclaration.
Les variable public sont des propriétés de l'objet.
- Il est possible d'ajouter, retirer, et modifier en cours de route les propriétés
d'un objet.

Le prototype
------------

Tout objet dans javascript à une propriété, relativement cachée, contenant le **prototype**.
C'est une propriété spéciale qui n'est pas listée avec les autres propriétés,
mais qui peut être quand même accédée.

Le prototype de l'objet est accessible via la propriété ```prototype```
de la **fonction** qui définit son type,
et via la propriété ```__proto__``` de l'**instance**.

Lorsqu'on appelle une propriété d'un objet ```obj```, si cette propriété n'existe pas,
alors l'interpreteur JavaScript cherche dans le prototype de ```obj``` une propriété du même nom.
Si il la trouve, alors il la renvoie, sinon il va dans le prototype du prototype
(si il existe) pour la trouver, et cela récursivement.
Si aucun des prototypes parcourus ne contient la propriété, alors il renvoie ```undefined```.

####Exemple
```javascript
function Animal() {
	this.dort = function() {
		console.log('Zzz...');
	}
}
Animal.prototype.sayHello = function() {
	console.log(this.hello);
}

function Chat() {
	this.hello = 'Miaou';
	this.sayHello = function() {
		console.log(this.hello + ' ' + this.hello);
	}
}
Chat.prototype = new Animal();

function Chien() {
	this.hello = 'Ouaf';
}
Chien.prototype = Animal.prototype;

var a = new Animal();
var chat = new Chat();
var chien = new Chien();

console.log(a);
console.log(chat);
console.log(chien);

console.log(a.__proto__);
console.log(chat.__proto__);
console.log(chien.__proto__);

console.log(Animal.prototype);
console.log(Chat.prototype);
console.log(Chien.prototype);

a.sayHello();
chat.sayHello();
chien.sayHello();
```

####Résultat
```javascript
Animal {dort: function, sayHello: function}
Chat {hello: "Miaou", sayHello: function, dort: function}
Chien {hello: "Ouaf", sayHello: function}
Animal {sayHello: function}
Animal {dort: function, sayHello: function}
Animal {sayHello: function}
Animal {sayHello: function}
Animal {dort: function, sayHello: function}
Animal {sayHello: function}
undefined
Miaou Miaou
Ouaf
```

Note :

- Le prototype est partagé entre chaque instance d'un même type.
- Le prototype permet de faire de l'héritage entre objets (et non entre classes).
- L'avantage des langages prototypés comme JavaScript est de ne pas avoir besoin de
définir une classe à chaque fois qu'on utilise un objet, ce qui rend le code beaucoup
plus succint.

##Quelques objets importants

Le langage JavaScript met à disposition de l'utilisateur un certain nombre
d'objets pré-construits.

###Object
Tout objet instancié aura pour prototype le prototype de l'objet ```Object```
sauf si spécifié explicitement.
Tout objet de base (tel que ```{}``` ou ```{ foo: 'bar' }```)
a un prototype d'```Object```.
Donc on peut lui appliquer les méthodes du type Object, comme :

- ```hasOwnProperty(property_name)```
- ```toString()```

####Exemple
```javascript
var o = {
	foo: 'bar',
	nbr: 23
};

console.log(o);
console.log(o.hasOwnProperty('foo'));
console.log(o.toString());
console.log(o.__proto__);
```

####Résultat
```
Object {foo: "bar", nbr: 23}
true
[object Object]
Object {}
```

###String
Les chaînes de caractères ont pour prototype le prototype de l'objet ```String```.
L'objet ```String``` définit un certain nombre de méthodes comme suit :

- ```indexOf(str)```: retourne l'index de la chaîne ```str``` si elle est inclue dans la chaîne, -1 sinon.
- ```match(regexp)```: retourne un tableau avec les détails du match si trouvé, sinon ```null```
- ```split(separator[, limit])```: sépare la chaîne dans un tableau,
  à chaque occurence de ```separator```, dans la limite de ```limit``` fois.
- ```replace(regexp|substr, newSubStr|function[, flags])```:
  retourne une nouvelle chaîne où chaque correspondance entre la chaîne et ```regexp|substr```
  a été remplacée par ```newSubStr``` ou envoyé à ```function```, en respectant les ```flags```.
- ```substr(start[, lenth])```: renvoie une sous-chaîne débutant à ```start```
  et de longueur ```length```.
- ```trim()```: renvoie une sous-chaîne en ayant retiré tout les caractères d'espacement,
  (<espace>, <tab>, <new line>, etc.) à gauche et à droite de la chaîne.

####Exemple
```javascript
var str = '   Hello World!   ';

console.log(str);
console.log(str.indexOf('World'));
console.log(str.match('lo'));
console.log(str.match(/^\s.*\s$/)); // commence et finit par un caractère d'espacement
console.log(str.split(' '));
console.log(str.replace(/\s/g, 'x'));
console.log(str.substr(3, 5));
console.log('|' + str.trim() + '|');
```

####Résultat
```
   Hello World!
9
["lo", index: 6, input: "   Hello World!   "]
["   Hello World!   ", index: 0, input: "   Hello World!   "]
["", "", "", "Hello", "World!", "", "", ""]
xxxHelloxWorld!xxx
Hello
|Hello World!|
```

###Array
Les tableaux ont pour prototype le prototype de l'objet ```Array```.
L'objet ```Array``` définit un certain nombre de méthodes comme suit :

- ```push([element1[, ...[, elementN]]]])```:
  pousse tout les éléments fournis à la fin du tableau.
- ```pop()```: supprime le dernier élement du tableau et le renvoie.
- ```unshift([element1[, ...[, elementN]]]])```:
  pousse tout les éléments fournis au début du tableau.
- ```shift()```: supprime le premier élement du tableau et le renvoie.
- ```slice([start[, end]])```: renvoie une copie du tableau allant de ```start``` à ```end```.
- ```splice(index[, howMany[, element1[, ...[, elementN]]]])```:
  supprime ```howMany``` éléments à partir de ```index```,
  puis ajoute les nouveaux ```element1, ..., elementN``` à la suite des ceux juste supprimés.
  Cette méthode renvoie les éléments supprimés.
- ```join([separator = ','])```: concatène tout les élements avec ```separator``` entre eux,
  et renvoie la chaîne.
- ```indexOf(element)```: renvoie la position de élément dans le tableau.
- ```forEach(callback)```: appelle ```callback``` pour chaque élément du tableau.

####Exemple
```javascript
var a = [ 'Hello', 12];
var b = a.slice(0); // Duplication de a

console.log(a);
console.log(b);

a.push(42);
console.log(a);
console.log(b);

console.log(a.pop());
console.log(a);

a.unshift(42)
console.log(a);

console.log(a.shift());
console.log(a);

console.log(a.join('/'));
console.log(a.indexOf(12));

a.forEach(function(element, index, current_array) {
	console.log('a[' + index + ']=' + element);
});
```

####Résultat
```
["Hello", 12]
["Hello", 12]
["Hello", 12, 42]
["Hello", 12]
42
["Hello", 12]
[42, "Hello", 12]
42
["Hello", 12]
Hello/12
1
a[0]=Hello
a[1]=12
```


###Math

L'objet ```Math``` contient un ensemble de fonctions
et contantes mathématiques importantes, telles que:

- ```PI```
- ```LN2```
- ```LN10```
- ```abs(x)```
- ```cos(x)```
- ```sin(x)```
- ```round(x)```
- ```floor(x)```
- ```ceil(x)```
- ```log(x)```
- ```log10(x)```
- ```pow(x, y)```
- ```min([x[, y[, ...]]])```
- ```max([x[, y[, ...]]])```
- ```random()```

####Exemple
```javascript
console.log(Math.PI);
console.log(Math.LN2);
console.log(Math.LN10);

console.log(Math.abs(-42));

console.log(Math.cos(0));
console.log(Math.sin(Math.PI / 2));

console.log(Math.round(2.5));
console.log(Math.floor(2.5));
console.log(Math.ceil(2.5));

console.log(Math.log(1));
console.log(Math.log10(10));

console.log(Math.pow(2, 3));

console.log(Math.min(12, 3, 654, -23));
console.log(Math.max(12, 3, 654, -23));

console.log(Math.random()); // affiche un nombre appartenant à [0, 1[
```

####Résultat
```
3.141592653589793
0.6931471805599453
2.302585092994046
42
1
1
3
2
3
0
1
8
-23
654
0.08292726241052151
```
