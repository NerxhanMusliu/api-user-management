import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Team } from './entities/team.entity';
import { Model } from 'mongoose';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name) private readonly teamModel: Model<Team>,
  ) {}

  create(createTeamDto: CreateTeamDto) {
    const team = new this.teamModel(createTeamDto);
    return team.save();
  }

  findAll() {
    return this.teamModel.find().exec();
  }

  async findOne(id: string) {
    return await this.getById(id);
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    try {
      const existingTeam = await this.teamModel
        .findOneAndUpdate({ _id: id }, { $set: updateTeamDto }, { new: true })
        .exec();
      if (!existingTeam) {
        throw new NotFoundException(`Team with #${id} not found`);
      }
      return existingTeam;
    } catch {
      throw new NotFoundException(`Team with #${id} not found`);
    }
  }

  async remove(id: string) {
    const team = await this.getById(id);
    return team.remove();
  }

  private async getById(id: string) {
    try {
      const team = await this.teamModel.findOne({ _id: id }).exec();
      if (!team) {
        throw new NotFoundException(`Team with #${id} not found`);
      }
      return team;
    } catch {
      throw new NotFoundException(`Team with #${id} not found`);
    }
  }
}
