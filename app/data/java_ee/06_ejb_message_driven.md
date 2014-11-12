EJB Message Driven
==================

Configuration du serveur
------------------------

<jboss>

WildFly n'est, par défaut, pas confuguré pour utiliser la JMS.
Voici les étapes nécessaires pour l'activer.

- Se rendre dans *path/to/WildFly*/standalone/configuration.
- Renommer `standalone.xml` en `standalone.xml.bak`.
- Copier `standalone-full.xml` en `standalone.xml`.
</jboss>

###Création de la Queue

Sous Eclipse, dans la View **Servers**, démarrer le serveur via
*Clic droit > Start*.

<glassfish>

- Se rendre à cette address
  [http://localhost:4848/common/index.jsf](http://localhost:4848/common/index.jsf)
- Dans le menu de gauche, aller dans *JMS Ressource > Destination Ressource*,
  puis cliquer sur 'New...' dans la page qui apparait.
- Remplir le formulaire comme suit :
	- **JNDI Name**: jms/MyQueue
	- **Physical Destination Name**: MyMessageQueue
	- **Resource Type**: javax.jms.Queue
- Cliquer sur 'OK' pour finir
</glassfish>

<jboss>
</jboss>


###Création de la QueueFactory

Sous Eclipse, dans la View **Servers**, démarrer le serveur via
*Clic droit > Start*.

<glassfish>

- Se rendre à cette address
  [http://localhost:4848/common/index.jsf](http://localhost:4848/common/index.jsf)
- Dans le menu de gauche, aller dans *JMS Ressource > Connection Factories*,
  puis cliquer sur 'New...' dans la page qui apparait.
- Remplir le formulaire comme suit :
	- **JNDI Name**: jms/MyQueueFactory
	- **Resource Type**: javax.jms.QueueConnectionFactory
- Cliquer sur 'OK' pour finir
</glassfish>

<jboss>
</jboss>

EJB
---

###Création du projet EJB

- Sous Eclipse, créer un nouveau projet EJB via
  *File > New > Other... > EJB Project*.
- Nommer le projet **EJBMessageDriven**.
- Sélectionner la target runtime **GlassFish4**.
  <jboss>
  Sélectionner la target runtime **WildFly 8.x Runtime**.
  </jboss>
- Cliquer sur 'Finish' et passer en perspective 'Java EE'.


###Création de la classe Entity

- Créer une nouvelle classe via *New > Class*.
- Compléter le formulaire comme suit:
	- **Java package**: com.jlg.tutorial.entity
	- **Class name**: User
- Cliquer sur 'Finish'.

Voici son contenu :

####User.java
```java
package com.jlg.tutorial.entity;

import java.io.Serializable;

public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	private String login;
	private String pwd;

	public User(String login, String pwd) {
		this.login = login;
		this.pwd = pwd;
	}

	@Override
	public String toString() {
		return "User{ login: " + login + ", pwd: " + pwd + "}";
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

}

```

###Création de l'EJB Message Driven

- Créer un nouveau 'Message-Driven Bean' via *New > Message-Driven Bean (3.x)*.
- Compléter le formulaire comme suit:
	- **Java package**: com.jlg.tutorial.mdejb
	- **Class name**: MyMessageBean
	- **Destination type**: Queue
- Cliquer sur 'Finish'.

Voici son contenu :

####MyMessageBean.java
```java
package com.jlg.tutorial.mdejb;

import javax.annotation.Resource;
import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;
import javax.ejb.MessageDrivenContext;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.ObjectMessage;

import com.jlg.tutorial.entity.User;

@MessageDriven( mappedName="jms/MyQueue", name="MyMessageHandler",
		activationConfig = { @ActivationConfigProperty(
				propertyName = "destinationType", propertyValue = "javax.jms.Queue")
		})
public class MyMessageBean implements MessageListener {
	@Resource
	private MessageDrivenContext ctx;

    public MyMessageBean() {
    }

    public void onMessage(Message message) {
    	try {
    		ObjectMessage objMsg = (ObjectMessage) message;
    		User user = (User) objMsg.getObject();
			System.out.println("Message received: " + user);
		} catch (Exception e) {
			ctx.setRollbackOnly();
		}
    }

}

```

###Déploiement de l'EJB
Dans la View Eclipse 'Servers':

- Démarrer le serveur: sélectionner le serveur et *Clic droit > Start*.
- Déployer l'EJB sur le serveur:
	- Sélectionner le serveur et *Clic droit > Add and Remove...*,
	- Ajouter **EJBMessageDriven**,
	- Puis cliquer sur 'Finish'.

L'EJB est déployée.

Application cliente
-------------------


###Création du projet

- Sous Eclipse, créer un nouveau projet via
  *File > New > Project...* et sélectionner **Java Project**.
- Nommer le projet **EJBMessageDrivenClient**.
- Cliquer sur 'Next', puis dans l'onglet 'Projects', cliquer sur
  'Add...'.
- Sélectionner **EJBMessageDriven**, puis cliquer sur 'OK'.
- Dans l'onglet 'Librarie', cliquer sur 'Add External Jar...'.
- Se rendre dans *path/to/GlassFish4*/glassfish/lib, sélectionner
  **appserv-rt.jar**, puis cliquer sur 'OK'.
  <jboss>
  Se rendre dans *path/to/WildFly*/bin/client, sélectionner
  **jboss-client.jar**, puis cliquer sur 'OK'.
  </jboss>
- Cliquer sur 'Finish' et passer en perspective 'Java'.


###Création de la classe principale

- Sélectionner le projet puis créer une nouvelle classe **EJBMessageDrivenClient**
  via *Clic Droit > New > Class*
- Cliquer sur 'Finish'.
- Voici le contenu de la classe :

####EJBMessageDrivenClient.java
```java
import javax.jms.ObjectMessage;
import javax.jms.Queue;
import javax.jms.QueueConnection;
import javax.jms.QueueConnectionFactory;
import javax.jms.QueueSender;
import javax.jms.QueueSession;
import javax.naming.InitialContext;

import com.jlg.tutorial.entity.User;

public class EJBMessageDrivenClient {
	public static void main(String[] args) {
		try {
			InitialContext ctx = new InitialContext();

			Queue queue = (Queue) ctx.lookup("jms/MyQueue");
			QueueConnectionFactory factory =
					(QueueConnectionFactory) ctx.lookup("jms/MyQueueFactory");

			QueueConnection connection = factory.createQueueConnection();
			QueueSession session =
					connection.createQueueSession(false,
							QueueSession.AUTO_ACKNOWLEDGE);
			QueueSender sender = session.createSender(queue);

			User user = new User("Admin", "SuperPassword");
			ObjectMessage objectMessage = session.createObjectMessage(user);

			sender.send(objectMessage);
			System.out.println("User sent: " + user);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}

```

###Test du client

Sélectionner **EJBMessageDrivenClient.java** et
*Clic droit > Run As > Java Application*.

La console affiche:
```
nov. 12, 2014 4:27:50 PM com.sun.enterprise.v3.server.CommonClassLoaderServiceImpl findDerbyClient
INFO: Cannot find javadb client jar file, derby jdbc driver will not be available by default.
nov. 12, 2014 4:27:56 PM org.hibernate.validator.internal.util.Version <clinit>
INFO: HV000001: Hibernate Validator 5.0.0.Final
nov. 12, 2014 4:27:56 PM com.sun.messaging.jms.ra.ResourceAdapter start
INFO: MQJMSRA_RA1101: GlassFish MQ JMS Resource Adapter: Version:  5.1  (Build 9-b) Compile:  July 29 2014 1229
nov. 12, 2014 4:27:56 PM com.sun.messaging.jms.ra.ResourceAdapter start
INFO: MQJMSRA_RA1101: GlassFish MQ JMS Resource Adapter starting: broker is REMOTE, connection mode is TCP
nov. 12, 2014 4:27:56 PM com.sun.messaging.jms.ra.ResourceAdapter start
INFO: MQJMSRA_RA1101: GlassFish MQ JMS Resource Adapter Started:REMOTE
User sent: User{ login: Admin, pwd: SuperPassword}
```

<jboss>
```

```
</jboss>

La console du serveur affiche :
```
(...)
2014-11-12T16:22:07.788+0100|INFO: Message received: User{ login: Admin, pwd: SuperPassword}
```