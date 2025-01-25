import { Injectable } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";

@Injectable()
export class HttpThrottleGuard extends ThrottlerGuard {
	protected errorMessage: string = "ERR_HTTP_THROTTLE";
}
