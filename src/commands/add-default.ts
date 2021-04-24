import { isEnabled } from "../functions/isEnabled";
import { default_words } from "../utils/default-words";

module.exports = {
  name: "add-default",
  permissions: ["MANAGE_GUILD"],

  run: (client, message, args, db) => {
    if (!isEnabled(message.guild.id, db))
      return message.channel.send("The word-filter is disabled");
    let words = db.get(`filter_${message.guild.id}_words`);
    if (!words) db.set(`filter_${message.guild.id}_words`, []);
    db.push(`filter_${message.guild.id}_words`, default_words);
    db.save();
    message.channel.send(`Added ${default_words.length} filterd-words`);
  },
};
