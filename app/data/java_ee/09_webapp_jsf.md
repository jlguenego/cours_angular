Webapp. JSF
===========

Prérequis
---------

- Télécharger **java.faces-api-2.2.jar** :
  [https://maven.java.net/content/repositories/releases/javax/faces/javax.faces-api/2.2/](https://maven.java.net/content/repositories/releases/javax/faces/javax.faces-api/2.2/)
- Sous Eclipse, aller dans *Window > Préférences*, puis
  *Java > Build Path > User Libraries*.
- Cliquer sur 'New...', nommer la **JSF 2.2**, puis cliquer sur 'OK'.
- Sélectionner **JSF 2.2**, puis cliquer sur 'Add External JARs...'.
- Sélectionner **java.faces-api-2.2.jar**, puis cliquer sur 'Open'.
- Cliquer sur 'Ok' pour terminer.

Création du projet
------------------

- Sous Eclipse, créer un nouveau projet EJB via
  *File > New > Other... > Faceted Project*.
- Nommer le projet **WebappJSF**.
- Dans ce formulaire, sélectionner la configuration
  **JavaServer Faces v2.2 Project**.
- Dans l'onglet 'Runtime', cocher **GlassFish 4**
  <jboss>
  **WildFly 8.x Runtime**
  </jboss>
- Cliquer sur 'Next', puis 'Next'.
- Cocher 'Generate web.xml deployment descriptor.
- Cliquer sur 'Finish' et passer en perspective 'Java EE'.


Création du JSF
----------------

- Dans *Web Content > WEB-INF* ouvrir **faces-config.xml**.
- Dans l'onglet 'Managed Bean', sélectionner 'session' puis cliquer sur 'Add'.
- Dans le formulaire sélectionner 'Create a new Java Class', puis cliquer sur
  'Next'.
- Compléter le formulaire comme suit:
	- **Java package**: com.jlg.tutorial.beans
	- **Class name**: LoginBean
- Cliquer sur 'Next', puis compléter le formulaire comme suit:
	- **Name**: loginBean
	- **Scope**: Session
- Cliquer sur 'Finish'.
- Toujours dans l'onglet 'Managed Bean', dans la partie 'Managed Bean', ouvrir
  le bean créé en cliquant sur 'Managed Bean class\*'

Voici son contenu :

####LoginBean.java
```java
package com.jlg.tutorial.beans;

public class LoginBean {
	private String name;
	private String password;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}

```

Création des pages
------------------

###Création des templates

- Dans *Web Content > WEB-INF*, créer le dossier 'templates' via
  *Clic Droit > New > Folder*.
- Créer ensuite trois fichiers, **defaultTemplate.xhtml**, **header.xhtml**, et
  **footer.xhtml**, dans ce dossier 'templates' via *Clic Droit > New > File*

Voici leur contenu respectif :

####defaultTemplate.xhtml
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"
	xmlns:ui="http://java.sun.com/jsf/facelets">
	<head>
		<title><ui:insert name="title">Default title</ui:insert></title>
	</head>

	<body>
		<ui:debug hotkey="x" rendered="#{initParam['javax.faces.FACELETS_DEVELOPMENT']}"/>

		<div id="header">
			<ui:insert name="header">
				<ui:include src="header.xhtml"/>
			</ui:insert>
		</div>

		<div id="content">
		  <ui:insert name="content"></ui:insert>
		</div>

		<div id="footer">
		  <ui:insert name="footer">
			<ui:include src="footer.xhtml"/>
		  </ui:insert>
		</div>

	</body>
</html>

```

####header.xhtml
```html
<?xml version="1.0" encoding="ISO-8859-1" ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<body>
		<div style="width:100%; font-size:36px; line-height:48px; background-color:navy; color:white;">
			Wonderful header
		</div>
	</body>
</html>

```

####footer.xhtml
```html
<?xml version="1.0" encoding="ISO-8859-1" ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<body>
		<div style="background-color:navy;width:100%;color:white">
			Pretty footer
		</div>
	</body>
</html>

```

###Création du contenu

Dans le dossier **Web Content**, créer deux fichiers, **login.xhtml** et
**welcome.xhtml**.

Voici leur contenu respectif :

####login.xhtml
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml"
	xmlns:ui="http://java.sun.com/jsf/facelets"
	xmlns:h="http://java.sun.com/jsf/html"
	xmlns:f="http://java.sun.com/jsf/core">

<ui:composition template="/WEB-INF/templates/defaultTemplate.xhtml">
	<ui:define name="content">
		<h:form>
			<h:panelGrid columns="2">
				<h:outputText value="Name"></h:outputText>
				<h:inputText value="#{loginBean.name}"></h:inputText>
				<h:outputText value="Password"></h:outputText>
				<h:inputSecret value="#{loginBean.password}"></h:inputSecret>
			</h:panelGrid>
			<h:commandButton value="Login" action="login"></h:commandButton>
		</h:form>
	</ui:define>
</ui:composition>
</html>
```

####welcome.xhtml
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml"
	xmlns:ui="http://java.sun.com/jsf/facelets"
	xmlns:h="http://java.sun.com/jsf/html"
	xmlns:f="http://java.sun.com/jsf/core">

	<ui:composition template="/WEB-INF/templates/defaultTemplate.xhtml">
		<ui:define name="content">
			Welcome, <h:outputText value="#{loginBean.name}"></h:outputText>.<br/>
			Your password is: <h:outputText value="#{loginBean.password}"></h:outputText>.
		</ui:define>
	</ui:composition>
</html>
```

Configuration des JSF
---------------------

###Le web.xml

Dans le dossier *Web Content > WEB-INF*, modifier le contenu de web.xml par
celui-ci :

####web.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app id="WebApp_ID" version="3.1"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns="http://xmlns.jcp.org/xml/ns/javaee"
	xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd">
	<display-name>WebappJSF</display-name>
	<servlet>
		<servlet-name>My Faces Servlet</servlet-name>
		<servlet-class>javax.faces.webapp.FacesServlet</servlet-class>
		<load-on-startup>1</load-on-startup>
	</servlet>
	<servlet-mapping>
		<servlet-name>My Faces Servlet</servlet-name>
		<url-pattern>/faces/*</url-pattern>
	</servlet-mapping>
</web-app>
```

###Règles de navigation

- Dans *Web Content > WEB-INF* ouvrir **faces-config.xml**.
- Dans l'onglet 'Navigation Rule', glisser-déposer **login.xhtml** et
  **welcome.xhtml**.
- Si la 'Palette' n'est pas ouverte (sur le côté droit de la vue courante),
  cliquer sur la petite flèche située en haut à droite de la vue courante pour
  l'ouvrir.
- Dans la 'Palette', cliquer sur 'Link'.
- Cliquer, dans l'ordre, sur **login.xhtml**, puis **welcome.xhtml**.
- Dans la 'Palette', cliquer sur 'Select'.
- Afficher la View 'Properties'.
- Cliquer sur la flèche entre **login.xhtml** et **welcome.xhtml**.
- À droite du champ 'From Outcome', cliquer sur '...' et sélectionner **login**.
- Sauvegarder le ficher **faces-config.xml**.


Déploiement
-----------

Dans la View Eclipse 'Servers':

- Démarrer le serveur: sélectionner le serveur et *Clic droit > Start*.
- Déployer l'EJB sur le serveur:
	- Sélectionner le serveur et *Clic droit > Add and Remove...*,
	- Ajouter **WebappJSF**,
	- Puis cliquer sur 'Finish'.

Le JSP est accessible à cette adresse :
[http://localhost:8080/WebappJSF/faces/login.xhtml](http://localhost:8080/WebappJSF/faces/login.xhtml)