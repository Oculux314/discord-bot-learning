// NOTE: This code is modified from https://discordjs.guide/creating-your-bot/command-deployment.html#guild-commands
// (I'm treating it like a library)

const {REST, Routes} = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

require("dotenv").config();
const {CLIENT_ID, GUILD_ID, DEPLOY_GLOBAL} = process.env;

const commands = [];

// Grab all the command files from the commands directory you created earlier
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const element of commandFolders) {
  // Grab all the command files from the commands directory you created earlier
  let commandFiles;
  let commandsPath;
  if (element.endsWith(".js")) {
    // File
    commandsPath = foldersPath;
    commandFiles = [element];
  } else {
    // Folder
    commandsPath = path.join(foldersPath, element);
    commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
  }

  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
    } else {
      console.error(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.TOKEN);

// And deploy your commands!
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    let metadata;
    if (DEPLOY_GLOBAL === "true") {
      // Global deployment
      metadata = Routes.applicationCommands(CLIENT_ID);
    } else {
      // Guild deployment
      metadata = Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID);
    }

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(metadata, {body: commands});

    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
