const { QueryType } = require('discord-player');
const {MESSAGES}=require("../../util/constants");
const {pagination} = require("reconlx");
const {MessageEmbed,ReactionCollector}=require("discord.js")
const nomusic = new MessageEmbed()
.setColor("RED")
.setDescription("❌ **Aucune musique n'est en cours !**")
const nomus = new MessageEmbed()
.setColor("BLUE")
.setDescription("❌ **Il n'y a plus de musique après !**")
const ok = new MessageEmbed()
.setColor("PURPLE")
.setDescription("**La playlist a bien été supprimée ! <:check1:938895505197502474>**")

module.exports.run = async (client, message, args) => {
    const queue = client.player.getQueue(message.guild.id);

 
    if (!queue || !queue.playing) return message.reply({embeds: [nomusic]});

    if (!queue.tracks[0]) return message.reply({embeds: [nomus]});

    const methods = ['🔁', '🔂'];
    const tracks = queue.tracks.map((track, i) => `**${i + 1}** - **${track.title}** *(demandée par <@${track. requestedBy.id}>)*`);
    const songs = queue.tracks.length;
  
  const pgun = new MessageEmbed()
   .setColor('PURPLE')
    .setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }))
    .setTitle(`<:music1:939268890301714492> Liste d'attente | ${songs} entrées`)
    .setDescription(`__Voici les musiques en attente :__\n\n${tracks.slice(0, 10).join('\n')}\n`)
    .setTimestamp()
    
    const pgdeux = new MessageEmbed()
    .setColor('PURPLE')
     .setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }))
     .setTitle(`<:music1:939268890301714492> Liste d'attente | ${songs} entrées`)
     .setDescription(`__Voici les musiques en attente :__\n\n${tracks.slice(10, 20).join('\n')}\n`)
     .setTimestamp()
     
     const pgtrois = new MessageEmbed()
     .setColor('PURPLE')
      .setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }))
      .setTitle(`<:music1:939268890301714492> Liste d'attente | ${songs} entrées`)
      .setDescription(`__Voici les musiques en attente :__\n\n${tracks.slice(20, 30).join('\n')}\n`)
      .setTimestamp()
      
      const pgquatre = new MessageEmbed()
      .setColor('PURPLE')
       .setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }))
       .setTitle(`<:music1:939268890301714492> Liste d'attente | ${songs} entrées`)
       .setDescription(`__Voici les musiques en attente :__\n\n${tracks.slice(30, 40).join('\n')}\n`)
       .setTimestamp()
       
       const pgcinq = new MessageEmbed()
       .setColor('PURPLE')
        .setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }))
        .setTitle(`<:music1:939268890301714492> Liste d'attente | ${songs} entrées`)
        .setDescription(`__Voici les musiques en attente :__\n\n${tracks.slice(40, 50).join('\n')}\n`)
        .setTimestamp()
        
        const pgsix = new MessageEmbed()
   .setColor('PURPLE')
    .setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }))
    .setTitle(`<:music1:939268890301714492> Liste d'attente | ${songs} entrées`)
    .setDescription(`__Voici les musiques en attente :__\n\n${tracks.slice(50, 60).join('\n')}\n`)
    .setTimestamp()
    
    const pgsept = new MessageEmbed()
    .setColor('PURPLE')
     .setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }))
     .setTitle(`<:music1:939268890301714492> Liste d'attente | ${songs} entrées`)
     .setDescription(`__Voici les musiques en attente :__\n\n${tracks.slice(60, 70).join('\n')}\n`)
     .setTimestamp()
     
     const pghuit = new MessageEmbed()
     .setColor('PURPLE')
      .setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }))
      .setTitle(`<:music1:939268890301714492> Liste d'attente | ${songs} entrées`)
      .setDescription(`__Voici les musiques en attente :__\n\n${tracks.slice(70, 80).join('\n')}\n`)
      .setTimestamp()
      
      const pgneuf = new MessageEmbed()
      .setColor('PURPLE')
       .setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }))
       .setTitle(`<:music1:939268890301714492> Liste d'attente | ${songs} entrées`)
       .setDescription(`__Voici les musiques en attente :__\n\n${tracks.slice(80, 90).join('\n')}\n`)
       .setTimestamp()
     
       let sonps = [];
       if(songs > 100) {sonps=`Et encore **${songs - 100}** sons...`}

       const pgdix = new MessageEmbed()
       .setColor('PURPLE')
        .setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }))
        .setTitle(`<:music1:939268890301714492> Liste d'attente | ${songs} entrées`)
        .setDescription(`__Voici les musiques en attente :__\n\n${tracks.slice(90, 100).join('\n')}\n\n${sonps}`)
        .setTimestamp()
  

        let embedsp;
        if(songs <= 10) {embedsp= [pgun] }
        if(songs > 10) {embedsp=[pgun, pgdeux]}
        if(songs > 20) {embedsp=[pgun, pgdeux, pgtrois]}
        if(songs > 30) {embedsp=[pgun, pgdeux, pgtrois, pgquatre]}
        if(songs > 40) {embedsp=[pgun,pgdeux,pgtrois,pgquatre,pgcinq]}
        if(songs > 50) {embedsp=[pgun,pgdeux,pgtrois,pgquatre,pgcinq, pgsix]}
        if(songs > 60) {embedsp=[pgun,pgdeux,pgtrois,pgquatre,pgcinq, pgsix, pgsept]}
        if(songs > 70) {embedsp=[pgun,pgdeux,pgtrois,pgquatre,pgcinq, pgsix, pgsept, pghuit]}
        if(songs > 80) {embedsp=[pgun,pgdeux,pgtrois,pgquatre,pgcinq, pgsix, pgsept, pghuit, pgneuf]}
        if(songs > 90) {embedsp=[pgun,pgdeux,pgtrois,pgquatre,pgcinq, pgsix, pgsept, pghuit, pgneuf, pgdix]}



  pagination({
    embeds: embedsp,
    channel: message.channel,
    author: message.author,
    fastSkip: true
  })


};

module.exports.help = MESSAGES.COMMANDS.MUSIQUE.QUEUE;