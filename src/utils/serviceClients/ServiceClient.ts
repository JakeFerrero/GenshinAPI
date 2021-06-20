import got, { Method } from 'got';

interface ReqOptions {
  uri: string;
  method: Method;
  headers?: { [key: string]: string | undefined };
  body?: Record<string, any>;
}

export class ServiceClient {
  constructor() {}

  public async get<T = unknown>(uri: string, headers?: { [key: string]: string | undefined }): Promise<T> {
    return this.request<T>({ uri, method: 'GET', headers });
  }

  public async post<T = unknown>(uri: string, body: Record<string, any>, headers?: { [key: string]: string | undefined }): Promise<T> {
    return this.request<T>({ uri, method: 'POST', headers, body });
  }

  public async put<T = unknown>(uri: string, body: Record<string, any>, headers?: { [key: string]: string | undefined }): Promise<T> {
    return this.request<T>({ uri, method: 'PUT', headers, body });
  }

  public async request<T = unknown>({ uri, method, headers, body }: ReqOptions): Promise<T> {
    const { body: response } = await got<T>(uri, {
      method,
      port: 5984,
      headers,
      json: body
    });
    return response;
  }
}
