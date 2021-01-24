const fetch = require("node-fetch")
const request = require("request")
module.exports.run = (client, channel, tags, message, self, args) => {
    const configivao = require("./api.json")
    // fetch(configivao.data.metar+args,{
    //     method: "GET"
    // }).then((body) =>{
    //     console.log(body.body)
    // })

    request(configivao.data.metar+args, function (error, response, body) {
       console.log(body)
      });
    
}