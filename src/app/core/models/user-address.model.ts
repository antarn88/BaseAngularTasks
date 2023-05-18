import { UserAddressGeo } from './user-address-geo.model';

export interface UserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: UserAddressGeo;
}
