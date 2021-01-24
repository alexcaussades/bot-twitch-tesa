const tmi = require("tmi.js");
const authtwitch = require("./twitch.json");
const fs = require("fs")
const sqlite3 = require("sqlite3").verbose();
const pdo = new sqlite3.Database("bdd.db3", sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the ocs_athlete database.');
});


const client = new tmi.Client({
  options: { debug: true, messagesLogLevel: "info" },
  connection: {
    reconnect: true,
    secure: true,
  },
  identity: {
    username: "hellojesuisla",
    password: authtwitch.data.auth.bot.client_id,
  },
  channels: ["alexcaussades", "hellstrif"],
});


client.connect().catch(console.error);


pdo.run("CREATE TABLE IF NOT EXISTS  wivers (id INTEGER PRIMARY KEY, username TEXT VARCHAR(255) NOT NULL, id_users TEXT VARCHAR(255) NOT NULL, subcriber TEXT VARCHAR(255) NOT NULL, channels TEXT VARCHAR(255) NOT NULL )");
pdo.run("CREATE TABLE IF NOT EXISTS  message (id INTEGER PRIMARY KEY, username TEXT VARCHAR(255) NOT NULL, id_users TEXT VARCHAR(255) NOT NULL, message TEXT NOT NULL, subcriber TEXT VARCHAR(255) NOT NULL, channels TEXT VARCHAR(255) NOT NULL )");

client.on("message", (channel, tags, message, self) => {
  if (tags["username"] != "mytesabot")
  {
    pdo.run(`INSERT INTO message(username, id_users, message, subcriber, channels) VALUES(?,?,?,?,?)`, [tags.username, tags["user-id"], message, tags.subscriber, channel])
  }
  //console.log(tags["username"])
  
  if (self) return;
  if (message.toLowerCase() === "!hello") {
    const clientInformation = require("./twitch_modules/user_id")
    /** TODO: refaire la function avec tags["users-id"] */
    clientInformation.search_id(client, channel, tags, message, self)
    pdo.run(`INSERT INTO wivers(username, id_users, subcriber, channels) VALUES(?,?,?,?)`, [tags.username, tags["user-id"], tags.subscriber, channel])
  }

  if (message === "!test")
  {
    setTimeout(() => {
      client.say(channel, `Hello @${tags.username}`)
    }, 2000)
  }

 
});



client.on("subscription", function (channel, username, method, message, userstate) {
  // TODO: verificartion de la commande
  client.say(channel, + "Merci "+ userstate["login"] + " Pour ton "+ userstate["msg-id"] + ", " + userstate["msg-param-sub-plan-name"])  
});

client.on("resub", function (channel, username, method, message, userstate) {
  client.say(channel, + "Merci "+ userstate["login"] + " Pour ton "+ userstate["msg-id"] + " Avec " + userstate["msg-param-cumulative-months"] + " mois " + ", " + userstate["msg-param-sub-plan-name"])
});

// client.on("whisper", function (channel, username, method, message, userstate) {
//   console.log(username)
//   console.log(message)
//   console.log(userstate)
// });

// client.on("join",function(channel, username, self) {
//   // console.log(channel)
//   // console.log(username)
//   // console.log(self)

// })

// client.on("part",function(channel, username, self) {
//   // console.log(channel)
//   // console.log(username)
//   // console.log(self)

// })

