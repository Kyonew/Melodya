const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../util/constants");

module.exports.run = async (client, message) => {

        const startTime = Date.now()

        const embed11 = new MessageEmbed()
        .setTitle("Calcul...")
                await message.reply({embeds: [embed11]}).then(async msg => {

            const endTime = Date.now()
            const embed = new Discord.MessageEmbed()
            .setTitle("Pong! 🏓")
            .setColor('PURPLE')
            .setDescription(`\`\`\`py\nPing : ${endTime - startTime} ms\nAPI : ${client.ws.ping} ms\n\`\`\``)

                msg.edit({embeds: [embed]})    
    })

}

module.exports.help = MESSAGES.COMMANDS.MISC.PING;