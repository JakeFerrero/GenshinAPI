import { MongoClient } from 'mongodb';
import { CharacterRepository } from '../../../src/character/CharacterRepository';
import { CharacterInternal } from '../../../src/models/Character';

describe('Character Repository unit tests', () => {
  const mockCharacterCollection = {
    find: jest.fn(),
    findOne: jest.fn(),
    insertOne: jest.fn(),
    deleteOne: jest.fn()
  };
  const mockMongoClient = {
    db: () => {
      return {
        collection: () => mockCharacterCollection
      };
    }
  };
  let charRepo: CharacterRepository;

  beforeEach(() => {
    charRepo = new CharacterRepository(mockMongoClient as unknown as MongoClient);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Should get and unmarshal a character from database based on id', async () => {
    const mockCharacterInternal: CharacterInternal = {
      _id: 'test character',
      name: 'Test Character',
      rarity: 5,
      weapon: 'Claymore',
      vision: 'Pyro',
      affiliation: null
    };
    mockCharacterCollection.findOne.mockResolvedValue(mockCharacterInternal);

    const result = await charRepo.getCharacter('test character');
    // returned character should be unmarshaled version of the character in the DB
    expect(result).toEqual({
      name: 'Test Character',
      rarity: 5,
      weapon: 'Claymore',
      vision: 'Pyro'
      // affiliation should be undefined since it was null in the DB
    });
  });
});
