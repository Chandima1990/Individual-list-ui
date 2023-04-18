export interface Individual {
  id: number;
  firstName: string;
  lastName: string;
  addresses: Address[];
  phoneNumber: string;
  ageInYears: number;
}

export interface Address {
  id: number;
  street: string;
  city: string;
  country: string;
  individualId: number;
}
