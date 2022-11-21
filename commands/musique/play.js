const { QueryType } = require('discord-player');
const {MESSAGES}=require("../../util/constants");
const {MessageEmbed}=require("discord.js")
const nojoin=new MessageEmbed()
.setColor("RED")
.setDescription("❌ **Je ne peux pas rejoindre le salon vocal !**")
const noresult = new MessageEmbed()
.setColor("RED")
.setDescription("❌ **Aucun résultat trouvé !**")
module.exports.run = async (client, message, args) => {


        const res = await client.player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.reply({embeds: [noresult]});

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await client.player.deleteQueue(message.guild.id);
            return message.reply({embeds: [nojoin]});
        }

        await message.reply(`Chargement de ${res.playlist ? 'votre playlist' : 'vos musiques'}... 🎧`);

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
};

module.exports.help = MESSAGES.COMMANDS.MUSIQUE.PLAY;