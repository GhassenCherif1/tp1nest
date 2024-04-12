import { IsNumber, IsOptional, IsString } from "class-validator";

export class RechercheCvDto{
    @IsOptional()
    age: number;
    @IsOptional()
    @IsString()
    critere: string;
}