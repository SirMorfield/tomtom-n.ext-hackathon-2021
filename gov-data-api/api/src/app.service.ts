import { Injectable } from '@nestjs/common';
import { Between } from 'typeorm';
import { DataEntity } from './datastorage/datastorage.entity';
import { DataStorageService } from './datastorage/datastorage.service';

@Injectable()
export class AppService {

	constructor(private dataStorage: DataStorageService) {}

	async addDataAtCoords(lat: number, long: number): Promise<void> {
		var d = new DataEntity;

		d.latitude=  lat * 1000000;
		d.longnitude = long * 1000000;
		d.data = "digned";
		this.dataStorage.addData(d);
	}

  async getDataAtCoords(lat: number, long: number): Promise<Object> {
	
	const rangePrc = 250000;
	lat = lat * 1000000;
	long = long * 1000000;
	// await this.dataStorage.addData(d);
	return "Data" + JSON.stringify(await this.dataStorage.getDataQuery(
		{
			latitude: Between(Math.round(lat - rangePrc), Math.round(lat + rangePrc)),
		 	longnitude: Between(Math.round(long -  rangePrc), Math.round(long + rangePrc))
		}
	));	
  }

  async removeAll()
  {
	  this.dataStorage.clear();
  }

  async getAll() {
	  return JSON.stringify(await this.dataStorage.getAllData());
  }
}
