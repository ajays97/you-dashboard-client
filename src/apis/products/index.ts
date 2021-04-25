import { PublicApi } from '../base/public.api';
import { ProtectedApi } from '../base/protected.api';
import { PRODUCTS_BASE_URL } from './constants';
import { injectable } from 'inversify';

@injectable()
class ProductsApi {
  private publicApi: PublicApi;
  private protectedApi: ProtectedApi;
  constructor() {
    this.publicApi = new PublicApi(PRODUCTS_BASE_URL);
    this.protectedApi = new ProtectedApi(PRODUCTS_BASE_URL);
  }

  public getProducts(page: number, limit: number) {
    return this.publicApi.instance.get(`list?page=${page}&limit=${limit}`);
  }
}

export { ProductsApi };
