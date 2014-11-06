Web Service > JAX-RS
====================

**JAX-RS**: Java API for XML - RESTful Services

Partie serveur du Web Service
-----------------------------

Le but est de déployer un Web Service à l'adresse suivante :
*http://localhost:8080/CalculatorRS/rest/calc*

###Création du projet

- Sous Eclipse, créer un nouveau projet Web Dynamic via
  *File > New > Project...* et sélectionner **Dynamic Web Project**.
- Remplir le fomulaire comme suit :
	- **Project Name**: CalculatorRS
	- **Target Runtime**: GlassFish 4
	  <jboss>
	  WildFly 8.x Runtime
	  </jboss>
- Cliquer sur 'Finish' et passer en perspective 'Java EE'.

###Création de la classe de déploiement

- Sélectionner le projet, puis *Clic droit > New > Class*
- Remplir le fomulaire comme suit :
	- **Package**: com.jlg.tutorial.rs.app
	- **Name**: MyApplication
- Voici son contenu :

####MyApplication.java
```java
package com.jlg.tutorial.rs.app;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("/rest")
public class MyApplication extends Application {
}

```

###Création d'une classe d'entité

- Sélectionner le projet, puis *Clic droit > New > Class*
- Remplir le fomulaire comme suit :
	- **Package**: com.jlg.tutorial.entity
	- **Name**: Vector
- Cliquer sur 'Finish'.

Cette classe sera utilisée comme argument d'entrée et de sortie pour certains
web services.

Voici le contenu de la classe :

####Vector.java
```java
package com.jlg.tutorial.entity;

public class Vector {
	public int x = 0;
	public int y = 0;

	public Vector() {
	}

	public Vector(int x, int y) {
		this.x = x;
		this.y = y;
	}

	@Override
	public String toString() {
		return "(" + x + "," + y + ")";
	}

	public static Vector valueOf(String str) {
		int x =
				Integer.parseInt(str.substring(str.indexOf('(') + 1,
						str.indexOf(',')));
		int y =
				Integer.parseInt(str.substring(str.indexOf(',') + 1,
						str.indexOf(')')));
		return new Vector(x, y);
	}
}

```

**Points importants** :

- Le constructeur vide est obligatoire car la classe va être instanciée
  automatiquement par réflexivité.
- Les méthodes `toString()` et `valueOf(String)` sont obligatoire pour
  sérialiser et désérialiser l'objet en `String`.
- Ici les attributs `x` et `y` sont publics. S'ils avaient été privés, il aurait
  fallu leur adjoindre des accesseurs (`getX()`, `setX()`, etc.).


###Création du Web Service

- Sélectionner le projet, puis *Clic droit > New > Class*
- Remplir le fomulaire comme suit :
	- **Package**: com.jlg.tutorial.rs
	- **Name**: CalculatorRS
- Cliquer sur 'Finish'.
- Voici le contenu de la classe :

####CalculatorRS.java
```java
package com.jlg.tutorial.rs;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import com.jlg.tutorial.entity.Vector;

@Path("/calc")
public class CalculatorRS {

	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public int addPlainText(@QueryParam("a") int a, @QueryParam("b") int b) {
		return a + b;
	}

	@GET
	@Produces(MediaType.TEXT_XML)
	public String addXML(@QueryParam("a") int a, @QueryParam("b") int b) {
		return "<?xml version=\"1.0\"?>" + "<result>" + (a + b) + "</result>";
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String addJSON(@QueryParam("a") int a, @QueryParam("b") int b) {
		return "{ \"result\": " + (a + b) + " }";
	}

	@GET
	@Produces(MediaType.TEXT_HTML)
	public String addHTML(@QueryParam("a") int a, @QueryParam("b") int b) {
		return "<html>" + "<title>" + "Calculator RS" + "</title>" + "<body>"
				+ (a + b) + "</body>" + "</html> ";
	}

	@GET
	@Path("/addVector")
	@Produces(MediaType.APPLICATION_JSON)
	public Vector addVector(@QueryParam("v1") Vector v1,
			@QueryParam("v2") Vector v2) {

		Vector result = new Vector(10, 11);
		if (v1 != null && v2 != null) {
			result = new Vector(v1.x + v2.x, v1.y + v2.y);
		}
		return result;
	}

	@POST
	@Path("/scalarVector")
	@Produces(MediaType.TEXT_PLAIN)
	public int scalarVector(@FormParam("v1") Vector v1,
			@FormParam("v2") Vector v2) {
		return v1.x * v2.x + v1.y * v2.y;
	}

}

```

