const authtwitch = require("../twitch.json");
const debug = require("./debug.json")
//skarab42
module.exports.onLive = (client, channel, tags, message, self) => {
    const username = tags.username;
    const fetch = require("node-fetch");
    fetch(authtwitch.data.url.channelsquery + "skarab42", {
      method: "GET",
      headers: {
        "client-id": authtwitch.data.auth.client_id,
        Authorization: authtwitch.data.auth.bearer,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        //const id = json.data[0].id;
        //const live = json.data[0].is_live;
        //console.log(json.data.length)
        for (let i = 0; i < json.data.length; i++) {
            const element = json.data[i];
            if(element.is_live === true){
                if(element.display_name === "skarab42"){
                    const id = element.id
                    client.say(channel, + " Le live de skarab42 est actif ")
                }
            }
            
        }
    })}