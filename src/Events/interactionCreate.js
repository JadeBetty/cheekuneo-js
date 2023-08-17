import { logger } from 'console-wizard'
export default {
    name: "interactionCreate",
    run: async (interaction, client) => {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return interaction.reply("There is no command with that name! Please contact the developers with this issue!", { ephemeral: true })
            try {
                await command.run(client, interaction);
            } catch (error) {
                logger.error(error)
                return interaction.reply("An error has occurred! Please contact the developers with this issue!", { ephemeral: true })
            }
        } else if (interaction.isAutoComplete()) {
            const command = client.commands.get(interaction.name);
            if (!command) return interaction.reply("There is no auto complete with that name! Please contact the developers with this issue!", { ephemeral: true });
            try {
                await command.authocomplete(interaction, client);
            } catch (error) {
                logger.error(error);
                return interaction.reply("An error has occured! Please contact the developers with this issue!", { ephemeral: true });
            }
        }
    }
}