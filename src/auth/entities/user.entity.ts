import { Cv } from '../../cv/entities/cv.entity';
import { UserRoleEnum } from '../../enums/user-role.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @Column({ unique: true })
  email: string;
  @Column()
  salt: string;
  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role: string;
  @OneToMany((type) => Cv, (cv) => cv.user, {
    nullable: true,
  })
  cvs: Cv[];
}
