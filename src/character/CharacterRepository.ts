import { Injectable } from '@nestjs/common';
import { Character, CharacterInternal } from '../models/Character';
import { CouchDbServiceClient } from '../utils/serviceClients/CouchDbServiceClient';

@Injectable()
export class CharacterRepository {
  constructor(private charServiceClient: CouchDbServiceClient) {}

  public async getCharacter(id: string): Promise<Character> {
    const charInternal = await this.charServiceClient.getCharacter(id);
    return this.unmarshalCharacter(charInternal);
  }

  private unmarshalCharacter(charInternal: CharacterInternal): Character {
    const { name, weapon, rarity } = charInternal;
    return {
      name,
      weapon,
      rarity
    };
  }
}
