import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/core';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TasksModule,
    MikroOrmModule.forRoot(),
    AuthModule
  ],
})
export class AppModule {
  constructor(private readonly orm: MikroORM) {}
  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up();
  }
}
