import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { Character, Vision, WeaponType } from '../models/Character';
import { CharacterQueryOpts } from './CharacterRepository';
import { CharacterService } from './CharacterService';

@Controller({
  path: '/characters'
})
export class CharacterController {
  constructor(private charService: CharacterService) {}

  @Get('gacha')
  public async gacha(): Promise<Character> {
    return await this.charService.gacha();
  }

  @Get()
  public async getCharacters(
    @Query('vision') vision?: Vision,
    @Query('rarity') rarity?: number,
    @Query('weapon') weapon?: WeaponType,
    @Query('affiliation') affiliation?: string
  ): Promise<Character[]> {
    const queryOpts: CharacterQueryOpts = {
      vision,
      rarity,
      weapon,
      affiliation
    };
    return await this.charService.getCharacters(queryOpts);
  }

  @Get(':name')
  public async getCharacter(@Param() name: string): Promise<Character> {
    return await this.charService.getCharacter(name);
  }

  @Post()
  public async createCharacter(@Body() character: Character): Promise<Character> {
    await this.charService.createCharacter(character);
    return character;
  }

  @Delete(':name')
  public async deleteCharacter(@Param() name: string): Promise<void> {
    await this.charService.deleteCharacter(name);
  }
}
