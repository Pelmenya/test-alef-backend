import {
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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  @Get(':id/childs')
  async getUserChilds(@Param('id') id: number) {
    return await this.userService.getUserChilds(id);
  }

  @Delete(':id/childs')
  async deleteChildsByIds(
    @Param('id') id: number,
    @Query() query: { ids: string },
  ) {
    return await this.userService.deleteChildsByIds(
      id,
      JSON.parse(query.ids).join(', '),
    );
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
