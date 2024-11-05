import { Controller } from '@nestjs/common';
import { DashboardService } from '../service/dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
}
