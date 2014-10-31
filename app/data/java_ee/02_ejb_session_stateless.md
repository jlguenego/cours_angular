EJB > Session > Stateless
=========================

Un **Session EJB** est un EJB propre à une session.

Un **Stateless** Session EJB est potentiellement partagé entre les clients,
mais n'est pas synchronisé sur les différents serveurs d'un cluster.
Il n'est donc pas utilisé pour fonctionner avec des données propres à son
instance.

EJB
---

Cet EJB est sensiblement le même que celui du
[Hello World]({{url('/cours/java_ee/01_ejb_hello_world#ejb')}}).
Refaire simplement cette partie du tutoriel, sans le déploiement,
et en remplaçant `HelloWorld` par `SessionStateless`,
dans les noms de fichiers, classes et projets.

Une partie du code à été modifié pour mettre en éxerge certaine particularités
du **Stateless** Session EJB:

####HelloWorldBean.java
```java
package com.jlg.tutorial.ejb;

import javax.ejb.Stateless;

import com.jlg.tutorial.ejb.interfaces.StatelessSessionBeanRemote;

@Stateless
public class StatelessSessionBean implements StatelessSessionBeanRemote {
	private static int counter = 0;
	private int id;
	private int a = 0;

	public StatelessSessionBean() {
		counter++;
		id = counter;
	}

	@Override
	public String getMessage() {
		try {
			a = 0;
			Thread.sleep(5000);
			a = 1;
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return "a=" + a + ", counter=" + counter + ", id=" + id;
	}

}

```

Déployer ensuite l'EJB comme expliqué
[ici]({{url('/cours/java_ee/01_ejb_hello_world#dploiementejb')}})



Application cliente
-------------------

Il s'agit sensiblement de la même application cliente que celle du
[Hello World]({{url('/cours/java_ee/01_ejb_hello_world#applicationcliente')}}).
Refaire simplement cette partie du tutoriel, sans l'exécution du client,
et en remplaçant `HelloWorld` par `SessionStateless`,
dans les noms de fichiers, classes et projets.

Une partie du code à été modifié afin de supporter une entrée utilisateur:
####EJBHelloWorldClient.java
```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import javax.naming.Context;
import javax.naming.InitialContext;

import com.jlg.tutorial.ejb.interfaces.StatelessSessionBeanRemote;

public class EJBSessionStatelessClient {
	public static void main(String[] args) {
		try {
			int delay = 7000;
			if (args.length >= 1) {
				delay = new Integer(args[0]) * 1000;
			}
			System.out.println("delay=" + delay);
			Context ctx = new InitialContext();

			String name;
			name = "java:global/EJBSessionStateless/StatelessSessionBean";
			// JBoss WildFly: la référence JNDI de l'EJB est différente
			// name = "ejb:/EJBSessionStateless//StatelessSessionBean!com.jlg.tutorial.ejb.interfaces.StatelessSessionBeanRemote";

			final StatelessSessionBeanRemote bean = (StatelessSessionBeanRemote) ctx
					.lookup(name);

			class MyRunnable implements Runnable {
				public int tid;

				public MyRunnable(int i) {
					tid = i;
				}

				@Override
				public void run() {
					System.out.println("tid[" + tid + "]: Calling bean.");
					System.out
							.println("tid[" + tid + "]: " + bean.getMessage());
				}
			}

			ExecutorService es = Executors.newCachedThreadPool();

			es.execute(new MyRunnable(1));
			Thread.sleep(delay);
			es.execute(new MyRunnable(2));

			es.shutdown();
			if (es.awaitTermination(1, TimeUnit.MINUTES)) {
				System.out.println("Finished");
			} else {
				System.out.println("Finished with timeout.");
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}

```
<jboss>

Veiller à bien mettre à jour le nom de l'EJB dans le code ci-dessus.
`ejb:/EJBSessionStateless//StatelessSessionBean!com.jlg.tutorial.ejb.interfaces.StatelessSessionBeanRemote`
</jboss>

