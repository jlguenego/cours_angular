EJB Message Driven
==================

EJB
---
###Création de la Queue
- Sous Eclipse, dans la View **Servers**, démarrer le serveur via 
  *Clic droit > Start*
  
<glassfish>
</glassfish>

###Création du projet EJB

- Sous Eclipse, créer un nouveau projet EJB via
  *File > New > Other... > EJB Project*. Nommer le projet `EJBMessageDriven`.
- Sélectionner la target runtime **GlassFish4**.
  <jboss>
  Sélectionner la target runtime **WildFly 8.x Runtime**.
  </jboss>
- Cliquer sur 'Finish' et passer en perspective 'Java EE'.


###Création de l'EJB Message Driven

- Créer un nouveau 'Message-Driven Bean' via *New > Message-Driven Bean (3.x)*.
- Compléter le formulaire comme suit:
	- **Java package**: com.jlg.tutorial.mdejb
	- **Class name**: MyMessageBean
	- **Destination type**: Queue
- Cliquer sur 'Finish'.

Voici son contenu : 
'''java
package com.jlg.tutorial.mdejb;

import javax.annotation.Resource;
import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;
import javax.ejb.MessageDrivenContext;
import javax.jms.Message;
import javax.jms.MessageListener;
import javax.jms.ObjectMessage;

import com.jlg.tutorial.entity.User;

@MessageDriven( mappedName="jms/TestQueue", name="MyMessageHandler",
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

'''

Faire imprimer dans les logs + Objet sérialisable.

###Création de la Queue

###Création de la QueueFactory