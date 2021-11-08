import * as http from "http"
import * as fs from "fs"
import fetch from 'node-fetch'

export class Api {
	readonly key: string = JSON.parse(fs.readFileSync("private.json").toString()).apiKey;
	rootPath: string;

	constructor(path: string) {
		this.rootPath = path;
		console.log(this.key);
		// const url: string = "http://api.tomtom.com/map/1/tile/basic/main/0/0/0.png?view=Unified&key=" + this.key;
		// http.get(url, (callback) => {
		// 	console.log(callback);			
		// });
	}

	async getRequest(path: string): Promise<any> {
		const url: string = this.rootPath + path + "&key=" + this.key;
		const response = await fetch(url);
		const json = await response.text();
		return json;
	}
	async postRequest(path: string): Promise<any> {
		const url: string = this.rootPath + path;
		http.get(url, (callback) => {
			// console.log(callback);
		});
	}
}
