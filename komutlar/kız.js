const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');
const tdb = new db.table("taglılar")
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {

      
    if (!message.member.roles.cache.has(ayarlar.registerhammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayarlar.red)

        

   let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) 
        return message.lineReply(`Kayıt Olacak Kullanıcıyı Belirtmelisin`)


if(member.id === message.author.id) return  message.lineReply('Kendini kayıt edemezsin.')
if(member.id === client.user.id) return  message.lineReply('Botu kayıt edemezsin.')
if(member.id === message.guild.OwnerID) return  message.lineReply('Sunucu sahibini kayıt edemezsin.')
if(member.roles.highest.position >= message.member.roles.highest.position) return message.lineReply(`Bu kullanıcı sizden üst/aynı pozsiyondadır.`)

      let name = args[1]
        if (!name) 
        return message.lineReply(` Kayıt olacak Kullanıcın İsmini Belirtmelisin`)

   
 let taglıalım = await tdb.fetch(`taglıalım.${message.guild.id}`)
if(taglıalım === true){
    if(!member.user.username.includes("")  &&  !member.user.discriminator.includes("") && !member.roles.cache.has(ayarlar.vip) && !member.roles.cache.has(ayarlar.booster)) return message.channel.send(new Discord.MessageEmbed() .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })) .setDescription(`Sunucumuzda taglı alım modu açıktır kayıt olmak için isminize \`\` sembolünü alabilir yada  \`\` Etiketini Alabilir veya \`Boost\` basarak giriş yapabilirsiniz.`))
}
if(["957610112485314581","957610102834212954"].some(erkek => member.roles.cache.has(erkek))) return message.lineReply("Kullanıcı zaten kayıtlı.").then(sil => sil.delete({timeout: 5000}));
 
 await message.guild.members.cache.get(member.id).setNickname(`● ${name}`)
 db.push(`isimler_${member.id}`, ` \`● ${name}\` (<@&kızrolid>) yetkili:${message.author}`);
 db.set(`kayıt_${member.id}`, true)
 db.add(`kız_${message.author.id}`, 1)
 db.add(`toplam_${message.author.id}`, 1)
 await message.guild.members.cache.get(member.id).roles.remove(ayarlar.unregister)
 await message.guild.members.cache.get(member.id).roles.add(ayarlar.kız1)
 const Webhook = new Discord.WebhookClient("957616257551724545", "kkGtKnsqyI0Xfqr2BYcFPuhGURAyDlVReSqZP3mz__c7cbbAXrl7tEk6c8UU1L4XJJ64")
 const tadashi1 = new Discord.MessageEmbed()
 .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
.setColor('#2F3136')
.setDescription(`${member} üyesi başarıyla  ${message.author} yetkilisi tarafından **Kız** olarak kayıt edildi`)
    Webhook.send(tadashi1)
    const Webhook2 = new Discord.WebhookClient("957643016540127272", "sHQYidaejLx2LntCvi14Qze2TFstBC7MjWvbLfLug53eAAZOnu-O3RM1pCYwqmYRYzXe")
    const tadashi2 = new Discord.MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
   .setColor('#2F3136')
   .setDescription(`${member} üyesi başarıyla  ${message.author} yetkilisi tarafından **Kız** olarak kayıt edildi`)
       Webhook2.send(tadashi2)
            }
            exports.conf = {
                aliases: ['k'],
                permLevel: 0,
                kategori: "Moderasyon",
              }; 
              exports.help = {
                name: 'kız',
                description: 'kayıt ediyor yarragım ne bakıyon.',
                usage: 'kayıt ediyor yarragım ne bakıyon',
              };
