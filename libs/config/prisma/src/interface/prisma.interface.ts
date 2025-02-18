import { ModuleMetadata } from "@nestjs/common";

export interface PrismaModuleOptions {
	logs?: boolean;
	imports?: any[];
}

export interface PrismaModuleAsyncOptions
	extends Pick<ModuleMetadata, "imports"> {
	useFactory?: (
		...args: any[]
	) => Promise<PrismaModuleOptions> | PrismaModuleOptions;
	inject?: any[];
	imports?: any[];
}
