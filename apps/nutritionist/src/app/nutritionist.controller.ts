import { Controller, Get } from '@nestjs/common';

@Controller()
export class NutritionistController {
  @Get()
  getHello(): string {
    return '';
  }
}
