import { Injectable, Logger } from '@nestjs/common';
import * as OSS from 'ali-oss';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);

  private readonly client: OSS = new OSS({
    region: process.env.OSS_REGION,
    accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID!,
    accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET!,
    bucket: process.env.OSS_BUCKET,
  });

  /**
   * 上传文件
   *
   * @param filename 文件名
   * @param buf 文件流
   * @returns 文件url（包含host等信息）
   */
  async upload(filename: string, buf: Buffer): Promise<string> {
    this.logger.log(`file ${filename} begin upload`);
    const uploadResult = await this.client.put(filename, buf);
    this.logger.log(`file ${filename} upload success`);
    // 改为使用https
    return uploadResult.url.replace('http://', 'https://');
  }
}
