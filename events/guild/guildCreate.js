const Discord = require('discord.js');

module.exports = async (client, guild) => {
  
        const channelId = '937348397793411102';
        const channel = client.channels.cache.get(channelId); //This Gets That Channel
        //const sowner = guild.owner.user; //This Gets The Guild Owner
        if(!channel) return; //If the channel is invalid it returns
        const embed = new Discord.MessageEmbed()
            .setTitle(`Kyo vient d\'être ajouté sur le serveur ${guild.name}`)
              .setThumbnail(guild.iconURL())
          //    .addField(`👑 Propriétaire:`, `${sowner.tag}`)
              .addField(`📇 Nom du serveur :`, `${guild.name}`)
              .addField(` Id du serveur:`, `${guild.id}`)
              .addField(` Nombre de membres:`, `${guild.memberCount}`)
              .setColor(`fc3d12`)
              .setFooter( `Désormais : ${client.guilds.cache.size} serveurs`, client.user.displayAvatarURL())
        channel.send({embeds: [embed]});
  
    const newGuild = {
        guildID: guild.id, 
        guildName: guild.name
    };

    await client.createGuild(newGuild);
};