const { QueryType } = require('discord-player');
const {MESSAGES}=require("../../util/constants");
const {MessageEmbed, ReactionCollector}=require("discord.js")
const nomusic = new MessageEmbed()
.setColor("RED")
.setDescription("❌ **Aucune musique n'est en cours !**")

module.exports.run = async (client, message, args) => {
    const queue = client.player.getQueue(message.guild.id);
       
    if (!queue || !queue.playing) return message.reply({embeds: [nomusic]});

    
    const timestamp = queue.getPlayerTimestamp();

    if (timestamp.progress == 'Infinity') time = `Cette musique est une musique en live ! Il n'y a donc pas de temps associé. 🎧`;
    const progress = queue.createProgressBar();
    let time = `${progress} (**${timestamp.progress}**%)`
    const track = queue.current;
    const methods = ['désactivé', 'track', 'queue'];

const trackDuration = timestamp.progress == 'Forever' ? 'Endless (Live)' : track.duration;
let test = new MessageEmbed()
.setFooter({text: 'Melodya', iconURL: client.user.displayAvatarURL({dynamic: true})})
.setColor('RED')
.setThumbnail(track.thumbnail)
.setTitle(track.title)
.setDescription(`Audio : **${queue.volume}%**\nDurée : **${trackDuration}**\nMode boucle : **${methods[queue.repeatMode]}**\n${track. requestedBy}\n\n${time}`)
.setTimestamp()
let msg = await message.reply({embeds: [test]})
    
    
    // msg.react('🔄')

    // const filterReaction = (reaction, user) => user.id===message.author.id&&!user.bot
    // const collectorReaction = await new ReactionCollector(msg, filterReaction)

    // client.on("messageReactionAdd", async (reaction, user)=>{
    //     if(user.bot) return;
    //     if(reaction.emoji.name==="🔄"){
    //         await msg.edit("Chargement...")
    //         await msg.edit({embeds: [test]})
    //     }
    // })


};

module.exports.help = MESSAGES.COMMANDS.MUSIQUE.NOWPLAYING;