- L'annotation `@Path` permet de spécifier l'URI à laquelle le Web Service sera
  accessible. (Ici *http://localhost:8080/CalculatorRS/rest__/calc__*).
  Il peut être mis sur la classe et/ou sur une méthode. `@Path` sur une méthode
  est concaténé au `@Path` de la classe.
- L'annotation `@GET`, respectivement `@POST`, permet d'exposer une méthode dans
  un Web Service. Cette méthode sera alors appelée lors d'une requête *GET*,
  respectivement *POST*.
- L'annotation `@Produces` permet de spécifier le MIME-Type produit à l'issue de
  la méthode.
- L'annotation `@QueryParam` permet de récupérer un paramètre de la requête et
  de le caster dans le type voulu. Il existe aussi `@FormParam` (récupération
  d'un paramètre d'un formulaire) et `@PathParam` (récupération d'un paramètre
  passé en *deep-linking*).


####Exemple:
```java
@GET
@Produces(MediaType.TEXT_HTML)
myMethod(@QueryParam("a") int a, @QueryParam("b") int b)
```
Cette méthode sera appelée lors d'une requête *GET* acceptant comme MIME-Type de
retour `text/html` et castera les paramêtres `a` et `b` de la requête en `int`.


Créer une nouvelle classe **ParserRS**, dans le package **com.jlg.tutorial.rs**

####ParserRS.java
```java
package com.jlg.tutorial.rs;

import java.util.HashMap;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

@Path("/parser")
public class ParserRS {
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/{value}")
	public String echo(@QueryParam("name") String name,
			@FormParam("type") String type, @PathParam("value") String value) {
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("name", name);
		map.put("type", type);
		map.put("value", value);
		return map.toString();
	}
}

```

La classe **ParserRS** illustre un exemple de web service utilisant la méthode POST ainsi
que les différentes façons d'accéder aux paramètres (`@QueryParam`, `@FormParam`
et `@PathParam`).

###Déploiement du Web Service
Dans la View Eclipse 'Servers':

- démarrer le serveur: sélectionner le serveur et *Clic droit > Start*.
- déployer le Web Service sur le serveur:
	- sélectionner le serveur et *Clic droit > Add and Remove...*,
	- ajouter **CalculatorRS**,
	- puis cliquer sur 'Finish'.

Le Web Service est déployé. Il est prêt à traiter des requêtes clientes.

