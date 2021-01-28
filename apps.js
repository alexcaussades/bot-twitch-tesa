const tmi = require("tmi.js");
const authtwitch = require("./twitch.json");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const pdo = new sqlite3.Database("bdd.db3", sqlite3.OPEN_READWRITE, (err) => {
 if (err) {
  console.error(err.message);
 }
 console.log("Connected to the database.");
});

const client = new tmi.Client({
 options: { debug: true, messagesLogLevel: "info" },
 connection: {
  reconnect: true,
  secure: true,
 },
 identity: {
  username: authtwitch.identity.data.name,
  password: authtwitch.data.auth.bot.client_id,
 },
 channels: [
  authtwitch.data.channels.channels,
  authtwitch.data.channels.channels2,
  authtwitch.data.channels.channels3,
 ],
});

client.connect().catch(console.error);
// pour suprimer la table
pdo.run("DROP TABLE viewersDays", function (error) {
 if (error) {
  console.log(error.message);
 }
});

/** Creat database  */
pdo.run(
 "CREATE TABLE IF NOT EXISTS  message (id INTEGER PRIMARY KEY, username TEXT VARCHAR(255) NOT NULL, id_users TEXT VARCHAR(255) NOT NULL, message TEXT NOT NULL, subcriber TEXT VARCHAR(255) NOT NULL, channels TEXT VARCHAR(255) NOT NULL )"
);
pdo.run(
 "CREATE TABLE IF NOT EXISTS  viewersDays(id INTEGER PRIMARY KEY, username TEXT VARCHAR(255) NOT NULL, id_users TEXT VARCHAR(255) NOT NULL, channels TEXT VARCHAR(255) NOT NULL)"
);
pdo.run(
 "CREATE TABLE IF NOT EXISTS  onlive(id INTEGER PRIMARY KEY, channels TEXT VARCHAR(255) NOT NULL, status TEXT VARCHAR(255) NOT NULL)"
);
client.on("message", (channel, tags, message, self) => {
 if (tags["username"] != "mytesabot") {
  pdo.run(
   `INSERT INTO message(username, id_users, message, subcriber, channels) VALUES(?,?,?,?,?)`,
   [tags.username, tags["user-id"], message, tags.subscriber, channel]
  );
  const userid = tags["user-id"];
  //console.log(tags)
  const search = pdo.get(
   `SELECT * FROM viewersDays WHERE id_users = ?`,
   [userid],
   function (error, row) {
    if (row) {
    } else {
     pdo.run(
      `INSERT INTO viewersDays(username, id_users, channels) VALUES(?,?,?)`,
      [tags.username, tags["user-id"], channel]
     );
     console.log("tout vas bien " + tags.username, tags["user-id"], channel);
    }
   }
  );
 }

 if (self) return;
 if (message.toLowerCase() === "!hello") {
  const clientInformation = require("./twitch_modules/user_id");
 
  clientInformation.search_id(client, channel, tags, message, self);
  pdo.run(
   `INSERT INTO wivers(username, id_users, subcriber, channels) VALUES(?,?,?,?)`,
   [tags.username, tags["user-id"], tags.subscriber, channel]
  );
 }

 if (message === "!test") {
  setTimeout(() => {
   client.say(channel, `Hello @${tags.username}`);
  }, 2000);
 }

 if (message === "!test2") {
  const live = require("./twitch_modules/on_live");
  live.onLive(client, channel, tags, message, self);
 }
 
 if (message === "!functionSpecialAdminSystemeNeTochePasACeciMerci"){
  pdo.run( `INSERT INTO onlive(channels, status) VALUES(?,?)`,[authtwitch.data.channels.channels, 0]);
  pdo.run( `INSERT INTO onlive(channels, status) VALUES(?,?)`,[authtwitch.data.channels.channels2, 0]);
  pdo.run( `INSERT INTO onlive(channels, status) VALUES(?,?)`,[authtwitch.data.channels.channels3, 0]);
 }

 if (self || !message.startsWith("!")) {
  return;
 }

 const args = message.slice(1).split(" ");
 const command = args.shift().toLowerCase();

 if (command === "metar") {
  const metar = require("./ivao/metar");
  metar.run(client, channel, tags, message, self, args);
 }

 if (command === "taf") {
  const taf = require("./ivao/taf");
  taf.run(client, channel, tags, message, self, args);
 }
});

client.on(
 "subscription",
 function (channel, username, method, message, userstate, methods) {
  // TODO: verificartion de la commande
  console.log(userstate);
  client.say(channel, +"Merci " + userstate["login"] + " Pour ton " + userstate["msg-id"] +  ", " +  userstate["msg-param-sub-plan-name"]);
 }
);

client.on(
 "resub",
 function (channel, username, method, message, userstate, methods) {
  console.log(userstate);
  client.say(
   channel,
   +"Merci " +
    userstate["login"] +
    " Pour ton " +
    userstate["msg-id"] +
    " Avec " +
    userstate["msg-param-cumulative-months"] +
    " mois " +
    ", " +
    userstate["msg-param-sub-plan-name"]
  );
 }
);


const element = [
 authtwitch.data.channels.channels,
 authtwitch.data.channels.channels2,
 authtwitch.data.channels.channels3,
];
setInterval(() => {
 for (let i = 0; i < element.length; i++) {
  const sr = element[i];
  //console.log(sr)
  const onlive = require("./twitch_modules/on_live");
  onlive.onLive(sr, pdo);
 }
}, 60000);



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
