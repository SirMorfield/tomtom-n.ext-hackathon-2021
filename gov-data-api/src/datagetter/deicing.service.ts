import { Injectable } from "@nestjs/common";
import { Fetcher } from "./fetcher.service";
import { DataEntity } from "src/datastorage/datastorage.entity";

interface StreetProperties {
	Level: number;
	Catagorie: string;
	Verantwoor: string;
}

interface StreetGeometry {
	type: string;
	coordinates: number[][][];
}

interface StrooiStreet {
	type: string;
	properties: StreetProperties;
	geometry: StreetGeometry;

}

interface StrooiFile {
	type: string;
	crs: Object;
	features: StrooiStreet[];
}

@Injectable()
export class DeicingService {
	constructor(private fetcherService: Fetcher) { }
	readonly dataUrl = "https://api.data.amsterdam.nl/dcatd/datasets/vvGHXPpALcokUw/purls/8EqXH8zmgts5eA";

	parseFeature(data: StrooiStreet, rval: DataEntity[]) {
		for (let j = 0; j < data.geometry.coordinates.length; j++) {
			const coordinates: number[][] = data.geometry.coordinates[j];
			let toAdd = new DataEntity;

			const middleOfCoords = Math.floor(coordinates.length / 2);
			toAdd.longitude = coordinates[middleOfCoords][0];
			toAdd.latitude = coordinates[middleOfCoords][1];
			toAdd.type = "Strooier";
			toAdd.points = JSON.stringify(coordinates);
			toAdd.details = "";
			rval.push(toAdd);
		}
	}

	async getData(): Promise<DataEntity[]> {
		const data: StrooiFile = await this.fetcherService.getData(this.dataUrl);
		let rval: DataEntity[] = [];

		const streets: StrooiStreet[] = data.features;

		for (let i = 0; i < streets.length; i++) {
			this.parseFeature(streets[i], rval);
		}
		return rval;
	}

}
