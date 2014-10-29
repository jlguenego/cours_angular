Prérequis
=========

Téléchargement
--------------
Télécharger et extraire les archives suivantes:

- **Eclipse IDE for Java EE Developers**:
[https://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/lunasr1](https://www.eclipse.org/downloads/packages/eclipse-ide-java-ee-developers/lunasr1)

- **JBoss AS 7.1.1.Final**:
[http://jbossas.jboss.org/downloads.html](http://jbossas.jboss.org/downloads.html)

- **Java Platform, Enterprise Edition 7 SDK Update 1**:
[http://www.oracle.com/technetwork/java/javaee/downloads/java-ee-sdk-7-downloads-1956236.html](http://www.oracle.com/technetwork/java/javaee/downloads/java-ee-sdk-7-downloads-1956236.html)

- **Glassfish**: GlassFish est en fait contenu dans *Java Platform, Enterprise Edition 7 SDK Update 1*.

Préparer JBoss
--------------
1. Dans Eclipse, aller dans *Help > Install New Software...*
2. Cliquer sur 'Add' et spécifier ce qui suis, puis valider:
	- **Name**: JBoss
	- **Location**: http://download.jboss.org/jbosstools/updates/stable/luna/
3. Sélectionner **JBossAS Tools**, cliquer sur 'Next'.
4. À la fin de l'installation, redémarrer.
5. Aller dans *File > New > Other...*, et sélectionner 'Server'.
6. Sélectionner **JBoss AS 7.1**.
7. Remplir comme suis et cliquer sur 'Next':
	- **The server is**: Local
	- **Controlled by**: Filesystem and shell operations
	- Menu déroulant: Create a new runtime
8. Remplir comme suis et cliquer sur 'Finish':
	- **Home Directory**: path/to/JBoss


Préparer GlassFish
------------------
1. Dans Eclipse, aller dans *Help > Eclipse Marketplace...*
2. Rechercher et télécharger **GlassFish Tools for Luna**.
3. Confirmer.
4. À la fin de l'installation, redémarrer.
5. Aller dans *File > New > Other...*, et sélectionner 'Server'.
6. Sélectionner **GlassFish 4**.
7. Pour le champ **Server runtime environnement**, cliquer sur 'Add...'
8. Remplir comme suis et cliquer sur 'Finish':
	- **Name**: GlassFish 4
	- **Server root**: path/to/GlassFish4/glassfish
	- **Java Development Kit**: jdk1.7.x_xx
8. Cliquer sur 'Next', puis 'Finish'.