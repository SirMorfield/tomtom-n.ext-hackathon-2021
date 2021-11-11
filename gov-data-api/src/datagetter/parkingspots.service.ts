import { Injectable } from "@nestjs/common";
import { Fetcher } from "./fetcher.service";
import { DataEntity } from "src/datastorage/datastorage.entity";

interface ParkingProperties {
	name: string;
	pubdate: string;
	type: string;
	state: string;
	free_space_short: string;
	free_space_long: string;
	short_capacity: string;
	long_capacity: string
}

interface ParkingGeometry {
	type: string;
	coordinates: number[];
}

interface ParkingGarage {
	type: string;
	id: string;
	geometry: ParkingGeometry;
	properties: ParkingProperties;
}

interface ParkingSpotFile {
	type: string;
	features: ParkingGarage[];
}

@Injectable()
export class ParkingSportsService {
	readonly url = "http://opd.it-t.nl/data/amsterdam/ParkingLocation.json";

	constructor(private fetchService: Fetcher) { }

	parseFeature(data: ParkingGarage, rval: DataEntity[]) {
		let toAdd: DataEntity = new DataEntity;

		toAdd.longitude = data.geometry.coordinates[0];
		toAdd.latitude = data.geometry.coordinates[1];
		toAdd.points = JSON.stringify([toAdd.latitude, toAdd.longitude]);

		toAdd.type = "ParkingGarage";
		toAdd.details = JSON.stringify(data.properties);
		rval.push(toAdd);
	}

	async getData(): Promise<DataEntity[]> {
		const data: ParkingSpotFile = await this.fetchService.getData(this.url);

		let rval: DataEntity[] = [];

		const spots: ParkingGarage[] = data.features;

		for (let i = 0; i < spots.length; i++) {
			this.parseFeature(spots[i], rval);
		}
		return rval;
	}
}
