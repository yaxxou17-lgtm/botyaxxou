const { EmbedBuilder, PermissionFlagsBits, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config');

// ── Envoyer un log dans le salon de logs ──────────────────────────
async function logAction(guild, action, user, reason, color = 0xFF6B6B) {
    if (!config.LOG_CHANNEL_ID) return;
    const ch = guild.channels.cache.get(config.LOG_CHANNEL_ID);
    if (!ch) return;
    const embed = new EmbedBuilder()
        .setTitle(action)
        .addFields(
            { name: '👤 Utilisateur', value: user?.tag || String(user), inline: true },
            { name: '📝 Raison',      value: String(reason),            inline: true },
        )
        .setColor(color)
        .setTimestamp();
    ch.send({ embeds: [embed] }).catch(() => {});
}

// ── Ajouter un avertissement ──────────────────────────────────────
function addWarn(client, userId) {
    const current = (client.warnMap.get(userId) || 0) + 1;
    client.warnMap.set(userId, current);
    return current;
}

// ── Vérifier si membre est whitelisté ────────────────────────────
function isWhitelisted(member) {
    if (!member) return false;
    if (member.permissions.has(PermissionFlagsBits.Administrator)) return true;
    if (member.permissions.has(PermissionFlagsBits.ManageMessages)) return true;
    return config.WHITELIST_ROLES.some(id => member.roles.cache.has(id));
}

// ── Détecter un lien ─────────────────────────────────────────────
function containsLink(text) {
    return /(https?:\/\/|discord\.gg\/|www\.)/i.test(text);
}

// ── Vérifier si lien est autorisé ────────────────────────────────
function isAllowedLink(text) {
    return config.ALLOWED_DOMAINS.some(d => text.includes(d));
}

// ── Muter un membre (timeout 10 min) ─────────────────────────────
async function muteUser(member, guild, reason) {
    try {
        await member.timeout(10 * 60 * 1000, reason);
        await logAction(guild, '🔇 Mute Automatique', member.user, reason, 0xFFA500);
    } catch {}
}

// ── Créer un ticket ───────────────────────────────────────────────
async function createTicket(guild, user, reason, client) {
    const channel = await guild.channels.create({
        name: `ticket-${user.username.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 20)}`,
        type: ChannelType.GuildText,
        parent: config.TICKET_CATEGORY_ID || null,
        permissionOverwrites: [
            { id: guild.id,  deny:  [PermissionFlagsBits.ViewChannel] },
            { id: user.id,   allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory] },
            ...(config.SUPPORT_ROLE_ID ? [{
                id: config.SUPPORT_ROLE_ID,
                allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
            }] : []),
        ],
    });

    client.ticketMap.set(user.id, channel.id);

    const embed = new EmbedBuilder()
        .setTitle('🎫 Ticket de Support')
        .setDescription(`Bonjour ${user} ! 👋\nNotre équipe va te répondre très rapidement.\n\n**Raison :** ${reason}`)
        .setColor(0x5865F2)
        .setFooter({ text: 'Clique sur le bouton pour fermer le ticket.' })
        .setTimestamp();

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('close_ticket')
            .setLabel('🔒 Fermer le ticket')
            .setStyle(ButtonStyle.Danger),
    );

    const mention = config.SUPPORT_ROLE_ID ? ` <@&${config.SUPPORT_ROLE_ID}>` : '';
    await channel.send({ content: `${user}${mention}`, embeds: [embed], components: [row] });

    await logAction(guild, '🎫 Ticket Créé', user, `Raison: ${reason} | Salon: #${channel.name}`, 0x57F287);
    return channel;
}

module.exports = { logAction, addWarn, isWhitelisted, containsLink, isAllowedLink, muteUser, createTicket };
