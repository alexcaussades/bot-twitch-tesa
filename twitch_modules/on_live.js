const authtwitch = require("../twitch.json");
const debug = require("./debug.json");

module.exports.onLive = (client, channel, tags, message, self, args) => {
  const username = tags.username;
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
            // Todo: mettre en place en webhook discord ! 
            //https://discord.com/api/webhooks/804312053044871209/AflBOSo-h095rdrqfKTRfkJmnFzjBriNiF45UPCFWWL4BWoYOEhmBmBf7-LoXgQJEr3p
            
          }
        }
      }
    });
};
