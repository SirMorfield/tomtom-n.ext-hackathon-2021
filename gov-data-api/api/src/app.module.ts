import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './orm-config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DataStorageModule } from './datastorage/datastorage.module';
import { DeicingService } from './datagetter/deicing.service'
import { DatagetterModule } from './datagetter/datagetter.module';

@Module({
	imports: [TypeOrmModule.forRoot(config), DatabaseModule,
		DataStorageModule, DatagetterModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
