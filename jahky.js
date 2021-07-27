const Discord = require("discord.js")
const client = new Discord.Client();
const db = require("quick.db");
const config = require("./config.json");
const map = new Map();
const lımıt = 5;
const TIME = 10000;
const DIFF = 2000;

client.on("ready", () => {
    client.user.setPresence({ activity: { name: "Developed By Jahky" }, status: "dnd" })
    client.channels.cache.get(config.ses).join()
})

client.login(config.token).then(() => console.log(`${client.user.username} Olarak Giriş Yapıldı Bot Aktif Developed By Jahky`)).catch(() => console.log("Bot Giriş Yaparken Bir Hata Oldu"))

client.on('message', async (msg, member) => {
    if (msg.channel.type === "dm") return;

    if (msg.content === 'sa') {

        msg.reply('Aleyküm Selam Hoşgeldin ');
    }

    else if (msg.content === 'sea') {

        msg.reply('Aleyküm Selam Hoşgeldin ');
    }

    else if (msg.content === 'hi') {

        msg.reply('Hi welcome ');
    }


});

client.on('message', async message => {
    if (message.channel.type === "dm") return;
    let reklamlar = ["discord.app", "discord.gg", "discordapp", "discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".cf", ".me", ".in"]
    let kelimeler = message.content.slice(" ").split(/ +/g)

    if (reklamlar.some(word => message.content.toLowerCase().includes(word))) {
 
        if (message.member.hasPermission("ADMINISTRATOR")) return; message.delete()

        db.add(`reklam_${message.author.id}`, 1)
        if (db.fetch(`reklam_${message.author.id}`) === 1)  {
            message.channel.send(`${message.author} Reklam yapmana izin vermem! Eğer 2 kez daha reklam yaparsan seni banlayacağım! (1/3)`).then(jahkyxd => jahkyxd.delete({ timeout: 5000 }))
        }
        if (db.fetch(`reklam_${message.author.id}`) === 2) {
            message.channel.send(`${message.author} Reklam yapmana izin vermem! Eğer 1 kez daha reklam yaparsan seni banlayacağım! (2/3)`).then(jahkyxd => jahkyxd.delete({ timeout: 5000 }))
        }
        if (db.fetch(`reklam_${message.author.id}`) === 3) {
            message.channel.send(`${message.author} Reklam yapma demiştim  bu yüzden seni banladım`)
            client.users.cache.get(message.author.id).send(`${message.author} Reklam yapma demiştim  bu yüzden seni banladım`).catch(err => message.channel.send(`${message.author} Kişisine bilgilendirme mesajı yollayamadım`))
            message.guild.members.ban(message.author.id, {reason: "Jahky Chat Guard"}).catch(err => message.channel.send(`${message.author} Kişisini banlayamadım`))
            db.delete(`reklam_${message.author.id}`)
        }   
    }
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
    let reklamlar = ["discord.app", "discord.gg", "discordapp", "discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".cf", ".me", ".in"]
    let kelimeler = newMsg.content.slice(" ").split(/ +/g)

    if (reklamlar.some(word => newMsg.content.toLowerCase().includes(word))) {
        if (newMsg.member.hasPermission("ADMINISTRATOR")) return; newMsg.delete()
        db.add(`reklam_${message.author.id}`, 1)
        if (db.fetch(`reklam_${message.author.id}`) === 1 ) {
            message.channel.send(`${message.author}, Reklam yapmana izin vermem! Eğer 2 kez daha reklam yaparsan seni banlayacağım! (1/3)`).then(jahkyxd => jahkyxd.delete({ timeout: 5000 }))
        }
        if (db.fetch(`reklam_${message.author.id}`) === 2) {
            message.channel.send(`${message.author}, Reklam yapmana izin vermem! Eğer 1 kez daha reklam yaparsan seni banlayacağım! (2/3)`).then(jahkyxd => jahkyxd.delete({ timeout: 5000 }))
        }
        if (db.fetch(`reklam_${message.author.id}`) === 3) {
            message.channel.send(`${message.author}, Reklam yapma demiştim  bu yüzden seni banladım`)
            client.users.cache.get(message.author.id).send(`${message.author}, Reklam yapma demiştim  bu yüzden seni banladım`).catch(err => message.channel.send(`${message.author} Kişisine bilgilendirme mesajı yollayamadım`))
            message.guild.members.ban(message.author.id, {reason: "Jahky Chat Guard"}).catch(err => message.channel.send(`${message.author} Kişisini banlayamadım`))
            db.delete(`reklam_${message.author.id}`)
        }
    }
});

client.on("message", async msg => {
    if (msg.channel.type === "dm") return;

    const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
    if (kufur.some(word => msg.content.includes(word))) {
        try {
            if (!msg.member.permissions.has("ADMINISTRATOR")) {
                msg.delete();

                return msg.reply('Heey! Küfür Yasak.').then(jahkyxd => jahkyxd.delete({ timeout: 5000 }))
            }
        } catch (err) {
            console.log(err);
        }
    }


});

client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
    if (msg.author.bot) return;
    if (msg.content.length > 1) {
        let caps = msg.content.toUpperCase();
        if (msg.content == caps) {
          if (!msg.member.permissions.has("ADMINISTRATOR")) {
            if (!msg.mentions.users.first()) {
              msg.delete();
              return msg.channel.send(`${msg.member}, Capslock Kapat Lütfen!`).then(jahkyxd => jahkyxd.delete({timeout: 5000}))
                
            }
          }
        }
    }
  });

