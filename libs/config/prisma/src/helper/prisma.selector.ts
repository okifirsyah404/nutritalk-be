import { Prisma } from "@prisma/client";

export abstract class PrismaSelector {
	static readonly BASE_PERMISSION = {
		id: true,
		key: true,
		description: true,
	} satisfies Prisma.BasePermissionSelect;

	static readonly ROLE_PERMISSION = {
		id: true,
		isPermitted: true,
		permission: {
			select: PrismaSelector.BASE_PERMISSION,
		},
	} satisfies Prisma.RolePermissionSelect;

	static readonly ROLE = {
		id: true,
		accountRole: true,
	} satisfies Prisma.RoleSelect;

	static readonly GOOGLE_SSO = {
		id: true,
		googleId: true,
		email: true,
	} satisfies Prisma.GoogleSSOSelect;

	static readonly SINGLE_SIGN_ON = {
		id: true,
		googleSSO: {
			select: PrismaSelector.GOOGLE_SSO,
		},
	} satisfies Prisma.SingleSignOnSelect;

	static readonly ACCOUNT = {
		id: true,
		email: true,
		role: {
			select: PrismaSelector.ROLE,
		},
	} satisfies Prisma.AccountSelect;

	static readonly DEVICE_INFO = {
		id: true,
		device: true,
		fcmToken: true,
	} satisfies Prisma.DeviceInfoSelect;

	static readonly PROFILE = {
		id: true,
		name: true,
		phoneNumber: true,
		gender: true,
		placeOfBirth: true,
		dateOfBirth: true,
		age: true,
		imageKey: true,
		address: true,
	} satisfies Prisma.ProfileSelect;

	static readonly PATIENT = {
		id: true,
	} satisfies Prisma.PatientSelect;

	static readonly CREDIT = {
		id: true,
		balance: true,
	} satisfies Prisma.CreditSelect;

	static readonly CREDIT_HISTORY = {
		id: true,
		action: true,
		amount: true,
		note: true,
	} satisfies Prisma.CreditHistorySelect;

	static readonly MEDICAL_RECORD_KEY = {
		id: true,
		code: true,
		name: true,
	} satisfies Prisma.MedicalRecordKeySelect;

	static readonly PATIENT_DETAIL = {
		id: true,
		activityLevel: true,
		dailyCalories: true,
		height: true,
		weight: true,
		dietPlan: true,
		dietGoal: true,
		dietPlanDescription: true,
		bmi: true,
		bmiStatus: true,
	} satisfies Prisma.PatientDetailSelect;

	static readonly MEDICAL_RECORD = {
		id: true,
		weight: true,
		height: true,
		bmi: true,
		bmiStatus: true,
		disability: true,
		diagnosis: true,
		allergies: true,
		foodPreferences: true,
		foodAvoidances: true,
		appetite: true,
		diarrhea: true,
		constipation: true,
		vomit: true,
		nausea: true,
		bloating: true,
		swallowingDisorder: true,
		chewingDisorder: true,
		suckingDisorder: true,
		notes: true,
		others: true,
	} satisfies Prisma.MedicalRecordSelect;

	static readonly NUTRITIONIST = {
		id: true,
		nidn: true,
		nip: true,
		type: true,
		isAvailable: true,
	} satisfies Prisma.NutritionistSelect;

	static readonly CONSULTATION_META = {
		id: true,
		avgRating: true,
		successConsultation: true,
		consultation: true,
	} satisfies Prisma.ConsultationMetaSelect;

	static readonly REGISTRATION_CERTIFICATE = {
		id: true,
		registrationNumber: true,
		issueDate: true,
		validUntil: true,
	} satisfies Prisma.RegistrationCertificateSelect;

	static readonly OCCUPATION = {
		id: true,
		name: true,
		workPlace: true,
		experience: true,
	} satisfies Prisma.OccupationSelect;

	static readonly PRICE = {
		id: true,
		online: true,
		offline: true,
	} satisfies Prisma.PriceSelect;

	static readonly SCHEDULE = {
		id: true,
		dayOfWeek: true,
		dayOfWeekIndex: true,
		active: true,
	} satisfies Prisma.ScheduleSelect;

	static readonly SCHEDULE_TIME = {
		id: true,
		start: true,
		end: true,
		active: true,
	} satisfies Prisma.ScheduleTimeSelect;

	static readonly SCHEDULE_WITH_TIMES = {
		...PrismaSelector.SCHEDULE,
		scheduleTimes: {
			select: PrismaSelector.SCHEDULE_TIME,
		},
	} satisfies Prisma.ScheduleSelect;

	static readonly CONSULTATION = {
		id: true,
		trId: true,
		status: true,
		type: true,
		note: true,
	} satisfies Prisma.ConsultationSelect;

	static readonly CONSULTATION_TIME = {
		id: true,
		start: true,
		end: true,
	} satisfies Prisma.ConsultationTimeSelect;

	static readonly TRANSACTION_PRICE = {
		id: true,
		sources: true,
		price: true,
		subTotal: true,
		credit: true,
		total: true,
	} satisfies Prisma.TransactionPriceSelect;

	static readonly TRANSACTION_PAYMENT = {
		method: true,
		code: true,
		status: true,
		date: true,
	} satisfies Prisma.TransactionPaymentSelect;

	static readonly CONSULTATION_REVIEW = {
		id: true,
		rating: true,
		description: true,
	} satisfies Prisma.ConsultationReviewSelect;

	static readonly OTP = {
		id: true,
		email: true,
		code: true,
		expired: true,
	} satisfies Prisma.OtpSelect;

	static readonly WORKSPACE_SERVICE = {
		id: true,
		description: true,
		imageKey: true,
	} satisfies Prisma.WorkspaceServiceSelect;

	static readonly BMI_LIMIT = {
		id: true,
		status: true,
		min: true,
		max: true,
	} satisfies Prisma.BmiLimitSelect;

	static readonly FAQ = {
		id: true,
		question: true,
		answer: true,
	} satisfies Prisma.FaqSelect;

	static readonly PRIVACY_POLICY = {
		id: true,
		title: true,
		content: true,
	} satisfies Prisma.PrivacyPolicySelect;

	static readonly SIGNATURE = {
		id: true,
		signature: true,
	} satisfies Prisma.SignatureSelect;

	static readonly NUTRITIONIST_WITH_PROFILE = {
		...PrismaSelector.NUTRITIONIST,
		profile: {
			select: PrismaSelector.PROFILE,
		},
	} satisfies Prisma.NutritionistSelect;

	static readonly PATIENT_WITH_PROFILE = {
		...PrismaSelector.PATIENT,
		profile: {
			select: PrismaSelector.PROFILE,
		},
	} satisfies Prisma.PatientSelect;
}
