const { logAction } = require('../utils/helpers');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isButton()) return;

        // ── Ouvrir ticket (panel bouton) ──────────────────────────
        if (interaction.customId === 'open_ticket') {
            await interaction.deferReply({ ephemeral: true });
            const { createTicket } = require('../utils/helpers');

            if (client.ticketMap.has(interaction.user.id)) {
                const existing = interaction.guild.channels.cache.get(client.ticketMap.get(interaction.user.id));
                if (existing) return interaction.editReply(`⚠️ Tu as déjà un ticket ouvert : ${existing}`);
            }

            const channel = await createTicket(interaction.guild, interaction.user, 'Ouvert via le panneau', client);
            return interaction.editReply(`✅ Ton ticket a été créé : ${channel}`);
        }

        // ── Fermer ticket ────────────────────────────────────────
        if (interaction.customId === 'close_ticket') {
            await interaction.reply('🔒 Fermeture du ticket dans **5 secondes**...');
            // Retirer du ticketMap
            client.ticketMap.forEach((cId, uId) => {
                if (cId === interaction.channel.id) client.ticketMap.delete(uId);
            });
            logAction(interaction.guild, '🎫 Ticket Fermé', interaction.user, `#${interaction.channel.name}`, 0xFF6B6B);
            setTimeout(() => interaction.channel.delete().catch(() => {}), 5000);
        }

        // ── Annuler fermeture ─────────────────────────────────────
        if (interaction.customId === 'cancel_close') {
            await interaction.reply({ content: '✅ Fermeture annulée.', ephemeral: true });
            interaction.message.delete().catch(() => {});
        }
    }
};
