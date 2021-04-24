module.exports = {
    name: "ignore-channels",
    run(client, message, args, db) {
        let func = args[0];
        if (!func)
            return message.channel.send("No operation was given");
        let channel = message.mentions.channels.first();
        if (!channel)
            return message.channel.send("No channel was mentioned");
        if (func === "add") {
            db.has(`filter_${message.guild.id}_settings-ignore-channels`)
                ? db.push(`filter_${message.guild.id}_settings-ignore-channels`, channel.id)
                : db.set(`filter_${message.guild.id}_settings-ignore-channels`, [
                    channel.id,
                ]);
            message.channel.send(`${channel.name} Has been added`);
        }
        if (func === "remove") {
            if (!db.has(`filter_${message.guild.id}_settings-ignore-channels`))
                return message.channel.send("There are no ignored channels saved");
            db.splice(`filter_${message.guild.id}_settings-ignore-channels`, channel.id);
            message.channel.send(`${channel.name} has been removed`);
        }
        db.save();
    },
};
