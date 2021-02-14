const tmi = require("tmi.js");
const authtwitch = require("./twitch.json");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const bug = require("./bug")
const prefix = "!"
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
  // authtwitch.data.channels.channels3,
 ],
});

client.connect().catch(console.error);
// pour suprimer la table
pdo.run("DROP TABLE viewersDays", function (error) {
 if (error) {
  console.log(error.message);
 }
});

// pdo.run("DROP TABLE bug", function (error) {
//   if (error) {
//    console.log(error.message);
//   }
//  });

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

pdo.run(
  "CREATE TABLE IF NOT EXISTS  bug(id INTEGER PRIMARY KEY, channels TEXT VARCHAR(255) NOT NULL, infoscommands TEXT VARCHAR(255) NOT NULL, message_erreur LONGTEXT NOT NULL)"
 );

pdo.run(
 "CREATE TABLE IF NOT EXISTS  cmd(id INTEGER PRIMARY KEY, channels TEXT VARCHAR(255) NOT NULL, infoscommands TEXT VARCHAR(255) NOT NULL, desc LONGTEXT NOT NULL)"
);

client.on("message", (channel, tags, message, self) => {
const roomid  = tags["room-id"]
  
 if (tags["username"] != "mytesabot") {
  pdo.run(
   `INSERT INTO message(username, id_users, message, subcriber, channels) VALUES(?,?,?,?,?)`,
   [tags.username, tags["user-id"], message, tags.subscriber, channel]
  );
  const userid = tags["user-id"];
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
     console.log("add " + tags.username, tags["user-id"], channel);
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


 if (message === prefix+"clip") {
  const clip = require("./twitch_modules/clip");
  clip.run(client, channel, roomid);
 }

 if (message === prefix+"marv") {
  client.say(channel, "https://github.com/skarab42/marv")
}

if (message === prefix+"tesatwitch") {
 client.say(channel, "https://github.com/alexcaussades/bot-twitch-tesa || tu aussi TESA pour Discord !tesadiscord")
}

if (message === prefix+"tesadiscord") {
 client.say(channel, "https://github.com/alexcaussades/TESA || tu aussi TESA pour twitch !tesatwitch")
}

if (message === prefix+"bug") {
 client.say(channel, 'Tu as découvert un bug viens ici pour me le décrire : https://github.com/alexcaussades/bot-twitch-tesa/issues')
}

if (message === prefix+"discord") {
  client.say(channel, "https://discord.gg/CDntF5H")
}

if (message === prefix+"discord-dev") {
  client.say(channel, "https://discord.gg/S4HxU2YfaT")
}

if (message === prefix+"git") {
  client.say(channel, "https://github.com/alexcaussades")
}

if (message === prefix+"alternos") {
  client.say(channel, "https://myalternos.fr/")
}
 
if (self || !message.startsWith(prefix)) {
  return;
 }

 const args = message.slice(1).split(" ");
 const command = args.shift().toLowerCase();

 if (command === "addcmd"){
   console.log("add commannde => args[] => " + args)
 }

 if (command === "delcmd"){
  console.log("delect commannde => args[] => " + args[1])
 }

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

client.on("resub", function (channel, username, method, message, userstate, methods) {
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

setInterval(() => {
  const tt = require("./twitch_modules/on_follwers")
  tt.run(pdo, client)
}, 40000);

