require("dotenv").config();
const { Client } = require("discord.js-selfbot-v13");
const keep_alive = require("./keep_alive");

const client = new Client();
const recentJoins = new Set(); // Prevent duplicate notifications
const CHANNEL_ID = "1346388583426031698"; // Replace with the target channel ID

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
  }, 5000); // Remove after 5 seconds

  try {
    const channel = client.channels.cache.get(CHANNEL_ID);
    if (channel) {
      channel.send(
        `📢 A new member **${member.user.tag}** joined **${member.guild.name}**!`
      );
      console.log(
        `Message sent: ${member.user.tag} joined ${member.guild.name}`
      );
    } else {
      console.error("Channel not found. Make sure the bot has access to it.");
    }
  } catch (error) {
    console.error("Failed to send message:", error);
  }
});

client.login(process.env.TOKEN);