Tester l'EJB Stateless
----------------------

###Exporter l'application cliente en JAR

- Depuis Eclipse, sélectionner le projet `EJBSessionStatelessClient`
  et *Clic droit > Export...*
- Sélectionner 'Runnable JAR file', puis cliquer sur 'Next'
- Sélectionner **EJBSessionStatelessClient - EJBSessionStatelessClient**
- Choisir une destination, en nommant le fichier
  **EJBSessionStatelessClient.jar**,
  puis cliquer sur 'Finish'

###Fonctionnement de l'application

L'application se connecte à l'EJB `StatelessSessionBean` puis lance deux
threads, chaque thread appelle la méthode `getMessage()` de l'EJB.

La méthode `getMessage()` de l'EJB met `a=0`, puis dort 5 secondes, met `a=1`,
puis dort à nouveau 5 secondes, et finalement renvoie une description de son
état.

Il est pertinent d'exécuter l'application deux fois:

- la première fois sans recouvrement, c'est-à-dire l'exécution des deux threads
  ne se recouvre pas.
- la deuxième fois, avec recouvrement. Les deux threads sont appellés
  successivement avec un espacement dans le temps suffisement réduit pour que
  le deuxième démarre alors que le premier n'a pas encore fini son exécution.

Lorsque le premier thread finit, quelle sera la valeur de `a` ?

- si la même instance de l'EJB est utilisée, alors `a=0`,
  car le dernier à modifier `a` est le thread 2.
- si ce n'est pas la même instance de l'EJB qui est utilisée, alors `a=1`,

La spécification Java EE sur les EJB Stateless indique qu'à partir du moment
où une méthode de l'EJB est appelée, le serveur d'application garantit
l'état des variables d'instance, mais seulement pour la durée d'exécution de
la méthode.

On devrait donc en principe avoir `a=1` quel que soit le test.

Plusieurs attributs sont loggés:

- **tid**: représente l'id du thread qui produit le message.
- **a**: c'est un attribut privé du bean. À l'appel de la méthode `getMessage()`
  elle est mise à `0`, 5 secondes plus tard elle est mise à `1`,
  et encore 5 secondes après elle est renvoyée dans le message.
- **counter**: c'est un attribut static du bean qui compte le nombre
  d'instanciation de celui-ci.
- **id**: c'est un attribut privé du bean indiquant le numéro d'instance du bean
  actuel.


###Appels successifs sans recouvrement

![timeline](data/java_ee/image/timeline.png)

- Ouvrir une console et se rendre dans le répertoire où se trouve le client.
- Saisir la commande suivante: `java -jar EJBSessionStatelessClient.jar 12`

La console affiche:
```
oct. 31, 2014 10:46:35 AM com.sun.enterprise.v3.server.CommonClassLoaderServiceImpl findDerbyClient
INFO: Cannot find javadb client jar file, derby jdbc driver will not be available by default.
delay=12000
tid[1]: Calling bean.
tid[1]: a=1, counter=1, id=1
tid[2]: Calling bean.
tid[2]: a=1, counter=1, id=1
Finished
```
<jboss>

