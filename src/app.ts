import { Api } from "./api"
import { Strooier } from "./strooi_parsing"
import * as fs from "fs"

interface TestNest {
	type : string;
}

interface TestJson {
	type : string;
	item : TestNest;
}

function main() {
	const connection: Api = new Api("https://api.tomtom.com");

	// const get_request: string = "/search/2/categorySearch/pizza.json?lat=37.337&lon=-121.8"

	// connection.getRequest(get_request).then((data: string) => {
	// 	console.log(JSON.parse(data));
	// });

	const str = new Strooier("data-strooi.geojson");

	str.parse();

}

main();
