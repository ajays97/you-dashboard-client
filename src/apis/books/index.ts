import { PublicApi } from '../base/public.api';
import { ProtectedApi } from '../base/protected.api';
import { BOOKS_BASE_URL } from './constants';
import { injectable } from 'inversify';

@injectable()
class BooksApi {
  private publicApi: PublicApi;
  private protectedApi: ProtectedApi;
  constructor() {
    this.publicApi = new PublicApi(BOOKS_BASE_URL);
    this.protectedApi = new ProtectedApi(BOOKS_BASE_URL);
  }

  public getExampleBook() {
    const exampleBookId = 'OL7353617M.json';
    return this.publicApi.instance.get(exampleBookId);
  }
}

export { BooksApi };
