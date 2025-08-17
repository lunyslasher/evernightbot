import type { Command } from "@/types/command"
import { type ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js"

const command: Command = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check bot working status"),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const clientPing = interaction.client.ws.ping
        await interaction.reply({ content: `Up! (\`${clientPing}\`ms)`, flags: MessageFlags.Ephemeral })
        return
    }
}

export default command