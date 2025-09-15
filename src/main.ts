import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Włączenie globalnego CORS z poprawnym origin i credentials
  app.enableCors({
    origin: "http://192.168.18.3:3000", // adres frontendu
    credentials: true,                   // pozwala na ciasteczka/autoryzację
  });

  // Włączenie globalnego walidatora DTO
  app.useGlobalPipes(new ValidationPipe());

  // Opcjonalnie: jeśli chcesz ustawić globalny prefix dla wszystkich endpointów
  // app.setGlobalPrefix('api');

  await app.listen(3000);
  console.log(`Backend działa na http://localhost:3000`);
}

bootstrap();
