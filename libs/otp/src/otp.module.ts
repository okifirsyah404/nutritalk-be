import { PrismaModule } from '@database/prisma';
import { Module } from '@nestjs/common';
import { OtpService } from './provider/otp.service';

@Module({
  imports: [PrismaModule.forRoot()],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
