import {Employee} from './employee.model';

export interface Department {
  id?: number;
  name: string;
  parentDepartment?: Department;
  manager?: Employee;
}
