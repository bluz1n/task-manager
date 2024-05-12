import { Migration } from '@mikro-orm/migrations';

export class Migration20240512073316 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" uuid not null default gen_random_uuid(), "username" varchar(255) not null, "password" varchar(255) not null, constraint "user_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user" cascade;');
  }

}
