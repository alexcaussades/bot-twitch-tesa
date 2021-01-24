# TESA BOT TWITCH 

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/alexcaussades/bot-twitch-tesa)
![David](https://img.shields.io/david/alexcaussades/bot-twitch-tesa?style=plastic)
![APM](https://img.shields.io/apm/l/bot-twitch-tesa)
![Twitter Follow](https://img.shields.io/twitter/follow/alexcaussades?style=social)

_____

## Install depot

```
$ git clone https://github.com/alexcaussades/bot-twitch-tesa.git
```

## creat file 
```
$ touch bdd.db3
```

## modify file

twitch-exemple.json => rename twitch.json

visit this url to be able to fill in the elements below [token generator](https://twitchtokengenerator.com/)

```json
"data": {
      "auth": {
        "client_id": "", // add client_id
        "RefreshToken": "", // add RefreshToken
        "AccessToken": " ", // add AccessToken
        "bearer": " ", // add bearer (bearer: XXXXXXXXXXXXXXXXX)
        "bot": {
          "accessToken": " ",// add client_id
          "client_id": "", // add AccessToken
          "RefreshToken": "" // add AccessToken
        }
      },

```
**NEXT EDITING THE FILE**

```json
"channels": {
          "channels": "" // add name channels (ex: zerator)
      },

      "identity": {
        "data": {
          "name": "" // add name bot (ex: mybot)
        }
      }
```

## Execute Files

```
$ npm install
$ npm start apps.js
```

