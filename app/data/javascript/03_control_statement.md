Les Structures de contôle
=========================

##Les conditions

Elles permettent des tester si des affirmations sont vrai ou fausse.

####Exemple
```javascript
var x = 3;
var y = 12;
if (x > y) {
	console.log('x est plus grand');
} else {
	console.log('y est plus grand');
}
```

####Resultat
```
y est plus grand
```

###Les conditions dites ternaires

Elles renvoie une certaine valeur si vrai et une autre si faux

```javascript
var x = 3;
var y = 12;

var z = (x > y) ? 'x est plus grand' : 'y est plus grand';

console.log(z); // affiche 'y est plus grand'
```

##Les Boucles

###For

Permet d'effectuer une boucle un nombre finis de fois.

####Exemple
```javascript
for (var i = 0; i < 5; i++) {
	console.log(i);
}

var mon_objet = {
	p1: 12,
	p2: 'coucou'
}

for (var ma_propriete in mon_objet) { // Pour chaque propriété énumérable 'ma_propriete' dans 'mon_objet'
	console.log(ma_propriete);
}
```

####Résultat
```
0
1
2
3
4
p1
p2
```

Note: Attention au fait qu'un objet peut avoir davantage de propriétés que prévu.
On verra plus tard qu'un objet peut avoir d'autres propriétés issues de son prototype.

###While

####Exemple
```javascript
var x = 0;
while (x < 0) {
    console.log('x=', x);
    x++;
}
console.log('final x=', x);

var y = 0;
do {
    console.log('y=', y);
    y++;
} while (y < 0);
console.log('final y=', y);
```

####Résultat
```
final x= 0
y= 0
final y= 1
```


##Les Exceptions

####Exemple
```javascript
var x = 12;
try {
	x = 42;
	throw 'Oups';
	console.log(x);
} catch (e) {
	console.log(x);
	console.log('Erreur:', e);
} finally {
	x = 29;
	console.log(x);
}
```

####Résultat
```
42
Erreur: Oups
29
```

