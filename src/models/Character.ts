export type Vision = 'Cryo' | 'Hydro' | 'Pyro' | 'Electro' | 'Geo' | 'Anemo' | 'Dendro';
export type WeaponType = 'Bow' | 'Claymore' | 'Sword' | 'Catalyst' | 'Polearm';

export interface Character {
  name: string;
  weapon: WeaponType;
  rarity: number;
  vision: Vision;
  affiliation?: string;
}
