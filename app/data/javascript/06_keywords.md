Mots Clef
=========

var
---

Il permet de déclarer une variable. S'il n'est pas utilisé c'est la variable
avec le scope le plus large qui est apellée.


```javascript
var maVariable; // déclaration de 'maVariable'

function xxx() {
	var maVariable; // déclaration d'une nouvelle 'maVariable'
}

function yyy() {
	maVariable; // utilisation de la première 'maVariable' déclarée
}
```


function
--------

Il permet de déclarer une fonction. Celle-ci peut être anonyme ou non.

```javascript
function maFonction() {
	// Code
}

var maFonctionAnonyme = function() {
	// Code
}
```


undefined
---------

C'est la '*valeur*' attribué aux variables qui n'ont pas été initialisées.
C'est aussi une valeur vide (différente de [null](#null)).
Utiliser une variable non définie jette une erreur, mais pas pour une variable
initialisée à `undefined`.

```javascript
console.log(maVariableNonInitialisee); // jette une erreur

var maVariableUndefined = undefined;
console.log(maVariableUndefined); // affiche "undefined"
```


null
----

C'est une valeur qui ne vaut rien. C'est-à-dire que la variable est initialisée
à rien. Elle n'est pas pour autant vide (voir [undefined](#undefined)).

```javascript
var maVariableNull = null;

console.log(maVariableNull); // affiche 'null'
```


NaN
---

Signifie : "Not-A-Number".

C'est une valeur renvoyée par une opération arithmétique qui ne peut renvoyer un
nombre. JavaScript essaye de renvoyer un nombre avec le plus d'effort possible.

```javascript
var x = 'Hello';
var y = 42;

console.log(x - y); // affiche NaN
console.log(Math.sqrt(-1)); // affiche NaN
console.log('1' + 0); // affiche '10'
console.log('1' - 3); // affiche -2
console.log('2' - '3'); // affiche -1

console.log(NaN == NaN); // affiche false
console.log(NaN === NaN); // affiche false
console.log(isNaN(NaN)); // affiche true
```


return
------

Permet de renvoyer à l'issue d'une fonction le résultat d'une l'expression.

```javascript
function x() {
	return "Hello"; // retourne la chaîne de caractère 'Hello'
}

function add(x, y) {
	return x + y; // retourne le résultat de 'x + y'
}

function identity(value) {
	return value; // retourne la variable 'value'
}

function y() {
	return z(); // retourne la valeur de retour de la fonction 'z'
}
```


typeof
------

Renvoie le type d'une expression sous forme de chaîne de caractères.

Il existe les types suivant :

- string
- boolean
- number
- function
- object
- undefined

```javascript
console.log(typeof 'Hello'); // affiche 'string'
console.log(typeof true); // affiche 'boolean'
console.log(typeof 42); // affiche 'number'
console.log(typeof NaN); // affiche 'number'
console.log(typeof null); // affiche 'object'
console.log(typeof {x: 42}); // affiche 'object'
console.log(typeof [42, 12]); // affiche 'object'
console.log(typeof /regexp/); // affiche 'object'
console.log(typeof undefined); // affiche 'undefined'

function x() {
	return 42;
}
console.log(typeof x()); // affiche 'number'
console.log(typeof x); // affiche 'function'
```


instanceof
----------

C'est un opérateur logique. Il compare une expression avec un type d'objets.

```javascript
var str = new String('Hello');
console.log(str instanceof String); // affiche 'true'
console.log('Hello' instanceof String); // affiche 'false'

console.log([42, 12] instanceof Array); // affiche 'true'
console.log([42, 12] instanceof Object); // affiche 'true'

var obj = {x: 42};
console.log(obj instanceof Object); // affiche 'true'
console.log(null instanceof Object); // affiche 'false'
```


new
---

Permet d'instancier un type d'objet.

