import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Res,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDTO, registerUserDTO, updateUserDTO } from 'src/dto/user.dto';
import { ResponseHelper } from 'src/helpers/response.helpers';
import { UserService } from 'src/services/user.service';

@Controller('auth')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly responseHelper: ResponseHelper,
  ) {}

  @Get('/users')
  async getAllUser(@Res() res) {
    const users = await this.userService.getAllUser();
    return this.responseHelper.responseSuccessData(
      res,
      200,
      'Berhasil mengambil data user',
      users,
    );
  }

  @Post('/register')
  @UsePipes(new ValidationPipe())
  async registerUser(@Body() users: registerUserDTO, @Res() res) {
    try {
      const { user, accessToken } = await this.userService.registerUser(users);
      return this.responseHelper.responseSuccessData(
        res,
        201,
        'user berhasil Registrasi',
        { user, accessToken },
      );
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        if (error.fields.email) {
          return this.responseHelper.responseClientError(
            res,
            400,
            'Email sudah terdaftar',
          );
        }
        if (error.fields.username) {
          return this.responseHelper.responseClientError(
            res,
            400,
            'Username sudah terdaftar',
          );
        }
      }
      if (error.message.includes('foreign key constraint fails')) {
        const tableName = error.table || 'UnknownTable';

        return this.responseHelper.responseClientError(
          res,
          404,
          `Data ${tableName} with that id is not valid`,
        );
      } else {
        if (error.message === 'validation error: Validation failed') {
          return this.responseHelper.responseClientError(
            res,
            400,
            'Validation error',
          );
        }
        return this.responseHelper.responseServerError(res);
      }
    }
  }

  @Post('/login')
  async loginUser(@Body() loginDTO: LoginDTO, @Res() res) {
    const { user, accessToken } = await this.userService.loginUser(loginDTO);
    if (accessToken) {
      return this.responseHelper.responseSuccessData(
        res,
        201,
        'Berhasil Login',
        { user, accessToken },
      );
    } else {
      return this.responseHelper.responseClientError(res, 401, 'Unauthorized');
    }
  }

  @Put('/:email')
  async updateUser(
    @Res() res,
    @Param('email') email,
    @Body() body: updateUserDTO,
  ) {
    try {
      const user = await this.userService.getUserById(email);
      if (!user) {
        return this.responseHelper.responseClientError(
          res,
          404,
          `User dengan email ${email} tidak ditemukan`,
        );
      }
      await this.userService.updateUser(email, body);
      return this.responseHelper.responseSuccess(
        res,
        200,
        `Berhasil Update user dengan email ${email}`,
      );
    } catch (error) {
      return this.responseHelper.responseServerError(error);
    }
  }
}
