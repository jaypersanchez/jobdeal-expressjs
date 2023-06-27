import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');
    if (exception === Prisma.PrismaClientKnownRequestError) {
      const meta = exception.meta;

      switch (exception.code) {
        case 'P2002': {
          const status = HttpStatus.CONFLICT;
          response.status(status).json({
            statusCode: status,
            message: message,
            meta: meta,
          });
          break;
        }
        case 'P2005':
        case 'P2006':
        case 'P2008':
        case 'P2009':
        case 'P2020':
        case 'P2011': {
          const status = HttpStatus.INTERNAL_SERVER_ERROR;
          response.status(status).json({
            statusCode: status,
            message: message,
            meta: meta,
          });
          break;
        }
        case 'P2015':
        case 'P2001': {
          const status = HttpStatus.NOT_FOUND;
          response.status(status).json({
            statusCode: status,
            message: message,
            meta: meta,
          });
          break;
        }
        default:
          // default 500 error code
          const status = HttpStatus.INTERNAL_SERVER_ERROR;
          response.status(status).json({
            statusCode: status,
            message: message,
          });
          // super.catch(exception, host);
          break;
      }
    } else {
      console.log('asdfasdf');
      const status = HttpStatus.INTERNAL_SERVER_ERROR;
      response.status(status).json({
        statusCode: status,
        message: message,
      });
    }
  }
}
