import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot(),
    TasksModule,
    AuthModule
  ],
})
export class AppModule {
  constructor(private readonly orm: MikroORM) {}
  async onModuleInit(): Promise<void> {
    const generator = this.orm.getSchemaGenerator();
    await generator.updateSchema();
  }
}
