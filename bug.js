const { Webhook, MessageBuilder } = require("discord-webhook-node");
const { client } = require("tmi.js");

module.exports.bug = (channel, infoCommand, error, pdo, client) => {

    const phrase = "Tu as découvert un bug viens ici pour me le décrire : https://github.com/alexcaussades/bot-twitch-tesa/issues"
    const webhook = "https://discord.com/api/webhooks/805447045195497472/WwL6FKY0WBaMeWV8cheCuMyIFD3L5MkYNsnmvY2J37u_oTYhqsWi63AEzM83txHKPetg"
    const info = infoCommand
    const erreur = error
    client.say(channel, phrase)
    const hook = new Webhook(webhook);
     const embed = new MessageBuilder()
    .setTitle('Bug Alerte')
    .setAuthor(infoCommand)
    .setColor('#f44400')
    .setThumbnail('https://s3-eu-west-3.amazonaws.com/horustest-wp-prod.eu-west-3/wp-content/uploads/top-10-bugs.jpg')
    .setDescription(error)
    .setFooter('T.E.S.A', 'https://cdn.discordapp.com/avatars/794282559290212352/c4143eb9156004a44761c4939e8ad47b.png')
    .setTimestamp();
    
    hook.send(embed);
}