import type { Event } from "@/types/event";
import type { Client } from "discord.js";
import fs from "node:fs";
import path from "node:path";

const loadEvents = async (client: Client) => {
    let count = 0;
   
    const eventsPath = fs.existsSync("./.build/events") ? "./.build/events" : "./events";
    const events = fs
        .readdirSync(eventsPath)
        .filter((file) => (file.endsWith(".ts") || file.endsWith(".js")) && !file.endsWith(".d.ts"));
   
    const promises = events.map(async (file) => {
        count++;
        const filePath = path.join(process.cwd(), eventsPath, file);
        const { default: event }: { default: Event } = await import(filePath);
        return [event.type, (...args: any[]) => event.execute(client, ...args)] as const;
    });
   
    for (const [type, handler] of await Promise.all(promises)) {
        client.on(type, handler as (...args: any[]) => void);
    }
   
    console.log(`[INFO] ${count} events loaded`);
};

export { loadEvents };