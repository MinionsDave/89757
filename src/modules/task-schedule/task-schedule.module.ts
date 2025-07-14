import { Module } from '@nestjs/common';

import { TaskScheduleService } from './task-schedule.service';
import { TaskService } from './task.service';

@Module({
  providers: [TaskScheduleService, TaskService],
})
export class TaskScheduleModule {}
