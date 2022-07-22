import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto, UpdateCharacterDto } from './dto/create-character.dto';
import { Character } from './schemas/character.schema';
import { Response } from 'express';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  async create(@Body() createCharacterDto: CreateCharacterDto) {
    await this.characterService.create(createCharacterDto);
  }

  @Put(':id')
  async update(@Body() updateCharacterDto: UpdateCharacterDto, @Res() res:Response) {
    const response = await this.characterService.update(updateCharacterDto);
    if(response.acknowledged == false) {
      return res.status(HttpStatus.NOT_FOUND).send();
    } else {
      return res.status(HttpStatus.OK).send(response);
    }
  }

  @Get()
  async findAll(): Promise<Character[]> {
    return this.characterService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Character> {
    return this.characterService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.characterService.delete(id);
  }
}