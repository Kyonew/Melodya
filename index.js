const { Client, Collection, MessageEmbed } = require('discord.js');
const { loadCommands, loadEvents } = require('./util/loader')
require('dotenv').config()
const client = new Client({intents: (32767)});
require("./util/functions")(client);
client.config = require("./config");
client.mongoose = require("./util/mongoose");
["commands", "cooldowns"].forEach(x => client[x] = new Collection());

loadCommands(client);
loadEvents(client);
client.mongoose.init();
client.options.restTimeOffset = 0;

//MUSIQUE
const { Player } = require('discord-player');
client.config = require('./config');
client.player = new Player(client, client.config.opt.discordPlayer);
const player = client.player


player.on('error', (queue, error) => {
    console.log(`Il y a un problème avec le son dans la playlist => ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`J'ai des problèmes pour me connecter => ${error.message}`);
});

player.on('trackStart', (queue, track) => {

    const starttrack = new MessageEmbed()
    .setColor("PURPLE")
    .setDescription(`🎵 Je lance **${track.title}** dans <#${queue.connection.channel.id}> 🎧`)
    
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    queue.metadata.send({embeds: [starttrack]});
});

player.on('trackAdd', (queue, track) => {
    const trackAdd = new MessageEmbed()
    .setColor("PURPLE")
    .setDescription(`**${track.title}** a été ajouté à la playlist ! <:check1:938895505197502474>`)

    queue.metadata.send({embeds: [trackAdd]});
});

player.on('channelEmpty', (queue) => {
    const channelvide = new MessageEmbed()
    .setColor("BLUE")
    .setDescription(" **J'ai quitté le salon car il n'y avait plus personne dedans. 😕**")

    queue.metadata.send({embeds: [channelvide]});
});

client.login(process.env.TOKEN);