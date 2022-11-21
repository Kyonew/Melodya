const { QueryType } = require('discord-player');
const {MESSAGES}=require("../../util/constants");
const {MessageEmbed}=require("discord.js")
const nomusic = new MessageEmbed()
.setColor("RED")
.setDescription("❌ **Aucune musique n'est en cours !**")
const errembed = new MessageEmbed()
.setURL("RED")
.setDescription("❌ **Une erreur est survenue!**")

module.exports.run = async (client, message, args) => {
    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [nomusic]});

     const success = queue.setPaused(true);
     const ok = new MessageEmbed()
     .setColor("PURPLE")
     .setDescription(`**Pause !** ⏸`)
     return message.channel.send(success ? {embeds: [ok]} : {embeds: [errembed]});
};

module.exports.help = MESSAGES.COMMANDS.MUSIQUE.PAUSE;