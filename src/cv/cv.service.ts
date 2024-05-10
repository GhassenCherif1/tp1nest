import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Repository } from 'typeorm';
import { Cv } from './entities/cv.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { UserRoleEnum } from '../enums/user-role.enum';
import { Skill } from '../skill/entities/skill.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CvEventDto } from 'src/cvupdate/dto/cvevent.dto';
import { CvupdateType } from 'src/enums/cv-events.enum';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private cvRepository : Repository<Cv>,
    @InjectRepository(Skill)
    private skillRepository : Repository<Skill>,
    private authservice: AuthService,
    private readonly eventEmitter: EventEmitter2,
  ){

  }
  async create(newCv: CreateCvDto, user, skillIds: number[]) {
    const cv = this.cvRepository.create(newCv);
    cv.user = user;
    const skills = [];
    if (Array.isArray(skillIds)) {
      await Promise.all(skillIds.map(async (id) => {
        const skill = await this.skillRepository.findOneBy({ id: id });
        skills.push(skill);
      }));
    }
    cv.skills = skills;
    
    
    const x=await this.cvRepository.save(cv);
    this.eventEmitter.emit('cvupdate',new CvEventDto(CvupdateType.CREATE,x,user));
    console.log("cv created : ", x);
    
    return x;
  }

  async findAllPaginated(paginatoinDto,user){
    const{page,limit} = paginatoinDto;
    const qb = this.cvRepository.createQueryBuilder('cv');
    if (page > 0 && limit > 0) {
      const skip = (page - 1) * limit; // Calculate skip offset based on page and limit
      qb.skip(skip).take(limit);
    }
    return(qb.getMany())
  }

  async findAll(query,user) {
    const {critere, age} = query;
    const qb = this.cvRepository.createQueryBuilder('cv');
    console.log(user.id)
    const userId = user.id
    if(user.role == UserRoleEnum.ADMIN)
      qb.andWhere("")
    else
      qb.where("cv.userId = :userId").setParameters({userId})
    if (critere) {
      qb.andWhere('cv.name LIKE :critere or cv.firstName LIKE :critere or cv.job LIKE :critere ')
        .setParameters({critere});
    }
    if (age) {
      qb.andWhere('cv.age = :age').setParameters({age});
    }
    console.log(qb.getSql())
    return await qb.getMany()
  }

  async findOne(id: number,user) {
    
    const cv= await this.cvRepository.findOneBy({id})
    if(!cv)
      throw new NotFoundException(`Le cv d'id ${id} n'existe pas`);
    if(this.authservice.isOwnerOrAdmin(cv,user))
      return cv
    throw new UnauthorizedException()
  }

  async update(id: number, updateCvDto: UpdateCvDto,user) {
    const cv = await this.cvRepository.preload({
      id,
      ...updateCvDto
    })
    if(!cv)
      throw new NotFoundException(`Le cv d'id ${id} n'existe pas`);
    const cv1 = await this.cvRepository.findOneBy({id})
    if(this.authservice.isOwnerOrAdmin(cv1,user))
      {
       const newcv=await  this.cvRepository.save(cv)
       this.eventEmitter.emit('cvupdate',new CvEventDto(CvupdateType.UPDATE,newcv,user));
       return newcv;}
    else 
      throw new UnauthorizedException()
  }

  async remove(id: number,user) {
    const cv = await this.cvRepository.findOneBy({id})
    if(this.authservice.isOwnerOrAdmin(cv,user))
      { const newcv=await  this.cvRepository.save(cv)
        this.eventEmitter.emit('cvupdate',new CvEventDto(CvupdateType.UPDATE,newcv,user));
        return newcv;}
    else 
      throw new UnauthorizedException()
  }

  async addCvImage(id:number, filePath:string,user){

    const cv= await this.cvRepository.findOneBy({id})
    if(!cv)
      throw new NotFoundException(`Le cv d'id ${id} n'existe pas`);
    if(this.authservice.isOwnerOrAdmin(cv,user))
      return this.cvRepository.update(id,{path:filePath})
    throw new UnauthorizedException()
    
  }
  
}
