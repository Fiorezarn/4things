import { Inject, Injectable } from '@nestjs/common';
import { reviewModel } from 'src/models/review.entity';

@Injectable()
export class LikesService {
  constructor(@Inject('LIKES_REPOSITORY') private readonly likesRepository) {}

  async getLikesCount(product_id: number) {
    try {
      return await this.likesRepository.count({
        where: product_id,
      });
    } catch (error) {
      throw error;
    }
  }

  async getLikesByProductandUser(product_id: number, user_id: number) {
    try {
      return await this.likesRepository.findOne({
        where: product_id,
        user_id,
      });
    } catch (error) {
      throw error;
    }
  }

  async createLikes(likes: any): Promise<reviewModel> {
    try {
      return await this.likesRepository.create(likes);
    } catch (error) {
      throw error;
    }
  }

  async unlike(product_id: number, user_id: number) {
    try {
      return await this.likesRepository.destroy({
        where: { product_id, user_id },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteLike(product_id: number) {
    try {
      return await this.likesRepository.destroy({
        where: { product_id },
      });
    } catch (error) {
      throw error;
    }
  }
}
