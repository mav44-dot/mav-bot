require("dotenv").config();
const { Client } = require("discord.js-selfbot-v13");
const axios = require("axios");
const keep_alive = require("./keep_alive");

const client = new Client();
const WEBHOOK_URL =
  "https://canary.discord.com/api/webhooks/1346269849768431767/2HPXwtJKmR6Lxb7lNWXuKY41GJm7bx6BV4Rgx48iOplP0IOghAUGd3rgCXaFnHYU-KEx";

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);
});

keep_alive();

client.on("guildMemberAdd", async (member) => {
  try {
    await axios.post(WEBHOOK_URL, {
      content: `📢 A new member **${member.user.tag}** joined **${member.guild.name}**!`,
    });
    console.log(`Webhook sent: ${member.user.tag} joined ${member.guild.name}`);
  } catch (error) {
    console.error("Failed to send Webhook:", error);
  }
});

client.login(process.env.TOKEN);
