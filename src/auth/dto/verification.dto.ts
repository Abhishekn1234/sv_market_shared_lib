import { ApiProperty } from "@nestjs/swagger";
import { UserDTO } from "../../users";


export class VerificationDTO {
    @ApiProperty({ example: 'eyJhbGci01....' })
    accessToken: string;
    @ApiProperty({ example: 'eyJhbGci01....' })
    refreshToken: string;
    @ApiProperty({ example: '{"id": 1, "email": "test@gmail.com", "role": "USER", "isVerified": true}' })
    user: Partial<UserDTO>
}