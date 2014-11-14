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
C'est aussi une valeur vide (différent de [null](#null)).
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

C'est une valeur d'erreur renvoyé lorsqu'une opération arithmétique est
effectuée sur une variable qui a une valeur autre qu'un nombre.

```javascript
var x = 'Hello';
var y = 42;

console.log(x - y); // affiche 'NaN'
```


return
------

Permet de renvoyer à l'issue d'une fonction le résultat du code se situant juste
apprès.

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

Renvoie le type du résultat du code se situant juste apprès sous forme de chaîne
de caractères.

Il existe les types suivant :
- string
- number
- function
- object
- undefined

```javascript
console.log(typeof 'Hello'); // affiche 'string'
console.log(typeof 42); // affiche 'number'
console.log(typeof NaN); // affiche 'number'
console.log(typeof null); // affiche 'object'
console.log(typeof {x: 42}); // affiche 'object'
console.log(typeof [42, 12]); // affiche 'object'
console.log(typeof undefined); // affiche 'undefined'

function x() {
	return 42;
}
console.log(typeof x()); // affiche 'number'
console.log(typeof x); // affiche 'function'
```


instanceof
----------

C'est un opérateur logique. Il compare le type d'objet du code se situant juste
avant avec le type situé après

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
```


delete
------

Permet de détruire un attribut d'un objet, mais pas une variable.

```javascript
var obj = {x: 42, y: 'Hello'};
console.log(obj); // affiche 'Object {x: 42, y: "Hello"} '
delete obj.y;
console.log(obj); // affiche 'Object {x: 42} '
delete obj;
console.log(obj); // affiche 'Object {x: 42} '
```


try
---

Permet d'ouvrir un bloc de code à risque, qui peut jetter des erreurs.
Ces erreurs seront alors attrapées et envoyé au [catch](#catch).

Il doit **toujours** être utilisé avec [catch](#catch) ou [finally](#finally).

```javascript
try {
	myUndefinedFuntion();
} catch (err) {
	console.log(err); // affiche 'ReferenceError {stack: (...), message: "myUndefinedFuntion is not defined"}'
}
```

catch
-----

Permet de gérer les erreurs attrapées dans un [try](#try).

```javascript
try {
	myUndefinedFuntion();
} catch (err) {
	console.log(err); // affiche 'ReferenceError {stack: (...), message: "myUndefinedFuntion is not defined"}'
}
```


finally
-------

Permet de déclarer un block de code à **toujours** effectuer après un
[try](#try), même en cas d'erreur.

```javascript
try {
	myUndefinedFuntion();
} finally {
	// Passe toujours par ce block de code
}

```


throw
-----

Permet de jetter une erreur. Elle peut être de n'importe quel type.

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

