import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  const config = new DocumentBuilder()
    .setTitle('Jobdeal API')
    .setDescription('The Jobdeal API description')
    .setVersion('1.0')
    .addTag('jobdeal')
    .addBearerAuth()
    .build();
  app.enableCors();
  app.useStaticAssets(join(__dirname, '../..', 'uploads'), {
    prefix: '/uploads',
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
