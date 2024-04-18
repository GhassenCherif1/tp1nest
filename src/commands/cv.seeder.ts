import { NestFactory } from '@nestjs/core';
import {
  randEmail,
  randFilePath,
  randFirstName,
  randJobTitle,
  randLastName,
  randNumber,
  randPassword,
  randSkill,
  randUserName,
} from '@ngneat/falso';
import { SeederModule } from './seeder.module';
import { CvService } from '../cv/cv.service';
import { AuthService } from '../auth/auth.service';
import { SkillService } from '../skill/skill.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);
  const cvService = app.get(CvService);
  const userServices = app.get(AuthService);
  const skillService = app.get(SkillService);
  const skills = [];
  for (let i = 0; i < 10; i++) {
    const skill = await skillService.create({ designation: randSkill() });
    skills.push(skill);
  }
  for (let i = 0; i < 10; i++) {
    const user = await userServices.register({
      username: randUserName(),
      email: randEmail(),
      password: randPassword(),
    });

    const skillIds = [];
    skills.slice(0, i).map((skill) => {
      skillIds.push(skill.id);
    });
    const cv = await cvService.create(
      {
        name: randLastName(),
        firstname: randFirstName(),
        age: i + 18,
        path: randFilePath(),
        job: randJobTitle(),
        cin: randNumber(),
      },
      user,
      skillIds,
    );
  }
  await app.close();
}
bootstrap();
