const {MESSAGES}=require("../../util/constants");
const { MessageEmbed, MessageActionRow, MessageButton}=require("discord.js")
const { getAlbumArt } = require("genius-lyrics-api");
const nomusic = new MessageEmbed()
.setColor("RED")
.setDescription("❌ **Aucune musique n'est en cours !**")
const errembed = new MessageEmbed()
.setURL("RED")
.setDescription("❌ **Une erreur est survenue!**")

module.exports.run = async (client, message, args) => {
    
     const queue = client.player.getQueue(message.guild.id);
    if (!queue || !queue.playing) return message.reply({embeds: [nomusic]})
    const track = queue.current;
    let iii = (track.title).replace(/ \[[\s\S]*?\]/g, '')
    let titre = iii.replace(/ \([\s\S]*?\)/g, '');
    const options = {
        apiKey: process.env.GENIUSTOKEN,
        title: titre,
        artist: track.author,
        optimizeQuery: true
    };
    let pochette='https://cdn.discordapp.com/attachments/937348397793411102/942829935528140880/error_not_found.jpg';
    pochette = await getAlbumArt(options)    
    
    const timestamp = queue.getPlayerTimestamp();

    if (timestamp.progress == 'Infinity') time = `Cette musique est une musique en live ! Il n'y a donc pas de temps associé. 🎧`;
    const progress = queue.createProgressBar();
    
    // let test;
    // if(queue.volume>=0 &&queue.volume<= 25) {test='▬🔘▬▬▬▬▬▬▬▬▬▬▬▬▬'}
    // if(queue.volume>=26 &&queue.volume<= 50) {test='▬▬🔘▬▬▬▬▬▬▬▬▬▬▬▬'}
    // if(queue.volume>=51 &&queue.volume<= 75) {test='▬▬▬🔘▬▬▬▬▬▬▬▬▬▬▬'}
    // if(queue.volume>=76&&queue.volume<= 100) {test='▬▬▬▬🔘▬▬▬▬▬▬▬▬▬▬'}
    // if(queue.volume>=101 &&queue.volume<= 125) {test='▬▬▬▬▬▬🔘▬▬▬▬▬▬▬▬'}
    // if(queue.volume>=126 &&queue.volume<= 150) {test='▬▬▬▬▬▬▬▬🔘▬▬▬▬▬▬'}
    // if(queue.volume>=151 &&queue.volume<= 175) {test='▬▬▬▬▬▬▬▬▬▬🔘▬▬▬▬'}
    // if(queue.volume>=176 &&queue.volume<= 200) {test='▬▬▬▬▬▬▬▬▬▬▬▬🔘▬▬'}
    // if(queue.volume>=201 &&queue.volume<= 225) {test='▬▬▬▬▬▬▬▬▬▬▬▬▬🔘▬'}
    // if(queue.volume >= 226 &&queue.volume<= 250) {test='▬▬▬▬▬▬▬▬▬▬▬▬▬▬🔘'}
    const nopmusic = new MessageEmbed()
    .setColor("RED")
    .setDescription("❌ **Il n'y a pas de musique avant !**")
  
    let embnedpo = new MessageEmbed()
    .setColor('PURPLE')
    .setImage(pochette)
    let tempsembed = new MessageEmbed()
    .setColor("PURPLE")
    .setDescription(`**${titre}**\n${track.author}\n\n${progress}`)
   
    const nullembed = new MessageEmbed()
    .setDescription('**...**')

    var row = new MessageActionRow()
    .addComponents(new MessageButton()
    .setStyle('PRIMARY')
    .setCustomId('back')
    .setEmoji('⏪')
    ).addComponents(new MessageButton()
    .setStyle('PRIMARY')
    .setCustomId("pause")
    .setEmoji("⏸")
    ).addComponents(new MessageButton()
    .setStyle('PRIMARY')
    .setCustomId('skip')
    .setEmoji('⏩'))

    message.reply({embeds: [embnedpo, tempsembed], components: [row]}).then(async msg => {

        let embed = new MessageEmbed()
        .setColor("PURPLE")
        .setDescription(`**${titre}**\n${track.author}\n\n${progress}`)

        var row1 = new MessageActionRow()
        .addComponents(new MessageButton()
        .setStyle('PRIMARY')
        .setCustomId('back')
        .setEmoji('⏪')
        ).addComponents(new MessageButton()
        .setStyle('PRIMARY')
        .setCustomId('play')
        .setEmoji('▶')
        ).addComponents(new MessageButton()
        .setStyle('PRIMARY')
        .setCustomId('skip')
        .setEmoji('⏩'))

    const filter = async() => true;
    const collector = msg.createMessageComponentCollector({filter})

    collector.on('collect', async i => {
        if (i.customId === 'pause') {
            msg.edit({embeds: [embnedpo, embed], components: [row1]})
            await queue.setPaused(true)
        }
        if (i.customId === 'play') {
            msg.edit({embeds: [embnedpo, embed], components: [row]})
            await queue.setPaused(false)
        }
        if (i.customId === 'back') {
            if (!queue.previousTracks[1]) return i.reply({embeds: [nopmusic]});
           const track1 = queue.previousTracks[1]
           const progress = queue.createProgressBar();
           let iii = (track1.title).replace(/ \[[\s\S]*?\]/g, '')
           let titre2 = iii.replace(/ \([\s\S]*?\)/g, '');
           const options1 = {
               apiKey: process.env.GENIUSTOKEN,
               title: titre2,
               artist: track1.author,
               optimizeQuery: true
           };
           let pochette2='https://cdn.discordapp.com/attachments/937348397793411102/942829935528140880/error_not_found.jpg';
           pochette2 = await getAlbumArt(options1)   
               let embnedpo2 = new MessageEmbed()
               .setColor('PURPLE')
               .setImage(pochette2)
               let tempsembed2 = new MessageEmbed()
               .setColor("PURPLE")
               .setDescription(`**${titre2}**\n${track1.author}\n\n${progress}`)

             await queue.back()
             if(queue.setPaused(true)) {queue.setPaused(false)}
             await msg.edit({embeds: [embnedpo2, tempsembed2], components: [row]})
         
            };

        if (i.customId === 'skip') {
                                           
            queue.skip()
            if(queue.setPaused(true)) {queue.setPaused(false)}
            const track2 = queue.tracks[0]
            const progress = queue.createProgressBar();

            let iii = (track2.title).replace(/ \[[\s\S]*?\]/g, '')
            let titre2 = iii.replace(/ \([\s\S]*?\)/g, '');
            const options2 = {
                apiKey: process.env.GENIUSTOKEN,
                title: titre2,
                artist: track2.author,
                optimizeQuery: true
            };
            let pochette2='https://cdn.discordapp.com/attachments/937348397793411102/942829935528140880/error_not_found.jpg';
            pochette2 = await getAlbumArt(options2)   
                let embnedpo1 = new MessageEmbed()
                .setColor('PURPLE')
                .setImage(pochette2)
                let tempsembed1 = new MessageEmbed()
                .setColor("PURPLE")
                .setDescription(`**${titre2}**\n${track2.author}\n\n${progress}`)

                await msg.edit({embeds: [embnedpo1, tempsembed1], components: [row]})

        }
         await i.deferUpdate();
    })
})
};


module.exports.help = MESSAGES.COMMANDS.MUSIQUE.MENU;