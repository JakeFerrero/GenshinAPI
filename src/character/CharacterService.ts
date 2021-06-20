import { Injectable } from '@nestjs/common';
import { Character } from '../models/Character';
import { CharacterRepository } from './CharacterRepository';

@Injectable()
export class CharacterService {
  constructor(private charRepo: CharacterRepository) {}

  public async getCharacter(id: string): Promise<Character> {
    return await this.charRepo.getCharacter(id);
  }

  public async createCharacter(char: Character): Promise<void> {
    const { name } = char;
    await this.charRepo.createCharacter(name.toLowerCase(), char);
  }
}
