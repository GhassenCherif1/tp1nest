import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as dotenv from "dotenv";
import helmet from "helmet"
var morgan = require('morgan')

dotenv.config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet())
  app.use(morgan('dev'))
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted :true 
  }))
  app.enableVersioning({
    type: VersioningType.URI,
  })
  await app.listen(process.env.APP_PORT);
}
bootstrap();
