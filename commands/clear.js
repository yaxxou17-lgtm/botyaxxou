const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'clear',
    description: 'Supprimer des messages',
    async execute(message, args, client) {
        if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages))
            return message.reply('❌ Permission refusée.');

        const nb = Math.min(parseInt(args[0]) || 5, 100);
        await message.channel.bulkDelete(nb + 1, true);
        const reply = await message.channel.send(`🧹 **${nb}** messages supprimés.`);
        setTimeout(() => reply.delete().catch(() => {}), 3000);
    }
};
