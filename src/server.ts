import { app } from "./app.js";
import dotenv from "dotenv";
import { prisma } from "./lib/prisma.js";
dotenv.config();

const PORT = process.env.PORT || 5001;

async function server() {
  try {
    await prisma.$connect();

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (err: any) {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

server();
