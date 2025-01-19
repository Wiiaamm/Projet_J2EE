import { ContractType } from './contract-type.enum';

export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contractType: ContractType;
  startDate: string;
  endDate?: string;
}
