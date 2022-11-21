
module.exports = async (client, member) => {
   
   console.log(`${client.user.tag} est en ligne !`);
   client.user.setActivity('Fighting Demons', {
      type: "LISTENING",
   });
};