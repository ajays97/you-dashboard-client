import { Container } from 'inversify';
import { BooksApi } from '../apis/books';
import { APITypes } from '../apis/types';
import { AuthSaga } from '../shared/redux/sagas/auth.saga';
import { BooksSaga } from '../shared/redux/sagas/books.saga';
import { sagaTypes, serviceTypes } from '../shared/types';
import { AuthService, BooksService, ProductsService } from '../services';
import { ProductsApi } from '../apis/products';

const diContainer = new Container();

diContainer.bind<BooksApi>(APITypes.BooksApi).to(BooksApi);
diContainer.bind<BooksService>(serviceTypes.BooksService).to(BooksService);
diContainer.bind<BooksSaga>(sagaTypes.BooksSaga).to(BooksSaga);

diContainer.bind<ProductsApi>(APITypes.ProductsApi).to(ProductsApi);
diContainer
  .bind<ProductsService>(serviceTypes.ProductsService)
  .to(ProductsService);

diContainer.bind<AuthService>(serviceTypes.AuthService).to(AuthService);
diContainer.bind<AuthSaga>(sagaTypes.AuthSaga).to(AuthSaga);

export { diContainer };
