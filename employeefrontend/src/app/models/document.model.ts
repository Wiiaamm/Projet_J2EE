import { Employee } from './employee.model';

export interface Document {
  id?: number;
  fileName: string;
  fileType: string;
  data?: any;
  employee?: Employee;
}
