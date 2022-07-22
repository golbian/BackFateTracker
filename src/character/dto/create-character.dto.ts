import { Spell } from "src/spell.dto";

export class CreateCharacterDto {
  readonly name: string;
  readonly isServant: boolean;
  readonly avatar?: string;
  readonly spells: Spell[];
  readonly prana: number;
  readonly pa: number;
  readonly hp: number;
}

export class UpdateCharacterDto {
  _id: string;
  name: string;
  avatar?: string;
  isServant: boolean;
  spells: Spell[];
  prana: number;
  pa: number;
  hp: number;
}
