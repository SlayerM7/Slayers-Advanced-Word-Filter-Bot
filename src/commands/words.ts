import { MessageEmbed } from "discord.js";

module.exports = {
  name: "words",
  permissions: ["MANAGE_GUILD"],
  run(client, message, args, db) {
    let filter = db.get(`filter_${message.guild.id}`);
    if (!filter) return message.channel.send("The word-filter is disabled");
    let words = db.get(`filter_${message.guild.id}_words`);
    if (!words) return message.channel.send("There are no filterd words saved");
    let embed = new MessageEmbed()
      .setColor("BLUE")
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setDescription(words.join(", "));

    message.channel.send(embed);
  },
};
