# 🤖 Discord Bot Boilerplate

This is a boilerplate for creating a Discord bot using TypeScript, based on `ts-quickstart-boilerplate`.

## 🚀 Features
- **TypeScript Support**: Fully typed for a better development experience
- **Modular Structure**: Easy to maintain and scale
- **Environment Variables**: Uses `dotenv` for secure configuration
- **Basic Command Handler**: Easily add new commands
- **Logging System**: Preconfigured logging for debugging

## 📦 Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/discord-bot-boilerplate.git
   cd discord-bot-boilerplate
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Copy the `.env.example` file and rename it to `.env`, then fill in the required values:
   ```sh
   cp .env.example .env
   ```

## ⚙️ Configuration

Edit the `.env` file and provide your bot token:
```
DISCORD_TOKEN=your-bot-token-here
```

## 🚀 Running the Bot

To start the bot in development mode with live reload:
```sh
npm run dev
```

To build and run in production:
```sh
npm run build
npm start
```

## 📜 License
This project is licensed under the MIT License.

