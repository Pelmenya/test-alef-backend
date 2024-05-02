import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { TUser } from './types/t.user';
import { UserDTO } from './types/user.dto';
import { ERROR, numberOfChild } from './constants/constants';

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
    await this.checkCountOfChild(dto);

    const newUser = this.userRepository.create(dto);

    await this.userRepository.save(newUser);

    return await this.getUserById(newUser.user_id);
  }

  async checkCountOfChild(dto: UserDTO) {
    const { father, mother } = dto;
    if (father) {
      const countChildByFather = await this.userRepository.query(`
            SELECT 
                COUNT(*)
            FROM public."user" pu
            WHERE pu."fatherUserId" = ${father};`);
      if (countChildByFather[0].count >= numberOfChild) {
        throw new BadRequestException(ERROR.numberOfChildByFather);
      }
    }
    if (mother) {
      const countChildByMother = await this.userRepository.query(`
        SELECT 
            COUNT(*)
        FROM public."user" pu
        WHERE pu."motherUserId" = ${mother};`);
      if (countChildByMother[0].count >= numberOfChild) {
        throw new BadRequestException(ERROR.numberOfChildByMother);
      }
    }
  }
}
