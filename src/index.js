const {Client, Events, GatewayIntentBits} = require("discord.js");
const dotenv = require("dotenv");

dotenv.config(); // Load environmental variables

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

client.login(process.env.TOKEN);
console.log("app.js ran successfully!");
