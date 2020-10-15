export interface UserModel {
  results: Result[];
}

interface Result {
  user: User;
  seed: string;
  version: string;
}

export interface User {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
  registered: string;
  dob: string;
  phone: string;
  cell: string;
  SSN: string;
  picture: string;
}

interface Location {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface Name {
  title: string;
  first: string;
  last: string;
}
