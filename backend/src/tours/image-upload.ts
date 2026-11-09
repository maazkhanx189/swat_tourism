import { BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID } from 'node:crypto';
import { join } from 'node:path';

const extensionsByMimeType: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
};

const uploadDirectory = process.env.VERCEL
  ? '/tmp/uploads'
  : join(process.cwd(), 'uploads');

export const TourImageInterceptor = FileInterceptor('file', {
  storage: diskStorage({
    destination: uploadDirectory,
    filename: (_request, file, callback) => {
      callback(
        null,
        `${randomUUID()}${extensionsByMimeType[file.mimetype]}`,
      );
    },
  }),
  limits: {
    fileSize: 4 * 1024 * 1024,
    files: 1,
  },
  fileFilter: (_request, file, callback) => {
    if (!Object.hasOwn(extensionsByMimeType, file.mimetype)) {
      callback(
        new BadRequestException(
          'Only JPEG, PNG, and WebP images are allowed.',
        ),
        false,
      );
      return;
    }

    callback(null, true);
  },
});
