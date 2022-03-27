const Discord = require("discord.js");
const db = require("quick.db")
const ayarlar = require('../ayarlar.json');
const sicil = new db.table("cezalar"); 
const moment = require("moment");
const ms = require('ms');
moment.locale("tr")
exports.run = async (client, message, args,) => {

 
    if (!message.member.roles.cache.has(ayarlar.mutehammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayarlar.red)
 if (args.length < 1) return message.lineReply("Bir üye etiketle ve tekrardan dene!")
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.lineReply("Belirttiğiniz kullanıcı geçerli değil.",)
		if(user.id === message.author.id) return message.lineReply('Kendine Mute atamazsın.')
        if(user.id === client.user.id) return message.lineReply('Bota Mute atamazsın.')
        if(user.id === message.guild.OwnerID) return message.lineReply('Sunucu sahibine Mute atamazsın.')
        if(user.roles.highest.position >= message.member.roles.highest.position) return message.lineReply(`Bu kullanıcı sizden üst/aynı pozsiyondadır.`)
		let reason = args.slice(1).join(" ") || "Sebep Belirtilmedi."
 
const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
    let time = args[1];
    if(!time || !ms(time)) return message.channel.send('Susturma süresini belirtmelisin')
moment.locale("tr")
let yaziSure = time.replace("d", " Gün").replace("h", " Saat").replace("m", " Dakika").replace("s", " Saniye");    
    db.add(`muteAlma.${user.id}`, 1) //User kaç mute yemiş onu sayar
    db.add(`muteAtma.${message.member.id}`, 1) //Yetkili kaçtane mute atmış onu sayar
 //Ceza puan sayma
    db.add(`cpuan${user.id}`, 3)
    db.add(`Cezaİd_`, +1); //Ceza ID sayma
    let cpuan = db.fetch(`cpuan${user.id}`)
    let Cezaİd = db.fetch(`Cezaİd_`) + 1; //Ceza ID veri çekme 
 

moment.locale("tr")
let muteBitiş = `${moment(Date.now()+ms(time)).format("LLL")}` 
moment.locale("tr")
let muteAtılma = `${moment(Date.now()).format("LLL")}`

db.push(`${user.id}_sicil`, `${message.author} tarafından ${reason} sebebiyle ${muteAtılma} tarihinde  yazı kanallarında susturuldu`)
    
    sicil.push(`sicil.${user.id}`, {
        Tip : "Chat Mute",
        Yetkili : message.author.id,
        reason : reason,
        tarih : muteAtılma
    });

    //Ceza ID veri kayıt
    db.set(`cezaBilgi_${Cezaİd}`, {
        sebep: reason,
        kod: Cezaİd,
        yetkili: message.author.id, 
        uyes: user.id,
        bsure: muteAtılma,
        ssure: muteBitiş,
        cezatip: "Chat Mute"
    });
 

  const mutelendi = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setThumbnail(member.user.avatarURL({dynamic: true}))
            .setColor("#2F3136")
            .setDescription(`
            ${user ? user.toString() : user.username}  üyesi ${message.author} Tarafından ${yaziSure} boyunca Chatte Mutelendi!
Ceza Puan:\`${cpuan}\`
Ceza ID: \`#${Cezaİd}\`
Mutelenen Üye: ${user ? user.toString() : ""} \`  ${user.id})\`
Muteleyen Yetkili: ${message.author} \` - ${message.author.id})\`
Chat Mute Atılma Tarihi: \`${muteAtılma}\`
Chat Mute Bitiş Tarihi: \`${muteBitiş}\`
Chat mute Sebebi: \`${reason}\`
            `)
			await client.channels.cache.get(ayarlar.mutelog).send(mutelendi)
    await user.roles.add(ayarlar.muted).catch(e => { })
	
    setTimeout(async () => {
		const mutekalktı = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
			.setThumbnail(member.user.avatarURL({dynamic: true}))
            .setColor("#2F3136")
            .setDescription(`
            ${user ? user.toString() : user.username} üyesi'nin Chat Mutesi Kalktı!

Ceza ID: \`#${Cezaİd}\`
Mutelenen Üye: ${user ? user.toString() : ""} \`  ${user.id})\`
Muteleyen Yetkili: ${message.author} \` - ${message.author.id})\`
Chat Mute Atılma Tarihi: \`${muteAtılma}\`
Chat Mute Bitiş Tarihi: \`${muteBitiş}\`
Chat mute Sebebi: \`${reason}\`
            `)
			await client.channels.cache.get(ayarlar.mutelog).send(mutekalktı)
        await user.roles.remove(ayarlar.muted).catch(e => { })
    }, ms(time));

    message.react(ayarlar.adotik)
			  }
            
	exports.conf = {
    name: "mute",
    aliases: ["chatyargı"],
    enabled: true,
    guildOnly: true
};

exports.help = { 
    name: 'mute', 
    description: 'Boost basanlar isim sag tiksiz degise bilcek.',
    usage: 'rich <isim>',
    kategori: 'kullanıcı'
};
