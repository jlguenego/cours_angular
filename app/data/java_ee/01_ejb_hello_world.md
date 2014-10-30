EJB > Hello World
===============

Ce tutorial présente un EJB 'Hello World' dont l'architecture est comme suit:

![architecture 'Hello World'](data/java_ee/image/hello_world.png)

Un serveur d'application compatible Java EE (appelé auparavant J2EE) est muni
de deux *containers* :

- un **Web container**: il contient des **web applications**,
qui sont des ensembles de Servlets, JSP et JSF (Facelets).
- un **EJB container**: il contient des **modules EJB**.

Un module EJB est une application répondant à des solicitations d'applications clientes.

Une application cliente peut être une application standalone ou une web application.
Le 'Hello World' suivant utilise une application standalone.



EJB
---
L'EJB 'Hello World' est un *Stateless Session EJB*. Ce type d'EJB est celui de base,
sans propriété garantie particulière.

###Création du projet EJB
Sous Eclipse, créer un nouveau projet EJB via *File > New > Other... > EJB Project*.
Nommer le projet `EJBHelloWorld`.

Sélectionner la target runtime **GlassFish4**.

<jboss>
Sélectionner la target runtime **WildFly 8.x Runtime**.
</jboss>

Cliquer sur 'Finish' et passer en perspective 'Java EE'.

###Création des fichiers Beans
Créer un nouveau 'Session Bean' via *New > Session Bean (3.x)*.
Compléter comme suit:

- **Java package**: com.jlg.tutorial.ejb
- **Class name**: HelloWorldBean
- **State type**: Stateless
- **Remote**: (coché) com.jlg.tutorial.ejb.interfaces.HelloWorldBeanRemote
- **Local**: (décoché)
- **No-interface View**: (décoché)
Cliquer sur 'Finish'.

Deux fichiers sont créés: le Bean et son interface.

####HelloWorldBeanRemote.java
```java
package com.jlg.tutorial.ejb.interfaces;

import javax.ejb.Remote;

@Remote
public interface HelloWorldBeanRemote {
	String getMessage();
}

```

####HelloWorldBean.java
```java
package com.jlg.tutorial.ejb;

import javax.ejb.Stateless;

import com.jlg.tutorial.ejb.interfaces.HelloWorldBeanRemote;

@Stateless
public class HelloWorldBean implements HelloWorldBeanRemote {

	@Override
	public String getMessage() {
		return "Hello World!";
	}

}

```

Dans la View Eclipse 'Servers':

- démarrer le serveur: sélectionner le serveur et *Clic droit > Start*.
- déployer l'EJB sur le serveur:
	- sélectionner le serveur et *Clic droit > Add and Remove...*,
	- ajouter **EJBHelloWorld**,
	- puis cliquer sur 'Finish'.

L'EJB est déployée. Elle est prête à traiter des requêtes clientes.


Application cliente
-------------------

L'application cliente 'Hello World' est un simple projet Java.

###Création du projet
Sous Eclipse, créer un nouveau projet Java via *File > New > Other... > Java Project*.
Nommer le projet `EJBHelloWorldClient`.
Cliquer sur 'Finish' et passer en perspective 'Java'.

###Configuration du projet
Sélectionner le projet, puis *Clic droit > Build Path > Configure Build Path...*.

- Dans l'onglet **Libraries**, cliquer sur 'Add External Jars...'.
- Sélectionner le jar se situant *path/to/GlassFish4*/glassfish/lib/appserv-rt.jar
<jboss>
Sélectionner le jar se situant *path/to/WildFly*/bin/client/jboss-client.jar
</jboss>
- Dans l'onglet **Projects**, cliquer sur 'Add...'.
- Cocher **EJBHelloWorld**, puis cliquer sur 'OK'.

Cliquer sur 'OK' pour terminer la configuration.

###Création des fichiers
Sélectionner le projet, puis *Clic droit > New > Class*.
Nommer cette classe **EJBHelloWorldClient**. Voici son contenu:

```javaimport javax.naming.Context;
import javax.naming.Context;
import javax.naming.InitialContext;

import com.jlg.tutorial.ejb.interfaces.HelloWorldBeanRemote;


public class EJBHelloWorldClient {
	public static void main(String[] args) {
		try {
			Context ctx = new InitialContext();

			String name;
			name = "java:global/EJBHelloWorld/HelloWorldBean";
			// JBoss WildFly: la référence JNDI de l'EJB est différente
			// name = "ejb:/EJBHelloWorld//HelloWorldBean!com.jlg.tutorial.ejb.interfaces.HelloWorldBeanRemote";

			HelloWorldBeanRemote bean = (HelloWorldBeanRemote) ctx.lookup(name);

			System.out.println(bean.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}

```
<jboss>

