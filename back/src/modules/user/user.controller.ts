import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './types/user.dto';
import { IdValidationPipe } from 'src/pipes/id-validation/id-validation.pipe';
import { ERROR } from './constants/constants';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', IdValidationPipe) id: number) {
    return await this.userService.getUserById(id);
  }

  @Get(':id/childs')
  async getUserChilds(@Param('id', IdValidationPipe) id: number) {
    return await this.userService.getUserChilds(id);
  }

  @Delete(':id/childs')
  async deleteChildsByIds(
    @Param('id', IdValidationPipe) id: number,
    @Query() query: { ids: string },
  ) {
    const ids: number[] = JSON.parse(query.ids);
    if (Array.isArray(ids)) {
      if (ids.length) {
        return await this.userService.deleteChildsByIds(id, ids.join(', '));
      }
    }
    throw new BadRequestException(ERROR.NOT_ARRAY);
  }

  @Post()
  async createUser(@Body() dto: UserDTO) {
    return await this.userService.createUser(dto);
  }

  @Put()
  async updateUser(@Body() dto: UserDTO) {
    return await this.userService.updateUser(dto);
  }
}
