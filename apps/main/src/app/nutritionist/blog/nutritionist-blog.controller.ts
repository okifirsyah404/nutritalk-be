import { Controller } from "@nestjs/common";
import { NutritionistBlogService } from "./nutritionist-blog.service";

@Controller("nutritionist-blog")
export class NutritionistBlogController {
	constructor(
		private readonly nutritionistBlogService: NutritionistBlogService,
	) {}
}
