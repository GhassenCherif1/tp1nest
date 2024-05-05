import { Injectable } from '@nestjs/common';
import { Cvupdate } from './entities/cvupdate.entety';
import { OnEvent } from '@nestjs/event-emitter';
import { Observable, fromEvent, map } from 'rxjs';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CvEventDto } from './dto/cvevent.dto';

@Injectable()
export class CvupdateService {
constructor(
    @InjectRepository(Cvupdate)
    private cvupdateRepository: Repository<Cvupdate>,
   
) {}

@OnEvent('cvupdate')
async handleCvupdateEvent(event: CvEventDto) {
  try {
    const cvupdate = this.cvupdateRepository.create(event);
    await this.cvupdateRepository.save(cvupdate);
  }
  catch (error) {
    console.error(error);
  }

}
}
