Web Service > JAX-WS
====================

Un **Web Service** est une fonctionalité exposée, en général,
via le protocole HTTP.
Cette fonctionalité est accessible depuis n'importe quel client,
utilisant son propre langage (JavaScript, C#, Java, etc.).

**JAX-WS**: Java API for XML - Web Service

Partie serveur du Web Service
-----------------------------

###Création du projet

- Sous Eclipse, créer un nouveau projet Web Dynamic via
  *File > New > Project...* et sélectionner **Dynamic Web Project**.
- Remplir le fomulaire comme suit :
	- **Project Name**: CalculatorWS
	- **Target Runtime**: GlassFish 4
	  <jboss>
	  WildFly 8.x Runtime
	  </jboss>
- Cliquer sur 'Finish' et passer en perspective 'Java EE'.

###Création du Web Service

- Sélectionner le projet, puis *Clic droit > New > Class*
- Remplir le fomulaire comme suit :
	- **Package**: com.jlg.tutorial.ws
	- **Name**: CalculatorWS
- Cliquer sur 'Finish'.
- Voici le contenu de la classe :

####CalculatorWS.java
```java
package com.jlg.tutorial.ws;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService(serviceName = "MyCalculatorService")
public class CalculatorWS {
	@WebMethod
	public int add(int a, int b) {
		return a + b;
	}
}

```

L'annotation `@WebService` permet de déclarer une classe comme étant un Web
Service.

- **Note** : On précise le `seviceName` pour éviter les différences de nommage par défaut
entre les serveurs d'applications.

L'annotation `@WebMethod` permet d'exposer une méthode dans un Web Service.

###Déployment du Web Service
Dans la View Eclipse 'Servers':

- démarrer le serveur: sélectionner le serveur et *Clic droit > Start*.
- déployer le Web Service sur le serveur:
	- sélectionner le serveur et *Clic droit > Add and Remove...*,
	- ajouter **CalculatorWS**,
	- puis cliquer sur 'Finish'.

Le Web Service est déployé. Il est prêt à traiter des requêtes clientes.

Se rendre sur
*[http://localhost:8080/CalculatorWS/MyCalculatorService](http://localhost:8080/CalculatorWS/MyCalculatorService)*
pour confirmer le bon déployment. Une page présentant le Web Service s'affiche
si celui-ci est déployé correctement. Elle présente un lien sur le fichier
[WSDL](http://localhost:8080/CalculatorWS/MyCalculatorService?wsdl) qui décrit
le Web Service.

<jboss>
*http://localhost:8080/CalculatorWS/MyCalculatorService* n'est pas une page
  web navigable, mais son
  [WSDL](http://localhost:8080/CalculatorWS/MyCalculatorService?wsdl) est
  accessible.
</jboss>


Partie cliente du Web Service
-----------------------------

###Création du projet

- Sous Eclipse, créer un nouveau projet Web Dynamic via
  *File > New > Project...* et sélectionner **Java Project**.
- Nommer le projet **CalculatorWSClient**.
- Cliquer sur 'Finish' et passer en perspective 'Java'.

###Génération code Java à partir du WSDL

Le **WSDL** (Web Services Description Language) est le descripteur,
basé sur XML, des fonctionnalités du Web Service.
Il est nécessaire au client pour fonctionner.

Ici, il sera traduit en Java pour le client en Java.

- Vérifier la présence de *%JAVA_HOME%\bin* dans le path
- Ouvrir une console et se rendre dans *path/to/GlassFish4*/bin
- Entrer la commande suivante: `wsimport -d "path/to/CalculatorWSClient/src"
  -keep -verbose http://localhost:8080/CalculatorWS/CalculatorWSService?wsdl`

<jboss>
`/path/to/WildFly/bin/wsconsume.bat --keep
-o "path/to/CalculatorWSWildFlyClient/src"
http://localhost:8080/CalculatorWS/CalculatorWS?wsdl`
</jboss>
- Les sources nécessaires au client viennent d'être intégrées au projet.


###Création de la classe principale

- Sélectionner le projet puis *Clic Droit > New > Class*
- Remplir le fomulaire comme suit :
	- **Package**: com.jlg.tutorial.ws.client
	- **Name**: CalculatorWSClient
- Cliquer sur 'Finish'.
- Voici le contenu de la classe :

####CalculatorWSClient.java
```java
package com.jlg.tutorial.ws.client;

import com.jlg.tutorial.ws.CalculatorWS;
import com.jlg.tutorial.ws.MyCalculatorService;

public class CalculatorWSClient {
	public static void main(String[] args) {
		MyCalculatorService service = new MyCalculatorService();

		CalculatorWS calc = service.getCalculatorWSPort();

		System.out.println("3+2=" + calc.add(3, 2));
	}
}
```

###Test du client

Sélectionner **CalculatorWSClient.java** et
*Clic droit > Run As > Java Application*.

La console affiche ceci:
```
3+2=5
```