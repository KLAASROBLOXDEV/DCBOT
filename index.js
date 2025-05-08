const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ] 
});

// Quiz vragen over leestekens
const quizQuestions = [
  {
    question: "Moet er een komma voor 'en' in een opsomming?",
    options: ["Ja", "Nee"],
    answer: 1 // Nee
  },
  {
    question: "Waar komt de punt in deze zin: 'Hallo hoe gaat het'?",
    options: ["Na 'het'", "Na 'Hallo'", "Geen punt nodig"],
    answer: 0 // Na 'het'
  },
  {
    question: "Is dit correct: 'Hij zei: 'Ik ga weg.''?",
    options: ["Ja", "Nee"],
    answer: 0 // Ja
  },
  {
    question: "Welk leesteken gebruik je voor een vraag?",
    options: ["Punt", "Vraagteken", "Uitroepteken"],
    answer: 1 // Vraagteken
  },
  {
    question: "Moet er een komma voor 'dat' in 'Ik weet dat je komt'?",
    options: ["Ja", "Nee"],
    answer: 1 // Nee
  },
  {
    question: "Hoe noem je dit leesteken: ; ?",
    options: ["Dubbele punt", "Puntkomma", "Kommapunt"],
    answer: 1 // Puntkomma
  },
  {
    question: "Waar horen aanhalingstekens in: Hij zei Hallo?",
    options: ["Om 'Hallo'", "Om 'Hij zei'", "Om de hele zin"],
    answer: 0 // Om 'Hallo'
  },
  {
    question: "Is een apostrof een leesteken?",
    options: ["Ja", "Nee"],
    answer: 0 // Ja
  },
  {
    question: "Welk leesteken gebruik je voor een sterke emotie?",
    options: ["Punt", "Vraagteken", "Uitroepteken"],
    answer: 2 // Uitroepteken
  },
  {
    question: "Is dit correct: 'Hij ging naar huis, en at toen.'?",
    options: ["Ja", "Nee"],
    answer: 1 // Nee (komma voor 'en' is niet nodig)
  }
];

// Wanneer de bot klaar is
client.once('ready', () => {
  console.log(`Bot is online als ${client.user.tag}`);
});

// Slash commands verwerken
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'linkkahoot') {
    await interaction.reply('Join Kahoot via: https://www.kahoot.it');
  } else if (commandName === 'quiz') {
    startQuiz(interaction);
  }
});

// Quiz functie
async function startQuiz(interaction) {
  // Selecteer 10 willekeurige vragen
  const selectedQuestions = [...quizQuestions].sort(() => 0.5 - Math.random()).slice(0, 10);
  let score = 0;

  // Stel elke vraag een voor een
  for (let i = 0; i < selectedQuestions.length; i++) {
    const q = selectedQuestions[i];
    const embed = new EmbedBuilder()
      .setTitle(`Quiz Vraag ${i + 1}/${selectedQuestions.length}`)
      .setDescription(q.question)
      .addFields(
        q.options.map((option, index) => ({
          name: `Optie ${index + 1}`,
          value: option,
          inline: true
        }))
      )
      .setColor('#0099ff');

    await interaction.followUp({ embeds: [embed] });

    // Hier zou je eigenlijk moeten wachten op een antwoord van de gebruiker
    // Dit is een vereenvoudigde versie zonder antwoord verwerking
  }

  // Einde quiz
  const resultEmbed = new EmbedBuilder()
    .setTitle('Quiz Afgerond!')
    .setDescription(`Je hebt ${score} van de ${selectedQuestions.length} vragen goed beantwoord!`)
    .setColor(score >= selectedQuestions.length / 2 ? '#00ff00' : '#ff0000');

  await interaction.followUp({ embeds: [resultEmbed] });
}

// Login met token uit .env
client.login(process.env.DISCORD_TOKEN);
