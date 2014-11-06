EJB > Entity (JPA)
==================


EJB
---

###Création du projet EJB
- Sous Eclipse, créer un nouveau projet EJB via
  *File > New > Other... > EJB Project*. Nommer le projet `EJBEntity`.
- Sélectionner la target runtime **GlassFish4**.
  <jboss>
  Sélectionner la target runtime **WildFly 8.x Runtime**.
  </jboss>
- Cliquer sur 'Finish' et passer en perspective 'Java EE'.

###Création de la classe d'entité
- Sélectionner le projet, puis *Clic droit > New > Class*
- Remplir le fomulaire comme suit :
	- **Package**: com.jlg.tutorial.entity
	- **Name**: User
- Cliquer sur 'Finish'.

####User.java
```java
package com.jlg.tutorial.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user_t")
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String login;
	@Column(name = "passwd")
	private String password;

	// Obligatoire pour JPA
	public User() {
	}

	public User(String login, String password) {
		this.setLogin(login);
		this.setPassword(password);
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getId() {
		return id;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getLogin() {
		return login;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPassword() {
		return password;
	}
}

```


###Création de l'EJB Stateless gérant l'entité

- Créer un nouveau 'Session Bean' via *New > Session Bean (3.x)*.
- Compléter le formulaire comme suit:
	- **Java package**: com.jlg.tutorial.ejb
	- **Class name**: UserBean
	- **State type**: Stateless
	- **Remote**: (coché) com.jlg.tutorial.ejb.interfaces.UserBeanRemote
	- **Local**: (décoché)
	- **No-interface View**: (décoché)
- Cliquer sur 'Finish'.

Deux fichiers sont créés: le Bean et son interface.

####UserBeanRemote.java
```java
package com.jlg.tutorial.ejb.interfaces;

import java.util.List;

import javax.ejb.Remote;

import com.jlg.tutorial.entity.User;

@Remote
public interface UserBeanRemote {

	void add(User user);

	List<User> list();

	void resetAll();
}

```

####UserBean.java
```java
package com.jlg.tutorial.ejb;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.jlg.tutorial.ejb.interfaces.UserBeanRemote;
import com.jlg.tutorial.entity.User;

@Stateless
public class UserBean implements UserBeanRemote {
	@PersistenceContext(unitName = "myPersistenceUnit")
	private EntityManager entityManager;

	public UserBean() {
	}

	@Override
	public void add(User user) {
		entityManager.persist(user);
	}

	@Override
	public List<User> list() {
		return entityManager.createQuery("FROM User u", User.class)
				.getResultList();
	}

	@Override
	public void resetAll() {
		entityManager.createQuery("DELETE FROM User u").executeUpdate();
	}

}

```

Le bean encapsule un objet appelée `EntityManager` chargé d'effectuer les
opérations de persistence sur l'entité :

- `persist`
- `createQuery`

`myPersistenceUnit` représente la source de donnée sur laquelle s'effectue la
persistence. Cette source de donnée est définie dans le fichier xml de
persistence `persistence.xml`.

###Création du fichier de persistence

- Sélectionner **META-INF**, dans **ejbModule**, puis *Clic droit > New > File*
- Nommer ce fichier **persistence.xml**, puis cliquer sur 'Finish'.

####persistence.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<persistence version="2.0"
		xmlns="http://java.sun.com/xml/ns/persistence"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xsi:schemaLocation="http://java.sun.com/xml/ns/persistence http://java.sun.com/xml/ns/persistence/persistence_2_0.xsd">
	<persistence-unit name="myPersistenceUnit" transaction-type="JTA">
		<jta-data-source>jdbc/__default</jta-data-source>
		<!-- <jta-data-source>WildFly</jta-data-source> -->
		<exclude-unlisted-classes>false</exclude-unlisted-classes>
		<properties/>
	</persistence-unit>
</persistence>
```

On utilise dans ce tutorial la base de donnée délivrée par défaut par
GlassFish : **Derby**.

###Initialisation de la base de donnée

- Se rendre dans */path/to/Glassfish4*/glassfish/bin et démarrer la base de
  donnée avec la commande `asadmin start-database`.
- S'assurer de l'existence de la variable d'environnement **DERBY_HOME** et
  qu'elle vaut */path/to/Glassfish4*/javadb.
- Veiller à ce que la variable d'environnement **CLASSPATH** ne soit pas
  définie.
- Se rendre dans *DERBY_HOME*/bin et exécuter la commande `ij`.
- Se connecter à la base de donnée grâce à la commande
  `connect 'jdbc:derby://localhost:1527/sun-appserv-samples;create=true;user=APP;password=APP';`.
- Créer la table `user_t` grâce à la commande
  `create table user_t(id int generated by default as identity, login varchar(255), passwd varchar(255));`.
- La base de donnée est prête.


Application cliente
-------------------


###Création du projet

- Sous Eclipse, créer un nouveau projet via
  *File > New > Project...* et sélectionner **Java Project**.
- Nommer le projet **EJBEntityClient**.
- Cliquer sur 'Next', puis dans l'onglet 'Projects', cliquer sur
  'Add...'.
- Sélectionner **EJBEntity**, puis cliquer sur 'OK'.
- Dans l'onglet 'Librarie', cliquer sur 'Add External Jar...'.
- Se rendre dans *path/to/GlassFish4*/glassfish/lib, sélectionner
  **appserv-rt.jar**, puis cliquer sur 'OK'.
- Cliquer sur 'Finish' et passer en perspective 'Java'.


###Création de la classe principale

- Sélectionner le projet puis créer une nouvelle classe **EJBEntityClient**
  via *Clic Droit > New > Class*
- Cliquer sur 'Finish'.
- Voici le contenu de la classe :

####EJBEntityClient.java
```java
import javax.naming.Context;
import javax.naming.InitialContext;

import com.jlg.tutorial.ejb.interfaces.UserBeanRemote;
import com.jlg.tutorial.entity.User;

public class EJBEntityClient {
	public static void main(String[] args) {
		try {
			Context c = new InitialContext();

			UserBeanRemote bean =
					(UserBeanRemote) c.lookup("java:global/EJBEntity/UserBean");

			bean.resetAll();
			bean.add(new User("Admin", "sup3r_Passw0rd"));
			bean.add(new User("SampleUser", "littlePass"));
			System.out.println(bean.list());
			bean.resetAll();
			System.out.println(bean.list());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}

```

###Test du client

```
nov. 06, 2014 12:12:59 PM com.sun.enterprise.v3.server.CommonClassLoaderServiceImpl findDerbyClient
INFO: Cannot find javadb client jar file, derby jdbc driver will not be available by default.
[User{login: Admin, password: sup3r_Passw0rd}, User{login: SampleUser, password: littlePass}]
[]
```