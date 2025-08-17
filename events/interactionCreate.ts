import { Command } from "@/types/command"
import type { Event } from "@/types/event"
import { type Interaction, type Client, Events } from "discord.js"

const event: Event = {
    type: Events.InteractionCreate,
    execute: async (_client: Client, interaction: Interaction) => {
        if(interaction.isChatInputCommand()){
            const commandName = interaction.commandName
            const { default: command }: { default: Command } = await import(`@/commands/${commandName}`);
            command.execute(interaction)
            return
        }
        return
    }
}

export default event