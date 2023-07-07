const {Client, Events, GatewayIntentBits} = require("discord.js");

require("dotenv").config();
const {TOKEN} = process.env;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    // GatewayIntentBits.GuildMembers,
    // GatewayIntentBits.GuildMessages,
    // GatewayIntentBits.DirectMessages,
    // GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, c => {
  console.log(`Client ready! Logged in as ${c.user.tag}.`);
});

client.login(TOKEN);
console.log("app.js ran successfully!");
