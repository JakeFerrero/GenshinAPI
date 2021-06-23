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
    return await this.charService.characterGacha();
  }

  @Get()
  public async getCharacters(
    @Query('vision') vision?: Vision,
    @Query('rarity') rarity?: number,
    @Query('weapon') weapon?: WeaponType
  ): Promise<Character[]> {
    const queryOpts: CharacterQueryOpts = {
      vision,
      rarity,
      weapon
    };
    return await this.charService.getCharacters(queryOpts);
  }

  @Get(':id')
  public async getCharacter(@Param() id: string): Promise<Character> {
    return await this.charService.getCharacter(id);
  }

  @Post()
  public async createCharacter(@Body() character: Character): Promise<Character> {
    await this.charService.createCharacter(character);
    return character;
  }

  @Delete(':id')
  public async deleteCharacter(@Param() id: string): Promise<void> {
    await this.charService.deleteCharacter(id);
  }
}
