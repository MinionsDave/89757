import * as fs from 'fs/promises';
import * as path from 'path';

import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { execAsync, WORKING_DIR } from 'src/common';

import { StorageService } from '../storage/storage.service';

@Injectable()
export class TaskService implements OnModuleInit {
  private readonly logger = new Logger(TaskService.name);

  constructor(private readonly storageService: StorageService) {}

  onModuleInit() {}

  async dumpCMS() {
    const logger = new Logger('dumpCMS');
    logger.log('开始CMS备份...');

    const backupDir = path.join(WORKING_DIR, 'backups');
    await this.createBackupDir(backupDir);

    const timestamp = dayjs().format('YYYY-MM-DD_HH-mm-ss');
    const backupFileName = `cms-backup-${timestamp}.sql`;
    const backupPath = path.join(backupDir, backupFileName);

    // 使用mysqldump命令备份
    const command = `mariadb-dump \
      --host=${process.env.CMS_MYSQL_HOST} \
      --port=${process.env.CMS_MYSQL_PORT} \
      --user=${process.env.CMS_MYSQL_USER} \
      --password="${process.env.CMS_MYSQL_PASSWORD}" \
      ${process.env.CMS_MYSQL_DATABASE} \
      --ssl=0 \
      --single-transaction \
      --quick \
      --hex-blob \
      --skip-triggers \
      --skip-routines \
      --skip-events \
      --result-file=${backupPath}`;

    try {
      await execAsync(command);
      const backupBuffer = await fs.readFile(backupPath);
      await this.storageService.upload(backupFileName, backupBuffer);
      logger.log(`CMS备份成功`);
    } catch (error) {
      const errorMsg: string =
        error.stderr || error.message || 'dump失败';
      logger.error(errorMsg);
      throw new Error(errorMsg);
    } finally {
      await fs.unlink(backupPath); // 删除本地备份文件
    }
  }

  private async createBackupDir(backupDir: string) {
    try {
      await fs.stat(backupDir);
    } catch (e) {
      await fs.mkdir(backupDir, { recursive: true });
    }
  }
}
