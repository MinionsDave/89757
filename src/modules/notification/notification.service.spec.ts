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
      await expect(
        notificationService.push(
          {
            body: '推送到达测试',
          },
          false,
        ),
      ).resolves.not.toThrow();
    });
  });
});
