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


    let Tulaj = "904859323094671430"
    let Altulaj = "904859046505500712"
    let ArcadeV = "904859035424137256"

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


    let ticket_category_id = "912398852823318599"
let ticket_role_id = "912396731398914049"
let support_role_id = "904859035424137256"

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
  const SUGGESTION_CHANNEL = "905510884552638485"
 if(cmd === `${prefix}ötlet`){
     if(message.channel.id === SUGGESTION_CHANNEL){
      message.delete()
        const newLocal = message.content;
    let embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username,message.author.avatarURL())
    .setColor("YELLOW")
    .setDescription(args.join(" "))
    .setFooter(``)
    .setTimestamp()
    message.channel.send(embed).then(msg => {
      msg.react('👍').then( r => {
        msg.react('👎')
      })
     })
     } else message.reply("Ebben a szobában nem használhatod ezt a parancsot!")
    }

    /**let SUGGESTION_CHANNEL = "911953152306184203"

    if(message.channel.id === SUGGESTION_CHANNEL){
        message.delete()
            let otlet_embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag)
            .setDescription(args.join(" "))
            .setColor("YELLOW")
            .setTimestamp(message.createdAt)
            .setFooter(bot.user.username)

        message.channel.send(otlet_embed).then(async msg => {
                await msg.react("👍")
                await msg.react("👎")
        }
        )}else return**/

    const hp1 = "909019781779300413"
    const hp2 = "9909019718143336458"
    const hp3 = "909019627298897942"

    if(cmd === `${prefix}hp1`){
        message.delete()
    if (message.member.roles.cache.has(Tulaj, Altulaj, ArcadeV) || message.member.hasPermission("ADMINISTRATOR" || "BAN_MEMBERS")){
        let role_member1 = message.mentions.members.first();
        if(args[0] && role_member1){

            
            let HP1Embed = new Discord.MessageEmbed()
            .setTitle("Hibapont 1")
            .setColor("GREEN")
            .setDescription(`${role_member1.user.tag}\n kapott egy hibapontot!`)
            .setFooter(``)
         .setTimestamp()

        message.channel.send(HP1Embed);

            role_member1.roles.add(hp1)
        }
    } else message.reply("Nincs jogosultságod a parancs használatához!")
    }
    if(cmd === `${prefix}hp2`){
        message.delete()
        if (message.member.roles.cache.has(Tulaj) || message.member.hasPermission("ADMINISTRATOR" || "BAN_MEMBERS")){
        let role_member1 = message.mentions.members.first();
        if(args[0] && role_member1){

            
            let HP2Embed = new Discord.MessageEmbed()
            .setTitle("Hibapont 2")
            .setColor("YELLOW")
            .setDescription(`${role_member1.user.tag}\n kapott két hibapontot!`)
            .setFooter(``)
    .setTimestamp()

        message.channel.send(HP2Embed);

            role_member1.roles.add(hp2)
        }
    } else message.reply("Nincs jogosultságod a parancs használatához!")
    }

    if(cmd === `${prefix}hp3`){
        message.delete()
        if (message.member.roles.cache.has(Tulaj, Altulaj, ArcadeV) || message.member.hasPermission("ADMINISTRATOR" || "BAN_MEMBERS")){
        let role_member1 = message.mentions.members.first();
        if(args[0] && role_member1){

            
            let HP3Embed = new Discord.MessageEmbed()
            .setTitle("Hibapont 3")
            .setColor("RED")
            .setDescription(`${role_member1.user.tag}\n kapott három hibapontot ezzel autómatikusan ki lett rúgva!`)
            .setFooter(``)
    .setTimestamp()

        message.channel.send(HP3Embed);

            role_member1.roles.add(hp3)
            role_member1.roles.remove("909541799549362196")
            role_member1.roles.remove("901890003418906639")
            role_member1.roles.remove("905118198993682502")
            role_member1.roles.remove("904858636952674354")
            role_member1.roles.remove("904858748118524005")
            role_member1.roles.remove("904858905295872050")
            role_member1.roles.remove("909074859454234635")
            role_member1.roles.add("906208857213255720")
            role_member1.roles.remove(hp3)
        }
    } else message.reply("Nincs jogosultságod a parancs használatához!")
}

