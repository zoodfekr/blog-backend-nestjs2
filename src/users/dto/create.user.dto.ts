import { IsString, IsNumber, IsEnum, IsNotEmpty, Min } from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export class CreateUserDto {
    @IsNumber()
    @Min(1)
    userId: number;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(Role)
    @IsNotEmpty()
    roles: Role;
}