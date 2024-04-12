import { IsNumber, IsString } from "class-validator";
import { User } from "src/auth/entities/user.entity";
import { TimeStampEntities } from "src/generics/timestamps.entites";
import { Skill } from "src/skill/entities/skill.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity("cv")
export class Cv extends TimeStampEntities{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    firstname: string;
    @Column()
    age:number;
    @Column()
    cin: number;
    @Column()
    job: string;
    @Column()
    path: string;
    @ManyToOne(type => User , (user) => user.cvs , {
        cascade: ["insert" , "update"],
        nullable: true,
        eager: true
    })
    user:User
    @ManyToMany(() => Skill)
    @JoinTable()
    skills: Skill[]
}
