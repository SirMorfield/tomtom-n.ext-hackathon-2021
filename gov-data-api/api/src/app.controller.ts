import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController 
{
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAll(): Promise<string> {
    return await this.appService.getAll();
  }

  @Get('coords/')
  async getDataAtCoords(@Query('lat') latitude, @Query('long') longnitude): Promise<Object> {
	  return this.appService.getDataAtCoords(latitude, longnitude);
  }

  @Get('add/')
  async addDataAtCoords(@Query('lat') latitude, @Query('long') longnitude): Promise<void> {
		await this.appService.addDataAtCoords(latitude, longnitude);
	}

  @Get('clear')
  async clear() {
	  console.log("removing stuff");
	  return this.appService.removeAll();
  }
}
