const authtwitch = require("../twitch.json");
const debug = require("../twitch_modules/debug.json");
const fetch = require("node-fetch");
//const { Client, client } = require("tmi.js");

module.exports.run = (client, channel , pdo) => {
    let debut = new Date()
    let i = debut.getDay()
    const jours = [[1, "lundi"], [2, "mardi"], [3, "mercredi"], [4, "jeudi"], [5, "vendredi"], [6, "samedi"], [7, "dimanche"]]
    const day = new Map(jours)
    const jour = day.get(i)
    const heure = debut.getHours()
    client.say(channel, `The planning from the API {{'Status' : '200', 'method': 'POST'}} at the days : ${jour} for time: ${heure}` )
}