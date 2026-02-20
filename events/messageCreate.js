const config = require('../config');
const { addWarn, isWhitelisted, containsLink, isAllowedLink, muteUser, logAction } = require('../utils/helpers');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot || !message.guild) return;

        // ══════════════════════════════════════════
        //  🔗 ANTI-LIEN
        // ══════════════════════════════════════════
        if (containsLink(message.content) && !isWhitelisted(message.member)) {
            if (!isAllowedLink(message.content)) {
                await message.delete().catch(() => {});
                const warn = addWarn(client, message.author.id);
                const reply = await message.channel.send(
                    `🚫 ${message.author}, les liens ne sont **pas autorisés** ici ! **(Avertissement ${warn}/3)**`
                );
                setTimeout(() => reply.delete().catch(() => {}), 5000);
                logAction(message.guild, '🔗 Anti-Lien', message.author, `Lien supprimé dans #${message.channel.name}`, 0xED4245);
                if (warn >= 3) await muteUser(message.member, message.guild, '3 avertissements – liens interdits');
                return;
            }
        }

        // ══════════════════════════════════════════
        //  💬 ANTI-SPAM
        // ══════════════════════════════════════════
        if (!isWhitelisted(message.member)) {
            const now = Date.now();
            const msgs = client.spamMap.get(message.author.id) || [];
            const recent = msgs.filter(t => now - t < config.SPAM_TIMEFRAME);
            recent.push(now);
            client.spamMap.set(message.author.id, recent);

            if (recent.length >= config.SPAM_MSG_LIMIT) {
                const fetched = await message.channel.messages.fetch({ limit: 20 }).catch(() => null);
                if (fetched) {
                    const toDelete = fetched.filter(m => m.author.id === message.author.id && !m.deleted);
                    await message.channel.bulkDelete(toDelete, true).catch(() => {});
                }
                client.spamMap.set(message.author.id, []);
                const warn = addWarn(client, message.author.id);
                const reply = await message.channel.send(
                    `⚠️ ${message.author}, arrête le **spam** ! **(Avertissement ${warn}/3)**`
                );
                setTimeout(() => reply.delete().catch(() => {}), 5000);
                logAction(message.guild, '💬 Anti-Spam', message.author, `Spam dans #${message.channel.name}`, 0xFEE75C);
                if (warn >= 3) await muteUser(message.member, message.guild, '3 avertissements – spam');
                return;
            }
        }

        // ══════════════════════════════════════════
        //  📌 COMMANDES
        // ══════════════════════════════════════════
        if (!message.content.startsWith(config.PREFIX)) return;

        const args = message.content.slice(config.PREFIX.length).trim().split(/ +/);
        const cmdName = args.shift().toLowerCase();
        const command = client.commands.get(cmdName);
        if (!command) return;

        try {
            await command.execute(message, args, client);
        } catch (err) {
            console.error(`Erreur commande ${cmdName}:`, err);
            message.reply('❌ Une erreur est survenue.').catch(() => {});
        }
    }
};
