import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Collection, Db, MongoClient } from 'mongodb';
import { Character, CharacterInternal, Vision, WeaponType } from '../models/Character';

export interface CharacterQueryOpts {
  rarity?: number;
  vision?: Vision;
  weapon?: WeaponType;
}

const MONGO_CONFLICT_CODE = 11000;

@Injectable()
export class CharacterRepository {
  private db: Db;
  private characterCollection: Collection<CharacterInternal>;

  constructor(private mongo: MongoClient) {
    this.db = this.mongo.db('genshin-api');
    this.characterCollection = this.db.collection('characters');
  }

  public async getCharacters(queryOpts?: CharacterQueryOpts): Promise<Character[]> {
    console.log('Fetching characters from database.');

    const charIntenrals = await this.characterCollection.find(queryOpts).toArray();
    const chars = charIntenrals.map(charInternal => this.unmarshalCharacter(charInternal));

    console.log('Fetched characters from database.', chars);
    return chars;
  }

  public async getCharacter(id: string): Promise<Character> {
    console.log(`Fetching character with id ${id} from database.`);

    const query = { _id: id };
    const charInternal = await this.characterCollection.findOne(query);
    if (!charInternal) {
      throw new NotFoundException(`Character with id ${id} not found.`);
    }

    console.log(`Fetched character with id ${id} from database.`);
    return this.unmarshalCharacter(charInternal);
  }

  public async createCharacter(character: Character): Promise<void> {
    console.log('Adding new character to database.');
    const charInternal = this.marshalCharacter(character);

    try {
      await this.characterCollection.insertOne(charInternal);
    } catch (error: any) {
      console.log('Error creating new character.', error);
      if (error?.code === MONGO_CONFLICT_CODE) {
        throw new ConflictException('Character already exists.');
      }
      throw error;
    }

    console.log('Added character to database.', character);
  }

  public async deleteCharacter(id: string): Promise<void> {
    console.log(`Deleting character with id ${id} from database.`);
    const result = await this.characterCollection.deleteOne({ _id: id });
    if (result.deletedCount === 1) {
      console.log(`Deleted character with id ${id} from database.`);
    } else {
      console.log(`No character found with id ${id}. Deleted 0 characters.`);
      throw new NotFoundException(`Character with id ${id} not found.`);
    }
  }

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
