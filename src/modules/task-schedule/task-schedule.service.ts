import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TaskService } from './task.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class TaskScheduleService {
  private readonly logger = new Logger(TaskScheduleService.name);

  constructor(
    private readonly taskService: TaskService,
    private notificationService: NotificationService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async dumpCMS() {
    try {
      await this.taskService.dumpCMS();
      this.notificationService.passive('CMS备份成功');
    } catch (e) {
      this.notificationService.danger(`CMS备份失败: ${e.message}`);
    }
  }
}
