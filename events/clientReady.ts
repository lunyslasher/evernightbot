import type { Event } from "@/types/event";
import { type Client, ActivityType, Events } from "discord.js";

const event: Event = {
    type: Events.ClientReady,
    execute: (client: Client) => {
        console.log(`[INFO] ${client.user!.username} is ready!`);

        client.user!.setActivity({ 
            type: ActivityType.Playing, 
            name: "Evernight-SR"
        });
    }
};

export default event;
