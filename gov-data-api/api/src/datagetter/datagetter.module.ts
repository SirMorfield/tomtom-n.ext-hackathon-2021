import { Module } from '@nestjs/common';
import { DataEntity } from 'src/datastorage/datastorage.entity'
import { DeicingService } from './deicing.service';
import { ParkingSportsService } from './parkingspots.service';
import { Fetcher } from './fetcher.service';


@Module({
	imports: [DataEntity],
	controllers: [],
	providers: [Fetcher, DeicingService, ParkingSportsService],
	exports: [Fetcher, DeicingService, ParkingSportsService],
})
export class DatagetterModule { }
