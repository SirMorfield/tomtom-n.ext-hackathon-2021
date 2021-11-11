import { Injectable } from '@nestjs/common';
import { Between } from 'typeorm';
import { DataEntity } from './datastorage/datastorage.entity';
import { DataStorageService } from './datastorage/datastorage.service';
import { DeicingService } from './datagetter/deicing.service';
import { Fetcher } from './datagetter/fetcher.service';
import { ParkingSportsService } from './datagetter/parkingspots.service';

interface QueryItems {
	_longitude: number;
	_latitude: number;
	_range: number;
	_maxItems: number;
	_type: string;
}

const multiplier: number = 10000000;

@Injectable()
export class AppService {

	constructor(private dataStorage: DataStorageService,
		private deicingService: DeicingService,
		private parkingSpotsService: ParkingSportsService
	) {
		this.loadDataFromApis();
	}

	async addDataAtCoords(lat: number, long: number): Promise<void> {
		var d = new DataEntity;

		d.latitude = lat * multiplier;
		d.longitude = long * multiplier;
		d.type = "Test";
		this.dataStorage.addData(d);
	}

	getQueryOptions(query: QueryItems, lat, long, rangePrc): Object {
		if (query._type === undefined) {
			return {
				where: {
					latitude: Between(Math.round(lat - rangePrc), Math.round(lat + rangePrc)),
					longitude: Between(Math.round(long - rangePrc), Math.round(long + rangePrc)),
				},
				take: query._maxItems
			};
		} else {
			return {
				where: {
					latitude: Between(Math.round(lat - rangePrc), Math.round(lat + rangePrc)),
					longitude: Between(Math.round(long - rangePrc), Math.round(long + rangePrc)),
					type: query._type,
				},
				take: query._maxItems
			};
		}
	}

	async getDataAtCoords(query: QueryItems): Promise<Object> {

		const rangePrc = query._range * multiplier;
		const lat = query._latitude * multiplier;
		const long = query._longitude * multiplier;
		// await this.dataStorage.addData(d);

		const query_options = this.getQueryOptions(query, lat, long, rangePrc);
		const data = await this.dataStorage.getDataQuery(query_options);

		for (let i = 0; i < data.length; i++) {
			data[i].latitude = data[i].latitude / multiplier;
			data[i].longitude = data[i].longitude / multiplier;
		}
		return JSON.stringify(data);
	}

	async removeAll() {
		this.dataStorage.clear();
	}

	async loadDataFromApis() {
		const icedata: DataEntity[] = await this.deicingService.getData();

		await this.dataStorage.remove({ type: "Strooier" });
		for (let i = 0; i < icedata.length; i++) {
			icedata[i].latitude = Math.round(icedata[i].latitude * multiplier);
			icedata[i].longitude = Math.round(icedata[i].longitude * multiplier);
			await this.dataStorage.addData(icedata[i]);
		}
		console.log("Finished Loading Strooier");
		const parkingdata: DataEntity[] = await this.parkingSpotsService.getData();

		await this.dataStorage.remove({ type: "ParkingGarage" });
		for (let i = 0; i < parkingdata.length; i++) {
			parkingdata[i].latitude = Math.round(parkingdata[i].latitude * multiplier);
			parkingdata[i].longitude = Math.round(parkingdata[i].longitude * multiplier);
			await this.dataStorage.addData(parkingdata[i]);
		}
		console.log("Finished Loading ParkingGarage");
	}

	async getAll() {
		return JSON.stringify(await this.dataStorage.getAllData());
	}
}
