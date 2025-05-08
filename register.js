const { REST, Routes } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const commands = [
  {
    name: 'linkkahoot',
    description: 'Krijg een link naar Kahoot.it'
  },
  {
    name: 'quiz',
    description: 'Start een quiz over leestekens'
  }
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
