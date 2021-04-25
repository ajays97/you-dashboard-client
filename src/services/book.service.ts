import { inject, injectable } from 'inversify';
import { BooksApi } from '../apis/books';
import { APITypes } from '../apis/types';

@injectable()
class BooksService {
  // @inject("booksPublicApi")
  // booksApi: BooksApi;
  constructor(@inject(APITypes.BooksApi) private booksApi: BooksApi) {}

  async getExampleBook() {
    try {
      const data = await this.booksApi.getExampleBook();
      return data;
    } catch (error) {
      console.log('API call failed', error);
    }
  }
}

export default BooksService;
