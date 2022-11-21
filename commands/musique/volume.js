const maxVol = require("../../config.js").opt.maxVol;
const {MESSAGES}=require("../../util/constants");
const {MessageEmbed, ReactionCollector}=require("discord.js")
const nomusic = new MessageEmbed()
.setColor("RED")
.setDescription("❌ **Aucune musique n'est en cours !**")

module.exports.run = async (client, message, args, settings) => {

    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [nomusic]});

     const vol = parseInt(args[0]);
    const volumea = new MessageEmbed()
    .setColor("PURPLE")
    .setDescription(`Volume actuel : **${queue.volume}** 🔊\nPour changer le volume, utilisez \`${settings.prefix}volume [nouveau volume]\` *(Entre 0 et 250)*`)
     if (!vol) return message.reply({embeds: [volumea]});
    const dejavolume = new MessageEmbed()
    .setColor("RED")
    .setDescription(`❌ **C'est déjà le volume actuel !**`)
     if (queue.volume === vol) return message.reply({embeds: [dejavolume]});
    const ztt = new MessageEmbed()
    .setColor("ORANGE")
    .setDescription("Veuillez choisir un volume entre **1** et **250** !")
     if (vol < 0 || vol > maxVol) return message.reply({embeds: [ztt]});

     const success = queue.setVolume(vol);
    const ok = new MessageEmbed()
    .setColor("PURPLE")
    .setDescription(`**Volume défini sur** \`${vol}%\` 🔊`)
    const errembed = new MessageEmbed()
    .setColor("RED")
    .setDescription("❌ **Une erreur est survenue !**")
     return message.reply(success ? {embeds: [ok]} : {embeds: [errembed]}) ;

};

module.exports.help = MESSAGES.COMMANDS.MUSIQUE.VOLUME;