import * as fs from "fs"

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

export class Strooier {
	json_file	: string;
	coords		: number[][] = [];
	constructor(filename) {
		this.json_file = fs.readFileSync(filename).toString();
	}

	parse() {
		const obj : StrooiFile = JSON.parse(this.json_file);

		console.log(obj.type);
		const feat = obj.features[1];
		console.log(feat);
		if (feat === undefined || feat.geometry === undefined)
		{
			return;
		}
		for (let i1 = 0; i1 < feat.geometry.coordinates.length; i1++) {
			if (feat.geometry.coordinates[i1] === undefined)
				continue;
				for (let i2 = 0; i2 < feat.geometry.coordinates[i1]!.length; i2++) {
				const lat: number | undefined = feat.geometry.coordinates[i1][i2][1];
				const long: number | undefined = feat.geometry.coordinates[i1][i2][0];
				
				if (lat !== undefined && long !== undefined)
				{
					this.coords.push([lat, long]);
				}
			
				// for (let i3 = 0; i3 < feat.geometry.coordinates[i1][i2].length; i3++) {
				// 	console.log(feat.geometry.coordinates[i1][i2][i3]);
				// }
			}
		}
		console.log(this.coords);
	}
}
