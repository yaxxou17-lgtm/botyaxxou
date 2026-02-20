const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const config = require('./config');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
    ],
    partials: [Partials.Message, Partials.Channel]
});

client.commands = new Collection();
client.spamMap  = new Collection();
client.warnMap  = new Collection();
client.ticketMap = new Collection();
client.joinLog  = [];

// Chargement des handlers
require('./handlers/commands')(client);
require('./handlers/events')(client);

client.once('ready', () => {
    console.log(`✅ Connecté en tant que ${client.user.tag}`);
    client.user.setActivity('🛡️ Protection du serveur', { type: 3 });
});

client.login(config.TOKEN);
