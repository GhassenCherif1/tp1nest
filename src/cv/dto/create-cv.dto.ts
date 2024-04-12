import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCvDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    firstname: string;
    @IsNotEmpty()
    @IsNumber()
    @Type(()=>Number)
    age:number;
    @IsNotEmpty()
    @IsNumber()
    @Type(()=>Number)
    cin: number;
    @IsNotEmpty()
    @IsString()
    job: string;
    @IsNotEmpty()
    @IsString()
    path: string;
}
