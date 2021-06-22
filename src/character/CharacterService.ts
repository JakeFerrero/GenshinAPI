import { Injectable } from '@nestjs/common';
import { Character } from '../models/Character';
import { CharacterRepository } from './CharacterRepository';

@Injectable()
export class CharacterService {
  constructor(private charRepo: CharacterRepository) {}

  public async getCharacters() {
    return await this.charRepo.getCharacters();
  }

  // public async getCharacter(id: string): Promise<Character> {
  //   return await this.charRepo.getCharacter(id);
  // }

  public async createCharacter(character: Character): Promise<void> {
    await this.charRepo.createCharacter(character);
  }
}
