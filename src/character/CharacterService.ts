import { Injectable } from '@nestjs/common';
import { Character } from '../models/Character';
import { CharacterQueryOpts, CharacterRepository } from './CharacterRepository';

@Injectable()
export class CharacterService {
  constructor(private charRepo: CharacterRepository) {}

  public async characterGacha(): Promise<Character> {
    const chars = await this.charRepo.getCharacters();
    const randomIndex = Math.floor(Math.random() * chars.length);
    return chars[randomIndex];
  }

  public async getCharacters(queryOpts?: CharacterQueryOpts): Promise<Character[]> {
    return await this.charRepo.getCharacters(queryOpts);
  }

  public async getCharacter(id: string): Promise<Character> {
    return await this.charRepo.getCharacter(id);
  }

  public async createCharacter(character: Character): Promise<void> {
    await this.charRepo.createCharacter(character);
  }

  public async deleteCharacter(id: string): Promise<void> {
    await this.charRepo.deleteCharacter(id);
  }
}
