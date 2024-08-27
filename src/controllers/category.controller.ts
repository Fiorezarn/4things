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
import { createcategoryDTO } from 'src/dto/category.dto';
import { ResponseHelper } from 'src/helpers/response.helpers';
import { CategoryService } from 'src/services/category.service';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly responseHelper: ResponseHelper,
  ) {}

  @Get()
  async getCategories(@Res() res: Response) {
    try {
      const data = await this.categoryService.getAllCategory();
      return this.responseHelper.responseSuccessData(res, 200, 'success', data);
    } catch (error) {
      return this.responseHelper.responseServerError(res);
    }
  }

  @Get('/:id')
  async getCategoryById(@Param('id') id: number, @Res() res: Response) {
    try {
      const data = await this.categoryService.getCategoryById(id);
      return this.responseHelper.responseSuccessData(res, 200, 'success', data);
    } catch (error) {
      return this.responseHelper.responseServerError(res);
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createReview(
    @Body() category: createcategoryDTO,
    @Res() res: Response,
  ) {
    try {
      const data = await this.categoryService.createCategory(category);
      return this.responseHelper.responseSuccessData(res, 201, 'success', data);
    } catch (error) {
      return this.responseHelper.responseServerError(res);
    }
  }

  @Delete('/:id')
  async deleteCategory(@Param('id') id: number, @Res() res: Response) {
    try {
      const data = await this.categoryService.deleteCategory(id);
      return this.responseHelper.responseSuccessData(
        res,
        200,
        'Category Berhasil dihapus',
        data,
      );
    } catch (error) {
      return this.responseHelper.responseServerError(res);
    }
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async updateCategory(
    @Res() res: Response,
    @Param('id') id: number,
    @Body() category: createcategoryDTO,
  ) {
    try {
      const data = await this.categoryService.updateCategory(id, category);
      return this.responseHelper.responseSuccess(res, 200, 'success');
    } catch (error) {
      return this.responseHelper.responseServerError(res);
    }
  }
}
