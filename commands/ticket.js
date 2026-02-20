const { createTicket } = require('../utils/helpers');

module.exports = {
    name: 'ticket',
    description: 'Ouvrir un ticket de support',
    async execute(message, args, client) {
        if (client.ticketMap.has(message.author.id)) {
            const existing = message.guild.channels.cache.get(client.ticketMap.get(message.author.id));
            if (existing) return message.reply(`⚠️ Tu as déjà un ticket ouvert : ${existing}`);
        }
        const reason = args.join(' ') || 'Aucune raison spécifiée';
        const channel = await createTicket(message.guild, message.author, reason, client);
        message.reply(`🎫 Ton ticket a été créé : ${channel}`);
    }
};
