import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { HttpExceptionFilter } from './utils/validation/http-exception.filter';

process
  .on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  })
  .on('uncaughtException', (err) => {
    console.error('Uncaught Exception thrown', err);
  });

async function bootstrap() {
  console.log('App starting...');
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: true,
  });
  console.log(`App created`);

  const PORT = process.env.PORT || 3000;
  const globalPrefix = process.env.GLOBAL_PREFIX || 'api';

  app.setGlobalPrefix(globalPrefix);
  app.useGlobalFilters(new HttpExceptionFilter());
  console.log(`App before listen ${PORT}`);

  await app.listen(PORT, () => {
    console.log(`Successful app start`);
  });
}
bootstrap();
