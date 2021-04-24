"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { commands } = require("../index");
module.exports = {
    name: "help",
    run(client, message, args, db) {
        // let arr = [];
        // console.log(commands);
        // commands.map((cmd) => {
        //   cmd.push(
        //     `${db.has(
        //       `prefixes_${message.guild.id}`
        //         ? db.get(`prefixes_${message.guild.id}`)
        //         : require("../../config.json").prefix
        //     )}${cmd.name}`
        //   );
        // });
        // message.channel.send(
        //   new MessageEmbed()
        //     .setColor("BLUE")
        //     .setAuthor(
        //       message.author.username,
        //       message.author.displayAvatarURL({ dynamic: true })
        //     )
        //     .setDescription(arr.join("\n"))
        // );
    },
};
