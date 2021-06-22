
import { Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { CharacterController } from './character/CharacterController';
import { CharacterRepository } from './character/CharacterRepository';
import { CharacterService } from './character/CharacterService';

@Module({
  controllers: [CharacterController],
  providers: [
    CharacterRepository,
    CharacterService,
    {
      provide: MongoClient,
      useFactory: async (): Promise<MongoClient> => {
        const uri = 'mongodb://localhost:27017';
        const client = new MongoClient(uri, { useUnifiedTopology: true });
        try {
          await client.connect();
        } catch (error) {
          console.log('Error connecting to MongoDB. Exiting.', error);
          throw error;
        }
        return client;
      }
    }
  ]
})
export class GenshinModule {}
