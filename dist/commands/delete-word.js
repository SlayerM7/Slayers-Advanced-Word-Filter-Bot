"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isEnabled_1 = require("../functions/isEnabled");
module.exports = {
    permissions: ["MANAGE_GUILD"],
    name: "delete-word",
    run(client, message, args, db) {
        if (!isEnabled_1.isEnabled(message.guild.id, db))
            return message.channel.send("The word filter is disabled");
        let word = args.join(" ");
        if (!word)
            return message.channel.send("No word was given to remove");
        let words = db.get(`filter_${message.guild.id}_words`);
        if (!words)
            return message.channel.send("There are no filterd-words currently set");
        if (!words.includes(word))
            return message.channel.send("That word is not set in the filtered-words collection");
        db.splice(`filter_${message.guild.id}_words`, word);
        db.save();
        message.reply(`**${word}** has been deleted from the Collection`);
    },
};
