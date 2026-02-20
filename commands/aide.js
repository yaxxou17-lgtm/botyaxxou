const { EmbedBuilder } = require('discord.js');
const config = require('../config');

module.exports = {
    name: 'aide',
    description: 'Afficher l\'aide',
    async execute(message, args, client) {
        const embed = new EmbedBuilder()
            .setTitle('📖 Aide – Commandes disponibles')
            .setColor(0x5865F2)
            .addFields(
                {
                    name: '🎫 Tickets',
                    value: [
                        `\`${config.PREFIX}ticket [raison]\` – Ouvrir un ticket`,
                        `\`${config.PREFIX}fermer\` – Fermer le ticket`,
                        `\`${config.PREFIX}ticketpanel\` – Envoyer le panel *(Admin)*`,
                    ].join('\n'),
                },
                {
                    name: '🔨 Modération',
                    value: [
                        `\`${config.PREFIX}warn @user [raison]\` – Avertir`,
                        `\`${config.PREFIX}mute @user [min] [raison]\` – Muter`,
                        `\`${config.PREFIX}kick @user [raison]\` – Kick`,
                        `\`${config.PREFIX}ban @user [raison]\` – Bannir`,
                        `\`${config.PREFIX}clear [nb]\` – Supprimer des messages`,
                        `\`${config.PREFIX}warns [@user]\` – Voir les warns`,
                    ].join('\n'),
                },
                {
                    name: '🛡️ Protections automatiques',
                    value: '✅ Anti-Spam\n✅ Anti-Lien\n✅ Anti-Raid\n✅ Auto-mute à 3 warns',
                },
            )
            .setFooter({ text: `Préfixe : ${config.PREFIX}` })
            .setTimestamp();

        message.reply({ embeds: [embed] });
    }
};
