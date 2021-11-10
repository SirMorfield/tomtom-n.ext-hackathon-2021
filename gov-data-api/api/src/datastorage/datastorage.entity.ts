import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DataEntity {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	points: string;

	@Column()
	latitude: number;

	@Column()
	longitude: number;

	@Column()
	type: string;

	@Column()
	details: string;
}
