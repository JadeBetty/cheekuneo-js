import { ChannelType, SlashCommandBuilder, EmbedBuilder} from "discord.js";
import getColor from 'get-image-colors'
export default {
    data: new SlashCommandBuilder()
        .setName("serverinfo")
        .setDescription("Server information"),
    run: async (client, interaction) => {
        if(!interaction.guild) return;

        const totalCategories = interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildCategory);
        const totalThreads = interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.PublicThread || channel.type === ChannelType.PrivateThread);
        const totalChannels = (interaction.guild.channels.cache.size || 0) - totalCategories - totalThreads;
        const numChannels = interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildText).size;
        const numVoicechannel = interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice).size;
        const numForumChannel = interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildForum).size;
        const colors = await getColor(`${interaction.guild.iconURL({ extension: "png"})}`);
        const hexcolors = colors.map(color => color.hex());
        const primaryhexcolors = hexcolors[0];

        const serverCreatedTimestamp = Math.floor(interaction.guild.createdTimestamp / 1000);

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle(interaction.guild.name)
                .setThumbnail(`${interaction.guild.iconURL()}`)
                .setColor(primaryhexcolors)
                .setFields([
                    {
                        name: 'Server ID',
                        value: `${interaction.guild?.id}`,
                        inline: true,
                    },
                    {
                        name: 'Total Members',
                        value: `${interaction.guild?.memberCount}`,
                        inline: true,
                    },
                    {
                        name: 'Server Owner',
                        value: `<@${interaction.guild?.ownerId}>`,
                        inline: true,
                    },
                    {
                        name: 'Server Created',
                        value: `<t:${serverCreatedTimestamp}:R>`,
                        inline: true,
                    },
                    {
                        name: 'Total Boosts',
                        value: `${interaction.guild?.premiumSubscriptionCount}`,
                        inline: true,
                    },
                    {
                        name: 'Total Channels',
                        value: `${totalChannels}`,
                        inline: true,
                    },
                    {
                        name: 'Text Channels',
                        value: `${numChannels}`,
                        inline: true,
                    },
                    {
                        name: 'Voice Channels',
                        value: `${numVoicechannel}`,
                        inline: true,
                    },
                    {
                        name: 'Forum Channels',
                        value: `${numForumChannel}`,
                        inline: true,
                    },
                ])
            ]
        })
        
    }
}