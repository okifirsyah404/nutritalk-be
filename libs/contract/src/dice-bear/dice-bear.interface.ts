export type BackgroundType = "solid" | "gradientLinear";

export interface StyleOptions {
	size?: number;
	backgroundRotation?: number[];
	backgroundType?: BackgroundType[];
	radius?: number;
}

export interface DiceBearOptions {
	imports?: any[];
	styleOptions?: StyleOptions;
}

export interface DiceBearAsyncOptions {
	inject?: any[];
	imports?: any[];
	useFactory?: (...args: any[]) => Promise<DiceBearOptions> | DiceBearOptions;
}

export interface IDiceBearGenerateParams {
	key: string;
	seed: string;
}

export interface IDiceBear {
	path: string;
	key: string;
}
