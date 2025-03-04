require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const axios = require("axios");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers, // Required for detecting new members
  ],
});

const WEBHOOK_URL =
  "https://canary.discord.com/api/webhooks/1346269849768431767/2HPXwtJKmR6Lxb7lNWXuKY41GJm7bx6BV4Rgx48iOplP0IOghAUGd3rgCXaFnHYU-KEx";

client.once("ready", () => {
  console.log(`✅ Bot is online as ${client.user.tag}`);
});

client.on("guildMemberAdd", async (member) => {
  try {
    await axios.post(WEBHOOK_URL, {
      content: `📢 A new member **${member.user.tag}** joined **${member.guild.name}**!`,
    });
    console.log(
      `✅ Webhook sent: ${member.user.tag} joined ${member.guild.name}`
    );
  } catch (error) {
    console.error("❌ Failed to send Webhook:", error);
  }
});

client.login(process.env.TOKEN);
