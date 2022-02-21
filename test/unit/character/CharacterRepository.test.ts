import { CharacterQueryOpts, CharacterRepository } from '../../../src/character/CharacterRepository';
import { Character } from '../../../src/models/Character';

// mock characters to use for testing
const mockChar1: Character = {
  name: 'Venti',
  vision: 'Anemo',
  weapon: 'Bow',
  rarity: 5
};
const mockChar2: Character = {
  name: 'Zhongli',
  vision: 'Geo',
  weapon: 'Polearm',
  rarity: 5,
  affiliation: 'Liyue'
};
const mockChar3: Character = {
  name: 'Bennett',
  vision: 'Pyro',
  weapon: 'Sword',
  rarity: 4,
  affiliation: 'Mondstadt'
};
const mockChar4: Character = {
  name: 'Beidou',
  vision: 'Electro',
  weapon: 'Claymore',
  rarity: 4
};

const mockSqliteDb = {
  get: jest.fn(),
  all: jest.fn(),
  run: jest.fn()
};

let charRepo: CharacterRepository;
beforeAll(() => {
  charRepo = new CharacterRepository(mockSqliteDb as any);
});

beforeEach(() => {
  jest.resetAllMocks();
});

test('Can get a character by name', async () => {
  mockSqliteDb.get.mockResolvedValue(mockChar1);
  const result = await charRepo.getByUniqueId('Venti');
  expect(result).toEqual({
    name: 'Venti',
    vision: 'Anemo',
    weapon: 'Bow',
    rarity: 5
  });
  expect(mockSqliteDb.get).toHaveBeenCalledWith('SELECT * FROM characters WHERE name = ?', 'Venti');
});

test('Can get all characters', async () => {
  mockSqliteDb.all.mockResolvedValue([mockChar1, mockChar2, mockChar3, mockChar4]);
  const result = await charRepo.get();
  expect(result.length).toBe(4);
  expect(mockSqliteDb.all).toHaveBeenCalledWith('SELECT * FROM characters');
});

test('Will get all characters if query opts are empty', async () => {
  const opts: CharacterQueryOpts = {};
  await charRepo.get(opts);
  expect(mockSqliteDb.all).toHaveBeenCalledWith('SELECT * FROM characters');
});

test('Will get a subset of characters based on query options', async () => {
  let opts: CharacterQueryOpts = {
    rarity: 5,
    vision: undefined
  };
  await charRepo.get(opts);
  expect(mockSqliteDb.all).toHaveBeenCalledWith('SELECT * FROM characters WHERE rarity = 5');

  opts = {
    weapon: 'Sword'
  };
  await charRepo.get(opts);
  expect(mockSqliteDb.all).toHaveBeenCalledWith('SELECT * FROM characters WHERE weapon = "Sword"');

  opts = {
    weapon: 'Polearm',
    vision: 'Cryo'
  };
  await charRepo.get(opts);
  expect(mockSqliteDb.all).toHaveBeenCalledWith('SELECT * FROM characters WHERE weapon = "Polearm" AND vision = "Cryo"');

  opts = {
    weapon: 'Sword',
    affiliation: undefined,
    vision: 'Pyro',
    rarity: 4
  };
  await charRepo.get(opts);
  expect(mockSqliteDb.all).toHaveBeenCalledWith('SELECT * FROM characters WHERE weapon = "Sword" AND vision = "Pyro" AND rarity = 4');
});

test('Can add a character to the database', async () => {
  let newChar: Character = {
    name: 'Diluc',
    weapon: 'Claymore',
    vision: 'Pyro',
    rarity: 5
  };
  await charRepo.add(newChar);
  expect(mockSqliteDb.run)
    .toHaveBeenCalledWith('INSERT INTO characters (name, weapon, vision, rarity) VALUES (?, ?, ?, ?)', 'Diluc', 'Claymore', 'Pyro', 5);

  newChar = {
    name: 'Kokomi',
    weapon: 'Catalyst',
    vision: 'Hydro',
    rarity: 5,
    affiliation: 'Inazuma'
  };
  await charRepo.add(newChar);
  expect(mockSqliteDb.run)
    .toHaveBeenCalledWith('INSERT INTO characters (name, weapon, vision, rarity, affiliation) VALUES (?, ?, ?, ?, ?)', 'Kokomi', 'Catalyst', 'Hydro', 5, 'Inazuma');
});

test('Can delete a character', async () => {
  await charRepo.delete('Diluc');
  expect(mockSqliteDb.run).toHaveBeenCalledWith('DELETE FROM characters WHERE name = ?', 'Diluc');
});
