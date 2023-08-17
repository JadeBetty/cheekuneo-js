import { Collection, EmbedBuilder } from "discord.js";
import { readdirSync } from "fs";
import { Routes, REST } from "discord.js";
import config from "../config.js"
import { client } from "./cheekuneo.js"
import { logger } from "console-wizard"
const table = []
const slashcommands = [];
export default async function RegisterCommands() {
    client.commands = new Collection();

    const subfolders = readdirSync('./src/Commands');
    for (let i = 0; i < subfolders.length; i++) {
        const subfolder = subfolders[i];
        const scfiles = readdirSync(`./src/Commands/${subfolder}`).filter(file => file.endsWith(".js"));
        for (const file of scfiles) {
            const slash = await (await import(`../Commands/${subfolder}/${file}`)).default
            if (!slash || !slash.data || !slash.data.name) {
                table.push({ name: "Missing Data", registered: "not loaded"})
                logger.warn(`One of the command is missing a data!`);
                logger.info(logger.table(table));
                return;
            }
            client.commands.set(slash.data.name, slash);
            slashcommands.push(slash.data.toJSON());
            table.push({ name: slash.data.name, registered: "loaded" })
            logger.success(`${slashcommands.length} commands have been loaded.`);
        }
    }

    const rest = new REST({ version: "10" }).setToken(process.env.environment.toLowerCase() == "prod" ? process.env.prodToken : process.env.devToken);
    if (process.env.environment.toLowerCase() == "dev") {
        try {
            const data = await rest.put(
                Routes.applicationGuildCommands(config.clientId, config.guildId),
                { body: slashcommands }
            );
            client.slashId = new Map(data.map((e) => [e.name, e.id]));
            logger.table(table)
        } catch (error) {
            logger.warn(error);
        }
    }
    if (process.env.environment.toLowerCase() == "prod") {
        try {
            const data = await rest.put(
                Routes.applicationCommands(config.clientId),
                { body: slashcommands }
            )
            client.slashId = new Map(data.map((e) => [e.name, e.id]));
            logger.table(table)
        } catch (error) {
            logger.warn(error)
        }
    }
}