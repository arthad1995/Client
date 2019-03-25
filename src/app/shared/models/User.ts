import {Profile} from './Profile';


export class User {
  id?: number;
  username: string;
  password: string;
  email: string;
  name: string;
  profile?: Profile;
}
