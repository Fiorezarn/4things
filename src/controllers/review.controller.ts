import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { createreviewDTO } from 'src/dto/review.dto';
import { ResponseHelper } from 'src/helpers/response.helpers';
import { ReviewService } from 'src/services/review.service';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly responseHelper: ResponseHelper,
  ) {}

  @Get()
  async getAllReview(@Res() res: Response) {
    try {
      const data = await this.reviewService.getAllReview();
      return this.responseHelper.responseSuccessData(res, 200, 'success', data);
    } catch (error) {
      return this.responseHelper.responseServerError(res);
    }
  }

  @Get('/:id')
  async getReview(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.reviewService.getReviewByProductId(id);
      if (!data) {
        return this.responseHelper.responseSuccessData(
          res,
          200,
          'Data Kosong',
          [],
        );
      }
      return this.responseHelper.responseSuccessData(res, 200, 'success', data);
    } catch (error) {
      return this.responseHelper.responseServerError(res);
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createReview(@Body() review: createreviewDTO, @Res() res: Response) {
    try {
      const data = await this.reviewService.createReview(review);
      return this.responseHelper.responseSuccessData(
        res,
        201,
        'Review Berhasil dibuat',
        data,
      );
    } catch (error) {
      console.log(error);
      return this.responseHelper.responseServerError(res);
    }
  }

  @Delete('/:id')
  async deleteReview(@Param('id') id: number, @Res() res: Response) {
    try {
      const review = await this.reviewService.getReviewById(id);
      if (!review) {
        return this.responseHelper.responseClientError(
          res,
          404,
          `Review dengan id ${id} tidak ditemukan`,
        );
      }
      const data = await this.reviewService.deleteReview(id);
      return this.responseHelper.responseSuccessData(res, 200, 'success', data);
    } catch (error) {
      console.log(error);
      return this.responseHelper.responseServerError(res);
    }
  }

  @Delete('/product/:id')
  async deleteReviewByProductId(@Param('id') id: number, @Res() res: Response) {
    try {
      const data = await this.reviewService.deleteReviewByProductId(id);
      return this.responseHelper.responseSuccessData(res, 200, 'success', data);
    } catch (error) {
      console.log(error);
      return this.responseHelper.responseServerError(res);
    }
  }
}
