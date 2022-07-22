
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Spell } from 'src/spell.dto';

export type CharacterDocument = Character & Document;

@Schema()
export class Character {
  @Prop({ required: true })
  name: string;

  @Prop()
  avatar: string;

  @Prop({ min: 5 , required: true})
  hp: number;

  @Prop({ required: true })
  prana: number;

  @Prop({ max: 20 , required: true})
  pa: number;
  
  @Prop()
  spells: Spell[]

  @Prop()
  isServant: boolean;
}

export const CharacterSchema = SchemaFactory.createForClass(Character);
