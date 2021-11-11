import { Inject, Injectable } from "@nestjs/common";
import { Between, Repository } from "typeorm";
import { DataEntity } from "./datastorage.entity";

@Injectable()
export class DataStorageService {
	constructor(
		@Inject('DATA_REPOSITORY')
		private dataRepo: Repository<DataEntity>,
	) { }

	async getAllData(): Promise<DataEntity[]> {
		return await this.dataRepo.find();
	}

	async getDataQuery(findobject: Object): Promise<DataEntity[]> {
		return await this.dataRepo.find(findobject);
	}

	async addData(data: DataEntity) {
		await this.dataRepo.save(data);
	}

	async clear() {
		const data: DataEntity[] = await this.getAllData();
		for (let i = 0; i < data.length; i++) {
			const e = data[i];
			this.dataRepo.delete(e);

		}
	}

	async remove(obj: Object) {
		const data: DataEntity[] = await this.dataRepo.find(obj);
		for (let i = 0; i < data.length; i++) {
			await this.dataRepo.remove(data[i]);
		}
	}
}
