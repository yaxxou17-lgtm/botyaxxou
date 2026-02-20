const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'ticketpanel',
    description: 'Envoyer le panel de tickets (Admin)',
    async execute(message, args, client) {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageGuild))
            return message.reply('❌ Tu n\'as pas la permission.');

        const embed = new EmbedBuilder()
            .setTitle('🎫 Besoin d\'aide ?')
            .setDescription('Clique sur le bouton ci-dessous pour ouvrir un ticket.\nNotre équipe te répondra au plus vite !')
            .setColor(0x5865F2)
            .setFooter({ text: 'Support • Un seul ticket par personne' });

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('open_ticket')
                .setLabel('📩 Ouvrir un ticket')
                .setStyle(ButtonStyle.Primary),
        );

        await message.channel.send({ embeds: [embed], components: [row] });
        message.delete().catch(() => {});
    }
};
