import { Test, TestingModule } from '@nestjs/testing';
import { CharacterController } from './character.controller';
import { CreateCharacterDto } from './dto/create-character.dto';
import { CharacterService } from './character.service';

describe('Character Controller', () => {
  let controller: CharacterController;
  let service: CharacterService;
  const createCharacterDto: CreateCharacterDto = {
    name: 'Character #1',
    avatar:'',
    hp: 15,
    prana: 20,
    pa: 20,
    spells : [{name: "Oblitération", cooldown: 1, damage: "1d3", prana: 2, pa:3, effect: 1}],
    isServant: true
  };

  const mockCharacter = {
    name: 'Character #1',
    avatar:'',
    hp: 15,
    prana: 20,
    pa: 20,
    spells : [{name: "Oblitération", cooldown: 1, damage: "1d3", prana: 2, pa:3, effect: 1}],
    isServant: true,
    _id: 'a id',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharacterController],
      providers: [
        {
          provide: CharacterService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
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
            ]),
            create: jest.fn().mockResolvedValue(createCharacterDto),
          },
        },
      ],
    }).compile();

    controller = module.get<CharacterController>(CharacterController);
    service = module.get<CharacterService>(CharacterService);
  });

  describe('create()', () => {
    it('should create a new character', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockCharacter);

      await controller.create(createCharacterDto);
      expect(createSpy).toHaveBeenCalledWith(createCharacterDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of character', async () => {
      expect(controller.findAll()).resolves.toEqual([
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
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});