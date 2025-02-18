import { IRegistrationCertificateEntity } from "@contract";

export class NutritionistCertificateResponse
	implements IRegistrationCertificateEntity
{
	constructor({
		id,
		registrationNumber,
		issueDate,
		validUntil,
	}: IRegistrationCertificateEntity) {
		this.id = id;
		this.registrationNumber = registrationNumber;
		this.issueDate = issueDate;
		this.validUntil = validUntil;
	}

	id: string;
	registrationNumber: string;
	issueDate: Date;
	validUntil: Date;

	static fromEntity(
		entity: IRegistrationCertificateEntity,
	): NutritionistCertificateResponse {
		return new NutritionistCertificateResponse(entity);
	}

	static readonly exampleData: NutritionistCertificateResponse =
		new NutritionistCertificateResponse({
			id: "cm69ik474007ivylc9iuo9ep5",
			registrationNumber: "123456",
			issueDate: new Date("2021-01-01"),
			validUntil: new Date("2022-01-01"),
		});
}
