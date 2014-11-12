WebApp. Servlet
====================

Création du projet
------------------

- Sous Eclipse, créer un nouveau projet EJB via
  *File > New > Other... > Dynamic Web Project*.
- Nommer le projet **WebappServlet**.
- Sélectionner la target runtime **GlassFish4**.
  <jboss>
  Sélectionner la target runtime **WildFly 8.x Runtime**.
  </jboss>
- Cliquer sur 'Finish' et passer en perspective 'Java EE'.


Création de la Servlet
----------------------

- Créer une nouvelle 'Servlet' via *New > Servlet*.
- Compléter le formulaire comme suit:
	- **Java package**: com.jlg.tutorial.servlet
	- **Class name**: MyServlet
- Cliquer sur 'Finish'.

Voici son contenu :

####MyServlet.java
```java
package com.jlg.tutorial.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/MyServlet")
public class MyServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public MyServlet() {
		super();
	}

	@Override
	protected void service(HttpServletRequest req, HttpServletResponse res)
			throws ServletException, IOException {
		res.getWriter().println("Hello World!");
	}

}

```


Déploiement
-----------

Dans la View Eclipse 'Servers':

- Démarrer le serveur: sélectionner le serveur et *Clic droit > Start*.
- Déployer l'EJB sur le serveur:
	- Sélectionner le serveur et *Clic droit > Add and Remove...*,
	- Ajouter **WebappServlet**,
	- Puis cliquer sur 'Finish'.

La Servlet est accessible à l'adresse suivante :
[http://localhost:8080/WebappServlet/MyServlet](http://localhost:8080/WebappServlet/MyServlet)