const { PermissionFlagsBits } = require('discord.js');
const { logAction } = require('../utils/helpers');

module.exports = {
    name: 'mute',
    description: 'Muter un membre',
    async execute(message, args, client) {
        if (!message.member.permissions.has(PermissionFlagsBits.KickMembers))
            return message.reply('❌ Permission refusée.');

        const target = message.mentions.members.first();
        if (!target) return message.reply('❌ Mentionne un utilisateur.');

        const duree = parseInt(args[1]) || 10;
        const reason = args.slice(2).join(' ') || 'Aucune raison';

        await target.timeout(duree * 60 * 1000, reason);
        message.channel.send(`🔇 ${target} a été muté pendant **${duree} minutes** : ${reason}`);
        logAction(message.guild, '🔇 Mute', target.user, reason, 0xFFA500);
    }
};
