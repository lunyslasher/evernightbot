import { Client } from 'discord.js';
import { config } from '@/config';
import { loadEvents } from '@/loaders/events';
import { loadCommands } from '@/loaders/commands';
import redis from './redisClient';
const client: Client = new Client({
  intents: Array(),
});

(async () => {
  await loadEvents(client);
  await loadCommands(client);
  await redis.connect();
  await client.login(config.token);
})();
