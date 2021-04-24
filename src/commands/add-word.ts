import { isEnabled } from "../functions/isEnabled";

module.exports = {
  permissions: ["MANAGE_GUILD"],
  name: "add-word",
  run: (client, message, args, db) => {
    if (!isEnabled(message.guild.id, db))
      return message.channel.send("The word-filter is disabled");
    let word = args.join(" ");
    if (!word) return message.channel.send("No word(s) given");
    if (word.includes(",")) word = word.split(/[,]/g);
    if (typeof word === "string") {
      db.has(`filter_${message.guild.id}_words`)
        ? db.push(`filter_${message.guild.id}_words`, word)
        : db.set(`filter_${message.guild.id}_words`, [word]);
    } else if (Array.isArray(word)) {
      db.has(`filter_${message.guild.id}_words`)
        ? db.push(`filter_${message.guild.id}_words`, [...word])
        : db.set(`filter_${message.guild.id}_words`, [...word]);
    }
    db.save();
    message.channel.send("Word has been added");
  },
};
