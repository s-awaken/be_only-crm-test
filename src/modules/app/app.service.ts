import { Injectable } from '@nestjs/common';
import { APP_NAME, APP_VERSION } from './app.const';

@Injectable()
export class AppService {
  getAppInfo() {
    const appInfo = {
      name: APP_NAME,
      version: APP_VERSION,
    };
    return appInfo;
  }
}
