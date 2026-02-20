const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const cmdPath = path.join(__dirname, '../commands');
    const files = fs.readdirSync(cmdPath).filter(f => f.endsWith('.js'));
    for (const file of files) {
        const cmd = require(path.join(cmdPath, file));
        client.commands.set(cmd.name, cmd);
        console.log(`📦 Commande chargée : ${cmd.name}`);
    }
};