if(cmd === `${prefix}stm`){
    message.channel.send(`Információk:\n - !clear <összeg> \n  - !probaidos/felszolgalo/security <Alany> (Ráadja az alanyra a bizonyos rangot + a Tag rangot, ami jelen esetben az előbb felsoroltak. Ha egy próbaidősre tetetsz a bottal egy felszolgálót akkor a próbaidős rang automatikusan lekerül!) \n - !ban/kick <Alany> <Indok> \n - !ticket(létrehoz egy ticket szobát ahova a vezetőség valamint a ticket generálója lát be) \n - !close <alany> <szoba> (töröl egy bizonyos ticket, szobát, valamint leveszi a Ticket rangot a bizonyos emberről!) \n - !hp1/!hp2/!hp3 <alany> (Ráadja az alanyra a hibapont 1/2/3 rangot, a hibapont 3 rangnál automatikusan ki van rúgva az ember, ebből adódóan a bot autómatikusan le veszi róla a rangokat és ráadja a vendég rangot!) \n - !ötlet <üzenet> (az ötlet szobába a minta szerint lehet írni ötleteket, amelyet a bot átalakít és elküld!) \n - !weather <település>(csak úgy beleírtam; lekéri a település időjárását!)`)
}

if(cmd === `${prefix}info`){
    message.channel.send(`Információk:\n - !ticket(létrehoz egy ticket szobát ahova a vezetőség valamint a ticket generálója lát be) \n - !ötlet <üzenet> (az ötlet szobába a minta szerint lehet írni ötleteket, amelyet a bot átalakít és elküld!) \n - !weather <település>(csak úgy beleírtam; lekéri a település időjárását, ezt a bot-parancsok szobába nyugodtan lehet használni!)`)
}

const felszolgalo = "904858748118524005"
const tag = "901890003418906639"

if(cmd === `${prefix}felszolgalo`){
message.delete()
if (message.member.roles.cache.has(Tulaj, Altulaj, ArcadeV) || message.member.hasPermission("ADMINISTRATOR" || "BAN_MEMBERS")){
let member2 = message.mentions.members.first();
if(args[0] && member2){
    member2.roles.add(felszolgalo)
    member2.roles.add(tag)
    member2.roles.remove("904858636952674354")
    member2.roles.remove("904858905295872050")

    let felszembed = new Discord.MessageEmbed()
    .setTitle("Felszolgáló")
    .setColor("GREEN")
    .setDescription(`${member2.user.tag}\n mostantól Felszolgáló!`)
    .setFooter(``)
    .setTimestamp()

    message.channel.send(felszembed);

} else message.reply("Valami nem stimmel... Használat: !felszolgalo <alany>!")
} else message.reply("Nincs jogosultságod a parancs használatához!")
}

const tag2 = "901890003418906639"
const security_id = "904858905295872050"

if(cmd === `${prefix}security`){
    message.delete()
    if (message.member.roles.cache.has(Tulaj, Altulaj, ArcadeV) || message.member.hasPermission("ADMINISTRATOR" || "BAN_MEMBERS")){
    let member3 = message.mentions.members.first();
    if(args[0] && member3){
        member3.roles.add(security_id)
        member3.roles.add(tag2)
        member3.roles.remove("904858636952674354")
    member3.roles.remove("904858748118524005")
    
        let secembed = new Discord.MessageEmbed()
        .setTitle("Biztonsági őr")
        .setColor("BLUE")
        .setDescription(`${member3.user.tag}\n mostantól Biztonsági őr!`)
        .setFooter(``)
    .setTimestamp()
    
        message.channel.send(secembed);
    
    } else message.reply("Valami nem stimmel... Használat: !felszolgalo <alany>!")
    } else message.reply("Nincs jogosultságod a parancs használatához!")
    }

    const tag3 = "901890003418906639"
    const probaidos_id = "904858636952674354"


    if(cmd === `${prefix}probaidos`){
        message.delete()
        if (message.member.roles.cache.has(Tulaj, Altulaj, ArcadeV) || message.member.hasPermission("ADMINISTRATOR" || "BAN_MEMBERS")){
        let member4 = message.mentions.members.first();
        if(args[0] && member4){
            member4.roles.add(probaidos_id)
            member4.roles.add(tag3)
            member4.roles.remove("904858748118524005")
            member4.roles.remove("904858905295872050")
        
            let probembed = new Discord.MessageEmbed()
            .setTitle("Próbaidős")
            .setColor("ORANGE")
            .setDescription(`${member4.user.tag}\n mostantól Próbaidős!`)
            .setFooter(``)
    .setTimestamp()
        
            message.channel.send(probembed);
        
        } else message.reply("Valami nem stimmel... Használat: !probaidos <alany>!")
        } else message.reply("Nincs jogosultságod a parancs használatához!")
        }

});
bot.login(process.env.BOT_TOKEN);
