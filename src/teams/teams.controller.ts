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
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { CreateTeamGuard } from '../common/guards/create-team.guard';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @UseGuards(CreateTeamGuard)
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  @UseGuards(CreateTeamGuard)
  findAll() {
    return this.teamsService.findAll();
  }

  @Get(':id')
  @UseGuards(CreateTeamGuard)
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(CreateTeamGuard)
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  @UseGuards(CreateTeamGuard)
  remove(@Param('id') id: string) {
    return this.teamsService.remove(id);
  }
}