client.on("messageUpdate", async msg => {


    const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
    if (kufur.some(word => msg.content.includes(word))) {
        try {
            if (!msg.member.permissions.has("ADMINISTRATOR")) {
                msg.delete();

                return msg.reply('Yakaladım Seni! Küfür Yasak.').then(jahkyxd => jahkyxd.delete({ timeout: 5000 }))
            }
        } catch (err) {
            console.log(err);
        }
    }
});

client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.guild) return
    if (message.member.hasPermission("ADMINISTRATOR")) return;
    if (message.member.roles.cache.get(config.mutedrole)) return;
    if (map.has(message.author.id)) {
        const userData = map.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;

        if (difference > DIFF) {
            clearTimeout(timer);
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                map.delete(message.author.id);
            }, TIME);
            map.set(message.author.id, userData)
        }
        else {
            msgCount++;
            if (parseInt(msgCount) === lımıt) {
                const mutedrole = message.guild.roles.cache.get(config.mutedrole)
                message.member.roles.add(mutedrole);
                message.channel.send("Spam  yaptığından dolayı 15 dakika boyunca susturuldun.").then(jahkyxd => jahkyxd.delete({ timeout: 5000 }))

                setTimeout(() => {
                    if (!message.member.roles.cache.get(config.mutedrole)) return;
                    message.member.roles.remove(mutedrole);
                    message.channel.send("Muten açıldı lütfen tekrar spam yapma.").then(jahkyxd => jahkyxd.delete({ timeout: 5000 }))
                }, 900000);//9000000
            } else {
                userData.msgCount = msgCount;
                map.set(message.author.id, userData)
            }
        }
    }
    else {
        let fn = setTimeout(() => {
            map.delete(message.author.id)
        }, TIME);
        map.set(message.author.id, {
            msgCount: 1,
            lastMessage: message,
            timer: fn
        })
    }
});

client.on("message", async message => {
    if (message.author.bot) return;
    if (!message.guild) return
    if (message.member.hasPermission('ADMINISTRATOR')) return;

    if (message.mentions.users.size >= 3) {
        const mutedrole = message.guild.roles.cache.get(config.mutedrole)
        message.member.roles.add(mutedrole);
        message.channel.send("Birden çok kişiyi etiketlediğin için 15 dakika boyunca susturuldun.");
        setTimeout(() => {
            message.member.roles.remove(mutedrole);
            message.channel.send("Muten açıldı lütfen tekrar insanları etiketleme.")
        }, 900000);//9000000
        if (message.deletable) message.delete({ timeout: 0030 }).catch(console.error);
    }
});