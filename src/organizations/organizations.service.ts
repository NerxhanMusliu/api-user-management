import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Organization } from './entities/organization.entity';
import { Model } from 'mongoose';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel(Organization.name)
    private readonly organizationModel: Model<Organization>,
  ) {}

  create(createOrganizationDto: CreateOrganizationDto) {
    const organization = new this.organizationModel(createOrganizationDto);
    return organization.save();
  }

  findAll() {
    return this.organizationModel.find().exec();
  }

  async findOne(id: string) {
    const organization = await this.organizationModel
      .findOne({ _id: id })
      .exec();
    if (!organization) {
      throw new NotFoundException(`Organization with #${id} not found`);
    }
    return organization;
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    const existingOrganization = await this.organizationModel
      .findOneAndUpdate(
        { _id: id },
        { $set: updateOrganizationDto },
        { new: true },
      )
      .exec();

    if (!existingOrganization) {
      throw new NotFoundException(`Organization with #${id} not found`);
    }
    return existingOrganization;
  }

  async remove(id: string) {
    const organization = await this.organizationModel
      .findOne({ _id: id })
      .exec();
    if (!organization) {
      throw new NotFoundException(`Organization with #${id} not found`);
    }
    return organization.remove();
  }
}
