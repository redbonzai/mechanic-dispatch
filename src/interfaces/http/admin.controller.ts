import {
  Controller,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFiles,
  Get,
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MechanicsService } from '../../application/mechanics/mechanics.service';
import { CreateMechanicDto } from './dto/create-mechanic.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { CreateMechanicData } from '../../domain/mechanics/repositories/mechanic.repository';
import { CreateReviewData } from '../../domain/mechanics/repositories/review.repository';

@Controller('admin')
export class AdminController {
  constructor(private readonly mechanicsService: MechanicsService) {}

  // Mechanics Management
  @Get('mechanics')
  async getMechanics(@Query('isActive') isActive?: string) {
    const active = isActive === 'true' ? true : isActive === 'false' ? false : undefined;
    return this.mechanicsService.getMechanics(active);
  }

  @Post('mechanics')
  @UseInterceptors(
    FilesInterceptor('image', 1, {
      storage: diskStorage({
        destination: './uploads/mechanics',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `mechanic-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(null, true);
        } else {
          cb(new Error('Only image files are allowed!'), false);
        }
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    }),
  )
  async createMechanic(
    @Body() dto: CreateMechanicData,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    const imageUrl = files && files.length > 0 ? `/uploads/mechanics/${files[0].filename}` : dto.imageUrl;
    return this.mechanicsService.createMechanic({
      ...dto,
      imageUrl,
    });
  }

  @Put('mechanics/:id')
  @UseInterceptors(
    FilesInterceptor('image', 1, {
      storage: diskStorage({
        destination: './uploads/mechanics',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `mechanic-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(null, true);
        } else {
          cb(new Error('Only image files are allowed!'), false);
        }
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async updateMechanic(
    @Param('id') id: string,
    @Body() dto: Partial<CreateMechanicData>,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    const imageUrl = files && files.length > 0 ? `/uploads/mechanics/${files[0].filename}` : dto.imageUrl;
    return this.mechanicsService.updateMechanic(id, {
      ...dto,
      imageUrl,
    });
  }

  @Delete('mechanics/:id')
  async deleteMechanic(@Param('id') id: string) {
    await this.mechanicsService.deleteMechanic(id);
    return { success: true };
  }

  // Reviews Management
  @Post('reviews')
  @UseInterceptors(
    FilesInterceptor('photos', 10, {
      storage: diskStorage({
        destination: './uploads/reviews',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `review-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(null, true);
        } else {
          cb(new Error('Only image files are allowed!'), false);
        }
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async createReview(
    @Body() dto: CreateReviewDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    const photoUrls =
      files && files.length > 0
        ? files.map((file) => `/uploads/reviews/${file.filename}`)
        : dto.photoUrls ?? [];
    return this.mechanicsService.createReview({
      ...dto,
      photoUrls,
    });
  }

  @Put('reviews/:id')
  @UseInterceptors(
    FilesInterceptor('photos', 10, {
      storage: diskStorage({
        destination: './uploads/reviews',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `review-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(null, true);
        } else {
          cb(new Error('Only image files are allowed!'), false);
        }
      },
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async updateReview(
    @Param('id') id: string,
    @Body() dto: Partial<CreateReviewDto>,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    const photoUrls =
      files && files.length > 0
        ? files.map((file) => `/uploads/reviews/${file.filename}`)
        : dto.photoUrls;
    return this.mechanicsService.updateReview(id, {
      ...dto,
      photoUrls,
    });
  }

  @Delete('reviews/:id')
  async deleteReview(@Param('id') id: string) {
    await this.mechanicsService.deleteReview(id);
    return { success: true };
  }

  @Get('skills')
  async getSkills() {
    return this.mechanicsService.getSkills();
  }
}





