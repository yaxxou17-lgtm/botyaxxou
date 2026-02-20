const { PermissionFlagsBits } = require('discord.js');
const { logAction } = require('../utils/helpers');

module.exports = {
    name: 'kick',
    description: 'Kick un membre',
    async execute(message, args, client) {
        if (!message.member.permissions.has(PermissionFlagsBits.KickMembers))
            return message.reply('❌ Permission refusée.');

        const target = message.mentions.members.first();
        if (!target) return message.reply('❌ Mentionne un utilisateur.');

        const reason = args.slice(1).join(' ') || 'Aucune raison';
        await target.kick(reason);
        message.channel.send(`👢 **${target.user.tag}** a été kick : ${reason}`);
        logAction(message.guild, '👢 Kick', target.user, reason, 0xFF6B6B);
    }
};
