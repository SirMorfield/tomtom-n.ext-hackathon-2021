import { Injectable } from '@nestjs/common';
import { DataEntity } from './datastorage/datastorage.entity';
import { DataStorageService } from './datastorage/datastorage.service';

@Injectable()
export class AppService {

	constructor(private dataStorage: DataStorageService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getDataAtCoords(lat: number, long: number): Promise<Object> {
	var d = new DataEntity;
	
	d.latitude=  -1;
	d.longnitude = -1;
	d.data = "kankeeeer";
	await this.dataStorage.addData(d);
	return "Data" + JSON.stringify(await this.dataStorage.getData());	
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
}
