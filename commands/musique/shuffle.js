const { QueryType } = require('discord-player');
const {MESSAGES}=require("../../util/constants");
const {MessageEmbed, ReactionCollector}=require("discord.js")
const nomusic = new MessageEmbed()
.setColor("RED")
.setDescription("❌ **Aucune musique n'est en cours !**")

module.exports.run = async (client, message, args) => {
    const queue = client.player.getQueue(message.guild.id);
 
    if (!queue || !queue.playing) return message.reply({embeds: [nomusic]});

    const success = queue.shuffle();

    const suvves = new MessageEmbed()
    .setColor("PURPLE")
    .setDescription(`**Mode aléatoire 🔀**`)
    const er = new MessageEmbed()
    .setColor("RED")
    .setDescription("❌ **Une erreur est survenue !**")
    return message.reply(success ? {embeds: [suvves]} : {embeds: [er]});


};

module.exports.help = MESSAGES.COMMANDS.MUSIQUE.SHUFFLE;