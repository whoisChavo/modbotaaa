const Discord = require("discord.js");
require("discord-reply")
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const fs = require("fs");
const moment = require("moment");
moment.locale("tr")
const chalk = require("chalk");
require("./util/eventLoader")(client);
const express = require("express");
const app = express();
const http = require("http");

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);};
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err); log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {let props = require(`./komutlar/${f}`);log(`Yüklenen komut: ${props.help.name}.`);client.commands.set(props.help.name, props);props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try { delete require.cache[require.resolve(`./komutlar/${command}`)];let cmd = require(`./komutlar/${command}`);client.commands.delete(command);client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);});
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {let cmd = require(`./komutlar/${command}`);client.commands.set(command, cmd);cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {delete require.cache[require.resolve(`./komutlar/${command}`)];let cmd = require(`./komutlar/${command}`);client.commands.delete(command);client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);}
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;}
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});


client.on("messageDelete", async message => {
	const Webhook = new Discord.WebhookClient("957729906777784360", "v4JTX8jk05rVpQfKXHSw64Sk0B551wgCKyTSzsAGgskN4ZCgR393wk38iENz4mYLQydm")
 {
  if (message.author.bot || message.channel.type == "dm") return;
const adoş = new Discord.MessageEmbed()
  if (message.attachments.first()) {
    Webhook.send(adoş.setAuthor(message.author.tag ,message.author.avatarURL({ dynamic: true, size: 2048 })).setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })).setDescription(`<@!${message.author.id}> üyesi <#${message.channel.id}> kanalında  fotoğrafını sildi. 

**Fotoğraf İçeriği:** `).setImage(message.attachments.first().proxyURL
).setColor("#2F3136"));
    } else {
      Webhook.send(adoş.setAuthor(message.author.tag , message.author.avatarURL({ dynamic: true, size: 2048 })).setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 })).setDescription(`<@!${message.author.id}> üyesi <#${message.channel.id}> kanalında mesajını sildi.

 **Mesaj İçeriği:** \`${message.content}\`
 

\`Kanal: ${message.channel.name} (${message.channel.id})
Kullanıcı: ${message.author.tag} (${message.author.id})
Mesaj id : (${message.id})\`

`).setColor("#2F3136"));
    }}
});
client.on('messageUpdate', async (oldMessage, newMessage) => {
  const Webhook = new Discord.WebhookClient("957729906777784360", "v4JTX8jk05rVpQfKXHSw64Sk0B551wgCKyTSzsAGgskN4ZCgR393wk38iENz4mYLQydm")
 {
const arxEmb = new Discord.MessageEmbed()
    if (oldMessage.author.bot) return;
    if (!oldMessage.guild) return;
    if (oldMessage.content == newMessage.content) return;

    Webhook.send(arxEmb.setAuthor(`${oldMessage.author.tag}`, oldMessage.author.avatarURL({ dynamic: true, size: 2048 })).setThumbnail(oldMessage.author.avatarURL({ dynamic: true, size: 2048 })).setDescription(`<@!${oldMessage.author.id}> üyesi <#${oldMessage.channel.id}> kanalında mesajını düzenledi.

**Eski Mesaj:** \`${oldMessage.content}\`
**Yeni Mesaj:** \`${newMessage.content}\`

\`Kanal: ${oldMessage.channel.name} (${oldMessage.channel.id})
Kullanıcı: ${oldMessage.author.tag} (${oldMessage.author.id})
Mesaj id : (${oldMessage.id})\`
`).setColor("#2F3136"));
  }}
);

client.on('guildMemberAdd', async member => {
  var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
  var üs = üyesayısı.match(/([0-9])/g)
  üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
  if(üs) {
    üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
      return {
'0': `<a:mhykol000:957648679311904798>`,
'1': `<a:mhykol001:957648724249677855>`,
'2': `<a:mhykol002:957648772190588928>`,
'3': `<a:mhykol003:957648854268936256>`,
'4': `<a:mhykol004:957648918848614430>`,                       
'5': `<a:mhykol005:957648961857003562>`,
'6': `<a:mhykol006:957649119764181007>`,
'7': `<a:mhykol007:957649119764181007>`,
'8': `<a:mhykol008:957649119764181007>`,
'9': `<a:mhykol009:957649119764181007>`}[d];
        })
      }
