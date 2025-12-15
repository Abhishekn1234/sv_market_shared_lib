import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginInput {
    @ApiProperty({
        example: 'test@gmail.com',
        description: 'User email',
        required: true,
    })
    @IsEmail()
    email: string;
    @ApiProperty({
        example: 'test123',
        description: 'User password',
        required: true,
    })
    @IsString()
    password: string;
}