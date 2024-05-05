import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseInterceptors, UploadedFile, UseGuards, NotAcceptableException, Sse } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { RechercheCvDto } from './dto/recherche-cv.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../auth/decorators/user.decorator';
import { PaginationDto } from './dto/pagination-cv.dto';
import { Observable, fromEvent, map } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller({
  path:"cv",
  version: '1'
})
export class CvController {
  constructor(private readonly cvService: CvService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Sse('sse')
  sse(@User() user): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, 'cv-event').pipe(
      map((payload: any) => {
        console.log(payload);
        if (user.userId === payload.user.id || user.role === 'admin')
          return new MessageEvent(payload.eventType, { data: payload });
      }),
    );
  }

  @Post('upload/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file,
    @Param("id",ParseIntPipe) id:number,
    @User() user) {
    const filePath = file.path
    if (file.size >= 1024*1024){
      throw new NotAcceptableException('File Size should be less than 1MB');
    }
    console.log(filePath)
    return this.cvService.addCvImage(id,filePath,user)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body("cv") createCvDto: CreateCvDto,
    @Body("skills") skills: number[],
    @User() user
  ) {
    return this.cvService.create(createCvDto,user,skills);
  }

  @Get("paginated")
  @UseGuards(JwtAuthGuard)
  findAllPaginated(
    @Query() paginatoinDto: PaginationDto,
    @User() user
  ) {
    return this.cvService.findAllPaginated(paginatoinDto,user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(
    @Query() query: RechercheCvDto,
    @User() user
  ) {
    return this.cvService.findAll(query,user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(
    @Param('id',ParseIntPipe) id: number,
    @User() user
  ) {
    return this.cvService.findOne(id,user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id',ParseIntPipe) id: number,
    @Body() updateCvDto: UpdateCvDto,
    @User() user
  ) {
    return this.cvService.update(id, updateCvDto,user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(
    @Param('id', ParseIntPipe) id: number,
    @User() user
  ) {
    return this.cvService.remove(id,user);
  }
}
