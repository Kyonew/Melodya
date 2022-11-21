const { MESSAGES } = require("../../util/constants");
const Discord = require('discord.js');

module.exports.run = async (client, message, args, settings) => {
  
    const newSetting = args.slice(0).join(" ");
    console.log(newSetting)
          if (newSetting) {
           // clearTimeout(x)
            await client.updateGuild(message.guild, { prefix: newSetting });
            message.delete()
            const neworefixembed = new Discord.MessageEmbed()
            .setDescription(`**Prefix mis à jour : \`${settings.prefix}\` ➔ \`${newSetting}\`**`)
            .setColor('#169f73')
            return message.channel.send({embeds: [neworefixembed]});
          }
          message.channel.send(`Prefix actuel: \`${settings.prefix}\``);  

}

module.exports.help = MESSAGES.COMMANDS.CONFIG.SETPREFIX;