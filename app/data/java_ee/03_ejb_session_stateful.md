EJB > Session > Stateful
=========================

Un **Stateful** Session EJB est propre à chaque client et son état est garantie
pour toute la durée de vie de la session, y comprit entre les appels successifs
de méthodes.

Création du projet
------------------

Recréer les deux projets du
[chapitre précédent]({{url('/cours/java_ee/02_ejb_session_stateless')}}),
en remplaçant `Stateless` par `Stateful`, dans le noms de fichiers, classes et
projets, puis modifier les fichiers comme suit:

####StatefulSessionBean.java
```java
package com.jlg.tutorial.ejb;

import javax.ejb.Stateful;

import com.jlg.tutorial.ejb.interfaces.StatefulSessionBeanRemote;

@Stateful
public class StatefulSessionBean implements StatefulSessionBeanRemote {
	private static int counter = 0;
	private int id;
	private int a = 0;

	public StatefulSessionBean() {
		counter++;
		id = counter;
	}

	@Override
	public String getMessage() {
		a++;
		return "a=" + a + ", counter=" + counter + ", id=" + id;
	}

}

```

####StatefulSessionBean.java
```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import javax.naming.Context;
import javax.naming.InitialContext;

import com.jlg.tutorial.ejb.interfaces.StatefulSessionBeanRemote;

public class EJBSessionStatefulClient {
	public static void main(String[] args) {
		try {
			final Context ctx = new InitialContext();

			final String name;
			name = "java:global/EJBSessionStateful/StatefulSessionBean";
			// JBoss WildFly: la référence JNDI de l'EJB est différente
			// name =
			// "ejb:/EJBSessionStateful//StatefulSessionBean!com.jlg.tutorial.ejb.interfaces.StatefulSessionBeanRemote?stateful";

			class MyRunnable implements Runnable {
				public int tid;

				public MyRunnable(int i) {
					tid = i;
				}

				@Override
				public void run() {
					try {
						StatefulSessionBeanRemote bean = (StatefulSessionBeanRemote) ctx
								.lookup(name);

						for (int i = 0; i < 10; i++) {
							System.out.println("tid[" + tid + "]: "
									+ bean.getMessage());
							Thread.sleep(1000);
						}
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}

			ExecutorService es = Executors.newCachedThreadPool();

			es.execute(new MyRunnable(1));
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
`ejb:/EJBSessionStateful//StatefulSessionBean!com.jlg.tutorial.ejb.interfaces.StatefulSessionBeanRemote?stateful`

<warning/> **Bien noter la présence de `?stateful` à la fin**

</jboss>

Tester l'EJB Stateful
---------------------

Dans la View Eclipse 'Servers':

- Démarrer le serveur: sélectionner le serveur et *Clic droit > Start*.
- Déployer l'EJB sur le serveur:
	- sélectionner le serveur et *Clic droit > Add and Remove...*,
	- ajouter **EJBSessionStateful**,
	- puis cliquer sur 'Finish'.
- Sélectionner **EJBSessionStatefulClient.java** et
  *Clic droit > Run As > Java Application*.

La console affiche:

```
oct. 31, 2014 2:36:10 PM com.sun.enterprise.v3.server.CommonClassLoaderServiceImpl findDerbyClient
INFO: Cannot find javadb client jar file, derby jdbc driver will not be available by default.
tid[2]: a=1, counter=2, id=1
tid[1]: a=1, counter=2, id=2
tid[2]: a=2, counter=2, id=1
tid[1]: a=2, counter=2, id=2
tid[1]: a=3, counter=2, id=2
tid[2]: a=3, counter=2, id=1
tid[2]: a=4, counter=2, id=1
tid[1]: a=4, counter=2, id=2
tid[2]: a=5, counter=2, id=1
tid[1]: a=5, counter=2, id=2
Finished
```

<jboss>
```
oct. 31, 2014 2:54:03 PM org.xnio.Xnio <clinit>
INFO: XNIO version 3.2.2.Final
oct. 31, 2014 2:54:04 PM org.xnio.nio.NioXnio <clinit>
INFO: XNIO NIO Implementation Version 3.2.2.Final
oct. 31, 2014 2:54:04 PM org.jboss.remoting3.EndpointImpl <clinit>
INFO: JBoss Remoting version (unknown)
oct. 31, 2014 2:54:04 PM org.jboss.ejb.client.EJBClient <clinit>
INFO: JBoss EJB Client version 2.0.1.Final
oct. 31, 2014 2:54:04 PM org.jboss.ejb.client.remoting.VersionReceiver handleMessage
INFO: EJBCLIENT000017: Received server version 2 and marshalling strategies [river]
oct. 31, 2014 2:54:04 PM org.jboss.ejb.client.remoting.RemotingConnectionEJBReceiver associate
INFO: EJBCLIENT000013: Successful version handshake completed for receiver context EJBReceiverContext{clientContext=org.jboss.ejb.client.EJBClientContext@7377e4b0, receiver=Remoting connection EJB receiver [connection=org.jboss.ejb.client.remoting.ConnectionPool$PooledConnection@44471a09,channel=jboss.ejb,nodename=yannis-hp]} on channel Channel ID dbef2e1d (outbound) of Remoting connection 0c36c8e6 to localhost/127.0.0.1:8080
tid[2]: a=1, counter=2, id=2
tid[1]: a=1, counter=2, id=1
tid[1]: a=2, counter=2, id=1
tid[2]: a=2, counter=2, id=2
tid[1]: a=3, counter=2, id=1
tid[2]: a=3, counter=2, id=2
tid[1]: a=4, counter=2, id=1
tid[2]: a=4, counter=2, id=2
tid[1]: a=5, counter=2, id=1
tid[2]: a=5, counter=2, id=2
Finished
```
</jboss>

Chaque thread possède sa propre instance de l'EJB. L'état de l'instance de l'EJB
est maintenu entre chaque appel de la méthode `getMessage()`.

Mais si le client est relancé, la console affiche les mêmes résultats pour la
variable `a`. En effet, une fois que le client se déconnecte du serveur, la
session associée est détruite, et donc l'instance correspondante de l'EJB aussi.