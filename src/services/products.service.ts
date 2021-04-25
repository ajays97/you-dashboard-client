import { inject, injectable } from 'inversify';
import { ProductsApi } from '../apis/products';
import { APITypes } from '../apis/types';

@injectable()
class ProductsService {
  // @inject("booksPublicApi")
  // booksApi: BooksApi;
  constructor(@inject(APITypes.ProductsApi) private productsApi: ProductsApi) {}

  async getProducts(page: number = 1, limit: number = 10) {
    try {
      const data = await this.productsApi.getProducts(page, limit);
      return data;
    } catch (error) {
      console.log('API call failed', error);
    }
  }
}

export default ProductsService;
