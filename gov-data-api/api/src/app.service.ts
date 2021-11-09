import { Injectable } from '@nestjs/common';
import { Between } from 'typeorm';
import { DataEntity } from './datastorage/datastorage.entity';
import { DataStorageService } from './datastorage/datastorage.service';

@Injectable()
export class AppService {

	constructor(private dataStorage: DataStorageService) {}

	async addDataAtCoords(lat: number, long: number): Promise<void> {
		var d = new DataEntity;

		d.latitude=  lat;
		d.longnitude = long;
		d.data = "digned";
		this.dataStorage.addData(d);
	}

  async getDataAtCoords(lat: number, long: number): Promise<Object> {
	
	const range = 0.01;
	// await this.dataStorage.addData(d);
	this.dataStorage.clear();
	return "Data" + JSON.stringify(await this.dataStorage.getDataQuery(
		{latitude: Between(lat - range / 2, lat + range / 2),
		 longnitude: Between(long - range / 2, long + range / 2)
		}
	));	
	// return {
	// 		latitude: lat,
	// 		longnitude: long,
	// 		data: [
	// 			{
	// 				type: "Strooiroute",
	// 				value: {}
	// 			}
	// 		]
	// 	};
  }

  async removeAll()
  {
	  this.dataStorage.clear();
  }

  async getAll() {
	  return JSON.stringify(await this.dataStorage.getAllData());
  }
}
