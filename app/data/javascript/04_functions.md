Les fonctions
=============

##Déclaration et invocation

Une fonction se déclare avec le mot-clef ```function```.

####Exemple
```javascript
function hello() {
	console.log('Hello');
}

var coucou = function() {
	console.log('Coucou');
}

hello();
coucou();

console.log(hello);
console.log(coucou);

console.log(typeof hello);
console.log(typeof coucou);
```

####Résultat
```
Hello
Coucou
function hello() {
	console.log('Hello');
}
function () {
	console.log('Coucou');
}
function
function
```

Note: On remarque que la fonction assignée à la variable 'coucou' est une fonction anonyme,
alors que la fonction 'hello' ne l'est pas.
Toutefois les deux identifiants sont de type 'function'.

##Fonction avec paramètres

####Exemple
```javascript
function hello(lastname, firstname) {
	console.log('Hello ' + firstname + ' ' + lastname);
	return 3;
}

var x = hello('Dupond', 'Marcel');
console.log(x);
```

####Résultat
```
Hello Marcel Dupond
3
```

##Callback

Un callback est une fonction passée en argument d'une autre fonction.

En JavaScript, le mécanisme de callback est parfaitement naturel,
car une fonction est un objet comme un autre.

####Exemple
```javascript
function hello(lastname, firstname, callback) {
	console.log('Hello ' + firstname + ' ' + lastname);
	callback();
	return 3;
}

function welcome() {
	console.log('Welcome');
}

var x = hello('Dupond', 'Marcel', welcome);
console.log(x);
```

####Résultat
```
Hello Marcel Dupond
Welcome
3
```

##Closure

Une closure est une fonction qui utilise au moins une variable externe, c'est-à-dire,
non passée en paramètre et non déclarée localement.

####Exemple
```javascript
var x = 12;

function ma_function() {
	console.log(x);
}

ma_function();
```

####Résultat
```
12
```

