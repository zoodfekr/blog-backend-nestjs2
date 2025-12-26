import { Injectable } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';

@Injectable()
export class AppService {

  constructor(
    private readonly loggerService: LoggerService
  ) { }


  getHello(): string {
    this.loggerService.loggerFunction('getHello method called');
    return 'Hello World!';
  }
}
