const { PermissionFlagsBits } = require('discord.js');
const { logAction } = require('../utils/helpers');

module.exports = {
    name: 'ban',
    description: 'Bannir un membre',
    async execute(message, args, client) {
        if (!message.member.permissions.has(PermissionFlagsBits.BanMembers))
            return message.reply('❌ Permission refusée.');

        const target = message.mentions.members.first();
        if (!target) return message.reply('❌ Mentionne un utilisateur.');

        const reason = args.slice(1).join(' ') || 'Aucune raison';
        await target.ban({ reason });
        message.channel.send(`🔨 **${target.user.tag}** a été banni : ${reason}`);
        logAction(message.guild, '🔨 Ban', target.user, reason, 0xFF0000);
    }
};
