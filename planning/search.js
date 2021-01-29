const authtwitch = require("../twitch.json");
const debug = require("../twitch_modules/debug.json");
const fetch = require("node-fetch");
const { Client } = require("tmi.js");

module.exports.run = () => {
    let debut = new Date()
    console.log(debut.getDay())
    let i = debut.getDay()
    const jours = [[1, "lundi"], [2, "mardi"], [3, "mercredi"], [4, "jeudi"], [5, "vendredi"], [6, "samedi"], [7, "dimanche"]]
    const day = new Map(jours)
    console.log(day.get(i))
    
}