import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { MathService } from './math/math.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mathService: MathService
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Get('add')
  getAdd(
    @Query('a') a: number,
    @Query('b') b: number
  ): number {
    return this.mathService.add(Number(a), Number(b));
  };

}



