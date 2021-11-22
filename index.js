const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client({disableEveryone: true});
var weather = require('weather-js');
const { Client } = require("discord.js-commando");

bot.on("ready", async() => {
    console.log(`${bot.user.username} elindult!`)

    let státuszok = [
        "Prefix: !",
        "Készítő: Zsombor#8007",
        "Play-Day Arcade"
    ]

    setInterval(function() {
        let status = státuszok[Math.floor(Math.random()* státuszok.length)]

        bot.user.setActivity(status, {type: "WATCHING"})
    }, 3000)
})


bot.on("message", async message => {
    let MessageArray = message.content.split(" ");
    let cmd = MessageArray[0];
    let args = MessageArray.slice(1);
    let prefix = botconfig.prefix;

    if(cmd === `${prefix}hello`){
        message.channel.send("Szia");
    }


    if(cmd === `${prefix}teszt`){
        let TesztEmbed = new Discord.MessageEmbed()
        .setColor("#98AA12")
        .setAuthor(message.author.username)
        .setTitle("Teszt Embed!")
        .addField("Irodalom:", "Líra\n Epika\n dráma")
        .setThumbnail(message.author.displayAvatarURL())
        .setImage(message.guild.iconURL())
        .setDescription(`\`${prefix}\``)
        .setFooter(`${botname} | ${message.createdAt}`)

        message.channel.send(TesztEmbed)
    }

    if(cmd === `${prefix}szöveg`){
        let szöveg = args.join(" ");

        if(szöveg) {
            let dumaEmbed = new Discord.MessageEmbed()
        .setColor("#98AA12")
        .setAuthor(message.author.username)
        .addField("Szöveg:", szöveg)
        .setFooter(`${botname} | ${message.createdAt}`)
    
        message.channel.send(dumaEmbed)
        } else {
            message.reply("írj szöveget!")
        }
    }

    /////////////////////////////////
    //// LOGIKAI OPERÁTOROK TIPP ////
    //////////////////////////////////////////////////////////
    //                                                      //
    //   || vagy , PL: if(X=1 || X=3)                       //
    //                                                      //
    //   && és , PL: if(X=5 && Y=3)                         //
    //                                                      //
    //   = sima egyenlő jel , PL: if(5=5)                   //
    //   ==  egyenlő jel , PL: if(X==5)                     //
    //   >= nagyobb vagy egyenő , PL: if(X >= 3)            //
    //   <= kisebb vagy egyenlő , PL: if(X <= 3)            //
    //   ! tagadás , PL if(X != 2)                          //
    //                                                      //
    //////////////////////////////////////////////////////////

    if(cmd === `${prefix}kick`){
        let kick_user = message.mentions.members.first();
        if(args[0] && kick_user){

            if(args[1]){

                let KickEmbed = new Discord.MessageEmbed()
                .setTitle("KICK")
                .setColor("RED")
                .setDescription(`**Kickelte:** ${message.author.tag}\n**Kickelve lett:** ${kick_user.user.tag}\n**Kick indoka:** ${args.slice(1).join(" ")}`)

            message.channel.send(KickEmbed);

                kick_user.kick(args.slice(1).join(" "));

            } else {
            let parancsEmbed = new Discord.MessageEmbed()
            .setTitle("Parancs használata:")
            .addField(`\`${prefix}kick <@név> [indok]\``, "˘˘˘")
            .setColor("BLUE")
            .setDescription("HIBA: Kérlek adj meg egy indokot!!")

            message.channel.send(parancsEmbed);
            }

        } else {
            let parancsEmbed = new Discord.MessageEmbed()
            .setTitle("Parancs használata:")
            .addField(`\`${prefix}kick <@név> [indok]\``, "˘˘˘")
            .setColor("BLUE")
            .setDescription("HIBA: Kérlek említs meg egy embert!")

            message.channel.send(parancsEmbed);

        }
    }


    if(cmd === `${prefix}ban`){
        let ban_user = message.mentions.members.first();
        if(args[0] && ban_user){

            if(args[1]){

                let BanEmbed = new Discord.MessageEmbed()
                .setTitle("BAN")
                .setColor("RED")
                .setDescription(`**Banolta:** ${message.author.tag}\n**Banolva lett:** ${kick_user.user.tag}\n**Ban indoka:** ${args.slice(1).join(" ")}`)

            message.channel.send(BanEmbed);

                ban_user.ban(args.slice(1).join(" "));

            } else {
            let parancsEmbed = new Discord.MessageEmbed()
            .setTitle("Parancs használata:")
            .addField(`\`${prefix}ban <@név> [indok]\``, "˘˘˘")
            .setColor("BLUE")
            .setDescription("HIBA: Kérlek adj meg egy indokot!!")

            message.channel.send(parancsEmbed);
            }

        } else {
            let parancsEmbed = new Discord.MessageEmbed()
            .setTitle("Parancs használata:")
            .addField(`\`${prefix}ban <@név> [indok]\``, "˘˘˘")
            .setColor("BLUE")
            .setDescription("HIBA: Kérlek említs meg egy embert!")

            message.channel.send(parancsEmbed);

        }
    }

    if(cmd === `${prefix}weather`){
        if(args[0]){
            weather.find({search: args.join(" "), degreeType: "C"}, function(err, result) {
                if (err) message.reply(err);

                if(result.length === 0){
                    message.reply("Kérlek adj meg egy létező település nevet!")
                    return;
                }

                let current = result[0].current;
                let location = result[0].location;

                let WeatherEmbed = new Discord.MessageEmbed()
                .setDescription(`**${current.skytext}**`)
                .setAuthor(`Időjárás itt: ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor("GREEN")
                .addField("Időzóna:", `UTC${location.timezone}`, true)
                .addField("Fokozat típusa:", `${location.degreetype}`, true)
                .addField("Hőfok", `${current.temperature}°C`, true)
                .addField("Hőérzet:", `${current.feelslike}°C`, true)
                .addField("Szél", `${current.winddisplay}`, true)
                .addField("Páratartalom:", `${current.humidity}%`, true)

                message.channel.send(WeatherEmbed);
            })

        } else {
            message.reply("Kérlek adj meg egy település nevet!")
        }
    }


    let ticket_category_id = "909455202912989195"
let ticket_role_id = "909455458144751687"
let support_role_id = "909458885138595841"

if(cmd === `${prefix}ticket`) {
    let random_num = Math.floor(Math.random() * 999)

    if (!message.member.roles.cache.has(ticket_role_id)){
        message.guild.channels.create(`ticket${random_num}`, {
            type: "text",
            parent: ticket_category_id,
            permissionOverwrites: [
                {
                    id: message.guild.id,
                    deny: ["VIEW_CHANNEL"]
                },
                {
                    id: message.author.id,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "ADD_REACTIONS"]
                },

                {
                    id: support_role_id,
                    allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "ADD_REACTIONS"]
                }
            ]
        }).then(async (channels) => {
            channels.send(`Szia <@${message.author.id}>! A supportok hamarosan felveszik veled a kapcsolatot. Kérjük légy türelmes!`)
        })

        message.member.roles.add(ticket_role_id);
    } else {
        message.reply("Neked már van egy ticketed!")
    }
}

if(cmd === `${prefix}close`){
    if (message.member.roles.cache.has(support_role_id) || message.member.hasPermission("ADMINISTRATOR" || "BAN_MEMBERS")){
        let ping_member = message.mentions.members.first()
        let ping_channel = message.mentions.channels.first()



        if(args[0] && args[1] && ping_member  && ping_channel && ping_member.roles.cache.has(ticket_role_id)) {
            ping_member.roles.remove(ticket_role_id)
            ping_channel.delete()
        } else {
            message.reply(`Kérlek olyan embert említs meg akin van @Ticket rang! Helyes használat: ${prefix} close <#csatorna>`)
        }
    } else {
        message.reply("Nincs jogosultságod a parancs használatához!")
    }
}

//const rang_id = "909458885138595841"
//const rang_id2 = "911345176948125776"

if(cmd === `${prefix}clear`){
    if(message.member.hasPermission("KICK_MEMBERS")){
        if(message.guild.member(bot.user).hasPermission("ADMINISTRATOR")){
            
            if(args[0] && isNaN(args[0]) && args[0] <= 100 || 0 < args[0] && args[0] < 101){

                message.channel.send(`${Math.round(args[0])}`);

                message.channel.bulkDelete(Math.round(args[0]))

            } else {
                message.reply(`Használat: ${prefix}clear <szám>`)
            }

        } else message.reply("A botnak megfefelő rangban kell lennie a parancs végrehajtásához!")
        
    } else message.reply("Nincs jogod a parancs használatához!")

}

bot.on('guildMemberAdd', member =>{
    //This is the welcome code
    const channel = member.guild.channels.cache.find(channel => channel.name === "általános"); //You can change welcome to any text channel you want, "general", "new-doods", ect.
    if(!channel) return;

    channel.send(`●▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬●\nSzió ! ${member} köszönjük hogy be léptél a szerverünkre!Ha bármi kérdésed van kérdezz bátran!Ha van lehetőséged fusd át a szabályok szobát!😘\n●▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬●!`)
});



/**const tag_role = "911345112540385300"
const channelId = "911639523358822430"
let message1 = `Üdvözöllek <@${member.id}> a Play-Day Arcade szerverén!`
    const newLocal = "guildMemberAdd";
bot.on(newLocal , function (member) {
    message.channel.send(message1)
    message.roles.add(tag_role)
});**/
const tag_role = "911345112540385300"
/**bot.on("GUILD_MEMBER_ADD", function (member) {
        const channelId = member.guild.systemChannelID;

        if (!channelId)
            return;

        let message = `Üdvözöllek <@${member.id}> a Play-Day Arcade szerverén!`;

        member.roles.add(tag_role);

        const channel = member.guild.channels.cache.get(channelId);
        channel.send(message);
    })

/**const SUGGESTION_CHANNEL = "911953152306184203"
if (message.channel.id === SUGGESTION_CHANNEL) {
    let embed = new Discord.RichEmbed()
    .setAuthor(message.member.nickname ? message.member.nickname : message.author.tag,message.author.displayAvatarURL)
    .setColor(0x2894C2)
    .setTitle('Ötlet')
    .setDescription(message.content)
    .setTimestamp(new Date());
    message.channel.send(embed).then((message) => {
      const sent = message;
      sent.react('👍').then(() => {
        sent.react('👎').then(() => {
        }).catch(console.error);
      }).catch(console.error);
    }).catch(console.error);
    return message.delete();
  }**/
  const SUGGESTION_CHANNEL = "911953152306184203"
    if(cmd === `${prefix}ötlet`){
      message.delete()
        const newLocal = message.content;
    let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username,message.author.avatarURL())
    .setColor("GREEN")
    .setDescription(`${args}`)
    .setFooter(``)
    .setTimestamp()
    message.channel.send(embed).then(msg => {
      msg.react('👍').then( r => {
        msg.react('👎')
      })
    })
    }

    const hp1 = "912022977665720422"
    const hp2 = "912257834014629888"
    const hp3 = "912257889110986763"

    let Tulaj = "909391803759886396"
    let Altulaj = "912318167659986944"
    let ArcadeV = "912318230041882674"
    if(cmd === `${prefix}hp1`){
    if (message.member.roles.cache.has(Tulaj, Altulaj, ArcadeV) || message.member.hasPermission("ADMINISTRATOR" || "BAN_MEMBERS")){
        let role_member1 = message.mentions.members.first();
        if(args[0] && role_member1){

            
            let HP1Embed = new Discord.MessageEmbed()
            .setTitle("Hibapont 1")
            .setColor("GREEN")
            .setDescription(`${role_member1.user.tag}\n kapott egy hibapontot!`)

        message.channel.send(HP1Embed);

            role_member1.roles.add(hp1)
        }
    } else message.reply("Nincs jogosultságod a parancs használatához!")
    }
    if(cmd === `${prefix}hp2`){
        if (message.member.roles.cache.has(Tulaj) || message.member.hasPermission("ADMINISTRATOR" || "BAN_MEMBERS")){
        let role_member1 = message.mentions.members.first();
        if(args[0] && role_member1){

            
            let HP2Embed = new Discord.MessageEmbed()
            .setTitle("Hibapont 2")
            .setColor("YELLOW")
            .setDescription(`${role_member1.user.tag}\n kapott két hibapontot!`)

        message.channel.send(HP2Embed);

            role_member1.roles.add(hp2)
        }
    } else message.reply("Nincs jogosultságod a parancs használatához!")
    }

    if(cmd === `${prefix}hp3`){
        if (message.member.roles.cache.has(Tulaj, Altulaj, ArcadeV) || message.member.hasPermission("ADMINISTRATOR" || "BAN_MEMBERS")){
        let role_member1 = message.mentions.members.first();
        if(args[0] && role_member1){

            
            let HP3Embed = new Discord.MessageEmbed()
            .setTitle("Hibapont 3")
            .setColor("RED")
            .setDescription(`${role_member1.user.tag}\n kapott három hibapontot!`)

        message.channel.send(HP3Embed);

            role_member1.roles.add(hp3)
        }
    } else message.reply("Nincs jogosultságod a parancs használatához!")
}

});
bot.login(process.env.BOT_TOKEN);
