import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { TUser } from './types/t.user';
import { UserDTO } from './types/user.dto';

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

  async getUserById(id: number): Promise<TUser> {
    return await this.userRepository.query(`
        SELECT 
	        pu.user_id AS id, 
	        pu.fio, 
	        pu.age, 
	        (SELECT pm.fio FROM public."user" pm WHERE pu."motherUserId" = pm.user_id) mother,
	        (SELECT pf.fio FROM public."user" pf WHERE pu."fatherUserId" = pf.user_id) father
        FROM public."user" pu 
        WHERE pu.user_id = ${id};
    `);
  }

  async createUser(dto: UserDTO) {
    const { father, mother } = dto;
    if (father) {
    }
    if (mother) {
    }
    const newUser = this.userRepository.create(dto);

    await this.userRepository.save(newUser);

    return await this.getUserById(newUser.user_id);
  }

  async checkCountChild(dto: UserDTO) {
    return dto.father;
  }
}
