import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TaskScheduleService {
  private readonly logger = new Logger(TaskScheduleService.name);

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  dumpCMS() {}
}
