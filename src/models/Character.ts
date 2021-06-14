/**
 * Final representation of a character. To be returned to end-user.
 */
export interface Character {
  name: string;
  weapon: string;
  rarity: 4 | 5;
}

/**
 * Internal representation of a character with extra, db-specific fields not meant to be
 * seen by the end-user.
 */
export interface CharacterInternal {
  id: string;
  name: string;
  weapon: string;
  rarity: 4 | 5;
}
