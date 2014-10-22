Les Variables
=============


##Déclaration

- Une variable se déclare avec le mot-clef ```var```.
- Le nom d'une variable est **uniquement** composé de caractère alphanumérique
(a-z, A-Z, 0-9 et _).
- Le nom d'une variable **doit** commencer par un caractère alphabétique (a-z, A-Z et _).
- Les noms de variable sont sensibles à la casse. (toto ≠ Toto)

####Code
```javascript
var ma_variable;  // Valide
var ma_variable2; // Valide
var maVariable;   // Valide
var _maVariable;  // Valide
var 2maVariable;  // Non valide
var 42;           // Non valide
```



##Visibilité d'une variable

Une variable ```A``` est visible partout après sa déclaration, y compris dans les fonctions
définies après la déclaration de ```A```.

Une variable peut être définie à l'extérieur de toute fonction (variable globale)
ou à l'intérieur d'une fonction. Quand la variable est définie à l'intérieur d'une fonction ```F```,
elle n'est visible que dans cette fonction ```F``` ainsi que dans les fonctions qui pouraient
être déclarées dans la fonction ```F```.

Il est possible qu'une fonction déclare à nouveaux la variable ```A```.
Dans ce cas là nouvelle variable définie masque la précédente.

####Code
```javascript
var A = 2; // Variable globale

function xxx() {
	var B;
	/*
	Ici, 'A' et 'B' sont toutes deux visibles.
	*/
}

/*
Ici, seule 'A' est visible.
*/

function yyy() {
	var A = 3; // Variable locale
	// Ici, la variable locale 'A' masque la variable globale 'A'.

	var zzz = function() {
		console.log(A); // affiche 3
	}
}

console.log(A); // affiche 2
```



##Les types primitifs

Ce sont les types de base pour les variables.

###Les nombres
Les nombres correspondent aux entiers et aux décimaux.
Les notations décimales et scientifique (à exposant) sont acceptées.

```javascript
var nbr1 = 42;      // 42
var nbr2 = 3.14;    // 3.14
var nbr3 = .42;     // 0.42
var nbr4 = 42e4;    // 420000
var nbr5 = 42e-4;   // 0.0042
var nbr6 = 1.337e3; // 1337

console.log(typeof nbr6); // affiche "number"
```



###Les chaînes de caractères

Elles sont initialisées avec des ```'``` ou des ```"```.

Note: Les chaînes de caractères sont immutable en mémoire,
c'est-à-dire qu'on ne peut modifier leur contenu une fois créé.
Pour modifier leur contenu on crée une nouvelle chaîne.

```javascript
var str1 = 'Hello World';
var str2 = "Hello World";

console.log(typeof str2); // affiche "string"
```



###Les Booléens

Ils permettent de représenter les valeurs binaires ```true``` et ```false```.

```javascript
var bool1 = true;
var bool2 = false;

console.log(typeof bool2); // affiche "boolean"
```

###Valeur "undefined"

Le mot-clef ```undefined``` est la valeur par défaut d'une variable déclarée et non initialisée.

```javascript
var ma_variable; // undefined
une_autre_variable; // Causera une erreur, car non déclarée.

console.log(typeof ma_variable); // affiche "undefined"
console.log(typeof une_autre_variable); // Attention: affiche aussi "undefined"
```


###Valeur "null"

C'est une valeur de type 'object' (voir plus loin), qui représente l'objet null.

```javascript
var ma_variable = null; // null

console.log(typeof ma_variable); // affiche "object"
```



##Les objets

Ce sont des structures composées d'association clef-valeur.

Ils s'initialisent entre ```{ }```.

####Code
```javascript
var mon_objet = {
	nbr: 42,
	str: 'Hello'
};

console.log(mon_objet);
console.log(mon_objet.nbr);
console.log(mon_objet['str']);
console.log(mon_objet.oups);
console.log(typeof mon_objet);
```

####Résultat
```
Object {nbr: 42, str: "Hello"}
42
Hello
undefined
object
```

##Les tableaux

Ce sont des objets spéciaux dont les clef sont 0, 1, ..., n (n étant la taille du tableau - 1).
On peut obtenir leur taille grâce à la proptiété ```length```.

Ils s'initialisent entre ```[ ]```.

####Code
```javascript
var mon_tableau = [ 42, 'Hello' ];

console.log(mon_tableau);
console.log(mon_tableau.length);
console.log(mon_tableau[0]);
console.log(mon_tableau[1]);
console.log(mon_tableau[2]);
console.log(typeof mon_tableau);
```

####Résultat
```
[42, "Hello"]
2
42
Hello
undefined
object
```


##Mots-clef

- **null**: Il permet d'initialiser une variable objet à *vide*. ```var ma_variable = null```
- **undefined**: Désigne une variable non initialisée.
- **typeof**: Il permet d'obtenir le type d'une variable sous forme de String. ```typeof variable```
- **var**: Il permet de déclarer une variable. ```var ma_variable```