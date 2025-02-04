import {
	IAccountEntity,
	IConsultationMetaEntity,
	INutritionistEntity,
	IProfileEntity,
} from "@contract";
import { AccountRole, Gender, NutritionistType } from "@prisma/client";
export class NutritionistProfileResponse implements INutritionistEntity {
	id: string;
	type: NutritionistType;
	nip: string;
	nidn: string;
	isAvailable: boolean;
	account?: IAccountEntity;
	profile?: IProfileEntity;
	consultationMeta?: IConsultationMetaEntity;
	private constructor(data: INutritionistEntity) {
		this.id = data.id;
		this.nip = data.nip;
		this.nidn = data.nidn;
		this.type = data.type;
		this.isAvailable = data.isAvailable;
		this.account = data.account;
		this.profile = data.profile;
		this.consultationMeta = data.consultationMeta;
	}

	static fromEntity(data: INutritionistEntity): NutritionistProfileResponse {
		return new NutritionistProfileResponse(data);
	}

	static readonly exampleData: NutritionistProfileResponse = {
		id: "cm32r86wi000b3vptrq0792sp",
		type: NutritionistType.COUNSELOR,
		nip: "202407252005022001",
		nidn: "0912458102",
		isAvailable: true,
		account: {
			id: "cm32r86wi000b3vptrq0792sp",
			email: "johndoe@example.com",
			role: {
				id: "cm32r86wi000b3vptrq0792sp",
				accountRole: AccountRole.NUTRITIONIST,
			},
		},
		profile: {
			id: "cm32r86wi000b3vptrq0792sp",
			name: "John Doe",
			phoneNumber: "081234567890",
			address: "Jl. Jend. Sudirman No. 1",
			age: 25,
			dateOfBirth: new Date("1996-07-25"),
			gender: Gender.MALE,
			placeOfBirth: "Jember",
			imageKey: "profile-image.jpg",
		},
		consultationMeta: {
			id: "cm32r86wi000b3vptrq0792sp",
			successConsultation: 100,
			avgRating: 4.5,
			consultation: 110,
		},
	};
}
