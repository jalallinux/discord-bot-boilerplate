require("module-alias/register");
const path = require("path");
const chalk = require("chalk");
const log = console.log;
const fs = require("fs");
const mongo = require("@database/mongo");
const config = require("@src/config.json");
const { Client } = require("discord.js");

const client = new Client();
const loadCommands = require("@commands/init/load");

client.on("ready", async () => {
  log(chalk.bgGreen.black(`- - - The ${client.user.tag} is on ready now ...`));

  /** Load all of bot command here */
  loadCommands(client);
});

client.login(config.botToken);
