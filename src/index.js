require("module-alias/register");
const path = require("path");
const chalk = require("chalk");
const log = console.log;
const fs = require("fs");
const mongo = require("@database/mongo");
const config = require("@src/config.json");
const { Client } = require("discord.js");

const client = new Client();
client.on("ready", async () => {
  log(chalk.bgGreen.black(`- - - The ${client.user.tag} is on ready now ...`));

  const baseFile = "command-base.js";
  const commandBase = require(`@commands/${baseFile}`);

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir));
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file));
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file));
      } else if (file !== baseFile) {
        const option = require(path.join(__dirname, dir, file));
        commandBase(client, option);
      }
    }
  };

  readCommands("commands");
});

client.login(config.botToken);
