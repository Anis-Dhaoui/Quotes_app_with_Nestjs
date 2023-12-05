import { AllExceptionsFilter } from './Errors-Handler/all-exceptions.filter';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // HANDLING ALL EXCEPTIONS
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(5000, () =>{
    Logger.debug("SERVER RUNNING ON PORT: 5000")
  });
}
bootstrap();
