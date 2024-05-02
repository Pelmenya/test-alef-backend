import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { TUser } from './types/t.user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<TUser[]> {
    return await this.userRepository.query(`
        SELECT 
	        pu.user_id AS id, 
	        pu.fio, 
	        pu.age, 
	        (SELECT pm.fio FROM public."user" pm WHERE pu."motherUserId" = pm.user_id) mother,
	        (SELECT pf.fio FROM public."user" pf WHERE pu."fatherUserId" = pf.user_id) father
        FROM public."user" pu;
    `);
  }
}
