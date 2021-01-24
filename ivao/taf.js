const request = require("request")
module.exports.run = (client, channel, tags, message, self, args) => {
    const configivao = require("./api.json")
    request(configivao.data.taf+args, function (error, response, body) {
       //console.log(body)
    client.say(channel, "TAF information for " + body)
      });
    
}