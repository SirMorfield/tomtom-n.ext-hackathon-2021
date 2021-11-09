import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { DataStorageProvider } from "./datastorage.provider";
import { DataStorageService } from "./datastorage.service";


@Module({
	imports: [DatabaseModule],
	controllers: [],
	providers: [...DataStorageProvider, DataStorageService],
	exports: [DataStorageService, ...DataStorageProvider],
})
export class DataStorageModule {}
