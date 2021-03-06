const authtwitch = require("../twitch.json");
//const debug = require("./debug.json");
const { Webhook, MessageBuilder } = require("discord-webhook-node");
const bug = require("../bug");
const { client } = require("tmi.js");

module.exports.onLive = (args, pdo) => {
  const hook = new Webhook(
    "https://discord.com/api/webhooks/804312053044871209/AflBOSo-h095rdrqfKTRfkJmnFzjBriNiF45UPCFWWL4BWoYOEhmBmBf7-LoXgQJEr3p"
  );
  const fetch = require("node-fetch");
  fetch(authtwitch.data.url.channelsquery + args, {
    method: "GET",
    headers: {
      "client-id": authtwitch.data.auth.client_id,
      Authorization: authtwitch.data.auth.bearer,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      for (let i = 0; i < json.data.length; i++) {
        const element = json.data[i];
        if (element.is_live === true) {
          if (element.display_name === args) {
            const id = element.id;
            const search = pdo.get(
              `SELECT * FROM onlive WHERE channels = ?`,
              [args],
              function (error, row) {
                if (row) {
                  if (row.status != element.is_live) {
                    pdo.run("UPDATE onlive SET status = ? WHERE channels = ?", [element.is_live,args]);
                    if (element.is_live === true) {
                      //TODO add webhook for discord
                      console.log("hello " + row.status + element.is_live);
                    }
                  }
                }
                if (error) {
                  console.log(error);
                  bug.bug(channel, "pdo.get", error, pdo, client);
                }
              }
            );
          }
        } else if (element.is_live === false) {
          if (element.display_name === args) {
            const id = element.id;
            pdo.get(
              `SELECT * FROM onlive WHERE channels = ?`,
              [args],
              function (error, row) {
                if (row) {
                  if (row.status != element.is_live) {
                    pdo.run("UPDATE onlive SET status = ? WHERE channels = ?", [element.is_live, args]);
                  }
                }
                if (error) {
                  console.log(error);
                  bug.bug(channel, "pdo.get", error, pdo, client);
                }
              }
            );
          }
        }
      }
    });
};
