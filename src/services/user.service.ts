import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/models/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from 'src/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: typeof UserModel,
    private readonly jwtService: JwtService,
  ) {}

  async getAllUser(): Promise<UserModel[]> {
    return this.userRepository.findAll<UserModel>();
  }

  async getUserById(email: number): Promise<UserModel> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
      });
      return user;
    } catch (error) {
      throw new error();
    }
  }

  private generateAccessToken(user: UserModel): string {
    const payload = { username: user.username, sub: user.user_id };
    return this.jwtService.sign(payload);
  }
  async registerUser(
    userData,
  ): Promise<{ user: UserModel; accessToken: string }> {
    const { username, full_name, email, role, password, created_by } = userData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create<UserModel>({
      username,
      full_name,
      email,
      role,
      password: hashedPassword,
      created_by,
    });

    const accessToken = this.generateAccessToken(user);

    return { user, accessToken };
  }

  private async validateUser(
    username: string,
    password: string,
  ): Promise<UserModel | null> {
    const user = await UserModel.findOne({ where: { username } });
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }
    return user;
  }

  async loginUser(
    loginDTO: LoginDTO,
  ): Promise<{ user: UserModel; accessToken: string } | null> {
    const { username, password } = loginDTO;
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password'); // Menggunakan UnauthorizedException untuk kasus login gagal
    }
    const accessToken = this.generateAccessToken(user);
    return { user, accessToken };
  }

  updateUser(email: number, body: any): Promise<[affectedCount: number]> {
    if (body.password) {
      body.password = bcrypt.hashSync(body.password, 10);
    }
    return this.userRepository.update(body, {
      where: { email: email },
    });
  }
}
