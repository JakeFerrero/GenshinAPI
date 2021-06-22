import { Injectable } from '@nestjs/common';
import { Collection, Db, MongoClient } from 'mongodb';
import { Character, CharacterInternal } from '../models/Character';

@Injectable()
export class CharacterRepository {
  private db: Db;
  private characterCollection: Collection<CharacterInternal>;

  constructor(private mongo: MongoClient) {
    this.db = this.mongo.db('genshin-api');
    this.characterCollection = this.db.collection('characters');
  }

  public async getCharacters(): Promise<Character[]> {
    const query = {};
    const charIntenrals = await this.characterCollection.find(query).toArray();
    const chars = charIntenrals.map(charInternal => this.unmarshalCharacter(charInternal));
    console.log('characters are: ', chars);
    return chars;
  }

  // public async getCharacter(id: string): Promise<Character> {
  //   const charInternal = await this.charServiceClient.getCharacter(id);
  //   return this.unmarshalCharacter(charInternal);
  // }

  public async createCharacter(character: Character): Promise<void> {
    const charInternal = this.marshalCharacter(character);
    await this.characterCollection.insertOne(charInternal);
  }

  // public async updateCharacter(id: string, character: Character, rev: string): Promise<void> {
  //   const charInternal = this.marshalCharacter(character);
  //   await this.charServiceClient.updateCharacter(id, charInternal, rev);
  // }

  private unmarshalCharacter(charInternal: CharacterInternal): Character {
    const { name, weapon, rarity, vision } = charInternal;
    const character: Character = { name, weapon, rarity, vision };

    if (charInternal.affiliation) character['affiliation'] = charInternal.affiliation;
    return character;
  }

  private marshalCharacter(char: Character, rev?: string): CharacterInternal {
    return {
      _id: char.name.toLowerCase(),
      name: char.name,
      weapon: char.weapon,
      rarity: char.rarity,
      vision: char.vision,
      affiliation: char.affiliation ?? null
    };
  }
}
