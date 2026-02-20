const { PermissionFlagsBits } = require('discord.js');
const { addWarn, muteUser, logAction } = require('../utils/helpers');

module.exports = {
    name: 'warn',
    description: 'Avertir un membre',
    async execute(message, args, client) {
        if (!message.member.permissions.has(PermissionFlagsBits.KickMembers))
            return message.reply('❌ Permission refusée.');

        const target = message.mentions.members.first();
        if (!target) return message.reply('❌ Mentionne un utilisateur.');

        const reason = args.slice(1).join(' ') || 'Aucune raison';
        const warn = addWarn(client, target.id);

        message.channel.send(`⚠️ ${target} a reçu un avertissement **(${warn}/3)** : **${reason}**`);
        logAction(message.guild, '⚠️ Avertissement', target.user, reason, 0xFEE75C);

        if (warn >= 3) {
            await muteUser(target, message.guild, '3 avertissements atteints');
            message.channel.send(`🔇 ${target} a été automatiquement muté (3 warns).`);
        }
    }
};
