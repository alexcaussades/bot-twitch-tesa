const request = require("request")
const bug = require("../bug")


module.exports.run = (client, channel, tags, message, self, args) => {
  const infoclient = client
    const configivao = require("./api.json")
    request(configivao.data.taf+args, function (error, response, body) {
       //console.log(body)
    client.say(channel, "TAF information for " + body)
    if(body === ""){
      bug.bug(channel, "Aucune information sur la plateforme : " + args, error, infoclient)
    }
    if(error){
      bug.bug(channel, "Probleme de recherche", error, pdo, infoclient)
     }
     if (response.statusCode != 200)
     {
       bug.bug(channel, "status code : " + response.statusCode , error, pdo, infoclient)
     }
      });
    
}