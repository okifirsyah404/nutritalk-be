import { IndexPaginationRequest } from "@common";
import { IIndexPaginationOption } from "@contract";
import { Type } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";

export class NutritionistIndexQuery
	extends IndexPaginationRequest
	implements IIndexPaginationOption
{
	constructor(
		consultationMeta: boolean = false,
		occupation: boolean = false,
		price: boolean = false,
		registrationCertificate: boolean = false,
		schedules: boolean = false,
		excludeSelf: boolean = false,
	) {
		super();

		this.consultationMeta = consultationMeta;
		this.occupation = occupation;
		this.price = price;
		this.registrationCertificate = registrationCertificate;
		this.schedules = schedules;
		this.excludeSelf = excludeSelf;
	}

	@Type(() => Boolean)
	@IsBoolean()
	@IsOptional()
	readonly consultationMeta?: boolean;

	@Type(() => Boolean)
	@IsBoolean()
	@IsOptional()
	readonly occupation?: boolean;

	@Type(() => Boolean)
	@IsBoolean()
	@IsOptional()
	readonly price?: boolean;

	@Type(() => Boolean)
	@IsBoolean()
	@IsOptional()
	readonly registrationCertificate?: boolean;

	@Type(() => Boolean)
	@IsBoolean()
	@IsOptional()
	readonly schedules?: boolean;

	@Type(() => Boolean)
	@IsBoolean()
	@IsOptional()
	readonly excludeSelf?: boolean;
}
