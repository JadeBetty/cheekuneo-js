import { Client, ActivityType, PresenceUpdateStatus } from 'discord.js';
import HandleEvents from './HandleEvents.js';
import RegisterCommands from './RegisterCommands.js';
import MongoConnection from './MongoConnection.js';
import dotenv from 'dotenv';
import { logger } from 'console-wizard';

const intents = ['Guilds', 'GuildMessages', 'MessageContent'];

function setActivityStatus(client) {
  const activities = [
    {
      name: 'Better than Sans the Skeleton',
      type: ActivityType.Playing,
    },
    {
      name: 'main-chat, the help channel',
      type: ActivityType.Listening,
    },
    {
      name: "keita's media stash",
      type: ActivityType.Watching,
    },
    {
      name: 'Daki.cc',
      type: ActivityType.Playing,
    },
  ];
  setInterval(
    () => {
      const randomActivityIndex = Math.floor(Math.random() * activities.length);
      console.log(activities[randomActivityIndex]);
      client.user.setPresence({
        activities: [activities[randomActivityIndex]],
        status: PresenceUpdateStatus.Online,
      });
    },
    2 * 60 * 60 * 1000 /* 2 hours*/
  );
}
export const client = new Client({ intents: intents });

export async function Cheekuneo() {
  dotenv.config();
  const environment =
    process.env.environment.toLowerCase() == 'prod'
      ? process.env.prodtoken
      : process.env.devtoken;
  client
    .login(environment)
    .then(() => logger.success(`${client.user.tag} has been logged in!`));
  RegisterCommands();
  HandleEvents();
  MongoConnection();
  setActivityStatus(client);
}
