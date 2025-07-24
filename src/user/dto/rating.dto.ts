import { IsNumber } from 'class-validator';

export class UpdateRatingDto {
  
  @IsNumber()
  id: number;

  @IsNumber()
  rating: number;
}