```javascript
var str = new String('Hello');

var Person = function(name) {
	this.name = name;
}

var p = new Person('John');
console.log(p); // affiche 'Person {name: "John"}'
```


delete
------

Permet de détruire un attribut d'un objet, mais pas un objet.

```javascript
var obj = {x: 42, y: 'Hello'};
console.log(obj); // affiche 'Object {x: 42, y: "Hello"}'

delete obj.y;
console.log(obj); // affiche 'Object {x: 42}'

delete obj; // N'a rien fait
console.log(obj); // affiche 'Object {x: 42}'
```


try...catch...finally
---------------------

Permet d'encadrer un bloc de code à risque, qui peut jeter des erreurs.
Ces erreurs seront alors attrapées et envoyées au `catch`.
Dans tous les cas, le block `finally` sera exécuté.

```javascript
try {
	myUndefinedFuntion();
} catch (err) {
	console.log(err); // affiche 'ReferenceError {stack: (...), message: "myUndefinedFuntion is not defined"}'
}

try {
	myUndefinedFuntion();
} finally {
	// Passe toujours par ce block de code
}

try {
	myUndefinedFuntion();
} catch (err) {
	console.log(err); // affiche 'ReferenceError {stack: (...), message: "myUndefinedFuntion is not defined"}'
} finally {
	// Passe toujours par ce block de code
}
```


throw
-----

Permet de jeter une erreur. Elle peut être de n'importe quel type.

```javascript
throw 42; // jette le nombre '42'
throw 'ERROR'; // jette le chaîne de caractères 'ERROR'
throw myErrorMsg(42); // jette le résultat de 'myErrorMsg(42)'
throw {msg: 'Error'}; // jette l'objet '{msg: 'Error'}'
```


if
--

Permet de tester une condition et d'effectuer du code si celle-ci est vrai.

```javascript
if (condition) {
	// Code à effectuer si vrai
}
```


else
----

Permet de déclarer un block de code à effectuer si la condition testée par
[if](#if) est fausse.

```javascript
if (condition) {
	// Code à effectuer si vrai
} else {
	// Code à effectuer si faux
}
```

'use strict';
-------------

Permet d'activer le mode strict. Le mode strict permet d'écrire du code
JavaScript sécurisé.

Par exemple :

- il est interdit d'utiliser une variable qui n'a pas été définie au préalable ;
- deleter une variable, une fonction ou un argument n'est pas permis ;
- définir une propriété plus d'une fois n'est pas permis ;

Il se déclare:

- au début d'un fichier : dans ce cas tout le fichier est en mode strict.
- au début d'une fonction : dans ce cas seule la fonction est en mode strict.

```javascript
"use strict";

x = 42; // cause une erreur
delete x; // cause une erreur
var obj = { p1: 42, p1: 'hello' }; // cause une erreur
```

```javascript
function () {
	"use strict";

	x = 42; // cause une erreur
}
```

for
---

Permet d'effectuer une boucle.
Permet aussi d'itérer les propriétés d'un objet.

```javascript
for (var i = 0; i < 10; i++) {
	// passera 10 fois dans cette boucle
}

var obj = {p1: 42, p2: 'hello'};
for (prop in obj) {
	// passera dans cette boucle autant de fois qu'il y a de propriété dans 'obj'
	// ici prop vaudra successivement : 'p1' puis 'p2'
}
```


while
-----

Permet d'effectuer une boucle.

```javascript
while (true) {
	// passera indéfiniment dans cette boucle
}
```


break
-----

Permet de sortir d'un niveau de boucle.

```javascript
while (true) {
	break; // ordonne de quitter la boucle
}

while (true) { // première boucle
	while (true) { // seconde boucle
		break; // sort de la seconde boucle
	}
}

```


continue
--------

Permet de redémarer la boucle sans la terminer.

```javascript
while (true) {
	continue;
	console.log('Hello'); // n'affiche JAMAIS 'Hello'
}
```

