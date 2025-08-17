import { config } from "@/config";
import{createClient} from 'redis';

const client = createClient({
    url: process.env.NODE_ENV == `PRODUCTION` ? config.redis_url : `redis://host.docker.internal:6379`
});

client.on(`error`, (err) => {
    console.error(err);
});

client.on(`ready`, () => {
    console.log(`[INFO] Connected to Redis`)
})

export default client;
