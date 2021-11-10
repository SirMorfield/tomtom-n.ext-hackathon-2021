import { Injectable } from "@nestjs/common";
import { DataEntity } from "src/datastorage/datastorage.entity";
import { DataStorageService } from "src/datastorage/datastorage.service";

@Injectable()
export class DataGetterService{

	constructor (private dataStorage: DataStorageService)
	{}

	async addItem() {
		this.dataStorage.getAllData();
	}

}
