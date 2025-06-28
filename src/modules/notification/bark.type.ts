/** 推送中断级别  */
export enum PushLevel {
  /** 重要警告, 在静音模式下也会响铃 */
  CRITICAL = 'critical',
  /** 系统会立即亮屏显示通知 */
  ACTIVE = 'active',
  /** 时效性通知，可在专注状态下显示通知 */
  TIME_SENSITIVE = 'timeSensitive',
  /** 仅将通知添加到通知列表，不会亮屏提醒 */
  PASSIVE = 'passive',
}

/** 推送参数 */
export interface BarkPushParams {
  /** 推送标题 */
  title?: string;

  /** 推送副标题 */
  subtitle?: string;

  /** 推送内容 */
  body: string;

  /** 单个设备key */
  device_key?: string;

  /** 设备key数组（批量推送） */
  device_keys?: string[];

  /** 推送中断级别 */
  level?: PushLevel;

  /** 重要警告的通知音量 (0-10) */
  volume?: number;

  /** 推送角标数字 */
  badge?: number;

  /** 是否重复播放铃声 */
  call?: 0 | 1;

  /** 是否自动复制推送内容 */
  autoCopy?: 0 | 1;

  /** 指定复制的内容 */
  copy?: string;

  /** 自定义铃声 */
  sound?: string;

  /** 自定义图标URL */
  icon?: string;

  /** 消息分组 */
  group?: string;

  /** 加密推送的密文 */
  ciphertext?: string;

  /** 是否保存推送 */
  isArchive?: 0 | 1;

  /** 点击跳转的URL */
  url?: string;

  /** 点击行为控制 */
  action?: string;
}

export interface BarkPushResp {
  /** 不是200就是错误 */
  code: number;
  message: string;
  timestamp: number;
}
