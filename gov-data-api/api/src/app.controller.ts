import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Get()
	async getAll(): Promise<string> {
		return await this.appService.getAll();
	}

	@Get('coords/')
	async getDataAtCoords(@Query('lat') latitude, @Query('long') longitude, @Query('max') maxItems, @Query('range') range, @Query('type') type): Promise<Object> {
		const ob = {
			_latitude: latitude,
			_longitude: longitude,
			_maxItems: maxItems === undefined ? 1000.0 : maxItems,
			_range: range === undefined ? 0.1 : range,
			_type: type
		}
		console.log(ob);
		return this.appService.getDataAtCoords(ob);
	}

	@Get('add/')
	async addDataAtCoords(@Query('lat') latitude, @Query('long') longitude): Promise<void> {

		await this.appService.addDataAtCoords(latitude, longitude);
	}

	@Get("loaddata/")
	async loadDataFromApis() {
		this.appService.loadDataFromApis();
	}

	@Get('clear')
	async clear() {
		console.log("removing stuff");
		return this.appService.removeAll();
	}

}
