import {
	IAccountEntity,
	IConsultationMetaEntity,
	INutritionistEntity,
	IOccupationEntity,
	IPriceEntity,
	IProfileEntity,
	IRegistrationCertificateEntity,
	IScheduleEntity,
} from "@contract";
import { NutritionistType } from "@prisma/client";

export class PatientNutritionistResponse implements INutritionistEntity {
	private constructor(entity: INutritionistEntity) {
		this.id = entity.id;
		this.type = entity.type;
		this.nip = entity.nip;
		this.nidn = entity.nidn;
		this.isAvailable = entity.isAvailable;
		this.account = entity.account;
		this.profile = entity.profile;
		this.consultationMeta = entity.consultationMeta;
		this.occupation = entity.occupation;
		this.price = entity.price;
		this.schedules = entity.schedules;
		this.registrationCertificate = entity.registrationCertificate;
	}

	id: string;
	nip: string;
	nidn: string;
	isAvailable: boolean;
	account?: IAccountEntity;
	profile?: IProfileEntity;
	consultationMeta?: IConsultationMetaEntity;
	occupation?: IOccupationEntity;
	price?: IPriceEntity;
	registrationCertificate?: IRegistrationCertificateEntity;
	schedules?: IScheduleEntity[];
	type: NutritionistType;

	static fromEntity(entity: INutritionistEntity): PatientNutritionistResponse {
		return new PatientNutritionistResponse(entity);
	}

	static fromEntities(
		entities: INutritionistEntity[],
	): PatientNutritionistResponse[] {
		return entities.map((entity) =>
			PatientNutritionistResponse.fromEntity(entity),
		);
	}
}
