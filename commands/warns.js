module.exports = {
    name: 'warns',
    description: 'Voir les avertissements d\'un membre',
    async execute(message, args, client) {
        const target = message.mentions.users.first() || message.author;
        const warns = client.warnMap.get(target.id) || 0;
        message.reply(`📋 **${target.tag}** a **${warns}/3** avertissement(s).`);
    }
};
