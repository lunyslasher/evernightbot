import * as dotenv from "dotenv"
dotenv.config()

export const config = {
  token: process.env.DISCORD_TOKEN || "",
  id: process.env.DISCORD_ID || "",
  redis_url: process.env.REDIS_URL || ""
};
