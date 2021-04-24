const { Client, Collection } = require("discord.js");
const client = new Client();
const config = require("../config.json");
const { slayersDB } = require("slayer.db");
const db = new slayersDB({
  saveReadable: true,
  saveInternal: {
    dir: "database",
    func: true,
  },
});
const fs = require("fs");

let commands = new Collection();

let files = fs.readdirSync(`./dist/commands/`);

// interface run {
//   name: String;
//   permissions: String[];
//   run: Function;
// }

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
  if (message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  require(`./utils/word-filter`)(client, message, args, db, command);

  if (!message.content.startsWith(prefix)) return;

  if (commands.has(command)) {
    let cmd = /*<run>*/ commands.get(command);
    let rPerms = [];
    if (cmd.permissions) {
      cmd.permissions.forEach((perm) => {
        if (!message.member.hasPermission(perm)) {
          rPerms.push(`\`${perm}\``);
        }
      });
    }
    if (rPerms.length) {
      return message.reply(
        `You need ${rPerms.join(", ")} permissions to use this command`
      );
    }
    cmd.run(client, message, args, db);
  }
});

module.exports = {
  commands,
};

client.login(config.token);
