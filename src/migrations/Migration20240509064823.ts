import { Migration } from '@mikro-orm/migrations';

export class Migration20240509064823 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "task" ("id" uuid not null default gen_random_uuid(), "title" varchar(255) not null, "description" varchar(255) not null, "status" varchar(255) not null, constraint "task_pkey" primary key ("id"));',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "task" cascade;');
  }
}
