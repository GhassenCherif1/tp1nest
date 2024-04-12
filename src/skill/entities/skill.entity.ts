import { TimeStampEntities } from "src/generics/timestamps.entites";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Skill extends TimeStampEntities{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    designation: string;
}
