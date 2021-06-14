import { CharacterInternal } from '../../models/Character';
import { ServiceClient } from './ServiceClient';

export class CouchDbServiceClient extends ServiceClient {
  private baseUrl: string;

  constructor() {
    super();
    this.baseUrl = 'http://localhost';
  }

  public async getCharacter(id: string): Promise<CharacterInternal> {
    const uri = [this.baseUrl, 'genshin_characters', id].join('/');
    return this.get<CharacterInternal>(uri);
  }
}
