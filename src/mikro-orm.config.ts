import * as dotenv from 'dotenv';
dotenv.config();
import { Migrator } from '@mikro-orm/migrations'
import { defineConfig } from "@mikro-orm/postgresql";

export default defineConfig({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  extensions: [Migrator],
})
