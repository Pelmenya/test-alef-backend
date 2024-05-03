import { IsNumber, IsOptional, IsString } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { User } from '../user.entity';

export class UserDTO {
  @IsNumber() user_id?: number;
  @IsString() fio: string;
  @IsNumber() age: number;
  @IsOptional() @IsNumber() mother?: DeepPartial<User>;
  @IsOptional() @IsNumber() father?: DeepPartial<User>;
}
