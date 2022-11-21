const {MESSAGES}=require("../../util/constants");
const {MessageEmbed}=require("discord.js")
require("dotenv").config();
const { getLyrics, getSong } = require("genius-lyrics-api");
const nomusic = new MessageEmbed()
.setColor("RED")
.setDescription("❌ **Aucune musique n'est en cours !**")
const nopmusic = new MessageEmbed()
.setColor("RED")
.setDescription("❌ **Il n'y avait pas de musique avant !**")
const ok = new MessageEmbed()
.setColor("PURPLE")
.setDescription("**Passage à la musique précédente... <a:reset:939215872860504144>**")

module.exports.run = async (client, message, args) => {
    const queue = client.player.getQueue(message.guild.id);
       
    if (!queue || !queue.playing) return message.reply({embeds: [nomusic]});
	
    const track = queue.current;
    let iii = (track.title).replace(/ \[[\s\S]*?\]/g, '')
    let titre = iii.replace(/ \([\s\S]*?\)/g, '');
    const options = {
        apiKey: process.env.GENIUSTOKEN,
        title: titre,
        artist: track.author,
        optimizeQuery: true
    };

  const song = getSong(options)
 const lyrics = await getLyrics(options)
     let paroles = `${lyrics}`
            if(lyrics==="null" || !song) {paroles === 'Aucune paroles trouvées pour cette musique.' }
    if(paroles.length >= 12288) {
            const tropembed = new MessageEmbed()
        .setTitle(`Voici les paroles de ${track.title} par ${track.author}`)
        .setColor("RED")
        .setFooter({text: 'Melodya Lyrics', iconURL: client.user.displayAvatarURL({dynamic: true})})
        .setDescription("**Cette musique contient trop de paroles !**")
            
           return message.reply({embeds: [tropembed]})
    }
    if (paroles.length > 4096){
        embedp1 = new MessageEmbed()
        .setTitle(`Voici les paroles de ${track.title} par ${track.author}`)
        .setColor("PURPLE")
        .setDescription(paroles.slice(0, 4096))

        embedp2 = new MessageEmbed()
        .setColor("PURPLE")
        .setFooter({text: 'Melodya Lyrics', iconURL: client.user.displayAvatarURL({dynamic: true})})
        .setDescription(paroles.slice(4096, 8192))

        message.reply({embeds: [embedp1, embedp2]})
    } else if(paroles.length > 8192){
        embedp1 = new MessageEmbed()
        .setTitle(`Voici les paroles de ${track.title} par ${track.author}`)
        .setColor("PURPLE")
        .setDescription(paroles.slice(0, 4096))

        embedp2 = new MessageEmbed()
        .setColor("PURPLE")
        .setDescription(paroles.slice(4096, 8192))

        embedp3 = new MessageEmbed()
        .setColor('PURPLE')
        .setFooter({text: 'Melodya Lyrics', iconURL: client.user.displayAvatarURL({dynamic: true})})
.setDescription(paroles.slice(8192, 12288))

        message.reply({embeds: [embedp1, embedp2, embedp3]})

    } else if(paroles.length <= 4096) {
  
      if(lyrics==="null" || !song) {paroles === 'Aucune paroles trouvées pour cette musique.' }
    const embed = new MessageEmbed()
        .setTitle(`Voici les paroles de ${track.title} par ${track.author}`)
        .setColor("PURPLE")
        .setFooter({text: 'Melodya Lyrics', iconURL: client.user.displayAvatarURL({dynamic: true})})
        .setDescription(paroles)

     message.reply({embeds: [embed]})
    
    }
};

module.exports.help = MESSAGES.COMMANDS.MUSIQUE.LYRICS;