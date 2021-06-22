import { NestFactory } from '@nestjs/core';
import { GenshinModule } from './GenshinModule';

async function bootstrap() {
  const app = await NestFactory.create(GenshinModule);
  await app.listen(3000);
}
bootstrap().catch(console.error);
