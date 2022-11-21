const { QueryType } = require('discord-player');
const {MESSAGES}=require("../../util/constants");
const {MessageEmbed,MessageActionRow,MessageSelectMenu}=require("discord.js")
const nomusic = new MessageEmbed()
.setColor("RED")
.setDescription("❌ **Aucune musique n'est en cours !**")

module.exports.run = async (client, message, args) => {
    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({embeds: [nomusic]});
     const track = queue.current;
         const actualFilter = queue.getFiltersEnabled()[0];
          const row = new MessageActionRow()
         .addComponents(
             new MessageSelectMenu()
             .setCustomId('select')
             .setPlaceholder('Selectionnez le filtre')
             .addOptions([
                 {
                     label: "8D",
                     description: "La musique tourne autour de vous !",
                     value: "first",
                     emoji: "<:8dmusic:939829755107217438>"
                 },
                 {
                     label: "Bassboost",
                     description: "Les bass, on adore ça.",
                     value: "second",
                     emoji: "<:bassboost:939831016204427317>"
                 },
                 {
                     label: "Nightcore",
                     description: "Applique un filtre nightcore",
                     value: "third",
                     emoji: "<:nightcore:939831439384518689>"
                 },
                 {
                     label: "Karaoke",
                     description: 'Faites vos meilleures prestations!',
                     value: 'four',
                     emoji: "<:karaoke:944283990691561504>"
                 }
             ])
         )
        

        const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setTitle("<:filtermusic:939831766951288873> Filtres de musique")
        .setDescription("Vous trouverez les filtres disponibles dans le menu déroulant !\nBonne écoute ;)")
        .setFooter({text: "Melodya Filter", iconURL: client.user.displayAvatarURL({dynamic: true})})
        let sendmsg = await message.reply({embeds: [embed], components: [row]})
      
        const collector = message.channel.createMessageComponentCollector({
        componentType: "SELECT_MENU"
    })
    let filter = [];
    collector.on('collect', async (collected, user)=>{
		if(queue.current !== track) return;
        const filters = [];
        queue.getFiltersEnabled().map(x => filters.push(x));
        queue.getFiltersDisabled().map(x => filters.push(x));

        const value = collected.values[0]
        if(message.author.bot) return;       
        const dembed = new MessageEmbed()
        .setColor("PURPLE")
        .setDescription(`Le filtre **8D** a été ${queue.getFiltersEnabled().includes('8D') ? 'désactivé' : 'activé'} avec succès ! <:check1:938895505197502474>`)
        const bassembed = new MessageEmbed()
        .setColor("PURPLE")
        .setDescription(`Le filtre **bassboost** a été ${queue.getFiltersEnabled().includes('bassboost') ? 'désactivé' : 'activé'} avec succès ! <:check1:938895505197502474>`)
        const nightcoreembed = new MessageEmbed()
        .setColor("PURPLE")
        .setDescription(`Le filtre **nightcore** a été ${queue.getFiltersEnabled().includes('nightcore') ? 'désactivé' : 'activé'} avec succès ! <:check1:938895505197502474>`)
        const karaokeembed = new MessageEmbed()
        .setColor("PURPLE")
        .setDescription(`Le filtre **karaoke** a été ${queue.getFiltersEnabled().includes('karaoke') ? 'désactivé' : 'activé'} avec succès ! <:check1:938895505197502474>`)
        if(value === "first") {
           filter = '8D'
           sendmsg.edit({embeds: [dembed], ephemeral:true})
        }
        
        if(value === "second") {
            filter = 'bassboost'
            sendmsg.edit({embeds: [bassembed], ephemeral:true})
        }

        if(value === "third") {
            filter = 'nightcore'
            sendmsg.edit({embeds: [nightcoreembed], ephemeral:true})
        } 

        if(value === "four") {
            filter = 'karaoke'
            sendmsg.edit({embeds: [karaokeembed], ephemeral:true})
        } 
        collected.deferUpdate() 
        const filtersUpdated = {};
 
        filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

        await queue.setFilters(filtersUpdated);
       })        
};

module.exports.help = MESSAGES.COMMANDS.MUSIQUE.FILTER;