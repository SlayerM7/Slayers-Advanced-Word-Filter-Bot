module.exports = {
    name: "ignore-admins",
    permissions: ["MANAGE_GUILD"],
    run: (client, message, args, db) => {
        let func = args[0];
        if (!func)
            return message.channel.send("No operation was given");
        if (func === "?on") {
            db.set(`filter_${message.guild.id}_settings.ignore-admins`, true);
            message.channel.send("Now ignoring curses from admins");
        }
        else if (func === "?off") {
            db.set(`filter_${message.guild.id}_settings.ignore-admins`, false);
            message.channel.send("Listening for curses from admins");
        }
        db.save();
    },
};
