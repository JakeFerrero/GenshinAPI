export type Vision = 'Cryo' | 'Hydro' | 'Pyro' | 'Electro' | 'Geo' | 'Anemo' | 'Dendro';

/**
 * Final representation of a character. To be returned to end-user.
 */
export interface Character {
  name: string;
  weapon: string;
  rarity: 4 | 5;
  vision: Vision;
  affiliation?: string;
}

/**
 * Internal representation of a character with extra, db-specific fields not meant to be
 * seen by the end-user.
 */
export interface CharacterInternal {
  _id: string;
  name: string;
  weapon: string;
  rarity: 4 | 5;
  vision: Vision;
  affiliation: string | null;
}