Se rendre sur
*[http://localhost:8080/CalculatorRS/rest/calc?a=3&b=2](http://localhost:8080/CalculatorRS/rest/calc?a=3&b=2)*
pour confirmer le bon déploiement. Le résultat `5` (*a+b => 3+2*) s'affiche.


Partie cliente du Web Service
-----------------------------

###Prérequis

- Téléchargement de **Genson**, librairie d'outils JSON:
  [http://owlike.github.io/genson/](http://owlike.github.io/genson/)
- Téléchargement et configuration d'Eclipse pour la librairie Jersey.
	1. Télécharger et extraire **Jersey JAX-RS 2.0 RI bundle** :
	   [https://jersey.java.net/download.html](https://jersey.java.net/download.html)
	2. Sous Eclipse, ouvrir les préférences via *Window > Preferences*
	3. Se rendre dans *Java > Build Path > User Libraries*, puis cliquer sur 'New...'
	4. Nommer cette librairie **Jersey 2.0**, cliquer sur 'OK'
	5. Sélectionner **Jersey 2.0** et cliquer sur 'Add External JARs...'
	6. Se rendre dans *path/to/Jersey 2.0*/api, sélectionner tout les jar
	   présents, et cliquer sur 'Open'
	7. Répéter les étapes 5 et 6 pour chaque dossier présent dans
	   *path/to/Jersey 2.0* (*ext*, *lib*)
	8. Cliquer sur 'OK' pour fermer les préférences

###Création du projet

- Sous Eclipse, créer un nouveau projet via
  *File > New > Project...* et sélectionner **Java Project**.
- Nommer le projet **CalculatorRSClient**.
- Cliquer sur 'Next', puis dans l'onglet 'Libraries', cliquer sur
  'Add library...'.
- Sélectionner 'User Library', cliquer sur 'Next'.
- Cocher **Jersey 2.0**, cliquer sur 'Finish'.
- Cliquer sur 'Add External Jar...'.
- Sélectionner **genson-1.1.jar** et cliquer sur 'Open'.
- Cliquer sur 'Finish' et passer en perspective 'Java'.

###Création de la classe principale

- Sélectionner le projet puis créer une nouvelle classe **CalculatorRSClient**
  via *Clic Droit > New > Class*
- Cliquer sur 'Finish'.
- Voici le contenu de la classe :

####CalculatorRSClient.java
```java
import java.net.URI;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.Form;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;

import org.glassfish.jersey.client.ClientConfig;

import com.jlg.tutorial.entity.Vector;
import com.owlike.genson.ext.jaxrs.GensonJsonConverter;

public class CalculatorRSClient {

	public static void main(String[] args) {
		URI baseURI =
				UriBuilder.fromUri("http://localhost:8080/CalculatorRS")
						.build();
		ClientConfig config = new ClientConfig();
		config.register(GensonJsonConverter.class);
		Client client = ClientBuilder.newClient(config);
		WebTarget target = client.target(baseURI);

		System.out.println("Appel 1: affiche l'objet Response");
		System.out.println(target.path("rest").path("calc").queryParam("a", 3)
				.queryParam("b", 2).request().accept(MediaType.TEXT_PLAIN)
				.get(Response.class).toString());

		System.out.println("\nAppel 2: "
				+ "affiche le contenu de la réponse sous forme de String."
				+ "\nMIME-TYPE accepté: text/plain");
		System.out.println(target.path("rest").path("calc").queryParam("a", 3)
				.queryParam("b", 2).request().accept(MediaType.TEXT_PLAIN)
				.get(String.class));

		System.out.println("\nAppel 3: "
				+ "affiche le contenu de la réponse sous forme de String."
				+ "\nMIME-TYPE accepté: text/xml");
		System.out.println(target.path("rest").path("calc").queryParam("a", 3)
				.queryParam("b", 2).request().accept(MediaType.TEXT_XML)
				.get(String.class));

		System.out.println("\nAppel 4: "
				+ "affiche le contenu de la réponse sous forme de String."
				+ "\nMIME-TYPE accepté: text/html");
		System.out.println(target.path("rest").path("calc").queryParam("a", 3)
				.queryParam("b", 2).request().accept(MediaType.TEXT_HTML)
				.get(String.class));

		System.out.println("\nAppel 5: "
				+ "affiche le contenu de la réponse sous forme de String."
				+ "\nMIME-TYPE accepté: text/plain");
		System.out.println(target.path("rest").path("calc").queryParam("a", 3)
				.queryParam("b", 2).request()
				.accept(MediaType.APPLICATION_JSON).get(String.class));

		System.out.println("\nAppel 6: "
				+ "Test sur le ParserRS (QueryParam, PathParam, FormParam)");
		Form form = new Form();
		form.param("type", "Person");
		System.out.println(target.path("rest").path("parser").path("42")
				.queryParam("name", "Yannis").request()
				.accept(MediaType.APPLICATION_JSON)
				.post(Entity.form(form), String.class));

		System.out.println("\nAppel 7: "
				+ "Passer des objets complexes, retourner un objet complexe.");
		System.out.println(target.path("rest").path("calc").path("addVector")
				.queryParam("v1", new Vector(1, 2))
				.queryParam("v2", new Vector(3, 4)).request()
				.accept(MediaType.APPLICATION_JSON).get(Vector.class));

		System.out.println("\nAppel 8: "
				+ "Test en POST avec retour d'un nombre entier");
		Form vectorform = new Form();
		vectorform.param("v1", new Vector(1, 2).toString());
		vectorform.param("v2", new Vector(3, 4).toString());
		System.out.println(target.path("rest").path("calc")
				.path("scalarVector").request().accept(MediaType.TEXT_PLAIN)
				.post(Entity.form(vectorform), Integer.class));
	}
}

```

###Copie de la classe d'entité

- Sélectionner le projet précédent, **CalculatorRS**, et ouvrir les sources,
  **src**.
- Sélectionner le package **com.jlg.tutorial.entity**, puis *Clic Droit > Copy*.
- Revenir dans le projet courant, **CalculatorRSClient**.
- Sélectionner **src**, puis *Clic droit > Paste*.

###Test du client

Sélectionner **CalculatorRSClient.java** et
*Clic droit > Run As > Java Application*.

La console affiche ceci:
```
Appel 1: affiche l'objet Response
InboundJaxrsResponse{ClientResponse{method=GET, uri=http://localhost:8080/CalculatorRS/rest/calc?a=3&b=2, status=200, reason=OK}}

Appel 2: affiche le contenu de la réponse sous forme de String.
MIME-TYPE accepté: text/plain
5

Appel 3: affiche le contenu de la réponse sous forme de String.
MIME-TYPE accepté: text/xml
<?xml version="1.0"?><result>5</result>

Appel 4: affiche le contenu de la réponse sous forme de String.
MIME-TYPE accepté: text/html
<html><title>Calculator RS</title><body>5</body></html>

Appel 5: affiche le contenu de la réponse sous forme de String.
MIME-TYPE accepté: text/plain
{ "result": 5 }

Appel 6: Test sur le ParserRS (QueryParam, PathParam, FormParam)
{name=Yannis, value=42, type=Person}

Appel 7: Passer des objets complexes, retourner un objet complexe.
(4,6)

Appel 8: Test en POST avec retour d'un nombre entier
11

```