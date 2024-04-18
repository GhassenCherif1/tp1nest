import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from '../auth/auth.module';
import { Skill } from '../skill/entities/skill.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cv, Skill]),
    MulterModule.register({
      dest: './public',
    }),
    AuthModule,
  ],
  controllers: [CvController],
  providers: [CvService],
})
export class CvModule {}
