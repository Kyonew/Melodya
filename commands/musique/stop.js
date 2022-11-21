const { QueryType } = require('discord-player');
const {MESSAGES}=require("../../util/constants");
const {MessageEmbed}=require("discord.js")
const nomusic = new MessageEmbed()
.setColor("RED")
.setDescription("❌ **Aucune musique n'est en cours !**")
const ok = new MessageEmbed()
.setColor("PURPLE")
.setDescription("**La playlist a bien été supprimée ! <:check1:938895505197502474>**")

module.exports.run = async (client, message, args) => {
    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [nomusic]})

    queue.destroy();

    message.reply({embeds: [ok]})
};

module.exports.help = MESSAGES.COMMANDS.MUSIQUE.STOP;