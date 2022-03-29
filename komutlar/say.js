const { MessageEmbed } = require('discord.js')
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
  if(!message.member.roles.cache.has(ayarlar.registerhammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayarlar.red)
  var bot = message.guild.members.cache.filter(s => s.voice.channel && s.user.bot).size
   var tag = message.guild.members.cache.filter(m => m.user.username.includes("ᛠ")).size 
   var tag1 = message.guild.members.cache.filter(m => m.user.username.includes("vienna")).size 
   var tag2 = message.guild.members.cache.filter(m => m.user.username.includes("Vienna")).size 
  var etiket =  message.guild.members.cache.filter(s => !s.bot).filter(member => member.user.discriminator == "").size;
    var taglı = message.guild.members.cache.filter(s => !s.bot).filter(member => member.roles.cache.get("957599853674921994")).size; 
    let tagtotal = tag + tag2;
        var toplamüye = message.guild.memberCount
        var online = message.guild.members.cache.filter(off => off.presence.status !== 'offline').size
        var Sesli = message.guild.members.cache.filter(s => s.voice.channel).size;
        var boost = message.guild.premiumSubscriptionCount
        var boostlevel = message.guild.premiumTier
        message.lineReply(new MessageEmbed()
            .setDescription(`\`❯\` Toplam \**${toplamüye}\** kişi Vienna'nın Kanatları Altında.
            \`❯\` Seste toplam \**${Sesli}\** Üye Bulunmakta.
            \`❯\` Toplam \**${tagtotal}\** kişi ailemize katılmış!
            \`❯\` Sunucumuzda Toplam \**${boost}\** Boost Bulunmakta (**${boostlevel}.seviye**).
`) 
            )
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["say"],
    permLevel: 0,
  }
  exports.help = {
    name: "say"
  };
