import HttpClient from './HttpClient';

import { BASE_URL, API_PREFIX } from './constants';
import { injectable } from 'inversify';

const getConstructedUrl = (urlPostfix?: string) =>
  `${BASE_URL}/${API_PREFIX}/${urlPostfix}`;

@injectable()
class PublicApi extends HttpClient {
  public constructor(postFixURL?: string) {
    super(getConstructedUrl(postFixURL));
  }
}

export { PublicApi };
