import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {

    loggerFunction(message: string): void {
        console.log(`LoggerService: ${message}`);
    }

}
