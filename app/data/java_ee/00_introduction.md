Introduction
============

Téléchargement
--------------
Télécharger et extraire/installer les produits suivants:

- **Java SE Development Kit 7u71**:
[http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html](http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html)

- **Eclipse IDE for Java EE Developers**:
[https://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/lunasr1](https://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/lunasr1)

- **WildFly 8.1.0.Final**:
[http://wildfly.org/downloads/](http://wildfly.org/downloads/)

- **Java Platform, Enterprise Edition 7 SDK Update 1**:
[http://www.oracle.com/technetwork/java/javaee/downloads/java-ee-sdk-7-downloads-1956236.html](http://www.oracle.com/technetwork/java/javaee/downloads/java-ee-sdk-7-downloads-1956236.html)

- **Glassfish**: GlassFish est en fait contenu dans *Java Platform, Enterprise Edition 7 SDK Update 1*.


Préparer GlassFish pour Eclipse
-------------------------------
3. À la fin de l'installation, redémarrer Eclipse.
4. Aller dans *File > New > Other...*, et sélectionner 'Server'.
5. Sélectionner **GlassFish 4**.
6. Au niveau du champ **Server runtime environnement**, cliquer sur 'Add...'
7. Remplir le formulaire comme suit:
	- **Name**: GlassFish 4
	- **Server root**: *path/to/GlassFish4*/glassfish
	- **Java Development Kit**: jdk1.7.x_xx
8. Cliquer sur 'Finish'
9. Cliquer sur 'Next', puis 'Finish'.


Préparer JBoss WildFly pour Eclipse
-----------------------------------
1. Dans Eclipse, aller dans *Help > Eclipse Marketplace...*
2. Rechercher et télécharger **JBoss Tools for Luna**.
4. À la fin de l'installation, redémarrer Eclipse.
6. Aller dans *File > New > Other...*, et sélectionner 'Server'.
7. Sélectionner **WildFly 8.x**, puis cliquer sur 'Next'.
8. Remplir le formulaire comme suit:
	- **The server is**: Local
	- **Controlled by**: Filesystem and shell operations
	- Menu déroulant: Create a new runtime
9. Cliquer sur 'Next'.
10. Remplir le formulaire comme suit:
	- **Home Directory**: *path/to/WildFly*
	- **Runtime JRE**: (sélectioner **Alternate JRE**) jdk1.7.x_xx
11. Cliquer sur 'Finish'.


Note
----
Ce tutorial est réalisé avec GlassFish.
Lorsque des particularités à JBoss WildFly se présentent, elles sont indiquées.
