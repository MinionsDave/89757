import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { BarkPushParams, BarkPushResp, PushLevel } from './bark.type';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  private readonly barkKey = process.env.BARK_KEY;
  private readonly barkUrl = `https://api.day.app/${this.barkKey}`;

  danger(message: string) {
    return this.push({
      level: PushLevel.CRITICAL,
      body: message,
    });
  }

  passive(message: string) {
    return this.push({
      level: PushLevel.PASSIVE,
      body: message,
    });
  }

  private async push(options: BarkPushParams) {
    try {
      const resp = await axios.post<BarkPushResp>(this.barkUrl, options, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (resp.data?.code !== 200) {
        throw new Error(`Bark推送异常: ${resp.statusText}`);
      }
    } catch (e) {
      this.logger.error(`Bark推送失败: ${e.message}`);
    }
  }
}
