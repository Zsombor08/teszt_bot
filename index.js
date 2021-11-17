const {Client, Intents} = require("discord.js");
const tokenfile = require("./tokenfile.json");
const botconfig = require("./botconfig.json");
const bot = new Client({intents: [Intents.FLAGS.GUILDS]});

bot.on("ready", async() => {
    console.log(`A ${bot.user.username} elindult!`)

   let státuszok = [
       "Prefix: !",
       "Teszt bot",
       "Készítő: Zsombor#8007",
   ] 

   setInterval(function(){
       let status = státuszok[Math.floor(Math.random()* státuszok.length)]

       bot.user.setActivity(status, {type: "WATCHING"})
   }, 3000)
})
bot.on("message", async message => {
    let MessageArray = message.content.split(" ");
    let cmd = MessageArray[0];
    let args = MessageArray.slice(1);
    let prefix = botconfig.prefix;

    if(cmd === `hello`){
        message.channel.send("Szia!");
    }
    console.log(args);
})


bot.login(tokenfile.token);