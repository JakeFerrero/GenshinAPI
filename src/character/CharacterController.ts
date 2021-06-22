import { Body, Controller, Get, Post } from '@nestjs/common';
import { Character } from '../models/Character';
import { CharacterService } from './CharacterService';

@Controller({
  path: '/characters'
})
export class CharacterController {
  constructor(private charService: CharacterService) {}

  @Get()
  public async getCollections() {
    return await this.charService.getCharacters();
  }

  // @Get(':id')
  // public async getCharacter(@Param() id: string): Promise<Character> {
  //   return await this.charService.getCharacter(id);
  // }

  @Post()
  public async createCharacter(@Body() char: Character): Promise<void> {
    // TODO: return created char
    await this.charService.createCharacter(char);
  }
}
