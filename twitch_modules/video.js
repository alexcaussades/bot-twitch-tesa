const authtwitch = require("../twitch.json");

module.exports.search_video = (channel, tags, message, self, id) => {
  //const id = json.data[0].id;
  //const live = json.data[0].is_live;
  //const avatar = json.data[0].thumbnail_url;
  console.log(id);
  const fetch = require("node-fetch");
  fetch(authtwitch.data.url.video_debut + id + "/videos", {
    method: "GET",
    headers: {
      Accept: authtwitch.data.url.apiv5,
      "client-id": authtwitch.data.auth.client_id,
      Authorization: authtwitch.data.auth.bearer,
    },
  })
    .then((res) => res.json())
    .then((jsonvideo) => {
        console.log(jsonvideo)
    //   const url = jsonvideo.videos[0].url;
    //   if (url) {
    //     client.say(channel, `Hello @${tags.username}` + " " + url);
    //   } else {
    //     client.say(channel, `Hello @${tags.username}`);
    //   }
    });
};
