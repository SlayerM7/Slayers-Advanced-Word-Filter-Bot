module.exports = {
  name: "disable-filter",

  permissions: ["MANAGE_GUILD"],
  run: (client, message, args, db) => {
    db.set(`filter_${message.guild.id}`, false);
    db.save();
    message.channel.send("The filter has been disabled");
  },
};
