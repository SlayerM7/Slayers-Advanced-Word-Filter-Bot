import { MessageEmbed } from "discord.js";

module.exports = {
  name: "settings",
  run(client, message, args, db) {
    let ignoredRolesArr = db.get(
      `filter_${message.guild.id}_settings-ignore-roles`
    );
    let ignoredRolesStr = "";
    if (ignoredRolesArr) {
      ignoredRolesArr.map((rr) => {
        ignoredRolesStr += `\n<@&${rr}>`;
      });
    }

    let ignoredUsersArr = db.get(
      `filter_${message.guild.id}_settings-ignore-users`
    );
    let ignoredUsersStr = "";
    if (ignoredUsersArr) {
      ignoredUsersArr.map((rr) => {
        ignoredUsersStr += `\n<@${rr}>`;
      });
    }

    let ignoredChannelsArr = db.get(
      `filter_${message.guild.id}_settings-ignore-users`
    );
    let ignoredChannelsStr = "";
    if (ignoredChannelsArr) {
      ignoredChannelsArr.map((rr) => {
        ignoredChannelsStr += `\n<#${rr}>`;
      });
    }

    let embed = new MessageEmbed()
      .setColor("RED")
      .setAuthor(
        message.author.username,
        message.author.displayAvatarURL({ dynamic: true })
      );
    if (ignoredRolesStr.length) {
      embed.addField("Roles", ignoredRolesStr);
    }
    if (ignoredUsersStr.length) {
      embed.addField("Users", ignoredUsersStr);
    }
    if (ignoredChannelsStr.length) {
      embed.addField("Channels", ignoredChannelsStr);
    }

    message.channel.send(embed);
  },
};
