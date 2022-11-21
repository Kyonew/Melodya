const { QueryType } = require('discord-player');
const {MESSAGES}=require("../../util/constants");
const {MessageEmbed,ReactionCollector}=require("discord.js")
const noresulr = new MessageEmbed()
.setColor("RED")
.setDescription("❌ **Aucun résultat trouvé !**")
const ok = new MessageEmbed()
.setColor("PURPLE")
.setDescription("**La playlist a bien été supprimée ! <:check1:938895505197502474>**")

module.exports.run = async (client, message, args) => {
    const res = await client.player.search(args.join(' '), {
        requestedBy: message.member,
        searchEngine: QueryType.AUTO
    });

    if (!res || !res.tracks.length) return message.channel.send(`${message.author}, Aucun résultat de la recherche a été trouvé. ❌`);

    const queue = await client.player.createQueue(message.guild, {
        metadata: message.channel
    });
    const embed = new MessageEmbed();
    embed.setColor('PURPLE');
    embed.setTitle(`Résultat pour : ${args.join(' ')}`);
    const maxTracks = res.tracks.slice(0, 5);

    embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} (\`${track.duration}\`)`).join('\n')}\n`);

    embed.setTimestamp();
    embed.setFooter({text: 'Melodya', iconURL: client.user.displayAvatarURL({dynamic: true})});

   let msg = await message.reply({embeds: [embed]})
   msg.react("1️⃣"); msg.react("2️⃣"); msg.react("3️⃣");msg.react("4️⃣");msg.react("5️⃣");msg.react("❌")
    const collector = message.channel.createMessageCollector({
        time: 15000,
        errors: ['time'],
        filter: m => m.author.id === message.author.id
    });
    var x = setTimeout(() => {
        msg.reactions.removeAll()
        const edit = new MessageEmbed()
        .setColor("BLUE")
        .setDescription("⏲ **Les 60 secondes sont écoulées !**")
        msg.edit({embeds: [edit]})
        }, 60000)
    const filterReaction = (reaction, user) => user.id===message.author.id&&!user.bot
    const collectorReaction = await new ReactionCollector(msg, filterReaction)
    collectorReaction.on('collect', async (reaction, user) => {

        let numb = [];
        if(user.id !== message.author.id || user.bot) return;


        switch(reaction._emoji.name){

        case '1️⃣':
            clearTimeout(x)
                msg.reactions.removeAll();
                numb = 1;
        break;
        case '2️⃣':
            clearTimeout(x)
                msg.reactions.removeAll();
                numb = 2;
        break;
        case '3️⃣':
            clearTimeout(x)
            msg.reactions.removeAll();
            numb = 3;
    break;
    case '4️⃣':
        clearTimeout(x)
        msg.reactions.removeAll();
        numb = 4;
break;
case '5️⃣':
    clearTimeout(x)
    msg.reactions.removeAll();
    numb = 5;
break;
case '❌':
    clearTimeout(x)
    msg.reactions.removeAll();
    const cancelembed = new MessageEmbed()
    .setColor("BLUE")
    .setDescription("**Annulé !** <:check1:938895505197502474>")
     msg.edit({embeds: [cancelembed]})
     return;
break;

        }
    
        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await client.player.deleteQueue(message.guild.id);
            return message.channel.send(`${message.author}, je ne peux pas rejoindre le salon ! ❌`);
        }

        await message.channel.send(`Chargement de votre musique. 🎧`);

        queue.addTrack(res.tracks[Number(numb)-1]);
        if (!queue.playing) await queue.play();
    
    });
};

module.exports.help = MESSAGES.COMMANDS.MUSIQUE.SEARCH;