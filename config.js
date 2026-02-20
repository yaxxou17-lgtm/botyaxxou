module.exports = {
    TOKEN:                'VOTRE_TOKEN_ICI',   // ← Ton token Discord
    PREFIX:               '!',

    // ── TICKETS ──────────────────────────────────
    TICKET_CATEGORY_ID:   '',   // ← ID catégorie tickets (optionnel)
    TICKET_LOG_CHANNEL_ID:'',   // ← ID salon logs tickets
    SUPPORT_ROLE_ID:      '',   // ← ID rôle staff/support

    // ── LOGS MODÉRATION ──────────────────────────
    LOG_CHANNEL_ID:       '',   // ← ID salon logs modération

    // ── ANTI-RAID ─────────────────────────────────
    JOIN_THRESHOLD:        10,    // Nb max de joins en...
    JOIN_TIMEFRAME:        10000, // ...X ms (10s)

    // ── ANTI-SPAM ─────────────────────────────────
    SPAM_MSG_LIMIT:        5,     // Nb max de messages en...
    SPAM_TIMEFRAME:        5000,  // ...X ms (5s)

    // ── ANTI-LIEN ─────────────────────────────────
    ALLOWED_DOMAINS: ['discord.gg', 'discord.com'], // domaines autorisés

    // ── WHITELIST ─────────────────────────────────
    WHITELIST_ROLES: [],  // IDs rôles qui bypass la modération
};
