import { Module } from '@nestjs/common';
import { CvModule } from '../cv/cv.module';
import { SkillModule } from '../skill/skill.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'process';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    CvModule,
    AuthModule,
    SkillModule,
    ConfigModule.forRoot({
      envFilePath: './config/.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true,
    }),
    CvModule,
    SkillModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class SeederModule {}
