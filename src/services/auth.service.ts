import { injectable } from 'inversify';
import { ILoginDTO } from '../containers/LoginPage/interfaces';

@injectable()
class AuthService {
  async login(loginDTO?: ILoginDTO) {
    console.log('Auth API fired!');
    try {
      const data = {
        _id: '1',
        name: 'Lucifer',
        email: 'lucifer@flippy.com'
      };
      return data;
    } catch (error) {
      console.log('API call failed', error);
    }
  }
}

export default AuthService;
