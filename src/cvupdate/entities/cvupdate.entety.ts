
import { IsNotEmpty } from "class-validator";
import { User } from "src/auth/entities/user.entity";
import { Cv } from "src/cv/entities/cv.entity";
import { CvupdateType } from "src/enums/cv-events.enum";
import { TimeStampEntities } from "src/generics/timestamps.entites";

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cvupdate extends TimeStampEntities{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: CvupdateType;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @ManyToOne(() => Cv, (cv) => cv.historiques)
  cv: Cv;

  @ManyToOne(() => User, (user) => user.historiques)
  performedBy: User;

}
