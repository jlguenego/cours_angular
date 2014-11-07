EJB Entity (JPA)
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
		<exclude-unlisted-classes>false</exclude-unlisted-classes>
		<properties/>
	</persistence-unit>
</persistence>
```

On utilise dans ce tutorial la base de donnée délivrée par défaut par
GlassFish : **Derby**.

<jboss>
Ce fichier ne change pas puisque la `<jta-data-source>` sera la même.
</jboss>

###Initialisation de la base de donnée

<glassfish>

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
</glassfish>

<jboss>

####Démarrage de la base de donnée

- Se rendre dans
  *path/to/WildFly*/modules/system/layers/base/com/h2database/h2/main, puis
  lancer, en double cliquant, **h2*.jar**.
- Dans la page web qui s'ouvre, remplir le formulaire comme suit :
	- **JDBC URL**: jdbc:h2:tcp://localhost/~/test
	- **User Name**: sa
	- **Password**: sa
- Cliquer sur 'Connect'.
- Dans le champ de texte, entrer la commande suivante :
  `create table user_t(id int auto_increment, login varchar(255), passwd varchar(255));`.
- Cliquer sur 'Run (Ctrl+Enter)'.


####Création de la datasource

- Sous Eclipse, dans la View **Servers**, sélectionner le serveur puis
  *Clic droit > Start*.
- Se rendre à l'adresse suivante
  [http://localhost:9990/console/App.html#datasources](http://localhost:9990/console/App.html#datasources).
  <warning> Si c'est la première connexion à la console, bien suivre les
  instructions pour créer un nouvel utilisateur avec le script
  *path/to/WildFly*/bin/**add-user.bat(.sh)**.
- Cliquer sur 'Add' et remplir le formulaire comme suit :
	- **Name**: MyDatasource
	- **JNDI Name**: java:/jdbc/__default
- Cliquer sur 'Next', et encore sur 'Next'.
- Remplir le formulaire comme suit :
	- **Connection URL**:
	  jdbc:h2:tcp://localhost/~/test;DB\_CLOSE\_DELAY=-1;DB\_CLOSE\_ON\_EXIT=FALSE
	- **Username**: sa
	- **Password**: sa
- Cliquer sur 'Test Connection' pour vérifier que tout se passe bien, puis sur
  'Done'.
- Sélectionner **MyDatasource**, puis cliquer sur 'Enable'.

</jboss>


###Déploiement de l'EJB
Dans la View Eclipse 'Servers':

- Démarrer le serveur: sélectionner le serveur et *Clic droit > Start*.
- Déployer l'EJB sur le serveur:
	- Sélectionner le serveur et *Clic droit > Add and Remove...*,
	- Ajouter **EJBEntity**,
	- Puis cliquer sur 'Finish'.

L'EJB est déployée. Elle est prête à traiter des requêtes clientes.

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
  <jboss>
  Se rendre dans *path/to/WildFly*/bin/client, sélectionner
  **jboss-client.jar**, puis cliquer sur 'OK'.
  </jboss>
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

			String name;
			name = "java:global/EJBEntity/UserBean";
			// JBoss WildFly: la référence JNDI de l'EJB est différente
			// name = "ejb:/EJBEntityWildFly//UserBean!com.jlg.tutorial.ejb.interfaces.UserBeanRemote";

			UserBeanRemote bean =
					(UserBeanRemote) c.lookup(name);

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

<jboss>

Veiller à bien mettre à jour le nom de l'EJB dans le code ci-dessus.

`ejb:/EJBEntityWildFly//UserBean!com.jlg.tutorial.ejb.interfaces.UserBeanRemote`



###Création des fichiers de configurations

Sélectionner le dossier **src** et créer deux nouveaux fichiers,
**jndi.properties** et **jboss-ejb-client.properties**,
via *Clic droit > New > File*.


####jndi.properties
```xml
java.naming.factory.url.pkgs=org.jboss.ejb.client.naming
```

####jboss-ejb-client.properties
```xml
remote.connectionprovider.create.options.org.xnio.Options.SSL_ENABLED=false
remote.connections=default
remote.connection.default.host=localhost
remote.connection.default.port = 8080
remote.connection.default.connect.options.org.xnio.Options.SASL_POLICY_NOANONYMOUS=false
```

</jboss>

###Test du client

```
nov. 06, 2014 12:12:59 PM com.sun.enterprise.v3.server.CommonClassLoaderServiceImpl findDerbyClient
INFO: Cannot find javadb client jar file, derby jdbc driver will not be available by default.
[User{login: Admin, password: sup3r_Passw0rd}, User{login: SampleUser, password: littlePass}]
[]
```
<jboss>
Seuls les messages de log changent.
```
nov. 06, 2014 2:00:26 PM org.xnio.Xnio <clinit>
INFO: XNIO version 3.2.2.Final
nov. 06, 2014 2:00:26 PM org.xnio.nio.NioXnio <clinit>
INFO: XNIO NIO Implementation Version 3.2.2.Final
nov. 06, 2014 2:00:26 PM org.jboss.remoting3.EndpointImpl <clinit>
INFO: JBoss Remoting version (unknown)
nov. 06, 2014 2:00:26 PM org.jboss.ejb.client.EJBClient <clinit>
INFO: JBoss EJB Client version 2.0.1.Final
nov. 06, 2014 2:00:27 PM org.jboss.ejb.client.remoting.VersionReceiver handleMessage
INFO: EJBCLIENT000017: Received server version 2 and marshalling strategies [river]
nov. 06, 2014 2:00:27 PM org.jboss.ejb.client.remoting.RemotingConnectionEJBReceiver associate
INFO: EJBCLIENT000013: Successful version handshake completed for receiver context EJBReceiverContext{clientContext=org.jboss.ejb.client.EJBClientContext@5db6fa62, receiver=Remoting connection EJB receiver [connection=org.jboss.ejb.client.remoting.ConnectionPool$PooledConnection@17f067ff,channel=jboss.ejb,nodename=yannis-hp]} on channel Channel ID a6e3a02c (outbound) of Remoting connection 5f175881 to localhost/127.0.0.1:8080
[User{login: Admin, password: sup3r_Passw0rd}, User{login: SampleUser, password: littlePass}]
[]
```
</jboss>