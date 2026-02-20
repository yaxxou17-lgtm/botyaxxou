const { EmbedBuilder } = require('discord.js');
const config = require('../config');
const { logAction } = require('../utils/helpers');

module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        const now = Date.now();
        client.joinLog.push(now);

        // Garder uniquement les joins récents
        const recent = client.joinLog.filter(t => now - t < config.JOIN_TIMEFRAME);
        client.joinLog.length = 0;
        client.joinLog.push(...recent);

        // ── ANTI-RAID ──────────────────────────────────────────────
        if (recent.length >= config.JOIN_THRESHOLD) {
            logAction(
                member.guild,
                '🚨 RAID DÉTECTÉ',
                { tag: 'Système Automatique' },
                `${recent.length} membres ont rejoint en ${config.JOIN_TIMEFRAME / 1000}s !`,
                0xFF0000
            );

            // Kick les comptes trop récents (< 7 jours)
            const sevenDays = 7 * 24 * 60 * 60 * 1000;
            if (Date.now() - member.user.createdTimestamp < sevenDays) {
                await member.kick('🚨 Anti-Raid : compte trop récent').catch(() => {});
                return;
            }
        }

        // ── BIENVENUE ──────────────────────────────────────────────
        const ch = member.guild.systemChannel;
        if (!ch) return;

        const embed = new EmbedBuilder()
            .setTitle(`👋 Bienvenue sur ${member.guild.name} !`)
            .setDescription(`Heureux de t'accueillir ${member} !\nTu es notre **${member.guild.memberCount}ème** membre. 🎉`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setColor(0x57F287)
            .setTimestamp();

        ch.send({ embeds: [embed] }).catch(() => {});
    }
};
