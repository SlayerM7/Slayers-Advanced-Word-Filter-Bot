module.exports = (client, message, args, db, command) => {
    args = message.content.trim().split(/ +/g);
    let ww = db.get(`filter_${message.guild.id}`);
    if (!ww)
        return;
    let words = db.get(`filter_${message.guild.id}_words`);
    if (!words)
        return;
    if (command === "delete-word")
        return;
    let lowerCasedArgs = [];
    args.map((arg) => {
        lowerCasedArgs.push(arg.toLowerCase());
    });
    args = lowerCasedArgs;
    if (db.has(`filter_${message.guild.id}_settings.ignore-admins`)) {
        if (db.get(`filter_${message.guild.id}_settings.ignore-admins`) === true &&
            message.member.hasPermission("ADMINISTRATOR"))
            return;
    }
    if (db.has(`filter_${message.guild.id}_settings-ignore-roles`)) {
        let hasOkRole = null;
        let rolesArray = db.get(`filter_${message.guild.id}_settings-ignore-roles`);
        rolesArray.map((role) => {
            if (message.member.roles.cache.has(role))
                hasOkRole = true;
        });
        if (hasOkRole === true)
            return;
    }
    if (db.has(`filter_${message.guild.id}_settings-ignore-channels`)) {
        let channelsArray = db.get(`filter_${message.guild.id}_settings-ignore-channels`);
        if (channelsArray.includes(message.channel.id))
            return;
    }
    if (db.has(`filter_${message.guild.id}_settings.ignore-nsfw`)) {
        if (db.get(`filter_${message.guild.id}_settings.ignore-nsfw`) === true &&
            message.channel.nsfw)
            return;
    }
    if (db.has(`filter_${message.guild.id}_settings-ignore-users`)) {
        if (db
            .get(`filter_${message.guild.id}_settings-ignore-users`)
            .includes(message.author.id))
            return;
    }
    words.some((word) => {
        if (args.includes(word)) {
            message
                .delete()
                .then(() => {
                message.reply("You cannot say that word");
                let curData = db.get(`save_logs_${message.guild.id}.${message.author.id}.num`);
                if (curData) {
                    db.set(`save_logs_${message.guild.id}.${message.author.id}.num`, curData.num ? curData.num + 1 : 1);
                }
                else {
                    db.set(`save_logs_${message.guild.id}.${message.author.id}.num`, 1);
                }
            })
                .catch(() => { });
            return;
        }
    });
};
