import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  async dumpCMS(): Promise<boolean> {
    const logger = new Logger('dumpCMS');
    logger.log('Starting CMS dump...');
    return true;
  }
}
