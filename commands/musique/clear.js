const { QueryType } = require('discord-player');
const {MESSAGES}=require("../../util/constants");
const {MessageEmbed}=require("discord.js")
const nomusic = new MessageEmbed()
.setColor("RED")
.setDescription("❌ **Aucune musique n'est en cours !**")
const noattente = new MessageEmbed()
.setColor("RED")
.setDescription("❌ **Il n'y a aucune musique dans la liste d'attente !**")
const ok = new MessageEmbed()
.setColor("PURPLE")
.setDescription("**La playlist vient d'être effacée ! 🗑️**")

module.exports.run = async (client, message, args) => {
    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [nomusic]});

    if (!queue.tracks[0]) return message.reply({embeds: [noattente]});

    await queue.clear();

    message.reply({embeds: [ok]});
};

module.exports.help = MESSAGES.COMMANDS.MUSIQUE.CLEAR;