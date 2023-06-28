const Discord = require('discord.js');

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
  ]
});

// console.log(Discord);
// console.log(Client);