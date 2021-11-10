import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
			type: 'postgres',
			host: 'postgres',
			port: 5432,
			username: 'postgres',
			password: 'codam',
			database: 'tomtom',
			entities: [],
			// autoLoadEntities: true,
			synchronize: true
}

export default config;
