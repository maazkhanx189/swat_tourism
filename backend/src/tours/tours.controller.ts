import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import type { Express } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { CreateTourPackageDto } from './dto/create-tour-package.dto.js';
import { UpdateTourPackageDto } from './dto/update-tour-package.dto.js';
import { TourImageInterceptor } from './image-upload.js';
import { ToursService } from './tours.service.js';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Get()
  findAll() {
    return this.toursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.toursService.findOne(id);
  }

  @Post('upload')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(TourImageInterceptor)
  uploadImage(@UploadedFile() file?: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Choose an image file to upload.');
    }

    return { image: `/uploads/${file.filename}` };
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(TourImageInterceptor)
  create(
    @Body() dto: CreateTourPackageDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const image = file ? `/uploads/${file.filename}` : dto.image;
    if (!image) {
      throw new BadRequestException('Provide an image URL or upload an image file.');
    }

    return this.toursService.create({
      name: dto.name,
      price: dto.price,
      duration: dto.duration,
      description: dto.description,
      destinations: dto.destinations,
      includes: dto.includes,
      image,
      ...(dto.badge === undefined ? {} : { badge: dto.badge }),
    });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(TourImageInterceptor)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTourPackageDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.toursService.update(id, {
      name: dto.name,
      price: dto.price,
      duration: dto.duration,
      description: dto.description,
      destinations: dto.destinations,
      includes: dto.includes,
      image: file ? `/uploads/${file.filename}` : dto.image,
      badge: dto.badge,
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.toursService.remove(id);
  }
}
