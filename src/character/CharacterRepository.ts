import { Injectable } from '@nestjs/common';
import { Character, CharacterInternal } from '../models/Character';
import { CouchDbServiceClient } from '../utils/serviceClients/CouchDbServiceClient';
import * as uuid from 'uuid';

@Injectable()
export class CharacterRepository {
  constructor(private charServiceClient: CouchDbServiceClient) {}

  public async getCharacter(id: string): Promise<Character> {
    const charInternal = await this.charServiceClient.getCharacter(id);
    return this.unmarshalCharacter(charInternal);
  }

  public async createCharacter(id: string, character: Character): Promise<void> {
    const charInternal = this.marshalCharacter(character);
    await this.charServiceClient.createCharacter(id, charInternal);
  }

  public async updateCharacter(id: string, character: Character, rev: string): Promise<void> {
    const charInternal = this.marshalCharacter(character);
    await this.charServiceClient.updateCharacter(id, charInternal, rev);
  }

  private unmarshalCharacter(charInternal: CharacterInternal): Character {
    const character: Character = {
      name: charInternal.name,
      weapon: charInternal.weapon,
      rarity: charInternal.rarity,
      vision: charInternal.vision
    };
    if (charInternal.affiliation) character['affiliation'] = charInternal.affiliation;
    return character;
  }

  private marshalCharacter(char: Character, rev?: string): CharacterInternal {
    return {
      _id: char.name.toLowerCase(),
      _rev: rev ?? uuid.v4(),
      name: char.name,
      weapon: char.weapon,
      rarity: char.rarity,
      vision: char.vision,
      affiliation: char.affiliation ?? null
    };
  }
}
