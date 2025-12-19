// filters/http-exception.filter.ts
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Response } from 'express';

const ERROR_TRANSLATIONS: Record<string, string> = {
    'Forbidden': 'شما دسترسی لازم را ندارید',
    'Forbidden resource': 'شما دسترسی لازم را ندارید',
    'Unauthorized': 'ابتدا وارد حساب کاربری شوید',
    'Not Found': 'یافت نشد',
    'Bad Request': 'درخواست نامعتبر است',
    'Internal Server Error': 'خطای داخلی سرور',
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();

        let message = 'خطای ناشناخته';

        if (typeof exceptionResponse === 'string') {
            message = ERROR_TRANSLATIONS[exceptionResponse] || exceptionResponse;
        } else if (
            typeof exceptionResponse === 'object' &&
            'message' in exceptionResponse
        ) {
            const msg = (exceptionResponse as any).message;
            message = ERROR_TRANSLATIONS[msg] || msg;
        }

        response.status(status).json({
            statusCode: status,
            message,
        });
    }
}
