const {Client, Events, GatewayIntentBits} = require("discord.js");

require("dotenv").config();
const {TOKEN} = process.env;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, c => {
  console.log(`Client ready! Logged in as ${c.user.tag}.`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const path = `./commands/${interaction.commandName}.js`;
  const command = require(path);

  try {
    command.execute(interaction);
  } catch (error) {
    console.error(error);
    const errorReply = {content: "There was an error while executing this command!", ephemeral: true};

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(errorReply);
    } else {
      await interaction.reply(errorReply);
    }
  }
});

client.on(Events.MessageCreate, msg => {
  if (msg.author.bot) return;
  console.log(`${msg.member.displayName}: ${msg.content}`);
  msg.reply({content: `Greetings,\nI am ${msg.member.displayName}.`}); // Chara
});

client.login(TOKEN);
console.log("app.js ran successfully!");
