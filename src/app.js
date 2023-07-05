const Discord = require("discord.js");
const {TOKEN} = require("../config.json");

const Client = new Discord.Client({
  intents: [
    // Discord.GatewayIntentBits.Guilds,
    // Discord.GatewayIntentBits.GuildMembers,
    // Discord.GatewayIntentBits.GuildMessages,
    // Discord.GatewayIntentBits.DirectMessages,
    // Discord.GatewayIntentBits.MessageContent,
  ],
  partials: [
    // Discord.Partials.User,
    // Discord.Partials.Channel,
    // Discord.Partials.GuildMember,
    // Discord.Partials.Message,
    // Discord.Partials.Reaction,
    // Discord.Partials.GuildScheduledEvent,
  ],
});

Client.on("ready", client => {
  console.log("Bot ready! Tag: " + client.user.tag);
});

Client.on("messageCreate", msg => {
  console.log(msg);
});

Client.login(TOKEN);
console.log("app.js ran successfully!");
