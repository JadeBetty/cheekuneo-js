import { client } from "../lib/cheekuneo.js";
import glob from "glob"
import { promisify } from 'util';
const globPromise = promisify(glob);
import logger from "../lib/logger.js";
import { pathToFileURL } from 'url'

export default async function HandleEvents() {
    const eventFiles = await globPromise(`${process.cwd().replace(/\\/g, '/')}/src/Events/*.js`);

    eventFiles.forEach(async file => {
        const { default: event } = await import(pathToFileURL(file).toString());
        if (!event || !event.name) return logger.warn(`One event is lacking a event object!`)
        client.on(event.name, (...args) => event.run(...args, client));
    })

    logger.success(`${eventFiles.length} events have been loaded.`)
}