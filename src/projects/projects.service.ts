import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './entities/project.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private readonly projectModel: Model<Project>,
  ) {}
  create(createProjectDto: CreateProjectDto) {
    const project = new this.projectModel(createProjectDto);
    return project.save();
  }

  findAll() {
    return this.projectModel.find().exec();
  }

  async findOne(id: string) {
    return await this.getById(id);
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    try {
      const existingProject = await this.projectModel
        .findOneAndUpdate(
          { _id: id },
          { $set: updateProjectDto },
          { new: true },
        )
        .exec();
      if (!existingProject) {
        throw new NotFoundException(`Project with #${id} not found`);
      }
      return existingProject;
    } catch {
      throw new NotFoundException(`Project with #${id} not found`);
    }
  }

  async remove(id: string) {
    const project = await this.getById(id);
    return project.remove();
  }

  private async getById(id: string) {
    try {
      const project = await this.projectModel.findOne({ _id: id }).exec();
      if (!project) {
        throw new NotFoundException(`Project with #${id} not found`);
      }
      return project;
    } catch {
      throw new NotFoundException(`Project with #${id} not found`);
    }
  }
}
