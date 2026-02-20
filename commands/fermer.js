const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'fermer',
    description: 'Fermer le ticket actuel',
    async execute(message, args, client) {
        if (!message.channel.name.startsWith('ticket-'))
            return message.reply('❌ Tu n\'es pas dans un salon de ticket.');

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId('close_ticket').setLabel('🔒 Confirmer la fermeture').setStyle(ButtonStyle.Danger),
            new ButtonBuilder().setCustomId('cancel_close').setLabel('Annuler').setStyle(ButtonStyle.Secondary),
        );
        message.channel.send({ content: '❓ Confirme la fermeture de ce ticket :', components: [row] });
    }
};
