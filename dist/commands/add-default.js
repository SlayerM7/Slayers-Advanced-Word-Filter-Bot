"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isEnabled_1 = require("../functions/isEnabled");
const default_words_1 = require("../utils/default-words");
module.exports = {
    name: "add-default",
    permissions: ["MANAGE_GUILD"],
    run: (client, message, args, db) => {
        if (!isEnabled_1.isEnabled(message.guild.id, db))
            return message.channel.send("The word-filter is disabled");
        let words = db.get(`filter_${message.guild.id}_words`);
        if (!words)
            db.set(`filter_${message.guild.id}_words`, []);
        db.push(`filter_${message.guild.id}_words`, default_words_1.default_words);
        db.save();
        message.channel.send(`Added ${default_words_1.default_words.length} filterd-words`);
    },
};
