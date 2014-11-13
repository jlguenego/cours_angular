Webapp. JSP
===========

Création du projet
------------------

- Sous Eclipse, créer un nouveau projet EJB via
  *File > New > Other... > Dynamic Web Project*.
- Nommer le projet **WebappJSP**.
- Sélectionner la target runtime **GlassFish4**.
  <jboss>
  Sélectionner la target runtime **WildFly 8.x Runtime**.
  </jboss>
- Cliquer sur 'Next', puis 'Next'.
- Cocher 'Generate web.xml deployment descriptor.
- Cliquer sur 'Finish' et passer en perspective 'Java EE'.


Création du JSP
---------------

- Créer un nouveau 'JSP' via *New > JSP File*.
- Le nommer **MyJSP.jsp**.
- Cliquer sur 'Finish'.

Voici son contenu :

####MyJSP.jsp
```html
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<title>My JSP</title>
	</head>
	<body>
		<h1>Hello World!</h1>
	</body>
</html>
```

Configuration du JSP
--------------------

Dans *Web Content > WEB-INF* se trouve le fichier **web.xml**.
Remplacer son contenu par celui-ci :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://xmlns.jcp.org/xml/ns/javaee" xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd" id="WebApp_ID" version="3.1">
	<display-name>WebappJSP</display-name>
	<servlet>
		<servlet-name>MyServlet</servlet-name>
		<jsp-file>/MyJSP.jsp</jsp-file>
	</servlet>
	<servlet-mapping>
		<servlet-name>MyServlet</servlet-name>
		<url-pattern>/hello</url-pattern>
	</servlet-mapping>
</web-app>
```

Déploiement
-----------

Dans la View Eclipse 'Servers':

- Démarrer le serveur: sélectionner le serveur et *Clic droit > Start*.
- Déployer l'EJB sur le serveur:
	- Sélectionner le serveur et *Clic droit > Add and Remove...*,
	- Ajouter **WebappJSP**,
	- Puis cliquer sur 'Finish'.

Le JSP est accessible à cette adresse :
[http://localhost:8080/WebappJSP/hello](http://localhost:8080/WebappJSP/hello)