Veiller à bien mettre à jour le nom de l'EJB dans le code ci-dessus.
`ejb:/EJBHelloWorld//HelloWorldBean!com.jlg.tutorial.ejb.interfaces.HelloWorldBeanRemote`
</jboss>

Le client crée un nouveaux contexte, avec des paramètres par défaut,
et l'utilise pour se connecter au serveur et obtenir le répertoire **JNDI**.

La méthode ```lookup``` permet de rechercher une ressource via son nom JNDI.
Depuis EJB 3.1, il existe une [convention de nommage](http://docs.oracle.com/cd/E19798-01/821-1841/girgn/index.html).


<jboss>

Sélectionner le dossier **src** et *Clic droit > New... > File*.
Nommer le fichier `jboss-ejb-client.properties` et y mettre:
```ini
remote.connectionprovider.create.options.org.xnio.Options.SSL_ENABLED=false
remote.connections=default
remote.connection.default.host=localhost
remote.connection.default.port=8080
remote.connection.default.connect.options.org.xnio.Options.SASL_POLICY_NOANONYMOUS=false
```

Sélectionner le dossier **src** et *Clic droit > New... > File*.
Nommer le fichier `jndi.properties` et y mettre:
```ini
java.naming.factory.url.pkgs=org.jboss.ejb.client.naming
java.naming.factory.initial=org.jboss.naming.remote.client.InitialContextFactory
java.naming.provider.url=http-remoting://localhost:8080
```

</jboss>

###Exécution du client

####Dans Eclipse
Sélectionner **EJBHelloWorldClient.java** et *Clic droit > Run As > Java Application*.

La console affiche ceci:
```
oct. 30, 2014 12:05:33 PM com.sun.enterprise.v3.server.CommonClassLoaderServiceImpl findDerbyClient
INFO: Cannot find javadb client jar file, derby jdbc driver will not be available by default.
Hello World!
```

####Sans Eclipse
- Depuis Eclipse, sélectionner le projet `EJBHelloWorldClient` et *Clic droit > Export...*
- Sélectionner 'Runnable JAR file', puis cliquer sur 'Next'
- Sélectionner **EJBHelloWorldClient - EJBHelloWorldClient**
- Choisir une destination, en nommant le fichier **EJBHelloWorldClient.jar**,
  puis cliquer sur 'Finish'
- Ouvrir une console et se rendre dans le répertoire où se trouve le client.
- Taper la commande suivante: ```java -jar EJBHelloWorldClient.jar```
- La console affiche ceci:
```
oct. 30, 2014 12:05:33 PM com.sun.enterprise.v3.server.CommonClassLoaderServiceImpl findDerbyClient
INFO: Cannot find javadb client jar file, derby jdbc driver will not be available by default.
Hello World!
```

<jboss>
```
oct. 30, 2014 4:26:41 PM org.xnio.Xnio <clinit>
INFO: XNIO version 3.2.2.Final
oct. 30, 2014 4:26:41 PM org.xnio.nio.NioXnio <clinit>
INFO: XNIO NIO Implementation Version 3.2.2.Final
oct. 30, 2014 4:26:41 PM org.jboss.remoting3.EndpointImpl <clinit>
INFO: JBoss Remoting version (unknown)
oct. 30, 2014 4:26:41 PM org.jboss.ejb.client.EJBClient <clinit>
INFO: JBoss EJB Client version 2.0.1.Final
oct. 30, 2014 4:26:42 PM org.jboss.ejb.client.remoting.VersionReceiver handleMessage
INFO: EJBCLIENT000017: Received server version 2 and marshalling strategies [river]
oct. 30, 2014 4:26:42 PM org.jboss.ejb.client.remoting.RemotingConnectionEJBReceiver associate
INFO: EJBCLIENT000013: Successful version handshake completed for receiver context EJBReceiverContext{clientContext=org.jboss.ejb.client.EJBClientContext@1cdf021, receiver=Remoting connection EJB receiver [connection=org.jboss.ejb.client.remoting.ConnectionPool$PooledConnection@15041ec,channel=jboss.ejb,nodename=yannis-hp]} on channel Channel ID c6c7a90a (outbound) of Remoting connection 01775dde to localhost/127.0.0.1:8080
Hello World!
```
</jboss>