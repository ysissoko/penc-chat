# penc-chat
Messagerie entre client et vendeur de l'application Penc

# Schema d'architecture backend
![penc-backend-architecture drawio](https://user-images.githubusercontent.com/9282769/216768687-370c582f-4904-465b-80ce-efbb4ca997c0.png)

Un microservice sera développé afin de permettre aux clients de communiquer avec les vendeurs via un chat. Le backend aura les fonctionnalités suivantes:
- Possibilité de recevoir des évènements via web socket à chaque fois qu'il y a un nouveau message
- Enregistrement des conversations dans une base de données mongodb (création de 2 schema mongoose Conversation et messages)
- Possibilité de récupérer les conversations d'un utilisateur via un web service
- Possibilité de récupérer les messages d'un utilisateur via un web service

# Persistence des conversations (messages)

Les messages seront enregistrés dans une base de données mongodb afin de pouvoir consulter les messages envoyés à tout moment.

## Schema du modèle Conversation

```
interface Conversation {
  date: Date
  participantsUid: string[]
  messages: Message[]
}
```

```
interface Message {
  date: Date
  senderUid: string
  text: string
}
```
  
## Evènement message

Le client (front-end) envera un évènement via web socket à chaque nouveau message. L'évènement sera structuré de la manière suivante:

```
interface MessageEvent {
  conversationId: string
  senderUid?: string
  text: string
}
```
  
l'identifiant du sender sera récupéré dans le token JWT
L'évènement sera envoyé sur le channel suivant "message"
  
# Web services

## Récupération des messages d'une conversation

`` GET /conversation/:id/messages ``

id: identifiant de la conversation

## Récupération des conversations d'un utilisateur

`` GET /users/:uid/conversations ``

uid: identifiant de l'utilisateur Firebase
