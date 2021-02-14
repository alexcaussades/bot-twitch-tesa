const request = require("request")
const bug = require("../bug")

module.exports.run = (client, channel, tags, message, self, args) => {
  const infoclient = client
    const configivao = require("./api.json")
    request(configivao.data.metar+args, function (error, response, body) {
       //console.log(body)
       client.say(channel, "Metar information for " + body)
       if (body === "") {
        bug.bug(channel, "Aucune information sur la plateforme : " + args, error, infoclient)
      }
       if(error){
        client.say("Mauvais d'argument! Usage : !metar LFBL")
        bug.bug(channel, "Probleme de recherche", error, infoclient)
       }
       if (response.statusCode != 200)
       {
         bug.bug(channel, "status code : " + response.statusCode , error, infoclient)
       }
      }
      )
    
}