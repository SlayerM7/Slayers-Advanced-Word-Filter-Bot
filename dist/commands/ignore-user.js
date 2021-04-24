module.exports = {
    name: "ignore-user",
    permissions: ["MANAGE_GUILD"],
    run(client, message, args, db) {
        let func = args[0];
        if (!func)
            return message.channel.send("No operation was given");
        let user = message.mentions.users.first();
        if (!user)
            return message.channel.send("No user was mentioned");
        if (func === "add") {
            db.has(`filter_${message.guild.id}_settings-ignore-users`)
                ? db.push(`filter_${message.guild.id}_settings-ignore-users`, user.id)
                : db.set(`filter_${message.guild.id}_settings-ignore-users`, [user.id]);
            message.channel.send(`${user.username} Has been added`);
        }
        if (func === "remove") {
            if (!db.has(`filter_${message.guild.id}_settings-ignore-users`))
                return message.channel.send("There are no ignored users saved");
            db.splice(`filter_${message.guild.id}_settings-ignore-users`, user.id);
            message.channel.send(`${user.username} has been removed`);
        }
        db.save();
    },
};
