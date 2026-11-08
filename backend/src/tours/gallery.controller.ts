import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { CreateGalleryImageDto } from './dto/create-gallery-image.dto.js';
import { UpdateGalleryImageDto } from './dto/update-gallery-image.dto.js';
import { ToursService } from './tours.service.js';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly toursService: ToursService) {}

  @Get()
  findAll() {
    return this.toursService.findGallery();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.toursService.findGalleryImage(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  create(@Body() dto: CreateGalleryImageDto) {
    return this.toursService.createGalleryImage(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateGalleryImageDto,
  ) {
    return this.toursService.updateGalleryImage(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.toursService.removeGalleryImage(id);
  }
}
