import type { SlashCommandOptionsOnlyBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js"

type Command = {
    data: SlashCommandOptionsOnlyBuilder | SlashCommandSubcommandsOnlyBuilder,
    execute: (...args: any[]) => void
}