import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './modules/notification/notification.module';
import { TaskScheduleModule } from './modules/task-schedule/task-schedule.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    NotificationModule,
    TaskScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
