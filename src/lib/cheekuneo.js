import { Client } from 'discord.js';
import HandleEvents from '../config/HandleEvents.js';
import RegisterCommands from '../config/RegisterSlashcommands.js';
import MongoConnection from '../config/MongoConnection.js';
import dotenv from 'dotenv';
import logger from './logger.js';

const intents = [
    "Guilds",
    "GuildMessages",
    "MessageContent"
];
export const client = new Client({ intents: intents });

export async function Cheekuneo() {
    dotenv.config();
    const environment = process.env.environment.toLowerCase() == "prod" ? process.env.prodtoken : process.env.devtoken;
    client.login(environment).then(() => logger.success(`${client.user.tag} has been logged in!`));
    RegisterCommands();
    HandleEvents();
    MongoConnection();
}