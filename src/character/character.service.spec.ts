import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService } from './character.service';
import { getModelToken } from '@nestjs/mongoose';
import { Character } from './schemas/character.schema';
import { Model } from 'mongoose';

const mockCharacter = {
  name: 'Character #1',
  spells : [{name: "Oblitération", cooldown: 1}],
  servant: true
};

describe('CharacterService', () => {
  let service: CharacterService;
  let model: Model<Character>;

  const characterArray = [
    {
      name: 'Character #1',
      avatar:'',
      hp: 15,
      prana: 20,
      pa: 20,
      spells : [{name: "Oblitération", cooldown: 1, damage: "1d3", prana: 2, pa:3, effect: 1}],
      isServant: true
    },
    {
      name: 'Character #2',
      avatar:'',
      hp: 45,
      prana: 50,
      pa: 20,
      spells : [{name: "Léthargie", cooldown: 5, damage: "1d4 + 5", prana:3, pa:5, effect: 5}],
      isServant: true
    },
    {
      name: 'Character #3',
      avatar:'',
      hp: 20,
      prana: 35,
      pa: 20,
      spells : [{name: "Pillage", cooldown: 3, damage: "1d6 + 2", prana:6, pa:4, effect: 6}],
      isServant: false
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterService,
        {
          provide: getModelToken('Character'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockCharacter),
            constructor: jest.fn().mockResolvedValue(mockCharacter),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CharacterService>(CharacterService);
    model = module.get<Model<Character>>(getModelToken('Character'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all character', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(characterArray),
    } as any);
    const character = await service.findAll();
    expect(character).toEqual(characterArray);
  });

  it('should insert a new character', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        name: 'Character #1',
        spells : [{name: "Oblitération", cooldown: 1}]
      }),
    );
    const newCharacter = await service.create( {
      name: 'Character #1',
      avatar:'',
      hp: 15,
      prana: 20,
      pa: 20,
      spells : [{name: "Oblitération", cooldown: 1, damage: "1d3", prana: 2, pa:3, effect: 1}],
      isServant: true
    });
    expect(newCharacter).toEqual(mockCharacter);
  });
});