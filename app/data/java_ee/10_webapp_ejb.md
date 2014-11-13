Webapp. + EJB
=============

Refaire le projet [précédent]({{url('/cours/java_ee/09_webapp_jsf')}}) en
nommant le projet `WebappEJB`.

EJB
---

- Sélectionner le projet et créer un nouveau 'Session Bean' via
  *Clic Droit > New > Session Bean (3.x)*.
- Compléter le formulaire comme suit:
	- **Java package**: com.jlg.tutorial.ejb
	- **Class name**: UserBean
	- **State type**: Stateless
	- **Remote**: (décoché)
	- **Local**: (coché) com.jlg.tutorial.ejb.interfaces.UserBeanLocal
	- **No-interface View**: (décoché)
- Cliquer sur 'Finish'.

Voici son contenu :

####UserBeanLocal.java
```java
package com.jlg.tutorial.ejb.interfaces;

import javax.ejb.Local;

@Local
public interface UserBeanLocal {
	String getWelcomeMsg(String name, String password);
}

```

####UserBean.java
```java
package com.jlg.tutorial.ejb;

import javax.ejb.Stateless;

import com.jlg.tutorial.ejb.interfaces.UserBeanLocal;

@Stateless
public class UserBean implements UserBeanLocal {

	@Override
	public String getWelcomeMsg(String name, String password) {
		return "Welcome, " + name + ". Your password is: " + password + ".";
	}

}

```

Utilisation de l'EJB
--------------------

Changer respectivement le contenue de **LoginBean.java** et **welcome.xhtml**
par :


####LoginBean.java
```java
package com.jlg.tutorial.beans;

import javax.ejb.EJB;

import com.jlg.tutorial.ejb.interfaces.UserBeanLocal;

public class LoginBean {
	private String name;
	private String password;

	@EJB
	private UserBeanLocal bean;

	public String getWelcomeMsg() {
		return bean.getWelcomeMsg(name, password);
	}

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
			<h:outputText value="#{loginBean.welcomeMsg}"></h:outputText>
		</ui:define>
	</ui:composition>
</html>
```


Déploiement
-----------

Dans la View Eclipse 'Servers':

- Démarrer le serveur: sélectionner le serveur et *Clic droit > Start*.
- Déployer l'EJB sur le serveur:
	- Sélectionner le serveur et *Clic droit > Add and Remove...*,
	- Ajouter **WebappEJB**,
	- Puis cliquer sur 'Finish'.

Le JSP est accessible à cette adresse :
[http://localhost:8080/WebappEJB/faces/login.xhtml](http://localhost:8080/WebappEJB/faces/login.xhtml)