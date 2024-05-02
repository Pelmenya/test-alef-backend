import { IsNumber, IsString } from 'class-validator';
import { DeepPartial } from 'typeorm';
import { User } from '../user.entity';

export class UserDTO {
  @IsString() fio: string;
  @IsNumber() age: number;
  @IsNumber() mother?: DeepPartial<User>;
  @IsNumber() father?: DeepPartial<User>;
}
