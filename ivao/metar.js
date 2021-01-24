const fetch = require("node-fetch")
const resquest = require("request")
module.exports.run = (client, channel, tags, message, self, args) => {
    const configivao = require("./api.json")
    // fetch(configivao.data.metar+args,{
    //     method: "GET"
    // }).then((body) =>{
    //     console.log(body.body)
    // })

    request(sr, function (error, response, body) {
        let test = new Discord.MessageEmbed()
          .setColor("#8a2be2")
          //.setTitle('metar')
          .setAuthor(body)
          .setTimestamp()
          .setFooter("T.E.S.A");
        message.channel.send(test);
      });
    
}