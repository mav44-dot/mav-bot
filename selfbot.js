require("dotenv").config();
const { Client } = require("discord.js-selfbot-v13");
const axios = require("axios");
const keep_alive = require("./keep_alive");

const client = new Client();
const WEBHOOK_URL =
  "https://canary.discord.com/api/webhooks/1346388777366720552/dQmwl3T9xShVqPVDiCH0vHWK3uQjIhjb0dVSjkFlmRAwNRgXEUOSFoLoqaJp2KmBl-3-";

const recentJoins = new Set(); // Prevent duplicate notifications

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag} - Process ID: ${process.pid}`);
});

keep_alive();

client.on("guildMemberAdd", async (member) => {
  console.log(`guildMemberAdd event triggered for ${member.user.tag}`);

  if (recentJoins.has(member.id)) return; // Prevent duplicate triggers
  recentJoins.add(member.id);

  setTimeout(() => {
    recentJoins.delete(member.id);
  }, 5000);

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
