module.exports = {
    name: "ignore-roles",
    permissions: ["MANAGE_GUILD"],
    run(client, message, args, db) {
        let func = args[0];
        if (!func)
            return message.channel.send("No operation was given");
        let role = message.mentions.roles.first();
        if (!role)
            return message.channel.send("No role was mentioned");
        if (func === "add") {
            db.has(`filter_${message.guild.id}_settings-ignore-roles`)
                ? db.push(`filter_${message.guild.id}_settings-ignore-roles`, role.id)
                : db.set(`filter_${message.guild.id}_settings-ignore-roles`, [role.id]);
            message.channel.send(`${role.name} Has been added`);
        }
        if (func === "remove") {
            if (!db.has(`filter_${message.guild.id}_settings-ignore-roles`))
                return message.channel.send("There are no ignored roles saved");
            db.splice(`filter_${message.guild.id}_settings-ignore-roles`, role.id);
            message.channel.send(`${role.name} has been removed`);
        }
        db.save();
    },
};
