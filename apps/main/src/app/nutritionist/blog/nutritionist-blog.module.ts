import { Module } from "@nestjs/common";
import { NutritionistBlogService } from "./nutritionist-blog.service";
import { NutritionistBlogController } from "./nutritionist-blog.controller";

@Module({
	controllers: [NutritionistBlogController],
	providers: [NutritionistBlogService],
})
export class NutritionistBlogModule {}
