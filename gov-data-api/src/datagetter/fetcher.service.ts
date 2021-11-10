import { Injectable } from "@nestjs/common";
import { NestFactory } from '@nestjs/core';
import fetch from 'node-fetch';

@Injectable()
export class Fetcher {
	constructor() { }
	async getData(url: string): Promise<any> {
		const response = await fetch(url);
		return response.json();
	}
}
