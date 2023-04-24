import { Client, ClientConfig } from "pg";
import "dotenv/config";

const config = () => {
  return {
    user: process.env.DB_TEST_USER,
    password: process.env.DB_TEST_PASSWORD,
    host: process.env.DB_TEST_HOST,
    database: process.env.DB_TEST,
    port: parseInt(process.env.DB_TEST_PORT!),
  };
};

const client: Client = new Client(config());

export default client;
