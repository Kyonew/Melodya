const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../util/constants");
const { Guild, User } = require("../../models/main");
const nomusic = new MessageEmbed()
.setColor("RED")
.setDescription("❌ **Veuillez préciser une musique à enregistrer**")
const userr = require("../../models/user")
module.exports.run = async (client, message, args, member) => {


  const music = args.slice(0).join(" ");
  const queue = client.player.getQueue(message.guild.id);
  const user =  await client.getUser(message.member)

  if(!music && !queue) return message.reply({embeds: [nomusic]})

    if(!user && music) {
      await client.createUser({
        userID: message.member.id,
        savesongs: music
      }).then()



//   setTimeout(async() => {
//     console.log(`${TEST.userID} est bien l'user ID tu membre.` )
//   }, 8000)
// } else return message.reply('Déja une playlist de creer')


  // const user = userr.find({ userID: message.member.id })
  // console.log(user)

  // if(!user) return (console.log("Nous n'avons rien trouvé dans la bdd"))

}
};
  

module.exports.help = MESSAGES.COMMANDS.SAVESONG.SAVE;