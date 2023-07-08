const {Client, Collection, Events, GatewayIntentBits} = require("discord.js");
const fs = require("fs");
const path = require("path");

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

// Preloading commands into client
client.commands = new Collection();

const commandPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith(".js"));

for (const commandFile of commandFiles) {
  const filePath = path.join(commandPath, commandFile);
  const command = require(filePath);

  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

// Command handler
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);

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

// Initialisation code
client.once(Events.ClientReady, c => {
  console.log(`Client ready! Logged in as ${c.user.tag}.`);
});

client.login(TOKEN);
