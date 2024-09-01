import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createproductDTO, updateproductDTO } from 'src/dto/product.dto';
import { ProductService } from 'src/services/product.service';
import * as fs from 'fs';
import { ResponseHelper } from 'src/helpers/response.helpers';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly responseHelper: ResponseHelper,
  ) {}

  @Get()
  async getAllProduct(@Res() res: Response) {
    try {
      const product = await this.productService.getAllProduct();
      const products = product.map((product) => ({
        ...product,
        product_image: `${process.env.BASED_URL}/static/${product.file}`,
      }));

      return this.responseHelper.responseSuccessData(
        res,
        200,
        'Berhasil mendapatkan data product',
        products,
      );
    } catch (error) {}
  }

  @Get('/trending')
  async getTrendingProduct(@Res() res: Response) {
    try {
      const product = await this.productService.getTrendingProduct();
      const products = product.map((product) => ({
        ...product,
        product_image: `${process.env.BASED_URL}/static/${product.file}`,
      }));

      return this.responseHelper.responseSuccessData(
        res,
        200,
        'Berhasil mendapatkan data product',
        products,
      );
    } catch (error) {}
  }

  @Get('user/:id')
  async getProductByUser(@Res() res: Response, @Param('id') id: number) {
    try {
      const product = await this.productService.getProductByUser(id);
      const products = product.map((product) => ({
        ...product,
        product_image: `${process.env.BASED_URL}/static/${product.file}`,
      }));
      if (!product) {
        return this.responseHelper.responseClientError(
          res,
          404,
          'Product tidak ditemukan',
        );
      }

      return this.responseHelper.responseSuccessData(
        res,
        200,
        'Berhasil mendapatkan data product',
        products,
      );
    } catch (error) {
      return this.responseHelper.responseServerError(res);
    }
  }

  @Get('/:id')
  async getProductById(@Res() res: Response, @Param('id') id: number) {
    try {
      const product = await this.productService.getProductById(id);
      if (!product) {
        return this.responseHelper.responseClientError(
          res,
          404,
          'Product tidak ditemukan',
        );
      }

      const product_image = `${process.env.BASED_URL}/static/${product.file}`;

      return this.responseHelper.responseSuccessData(
        res,
        200,
        'Berhasil mendapatkan data product',
        { product, product_image },
      );
    } catch (error) {
      return this.responseHelper.responseServerError(res);
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createProduct(
    @UploadedFile() file,
    @Res() res: Response,
    @Body(new ValidationPipe()) product: createproductDTO,
  ) {
    try {
      const filePath = `public/${file.originalname}`;

      fs.writeFileSync(filePath, file.buffer);
      const productData = {
        product_name: product.product_name,
        product_desc: product.product_desc,
        category_id: product.category_id,
        user_id: product.user_id,
        file: file.originalname,
        created_by: product.created_by,
      };

      const createdPembayaran =
        await this.productService.createProduct(productData);
      return this.responseHelper.responseSuccessData(
        res,
        201,
        'Product Berhasil dibuat',
        createdPembayaran,
      );
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        if (error.fields.product_name) {
          return this.responseHelper.responseClientError(
            res,
            400,
            'Product sudah terdaftar',
          );
        }
      }
      return this.responseHelper.responseServerError(res);
    }
  }

  @Put('/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateProduct(
    @Res() res: Response,
    @Param('id') id: number,
    @Body(new ValidationPipe()) product: updateproductDTO,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    try {
      const products = await this.productService.getProductById(id);
      if (!products) {
        return this.responseHelper.responseClientError(
          res,
          404,
          'Product tidak ditemukan',
        );
      }
      if (file && file.buffer) {
        let filePath = `public/${products.file}`;
        const newFilePath = `public/${file.originalname}`;
        try {
          fs.unlinkSync(filePath);
        } catch (error) {
          console.log(error);
        }
        fs.writeFileSync(newFilePath, file.buffer);
        filePath = newFilePath;
      }

      if (!file) {
        const productData = {
          product_name: product.product_name,
          product_desc: product.product_desc,
          category_id: product.category_id,
          user_id: product.user_id,
          updated_by: product.updated_by,
        };
        await this.productService.updateProduct(id, productData);
        return this.responseHelper.responseSuccess(
          res,
          200,
          'product berhasil diupdate',
        );
      } else {
        const productData = {
          product_name: product.product_name,
          product_desc: product.product_desc,
          category_id: product.category_id,
          user_id: product.user_id,
          file: file.originalname,
          updated_by: product.updated_by,
        };
        await this.productService.updateProduct(id, productData);
        return this.responseHelper.responseSuccess(
          res,
          200,
          'Product Berhasil di update',
        );
      }
    } catch (error) {
      return this.responseHelper.responseServerError(res);
    }
  }

  @Delete('/:id') async deleteProduct(
    @Res() res: Response,
    @Param('id') id: number,
  ) {
    try {
      const product = await this.productService.getProductById(id);
      if (!product) {
        return this.responseHelper.responseClientError(
          res,
          404,
          'Product tidak ditemukan',
        );
      }
      let filePath = `public/${product.file}`;
      fs.unlinkSync(filePath);
      await this.productService.deleteProduct(id);
      return this.responseHelper.responseSuccess(
        res,
        200,
        'Product Berhasil di hapus',
      );
    } catch (error) {
      return this.responseHelper.responseServerError(res);
    }
  }
}
