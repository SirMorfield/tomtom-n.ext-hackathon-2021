import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import  config  from './orm-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DataStorageModule } from './datastorage/datastorage.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), DatabaseModule,
	DataStorageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
