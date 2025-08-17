import type { Client, ClientEvents, Events } from "discord.js"

type Event = {
    type: keyof ClientEvents,
    execute: (client: Client, ...args: any[]) => void
}