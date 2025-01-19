import {LeaveStatus} from './leave-status.enum';
import {Employee} from './employee.model';

export interface Leave {
  id?: number;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: LeaveStatus;
  employee?: Employee;
  manager?: Employee;
  employeeId: number;
  managerId?: number;
  leaveType: string;
}
