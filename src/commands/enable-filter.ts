module.exports = {
  name: "enable-filter",
  permissions: ["MANAGE_GUILD"],
  run: (client, message, args, db) => {
    db.set(`filter_${message.guild.id}`, true);
    db.save();
    message.channel.send("The filter has been enabled");
  },
};
