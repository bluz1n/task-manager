import { Migration } from '@mikro-orm/migrations';

export class Migration20240515045435 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "user" add constraint "user_username_unique" unique ("username");',
    );

    this.addSql('alter table "task" add column "user_id" uuid not null;');
    this.addSql(
      'alter table "task" add constraint "task_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "task" drop constraint "task_user_id_foreign";');

    this.addSql('alter table "task" drop column "user_id";');

    this.addSql('alter table "user" drop constraint "user_username_unique";');
  }
}
