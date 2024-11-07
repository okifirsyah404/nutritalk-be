import { Module } from '@nestjs/common';
import { ScheduleService } from './service/schedule.service';
import { ScheduleController } from './controller/schedule.controller';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
