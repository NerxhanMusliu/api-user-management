import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserGuard } from '../common/guards/create-user.guard';
import { Public } from '../common/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(CreateUserGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(CreateUserGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(CreateUserGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(CreateUserGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(CreateUserGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('super-admin')
  @Public()
  createSuperAdmin() {
    const adminData = {
      firstName: 'Super',
      lastName: 'Admin',
      email: 'super-admin@gmail.com',
      password: '123456',
      role: 'super-admin',
      organizationId: [],
      teamId: [],
    };
    return this.usersService.create(adminData);
  }
}
