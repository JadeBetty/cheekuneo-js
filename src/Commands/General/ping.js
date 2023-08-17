import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { humanizeMillisecond } from '../../utils/HumanizeMillisecond.js';
export default {
  category: 'General',
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription(`View the connection status.`),
  async run(client, interaction) {
    const message = await interaction.deferReply();
    const clientPing = message.createdTimestamp - interaction.createdTimestamp;
    const websocketPing = client.ws.ping;
    const clientPingEmoji = getPingStatusInEmoji(clientPing);
    const websocketPingEmoji = getPingStatusInEmoji(websocketPing);
    const uptimeMS = client.uptime ?? 0;
    const { hours, minutes } = humanizeMillisecond(uptimeMS);
    await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setTitle(':ping_pong:Ping Status')
          .setColor('Blurple')
          .setDescription('Information about the latency and uptime!')
          .addFields(
            {
              name: 'Ping',
              value: `Client: ${clientPingEmoji} ${clientPing}ms\n Websocket: ${websocketPingEmoji} ${websocketPing}ms`,
              inline: true,
            },
            {
              name: 'Uptime',
              value: `${hours} hours, ${minutes} mintues`,
              inline: true,
            }
          )
          .setTimestamp(),
      ],
    });
  },
};

const getPingStatusInEmoji = (ping) => {
  if (ping < 150) {
    return '🟢';
  }
  if (ping < 350) {
    return '🟡';
  }
  return '🔴';
};
