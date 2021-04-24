module.exports = {
  name: "ignore-nsfw",
  permissions: ["MANAGE_GUILD"],
  run(client, message, args, db) {
    let func = args[0];
    if (!func) return message.channel.send("No opertion was given");
    if (func === "?on")
      db.set(`filter_${message.guild.id}_settings.ignore-nsfw`, true);
    if (func === "?off")
      db.set(`filter_${message.guild.id}_settings.ignore-nsfw`, false);
    db.save();
    message.channel.send("Nsfw setting has been changed");
  },
};
