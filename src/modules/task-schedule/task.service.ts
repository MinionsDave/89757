import * as fs from 'fs';
import * as path from 'path';

import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import dayjs from 'dayjs';
import { execAsync, WORKING_DIR } from 'src/common';

@Injectable()
export class TaskService implements OnModuleInit {
  private readonly logger = new Logger(TaskService.name);

  onModuleInit() {}

  async dumpCMS() {
    const logger = new Logger('dumpCMS');
    logger.log('开始CMS备份...');

    const backupDir = path.join(WORKING_DIR, 'backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const timestamp = dayjs().format('yyyy-MM-dd_HH-mm-ss');
    const backupFileName = `mysql-backup-${timestamp}.sql`;
    const backupPath = path.join(backupDir, backupFileName);

    // 使用mysqldump命令备份
    const command = `mysqldump \
      -h ${process.env.CMS_MYSQL_HOST} \
      -P ${process.env.CMS_MYSQL_PORT} \
      -u ${process.env.CMS_MYSQL_USER} \
      -p"${process.env.CMS_MYSQL_PASSWORD}" \
      ${process.env.CMS_MYSQL_DATABASE} \
      --routines --triggers --events \
      --single-transaction \
      --quick \
      --hex-blob \
      > ${backupPath}`;

    try {
      await execAsync(command);
      logger.log(`MySQL备份成功,保存到: ${backupPath}`);
    } catch (error) {
      logger.error(`MySQL备份失败: ${error.stderr}`);
      throw new Error(`备份失败: ${error.stderr}`);
    }
  }
}
