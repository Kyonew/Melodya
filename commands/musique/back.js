const { QueryType } = require('discord-player');
const {MESSAGES}=require("../../util/constants");
const {MessageEmbed}=require("discord.js")
const nomusic = new MessageEmbed()
.setColor("RED")
.setDescription("❌ **Aucune musique n'est en cours !**")
const nopmusic = new MessageEmbed()
.setColor("RED")
.setDescription("❌ **Il n'y a pas de musique avant !**")
const ok = new MessageEmbed()
.setColor("PURPLE")
.setDescription("**Passage à la musique précédente... <a:reset:939215872860504144>**")

module.exports.run = async (client, message, args) => {
    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [nomusic]});

    if (!queue.previousTracks[1]) return message.reply({embeds: [nopmusic]});

    await queue.back();

    message.reply({embeds: [ok]});
};

module.exports.help = MESSAGES.COMMANDS.MUSIQUE.BACK;