import { config } from "@/config";
import type { Command } from "@/types/command";
import { type Client, REST, Routes } from "discord.js";
import fs from "node:fs";
import path from "node:path";

const loadCommands = async (client: Client) => {
    const commands = new Map<string, Command>();
    const commandsPath = fs.existsSync("./.build/commands") ? "./.build/commands" : "./commands";
   
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => (file.endsWith(".ts") || file.endsWith(".js")) && !file.endsWith(".d.ts"));
   
    for (const file of commandFiles) {
        try {
            const filePath = path.join(process.cwd(), commandsPath, file);
            const { default: command }: { default: Command } = await import(filePath);
           
            if (!command.data || !command.execute) {
                console.warn(`[WARN] Command in ${file} is invalid (missing data or execute)`);
                continue;
            }
           
            commands.set(command.data.name, command);
        } catch (error) {
            console.error(`[ERROR] Error while loading command ${file}:`, error);
        }
    }
   
    client.commands = commands as any;
   
    if (commands.size > 0) {
        const rest = new REST({ version: "10" }).setToken(config.token);
        const commandsData = Array.from(commands.values()).map(cmd => cmd.data.toJSON());
       
        try {
            await rest.put(Routes.applicationCommands(config.id),
                { body: commandsData }
            );
            console.log(`[INFO] ${commandFiles.length} commands loaded`);
        } catch (error) {
            console.error("[ERROR] Error while registering slash commands:", error);
        }
    }
   
    return commands;
};

declare module "discord.js" {
    interface Client {
        commands: Map<string, Command>;
    }
}

export { loadCommands };