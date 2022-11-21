const { Collection, MessageEmbed } = require('discord.js');
const Discord = require("discord.js");

module.exports = async (client, message) => {
  
  const settings = await client.getGuild(message.guild);
  if (message.channel.type === "dm") return client.emit("directMessage", message);
  if (!message.content.startsWith(settings.prefix) || message.author.bot) return;

  const args = message.content.slice(settings.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const user = message.mentions.users.first();

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
  if(!command) return;

  const nopermembed = new MessageEmbed()
  .setColor('#FF0000')
  .setDescription('**❌ Oh! Désolé mais tu n\'as pas la permission d\'effectuer cette commande...**')
  if (command.help.permissions && !message.member.permissions.has(new Discord.Permissions(Discord.Permissions.FLAGS.MANAGE_GUILD))) return message.reply({embeds: [nopermembed]});

  if (command.help.args && !args.length) {
  let noArgsReplyAdd;
  if (command.help.usage) {
    noArgsReplyAdd = `\n\nIl manque un argument à ta commande !\n**Si t'as un p'tit soucis, j'te montre comment l'utiliser comme un/e pro 👇 **\n\n\`${settings.prefix}${command.help.name} ${command.help.usage}\``
  }
  
    let noArgsReply = new MessageEmbed()
  .setColor('#00BFFF')
  noArgsReply.setFooter({
    text: "Melodya | Help", 
    iconURL: client.user.displayAvatarURL({dynamic: true})
    })
    .setTitle("<:attention:938433850005139456> Attention !")
    .setDescription(`${noArgsReplyAdd}`)

  
  return message.reply({embeds: [noArgsReply]});
};

  const mentionuser = new MessageEmbed()
  .setColor('#FF0000')
  .setDescription('**❌ Il faut mentionner un utilisateur**')
  if (command.help.isUserAdmin && !user) return message.reply({embeds: [mentionuser]});
  
  if (command.help.isUserAdmin && message.guild.member(user).hasPermission('MANAGE_MESSAGES')) return message.reply("Tu ne peux pas utiliser cette commande sur cet utilisateur");
  

  if (!client.cooldowns.has(command.help.name)) {
    client.cooldowns.set(command.help.name, new Collection());
  };

  const timeNow = Date.now();
  const tStamps = client.cooldowns.get(command.help.name);
  const cdAmount = (command.help.cooldown || 5) * 1000;

  if (tStamps.has(message.author.id)) {
    const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;
    
    if (timeNow < cdExpirationTime) {
      timeLeft = (cdExpirationTime - timeNow) / 1000;
      const timeleftembed = new MessageEmbed()
      .setColor('ORANGE')
      .setDescription(`**Ne spam pas ! Réessaie dans \`${timeLeft.toFixed()}\` seconde(s)**`)
      return message.reply({embeds: [timeleftembed]});
    }
  }

  tStamps.set(message.author.id, timeNow);
  setTimeout(() => tStamps.delete(message.author.id), cdAmount);

  command.run(client, message, args, settings);
}