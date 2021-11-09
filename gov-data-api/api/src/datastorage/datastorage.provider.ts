import { Connection } from 'typeorm';
import { DataEntity } from './datastorage.entity';

export const DataStorageProvider = [
	{
		provide: 'DATA_REPOSITORY',
		useFactory: (connection: Connection) =>
			connection.getRepository(DataEntity),
		inject: ['DATABASE_CONNECTION'],
	},
];
