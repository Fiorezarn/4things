import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { likesDTO } from 'src/dto/likes.dto';
import { ResponseHelper } from 'src/helpers/response.helpers';
import { CategoryService } from 'src/services/category.service';
import { LikesService } from 'src/services/likes.service';

@Controller('likes')
export class LikesController {
  constructor(
    private readonly likeService: LikesService,
    private readonly responseHelper: ResponseHelper,
  ) {}

  @Get('/count/:product_id')
  async getLikesCount(@Res() res, @Param() product_id) {
    const likes = await this.likeService.getLikesCount(product_id);
    return this.responseHelper.responseSuccessData(
      res,
      200,
      'Data Like Berhasil',
      likes,
    );
  }

  @Get('/:product_id/:user_id')
  async getLikesByProductandUser(
    @Res() res,
    @Param() product_id,
    @Param() user_id,
  ) {
    const likes = await this.likeService.getLikesByProductandUser(
      product_id,
      user_id,
    );
    return this.responseHelper.responseSuccessData(
      res,
      200,
      'Data Like Berhasil',
      likes,
    );
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createLikes(@Body() likes: likesDTO, @Res() res) {
    try {
      const category = await this.likeService.createLikes(likes);
      return this.responseHelper.responseSuccessData(
        res,
        201,
        'Like berhasil dibuat',
        category,
      );
    } catch (error) {
      console.log(error);
      return this.responseHelper.responseServerError(res);
    }
  }

  @Delete('/:product_id/:user_id')
  async unlike(
    @Res() res,
    @Param('product_id') product_id: number,
    @Param('user_id') user_id: number,
  ) {
    const result = await this.likeService.unlike(product_id, user_id);
    return this.responseHelper.responseSuccessData(
      res,
      200,
      'Like Berhasil dihapus',
      result,
    );
  }

  @Delete('/:product_id')
  async deleteLikes(@Res() res, @Param('product_id') product_id: number) {
    try {
      const result = await this.likeService.deleteLike(product_id);
      return this.responseHelper.responseSuccessData(
        res,
        200,
        'Like Berhasil dihapus',
        result,
      );
    } catch (error) {
      return this.responseHelper.responseServerError(res);
    }
  }
}
