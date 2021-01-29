const authtwitch = require("../twitch.json");
const debug = require("./debug.json");
const fetch = require("node-fetch");
const { Client } = require("tmi.js");


module.exports.run = (pdo, client) => {
    fetch(authtwitch.data.url.follower + debug.data.chanels_id_alexcaussades, {
        method : "GET",
        headers: {
            "client-id": authtwitch.data.auth.client_id,
            Authorization: authtwitch.data.auth.bearer,
          },
    }).then((res) => res.json())
    .then((json) => {
        pdo.run("CREATE TABLE IF NOT EXISTS  followers (id INTEGER PRIMARY KEY, namefollower TEXT VARCHAR(255) NOT NULL, idchannel TEXT VARCHAR(255) NOT NULL, idfollower TEXT NOT NULL, datefollowers TEXT VARCHAR(255) NOT NULL)");
        const namefollower = json.data[0].from_name
        const idchannel = json.data[0].to_id
        const idfollower = json.data[0].from_id
        const datefollowers = json.data[0].followed_at
        pdo.get(`SELECT * FROM followers WHERE idchannel = ?`, [idchannel], function (error, row) {
            if(row){
                if(row.namefollower === namefollower)
                {
                    //console.log("ses ok pour " + row.namefollower)
                }else{
                    pdo.run("INSERT INTO followers(namefollower, idchannel, idfollower, datefollowers) VALUES(?,?,?,?)", [namefollower, idchannel, idfollower, datefollowers])
                    console.log("New Followers : " + namefollower)
                    client.say(channel, "New Follower "+ namefollower);
                }
            }else if (row === undefined){
                pdo.run("INSERT INTO followers(namefollower, idchannel, idfollower, datefollowers) VALUES(?,?,?,?)", [namefollower, idchannel, idfollower, datefollowers])
                console.log("New Followers : " + namefollower)
                client.say(channel, "New Follower "+ namefollower);
            }

            if(error){
                console.log(error)
            }
        }) }
    )
}