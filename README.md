# 🤖 Discord Bot — Installation & Guide

## 📁 Structure du projet

```
discord-bot/
├── bot.js              ← Point d'entrée
├── config.js           ← ⚙️ TON FICHIER DE CONFIG
├── package.json
├── commands/
│   ├── ticket.js
│   ├── ticketpanel.js
│   ├── fermer.js
│   ├── warn.js
│   ├── mute.js
│   ├── kick.js
│   ├── ban.js
│   ├── clear.js
│   ├── warns.js
│   └── aide.js
├── events/
│   ├── messageCreate.js   ← Anti-spam, anti-lien, commandes
│   ├── interactionCreate.js ← Boutons tickets
│   └── guildMemberAdd.js  ← Anti-raid, bienvenue
├── handlers/
│   ├── commands.js
│   └── events.js
└── utils/
    └── helpers.js         ← Fonctions partagées
```

## 🚀 Installation

```bash
npm install
node bot.js
```

## ⚙️ Configuration — `config.js`

| Variable | Description |
|---|---|
| `TOKEN` | **Ton token** (Discord Developer Portal) |
| `PREFIX` | Préfixe des commandes (défaut : `!`) |
| `TICKET_CATEGORY_ID` | ID catégorie pour les tickets |
| `TICKET_LOG_CHANNEL_ID` | ID salon logs tickets |
| `SUPPORT_ROLE_ID` | ID rôle staff/support |
| `LOG_CHANNEL_ID` | ID salon logs modération |
| `JOIN_THRESHOLD` | Nb joins max avant anti-raid (défaut 10) |
| `JOIN_TIMEFRAME` | Fenêtre de temps anti-raid en ms (défaut 10000) |
| `SPAM_MSG_LIMIT` | Nb messages max avant anti-spam (défaut 5) |
| `SPAM_TIMEFRAME` | Fenêtre anti-spam en ms (défaut 5000) |
| `ALLOWED_DOMAINS` | Domaines autorisés pour les liens |
| `WHITELIST_ROLES` | Rôles qui bypass la modération auto |

## 📋 Commandes

| Commande | Permission |
|---|---|
| `!ticket [raison]` | Tout le monde |
| `!fermer` | Dans un ticket |
| `!ticketpanel` | ManageGuild |
| `!warn @user [raison]` | KickMembers |
| `!mute @user [min] [raison]` | KickMembers |
| `!kick @user [raison]` | KickMembers |
| `!ban @user [raison]` | BanMembers |
| `!clear [nb]` | ManageMessages |
| `!warns [@user]` | Tout le monde |
| `!aide` | Tout le monde |

## 🔑 Obtenir son token

1. Va sur https://discord.com/developers/applications
2. Crée une app → onglet **Bot**
3. Clique **Reset Token** et copie-le
4. Active les 3 **Privileged Gateway Intents** :
   - ✅ Presence Intent
   - ✅ Server Members Intent
   - ✅ Message Content Intent
