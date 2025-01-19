import { LeaveStatus } from './leave-status.enum';

export interface StatusClasses {
  [LeaveStatus.PENDING]: string;
  [LeaveStatus.APPROVED]: string;
  [LeaveStatus.REJECTED]: string;
}

export interface StatusLabels {
  [LeaveStatus.PENDING]: string;
  [LeaveStatus.APPROVED]: string;
  [LeaveStatus.REJECTED]: string;
}
