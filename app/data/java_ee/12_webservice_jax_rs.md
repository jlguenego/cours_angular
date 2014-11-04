Web Service > JAX-RS
====================

**JAX-RS**: Java API for XML - RESTful Service

Partie serveur du Web Service
-----------------------------

Le but est de déployer un Web Service à l'adresse suivante :
*http://localhost:8080/CalculatorRS/rest/calc*

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

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

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
		return "<html> " + "<title>" + "Calculator RS" + "</title>" + "<body>"
				+ (a + b) + "</body>" + "</html> ";
	}
}

```

- L'annotation `@Path` permet de spécifier l'URI à laquelle le Web Service sera
  accessible. (Ici *http://localhost:8080/CalculatorRS/rest__/calc__*)
- L'annotation `@GET` permet d'exposer une méthode dans un Web Service.
  Cette méthode sera alors appelée lors d'une requête *GET*.
- L'annotation `@Produces` permet de spécifier le MIME-Type produit à l'issue de
  la méthode.
- L'annotation `@QueryParam` permet de récupérer un paramètre de la requête et
  de le caster dans le type voulu .

####Exemple:
```java
@GET
@Produces(MediaType.TEXT_HTML)
myMethod(@QueryParam("a") int a, @QueryParam("b") int b)
```
cette méthode sera appelée lors d'une requête *GET* acceptant comme MIME-Type de
retour `text/html` et castera les paramêtres `a` et `b` de la requête en `int`.

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

Téléchargement et configuration d'Eclipse pour la librairie Jersey.

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

- Sous Eclipse, créer un nouveau projet Web Dynamic via
  *File > New > Project...* et sélectionner **Java Project**.
- Nommer le projet **CalculatorRSClient**.
- Cliquer sur 'Next', puis dans l'onglet 'Libraries', cliquer sur
  'Add library...'.
- Sélectionner 'User Library', cliquer sur 'Next'.
- Cocher **Jersey 2.0**, cliquer sur 'Finish'.
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
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;

import org.glassfish.jersey.client.ClientConfig;

public class CalculatorRSClient {

	public static void main(String[] args) {
		URI baseURI =
				UriBuilder.fromUri("http://localhost:8080/CalculatorRS")
						.build();
		ClientConfig config = new ClientConfig();
		Client client = ClientBuilder.newClient(config);
		WebTarget target = client.target(baseURI);

		System.out.println(target.path("rest").path("calc").queryParam("a", 3)
				.queryParam("b", 2).request().accept(MediaType.TEXT_PLAIN)
				.get(Response.class).toString());

		System.out.println(target.path("rest").path("calc").queryParam("a", 3)
				.queryParam("b", 2).request().accept(MediaType.TEXT_PLAIN)
				.get(String.class));

		System.out.println(target.path("rest").path("calc").queryParam("a", 3)
				.queryParam("b", 2).request().accept(MediaType.TEXT_XML)
				.get(String.class));

		System.out.println(target.path("rest").path("calc").queryParam("a", 3)
				.queryParam("b", 2).request().accept(MediaType.TEXT_HTML)
				.get(String.class));

		System.out.println(target.path("rest").path("calc").queryParam("a", 3)
				.queryParam("b", 2).request()
				.accept(MediaType.APPLICATION_JSON).get(String.class));
	}
}

```

###Test du client

Sélectionner **CalculatorRSClient.java** et
*Clic droit > Run As > Java Application*.

La console affiche ceci:
```
InboundJaxrsResponse{ClientResponse{method=GET, uri=http://localhost:8080/CalculatorRS/rest/calc?a=3&b=2, status=200, reason=OK}}
5
<?xml version="1.0"?><result>5</result>
<html> <title>Calculator RS</title><body>5</body></html>
{ "result": 5 }
```