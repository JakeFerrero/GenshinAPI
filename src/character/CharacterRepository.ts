import * as sqlite from 'sqlite';
import { Character, Vision, WeaponType } from '../models/Character';

export interface CharacterQueryOpts {
  rarity?: number;
  vision?: Vision;
  weapon?: WeaponType;
  affiliation?: string;
}

export class CharacterRepository {
  constructor(private db: sqlite.Database) {}

  public async getByUniqueId(uid: string): Promise<Character> {
    console.log('Fetching character from database: ', uid);
    const results = await this.db.get('SELECT * FROM characters WHERE name = ?', uid);
    console.log('Received character: ', results);
    return results;
  }

  public async get(opts?: CharacterQueryOpts): Promise<Character[]> {
    let query = 'SELECT * FROM characters';
    if (opts && Object.keys(opts).length) {
      let subquery = '';
      for (const key of Object.keys(opts)) {
        if (!opts[key]) continue;
        const value = typeof opts[key] === 'string' ? `\"${opts[key]}\"` : opts[key];
        subquery += `${!subquery.length ? ' WHERE' : ' AND'} ${key} = ${value}`;
      }
      query += subquery;
    }

    console.log('Querying database for characters with query: ', query);
    const results = await this.db.all(query);
    console.log('Query results are: ', results);
    return results;
  }

  public async add(character: Character): Promise<void> {
    const { name, weapon, vision, rarity, affiliation } = character;
    console.log('Adding character to database: ', name, weapon, vision, rarity, affiliation);

    if (affiliation) {
      await this.db.run('INSERT INTO characters (name, weapon, vision, rarity, affiliation) VALUES (?, ?, ?, ?, ?)', name, weapon, vision, rarity, affiliation);
    } else {
      await this.db.run('INSERT INTO characters (name, weapon, vision, rarity) VALUES (?, ?, ?, ?)', name, weapon, vision, rarity);
    }

    console.log('Character added to database');
  }

  public async delete(name: string): Promise<void> {
    console.log('Deleting character from database: ', name);
    await this.db.run('DELETE FROM characters WHERE name = ?', name);
    console.log('Character deleted from database');
  }
}
