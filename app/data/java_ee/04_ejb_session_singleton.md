EJB > Session > Singleton
=========================

Un **Singleton** Session EJB est partagé entre tous les clients. C'est-à-dire
qu'il n'existe qu'une seule instance de cet EJB par serveur et qu'en plus elle
est synchronisée entre les différents serveurs d'un cluster.

Création du projet
------------------

Recréer les deux projets du
[chapitre précédent]({{url('/cours/java_ee/03_ejb_session_stateful')}}),
en remplaçant `Stateful` par `Singleton`, dans les noms de fichiers, classes et
projets, puis modifier les fichiers comme suit:

####SingletonSessionBean.java
```java
package com.jlg.tutorial.ejb;

import javax.ejb.Singleton;

import com.jlg.tutorial.ejb.interfaces.SingletonSessionBeanRemote;

@Singleton
public class SingletonSessionBean implements SingletonSessionBeanRemote {
	private static int counter = 0;
	private int id;
	private int a = 0;

	public SingletonSessionBean() {
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

####EJBSessionSingletonClient.java
```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import javax.naming.Context;
import javax.naming.InitialContext;

import com.jlg.tutorial.ejb.interfaces.SingletonSessionBeanRemote;

public class EJBSessionSingletonClient {
	public static void main(String[] args) {
		try {
			final Context ctx = new InitialContext();

			final String name;
			name = "java:global/EJBSessionSingleton/SingletonSessionBean";
			// JBoss WildFly: la référence JNDI de l'EJB est différente
			// name =
			// "ejb:/EJBSessionSingleton//SingletonSessionBean!com.jlg.tutorial.ejb.interfaces.SingletonSessionBeanRemote";

			class MyRunnable implements Runnable {
				public int tid;

				public MyRunnable(int i) {
					tid = i;
				}

				@Override
				public void run() {
					try {
						SingletonSessionBeanRemote bean = (SingletonSessionBeanRemote) ctx
								.lookup(name);

						for (int i = 0; i < 5; i++) {
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
`ejb:/EJBSessionSingleton//SingletonSessionBean!com.jlg.tutorial.ejb.interfaces.SingletonSessionBeanRemote`
</jboss>

Tester l'EJB Singleton
----------------------

Dans la View Eclipse 'Servers':

- Démarrer le serveur: sélectionner le serveur et *Clic droit > Start*.
- Déployer l'EJB sur le serveur:
	- sélectionner le serveur et *Clic droit > Add and Remove...*,
	- ajouter **EJBSessionSingleton**,
	- puis cliquer sur 'Finish'.
- Sélectionner **EJBSessionSingletonClient.java** et
  *Clic droit > Run As > Java Application*.

La console affiche:

```
oct. 31, 2014 4:02:51 PM com.sun.enterprise.v3.server.CommonClassLoaderServiceImpl findDerbyClient
INFO: Cannot find javadb client jar file, derby jdbc driver will not be available by default.
tid[2]: a=1, counter=1, id=1
tid[1]: a=2, counter=1, id=1
tid[2]: a=3, counter=1, id=1
tid[1]: a=4, counter=1, id=1
tid[2]: a=5, counter=1, id=1
tid[1]: a=6, counter=1, id=1
tid[2]: a=7, counter=1, id=1
tid[1]: a=8, counter=1, id=1
tid[2]: a=9, counter=1, id=1
tid[1]: a=10, counter=1, id=1
Finished
```

<jboss>
```
oct. 31, 2014 4:08:24 PM org.xnio.Xnio <clinit>
INFO: XNIO version 3.2.2.Final
oct. 31, 2014 4:08:24 PM org.xnio.nio.NioXnio <clinit>
INFO: XNIO NIO Implementation Version 3.2.2.Final
oct. 31, 2014 4:08:24 PM org.jboss.remoting3.EndpointImpl <clinit>
INFO: JBoss Remoting version (unknown)
oct. 31, 2014 4:08:24 PM org.jboss.ejb.client.EJBClient <clinit>
INFO: JBoss EJB Client version 2.0.1.Final
oct. 31, 2014 4:08:25 PM org.jboss.ejb.client.remoting.VersionReceiver handleMessage
INFO: EJBCLIENT000017: Received server version 2 and marshalling strategies [river]
oct. 31, 2014 4:08:25 PM org.jboss.ejb.client.remoting.RemotingConnectionEJBReceiver associate
INFO: EJBCLIENT000013: Successful version handshake completed for receiver context EJBReceiverContext{clientContext=org.jboss.ejb.client.EJBClientContext@23f23303, receiver=Remoting connection EJB receiver [connection=org.jboss.ejb.client.remoting.ConnectionPool$PooledConnection@71f31c64,channel=jboss.ejb,nodename=yannis-hp]} on channel Channel ID 82a916a5 (outbound) of Remoting connection 444421ab to localhost/127.0.0.1:8080
tid[1]: a=1, counter=1, id=1
tid[2]: a=2, counter=1, id=1
tid[2]: a=3, counter=1, id=1
tid[1]: a=4, counter=1, id=1
tid[2]: a=5, counter=1, id=1
tid[1]: a=6, counter=1, id=1
tid[2]: a=7, counter=1, id=1
tid[1]: a=8, counter=1, id=1
tid[2]: a=9, counter=1, id=1
tid[1]: a=10, counter=1, id=1
Finished
```
</jboss>

Relancer le client:
```
(...)
tid[2]: a=11, counter=1, id=1
tid[1]: a=12, counter=1, id=1
tid[1]: a=13, counter=1, id=1
tid[2]: a=14, counter=1, id=1
tid[2]: a=15, counter=1, id=1
tid[1]: a=16, counter=1, id=1
tid[2]: a=17, counter=1, id=1
tid[1]: a=18, counter=1, id=1
tid[2]: a=19, counter=1, id=1
tid[1]: a=20, counter=1, id=1
Finished
```

Les deux threads utilisent la même instance de l'EJB. L'état de l'instance de
l'EJB est maintenu entre chaque appel de la méthode `getMessage()`.

Même si le client est relancé, les résultats de `a` sont conservés.
En effet, ici la session n'est pas celle du client, mais celle du serveur.
Pour la détruire il faudra redémarrer le serveur ou redéployer l'EJB.