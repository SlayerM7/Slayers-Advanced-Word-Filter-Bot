"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const client = new discord_js_1.Client();
const config = require("../config.json");
const { slayersDB } = require("slayer.db");
const db = new slayersDB({
    saveInternal: {
        dir: "database",
        func: true,
    },
});
const fs = require("fs");
let commands = new discord_js_1.Collection();
let files = fs.readdirSync(`./dist/commands/`);
files.forEach((file) => {
    let pull = require(`./commands/${file}`);
    commands.set(pull.name, pull);
});
client.on("ready", () => {
    console.clear();
    console.log("Ready");
});
client.on("message", (message) => {
    let prefix = config.prefix;
    if (message.author.bot)
        return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    require(`./utils/word-filter`)(client, message, args, db, command);
    if (!message.content.startsWith(prefix))
        return;
    if (commands.has(command)) {
        let cmd = commands.get(command);
        cmd.run(client, message, args, db);
    }
});
client.login(config.token);
