
const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const bot = new Discord.Client({disableEveryone: true});
var weather = require('weather-js');
const { Client } = require("discord.js-commando");

bot.on("ready", async() => {
    console.log(`${bot.user.username} elindult!`)


    let státuszok = [
        "",
        "",
        ""
    ]

    setInterval(function() {
        let status = státuszok[Math.floor(Math.random()* státuszok.length)]

        bot.user.setActivity(status, {type: ""})
    },3000)
})


    
const OS_CHANNEL = "988492367646584867"
if(message.channel.id === OS_CHANNEL){
if(message.member.roles.cache.has("988492366488952855")){
message.delete()
const newLocal = args;
let embed = new Discord.MessageEmbed()
.setAuthor(message.author.username,message.author.avatarURL())
.setColor(0x80ff00)
.setDescription(message.content)
.setFooter(``)
.setTimestamp()
message.channel.send(embed).then(msg => {
msg.react('👍').then( r => {
msg.react('👎')
})
})
}
} 
    const BUG_CHANNEL = "988492367646584862"
    const BUG_LOG_CHANNEL = "988492367201968132"

          if (message.channel.id === BUG_CHANNEL) {
              if (message.member.roles.cache.has("988492366488952855")) {
          let embedUser = new Discord.MessageEmbed()
          .setAuthor(message.member.nickname ? message.member.nickname : message.author.tag,message.author.displayAvatarURL)
          .setColor("RED")
          .setTitle('Bug Jelentés')
          .setDescription('Sikeresen rögzítettük az általad be küldött problémát!')
          .setTimestamp(new Date());
          let embedStaff = new Discord.MessageEmbed()
          .setAuthor(message.member.nickname ? message.member.nickname : message.author.tag,message.author.displayAvatarURL)
          .setColor("red")
          .setTitle('Bug Jelentés')
          .setDescription(message.content)
          .setTimestamp(new Date());
          message.channel.send(embedUser).then(null).catch(console.error);
          bot.channels.cache.get(BUG_LOG_CHANNEL).send(embedStaff).then(null).catch(console.error);
          return message.delete();
        }
};

bot.login(process.env.BOT_TOKEN);
