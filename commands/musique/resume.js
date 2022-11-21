const { QueryType } = require('discord-player');
const {MESSAGES}=require("../../util/constants");
const {MessageEmbed}=require("discord.js")
const nomusic = new MessageEmbed()
.setColor("RED")
.setDescription("❌ **Aucune musique n'est en cours !**")
const ok = new MessageEmbed()
.setColor("PURPLE")
.setDescription("**Continue de jouer... <:resume:939272297720741928> **")
const errembed = new MessageEmbed()
.setColor("RED")
.setDescription("❌ **Une erreur est survenue!**")
module.exports.run = async (client, message, args) => {
    const queue = client.player.getQueue(message.guild.id);

    if (!queue) return message.reply({embeds: [nomusic]});

    const success = queue.setPaused(false);

    return message.reply(success ? {embeds: [ok]} : {embeds: [errembed]});
};

module.exports.help = MESSAGES.COMMANDS.MUSIQUE.RESUME;