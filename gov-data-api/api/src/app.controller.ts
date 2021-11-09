import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController 
{
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return await this.appService.getAll();
  }

  @Get('coords/')
  async getDataAtCoords(@Query('lat') latitude, @Query('long') longnitude): Promise<Object> {
	  return this.appService.getDataAtCoords(latitude, longnitude);
  }

  @Get('add/')
  async addDataAtCoords(@Query('lat') latitude, @Query('long') longnitude): Promise<string> {
	  await this.appService.addDataAtCoords(latitude, longnitude);
		return "all good";
	}

  @Get('clear')
  async clear() {
	  return this.appService.removeAll();
  }
}
