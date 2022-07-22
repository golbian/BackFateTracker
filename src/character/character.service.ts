import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCharacterDto, UpdateCharacterDto } from './dto/create-character.dto';
import { Character, CharacterDocument } from './schemas/character.schema';

@Injectable()
export class CharacterService {
  constructor(
    @InjectModel(Character.name) private readonly characterModel: Model<CharacterDocument>,
  ) {}

  async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
    const createdCharacter = await this.characterModel.create(createCharacterDto);
    return createdCharacter;
  }

  async update(updateCharacterDto: UpdateCharacterDto) {
    const res =  await this.characterModel.updateOne({_id: updateCharacterDto._id} , updateCharacterDto).exec();
    return res;
  }

  async findAll(): Promise<Character[]> {
    const res = await this.characterModel.find().exec();
    return res;
  }

  async findOne(id: string): Promise<Character> {
     const res = await this.characterModel.findOne({ _id: id }).exec();
     return res;
  }

  async delete(id: string) {
    const deletedCharacter = await this.characterModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCharacter;
  }
}