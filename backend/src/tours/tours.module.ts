import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { DestinationsController } from './destinations.controller.js';
import { GalleryController } from './gallery.controller.js';
import { ToursController } from './tours.controller.js';
import { ToursService } from './tours.service.js';

@Module({
  imports: [AuthModule],
  controllers: [ToursController, DestinationsController, GalleryController],
  providers: [ToursService],
})
export class ToursModule {}