member.roles.add("957605732151345172")
const Webhook = new Discord.WebhookClient("957643016540127272", "sHQYidaejLx2LntCvi14Qze2TFstBC7MjWvbLfLug53eAAZOnu-O3RM1pCYwqmYRYzXe")
let user = client.users.cache.get(member.id);
const kurulus = new Date().getTime() - user.createdAt.getTime(); 
var kontrol;
  if (kurulus < 1296000000) kontrol = '<:ado_no:924013360754851880>'
  if (kurulus > 1296000000) kontrol = '<:ado_okey:924013362772328528>'
  moment.locale("tr");
  Webhook.send(`<a:rozet:874504803823280199> **__The Vienna'__** Sunucumuza Hoşgeldin! <@${member.id}>

<a:rozet:874504803823280199> Seninle birlikte sunucumuz toplam **${üyesayısı}** kişiye ulaşmış bulunmakta <@&957600841559343144> yetkili arkadaşlarım seninle ilgilenecektir.

<a:rozet:874504803823280199> Hesabın ${moment(member.user.createdAt).format("Do MMMM YYYY hh:mm")} (${moment(member.user.createdTimestamp).fromNow()})  Tarihinde oluşturulmuş.

<a:rozet:874504803823280199> Tagımıza ulaşmak için **".tag", "!tag", "tag"** komutlarını kullanman yeterli!
`);             
});



client.on("userUpdate", async function(oldUser, newUser) { 
  const guildID = "957406468599087105"//sunucu
  const roleID = "942204624004317304"//taglırolü
  const tag = "Vienna"//tag 
  const log2 = '957725572837023824' // log kanalı
  const guild = client.guilds.cache.get(guildID)
  const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
  const member = guild.members.cache.get(newUser.id)
  if (newUser.username !== oldUser.username) {
      if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
          member.roles.remove(roleID)
          client.channels.cache.get(log2).send(` ${newUser} isminden tagımızı ıkararak ailemizden ayrıldı!`)
      } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
          member.roles.add(roleID)
          client.channels.cache.get(log2).send(`  ${newUser} ismine tagımızı alarak ailemize katıldı`)
      }
  }
})
client.on("userUpdate", async function(oldUser, newUser) { 
  const guildID = "957406468599087105"//sunucu
  const roleID = "957599853674921994"//taglırolü
  const tag = "ᛠ"//tag 
  const log2 = '957725572837023824' // log kanalı
  const guild = client.guilds.cache.get(guildID)
  const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
  const member = guild.members.cache.get(newUser.id)
  if (newUser.username !== oldUser.username) {
      if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
          member.roles.remove(roleID)
          client.channels.cache.get(log2).send(` ${newUser} isminden tagımızı çıkararak ailemizden ayrıldı!`)
      } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
          member.roles.add(roleID)
          client.channels.cache.get(log2).send(`  ${newUser} ismine tagımızı alarak ailemize katıldı`)
      }
  }})

  client.on("userUpdate", async function(oldUser, newUser) { 
    const guildID = "957406468599087105"//sunucu
    const roleID = "942204624004317304"//taglırolü
    const tag = "vienna"//tag 
    const log2 = '957725572837023824' // log kanalı
    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(log2).send(` ${newUser} isminden tagımızı ıkararak ailemizden ayrıldı!`)
        } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            member.roles.add(roleID)
            client.channels.cache.get(log2).send(`  ${newUser} ismine tagımızı alarak ailemize katıldı`)
        }
    }
  })

client.on('message', msg => {
  if (msg.content === '.tag' || msg.content=="!tag" || msg.content== "tag") {
      msg.lineReply(`ᛠ\nVienna`); 
  }
});



client.login(ayarlar.token);
