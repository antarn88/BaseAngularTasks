import { UserAddress } from './user-address.model';
import { UserCompany } from './user-company.model';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: UserAddress;
  phone: string;
  website: string;
  company: UserCompany;
}
