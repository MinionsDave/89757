import { config } from 'dotenv';
config();

import { Test } from '@nestjs/testing';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let notificationService: NotificationService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [NotificationService],
    }).compile();

    notificationService = moduleRef.get(NotificationService);
  });

  describe('推送', () => {
    it('可以推送', async () => {
      await notificationService.danger('单元测试');
    });
  });
});
