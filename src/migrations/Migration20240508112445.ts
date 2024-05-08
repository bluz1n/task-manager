import { Migration } from '@mikro-orm/migrations';

export class Migration20240508112445 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "task" alter column "id" type text using ("id"::text);');

    this.addSql('alter table "task" alter column "id" drop default;');
    this.addSql('alter table "task" alter column "id" type varchar(255) using ("id"::varchar(255));');
  }

  async down(): Promise<void> {
    this.addSql('alter table "task" alter column "id" drop default;');
    this.addSql('alter table "task" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "task" alter column "id" set default uuid_generate_v4();');
  }

}
