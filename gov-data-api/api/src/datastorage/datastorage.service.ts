import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { DataEntity } from "./datastorage.entity";

@Injectable()
export class DataStorageService {
	constructor (
        @Inject('DATA_REPOSITORY')
        private dataRepo: Repository<DataEntity>,
    ) {}

	async getData(): Promise<DataEntity>
	{
		return await this.dataRepo.find()[0];
	}

	async addData(data: DataEntity)
	{
		await this.dataRepo.save(data);
		console.log("wow! we saved a thing");
	}


}
