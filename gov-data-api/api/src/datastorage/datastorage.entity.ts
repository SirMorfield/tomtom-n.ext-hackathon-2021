import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DataEntity
{
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column()
	latitude: number;

	@Column()
	longnitude: number;

	@Column()
	data: string;
}
