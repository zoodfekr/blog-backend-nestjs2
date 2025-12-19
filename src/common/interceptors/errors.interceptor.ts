import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {


  private readonly errorTranslations: { [key: string]: string } = {
    // Authentication errors
    'Unauthorized': 'عدم دسترسی',
    'Invalid credentials': 'اطلاعات ورود نامعتبر است',
    'Access token is missing': 'توکن دسترسی وجود ندارد',
    'Invalid token': 'توکن نامعتبر است',
    'Token expired': 'توکن منقضی شده است',

    // Validation errors
    'Validation failed': 'اعتبارسنجی انجام نشد',
    'Email is required': 'ایمیل الزامی است',
    'Password is required': 'رمز عبور الزامی است',
    'Invalid email format': 'فرمت ایمیل نامعتبر است',
    'Password too short': 'رمز عبور کوتاه است',

    // User errors
    'User not found': 'کاربر یافت نشد',
    'User already exists': 'کاربر از قبل وجود دارد',
    'Email already in use': 'ایمیل قبلاً استفاده شده است',

    // General errors
    'Internal server error': 'خطای داخلی سرور',
    'Bad request': 'درخواست نامعتبر',
    'Not found': 'یافت نشد',
    'Forbidden': 'ممنوع',
    'Request timeout': 'زمان درخواست تمام شد',

    // Database errors
    'Database connection failed': 'اتصال به پایگاه داده ناموفق بود',
    'Duplicate entry': 'مورد تکراری',

    // Default
    'Unknown error occurred': 'خطای ناشناخته رخ داد'
  };

  private translateError(message: string): string {

    if (this.errorTranslations[message]) return this.errorTranslations[message]

    for (const [english, persian] of Object.entries(this.errorTranslations)) {
      if (message.toLowerCase().includes(english.toLowerCase())) {
        return persian;
      }
    }
    return message;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    return next.handle().pipe(
      catchError(error => {
        // If error has a message property, translate it
        if (error.response && error.response.message) {
          if (Array.isArray(error.response.message)) {
            error.response.message = error.response.message.map(msg => this.translateError(msg));
          } else {
            error.response.message = this.translateError(error.response.message);
          }
        }

        if (typeof error.message === 'string') {
          error.message = this.translateError(error.message);
        }

        return throwError(() => error);
      })
    );
  }
}
