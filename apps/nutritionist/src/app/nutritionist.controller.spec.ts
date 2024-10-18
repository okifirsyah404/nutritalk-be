import { Test, TestingModule } from '@nestjs/testing';
import { NutritionistController } from './nutritionist.controller';
import { NutritionistService } from './nutritionist.service';

describe('NutritionistController', () => {
  let nutritionistController: NutritionistController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NutritionistController],
      providers: [NutritionistService],
    }).compile();

    nutritionistController = app.get<NutritionistController>(
      NutritionistController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(nutritionistController.getHello()).toBe('Hello World!');
    });
  });
});
