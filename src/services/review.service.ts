import { Inject, Injectable } from '@nestjs/common';
import { reviewModel } from 'src/models/review.entity';

@Injectable()
export class ReviewService {
  constructor(@Inject('REVIEW_REPOSITORY') private readonly reviewRepository) {}

  async getReviewById(id) {
    try {
      return await this.reviewRepository.findOne({ where: { review_id: id } });
    } catch (error) {
      throw error;
    }
  }

  async createReview(review: any): Promise<reviewModel> {
    try {
      const data = await this.reviewRepository.create(review);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getReviewByProductId(id) {
    return await this.reviewRepository.findOne({ where: { product_id: id } });
  }

  async deleteReview(id: number) {
    try {
      const review = await this.reviewRepository.findOne({
        where: { review_id: id },
      });
      return await review.destroy();
    } catch (error) {
      throw error;
    }
  }
}
