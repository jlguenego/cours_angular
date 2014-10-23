Les expressions
===============

Les opérateurs arithmétiques
----------------------------

- Addition ```+```: additionne deux nombres, ou concatène deux Strings.
- Soustraction ```-```
- Multiplication ```*```
- Division ```/```
- Modulo ```%```

```javascript
console.log(2 + 3.1); // affiche 5.1
console.log(0.1 + 0.2); // Attention: affiche "0.30000000000000004" (problème d'arrondi du FPU)
console.log(2 - 3); // affiche -1
console.log(2 * 3); // affiche 6
console.log(6 / 3); // affiche 2
console.log(13 % 10); // affiche 3
console.log(13.1 % 10); // Attention: affiche 3.0999999999999996 (le problème d'arrondi arrive plus souvent qu'on ne le pense)
```

Les opérateurs logiques
-----------------------

Une opérande est considérée comme fausse si elle est ```undefined```, ```null```, ```''```, ```0```, ```false```.
Une opérande est considérée comme vraie dans les autres cas.

- AND: ```&&```

Si la première opérande est vraie, alors renvoie la seconde opérande,
sinon renvoie la première opérande.
```javascript
console.log(false && 0); // affiche false
console.log(true && 0); // affiche 0
console.log(32 && false); // affiche false
console.log('coucou' && 'hello'); // affiche 'hello'
```

- OR: ```||```

Si la première opérande est vraie, alors renvoie la première opérande,
sinon renvoie la seconde opérande.

```javascript
console.log(false || 0); // affiche 0
console.log(true || 0); // affiche true
console.log(32 || false); // affiche 32
console.log('coucou' || 'hello'); // affiche 'coucou'
```

- NOT: ```!```

Si l'opérande est vraie, alors renvoi ```false```, sinon renvoi ```true```.

```javascript
console.log(!32); // affiche false
console.log(!0); // affiche true
console.log(!''); // affiche true
console.log(!true); // affiche false
```

Les opérateurs de comparaison
-----------------------------

- Égal: ```==``` ou ```===```
	- ```==```: Renvoie ```true``` si les deux valeurs sont égales (mais pas forcément du même type).
	- ```===```: Renvoie ```true``` si les deux valeurs sont égales, et en plus, du même type.

Note: Si les deux opérandes sont des objets, alors la comparaison porte sur leur référence en mémoire.

```javascript
console.log(2 == 3); // affiche false
console.log(2 == 2); // affiche true
console.log(2 == '2'); // affiche true
console.log(2 === '2'); // affiche false
console.log('coucou' == 'hello'); // affiche false
console.log('coucou' == 'coucou1' ); // affiche false
```

- Différent: ```!=``` ou ```!==```
	- ```!=```: Renvoie ```false``` si les deux valeurs sont égales (mais pas forcément du même type).
	- ```!==```: Renvoie ```false``` si les deux valeurs sont égales, et en plus, du même type.

Note: Si les deux opérandes sont des objets, alors la comparaison porte sur leur référence en mémoire.

```javascript
console.log(2 != 3); // affiche true
console.log(2 != 2); // affiche false
console.log(2 != '2'); // affiche false
console.log(2 !== '2'); // affiche true
console.log('coucou' != 'hello'); // affiche true
console.log('coucou' != 'coucou1' ); // affiche true
```

- Strictement supérieur ```>```
- Supérieur ou égal ```>=```
- Strictement inférieur ```<```
- Inférieur ou égal  ```<=```

Note: Ces opérateurs effectuent une comparaison indépendamment du type.

```javascript
console.log(2 < 3);      // affiche true
console.log(3 < 2);      // affiche false
console.log(3 < 3);      // affiche false
console.log('32' < '4'); // affiche true (car: la comparaison porte sur des chaînes de caractères)
console.log(3 <= 3);     // affiche true
console.log(2 >= 3);     // affiche false
console.log(2 > 3);      // affiche false
```

Les opérateurs bit à bit
------------------------

Les nombres sont considérés comme des nombres entiers 32 bits signés.

- AND: ```&```

Effectue une comparaison 'et' bit à bit.
```javascript
console.log(3 & 10); // affiche 2 (car: 0011 & 1010 = 0010)
```

- OR: ```|```

Effectue une comparaison 'ou' bit à bit.
```javascript
console.log(3 | 10); // affiche 11 (car: 0011 | 1010 = 1011)
```

- XOR: ```^```
Effectue une comparaison 'xor' bit à bit.
```javascript
console.log(3 ^ 10); // affiche 9 (car: 0011 & 1010 = 1001)
```

- NOT: ```~```

Inverse les bits de l'opérande.

Note: JavaScript utilise la notation complément à 2.
```javascript
console.log(~1); // affiche -2 (car: ~0000(...)000001 = 1111(...)111110)
```

- Décalage à gauche: ```<<```

L'expression ```x << y``` retourne une valeur obtenue en décalant les bits de ```x```, ```y``` fois vers la gauche.

```javascript
console.log(9 << 2); // affiche 36 (car: 00001001 << 2 = 00100100)
```

- Décalage à droite: ```>>```

L'expression ```x >> y``` retourne une valeur obtenue en décalant les bits de ```x```, ```y``` fois vers la droite,
en remplissant la gauche avec des '0' si le nombre est positif ou des '1' si le nombre est strictement négatif.

```javascript
console.log(9 >> 2); // affiche 2 (car: 0000-1001 >> 2 = 0000-0010)
console.log(-9 >> 2); // affiche -3 (car: 1111-0111 >> 2 = 1111-1101)
```

- Décalage à droite avec remplissage de 0: ```>>>```

L'expression ```x >>> y``` retourne une valeur obtenue en décalant les bits de ```x```, ```y``` fois vers la droite
en remplissant la gauche avec des '0'.

```javascript
console.log(9 >>> 2); // affiche 2
// (car: 0000-0000 0000-0000 0000-0000 0000-1001 >>> 2 = 0000-0000 0000-0000 0000-0000 0000-0010)

console.log(-9 >>> 2); // affiche 1073741821
// (car: 1111-1111 1111-1111 1111-1111 1111-0111 >>> 2 = 0011-1111 1111-1111 1111-1111 1111-1101)

console.log((-1 >>> 1).toString(2).length); // affiche 32 - 1 = 31
// permet de confirmer les nombres sont des entiers stockés sur 32 bits.
```

Les opérateurs d'assignation
----------------------------

- Assignation simple: ```=```

```javascript
var x = 1;
var y = x;
var a = b = 2; // b = 2 renvoie 2, donc a = 2.
var c = 1, d = 2;
var e = f = 'coucou'; // f = 'coucou' renvoie 'coucou', donc e = 'coucou'.

console.log(e); // affiche 'coucou'
console.log(f); // affiche 'coucou'
console.log(e == f); // affiche true
```

- Incrémentation: ```++```
	- ```maVariable++``` renvoie la valeur de *maVariable* puis l'incrémente.
	- ```++maVariable``` incrémente puis renvoie la valeur de *maVariable*.

```javascript
var x = 0;
console.log(x++); //affiche 0
console.log(x); //affiche 1
console.log(++x); //affiche 2
console.log(x); //affiche 2
```

- Décrémentation: ```--```
	- ```maVariable--``` renvoie la valeur de *maVariable* puis la décrémente.
	- ```--maVariable``` décrémente puis renvoie la valeur de *maVariable*.

```javascript
var x = 0;
console.log(x--); //affiche 0
console.log(x); //affiche -1
console.log(--x); //affiche -2
console.log(x); //affiche -2
```