```
delay=12000
oct. 31, 2014 10:57:34 AM org.xnio.Xnio <clinit>
INFO: XNIO version 3.2.2.Final
oct. 31, 2014 10:57:35 AM org.xnio.nio.NioXnio <clinit>
INFO: XNIO NIO Implementation Version 3.2.2.Final
oct. 31, 2014 10:57:35 AM org.jboss.remoting3.EndpointImpl <clinit>
INFO: JBoss Remoting version (unknown)
oct. 31, 2014 10:57:35 AM org.jboss.ejb.client.EJBClient <clinit>
INFO: JBoss EJB Client version 2.0.1.Final
tid[1]: Calling bean.
oct. 31, 2014 10:57:36 AM org.jboss.ejb.client.remoting.VersionReceiver handleMessage
INFO: EJBCLIENT000017: Received server version 2 and marshalling strategies [river]
oct. 31, 2014 10:57:36 AM org.jboss.ejb.client.remoting.RemotingConnectionEJBReceiver associate
INFO: EJBCLIENT000013: Successful version handshake completed for receiver context EJBReceiverContext{clientContext=org.jboss.ejb.client.EJBClientContext@c2cef3, receiver=Remoting connection EJB receiver [connection=org.jboss.ejb.client.remoting.ConnectionPool$PooledConnection@1a0d6c9,channel=jboss.ejb,nodename=yannis-hp]} on channel Channel ID e27279be (outbound) of Remoting connection 00300ca7 to localhost/127.0.0.1:8080
tid[1]: a=1, counter=1, id=1
tid[2]: Calling bean.
tid[2]: a=1, counter=2, id=2
Finished
```
</jboss>

- `a` est renvoyé tel que prévu, `a=1`,
- `counter` indique qu'il n'y a eu qu'une seule instance du bean, `counter=1`,
- ce qui est confirmé par `id` qui est identique aux deux appels, `id=1`.

<jboss>
En revanche ici la stratégie est autre, puisque chaque client obtient une
nouvelle instance du bean.
</jboss>


###Appels successifs avec recouvrement

![timeline_concurent](data/java_ee/image/timeline_concurent.png)

Saisir maintenant la commande suivante:
`java -jar EJBSessionStatelessClient.jar`

La console affiche:
```
oct. 31, 2014 10:48:32 AM com.sun.enterprise.v3.server.CommonClassLoaderServiceImpl findDerbyClient
INFO: Cannot find javadb client jar file, derby jdbc driver will not be available by default.
delay=7000
tid[1]: Calling bean.
tid[2]: Calling bean.
tid[1]: a=1, counter=2, id=1
tid[2]: a=1, counter=2, id=2
Finished
```
<jboss>

```
delay=7000
oct. 31, 2014 10:59:40 AM org.xnio.Xnio <clinit>
INFO: XNIO version 3.2.2.Final
oct. 31, 2014 10:59:41 AM org.xnio.nio.NioXnio <clinit>
INFO: XNIO NIO Implementation Version 3.2.2.Final
oct. 31, 2014 10:59:41 AM org.jboss.remoting3.EndpointImpl <clinit>
INFO: JBoss Remoting version (unknown)
oct. 31, 2014 10:59:41 AM org.jboss.ejb.client.EJBClient <clinit>
INFO: JBoss EJB Client version 2.0.1.Final
tid[1]: Calling bean.
oct. 31, 2014 10:59:42 AM org.jboss.ejb.client.remoting.VersionReceiver handleMessage
INFO: EJBCLIENT000017: Received server version 2 and marshalling strategies [river]
oct. 31, 2014 10:59:42 AM org.jboss.ejb.client.remoting.RemotingConnectionEJBReceiver associate
INFO: EJBCLIENT000013: Successful version handshake completed for receiver context EJBReceiverContext{clientContext=org.jboss.ejb.client.EJBClientContext@1a0d6c9, receiver=Remoting connection EJB receiver [connection=org.jboss.ejb.client.remoting.ConnectionPool$PooledConnection@754ffd,channel=jboss.ejb,nodename=yannis-hp]} on channel Channel ID 80da80fd (outbound) of Remoting connection 008ec3bc to localhost/127.0.0.1:8080
tid[2]: Calling bean.
tid[1]: a=1, counter=4, id=3
tid[2]: a=1, counter=4, id=4
Finished
```
</jboss>

- `a` est renvoyé tel que prévu, `a=1`,
- `counter` indique qu'il y a eu deux instances du bean, `counter=2`,
- ce qui est confirmé par `id` qui est différent aux deux appels, `id=1` et
  `id=2`.