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
        "twitch.tv/zsombor76_"
    ]

    setInterval(function() {
        let status = státuszok[Math.floor(Math.random()* státuszok.length)]

        bot.user.setActivity(status, {type: "WATCHING"})
    }, 3000)
})


bot.on("message", async message => {
    let MessageArray = message.content.split("");
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
        message.delete()
        if (message.member.roles.cache.has(Tulaj) || message.member.hasPermission("ADMINISTRATOR" || "BAN_MEMBERS")){
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
    } else message.reply("Nincs jogosultságod a parancs használatához!")
    }


    if(cmd === `${prefix}ban`){
        if (message.member.roles.cache.has(Tulaj) || message.member.hasPermission("ADMINISTRATOR" || "BAN_MEMBERS")){
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
    } else message.reply("Nincs jogosultságod a parancs használatához!")
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


    let ticket_category_id = "913846783774441552"
let ticket_role_id = "913846918495494244"
let support_role_id = "913847051345866774"

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
        message.delete()
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

/**const tag_role = "911345112540385300"
const channelId = "911639523358822430"
let message1 = `Üdvözöllek <@${member.id}> a Play-Day Arcade szerverén!`
    const newLocal = "guildMemberAdd";
bot.on(newLocal , function (member) {
    message.channel.send(message1)
    message.roles.add(tag_role)
});**/
const tag_role = "911345112540385300"
bot.on("guildMemberAdd" , function (member) {
    const ujtag = message.mentions.members.first();

    ujtag.roles.add("734757419263066144")
})
    

    


if(cmd === `${prefix}stm`){
    message.delete()
    message.channel.send(`Információk:\n - !ban/kick <Alany> <Indok> \n - !ticket(létrehoz egy ticket szobát ahova a vezetőség valamint a ticket generálója lát be) \n - !close <alany> <szoba> (töröl egy bizonyos ticket, szobát, valamint leveszi a Ticket rangot a bizonyos emberről!) \n - !weather <település>(lekéri az adott település időjárását!)`)
}

if(cmd === `${prefix}info`){
    message.delete()
    message.channel.send(`Információk:\n - !ticket(létrehoz egy ticket szobát ahova a supportok valamint a ticket generálója lát be) \n - !weather <település>(csak úgy beleírtam; lekéri a település időjárását, ezt a bot-parancsok szobába nyugodtan lehet használni!)`)
} })
bot.login(process.env.BOT_TOKEN);
