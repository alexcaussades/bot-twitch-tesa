const authtwitch = require("../twitch.json");
//const debug = require("./debug.json");
const { Webhook, MessageBuilder } = require("discord-webhook-node");
const bug = require("./debug.json");
const { client } = require("tmi.js");

module.exports.run = (client, channel, args) => {
  const fetch = require("node-fetch");
  fetch(authtwitch.data.url.clip + args, {
    method: "POST",
    headers: {
      "client-id": authtwitch.data.auth.client_id,
      Authorization: authtwitch.data.auth.bearer,
    },
  })
    .then((res) => res.json())
    .then((json) => {
        const url = "https://clips.twitch.tv/"
        client.say(channel, "Nouveau Clip => " + url+json.data[0].id)
        //console.log(json.data[0].id)
    }
    )
}