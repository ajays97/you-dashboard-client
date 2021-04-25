import { AxiosRequestConfig } from 'axios';
import HttpClient from './HttpClient';

import { BASE_URL, API_PREFIX } from './constants';
import { injectable } from 'inversify';

const getConstructedUrl = (urlPostfix?: string) =>
  `${BASE_URL}/${API_PREFIX}/${urlPostfix}`;

@injectable()
class ProtectedApi extends HttpClient {
  public constructor(postFixURL?: string) {
    super(getConstructedUrl(postFixURL));
    this._initializeRequestInterceptor();
  }

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError
    );
  };

  private _handleRequest = (config: AxiosRequestConfig) => {
    config.headers.Authorization = 'Bearer ...';

    return config;
  };
}

export { ProtectedApi };
