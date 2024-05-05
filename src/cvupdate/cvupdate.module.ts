import { Module } from '@nestjs/common';
import { CvupdateService } from './cvupdate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cvupdate } from './entities/cvupdate.entety';
import { Cv } from 'src/cv/entities/cv.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Cvupdate,Cv])]  ,
  providers: [CvupdateService],
})
export class CvupdateModule {}
