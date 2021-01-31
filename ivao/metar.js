const request = require("request")
const bug = require("../bug")

module.exports.run = (client, channel, tags, message, self, args) => {
    const configivao = require("./api.json")
    request(configivao.data.metar+args, function (error, response, body) {
       //console.log(body)
       client.say(channel, "Metar information for " + body)
       if(error){
        bug.bug(channel, "Probleme de recherche", error, pdo, client)
       }
       if (response.statusCode != 200)
       {
         bug.bug(channel, "status code : " + response.statusCode , error, pdo, client)
       }
      }
      );
    
}