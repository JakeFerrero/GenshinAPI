import { Injectable } from '@nestjs/common';
import { Character } from '../models/Character';
import { CharacterQueryOpts, CharacterRepository } from './CharacterRepository';

@Injectable()
export class CharacterService {
  constructor(private charRepo: CharacterRepository) {}

  public async gacha(): Promise<Character> {
    const chars = await this.charRepo.get();
    const randomIndex = Math.floor(Math.random() * chars.length);
    return chars[randomIndex];
  }

  public async getCharacter(name: string): Promise<Character> {
    return await this.charRepo.getByUniqueId(name);
  }

  public async getCharacters(queryOpts?: CharacterQueryOpts): Promise<Character[]> {
    return await this.charRepo.get(queryOpts);
  }

  public async createCharacter(character: Character): Promise<void> {
    await this.charRepo.add(character);
  }

  public async deleteCharacter(name: string): Promise<void> {
    await this.charRepo.delete(name);
  }
}
