import type { Command } from '@/types/command';
import enka from '@/utils/enka';
import { AttachmentBuilder, type ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import Config from '@/utils/config';

const command: Command = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('Generate a config for SR from your original game data')
        .addStringOption(option => option.setName(`uid`).setDescription(`Your in-game UID`)),
    execute: async (interaction: ChatInputCommandInteraction) => {
        console.log(`[COMMAND] User ${interaction.user?.username} uses ${command.data.name} with ${interaction.options?.data[0]?.value}`);
        const uid = interaction.options.getString(`uid`);

        if (!uid || Number.isNaN(parseInt(uid))) {
            await interaction.reply(`Invalid UID`);
            return;
        }

        await interaction.deferReply({});

        const avatars = await enka.fetchUser(uid);

        if (!avatars) return;

        const config = new Config(avatars);

        const jsonFile = new AttachmentBuilder(Buffer.from(JSON.stringify(config, null, 4)), {
            name: `config.json`,
        });

        return await interaction.editReply({
            files: [jsonFile],
        });
    },
};

export default command;
