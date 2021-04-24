"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isEnabled_1 = require("../functions/isEnabled");
module.exports = {
    name: "clear-words",
    permissions: ["MANAGE_GUILD"],
    run(client, message, args, db) {
        if (!isEnabled_1.isEnabled(message.guild.id, db))
            return message.channel.send("The word-filter is disabled");
        let words = db.get(`filter_${message.guild.id}_words`);
        if (words) {
            db.delete(`filter_${message.guild.id}_words`);
            db.save();
        }
        else
            return message.channel.send("There are no words to clear");
        message.channel.send("All words have been cleared");
    },
};
