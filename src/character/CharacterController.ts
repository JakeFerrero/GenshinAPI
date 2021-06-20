import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Character } from '../models/Character';
import { CharacterService } from './CharacterService';

@Controller({
  path: '/'
})
export class CharacterController {
  constructor(private charService: CharacterService) {}

  @Get('/character/:id')
  public async getCharacter(@Param() id: string): Promise<Character> {
    return await this.charService.getCharacter(id);
  }

  @Post('/character')
  public async createCharacter(@Body() char: Character): Promise<void> {
    // TODO: return created char
    await this.charService.createCharacter(char);
  }
}
