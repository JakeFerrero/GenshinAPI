
import { Module } from '@nestjs/common';
import * as sqlite from 'sqlite';
import * as sqlite3 from 'sqlite3';
import { CharacterController } from './character/CharacterController';
import { CharacterRepository } from './character/CharacterRepository';
import { CharacterService } from './character/CharacterService';

@Module({
  controllers: [CharacterController],
  providers: [
    CharacterService,
    {
      provide: CharacterRepository,
      useFactory: async (): Promise<CharacterRepository> => {
        try {
          const dbConn = await sqlite.open({
            filename: 'genshin_api_db',
            driver: sqlite3.Database
          });
          return new CharacterRepository(dbConn);
        } catch (error) {
          console.log('Error connecting to sqlite database. Exiting.', error);
          throw error;
        }
      }
    }
  ]
})
export class GenshinModule {}
