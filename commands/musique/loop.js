const { QueueRepeatMode } = require('discord-player');
const {MESSAGES}=require("../../util/constants");
const {MessageEmbed, MessageSelectMenu}=require("discord.js")
const nomusic = new MessageEmbed()
.setColor("RED")
.setDescription("❌ **Aucune musique n'est en cours !**")
const errembed = new MessageEmbed()
.setColor("RED")
.setDescription("❌ **Une erreur est survenue...**")

module.exports.run = async (client, message, args, settings) => {
  
    const queue = client.player.getQueue(message.guild.id);
  
    const dejaboucle = new MessageEmbed()
.setColor("RED")
.setDescription(`❌ **Vous devez d'abord désactiver le mode loop de la musique en cours !** \`${settings.prefix}loop\``)
 
    if (!queue || !queue.playing) return message.reply({embeds: [nomusic]});

            if (args.join('').toLowerCase() === 'queue') {
                if (queue.repeatMode === 1) return message.reply({embeds: [dejaboucle]});
    
                const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);
    
                const ok = new MessageEmbed()
                .setColor("PURPLE")
                .setDescription(`Mode boucle : **${queue.repeatMode === 0 ? 'désactivé' : 'activé'}** <:check1:938895505197502474>`)


                return message.reply(success ? {embeds: [ok]} : {embeds: [errembed]});
            } else {

                const attention = new MessageEmbed()
                .setColor("RED")
                .setDescription(`**❌ Vous devez d'abord désactiver la file d'attente existente !** \`${settings.prefix}loop queue\``)

                if (queue.repeatMode === 2) return message.reply({embeds: [attention]});
    
                const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);
    
                const ok1 = new MessageEmbed()
                .setColor("PURPLE")
                .setDescription(`Mode boucle : **${queue.repeatMode === 0 ? 'désactivé' : 'activé'}** <:check1:938895505197502474>\nPour répéter toute les musiques dans la playlist, utilisez \`${settings.prefix}loop queue\` 🔁`)

                return message.reply(success ? {embeds: [ok1]} : {embeds: [errembed]});
            };
};

module.exports.help = MESSAGES.COMMANDS.MUSIQUE.LOOP;