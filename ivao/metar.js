const request = require("request")
module.exports.run = (client, channel, tags, message, self, args) => {
    const configivao = require("./api.json")
    request(configivao.data.metar+args, function (error, response, body) {
       //console.log(body)
       client.say(channel, "Metar information for " + body)
      });
    
}