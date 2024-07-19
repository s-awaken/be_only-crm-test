import { User } from 'src/modules/user/models/user.model';

export class SignInBody {
  email: string;
  password: string;
}

export class SignInResponse {
  access_token: string;
  user: User;
}
