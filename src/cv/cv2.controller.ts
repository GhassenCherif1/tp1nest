import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, Req } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { RechercheCvDto } from './dto/recherche-cv.dto';
import { Request } from 'express';

/*@Controller({
    path:"cv",
    version: '2'
  })
export class Cv2Controller {
  constructor(private readonly cvService: CvService) {}

  @Post()
  create(@Body() createCvDto: CreateCvDto , @Req() req: Request) {
    //verification with user id but i don't have it now
    return this.cvService.create(createCvDto);
  }

  @Get()
  findAll(
    @Query() query: RechercheCvDto ,  @Req() req: Request
  ) {
    console.log("marche")
    return this.cvService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.cvService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updateCvDto: UpdateCvDto) {
    return this.cvService.update(id, updateCvDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cvService.remove(id);
  }
}
*/